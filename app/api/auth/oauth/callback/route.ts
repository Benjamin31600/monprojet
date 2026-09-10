import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { createFamilyAccount, hashPassword, startFamilySession } from "@/lib/family-auth";
import { setProviderSession } from "@/lib/providerAuth";

const STATE_COOKIE = "mycoco_oauth_state";
type Role = "family" | "provider";

function secret() {
  return process.env.OAUTH_STATE_SECRET || process.env.NEXTAUTH_SECRET || process.env.DATABASE_URL || "development-only-change-me";
}
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
function safeReturnTo(value: string, locale: "fr" | "en", role: Role) {
  const fallback = `/${locale}/${role === "provider" ? "espace-service" : "espace-famille"}`;
  if (!value || value.length > 240 || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}
function getDb() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}
function displayName(user: any) {
  const m = user?.user_metadata || {};
  return String(m.full_name || m.name || [m.first_name, m.last_name].filter(Boolean).join(" ") || user?.email?.split("@")[0] || "MyCoco").trim().slice(0, 160);
}

export async function GET(request: NextRequest) {
  const locale: "fr" | "en" = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  const baseLogin = new URL(`/${locale}/connexion`, request.url);
  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  if (error || !code || !returnedState) {
    baseLogin.searchParams.set("erreur", "oauth-cancelled");
    return NextResponse.redirect(baseLogin);
  }

  const store = request.cookies;
  const packed = store.get(STATE_COOKIE)?.value;
  if (!packed) {
    baseLogin.searchParams.set("erreur", "oauth-state");
    return NextResponse.redirect(baseLogin);
  }
  try {
    const decoded = Buffer.from(packed, "base64url").toString("utf8");
    const parts = decoded.split("|");
    if (parts.length < 5) throw new Error("invalid state");
    const [state, roleRaw, localeRaw, returnRaw, mac] = parts;
    const payload = `${state}|${roleRaw}|${localeRaw}|${returnRaw}`;
    const expected = sign(payload);
    const ok = mac.length === expected.length && timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
    if (!ok || state !== returnedState) throw new Error("state mismatch");
    const role: Role = roleRaw === "provider" ? "provider" : "family";
    const effectiveLocale: "fr" | "en" = localeRaw === "en" ? "en" : "fr";
    const returnTo = safeReturnTo(returnRaw, effectiveLocale, role);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) throw new Error("oauth config");
    const tokenResponse = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=authorization_code`, {
      method: "POST",
      headers: { apikey: anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ code, redirect_uri: new URL("/api/auth/oauth/callback", request.url).toString() }),
      cache: "no-store",
    });
    if (!tokenResponse.ok) throw new Error("oauth token exchange failed");
    const token = await tokenResponse.json();
    if (!token.access_token) throw new Error("missing access token");
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${token.access_token}` },
      cache: "no-store",
    });
    if (!userResponse.ok) throw new Error("oauth user lookup failed");
    const user = await userResponse.json();
    const email = String(user.email || "").trim().toLowerCase();
    if (!email) throw new Error("oauth email missing");
    const sql = getDb();
    if (!sql) throw new Error("database_not_configured");

    if (role === "family") {
      const existing = await sql`SELECT id FROM family_accounts WHERE email = ${email} LIMIT 1`;
      let accountId: string;
      if (existing.length) {
        accountId = existing[0].id as string;
      } else {
        const name = displayName(user);
        const [firstName, ...rest] = name.split(/\s+/);
        const created = await createFamilyAccount({ email, password: randomBytes(32).toString("base64url"), firstName: firstName || "", lastName: rest.join(" ") || undefined, locale: effectiveLocale });
        if (!created.ok) throw new Error(created.reason);
        accountId = created.account.id as string;
      }
      const sessionOk = await startFamilySession(accountId);
      if (!sessionOk) throw new Error("family session failed");
      const response = NextResponse.redirect(new URL(returnTo, request.url));
      response.cookies.delete(STATE_COOKIE);
      return response;
    }

    const existing = await sql`SELECT id FROM provider_accounts WHERE email = ${email} LIMIT 1`;
    let accountId: string;
    if (existing.length) {
      accountId = existing[0].id as string;
    } else {
      const display = displayName(user);
      const slugBase = display.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 100) || "service";
      const slug = `${slugBase}-${randomBytes(3).toString("hex")}`;
      const provider = await sql`INSERT INTO providers (slug, name, provider_type, city, source, claimed, verified, updated_at) VALUES (${slug}, ${display}, 'private_daycare', 'À compléter', 'oauth-registration', true, false, now()) RETURNING id`;
      const account = await sql`INSERT INTO provider_accounts (provider_id, email, password_hash) VALUES (${provider[0].id}, ${email}, ${hashPassword(randomBytes(32).toString("base64url"))}) RETURNING id`;
      accountId = account[0].id as string;
    }
    await setProviderSession(accountId);
    const response = NextResponse.redirect(new URL(returnTo, request.url));
    response.cookies.delete(STATE_COOKIE);
    return response;
  } catch (err) {
    console.error("MyCoco OAuth callback failed", err);
    baseLogin.searchParams.set("erreur", "oauth");
    const response = NextResponse.redirect(baseLogin);
    response.cookies.delete(STATE_COOKIE);
    return response;
  }
}

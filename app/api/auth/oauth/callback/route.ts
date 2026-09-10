import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import { createFamilyAccount, hashPassword, startFamilySession } from "@/lib/family-auth";
import { setProviderSession } from "@/lib/providerAuth";

const STATE_COOKIE = "mycoco_oauth_state";
const VERIFIER_COOKIE = "mycoco_oauth_verifier";
type Role = "family" | "provider";
function secret() { return process.env.OAUTH_STATE_SECRET || process.env.NEXTAUTH_SECRET || process.env.DATABASE_URL || "development-only-change-me"; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
function safeReturnTo(value: string, locale: "fr" | "en", role: Role) { const fallback = `/${locale}/${role === "provider" ? "espace-service" : "espace-famille"}`; if (!value || value.length > 240 || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback; return value; }
function nameFromUser(user: any) { const m = user?.user_metadata || {}; return String(m.full_name || m.name || [m.first_name, m.last_name].filter(Boolean).join(" ") || user?.email?.split("@")[0] || "MyCoco").trim().slice(0, 160); }
function db() { const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL; return url ? neon(url) : null; }

export async function GET(request: NextRequest) {
  const fallbackLocale: "fr" | "en" = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  const loginUrl = new URL(`/${fallbackLocale}/connexion`, request.url);
  const returnedState = request.nextUrl.searchParams.get("state");
  const authCode = request.nextUrl.searchParams.get("code");
  if (!returnedState || !authCode) { loginUrl.searchParams.set("erreur", "oauth-cancelled"); return NextResponse.redirect(loginUrl); }
  const packed = request.cookies.get(STATE_COOKIE)?.value;
  const verifier = request.cookies.get(VERIFIER_COOKIE)?.value;
  if (!packed || !verifier) { loginUrl.searchParams.set("erreur", "oauth-state"); return NextResponse.redirect(loginUrl); }

  try {
    const decoded = Buffer.from(packed, "base64url").toString("utf8");
    const [state, roleRaw, localeRaw, returnRaw, mac] = decoded.split("|");
    if (!state || !roleRaw || !localeRaw || !returnRaw || !mac) throw new Error("invalid state");
    const payload = `${state}|${roleRaw}|${localeRaw}|${returnRaw}`;
    const expected = sign(payload);
    if (mac.length !== expected.length || !timingSafeEqual(Buffer.from(mac), Buffer.from(expected)) || state !== returnedState) throw new Error("state mismatch");
    const role: Role = roleRaw === "provider" ? "provider" : "family";
    const locale: "fr" | "en" = localeRaw === "en" ? "en" : "fr";
    const returnTo = safeReturnTo(returnRaw, locale, role);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) throw new Error("oauth config");

    const tokenResponse = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=pkce`, { method: "POST", headers: { apikey: anonKey, "Content-Type": "application/json" }, body: JSON.stringify({ auth_code: authCode, code_verifier: verifier }), cache: "no-store" });
    if (!tokenResponse.ok) throw new Error(`token exchange ${tokenResponse.status}`);
    const token = await tokenResponse.json();
    if (!token.access_token) throw new Error("missing access token");
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: anonKey, Authorization: `Bearer ${token.access_token}` }, cache: "no-store" });
    if (!userResponse.ok) throw new Error(`user lookup ${userResponse.status}`);
    const user = await userResponse.json();
    const email = String(user.email || "").trim().toLowerCase();
    if (!email) throw new Error("OAuth provider did not return an email");
    const sql = db();
    if (!sql) throw new Error("database_not_configured");

    if (role === "family") {
      const existing = await sql`SELECT id FROM family_accounts WHERE email = ${email} LIMIT 1`;
      let accountId: string;
      if (existing.length) accountId = String(existing[0].id);
      else {
        const name = nameFromUser(user);
        const [firstName, ...rest] = name.split(/\s+/);
        const created = await createFamilyAccount({ email, password: randomBytes(32).toString("base64url"), firstName: firstName || "MyCoco", lastName: rest.join(" ") || undefined, locale });
        if (!created.ok) throw new Error(created.reason);
        accountId = String(created.account.id);
      }
      if (!(await startFamilySession(accountId))) throw new Error("family session failed");
    } else {
      const existing = await sql`SELECT id FROM provider_accounts WHERE email = ${email} LIMIT 1`;
      let accountId: string;
      if (existing.length) accountId = String(existing[0].id);
      else {
        const display = nameFromUser(user);
        const slugBase = display.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || "service";
        const slug = `${slugBase}-${randomBytes(3).toString("hex")}`;
        const provider = await sql`INSERT INTO providers (slug, name, provider_type, city, source, claimed, verified, updated_at) VALUES (${slug}, ${display}, 'private_daycare', 'À compléter', 'oauth-registration', true, false, now()) RETURNING id`;
        const account = await sql`INSERT INTO provider_accounts (provider_id, email, password_hash) VALUES (${provider[0].id}, ${email}, ${hashPassword(randomBytes(32).toString("base64url"))}) RETURNING id`;
        accountId = String(account[0].id);
      }
      if (!(await setProviderSession(accountId))) throw new Error("provider session failed");
    }
    const response = NextResponse.redirect(new URL(returnTo, request.url));
    response.cookies.delete(STATE_COOKIE); response.cookies.delete(VERIFIER_COOKIE);
    return response;
  } catch (error) {
    console.error("MyCoco OAuth callback failed", error);
    loginUrl.searchParams.set("erreur", "oauth");
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(STATE_COOKIE); response.cookies.delete(VERIFIER_COOKIE);
    return response;
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createHash, createHmac, randomBytes } from "node:crypto";

const STATE_COOKIE = "mycoco_oauth_state";
const VERIFIER_COOKIE = "mycoco_oauth_verifier";
type Role = "family" | "provider";

function secret() { return process.env.OAUTH_STATE_SECRET || process.env.NEXTAUTH_SECRET || process.env.DATABASE_URL || "development-only-change-me"; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
function safeReturnTo(value: string | null, locale: "fr" | "en", role: Role) { const fallback = `/${locale}/${role === "provider" ? "espace-service" : "espace-famille"}`; if (!value || value.length > 240 || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback; return value; }
function challenge(verifier: string) { return createHash("sha256").update(verifier).digest("base64url"); }

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider");
  const role: Role = request.nextUrl.searchParams.get("role") === "provider" ? "provider" : "family";
  const locale: "fr" | "en" = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  const loginUrl = new URL(`/${locale}/connexion`, request.url);
  if (provider !== "google" && provider !== "apple") { loginUrl.searchParams.set("erreur", "oauth-provider"); return NextResponse.redirect(loginUrl); }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) { loginUrl.searchParams.set("erreur", "oauth-config"); return NextResponse.redirect(loginUrl); }

  const state = randomBytes(24).toString("base64url");
  const verifier = randomBytes(48).toString("base64url");
  const returnTo = safeReturnTo(request.nextUrl.searchParams.get("returnTo"), locale, role);
  const payload = `${state}|${role}|${locale}|${returnTo}`;
  const packed = Buffer.from(`${payload}|${sign(payload)}`).toString("base64url");
  const callback = new URL("/api/auth/oauth/callback", request.url).toString();
  const authorize = new URL(`${supabaseUrl}/auth/v1/authorize`);
  authorize.searchParams.set("provider", provider);
  authorize.searchParams.set("redirect_to", callback);
  authorize.searchParams.set("state", state);
  authorize.searchParams.set("code_challenge", challenge(verifier));
  authorize.searchParams.set("code_challenge_method", "s256");

  try {
    const authResponse = await fetch(authorize, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` }, redirect: "manual", cache: "no-store" });
    const location = authResponse.headers.get("location");
    if (!location) throw new Error(`supabase authorize failed (${authResponse.status})`);
    const response = NextResponse.redirect(location);
    response.cookies.set(STATE_COOKIE, packed, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 10 * 60 });
    response.cookies.set(VERIFIER_COOKIE, verifier, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 10 * 60 });
    return response;
  } catch (error) {
    console.error("MyCoco OAuth authorize failed", error);
    loginUrl.searchParams.set("erreur", "oauth");
    return NextResponse.redirect(loginUrl);
  }
}

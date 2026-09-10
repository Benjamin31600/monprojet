import { NextRequest, NextResponse } from "next/server";
import { createHmac, randomBytes } from "node:crypto";

const STATE_COOKIE = "mycoco_oauth_state";
const MAX_RETURN_TO = 240;

type OAuthRole = "family" | "provider";
type OAuthProvider = "google" | "apple";

function secret() {
  return process.env.OAUTH_STATE_SECRET || process.env.NEXTAUTH_SECRET || process.env.DATABASE_URL || "development-only-change-me";
}
function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}
function safeReturnTo(value: string | null, locale: "fr" | "en", role: OAuthRole) {
  const fallback = `/${locale}/${role === "provider" ? "espace-service" : "espace-famille"}`;
  if (!value || value.length > MAX_RETURN_TO || !value.startsWith("/")) return fallback;
  if (value.startsWith("//") || value.includes("\\")) return fallback;
  return value;
}

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider");
  const role: OAuthRole = request.nextUrl.searchParams.get("role") === "provider" ? "provider" : "family";
  const locale: "fr" | "en" = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  if (provider !== "google" && provider !== "apple") {
    return NextResponse.redirect(new URL(`/${locale}/connexion?erreur=oauth-provider`, request.url));
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    return NextResponse.redirect(new URL(`/${locale}/connexion?erreur=oauth-config`, request.url));
  }

  const state = randomBytes(24).toString("base64url");
  const returnTo = safeReturnTo(request.nextUrl.searchParams.get("returnTo"), locale, role);
  const payload = `${state}|${role}|${locale}|${returnTo}`;
  const packed = Buffer.from(`${payload}|${sign(payload)}`).toString("base64url");
  const callback = new URL("/api/auth/oauth/callback", request.url).toString();
  const authUrl = new URL(`${supabaseUrl}/auth/v1/authorize`);
  authUrl.searchParams.set("provider", provider);
  authUrl.searchParams.set("redirect_to", callback);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("access_type", "offline");

  const response = NextResponse.redirect(authUrl);
  response.cookies.set(STATE_COOKIE, packed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
  response.headers.set("x-supabase-anon-key", anonKey);
  return response;
}

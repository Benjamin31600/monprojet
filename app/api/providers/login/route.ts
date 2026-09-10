import { guardAuthRequest } from "@/lib/auth-request";
import { safeReturnTo } from "@/lib/safe-redirect";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { verifyPassword, setProviderSession } from "@/lib/providerAuth";

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

export async function POST(request: NextRequest) {
  const rejected = guardAuthRequest(request);
  if (rejected) return rejected;
  let locale: "fr" | "en" = "fr";
  try {
  const form = await request.formData();
  locale = form.get("locale") === "en" ? "en" : "fr";
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const sql = db();
  if (!sql || !email || !password || password.length > 200 || email.length > 240) return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider&erreur=identifiants`, request.url), 303);
  const rows = await sql`SELECT id, password_hash FROM provider_accounts WHERE email = ${email} LIMIT 1`;
  if (!rows[0] || !verifyPassword(password, rows[0].password_hash as string)) return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider&erreur=identifiants`, request.url), 303);
  await setProviderSession(rows[0].id as string);
  return NextResponse.redirect(new URL(safeReturnTo(form.get("returnTo"), `/${locale}/espace-service`), request.url), 303);
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider&erreur=server`, request.url), 303);
  }
}

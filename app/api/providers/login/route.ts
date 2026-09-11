import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { verifyPassword, setProviderSession } from "@/lib/providerAuth";

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const locale = form.get("locale") === "en" ? "en" : "fr";
  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const sql = db();
  if (!sql || !email || !password) return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider&erreur=validation`, request.url), 303);
  const rows = await sql`SELECT id, password_hash FROM provider_accounts WHERE email = ${email} LIMIT 1`;
  if (!rows[0] || !verifyPassword(password, rows[0].password_hash as string)) return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider&erreur=identifiants`, request.url), 303);
  await setProviderSession(rows[0].id as string);
  return NextResponse.redirect(new URL(`/${locale}/espace-service?connexion=1`, request.url), 303);
}

import { guardAuthRequest } from "@/lib/auth-request";
import { NextRequest, NextResponse } from "next/server";
import { resetFamilyPassword } from "@/lib/family-auth";

export async function POST(request: NextRequest) {
  const rejected = guardAuthRequest(request);
  if (rejected) return rejected;
  const form = await request.formData();
  const token = String(form.get("token") || "");
  const password = String(form.get("password") || "");
  const confirmPassword = String(form.get("confirmPassword") || "");
  const locale = form.get("locale") === "en" ? "en" : "fr";
  if (!token || password.length < 10 || password.length > 200 || token.length > 200 || password !== confirmPassword) return NextResponse.redirect(new URL(`/${locale}/reinitialiser-mot-de-passe?token=${encodeURIComponent(token)}&erreur=validation`, request.url), 303);
  const result = await resetFamilyPassword(token, password);
  if (!result.ok) return NextResponse.redirect(new URL(`/${locale}/reinitialiser-mot-de-passe?token=${encodeURIComponent(token)}&erreur=token`, request.url), 303);
  return NextResponse.redirect(new URL(`/${locale}/espace-famille/connexion?reset=1`, request.url), 303);
}

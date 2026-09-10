import { guardAuthRequest } from "@/lib/auth-request";
import { NextRequest, NextResponse } from "next/server";
import { createPasswordReset } from "@/lib/family-auth";

export async function POST(request: NextRequest) {
  const rejected = guardAuthRequest(request);
  if (rejected) return rejected;
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  const locale = form.get("locale") === "en" ? "en" : "fr";
  if (!email || email.length > 240 || !process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) return NextResponse.redirect(new URL(`/${locale}/espace-famille/mot-de-passe-oublie?erreur=service`, request.url), 303);
  try {
    const result = await createPasswordReset(email);
    if (!result.ok) throw new Error("reset unavailable");
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/espace-famille/mot-de-passe-oublie?erreur=service`, request.url), 303);
  }
  return NextResponse.redirect(new URL(`/${locale}/espace-famille/mot-de-passe-oublie?envoye=1`, request.url), 303);
}

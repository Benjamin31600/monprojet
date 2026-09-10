import { NextRequest, NextResponse } from "next/server";
import { createPasswordReset } from "@/lib/family-auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  const locale = form.get("locale") === "en" ? "en" : "fr";
  if (email) await createPasswordReset(email);
  return NextResponse.redirect(new URL(`/${locale}/espace-famille/mot-de-passe-oublie?envoye=1`, request.url), 303);
}

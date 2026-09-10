import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createFamilyAccount, startFamilySession } from "@/lib/family-auth";

const schema = z.object({ locale: z.enum(["fr", "en"]).default("fr"), firstName: z.string().trim().min(2).max(80), lastName: z.string().trim().max(80).optional().or(z.literal("")), email: z.string().trim().email().max(240), phone: z.string().trim().max(40).optional().or(z.literal("")), password: z.string().min(10).max(200), confirmPassword: z.string().min(10).max(200) }).refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "password_mismatch" });

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const parsed = schema.safeParse(Object.fromEntries(form.entries()));
  const locale = form.get("locale") === "en" ? "en" : "fr";
  if (!parsed.success) return NextResponse.redirect(new URL(`/${locale}/espace-famille/inscription?erreur=validation`, request.url), 303);
  const result = await createFamilyAccount(parsed.data);
  if (!result.ok) {
    const code = result.reason === "email_exists" ? "email-exists" : "server";
    return NextResponse.redirect(new URL(`/${locale}/espace-famille/inscription?erreur=${code}`, request.url), 303);
  }
  await startFamilySession(result.account.id);
  return NextResponse.redirect(new URL(`/${locale}/espace-famille`, request.url), 303);
}

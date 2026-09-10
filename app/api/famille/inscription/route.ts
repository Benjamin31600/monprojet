import { guardAuthRequest } from "@/lib/auth-request";
import { safeReturnTo } from "@/lib/safe-redirect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createFamilyAccount, startFamilySession } from "@/lib/family-auth";

const schema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  returnTo: z.string().max(500).optional().or(z.literal("")),
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email().max(240),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  password: z.string().min(10).max(200),
  confirmPassword: z.string().min(10).max(200),
  profileCity: z.string().trim().max(120).optional().or(z.literal("")),
  postalCode: z.string().trim().max(20).optional().or(z.literal("")),
  children: z.string().max(10000).optional().or(z.literal("")),
  preferences: z.string().max(10000).optional().or(z.literal("")),
}).refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "password_mismatch" });

function parseJson(value: string | undefined, fallback: unknown) {
  if (!value) return fallback;
  try { return JSON.parse(value); } catch { return fallback; }
}

export async function POST(request: NextRequest) {
  const rejected = guardAuthRequest(request);
  if (rejected) return rejected;
  let locale: "fr" | "en" = "fr";
  try {
  const form = await request.formData();
  const parsed = schema.safeParse(Object.fromEntries(form.entries()));
  locale = form.get("locale") === "en" ? "en" : "fr";
  const returnTo = safeReturnTo(form.get("returnTo"), `/${locale}/espace-famille`);
  if (!parsed.success) return NextResponse.redirect(new URL(`/${locale}/inscription?role=family&erreur=validation`, request.url), 303);

  const result = await createFamilyAccount({
    ...parsed.data,
    profileCity: parsed.data.profileCity || "",
    postalCode: parsed.data.postalCode || "",
    children: parseJson(parsed.data.children, []),
    preferences: parseJson(parsed.data.preferences, {}),
  });
  if (!result.ok) {
    const code = result.reason === "email_exists" ? "email-exists" : "server";
    return NextResponse.redirect(new URL(`/${locale}/inscription?role=family&erreur=${code}`, request.url), 303);
  }
  await startFamilySession(result.account.id);
  return NextResponse.redirect(new URL(returnTo, request.url), 303);
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/inscription?role=family&erreur=server`, request.url), 303);
  }
}

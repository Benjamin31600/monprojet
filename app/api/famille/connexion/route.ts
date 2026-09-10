import { guardAuthRequest } from "@/lib/auth-request";
import { safeReturnTo } from "@/lib/safe-redirect";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authenticateFamily, startFamilySession } from "@/lib/family-auth";

const schema = z.object({ locale: z.enum(["fr", "en"]).default("fr"), email: z.string().trim().email(), password: z.string().min(1).max(200) });

export async function POST(request: NextRequest) {
  const rejected = guardAuthRequest(request);
  if (rejected) return rejected;
  let locale: "fr" | "en" = "fr";
  try {
  const form = await request.formData();
  const parsed = schema.safeParse(Object.fromEntries(form.entries()));
  locale = form.get("locale") === "en" ? "en" : "fr";
  if (!parsed.success) return NextResponse.redirect(new URL(`/${locale}/connexion?role=family&erreur=validation`, request.url), 303);
  const account = await authenticateFamily(parsed.data.email, parsed.data.password);
  if (!account) return NextResponse.redirect(new URL(`/${locale}/connexion?role=family&erreur=identifiants`, request.url), 303);
  await startFamilySession(account.id);
  return NextResponse.redirect(new URL(safeReturnTo(form.get("returnTo"), `/${locale}/espace-famille`), request.url), 303);
  } catch {
    return NextResponse.redirect(new URL(`/${locale}/connexion?role=family&erreur=server`, request.url), 303);
  }
}

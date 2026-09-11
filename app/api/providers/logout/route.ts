import { NextRequest, NextResponse } from "next/server";
import { clearProviderSession } from "@/lib/providerAuth";

export async function POST(request: NextRequest) {
  await clearProviderSession();
  const locale = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider`, request.url), 303);
}

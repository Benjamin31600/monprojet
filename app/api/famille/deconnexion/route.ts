import { NextRequest, NextResponse } from "next/server";
import { endFamilySession } from "@/lib/family-auth";

export async function POST(request: NextRequest) {
  await endFamilySession();
  const locale = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  return NextResponse.redirect(new URL(`/${locale}/connexion?role=family`, request.url), 303);
}

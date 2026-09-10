import { NextRequest, NextResponse } from "next/server";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-mycoco-locale", request.nextUrl.pathname.split("/")[1] === "en" ? "en-CA" : "fr-CA");
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  let changed = false;

  for (const key of UTM_KEYS) {
    const value = request.nextUrl.searchParams.get(key)?.trim();
    if (!value || value.length > 160) continue;

    response.cookies.set(`mycoco_${key}`, value, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    changed = true;
  }

  return changed ? response : response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

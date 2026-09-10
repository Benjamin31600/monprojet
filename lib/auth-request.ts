import { NextRequest, NextResponse } from "next/server";

/** Reject cross-site form submissions before parsing or hashing credentials. */
export function guardAuthRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  const crossSite = request.headers.get("sec-fetch-site") === "cross-site";
  if (crossSite || (origin && origin !== request.nextUrl.origin)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const size = Number(request.headers.get("content-length") || "0");
  if (!Number.isFinite(size) || size > 24000) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  return null;
}

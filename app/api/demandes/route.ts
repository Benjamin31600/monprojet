import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveParentDemand } from "@/lib/demandes";

const demandSchema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  ville: z.string().trim().min(2).max(120),
  age: z.enum(["0-18", "18-36", "3-5", "5+"]),
  type: z.string().trim().max(80).default(""),
  debut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const MAX_BODY_BYTES = 20_000;

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const origin = request.headers.get("origin");
    if (origin) {
      const expected = new URL(request.url).origin;
      if (origin !== expected) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    if (rateLimited(clientKey(request))) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "600" } });
    }

    const form = await request.formData();
    const parsed = demandSchema.safeParse({
      locale: form.get("locale") || "fr",
      ville: form.get("ville") || "",
      age: form.get("age") || "",
      type: form.get("type") || "",
      debut: form.get("debut") || "",
      website: form.get("website") || "",
    });

    if (!parsed.success || parsed.data.website) {
      return NextResponse.json({ error: "Invalid childcare request" }, { status: 400 });
    }

    const result = await saveParentDemand({
      locale: parsed.data.locale,
      cityOrPostal: parsed.data.ville,
      ageRange: parsed.data.age,
      childcareType: parsed.data.type,
      desiredStartDate: parsed.data.debut || null,
      source: "mon-besoin",
    });

    if (!result.saved) return NextResponse.json({ error: "Database is not configured" }, { status: 503 });

    const url = new URL(`/${parsed.data.locale}/garderies`, request.url);
    url.searchParams.set("ville", parsed.data.ville);
    url.searchParams.set("age", parsed.data.age);
    if (parsed.data.type) url.searchParams.set("type", parsed.data.type);
    if (parsed.data.debut) url.searchParams.set("debut", parsed.data.debut);
    url.searchParams.set("demande", "enregistree");

    return NextResponse.redirect(url, 303);
  } catch {
    return NextResponse.json({ error: "Unable to save childcare request" }, { status: 500 });
  }
}

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
  utmSource: z.string().trim().max(120).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(120).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(160).optional().or(z.literal("")),
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
  if (!current || current.resetAt <= now) { attempts.set(key, { count: 1, resetAt: now + WINDOW_MS }); return false; }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}
function errorRedirect(request: NextRequest, locale: "fr" | "en", code: string) {
  const url = new URL(`/${locale}/mon-besoin`, request.url); url.searchParams.set("erreur", code); return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) return NextResponse.json({ error: "Request too large" }, { status: 413 });
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    if (rateLimited(clientKey(request))) return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "600" } });
    const form = await request.formData();
    const parsed = demandSchema.safeParse({
      locale: form.get("locale") || "fr", ville: form.get("ville") || "", age: form.get("age") || "", type: form.get("type") || "", debut: form.get("debut") || "", website: form.get("website") || "",
      utmSource: form.get("utm_source") || "", utmMedium: form.get("utm_medium") || "", utmCampaign: form.get("utm_campaign") || "",
    });
    if (!parsed.success || parsed.data.website) return errorRedirect(request, form.get("locale") === "en" ? "en" : "fr", "validation");
    const tracking = [parsed.data.utmSource && `utm_source=${parsed.data.utmSource}`, parsed.data.utmMedium && `utm_medium=${parsed.data.utmMedium}`, parsed.data.utmCampaign && `utm_campaign=${parsed.data.utmCampaign}`].filter(Boolean).join("&");
    const result = await saveParentDemand({ locale: parsed.data.locale, cityOrPostal: parsed.data.ville, ageRange: parsed.data.age, childcareType: parsed.data.type, desiredStartDate: parsed.data.debut || null, source: tracking ? `mon-besoin|${tracking}` : "mon-besoin" });
    if (!result.saved) return errorRedirect(request, parsed.data.locale, "configuration");
    const url = new URL(`/${parsed.data.locale}/garderies`, request.url);
    url.searchParams.set("ville", parsed.data.ville); url.searchParams.set("age", parsed.data.age); if (parsed.data.type) url.searchParams.set("type", parsed.data.type); if (parsed.data.debut) url.searchParams.set("debut", parsed.data.debut); url.searchParams.set("demande", "enregistree");
    return NextResponse.redirect(url, 303);
  } catch { return errorRedirect(request, "fr", "server"); }
}

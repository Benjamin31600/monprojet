import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getChildcareData } from "@/lib/childcare";
import { createProviderLead, ensureProvider } from "@/lib/providers";

const schema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  providerSlug: z.string().trim().min(1).max(200),
  demandId: z.string().uuid().optional().or(z.literal("")),
  matchScore: z.coerce.number().int().min(0).max(500).optional(),
  source: z.string().trim().max(160).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get("content-length") || 0) > 10_000) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const form = await request.formData();
    const parsed = schema.safeParse({
      locale: form.get("locale") || "fr",
      providerSlug: form.get("providerSlug") || "",
      demandId: form.get("demandId") || "",
      matchScore: form.get("matchScore") || undefined,
      source: form.get("source") || "provider-profile",
    });
    if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    const data = await getChildcareData();
    const record = data.records.find(item => item.slug === parsed.data.providerSlug);
    if (!record) return NextResponse.json({ error: "Provider not found" }, { status: 404 });

    const providerId = await ensureProvider(record);
    if (!providerId) return NextResponse.json({ error: "Lead storage unavailable" }, { status: 503 });

    await createProviderLead({
      providerId,
      parentDemandId: parsed.data.demandId || null,
      matchScore: parsed.data.matchScore ?? null,
      source: parsed.data.source || "provider-profile",
    });

    const url = new URL(`/${parsed.data.locale}/garderie/${record.slug}`, request.url);
    url.searchParams.set("interet", "envoye");
    return NextResponse.redirect(url, 303);
  } catch {
    return NextResponse.json({ error: "Unable to create lead" }, { status: 500 });
  }
}

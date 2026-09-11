import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { getProviderAccount } from "@/lib/providerAuth";

const schema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  name: z.string().trim().min(2).max(160),
  providerType: z.string().trim().min(2).max(120),
  city: z.string().trim().min(2).max(120),
  address: z.string().trim().max(240).optional().or(z.literal("")),
  postalCode: z.string().trim().max(20).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  description: z.string().trim().max(2500).optional().or(z.literal("")),
  openingTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  closingTime: z.string().regex(/^\d{2}:\d{2}$/).optional().or(z.literal("")),
  capacity: z.coerce.number().int().min(0).max(10000).optional(),
  minAgeMonths: z.coerce.number().int().min(0).max(216).optional(),
  maxAgeMonths: z.coerce.number().int().min(0).max(216).optional(),
  pricingText: z.string().trim().max(500).optional().or(z.literal("")),
  currentOpenings: z.string().trim().max(500).optional().or(z.literal("")),
  waitlistEnabled: z.enum(["on", ""]).optional().default(""),
});

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

export async function POST(request: NextRequest) {
  const account = await getProviderAccount();
  const locale = request.nextUrl.searchParams.get("locale") === "en" ? "en" : "fr";
  if (!account) return NextResponse.redirect(new URL(`/${locale}/connexion?role=provider`, request.url), 303);

  const form = await request.formData();
  const parsed = schema.safeParse({
    locale: form.get("locale") || locale,
    name: form.get("name") || "",
    providerType: form.get("providerType") || "",
    city: form.get("city") || "",
    address: form.get("address") || "",
    postalCode: form.get("postalCode") || "",
    phone: form.get("phone") || "",
    website: form.get("website") || "",
    description: form.get("description") || "",
    openingTime: form.get("openingTime") || "",
    closingTime: form.get("closingTime") || "",
    capacity: form.get("capacity") || undefined,
    minAgeMonths: form.get("minAgeMonths") || undefined,
    maxAgeMonths: form.get("maxAgeMonths") || undefined,
    pricingText: form.get("pricingText") || "",
    currentOpenings: form.get("currentOpenings") || "",
    waitlistEnabled: form.get("waitlistEnabled") === "on" ? "on" : "",
  });
  if (!parsed.success) return NextResponse.redirect(new URL(`/${locale}/espace-service/profil?erreur=validation`, request.url), 303);

  const sql = db();
  if (!sql) return NextResponse.redirect(new URL(`/${locale}/espace-service/profil?erreur=server`, request.url), 303);
  const p = parsed.data;

  try {
    await sql`
      UPDATE providers SET
        name=${p.name}, provider_type=${p.providerType}, city=${p.city}, address=${p.address || null}, postal_code=${p.postalCode || null},
        phone=${p.phone || null}, website=${p.website || null}, capacity_total=${p.capacity ?? null}, updated_at=now()
      WHERE id=${account.provider_id}
    `;
    await sql`
      INSERT INTO provider_profiles
        (provider_id, owner_email, description, website, phone, address, postal_code, opening_time, closing_time, capacity, min_age_months, max_age_months, pricing_text, current_openings, waitlist_enabled, claimed, onboarding_status)
      VALUES
        (${account.provider_id}, ${account.email}, ${p.description || null}, ${p.website || null}, ${p.phone || null}, ${p.address || null}, ${p.postalCode || null}, ${p.openingTime || null}, ${p.closingTime || null}, ${p.capacity ?? null}, ${p.minAgeMonths ?? null}, ${p.maxAgeMonths ?? null}, ${p.pricingText || null}, ${p.currentOpenings || null}, ${p.waitlistEnabled === "on"}, true, 'completed')
      ON CONFLICT (provider_id) DO UPDATE SET
        owner_email=EXCLUDED.owner_email,
        description=EXCLUDED.description,
        website=EXCLUDED.website,
        phone=EXCLUDED.phone,
        address=EXCLUDED.address,
        postal_code=EXCLUDED.postal_code,
        opening_time=EXCLUDED.opening_time,
        closing_time=EXCLUDED.closing_time,
        capacity=EXCLUDED.capacity,
        min_age_months=EXCLUDED.min_age_months,
        max_age_months=EXCLUDED.max_age_months,
        pricing_text=EXCLUDED.pricing_text,
        current_openings=EXCLUDED.current_openings,
        waitlist_enabled=EXCLUDED.waitlist_enabled,
        claimed=true,
        onboarding_status='completed',
        updated_at=now()
    `;
    return NextResponse.redirect(new URL(`/${locale}/espace-service/profil?saved=1`, request.url), 303);
  } catch (error) {
    console.error("MyCoco provider profile update failed", error);
    return NextResponse.redirect(new URL(`/${locale}/espace-service/profil?erreur=server`, request.url), 303);
  }
}

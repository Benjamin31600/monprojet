import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { hashPassword, setProviderSession } from "@/lib/providerAuth";
import { sendAccountWelcomeEmail } from "@/lib/email";

const schema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  returnTo: z.string().max(500).optional().or(z.literal("")),
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
  city: z.string().trim().min(2).max(120),
  providerType: z.string().trim().min(2).max(120),
  postalCode: z.string().trim().max(20).optional().or(z.literal("")),
  address: z.string().trim().max(240).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  website: z.string().trim().max(300).optional().or(z.literal("")),
  capacity: z.coerce.number().int().min(0).max(10000).optional(),
});

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120) || "service";
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const parsed = schema.safeParse({
    locale: form.get("locale") || "fr",
    returnTo: form.get("returnTo") || "",
    name: form.get("name") || "",
    email: form.get("email") || "",
    password: form.get("password") || "",
    city: form.get("city") || "",
    providerType: form.get("providerType") || "",
    postalCode: form.get("postalCode") || "",
    address: form.get("address") || "",
    phone: form.get("phone") || "",
    website: form.get("website") || "",
    capacity: form.get("capacity") || undefined,
  });
  const locale = form.get("locale") === "en" ? "en" : "fr";
  if (!parsed.success) return NextResponse.redirect(new URL(`/${locale}/inscription?role=provider&erreur=validation`, request.url), 303);

  const sql = db();
  if (!sql) return NextResponse.redirect(new URL(`/${locale}/inscription?role=provider&erreur=server`, request.url), 303);

  const email = parsed.data.email.toLowerCase();
  const existing = await sql`SELECT id FROM provider_accounts WHERE email = ${email} LIMIT 1`;
  if (existing.length) return NextResponse.redirect(new URL(`/${locale}/inscription?role=provider&erreur=email`, request.url), 303);

  const baseSlug = slugify(parsed.data.name);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

  try {
    const provider = await sql`
      INSERT INTO providers (slug, name, provider_type, city, address, postal_code, phone, website, capacity_total, source, claimed, verified, updated_at)
      VALUES (${slug}, ${parsed.data.name}, ${parsed.data.providerType}, ${parsed.data.city}, ${parsed.data.address || null}, ${parsed.data.postalCode || null}, ${parsed.data.phone || null}, ${parsed.data.website || null}, ${parsed.data.capacity ?? null}, 'provider-registration', true, false, now())
      RETURNING id
    `;
    const providerId = provider[0].id as string;

    const account = await sql`
      INSERT INTO provider_accounts (provider_id, email, password_hash)
      VALUES (${providerId}, ${email}, ${hashPassword(parsed.data.password)})
      RETURNING id
    `;

    await sql`
      INSERT INTO provider_profiles (provider_id, owner_email, website, phone, address, postal_code, capacity, claimed, onboarding_status)
      VALUES (${providerId}, ${email}, ${parsed.data.website || null}, ${parsed.data.phone || null}, ${parsed.data.address || null}, ${parsed.data.postalCode || null}, ${parsed.data.capacity ?? null}, true, 'started')
      ON CONFLICT (provider_id) DO UPDATE SET
        owner_email = EXCLUDED.owner_email,
        website = COALESCE(EXCLUDED.website, provider_profiles.website),
        phone = COALESCE(EXCLUDED.phone, provider_profiles.phone),
        address = COALESCE(EXCLUDED.address, provider_profiles.address),
        postal_code = COALESCE(EXCLUDED.postal_code, provider_profiles.postal_code),
        capacity = COALESCE(EXCLUDED.capacity, provider_profiles.capacity),
        claimed = true,
        onboarding_status = 'started',
        updated_at = now()
    `;

    await setProviderSession(account[0].id as string);
    await sendAccountWelcomeEmail({ to: email, name: parsed.data.name, locale, audience: "provider" }).catch((error) => console.error("MyCoco provider welcome email error", error));

    const destination = parsed.data.returnTo || `/${locale}/espace-service?nouveau=1`;
    return NextResponse.redirect(new URL(destination, request.url), 303);
  } catch (error) {
    console.error("MyCoco provider registration failed", error);
    return NextResponse.redirect(new URL(`/${locale}/inscription?role=provider&erreur=server`, request.url), 303);
  }
}

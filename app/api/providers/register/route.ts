import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { hashPassword, setProviderSession } from "@/lib/providerAuth";

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
  if (!parsed.success) return NextResponse.json({ error: "Informations invalides" }, { status: 400 });
  const sql = db();
  if (!sql) return NextResponse.json({ error: "La base de données n'est pas configurée." }, { status: 503 });

  const email = parsed.data.email.toLowerCase();
  const existing = await sql`SELECT id FROM provider_accounts WHERE email = ${email} LIMIT 1`;
  if (existing.length) {
    const url = new URL(`/${parsed.data.locale}/inscription?role=provider&erreur=email`, request.url);
    return NextResponse.redirect(url, 303);
  }

  const baseSlug = slugify(parsed.data.name);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
  const provider = await sql`
    INSERT INTO providers (slug, name, provider_type, city, address, postal_code, phone, website, capacity_total, source, claimed, verified, updated_at)
    VALUES (${slug}, ${parsed.data.name}, ${parsed.data.providerType}, ${parsed.data.city}, ${parsed.data.address || null}, ${parsed.data.postalCode || null}, ${parsed.data.phone || null}, ${parsed.data.website || null}, ${parsed.data.capacity ?? null}, 'provider-registration', true, false, now())
    RETURNING id
  `;
  const account = await sql`
    INSERT INTO provider_accounts (provider_id, email, password_hash)
    VALUES (${provider[0].id}, ${email}, ${hashPassword(parsed.data.password)})
    RETURNING id
  `;
  await setProviderSession(account[0].id as string);
  const destination = parsed.data.returnTo || `/${parsed.data.locale}/espace-service`;
  return NextResponse.redirect(new URL(destination, request.url), 303);
}

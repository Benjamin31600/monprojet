import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { hashPassword, setProviderSession } from "@/lib/providerAuth";

const schema = z.object({
  locale: z.enum(["fr", "en"]).default("fr"),
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
  city: z.string().trim().min(2).max(120),
  providerType: z.string().trim().min(2).max(120),
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
    name: form.get("name") || "",
    email: form.get("email") || "",
    password: form.get("password") || "",
    city: form.get("city") || "",
    providerType: form.get("providerType") || "",
  });
  if (!parsed.success) return NextResponse.json({ error: "Informations invalides" }, { status: 400 });
  const sql = db();
  if (!sql) return NextResponse.json({ error: "La base de données n'est pas configurée." }, { status: 503 });

  const email = parsed.data.email.toLowerCase();
  const existing = await sql`SELECT id FROM provider_accounts WHERE email = ${email} LIMIT 1`;
  if (existing.length) {
    const url = new URL(`/${parsed.data.locale}/espace-service`, request.url);
    url.searchParams.set("error", "email");
    return NextResponse.redirect(url, 303);
  }

  const baseSlug = slugify(parsed.data.name);
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
  const provider = await sql`
    INSERT INTO providers (slug, name, provider_type, city, source, claimed, verified, updated_at)
    VALUES (${slug}, ${parsed.data.name}, ${parsed.data.providerType}, ${parsed.data.city}, 'provider-registration', true, false, now())
    RETURNING id
  `;
  const account = await sql`
    INSERT INTO provider_accounts (provider_id, email, password_hash)
    VALUES (${provider[0].id}, ${email}, ${hashPassword(parsed.data.password)})
    RETURNING id
  `;
  await setProviderSession(account[0].id as string);
  return NextResponse.redirect(new URL(`/${parsed.data.locale}/espace-service`, request.url), 303);
}

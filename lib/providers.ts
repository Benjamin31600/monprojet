import { neon } from "@neondatabase/serverless";
import type { ChildcareRecord } from "@/lib/childcare";

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export async function ensureProvider(record: ChildcareRecord) {
  const sql = getSql();
  if (!sql) return null;

  const rows = await sql`
    INSERT INTO providers
      (slug, name, provider_type, city, address, postal_code, phone, latitude, longitude,
       capacity_total, capacity_services, source, source_updated_at, updated_at)
    VALUES
      (${record.slug}, ${record.name}, ${record.type}, ${record.city}, ${record.address || null},
       ${record.postalCode || null}, ${record.phone || null}, ${record.latitude}, ${record.longitude},
       ${record.capacityTotal || null}, ${record.capacityServices || []}, ${record.source || null},
       ${record.sourceUpdatedAt || null}, now())
    ON CONFLICT (slug) DO UPDATE SET
      name = EXCLUDED.name,
      provider_type = EXCLUDED.provider_type,
      city = EXCLUDED.city,
      address = EXCLUDED.address,
      postal_code = EXCLUDED.postal_code,
      phone = EXCLUDED.phone,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude,
      capacity_total = EXCLUDED.capacity_total,
      capacity_services = EXCLUDED.capacity_services,
      source = EXCLUDED.source,
      source_updated_at = EXCLUDED.source_updated_at,
      updated_at = now()
    RETURNING id
  `;

  return rows[0]?.id as string | undefined;
}

export async function createProviderLead(input: {
  providerId: string;
  parentDemandId?: string | null;
  matchScore?: number | null;
  source?: string;
}) {
  const sql = getSql();
  if (!sql) return { saved: false as const, reason: "database_not_configured" as const };

  const rows = await sql`
    INSERT INTO provider_leads (provider_id, parent_demand_id, match_score, source)
    VALUES (${input.providerId}, ${input.parentDemandId || null}, ${input.matchScore ?? null}, ${input.source || "family-interest"})
    RETURNING id
  `;

  return { saved: true as const, id: rows[0]?.id as string | undefined };
}

import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

export type FamilyProfileInput = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  locale: "fr" | "en";
  cityOrPostal?: string;
};

export async function upsertFamilyProfile(input: FamilyProfileInput) {
  const sql = getSql();
  if (!sql) return { saved: false as const, reason: "database_not_configured" as const };
  try {
    const rows = await sql`
      INSERT INTO family_profiles (email, first_name, last_name, phone, locale, city_or_postal)
      VALUES (${input.email || null}, ${input.firstName || null}, ${input.lastName || null}, ${input.phone || null}, ${input.locale}, ${input.cityOrPostal || null})
      ON CONFLICT (email) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        locale = EXCLUDED.locale,
        city_or_postal = EXCLUDED.city_or_postal,
        updated_at = now()
      RETURNING id
    `;
    return { saved: true as const, id: rows[0]?.id as string | undefined };
  } catch (error) {
    console.error("MyCoco: unable to save family profile", error);
    return { saved: false as const, reason: "database_error" as const };
  }
}

export async function createFamilySearch(input: {
  familyId?: string;
  cityOrPostal: string;
  ageRange: string;
  childcareType?: string;
  desiredStartDate?: string | null;
  source?: string;
}) {
  const sql = getSql();
  if (!sql) return { saved: false as const, reason: "database_not_configured" as const };
  try {
    const rows = await sql`
      INSERT INTO family_searches (family_id, city_or_postal, age_range, childcare_type, desired_start_date, source)
      VALUES (${input.familyId || null}, ${input.cityOrPostal}, ${input.ageRange}, ${input.childcareType || null}, ${input.desiredStartDate || null}, ${input.source || null})
      RETURNING id
    `;
    return { saved: true as const, id: rows[0]?.id as string | undefined };
  } catch (error) {
    console.error("MyCoco: unable to save family search", error);
    return { saved: false as const, reason: "database_error" as const };
  }
}

export async function getFamilySearchStats() {
  const sql = getSql();
  if (!sql) return null;
  try {
    const rows = await sql`
      SELECT
        count(*) FILTER (WHERE status = 'active')::int AS active_searches,
        count(*) FILTER (WHERE created_at >= now() - interval '7 days')::int AS searches_last_7_days,
        count(DISTINCT city_or_postal)::int AS locations
      FROM family_searches
    `;
    return rows[0] || null;
  } catch (error) {
    console.error("MyCoco: unable to read family search stats", error);
    return null;
  }
}

export async function createProviderProfile(input: {
  providerId?: string;
  ownerEmail?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  description?: string;
  website?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
  openingTime?: string;
  closingTime?: string;
  capacity?: number;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  pricingText?: string;
  currentOpenings?: string;
}) {
  const sql = getSql();
  if (!sql) return { saved: false as const, reason: "database_not_configured" as const };
  try {
    const rows = await sql`
      INSERT INTO provider_profiles (
        provider_id, owner_email, owner_first_name, owner_last_name, description, website, phone,
        address, postal_code, opening_time, closing_time, capacity, min_age_months, max_age_months,
        pricing_text, current_openings, onboarding_status
      ) VALUES (
        ${input.providerId || null}, ${input.ownerEmail || null}, ${input.ownerFirstName || null}, ${input.ownerLastName || null},
        ${input.description || null}, ${input.website || null}, ${input.phone || null}, ${input.address || null},
        ${input.postalCode || null}, ${input.openingTime || null}, ${input.closingTime || null}, ${input.capacity || null},
        ${input.minAgeMonths || null}, ${input.maxAgeMonths || null}, ${input.pricingText || null}, ${input.currentOpenings || null}, 'draft'
      )
      RETURNING id
    `;
    return { saved: true as const, id: rows[0]?.id as string | undefined };
  } catch (error) {
    console.error("MyCoco: unable to save provider profile", error);
    return { saved: false as const, reason: "database_error" as const };
  }
}

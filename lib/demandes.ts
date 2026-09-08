import { neon } from "@neondatabase/serverless";

export type ParentDemand = {
  locale: "fr" | "en";
  cityOrPostal: string;
  ageRange: "0-18" | "18-36" | "3-5" | "5+";
  childcareType: string;
  desiredStartDate: string | null;
  source: string;
};

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export async function saveParentDemand(demand: ParentDemand) {
  const sql = getSql();
  if (!sql) return { saved: false, reason: "database_not_configured" as const };

  await sql`
    CREATE TABLE IF NOT EXISTS parent_demands (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      locale TEXT NOT NULL,
      city_or_postal TEXT NOT NULL,
      age_range TEXT NOT NULL,
      childcare_type TEXT,
      desired_start_date DATE,
      source TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    INSERT INTO parent_demands
      (locale, city_or_postal, age_range, childcare_type, desired_start_date, source)
    VALUES
      (${demand.locale}, ${demand.cityOrPostal}, ${demand.ageRange}, ${demand.childcareType || null}, ${demand.desiredStartDate || null}, ${demand.source})
  `;

  return { saved: true as const };
}

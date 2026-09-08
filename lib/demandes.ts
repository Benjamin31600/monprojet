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

  const rows = await sql`
    INSERT INTO parent_demands
      (locale, city_or_postal, age_range, childcare_type, desired_start_date, source)
    VALUES
      (${demand.locale}, ${demand.cityOrPostal}, ${demand.ageRange}, ${demand.childcareType || ""}, ${demand.desiredStartDate || null}, ${demand.source})
    RETURNING id
  `;

  return { saved: true as const, id: rows[0]?.id as string | undefined };
}

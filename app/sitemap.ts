import type { MetadataRoute } from "next";
import { cities, site } from "@/lib/site";
import { getChildcareData } from "@/lib/childcare";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const paths = ["", "garderies", "cpe", "garderie-subventionnee", "a-propos", "confidentialite", "conditions", "temoins"];
  const urls = ["fr", "en"].flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path ? `/${path}` : ""}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const local = ["fr", "en"].flatMap((locale) =>
    cities.map((city) => ({
      url: `${site.url}/${locale}/garderie/${city.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }))
  );

  const { records } = await getChildcareData();
  const providers = ["fr", "en"].flatMap((locale) =>
    records.map((record) => ({
      url: `${site.url}/${locale}/garderie/${record.slug}`,
      lastModified: new Date(record.sourceUpdatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  );

  return [...urls, ...local, ...providers];
}

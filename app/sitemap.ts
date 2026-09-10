import type { MetadataRoute } from "next";
import { cities, site } from "@/lib/site";
import { getChildcareData } from "@/lib/childcare";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { records, updatedAt } = await getChildcareData();
  const dataDate = updatedAt ? new Date(updatedAt) : new Date();

  const corePaths = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "mon-besoin", priority: 0.95, changeFrequency: "weekly" as const },
    { path: "garderies", priority: 0.9, changeFrequency: "daily" as const },
    { path: "cpe", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "garderie-subventionnee", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "pour-les-services", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "comment-ca-marche", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "a-propos", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "confidentialite", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "conditions", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const urls = ["fr", "en"].flatMap((locale) =>
    corePaths.map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}/${locale}${path ? `/${path}` : ""}`,
      lastModified: dataDate,
      changeFrequency,
      priority,
    }))
  );

  const local = ["fr", "en"].flatMap((locale) =>
    cities.map((city) => ({
      url: `${site.url}/${locale}/garderies/${city.slug}`,
      lastModified: dataDate,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }))
  );

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

import type { MetadataRoute } from "next";
import { cities, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/garderies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/cpe`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/garderie-subventionnee`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
  const local: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${site.url}/garderie/${city.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));
  return [...core, ...local];
}

import type { MetadataRoute } from "next";
import { cities, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "/garderies", "/cpe", "/garderie-subventionnee"].map((path) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 }));
  const local = cities.map((city) => ({ url: `${site.url}/garderie/${city.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.9 }));
  return [...core, ...local];
}

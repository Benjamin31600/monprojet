export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "MyCoco",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://monprojetgarde.vercel.app",
  description:
    "Trouvez une garderie, un CPE ou un service de garde près de chez vous. MyCoco aide les familles du Québec à trouver une solution de garde adaptée.",
  locale: "fr_CA",
  country: "CA",
  region: "Quebec",
  currency: "CAD",
};

export const cities = [
  { slug: "mirabel", name: "Mirabel" },
  { slug: "blainville", name: "Blainville" },
  { slug: "boisbriand", name: "Boisbriand" },
  { slug: "saint-eustache", name: "Saint-Eustache" },
  { slug: "sainte-therese", name: "Sainte-Thérèse" },
];

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Trouver une garde",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://monprojetgarde.vercel.app",
  description:
    "Trouvez une place en garderie, CPE, milieu familial ou une solution de garde près de chez vous.",
  locale: "fr_CA",
};

export const cities = [
  { slug: "mirabel", name: "Mirabel" },
  { slug: "blainville", name: "Blainville" },
  { slug: "boisbriand", name: "Boisbriand" },
  { slug: "saint-eustache", name: "Saint-Eustache" },
  { slug: "sainte-therese", name: "Sainte-Thérèse" },
];

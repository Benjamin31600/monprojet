export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "MyCoco",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://monprojetgarde.vercel.app",
  tagline: "La garde de votre famille, simplement.",
  description:
    "Trouvez une garderie, un CPE, un service de garde en milieu familial ou une solution de garde près de chez vous au Québec.",
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

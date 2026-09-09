export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "MyCoco",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://projet-garde.vercel.app",
  tagline: "La garde qui s’adapte à votre famille.",
  description:
    "MyCoco aide les familles à trouver la bonne solution de garde au Québec. Commencez par votre besoin, découvrez les options pertinentes et gardez votre recherche active.",
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

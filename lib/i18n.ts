export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionaries = {
  fr: {
    nav: { search: "Garderies", subsidized: "Garderie subventionnée", cpe: "CPE", about: "À propos" },
    footer: { tagline: "La recherche de garde pensée pour les familles au Québec.", privacy: "Confidentialité", terms: "Conditions", cookies: "Témoins" },
    home: {
      eyebrow: "Québec · Recherche de garde", title: "Trouvez une place en garderie près de chez vous.",
      intro: "Un moteur de recherche simple pour trouver les options de garde qui correspondent à votre secteur, à l’âge de votre enfant et à votre date de besoin.",
      location: "Ville ou code postal", age: "Âge de l’enfant", type: "Type de garde", search: "Rechercher",
      ages: { a: "0–18 mois", b: "18–36 mois", c: "3–5 ans" },
      types: { cpe: "CPE", subsidized: "Garderie subventionnée", family: "Milieu familial", private: "Garderie non subventionnée" },
      why: "Pourquoi nous", notDirectory: "Pas seulement une liste de garderies.",
      cards: ["Recherche locale", "Disponibilité utile", "Une solution complète"],
      cardText: ["Commencez par votre ville ou votre secteur et trouvez les options pertinentes autour de vous.", "Notre objectif est de rendre visible la fraîcheur de l’information plutôt qu’une disponibilité impossible à vérifier.", "À terme : place régulière, garde alternative, remplacement et solutions ponctuelles depuis un même espace."],
      local: "Recherche locale", cities: "Garderies par ville"
    },
    pages: { searchTitle: "Trouver une garderie près de chez vous", searchDesc: "Recherchez des garderies, CPE et milieux familiaux selon votre secteur, l’âge de votre enfant et vos besoins.", subsidizedTitle: "Garderies subventionnées au Québec", cpeTitle: "CPE au Québec", aboutTitle: "À propos", privacyTitle: "Politique de confidentialité", termsTitle: "Conditions d’utilisation", cookiesTitle: "Témoins" }
  },
  en: {
    nav: { search: "Daycares", subsidized: "Subsidized daycare", cpe: "CPE", about: "About" },
    footer: { tagline: "Childcare search designed for families in Quebec.", privacy: "Privacy", terms: "Terms", cookies: "Cookies" },
    home: {
      eyebrow: "Quebec · Childcare search", title: "Find a childcare spot near you.",
      intro: "A simple search engine to find childcare options that fit your area, your child’s age and when you need care.",
      location: "City or postal code", age: "Child’s age", type: "Childcare type", search: "Search",
      ages: { a: "0–18 months", b: "18–36 months", c: "3–5 years" },
      types: { cpe: "CPE", subsidized: "Subsidized daycare", family: "Home daycare", private: "Non-subsidized daycare" },
      why: "Why us", notDirectory: "More than a daycare directory.",
      cards: ["Local search", "Useful availability", "A complete solution"],
      cardText: ["Start with your city or area and find the childcare options that matter around you.", "Our goal is to show how fresh the information is, instead of relying on availability that cannot be checked.", "Over time: regular care, backup care, replacements and occasional solutions from one place."],
      local: "Local search", cities: "Daycares by city"
    },
    pages: { searchTitle: "Find a daycare near you", searchDesc: "Search daycares, CPEs and home daycares by area, child age and childcare needs.", subsidizedTitle: "Subsidized daycares in Quebec", cpeTitle: "CPEs in Quebec", aboutTitle: "About", privacyTitle: "Privacy policy", termsTitle: "Terms of use", cookiesTitle: "Cookies" }
  }
} as const;

export function getDictionary(locale: Locale) { return dictionaries[locale]; }

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const dictionaries = {
  fr: {
    nav: {
      search: "Trouver une garde",
      subsidized: "Garderies subventionnées",
      cpe: "CPE",
      about: "À propos",
      cta: "Rechercher",
    },
    footer: {
      tagline: "La garde de votre famille, simplement.",
      privacy: "Confidentialité",
      terms: "Conditions",
      cookies: "Témoins",
    },
    home: {
      eyebrow: "Québec · Canada · Garde d’enfants",
      title: "La garde de votre famille, simplement.",
      intro: "Trouvez une garderie, un CPE ou un service de garde près de chez vous. MyCoco vous aide à trouver une solution qui s’adapte à votre famille.",
      location: "Ville ou code postal",
      age: "Âge de l’enfant",
      type: "Type de garde",
      search: "Rechercher",
      ages: { a: "0–18 mois", b: "18–36 mois", c: "3–5 ans" },
      types: {
        cpe: "CPE",
        subsidized: "Garderie subventionnée",
        family: "Milieu familial",
        private: "Garderie non subventionnée",
      },
      why: "POUR LES FAMILLES",
      notDirectory: "Plus qu’un annuaire de garderies.",
      cards: ["Trouver", "Comprendre", "Être accompagné"],
      cardText: [
        "Recherchez les options de garde qui correspondent à votre secteur et aux besoins de votre enfant.",
        "Comparez les types de services et voyez plus clairement les informations disponibles avant de contacter un service.",
        "Aujourd’hui, une recherche simple. Demain, un espace pour organiser votre garde et trouver une solution quand vos plans changent.",
      ],
      local: "PRÈS DE CHEZ VOUS",
      cities: "Trouvez une garderie près de chez vous",
    },
    pages: {
      searchTitle: "Trouver une garderie près de chez vous",
      searchDesc: "Recherchez des garderies, CPE et services de garde en milieu familial selon votre secteur, l’âge de votre enfant et vos besoins.",
      subsidizedTitle: "Garderies subventionnées au Québec",
      cpeTitle: "CPE au Québec",
      aboutTitle: "À propos de MyCoco",
      privacyTitle: "Politique de confidentialité",
      termsTitle: "Conditions d’utilisation",
      cookiesTitle: "Témoins",
    },
  },
  en: {
    nav: {
      search: "Find childcare",
      subsidized: "Subsidized daycare",
      cpe: "CPE",
      about: "About",
      cta: "Search",
    },
    footer: {
      tagline: "Your family’s childcare, made simpler.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    },
    home: {
      eyebrow: "Quebec · Canada · Childcare",
      title: "Your family’s childcare, made simpler.",
      intro: "Find a daycare, CPE or childcare service near you. MyCoco helps you find a solution that fits your family.",
      location: "City or postal code",
      age: "Child’s age",
      type: "Childcare type",
      search: "Search",
      ages: { a: "0–18 months", b: "18–36 months", c: "3–5 years" },
      types: {
        cpe: "CPE",
        subsidized: "Subsidized daycare",
        family: "Home daycare",
        private: "Non-subsidized daycare",
      },
      why: "FOR FAMILIES",
      notDirectory: "More than a daycare directory.",
      cards: ["Find", "Understand", "Stay supported"],
      cardText: [
        "Search childcare options that match your area and your child’s needs.",
        "Compare service types and get clearer information before contacting a childcare provider.",
        "A simple search today. A complete family-care space tomorrow, built for when plans change.",
      ],
      local: "NEAR YOU",
      cities: "Find childcare near you",
    },
    pages: {
      searchTitle: "Find a daycare near you",
      searchDesc: "Search daycares, CPEs and home daycares by area, child age and childcare needs.",
      subsidizedTitle: "Subsidized daycares in Quebec",
      cpeTitle: "CPEs in Quebec",
      aboutTitle: "About MyCoco",
      privacyTitle: "Privacy policy",
      termsTitle: "Terms of use",
      cookiesTitle: "Cookies",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

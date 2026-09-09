export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }

export const dictionaries = {
  fr: {
    nav: { search: "Trouver une garde", need: "Mon besoin", subsidized: "Solutions de garde", cpe: "CPE", about: "À propos", cta: "Trouver ma solution" },
    footer: { tagline: "La garde de votre famille, simplement.", trust: "Pensé au Québec pour les familles d’ici.", privacy: "Confidentialité", security: "Sécurité", terms: "Conditions", cookies: "Témoins" },
    home: {
      eyebrow: "Québec · Canada · Vie familiale",
      title: "La garde qui s’adapte à votre famille.",
      intro: "Trouvez une garderie, un CPE ou un service de garde près de chez vous. MyCoco vous aide à trouver une solution qui correspond à votre réalité.",
      location: "Ville ou code postal", age: "Âge de l’enfant", type: "Type de garde", search: "Rechercher",
      ages: { a: "0–18 mois", b: "18–36 mois", c: "3–5 ans" },
      types: { cpe: "CPE", subsidized: "Garderie subventionnée", family: "Milieu familial", private: "Garderie non subventionnée" },
      why: "POUR LES FAMILLES", notDirectory: "Pas seulement trouver une place. Trouver la bonne solution.",
      cards: ["Trouver", "Comprendre", "Être accompagné"],
      cardText: ["Recherchez les options de garde qui correspondent à votre secteur et aux besoins de votre enfant.", "Comparez les types de services et voyez plus clairement les informations disponibles avant de contacter un service.", "Aujourd’hui, une recherche simple. Demain, un espace pour organiser votre garde et trouver une solution quand vos plans changent."],
      local: "PRÈS DE CHEZ VOUS", cities: "Trouvez une garderie près de chez vous",
    },
    pages: {
      searchTitle: "Trouvez la bonne solution de garde près de chez vous",
      searchDesc: "Recherchez des garderies, CPE et services de garde en milieu familial selon votre secteur, l’âge de votre enfant et vos besoins.",
      subsidizedTitle: "Garderies subventionnées au Québec", cpeTitle: "CPE au Québec", aboutTitle: "À propos de MyCoco", privacyTitle: "Politique de confidentialité", termsTitle: "Conditions d’utilisation", cookiesTitle: "Gestion des témoins", securityTitle: "Sécurité et protection des données",
    },
  },
  en: {
    nav: { search: "Find childcare", need: "My need", subsidized: "Childcare solutions", cpe: "CPE", about: "About", cta: "Find my solution" },
    footer: { tagline: "Childcare for your family, made simple.", trust: "Built in Quebec for Canadian families.", privacy: "Privacy", security: "Security", terms: "Terms", cookies: "Cookies" },
    home: {
      eyebrow: "Quebec · Canada · Family life",
      title: "Childcare that fits your family.",
      intro: "Find a daycare, CPE or childcare service near you. MyCoco helps you find a solution that fits your family.",
      location: "City or postal code", age: "Child’s age", type: "Childcare type", search: "Search",
      ages: { a: "0–18 months", b: "18–36 months", c: "3–5 years" },
      types: { cpe: "CPE", subsidized: "Subsidized daycare", family: "Home daycare", private: "Non-subsidized daycare" },
      why: "FOR FAMILIES", notDirectory: "Not just finding a place. Finding the right solution.",
      cards: ["Find", "Understand", "Stay supported"],
      cardText: ["Search childcare options that match your area and your child’s needs.", "Compare service types and get clearer information before contacting a childcare provider.", "A simple search today. A family-care space tomorrow, built for when plans change."],
      local: "NEAR YOU", cities: "Find childcare near you",
    },
    pages: {
      searchTitle: "Find the right childcare solution near you",
      searchDesc: "Search daycares, CPEs and home daycares by area, child age and childcare needs.",
      subsidizedTitle: "Subsidized daycares in Quebec", cpeTitle: "CPEs in Quebec", aboutTitle: "About MyCoco", privacyTitle: "Privacy policy", termsTitle: "Terms of use", cookiesTitle: "Cookie management", securityTitle: "Security and data protection",
    },
  },
} as const;

export function getDictionary(locale: Locale) { return dictionaries[locale]; }

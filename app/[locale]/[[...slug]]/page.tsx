import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, type Locale, getDictionary, locales } from "@/lib/i18n";
import { cities, site } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type SearchParams = Record<string, string | string[] | undefined>;

type Provider = {
  slug: string;
  name: string;
  type: string;
  area: string;
  ages: string;
  hours: string;
  status: string;
  statusTone: "green" | "neutral";
  note: string;
  description: string;
  features: string[];
};

const demoProviders: Provider[] = [
  { slug: "milieu-familial-mirabel", name: "Exemple — Milieu familial", type: "Milieu familial", area: "Mirabel", ages: "0–5 ans", hours: "Lun–Ven · 7 h–17 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — aucune disponibilité réelle n’est revendiquée.", description: "Une fiche exemple pour illustrer la façon dont MyCoco présentera les services de garde en milieu familial.", features: ["Milieu familial", "0–5 ans", "Horaire de semaine"] },
  { slug: "garderie-subventionnee-blainville", name: "Exemple — Garderie subventionnée", type: "Garderie subventionnée", area: "Blainville", ages: "18 mois–5 ans", hours: "Lun–Ven · 7 h–18 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — la disponibilité sera connectée à la base de données.", description: "Une fiche exemple pour illustrer une garderie subventionnée et les informations utiles aux familles.", features: ["Subventionnée", "18 mois–5 ans", "Horaire de semaine"] },
  { slug: "cpe-saint-eustache", name: "Exemple — CPE", type: "CPE", area: "Saint-Eustache", ages: "0–5 ans", hours: "Lun–Ven · 7 h–18 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — aucune place disponible n’est annoncée.", description: "Une fiche exemple pour présenter un CPE avec une information claire, structurée et orientée famille.", features: ["CPE", "0–5 ans", "Horaire de semaine"] },
  { slug: "garderie-privee-boisbriand", name: "Exemple — Garderie privée", type: "Garderie non subventionnée", area: "Boisbriand", ages: "0–5 ans", hours: "Lun–Ven · 6 h 30–18 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — données réelles à venir.", description: "Une fiche exemple pour une garderie non subventionnée, pensée pour évoluer avec les données réelles de MyCoco.", features: ["Non subventionnée", "0–5 ans", "Horaire étendu"] },
];

function value(params: SearchParams, key: string) {
  const raw = params[key];
  return Array.isArray(raw) ? raw[0] ?? "" : raw ?? "";
}

function searchCopy(locale: Locale) {
  const fr = locale === "fr";
  return {
    title: fr ? "Trouvez une solution de garde près de chez vous" : "Find childcare near you",
    intro: fr ? "Affinez votre recherche par secteur, âge et type de garde." : "Refine your search by area, child age and childcare type.",
    location: fr ? "Ville ou code postal" : "City or postal code",
    age: fr ? "Âge de l’enfant" : "Child’s age",
    type: fr ? "Type de garde" : "Childcare type",
    all: fr ? "Tous les types" : "All types",
    search: fr ? "Mettre à jour" : "Update search",
    filters: fr ? "Filtres" : "Filters",
    results: fr ? "options trouvées" : "options found",
    near: fr ? "Options près de vous" : "Options near you",
    freshness: fr ? "La fraîcheur de l’information sera affichée ici dès que les données seront connectées." : "Information freshness will appear here once live data is connected.",
    demo: fr ? "Aperçu de l’expérience" : "Experience preview",
    demoText: fr ? "Ces fiches sont des exemples visuels. Elles ne représentent pas des places réellement disponibles." : "These cards are visual examples. They do not represent real available childcare spots.",
    noData: fr ? "Aucune option ne correspond à cette recherche" : "No options match this search",
    noDataText: fr ? "Essayez une autre ville ou retirez un filtre pour élargir votre recherche." : "Try another city or remove a filter to broaden your search.",
    regular: fr ? "Garde régulière" : "Regular care",
    ageOptions: fr ? ["Tous les âges", "0–18 mois", "18–36 mois", "3–5 ans"] : ["All ages", "0–18 months", "18–36 months", "3–5 years"],
    typeOptions: fr ? ["CPE", "Garderie subventionnée", "Milieu familial", "Garderie non subventionnée"] : ["CPE", "Subsidized daycare", "Home daycare", "Non-subsidized daycare"],
    view: fr ? "Voir la fiche" : "View listing",
  };
}

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>; }
function PinIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10.5c0 5.2-8 10.5-8 10.5S4 15.7 4 10.5a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10.5" r="2.5"/></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>; }
function SparkIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></svg>; }

function SearchExperience({ locale, params }: { locale: Locale; params: SearchParams }) {
  const fr = locale === "fr";
  const c = searchCopy(locale);
  const ville = value(params, "ville");
  const age = value(params, "age");
  const type = value(params, "type");
  const filtered = demoProviders.filter((provider) => {
    const cityMatch = !ville || provider.area.toLowerCase().includes(ville.toLowerCase());
    const typeNeedle = type === "subventionnee" ? (fr ? "subvention" : "subsid") : type.replaceAll("-", " ").toLowerCase();
    const typeMatch = !type || provider.type.toLowerCase().includes(typeNeedle);
    return cityMatch && typeMatch;
  });

  return <main className="search-page">
    <section className="search-hero"><div className="section-inner">
      <div className="search-breadcrumb"><Link href={`/${locale}`}>{site.name}</Link><span>›</span><span>{fr ? "Recherche" : "Search"}</span></div>
      <span className="eyebrow">{fr ? "Recherche de garde" : "Childcare search"}</span>
      <h1>{c.title}</h1><p className="search-page-intro">{c.intro}</p>
      <form className="results-search" action={`/${locale}/garderies`} method="get">
        <label><span>{c.location}</span><div className="input-wrap"><PinIcon /><input name="ville" defaultValue={ville} placeholder={fr ? "Ex. Mirabel ou J7J 1A1" : "e.g. Mirabel or J7J 1A1"} autoComplete="postal-code" /></div></label>
        <label><span>{c.age}</span><select name="age" defaultValue={age}><option value="">{c.ageOptions[0]}</option><option value="0-18">{c.ageOptions[1]}</option><option value="18-36">{c.ageOptions[2]}</option><option value="3-5">{c.ageOptions[3]}</option></select></label>
        <label><span>{c.type}</span><select name="type" defaultValue={type}><option value="">{c.all}</option><option value="cpe">{c.typeOptions[0]}</option><option value="subventionnee">{c.typeOptions[1]}</option><option value="milieu-familial">{c.typeOptions[2]}</option><option value="non-subventionnee">{c.typeOptions[3]}</option></select></label>
        <button className="primary-button" type="submit"><SearchIcon />{c.search}</button>
      </form>
    </div></section>
    <section className="results-shell"><div className="section-inner">
      <div className="results-toolbar"><div><span className="eyebrow">{c.near}</span><h2>{filtered.length} <span>{c.results}</span></h2></div><div className="result-context"><ClockIcon /><span>{c.freshness}</span></div></div>
      <div className="results-layout">
        <aside className="filter-panel"><div className="filter-title"><span>{c.filters}</span><span className="filter-icon"><SparkIcon /></span></div><div className="filter-group"><strong>{c.regular}</strong><p>{fr ? "Comparez les options qui correspondent au rythme de votre famille." : "Compare options that fit your family’s routine."}</p></div><div className="filter-group"><strong>{fr ? "Votre recherche" : "Your search"}</strong><dl><div><dt>{c.location}</dt><dd>{ville || (fr ? "Toutes les zones" : "All areas")}</dd></div><div><dt>{c.age}</dt><dd>{age || c.ageOptions[0]}</dd></div><div><dt>{c.type}</dt><dd>{type || c.all}</dd></div></dl></div></aside>
        <div className="results-list"><div className="demo-notice"><div className="notice-icon"><SparkIcon /></div><div><strong>{c.demo}</strong><p>{c.demoText}</p></div></div>
          {filtered.map((provider) => <article className="provider-card" key={provider.slug}><div className="provider-main"><div className="provider-avatar" aria-hidden="true">{provider.type === "CPE" ? "C" : "G"}</div><div className="provider-copy"><div className="provider-topline"><span className="provider-type">{provider.type}</span><span className={`status status-${provider.statusTone}`}>{provider.status}</span></div><h3>{provider.name}</h3><div className="provider-meta"><span><PinIcon />{provider.area}</span><span><ClockIcon />{provider.hours}</span></div><p>{provider.ages}</p></div></div><div className="provider-footer"><span>{provider.note}</span><Link href={`/${locale}/garderie/${provider.slug}`} className="text-link">{c.view} <span aria-hidden="true">→</span></Link></div></article>)}
          {!filtered.length && <div className="empty-state"><h3>{c.noData}</h3><p>{c.noDataText}</p><Link className="secondary-button" href={`/${locale}/garderies`}>{fr ? "Réinitialiser la recherche" : "Reset search"}</Link></div>}
        </div>
      </div>
    </div></section>
  </main>;
}

function ProviderPage({ locale, provider }: { locale: Locale; provider: Provider }) {
  const fr = locale === "fr";
  return <main className="provider-page"><section className="provider-hero"><div className="section-inner"><div className="search-breadcrumb"><Link href={`/${locale}/garderies`}>{fr ? "Recherche" : "Search"}</Link><span>›</span><span>{provider.area}</span></div><div className="provider-profile-head"><div className="provider-avatar provider-avatar-large" aria-hidden="true">{provider.type === "CPE" ? "C" : "G"}</div><div><span className="provider-type">{provider.type}</span><h1>{provider.name}</h1><div className="provider-meta"><span><PinIcon />{provider.area}, Québec</span><span><ClockIcon />{provider.hours}</span></div></div></div><div className="provider-status-banner"><SparkIcon /><div><strong>{provider.status}</strong><span>{fr ? "MyCoco affichera la date de mise à jour dès que la donnée sera connectée." : "MyCoco will show the update date once live data is connected."}</span></div></div></div></section><section className="provider-detail-shell"><div className="section-inner provider-detail-grid"><div className="provider-detail-main"><span className="eyebrow">{fr ? "À propos" : "About"}</span><h2>{fr ? "Une information claire pour choisir sereinement." : "Clear information to help families choose with confidence."}</h2><p>{provider.description}</p><div className="provider-feature-grid">{provider.features.map((feature) => <div className="provider-feature" key={feature}><SparkIcon /><span>{feature}</span></div>)}</div></div><aside className="provider-contact-card"><span className="eyebrow">{fr ? "Prochaine étape" : "Next step"}</span><h2>{fr ? "Vous cherchez une solution de garde ?" : "Looking for childcare?"}</h2><p>{fr ? "Revenez à la recherche pour comparer les options autour de vous." : "Return to search to compare childcare options near you."}</p><Link className="primary-button" href={`/${locale}/garderies`}>{fr ? "Trouver ma solution" : "Find my solution"}</Link><small>{fr ? "Aucune disponibilité réelle n’est annoncée sur cette fiche de démonstration." : "No real availability is claimed on this demo profile."}</small></aside></div></section></main>;
}

function copy(locale: Locale, slug: string[]) {
  const d = getDictionary(locale); const fr = locale === "fr";
  const city = slug[0] === "garderie" && slug[1] ? cities.find((c) => c.slug === slug[1]) : null;
  const title = city ? (fr ? `Garderies à ${city.name}` : `Daycares in ${city.name}`) : slug[0] === "cpe" ? d.pages.cpeTitle : slug[0] === "garderie-subventionnee" ? d.pages.subsidizedTitle : slug[0] === "garderies" ? d.pages.searchTitle : slug[0] === "a-propos" ? d.pages.aboutTitle : slug[0] === "confidentialite" ? d.pages.privacyTitle : slug[0] === "conditions" ? d.pages.termsTitle : slug[0] === "temoins" ? d.pages.cookiesTitle : null;
  return title ? { title, description: city ? (fr ? `Trouvez des options de garde à ${city.name}.` : `Find childcare options in ${city.name}, Quebec.`) : d.pages.searchDesc } : null;
}

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string; slug?: string[] }>; searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const { locale: raw, slug = [] } = await params; if (!isLocale(raw)) return {}; const locale = raw as Locale;
  if (slug[0] === "garderies") { const query = await searchParams; const hasQuery = Object.values(query).some(Boolean); const c = searchCopy(locale); return { title: c.title, description: c.intro, robots: hasQuery ? { index: false, follow: true } : { index: true, follow: true }, alternates: { canonical: `/${locale}/garderies`, languages: { "fr-CA": "/fr/garderies", "en-CA": "/en/garderies", "x-default": "/fr/garderies" } }, openGraph: { title: c.title, description: c.intro, locale: locale === "fr" ? "fr_CA" : "en_CA", siteName: site.name, type: "website" } }; }
  if (slug[0] === "garderie" && slug[1]) { const provider = demoProviders.find((item) => item.slug === slug[1]); if (provider) { const title = `${provider.name} | ${provider.area}`; const description = locale === "fr" ? `${provider.type} à ${provider.area}. Découvrez les informations de garde présentées par MyCoco.` : `${provider.type} in ${provider.area}. Discover childcare information presented by MyCoco.`; return { title, description, robots: { index: false, follow: true }, alternates: { canonical: `/${locale}/garderie/${provider.slug}`, languages: { "fr-CA": `/fr/garderie/${provider.slug}`, "en-CA": `/en/garderie/${provider.slug}`, "x-default": `/fr/garderie/${provider.slug}` } }, openGraph: { title, description, locale: locale === "fr" ? "fr_CA" : "en_CA", siteName: site.name, type: "website" } }; } }
  const c = copy(locale, slug); if (!c) return {}; const suffix = `/${slug.join("/")}`; return { title: c.title, description: c.description, alternates: { canonical: `/${locale}${suffix}`, languages: { "fr-CA": `/fr${suffix}`, "en-CA": `/en${suffix}`, "x-default": `/fr${suffix}` } }, openGraph: { title: c.title, description: c.description, locale: locale === "fr" ? "fr_CA" : "en_CA", siteName: site.name, type: "website" } };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string; slug?: string[] }>; searchParams: Promise<SearchParams> }) {
  const { locale: raw, slug = [] } = await params; if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  if (slug[0] === "garderies") return <SearchExperience locale={locale} params={await searchParams} />;
  if (slug[0] === "garderie" && slug[1]) { const provider = demoProviders.find((item) => item.slug === slug[1]); if (!provider) notFound(); return <ProviderPage locale={locale} provider={provider} />; }
  if (!slug.length) return null;
  const d = getDictionary(locale); const fr = locale === "fr"; const c = copy(locale, slug); if (!c) notFound();
  return <section><div className="section-inner"><span className="eyebrow">{fr ? "Québec" : "Quebec"}</span><h1>{c.title}</h1><p>{c.description}</p>{!slug.includes("confidentialite") && !slug.includes("conditions") && !slug.includes("temoins") && <Link className="button-link" href={`/${locale}/garderies`}>{d.home.search}</Link>}</div></section>;
}

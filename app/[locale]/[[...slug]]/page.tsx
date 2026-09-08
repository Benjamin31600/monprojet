import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale, type Locale, getDictionary, locales } from "@/lib/i18n";
import { cities, site } from "@/lib/site";

type SearchParams = Record<string, string | string[] | undefined>;

type Provider = {
  slug: string; name: string; type: string; area: string; ages: string; hours: string;
  status: string; statusTone: "green" | "neutral"; note: string; description: string; features: string[];
  ageMin: number; ageMax: number;
};

const demoProviders: Provider[] = [
  { slug: "milieu-familial-mirabel", name: "Exemple — Milieu familial", type: "Milieu familial", area: "Mirabel", ages: "0–5 ans", hours: "Lun–Ven · 7 h–17 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — aucune disponibilité réelle n’est revendiquée.", description: "Une fiche exemple pour illustrer une solution de garde en milieu familial et les informations utiles aux familles.", features: ["Milieu familial", "0–5 ans", "Horaire de semaine"], ageMin: 0, ageMax: 60 },
  { slug: "garderie-subventionnee-blainville", name: "Exemple — Garderie subventionnée", type: "Garderie subventionnée", area: "Blainville", ages: "18 mois–5 ans", hours: "Lun–Ven · 7 h–18 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — la disponibilité sera connectée à la base de données.", description: "Une fiche exemple pour illustrer une garderie subventionnée et aider les familles à comparer les options de leur secteur.", features: ["Subventionnée", "18 mois–5 ans", "Horaire de semaine"], ageMin: 18, ageMax: 60 },
  { slug: "cpe-saint-eustache", name: "Exemple — CPE", type: "CPE", area: "Saint-Eustache", ages: "0–5 ans", hours: "Lun–Ven · 7 h–18 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — aucune place disponible n’est annoncée.", description: "Une fiche exemple pour présenter un CPE avec une information structurée et orientée vers les besoins des familles.", features: ["CPE", "0–5 ans", "Horaire de semaine"], ageMin: 0, ageMax: 60 },
  { slug: "garderie-privee-boisbriand", name: "Exemple — Garderie privée", type: "Garderie non subventionnée", area: "Boisbriand", ages: "0–5 ans", hours: "Lun–Ven · 6 h 30–18 h", status: "Données à confirmer", statusTone: "neutral", note: "Fiche de démonstration — données réelles à venir.", description: "Une fiche exemple pour une garderie non subventionnée, conçue pour évoluer avec les données réelles de MyCoco.", features: ["Non subventionnée", "0–5 ans", "Horaire étendu"], ageMin: 0, ageMax: 60 },
];

function value(params: SearchParams, key: string) { const raw = params[key]; return Array.isArray(raw) ? raw[0] ?? "" : raw ?? ""; }
function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/></svg>; }
function PinIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10.5c0 5.2-8 10.5-8 10.5S4 15.7 4 10.5a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10.5" r="2.5"/></svg>; }
function ClockIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>; }
function SparkIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z"/></svg>; }

function searchCopy(locale: Locale) {
  const fr = locale === "fr";
  return {
    title: fr ? "Trouvez une solution de garde près de chez vous" : "Find childcare near you",
    intro: fr ? "Recherchez des garderies, CPE et services de garde en milieu familial selon votre secteur, l’âge de votre enfant et votre réalité familiale." : "Search daycares, CPEs and home daycares by area, your child’s age and your family’s needs.",
    location: fr ? "Ville ou code postal" : "City or postal code", age: fr ? "Âge de l’enfant" : "Child’s age", type: fr ? "Type de garde" : "Childcare type",
    all: fr ? "Tous les types" : "All types", search: fr ? "Rechercher" : "Search", filters: fr ? "Votre recherche" : "Your search", results: fr ? "options trouvées" : "options found",
    near: fr ? "Options de garde" : "Childcare options", demo: fr ? "Aperçu de l’expérience" : "Experience preview",
    demoText: fr ? "Ces fiches illustrent l’expérience MyCoco. Elles ne représentent pas des places réellement disponibles." : "These profiles illustrate the MyCoco experience. They do not represent real available childcare spots.",
    noData: fr ? "Aucune option ne correspond à votre recherche" : "No options match your search",
    noDataText: fr ? "Essayez une autre ville ou retirez un filtre pour élargir votre recherche." : "Try another city or remove a filter to broaden your search.",
    ages: fr ? ["Tous les âges", "0–18 mois", "18–36 mois", "3–5 ans"] : ["All ages", "0–18 months", "18–36 months", "3–5 years"],
    types: fr ? ["CPE", "Garderie subventionnée", "Milieu familial", "Garderie non subventionnée"] : ["CPE", "Subsidized daycare", "Home daycare", "Non-subsidized daycare"],
    view: fr ? "Voir la fiche" : "View profile", reset: fr ? "Réinitialiser" : "Reset search"
  };
}

function matchesAge(provider: Provider, age: string) {
  if (!age) return true;
  const range: Record<string, [number, number]> = { "0-18": [0, 18], "18-36": [18, 36], "3-5": [36, 60] };
  const selected = range[age]; return !selected || provider.ageMin <= selected[1] && provider.ageMax >= selected[0];
}
function matchesType(provider: Provider, type: string) {
  if (!type) return true;
  const map: Record<string, string> = { cpe: "cpe", subventionnee: "subvention", "milieu-familial": "milieu familial", "non-subventionnee": "non subventionnee" };
  return provider.type.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(map[type] ?? type.replaceAll("-", " "));
}

function SearchExperience({ locale, params }: { locale: Locale; params: SearchParams }) {
  const fr = locale === "fr", c = searchCopy(locale), ville = value(params, "ville"), age = value(params, "age"), type = value(params, "type");
  const normalizedVille = ville.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const filtered = demoProviders.filter(p => (!ville || p.area.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedVille)) && matchesAge(p, age) && matchesType(p, type));
  return <main className="search-page">
    <section className="search-hero"><div className="section-inner"><div className="search-breadcrumb"><Link href={`/${locale}`}>{site.name}</Link><span>›</span><span>{fr ? "Recherche" : "Search"}</span></div><span className="eyebrow">{fr ? "Recherche de garde" : "Childcare search"}</span><h1>{c.title}</h1><p className="search-page-intro">{c.intro}</p>
      <form className="results-search" action={`/${locale}/garderies`} method="get"><label><span>{c.location}</span><div className="input-wrap"><PinIcon/><input name="ville" defaultValue={ville} placeholder={fr ? "Ex. Mirabel ou J7J 1A1" : "e.g. Mirabel or J7J 1A1"} autoComplete="postal-code"/></div></label><label><span>{c.age}</span><select name="age" defaultValue={age}><option value="">{c.ages[0]}</option><option value="0-18">{c.ages[1]}</option><option value="18-36">{c.ages[2]}</option><option value="3-5">{c.ages[3]}</option></select></label><label><span>{c.type}</span><select name="type" defaultValue={type}><option value="">{c.all}</option><option value="cpe">{c.types[0]}</option><option value="subventionnee">{c.types[1]}</option><option value="milieu-familial">{c.types[2]}</option><option value="non-subventionnee">{c.types[3]}</option></select></label><button className="primary-button" type="submit"><SearchIcon/>{c.search}</button></form>
    </div></section>
    <section className="results-shell"><div className="section-inner"><div className="results-toolbar"><div><span className="eyebrow">{c.near}</span><h2>{filtered.length} <span>{c.results}</span></h2></div><div className="result-context"><ClockIcon/><span>{fr ? "Les disponibilités réelles seront indiquées avec leur date de mise à jour." : "Live availability will be shown with its update date."}</span></div></div>
      <div className="results-layout"><aside className="filter-panel"><div className="filter-title"><span>{c.filters}</span><span className="filter-icon"><SparkIcon/></span></div><div className="filter-group"><strong>{fr ? "Critères actifs" : "Active criteria"}</strong><dl><div><dt>{c.location}</dt><dd>{ville || (fr ? "Toutes les zones" : "All areas")}</dd></div><div><dt>{c.age}</dt><dd>{age ? c.ages[{"0-18":1,"18-36":2,"3-5":3}[age] ?? 0] : c.ages[0]}</dd></div><div><dt>{c.type}</dt><dd>{type ? c.types[{cpe:0,subventionnee:1,"milieu-familial":2,"non-subventionnee":3}[type] ?? 0] : c.all}</dd></div></dl></div></aside>
        <div className="results-list"><div className="demo-notice"><div className="notice-icon"><SparkIcon/></div><div><strong>{c.demo}</strong><p>{c.demoText}</p></div></div>{filtered.map(p => <article className="provider-card" key={p.slug}><div className="provider-main"><div className="provider-avatar" aria-hidden="true">{p.type === "CPE" ? "C" : "G"}</div><div className="provider-copy"><div className="provider-topline"><span className="provider-type">{p.type}</span><span className={`status status-${p.statusTone}`}>{p.status}</span></div><h3>{p.name}</h3><div className="provider-meta"><span><PinIcon/>{p.area}</span><span><ClockIcon/>{p.hours}</span></div><p>{p.ages}</p></div></div><div className="provider-footer"><span>{p.note}</span><Link href={`/${locale}/garderie/${p.slug}`} className="text-link">{c.view} <span aria-hidden="true">→</span></Link></div></article>)}{!filtered.length && <div className="empty-state"><h3>{c.noData}</h3><p>{c.noDataText}</p><Link className="secondary-button" href={`/${locale}/garderies`}>{c.reset}</Link></div>}</div>
      </div></div></section>
  </main>;
}

function ProviderPage({ locale, provider }: { locale: Locale; provider: Provider }) {
  const fr = locale === "fr";
  const jsonLd = { "@context": "https://schema.org", "@type": "ChildCare", name: provider.name, description: provider.description, areaServed: provider.area, address: { "@type": "PostalAddress", addressLocality: provider.area, addressRegion: "QC", addressCountry: "CA" } };
  return <main className="provider-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/><section className="provider-hero"><div className="section-inner"><div className="search-breadcrumb"><Link href={`/${locale}/garderies`}>{fr ? "Recherche" : "Search"}</Link><span>›</span><span>{provider.area}</span></div><div className="provider-profile-head"><div className="provider-avatar provider-avatar-large" aria-hidden="true">{provider.type === "CPE" ? "C" : "G"}</div><div><span className="provider-type">{provider.type}</span><h1>{provider.name}</h1><div className="provider-meta"><span><PinIcon/>{provider.area}, Québec</span><span><ClockIcon/>{provider.hours}</span></div></div></div><div className="provider-status-banner"><SparkIcon/><div><strong>{provider.status}</strong><span>{fr ? "La date de mise à jour apparaîtra lorsque les données réelles seront connectées." : "The update date will appear once live data is connected."}</span></div></div></div></section><section className="provider-detail-shell"><div className="section-inner provider-detail-grid"><div className="provider-detail-main"><span className="eyebrow">{fr ? "À propos" : "About"}</span><h2>{fr ? "Une information claire pour choisir sereinement." : "Clear information to help families choose with confidence."}</h2><p>{provider.description}</p><div className="provider-feature-grid">{provider.features.map(f => <div className="provider-feature" key={f}><SparkIcon/><span>{f}</span></div>)}</div><div className="provider-seo-copy"><h2>{fr ? `Trouver une solution de garde à ${provider.area}` : `Find childcare in ${provider.area}`}</h2><p>{fr ? `MyCoco aide les familles à comparer les garderies, CPE et services de garde de ${provider.area} selon l’âge de leur enfant et leurs besoins. Les informations de disponibilité seront affichées avec leur niveau de fraîcheur dès que la base réelle sera connectée.` : `MyCoco helps families compare daycares, CPEs and childcare services in ${provider.area} based on their child’s age and needs. Availability information will be shown with its freshness once the live database is connected.`}</p></div></div><aside className="provider-contact-card"><span className="eyebrow">{fr ? "Prochaine étape" : "Next step"}</span><h2>{fr ? "Vous cherchez une solution de garde ?" : "Looking for childcare?"}</h2><p>{fr ? "Comparez les options disponibles dans votre secteur avec MyCoco." : "Compare childcare options in your area with MyCoco."}</p><Link className="primary-button" href={`/${locale}/garderies`}>{fr ? "Trouver ma solution" : "Find my solution"}</Link><small>{fr ? "Cette fiche est actuellement une démonstration." : "This profile is currently a demonstration."}</small></aside></div></section></main>;
}

function cityData(locale: Locale, city: { slug: string; name: string }) { const fr = locale === "fr"; return { title: fr ? `Garderies à ${city.name}` : `Daycares in ${city.name}`, description: fr ? `Trouvez une garderie, un CPE ou un service de garde en milieu familial à ${city.name}. Comparez les options selon l’âge de votre enfant et vos besoins.` : `Find a daycare, CPE or home daycare in ${city.name}. Compare options by your child’s age and your family’s needs.` }; }

function copy(locale: Locale, slug: string[]) {
  const d = getDictionary(locale), fr = locale === "fr", city = slug[0] === "garderie" && slug[1] ? cities.find(c => c.slug === slug[1]) : null;
  if (city) return cityData(locale, city);
  const title = slug[0] === "cpe" ? d.pages.cpeTitle : slug[0] === "garderie-subventionnee" ? d.pages.subsidizedTitle : slug[0] === "garderies" ? d.pages.searchTitle : slug[0] === "a-propos" ? d.pages.aboutTitle : slug[0] === "confidentialite" ? d.pages.privacyTitle : slug[0] === "conditions" ? d.pages.termsTitle : slug[0] === "temoins" ? d.pages.cookiesTitle : null;
  return title ? { title, description: d.pages.searchDesc } : null;
}

export async function generateStaticParams() { return locales.flatMap(locale => [{ locale }, ...cities.map(city => ({ locale, slug: ["garderie", city.slug] }))]); }

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string; slug?: string[] }>; searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const { locale: raw, slug = [] } = await params; if (!isLocale(raw)) return {}; const locale = raw as Locale;
  if (slug[0] === "garderie" && slug[1]) { const city = cities.find(c => c.slug === slug[1]); if (!city) return {}; const c = cityData(locale, city); return { title: c.title, description: c.description, alternates: { canonical: `/${locale}/garderie/${city.slug}`, languages: { "fr-CA": `/fr/garderie/${city.slug}`, "en-CA": `/en/garderie/${city.slug}`, "x-default": `/fr/garderie/${city.slug}` } }, openGraph: { title: c.title, description: c.description, locale: locale === "fr" ? "fr_CA" : "en_CA", siteName: site.name, type: "website" } }; }
  if (slug[0] === "garderies") { const p = await searchParams, hasQuery = Object.values(p).some(Boolean), c = searchCopy(locale); return { title: c.title, description: c.intro, robots: hasQuery ? { index: false, follow: true } : { index: true, follow: true }, alternates: { canonical: `/${locale}/garderies`, languages: { "fr-CA": "/fr/garderies", "en-CA": "/en/garderies", "x-default": "/fr/garderies" } } }; }
  const c = copy(locale, slug); if (!c) return {}; const suffix = `/${slug.join("/")}`; return { title: c.title, description: c.description, alternates: { canonical: `/${locale}${suffix}`, languages: { "fr-CA": `/fr${suffix}`, "en-CA": `/en${suffix}`, "x-default": `/fr${suffix}` } } };
}

export default async function Page({ params, searchParams }: { params: Promise<{ locale: string; slug?: string[] }>; searchParams: Promise<SearchParams> }) {
  const { locale: raw, slug = [] } = await params; if (!isLocale(raw)) notFound(); const locale = raw as Locale;
  if (slug[0] === "garderies") return <SearchExperience locale={locale} params={await searchParams}/>;
  if (slug[0] === "garderie" && slug[1]) { const provider = demoProviders.find(p => p.slug === slug[1]); if (provider) return <ProviderPage locale={locale} provider={provider}/>; const city = cities.find(c => c.slug === slug[1]); if (city) { const c = cityData(locale, city); return <main className="local-seo-page"><div className="section-inner"><span className="eyebrow">{locale === "fr" ? "Québec · Recherche locale" : "Quebec · Local search"}</span><h1>{c.title}</h1><p>{c.description}</p><div className="local-seo-grid"><div><h2>{locale === "fr" ? "Les options à comparer" : "Options to compare"}</h2><p>{locale === "fr" ? "CPE, garderies subventionnées, garderies non subventionnées et milieux familiaux : MyCoco rassemble les informations utiles pour vous aider à choisir." : "CPEs, subsidized daycares, non-subsidized daycares and home daycares: MyCoco brings useful information together to help you choose."}</p></div><Link className="primary-button" href={`/${locale}/garderies`}>{locale === "fr" ? "Rechercher à proximité" : "Search nearby"}</Link></div></div></main>; } }
  if (!slug.length) return null; const d = getDictionary(locale), c = copy(locale, slug); if (!c) notFound(); return <section><div className="section-inner"><span className="eyebrow">{locale === "fr" ? "Québec" : "Quebec"}</span><h1>{c.title}</h1><p>{c.description}</p>{!slug.includes("confidentialite") && !slug.includes("conditions") && !slug.includes("temoins") && <Link className="button-link" href={`/${locale}/garderies`}>{d.home.search}</Link>}</div></section>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities } from "@/lib/site";
import { getChildcareData, typeLabel } from "@/lib/childcare";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((city) => ({ locale, city: city.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; city: string }> }): Promise<Metadata> {
  const { locale: raw, city: slug } = await params;
  if (!isLocale(raw)) return {};
  const city = cities.find((item) => item.slug === slug);
  if (!city) return {};
  const fr = raw === "fr";
  const title = fr ? `Garderies à ${city.name} | CPE et solutions de garde | MyCoco` : `Daycares in ${city.name} | CPEs and childcare | MyCoco`;
  const description = fr
    ? `Découvrez les garderies, CPE et services de garde répertoriés à ${city.name}. MyCoco vous aide à comparer les options et à structurer votre besoin.`
    : `Discover daycares, CPEs and childcare services listed in ${city.name}. MyCoco helps you compare options and structure your childcare need.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${raw}/garderies/${city.slug}`,
      languages: { "fr-CA": `/fr/garderies/${city.slug}`, "en-CA": `/en/garderies/${city.slug}` },
    },
    openGraph: { title, description, type: "website", siteName: "MyCoco" },
  };
}

export default async function CityChildcarePage({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale: raw, city: slug } = await params;
  if (!isLocale(raw)) notFound();
  const city = cities.find((item) => item.slug === slug);
  if (!city) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const data = await getChildcareData();
  const providers = data.records.filter((record) => record.city.toLowerCase().trim() === city.name.toLowerCase().trim());
  const counts = providers.reduce<Record<string, number>>((acc, record) => {
    const label = typeLabel(record.type, fr);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fr ? `Garderies à ${city.name}` : `Daycares in ${city.name}`,
    description: fr ? `Répertoire des solutions de garde à ${city.name}.` : `Directory of childcare solutions in ${city.name}.`,
    url: `/${locale}/garderies/${city.slug}`,
    isPartOf: { "@type": "WebSite", name: "MyCoco" },
  };

  return (
    <main className="city-landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="city-landing-hero">
        <div className="container">
          <div className="search-breadcrumb"><Link href={`/${locale}/garderies`}>{fr ? "Garderies" : "Childcare"}</Link><span>›</span><span>{city.name}</span></div>
          <p className="eyebrow">MYCOCO · {fr ? "RECHERCHE LOCALE" : "LOCAL SEARCH"}</p>
          <h1>{fr ? `Garderies et solutions de garde à ${city.name}` : `Daycares and childcare solutions in ${city.name}`}</h1>
          <p className="hero-copy">{fr ? `Explorez ${providers.length} établissement${providers.length === 1 ? "" : "s"} répertorié${providers.length === 1 ? "" : "s"} à ${city.name}. Utilisez ensuite MyCoco pour transformer votre recherche en besoin structuré.` : `Explore ${providers.length} listed childcare provider${providers.length === 1 ? "" : "s"} in ${city.name}. Then use MyCoco to turn your search into a structured need.`}</p>
          <div className="hero-actions"><Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"} →</Link></div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="city-landing-grid">
            <div>
              <div className="city-stat-card"><strong>{providers.length}</strong><span>{fr ? "établissements répertoriés" : "listed providers"}</span></div>
              <div className="city-type-grid">{Object.entries(counts).map(([label, count]) => <div className="city-type-card" key={label}><strong>{count}</strong><span>{label}</span></div>)}</div>
            </div>
            <aside className="city-activation-card"><span className="eyebrow">MYCOCO RADAR</span><h2>{fr ? "Ne cherchez pas établissement par établissement." : "Don't search provider by provider."}</h2><p>{fr ? "Dites-nous où vous cherchez, l’âge de votre enfant et le type de garde souhaité. MyCoco structure votre besoin et priorise les options selon les données disponibles." : "Tell us where you need care, your child's age and preferred childcare type. MyCoco structures your need and prioritizes options using available data."}</p><Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Créer mon besoin" : "Create my need"} →</Link></aside>
          </div>

          <div className="city-provider-section"><div className="results-toolbar"><div><p className="eyebrow">{fr ? `SOLUTIONS À ${city.name.toUpperCase()}` : `SOLUTIONS IN ${city.name.toUpperCase()}`}</p><h2>{fr ? "Les établissements du secteur" : "Providers in this area"}</h2><p className="results-subtitle">{fr ? "Ces établissements proviennent du répertoire officiel. Leur présence ne signifie pas qu’une place est actuellement disponible." : "These providers come from the official directory. Their presence does not mean a spot is currently available."}</p></div><Link className="secondary-button" href={`/${locale}/garderies?ville=${encodeURIComponent(city.name)}`}>{fr ? "Voir la recherche" : "View search"} →</Link></div>
            {providers.length ? <div className="provider-grid">{providers.slice(0, 24).map((record) => <article className="provider-card" key={record.id}><div className="provider-card-top"><div className="provider-avatar" aria-hidden="true">{record.name.charAt(0).toUpperCase()}</div><span className="provider-type">{typeLabel(record.type, fr)}</span></div><h3>{record.name}</h3><p>{record.postalCode || city.name}</p>{record.capacityTotal ? <p className="capacity-signal">{fr ? `Capacité autorisée déclarée : ${record.capacityTotal}` : `Declared licensed capacity: ${record.capacityTotal}`}</p> : null}<div className="provider-card-footer"><span className="status status-neutral">{fr ? "Disponibilité à confirmer" : "Availability to confirm"}</span><Link className="text-link" href={`/${locale}/garderie/${record.slug}`}>{fr ? "Voir la fiche" : "View profile"} →</Link></div></article>)}</div> : <div className="empty-state"><h3>{fr ? "Aucun établissement trouvé dans ce secteur." : "No provider found in this area."}</h3><p>{fr ? "Élargissez votre recherche aux secteurs voisins." : "Broaden your search to nearby areas."}</p><Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Décrire mon besoin" : "Describe my need"}</Link></div>}
          </div>
          <div className="demo-notice"><span className="notice-icon" aria-hidden="true">✓</span><div><strong>{fr ? "Source officielle" : "Official source"}</strong><p>{fr ? `Répertoire des installations en fonction du Ministère de la Famille · données ${data.updatedAt}. MyCoco distingue volontairement les établissements répertoriés de la disponibilité réelle.` : `Active childcare installation directory from Quebec's Ministry of Family · data ${data.updatedAt}. MyCoco deliberately distinguishes listed providers from real availability.`}</p></div></div>
        </div>
      </section>
      <style>{`.city-landing-hero{padding:44px 0 52px;background:linear-gradient(180deg,#eef6f0 0%,#fbfaf7 100%);border-bottom:1px solid #dfe7e2}.city-landing-hero h1{max-width:900px;font-size:clamp(2.7rem,5.5vw,5rem);line-height:.98;letter-spacing:-.06em;margin:10px 0 16px}.city-landing-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}.city-stat-card{padding:28px;background:#fff;border:1px solid #dfe7e2;border-radius:22px;display:flex;align-items:baseline;gap:12px}.city-stat-card strong{font-size:3rem;line-height:1;letter-spacing:-.05em;color:#193f32}.city-stat-card span{color:#65726b;font-weight:700}.city-type-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:10px}.city-type-card{padding:17px;background:#fff;border:1px solid #e1e8e3;border-radius:16px}.city-type-card strong{display:block;font-size:1.35rem;color:#193f32}.city-type-card span{display:block;color:#718078;font-size:.75rem;margin-top:2px}.city-activation-card{padding:30px;background:#193f32;color:#fff;border-radius:22px}.city-activation-card h2{font-size:2rem;line-height:1.05;letter-spacing:-.04em;margin:10px 0}.city-activation-card p{color:#cfe0d7;line-height:1.6;font-size:.9rem}.city-activation-card .primary-button{margin-top:8px}.city-provider-section{margin-top:70px}.city-provider-section .results-toolbar{margin-bottom:28px}.city-provider-section .results-toolbar h2{margin-top:8px}@media(max-width:760px){.city-landing-grid{grid-template-columns:1fr}.city-type-grid{grid-template-columns:1fr 1fr}.city-landing-hero h1{font-size:2.75rem}}`}</style>
    </main>
  );
}

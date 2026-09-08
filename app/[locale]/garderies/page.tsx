import Link from "next/link";
import { notFound } from "next/navigation";
import { getChildcareData, rankChildcare } from "@/lib/childcare";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type SearchParams = { ville?: string; age?: string; type?: string; debut?: string; demande?: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const fr = locale === "fr";
  return {
    title: fr ? "Trouver une garderie ou un CPE au Québec | MyCoco" : "Find a daycare or CPE in Quebec | MyCoco",
    description: fr ? "Recherchez des garderies, CPE et services de garde au Québec selon votre secteur et les besoins de votre famille." : "Search daycares, CPEs and childcare services in Quebec by area and family needs.",
    alternates: { canonical: `${site.url}/${locale}/garderies`, languages: { "fr-CA": `${site.url}/fr/garderies`, "en-CA": `${site.url}/en/garderies`, "x-default": `${site.url}/fr/garderies` } },
  };
}

function normalize(value: string) { return value.toLocaleLowerCase("fr-CA").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); }
function typeMatches(recordType: string, requested: string) {
  if (!requested) return true;
  const t = normalize(recordType);
  const r = normalize(requested);
  if (r === "cpe") return t.includes("cpe");
  if (r === "subventionnee") return t.includes("subvention");
  if (r === "milieu-familial") return t.includes("familial");
  if (r === "non-subventionnee") return t.includes("non") || t.includes("priv") || t.includes("commercial");
  return true;
}

export default async function GarderiesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<SearchParams> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";
  const q = await searchParams;
  const ville = q.ville?.trim() || "";
  const age = q.age || "";
  const type = q.type || "";
  const debut = q.debut || "";
  const data = await getChildcareData();
  const location = normalize(ville);

  const filtered = data.records.filter(record => {
    const haystack = normalize(`${record.name} ${record.city} ${record.address} ${record.postalCode}`);
    const locationOk = !location || haystack.includes(location);
    return locationOk && typeMatches(record.type, type);
  });
  const ranked = rankChildcare(filtered, ville, type).slice(0, 100);
  const hasNeed = Boolean(ville || age || type || debut);
  const noResults = ranked.length === 0;

  return <main className="search-page">
    <section className="search-hero"><div className="section-inner">
      <span className="eyebrow">{fr ? "MYCOCO · RECHERCHE" : "MYCOCO · SEARCH"}</span>
      <h1>{fr ? "Trouvez la bonne solution de garde près de chez vous" : "Find the right childcare solution near you"}</h1>
      <p>{fr ? "Nous commençons par les données officielles du Québec et faisons évoluer MyCoco vers un véritable matching famille ↔ solution." : "We start with official Quebec data and are building MyCoco toward true family-to-care matching."}</p>
      <Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Créer ma demande et voir les solutions" : "Create my request and see solutions"}</Link>
    </div></section>

    <section className="results-shell"><div className="section-inner">
      {q.demande === "enregistree" && <div className="matching-success"><strong>{fr ? "✓ Votre demande de matching est enregistrée" : "✓ Your matching request is saved"}</strong><span>{fr ? "MyCoco peut maintenant utiliser vos critères pour prioriser les solutions pertinentes et construire les prochaines alertes." : "MyCoco can now use your criteria to prioritize relevant solutions and build future alerts."}</span></div>}
      {hasNeed && <div className="need-summary"><div><span>{fr ? "Votre besoin" : "Your need"}</span><strong>{ville || (fr ? "Québec" : "Quebec")}{age ? ` · ${age} ${fr ? "mois/ans" : "months/years"}` : ""}</strong></div><Link href={`/${locale}/mon-besoin`}>{fr ? "Modifier mon besoin" : "Edit my need"}</Link></div>}

      <div className="results-toolbar"><div><span className="eyebrow">{fr ? "SOLUTIONS" : "SOLUTIONS"}</span><h2>{noResults ? (fr ? "Aucune solution trouvée" : "No solution found") : `${ranked.length}${ranked.length === 100 ? "+" : ""} ${fr ? "solutions à explorer" : "solutions to explore"}`}</h2></div><Link className="secondary-button" href={`/${locale}/mon-besoin`}>{fr ? "Affiner ma demande" : "Refine my request"}</Link></div>

      {noResults ? <div className="empty-state"><h3>{fr ? "Élargissons la recherche plutôt que de vous laisser sans réponse." : "Let's broaden the search instead of leaving you without an answer."}</h3><p>{fr ? "Essayez une ville voisine, retirez le filtre de type ou créez votre demande pour que MyCoco puisse progressivement vous proposer une solution." : "Try a nearby city, remove the type filter, or create your request so MyCoco can progressively find a solution."}</p><div className="hero-actions"><Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Créer ma demande" : "Create my request"}</Link><Link className="text-link" href={`/${locale}/garderies`}>{fr ? "Voir tout le Québec" : "Browse all Quebec"}</Link></div></div> : <div className="provider-list">{ranked.map(record => <article className="provider-card" key={record.id}><div className="provider-main"><div className="provider-avatar">{record.name.slice(0,1).toUpperCase()}</div><div className="provider-copy"><div className="provider-topline"><span className="provider-type">{record.type || (fr ? "Service de garde" : "Childcare service")}</span></div><h3>{record.name}</h3><div className="provider-meta"><span>{record.city}</span>{record.postalCode && <span>{record.postalCode}</span>}</div></div></div><div className="provider-footer"><span className="status status-neutral">{fr ? "À confirmer" : "To be confirmed"}</span><Link className="text-link" href={`/${locale}/garderie/${record.slug}`}>{fr ? "Voir la fiche" : "View profile"} →</Link></div></article>)}</div>}

      <div className="demo-notice"><span className="notice-icon">✓</span><div><strong>{fr ? "Source officielle du Québec" : "Official Quebec source"}</strong><p>{fr ? `Données des installations en fonction · mise à jour ${data.sourceUpdatedAt}. Les disponibilités réelles doivent toujours être confirmées auprès de l'établissement.` : `Active childcare installation data · updated ${data.sourceUpdatedAt}. Actual availability must always be confirmed with the provider.`}</p></div></div>
    </div></section>
  </main>;
}

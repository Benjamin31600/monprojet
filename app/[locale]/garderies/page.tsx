import Link from "next/link";
import { notFound } from "next/navigation";
import { getChildcareData, matchReasons, matchesType, normalize, rankChildcare, typeLabel } from "@/lib/childcare";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

type SearchParams = { ville?: string; age?: string; type?: string; debut?: string; demande?: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const fr = locale === "fr";
  return {
    title: fr ? "Trouver une garderie ou un CPE au Québec | MyCoco" : "Find a daycare or CPE in Quebec | MyCoco",
    description: fr ? "Trouvez des solutions de garde au Québec selon votre secteur et les critères de votre famille, à partir de données officielles." : "Find childcare solutions in Quebec based on your area and family criteria, using official data.",
    alternates: {
      canonical: `${site.url}/${locale}/garderies`,
      languages: { "fr-CA": `${site.url}/fr/garderies`, "en-CA": `${site.url}/en/garderies`, "x-default": `${site.url}/fr/garderies` },
    },
  };
}

function ageLabel(age: string, fr: boolean) {
  const labels: Record<string, string> = fr
    ? { "0-18": "0 à 18 mois", "18-36": "18 à 36 mois", "3-5": "3 à 5 ans", "5+": "5 ans et +" }
    : { "0-18": "0–18 months", "18-36": "18–36 months", "3-5": "3–5 years", "5+": "5+ years" };
  return labels[age] || age;
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

  const filtered = data.records.filter((record) => {
    const haystack = normalize(`${record.name} ${record.city} ${record.address} ${record.postalCode}`);
    const locationOk = !location || haystack.includes(location);
    return locationOk && matchesType(record, type);
  });
  const ranked = rankChildcare(filtered, ville, type).slice(0, 100);
  const hasNeed = Boolean(ville || age || type || debut);
  const noResults = ranked.length === 0;
  const typeName = type ? typeLabel(type === "subventionnee" ? "Garderie subventionnée" : type === "milieu-familial" ? "Milieu familial" : type === "non-subventionnee" ? "Garderie non subventionnée" : "CPE", fr) : "";

  return (
    <main className="search-page">
      <section className="search-hero">
        <div className="section-inner">
          <span className="eyebrow">MYCOCO · {fr ? "MATCHING" : "MATCHING"}</span>
          <h1>{fr ? "Trouvez les solutions les plus pertinentes pour votre famille" : "Find the childcare solutions most relevant to your family"}</h1>
          <p>{fr ? "MyCoco transforme votre recherche en demande structurée : secteur, type de garde et âge de votre enfant. Les disponibilités sont toujours à confirmer." : "MyCoco turns your search into a structured family need: area, childcare type and your child’s age. Availability must always be confirmed."}</p>
          <div className="hero-actions">
            <Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Créer ma demande" : "Create my request"}</Link>
            <Link className="text-link" href={`/${locale}/garderies`}>{fr ? "Explorer le répertoire" : "Browse the directory"}</Link>
          </div>
        </div>
      </section>

      <section className="results-shell">
        <div className="section-inner">
          {q.demande === "enregistree" && (
            <div className="matching-success" role="status">
              <strong>{fr ? "✓ Votre demande est enregistrée" : "✓ Your request is saved"}</strong>
              <span>{fr ? "Vos critères sont maintenant structurés pour améliorer la pertinence des prochaines recherches. Les disponibilités ne sont pas encore confirmées automatiquement." : "Your criteria are now structured to improve future search relevance. Availability is not automatically confirmed yet."}</span>
            </div>
          )}

          {hasNeed && (
            <div className="need-summary">
              <div>
                <span>{fr ? "Votre recherche" : "Your search"}</span>
                <strong>
                  {ville || (fr ? "Québec" : "Quebec")}
                  {age ? ` · ${ageLabel(age, fr)}` : ""}
                  {typeName ? ` · ${typeName}` : ""}
                </strong>
                {debut && <small>{fr ? `Début souhaité : ${debut}` : `Preferred start: ${debut}`}</small>}
              </div>
              <Link href={`/${locale}/mon-besoin`}>{fr ? "Modifier mon besoin" : "Edit my need"}</Link>
            </div>
          )}

          <div className="results-toolbar">
            <div>
              <span className="eyebrow">{fr ? "SOLUTIONS PERTINENTES" : "RELEVANT SOLUTIONS"}</span>
              <h2>{noResults ? (fr ? "Aucune solution dans ce périmètre" : "No solution in this area") : `${ranked.length}${ranked.length === 100 ? "+" : ""} ${fr ? "solutions à explorer" : "solutions to explore"}`}</h2>
              <p className="results-subtitle">{fr ? "Classées selon les critères disponibles aujourd’hui. MyCoco renforcera progressivement ce matching avec les données de capacité et de disponibilité." : "Ranked using the criteria currently available. MyCoco will progressively strengthen matching with capacity and availability data."}</p>
            </div>
            <Link className="secondary-button" href={`/${locale}/mon-besoin`}>{fr ? "Affiner ma demande" : "Refine my request"}</Link>
          </div>

          {noResults ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">⌕</div>
              <h3>{fr ? "Élargissons la recherche plutôt que de vous laisser sans réponse." : "Let's broaden the search instead of leaving you without an answer."}</h3>
              <p>{fr ? "Essayez une ville voisine, retirez le filtre de type ou créez votre demande. Le marché est en construction et nous préférons être transparents sur ce qui est réellement disponible dans nos données." : "Try a nearby city, remove the type filter, or create your request. The marketplace is being built, and we prefer to be transparent about what is actually available in our data."}</p>
              <div className="hero-actions">
                <Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Créer ma demande" : "Create my request"}</Link>
                <Link className="text-link" href={`/${locale}/garderies`}>{fr ? "Voir tout le Québec" : "Browse all Quebec"}</Link>
              </div>
            </div>
          ) : (
            <div className="provider-list">
              {ranked.map((record, index) => {
                const reasons = matchReasons(record, ville, type, fr);
                const isStrongMatch = reasons.length >= 2 || (Boolean(ville) && normalize(record.city) === location);
                return (
                  <article className="provider-card" key={record.id}>
                    <div className="provider-main">
                      <div className="provider-avatar" aria-hidden="true">{record.name.slice(0, 1).toUpperCase()}</div>
                      <div className="provider-copy">
                        <div className="provider-topline">
                          <span className="provider-type">{typeLabel(record.type, fr)}</span>
                          {isStrongMatch && <span className="match-badge">{fr ? "Bonne correspondance" : "Good match"}</span>}
                        </div>
                        <h3>{record.name}</h3>
                        <div className="provider-meta"><span>{record.city}</span>{record.postalCode && <span>{record.postalCode}</span>}</div>
                        {reasons.length > 0 && <div className="match-reasons">{reasons.map((reason) => <span key={reason}>✓ {reason}</span>)}</div>}
                        {index < 3 && <p className="why-match">{fr ? "Priorisée parce qu’elle correspond aux critères actuellement disponibles." : "Prioritized because it matches the criteria currently available."}</p>}
                      </div>
                    </div>
                    <div className="provider-footer">
                      <span className="status status-neutral">{fr ? "Disponibilité à confirmer" : "Availability to confirm"}</span>
                      <Link className="text-link" href={`/${locale}/garderie/${record.slug}`}>{fr ? "Voir la fiche" : "View profile"} →</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="demo-notice">
            <span className="notice-icon" aria-hidden="true">✓</span>
            <div>
              <strong>{fr ? "Données officielles du Québec" : "Official Quebec data"}</strong>
              <p>{fr ? `Répertoire des installations en fonction · données mises à jour le ${data.sourceUpdatedAt}. MyCoco distingue volontairement la présence d’un établissement de sa disponibilité réelle : celle-ci doit être confirmée auprès du service de garde.` : `Active childcare installation directory · data updated ${data.sourceUpdatedAt}. MyCoco deliberately distinguishes an existing provider from real availability, which must be confirmed with the childcare service.`}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

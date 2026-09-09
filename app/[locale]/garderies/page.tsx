import Link from "next/link";
import { getChildcareData, matchReasons, matchesType, normalize, rankChildcare, typeLabel } from "@/lib/childcare";
import { cities } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const fr = locale !== "en";
  return {
    title: fr ? "Solutions de garde au Québec | MyCoco" : "Childcare solutions in Quebec | MyCoco",
    description: fr
      ? "Trouvez les solutions de garde pertinentes pour votre famille au Québec et créez une demande pour améliorer votre recherche."
      : "Find relevant childcare solutions for your family in Quebec and create a request to improve your search.",
    alternates: {
      canonical: `/${locale}/garderies`,
      languages: { fr: "/fr/garderies", en: "/en/garderies" },
    },
  };
}

export default async function GarderiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const queryParams = await searchParams;
  const fr = locale !== "en";
  const data = await getChildcareData();

  const query = typeof queryParams.ville === "string" ? queryParams.ville : "";
  const type = typeof queryParams.type === "string" ? queryParams.type : "";
  const age = typeof queryParams.age === "string" ? queryParams.age : "";
  const debut = typeof queryParams.debut === "string" ? queryParams.debut : "";
  const success = queryParams.demande === "enregistree";

  const normalizedQuery = normalize(query);
  const filtered = data.records.filter((record) => {
    if (!normalizedQuery) return true;
    const city = normalize(record.city);
    const postal = normalize(record.postalCode).replace(/\s+/g, "");
    const needle = normalizedQuery.replace(/\s+/g, "");
    return city.includes(normalizedQuery) || postal.includes(needle);
  });
  const ranked = rankChildcare(filtered, query, type);
  const hasNeed = Boolean(query || type || age || debut);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">MYCOCO · {fr ? "SOLUTIONS DE GARDE" : "CHILDCARE SOLUTIONS"}</p>
          <h1>{fr ? "Trouvez les solutions les plus pertinentes pour votre famille" : "Find the most relevant childcare solutions for your family"}</h1>
          <p className="hero-copy">
            {fr
              ? "MyCoco transforme votre recherche en demande structurée pour vous aider à identifier les options pertinentes, sans jamais présenter une place comme garantie."
              : "MyCoco turns your search into a structured family need to help identify relevant options, without ever presenting a place as guaranteed."}
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Créer ma demande" : "Create my request"}</Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          {success && (
            <div className="matching-success" role="status">
              <strong>{fr ? "✓ Votre demande est enregistrée" : "✓ Your request is saved"}</strong>
              <span>{fr ? "Nous pouvons mieux prioriser les solutions à partir des critères que vous avez fournis. La disponibilité doit toujours être confirmée." : "We can better prioritize solutions from the criteria you provided. Availability must always be confirmed."}</span>
            </div>
          )}

          {hasNeed && (
            <div className="need-summary">
              <div>
                <span>{fr ? "Votre besoin" : "Your need"}</span>
                <strong>{query || (fr ? "Québec" : "Quebec")}</strong>
              </div>
              {age && <div><span>{fr ? "Âge" : "Age"}</span><strong>{age}</strong></div>}
              {type && <div><span>{fr ? "Type" : "Type"}</span><strong>{typeLabel(type, fr)}</strong></div>}
              {debut && <div><span>{fr ? "Début" : "Start"}</span><strong>{debut}</strong></div>}
              <Link className="text-link" href={`/${locale}/mon-besoin`}>{fr ? "Modifier" : "Edit"}</Link>
            </div>
          )}

          <div className="results-toolbar">
            <div>
              <p className="eyebrow">{fr ? "SOLUTIONS PERTINENTES" : "RELEVANT SOLUTIONS"}</p>
              <h2>{ranked.length} {fr ? "solution(s)" : "solution(s)"}</h2>
              <p className="results-subtitle">{fr ? "Classées selon les critères disponibles aujourd’hui. MyCoco renforcera progressivement ce matching avec les données de capacité et de disponibilité." : "Ranked using the criteria currently available. MyCoco will progressively strengthen matching with capacity and availability data."}</p>
            </div>
            <Link className="secondary-button" href={`/${locale}/mon-besoin`}>{fr ? "Affiner ma demande" : "Refine my request"}</Link>
          </div>

          {ranked.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon" aria-hidden="true">⌕</div>
              <h3>{fr ? "Aucune solution trouvée avec ces critères" : "No solution found with these criteria"}</h3>
              <p>{fr ? "Essayez une autre ville, un code postal plus large ou un autre type de garde. Nous élargirons progressivement le réseau MyCoco." : "Try another city, a broader postal code or another childcare type. We will progressively expand the MyCoco network."}</p>
              <Link className="primary-button" href={`/${locale}/mon-besoin`}>{fr ? "Modifier ma recherche" : "Change my search"}</Link>
            </div>
          ) : (
            <div className="provider-grid">
              {ranked.map((record, index) => {
                const reasons = matchReasons(record, query, type, fr);
                const exactArea = normalize(record.city) === normalizedQuery || normalize(record.postalCode).replace(/\s+/g, "") === normalizedQuery.replace(/\s+/g, "");
                const strongMatch = reasons.length >= 2 || exactArea;
                return (
                  <article className="provider-card" key={record.id}>
                    <div className="provider-card-top">
                      <div className="provider-avatar" aria-hidden="true">{record.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <span className="provider-type">{typeLabel(record.type, fr)}</span>
                        {strongMatch && <span className="match-badge">{fr ? "Bonne correspondance" : "Good match"}</span>}
                      </div>
                    </div>
                    <h3>{record.name}</h3>
                    <p>{record.city} · {record.postalCode}</p>
                    {reasons.length > 0 && (
                      <div className="match-reasons">
                        {reasons.map((reason) => <span key={reason}>✓ {reason}</span>)}
                      </div>
                    )}
                    {index < 3 && <p className="why-match">{fr ? "Priorisée parce qu’elle correspond aux critères actuellement disponibles." : "Prioritized because it matches the criteria currently available."}</p>}
                    <div className="provider-card-footer">
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
              <p>{fr ? `Répertoire des installations en fonction · données mises à jour le ${data.updatedAt}. MyCoco distingue volontairement la présence d’un établissement de sa disponibilité réelle : celle-ci doit être confirmée auprès du service de garde.` : `Active childcare installation directory · data updated ${data.updatedAt}. MyCoco deliberately distinguishes an existing provider from real availability, which must be confirmed with the childcare service.`}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChildcareData, matchesType, normalize, rankChildcare, typeLabel } from "@/lib/childcare";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";

type Params = Record<string, string | string[] | undefined>;
const value = (params: Params, key: string) => { const v = params[key]; return Array.isArray(v) ? v[0] ?? "" : v ?? ""; };

export async function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  return {
    title: fr ? "Garderies, CPE et services de garde au Québec" : "Daycares, CPEs and childcare services in Quebec",
    description: fr ? "Recherchez des garderies, CPE et services de garde en fonction au Québec par ville et type de garde." : "Search active daycares, CPEs and childcare services in Quebec by city and childcare type.",
    alternates: { canonical: `/${raw}/garderies`, languages: { "fr-CA": "/fr/garderies", "en-CA": "/en/garderies", "x-default": "/fr/garderies" } },
  };
}

export default async function GarderiesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Params> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const p = await searchParams;
  const ville = value(p, "ville");
  const type = value(p, "type");
  const data = await getChildcareData();
  const cityNeedle = normalize(ville);
  const filtered = data.records.filter(record => (!cityNeedle || normalize(record.city).includes(cityNeedle) || normalize(record.postalCode).includes(cityNeedle)) && matchesType(record, type));
  const records = rankChildcare(filtered, ville, type);
  const visible = records.slice(0, 100);

  return <main className="search-page">
    <section className="search-hero"><div className="section-inner">
      <div className="search-breadcrumb"><Link href={`/${locale}`}>{site.name}</Link><span>›</span><span>{fr ? "Garderies" : "Childcare"}</span></div>
      <span className="eyebrow">{fr ? "Données officielles du Québec" : "Official Quebec data"}</span>
      <h1>{fr ? "Trouvez une solution de garde près de chez vous" : "Find childcare near you"}</h1>
      <p className="search-page-intro">{fr ? "Recherchez les CPE, garderies et services de garde actuellement recensés par le Ministère de la Famille." : "Search CPEs, daycares and childcare services currently listed by Quebec's Ministry of Family."}</p>
      <form className="results-search" action={`/${locale}/garderies`} method="get">
        <label><span>{fr ? "Ville ou code postal" : "City or postal code"}</span><div className="input-wrap"><input name="ville" defaultValue={ville} placeholder={fr ? "Ex. Mirabel ou J7J" : "e.g. Mirabel or J7J"}/></div></label>
        <label><span>{fr ? "Type de garde" : "Childcare type"}</span><select name="type" defaultValue={type}><option value="">{fr ? "Tous les types" : "All types"}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu-familial">{fr ? "Milieu familial" : "Home daycare"}</option><option value="non-subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label>
        <button className="primary-button" type="submit">{fr ? "Rechercher" : "Search"}</button>
      </form>
    </div></section>
    <section className="results-shell"><div className="section-inner">
      <div className="results-toolbar"><div><span className="eyebrow">{fr ? "Répertoire officiel" : "Official directory"}</span><h2>{records.length} <span>{fr ? "établissements trouvés" : "providers found"}</span></h2></div><div className="result-context"><span>{fr ? `Résultats classés selon votre recherche · données du Ministère de la Famille · mise à jour ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("fr-CA") : "automatique"}` : `Results ranked for your search · Ministry of Family data · updated ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-CA") : "automatically"}`}</span></div></div>
      <div className="results-list">
        <div className="demo-notice"><div className="notice-icon">✓</div><div><strong>{fr ? "Vous cherchez une place ?" : "Looking for a spot?"}</strong><p>{fr ? "MyCoco vous aide d'abord à identifier les solutions autour de vous. La disponibilité réelle doit être confirmée directement auprès de l'établissement." : "MyCoco first helps you identify childcare options around you. Actual availability must be confirmed directly with the provider."}</p></div></div>
        {visible.map(record => <article className="provider-card" key={record.id}><div className="provider-main"><div className="provider-avatar" aria-hidden="true">{typeLabel(record.type, fr).charAt(0)}</div><div className="provider-copy"><div className="provider-topline"><span className="provider-type">{typeLabel(record.type, fr)}</span><span className="status status-neutral">{fr ? "Répertorié" : "Listed"}</span></div><h3>{record.name}</h3><div className="provider-meta"><span>{record.city}</span>{record.postalCode && <span>{record.postalCode}</span>}</div><p>{record.address || (fr ? "Adresse disponible dans les données officielles." : "Address available in the official data.")}</p></div></div><div className="provider-footer"><span>{fr ? "Source : Ministère de la Famille" : "Source: Quebec Ministry of Family"}</span><Link href={`/${locale}/garderie/${record.slug}`} className="text-link">{fr ? "Voir la fiche" : "View profile"} →</Link></div></article>)}
        {!visible.length && <div className="empty-state"><h3>{fr ? "Aucun établissement trouvé" : "No provider found"}</h3><p>{fr ? "Essayez une autre ville ou retirez le filtre de type." : "Try another city or remove the type filter."}</p><Link className="secondary-button" href={`/${locale}/garderies`}>{fr ? "Réinitialiser" : "Reset search"}</Link></div>}
      </div>
    </div></section>
  </main>;
}

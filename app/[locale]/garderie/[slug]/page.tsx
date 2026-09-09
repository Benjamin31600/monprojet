import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChildcareData, typeLabel } from "@/lib/childcare";
import { isLocale, locales } from "@/lib/i18n";

export async function generateStaticParams() {
  const data = await getChildcareData();
  return locales.flatMap(locale => data.records.slice(0, 500).map(record => ({ locale, slug: record.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const data = await getChildcareData();
  const record = data.records.find(item => item.slug === slug);
  if (!record) return {};
  const fr = raw === "fr";
  return {
    title: `${record.name} | ${typeLabel(record.type, fr)}`,
    description: fr ? `${record.name}, ${typeLabel(record.type, true)} à ${record.city}. Informations issues du répertoire du Ministère de la Famille.` : `${record.name}, ${typeLabel(record.type, false)} in ${record.city}. Information from Quebec's Ministry of Family directory.`,
    alternates: { canonical: `/${raw}/garderie/${record.slug}` },
  };
}

export default async function ProviderPage({ params, searchParams }: { params: Promise<{ locale: string; slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const q = await searchParams;
  const demandId = typeof q.demandeId === "string" ? q.demandeId : "";
  const interestSent = q.interet === "envoye";
  const data = await getChildcareData();
  const record = data.records.find(item => item.slug === slug);
  if (!record) notFound();
  const fr = raw === "fr";
  const jsonLd = { "@context": "https://schema.org", "@type": "ChildCare", name: record.name, address: { "@type": "PostalAddress", streetAddress: record.address || undefined, addressLocality: record.city, postalCode: record.postalCode || undefined, addressRegion: "QC", addressCountry: "CA" }, telephone: record.phone || undefined };

  return <main className="provider-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/><section className="provider-hero"><div className="section-inner"><div className="search-breadcrumb"><Link href={`/${raw}/garderies`}>{fr ? "Recherche" : "Search"}</Link><span>›</span><span>{record.city}</span></div><div className="provider-profile-head"><div className="provider-avatar provider-avatar-large" aria-hidden="true">{typeLabel(record.type, fr).charAt(0)}</div><div><span className="provider-type">{typeLabel(record.type, fr)}</span><h1>{record.name}</h1><div className="provider-meta"><span>{record.city}, Québec</span>{record.postalCode && <span>{record.postalCode}</span>}</div></div></div><div className="provider-status-banner"><span>✓</span><div><strong>{fr ? "Établissement répertorié" : "Listed provider"}</strong><span>{fr ? "Cette fiche provient du répertoire officiel du Ministère de la Famille. Elle ne confirme pas une place disponible." : "This profile comes from the official Quebec Ministry of Family directory. It does not confirm an available spot."}</span></div></div></div></section><section className="provider-detail-shell"><div className="section-inner provider-detail-grid"><div className="provider-detail-main"><span className="eyebrow">{fr ? "Informations" : "Information"}</span><h2>{fr ? `Garde d'enfants à ${record.city}` : `Childcare in ${record.city}`}</h2><p>{fr ? `${record.name} est répertorié comme ${typeLabel(record.type, true).toLowerCase()} dans le répertoire du Ministère de la Famille. MyCoco structure ces données pour faciliter la recherche des familles.` : `${record.name} is listed as a ${typeLabel(record.type, false).toLowerCase()} in Quebec's Ministry of Family directory. MyCoco structures this information to make family childcare searches easier.`}</p><div className="provider-feature-grid"><div className="provider-feature"><span>{record.address || (fr ? "Adresse non fournie" : "Address not provided")}</span></div>{record.phone && <div className="provider-feature"><span>{record.phone}</span></div>}<div className="provider-feature"><span>{fr ? `Données mises à jour : ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("fr-CA") : "automatiquement"}` : `Data updated: ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-CA") : "automatically"}`}</span></div></div></div><aside className="provider-contact-card"><span className="eyebrow">MyCoco</span>{interestSent ? <><h2>{fr ? "Votre intérêt est enregistré." : "Your interest has been recorded."}</h2><p>{fr ? "Nous avons transmis votre intérêt à MyCoco pour cette solution. La disponibilité reste à confirmer directement avec l'établissement." : "Your interest has been recorded by MyCoco. Availability still needs to be confirmed directly with the provider."}</p><Link className="primary-button" href={`/${raw}/garderies`}>{fr ? "Continuer ma recherche" : "Continue searching"}</Link></> : demandId ? <><h2>{fr ? "Cette solution vous intéresse ?" : "Interested in this solution?"}</h2><p>{fr ? "Signalez votre intérêt. MyCoco conserve le lien entre votre besoin et cette solution pour préparer la mise en relation." : "Signal your interest. MyCoco keeps the link between your need and this solution to prepare the connection."}</p><form method="post" action="/api/leads"><input type="hidden" name="locale" value={raw}/><input type="hidden" name="providerSlug" value={record.slug}/><input type="hidden" name="demandId" value={demandId}/><input type="hidden" name="source" value="family-results"/><button className="primary-button" type="submit">{fr ? "Cette solution m'intéresse" : "I'm interested in this solution"} →</button></form><small className="provider-note">{fr ? "Gratuit · Aucune promesse de disponibilité" : "Free · No availability promise"}</small></> : <><h2>{fr ? "Vous cherchez une place ?" : "Looking for a spot?"}</h2><p>{fr ? "Décrivez votre besoin pour obtenir une recherche plus pertinente et pouvoir signaler les solutions qui vous intéressent." : "Describe your need for a more relevant search and signal the solutions that interest you."}</p><Link className="primary-button" href={`/${raw}/mon-besoin`}>{fr ? "Décrire mon besoin" : "Describe my need"} →</Link></>}<div className="claim-box"><strong>{fr ? "Vous représentez cet établissement ?" : "Do you represent this provider?"}</strong><span>{fr ? "Cette fiche est issue de données publiques. La possibilité de la revendiquer arrivera avec l'espace professionnel MyCoco." : "This profile comes from public data. Provider claiming will be available with MyCoco's professional space."}</span></div></aside></div></section><style>{`.provider-contact-card form{margin:0}.provider-contact-card .primary-button{border:0;cursor:pointer;width:100%;text-align:center}.provider-note{display:block;color:#7a8781;font-size:10px;margin-top:10px}.claim-box{margin-top:24px;padding-top:18px;border-top:1px solid #e3ebe6;display:grid;gap:5px}.claim-box strong{font-size:11px;color:#315b53}.claim-box span{font-size:10px;line-height:1.5;color:#7a8781}`}</style></main>;
}

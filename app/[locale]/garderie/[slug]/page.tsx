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

export default async function ProviderPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const data = await getChildcareData();
  const record = data.records.find(item => item.slug === slug);
  if (!record) notFound();
  const fr = raw === "fr";
  const jsonLd = { "@context": "https://schema.org", "@type": "ChildCare", name: record.name, address: { "@type": "PostalAddress", streetAddress: record.address || undefined, addressLocality: record.city, postalCode: record.postalCode || undefined, addressRegion: "QC", addressCountry: "CA" }, telephone: record.phone || undefined };

  return <main className="provider-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/><section className="provider-hero"><div className="section-inner"><div className="search-breadcrumb"><Link href={`/${raw}/garderies`}>{fr ? "Recherche" : "Search"}</Link><span>›</span><span>{record.city}</span></div><div className="provider-profile-head"><div className="provider-avatar provider-avatar-large" aria-hidden="true">{typeLabel(record.type, fr).charAt(0)}</div><div><span className="provider-type">{typeLabel(record.type, fr)}</span><h1>{record.name}</h1><div className="provider-meta"><span>{record.city}, Québec</span>{record.postalCode && <span>{record.postalCode}</span>}</div></div></div><div className="provider-status-banner"><span>✓</span><div><strong>{fr ? "Établissement répertorié" : "Listed provider"}</strong><span>{fr ? "Cette fiche provient du répertoire officiel du Ministère de la Famille. Elle ne confirme pas une place disponible." : "This profile comes from the official Quebec Ministry of Family directory. It does not confirm an available spot."}</span></div></div></div></section><section className="provider-detail-shell"><div className="section-inner provider-detail-grid"><div className="provider-detail-main"><span className="eyebrow">{fr ? "Informations" : "Information"}</span><h2>{fr ? `Garde d'enfants à ${record.city}` : `Childcare in ${record.city}`}</h2><p>{fr ? `${record.name} est répertorié comme ${typeLabel(record.type, true).toLowerCase()} dans le répertoire du Ministère de la Famille. MyCoco structure ces données pour faciliter la recherche des familles.` : `${record.name} is listed as a ${typeLabel(record.type, false).toLowerCase()} in Quebec's Ministry of Family directory. MyCoco structures this information to make family childcare searches easier.`}</p><div className="provider-feature-grid"><div className="provider-feature"><span>{record.address || (fr ? "Adresse non fournie" : "Address not provided")}</span></div>{record.phone && <div className="provider-feature"><span>{record.phone}</span></div>}<div className="provider-feature"><span>{fr ? `Données mises à jour : ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("fr-CA") : "automatiquement"}` : `Data updated: ${data.updatedAt ? new Date(data.updatedAt).toLocaleDateString("en-CA") : "automatically"}`}</span></div></div></div><aside className="provider-contact-card"><span className="eyebrow">MyCoco</span><h2>{fr ? "Vous cherchez une place ?" : "Looking for a spot?"}</h2><p>{fr ? "Utilisez MyCoco pour élargir votre recherche et comparer les établissements de votre secteur." : "Use MyCoco to broaden your search and compare providers in your area."}</p><Link className="primary-button" href={`/${raw}/garderies`}>{fr ? "Voir les garderies" : "Browse childcare"}</Link></aside></div></section></main>;
}

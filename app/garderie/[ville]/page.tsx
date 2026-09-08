import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, site } from "@/lib/site";

export function generateStaticParams() { return cities.map((city) => ({ ville: city.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const city = cities.find((item) => item.slug === ville);
  if (!city) return {};
  return {
    title: `Garderie à ${city.name} : places et solutions de garde`,
    description: `Trouvez une garderie, un CPE ou un milieu familial à ${city.name}. Comparez les options selon l’âge de votre enfant et votre besoin de garde.`,
    alternates: { canonical: `/garderie/${city.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const city = cities.find((item) => item.slug === ville);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Garderies à ${city.name}`,
    description: `Options de garde d’enfants à ${city.name}.`,
    url: `${site.url}/garderie/${city.slug}`,
    inLanguage: "fr-CA",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <div className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="breadcrumbs"><a href="/">Accueil</a> / <a href="/garderies">Garderies</a> / {city.name}</div>
      <span className="eyebrow">Recherche locale</span>
      <h1>Garderies à {city.name}</h1>
      <p>Découvrez les options de garde à {city.name} et autour de votre secteur. La plateforme est conçue pour évoluer vers une information plus fraîche et des solutions de garde complémentaires.</p>
      <div className="search-card">
        <form className="search-grid" action="/garderies" method="get">
          <input name="ville" value={city.name} readOnly aria-label="Ville" />
          <select name="age" defaultValue=""><option value="">Âge de l’enfant</option><option value="0-18">0–18 mois</option><option value="18-36">18–36 mois</option><option value="3-5">3–5 ans</option></select>
          <select name="type" defaultValue=""><option value="">Type de garde</option><option value="cpe">CPE</option><option value="subventionnee">Garderie subventionnée</option><option value="milieu-familial">Milieu familial</option></select>
          <button type="submit">Rechercher</button>
        </form>
      </div>
      <section><div className="cards">
        <article className="card"><h2>CPE à {city.name}</h2><p className="muted">Recherchez les centres de la petite enfance et leurs informations disponibles.</p></article>
        <article className="card"><h2>Garderies subventionnées</h2><p className="muted">Identifiez les options à contribution réduite dans votre secteur.</p></article>
        <article className="card"><h2>Milieux familiaux</h2><p className="muted">Explorez les services de garde en milieu familial selon vos critères.</p></article>
      </div></section>
    </div>
  );
}

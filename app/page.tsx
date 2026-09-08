import type { Metadata } from "next";
import { cities, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trouver une place en garderie près de chez vous",
  description: "Recherchez des garderies, CPE et milieux familiaux au Québec selon votre secteur, l’âge de votre enfant et vos besoins.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "fr-CA",
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/garderies?ville={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">Québec · Recherche de garde</span>
          <h1>Trouvez une place en garderie près de chez vous.</h1>
          <p>Un moteur de recherche simple pour trouver les options de garde qui correspondent vraiment à votre secteur, à l’âge de votre enfant et à votre date de besoin.</p>
          <form className="search-card" action="/garderies" method="get">
            <div className="search-grid">
              <input name="ville" placeholder="Ville ou code postal" aria-label="Ville ou code postal" />
              <select name="age" defaultValue=""><option value="">Âge de l’enfant</option><option value="0-18">0–18 mois</option><option value="18-36">18–36 mois</option><option value="3-5">3–5 ans</option></select>
              <select name="type" defaultValue=""><option value="">Type de garde</option><option value="cpe">CPE</option><option value="subventionnee">Garderie subventionnée</option><option value="milieu-familial">Milieu familial</option><option value="non-subventionnee">Garderie non subventionnée</option></select>
              <button type="submit">Rechercher</button>
            </div>
          </form>
        </div>
      </section>
      <section>
        <div className="section-inner">
          <span className="eyebrow">Pourquoi nous</span>
          <h2>Pas seulement une liste de garderies.</h2>
          <div className="cards">
            <article className="card"><span className="pill">01</span><h3>Recherche locale</h3><p className="muted">Commencez par votre ville ou votre secteur et trouvez les options pertinentes autour de vous.</p></article>
            <article className="card"><span className="pill">02</span><h3>Disponibilité utile</h3><p className="muted">Notre objectif est de rendre visible la fraîcheur de l’information, plutôt qu’une disponibilité impossible à vérifier.</p></article>
            <article className="card"><span className="pill">03</span><h3>Une solution complète</h3><p className="muted">À terme : place régulière, garde alternative, remplacement et solutions ponctuelles depuis un même espace.</p></article>
          </div>
        </div>
      </section>
      <section>
        <div className="section-inner">
          <span className="eyebrow">Recherche locale</span>
          <h2>Garderies par ville</h2>
          <div className="city-list">
            {cities.map((city) => <a className="card" key={city.slug} href={`/garderie/${city.slug}`}>{city.name}</a>)}
          </div>
        </div>
      </section>
    </>
  );
}

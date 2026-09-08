import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garderies au Québec",
  description: "Recherchez des garderies, CPE et milieux familiaux au Québec selon votre ville et les besoins de votre enfant.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const ville = typeof params.ville === "string" ? params.ville : "";
  const age = typeof params.age === "string" ? params.age : "";
  const type = typeof params.type === "string" ? params.type : "";

  return <div className="page">
    <div className="breadcrumbs"><a href="/">Accueil</a> / Garderies</div>
    <span className="eyebrow">Moteur de recherche</span>
    <h1>Rechercher une solution de garde</h1>
    <p>Cette page est la base du futur moteur connecté aux données de services et de disponibilités.</p>
    <div className="search-card"><form className="search-grid" action="/garderies" method="get">
      <input name="ville" defaultValue={ville} placeholder="Ville ou code postal" aria-label="Ville ou code postal" />
      <select name="age" defaultValue={age}><option value="">Âge de l’enfant</option><option value="0-18">0–18 mois</option><option value="18-36">18–36 mois</option><option value="3-5">3–5 ans</option></select>
      <select name="type" defaultValue={type}><option value="">Type de garde</option><option value="cpe">CPE</option><option value="subventionnee">Garderie subventionnée</option><option value="milieu-familial">Milieu familial</option><option value="non-subventionnee">Garderie non subventionnée</option></select>
      <button type="submit">Rechercher</button>
    </form></div>
    <section><div className="card"><h2>Votre recherche</h2><p>Ville : <strong>{ville || "toutes"}</strong> · Âge : <strong>{age || "tous"}</strong> · Type : <strong>{type || "tous"}</strong></p><p className="muted">Les résultats réels seront branchés à la base de données sécurisée dans l’étape suivante.</p></div></section>
  </div>;
}

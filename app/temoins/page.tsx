import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Témoins et technologies similaires",
  description: "Informations sur l’utilisation des témoins et technologies similaires.",
};

export default function CookiesPage() {
  return <article className="page legal-page">
    <div className="breadcrumbs"><a href="/">Accueil</a> / Témoins</div>
    <h1>Témoins et technologies similaires</h1>
    <p>Les témoins strictement nécessaires peuvent être utilisés pour assurer la sécurité, la navigation et les fonctions demandées.</p>
    <h2>Témoins non essentiels</h2>
    <p>Avant d’activer des témoins non essentiels, notamment ceux destinés à l’analyse, à la publicité ou au profilage, le site doit mettre en place le mécanisme de consentement approprié et expliquer clairement leur finalité.</p>
    <h2>Gestion du consentement</h2>
    <p>Lorsqu’un consentement est requis, le choix de l’utilisateur doit être libre, éclairé et retirable. Le retrait ne doit pas être plus difficile que l’acceptation.</p>
    <p className="muted">La liste technique des témoins sera complétée lorsque les outils d’analyse, de mesure et de marketing auront été sélectionnés.</p>
  </article>;
}

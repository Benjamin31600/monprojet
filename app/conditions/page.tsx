import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d’utilisation",
  description: "Conditions d’utilisation du service de recherche de solutions de garde.",
};

export default function TermsPage() {
  return <article className="page legal-page">
    <div className="breadcrumbs"><a href="/">Accueil</a> / Conditions</div>
    <h1>Conditions d’utilisation</h1>
    <p><strong>Version :</strong> septembre 2026</p>
    <h2>1. Objet du service</h2>
    <p>Le site a pour objectif de faciliter la recherche et la comparaison de solutions de garde au Québec. Les fiches et informations présentées peuvent provenir de sources publiques, de fournisseurs de services ou de mises à jour effectuées par les établissements.</p>
    <h2>2. Exactitude des informations</h2>
    <p>Une disponibilité affichée sur le site ne constitue pas une garantie de place. Les disponibilités peuvent changer rapidement et doivent être confirmées directement auprès du service de garde concerné.</p>
    <h2>3. Rôle de la plateforme</h2>
    <p>Sauf indication contractuelle expresse, la plateforme agit comme service technologique de recherche et de mise en relation. Elle n’exploite pas elle-même les services de garde présentés et ne remplace pas les vérifications que les parents doivent effectuer auprès du fournisseur.</p>
    <h2>4. Sécurité et utilisation responsable</h2>
    <p>Il est interdit d’utiliser le site pour collecter massivement des données, contourner des mesures de sécurité, diffuser du contenu illégal ou porter atteinte aux droits d’une autre personne.</p>
    <h2>5. Évolution du service</h2>
    <p>Les fonctionnalités peuvent évoluer. Lorsqu’un service payant sera proposé, les conditions, prix, modalités d’annulation et renseignements obligatoires applicables seront présentés avant la conclusion du contrat.</p>
    <h2>6. Coordonnées de l’exploitant</h2>
    <p><em>La dénomination légale, l’adresse et les coordonnées officielles de l’exploitant doivent être ajoutées avant toute commercialisation.</em></p>
    <p className="muted">Ces conditions constituent une base de travail et ne remplacent pas une validation juridique adaptée au modèle commercial final.</p>
  </article>;
}

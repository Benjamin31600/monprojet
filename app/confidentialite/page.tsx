import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et de protection des renseignements personnels.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <article className="page legal-page">
    <div className="breadcrumbs"><a href="/">Accueil</a> / Confidentialité</div>
    <h1>Politique de confidentialité</h1>
    <p><strong>Version :</strong> septembre 2026</p>
    <p>Cette politique explique comment l’entreprise qui exploite ce site collecte, utilise, communique, conserve et protège les renseignements personnels.</p>
    <h2>1. Responsable de la protection des renseignements personnels</h2>
    <p><strong>Responsable :</strong> la personne ayant la plus haute autorité au sein de l’entreprise exploitante, sauf délégation écrite conforme à la loi.</p>
    <p><strong>Coordonnées :</strong> <em>à compléter avec la dénomination légale et les coordonnées officielles avant la mise en production commerciale.</em></p>
    <h2>2. Renseignements que nous pouvons recueillir</h2>
    <p>Selon les fonctionnalités utilisées : adresse courriel, ville ou code postal, préférences de recherche, renseignements nécessaires à une demande de contact et données techniques nécessaires à la sécurité et au fonctionnement du service.</p>
    <p>Nous appliquons un principe de minimisation : nous ne demandons pas le nom, la date de naissance, le dossier médical ou d’autres renseignements sensibles concernant un enfant lorsqu’ils ne sont pas nécessaires à la fonctionnalité.</p>
    <h2>3. Finalités</h2>
    <p>Les renseignements peuvent servir à fournir les fonctionnalités demandées, répondre aux demandes, envoyer les alertes auxquelles une personne a consenti, améliorer la sécurité et mesurer le fonctionnement du service lorsque la loi le permet.</p>
    <h2>4. Consentement</h2>
    <p>Lorsque la loi l’exige, nous obtenons un consentement valable, compréhensible et adapté à la sensibilité du renseignement. Un consentement à des communications commerciales est distinct d’un consentement nécessaire au fonctionnement du service.</p>
    <h2>5. Communication et fournisseurs</h2>
    <p>Nous pouvons faire appel à des fournisseurs techniques pour l’hébergement, l’envoi de courriels, la sécurité ou l’analyse. Ils ne reçoivent que les renseignements nécessaires à leur fonction et doivent être encadrés par des mesures contractuelles et de sécurité appropriées.</p>
    <h2>6. Conservation et destruction</h2>
    <p>Les renseignements sont conservés seulement pendant la période nécessaire aux finalités pour lesquelles ils ont été recueillis, sous réserve des obligations légales. Des procédures de suppression sécurisée sont prévues.</p>
    <h2>7. Droits des personnes</h2>
    <p>Selon le régime légal applicable, une personne peut notamment demander l’accès à ses renseignements, leur rectification et, lorsque prévu, leur retrait, leur destruction ou la cessation de certaines utilisations. Toute demande peut être adressée au responsable de la protection des renseignements personnels.</p>
    <h2>8. Incidents de confidentialité</h2>
    <p>Nous maintenons un processus de gestion des incidents de confidentialité. Lorsqu’un incident présente un risque de préjudice sérieux, les avis requis sont transmis aux personnes concernées et à l’autorité compétente conformément à la loi applicable.</p>
    <h2>9. Hébergement et transferts</h2>
    <p>Certains fournisseurs techniques peuvent traiter des renseignements à l’extérieur du Québec ou du Canada. Avant tout transfert ou communication applicable, nous évaluons les exigences légales, les risques et les garanties offertes par le fournisseur.</p>
    <h2>10. Témoins et technologies similaires</h2>
    <p>Les témoins strictement nécessaires au fonctionnement peuvent être utilisés. Aucun témoin non essentiel destiné au marketing ou au profilage ne doit être activé sans le mécanisme de consentement approprié.</p>
    <h2>11. Plaintes</h2>
    <p>Une plainte peut d’abord être adressée au responsable de la protection des renseignements personnels. Les recours auprès des autorités compétentes demeurent disponibles selon la loi applicable.</p>
    <p className="muted"><strong>Important :</strong> cette page constitue une base technique et rédactionnelle. Les coordonnées de l’entreprise, les fournisseurs réellement utilisés, les périodes de conservation, les transferts internationaux et les mécanismes de consentement doivent être finalisés avant le lancement commercial.</p>
  </article>;
}

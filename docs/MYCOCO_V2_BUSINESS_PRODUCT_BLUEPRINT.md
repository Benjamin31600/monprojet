# MyCoco V2 — Product & Business Blueprint Québec

## Positionnement
MyCoco est le cockpit quotidien des services de garde en milieu familial et petites garderies. Le service de garde crée son espace, invite les parents, et devient le point central pour le journal, le planning, les communications, la sécurité, les rappels et le suivi des frais.

Le parent ne crée pas librement une fiche enfant depuis une place publique. Il rejoint un espace via une invitation sécurisée envoyée par la personne responsable du service de garde.

## Boucle de croissance
1. Une nounou/RSGE crée un compte gratuit.
2. Elle configure son service, son groupe, ses heures et ses préférences.
3. Elle invite 2 à 6 familles.
4. Les parents activent leur compte et complètent les informations enfant.
5. L'usage quotidien crée de la valeur et du verrouillage fonctionnel.
6. Les limites du forfait gratuit déclenchent l'upgrade du service de garde.

## Onboarding service de garde
- Email ou téléphone + vérification.
- Nom du service de garde.
- Type: milieu familial, RSGE, garderie privée, autre.
- Statut de reconnaissance déclaré par l'utilisateur, jamais inféré automatiquement.
- Horaires et jours d'ouverture.
- Groupe(s) et capacité.
- Règles de frais et échéances.
- Consentements, politique de confidentialité et coordonnées du responsable.
- Invitation des premiers parents.

## Onboarding parent
- Invitation unique par email/SMS.
- Vérification identité adulte.
- Acceptation de la relation avec le service de garde.
- Création/validation de la fiche enfant.
- Informations minimales: prénom, date de naissance, allergies, besoins médicaux utiles, préférences alimentaires, habitudes de sommeil, personnes autorisées, contacts d'urgence, horaire habituel.
- Consentements distincts: photos, sorties, communications, urgence, données facultatives.
- Accès au dashboard seulement après confirmation de la relation.

## Fonctionnalités quotidiennes service de garde
- Présence / arrivée / départ.
- Planning global et planning par enfant.
- Journal rapide: repas, sieste, couche/toilette, activité, humeur, observation, incident.
- Publication groupée ou individuelle.
- Photos privées avec contrôle de consentement.
- Messages parent-enfant ciblés.
- Besoins matériels: couches, lingettes, vêtements, crème, bouteille, etc.
- Événements: sorties, vacances, fermetures, anniversaires, rendez-vous.
- Rappels automatiques aux parents.
- Frais de garde: échéances, montant dû, statut payé/non payé, rappels.
- Documents et autorisations.
- Rapport de journée en un clic.

## Fonctionnalités parent
- Aujourd'hui: état actuel et timeline.
- Planning enfant.
- Messages privés.
- Allergies/santé et urgence.
- Besoins à apporter.
- Événements et rappels.
- Frais à venir et historique.
- Photos et albums autorisés.
- Documents, consentements et autorisations.
- Signalement absence/retard.
- Gestion des personnes autorisées à récupérer l'enfant.

## Modèle économique initial
Les parents restent gratuits pour accélérer l'adoption.

### Gratuit — acquisition
- 1 groupe.
- Jusqu'à 2 enfants actifs.
- Journal essentiel.
- Messages.
- Invitations parents.
- Planning 7 jours.
- Historique limité.

### Solo — 9,90 CAD/mois
- Jusqu'à 6 enfants actifs.
- Historique illimité.
- Photos privées.
- Calendrier complet.
- Besoins matériels et rappels.
- Fiches santé et contacts d'urgence.
- Exports simples.

### Pro — 19,90 CAD/mois
- Tout Solo.
- Suivi des frais et rappels automatiques.
- Documents et signatures.
- Rapports d'incident.
- Automatisations et modèles.
- Statistiques de présence.
- Plusieurs adultes autorisés côté service.

### Équipe — à partir de 49 CAD/mois
- Plusieurs groupes / éducatrices.
- Permissions par rôle.
- Tableau de bord direction.
- Exports administratifs.
- Journal d'audit renforcé.
- Support prioritaire.

Les prix sont des hypothèses à tester avec 10 à 20 services de garde avant commercialisation définitive.

## Revenus complémentaires plus tard
- SMS premium.
- Paiement des frais de garde via partenaire de paiement.
- Documents/signatures avancés.
- Sauvegarde/archivage longue durée.
- Vérification de profil/preuves de reconnaissance via partenaires.
- Marketplace de garde de dépannage et activités, séparée du coeur opérationnel.

## Ce qui rend MyCoco indispensable
- Utilisation quotidienne, pas mensuelle.
- Fiche enfant et sécurité centralisées.
- Journal + planning + communication dans un seul flux.
- Historique utile aux deux parties.
- Rappels qui évitent les oublis et les messages manuels.
- Automatisation des tâches répétitives.
- Invitations parents qui créent un effet réseau local.

## Design system
Le produit doit évoquer l'enfance sans ressembler à un jouet.

- Fond: #FFFDFC.
- Texte principal: #273449.
- Texte secondaire: #526178.
- Sauge: #DDEFE6.
- Ciel: #DFECF8.
- Lavande: #E9E3F6.
- Pêche: #F8E5D8.
- Rose poudré: #F7E1DE.
- Jaune beurre: #F4EABF.

Principes: grands espaces blancs, cartes arrondies, pastels uniquement en surfaces, texte sombre à contraste élevé, icônes simples, hiérarchie claire, cibles tactiles >=44 px, aucune information critique uniquement par couleur.

## Navigation recommandée
### Nounou
Aujourd'hui / Groupe / Planning / Messages / Plus

### Parent
Aujourd'hui / Agenda / Messages / Enfant / Plus

Le dashboard doit toujours répondre à trois questions: que se passe-t-il maintenant, que dois-je faire ensuite, y a-t-il quelque chose d'important à traiter.

## Sécurité et confidentialité
- Comptes adultes uniquement.
- Relation parent-service de garde basée sur invitation et enrollment actif.
- Accès au strict nécessaire selon le rôle.
- Stockage photos privé; URL signées et expirables.
- Aucune allergie ou donnée médicale détaillée dans les notifications push.
- Chiffrement en transit et au repos fourni par les services d'infrastructure sélectionnés.
- RLS côté base de données sur toutes les tables exposées.
- Clés service-role interdites dans l'application mobile.
- Journal d'audit pour les actions sensibles.
- Export/suppression de compte et mécanismes de retrait du consentement.
- Politique de conservation documentée.

## Roadmap
### MVP bêta
Invitation, comptes adultes, enfant, allergies/urgence, journal, planning, messages, besoins matériels, événements, notifications, paiement dû/non payé.

### V1 commerciale
Présence arrivée/départ, photos, documents/consentements, rapports incident, rappels automatiques, abonnement provider, exports.

### V2
Paiements des frais de garde, signatures avancées, équipe multi-éducatrices, statistiques, intégrations et marketplace secondaire.

# MyCoco — refonte du parcours, 10 septembre 2026

## Direction
Une garde près de chez vous. Une chose de moins à porter.
Promesse centrée sur la charge mentale et la prochaine démarche concrète, sans promettre de place, de classement intelligent ou de délai garanti.
Vert profond #103f38, citron #e3f49a, bouton terracotta #c7442c, texte de corps 16 px. Contraste et typographie à contrôler en navigateur avant fusion.

## Changements
- Un accueil FR/EN partagé et une recherche GET fonctionnelle vers l’annuaire existant.
- Suppression des pages statiques FR/EN qui contournaient le layout localisé; conservation des URLs par la route dynamique.
- Mise en avant de vrais services locaux, sans photos génériques présentées comme photos des établissements.
- FAQ sur gratuité, poupons, disponibilité et démarches officielles.
- Parcours professionnel conservé et promesse de lancement explicitée.
- Animations CSS respectant la préférence de réduction des mouvements.
- Assistant de recherche : validation de progression et état accessible des choix.
- Titres et descriptions d’accueil localisés, URLs canoniques et hreflang conservés.

## Concurrence et acquisition
Source consultée : https://www.mamswitch.com/ (10 septembre 2026). MamSwitch met en avant une recherche locale, plusieurs catégories de garde et un parcours en trois étapes. MyCoco doit se différencier par la clarté des fiches et le suivi vérifiable de la fraîcheur des disponibilités, pas par une promesse générique de matching. Ce second axe exige un développement et des données vérifiées avant toute publicité.
Ma Garderie : accès web en échec, aucune conclusion visuelle retenue. L’analyse de concurrence reste partielle.

Acquisition à tester : annonces locales avec le même angle que la page de destination (ville + âge + recherche gratuite), orientées vers le formulaire, puis mesure clic / recherche / consultation de fiche / contact. N’afficher aucun témoignage, compteur de familles ou taux de réussite inventé. Les campagnes et budgets publicitaires n’ont pas été créés.

## Validation et limites
Diff vérifié. Le formulaire transmet les paramètres déjà consommés par l’annuaire. Pas de dépendance ajoutée.
Installation des dépendances bloquée par le contrôle réseau : build, validation TypeScript, navigateur et tests de bout en bout non exécutés. Revue visuelle mobile/desktop et choix d’une photographie éditoriale pertinente restent à réaliser avant fusion. La langue racine HTML anglaise et les canoniques des pages secondaires nécessitent une revue SEO complémentaire.
Aucun changement en base, aucune migration de plateforme et aucune fusion en production.

## Vérifications avant fusion
Installer les dépendances et lancer le build du dépôt. Contrôler /fr et /en, le menu mobile, la recherche directe, les quatre étapes du formulaire, les erreurs, l’annuaire vide, les fiches et le parcours prestataire. Vérifier le consentement analytics et les connexions avec des comptes de test avant de qualifier le tunnel de complet.

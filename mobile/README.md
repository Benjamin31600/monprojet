# MyCoco Mobile — MVP iOS / Android

Application native Expo / React Native complémentaire au site Next.js MyCoco.

## Ce que contient le MVP

- Espace Parent : résumé de journée, journal, agenda, profil enfant, informations d’urgence et messagerie.
- Espace Éducatrice / responsable : groupe du jour, saisies rapides, alertes utiles et messages parents.
- Mode démo autonome si aucune variable Supabase n’est fournie.
- Client Supabase prêt pour Auth + PostgreSQL + RLS.
- Aucune permission caméra, micro, contacts ou localisation demandée par défaut.

## Démarrer

```bash
cd mobile
npm install
cp .env.example .env
npm run start
```

Lancer ensuite iOS/Android avec Expo Go ou un development build.

## Production

1. Appliquer la migration `supabase/migrations/20260911_childcare_daily_app.sql` dans un projet Supabase canadien.
2. Configurer `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
3. Ajouter les écrans Auth réels et brancher les requêtes sur les tables RLS.
4. Générer les builds avec EAS (`eas build --platform all`).
5. Avant soumission stores : politique de confidentialité, suppression de compte dans l’app, formulaires Data Safety / App Privacy, captures, icône 1024px et revue juridique Loi 25.

## Positionnement de conformité

L’application est destinée aux **adultes** (parents, éducatrices, directions), pas aux enfants. Les enfants n’ont pas de compte et ne sont pas une audience cible. Les données enfant restent néanmoins des données personnelles à protéger avec un niveau élevé de minimisation, consentement, traçabilité et contrôle d’accès.

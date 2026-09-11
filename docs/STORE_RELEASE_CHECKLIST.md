# MyCoco — iOS / Android release checklist

## Product
- Adult audience only; no child account creation.
- Demo/reviewer account and seeded safe demo data.
- In-app account deletion and support route.
- French and English store metadata.
- Clear onboarding split: Parent / Educator / Provider admin.

## Privacy
- Privacy policy URL and terms URL public before review.
- Data inventory and retention policy completed.
- Parental consent workflow for child information and private photos.
- Camera/photos requested only at the moment of use with purpose text.
- Push notification previews contain no health/allergy detail.
- App Privacy / Data Safety declarations match actual SDK behavior.

## Security
- RLS enabled on every private table.
- No service-role key in mobile bundle.
- Private storage buckets and signed media URLs.
- Abuse/rate limits on messaging and invite endpoints.
- Audit sensitive consent and incident changes.
- Production error monitoring and backup/restore tested.

## Store assets
- Final icon and adaptive Android icon.
- iPhone and Android screenshots from production-like builds.
- Short description, long description, keywords/category.
- Support URL, marketing URL, privacy URL.
- Release notes and reviewer instructions.

## Build
- EAS production profiles configured.
- Unique bundle/package identifier `ca.mycoco.app` confirmed available.
- Signing credentials in Apple Developer / Google Play Console.
- Physical-device test on current iOS and Android plus one older supported OS.
- Deep links, notifications, offline/error states and account deletion tested.

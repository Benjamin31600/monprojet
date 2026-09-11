# MyCoco — Product & Go-to-market Québec

## Product thesis

MyCoco should not compete with Québec’s official childcare registration portal. The public directory is acquisition. The product is the private daily relationship layer between childcare providers and families: journal, attendance, messaging, agenda, safety data and consent.

The initial beachhead is home childcare and small independent daycares. They have recurring operational pain, shorter buying cycles and less appetite for heavy enterprise software. The promise is deliberately simple: **« Tout ce qu’une famille doit savoir. Tout ce qu’une éducatrice doit partager. Au même endroit. »**

## Positioning

**For families:** one calm, trusted place for the child’s day, messages, schedule and essential safety information.

**For educators:** log a meal, nap, activity, mood, photo or incident in a few taps; stop duplicating notebooks, texts and social messages.

**For owners/directors:** one workspace that improves parent experience, proof of communication, consent traceability and team consistency without requiring hardware.

Do not position MyCoco as a social network for children. The mobile app is adult-facing. Children never have accounts.

## MVP — must ship

1. Adult role-based authentication: parent, educator, provider admin.
2. Provider roster and secure parent invitation/linking.
3. Child profile: allergies/critical notes, emergency contacts, authorized pickup, private-photo consent.
4. Daily journal: arrival, meals, naps, activities, mood, notes, private photos, incidents, departure.
5. Parent daily timeline with a quiet “what matters now” summary.
6. Private parent/provider messaging.
7. Shared agenda and absence/event notices.
8. Push notifications with notification preferences.
9. Account deletion, data export request and consent history.
10. French-first with English support from the data model onward.

## What not to build first

Do not start with payroll, full accounting, HR scheduling, government subsidy workflows, RFID hardware, public reviews or a generalized babysitter marketplace. Those features increase complexity before product-market fit and put MyCoco head-to-head with mature management suites.

## Revenue model

Families should be free in the core product; they create retention and network effects but are not the first payer.

Recommended launch pricing to validate willingness to pay:

| Plan | Target | Indicative price | Core value |
|---|---|---:|---|
| Founding | first pilot providers | Free / limited period | feedback + references |
| Solo | home childcare | CAD 19/month | roster, daily journal, parent app, messages |
| Pro | small daycare | CAD 49/month | team access, groups, attendance, exports, advanced communications |
| Multi-site | larger operator | CAD 149+/month | sites, admin controls, reporting, support |

Avoid permanent freemium for providers. A time-limited pilot is better: the provider experiences value, invites families and then converts.

Potential later revenue: verified backup-care marketplace, booking fees for camps/activities, paid enhanced provider profiles, background-check partner revenue, training partnerships, e-signatures/forms and premium reporting. Add only after the core SaaS has retention.

## Acquisition flywheel

The most capital-efficient loop is **provider → parents → local demand → more providers**. Acquire one provider directly; that provider invites its parents; those parents become MyCoco users without paid consumer acquisition; their searches and referrals create demand in neighboring providers.

Launch geographically dense, not nationally thin. Start with Mirabel/Laurentides, win references, then expand ring by ring across Greater Montréal before broader Québec.

Provider acquisition: founder-led outbound, local parent/RSGE communities, demonstrations, coordinating-office relationships where appropriate, QR onboarding, “Founding 100” offer and referral credits.

Parent acquisition: provider invitations first, then SEO pages for city + childcare intent, helpful local guides, saved search alerts and word of mouth. Paid social is a test channel, not the foundation.

## Activation metrics

Provider activation: provider created → first child linked → first parent invited → first daily event published within 24 hours.

Parent activation: accepts invite → sees linked child → opens first daily report → enables relevant notifications.

North-star candidate: **weekly active linked families with at least one meaningful provider interaction**. Supporting metrics: provider 4-week retention, parent weekly retention, events per enrolled child, parent invite acceptance, messages answered and provider conversion to paid.

## UX principles

- One primary action per screen.
- “Today” before archives.
- Safety data visible when needed, never decorative.
- Private photos are not social posts.
- Notifications are grouped and user-controlled.
- Educator capture must be faster than writing a notebook entry.
- Parent view should feel calm, not like a monitoring dashboard.
- Avoid red for normal status; reserve it for urgent safety/incident states.

## Brand system

Primary navy `#19324D`: trust, legibility and professional foundation.

Warm coral `#FF7468`: signature accent for illustrations and highlights, not small text on white.

Mint `#BDEBD8`: positive/safe states. Butter `#FFD978`: warmth/attention. Cream `#FFF8F0`: main soft background. Lavender `#E8E1FF` and sky `#DDEFFF`: secondary category surfaces. Ink `#1D2940`: body text.

The visual language should be rounded but not childish: friendly editorial typography, generous whitespace, simple line icons, tactile cards, subtle micro-interactions. Brand personality: reassuring, useful, modern, Quebec-local and bilingual — not “baby pink/blue”.

## Mobile architecture

- Web acquisition/admin: existing Next.js 16 application.
- Mobile: Expo / React Native with Expo Router, one codebase for iOS and Android.
- API/data: Supabase/PostgreSQL or the existing PostgreSQL foundation, with Row Level Security and server-side privileged actions only.
- Private media: non-public object storage with signed URLs and explicit photo consent.
- Push: Expo notifications initially, then native providers underneath as scale requires.
- Analytics: adult product events only; avoid child profiling and unnecessary sensitive attributes.
- Error monitoring and audit logging required before production pilots.

The mobile directory is intentionally separate under `/mobile` so the current web application can continue to ship independently.

## App Store / Play Store product posture

The app is for adults managing childcare. Do not market it as a children’s app or submit it to a kids category. Provide an accessible privacy policy, support contact, account deletion inside the app, a complete review account/demo mode, and clear explanations for any camera/photo or notification permission.

Payments for the childcare service itself are real-world/physical-service transactions and should be treated separately from payments for MyCoco digital SaaS features. Store-specific rules must be checked at release for any consumer digital subscription sold inside the native app.

## Security and privacy guardrails

- No child login or child-facing tracking.
- Minimum necessary collection.
- Parental consent for child personal information and photos.
- Strict provider/family membership authorization.
- Encryption in transit and at rest through managed infrastructure.
- Private media buckets, short-lived signed URLs.
- Audit log for sensitive changes and consent.
- Data retention/deletion policy documented before public launch.
- Never put allergy/health details in notification previews.
- Incident reports and emergency data get explicit access controls.

## Roadmap

**Phase 1 — private beta:** parent/educator spaces, daily journal, safety profile, messaging, agenda, invite flow, push.

**Phase 2 — paid beta:** attendance, absences, exports, e-signatures, provider admin, billing, support tooling.

**Phase 3 — network:** verified provider profiles, availability signals, tours/open-house booking, referrals.

**Phase 4 — adjacent marketplace:** backup childcare, camps/activities and trusted family services only after local liquidity and trust systems are proven.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: locale === "fr" ? "Gestion des témoins" : "Cookie management" };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const fr = raw === "fr";
  return <article className="legal-page"><div className="legal-inner">
    <span className="legal-eyebrow">MyCoco · {fr ? "Témoins" : "Cookies"}</span>
    <h1>{fr ? "Gestion des témoins" : "Cookie management"}</h1>
    <p className="legal-lead">{fr ? "Nous privilégions une expérience simple et respectueuse. Cette page explique les catégories de témoins et technologies similaires utilisées par MyCoco." : "We aim for a simple, respectful experience. This page explains the categories of cookies and similar technologies used by MyCoco."}</p>
    <section><h2>{fr ? "Témoins essentiels" : "Essential cookies"}</h2><p>{fr ? "Ils servent au fonctionnement technique du site, à la sécurité, à la navigation et aux préférences nécessaires. Ils ne servent pas à établir un profil publicitaire à eux seuls." : "They support technical operation, security, navigation and necessary preferences. They are not used on their own to build an advertising profile."}</p></section>
    <section><h2>{fr ? "Mesure et amélioration" : "Analytics and improvement"}</h2><p>{fr ? "Si nous ajoutons des outils de mesure, nous les configurerons selon les exigences applicables et expliquerons leur finalité. Les outils non nécessaires seront déployés seulement selon la base légale et les choix requis." : "If we add analytics tools, we will configure them according to applicable requirements and explain their purpose. Non-essential tools will be deployed only on the applicable legal basis and with required choices."}</p></section>
    <section><h2>{fr ? "Publicité et marketing" : "Advertising and marketing"}</h2><p>{fr ? "MyCoco peut tester des campagnes d’acquisition. Avant d’activer des technologies de suivi publicitaire non essentielles, nous documenterons leur finalité, leur fournisseur, les données concernées et les mécanismes de consentement ou de refus applicables." : "MyCoco may test acquisition campaigns. Before enabling non-essential advertising trackers, we will document their purpose, provider, data involved and applicable consent or opt-out mechanisms."}</p></section>
    <section><h2>{fr ? "Vos choix" : "Your choices"}</h2><p>{fr ? "Les paramètres de votre navigateur permettent aussi de contrôler certains témoins. Lorsque la loi exige un mécanisme de gestion du consentement, MyCoco l’affichera de façon claire et accessible." : "Your browser settings can also control certain cookies. Where the law requires a consent-management mechanism, MyCoco will provide it clearly and accessibly."}</p></section>
    <section className="legal-callout"><strong>{fr ? "Avant la mise en production" : "Before production launch"}</strong><p>{fr ? "La liste exacte des témoins, leur durée, leurs fournisseurs et la bannière de consentement doivent être finalisés en fonction des outils réellement activés sur MyCoco." : "The exact cookie list, retention periods, providers and consent banner must be finalized based on the tools actually enabled on MyCoco."}</p></section>
    <p className="legal-date">{fr ? "Dernière mise à jour : septembre 2026" : "Last updated: September 2026"}</p>
  </div><style>{`.legal-page{min-height:70vh;background:#f8f4ea;padding:72px 20px}.legal-inner{max-width:820px;margin:auto;background:#fff;border:1px solid #dfe7e2;border-radius:24px;padding:clamp(28px,5vw,58px);box-shadow:0 18px 55px rgba(23,63,58,.08)}.legal-eyebrow{color:#236b58;font-size:.72rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.legal-page h1{font-size:clamp(2.3rem,5vw,4rem);line-height:1.02;letter-spacing:-.055em;margin:14px 0 18px;color:#173f3a}.legal-lead{font-size:1.08rem;line-height:1.7;color:#315b53;margin-bottom:38px}.legal-page section{padding:24px 0;border-top:1px solid #edf1ee}.legal-page h2{font-size:1.08rem;margin:0 0 9px;color:#173f3a}.legal-page p{color:#5f706b;line-height:1.72;margin:0}.legal-callout{padding:18px!important;margin-top:20px;border:1px solid #d3e4da!important;border-radius:16px;background:#f0f6f2}.legal-callout strong{display:block;color:#236b58;margin-bottom:5px}.legal-date{font-size:.75rem;margin-top:26px!important;color:#71827d!important}`}</style>
  </article>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const fr = locale === "fr";
  return {
    title: fr ? "Pour les services de garde | MyCoco" : "For childcare providers | MyCoco",
    description: fr ? "MyCoco aide les services de garde à être trouvés par les familles qui recherchent réellement une solution dans leur secteur." : "MyCoco helps childcare providers get found by families actively looking for a solution in their area.",
    alternates: { canonical: `/${locale}/pour-les-services`, languages: { "fr-CA": "/fr/pour-les-services", "en-CA": "/en/pour-les-services", "x-default": "/fr/pour-les-services" } },
    openGraph: { title: fr ? "Pour les services de garde | MyCoco" : "For childcare providers | MyCoco", description: fr ? "Construire une demande locale qualifiée avant de monétiser la mise en relation." : "Build qualified local demand before monetizing provider connections.", type: "website" },
  };
}

export default async function ProvidersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const fr = locale === "fr";
  return <main className="mc-provider-page">
    <section className="mc-provider-hero"><div className="mc-provider-wrap">
      <span className="mc-dir-eyebrow">{fr ? "POUR LES SERVICES DE GARDE" : "FOR CHILDCARE PROVIDERS"}</span>
      <h1>{fr ? "Les familles commencent par leur besoin. Vous devez être là quand la bonne demande arrive." : "Families start with a need. You should be there when the right demand appears."}</h1>
      <p>{fr ? "MyCoco construit un réseau local à partir des recherches réelles des familles. Aujourd’hui, nous développons la visibilité et la demande. Ensuite : correspondances, leads qualifiés, disponibilité et transactions." : "MyCoco is building a local network from real family searches. Today, we build visibility and demand. Next: matching, qualified leads, availability and transactions."}</p>
      <div className="mc-provider-actions"><Link className="mc-provider-cta" href={`/${locale}/garderies`}>{fr ? "Voir l’expérience famille" : "See the family experience"} →</Link><Link className="mc-provider-secondary" href={`/${locale}/mon-besoin`}>{fr ? "Comprendre la demande" : "Understand family demand"} →</Link></div>
      <p className="mc-provider-note">{fr ? "Présence de base gratuite pendant le lancement · Aucun engagement" : "Free basic presence during launch · No commitment"}</p>
    </div></section>
    <section className="mc-provider-section"><div className="mc-provider-wrap">
      <div className="mc-provider-intro"><span className="mc-dir-eyebrow">{fr ? "LE MODÈLE" : "THE MODEL"}</span><h2>{fr ? "Nous ne voulons pas vous vendre du trafic. Nous voulons vous apporter la bonne demande." : "We do not want to sell you traffic. We want to bring you the right demand."}</h2></div>
      <div className="mc-provider-grid2">
        <article><span>01</span><h3>{fr ? "Être trouvé" : "Get found"}</h3><p>{fr ? "Votre service apparaît dans les recherches locales pertinentes, avec des informations claires et vérifiables." : "Your service appears in relevant local searches with clear, verifiable information."}</p></article>
        <article><span>02</span><h3>{fr ? "Comprendre la demande" : "Understand demand"}</h3><p>{fr ? "À mesure que MyCoco grandit, nous pouvons mesurer les besoins par secteur, âge, type de garde et date recherchée." : "As MyCoco grows, we can measure demand by area, age, childcare type and desired start date."}</p></article>
        <article><span>03</span><h3>{fr ? "Recevoir des familles pertinentes" : "Receive relevant families"}</h3><p>{fr ? "À terme, les services pourront recevoir les demandes qui correspondent réellement à leur capacité et à leur offre." : "Over time, providers will receive requests that genuinely fit their capacity and offer."}</p></article>
      </div>
    </div></section>
    <section className="mc-provider-section mc-provider-dark"><div className="mc-provider-wrap mc-provider-dark-inner"><span className="mc-dir-eyebrow">{fr ? "MYCOCO PRO · PLUS TARD" : "MYCOCO PRO · LATER"}</span><h2>{fr ? "Quand la demande sera là, nous vous donnerons les outils pour la convertir." : "When the demand is there, we will give you the tools to convert it."}</h2><div className="mc-provider-future"><span>{fr ? "Demandes qualifiées" : "Qualified demand"}</span><span>{fr ? "Disponibilités" : "Availability"}</span><span>{fr ? "Gestion des leads" : "Lead management"}</span><span>{fr ? "Statistiques" : "Analytics"}</span><span>{fr ? "Mise en relation" : "Connections"}</span></div></div></section>
    <style>{`.mc-provider-page{background:#fcfbf7;color:#173f3a}.mc-provider-wrap{width:min(1040px,calc(100% - 40px));margin:auto}.mc-provider-hero{padding:82px 0 86px;background:linear-gradient(180deg,#edf6f0 0%,#fcfbf7 100%);border-bottom:1px solid #dfe7e2}.mc-provider-page h1{max-width:900px;font-size:clamp(43px,6vw,76px);line-height:.97;letter-spacing:-.065em;margin:17px 0 23px}.mc-provider-hero>div>p{max-width:760px;color:#65756e;font-size:18px;line-height:1.65;margin:0}.mc-provider-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.mc-provider-cta,.mc-provider-secondary{display:inline-flex;align-items:center;border-radius:12px;padding:14px 18px;font-weight:850;text-decoration:none}.mc-provider-cta{background:#173f3a;color:#fff}.mc-provider-secondary{border:1px solid #cbdad1;color:#315b53;background:#fff}.mc-provider-note{font-size:11px!important;margin-top:13px!important;color:#7a8781!important}.mc-provider-section{padding:80px 0}.mc-provider-intro{max-width:780px;margin-bottom:34px}.mc-provider-intro h2,.mc-provider-dark h2{font-size:clamp(30px,4vw,48px);line-height:1.02;letter-spacing:-.045em;margin:12px 0 0}.mc-provider-grid2{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.mc-provider-grid2 article{padding:26px;background:#fff;border:1px solid #dfe7e2;border-radius:20px}.mc-provider-grid2 article>span{font-size:11px;font-weight:900;color:#6d9582}.mc-provider-grid2 h3{font-size:21px;line-height:1.1;letter-spacing:-.03em;margin:32px 0 10px}.mc-provider-grid2 p{color:#718079;font-size:13px;line-height:1.6;margin:0}.mc-provider-dark{background:#173f3a;color:#fff;padding:70px 0}.mc-provider-dark .mc-dir-eyebrow{color:#a7ceb8}.mc-provider-dark h2{max-width:800px}.mc-provider-future{display:flex;gap:9px;flex-wrap:wrap;margin-top:28px}.mc-provider-future span{border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:9px 12px;color:#dcece4;font-size:11px;font-weight:750}@media(max-width:760px){.mc-provider-grid2{grid-template-columns:1fr}.mc-provider-hero{padding:54px 0 60px}}`}</style>
  </main>;
}

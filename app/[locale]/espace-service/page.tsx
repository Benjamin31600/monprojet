import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function ProviderSpacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";
  return <main className="mc-provider-space">
    <section className="mc-ps-hero"><div className="mc-ps-wrap">
      <span className="mc-ps-eyebrow">MYCOCO · {fr ? "ESPACE SERVICE" : "PROVIDER SPACE"}</span>
      <h1>{fr ? "Votre fiche ne devrait pas être une simple adresse dans un annuaire." : "Your profile should be more than an address in a directory."}</h1>
      <p>{fr ? "Créez votre espace, présentez votre service, contrôlez vos informations et préparez-vous à recevoir les familles qui recherchent réellement une solution dans votre secteur." : "Create your space, present your service, control your information and get ready to receive families actively looking for care in your area."}</p>
      <div className="mc-ps-actions"><Link className="mc-ps-primary" href={`/${locale}/pour-les-services`}>{fr ? "Découvrir MyCoco pour les services" : "Discover MyCoco for providers"} →</Link><Link className="mc-ps-secondary" href={`/${locale}/a-propos`}>{fr ? "Pourquoi MyCoco ?" : "Why MyCoco?"}</Link></div>
    </div></section>
    <section className="mc-ps-body"><div className="mc-ps-wrap">
      <div className="mc-ps-flow">
        {[["01", fr ? "Créer votre espace" : "Create your space", fr ? "Votre établissement, votre équipe et votre identité." : "Your program, team and identity."], ["02", fr ? "Compléter votre fiche" : "Complete your profile", fr ? "Horaires, âges, capacité, tarifs, photos, services et informations utiles." : "Hours, ages, capacity, pricing, photos, services and useful information."], ["03", fr ? "Être trouvé" : "Get discovered", fr ? "Votre fiche devient une vraie page de présentation dans les recherches locales." : "Your profile becomes a real presentation page in local search."], ["04", fr ? "Recevoir de la demande" : "Receive demand", fr ? "À mesure que le réseau grandit : demandes pertinentes, leads et outils de suivi." : "As the network grows: relevant requests, leads and follow-up tools."]].map(([n,t,d]) => <article key={n}><b>{n}</b><h2>{t}</h2><p>{d}</p></article>)}
      </div>
      <div className="mc-ps-bottom"><div><span>{fr ? "LA LOGIQUE BUSINESS" : "THE BUSINESS MODEL"}</span><h2>{fr ? "Nous voulons vous apporter de la demande qualifiée, pas seulement des visites." : "We want to bring qualified demand, not just traffic."}</h2></div><p>{fr ? "La présence de base peut rester gratuite au lancement. La valeur payante viendra ensuite de la visibilité, des leads qualifiés, de la gestion des demandes et des transactions." : "Basic presence can remain free at launch. Paid value can later come from visibility, qualified leads, demand management and transactions."}</p></div>
    </div></section>
    <style>{`.mc-provider-space{background:#f7f3eb;color:#18352c}.mc-ps-wrap{width:min(1080px,calc(100% - 40px));margin:auto}.mc-ps-hero{padding:78px 0 86px;background:#18352c;color:#fff}.mc-ps-eyebrow{font-size:10px;font-weight:950;letter-spacing:.14em;color:#a9c9b8}.mc-ps-hero h1{max-width:850px;font-size:clamp(42px,6vw,72px);line-height:.97;letter-spacing:-.065em;margin:18px 0 20px}.mc-ps-hero p{max-width:720px;color:#d3e0db;font-size:18px;line-height:1.6}.mc-ps-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}.mc-ps-primary,.mc-ps-secondary{display:inline-flex;padding:14px 18px;border-radius:12px;font-size:12px;font-weight:900}.mc-ps-primary{background:#fff;color:#18352c}.mc-ps-secondary{border:1px solid rgba(255,255,255,.25);color:#fff}.mc-ps-body{padding:75px 0}.mc-ps-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.mc-ps-flow article{background:#fff;border:1px solid #e0e5df;border-radius:19px;padding:25px}.mc-ps-flow b{font-size:11px;color:#c47745}.mc-ps-flow h2{font-size:20px;letter-spacing:-.035em;margin:31px 0 10px}.mc-ps-flow p{font-size:12px;line-height:1.6;color:#718079;margin:0}.mc-ps-bottom{margin-top:30px;padding:30px;border-radius:21px;background:#e9eee9;display:grid;grid-template-columns:1.1fr .9fr;gap:40px}.mc-ps-bottom span{font-size:10px;font-weight:950;letter-spacing:.13em;color:#507662}.mc-ps-bottom h2{font-size:30px;line-height:1.04;letter-spacing:-.045em;margin:11px 0 0}.mc-ps-bottom p{color:#61716a;font-size:13px;line-height:1.65;margin:0}@media(max-width:850px){.mc-ps-flow{grid-template-columns:1fr 1fr}.mc-ps-bottom{grid-template-columns:1fr}}@media(max-width:520px){.mc-ps-flow{grid-template-columns:1fr}.mc-ps-hero{padding:55px 0 62px}}`}</style>
  </main>;
}

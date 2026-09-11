import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

export default async function HomeLandingV9({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.filter((record) => record.city).slice(0, 6);

  const t = fr ? {
    eyebrow: "MYCOCO · TROUVER UNE GARDE PLUS SIMPLEMENT",
    title: "Trouvez rapidement une garde qui correspond vraiment à votre famille.",
    lead: "Garderies, CPE, milieux familiaux et nounous : décrivez votre besoin, découvrez des annonces pertinentes près de chez vous et gardez votre recherche au même endroit.",
    primary: "Trouver ma garde gratuitement",
    secondary: "Voir les annonces",
    proof: ["Recherche gratuite", "Annonces locales", "Alertes dans votre espace"],
    listingsEyebrow: "ANNONCES À DÉCOUVRIR",
    listingsTitle: "Voyez tout de suite le type de services que vous pouvez trouver sur MyCoco.",
    listingsText: "Les fiches issues des données publiques restent clairement identifiées. Les services inscrits peuvent ensuite enrichir leur annonce avec leur présentation, leurs disponibilités, leurs activités, leurs tarifs et leurs photos.",
    seeListing: "Voir l’annonce",
    howTitle: "Vous dites ce que vous cherchez. MyCoco vous aide à trouver quoi contacter.",
    how: [
      ["01", "Décrivez votre besoin", "Ville, âge de l’enfant, type de garde et date souhaitée."],
      ["02", "Comparez les annonces", "Repérez les services qui correspondent le mieux à votre situation."],
      ["03", "Gardez le fil", "Créez votre espace pour retrouver vos demandes, recevoir des alertes et relancer votre recherche."],
    ],
    providerEyebrow: "VOUS ÊTES UN SERVICE DE GARDE ?",
    providerTitle: "Transformez votre fiche en une annonce qui donne envie de vous contacter.",
    providerText: "Présentez votre approche, vos activités, vos jours disponibles, vos horaires, vos tarifs et, dès que votre annonce est complète, vos photos. MyCoco est pensé pour vous apporter des demandes plus pertinentes, pas seulement des visites.",
    providerCta: "Créer mon annonce gratuitement",
    familyTitle: "Votre recherche ne disparaît plus dans vos onglets et vos captures d’écran.",
    familyText: "Dans votre espace famille, vous pourrez retrouver vos recherches, suivre depuis quand elles sont actives, les relancer, conserver vos annonces préférées et recevoir des alertes lorsque de nouvelles solutions correspondent à vos critères.",
    familyCta: "Créer mon espace famille",
    aboutTitle: "MyCoco est né d’un problème simple : trouver une garde demande trop de temps.",
    aboutText: "Notre objectif n’est pas de créer un annuaire de plus. Nous construisons une plateforme qui rapproche les besoins réels des familles et les services disponibles, avec une expérience plus claire, plus locale et plus utile.",
    aboutCta: "Pourquoi MyCoco",
    finalTitle: "Commencez par votre besoin. Pas par une liste interminable.",
  } : {
    eyebrow: "MYCOCO · FIND CHILDCARE MORE EASILY",
    title: "Quickly find childcare that truly fits your family.",
    lead: "Daycares, CPEs, home childcare and sitters: describe your need, discover relevant local listings and keep your search in one place.",
    primary: "Find childcare for free",
    secondary: "View listings",
    proof: ["Free search", "Local listings", "Alerts in your space"],
    listingsEyebrow: "LISTINGS TO DISCOVER",
    listingsTitle: "See the kind of childcare you can find on MyCoco right away.",
    listingsText: "Profiles sourced from public data stay clearly identified. Registered providers can enrich their listing with presentation, openings, activities, pricing and photos.",
    seeListing: "View listing",
    howTitle: "Tell us what you need. MyCoco helps you decide who to contact.",
    how: [["01", "Describe your need", "City, child age, childcare type and desired start date."],["02", "Compare listings", "Spot providers that best fit your situation."],["03", "Keep track", "Create your space to review requests, receive alerts and restart your search."]],
    providerEyebrow: "ARE YOU A CHILDCARE PROVIDER?",
    providerTitle: "Turn your profile into a listing families want to contact.",
    providerText: "Show your approach, activities, available days, hours, pricing and, once complete, your photos. MyCoco is built to bring more relevant demand, not just page views.",
    providerCta: "Create my listing for free",
    familyTitle: "Your childcare search should not disappear into tabs and screenshots.",
    familyText: "Your family space will keep your searches, show how long they have been active, let you restart them, save favourite listings and receive alerts when new options match your criteria.",
    familyCta: "Create family space",
    aboutTitle: "MyCoco starts from one simple problem: finding childcare takes too much time.",
    aboutText: "We are not building another directory. We are building a platform that connects real family needs with available providers through a clearer, more local and useful experience.",
    aboutCta: "Why MyCoco",
    finalTitle: "Start with your need. Not an endless list.",
  };

  return <main className="mc-home-marketplace">
    <section className="mc-hero">
      <div className="mc-wrap mc-hero-grid">
        <div className="mc-hero-copy">
          <span className="mc-kicker">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="mc-actions"><Link className="mc-btn primary" href={`/${locale}/mon-besoin`}>{t.primary}<span>→</span></Link><Link className="mc-btn secondary" href={`/${locale}/garderies`}>{t.secondary}</Link></div>
          <div className="mc-proof">{t.proof.map((item) => <span key={item}><b>✓</b>{item}</span>)}</div>
        </div>
        <div className="mc-hero-search">
          <span>{fr ? "COMMENCER UNE RECHERCHE" : "START A SEARCH"}</span>
          <h2>{fr ? "Que recherchez-vous pour votre enfant ?" : "What are you looking for?"}</h2>
          <div className="mc-search-field"><small>{fr ? "Secteur" : "Area"}</small><strong>{fr ? "Ville ou code postal" : "City or postal code"}</strong></div>
          <div className="mc-search-grid"><div><small>{fr ? "Âge" : "Age"}</small><strong>{fr ? "Âge de l’enfant" : "Child age"}</strong></div><div><small>{fr ? "Besoin" : "Need"}</small><strong>{fr ? "Type de garde" : "Childcare type"}</strong></div></div>
          <Link href={`/${locale}/mon-besoin`}>{fr ? "Lancer ma recherche" : "Start my search"}<span>→</span></Link>
          <p>{fr ? "Aucun compte nécessaire pour commencer." : "No account required to start."}</p>
        </div>
      </div>
    </section>

    <section className="mc-listings-section">
      <div className="mc-wrap">
        <div className="mc-section-head"><span className="mc-kicker">{t.listingsEyebrow}</span><h2>{t.listingsTitle}</h2><p>{t.listingsText}</p></div>
        <div className="mc-listing-grid">{featured.map((record, index) => <Link key={record.id} className="mc-listing-card" href={`/${locale}/garderie/${record.slug}`}>
          <div className={`mc-listing-visual visual-${(index % 3) + 1}`}>
            <span>{typeLabel(record.type, fr)}</span>
            <div><b>{record.name.slice(0,1).toUpperCase()}</b><small>{fr ? "Photo ajoutée par le service après inscription" : "Photo added by the provider after registration"}</small></div>
          </div>
          <div className="mc-listing-body"><small>{record.city}{record.postalCode ? ` · ${record.postalCode}` : ""}</small><h3>{record.name}</h3><div className="mc-listing-meta"><span>{record.capacityTotal ? `${record.capacityTotal} ${fr ? "places déclarées" : "declared spots"}` : (fr ? "Capacité à confirmer" : "Capacity to confirm")}</span><span>{fr ? "Informations vérifiables uniquement" : "Verifiable information only"}</span></div><strong>{t.seeListing}<span>→</span></strong></div>
        </Link>)}</div>
        <div className="mc-center"><Link className="mc-btn secondary" href={`/${locale}/garderies`}>{fr ? "Voir toutes les annonces" : "View all listings"}</Link></div>
      </div>
    </section>

    <section className="mc-how-section"><div className="mc-wrap"><div className="mc-section-head compact"><h2>{t.howTitle}</h2></div><div className="mc-how-grid">{t.how.map(([n,title,text]) => <article key={n}><b>{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="mc-split-section"><div className="mc-wrap mc-split-grid"><article className="family"><span>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span><h2>{t.familyTitle}</h2><p>{t.familyText}</p><Link href={`/${locale}/inscription?role=family`}>{t.familyCta}<b>→</b></Link></article><article className="provider"><span>{t.providerEyebrow}</span><h2>{t.providerTitle}</h2><p>{t.providerText}</p><Link href={`/${locale}/inscription?role=provider`}>{t.providerCta}<b>→</b></Link></article></div></section>

    <section className="mc-about-section"><div className="mc-wrap mc-about-grid"><h2>{t.aboutTitle}</h2><div><p>{t.aboutText}</p><Link href={`/${locale}/a-propos`}>{t.aboutCta}<span>→</span></Link></div></div></section>

    <section className="mc-final"><div className="mc-wrap"><h2>{t.finalTitle}</h2><Link className="mc-btn light" href={`/${locale}/mon-besoin`}>{t.primary}<span>→</span></Link></div></section>

    <style>{`
      .mc-home-marketplace{--ink:#0d3b3f;--turq:#12a9a2;--turq-dark:#078b87;--cream:#fffdf8;--soft:#eef9f7;--line:#d6e9e6;--muted:#60797a;color:var(--ink);background:var(--cream)}.mc-wrap{width:min(1180px,calc(100% - 40px));margin:auto}.mc-hero{padding:74px 0 82px;background:linear-gradient(180deg,#fffdf8 0%,#f1fbf9 100%);border-bottom:1px solid var(--line)}.mc-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 410px;gap:70px;align-items:center}.mc-kicker{font-size:11px;font-weight:950;letter-spacing:.13em;color:var(--turq-dark)}.mc-hero-copy h1{font-size:clamp(50px,6.4vw,82px);line-height:.94;letter-spacing:-.072em;max-width:780px;margin:16px 0 23px;color:var(--ink)}.mc-hero-copy>p{max-width:680px;font-size:18px;line-height:1.65;color:var(--muted)}.mc-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}.mc-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 20px;border-radius:13px;font-size:13px;font-weight:900}.mc-btn.primary{background:var(--turq);color:#fff;box-shadow:0 13px 30px rgba(18,169,162,.2)}.mc-btn.secondary{background:#fff;color:var(--ink);border:1px solid var(--line)}.mc-btn.light{background:#fff;color:var(--ink)}.mc-proof{display:flex;flex-wrap:wrap;gap:16px;margin-top:17px}.mc-proof span{display:flex;align-items:center;gap:6px;color:#557273;font-size:11px;font-weight:800}.mc-proof b{color:var(--turq-dark)}.mc-hero-search{background:#fff;border:1px solid var(--line);border-radius:24px;padding:25px;box-shadow:0 26px 70px rgba(13,59,63,.11)}.mc-hero-search>span{font-size:9px;font-weight:950;letter-spacing:.12em;color:var(--turq-dark)}.mc-hero-search h2{font-size:27px;line-height:1.04;letter-spacing:-.045em;margin:12px 0 19px}.mc-search-field,.mc-search-grid>div{border:1px solid #dbe8e6;border-radius:12px;padding:12px 13px}.mc-search-field small,.mc-search-grid small{display:block;font-size:8px;color:#789091;font-weight:800;margin-bottom:3px}.mc-search-field strong,.mc-search-grid strong{font-size:11px}.mc-search-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.mc-hero-search>a{display:flex;justify-content:space-between;align-items:center;margin-top:12px;min-height:49px;padding:0 15px;border-radius:11px;background:var(--ink);color:#fff;font-size:12px;font-weight:900}.mc-hero-search>p{text-align:center;color:#819191;font-size:9px;margin:9px 0 0}.mc-listings-section{padding:88px 0;background:#fff}.mc-section-head{max-width:790px}.mc-section-head h2{font-size:clamp(34px,4.5vw,56px);line-height:1.02;letter-spacing:-.055em;margin:12px 0 14px}.mc-section-head p{color:var(--muted);font-size:15px;line-height:1.65}.mc-listing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:34px}.mc-listing-card{background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden;transition:transform .18s ease,box-shadow .18s ease}.mc-listing-card:hover{transform:translateY(-4px);box-shadow:0 18px 42px rgba(13,59,63,.1)}.mc-listing-visual{height:190px;padding:15px;position:relative}.mc-listing-visual.visual-1{background:linear-gradient(145deg,#dff7f4,#f8eee1)}.mc-listing-visual.visual-2{background:linear-gradient(145deg,#e8f0fb,#e8f8f5)}.mc-listing-visual.visual-3{background:linear-gradient(145deg,#f4eadf,#e5f5ef)}.mc-listing-visual>span{position:absolute;top:14px;left:14px;background:#fff;color:var(--ink);border-radius:999px;padding:7px 9px;font-size:8px;font-weight:900}.mc-listing-visual>div{height:100%;display:grid;place-items:center;align-content:center;gap:8px;text-align:center}.mc-listing-visual b{display:grid;place-items:center;width:62px;height:62px;border-radius:18px;background:rgba(255,255,255,.8);font-size:26px}.mc-listing-visual small{max-width:170px;color:#6f8181;font-size:8px;line-height:1.4}.mc-listing-body{padding:18px}.mc-listing-body>small{color:#778b8b;font-size:9px}.mc-listing-body h3{font-size:21px;line-height:1.07;letter-spacing:-.035em;margin:8px 0 13px}.mc-listing-meta{display:grid;gap:5px;color:#627979;font-size:9px}.mc-listing-body>strong{display:flex;justify-content:space-between;align-items:center;margin-top:17px;padding-top:13px;border-top:1px solid #e8f0ef;color:var(--turq-dark);font-size:10px}.mc-center{text-align:center;margin-top:28px}.mc-how-section{padding:88px 0;background:var(--soft)}.mc-section-head.compact{max-width:850px}.mc-how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:34px}.mc-how-grid article{background:#fff;border:1px solid var(--line);border-radius:18px;padding:25px}.mc-how-grid article>b{font-size:10px;color:var(--turq-dark)}.mc-how-grid h3{font-size:22px;letter-spacing:-.03em;margin:28px 0 9px}.mc-how-grid p{color:var(--muted);font-size:13px;line-height:1.6}.mc-split-section{padding:88px 0;background:#fff}.mc-split-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.mc-split-grid article{border-radius:24px;padding:36px}.mc-split-grid article.family{background:#e9f8f5;color:var(--ink)}.mc-split-grid article.provider{background:#0d3b3f;color:#fff}.mc-split-grid article>span{font-size:9px;font-weight:950;letter-spacing:.12em}.mc-split-grid .family>span{color:var(--turq-dark)}.mc-split-grid .provider>span{color:#75d8d1}.mc-split-grid h2{font-size:32px;line-height:1.03;letter-spacing:-.045em;margin:14px 0}.mc-split-grid p{font-size:14px;line-height:1.65;max-width:520px}.mc-split-grid .family p{color:#5d7475}.mc-split-grid .provider p{color:#c1d7d6}.mc-split-grid a{display:inline-flex;gap:8px;margin-top:15px;font-size:12px;font-weight:900}.mc-split-grid .family a{color:var(--turq-dark)}.mc-split-grid .provider a{color:#fff}.mc-about-section{padding:82px 0;background:#f7f1e8}.mc-about-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:70px;align-items:start}.mc-about-grid h2{font-size:clamp(34px,4.5vw,55px);line-height:1.02;letter-spacing:-.055em;margin:0}.mc-about-grid p{color:#6a7472;font-size:15px;line-height:1.7;margin-top:0}.mc-about-grid a{display:inline-flex;gap:8px;color:var(--ink);font-size:12px;font-weight:900;margin-top:9px}.mc-final{padding:68px 0;background:var(--ink);color:#fff}.mc-final>div{display:flex;align-items:center;justify-content:space-between;gap:30px}.mc-final h2{font-size:clamp(32px,4.5vw,54px);line-height:1;letter-spacing:-.055em;max-width:760px;margin:0}@media(max-width:900px){.mc-hero-grid,.mc-about-grid{grid-template-columns:1fr}.mc-listing-grid,.mc-how-grid{grid-template-columns:1fr 1fr}.mc-hero-search{max-width:600px}.mc-split-grid{grid-template-columns:1fr}}@media(max-width:600px){.mc-wrap{width:calc(100% - 28px)}.mc-hero{padding:48px 0 55px}.mc-hero-copy h1{font-size:48px}.mc-listing-grid,.mc-how-grid{grid-template-columns:1fr}.mc-final>div{align-items:flex-start;flex-direction:column}.mc-search-grid{grid-template-columns:1fr}.mc-listings-section,.mc-how-section,.mc-split-section,.mc-about-section{padding:62px 0}}
    `}</style>
  </main>;
}

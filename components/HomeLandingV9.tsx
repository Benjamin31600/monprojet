import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

function Icon({ name }: { name: "search" | "pin" | "heart" | "home" | "shield" | "bell" }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/></svg>;
  if (name === "pin") return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>;
  if (name === "home") return <svg {...common}><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>;
  return <svg {...common}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>;
}

export default async function HomeLandingV9({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 3);

  const t = fr ? {
    overline: "MYCOCO · POUR LES FAMILLES DU QUÉBEC",
    title: "Trouvez la garde qui correspond vraiment à votre famille.",
    lead: "Décrivez votre besoin en quelques étapes. MyCoco vous aide à repérer les services pertinents, les comparer et garder votre recherche organisée au même endroit.",
    primary: "Trouver ma garde",
    secondary: "Explorer les services",
    badges: ["Gratuit", "Sans engagement", "Sans compte pour commencer"],
    choose: "Vous êtes ici pour…",
    familyTitle: "Trouver une solution de garde",
    familyText: "Dites-nous où vous cherchez, l’âge de votre enfant et ce qui compte pour vous.",
    providerTitle: "Présenter mon service de garde",
    providerText: "Créez votre espace professionnel et gardez vos informations à jour pour les familles.",
    familyCta: "Commencer ma recherche",
    providerCta: "Créer mon espace service",
    why: "POURQUOI MYCOCO",
    whyTitle: "Moins de listes. Plus de réponses utiles.",
    whyText: "Un annuaire seul vous laisse tout trier. MyCoco commence par votre situation et vous aide à comprendre quelles options méritent réellement votre attention.",
    benefit1: ["Une recherche personnalisée", "Votre secteur, l’âge de votre enfant et vos préférences structurent les résultats."],
    benefit2: ["Des fiches faciles à comparer", "Les informations importantes sont regroupées pour décider plus vite et mieux."],
    benefit3: ["Votre recherche reste avec vous", "Favoris, besoin et alertes peuvent être conservés dans votre espace famille."],
    how: "COMMENT ÇA MARCHE",
    howTitle: "Simple dès la première minute.",
    steps: [["01", "Décrivez votre besoin", "Quelques questions courtes pour comprendre votre situation."],["02", "Découvrez vos options", "Parcourez les services les plus pertinents autour de vous."],["03", "Comparez et gardez le fil", "Enregistrez les services qui vous intéressent et revenez quand vous voulez."]],
    directory: "SERVICES DE GARDE",
    directoryTitle: "Explorez aussi librement l’annuaire.",
    directoryText: "Vous préférez regarder avant de créer une recherche ? Parcourez les services disponibles dans l’annuaire MyCoco.",
    viewAll: "Voir tous les services",
    viewProfile: "Voir la fiche",
    trust: "UNE INFORMATION CLAIRE",
    trustTitle: "MyCoco aide à choisir. La disponibilité reste toujours à confirmer.",
    trustText: "Nous séparons clairement les informations publiques, les données disponibles et ce qui doit être confirmé directement auprès du service. MyCoco complète les démarches officielles du Québec sans s’y substituer.",
    about: "À PROPOS DE MYCOCO",
    aboutTitle: "Nous construisons un réflexe simple pour les familles.",
    aboutText: "MyCoco commence par la garde, un besoin local, urgent et souvent compliqué. Notre ambition est de rendre la recherche plus claire, plus humaine et plus utile à chaque étape de la vie familiale.",
    aboutCta: "Découvrir MyCoco",
    finalTitle: "Votre recherche peut commencer maintenant.",
    finalText: "Gratuit, sans engagement et sans compte obligatoire pour démarrer.",
    finalCta: "Trouver ma garde",
  } : {
    overline: "MYCOCO · FOR QUEBEC FAMILIES",
    title: "Find childcare that truly fits your family.",
    lead: "Describe your need in a few steps. MyCoco helps you find relevant providers, compare them and keep your search organized in one place.",
    primary: "Find childcare", secondary: "Browse providers", badges: ["Free", "No commitment", "No account to start"], choose: "You are here to…",
    familyTitle: "Find childcare", familyText: "Tell us where you are looking, your child’s age and what matters to you.", providerTitle: "Present my childcare service", providerText: "Create your professional space and keep your information up to date for families.", familyCta: "Start my search", providerCta: "Create provider space",
    why: "WHY MYCOCO", whyTitle: "Fewer lists. More useful answers.", whyText: "A directory alone leaves you to sort everything. MyCoco starts with your situation and helps you understand which options deserve your attention.",
    benefit1: ["A personalized search", "Your area, child age and preferences structure the results."], benefit2: ["Profiles that are easy to compare", "Important information is grouped together so you can decide faster."], benefit3: ["Your search stays with you", "Favourites, needs and alerts can be kept in your family space."],
    how: "HOW IT WORKS", howTitle: "Simple from the first minute.", steps: [["01", "Describe your need", "A few short questions to understand your situation."],["02", "Discover your options", "Browse the most relevant providers around you."],["03", "Compare and keep track", "Save providers you like and come back whenever you want."]],
    directory: "CHILDCARE PROVIDERS", directoryTitle: "You can also browse the directory freely.", directoryText: "Prefer to look around before creating a search? Browse providers in the MyCoco directory.", viewAll: "View all providers", viewProfile: "View profile",
    trust: "CLEAR INFORMATION", trustTitle: "MyCoco helps you choose. Availability must always be confirmed.", trustText: "We clearly separate public information, available data and what must be confirmed directly with the provider. MyCoco complements Quebec’s official process without replacing it.",
    about: "ABOUT MYCOCO", aboutTitle: "We are building a simple family reflex.", aboutText: "MyCoco starts with childcare, a local, urgent and often complicated need. Our ambition is to make family search clearer, more human and more useful.", aboutCta: "Discover MyCoco",
    finalTitle: "Your search can start now.", finalText: "Free, no commitment and no account required to begin.", finalCta: "Find childcare",
  };

  return <main className="mc-home-v13">
    <section className="v13-hero">
      <div className="v13-blob one"/><div className="v13-blob two"/>
      <div className="v13-wrap v13-hero-grid">
        <div className="v13-copy">
          <span className="v13-overline">{t.overline}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="v13-actions"><Link className="v13-btn primary" href={`/${locale}/mon-besoin`}>{t.primary}<span>→</span></Link><Link className="v13-btn secondary" href={`/${locale}/garderies`}>{t.secondary}</Link></div>
          <div className="v13-badges">{t.badges.map(x=><span key={x}><b>✓</b>{x}</span>)}</div>
        </div>
        <div className="v13-preview">
          <div className="v13-preview-head"><span className="v13-logo-dot">m</span><div><b>MyCoco</b><small>{fr ? "Votre recherche personnalisée" : "Your personalized search"}</small></div><span className="v13-secure"><Icon name="shield"/></span></div>
          <div className="v13-preview-title"><small>{fr ? "EXEMPLE DE RECHERCHE" : "SEARCH EXAMPLE"}</small><h2>{fr ? "Autour de Mirabel" : "Around Mirabel"}</h2></div>
          <div className="v13-criteria"><span><Icon name="pin"/><b>Mirabel</b></span><span><Icon name="search"/><b>{fr ? "0–18 mois" : "0–18 months"}</b></span></div>
          <div className="v13-result-label"><span>{fr ? "Services à découvrir" : "Providers to explore"}</span><b>{featured.length || 3}</b></div>
          <div className="v13-results">{featured.slice(0,3).map(r=><div key={r.id}><span className="v13-avatar">{r.name.slice(0,1).toUpperCase()}</span><p><b>{r.name}</b><small>{r.city} · {typeLabel(r.type, fr)}</small></p><span>→</span></div>)}</div>
          <Link href={`/${locale}/mon-besoin`} className="v13-preview-cta">{fr ? "Créer ma recherche" : "Create my search"}<span>→</span></Link>
        </div>
      </div>
    </section>

    <section className="v13-role-section"><div className="v13-wrap"><div className="v13-role-heading"><span>{t.choose}</span><h2>{fr ? "Deux parcours. Une seule plateforme." : "Two journeys. One platform."}</h2></div><div className="v13-role-grid">
      <article className="family"><div className="v13-role-icon"><Icon name="heart"/></div><span>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span><h3>{t.familyTitle}</h3><p>{t.familyText}</p><Link href={`/${locale}/mon-besoin`}>{t.familyCta}<b>→</b></Link></article>
      <article className="provider"><div className="v13-role-icon"><Icon name="home"/></div><span>{fr ? "POUR LES SERVICES DE GARDE" : "FOR CHILDCARE PROVIDERS"}</span><h3>{t.providerTitle}</h3><p>{t.providerText}</p><Link href={`/${locale}/inscription?role=provider`}>{t.providerCta}<b>→</b></Link></article>
    </div></div></section>

    <section className="v13-section white"><div className="v13-wrap v13-two-col"><div className="v13-heading"><span>{t.why}</span><h2>{t.whyTitle}</h2><p>{t.whyText}</p></div><div className="v13-benefits">
      <article><div><Icon name="search"/></div><h3>{t.benefit1[0]}</h3><p>{t.benefit1[1]}</p></article>
      <article><div><Icon name="pin"/></div><h3>{t.benefit2[0]}</h3><p>{t.benefit2[1]}</p></article>
      <article><div><Icon name="bell"/></div><h3>{t.benefit3[0]}</h3><p>{t.benefit3[1]}</p></article>
    </div></div></section>

    <section className="v13-section mint"><div className="v13-wrap"><div className="v13-heading centered"><span>{t.how}</span><h2>{t.howTitle}</h2></div><div className="v13-steps">{t.steps.map(([n,title,text])=><article key={n}><b>{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div><div className="v13-center"><Link className="v13-btn primary" href={`/${locale}/mon-besoin`}>{t.primary}<span>→</span></Link></div></div></section>

    <section className="v13-section white"><div className="v13-wrap"><div className="v13-heading"><span>{t.directory}</span><h2>{t.directoryTitle}</h2><p>{t.directoryText}</p></div><div className="v13-directory">{featured.map(r=><article key={r.id}><div className="v13-directory-photo"><span>{r.name.slice(0,1).toUpperCase()}</span></div><div><small>{typeLabel(r.type,fr)}</small><h3>{r.name}</h3><p><Icon name="pin"/>{r.city}</p><Link href={`/${locale}/garderie/${r.slug}`}>{t.viewProfile}<b>→</b></Link></div></article>)}</div><div className="v13-center"><Link className="v13-btn secondary" href={`/${locale}/garderies`}>{t.viewAll}</Link></div></div></section>

    <section className="v13-trust"><div className="v13-wrap v13-trust-grid"><div className="v13-trust-icon"><Icon name="shield"/></div><div><span>{t.trust}</span><h2>{t.trustTitle}</h2><p>{t.trustText}</p></div></div></section>

    <section className="v13-about"><div className="v13-wrap v13-about-grid"><div><span>{t.about}</span><h2>{t.aboutTitle}</h2></div><div><p>{t.aboutText}</p><Link href={`/${locale}/a-propos`}>{t.aboutCta}<b>→</b></Link></div></div></section>

    <section className="v13-final"><div className="v13-wrap"><h2>{t.finalTitle}</h2><p>{t.finalText}</p><Link className="v13-btn light" href={`/${locale}/mon-besoin`}>{t.finalCta}<span>→</span></Link></div></section>

    <style>{`
      .mc-home-v13{--ink:#0d3b3f;--turq:#12a9a2;--turq2:#078b87;--soft:#dff7f4;--mint:#eefaf8;--cream:#fffdf8;--line:#d7ebe8;--muted:#657b7c;color:var(--ink);background:var(--cream)}
      .v13-wrap{width:min(1180px,calc(100% - 40px));margin:auto}.v13-hero{position:relative;overflow:hidden;background:linear-gradient(135deg,#fffdf8 0%,#f0fbf9 55%,#e4f8f6 100%);border-bottom:1px solid var(--line)}.v13-blob{position:absolute;border-radius:999px;filter:blur(3px);pointer-events:none}.v13-blob.one{width:520px;height:520px;right:-170px;top:-210px;background:radial-gradient(circle,rgba(18,169,162,.18),rgba(18,169,162,0) 70%)}.v13-blob.two{width:320px;height:320px;left:-170px;bottom:-160px;background:radial-gradient(circle,rgba(82,208,197,.15),rgba(82,208,197,0) 70%)}
      .v13-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(390px,.78fr);gap:76px;align-items:center;padding:86px 0 94px}.v13-overline,.v13-heading>span,.v13-role-grid article>span,.v13-trust-grid>div>span,.v13-about-grid span{display:block;color:var(--turq2);font-size:12px;font-weight:950;letter-spacing:.11em}.v13-copy h1{max-width:780px;margin:17px 0 24px;font-size:clamp(50px,6.6vw,84px);line-height:.95;letter-spacing:-.068em}.v13-copy>p{max-width:680px;margin:0;color:var(--muted);font-size:18px;line-height:1.68}.v13-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.v13-btn{display:inline-flex;align-items:center;justify-content:center;gap:16px;min-height:56px;padding:0 22px;border-radius:15px;font-size:14px;font-weight:900;transition:.18s ease}.v13-btn.primary{background:var(--turq);color:#fff;box-shadow:0 14px 30px rgba(18,169,162,.22)}.v13-btn.primary:hover{background:var(--turq2);transform:translateY(-2px)}.v13-btn.secondary{border:1px solid #cfe6e3;background:#fff;color:var(--ink)}.v13-btn.light{background:#fff;color:var(--ink)}.v13-badges{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:18px;color:#567072;font-size:13px;font-weight:800}.v13-badges b{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;margin-right:7px;background:var(--soft);color:var(--turq2)}
      .v13-preview{background:#fff;border:1px solid var(--line);border-radius:28px;padding:22px;box-shadow:0 28px 75px rgba(13,59,63,.12)}.v13-preview-head{display:grid;grid-template-columns:44px 1fr 38px;gap:11px;align-items:center;padding-bottom:18px;border-bottom:1px solid #e9f2f1}.v13-logo-dot{display:grid;place-items:center;width:44px;height:44px;border-radius:14px 14px 14px 5px;background:var(--turq);color:#fff;font-size:18px;font-weight:950}.v13-preview-head b,.v13-preview-head small{display:block}.v13-preview-head b{font-size:15px}.v13-preview-head small{font-size:11px;color:#789091;margin-top:2px}.v13-secure{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:var(--soft);color:var(--turq2)}.v13-secure svg{width:20px}.v13-preview-title{padding:22px 2px 12px}.v13-preview-title small{font-size:10px;color:#7c9292;font-weight:900;letter-spacing:.08em}.v13-preview-title h2{font-size:27px;letter-spacing:-.04em;margin:4px 0 0}.v13-criteria{display:grid;grid-template-columns:1fr 1fr;gap:9px}.v13-criteria>span{display:flex;align-items:center;gap:8px;padding:12px;border-radius:13px;background:#f4fbfa;border:1px solid #e2f0ee;font-size:12px}.v13-criteria svg{width:19px;color:var(--turq2)}.v13-result-label{display:flex;justify-content:space-between;align-items:center;margin:19px 0 8px;font-size:12px;font-weight:850}.v13-result-label b{display:grid;place-items:center;min-width:26px;height:26px;border-radius:999px;background:var(--soft);color:var(--turq2)}.v13-results{display:grid;gap:8px}.v13-results>div{display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;padding:10px;border:1px solid #e4efed;border-radius:13px}.v13-avatar{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--soft),#c9efea);color:var(--ink);font-weight:950}.v13-results p{margin:0}.v13-results p b,.v13-results p small{display:block}.v13-results p b{font-size:12px}.v13-results p small{font-size:10px;color:#778d8d;margin-top:2px}.v13-preview-cta{display:flex;justify-content:space-between;align-items:center;margin-top:13px;padding:14px 15px;border-radius:13px;background:var(--ink);color:#fff;font-size:13px;font-weight:900}
      .v13-role-section{padding:68px 0;background:#fff}.v13-role-heading{text-align:center;margin-bottom:30px}.v13-role-heading>span{font-size:15px;font-weight:850;color:#627b7b}.v13-role-heading h2{font-size:clamp(31px,4vw,48px);letter-spacing:-.045em;margin:7px 0}.v13-role-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.v13-role-grid article{position:relative;padding:34px;border-radius:25px;border:1px solid var(--line);overflow:hidden}.v13-role-grid article.family{background:linear-gradient(145deg,#effbf9,#fff)}.v13-role-grid article.provider{background:linear-gradient(145deg,#f8ffff,#e8f8f6)}.v13-role-icon{display:grid;place-items:center;width:62px;height:62px;border-radius:19px;background:var(--turq);color:#fff;margin-bottom:28px}.v13-role-grid article.provider .v13-role-icon{background:var(--ink)}.v13-role-grid h3{font-size:31px;line-height:1.05;letter-spacing:-.045em;margin:8px 0 12px}.v13-role-grid p{max-width:480px;color:var(--muted);font-size:15px;line-height:1.65}.v13-role-grid a{display:inline-flex;align-items:center;gap:20px;margin-top:14px;color:var(--ink);font-size:14px;font-weight:900}.v13-role-grid a b{color:var(--turq)}
      .v13-section{padding:88px 0}.v13-section.white{background:#fff}.v13-section.mint{background:var(--mint)}.v13-two-col{display:grid;grid-template-columns:.84fr 1.16fr;gap:76px;align-items:start}.v13-heading{max-width:700px}.v13-heading.centered{text-align:center;margin:0 auto 42px}.v13-heading h2,.v13-trust-grid h2,.v13-about-grid h2{font-size:clamp(34px,4.7vw,58px);line-height:1;letter-spacing:-.055em;margin:11px 0 16px}.v13-heading p,.v13-trust-grid p,.v13-about-grid p{color:var(--muted);font-size:16px;line-height:1.72}.v13-benefits{display:grid;gap:12px}.v13-benefits article{display:grid;grid-template-columns:58px 1fr;column-gap:17px;padding:22px;background:#fff;border:1px solid var(--line);border-radius:19px}.v13-benefits article>div{grid-row:1/3;display:grid;place-items:center;width:58px;height:58px;border-radius:17px;background:var(--soft);color:var(--turq2)}.v13-benefits h3{font-size:21px;margin:3px 0 5px}.v13-benefits p{margin:0;color:var(--muted);font-size:14px;line-height:1.6}.v13-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.v13-steps article{padding:29px;border-radius:21px;background:#fff;border:1px solid var(--line)}.v13-steps article>b{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--turq);color:#fff;font-size:12px}.v13-steps h3{font-size:22px;margin:31px 0 9px}.v13-steps p{color:var(--muted);font-size:14px;line-height:1.62;margin:0}.v13-center{text-align:center;margin-top:30px}.v13-directory{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:30px}.v13-directory article{overflow:hidden;border-radius:20px;background:#fff;border:1px solid var(--line)}.v13-directory-photo{height:135px;display:grid;place-items:center;background:linear-gradient(135deg,#dff7f4,#bfece6)}.v13-directory-photo>span{display:grid;place-items:center;width:65px;height:65px;border-radius:20px;background:#fff;color:var(--turq2);font-size:23px;font-weight:950;box-shadow:0 8px 24px rgba(13,59,63,.09)}.v13-directory article>div:last-child{padding:20px}.v13-directory small{color:var(--turq2);font-size:10px;font-weight:900;letter-spacing:.05em}.v13-directory h3{font-size:19px;margin:5px 0 9px}.v13-directory p{display:flex;align-items:center;gap:6px;color:#6d8384;font-size:12px}.v13-directory p svg{width:16px}.v13-directory a{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:14px;border-top:1px solid #e8f1f0;color:var(--ink);font-size:12px;font-weight:900}.v13-directory a b{color:var(--turq)}
      .v13-trust{padding:72px 0;background:var(--ink);color:#fff}.v13-trust-grid{display:grid;grid-template-columns:90px 1fr;gap:28px;align-items:start;max-width:900px}.v13-trust-icon{display:grid;place-items:center;width:82px;height:82px;border-radius:23px;background:var(--turq);color:#fff}.v13-trust-grid>div>span{color:#8ee0d9}.v13-trust-grid p{color:#c6dddb}.v13-about{padding:80px 0;background:#fffdf8}.v13-about-grid{display:grid;grid-template-columns:1fr .9fr;gap:76px;align-items:center}.v13-about-grid a{display:inline-flex;gap:18px;margin-top:13px;color:var(--ink);font-size:14px;font-weight:900}.v13-about-grid a b{color:var(--turq)}.v13-final{text-align:center;padding:80px 0;background:linear-gradient(135deg,var(--turq),#0d8e8a);color:#fff}.v13-final h2{font-size:clamp(38px,5vw,60px);letter-spacing:-.055em;margin:0}.v13-final p{font-size:16px;color:#e5fbf8;margin:12px 0 25px}
      @media(max-width:900px){.v13-hero-grid,.v13-two-col,.v13-about-grid{grid-template-columns:1fr}.v13-hero-grid{gap:42px;padding:58px 0 64px}.v13-preview{max-width:620px}.v13-role-grid,.v13-steps,.v13-directory{grid-template-columns:1fr}.v13-two-col,.v13-about-grid{gap:35px}.v13-trust-grid{grid-template-columns:1fr}.v13-trust-icon{width:68px;height:68px}}
      @media(max-width:600px){.v13-wrap{width:min(100% - 28px,1180px)}.v13-copy h1{font-size:46px}.v13-copy>p{font-size:16px}.v13-actions{display:grid}.v13-btn{width:100%}.v13-badges{display:grid;gap:9px}.v13-preview{padding:15px;border-radius:22px}.v13-criteria{grid-template-columns:1fr}.v13-role-section,.v13-section,.v13-about{padding:56px 0}.v13-role-grid article{padding:26px}.v13-role-grid h3{font-size:27px}.v13-benefits article{grid-template-columns:50px 1fr;padding:18px}.v13-benefits article>div{width:50px;height:50px}.v13-heading h2,.v13-trust-grid h2,.v13-about-grid h2{font-size:37px}}
    `}</style>
  </main>;
}

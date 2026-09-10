import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

export default async function HomeLandingV8({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 3);

  const t = fr ? {
    eyebrow: "MYCOCO · POUR LES FAMILLES DU QUÉBEC",
    title: "Trouvez une garde qui convient vraiment à votre famille.",
    lead: "MyCoco vous aide à comprendre vos options, repérer les services pertinents près de chez vous et garder votre recherche organisée — sans vous perdre dans des listes interminables.",
    mainCta: "Décrire mon besoin",
    browseCta: "Explorer les services",
    familyTitle: "Je suis une famille",
    familyText: "Je cherche une garde régulière, une place, une solution temporaire ou simplement les options disponibles près de chez moi.",
    familyCta: "Commencer ma recherche",
    providerTitle: "Je suis un service de garde",
    providerText: "Je veux présenter mon service, compléter ma fiche et être découvert par des familles qui recherchent réellement dans mon secteur.",
    providerCta: "Créer mon espace service",
    trust: ["Recherche gratuite", "Sans compte pour commencer", "Pensé pour le Québec"],
    howKicker: "COMMENT MYCOCO VOUS AIDE",
    howTitle: "Un parcours simple. Pas un annuaire de plus.",
    howText: "L’annuaire reste utile pour explorer. Mais la vraie valeur de MyCoco commence quand votre besoin devient le point de départ.",
    steps: [
      ["01", "Dites-nous ce que vous cherchez", "Secteur, âge de votre enfant, type de garde et date souhaitée."],
      ["02", "Voyez les options pertinentes", "Les services sont présentés dans un ordre plus utile pour votre situation."],
      ["03", "Comparez avant de contacter", "Type de service, secteur, informations disponibles et points importants à vérifier."],
      ["04", "Gardez le fil", "Créez ensuite votre espace pour enregistrer vos recherches, favoris et prochaines étapes."],
    ],
    directoryKicker: "EXPLORER AVANT DE CHOISIR",
    directoryTitle: "Les services près de chez vous, au même endroit.",
    directoryText: "Parcourez l’annuaire quand vous voulez explorer librement, puis passez à une recherche personnalisée quand vous êtes prêt.",
    directoryCta: "Voir tout l’annuaire",
    providerKicker: "POUR LES SERVICES DE GARDE",
    providerHeadline: "Votre fiche doit devenir un outil d’acquisition, pas une simple ligne dans une liste.",
    providerBody: "Avec votre espace service, vous pourrez présenter clairement votre offre, maintenir vos informations à jour et recevoir progressivement des demandes plus qualifiées. MyCoco ne vous promet pas du trafic vide : l’objectif est de rapprocher la bonne famille du bon service.",
    providerBullets: ["Une fiche claire et complète", "Des informations mises à jour par le service", "Une visibilité locale pertinente", "À terme : demandes, messages, disponibilités et outils Pro"],
    providerCta2: "Découvrir l’espace service",
    officialKicker: "TRANSPARENCE",
    officialTitle: "MyCoco complète les démarches officielles du Québec.",
    officialText: "MyCoco aide à découvrir, comparer et organiser votre recherche. Une présence dans nos résultats ne garantit jamais une place. Les admissions officielles et les règles applicables restent celles des services et des organismes compétents.",
    aboutKicker: "POURQUOI MYCOCO",
    aboutTitle: "Parce que chercher une garde prend déjà assez d’énergie.",
    aboutText: "Nous construisons MyCoco autour d’un principe simple : une famille ne cherche pas une base de données, elle cherche une solution qui correspond à sa réalité. La garde est notre point de départ. À terme, MyCoco veut devenir le réflexe pour les services utiles autour de l’enfant.",
    aboutCta: "Découvrir notre vision",
    finalTitle: "Commencez par votre besoin. MyCoco s’occupe de rendre la recherche plus claire.",
    finalCta: "Trouver ma garde",
  } : {
    eyebrow: "MYCOCO · FOR QUEBEC FAMILIES",
    title: "Find childcare that truly fits your family.",
    lead: "MyCoco helps you understand your options, spot relevant childcare nearby and keep your search organized — without getting lost in endless lists.",
    mainCta: "Describe my need", browseCta: "Explore providers",
    familyTitle: "I am a family", familyText: "I am looking for regular childcare, a spot, temporary care or simply options available near me.", familyCta: "Start my search",
    providerTitle: "I am a childcare provider", providerText: "I want to present my service, complete my profile and be discovered by families actively searching in my area.", providerCta: "Create my provider space",
    trust: ["Free search", "No account to start", "Built for Quebec"],
    howKicker: "HOW MYCOCO HELPS", howTitle: "A simple journey. Not another directory.", howText: "The directory remains useful for browsing. But MyCoco becomes most useful when your family's need becomes the starting point.",
    steps: [["01","Tell us what you need","Area, child age, childcare type and desired start date."],["02","See relevant options","Providers are presented in an order that is more useful for your situation."],["03","Compare before contacting","Provider type, area, available information and key things to verify."],["04","Keep your search together","Then create your space to save searches, favourites and next steps."]],
    directoryKicker: "EXPLORE BEFORE CHOOSING", directoryTitle: "Childcare near you, in one place.", directoryText: "Browse the directory when you want to explore freely, then switch to a personalized search when you're ready.", directoryCta: "View the full directory",
    providerKicker: "FOR CHILDCARE PROVIDERS", providerHeadline: "Your profile should become an acquisition tool, not just another line in a list.", providerBody: "With your provider space, you can present your offer clearly, keep information updated and progressively receive better-qualified requests. MyCoco is not built to sell empty traffic: the goal is to connect the right family with the right provider.", providerBullets: ["A clear, complete profile", "Information maintained by the provider", "Relevant local visibility", "Later: requests, messages, availability and Pro tools"], providerCta2: "Discover the provider space",
    officialKicker: "TRANSPARENCY", officialTitle: "MyCoco complements Quebec's official childcare process.", officialText: "MyCoco helps families discover, compare and organize their search. A listing never guarantees a spot. Official admissions and applicable rules remain those of providers and competent authorities.",
    aboutKicker: "WHY MYCOCO", aboutTitle: "Because finding childcare already takes enough energy.", aboutText: "We are building MyCoco around one simple principle: families are not looking for a database, they are looking for a solution that fits real life. Childcare is our starting point. Over time, MyCoco aims to become the family reflex for useful services around children.", aboutCta: "Discover our vision",
    finalTitle: "Start with your need. MyCoco makes the search clearer.", finalCta: "Find my childcare",
  };

  return <main className="mc-home-9">
    <section className="h9-hero">
      <div className="h9-wrap h9-hero-grid">
        <div className="h9-copy">
          <span className="h9-kicker">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="h9-actions">
            <Link href={`/${locale}/mon-besoin`} className="h9-btn h9-btn-primary">{t.mainCta}<span>→</span></Link>
            <Link href={`/${locale}/garderies`} className="h9-btn h9-btn-ghost">{t.browseCta}</Link>
          </div>
          <div className="h9-trust">{t.trust.map(item => <span key={item}>✓ {item}</span>)}</div>
        </div>

        <div className="h9-role-panel">
          <div className="h9-role-intro"><span>{fr ? "CHOISISSEZ VOTRE PARCOURS" : "CHOOSE YOUR JOURNEY"}</span><strong>{fr ? "Vous êtes…" : "You are…"}</strong></div>
          <Link href={`/${locale}/mon-besoin`} className="h9-role h9-role-family">
            <span className="h9-role-index">01</span><div><small>{t.familyTitle}</small><h2>{t.familyText}</h2><b>{t.familyCta} →</b></div>
          </Link>
          <Link href={`/${locale}/inscription?role=provider`} className="h9-role h9-role-provider">
            <span className="h9-role-index">02</span><div><small>{t.providerTitle}</small><h2>{t.providerText}</h2><b>{t.providerCta} →</b></div>
          </Link>
          <div className="h9-role-login">{fr ? "Déjà inscrit ?" : "Already registered?"} <Link href={`/${locale}/connexion`}>{fr ? "Se connecter" : "Sign in"} →</Link></div>
        </div>
      </div>
    </section>

    <section className="h9-how"><div className="h9-wrap h9-how-grid">
      <div className="h9-section-copy"><span>{t.howKicker}</span><h2>{t.howTitle}</h2><p>{t.howText}</p></div>
      <div className="h9-steps">{t.steps.map(([n,title,text]) => <article key={n}><b>{n}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </div></section>

    <section className="h9-directory"><div className="h9-wrap">
      <div className="h9-directory-head"><div><span>{t.directoryKicker}</span><h2>{t.directoryTitle}</h2><p>{t.directoryText}</p></div><Link href={`/${locale}/garderies`} className="h9-link">{t.directoryCta} →</Link></div>
      <div className="h9-listings">{featured.map(record => <Link key={record.id} href={`/${locale}/garderie/${record.slug}`} className="h9-listing"><div className="h9-listing-art"><span>{record.name.slice(0,1).toUpperCase()}</span></div><small>{typeLabel(record.type,fr)}</small><h3>{record.name}</h3><p>{record.city}</p><b>{fr ? "Voir la fiche" : "View profile"} →</b></Link>)}</div>
    </div></section>

    <section className="h9-provider"><div className="h9-wrap h9-provider-grid">
      <div className="h9-provider-card">
        <div className="h9-provider-card-head"><span>MYCOCO PRO</span><b>{fr ? "ESPACE SERVICE" : "PROVIDER SPACE"}</b></div>
        <div className="h9-provider-profile"><div className="h9-provider-logo">M</div><div><strong>{fr ? "Votre service de garde" : "Your childcare service"}</strong><small>{fr ? "Votre fiche, vos informations, votre visibilité" : "Your profile, information and visibility"}</small></div></div>
        <div className="h9-provider-features">{t.providerBullets.map(item => <span key={item}>✓ {item}</span>)}</div>
      </div>
      <div className="h9-section-copy h9-provider-copy"><span>{t.providerKicker}</span><h2>{t.providerHeadline}</h2><p>{t.providerBody}</p><Link href={`/${locale}/pour-les-services`} className="h9-btn h9-btn-light">{t.providerCta2}<span>→</span></Link></div>
    </div></section>

    <section className="h9-transparency"><div className="h9-wrap h9-transparency-box"><span>i</span><div><small>{t.officialKicker}</small><h2>{t.officialTitle}</h2><p>{t.officialText}</p></div></div></section>

    <section className="h9-about"><div className="h9-wrap h9-about-grid"><div className="h9-section-copy"><span>{t.aboutKicker}</span><h2>{t.aboutTitle}</h2></div><div><p>{t.aboutText}</p><Link href={`/${locale}/a-propos`} className="h9-link">{t.aboutCta} →</Link></div></div></section>

    <section className="h9-final"><div className="h9-wrap"><span>MYCOCO</span><h2>{t.finalTitle}</h2><Link href={`/${locale}/mon-besoin`} className="h9-btn h9-btn-light">{t.finalCta}<span>→</span></Link></div></section>

    <style>{`
      .mc-home-9{--ink:#162c25;--deep:#0c211b;--cream:#f8f2e8;--paper:#fffdf9;--sage:#dce9e1;--sage2:#eef4f0;--terracotta:#d96f52;--terracotta2:#f4ddd5;--muted:#66756e;--line:#dce4df;background:var(--cream);color:var(--ink);overflow:hidden}.h9-wrap{width:min(1180px,calc(100% - 40px));margin:auto}.h9-hero{background:radial-gradient(circle at 72% 12%,#f2d9cf 0,transparent 29%),linear-gradient(135deg,#faf5eb 0,#edf4ef 100%);border-bottom:1px solid var(--line)}.h9-hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(420px,.95fr);gap:64px;align-items:center;padding:78px 0 72px}.h9-kicker,.h9-section-copy>span,.h9-directory-head>div>span,.h9-provider-card-head span,.h9-transparency-box small,.h9-final>div>span{font-size:10px;font-weight:950;letter-spacing:.16em;color:#a95743}.h9-copy h1{font-size:clamp(50px,6vw,82px);line-height:.93;letter-spacing:-.072em;max-width:760px;margin:17px 0 22px}.h9-copy>p{max-width:690px;color:var(--muted);font-size:18px;line-height:1.66;margin:0}.h9-actions{display:flex;gap:11px;flex-wrap:wrap;margin-top:28px}.h9-btn{display:inline-flex;align-items:center;justify-content:space-between;gap:22px;min-height:52px;padding:0 19px;border-radius:13px;font-size:11px;font-weight:950;transition:.18s ease}.h9-btn-primary{background:var(--ink);color:#fff;box-shadow:0 13px 28px rgba(22,44,37,.16)}.h9-btn-primary:hover{background:var(--deep);transform:translateY(-2px)}.h9-btn-ghost{background:rgba(255,255,255,.7);border:1px solid #d8e1dc;color:var(--ink)}.h9-btn-light{background:#fff;color:var(--deep)}.h9-trust{display:flex;gap:16px;flex-wrap:wrap;margin-top:17px;color:#668078;font-size:10px;font-weight:850}.h9-role-panel{background:#fff;border:1px solid #dce4df;border-radius:28px;padding:14px;box-shadow:0 30px 80px rgba(22,44,37,.11)}.h9-role-intro{display:flex;align-items:end;justify-content:space-between;padding:15px 14px 13px}.h9-role-intro span{font-size:8px;letter-spacing:.14em;color:#8c9b94;font-weight:950}.h9-role-intro strong{font-size:19px;letter-spacing:-.04em}.h9-role{display:grid;grid-template-columns:42px 1fr;gap:14px;padding:19px;border-radius:19px;color:var(--ink);transition:.18s ease}.h9-role+.h9-role{margin-top:8px}.h9-role-family{background:#edf5f0}.h9-role-provider{background:#fbebe5}.h9-role:hover{transform:translateY(-2px);box-shadow:0 15px 34px rgba(22,44,37,.08)}.h9-role-index{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#fff;font-size:10px;font-weight:950}.h9-role small{font-size:9px;font-weight:950;letter-spacing:.1em}.h9-role h2{font-size:17px;line-height:1.35;letter-spacing:-.025em;margin:7px 0 13px}.h9-role b{font-size:10px}.h9-role-login{text-align:center;padding:15px 10px 7px;color:#7e8b85;font-size:9px}.h9-role-login a{color:var(--ink);font-weight:900}.h9-how{background:#fff;padding:92px 0}.h9-how-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:90px}.h9-section-copy h2,.h9-directory-head h2,.h9-transparency-box h2,.h9-about h2{font-size:clamp(34px,4.3vw,56px);line-height:.98;letter-spacing:-.058em;margin:13px 0 17px}.h9-section-copy p,.h9-directory-head p,.h9-about p,.h9-transparency-box p{color:var(--muted);font-size:14px;line-height:1.7}.h9-steps{display:grid}.h9-steps article{display:grid;grid-template-columns:46px 1fr;gap:18px;padding:22px 0;border-top:1px solid var(--line)}.h9-steps article:last-child{border-bottom:1px solid var(--line)}.h9-steps b{font-size:10px;color:#b36d58}.h9-steps h3{font-size:18px;letter-spacing:-.03em;margin:0 0 5px}.h9-steps p{color:#75827c;font-size:12px;line-height:1.55;margin:0}.h9-directory{padding:88px 0;background:var(--sage2)}.h9-directory-head{display:grid;grid-template-columns:1fr auto;gap:35px;align-items:end;margin-bottom:32px}.h9-directory-head>div{max-width:760px}.h9-link{display:inline-flex;color:var(--ink);font-size:11px;font-weight:950;border-bottom:1px solid #93a59c;padding-bottom:4px}.h9-listings{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.h9-listing{display:block;padding:14px 14px 18px;background:#fff;border:1px solid var(--line);border-radius:21px;color:var(--ink);transition:.18s ease}.h9-listing:hover{transform:translateY(-3px);box-shadow:0 20px 45px rgba(22,44,37,.08)}.h9-listing-art{height:180px;border-radius:15px;background:linear-gradient(140deg,#e4eee8,#f6e6df);display:grid;place-items:center;margin-bottom:16px}.h9-listing-art span{display:grid;place-items:center;width:68px;height:68px;border-radius:22px;background:#fff;color:#9e5a47;font-size:25px;font-weight:950;box-shadow:0 10px 30px rgba(22,44,37,.07)}.h9-listing small{color:#9c685a;font-size:8px;font-weight:950;letter-spacing:.1em}.h9-listing h3{font-size:19px;line-height:1.12;letter-spacing:-.035em;margin:8px 0 6px}.h9-listing p{color:#7b8781;font-size:10px;margin:0 0 17px}.h9-listing b{font-size:10px}.h9-provider{padding:96px 0;background:var(--deep);color:#fff}.h9-provider-grid{display:grid;grid-template-columns:1fr 1fr;gap:76px;align-items:center}.h9-provider-card{padding:24px;background:#fff;border-radius:26px;color:var(--ink);box-shadow:0 28px 70px rgba(0,0,0,.2)}.h9-provider-card-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:17px;border-bottom:1px solid var(--line)}.h9-provider-card-head b{font-size:8px;color:#819089}.h9-provider-profile{display:flex;gap:13px;align-items:center;padding:23px 0}.h9-provider-logo{display:grid;place-items:center;width:54px;height:54px;border-radius:17px;background:#f5ded6;color:#a75440;font-weight:950}.h9-provider-profile strong,.h9-provider-profile small{display:block}.h9-provider-profile strong{font-size:15px}.h9-provider-profile small{margin-top:5px;color:#7d8983;font-size:9px}.h9-provider-features{display:grid;gap:9px;padding:16px;background:#f4f7f5;border-radius:17px;color:#52665d;font-size:10px;font-weight:800}.h9-provider-copy>span{color:#efaa96}.h9-provider-copy h2{color:#fff}.h9-provider-copy p{color:#becdc6}.h9-provider-copy .h9-btn{margin-top:12px}.h9-transparency{padding:36px 0;background:#fff}.h9-transparency-box{display:grid;grid-template-columns:52px 1fr;gap:20px;align-items:start;padding:28px;border:1px solid var(--line);border-radius:22px;background:#fffdf9}.h9-transparency-box>span{display:grid;place-items:center;width:52px;height:52px;border-radius:15px;background:#edf4f0;font-size:18px;font-weight:950}.h9-transparency-box h2{font-size:28px;margin:8px 0 8px}.h9-transparency-box p{max-width:900px;font-size:12px;margin:0}.h9-about{padding:92px 0;background:var(--cream)}.h9-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:85px;align-items:start}.h9-about p{font-size:15px;margin:0 0 22px}.h9-final{padding:86px 0;background:var(--terracotta);color:#fff}.h9-final>div{display:flex;align-items:end;justify-content:space-between;gap:35px}.h9-final>div>span{color:#ffe7df}.h9-final h2{max-width:810px;font-size:clamp(38px,5vw,64px);line-height:.97;letter-spacing:-.06em;margin:12px 0 0}.h9-final .h9-btn{flex:0 0 auto}@media(max-width:960px){.h9-hero-grid,.h9-how-grid,.h9-provider-grid,.h9-about-grid{grid-template-columns:1fr}.h9-hero-grid{gap:38px}.h9-role-panel{max-width:700px}.h9-how-grid,.h9-provider-grid,.h9-about-grid{gap:42px}.h9-listings{grid-template-columns:1fr 1fr}.h9-directory-head{grid-template-columns:1fr}.h9-final>div{display:block}.h9-final .h9-btn{margin-top:25px}}@media(max-width:620px){.h9-wrap{width:calc(100% - 28px)}.h9-hero-grid{padding:48px 0}.h9-copy h1{font-size:48px}.h9-copy>p{font-size:15px}.h9-role-panel{padding:9px;border-radius:21px}.h9-role{grid-template-columns:34px 1fr;padding:15px}.h9-role-index{width:34px;height:34px}.h9-role h2{font-size:14px}.h9-how,.h9-directory,.h9-provider,.h9-about{padding:62px 0}.h9-listings{grid-template-columns:1fr}.h9-listing-art{height:150px}.h9-transparency-box{grid-template-columns:1fr}.h9-final{padding:62px 0}.h9-trust{display:grid;gap:7px}}
    `}</style>
  </main>;
}

import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

export default async function HomeLandingV8({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 3);

  const t = fr ? {
    eyebrow: "MYCOCO · LA GARDE QUI S’ADAPTE À VOTRE FAMILLE",
    titleA: "La bonne garde.",
    titleB: "Sans y passer vos soirées.",
    lead: "Dites-nous ce qui compte pour votre famille. MyCoco vous aide à repérer, comparer et suivre les services de garde pertinents près de chez vous — simplement.",
    primary: "Trouver une garde gratuitement",
    secondary: "Je suis un service de garde",
    proof: ["Gratuit pour les familles", "Sans engagement", "Pensé pour le Québec"],
    mockTitle: "Votre recherche MyCoco",
    mockLocation: "Mirabel",
    mockAge: "0–18 mois",
    mockNeed: "Toutes les solutions",
    mockMatch: "Solutions pertinentes",
    mockAlert: "Alerte active",
    painKicker: "MOINS DE RECHERCHE. PLUS DE CLARTÉ.",
    painTitle: "Un annuaire vous montre des noms. MyCoco part de votre réalité.",
    painText: "Ville, âge de votre enfant, type de garde et moment recherché : votre besoin devient le point de départ. Vous pouvez toujours parcourir l’annuaire librement, mais vous n’avez plus à tout trier seul.",
    benefits: [
      ["🎯", "Une recherche qui vous ressemble", "Vous décrivez votre besoin en quelques étapes. MyCoco organise ensuite les options autour de vos critères."],
      ["🔎", "Des informations utiles", "Type de service, secteur, informations disponibles et points à vérifier sont présentés sans inventer de disponibilité."],
      ["🔔", "Une recherche qui peut continuer", "Créez votre espace pour garder vos favoris, votre besoin et vos prochaines alertes au même endroit."],
    ],
    howKicker: "COMMENT ÇA MARCHE",
    howTitle: "Trois étapes. Pas quinze formulaires.",
    how: [
      ["01", "Décrivez", "Votre secteur, l’âge de votre enfant et vos préférences. Environ deux minutes."],
      ["02", "Comparez", "Découvrez les services pertinents et ouvrez les fiches qui méritent votre attention."],
      ["03", "Gardez le fil", "Créez ensuite votre espace famille pour enregistrer votre recherche et revenir sans recommencer."],
    ],
    directoryKicker: "EXPLORER LIBREMENT",
    directoryTitle: "Voir les services avant même de créer un compte.",
    directoryText: "MyCoco ne vous enferme pas derrière une inscription. Explorez d’abord. Créez votre espace seulement quand il vous apporte une vraie valeur.",
    directoryCta: "Explorer tous les services",
    view: "Voir la fiche",
    noPhoto: "Fiche à découvrir",
    providerKicker: "VOUS ÊTES UN SERVICE DE GARDE ?",
    providerTitle: "Transformez votre fiche en vraie vitrine locale.",
    providerText: "Créez gratuitement votre espace service, complétez vos informations et préparez votre présence MyCoco. L’objectif : être trouvé par des familles qui recherchent réellement dans votre secteur — puis, à terme, gérer demandes, disponibilités et leads au même endroit.",
    providerCta: "Créer mon espace service",
    providerLearn: "Découvrir MyCoco pour les services",
    providerMock: ["Profil public", "Informations & horaires", "Demandes reçues", "Visibilité locale"],
    trustKicker: "TRANSPARENCE AVANT TOUT",
    trustTitle: "MyCoco aide à choisir. Il ne promet jamais une place qui n’existe pas.",
    trustText: "Nous distinguons les informations disponibles, les données officielles et ce qui doit être confirmé directement auprès du service. MyCoco complète les démarches officielles du Québec : il ne les remplace pas.",
    aboutKicker: "POURQUOI MYCOCO",
    aboutTitle: "Parce qu’une famille ne cherche pas une base de données. Elle cherche une solution.",
    aboutText: "Nous commençons par la garde, parce que c’est un besoin concret, urgent et local. Notre vision est plus large : devenir le réflexe des familles pour trouver les bons services autour de l’enfant — garde, activités, camps, événements, professionnels et solutions de secours.",
    aboutCta: "Découvrir notre vision",
    faqKicker: "QUESTIONS FRÉQUENTES",
    faqTitle: "Simple dès le départ.",
    faqs: [
      ["Est-ce gratuit pour les familles ?", "Oui. La recherche, l’exploration de l’annuaire et la création du besoin sont gratuites au lancement, sans engagement."],
      ["Dois-je créer un compte pour chercher ?", "Non. Vous pouvez commencer votre recherche et explorer les services sans compte. L’espace famille sert ensuite à enregistrer, suivre et personnaliser votre parcours."],
      ["MyCoco garantit-il une place ?", "Non. Une place ou une disponibilité doit toujours être confirmée auprès du service de garde concerné et selon les démarches applicables au Québec."],
      ["Un service peut-il créer sa propre fiche ?", "Oui. Les services peuvent créer leur espace, compléter leur présence et, progressivement, accéder à des outils de visibilité et de gestion des demandes."],
    ],
    finalKicker: "PRÊT À COMMENCER ?",
    finalTitle: "Dites-nous ce dont votre famille a besoin.",
    finalText: "Deux minutes maintenant peuvent vous éviter des heures de recherche dispersée.",
    finalCta: "Trouver ma garde — gratuitement",
  } : {
    eyebrow: "MYCOCO · CHILDCARE THAT FITS YOUR FAMILY",
    titleA: "The right childcare.",
    titleB: "Without losing your evenings.",
    lead: "Tell us what matters to your family. MyCoco helps you find, compare and follow relevant childcare options nearby — simply.",
    primary: "Find childcare for free",
    secondary: "I’m a childcare provider",
    proof: ["Free for families", "No commitment", "Built for Quebec"],
    mockTitle: "Your MyCoco search", mockLocation: "Mirabel", mockAge: "0–18 months", mockNeed: "All options", mockMatch: "Relevant matches", mockAlert: "Alert active",
    painKicker: "LESS SEARCHING. MORE CLARITY.", painTitle: "A directory shows names. MyCoco starts with your reality.", painText: "City, child age, childcare type and timing: your need becomes the starting point. You can still browse freely, but you no longer have to sort everything alone.",
    benefits: [["🎯","A search built around you","Describe your need in a few steps. MyCoco organizes options around your criteria."],["🔎","Useful information","Provider type, location, available information and points to verify are shown without inventing availability."],["🔔","A search that keeps working","Create your space to keep favourites, your need and future alerts together."]],
    howKicker: "HOW IT WORKS", howTitle: "Three steps. Not fifteen forms.", how: [["01","Describe","Your area, child age and preferences. About two minutes."],["02","Compare","Discover relevant providers and open the profiles worth your attention."],["03","Keep track","Then create your family space to save your search and return without starting over."]],
    directoryKicker: "BROWSE FREELY", directoryTitle: "See providers before creating an account.", directoryText: "MyCoco does not hide value behind registration. Explore first. Create your space when it actually becomes useful.", directoryCta: "Browse all providers", view: "View profile", noPhoto: "Explore profile",
    providerKicker: "ARE YOU A CHILDCARE PROVIDER?", providerTitle: "Turn your listing into a real local storefront.", providerText: "Create your provider space for free, complete your information and prepare your MyCoco presence. The goal: be discovered by families actively searching in your area — then progressively manage enquiries, availability and leads in one place.", providerCta: "Create provider space", providerLearn: "Discover MyCoco for providers", providerMock: ["Public profile","Information & hours","Received enquiries","Local visibility"],
    trustKicker: "TRANSPARENCY FIRST", trustTitle: "MyCoco helps families choose. It never promises a spot that does not exist.", trustText: "We distinguish available information, official data and what must be confirmed directly with the provider. MyCoco complements Quebec’s official process; it does not replace it.",
    aboutKicker: "WHY MYCOCO", aboutTitle: "Families are not looking for a database. They are looking for a solution.", aboutText: "We start with childcare because it is concrete, urgent and local. Our broader vision is to become the family reflex for useful services around children — childcare, activities, camps, events, professionals and backup solutions.", aboutCta: "Discover our vision",
    faqKicker: "COMMON QUESTIONS", faqTitle: "Simple from the start.", faqs: [["Is it free for families?","Yes. Search, directory browsing and creating a need are free at launch, with no commitment."],["Do I need an account to search?","No. Start searching and browsing without an account. Your family space is useful later to save, track and personalize your journey."],["Does MyCoco guarantee a spot?","No. Any spot or availability must be confirmed with the childcare provider and according to applicable Quebec processes."],["Can providers create their own listing?","Yes. Providers can create a space, complete their presence and progressively access visibility and enquiry-management tools."]],
    finalKicker: "READY TO START?", finalTitle: "Tell us what your family needs.", finalText: "Two minutes now can save hours of scattered searching.", finalCta: "Find childcare — free",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return <main className="mc-home-v12">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

    <section className="v12-hero">
      <div className="v12-orb v12-orb-one" />
      <div className="v12-orb v12-orb-two" />
      <div className="v12-wrap v12-hero-grid">
        <div className="v12-hero-copy">
          <div className="v12-eyebrow"><span>✦</span>{t.eyebrow}</div>
          <h1><span>{t.titleA}</span><strong>{t.titleB}</strong></h1>
          <p>{t.lead}</p>
          <div className="v12-hero-actions">
            <Link className="v12-btn v12-btn-primary" href={`/${locale}/mon-besoin`}><span>{t.primary}</span><b>→</b></Link>
            <Link className="v12-btn v12-btn-quiet" href={`/${locale}/pour-les-services`}><span>🏫</span>{t.secondary}</Link>
          </div>
          <div className="v12-proof">{t.proof.map((item) => <span key={item}><b>✓</b>{item}</span>)}</div>
        </div>

        <div className="v12-product" aria-label={t.mockTitle}>
          <div className="v12-product-top"><span><i />MyCoco</span><b>{fr ? "RECHERCHE FAMILLE" : "FAMILY SEARCH"}</b></div>
          <div className="v12-product-head"><div><small>{t.mockTitle}</small><h2>{fr ? "On part de vous." : "Start with you."}</h2></div><div className="v12-product-status"><i />{t.mockAlert}</div></div>
          <div className="v12-search-chips"><span>📍 {t.mockLocation}</span><span>👶 {t.mockAge}</span><span>✨ {t.mockNeed}</span></div>
          <div className="v12-product-divider"><span>{t.mockMatch}</span><b>{featured.length || 3}</b></div>
          <div className="v12-mini-results">
            {featured.slice(0, 2).map((record, index) => <div className="v12-mini-result" key={record.id} style={{ animationDelay: `${index * 160 + 280}ms` }}><div className="v12-mini-avatar">{record.name.slice(0, 1).toUpperCase()}</div><div><strong>{record.name}</strong><small>{record.city} · {typeLabel(record.type, fr)}</small></div><span>→</span></div>)}
            {featured.length === 0 && <><div className="v12-mini-result"><div className="v12-mini-avatar">M</div><div><strong>MyCoco</strong><small>{fr ? "Les solutions pertinentes apparaîtront ici" : "Relevant options will appear here"}</small></div><span>→</span></div></>}
          </div>
          <div className="v12-product-foot"><span><i>✓</i>{fr ? "Aucune disponibilité inventée" : "No invented availability"}</span><Link href={`/${locale}/mon-besoin`}>{fr ? "Lancer ma recherche" : "Start my search"} →</Link></div>
        </div>
      </div>
    </section>

    <section className="v12-trustbar"><div className="v12-wrap"><span>👨‍👩‍👧 {fr ? "Pensé pour les familles" : "Built for families"}</span><span>🏡 {fr ? "Services locaux" : "Local providers"}</span><span>🔒 {fr ? "Espace sécurisé" : "Secure account"}</span><span>💛 {fr ? "Gratuit pour commencer" : "Free to start"}</span></div></section>

    <section className="v12-section v12-paper"><div className="v12-wrap v12-split">
      <div className="v12-section-copy"><span>{t.painKicker}</span><h2>{t.painTitle}</h2><p>{t.painText}</p><Link className="v12-text-link" href={`/${locale}/comment-ca-marche`}>{fr ? "Voir comment MyCoco fonctionne" : "See how MyCoco works"} →</Link></div>
      <div className="v12-benefits">{t.benefits.map(([icon, title, text], index) => <article key={title}><div className="v12-benefit-icon">{icon}</div><div><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </div></section>

    <section className="v12-section v12-soft"><div className="v12-wrap">
      <div className="v12-heading"><span>{t.howKicker}</span><h2>{t.howTitle}</h2></div>
      <div className="v12-how">{t.how.map(([n, title, text], index) => <article key={n}><div className="v12-how-top"><b>{n}</b><span>{index === 0 ? "👋" : index === 1 ? "🔎" : "💾"}</span></div><h3>{title}</h3><p>{text}</p>{index < 2 && <i>→</i>}</article>)}</div>
      <div className="v12-how-cta"><Link className="v12-btn v12-btn-primary" href={`/${locale}/mon-besoin`}><span>{t.primary}</span><b>→</b></Link><small>{fr ? "Aucun compte requis pour commencer." : "No account required to start."}</small></div>
    </div></section>

    <section className="v12-section v12-directory"><div className="v12-wrap">
      <div className="v12-directory-head"><div><span>{t.directoryKicker}</span><h2>{t.directoryTitle}</h2><p>{t.directoryText}</p></div><Link className="v12-text-link" href={`/${locale}/garderies`}>{t.directoryCta} →</Link></div>
      <div className="v12-listings">{featured.map((record) => <Link key={record.id} href={`/${locale}/garderie/${record.slug}`} className="v12-listing"><div className="v12-listing-visual"><span>{record.name.slice(0, 1).toUpperCase()}</span><small>{t.noPhoto}</small></div><div className="v12-listing-copy"><small>{typeLabel(record.type, fr)}</small><h3>{record.name}</h3><p>📍 {record.city}{record.postalCode ? ` · ${record.postalCode}` : ""}</p><b>{t.view} →</b></div></Link>)}</div>
    </div></section>

    <section className="v12-provider"><div className="v12-wrap v12-provider-grid">
      <div className="v12-provider-copy"><span>{t.providerKicker}</span><h2>{t.providerTitle}</h2><p>{t.providerText}</p><div className="v12-provider-actions"><Link className="v12-btn v12-btn-light" href={`/${locale}/inscription?role=provider`}><span>{t.providerCta}</span><b>→</b></Link><Link className="v12-provider-link" href={`/${locale}/pour-les-services`}>{t.providerLearn} →</Link></div><small>✓ {fr ? "Création de compte gratuite · Sans engagement" : "Free account creation · No commitment"}</small></div>
      <div className="v12-dashboard">
        <div className="v12-dashboard-top"><div><span className="v12-dash-logo">m</span><div><strong>MyCoco Pro</strong><small>{fr ? "Votre espace service" : "Your provider space"}</small></div></div><span className="v12-live"><i />{fr ? "ESPACE ACTIF" : "ACTIVE SPACE"}</span></div>
        <div className="v12-dashboard-stat"><small>{fr ? "PRÉSENCE MYCOCO" : "MYCOCO PRESENCE"}</small><strong>75%</strong><div><span /></div><p>{fr ? "Complétez votre fiche pour aider les familles à mieux vous comprendre." : "Complete your profile to help families understand your service."}</p></div>
        <div className="v12-dashboard-list">{t.providerMock.map((item, index) => <div key={item}><span>{index === 0 ? "◉" : index === 1 ? "⌁" : index === 2 ? "↗" : "✦"}</span><strong>{item}</strong><b>{index < 2 ? "✓" : "→"}</b></div>)}</div>
      </div>
    </div></section>

    <section className="v12-section v12-paper"><div className="v12-wrap v12-trust-card"><div className="v12-trust-icon">✓</div><div><span>{t.trustKicker}</span><h2>{t.trustTitle}</h2><p>{t.trustText}</p></div></div></section>

    <section className="v12-section v12-about"><div className="v12-wrap v12-about-grid"><div><span>{t.aboutKicker}</span><h2>{t.aboutTitle}</h2></div><div><p>{t.aboutText}</p><Link className="v12-text-link" href={`/${locale}/a-propos`}>{t.aboutCta} →</Link><div className="v12-future"><span>👶 {fr ? "Garde" : "Childcare"}</span><span>⚽ {fr ? "Activités" : "Activities"}</span><span>☀️ {fr ? "Camps" : "Camps"}</span><span>🧩 {fr ? "Professionnels" : "Professionals"}</span></div></div></div></section>

    <section className="v12-section v12-faq"><div className="v12-wrap v12-faq-grid"><div className="v12-heading v12-heading-sticky"><span>{t.faqKicker}</span><h2>{t.faqTitle}</h2></div><div className="v12-faq-list">{t.faqs.map(([q, a], index) => <details key={q} open={index === 0}><summary><span>{q}</span><b>+</b></summary><p>{a}</p></details>)}</div></div></section>

    <section className="v12-final"><div className="v12-final-orb" /><div className="v12-wrap"><span>{t.finalKicker}</span><h2>{t.finalTitle}</h2><p>{t.finalText}</p><Link className="v12-btn v12-btn-light" href={`/${locale}/mon-besoin`}><span>{t.finalCta}</span><b>→</b></Link><small>✓ {fr ? "Gratuit · Sans engagement · Sans compte pour commencer" : "Free · No commitment · No account to start"}</small></div></section>

    <style>{`
      .mc-home-v12{--ink:#17352c;--ink2:#0d241d;--cream:#fffaf2;--paper:#fffdf9;--peach:#f7ddcf;--coral:#ef7e61;--sage:#dcebe1;--sage2:#eef6f1;--mint:#9bc9b0;--muted:#68776f;--line:#e2e8e3;background:var(--cream);color:var(--ink);overflow:hidden}.v12-wrap{width:min(1180px,calc(100% - 40px));margin:auto}.v12-hero{position:relative;isolation:isolate;background:linear-gradient(135deg,#fffaf2 0%,#f7fbf8 55%,#fff7f2 100%);border-bottom:1px solid var(--line)}.v12-orb{position:absolute;border-radius:50%;filter:blur(2px);opacity:.7;z-index:-1;animation:v12Float 8s ease-in-out infinite}.v12-orb-one{width:380px;height:380px;right:-70px;top:-90px;background:radial-gradient(circle,#f7cdbf 0%,rgba(247,205,191,0) 70%)}.v12-orb-two{width:300px;height:300px;left:40%;bottom:-150px;background:radial-gradient(circle,#cce7d8 0%,rgba(204,231,216,0) 72%);animation-delay:-3s}.v12-hero-grid{display:grid;grid-template-columns:minmax(0,1.04fr) minmax(430px,.96fr);gap:68px;align-items:center;padding:82px 0 84px}.v12-eyebrow,.v12-section-copy>span,.v12-heading>span,.v12-directory-head>div>span,.v12-provider-copy>span,.v12-trust-card>div>span,.v12-about-grid>div>span,.v12-final>div>span{font-size:10px;font-weight:950;letter-spacing:.15em;color:#b35d47}.v12-eyebrow{display:flex;align-items:center;gap:8px}.v12-eyebrow>span{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#fbe7df}.v12-hero-copy h1{margin:18px 0 23px;font-size:clamp(54px,6.7vw,88px);line-height:.92;letter-spacing:-.075em}.v12-hero-copy h1 span,.v12-hero-copy h1 strong{display:block}.v12-hero-copy h1 span{font-weight:950}.v12-hero-copy h1 strong{font-weight:550;color:#315e50}.v12-hero-copy>p{max-width:680px;margin:0;color:var(--muted);font-size:18px;line-height:1.65}.v12-hero-actions{display:flex;flex-wrap:wrap;gap:11px;margin-top:30px}.v12-btn{display:inline-flex;align-items:center;justify-content:space-between;gap:20px;min-height:54px;padding:0 20px;border-radius:14px;font-size:11px;font-weight:950;transition:transform .18s ease,box-shadow .18s ease,background .18s ease}.v12-btn-primary{background:var(--ink);color:#fff;box-shadow:0 14px 32px rgba(23,53,44,.17)}.v12-btn-primary:hover{transform:translateY(-2px);background:var(--ink2);box-shadow:0 18px 38px rgba(23,53,44,.2)}.v12-btn-quiet{background:rgba(255,255,255,.72);border:1px solid #dce4df;color:var(--ink)}.v12-btn-light{background:#fff;color:var(--ink2);box-shadow:0 12px 28px rgba(0,0,0,.12)}.v12-proof{display:flex;flex-wrap:wrap;gap:15px;margin-top:16px}.v12-proof span{display:flex;align-items:center;gap:6px;color:#6b7b73;font-size:10px;font-weight:800}.v12-proof b{display:grid;place-items:center;width:17px;height:17px;border-radius:50%;background:#e2f1e8;color:#2a6a52;font-size:9px}.v12-product{position:relative;background:rgba(255,255,255,.92);border:1px solid #dde6e0;border-radius:28px;padding:17px;box-shadow:0 35px 90px rgba(23,53,44,.13);transform:rotate(.4deg);animation:v12Rise .65s ease both}.v12-product:before{content:"";position:absolute;inset:8px;border:1px solid rgba(23,53,44,.04);border-radius:21px;pointer-events:none}.v12-product-top,.v12-product-head,.v12-product-foot{display:flex;align-items:center;justify-content:space-between;gap:15px}.v12-product-top{padding:5px 5px 15px;border-bottom:1px solid #edf1ee}.v12-product-top>span{display:flex;align-items:center;gap:7px;font-size:11px;font-weight:950}.v12-product-top>span i{width:10px;height:10px;border-radius:4px;background:var(--coral)}.v12-product-top>b{font-size:7px;letter-spacing:.13em;color:#87938d}.v12-product-head{padding:20px 5px 15px;align-items:start}.v12-product-head small{color:#8c9791;font-size:9px;font-weight:850}.v12-product-head h2{font-size:28px;letter-spacing:-.05em;margin:4px 0 0}.v12-product-status{display:flex;align-items:center;gap:6px;padding:7px 9px;border-radius:999px;background:#edf7f1;color:#2e644f;font-size:8px;font-weight:900}.v12-product-status i,.v12-live i{width:7px;height:7px;border-radius:50%;background:#48a476;box-shadow:0 0 0 4px rgba(72,164,118,.13);animation:v12Pulse 1.8s ease-in-out infinite}.v12-search-chips{display:flex;flex-wrap:wrap;gap:7px;padding:0 5px 17px}.v12-search-chips span{padding:8px 10px;border:1px solid #e2e8e3;border-radius:10px;background:#fffaf6;color:#4d6158;font-size:9px;font-weight:850}.v12-product-divider{display:flex;justify-content:space-between;align-items:center;padding:13px 5px 9px;border-top:1px solid #edf1ee;color:#7e8b85;font-size:8px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.v12-product-divider b{display:grid;place-items:center;width:25px;height:25px;border-radius:8px;background:#17352c;color:#fff;font-size:9px}.v12-mini-results{display:grid;gap:8px}.v12-mini-result{display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;padding:10px;border:1px solid #e5ebe7;border-radius:13px;background:#fff;animation:v12Slide .55s ease both}.v12-mini-avatar{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#e7f2eb,#f8e5dc);font-size:14px;font-weight:950;color:#315e50}.v12-mini-result strong,.v12-mini-result small{display:block}.v12-mini-result strong{font-size:10px}.v12-mini-result small{margin-top:3px;color:#84908a;font-size:8px}.v12-mini-result>span{color:#315e50;font-weight:900}.v12-product-foot{padding:14px 4px 3px}.v12-product-foot>span{display:flex;gap:6px;color:#7f8b85;font-size:8px}.v12-product-foot>span i{font-style:normal;color:#2f7759}.v12-product-foot a{font-size:8px;font-weight:950;color:#224e40}.v12-trustbar{background:#17352c;color:#fff}.v12-trustbar>div{min-height:58px;display:grid;grid-template-columns:repeat(4,1fr);align-items:center}.v12-trustbar span{display:flex;justify-content:center;border-right:1px solid rgba(255,255,255,.12);font-size:9px;font-weight:850;color:#deebe5}.v12-trustbar span:last-child{border-right:0}.v12-section{padding:92px 0}.v12-paper{background:var(--paper)}.v12-soft{background:#edf5f0}.v12-split{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:80px;align-items:start}.v12-section-copy h2,.v12-heading h2,.v12-directory-head h2,.v12-provider-copy h2,.v12-trust-card h2,.v12-about-grid h2,.v12-final h2{font-size:clamp(38px,4.7vw,61px);line-height:.98;letter-spacing:-.06em;margin:14px 0 18px}.v12-section-copy p,.v12-directory-head p,.v12-provider-copy p,.v12-trust-card p,.v12-about-grid p,.v12-final p{color:var(--muted);font-size:15px;line-height:1.7}.v12-text-link{display:inline-flex;margin-top:10px;color:#245747;font-size:10px;font-weight:950}.v12-benefits{display:grid;border-top:1px solid var(--line)}.v12-benefits article{display:grid;grid-template-columns:54px 1fr;gap:17px;padding:23px 0;border-bottom:1px solid var(--line)}.v12-benefit-icon{display:grid;place-items:center;width:50px;height:50px;border-radius:15px;background:#fff3ed;font-size:20px}.v12-benefits small{font-size:8px;font-weight:950;color:#b35d47}.v12-benefits h3{font-size:21px;letter-spacing:-.035em;margin:5px 0 6px}.v12-benefits p{color:#75837c;font-size:11px;line-height:1.6;margin:0}.v12-heading{max-width:760px}.v12-how{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-top:38px}.v12-how article{position:relative;padding:24px;background:#fff;border:1px solid #dae5de;border-radius:21px}.v12-how-top{display:flex;justify-content:space-between;align-items:center}.v12-how-top b{font-size:9px;color:#b35d47}.v12-how-top span{font-size:21px}.v12-how h3{font-size:24px;letter-spacing:-.04em;margin:38px 0 10px}.v12-how p{min-height:57px;color:#75837c;font-size:11px;line-height:1.6}.v12-how article>i{position:absolute;right:-19px;top:50%;z-index:3;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:#17352c;color:#fff;font-style:normal}.v12-how-cta{display:flex;align-items:center;gap:16px;margin-top:24px}.v12-how-cta small{color:#76847d;font-size:9px}.v12-directory{background:#fffaf2}.v12-directory-head{display:flex;justify-content:space-between;gap:50px;align-items:end}.v12-directory-head>div{max-width:780px}.v12-directory-head .v12-text-link{white-space:nowrap;margin-bottom:12px}.v12-listings{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:36px}.v12-listing{overflow:hidden;border:1px solid #e3e6e1;border-radius:20px;background:#fff;transition:transform .18s ease,box-shadow .18s ease}.v12-listing:hover{transform:translateY(-4px);box-shadow:0 18px 42px rgba(23,53,44,.09)}.v12-listing-visual{height:155px;display:grid;place-items:center;align-content:center;gap:7px;background:linear-gradient(135deg,#e9f3ed,#fae7df);position:relative}.v12-listing-visual>span{display:grid;place-items:center;width:54px;height:54px;border-radius:17px;background:rgba(255,255,255,.75);font-size:21px;font-weight:950}.v12-listing-visual small{color:#6f8078;font-size:8px;font-weight:800}.v12-listing-copy{padding:19px}.v12-listing-copy>small{font-size:8px;font-weight:950;color:#b35d47;text-transform:uppercase}.v12-listing-copy h3{font-size:19px;letter-spacing:-.035em;margin:6px 0 7px}.v12-listing-copy p{color:#7b8882;font-size:9px;margin:0 0 17px}.v12-listing-copy b{font-size:9px;color:#245747}.v12-provider{padding:96px 0;background:#17352c;color:#fff;position:relative;overflow:hidden}.v12-provider:after{content:"";position:absolute;width:460px;height:460px;border-radius:50%;right:-170px;bottom:-220px;background:rgba(239,126,97,.12)}.v12-provider-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(420px,1.1fr);gap:80px;align-items:center;position:relative;z-index:2}.v12-provider-copy>span{color:#f3a28c}.v12-provider-copy h2{color:#fff}.v12-provider-copy p{color:#c1d2ca}.v12-provider-actions{display:flex;align-items:center;flex-wrap:wrap;gap:15px;margin-top:25px}.v12-provider-link{color:#d9e6e1;font-size:10px;font-weight:900}.v12-provider-copy>small{display:block;margin-top:15px;color:#a8beb5;font-size:8px}.v12-dashboard{background:#fff;color:#17352c;border-radius:25px;padding:17px;box-shadow:0 35px 80px rgba(0,0,0,.22);transform:rotate(-.8deg)}.v12-dashboard-top{display:flex;justify-content:space-between;align-items:center;padding:6px 5px 17px;border-bottom:1px solid #edf1ee}.v12-dashboard-top>div{display:flex;align-items:center;gap:9px}.v12-dash-logo{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:#17352c;color:#fff;font-weight:950}.v12-dashboard-top strong,.v12-dashboard-top small{display:block}.v12-dashboard-top strong{font-size:11px}.v12-dashboard-top small{font-size:8px;color:#87928d}.v12-live{display:flex;align-items:center;gap:7px;color:#39715a;font-size:7px;font-weight:950}.v12-dashboard-stat{margin:14px 0;padding:17px;border-radius:16px;background:#f6f2eb}.v12-dashboard-stat small{font-size:7px;font-weight:950;color:#8a7c71;letter-spacing:.1em}.v12-dashboard-stat strong{display:block;font-size:33px;letter-spacing:-.06em;margin:5px 0}.v12-dashboard-stat>div{height:6px;border-radius:999px;background:#e2ddd5;overflow:hidden}.v12-dashboard-stat>div span{display:block;width:75%;height:100%;background:#ef7e61}.v12-dashboard-stat p{font-size:8px;line-height:1.5;color:#7d756f;margin:8px 0 0}.v12-dashboard-list{display:grid;gap:7px}.v12-dashboard-list>div{display:grid;grid-template-columns:30px 1fr 20px;gap:8px;align-items:center;padding:11px;border:1px solid #e5ebe7;border-radius:11px}.v12-dashboard-list>div>span{display:grid;place-items:center;width:29px;height:29px;border-radius:9px;background:#edf5f0}.v12-dashboard-list strong{font-size:9px}.v12-dashboard-list b{color:#3c7f62;font-size:9px}.v12-trust-card{display:grid;grid-template-columns:75px 1fr;gap:28px;align-items:start;padding:34px;border:1px solid #e1e6e2;border-radius:26px;background:linear-gradient(135deg,#f5fbf7,#fff7f3)}.v12-trust-icon{display:grid;place-items:center;width:70px;height:70px;border-radius:22px;background:#17352c;color:#fff;font-size:27px}.v12-trust-card h2{max-width:900px;font-size:clamp(34px,4vw,52px)}.v12-trust-card p{max-width:860px;margin-bottom:0}.v12-about{background:#f5eee4}.v12-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px}.v12-about-grid>div:first-child>span{color:#b35d47}.v12-about-grid p{font-size:16px}.v12-future{display:flex;flex-wrap:wrap;gap:8px;margin-top:27px}.v12-future span{padding:9px 11px;border-radius:999px;background:rgba(255,255,255,.65);border:1px solid #e8ddd0;color:#5a5d57;font-size:9px;font-weight:850}.v12-faq{background:#fff}.v12-faq-grid{display:grid;grid-template-columns:.7fr 1.3fr;gap:80px}.v12-heading-sticky{position:sticky;top:130px;align-self:start}.v12-faq-list{border-top:1px solid var(--line)}.v12-faq-list details{border-bottom:1px solid var(--line)}.v12-faq-list summary{list-style:none;display:flex;justify-content:space-between;gap:20px;align-items:center;padding:22px 0;cursor:pointer;font-size:14px;font-weight:900}.v12-faq-list summary::-webkit-details-marker{display:none}.v12-faq-list summary b{font-size:20px;font-weight:400;color:#9b6e5c;transition:transform .18s ease}.v12-faq-list details[open] summary b{transform:rotate(45deg)}.v12-faq-list details p{padding:0 40px 22px 0;color:#728079;font-size:12px;line-height:1.65;margin:0}.v12-final{position:relative;overflow:hidden;background:#0d241d;color:#fff;padding:92px 0;text-align:center}.v12-final-orb{position:absolute;width:500px;height:500px;left:50%;top:-330px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(239,126,97,.3),rgba(239,126,97,0) 70%)}.v12-final>div{position:relative}.v12-final>div>span{color:#f3a28c}.v12-final h2{max-width:850px;margin:15px auto 17px;color:#fff}.v12-final p{max-width:620px;margin:0 auto 24px;color:#baccc4}.v12-final .v12-btn{margin:auto}.v12-final small{display:block;margin-top:14px;color:#90a69d;font-size:8px}@keyframes v12Float{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-16px,0)}}@keyframes v12Rise{from{opacity:0;transform:translateY(20px) rotate(.4deg)}to{opacity:1;transform:translateY(0) rotate(.4deg)}}@keyframes v12Slide{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}@keyframes v12Pulse{0%,100%{opacity:1}50%{opacity:.45}}@media(max-width:980px){.v12-hero-grid,.v12-split,.v12-provider-grid,.v12-about-grid,.v12-faq-grid{grid-template-columns:1fr}.v12-hero-grid{gap:44px;padding:62px 0}.v12-product{max-width:620px}.v12-trustbar>div{grid-template-columns:1fr 1fr}.v12-trustbar span{min-height:45px;border-bottom:1px solid rgba(255,255,255,.1)}.v12-how{grid-template-columns:1fr}.v12-how article>i{display:none}.v12-listings{grid-template-columns:1fr 1fr}.v12-provider-grid{gap:44px}.v12-dashboard{max-width:620px}.v12-heading-sticky{position:static}}@media(max-width:650px){.v12-wrap{width:calc(100% - 28px)}.v12-hero-grid{padding:45px 0 48px}.v12-hero-copy h1{font-size:49px}.v12-hero-copy>p{font-size:15px}.v12-hero-actions,.v12-provider-actions{display:grid}.v12-btn{width:100%}.v12-proof{gap:9px 13px}.v12-product{padding:12px;border-radius:21px}.v12-product-head h2{font-size:24px}.v12-product-status{display:none}.v12-search-chips span{font-size:8px}.v12-trustbar>div{grid-template-columns:1fr}.v12-trustbar span{justify-content:flex-start;padding-left:6px;border-right:0}.v12-section,.v12-provider,.v12-final{padding:67px 0}.v12-split,.v12-provider-grid,.v12-about-grid,.v12-faq-grid{gap:40px}.v12-section-copy h2,.v12-heading h2,.v12-directory-head h2,.v12-provider-copy h2,.v12-about-grid h2,.v12-final h2{font-size:39px}.v12-directory-head{display:block}.v12-directory-head .v12-text-link{margin-top:10px}.v12-listings{grid-template-columns:1fr}.v12-how-cta{display:grid}.v12-provider-grid{grid-template-columns:1fr}.v12-dashboard{transform:none}.v12-trust-card{grid-template-columns:1fr;padding:23px}.v12-trust-icon{width:54px;height:54px;border-radius:17px}.v12-about-grid{grid-template-columns:1fr}.v12-faq-list details p{padding-right:0}}@media(prefers-reduced-motion:reduce){.v12-orb,.v12-product,.v12-mini-result,.v12-product-status i,.v12-live i{animation:none!important}.v12-btn,.v12-listing,.v12-faq-list summary b{transition:none!important}}
    `}</style>
  </main>;
}

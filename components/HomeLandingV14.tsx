import Link from "next/link";
import { site } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

const cities = [["Mirabel","mirabel"],["Blainville","blainville"],["Boisbriand","boisbriand"],["Saint-Eustache","saint-eustache"],["Sainte-Thérèse","sainte-therese"]] as const;

export default async function HomeLandingV14({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 8);

  const copy = fr ? {
    eyebrow: "SERVICES DE GARDE AU QUÉBEC",
    title: "Trouvez la garde qui convient à votre famille.",
    lead: "CPE, garderies et milieux familiaux : recherchez près de chez vous, filtrez selon vos besoins et comparez les services avant de poursuivre vos démarches.",
    familyTab: "Je suis une famille",
    providerTab: "Je suis un service de garde",
    searchTitle: "Commencez votre recherche",
    searchText: "Quelques critères suffisent pour afficher les services les plus pertinents.",
    city: "Ville ou code postal",
    cityPlaceholder: "Ex. Mirabel ou J7J 1A1",
    age: "Âge de l’enfant",
    type: "Type de garde",
    allAges: "Tous les âges",
    allTypes: "Tous les services",
    search: "Voir les services de garde",
    accountNote: "Recherche gratuite. Aucun compte requis pour consulter les premiers résultats.",
    directoryKicker: "SERVICES DE GARDE",
    directoryTitle: "Découvrez les services répertoriés près de chez vous",
    directoryText: `MyCoco répertorie actuellement ${data.records.length} services dans ses données. La présence d’une fiche ne signifie pas qu’une place est disponible.`,
    allDirectory: "Voir tout l’annuaire",
    availability: "Disponibilité à confirmer",
    profile: "Voir le profil",
    howKicker: "COMMENT ÇA MARCHE",
    howTitle: "Une recherche simple, du besoin jusqu’au bon contact.",
    steps: [
      ["1", "Décrivez votre besoin", "Indiquez votre secteur, l’âge de votre enfant et le type de garde recherché."],
      ["2", "Comparez les services", "Consultez les fiches et priorisez les options qui correspondent réellement à votre situation."],
      ["3", "Poursuivez vos démarches", "Contactez le service et utilisez les démarches officielles du Québec lorsqu’elles sont requises."],
    ],
    providerKicker: "VOUS GÉREZ UN SERVICE DE GARDE ?",
    providerTitle: "Présentez votre service aux familles qui cherchent dans votre secteur.",
    providerText: "Créez ou revendiquez votre fiche, complétez vos informations et préparez votre présence MyCoco. À mesure que la plateforme grandit, votre espace deviendra le point central pour vos demandes, vos disponibilités et votre visibilité locale.",
    providerCta: "Créer mon espace service",
    providerSecondary: "Découvrir l’espace service",
    whyKicker: "POURQUOI MYCOCO",
    whyTitle: "Un annuaire utile, puis un vrai outil de matching.",
    whyText: "Un simple annuaire aide à découvrir l’offre. MyCoco va plus loin : votre besoin familial structure la recherche, les fiches deviennent comparables et votre espace vous permet de retrouver vos recherches, favoris et alertes. MyCoco complète le portail officiel du Québec, sans prétendre le remplacer.",
    howAbout: "En savoir plus sur MyCoco",
    localKicker: "RECHERCHE LOCALE",
    localTitle: "Nous commençons par les Laurentides.",
    localText: "La valeur d’une marketplace vient de sa densité locale. MyCoco se concentre d’abord sur quelques villes pour proposer une expérience réellement utile avant de s’étendre.",
    faqTitle: "Questions fréquentes",
    faqs: [
      ["Est-ce gratuit pour les familles ?", "Oui. La recherche et la consultation de base sont gratuites au lancement."],
      ["Une fiche signifie-t-elle qu’une place est libre ?", "Non. Une fiche répertoriée et une disponibilité confirmée sont deux choses différentes. MyCoco les distingue volontairement."],
      ["MyCoco remplace-t-il le portail officiel du Québec ?", "Non. MyCoco facilite la découverte, la comparaison et l’organisation de votre recherche. Les démarches officielles restent applicables lorsqu’elles sont requises."],
      ["Pourquoi créer un espace service ?", "Pour contrôler votre fiche, enrichir les informations présentées et préparer les futurs outils de demandes, disponibilités et visibilité."],
    ],
    finalTitle: "Prêt à commencer votre recherche ?",
    finalText: "Indiquez votre secteur et découvrez les services à comparer.",
  } : {
    eyebrow: "CHILDCARE SERVICES IN QUEBEC",
    title: "Find childcare that fits your family.",
    lead: "CPEs, daycares and home childcare: search nearby, filter by your needs and compare providers before moving forward.",
    familyTab: "I’m a family",
    providerTab: "I’m a childcare provider",
    searchTitle: "Start your search",
    searchText: "A few criteria are enough to show the most relevant providers.",
    city: "City or postal code",
    cityPlaceholder: "e.g. Mirabel or J7J 1A1",
    age: "Child’s age",
    type: "Care type",
    allAges: "All ages",
    allTypes: "All providers",
    search: "See childcare providers",
    accountNote: "Free search. No account required to view initial results.",
    directoryKicker: "CHILDCARE PROVIDERS",
    directoryTitle: "Explore providers listed near you",
    directoryText: `MyCoco currently lists ${data.records.length} providers in its data. A listing does not mean a spot is available.`,
    allDirectory: "View full directory",
    availability: "Availability to confirm",
    profile: "View profile",
    howKicker: "HOW IT WORKS",
    howTitle: "A simple journey from need to the right contact.",
    steps: [
      ["1", "Describe your need", "Tell us your area, your child’s age and the type of care you need."],
      ["2", "Compare providers", "Review profiles and prioritize the options that genuinely fit your situation."],
      ["3", "Move forward", "Contact the provider and use Quebec’s official process whenever required."],
    ],
    providerKicker: "DO YOU RUN A CHILDCARE SERVICE?",
    providerTitle: "Present your service to families searching in your area.",
    providerText: "Create or claim your listing, complete your information and build your MyCoco presence. As the platform grows, your provider space becomes the hub for demand, availability and local visibility.",
    providerCta: "Create my provider space",
    providerSecondary: "Explore provider tools",
    whyKicker: "WHY MYCOCO",
    whyTitle: "A useful directory, then a real matching tool.",
    whyText: "A directory helps families discover supply. MyCoco goes further: family needs shape the search, profiles become comparable and a family space keeps searches, favourites and alerts organized. MyCoco complements Quebec’s official portal rather than replacing it.",
    howAbout: "Learn more about MyCoco",
    localKicker: "LOCAL SEARCH",
    localTitle: "We start in the Laurentians.",
    localText: "Marketplace value comes from local density. MyCoco focuses on a few cities first to build a genuinely useful experience before expanding.",
    faqTitle: "Frequently asked questions",
    faqs: [
      ["Is MyCoco free for families?", "Yes. Basic search and discovery are free at launch."],
      ["Does a listing mean a spot is available?", "No. A listed profile and confirmed availability are different. MyCoco deliberately keeps them separate."],
      ["Does MyCoco replace Quebec’s official portal?", "No. MyCoco makes discovery, comparison and organization easier. Official processes remain applicable when required."],
      ["Why create a provider space?", "To control your listing, enrich your information and prepare for future demand, availability and visibility tools."],
    ],
    finalTitle: "Ready to start your search?",
    finalText: "Enter your area and discover childcare providers worth comparing.",
  };

  const websiteLd = {"@context":"https://schema.org","@type":"WebSite",name:"MyCoco",url:site.url,potentialAction:{"@type":"SearchAction",target:`${site.url}/${locale}/garderies?ville={search_term_string}`,"query-input":"required name=search_term_string"}};
  const faqLd = {"@context":"https://schema.org","@type":"FAQPage",mainEntity:copy.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};

  return <main className="mcs-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteLd)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}} />

    <section className="mcs-hero">
      <div className="mcs-shell mcs-hero-grid">
        <div className="mcs-hero-copy">
          <span className="mcs-eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.lead}</p>
          <div className="mcs-role-links" aria-label={fr ? "Choisir votre profil" : "Choose your profile"}>
            <Link className="active" href={`/${locale}/mon-besoin`}>{copy.familyTab}</Link>
            <Link href={`/${locale}/pour-les-services`}>{copy.providerTab}</Link>
          </div>
        </div>

        <div className="mcs-search-card">
          <h2>{copy.searchTitle}</h2>
          <p>{copy.searchText}</p>
          <form action={`/${locale}/garderies`} method="get">
            <label><span>{copy.city}</span><input name="ville" placeholder={copy.cityPlaceholder} /></label>
            <div className="mcs-form-row">
              <label><span>{copy.age}</span><select name="age" defaultValue=""><option value="">{copy.allAges}</option><option value="0-18">0–18 {fr ? "mois" : "months"}</option><option value="18-36">18–36 {fr ? "mois" : "months"}</option><option value="3-5">3–5 {fr ? "ans" : "years"}</option><option value="5+">5+ {fr ? "ans" : "years"}</option></select></label>
              <label><span>{copy.type}</span><select name="type" defaultValue=""><option value="">{copy.allTypes}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu familial">{fr ? "Milieu familial" : "Home childcare"}</option><option value="non subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label>
            </div>
            <button type="submit">{copy.search}</button>
          </form>
          <small>{copy.accountNote}</small>
        </div>
      </div>
    </section>

    <section className="mcs-trustbar"><div className="mcs-shell"><span>{fr ? "Recherche locale" : "Local search"}</span><span>{fr ? "Filtres utiles" : "Useful filters"}</span><span>{fr ? "Fiches comparables" : "Comparable profiles"}</span><span>{fr ? "Démarches officielles respectées" : "Official process respected"}</span></div></section>

    <section className="mcs-directory-section">
      <div className="mcs-shell">
        <div className="mcs-section-head"><div><span>{copy.directoryKicker}</span><h2>{copy.directoryTitle}</h2><p>{copy.directoryText}</p></div><Link href={`/${locale}/garderies`}>{copy.allDirectory}</Link></div>
        <div className="mcs-provider-grid">
          {featured.map((record, index) => <Link className="mcs-provider-card" href={`/${locale}/garderie/${record.slug}`} key={record.id}>
            <div className={`mcs-provider-cover cover-${(index % 4) + 1}`}><span>{record.name.slice(0,1).toUpperCase()}</span></div>
            <div className="mcs-provider-info"><small>{typeLabel(record.type,fr)} · {record.city}</small><h3>{record.name}</h3><p>{copy.availability}</p><div><span>{copy.profile}</span><b>→</b></div></div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="mcs-how-section">
      <div className="mcs-shell">
        <div className="mcs-centered-head"><span>{copy.howKicker}</span><h2>{copy.howTitle}</h2></div>
        <div className="mcs-steps">{copy.steps.map(([n,t,p]) => <article key={n}><b>{n}</b><h3>{t}</h3><p>{p}</p></article>)}</div>
        <div className="mcs-center-action"><Link href={`/${locale}/mon-besoin`}>{fr ? "Commencer ma recherche" : "Start my search"}</Link></div>
      </div>
    </section>

    <section className="mcs-provider-section">
      <div className="mcs-shell mcs-provider-split">
        <div className="mcs-provider-copy"><span>{copy.providerKicker}</span><h2>{copy.providerTitle}</h2><p>{copy.providerText}</p><div className="mcs-provider-actions"><Link className="primary" href={`/${locale}/inscription?role=provider`}>{copy.providerCta}</Link><Link href={`/${locale}/pour-les-services`}>{copy.providerSecondary}</Link></div></div>
        <div className="mcs-provider-panel" aria-hidden="true"><div className="mcs-panel-top"><span>MYCOCO</span><b>{fr ? "ESPACE SERVICE" : "PROVIDER SPACE"}</b></div><div className="mcs-panel-line"><span>{fr ? "Fiche publique" : "Public listing"}</span><strong>{fr ? "À compléter" : "Complete"}</strong></div><div className="mcs-panel-line"><span>{fr ? "Informations du service" : "Provider information"}</span><strong>75%</strong></div><div className="mcs-panel-line"><span>{fr ? "Demandes locales" : "Local demand"}</span><strong>{fr ? "Bientôt" : "Soon"}</strong></div><div className="mcs-panel-line"><span>{fr ? "Disponibilités" : "Availability"}</span><strong>{fr ? "Bientôt" : "Soon"}</strong></div></div>
      </div>
    </section>

    <section className="mcs-why-section"><div className="mcs-shell mcs-why-grid"><div><span>{copy.whyKicker}</span><h2>{copy.whyTitle}</h2></div><div><p>{copy.whyText}</p><Link href={`/${locale}/a-propos`}>{copy.howAbout} →</Link></div></div></section>

    <section className="mcs-local-section"><div className="mcs-shell mcs-local-grid"><div><span>{copy.localKicker}</span><h2>{copy.localTitle}</h2><p>{copy.localText}</p></div><div className="mcs-city-list">{cities.map(([name,slug]) => <Link href={`/${locale}/garderies/${slug}`} key={slug}><span>{fr ? `Services de garde à ${name}` : `Childcare in ${name}`}</span><b>→</b></Link>)}</div></div></section>

    <section className="mcs-faq-section"><div className="mcs-shell mcs-faq-grid"><div><span>FAQ</span><h2>{copy.faqTitle}</h2></div><div>{copy.faqs.map(([q,a]) => <details key={q}><summary>{q}<b>+</b></summary><p>{a}</p></details>)}</div></div></section>

    <section className="mcs-final"><div className="mcs-shell"><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p><Link href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}</Link></div></section>

    <style>{`
      .mcs-home{--blue:#333873;--blue-dark:#242954;--yellow:#ffd44f;--yellow-dark:#f1c231;--pink:#f8dfe7;--sky:#e8f3ff;--lilac:#f0edff;--paper:#fff;--bg:#f7f7fb;--text:#2b2d42;--muted:#6d7083;--line:#e2e3eb;color:var(--text);background:#fff;font-family:Arial,Helvetica,sans-serif}.mcs-shell{width:min(1160px,calc(100% - 40px));margin:auto}.mcs-hero{padding:68px 0 74px;background:linear-gradient(180deg,#fff 0%,#fbfbfe 100%)}.mcs-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 430px;gap:72px;align-items:center}.mcs-eyebrow,.mcs-section-head>div>span,.mcs-centered-head>span,.mcs-provider-copy>span,.mcs-why-grid>div>span,.mcs-local-grid>div>span,.mcs-faq-grid>div>span{display:block;color:#777a8d;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.mcs-hero-copy h1{max-width:700px;margin:13px 0 20px;color:var(--blue);font-size:clamp(48px,6.4vw,78px);line-height:.98;letter-spacing:-.055em}.mcs-hero-copy>p{max-width:650px;margin:0;color:var(--muted);font-size:18px;line-height:1.6}.mcs-role-links{display:inline-flex;margin-top:28px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#fff}.mcs-role-links a{padding:12px 15px;font-size:12px;font-weight:800;color:var(--blue)}.mcs-role-links a+a{border-left:1px solid var(--line)}.mcs-role-links a.active{background:var(--blue);color:#fff}.mcs-search-card{padding:28px;border:1px solid var(--line);border-radius:18px;background:#fff;box-shadow:0 22px 60px rgba(51,56,115,.12)}.mcs-search-card h2{margin:0 0 7px;color:var(--blue);font-size:27px;letter-spacing:-.035em}.mcs-search-card>p{margin:0 0 20px;color:var(--muted);font-size:13px;line-height:1.5}.mcs-search-card form{display:grid;gap:13px}.mcs-search-card label>span{display:block;margin-bottom:6px;color:#55586c;font-size:11px;font-weight:800}.mcs-search-card input,.mcs-search-card select{width:100%;height:49px;border:1px solid #d9dae5;border-radius:9px;background:#fff;padding:0 12px;color:var(--text);outline:none}.mcs-search-card input:focus,.mcs-search-card select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(51,56,115,.09)}.mcs-form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mcs-search-card button{height:50px;border:0;border-radius:9px;background:var(--yellow);color:var(--blue-dark);font-weight:900;cursor:pointer}.mcs-search-card button:hover{background:var(--yellow-dark)}.mcs-search-card>small{display:block;margin-top:12px;color:#858799;font-size:10px;line-height:1.4}.mcs-trustbar{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff}.mcs-trustbar>div{min-height:66px;display:grid;grid-template-columns:repeat(4,1fr);align-items:center}.mcs-trustbar span{padding:0 18px;text-align:center;color:#686b7c;font-size:11px;font-weight:800}.mcs-trustbar span+span{border-left:1px solid var(--line)}.mcs-directory-section{padding:82px 0;background:var(--bg)}.mcs-section-head{display:flex;justify-content:space-between;align-items:end;gap:30px}.mcs-section-head>div{max-width:760px}.mcs-section-head h2,.mcs-centered-head h2,.mcs-provider-copy h2,.mcs-why-grid h2,.mcs-local-grid h2,.mcs-faq-grid h2,.mcs-final h2{margin:9px 0 12px;color:var(--blue);font-size:clamp(32px,4.7vw,54px);line-height:1.02;letter-spacing:-.045em}.mcs-section-head p,.mcs-provider-copy p,.mcs-why-grid p,.mcs-local-grid p{margin:0;color:var(--muted);line-height:1.65}.mcs-section-head>a{flex:0 0 auto;padding:11px 14px;border:1px solid #d5d7e2;border-radius:9px;background:#fff;color:var(--blue);font-size:11px;font-weight:850}.mcs-provider-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:30px}.mcs-provider-card{overflow:hidden;border:1px solid var(--line);border-radius:14px;background:#fff;transition:transform .15s ease,box-shadow .15s ease}.mcs-provider-card:hover{transform:translateY(-3px);box-shadow:0 15px 35px rgba(51,56,115,.1)}.mcs-provider-cover{height:130px;display:grid;place-items:center;background:var(--sky)}.mcs-provider-cover.cover-2{background:var(--pink)}.mcs-provider-cover.cover-3{background:var(--lilac)}.mcs-provider-cover.cover-4{background:#fff0d7}.mcs-provider-cover>span{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#fff;color:var(--blue);font-size:24px;font-weight:900;box-shadow:0 7px 18px rgba(51,56,115,.08)}.mcs-provider-info{padding:16px}.mcs-provider-info>small{color:#85889b;font-size:9px;font-weight:800;text-transform:uppercase}.mcs-provider-info h3{min-height:40px;margin:6px 0 7px;color:var(--blue);font-size:17px;line-height:1.15}.mcs-provider-info p{margin:0;color:#8b8d9a;font-size:10px}.mcs-provider-info>div{display:flex;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid #ececf2;color:var(--blue);font-size:10px;font-weight:850}.mcs-how-section{padding:88px 0;background:#fff}.mcs-centered-head{max-width:760px;margin:0 auto;text-align:center}.mcs-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;margin-top:42px}.mcs-steps article{text-align:center;padding:0 22px}.mcs-steps article>b{display:grid;place-items:center;width:42px;height:42px;margin:0 auto 19px;border-radius:50%;background:var(--yellow);color:var(--blue);font-size:13px}.mcs-steps h3{margin:0 0 8px;color:var(--blue);font-size:20px}.mcs-steps p{margin:0;color:var(--muted);font-size:13px;line-height:1.6}.mcs-center-action{text-align:center;margin-top:34px}.mcs-center-action a,.mcs-final a{display:inline-flex;min-height:48px;align-items:center;padding:0 18px;border-radius:9px;background:var(--blue);color:#fff;font-size:12px;font-weight:900}.mcs-provider-section{padding:84px 0;background:var(--yellow)}.mcs-provider-split{display:grid;grid-template-columns:1fr 430px;gap:70px;align-items:center}.mcs-provider-copy>span{color:#626168}.mcs-provider-copy h2{color:var(--blue-dark)}.mcs-provider-copy p{color:#555363}.mcs-provider-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.mcs-provider-actions a{display:inline-flex;align-items:center;min-height:46px;padding:0 16px;border-radius:9px;border:1px solid rgba(36,41,84,.28);color:var(--blue-dark);font-size:11px;font-weight:850}.mcs-provider-actions a.primary{background:var(--blue);border-color:var(--blue);color:#fff}.mcs-provider-panel{padding:20px;border-radius:15px;background:#fff;box-shadow:0 18px 45px rgba(36,41,84,.14)}.mcs-panel-top{display:flex;justify-content:space-between;padding-bottom:14px;border-bottom:1px solid var(--line);color:var(--blue);font-size:10px}.mcs-panel-line{display:flex;justify-content:space-between;padding:15px 0;border-bottom:1px solid #ececf2;font-size:11px}.mcs-panel-line span{color:#727586}.mcs-panel-line strong{color:var(--blue)}.mcs-why-section{padding:82px 0;background:var(--blue);color:#fff}.mcs-why-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px}.mcs-why-grid>div>span{color:#c7c9e5}.mcs-why-grid h2{color:#fff}.mcs-why-grid p{color:#d9daea}.mcs-why-grid a{display:inline-block;margin-top:18px;color:#fff;font-size:12px;font-weight:850}.mcs-local-section{padding:82px 0;background:#fff}.mcs-local-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px}.mcs-city-list{border-top:1px solid var(--line)}.mcs-city-list a{display:flex;justify-content:space-between;padding:17px 3px;border-bottom:1px solid var(--line);color:var(--blue);font-size:12px;font-weight:850}.mcs-faq-section{padding:82px 0;background:var(--bg)}.mcs-faq-grid{display:grid;grid-template-columns:.75fr 1.25fr;gap:70px}.mcs-faq-section details{border-top:1px solid #d8d9e3}.mcs-faq-section details:last-child{border-bottom:1px solid #d8d9e3}.mcs-faq-section summary{display:flex;justify-content:space-between;gap:20px;padding:18px 0;color:var(--blue);font-size:13px;font-weight:850;cursor:pointer;list-style:none}.mcs-faq-section summary::-webkit-details-marker{display:none}.mcs-faq-section details p{margin:0;padding:0 30px 18px 0;color:var(--muted);font-size:12px;line-height:1.6}.mcs-final{padding:74px 0;text-align:center;background:#fff}.mcs-final>div{max-width:800px}.mcs-final p{margin:0 auto 22px;color:var(--muted)}
      @media(max-width:980px){.mcs-hero-grid,.mcs-provider-split,.mcs-why-grid,.mcs-local-grid,.mcs-faq-grid{grid-template-columns:1fr}.mcs-provider-grid{grid-template-columns:repeat(2,1fr)}.mcs-hero-grid{gap:38px}.mcs-provider-panel{max-width:600px}.mcs-trustbar>div{grid-template-columns:repeat(2,1fr)}.mcs-trustbar span:nth-child(3){border-left:0}.mcs-trustbar span{padding:13px}}
      @media(max-width:640px){.mcs-shell{width:min(100% - 28px,1160px)}.mcs-hero{padding:42px 0 48px}.mcs-hero-copy h1{font-size:46px}.mcs-hero-copy>p{font-size:16px}.mcs-role-links{display:grid;width:100%}.mcs-role-links a+a{border-left:0;border-top:1px solid var(--line)}.mcs-search-card{padding:21px}.mcs-form-row,.mcs-provider-grid,.mcs-steps,.mcs-trustbar>div{grid-template-columns:1fr}.mcs-trustbar span+span{border-left:0;border-top:1px solid var(--line)}.mcs-section-head{align-items:start;flex-direction:column}.mcs-provider-section,.mcs-directory-section,.mcs-how-section,.mcs-why-section,.mcs-local-section,.mcs-faq-section{padding:60px 0}.mcs-provider-split,.mcs-why-grid,.mcs-local-grid,.mcs-faq-grid{gap:36px}.mcs-provider-grid{gap:10px}.mcs-provider-cover{height:115px}}
    `}</style>
  </main>;
}

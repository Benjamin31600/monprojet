import Link from "next/link";
import { site } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

const cities = [["Mirabel","mirabel"],["Blainville","blainville"],["Boisbriand","boisbriand"],["Saint-Eustache","saint-eustache"],["Sainte-Thérèse","sainte-therese"]] as const;

export default async function HomeLandingV14({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 6);
  const copy = fr ? {
    eyebrow:"MYCOCO · LA GARDE QUI S’ADAPTE À VOTRE FAMILLE",
    title:"La bonne garde existe.", accent:"On vous aide à la trouver.",
    lead:"Garderie, CPE ou milieu familial : partez de votre vraie situation, comparez les options autour de vous et gardez le contrôle sur la suite.",
    searchLabel:"OÙ CHERCHEZ-VOUS ?", searchPlaceholder:"Ville ou code postal", searchCta:"Trouver une garde",
    proof:["Gratuit pour commencer","Sans compte avant les résultats","Données et disponibilité clairement distinguées"],
    roleKicker:"DEUX BESOINS. UNE SEULE PLATEFORME.", roleTitle:"Vous êtes ici pour quoi ?",
    familyTitle:"Je cherche une garde", familyText:"Décrivez votre besoin, découvrez les services à regarder en premier, comparez et enregistrez votre recherche si vous le souhaitez.", familyCta:"Commencer ma recherche",
    providerTitle:"Je propose un service de garde", providerText:"Créez ou revendiquez votre fiche, complétez vos informations et soyez visible auprès des familles qui cherchent réellement dans votre secteur.", providerCta:"Créer mon espace service",
    dirKicker:"L’OFFRE RÉELLE, TOUT DE SUITE", dirTitle:"Des services à explorer avant même de créer un compte.", dirText:`MyCoco répertorie déjà ${data.records.length} services dans ses données actuelles. Les informations publiques restent distinctes de la disponibilité réelle.`, dirCta:"Ouvrir l’annuaire",
    howKicker:"PAS UNE LISTE. UN PARCOURS.", howTitle:"De “je cherche” à “je sais quoi faire ensuite”.",
    steps:[["01","Décrivez votre situation","Secteur, âge et type de garde : seulement ce qui est utile au départ."],["02","MyCoco priorise","Les services pertinents remontent selon les critères disponibles, sans inventer d’avis ni de place."],["03","Comparez et avancez","Consultez les fiches, gardez vos options et poursuivez les démarches officielles lorsque nécessaire."]],
    trustKicker:"PENSÉ POUR LE QUÉBEC", trustTitle:"MyCoco simplifie la recherche. Le Québec encadre l’admission.", trustText:"MyCoco est une couche de découverte, de comparaison et d’organisation. Une présence dans nos résultats ne garantit jamais une place et ne remplace pas le Portail d’inscription aux services de garde ni les démarches applicables.", trustCta:"Comprendre comment ça marche",
    proKicker:"POUR LES SERVICES DE GARDE", proTitle:"Votre prochaine famille ne devrait pas vous trouver par hasard.", proText:"Votre espace MyCoco vous permet de construire une présence claire aujourd’hui, puis de transformer demain la demande locale en contacts mieux qualifiés.", proPoints:["Créer ou revendiquer votre fiche","Compléter horaires et informations","Mettre à jour vos disponibilités lorsque la fonction est activée","Comprendre la demande dans votre secteur"], proCta:"Créer mon espace — gratuit au lancement",
    localKicker:"SEO LOCAL · VALEUR LOCALE", localTitle:"On commence là où une marketplace peut devenir vraiment utile.", localText:"MyCoco densifie d’abord les Laurentides avant de s’étendre. Plus l’offre et la demande locales sont précises, plus le matching devient utile.",
    ecoKicker:"LE POINT DE DÉPART, PAS LA FIN", ecoTitle:"Aujourd’hui la garde. Demain, la vie autour de l’enfant.", ecoText:"Activités, camps, événements, professionnels, garde de secours et avantages employeurs : le même profil famille pourra progressivement connecter les besoins du quotidien.",
    faqTitle:"Les questions importantes avant de commencer", faqs:[["MyCoco est-il gratuit pour les familles ?","Oui, la recherche et la découverte de base sont gratuites au lancement. Les futures offres payantes éventuelles devront apporter une valeur supplémentaire clairement identifiable."],["Une fiche affichée signifie-t-elle qu’une place est disponible ?","Non. MyCoco distingue volontairement une fiche répertoriée, une disponibilité déclarée par un service et une admission confirmée."],["MyCoco remplace-t-il le portail officiel du Québec ?","Non. MyCoco aide à découvrir, comparer et organiser votre recherche. Les démarches officielles d’admission continuent de s’appliquer lorsque requises."],["Pourquoi un service de garde devrait-il créer son espace ?","Pour contrôler les informations présentées, enrichir sa fiche et, à mesure que MyCoco grandit, recevoir une demande locale plus pertinente plutôt qu’un trafic anonyme."]],
    finalTitle:"Commencez par votre besoin. Pas par 30 onglets.", finalText:"Dites-nous où vous cherchez. MyCoco vous aide à structurer la suite.",
  } : {
    eyebrow:"MYCOCO · CHILDCARE THAT FITS YOUR FAMILY", title:"The right childcare exists.", accent:"We help you find it.",
    lead:"Daycare, CPE or home childcare: start from your real situation, compare nearby options and stay in control of what happens next.",
    searchLabel:"WHERE ARE YOU LOOKING?", searchPlaceholder:"City or postal code", searchCta:"Find childcare",
    proof:["Free to start","No account before results","Listing data and availability clearly separated"],
    roleKicker:"TWO NEEDS. ONE PLATFORM.", roleTitle:"What brings you here?",
    familyTitle:"I’m looking for childcare", familyText:"Describe your need, discover providers worth looking at first, compare and save your search when you want to.", familyCta:"Start my search",
    providerTitle:"I provide childcare", providerText:"Create or claim your listing, complete your information and get discovered by families actively looking in your area.", providerCta:"Create my provider space",
    dirKicker:"REAL SUPPLY, RIGHT AWAY", dirTitle:"Browse providers before creating an account.", dirText:`MyCoco currently indexes ${data.records.length} providers in its data. Public listing information remains separate from actual availability.`, dirCta:"Open directory",
    howKicker:"NOT A LIST. A JOURNEY.", howTitle:"From “I’m searching” to “I know what to do next.”",
    steps:[["01","Describe your situation","Area, age and care type: only what is useful at the start."],["02","MyCoco prioritizes","Relevant providers rise based on available criteria without fabricated reviews or openings."],["03","Compare and move forward","Review profiles, keep options and continue official processes where required."]],
    trustKicker:"BUILT FOR QUEBEC", trustTitle:"MyCoco simplifies discovery. Quebec governs admission.", trustText:"MyCoco is a discovery, comparison and organization layer. A listing never guarantees a spot and never replaces Quebec’s official childcare registration portal or applicable admission process.", trustCta:"See how it works",
    proKicker:"FOR CHILDCARE PROVIDERS", proTitle:"Your next family should not find you by accident.", proText:"Your MyCoco space lets you build a clear presence today and turn local demand into better-qualified connections as the marketplace grows.", proPoints:["Create or claim your listing","Complete hours and information","Update openings when enabled","Understand local demand"], proCta:"Create my space — free at launch",
    localKicker:"LOCAL SEO · LOCAL VALUE", localTitle:"Start where a marketplace can become genuinely useful.", localText:"MyCoco builds density in the Laurentians first, then expands. Better local supply and demand make matching more useful.",
    ecoKicker:"THE STARTING POINT, NOT THE END", ecoTitle:"Childcare today. The child ecosystem tomorrow.", ecoText:"Activities, camps, events, professionals, backup care and employer benefits can progressively connect around the same family profile.",
    faqTitle:"Important questions before you start", faqs:[["Is MyCoco free for families?","Yes. Basic search and discovery are free at launch. Any future paid offer must provide clearly additional value."],["Does a listing mean a spot is available?","No. MyCoco deliberately separates a listed profile, provider-declared availability and confirmed admission."],["Does MyCoco replace Quebec’s official portal?","No. MyCoco helps families discover, compare and organize. Official admission processes continue to apply when required."],["Why should a provider create a space?","To control displayed information, enrich the listing and, as MyCoco grows, receive more relevant local demand rather than anonymous traffic."]],
    finalTitle:"Start with your need. Not 30 browser tabs.", finalText:"Tell us where you are looking. MyCoco helps structure what comes next.",
  };

  const websiteLd={"@context":"https://schema.org","@type":"WebSite",name:"MyCoco",url:site.url,potentialAction:{"@type":"SearchAction",target:`${site.url}/${locale}/mon-besoin?ville={search_term_string}`,"query-input":"required name=search_term_string"}};
  const faqLd={"@context":"https://schema.org","@type":"FAQPage",mainEntity:copy.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))};

  return <main className="mc14-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/>
    <section className="mc14-hero"><div className="mc-shell mc14-hero-grid">
      <div className="mc14-hero-copy"><span className="mc-kicker">{copy.eyebrow}</span><h1 className="mc-display">{copy.title}<span>{copy.accent}</span></h1><p className="mc-lead">{copy.lead}</p>
        <form className="mc14-search" action={`/${locale}/mon-besoin`} method="get"><label><span>{copy.searchLabel}</span><input name="ville" placeholder={copy.searchPlaceholder}/></label><button>{copy.searchCta} →</button></form>
        <div className="mc14-proof">{copy.proof.map(item=><span key={item}><b>✓</b>{item}</span>)}</div>
      </div>
      <div className="mc14-visual" aria-hidden="true"><div className="mc14-map"><div className="mc14-pin p1"/><div className="mc14-pin p2"/><div className="mc14-pin p3"/><div className="mc14-pin p4"/><div className="mc14-map-card"><small>{fr?"VOTRE SECTEUR":"YOUR AREA"}</small><strong>Mirabel, QC</strong><span>{fr?"Des services à comparer autour de vous":"Providers to compare near you"}</span></div></div><div className="mc14-match-stack"><div className="mc14-match top"><span>MYCOCO MATCH</span><b>94%</b></div><div className="mc14-match"><span>{fr?"OPTIONS":"OPTIONS"}</span><b>03</b></div></div></div>
    </div></section>

    <section className="mc14-role"><div className="mc-shell"><span className="mc-kicker">{copy.roleKicker}</span><h2 className="mc-h2">{copy.roleTitle}</h2><div className="mc14-role-grid">
      <Link className="mc14-role-card family" href={`/${locale}/mon-besoin`}><span className="mc14-role-icon">F</span><div><small>{fr?"POUR LES FAMILLES":"FOR FAMILIES"}</small><h3>{copy.familyTitle}</h3><p>{copy.familyText}</p><strong>{copy.familyCta} →</strong></div></Link>
      <Link className="mc14-role-card provider" href={`/${locale}/pour-les-services`}><span className="mc14-role-icon">S</span><div><small>{fr?"POUR LES SERVICES":"FOR PROVIDERS"}</small><h3>{copy.providerTitle}</h3><p>{copy.providerText}</p><strong>{copy.providerCta} →</strong></div></Link>
    </div></div></section>

    <section className="mc14-directory"><div className="mc-shell"><div className="mc14-heading row"><div><span className="mc-kicker">{copy.dirKicker}</span><h2 className="mc-h2">{copy.dirTitle}</h2><p className="mc-lead">{copy.dirText}</p></div><Link className="mc-btn mc-btn-outline" href={`/${locale}/garderies`}>{copy.dirCta} →</Link></div>
      <div className="mc14-listings">{featured.map((record,index)=><Link className="mc14-listing" href={`/${locale}/garderie/${record.slug}`} key={record.id}><div className={`mc14-photo tone-${(index%3)+1}`}><b>{record.name.slice(0,1).toUpperCase()}</b><small>{fr?"FICHE RÉPERTORIÉE":"LISTED PROFILE"}</small></div><div className="mc14-listing-body"><small>{typeLabel(record.type,fr)} · {record.city}</small><h3>{record.name}</h3><p>{fr?"Disponibilité à confirmer auprès du service":"Availability must be confirmed"}</p><strong><span>{fr?"Voir la fiche":"View profile"}</span><b>→</b></strong></div></Link>)}</div>
    </div></section>

    <section className="mc14-how"><div className="mc-shell"><div className="mc14-heading"><span className="mc-kicker">{copy.howKicker}</span><h2 className="mc-h2">{copy.howTitle}</h2></div><div className="mc14-steps">{copy.steps.map(([n,t,p])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{p}</p></article>)}</div></div></section>

    <section className="mc14-trust"><div className="mc-shell mc14-trust-grid"><div><span className="mc-kicker">{copy.trustKicker}</span><h2>{copy.trustTitle}</h2></div><div><p>{copy.trustText}</p><Link href={`/${locale}/comment-ca-marche`}>{copy.trustCta} →</Link></div></div></section>

    <section className="mc14-pro"><div className="mc-shell mc14-pro-grid"><div className="mc14-pro-copy"><span className="mc-kicker">{copy.proKicker}</span><h2 className="mc-h2">{copy.proTitle}</h2><p className="mc-lead">{copy.proText}</p><div className="mc14-pro-points">{copy.proPoints.map(item=><div key={item}><b>✓</b>{item}</div>)}</div><Link className="mc-btn mc-btn-primary" href={`/${locale}/inscription?role=provider`}>{copy.proCta} →</Link></div><div className="mc14-pro-screen"><div className="mc14-screen-top"><span>{fr?"ESPACE SERVICE":"PROVIDER SPACE"}</span><i>{fr?"Profil public":"Public profile"}</i></div><div className="mc14-screen-score"><small>{fr?"COMPLÉTION DE LA FICHE":"PROFILE COMPLETION"}</small><strong>78%</strong><div><i/></div></div><div className="mc14-screen-row"><span>{fr?"Horaires":"Hours"}</span><b>✓</b></div><div className="mc14-screen-row"><span>{fr?"Âges accueillis":"Age groups"}</span><b>✓</b></div><div className="mc14-screen-row"><span>{fr?"Disponibilités":"Openings"}</span><b>+</b></div><div className="mc14-screen-row"><span>{fr?"Photos autorisées":"Authorized photos"}</span><b>+</b></div></div></div></section>

    <section className="mc14-local"><div className="mc-shell mc14-local-grid"><div><span className="mc-kicker">{copy.localKicker}</span><h2 className="mc-h2">{copy.localTitle}</h2><p className="mc-lead">{copy.localText}</p></div><div className="mc14-cities">{cities.map(([name,slug])=><Link href={`/${locale}/garderies/${slug}`} key={slug}><span>{fr?`Garderies à ${name}`:`Childcare in ${name}`}</span><b>→</b></Link>)}</div></div></section>

    <section className="mc14-eco"><div className="mc-shell mc14-eco-grid"><div><span className="mc-kicker">{copy.ecoKicker}</span><h2 className="mc-h2">{copy.ecoTitle}</h2></div><div><p className="mc-lead">{copy.ecoText}</p><div className="mc14-eco-tags"><span>{fr?"Garde":"Childcare"}</span><span>{fr?"Activités":"Activities"}</span><span>{fr?"Camps":"Camps"}</span><span>{fr?"Événements":"Events"}</span><span>{fr?"Professionnels":"Professionals"}</span><span>{fr?"Garde de secours":"Backup care"}</span></div></div></div></section>

    <section className="mc14-faq"><div className="mc-shell mc14-faq-grid"><div><span className="mc-kicker">FAQ</span><h2 className="mc-h2">{copy.faqTitle}</h2></div><div>{copy.faqs.map(([q,a])=><details key={q}><summary>{q}<b>+</b></summary><p>{a}</p></details>)}</div></div></section>

    <section className="mc14-final"><div className="mc-shell"><span className="mc-kicker">MYCOCO</span><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p><form className="mc14-search" action={`/${locale}/mon-besoin`} method="get"><label><span>{copy.searchLabel}</span><input name="ville" placeholder={copy.searchPlaceholder}/></label><button>{copy.searchCta} →</button></form></div></section>
  </main>;
}

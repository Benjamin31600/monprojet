import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  const title = fr ? "MyCoco | Trouver une garde qui correspond à votre famille" : "MyCoco | Find childcare that fits your family";
  const description = fr ? "Une plateforme locale pour trouver, comparer et suivre les solutions de garde qui correspondent à votre famille." : "A local platform to discover, compare and keep track of childcare options that fit your family.";
  return { title, description, alternates: { canonical: `/${raw}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } }, openGraph: { title, description, siteName: site.name, type: "website", url: `${site.url}/${raw}` } };
}

const cities = [["Mirabel", "mirabel"], ["Blainville", "blainville"], ["Boisbriand", "boisbriand"], ["Saint-Eustache", "saint-eustache"], ["Sainte-Thérèse", "sainte-therese"]] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const t = fr ? {
    eyebrow: "LA GARDE, ENFIN PENSÉE COMME UN SERVICE",
    title: "Trouvez une solution de garde. Pas juste une liste de garderies.",
    lead: "MyCoco part de votre famille, pas d'un annuaire. Décrivez votre situation, découvrez les services qui peuvent vous convenir et gardez votre recherche active.",
    primary: "Trouver ma garde", secondary: "Parcourir les services",
    micro: "Gratuit · Québec · Quelques minutes",
    familyTitle: "Je suis une famille",
    familyText: "Je cherche une place, une garde régulière, une solution temporaire ou simplement les options qui existent autour de moi.",
    familyCta: "Créer ma recherche",
    providerTitle: "Je suis un service de garde",
    providerText: "Je veux présenter mon service, compléter ma fiche et être visible auprès des familles qui recherchent réellement dans mon secteur.",
    providerCta: "Créer mon espace service",
    annTitle: "Un annuaire, oui. Mais pas un annuaire mort.",
    annText: "MyCoco peut référencer les services existants pour aider les familles à découvrir leur marché local. Mais la vraie valeur vient ensuite : une fiche complète, des informations à jour, des demandes qualifiées et, à terme, une relation directe avec les familles.",
    annPoints: ["Les familles découvrent", "Les services revendiquent leur fiche", "Les informations deviennent fiables", "La demande crée de la valeur"],
    whyTitle: "Le bon modèle est un marketplace à deux faces.",
    whyText: "Les meilleurs acteurs du secteur ne font pas seulement du listing : ils donnent aux familles des outils de décision et aux services des outils pour convertir la demande. Winnie combine découverte, données et outils providers ; Care.com combine recherche, profils et mise en relation ; Sittercity structure le parcours autour du besoin, des profils et de la connexion. MyCoco reprend ces mécaniques, avec un focus Québec et une expérience plus simple.",
    howTitle: "Deux parcours. Une seule plateforme.",
    familySteps: [["01", "Créer mon profil famille", "Votre situation, vos enfants, vos préférences et vos besoins."], ["02", "Définir un besoin", "Secteur, âge, type de garde et horizon de recherche."], ["03", "Recevoir les bonnes options", "Résultats, alertes et mises en relation pertinentes."], ["04", "Choisir", "Comparer et contacter le service directement."]],
    providerSteps: [["01", "Créer mon espace service", "Nom, type de service, coordonnées, capacité et informations utiles."], ["02", "Compléter ma fiche", "Horaires, âges accueillis, tarifs, photos, particularités et disponibilités."], ["03", "Être visible", "Votre fiche devient une vraie vitrine locale, pas une simple ligne d'annuaire."], ["04", "Recevoir de la demande", "À terme : demandes qualifiées, leads, disponibilité et outils MyCoco Pro."]],
    localTitle: "Nous commençons petit pour devenir vraiment utiles.",
    localText: "Une marketplace vide ne sert personne. MyCoco commence dans les Laurentides pour construire une vraie densité locale avant d'élargir le réseau.",
    visionTitle: "La garde est notre point d'entrée. La famille est notre marché.",
    visionText: "Après la garde : activités, camps, événements, professionnels de l'enfance, solutions de secours et avantages employeurs. Même logique : comprendre le besoin, trouver la bonne solution, créer de la confiance.",
    finalTitle: "Votre recherche commence ici.", finalCta: "Trouver ma garde"
  } : {
    eyebrow: "CHILDCARE, FINALLY DESIGNED AS A SERVICE",
    title: "Find a childcare solution. Not just another directory.",
    lead: "MyCoco starts with your family, not a list. Tell us what you need, discover relevant local providers and keep your search active.",
    primary: "Find my childcare", secondary: "Browse providers", micro: "Free · Quebec · A few minutes",
    familyTitle: "I'm a family", familyText: "I'm looking for a spot, regular care, temporary help or simply the options available around me.", familyCta: "Create my search",
    providerTitle: "I'm a childcare provider", providerText: "I want to present my service, complete my profile and be visible to families actively searching in my area.", providerCta: "Create my provider space",
    annTitle: "A directory, yes. But not a dead directory.", annText: "MyCoco can index existing services so families can understand their local market. The real value comes next: complete profiles, fresh information, qualified demand and eventually direct family relationships.", annPoints: ["Families discover", "Providers claim their page", "Information becomes reliable", "Demand creates value"],
    whyTitle: "The right model is a two-sided marketplace.", whyText: "The strongest players don't just list providers: they give families decision tools and providers tools to convert demand. Winnie combines discovery, data and provider tools; Care.com combines search, profiles and connections; Sittercity structures the journey around needs, profiles and messaging. MyCoco brings those mechanics to Quebec with a simpler experience.",
    howTitle: "Two journeys. One platform.", familySteps: [["01", "Create my family profile", "Your situation, children, preferences and needs."], ["02", "Define a need", "Area, age, childcare type and timing."], ["03", "Get relevant options", "Results, alerts and useful connections."], ["04", "Choose", "Compare and contact the provider directly."]], providerSteps: [["01", "Create my provider space", "Name, service type, contact, capacity and key details."], ["02", "Complete my profile", "Hours, ages, pricing, photos, specifics and availability."], ["03", "Get discovered", "A real local storefront, not a directory line."], ["04", "Receive demand", "Over time: qualified requests, leads, availability and MyCoco Pro tools."]],
    localTitle: "We start small to become genuinely useful.", localText: "An empty marketplace helps nobody. MyCoco starts in the Laurentians to build real local density before expanding.", visionTitle: "Childcare is our wedge. Families are our market.", visionText: "Next: activities, camps, events, child professionals, backup care and employer benefits. Same logic: understand the need, find the right solution, build trust.", finalTitle: "Your search starts here.", finalCta: "Find my childcare"
  };

  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "MyCoco", url: `${site.url}/${locale}`, description: t.lead, inLanguage: fr ? "fr-CA" : "en-CA" };

  return <main className="mc-home-v3">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="mc-v3-hero">
      <div className="mc-v3-wrap">
        <div className="mc-v3-hero-copy"><span>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.lead}</p><div className="mc-v3-actions"><Link className="mc-v3-primary" href={`/${locale}/mon-besoin`}>{t.primary}<b>→</b></Link><Link className="mc-v3-secondary" href={`/${locale}/garderies`}>{t.secondary}</Link></div><small>✓ {t.micro}</small></div>
        <div className="mc-v3-role-grid">
          <Link className="mc-v3-role mc-family" href={`/${locale}/mon-besoin`}><div className="mc-v3-role-top"><b>01</b><span>→</span></div><h2>{t.familyTitle}</h2><p>{t.familyText}</p><strong>{t.familyCta} <i>→</i></strong></Link>
          <Link className="mc-v3-role mc-provider" href={`/${locale}/pour-les-services`}><div className="mc-v3-role-top"><b>02</b><span>→</span></div><h2>{t.providerTitle}</h2><p>{t.providerText}</p><strong>{t.providerCta} <i>→</i></strong></Link>
        </div>
      </div>
    </section>

    <section className="mc-v3-strip"><div className="mc-v3-wrap"><span>{fr ? "MYCOCO = découverte + confiance + demande + relation" : "MYCOCO = discovery + trust + demand + relationship"}</span><div><b>Familles</b><b>Services</b><b>Données</b><b>Demandes</b></div></div></section>

    <section className="mc-v3-section mc-v3-directory"><div className="mc-v3-wrap mc-v3-directory-grid"><div><span className="mc-v3-kicker">{fr ? "LE RÔLE DE L'ANNUAIRE" : "THE DIRECTORY ROLE"}</span><h2>{t.annTitle}</h2><p>{t.annText}</p><Link className="mc-v3-text-link" href={`/${locale}/garderies`}>{fr ? "Explorer les services de garde" : "Explore childcare providers"} →</Link></div><div className="mc-v3-ann-card">{t.annPoints.map((item, i) => <div key={item}><b>0{i + 1}</b><span>{item}</span><i>✓</i></div>)}</div></div></section>

    <section className="mc-v3-section mc-v3-soft"><div className="mc-v3-wrap"><div className="mc-v3-heading"><span className="mc-v3-kicker">{fr ? "POURQUOI CE MODÈLE" : "WHY THIS MODEL"}</span><h2>{t.whyTitle}</h2><p>{t.whyText}</p></div></div></section>

    <section className="mc-v3-section"><div className="mc-v3-wrap"><div className="mc-v3-heading"><span className="mc-v3-kicker">{fr ? "PARCOURS FAMILLE" : "FAMILY JOURNEY"}</span><h2>{t.howTitle}</h2></div><div className="mc-v3-journey"><div className="mc-v3-journey-head"><span>{t.familyTitle}</span><Link href={`/${locale}/mon-besoin`}>{t.familyCta} →</Link></div>{t.familySteps.map(([n, title, text]) => <article key={n}><b>{n}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="mc-v3-journey mc-v3-journey-provider"><div className="mc-v3-journey-head"><span>{t.providerTitle}</span><Link href={`/${locale}/pour-les-services`}>{t.providerCta} →</Link></div>{t.providerSteps.map(([n, title, text]) => <article key={n}><b>{n}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="mc-v3-local"><div className="mc-v3-wrap mc-v3-local-grid"><div><span className="mc-v3-kicker">{fr ? "LANCEMENT LOCAL" : "LOCAL LAUNCH"}</span><h2>{t.localTitle}</h2><p>{t.localText}</p></div><div className="mc-v3-city-list">{cities.map(([name, slug]) => <Link key={slug} href={`/${locale}/garderies/${slug}`}><span>{name}</span><b>→</b></Link>)}</div></div></section>

    <section className="mc-v3-section mc-v3-vision"><div className="mc-v3-wrap"><span className="mc-v3-kicker">{fr ? "VISION" : "VISION"}</span><div><h2>{t.visionTitle}</h2><p>{t.visionText}</p></div><Link className="mc-v3-secondary" href={`/${locale}/a-propos`}>{fr ? "Pourquoi MyCoco ?" : "Why MyCoco?"}</Link></div></section>

    <section className="mc-v3-final"><div className="mc-v3-wrap"><span>{fr ? "POUR COMMENCER" : "GET STARTED"}</span><h2>{t.finalTitle}</h2><Link className="mc-v3-primary" href={`/${locale}/mon-besoin`}>{t.finalCta}<b>→</b></Link></div></section>

    <style>{`
      .mc-home-v3{--ink:#162b24;--muted:#69766f;--paper:#fbfaf6;--soft:#f0f3ee;--accent:#c47745;--green:#3f715d;--line:#dde3dc;background:var(--paper);color:var(--ink);overflow:hidden}.mc-v3-wrap{width:min(1180px,calc(100% - 44px));margin:auto}.mc-v3-hero{background:radial-gradient(circle at 78% 20%,#e6efe8 0,rgba(230,239,232,0) 28%),#fbfaf6;padding:82px 0 58px;border-bottom:1px solid var(--line)}.mc-v3-hero-copy{max-width:880px}.mc-v3-hero-copy>span,.mc-v3-kicker{font-size:10px;font-weight:950;letter-spacing:.16em;color:var(--accent)}.mc-v3-hero h1{max-width:900px;font-size:clamp(48px,7vw,88px);line-height:.91;letter-spacing:-.075em;margin:17px 0 22px}.mc-v3-hero p{max-width:720px;color:var(--muted);font-size:18px;line-height:1.62;margin:0}.mc-v3-actions{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0 13px}.mc-v3-primary,.mc-v3-secondary{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 19px;border-radius:12px;font-size:12px;font-weight:950}.mc-v3-primary{background:var(--ink);color:#fff;box-shadow:0 12px 26px rgba(22,43,36,.16)}.mc-v3-primary:hover{background:#0c1e18;transform:translateY(-1px)}.mc-v3-secondary{border:1px solid #d3dbd3;background:#fff;color:var(--ink)}.mc-v3-hero-copy small{font-size:10px;color:#7d8983;font-weight:750}.mc-v3-role-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:62px}.mc-v3-role{min-height:270px;padding:27px;border-radius:22px;display:flex;flex-direction:column;justify-content:space-between;transition:transform .18s ease,box-shadow .18s ease}.mc-v3-role:hover{transform:translateY(-4px);box-shadow:0 18px 45px rgba(22,43,36,.12)}.mc-family{background:#18362d;color:#fff}.mc-provider{background:#eadfd3;color:#2a312c}.mc-v3-role-top{display:flex;justify-content:space-between;font-size:11px}.mc-v3-role-top b{opacity:.6}.mc-v3-role h2{font-size:31px;line-height:1;letter-spacing:-.05em;margin:38px 0 9px}.mc-v3-role p{max-width:450px;font-size:12px;line-height:1.55;opacity:.78;margin:0}.mc-v3-role strong{font-size:11px;margin-top:25px}.mc-v3-role i{font-style:normal;margin-left:7px}.mc-v3-strip{background:#fff;border-bottom:1px solid var(--line)}.mc-v3-strip>div{min-height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#718078;font-size:10px}.mc-v3-strip>div>div{display:flex;gap:22px;color:#315747}.mc-v3-section{padding:94px 0;background:#fff}.mc-v3-soft{background:var(--soft)}.mc-v3-directory-grid{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:90px;align-items:center}.mc-v3-directory h2,.mc-v3-heading h2,.mc-v3-vision h2,.mc-v3-final h2{font-size:clamp(34px,4.8vw,57px);line-height:.98;letter-spacing:-.06em;margin:13px 0 17px}.mc-v3-directory p,.mc-v3-heading p,.mc-v3-vision p{max-width:760px;color:var(--muted);font-size:14px;line-height:1.7;margin:0}.mc-v3-text-link{display:inline-block;margin-top:23px;color:var(--green);font-size:12px;font-weight:950}.mc-v3-ann-card{background:#f8faf7;border:1px solid var(--line);border-radius:20px;padding:10px}.mc-v3-ann-card div{display:grid;grid-template-columns:30px 1fr 20px;align-items:center;gap:8px;padding:17px 12px;border-bottom:1px solid #e6ebe5}.mc-v3-ann-card div:last-child{border:0}.mc-v3-ann-card b{font-size:9px;color:#89a595}.mc-v3-ann-card span{font-size:11px;font-weight:850}.mc-v3-ann-card i{font-style:normal;color:var(--green)}.mc-v3-heading{max-width:820px;margin-bottom:40px}.mc-v3-journey{border:1px solid var(--line);border-radius:22px;background:#fff;overflow:hidden}.mc-v3-journey-provider{margin-top:18px;background:#f7f1eb}.mc-v3-journey-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:19px 23px;background:#18362d;color:#fff}.mc-v3-journey-provider .mc-v3-journey-head{background:#eadfd3;color:#2a312c}.mc-v3-journey-head span{font-size:12px;font-weight:950}.mc-v3-journey-head a{font-size:10px;font-weight:900;color:inherit}.mc-v3-journey article{display:grid;grid-template-columns:55px 1fr;gap:10px;padding:22px;border-bottom:1px solid var(--line)}.mc-v3-journey article:last-child{border:0}.mc-v3-journey article>b{font-size:10px;color:var(--accent)}.mc-v3-journey h3{font-size:17px;letter-spacing:-.03em;margin:0 0 5px}.mc-v3-journey p{color:var(--muted);font-size:11px;line-height:1.5;margin:0}.mc-v3-local{background:#162b24;color:#fff;padding:72px 0}.mc-v3-local-grid{display:grid;grid-template-columns:1fr 390px;gap:90px;align-items:center}.mc-v3-local .mc-v3-kicker{color:#d79b72}.mc-v3-local h2{font-size:clamp(34px,4.5vw,55px);line-height:1;letter-spacing:-.06em;margin:13px 0}.mc-v3-local p{max-width:600px;color:#c0d0c8;font-size:14px;line-height:1.65}.mc-v3-city-list{border-top:1px solid rgba(255,255,255,.18)}.mc-v3-city-list a{display:flex;justify-content:space-between;padding:16px 3px;border-bottom:1px solid rgba(255,255,255,.18);color:#fff;font-size:12px;font-weight:850}.mc-v3-vision{background:#fff}.mc-v3-vision .mc-v3-wrap>div{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:end;margin:25px 0 26px}.mc-v3-final{background:#eadfd3;padding:88px 0;text-align:center}.mc-v3-final .mc-v3-kicker{color:#a75f32}.mc-v3-final h2{max-width:700px;margin:13px auto 25px}.mc-v3-final .mc-v3-primary{display:inline-flex}@media(max-width:850px){.mc-v3-directory-grid,.mc-v3-local-grid,.mc-v3-vision .mc-v3-wrap>div{grid-template-columns:1fr;gap:35px}.mc-v3-role-grid{grid-template-columns:1fr}.mc-v3-strip>div{flex-direction:column;align-items:flex-start;justify-content:center;padding:13px 0}.mc-v3-strip>div>div{gap:13px;flex-wrap:wrap}.mc-v3-hero{padding-top:60px}}@media(max-width:560px){.mc-v3-wrap{width:min(100% - 28px,1180px)}.mc-v3-hero h1{font-size:47px}.mc-v3-hero p{font-size:15px}.mc-v3-section{padding:65px 0}.mc-v3-role{min-height:235px}.mc-v3-role h2{font-size:28px}.mc-v3-final{padding:65px 0}}
    `}</style>
  </main>;
}

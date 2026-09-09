import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  const title = fr
    ? "MyCoco | Trouvez la bonne solution de garde près de chez vous"
    : "MyCoco | Find childcare that fits your family";
  const description = fr
    ? "Besoin d'une place en garderie? Dites-nous ce qu'il vous faut. MyCoco vous aide à trouver des options de garde pertinentes près de chez vous et à rester à l'affût des nouvelles possibilités."
    : "Looking for childcare? Tell us what your family needs. MyCoco helps you find relevant childcare options nearby and stay on top of new possibilities.";
  return {
    title,
    description,
    alternates: { canonical: `/${raw}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } },
    openGraph: { locale: fr ? "fr_CA" : "en_CA", alternateLocale: fr ? ["en_CA"] : ["fr_CA"], siteName: site.name, type: "website", title, description, url: `${site.url}/${raw}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

const cityLinks = [
  ["Mirabel", "mirabel"],
  ["Blainville", "blainville"],
  ["Boisbriand", "boisbriand"],
  ["Saint-Eustache", "saint-eustache"],
  ["Sainte-Thérèse", "sainte-therese"],
] as const;

function Arrow() { return <span aria-hidden="true">→</span>; }
function Check() { return <span className="mc-check" aria-hidden="true">✓</span>; }

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";

  const copy = fr ? {
    navNeed: "Mon besoin", navSearch: "Trouver une garderie", navCta: "Trouver ma solution",
    eyebrow: "Pensé pour les familles d'ici",
    title: "Trouver une place, c'est déjà beaucoup. Trouver la bonne, c'est mieux.",
    lead: "Dites-nous ce dont votre famille a besoin. MyCoco vous aide à repérer les options de garde qui font du sens pour vous, près de chez vous.",
    primary: "Trouver ma solution", secondary: "Voir les garderies",
    trust: "Recherche simple · Données officielles · Disponibilité à confirmer",
    boardTitle: "Votre recherche, sans casse-tête", boardSub: "On part de votre réalité.",
    need: "Besoin actif", needText: "Bébé · Mirabel · Temps plein", results: "Options pertinentes", resultText: "Triées selon vos critères", radar: "Radar MyCoco", radarText: "Soyez avisé quand une nouvelle option correspond",
    proofEyebrow: "Une meilleure façon de chercher", proofTitle: "Moins de listes. Plus de clarté.",
    proofText: "Le Portail d'inscription du Québec est indispensable pour vos démarches. MyCoco vient avant et autour : comprendre votre besoin, repérer les options pertinentes et garder votre recherche active.",
    proofPoints: ["Vous commencez par votre besoin, pas par une liste interminable.", "Les résultats tiennent compte de votre secteur, du type de garde et de l'âge de votre enfant.", "Votre recherche peut rester active pour ne pas manquer une nouvelle possibilité."],
    funnelEyebrow: "En quelques minutes", funnelTitle: "Vous nous dites. On vous aide à chercher.",
    steps: [["01", "Dites-nous ce qu'il vous faut", "Votre ville, l'âge de votre enfant et votre besoin."], ["02", "Découvrez les options", "MyCoco met de l'ordre dans les possibilités près de chez vous."], ["03", "Gardez l'œil ouvert", "Votre besoin reste actif pour suivre les nouvelles options."]] as const,
    localEyebrow: "On commence localement", localTitle: "Mirabel et les Laurentides d'abord.",
    localText: "Une marketplace gagne quand elle est utile dans un secteur précis. Nous construisons d'abord une vraie densité de solutions ici, avant d'étendre le réseau au Québec.", localCta: "Chercher près de chez moi",
    ecosystemEyebrow: "Et après la garde", ecosystemTitle: "Votre famille ne s'arrête pas à la garderie.",
    ecosystemText: "La garde est notre point de départ. Ensuite viennent les activités, les camps, les événements, les professionnels et les solutions de secours dont les familles ont besoin au fil des années.",
    ecosystem: [["01", "Garde", "CPE, garderies et milieux familiaux"], ["02", "Activités", "Sports, musique, arts et loisirs"], ["03", "Camps & événements", "Des idées pour les fins de semaine et les congés"], ["04", "Professionnels", "Des services utiles au développement de l'enfant"]] as const,
    finalTitle: "Votre famille change. Votre recherche aussi.", finalText: "MyCoco veut devenir le réflexe des familles québécoises : une place aujourd'hui, une activité demain, une solution de secours quand la vie ne se passe pas comme prévu.", finalCta: "Commencer ma recherche", footer: "La garde de votre famille, simplement.",
  } : {
    navNeed: "My need", navSearch: "Find childcare", navCta: "Find my solution",
    eyebrow: "Built for local families", title: "Finding a spot is a start. Finding the right fit is better.",
    lead: "Tell us what your family needs. MyCoco helps you spot childcare options that make sense for your family, close to home.",
    primary: "Find my solution", secondary: "Browse childcare", trust: "Simple search · Official data · Availability to confirm",
    boardTitle: "Your search, without the headache", boardSub: "We start with your reality.", need: "Active need", needText: "Baby · Mirabel · Full time", results: "Relevant options", resultText: "Ranked around your needs", radar: "MyCoco Radar", radarText: "Stay in the loop when a new option fits",
    proofEyebrow: "A better way to search", proofTitle: "Less scrolling. More clarity.", proofText: "Quebec's registration portal is essential for applications. MyCoco sits around that journey: understand your need, spot relevant options and keep your search active.",
    proofPoints: ["Start with your family's need, not an endless list.", "Results consider your area, childcare type and your child's age.", "Keep your search active so new possibilities don't pass you by."],
    funnelEyebrow: "A few minutes", funnelTitle: "You tell us. We help you search.",
    steps: [["01", "Tell us what you need", "Your city, your child's age and your childcare needs."], ["02", "Explore your options", "MyCoco brings structure to the possibilities near you."], ["03", "Stay in the loop", "Keep your need active and watch for new options."]] as const,
    localEyebrow: "Starting local", localTitle: "Mirabel and the Laurentians first.", localText: "A marketplace wins when it is useful in one place first. We are building density here before expanding across Quebec.", localCta: "Search near me",
    ecosystemEyebrow: "Beyond childcare", ecosystemTitle: "Family life doesn't stop at daycare.", ecosystemText: "Childcare is our starting point. Then come activities, camps, events, professionals and backup solutions as families grow.",
    ecosystem: [["01", "Childcare", "CPEs, daycares and home childcare"], ["02", "Activities", "Sports, music, arts and recreation"], ["03", "Camps & events", "Ideas for weekends and school breaks"], ["04", "Professionals", "Useful services for children's development"]] as const,
    finalTitle: "Your family changes. Your search should too.", finalText: "MyCoco aims to become a daily reflex for Quebec families: childcare today, an activity tomorrow, backup care when life gets complicated.", finalCta: "Start my search", footer: "Childcare that fits your family.",
  };

  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: `${site.url}/${locale}`, description: copy.lead, inLanguage: fr ? "fr-CA" : "en-CA", areaServed: { "@type": "AdministrativeArea", name: "Quebec", containedInPlace: { "@type": "Country", name: "Canada" } } };

  return <main className="mc-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <style>{`
      .mc-home{--ink:#18352c;--muted:#63736c;--line:#dce8e1;--soft:#f3f7f4;--mint:#e3f1e9;--cream:#fcfbf7;--accent:#76a991;background:var(--cream);color:var(--ink);overflow:hidden}
      .mc-wrap{width:min(1160px,calc(100% - 40px));margin:0 auto}.mc-nav{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}.mc-brand{font-size:24px;font-weight:900;letter-spacing:-.055em;color:var(--ink);text-decoration:none}.mc-brand span{color:#77a88f}.mc-navlinks{display:flex;align-items:center;gap:26px}.mc-navlinks a{font-size:14px;font-weight:750;color:#53645d;text-decoration:none}.mc-navlinks a:hover{color:var(--ink)}.mc-navcta{background:var(--ink)!important;color:#fff!important;border-radius:12px;padding:11px 15px}
      .mc-hero{border-top:1px solid #eef2ef;background:radial-gradient(circle at 78% 16%,#e4f2ea 0,rgba(228,242,234,0) 34%),linear-gradient(180deg,var(--cream),#f5f8f5)}.mc-hero-grid{display:grid;grid-template-columns:minmax(0,1.06fr) minmax(350px,.74fr);gap:70px;align-items:center;padding:74px 0 86px}.mc-eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12px;font-weight:900;letter-spacing:.09em;text-transform:uppercase;color:#4c7a65}.mc-eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 5px #e1efe8}.mc-hero h1{font-size:clamp(44px,6.1vw,76px);line-height:.98;letter-spacing:-.065em;max-width:790px;margin:19px 0 23px}.mc-lead{font-size:19px;line-height:1.6;color:var(--muted);max-width:680px;margin:0}.mc-actions{display:flex;flex-wrap:wrap;gap:11px;margin:29px 0 15px}.mc-primary,.mc-secondary{min-height:52px;display:inline-flex;align-items:center;justify-content:center;gap:9px;border-radius:13px;padding:0 20px;text-decoration:none;font-weight:850;transition:transform .18s ease,box-shadow .18s ease}.mc-primary{background:var(--ink);color:#fff;box-shadow:0 14px 30px rgba(24,53,44,.16)}.mc-secondary{background:#fff;color:var(--ink);border:1px solid var(--line)}.mc-primary:hover,.mc-secondary:hover{transform:translateY(-2px)}.mc-trust{font-size:12px;color:#74817b;margin:0}
      .mc-visual{position:relative}.mc-orbit{position:absolute;inset:-24px -35px auto auto;width:150px;height:150px;border-radius:50%;background:#e4f1ea;z-index:0}.mc-board{position:relative;z-index:1;background:#fff;border:1px solid #dce8e1;border-radius:28px;padding:24px;box-shadow:0 28px 80px rgba(26,55,45,.13)}.mc-board-head{display:flex;justify-content:space-between;align-items:flex-start}.mc-mark{width:45px;height:45px;border-radius:15px;background:var(--mint);display:grid;place-items:center;font-size:22px}.mc-pill{background:#edf7f1;color:#4c7a65;border-radius:999px;padding:7px 10px;font-size:11px;font-weight:900}.mc-board h2{font-size:25px;letter-spacing:-.04em;margin:20px 0 5px}.mc-board-sub{font-size:13px;color:#74817b;margin:0}.mc-board-card{border:1px solid #e3ebe6;border-radius:17px;padding:15px;margin-top:12px}.mc-board-label{font-size:11px;color:#7a8781;text-transform:uppercase;letter-spacing:.06em;font-weight:850}.mc-board-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}.mc-board-row strong{font-size:14px}.mc-board-row span{font-size:12px;color:#697871}.mc-live{display:inline-block;width:8px;height:8px;border-radius:50%;background:#69a786;margin-right:6px}.mc-board-footer{margin-top:14px;padding-top:14px;border-top:1px solid #edf1ef;display:flex;align-items:center;gap:10px;font-size:12px;color:#687770}
      .mc-section{padding:88px 0}.mc-soft{background:var(--soft)}.mc-head{max-width:760px;margin-bottom:36px}.mc-head h2{font-size:clamp(36px,4.8vw,58px);line-height:1;letter-spacing:-.055em;margin:13px 0 15px}.mc-head p{font-size:18px;line-height:1.62;color:var(--muted);margin:0}.mc-proof{display:grid;grid-template-columns:1fr 1fr;gap:55px;align-items:center}.mc-proof-box{background:#fff;border:1px solid var(--line);border-radius:25px;padding:28px;box-shadow:0 18px 50px rgba(30,57,47,.07)}.mc-proof-box strong{font-size:17px}.mc-points{display:grid;gap:15px;margin-top:25px}.mc-point{display:flex;gap:12px;align-items:flex-start;font-weight:750;font-size:15px;line-height:1.45}.mc-check{width:23px;height:23px;flex:none;border-radius:50%;background:var(--mint);color:#4c7a65;display:grid;place-items:center;font-size:12px;font-weight:900}
      .mc-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.mc-step{background:#fff;border:1px solid var(--line);border-radius:22px;padding:25px;min-height:190px}.mc-num{font-size:12px;font-weight:900;color:#6c8f7e}.mc-step h3{font-size:21px;letter-spacing:-.025em;margin:33px 0 8px}.mc-step p{font-size:14px;line-height:1.55;color:var(--muted);margin:0}
      .mc-local{background:var(--ink);color:#fff}.mc-local-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:65px;align-items:center}.mc-local .mc-eyebrow{color:#a9cdb9}.mc-local .mc-head p{color:#c5d6cf}.mc-citygrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mc-city{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:15px;padding:16px;color:#fff;text-decoration:none;font-weight:800;display:flex;justify-content:space-between;transition:background .18s ease,transform .18s ease}.mc-city:hover{background:rgba(255,255,255,.12);transform:translateY(-2px)}
      .mc-ecosystem{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.mc-eco{padding:22px;border-radius:20px;background:#fff;border:1px solid var(--line)}.mc-eco small{font-weight:900;color:#79a18e}.mc-eco h3{font-size:19px;margin:28px 0 7px;letter-spacing:-.025em}.mc-eco p{font-size:13px;line-height:1.5;color:var(--muted);margin:0}.mc-final{padding:88px 0 100px;background:#e4f1ea}.mc-final-inner{max-width:780px}.mc-final h2{font-size:clamp(42px,6vw,70px);line-height:.98;letter-spacing:-.06em;margin:13px 0 17px}.mc-final p{font-size:18px;line-height:1.6;color:#5f7169;margin:0}.mc-final a{display:inline-flex;margin-top:25px;background:var(--ink);color:#fff;border-radius:13px;padding:14px 19px;text-decoration:none;font-weight:850}.mc-footer{padding:25px 0;border-top:1px solid var(--line);font-size:13px;color:#75827c}.mc-footer-row{display:flex;justify-content:space-between;gap:20px;align-items:center}.mc-footer-brand{font-weight:900;color:var(--ink)}
      @media(max-width:900px){.mc-hero-grid,.mc-proof,.mc-local-grid{grid-template-columns:1fr;gap:38px}.mc-ecosystem{grid-template-columns:1fr 1fr}.mc-steps{grid-template-columns:1fr}.mc-navlinks a:not(.mc-navcta){display:none}.mc-hero-grid{padding:55px 0 70px}}@media(max-width:580px){.mc-wrap{width:min(100% - 28px,1160px)}.mc-nav{height:68px}.mc-navcta{padding:10px 12px;font-size:12px}.mc-hero h1{font-size:45px}.mc-lead{font-size:17px}.mc-section{padding:66px 0}.mc-head h2{font-size:40px}.mc-ecosystem{grid-template-columns:1fr}.mc-citygrid{grid-template-columns:1fr}.mc-board{padding:18px;border-radius:22px}}@media(prefers-reduced-motion:reduce){.mc-primary,.mc-secondary,.mc-city{transition:none}}
    `}</style>

    <header className="mc-wrap mc-nav">
      <Link href={`/${locale}`} className="mc-brand">My<span>Coco</span></Link>
      <nav className="mc-navlinks" aria-label="Navigation principale">
        <Link href={`/${locale}/mon-besoin`}>{copy.navNeed}</Link>
        <Link href={`/${locale}/garderies`}>{copy.navSearch}</Link>
        <Link className="mc-navcta" href={`/${locale}/mon-besoin`}>{copy.navCta}</Link>
      </nav>
    </header>

    <section className="mc-hero"><div className="mc-wrap mc-hero-grid"><div>
      <span className="mc-eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p className="mc-lead">{copy.lead}</p>
      <div className="mc-actions"><Link className="mc-primary" href={`/${locale}/mon-besoin`}>{copy.primary} <Arrow /></Link><Link className="mc-secondary" href={`/${locale}/garderies`}>{copy.secondary}</Link></div>
      <p className="mc-trust">{copy.trust}</p>
    </div><div className="mc-visual" aria-hidden="true"><div className="mc-orbit"/><div className="mc-board">
      <div className="mc-board-head"><div className="mc-mark">🧸</div><span className="mc-pill">MyCoco Radar</span></div><h2>{copy.boardTitle}</h2><p className="mc-board-sub">{copy.boardSub}</p>
      <div className="mc-board-card"><div className="mc-board-label">{copy.need}</div><div className="mc-board-row"><strong>{copy.needText}</strong><span><i className="mc-live"/>Actif</span></div></div>
      <div className="mc-board-card"><div className="mc-board-label">{copy.results}</div><div className="mc-board-row"><strong>{copy.resultText}</strong><span>3 options</span></div></div>
      <div className="mc-board-footer">✦ <span>{copy.radar}</span> · {copy.radarText}</div>
    </div></div></div></section>

    <section className="mc-section"><div className="mc-wrap mc-proof"><div className="mc-head"><span className="mc-eyebrow">{copy.proofEyebrow}</span><h2>{copy.proofTitle}</h2><p>{copy.proofText}</p></div><div className="mc-proof-box"><strong>{fr ? "Ce qu'on veut vous éviter" : "What we want to save you from"}</strong><div className="mc-points">{copy.proofPoints.map((point) => <div className="mc-point" key={point}><Check/><span>{point}</span></div>)}</div></div></div></section>

    <section className="mc-section mc-soft"><div className="mc-wrap"><div className="mc-head"><span className="mc-eyebrow">{copy.funnelEyebrow}</span><h2>{copy.funnelTitle}</h2></div><div className="mc-steps">{copy.steps.map(([num,title,text]) => <article className="mc-step" key={num}><span className="mc-num">{num}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="mc-section mc-local"><div className="mc-wrap mc-local-grid"><div className="mc-head"><span className="mc-eyebrow">{copy.localEyebrow}</span><h2>{copy.localTitle}</h2><p>{copy.localText}</p><div className="mc-actions"><Link className="mc-secondary" href={`/${locale}/garderies`}>{copy.localCta} <Arrow/></Link></div></div><div className="mc-citygrid">{cityLinks.map(([name,slug]) => <Link className="mc-city" key={slug} href={`/${locale}/garderies/${slug}`}><span>{name}</span><Arrow/></Link>)}</div></div></section>

    <section className="mc-section"><div className="mc-wrap"><div className="mc-head"><span className="mc-eyebrow">{copy.ecosystemEyebrow}</span><h2>{copy.ecosystemTitle}</h2><p>{copy.ecosystemText}</p></div><div className="mc-ecosystem">{copy.ecosystem.map(([num,title,text]) => <article className="mc-eco" key={num}><small>{num}</small><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="mc-final"><div className="mc-wrap mc-final-inner"><span className="mc-eyebrow">MyCoco</span><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p><Link href={`/${locale}/mon-besoin`}>{copy.finalCta} <Arrow/></Link></div></section>
    <footer className="mc-footer"><div className="mc-wrap mc-footer-row"><span className="mc-footer-brand">MyCoco</span><span>{copy.footer}</span></div></footer>
  </main>;
}

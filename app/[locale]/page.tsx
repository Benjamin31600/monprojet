import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, site } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const fr = locale === "fr";
  const title = fr
    ? "MyCoco | La plateforme des familles et de la garde d'enfants au Québec"
    : "MyCoco | Family care and childcare platform in Quebec";
  const description = fr
    ? "Trouvez une solution de garde, découvrez des activités et construisez votre univers familial avec MyCoco. Une seule plateforme pour les besoins de votre enfant."
    : "Find childcare, discover activities and build your family care universe with MyCoco. One platform for your child's needs.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" },
    },
    openGraph: { locale: fr ? "fr_CA" : "en_CA", alternateLocale: fr ? ["en_CA"] : ["fr_CA"], siteName: site.name, type: "website", title, description },
  };
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function Check() {
  return <span className="mc-check" aria-hidden="true">✓</span>;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";

  const copy = fr
    ? {
        eyebrow: "Le nouveau réflexe des familles",
        title: "Tout ce dont votre famille a besoin, au même endroit.",
        lead: "Garde, activités, professionnels, événements et solutions de secours : MyCoco construit votre univers familial autour de vos besoins réels.",
        primary: "Trouver ma solution",
        secondary: "Explorer les garderies",
        promise: "Pas seulement trouver une place. Trouver la bonne solution — puis ne plus avoir à chercher seul.",
        active: "Votre besoin devient actif",
        activeText: "Dites-nous ce que vous cherchez. MyCoco vous aide à trouver les options pertinentes et pourra vous alerter lorsqu'une nouvelle solution correspond à votre besoin.",
        ecosystemEyebrow: "Un écosystème, pas un annuaire",
        ecosystemTitle: "La garde est le début. La famille est notre marché.",
        ecosystemText: "Nous commençons par résoudre le problème le plus urgent : trouver une solution de garde. Puis nous connectons progressivement les services dont une famille a besoin au fil des années.",
        categories: [
          ["🧸", "Garde", "CPE, garderies, milieux familiaux et solutions de garde."],
          ["🏊", "Activités", "Sports, musique, danse, arts et activités près de chez vous."],
          ["🧑‍🏫", "Professionnels", "Éducation, développement, accompagnement et services spécialisés."],
          ["🎟️", "Événements", "Activités familiales, ateliers, portes ouvertes et sorties."],
          ["🛟", "Garde de secours", "Quand une garderie ferme, qu'un imprévu arrive ou qu'il faut souffler."],
          ["💼", "Avantages employeur", "Des solutions de garde et de famille pour les salariés."],
        ],
        whyEyebrow: "Pourquoi MyCoco",
        whyTitle: "Une plateforme qui travaille pour vous.",
        benefits: ["Un seul profil familial", "Des besoins que vous pouvez garder actifs", "Des recommandations plus pertinentes à mesure que MyCoco vous connaît", "Des alertes lorsqu'une opportunité correspond", "Des professionnels et services réunis au même endroit"],
        localEyebrow: "Commencer près de chez vous",
        localTitle: "MyCoco commence dans les Laurentides.",
        localText: "Nous construisons d'abord une offre dense autour de Mirabel, Blainville, Boisbriand, Saint-Eustache et Sainte-Thérèse avant d'étendre le réseau.",
        finalTitle: "Votre famille change. MyCoco aussi.",
        finalText: "Aujourd'hui une place en garderie. Demain une activité, un camp, une garde de secours ou un professionnel. Votre besoin évolue, votre espace MyCoco reste avec vous.",
        finalCta: "Créer mon besoin",
      }
    : {
        eyebrow: "The new family habit",
        title: "Everything your family needs, in one place.",
        lead: "Childcare, activities, professionals, events and backup solutions: MyCoco builds a family care universe around your real needs.",
        primary: "Find my solution",
        secondary: "Explore childcare",
        promise: "Not just finding a spot. Finding the right solution — and never having to search alone.",
        active: "Your need becomes active",
        activeText: "Tell us what you need. MyCoco helps you find relevant options and can alert you when a new solution matches your needs.",
        ecosystemEyebrow: "An ecosystem, not a directory",
        ecosystemTitle: "Childcare is the beginning. Families are our market.",
        ecosystemText: "We start by solving the most urgent problem: finding childcare. Then we connect the services families need as children grow.",
        categories: [
          ["🧸", "Childcare", "CPEs, daycares, home daycares and care solutions."],
          ["🏊", "Activities", "Sports, music, dance, arts and activities near you."],
          ["🧑‍🏫", "Professionals", "Education, development, support and specialized services."],
          ["🎟️", "Events", "Family activities, workshops, open houses and outings."],
          ["🛟", "Backup care", "When childcare closes, plans change or you need a hand."],
          ["💼", "Employer benefits", "Family-care solutions for employees and employers."],
        ],
        whyEyebrow: "Why MyCoco",
        whyTitle: "A platform that works for you.",
        benefits: ["One family profile", "Needs you can keep active", "Better recommendations as MyCoco learns your needs", "Alerts when an opportunity matches", "Professionals and services in one place"],
        localEyebrow: "Start close to home",
        localTitle: "MyCoco starts in the Laurentians.",
        localText: "We are first building a dense network around Mirabel, Blainville, Boisbriand, Saint-Eustache and Sainte-Thérèse before expanding.",
        finalTitle: "Your family changes. MyCoco changes with you.",
        finalText: "Today a childcare spot. Tomorrow an activity, camp, backup care or a professional. Your needs evolve, and your MyCoco space stays with you.",
        finalCta: "Create my need",
      };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${site.url}/${locale}`,
    description: copy.lead,
    inLanguage: fr ? "fr-CA" : "en-CA",
  };

  return (
    <main className="mc-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .mc-home{background:#fbfaf7;color:#17201d;overflow:hidden}
        .mc-wrap{width:min(1180px,calc(100% - 40px));margin:0 auto}
        .mc-hero{padding:76px 0 34px;background:radial-gradient(circle at 82% 12%,#e8f5ee 0,rgba(232,245,238,0) 34%),linear-gradient(180deg,#fbfaf7 0,#f4f8f4 100%)}
        .mc-hero-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:54px;align-items:center}
        .mc-eyebrow{display:inline-flex;align-items:center;gap:8px;color:#3f725d;font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}
        .mc-eyebrow:before{content:"";width:8px;height:8px;border-radius:50%;background:#72a98e;box-shadow:0 0 0 5px #e3f0e8}
        .mc-hero h1{font-size:clamp(44px,6vw,76px);line-height:.98;letter-spacing:-.055em;margin:20px 0 22px;max-width:760px}
        .mc-lead{font-size:20px;line-height:1.55;color:#52615b;max-width:690px;margin:0}
        .mc-actions{display:flex;gap:12px;flex-wrap:wrap;margin:30px 0 20px}
        .mc-primary,.mc-secondary{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 22px;border-radius:14px;text-decoration:none;font-weight:800;transition:transform .18s ease,box-shadow .18s ease}
        .mc-primary{background:#193f32;color:#fff;box-shadow:0 12px 28px rgba(25,63,50,.18)}
        .mc-secondary{background:#fff;color:#193f32;border:1px solid #dbe5df}
        .mc-primary:hover,.mc-secondary:hover{transform:translateY(-2px)}
        .mc-promise{font-size:14px;line-height:1.5;color:#66736e;margin:0;max-width:600px}
        .mc-dashboard{background:#fff;border:1px solid #dfe8e3;border-radius:28px;padding:24px;box-shadow:0 24px 70px rgba(29,57,46,.12);transform:rotate(1deg)}
        .mc-dashboard-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
        .mc-avatar{width:42px;height:42px;border-radius:14px;background:#e6f2eb;display:grid;place-items:center;font-size:20px}
        .mc-status{font-size:12px;font-weight:800;color:#3f725d;background:#edf7f1;border-radius:999px;padding:7px 10px}
        .mc-dashboard h2{font-size:25px;letter-spacing:-.03em;margin:0 0 7px}
        .mc-muted{color:#718078;font-size:13px;margin:0}
        .mc-need{margin-top:18px;padding:16px;border-radius:18px;background:#f5f8f5;border:1px solid #e2ebe5}
        .mc-need-row{display:flex;justify-content:space-between;gap:12px;align-items:center}
        .mc-need strong{font-size:14px}.mc-dot{width:9px;height:9px;border-radius:50%;background:#65a883;display:inline-block;margin-right:7px}
        .mc-mini-card{margin-top:12px;padding:14px;background:#fff;border-radius:15px;border:1px solid #e5ebe7;display:flex;justify-content:space-between;gap:12px;align-items:center}
        .mc-mini-card b{font-size:13px}.mc-mini-card span{font-size:12px;color:#6f7c76}
        .mc-section{padding:94px 0}.mc-section-soft{background:#f1f6f2}
        .mc-section-head{max-width:760px;margin-bottom:34px}.mc-section h2{font-size:clamp(34px,4.5vw,56px);line-height:1.02;letter-spacing:-.045em;margin:14px 0 14px}.mc-section-head p{font-size:18px;line-height:1.6;color:#5d6a64;margin:0}
        .mc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .mc-card{background:#fff;border:1px solid #e0e8e3;border-radius:22px;padding:24px;min-height:205px}.mc-card-icon{font-size:29px}.mc-card h3{font-size:21px;letter-spacing:-.025em;margin:18px 0 8px}.mc-card p{color:#68756f;line-height:1.55;margin:0;font-size:14px}
        .mc-split{display:grid;grid-template-columns:.85fr 1.15fr;gap:60px;align-items:center}.mc-checks{display:grid;gap:13px}.mc-check-row{display:flex;gap:11px;align-items:flex-start;font-weight:700}.mc-check{width:23px;height:23px;flex:none;border-radius:50%;background:#e4f1e9;color:#3f725d;display:grid;place-items:center;font-size:13px}
        .mc-activation{background:#193f32;color:#fff;border-radius:30px;padding:34px}.mc-activation h3{font-size:28px;letter-spacing:-.035em;margin:0 0 9px}.mc-activation p{color:#cfe0d7;line-height:1.55;margin:0}.mc-activation a{display:inline-flex;margin-top:22px;color:#193f32;background:#fff;padding:12px 16px;border-radius:12px;text-decoration:none;font-weight:800}
        .mc-cities{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.mc-city{background:#fff;border:1px solid #dce7e0;border-radius:999px;padding:10px 14px;text-decoration:none;color:#25483b;font-weight:700;font-size:14px}
        .mc-final{padding:82px 0 100px;background:#193f32;color:#fff}.mc-final-inner{max-width:800px}.mc-final h2{font-size:clamp(40px,6vw,70px);line-height:.98;letter-spacing:-.055em;margin:14px 0 18px}.mc-final p{font-size:18px;line-height:1.6;color:#cfe0d7}.mc-final a{margin-top:22px;display:inline-flex;background:#fff;color:#193f32;border-radius:14px;padding:14px 20px;text-decoration:none;font-weight:800}
        @media(max-width:850px){.mc-hero-grid,.mc-split{grid-template-columns:1fr}.mc-dashboard{transform:none}.mc-grid{grid-template-columns:1fr 1fr}.mc-section{padding:70px 0}}
        @media(max-width:560px){.mc-wrap{width:min(100% - 28px,1180px)}.mc-hero{padding-top:48px}.mc-grid{grid-template-columns:1fr}.mc-dashboard{padding:18px;border-radius:22px}.mc-hero h1{font-size:45px}.mc-lead{font-size:17px}.mc-section h2{font-size:39px}}
      `}</style>

      <section className="mc-hero">
        <div className="mc-wrap mc-hero-grid">
          <div>
            <span className="mc-eyebrow">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p className="mc-lead">{copy.lead}</p>
            <div className="mc-actions">
              <Link className="mc-primary" href={`/${locale}/mon-besoin`}>{copy.primary} <Arrow /></Link>
              <Link className="mc-secondary" href={`/${locale}/garderies`}>{copy.secondary}</Link>
            </div>
            <p className="mc-promise">{copy.promise}</p>
          </div>
          <div className="mc-dashboard" aria-label={fr ? "Aperçu de l'espace famille MyCoco" : "Preview of the MyCoco family space"}>
            <div className="mc-dashboard-top"><div className="mc-avatar">🧸</div><span className="mc-status">● {fr ? "Besoin actif" : "Active need"}</span></div>
            <h2>{fr ? "Votre famille, vos solutions." : "Your family, your solutions."}</h2>
            <p className="mc-muted">{fr ? "Un espace qui évolue avec vos besoins." : "A space that evolves with your needs."}</p>
            <div className="mc-need"><div className="mc-need-row"><strong><span className="mc-dot" />{fr ? "Recherche de garde" : "Childcare search"}</strong><span className="mc-muted">{fr ? "Mirabel" : "Mirabel"}</span></div><div className="mc-mini-card"><div><b>{fr ? "Nouvelle solution à surveiller" : "New solution to watch"}</b><br/><span>{fr ? "Correspond à vos critères" : "Matches your criteria"}</span></div><span>→</span></div><div className="mc-mini-card"><div><b>{fr ? "Activités près de vous" : "Activities near you"}</b><br/><span>{fr ? "Votre prochain besoin" : "Your next need"}</span></div><span>→</span></div></div>
          </div>
        </div>
      </section>

      <section className="mc-section mc-section-soft">
        <div className="mc-wrap">
          <div className="mc-section-head"><span className="mc-eyebrow">{copy.ecosystemEyebrow}</span><h2>{copy.ecosystemTitle}</h2><p>{copy.ecosystemText}</p></div>
          <div className="mc-grid">{copy.categories.map(([icon,title,text]) => <article className="mc-card" key={title}><div className="mc-card-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="mc-section">
        <div className="mc-wrap mc-split">
          <div><span className="mc-eyebrow">{copy.whyEyebrow}</span><h2>{copy.whyTitle}</h2><p className="mc-lead" style={{fontSize:17}}>{copy.activeText}</p></div>
          <div className="mc-activation"><h3>{copy.active}</h3><p>{copy.activeText}</p><Link href={`/${locale}/mon-besoin`}>{copy.primary} <Arrow /></Link></div>
        </div>
      </section>

      <section className="mc-section mc-section-soft">
        <div className="mc-wrap mc-split">
          <div><span className="mc-eyebrow">{copy.localEyebrow}</span><h2>{copy.localTitle}</h2><p className="mc-section-head" style={{fontSize:17,color:"#5d6a64"}}>{copy.localText}</p><div className="mc-cities">{cities.map((city) => <Link className="mc-city" href={`/${locale}/garderie/${city.slug}`} key={city.slug}>{city.name}</Link>)}</div></div>
          <div className="mc-card"><h3 style={{marginTop:0}}>{fr ? "Une famille. Plusieurs besoins. Un seul endroit." : "One family. Many needs. One place."}</h3><div className="mc-checks">{copy.benefits.map((benefit) => <div className="mc-check-row" key={benefit}><Check /> <span>{benefit}</span></div>)}</div></div>
        </div>
      </section>

      <section className="mc-final"><div className="mc-wrap mc-final-inner"><span className="mc-eyebrow" style={{color:"#b8d6c6"}}>{fr ? "La vision MyCoco" : "The MyCoco vision"}</span><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p><Link href={`/${locale}/mon-besoin`}>{copy.finalCta} <Arrow /></Link></div></section>
    </main>
  );
}

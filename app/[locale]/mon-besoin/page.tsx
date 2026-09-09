import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import NeedWizard from "@/components/NeedWizard";

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  return {
    title: fr ? "Trouver ma solution de garde | MyCoco" : "Find my childcare solution | MyCoco",
    description: fr ? "Dites-nous ce dont votre famille a besoin. MyCoco vous aide à trouver les options de garde pertinentes près de chez vous." : "Tell us what your family needs. MyCoco helps you find relevant childcare options close to home.",
    alternates: { canonical: `/${raw}/mon-besoin`, languages: { "fr-CA": "/fr/mon-besoin", "en-CA": "/en/mon-besoin", "x-default": "/fr/mon-besoin" } },
  };
}

export default async function MyNeedPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale: raw } = await params;
  const queryParams = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const code = typeof queryParams.erreur === "string" ? queryParams.erreur : "";
  const error = code === "configuration"
    ? (fr ? "Votre recherche est prête, mais MyCoco rencontre un problème technique. Réessayez dans quelques instants." : "Your search is ready, but MyCoco is experiencing a technical issue. Please try again shortly.")
    : code === "server"
      ? (fr ? "Une erreur temporaire est survenue. Réessayez dans quelques instants." : "A temporary error occurred. Please try again shortly.")
      : code
        ? (fr ? "Vérifiez les informations saisies puis réessayez." : "Check the information entered and try again.")
        : "";

  return <main className="mc-search-page">
    <section className="mc-search-intro">
      <div className="mc-search-wrap">
        <Link className="mc-search-back" href={`/${locale}`}>← {fr ? "Accueil" : "Home"}</Link>
        <div className="mc-search-grid">
          <div>
            <span className="mc-eyebrow">{fr ? "MYCOCO · VOTRE BESOIN" : "MYCOCO · YOUR NEED"}</span>
            <h1>{fr ? "Commençons par votre famille." : "Let's start with your family."}</h1>
            <p>{fr ? "Quelques questions suffisent pour comprendre ce que vous cherchez et vous orienter vers les solutions les plus pertinentes près de chez vous." : "A few questions are enough to understand what you need and guide you toward the most relevant options nearby."}</p>
            <div className="mc-search-trust"><span>✓ {fr ? "Gratuit" : "Free"}</span><span>✓ {fr ? "Sans compte" : "No account"}</span><span>✓ {fr ? "Moins de 2 minutes" : "Under 2 minutes"}</span></div>
          </div>
          <div className="mc-search-promise"><span>✦</span><div><strong>{fr ? "Pas un formulaire interminable." : "Not another endless form."}</strong><p>{fr ? "Une question à la fois. Vous gardez le contrôle." : "One question at a time. You stay in control."}</p></div></div>
        </div>
      </div>
    </section>
    <section className="mc-search-body">
      <div className="mc-search-wrap mc-search-body-grid">
        <NeedWizard locale={locale} error={error} />
        <aside className="mc-search-aside">
          <span className="mc-aside-kicker">MYCOCO</span>
          <h2>{fr ? "On cherche avec vous, pas à votre place." : "We search with you, not instead of you."}</h2>
          <div className="mc-aside-item"><b>01</b><div><strong>{fr ? "Comprendre" : "Understand"}</strong><p>{fr ? "Votre secteur et votre réalité familiale." : "Your area and family reality."}</p></div></div>
          <div className="mc-aside-item"><b>02</b><div><strong>{fr ? "Prioriser" : "Prioritize"}</strong><p>{fr ? "Les options qui correspondent le mieux." : "The options that fit best."}</p></div></div>
          <div className="mc-aside-item"><b>03</b><div><strong>{fr ? "Rester à l'affût" : "Stay informed"}</strong><p>{fr ? "Votre recherche peut évoluer avec le temps." : "Your search can evolve over time."}</p></div></div>
          <p className="mc-aside-note">{fr ? "MyCoco complète les démarches officielles du Québec. Une présence dans nos résultats ne garantit jamais une place disponible." : "MyCoco complements Quebec's official childcare process. A listing never guarantees an available spot."}</p>
        </aside>
      </div>
    </section>
    <style>{`
      .mc-search-page{min-height:calc(100vh - 78px);background:#f7f8f5;color:#18352c}.mc-search-wrap{width:min(1160px,calc(100% - 40px));margin:0 auto}.mc-search-intro{background:#fbfaf7;border-bottom:1px solid #dfe7e2;padding:34px 0 48px}.mc-search-back{display:inline-flex;color:#5e7068;font-size:13px;font-weight:800;margin-bottom:28px}.mc-search-grid{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:70px;align-items:end}.mc-eyebrow,.mc-aside-kicker{font-size:11px;letter-spacing:.14em;font-weight:900;color:#4b7b66}.mc-search-intro h1{max-width:760px;margin:13px 0 14px;font-size:clamp(42px,5.7vw,70px);line-height:.98;letter-spacing:-.065em}.mc-search-intro p{max-width:680px;margin:0;color:#63736c;font-size:18px;line-height:1.6}.mc-search-trust{display:flex;flex-wrap:wrap;gap:18px;margin-top:21px;color:#4b7b66;font-size:12px;font-weight:800}.mc-search-promise{display:flex;gap:12px;padding:18px;background:#eaf4ee;border:1px solid #d9e9df;border-radius:18px}.mc-search-promise>span{display:grid;place-items:center;flex:0 0 34px;width:34px;height:34px;border-radius:10px;background:#193f32;color:#fff}.mc-search-promise strong{font-size:13px}.mc-search-promise p{font-size:11px;line-height:1.45;margin:4px 0 0}.mc-search-body{padding:42px 0 90px}.mc-search-body-grid{display:grid;grid-template-columns:minmax(0,760px) minmax(240px,320px);gap:55px;align-items:start}.mc-search-aside{position:sticky;top:100px;padding-top:8px}.mc-search-aside h2{font-size:28px;line-height:1.08;letter-spacing:-.045em;margin:10px 0 25px}.mc-aside-item{display:grid;grid-template-columns:30px 1fr;gap:10px;padding:14px 0;border-top:1px solid #dfe7e2}.mc-aside-item b{font-size:11px;color:#75a88f}.mc-aside-item strong{font-size:12px}.mc-aside-item p{margin:3px 0 0;color:#75837d;font-size:11px;line-height:1.45}.mc-aside-note{padding-top:20px;color:#7b8882;font-size:10px;line-height:1.55}
      .mc-wizard{padding:30px;background:#fff;border:1px solid #dfe7e2;border-radius:25px;box-shadow:0 20px 60px rgba(24,53,44,.08)}.mc-wizard-top{display:flex;align-items:end;justify-content:space-between;gap:15px}.mc-wizard-kicker{display:block;color:#4b7b66;font-size:10px;font-weight:900;letter-spacing:.12em;margin-bottom:5px}.mc-wizard-top strong{font-size:14px}.mc-wizard-top>span{color:#7b8982;font-size:10px;font-weight:750}.mc-wizard-progress{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:12px 0 34px}.mc-wizard-progress span{height:4px;border-radius:99px;background:#e7ece9}.mc-wizard-progress span.active{background:#193f32}.mc-wizard-step{min-height:310px}.mc-step-number{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#e8f3ec;color:#193f32;font-size:11px;font-weight:900}.mc-wizard-step h2{font-size:30px;line-height:1.05;letter-spacing:-.045em;margin:18px 0 8px}.mc-wizard-step>p{max-width:590px;color:#718078;font-size:13px;line-height:1.55;margin:0 0 24px}.mc-wizard-step label{display:block}.mc-wizard-step label>span{display:block;color:#52615b;font-size:11px;font-weight:850;margin-bottom:7px}.mc-wizard-step input{width:100%;height:54px;border:1px solid #d6e1da;border-radius:13px;padding:0 15px;font-size:15px;color:#18352c;outline:none}.mc-wizard-step input:focus{border-color:#4b7b66;box-shadow:0 0 0 4px rgba(75,123,102,.1)}.mc-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mc-choice-grid button,.mc-choice-list button{border:1px solid #dce6e0;background:#fff;color:#18352c;border-radius:14px;text-align:left;font-weight:800;cursor:pointer}.mc-choice-grid button{min-height:68px;padding:12px 15px;position:relative}.mc-choice-grid button span{position:absolute;right:13px;top:12px;color:#4b7b66}.mc-choice-grid button.selected,.mc-choice-list button.selected{border-color:#4b7b66;background:#edf6f1;box-shadow:0 0 0 2px rgba(75,123,102,.08)}.mc-choice-list{display:grid;gap:8px}.mc-choice-list button{min-height:54px;padding:0 15px;display:flex;align-items:center;justify-content:space-between}.mc-choice-list button b{color:#4b7b66}.mc-wizard-summary{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px;padding:14px;border-radius:14px;background:#f2f6f3;color:#63736c;font-size:11px}.mc-wizard-summary strong{width:100%;color:#18352c;font-size:11px}.mc-wizard-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:22px;border-top:1px solid #edf1ee}.mc-back{border:0;background:transparent;color:#63736c;font-weight:800;font-size:12px;cursor:pointer}.mc-next{min-height:50px;border:0;border-radius:12px;background:#193f32;color:#fff;padding:0 19px;font-weight:900;cursor:pointer;box-shadow:0 9px 24px rgba(25,63,50,.16)}.mc-next:hover{background:#102f26;transform:translateY(-1px)}.mc-next:disabled{opacity:.45;cursor:not-allowed;transform:none}.mc-wizard-foot{margin:12px 0 0;text-align:center;color:#87928c;font-size:10px;line-height:1.5}.mc-wizard-error{margin-bottom:15px;padding:12px 14px;border-radius:12px;background:#fff5eb;border:1px solid #efddc7;color:#77502b;font-size:11px}.mc-hp{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important}
      @media(max-width:900px){.mc-search-grid,.mc-search-body-grid{grid-template-columns:1fr}.mc-search-promise,.mc-search-aside{display:none}.mc-wizard{max-width:760px;margin:auto}.mc-wizard-step{min-height:290px}}@media(max-width:600px){.mc-search-wrap{width:min(100% - 28px,760px)}.mc-search-intro{padding:25px 0 32px}.mc-search-intro h1{font-size:42px}.mc-search-intro p{font-size:15px}.mc-search-trust{gap:10px}.mc-search-body{padding:20px 0 55px}.mc-wizard{padding:20px 17px;border-radius:20px}.mc-wizard-step h2{font-size:26px}.mc-choice-grid{grid-template-columns:1fr}.mc-wizard-actions{padding-top:17px}}
    `}</style>
  </main>;
}

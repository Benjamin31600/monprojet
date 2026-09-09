import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map(locale => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  return {
    title: fr ? "Trouver une solution de garde | MyCoco" : "Find childcare that fits your family | MyCoco",
    description: fr ? "Décrivez votre besoin en quelques étapes et laissez MyCoco prioriser les solutions de garde pertinentes pour votre famille." : "Tell us what your family needs in a few steps and let MyCoco prioritize relevant childcare solutions.",
    alternates: { canonical: `/${raw}/mon-besoin`, languages: { "fr-CA": "/fr/mon-besoin", "en-CA": "/en/mon-besoin", "x-default": "/fr/mon-besoin" } },
  };
}

export default async function MyNeedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";

  const t = fr ? {
    back: "Retour à la recherche",
    eyebrow: "MYCOCO · VOTRE BESOIN",
    title: "Trouvez la solution qui convient à votre famille.",
    lead: "Répondez à 4 questions. Votre besoin devient actif et MyCoco peut ensuite prioriser les solutions les plus pertinentes.",
    trust: "Recherche gratuite · Sans carte de crédit · Vos renseignements restent confidentiels",
    step1: "Où avez-vous besoin de garde ?",
    step1p: "Votre ville ou votre code postal nous permet de commencer localement.",
    city: "Ville ou code postal",
    cityPh: "Ex. Mirabel, J7J 1A1",
    step2: "Quel âge aura votre enfant ?",
    step2p: "L'âge nous aide à comprendre les solutions potentiellement pertinentes.",
    age: "Âge de l'enfant",
    select: "Sélectionner",
    step3: "Quel type de garde recherchez-vous ?",
    step3p: "Si vous êtes ouvert, laissez MyCoco explorer toutes les options.",
    type: "Préférence de garde",
    all: "Toutes les solutions",
    step4: "Quand en avez-vous besoin ?",
    step4p: "Facultatif. Une date aide à prioriser votre besoin.",
    date: "Date de début souhaitée",
    optional: "facultatif",
    activeTitle: "Votre recherche ne s'arrête pas ici",
    activeText: "Après votre demande, vous pourrez consulter les solutions pertinentes. Votre besoin peut ensuite devenir le point de départ de futures alertes MyCoco.",
    submit: "Trouver ma solution",
    disclaimer: "La disponibilité réelle doit toujours être confirmée auprès du service de garde.",
  } : {
    back: "Back to search",
    eyebrow: "MYCOCO · YOUR NEED",
    title: "Find the solution that fits your family.",
    lead: "Answer 4 questions. Your need becomes active and MyCoco can prioritize the most relevant childcare solutions.",
    trust: "Free search · No credit card · Your information stays private",
    step1: "Where do you need childcare?",
    step1p: "Your city or postal code lets us start locally.",
    city: "City or postal code",
    cityPh: "e.g. Mirabel, J7J 1A1",
    step2: "How old will your child be?",
    step2p: "Age helps us understand which solutions may be relevant.",
    age: "Child's age",
    select: "Select",
    step3: "What type of childcare do you prefer?",
    step3p: "If you're open, let MyCoco explore every option.",
    type: "Childcare preference",
    all: "All childcare options",
    step4: "When do you need it?",
    step4p: "Optional. A date helps prioritize your need.",
    date: "Desired start date",
    optional: "optional",
    activeTitle: "Your search does not stop here",
    activeText: "After your request, you can explore relevant solutions. Your need can then become the starting point for future MyCoco alerts.",
    submit: "Find my solution",
    disclaimer: "Actual availability must always be confirmed with the childcare provider.",
  };

  return <main className="need-page">
    <section className="need-hero">
      <div className="section-inner need-hero-inner">
        <Link className="back-link" href={`/${locale}/garderies`}>← {t.back}</Link>
        <span className="eyebrow">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p className="need-lead">{t.lead}</p>
        <div className="need-trust"><span>✓</span>{t.trust}</div>
      </div>
    </section>

    <section className="need-section">
      <div className="section-inner need-layout">
        <form className="need-card" action="/api/demandes" method="post" autoComplete="on">
          <input type="hidden" name="locale" value={locale} />
          <input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="need-progress" aria-hidden="true"><span className="active"></span><span></span><span></span><span></span></div>
          <p className="need-progress-label">{fr ? "4 étapes · moins de 2 minutes" : "4 steps · under 2 minutes"}</p>

          <div className="need-block">
            <div className="need-step"><span>01</span><div><h2>{t.step1}</h2><p>{t.step1p}</p></div></div>
            <label className="need-field"><span>{t.city}</span><input name="ville" placeholder={t.cityPh} autoComplete="postal-code" inputMode="text" required /></label>
          </div>

          <div className="need-block">
            <div className="need-step"><span>02</span><div><h2>{t.step2}</h2><p>{t.step2p}</p></div></div>
            <label className="need-field"><span>{t.age}</span><select name="age" defaultValue="" required><option value="" disabled>{t.select}</option><option value="0-18">0–18 {fr ? "mois" : "months"}</option><option value="18-36">18–36 {fr ? "mois" : "months"}</option><option value="3-5">3–5 {fr ? "ans" : "years"}</option><option value="5+">5+ {fr ? "ans" : "years"}</option></select></label>
          </div>

          <div className="need-block">
            <div className="need-step"><span>03</span><div><h2>{t.step3}</h2><p>{t.step3p}</p></div></div>
            <label className="need-field"><span>{t.type}</span><select name="type" defaultValue=""><option value="">{t.all}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu-familial">{fr ? "Milieu familial" : "Home daycare"}</option><option value="non-subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label>
          </div>

          <div className="need-block last">
            <div className="need-step"><span>04</span><div><h2>{t.step4}</h2><p>{t.step4p}</p></div></div>
            <label className="need-field"><span>{t.date} <small>({t.optional})</small></span><input name="debut" type="date" /></label>
          </div>

          <div className="active-need-box">
            <div className="active-need-icon">✦</div>
            <div><strong>{t.activeTitle}</strong><p>{t.activeText}</p></div>
          </div>

          <button className="primary-button need-submit" type="submit">{t.submit} <span aria-hidden="true">→</span></button>
          <p className="need-disclaimer">{t.disclaimer}</p>
        </form>

        <aside className="need-side" aria-label={fr ? "Pourquoi créer votre besoin" : "Why create your need"}>
          <span className="need-side-label">MYCOCO RADAR</span>
          <h2>{fr ? "Le vrai avantage : ne plus recommencer votre recherche." : "The real advantage: never restart your search."}</h2>
          <div className="radar-card"><span>01</span><div><strong>{fr ? "Votre besoin" : "Your need"}</strong><p>{fr ? "Votre recherche est structurée une seule fois." : "Your search is structured once."}</p></div></div>
          <div className="radar-card"><span>02</span><div><strong>{fr ? "Votre matching" : "Your matching"}</strong><p>{fr ? "MyCoco priorise les solutions selon les critères disponibles." : "MyCoco prioritizes solutions using available criteria."}</p></div></div>
          <div className="radar-card"><span>03</span><div><strong>{fr ? "Vos prochaines opportunités" : "Future opportunities"}</strong><p>{fr ? "Le besoin pourra devenir le point de départ d'alertes pertinentes." : "Your need can become the starting point for relevant alerts."}</p></div></div>
        </aside>
      </div>
    </section>

    <style>{`
      .need-page{min-height:calc(100vh - 78px);background:#fbfaf7;color:#17201d}
      .need-hero{background:linear-gradient(135deg,#edf6f0 0%,#fbfaf7 72%);border-bottom:1px solid #e1e8e3;padding:42px 0 48px}
      .need-hero-inner{max-width:1120px}.back-link{display:inline-flex;align-items:center;color:#193f32;font-size:.78rem;font-weight:800;text-decoration:none;margin-bottom:30px}.back-link:hover{text-decoration:underline}
      .need-hero .eyebrow{display:block;color:#3f725d;font-size:.68rem;font-weight:900;letter-spacing:.16em}.need-hero h1{max-width:850px;margin:12px 0 14px;font-size:clamp(2.7rem,5.8vw,5.3rem);line-height:.96;letter-spacing:-.065em}.need-lead{max-width:700px;margin:0;color:#52615b;font-size:1.05rem;line-height:1.6}.need-trust{display:inline-flex;align-items:center;gap:8px;margin-top:20px;color:#3f725d;font-size:.72rem;font-weight:750}.need-trust span{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#dfeee5}
      .need-section{padding:48px 0 96px}.need-layout{display:grid;grid-template-columns:minmax(0,760px) minmax(260px,330px);gap:48px;align-items:start}.need-card{padding:30px;background:#fff;border:1px solid #dfe7e2;border-radius:26px;box-shadow:0 20px 60px rgba(25,63,50,.08)}
      .need-progress{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.need-progress span{height:4px;border-radius:99px;background:#e6ece8}.need-progress span.active{background:#193f32}.need-progress-label{margin:8px 0 28px;color:#7a867f;font-size:.68rem;font-weight:700}
      .need-block{padding:0 0 26px;margin-bottom:26px;border-bottom:1px solid #edf1ee}.need-block.last{margin-bottom:20px}.need-step{display:grid;grid-template-columns:44px 1fr;gap:14px;align-items:start;margin-bottom:15px}.need-step>span{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#e8f3ec;color:#193f32;font-size:.67rem;font-weight:900}.need-step h2{margin:0;font-size:1.1rem;letter-spacing:-.025em}.need-step p{margin:4px 0 0;color:#77827c;font-size:.75rem;line-height:1.5}.need-field{display:block}.need-field>span{display:block;margin-bottom:8px;color:#52615b;font-size:.73rem;font-weight:850}.need-field small{color:#87928c;font-weight:650}.need-field input,.need-field select{width:100%;height:54px;padding:0 15px;border:1px solid #d8e2dc;border-radius:13px;background:#fff;color:#17201d;outline:none;font-size:.88rem;transition:border-color .15s ease,box-shadow .15s ease}.need-field input::placeholder{color:#a0aaa5}.need-field input:focus,.need-field select:focus{border-color:#3f725d;box-shadow:0 0 0 4px rgba(63,114,93,.1)}
      .active-need-box{display:flex;gap:13px;align-items:flex-start;padding:16px;margin:4px 0 18px;background:#f1f7f3;border:1px solid #dbe9df;border-radius:16px}.active-need-icon{display:grid;place-items:center;flex:0 0 38px;width:38px;height:38px;border-radius:11px;background:#193f32;color:#fff}.active-need-box strong{display:block;font-size:.78rem;color:#193f32}.active-need-box p{margin:4px 0 0;color:#65726b;font-size:.68rem;line-height:1.55}.need-submit{width:100%;min-height:56px;font-size:.94rem;border-radius:14px}.need-disclaimer{margin:12px auto 0;max-width:600px;text-align:center;color:#87928c;font-size:.65rem;line-height:1.5}
      .need-side{position:sticky;top:100px;padding:4px 0}.need-side-label{display:inline-block;color:#3f725d;font-size:.66rem;font-weight:900;letter-spacing:.14em}.need-side h2{font-size:1.65rem;line-height:1.08;letter-spacing:-.04em;margin:10px 0 22px}.radar-card{display:flex;gap:12px;padding:14px 0;border-top:1px solid #e4eae6}.radar-card>span{font-size:.66rem;font-weight:900;color:#72a98e}.radar-card strong{font-size:.78rem}.radar-card p{margin:3px 0 0;color:#78847e;font-size:.68rem;line-height:1.5}
      .hp-field{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important}
      @media(max-width:900px){.need-layout{grid-template-columns:1fr}.need-side{display:none}.need-card{max-width:760px;margin:auto}}
      @media(max-width:600px){.need-hero{padding:32px 0 36px}.need-hero h1{font-size:2.65rem}.need-section{padding:28px 0 60px}.need-card{padding:21px 17px;border-radius:20px}.need-step{grid-template-columns:40px 1fr;gap:11px}.need-step>span{width:37px;height:37px}.need-progress-label{margin-bottom:22px}}
    `}</style>
  </main>;
}

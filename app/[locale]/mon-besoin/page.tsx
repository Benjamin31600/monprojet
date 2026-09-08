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
    title: fr ? "Mon besoin de garde | MyCoco" : "My childcare needs | MyCoco",
    description: fr ? "Décrivez votre besoin de garde et créez une demande de matching adaptée à votre famille." : "Tell MyCoco what childcare you need and create a matching request that fits your family.",
    alternates: { canonical: `/${raw}/mon-besoin`, languages: { "fr-CA": "/fr/mon-besoin", "en-CA": "/en/mon-besoin", "x-default": "/fr/mon-besoin" } },
  };
}

export default async function MyNeedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  return <main className="need-page">
    <section className="need-hero"><div className="section-inner">
      <Link className="back-link" href={`/${locale}/garderies`}>← {fr ? "Retour à la recherche" : "Back to search"}</Link>
      <span className="eyebrow">MYCOCO · {fr ? "VOTRE BESOIN" : "YOUR NEED"}</span>
      <h1>{fr ? "Dites-nous quand vous avez besoin de garde." : "Tell us when you need childcare."}</h1>
      <p>{fr ? "Quelques informations suffisent pour créer votre demande et préparer le matching avec les solutions de garde pertinentes." : "A few details are enough to create your request and prepare matching with relevant childcare solutions."}</p>
    </div></section>
    <section className="need-section"><div className="section-inner"><form className="need-card" action="/api/demandes" method="post">
      <input type="hidden" name="locale" value={locale} />
      <div className="matching-intro"><div className="matching-icon">✦</div><div><strong>{fr ? "Votre demande de matching" : "Your matching request"}</strong><p>{fr ? "À la fin du formulaire, MyCoco enregistre votre besoin. Il pourra ensuite être comparé aux solutions de garde correspondant à votre secteur, à l'âge de votre enfant et à votre date de début." : "At the end of the form, MyCoco saves your childcare need. It can then be compared with solutions matching your area, your child's age and your desired start date."}</p></div></div>
      <div className="need-step"><span>01</span><div><h2>{fr ? "Où ?" : "Where?"}</h2><p>{fr ? "Le secteur où vous cherchez une solution." : "The area where you need childcare."}</p></div></div>
      <label className="need-field"><span>{fr ? "Ville ou code postal" : "City or postal code"}</span><input name="ville" placeholder={fr ? "Ex. Mirabel, J7J..." : "e.g. Mirabel, J7J..."} autoComplete="postal-code" required /></label>
      <div className="need-step"><span>02</span><div><h2>{fr ? "Pour quel âge ?" : "For what age?"}</h2><p>{fr ? "L'âge de votre enfant nous aide à affiner le matching." : "Your child's age helps refine matching."}</p></div></div>
      <label className="need-field"><span>{fr ? "Âge de l'enfant" : "Child's age"}</span><select name="age" defaultValue="" required><option value="" disabled>{fr ? "Sélectionner" : "Select"}</option><option value="0-18">0–18 {fr ? "mois" : "months"}</option><option value="18-36">18–36 {fr ? "mois" : "months"}</option><option value="3-5">3–5 {fr ? "ans" : "years"}</option><option value="5+">5+ {fr ? "ans" : "years"}</option></select></label>
      <div className="need-step"><span>03</span><div><h2>{fr ? "Quel type de garde ?" : "What type of childcare?"}</h2><p>{fr ? "Votre préférence aide MyCoco à prioriser les solutions pertinentes." : "Your preference helps MyCoco prioritize relevant solutions."}</p></div></div>
      <label className="need-field"><span>{fr ? "Type de garde" : "Childcare type"}</span><select name="type" defaultValue=""><option value="">{fr ? "Je suis ouvert à toutes les solutions" : "I'm open to all solutions"}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu-familial">{fr ? "Milieu familial" : "Home daycare"}</option><option value="non-subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label>
      <div className="need-step"><span>04</span><div><h2>{fr ? "Quand ?" : "When?"}</h2><p>{fr ? "Votre date permet de prioriser votre demande de matching." : "Your date helps prioritize your matching request."}</p></div></div>
      <label className="need-field"><span>{fr ? "Date de début souhaitée" : "Desired start date"}</span><input name="debut" type="date" /></label>
      <div className="matching-next"><span>✓</span><div><strong>{fr ? "Votre demande sera enregistrée" : "Your request will be saved"}</strong><p>{fr ? "Elle pourra servir de base au futur moteur de matching MyCoco. Nous ne prétendons pas connaître la disponibilité en temps réel." : "It can serve as the basis for MyCoco's future matching engine. We do not claim to know real-time availability."}</p></div></div>
      <button className="primary-button need-submit" type="submit">{fr ? "Créer ma demande et voir les solutions" : "Create my request and see solutions"} →</button>
      <p className="need-disclaimer">{fr ? "Recherche gratuite. La disponibilité réelle doit être confirmée directement auprès de l'établissement." : "Free search. Actual availability must be confirmed directly with the provider."}</p>
    </form></div></section>
    <style>{`.need-page{min-height:calc(100vh - 78px);background:linear-gradient(180deg,#eef5ef 0%,#f8f4ea 42%,#f8f4ea 100%)}.need-hero{padding:48px 0 34px;border-bottom:1px solid var(--line)}.back-link{display:inline-flex;align-items:center;gap:7px;color:var(--green);font-size:.78rem;font-weight:850;margin-bottom:34px}.back-link:hover{text-decoration:underline}.need-hero .eyebrow{display:block;color:var(--green);font-size:.68rem;font-weight:900;letter-spacing:.16em}.need-hero h1{max-width:820px;margin:12px 0 14px;font-size:clamp(2.55rem,5vw,4.7rem);line-height:1;letter-spacing:-.065em}.need-hero p{max-width:700px;margin:0;color:var(--ink-2);font-size:1.02rem;line-height:1.65}.need-section{padding:42px 0 88px}.need-card{width:min(760px,100%);margin:0 auto;padding:30px;background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow)}.matching-intro{display:flex;gap:14px;align-items:flex-start;padding:16px 17px;margin-bottom:28px;border:1px solid #dce9df;background:var(--sage);border-radius:16px}.matching-icon{display:grid;place-items:center;flex:0 0 38px;width:38px;height:38px;border-radius:11px;background:var(--green);color:#fff;font-size:1rem}.matching-intro strong{display:block;color:var(--green);font-size:.86rem}.matching-intro p{margin:4px 0 0;color:var(--ink-2);font-size:.73rem;line-height:1.55}.need-step{display:grid;grid-template-columns:46px 1fr;gap:15px;align-items:start;padding:4px 0 16px}.need-step>span{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--sage);color:var(--green);font-size:.68rem;font-weight:900}.need-step h2{margin:0;font-size:1.08rem;letter-spacing:-.025em}.need-step p{margin:3px 0 0;color:var(--muted);font-size:.75rem;line-height:1.5}.need-field{display:block;padding:0 0 28px;margin:0 0 26px;border-bottom:1px solid #edf1ee}.need-field>span{display:block;margin:0 0 8px;color:var(--ink-2);font-size:.74rem;font-weight:850}.need-field input,.need-field select{width:100%;height:52px;padding:0 14px;border:1px solid var(--line-strong);border-radius:12px;background:#fff;color:var(--ink);outline:0;font-size:.88rem;transition:border-color .15s ease,box-shadow .15s ease}.need-field input::placeholder{color:#9aa7a1}.need-field input:focus,.need-field select:focus{border-color:var(--green);box-shadow:0 0 0 4px rgba(35,107,88,.09)}.matching-next{display:flex;gap:11px;align-items:flex-start;padding:15px 16px;margin:2px 0 18px;border-radius:14px;background:#f7faf7;border:1px solid #e4ebe5}.matching-next>span{display:grid;place-items:center;flex:0 0 25px;width:25px;height:25px;border-radius:50%;background:var(--green);color:#fff;font-size:.7rem;font-weight:900}.matching-next strong{display:block;color:var(--ink);font-size:.76rem}.matching-next p{margin:3px 0 0;color:var(--muted);font-size:.67rem;line-height:1.5}.need-submit{width:100%;min-height:54px;margin-top:0;font-size:.9rem}.need-disclaimer{margin:14px auto 0;max-width:600px;text-align:center;color:var(--muted);font-size:.67rem;line-height:1.55}@media(max-width:700px){.need-hero{padding:34px 0 28px}.need-hero h1{font-size:2.55rem}.need-section{padding:28px 0 60px}.need-card{padding:21px 18px;border-radius:20px}.need-step{grid-template-columns:40px 1fr;gap:12px}.need-step>span{width:38px;height:38px}.matching-intro{padding:14px}.need-field{padding-bottom:22px;margin-bottom:22px}}`}</style>
  </main>;
}

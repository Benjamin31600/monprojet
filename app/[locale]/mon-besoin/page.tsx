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
    description: fr ? "Décrivez votre besoin de garde et préparez une recherche adaptée à votre famille." : "Tell MyCoco what childcare you need and prepare a search that fits your family.",
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
      <p>{fr ? "Quelques informations suffisent pour préparer une recherche vraiment utile à votre famille." : "A few details are enough to prepare a search that is genuinely useful for your family."}</p>
    </div></section>
    <section className="need-section"><div className="section-inner"><form className="need-card" action="/api/demandes" method="post">
      <input type="hidden" name="locale" value={locale} />
      <div className="need-step"><span>01</span><div><h2>{fr ? "Où ?" : "Where?"}</h2><p>{fr ? "Le secteur où vous cherchez une solution." : "The area where you need childcare."}</p></div></div>
      <label className="need-field"><span>{fr ? "Ville ou code postal" : "City or postal code"}</span><input name="ville" placeholder={fr ? "Ex. Mirabel, J7J..." : "e.g. Mirabel, J7J..."} autoComplete="postal-code" required /></label>
      <div className="need-step"><span>02</span><div><h2>{fr ? "Pour quel âge ?" : "For what age?"}</h2><p>{fr ? "L'âge de votre enfant nous aide à affiner les solutions." : "Your child's age helps narrow the options."}</p></div></div>
      <label className="need-field"><span>{fr ? "Âge de l'enfant" : "Child's age"}</span><select name="age" defaultValue="" required><option value="" disabled>{fr ? "Sélectionner" : "Select"}</option><option value="0-18">0–18 {fr ? "mois" : "months"}</option><option value="18-36">18–36 {fr ? "mois" : "months"}</option><option value="3-5">3–5 {fr ? "ans" : "years"}</option><option value="5+">5+ {fr ? "ans" : "years"}</option></select></label>
      <div className="need-step"><span>03</span><div><h2>{fr ? "Quel type de garde ?" : "What type of childcare?"}</h2><p>{fr ? "Vous pouvez rester flexible et explorer toutes les options." : "You can stay flexible and explore all options."}</p></div></div>
      <label className="need-field"><span>{fr ? "Type de garde" : "Childcare type"}</span><select name="type" defaultValue=""><option value="">{fr ? "Je suis ouvert à toutes les solutions" : "I'm open to all solutions"}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu-familial">{fr ? "Milieu familial" : "Home daycare"}</option><option value="non-subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label>
      <div className="need-step"><span>04</span><div><h2>{fr ? "Quand ?" : "When?"}</h2><p>{fr ? "Votre date nous aide à structurer votre demande." : "Your date helps us structure your request."}</p></div></div>
      <label className="need-field"><span>{fr ? "Date de début souhaitée" : "Desired start date"}</span><input name="debut" type="date" /></label>
      <button className="primary-button need-submit" type="submit">{fr ? "Voir mes solutions" : "See my solutions"} →</button>
      <p className="need-disclaimer">{fr ? "Recherche gratuite. MyCoco ne prétend pas afficher la disponibilité en temps réel : elle doit être confirmée auprès de l'établissement." : "Free search. MyCoco does not claim to show real-time availability: this must be confirmed with the provider."}</p>
    </form></div></section>
    <style>{`.need-page{min-height:calc(100vh - 78px);background:linear-gradient(180deg,#eef5ef 0%,#f8f4ea 42%,#f8f4ea 100%)}.need-hero{padding:48px 0 34px;border-bottom:1px solid var(--line)}.back-link{display:inline-flex;align-items:center;gap:7px;color:var(--green);font-size:.78rem;font-weight:850;margin-bottom:34px}.back-link:hover{text-decoration:underline}.need-hero .eyebrow{display:block;color:var(--green);font-size:.68rem;font-weight:900;letter-spacing:.16em}.need-hero h1{max-width:820px;margin:12px 0 14px;font-size:clamp(2.55rem,5vw,4.7rem);line-height:1;letter-spacing:-.065em}.need-hero p{max-width:650px;margin:0;color:var(--ink-2);font-size:1.02rem;line-height:1.65}.need-section{padding:42px 0 88px}.need-card{width:min(760px,100%);margin:0 auto;padding:30px;background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow)}.need-step{display:grid;grid-template-columns:46px 1fr;gap:15px;align-items:start;padding:4px 0 16px}.need-step>span{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:var(--sage);color:var(--green);font-size:.68rem;font-weight:900}.need-step h2{margin:0;font-size:1.08rem;letter-spacing:-.025em}.need-step p{margin:3px 0 0;color:var(--muted);font-size:.75rem;line-height:1.5}.need-field{display:block;padding:0 0 28px;margin:0 0 26px;border-bottom:1px solid #edf1ee}.need-field>span{display:block;margin:0 0 8px;color:var(--ink-2);font-size:.74rem;font-weight:850}.need-field input,.need-field select{width:100%;height:52px;padding:0 14px;border:1px solid var(--line-strong);border-radius:12px;background:#fff;color:var(--ink);outline:0;font-size:.88rem;transition:border-color .15s ease,box-shadow .15s ease}.need-field input::placeholder{color:#9aa7a1}.need-field input:focus,.need-field select:focus{border-color:var(--green);box-shadow:0 0 0 4px rgba(35,107,88,.09)}.need-submit{width:100%;min-height:54px;margin-top:0;font-size:.9rem}.need-disclaimer{margin:14px auto 0;max-width:600px;text-align:center;color:var(--muted);font-size:.67rem;line-height:1.55}@media(max-width:700px){.need-hero{padding:34px 0 28px}.need-hero h1{font-size:2.55rem}.need-section{padding:28px 0 60px}.need-card{padding:21px 18px;border-radius:20px}.need-step{grid-template-columns:40px 1fr;gap:12px}.need-step>span{width:38px;height:38px}.need-field{padding-bottom:22px;margin-bottom:22px}}`}</style>
  </main>;
}

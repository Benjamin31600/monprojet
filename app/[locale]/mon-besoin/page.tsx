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
    <section className="need-section"><div className="section-inner"><form className="need-card" action={`/${locale}/garderies`} method="get">
      <div className="need-step"><span>01</span><div><h2>{fr ? "Où ?" : "Where?"}</h2><p>{fr ? "Le secteur où vous cherchez une solution." : "The area where you need childcare."}</p></div></div>
      <label className="need-field"><span>{fr ? "Ville ou code postal" : "City or postal code"}</span><input name="ville" placeholder={fr ? "Ex. Mirabel, J7J..." : "e.g. Mirabel, J7J..."} required /></label>
      <div className="need-step"><span>02</span><div><h2>{fr ? "Pour quel âge ?" : "For what age?"}</h2><p>{fr ? "L'âge de votre enfant nous aide à affiner les solutions." : "Your child's age helps narrow the options."}</p></div></div>
      <label className="need-field"><span>{fr ? "Âge de l'enfant" : "Child's age"}</span><select name="age" defaultValue="" required><option value="" disabled>{fr ? "Sélectionner" : "Select"}</option><option value="0-18">0–18 {fr ? "mois" : "months"}</option><option value="18-36">18–36 {fr ? "mois" : "months"}</option><option value="3-5">3–5 {fr ? "ans" : "years"}</option><option value="5+">5+ {fr ? "ans" : "years"}</option></select></label>
      <div className="need-step"><span>03</span><div><h2>{fr ? "Quel type de garde ?" : "What type of childcare?"}</h2><p>{fr ? "Vous pouvez rester flexible et explorer toutes les options." : "You can stay flexible and explore all options."}</p></div></div>
      <label className="need-field"><span>{fr ? "Type de garde" : "Childcare type"}</span><select name="type" defaultValue=""><option value="">{fr ? "Je suis ouvert à toutes les solutions" : "I'm open to all solutions"}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu-familial">{fr ? "Milieu familial" : "Home daycare"}</option><option value="non-subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label>
      <div className="need-step"><span>04</span><div><h2>{fr ? "Quand ?" : "When?"}</h2><p>{fr ? "Cette information sera la prochaine brique de votre demande MyCoco." : "This will become the next building block of your MyCoco request."}</p></div></div>
      <label className="need-field"><span>{fr ? "Date de début souhaitée" : "Desired start date"}</span><input name="debut" type="date" /></label>
      <button className="primary-button need-submit" type="submit">{fr ? "Voir mes solutions" : "See my solutions"} →</button>
      <p className="need-disclaimer">{fr ? "Recherche gratuite. MyCoco ne prétend pas afficher la disponibilité en temps réel : elle doit être confirmée auprès de l'établissement." : "Free search. MyCoco does not claim to show real-time availability: this must be confirmed with the provider."}</p>
    </form></div></section>
  </main>;
}

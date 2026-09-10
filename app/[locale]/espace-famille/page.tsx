import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function FamilySpacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";
  return <main className="mc-space-page">
    <section className="mc-space-hero">
      <div className="mc-space-wrap">
        <span className="mc-space-eyebrow">MYCOCO · {fr ? "ESPACE FAMILLE" : "FAMILY SPACE"}</span>
        <h1>{fr ? "Votre recherche mérite de continuer même quand vous n'êtes pas devant votre écran." : "Your search should keep moving even when you're not at your screen."}</h1>
        <p>{fr ? "Enregistrez votre famille, vos critères et vos recherches. MyCoco pourra ensuite vous prévenir lorsque de nouvelles possibilités correspondent à votre besoin." : "Save your family, criteria and searches. MyCoco can then notify you when new possibilities fit your needs."}</p>
        <Link className="mc-space-primary" href={`/${locale}/mon-besoin`}>{fr ? "Commencer ma recherche" : "Start my search"} →</Link>
      </div>
    </section>
    <section className="mc-space-body"><div className="mc-space-wrap">
      <div className="mc-space-grid">
        {[["01", fr ? "Ma famille" : "My family", fr ? "Enfants, âges et préférences réunis au même endroit." : "Children, ages and preferences in one place."], ["02", fr ? "Mes recherches" : "My searches", fr ? "Gardez plusieurs besoins actifs : maintenant, plus tard ou en secours." : "Keep multiple needs active: now, later or backup."], ["03", fr ? "Mes alertes" : "My alerts", fr ? "Soyez averti lorsqu'une nouvelle solution pertinente apparaît." : "Get notified when a relevant new option appears."], ["04", fr ? "Mes favoris" : "My favorites", fr ? "Comparez les services que vous souhaitez revoir avant de décider." : "Compare providers you want to revisit before deciding."]].map(([n,t,d]) => <article key={n}><b>{n}</b><h2>{t}</h2><p>{d}</p></article>)}
      </div>
      <div className="mc-space-note"><strong>{fr ? "Pas besoin de créer un compte pour commencer." : "You don't need an account to start."}</strong><span>{fr ? "Nous demandons vos informations au moment où elles apportent une vraie valeur à votre recherche." : "We ask for your information when it adds real value to your search."}</span></div>
    </div></section>
    <style>{`.mc-space-page{background:#fbfaf7;color:#17352d;min-height:70vh}.mc-space-wrap{width:min(1080px,calc(100% - 40px));margin:auto}.mc-space-hero{padding:76px 0 82px;background:linear-gradient(135deg,#f2eee5 0%,#e8f2ec 100%);border-bottom:1px solid #dfe7e2}.mc-space-eyebrow{font-size:10px;font-weight:950;letter-spacing:.14em;color:#507662}.mc-space-hero h1{max-width:820px;font-size:clamp(42px,6vw,70px);line-height:.98;letter-spacing:-.065em;margin:18px 0}.mc-space-hero p{max-width:720px;color:#64736c;font-size:18px;line-height:1.6}.mc-space-primary{display:inline-flex;margin-top:18px;padding:14px 19px;border-radius:12px;background:#17352d;color:#fff;font-size:13px;font-weight:900}.mc-space-body{padding:70px 0}.mc-space-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.mc-space-grid article{padding:24px;background:#fff;border:1px solid #dfe7e2;border-radius:19px}.mc-space-grid b{color:#c47745;font-size:11px}.mc-space-grid h2{font-size:20px;letter-spacing:-.035em;margin:32px 0 9px}.mc-space-grid p{font-size:12px;line-height:1.6;color:#718079;margin:0}.mc-space-note{margin-top:28px;padding:22px 24px;border-radius:18px;background:#17352d;color:#fff;display:flex;justify-content:space-between;gap:30px}.mc-space-note strong{font-size:14px}.mc-space-note span{max-width:500px;color:#cddbd5;font-size:11px;line-height:1.6}@media(max-width:800px){.mc-space-grid{grid-template-columns:1fr 1fr}.mc-space-note{flex-direction:column}}@media(max-width:520px){.mc-space-grid{grid-template-columns:1fr}.mc-space-hero{padding:55px 0 62px}}`}</style>
  </main>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import AuthPortal from "@/components/AuthPortal";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale: raw } = await params;
  const q = await searchParams;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const audience = q.role === "provider" || q.type === "provider" ? "provider" : "family";
  return <main className="mcs-auth-page"><section className="mcs-auth-shell"><div className="mcs-auth-copy">
    <Link href={`/${locale}`}>← {fr ? "Retour à MyCoco" : "Back to MyCoco"}</Link>
    <span>{audience === "family" ? (fr ? "CONNEXION FAMILLE" : "FAMILY SIGN IN") : (fr ? "CONNEXION SERVICE DE GARDE" : "CHILDCARE PROVIDER SIGN IN")}</span>
    <h1>{audience === "family" ? (fr ? "Retrouvez votre recherche là où vous l’avez laissée." : "Pick up your search where you left off.") : (fr ? "Retrouvez votre fiche et votre espace professionnel." : "Return to your profile and professional space.")}</h1>
    <p>{audience === "family" ? (fr ? "Votre espace rassemble vos recherches, vos favoris et les futures alertes MyCoco. Vos informations personnelles restent distinctes de l’annuaire public." : "Your space brings together searches, favourites and future MyCoco alerts. Personal information stays separate from the public directory.") : (fr ? "Connectez-vous pour gérer les informations de votre service et retrouver les outils liés à votre présence MyCoco." : "Sign in to manage your service information and access the tools linked to your MyCoco presence.")}</p>
    <div className="mcs-auth-switch"><b>{fr ? "Changer d’espace" : "Switch space"}</b><Link href={`/${locale}/connexion?role=${audience === "family" ? "provider" : "family"}`}>{audience === "family" ? (fr ? "Je gère un service de garde" : "I run a childcare service") : (fr ? "Je suis une famille" : "I’m a family")} →</Link></div>
  </div><AuthPortal locale={locale} audience={audience} mode="signin" /></section>
  <style>{`
    .mcs-auth-page{--blue:#333873;--blue-dark:#242954;--yellow:#ffd44f;--bg:#f7f7fb;--line:#e1e2ea;--muted:#737587;min-height:calc(100vh - 72px);background:var(--bg);color:#2b2d42;padding:52px 20px 76px;font-family:Arial,Helvetica,sans-serif}.mcs-auth-shell{width:min(1080px,100%);margin:auto;display:grid;grid-template-columns:minmax(0,1fr) 430px;gap:72px;align-items:center}.mcs-auth-copy>a{display:inline-flex;margin-bottom:52px;color:#77798a;font-size:10px;font-weight:850}.mcs-auth-copy>span{font-size:10px;font-weight:900;letter-spacing:.1em;color:#858797}.mcs-auth-copy h1{max-width:650px;margin:12px 0 17px;color:var(--blue);font-size:clamp(43px,5.8vw,68px);line-height:.98;letter-spacing:-.055em}.mcs-auth-copy>p{max-width:600px;margin:0;color:var(--muted);font-size:15px;line-height:1.65}.mcs-auth-switch{margin-top:27px;padding-top:18px;border-top:1px solid #dfe0e7;display:grid;gap:4px;max-width:450px}.mcs-auth-switch b{color:#555768;font-size:10px}.mcs-auth-switch a{color:var(--blue);font-size:10px;font-weight:900}
    .mcs-auth-page .mc-auth13{border-color:#dedfe8;border-radius:16px;box-shadow:0 18px 50px rgba(51,56,115,.09);color:#2b2d42}.mcs-auth-page .mc-auth13-role>span{border-radius:50%;background:#f0edff;color:var(--blue)}.mcs-auth-page .mc-auth13.provider .mc-auth13-role>span{background:var(--yellow);color:var(--blue-dark)}.mcs-auth-page .mc-auth13-role small,.mcs-auth-page .mc-auth13-role p{color:#858797}.mcs-auth-page .mc-auth13-role b{color:var(--blue)}.mcs-auth-page .mc-auth13-tabs{background:#f4f4f8}.mcs-auth-page .mc-auth13-tabs button{color:#7a7c8c}.mcs-auth-page .mc-auth13-tabs button.active{color:var(--blue)}.mcs-auth-page .mc-auth13-free{background:#fff7d7}.mcs-auth-page .mc-auth13-free>span{background:var(--yellow);color:var(--blue-dark)}.mcs-auth-page .mc-auth13 label>span{color:#5e6070}.mcs-auth-page .mc-auth13 input,.mcs-auth-page .mc-auth13 select{border-color:#d8d9e3;border-radius:8px;color:#2b2d42}.mcs-auth-page .mc-auth13 input:focus,.mcs-auth-page .mc-auth13 select:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(51,56,115,.08)}.mcs-auth-page .mc-auth13-submit,.mcs-auth-page .mc-auth13-next{border-radius:8px;background:var(--yellow);color:var(--blue-dark);box-shadow:none}.mcs-auth-page .mc-auth13-submit:hover,.mcs-auth-page .mc-auth13-next:hover{background:#f1c231}.mcs-auth-page .mc-auth13-progress span.on,.mcs-auth-page .mc-password-meter i.on{background:var(--blue)}.mcs-auth-page .mc-auth13-security{background:#f5f5fa;border-color:#e2e2ea}.mcs-auth-page .mc-auth13-security>span{color:var(--blue)}.mcs-auth-page .mc-auth13 a,.mcs-auth-page .mc-auth13-bottom button,.mcs-auth-page .mc-auth13-forgot{color:var(--blue)}
    @media(max-width:850px){.mcs-auth-shell{grid-template-columns:1fr;gap:34px}.mcs-auth-copy>a{margin-bottom:30px}.mcs-auth-page{padding-top:30px}}@media(max-width:520px){.mcs-auth-page{padding-left:14px;padding-right:14px}.mcs-auth-copy h1{font-size:42px}}
  `}</style></main>;
}

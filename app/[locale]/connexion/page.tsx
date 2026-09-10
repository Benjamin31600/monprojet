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
  return <main className="mc-auth-page"><section className="mc-auth-shell"><div className="mc-auth-copy"><Link href={`/${locale}`}>← {fr ? "Retour à MyCoco" : "Back to MyCoco"}</Link><span>{fr ? "ACCÈS SÉCURISÉ MYCOCO" : "SECURE MYCOCO ACCESS"}</span><h1>{audience === "family" ? (fr ? "Votre famille a son espace. Privé par défaut." : "Your family has its own space. Private by default.") : (fr ? "Votre service a son espace professionnel." : "Your service has its own professional space.")}</h1><p>{audience === "family" ? (fr ? "Retrouvez vos recherches, favoris et alertes sans exposer vos informations personnelles dans l'annuaire." : "Keep searches, favourites and alerts without exposing personal information in the directory.") : (fr ? "Gérez votre fiche publique séparément de vos informations de compte, de vos messages et de vos demandes." : "Manage your public listing separately from account information, messages and requests.")}</p><div className="mc-auth-switch"><b>{fr ? "Changer d'espace" : "Switch space"}</b><Link href={`/${locale}/connexion?role=${audience === "family" ? "provider" : "family"}`}>{audience === "family" ? (fr ? "Je suis un service de garde" : "I'm a provider") : (fr ? "Je suis une famille" : "I'm a family")} →</Link></div></div><AuthPortal locale={locale} audience={audience} mode="signin" /></section><style>{`.mc-auth-page{min-height:calc(100vh - 74px);background:linear-gradient(135deg,#f8f2e8 0%,#f4f6f3 58%,#edf4f0 100%);color:#2d2925;padding:55px 20px 80px}.mc-auth-shell{width:min(1080px,100%);margin:auto;display:grid;grid-template-columns:minmax(0,1fr) 430px;gap:75px;align-items:center}.mc-auth-copy>a{display:inline-flex;margin-bottom:58px;color:#5e665f;font-size:11px;font-weight:850}.mc-auth-copy>span{font-size:10px;font-weight:950;letter-spacing:.15em;color:#9a6247}.mc-auth-copy h1{max-width:650px;font-size:clamp(44px,6vw,72px);line-height:.96;letter-spacing:-.068em;margin:16px 0 20px}.mc-auth-copy>p{max-width:590px;color:#716b65;font-size:16px;line-height:1.65}.mc-auth-switch{margin-top:28px;padding-top:20px;border-top:1px solid #ddd5cb;display:grid;gap:5px;max-width:450px}.mc-auth-switch b{font-size:11px}.mc-auth-switch a{font-size:11px;font-weight:900;color:#1e5748}@media(max-width:850px){.mc-auth-shell{grid-template-columns:1fr;gap:35px}.mc-auth-copy>a{margin-bottom:32px}.mc-auth-page{padding-top:30px}}`}</style></main>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import FunnelTracker from "@/components/FunnelTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import "../mycoco-launch.css";

export function generateStaticParams(){return locales.map(locale=>({locale}));}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const{locale:raw}=await params;if(!isLocale(raw))return{};const locale=raw as Locale;const fr=locale==="fr";const verification=process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const title=fr?"MyCoco | Trouver la bonne garde au Québec":"MyCoco | Find the right childcare in Quebec";
  const description=fr?"Recherche, matching, annuaire local et espaces famille/service : MyCoco simplifie la recherche de garde au Québec.":"Search, matching, local directory and family/provider spaces: MyCoco simplifies childcare discovery in Quebec.";
  return{title:{default:title,template:"%s | MyCoco"},description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",alternateLocale:fr?["en_CA"]:["fr_CA"],siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true},verification:verification?{google:verification}:undefined};
}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const{locale:raw}=await params;if(!isLocale(raw))notFound();const locale=raw as Locale;const fr=locale==="fr";const other=fr?"en":"fr";const d=getDictionary(locale);
  return <>
    <FunnelTracker/><GoogleAnalytics/><CookieConsent locale={locale}/>
    <a className="skip-link" href="#main-content">{fr?"Aller au contenu principal":"Skip to main content"}</a>
    <div className="mc-rolebar"><div className="mc-rolebar-inner"><Link href={`/${locale}/mon-besoin`}><span>●</span><b>{fr?"VOUS ÊTES UNE FAMILLE ?":"ARE YOU A FAMILY?"}</b>{fr?"Trouver une garde":"Find childcare"} →</Link><Link href={`/${locale}/pour-les-services`}><span>●</span><b>{fr?"VOUS ÊTES UN SERVICE ?":"ARE YOU A PROVIDER?"}</b>{fr?"Créer votre espace":"Create your space"} →</Link></div></div>
    <header className="mc-launch-nav"><div className="mc-launch-nav-inner">
      <Link className="mc-wordmark" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mc-logo-dot">c</span><span>my<strong>coco</strong></span></Link>
      <nav className="mc-mainlinks" aria-label={fr?"Navigation principale":"Main navigation"}><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver une garde":"Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr?"Annuaire":"Directory"}</Link><Link href={`/${locale}/pour-les-services`}>{fr?"Pour les services":"For providers"}</Link><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link></nav>
      <div className="mc-navactions"><Link href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}</Link><Link className="mc-nav-lang" href={`/${other}`}>{other.toUpperCase()}</Link><Link className="mc-nav-cta" href={`/${locale}/mon-besoin`}>{fr?"Commencer":"Start"} →</Link></div>
      <details className="mc-mobile-nav"><summary aria-label={fr?"Ouvrir le menu":"Open menu"}><i/><i/><i/></summary><div className="mc-mobile-panel"><Link className="family" href={`/${locale}/mon-besoin`}><div><small>{fr?"JE SUIS UNE FAMILLE":"I’M A FAMILY"}</small><strong>{fr?"Trouver une garde":"Find childcare"}</strong></div><b>→</b></Link><Link className="provider" href={`/${locale}/pour-les-services`}><div><small>{fr?"JE SUIS UN SERVICE":"I’M A PROVIDER"}</small><strong>{fr?"Créer ou gérer mon espace":"Create or manage my space"}</strong></div><b>→</b></Link><Link href={`/${locale}/garderies`}>{fr?"Annuaire":"Directory"}<b>→</b></Link><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}<b>→</b></Link><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}<b>→</b></Link><Link href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}<b>→</b></Link><Link href={`/${other}`}>{other.toUpperCase()}<b>→</b></Link></div></details>
    </div></header>
    <div id="main-content">{children}</div>
    <footer className="mc-launch-footer"><div className="mc-footer-main"><div className="mc-footer-brand"><Link className="mc-wordmark" href={`/${locale}`}><span className="mc-logo-dot">c</span><span>my<strong>coco</strong></span></Link><p>{fr?"La garde qui s’adapte à votre famille — puis, progressivement, l’écosystème utile autour de l’enfant.":"Childcare that fits your family — then, progressively, the useful ecosystem around your child."}</p></div><div className="mc-footer-cols"><div><strong>{fr?"Familles":"Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver une garde":"Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr?"Parcourir l’annuaire":"Browse directory"}</Link><Link href={`/${locale}/inscription?role=family`}>{fr?"Créer mon espace famille":"Create family space"}</Link></div><div><strong>{fr?"Services de garde":"Providers"}</strong><Link href={`/${locale}/pour-les-services`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link><Link href={`/${locale}/inscription?role=provider`}>{fr?"Créer mon espace service":"Create provider space"}</Link><Link href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}</Link></div><div><strong>MyCoco</strong><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div></div></div><div className="mc-footer-bottom"><span>© 2026 MyCoco</span><span>{fr?"Québec · Familles · Services de garde":"Quebec · Families · Childcare"}</span></div></footer>
  </>;
}

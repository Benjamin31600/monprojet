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
  const description=fr?"Recherchez, comparez et organisez votre recherche de garderie, CPE ou milieu familial au Québec.":"Search, compare and organize your daycare, CPE or home childcare search in Quebec.";
  return{title:{default:title,template:"%s | MyCoco"},description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",alternateLocale:fr?["en_CA"]:["fr_CA"],siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true},verification:verification?{google:verification}:undefined};
}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const{locale:raw}=await params;if(!isLocale(raw))notFound();const locale=raw as Locale;const fr=locale==="fr";const other=fr?"en":"fr";const d=getDictionary(locale);
  return <>
    <FunnelTracker/><GoogleAnalytics/><CookieConsent locale={locale}/>
    <a className="skip-link" href="#main-content">{fr?"Aller au contenu principal":"Skip to main content"}</a>

    <header className="mcs-global-header"><div className="mcs-global-inner">
      <Link className="mcs-brand" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mcs-brand-mark">m</span><span>my<strong>coco</strong></span></Link>
      <nav className="mcs-global-nav" aria-label={fr?"Navigation principale":"Main navigation"}>
        <Link href={`/${locale}/mon-besoin`}>{fr?"Trouver une garde":"Find childcare"}</Link>
        <Link href={`/${locale}/garderies`}>{fr?"Services de garde":"Childcare providers"}</Link>
        <Link href={`/${locale}/pour-les-services`}>{fr?"Je gère un service de garde":"I run a childcare service"}</Link>
        <Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link>
        <Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link>
      </nav>
      <div className="mcs-global-actions">
        <Link className="mcs-login" href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}</Link>
        <Link className="mcs-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
        <Link className="mcs-signup" href={`/${locale}/inscription`}>{fr?"S’inscrire":"Sign up"}</Link>
      </div>
      <details className="mcs-mobile-menu"><summary aria-label={fr?"Ouvrir le menu":"Open menu"}><i/><i/><i/></summary><div>
        <small>{fr?"FAMILLES":"FAMILIES"}</small>
        <Link href={`/${locale}/mon-besoin`}>{fr?"Trouver une garde":"Find childcare"}<b>→</b></Link>
        <Link href={`/${locale}/garderies`}>{fr?"Parcourir les services":"Browse providers"}<b>→</b></Link>
        <small>{fr?"SERVICES DE GARDE":"CHILDCARE PROVIDERS"}</small>
        <Link href={`/${locale}/pour-les-services`}>{fr?"Présenter mon service":"Present my service"}<b>→</b></Link>
        <Link href={`/${locale}/inscription?role=provider`}>{fr?"Créer mon espace service":"Create provider space"}<b>→</b></Link>
        <small>MYCOCO</small>
        <Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}<b>→</b></Link>
        <Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}<b>→</b></Link>
        <Link href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}<b>→</b></Link>
        <Link href={`/${other}`}>{other.toUpperCase()}<b>→</b></Link>
      </div></details>
    </div></header>

    <div id="main-content">{children}</div>

    <footer className="mcs-global-footer"><div className="mcs-footer-inner">
      <div className="mcs-footer-brand"><Link className="mcs-brand" href={`/${locale}`}><span className="mcs-brand-mark">m</span><span>my<strong>coco</strong></span></Link><p>{fr?"Trouver, comparer et organiser les solutions utiles autour de votre enfant.":"Find, compare and organize useful solutions around your child."}</p></div>
      <div className="mcs-footer-cols">
        <div><strong>{fr?"Familles":"Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver une garde":"Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr?"Services de garde":"Childcare providers"}</Link><Link href={`/${locale}/inscription?role=family`}>{fr?"Créer mon espace famille":"Create family space"}</Link></div>
        <div><strong>{fr?"Services de garde":"Providers"}</strong><Link href={`/${locale}/pour-les-services`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link><Link href={`/${locale}/inscription?role=provider`}>{fr?"Créer mon espace service":"Create provider space"}</Link><Link href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}</Link></div>
        <div><strong>MyCoco</strong><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
      </div>
    </div><div className="mcs-footer-bottom"><span>© 2026 MyCoco</span><span>{fr?"Québec · Familles · Services de garde":"Quebec · Families · Childcare"}</span></div></footer>

    <style>{`
      .mcs-global-header{position:sticky;top:0;z-index:120;background:rgba(255,255,255,.97);border-bottom:1px solid #e4e5ed;backdrop-filter:blur(16px)}.mcs-global-inner{width:min(1240px,calc(100% - 36px));height:72px;margin:auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:28px}.mcs-brand{display:inline-flex;align-items:center;gap:9px;color:#333873;font-size:23px;font-weight:900;letter-spacing:-.055em}.mcs-brand strong{color:#333873}.mcs-brand-mark{display:grid;place-items:center;width:31px;height:31px;border-radius:50%;background:#ffd44f;color:#333873;font-size:14px;font-weight:900}.mcs-global-nav{display:flex;align-items:center;justify-content:center;gap:22px}.mcs-global-nav a{color:#5d6072;font-size:11px;font-weight:800;white-space:nowrap}.mcs-global-nav a:hover{color:#333873}.mcs-global-actions{display:flex;align-items:center;gap:9px}.mcs-global-actions a{font-size:11px;font-weight:850}.mcs-login{color:#333873}.mcs-lang{display:grid!important;place-items:center;width:35px;height:35px;border:1px solid #dfe0e9;border-radius:50%;color:#5d6072}.mcs-signup{display:inline-flex;align-items:center;min-height:40px;padding:0 15px;border-radius:9px;background:#333873;color:#fff}.mcs-signup:hover{background:#242954}.mcs-mobile-menu{display:none;position:relative}.mcs-mobile-menu summary{list-style:none;width:42px;height:42px;border:1px solid #dfe0e9;border-radius:10px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mcs-mobile-menu summary::-webkit-details-marker{display:none}.mcs-mobile-menu summary i{display:block;width:18px;height:1.5px;background:#333873}.mcs-mobile-menu>div{position:absolute;right:0;top:51px;width:min(355px,calc(100vw - 28px));padding:10px;background:#fff;border:1px solid #e1e2e9;border-radius:14px;box-shadow:0 18px 50px rgba(51,56,115,.14)}.mcs-mobile-menu small{display:block;padding:12px 12px 6px;color:#999aaa;font-size:8px;font-weight:900;letter-spacing:.1em}.mcs-mobile-menu a{display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:8px;color:#333873;font-size:12px;font-weight:800}.mcs-mobile-menu a:hover{background:#f7f7fb}.mcs-global-footer{padding:54px 0 0;background:#242954;color:#fff}.mcs-footer-inner{width:min(1160px,calc(100% - 40px));margin:auto;display:grid;grid-template-columns:1fr 1.35fr;gap:70px;padding-bottom:42px}.mcs-footer-brand p{max-width:340px;color:#cfd1e3;font-size:12px;line-height:1.6}.mcs-global-footer .mcs-brand{color:#fff}.mcs-global-footer .mcs-brand strong{color:#fff}.mcs-footer-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:30px}.mcs-footer-cols div{display:grid;align-content:start;gap:9px}.mcs-footer-cols strong{margin-bottom:6px;color:#fff;font-size:11px}.mcs-footer-cols a{color:#cfd1e3;font-size:10px}.mcs-footer-cols a:hover{color:#fff}.mcs-footer-bottom{border-top:1px solid rgba(255,255,255,.12);min-height:54px;display:flex;justify-content:space-between;align-items:center;width:min(1160px,calc(100% - 40px));margin:auto;color:#aeb2cc;font-size:9px}
      @media(max-width:1050px){.mcs-global-nav{display:none}.mcs-mobile-menu{display:block}.mcs-global-inner{grid-template-columns:auto 1fr auto}.mcs-global-actions{justify-self:end}.mcs-global-actions .mcs-login,.mcs-global-actions .mcs-lang{display:none}}
      @media(max-width:700px){.mcs-global-inner{width:min(100% - 28px,1240px);height:66px}.mcs-signup{display:none}.mcs-footer-inner{grid-template-columns:1fr;gap:35px}.mcs-footer-cols{grid-template-columns:1fr 1fr}.mcs-footer-bottom{width:min(100% - 28px,1160px);flex-direction:column;justify-content:center;gap:4px}.mcs-global-footer{padding-top:42px}}
    `}</style>
  </>;
}

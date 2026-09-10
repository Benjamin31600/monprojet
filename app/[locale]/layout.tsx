import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import FunnelTracker from "@/components/FunnelTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import PolishStyles from "@/components/PolishStyles";

export function generateStaticParams(){return locales.map(locale=>({locale}));}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const{locale:raw}=await params;
  if(!isLocale(raw))return{};
  const locale=raw as Locale;
  const fr=locale==='fr';
  const title=fr?"MyCoco | Trouver la bonne solution de garde":"MyCoco | Find the right childcare solution";
  const description=fr?"Découvrez, comparez et organisez votre recherche de garde au Québec avec MyCoco.":"Discover, compare and organize your childcare search in Quebec with MyCoco.";
  const verification=process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return{title:{default:title,template:`%s | MyCoco`},description,alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}},openGraph:{locale:fr?"fr_CA":"en_CA",siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true},verification:verification?{google:verification}:undefined};
}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const{locale:raw}=await params;
  if(!isLocale(raw))notFound();
  const locale=raw as Locale;
  const fr=locale==='fr';
  const other=fr?'en':'fr';
  const d=getDictionary(locale);

  return <>
    <FunnelTracker/><GoogleAnalytics/><PolishStyles/><CookieConsent locale={locale}/>
    <a className="skip-link" href="#main-content">{fr?"Aller au contenu principal":"Skip to main content"}</a>

    <header className="mc-header-9">
      <div className="mc-header-wrap">
        <Link className="mc-brand-9" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mc-brand-icon">m</span><span>my<b>coco</b></span></Link>

        <nav className="mc-header-main" aria-label={fr?"Navigation principale":"Main navigation"}>
          <Link className="mc-audience mc-audience-family" href={`/${locale}/mon-besoin`}><small>{fr?"JE SUIS UNE":"I AM A"}</small><strong>{fr?"Famille":"Family"}</strong></Link>
          <Link className="mc-audience mc-audience-provider" href={`/${locale}/pour-les-services`}><small>{fr?"JE SUIS UN":"I AM A"}</small><strong>{fr?"Service de garde":"Childcare provider"}</strong></Link>
          <span className="mc-nav-divider"/>
          <Link href={`/${locale}/garderies`}>{fr?"Explorer les services":"Browse providers"}</Link>
          <Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link>
          <Link className="mc-header-login" href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}</Link>
          <Link className="mc-header-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
          <Link className="mc-header-cta" href={`/${locale}/mon-besoin`}>{fr?"Trouver ma garde":"Find childcare"}<span>→</span></Link>
        </nav>

        <details className="mc-mobile-9">
          <summary aria-label={fr?"Ouvrir le menu":"Open menu"}><i/><i/><i/></summary>
          <div>
            <span>{fr?"VOUS ÊTES":"YOU ARE"}</span>
            <Link className="family" href={`/${locale}/mon-besoin`}><div><small>{fr?"Famille":"Family"}</small><strong>{fr?"Trouver une solution de garde":"Find childcare"}</strong></div><b>→</b></Link>
            <Link className="provider" href={`/${locale}/pour-les-services`}><div><small>{fr?"Service de garde":"Childcare provider"}</small><strong>{fr?"Présenter mon service sur MyCoco":"Present my service on MyCoco"}</strong></div><b>→</b></Link>
            <span>{fr?"MYCOCO":"MYCOCO"}</span>
            <Link href={`/${locale}/garderies`}>{fr?"Explorer les services":"Browse providers"}</Link>
            <Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link>
            <Link href={`/${locale}/connexion`}>{fr?"Se connecter":"Sign in"}</Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>
        </details>
      </div>
    </header>

    <main id="main-content">{children}</main>

    <footer className="mc-footer-9"><div className="mc-footer-wrap">
      <div className="mc-footer-intro"><Link className="mc-footer-brand" href={`/${locale}`}>my<span>coco</span></Link><p>{fr?"La garde qui s’adapte à votre famille.":"Childcare that fits your family."}</p><small>{d.footer.trust}</small></div>
      <div className="mc-footer-cols">
        <div><strong>{fr?"Pour les familles":"For families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver ma garde":"Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr?"Explorer les services":"Browse providers"}</Link><Link href={`/${locale}/inscription?role=family`}>{fr?"Créer mon espace famille":"Create family space"}</Link></div>
        <div><strong>{fr?"Pour les services":"For providers"}</strong><Link href={`/${locale}/pour-les-services`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link><Link href={`/${locale}/inscription?role=provider`}>{fr?"Créer mon espace service":"Create provider space"}</Link><Link href={`/${locale}/espace-service`}>{fr?"Accéder à mon espace":"Open my space"}</Link></div>
        <div><strong>MyCoco</strong><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
      </div>
    </div></footer>

    <style>{`
      .skip-link{position:absolute;left:-9999px}.mc-header-9{position:sticky;top:0;z-index:120;background:rgba(250,247,240,.96);backdrop-filter:blur(20px);border-bottom:1px solid #dde4df}.mc-header-wrap{width:min(1260px,calc(100% - 36px));height:78px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:24px}.mc-brand-9{display:inline-flex;align-items:center;gap:9px;color:#162c25;font-size:22px;font-weight:950;letter-spacing:-.065em;flex:0 0 auto}.mc-brand-9 b,.mc-footer-brand span{color:#d96f52}.mc-brand-icon{display:grid;place-items:center;width:32px;height:32px;border-radius:11px 11px 11px 4px;background:#162c25;color:#fff;font-size:13px}.mc-header-main{display:flex;align-items:center;gap:17px;color:#52635b;font-size:10px;font-weight:850}.mc-header-main>a{white-space:nowrap}.mc-header-main>a:not(.mc-audience):hover{color:#162c25}.mc-audience{display:flex!important;flex-direction:column;justify-content:center;min-height:46px;padding:0 12px;border-radius:12px;line-height:1}.mc-audience small{font-size:6px;letter-spacing:.12em;margin-bottom:4px;opacity:.68}.mc-audience strong{font-size:10px}.mc-audience-family{background:#e9f2ed;color:#173d31}.mc-audience-provider{background:#fae9e2;color:#8c4938}.mc-nav-divider{width:1px;height:30px;background:#d7dfda}.mc-header-login{color:#162c25}.mc-header-lang{padding:7px 8px;border:1px solid #d4ded8;border-radius:999px}.mc-header-cta{display:inline-flex;align-items:center;gap:9px;padding:13px 15px;border-radius:11px;background:#162c25;color:#fff!important;box-shadow:0 8px 20px rgba(22,44,37,.14)}.mc-header-cta:hover{background:#0c211b}.mc-mobile-9{display:none}.mc-footer-9{background:#0c211b;color:#fff;padding:56px 0}.mc-footer-wrap{width:min(1180px,calc(100% - 40px));margin:auto;display:grid;grid-template-columns:1fr 1.5fr;gap:70px}.mc-footer-brand{font-size:23px;font-weight:950;letter-spacing:-.06em}.mc-footer-intro p{color:#d5e1dc;font-size:12px;margin:10px 0 4px}.mc-footer-intro small{color:#839b91;font-size:9px}.mc-footer-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:36px}.mc-footer-cols>div{display:grid;align-content:start;gap:9px}.mc-footer-cols strong{font-size:9px;letter-spacing:.08em;margin-bottom:4px}.mc-footer-cols a{color:#b9cbc3;font-size:9px}.mc-footer-cols a:hover{color:#fff}@media(max-width:1120px){.mc-header-main{display:none}.mc-mobile-9{display:block;position:relative}.mc-mobile-9 summary{list-style:none;width:43px;height:43px;border:1px solid #d6dfda;border-radius:12px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-9 summary::-webkit-details-marker{display:none}.mc-mobile-9 summary i{display:block;width:17px;height:1.5px;background:#162c25}.mc-mobile-9>div{position:absolute;right:0;top:53px;width:min(360px,calc(100vw - 28px));max-height:78vh;overflow:auto;padding:10px;background:#fff;border:1px solid #dce4df;border-radius:18px;box-shadow:0 26px 65px rgba(22,44,37,.16)}.mc-mobile-9>div>span{display:block;padding:10px 11px 6px;color:#8b9a93;font-size:7px;font-weight:950;letter-spacing:.14em}.mc-mobile-9 a{display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:11px;color:#162c25;font-size:11px;font-weight:850}.mc-mobile-9 a.family{background:#edf5f0;margin-bottom:6px}.mc-mobile-9 a.provider{background:#fbece6}.mc-mobile-9 a small,.mc-mobile-9 a strong{display:block}.mc-mobile-9 a small{font-size:8px;color:#718078;margin-bottom:4px}.mc-mobile-9 a strong{font-size:11px}.mc-header-wrap{height:68px;width:calc(100% - 28px)}.mc-footer-wrap{grid-template-columns:1fr;gap:38px}}@media(max-width:650px){.mc-footer-wrap{width:calc(100% - 28px)}.mc-footer-cols{grid-template-columns:1fr;gap:26px}.mc-brand-9{font-size:20px}}
    `}</style>
  </>;
}

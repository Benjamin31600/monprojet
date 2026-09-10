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

    <header className="mc-header-v10">
      <div className="mc-audience-bar">
        <div className="mc-audience-wrap">
          <span>{fr?"Vous êtes :":"You are:"}</span>
          <Link className="mc-role-link mc-role-family" href={`/${locale}/mon-besoin`}><b>{fr?"Une famille":"A family"}</b><small>{fr?"Je cherche une solution de garde":"I’m looking for childcare"}</small></Link>
          <Link className="mc-role-link mc-role-provider" href={`/${locale}/pour-les-services`}><b>{fr?"Un service de garde":"A childcare provider"}</b><small>{fr?"Je veux présenter mon service":"I want to list my service"}</small></Link>
        </div>
      </div>

      <div className="mc-main-header">
        <div className="mc-header-wrap-v10">
          <Link className="mc-brand-v10" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mc-brand-symbol">m</span><span>my<b>coco</b></span></Link>

          <nav className="mc-nav-v10" aria-label={fr?"Navigation principale":"Main navigation"}>
            <Link href={`/${locale}/garderies`}>{fr?"Explorer les services":"Browse childcare"}</Link>
            <Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link>
          </nav>

          <div className="mc-actions-v10">
            <Link className="mc-signin-v10" href={`/${locale}/connexion`}>{fr?"Connexion":"Sign in"}</Link>
            <Link className="mc-lang-v10" href={`/${other}`}>{other.toUpperCase()}</Link>
            <Link className="mc-primary-v10" href={`/${locale}/mon-besoin`}><span>{fr?"Trouver ma garde":"Find childcare"}</span><b>→</b></Link>
          </div>

          <details className="mc-mobile-v10">
            <summary aria-label={fr?"Ouvrir le menu":"Open menu"}><i/><i/><i/></summary>
            <div className="mc-mobile-panel">
              <div className="mc-mobile-heading">{fr?"Je suis…":"I am…"}</div>
              <Link className="mc-mobile-role family" href={`/${locale}/mon-besoin`}><div><strong>{fr?"Une famille":"A family"}</strong><small>{fr?"Trouver une solution adaptée":"Find the right childcare"}</small></div><b>→</b></Link>
              <Link className="mc-mobile-role provider" href={`/${locale}/pour-les-services`}><div><strong>{fr?"Un service de garde":"A childcare provider"}</strong><small>{fr?"Créer ou compléter ma présence":"Create or complete my listing"}</small></div><b>→</b></Link>
              <div className="mc-mobile-heading">MyCoco</div>
              <Link href={`/${locale}/garderies`}>{fr?"Explorer les services":"Browse childcare"}</Link>
              <Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link>
              <Link href={`/${locale}/a-propos`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link>
              <Link href={`/${locale}/connexion`}>{fr?"Se connecter":"Sign in"}</Link>
              <Link href={`/${other}`}>{other.toUpperCase()}</Link>
            </div>
          </details>
        </div>
      </div>
    </header>

    <main id="main-content">{children}</main>

    <footer className="mc-footer-v10"><div className="mc-footer-wrap-v10">
      <div className="mc-footer-intro-v10"><Link className="mc-footer-brand" href={`/${locale}`}>my<span>coco</span></Link><p>{fr?"La garde qui s’adapte à votre famille.":"Childcare that fits your family."}</p><small>{d.footer.trust}</small></div>
      <div className="mc-footer-cols-v10">
        <div><strong>{fr?"Familles":"Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver ma garde":"Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr?"Explorer les services":"Browse providers"}</Link><Link href={`/${locale}/inscription?role=family`}>{fr?"Créer mon espace famille":"Create family space"}</Link></div>
        <div><strong>{fr?"Services de garde":"Childcare providers"}</strong><Link href={`/${locale}/pour-les-services`}>{fr?"Présenter mon service":"List my service"}</Link><Link href={`/${locale}/inscription?role=provider`}>{fr?"Créer mon espace service":"Create provider space"}</Link><Link href={`/${locale}/espace-service`}>{fr?"Accéder à mon espace":"Open my space"}</Link></div>
        <div><strong>MyCoco</strong><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
      </div>
    </div></footer>

    <style>{`
      .skip-link{position:absolute;left:-9999px}.mc-header-v10{position:sticky;top:0;z-index:120;background:#fff;border-bottom:1px solid #e5e8e5}.mc-audience-bar{background:#142e27;color:#fff}.mc-audience-wrap{width:min(1260px,calc(100% - 36px));min-height:38px;margin:auto;display:flex;align-items:center;gap:8px}.mc-audience-wrap>span{font-size:8px;font-weight:900;letter-spacing:.11em;text-transform:uppercase;color:#a9bbb4;margin-right:3px}.mc-role-link{display:inline-flex;align-items:center;gap:8px;min-height:28px;padding:0 10px;border-radius:8px;color:#dce7e2;transition:background .16s ease,color .16s ease}.mc-role-link b{font-size:9px}.mc-role-link small{font-size:8px;color:#9eb1a9}.mc-role-link:hover{background:rgba(255,255,255,.09);color:#fff}.mc-role-provider{margin-left:2px}.mc-role-provider b{color:#f2ad97}.mc-main-header{background:rgba(252,249,243,.97);backdrop-filter:blur(18px)}.mc-header-wrap-v10{width:min(1260px,calc(100% - 36px));height:68px;margin:auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:38px}.mc-brand-v10{display:inline-flex;align-items:center;gap:9px;color:#142e27;font-size:22px;font-weight:950;letter-spacing:-.065em}.mc-brand-v10 b,.mc-footer-brand span{color:#d96f52}.mc-brand-symbol{display:grid;place-items:center;width:31px;height:31px;border-radius:10px 10px 10px 4px;background:#142e27;color:#fff;font-size:13px}.mc-nav-v10{display:flex;align-items:center;justify-content:center;gap:30px}.mc-nav-v10 a{position:relative;color:#4c5e56;font-size:10px;font-weight:850;white-space:nowrap}.mc-nav-v10 a:after{content:"";position:absolute;left:0;right:100%;bottom:-7px;height:2px;background:#d96f52;transition:right .16s ease}.mc-nav-v10 a:hover{color:#142e27}.mc-nav-v10 a:hover:after{right:0}.mc-actions-v10{display:flex;align-items:center;gap:10px}.mc-signin-v10{color:#233d35;font-size:10px;font-weight:850}.mc-lang-v10{display:grid;place-items:center;min-width:32px;height:32px;border:1px solid #d8dfda;border-radius:999px;color:#53665d;font-size:8px;font-weight:900}.mc-primary-v10{display:inline-flex;align-items:center;gap:12px;min-height:42px;padding:0 15px;border-radius:11px;background:#142e27;color:#fff;font-size:10px;font-weight:900;box-shadow:0 8px 22px rgba(20,46,39,.14)}.mc-primary-v10 b{font-size:13px}.mc-primary-v10:hover{background:#0c211b;transform:translateY(-1px)}.mc-mobile-v10{display:none}.mc-footer-v10{background:#0c211b;color:#fff;padding:56px 0}.mc-footer-wrap-v10{width:min(1180px,calc(100% - 40px));margin:auto;display:grid;grid-template-columns:1fr 1.5fr;gap:70px}.mc-footer-brand{font-size:23px;font-weight:950;letter-spacing:-.06em}.mc-footer-intro-v10 p{color:#d5e1dc;font-size:12px;margin:10px 0 4px}.mc-footer-intro-v10 small{color:#839b91;font-size:9px}.mc-footer-cols-v10{display:grid;grid-template-columns:repeat(3,1fr);gap:36px}.mc-footer-cols-v10>div{display:grid;align-content:start;gap:9px}.mc-footer-cols-v10 strong{font-size:9px;letter-spacing:.08em;margin-bottom:4px}.mc-footer-cols-v10 a{color:#b9cbc3;font-size:9px}.mc-footer-cols-v10 a:hover{color:#fff}@media(max-width:1080px){.mc-audience-bar{display:none}.mc-nav-v10,.mc-actions-v10{display:none}.mc-header-wrap-v10{height:66px;width:calc(100% - 28px);display:flex;justify-content:space-between}.mc-mobile-v10{display:block;position:relative}.mc-mobile-v10 summary{list-style:none;width:43px;height:43px;border:1px solid #d6dfda;border-radius:12px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-v10 summary::-webkit-details-marker{display:none}.mc-mobile-v10 summary i{display:block;width:17px;height:1.5px;background:#142e27}.mc-mobile-panel{position:absolute;right:0;top:53px;width:min(370px,calc(100vw - 28px));max-height:80vh;overflow:auto;padding:10px;background:#fff;border:1px solid #dce4df;border-radius:18px;box-shadow:0 26px 65px rgba(22,44,37,.17)}.mc-mobile-heading{padding:10px 11px 6px;color:#8b9a93;font-size:7px;font-weight:950;letter-spacing:.14em;text-transform:uppercase}.mc-mobile-panel>a:not(.mc-mobile-role){display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:11px;color:#142e27;font-size:11px;font-weight:850}.mc-mobile-role{display:flex;align-items:center;justify-content:space-between;padding:14px;border-radius:13px;margin-bottom:7px;color:#142e27}.mc-mobile-role strong,.mc-mobile-role small{display:block}.mc-mobile-role strong{font-size:12px}.mc-mobile-role small{font-size:9px;margin-top:3px;color:#63756d}.mc-mobile-role.family{background:#edf5f0}.mc-mobile-role.provider{background:#fbece6}.mc-footer-wrap-v10{grid-template-columns:1fr;gap:38px}}@media(max-width:650px){.mc-footer-wrap-v10{width:calc(100% - 28px)}.mc-footer-cols-v10{grid-template-columns:1fr;gap:26px}.mc-brand-v10{font-size:20px}}
    `}</style>
  </>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import FunnelTracker from "@/components/FunnelTracker";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const fr = locale === "fr";
  const title = fr ? "MyCoco | Trouver la bonne solution de garde" : "MyCoco | Find the right childcare solution";
  const description = fr ? "MyCoco aide les familles à trouver, comparer et suivre les solutions de garde qui correspondent vraiment à leur quotidien." : "MyCoco helps families find, compare and follow childcare options that truly fit their everyday life.";
  return { title:{default:title,template:`%s | MyCoco`}, description, alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}}, openGraph:{locale:fr?"fr_CA":"en_CA",siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true} };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const other = fr ? "en" : "fr";
  const d = getDictionary(locale);
  return <>
    <FunnelTracker />
    <style>{`:root{--ink:#191b2e;--ink-2:#55586b;--muted:#77798a;--cream:#fff9f3;--surface:#fff;--sage:#f0edf8;--sage-2:#e2ddf1;--green:#5c4bc4;--green-dark:#4636a5;--coral:#ef6b5b;--coral-dark:#d95648;--blue:#ebe8f8;--line:#e7e2eb;--line-strong:#d7d1df;--shadow:0 24px 70px rgba(25,27,46,.11);--shadow-soft:0 10px 32px rgba(25,27,46,.08)}body{background:#fff9f3;color:#191b2e}.mc-global-header{background:rgba(255,249,243,.9)!important;border-color:rgba(25,27,46,.09)!important}.mc-brand-mark{background:#ef6b5b!important}.mc-global-brand span span{color:#5c4bc4!important}.mc-global-nav a{color:#55586b!important}.mc-global-nav a:hover{color:#5c4bc4!important}.mc-header-action{background:#191b2e!important}.mc-global-footer{background:#191b2e!important}`}</style>
    <a className="skip-link" href="#main-content">{fr ? "Aller au contenu principal" : "Skip to main content"}</a>
    <header className="mc-global-header mc-v3-header">
      <div className="mc-global-inner">
        <Link className="mc-global-brand" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mc-brand-mark">m</span><span>my<span>coco</span></span></Link>
        <nav className="mc-global-nav" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          <div className="mc-audience-nav"><span className="mc-audience-label">{fr ? "JE SUIS" : "I AM"}</span><Link href={`/${locale}/mon-besoin`}>{fr ? "Une famille" : "A family"}</Link><Link href={`/${locale}/pour-les-services`}>{fr ? "Un service" : "A provider"}</Link></div>
          <Link href={`/${locale}/garderies`}>{fr ? "Explorer" : "Explore"}</Link>
          <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
          <Link className="mc-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
          <Link className="mc-header-action" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"}<span>→</span></Link>
        </nav>
        <details className="mc-mobile-nav"><summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><i></i><i></i><i></i></summary><div><span>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span><Link className="mc-mobile-primary" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"}<span>→</span></Link><Link href={`/${locale}/garderies`}>{fr ? "Explorer les services" : "Explore providers"}</Link><span>{fr ? "POUR LES SERVICES" : "FOR PROVIDERS"}</span><Link href={`/${locale}/pour-les-services`}>{fr ? "Créer mon espace service" : "Create provider space"}</Link><span>MYCOCO</span><Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About MyCoco"}</Link><Link href={`/${other}`}>{other.toUpperCase()}</Link></div></details>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="mc-global-footer"><div className="mc-footer-inner"><div><Link className="mc-footer-brand" href={`/${locale}`}>my<span>coco</span></Link><p>{fr ? "La garde qui s'adapte à votre famille." : "Childcare that fits your family."}</p><small>{d.footer.trust}</small></div><div className="mc-footer-columns"><div><strong>{fr?"Familles":"Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver ma solution":"Find my solution"}</Link><Link href={`/${locale}/garderies`}>{fr?"Explorer":"Explore"}</Link></div><div><strong>{fr?"Services":"Providers"}</strong><Link href={`/${locale}/pour-les-services`}>{fr?"Créer mon espace":"Create my space"}</Link><Link href={`/${locale}/pour-les-services`}>{fr?"Pourquoi MyCoco":"Why MyCoco"}</Link></div><div><strong>MyCoco</strong><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div></div></div></footer>
    <style>{`.mc-v3-header .mc-global-inner{min-height:76px}.mc-v3-header .mc-global-nav{gap:18px}.mc-audience-nav{display:flex;align-items:center;gap:5px;padding:4px 5px;border:1px solid #ded9e5;border-radius:12px;background:#fff}.mc-audience-label{padding:0 5px;color:#898b9a;font-size:9px;font-weight:900;letter-spacing:.1em}.mc-audience-nav a{padding:8px 9px;border-radius:8px;color:#2d3048!important;font-size:11px!important;font-weight:800}.mc-audience-nav a:first-of-type{background:#f0edf8}.mc-v3-header .mc-global-nav>a:not(.mc-lang):not(.mc-header-action){font-size:11px;font-weight:750;color:#55586b}.mc-v3-header .mc-header-action{padding:11px 15px!important;border-radius:11px!important;background:#191b2e!important;color:#fff!important;font-weight:900!important;box-shadow:0 8px 22px rgba(25,27,46,.14)}.mc-mobile-nav{display:none}@media(max-width:980px){.mc-v3-header .mc-global-nav{display:none}.mc-mobile-nav{display:block!important}.mc-mobile-nav summary{list-style:none;display:grid;gap:4px;padding:10px}.mc-mobile-nav summary::-webkit-details-marker{display:none}.mc-mobile-nav summary i{display:block;width:22px;height:2px;background:#191b2e;border-radius:9px}.mc-mobile-nav>div{position:absolute;left:12px;right:12px;top:68px;padding:18px;background:#fff;border:1px solid #e7e2eb;border-radius:18px;box-shadow:0 22px 55px rgba(25,27,46,.15);display:grid;gap:8px}.mc-mobile-nav>div>span{margin-top:8px;color:#8b8d9c;font-size:9px;font-weight:900;letter-spacing:.12em}.mc-mobile-nav>div a{padding:11px 10px;border-radius:10px;font-size:12px;font-weight:800}.mc-mobile-nav>div a:hover{background:#f3f0f8}.mc-mobile-primary{background:#191b2e;color:#fff!important}.mc-mobile-primary:hover{background:#191b2e!important}}`}</style>
  </>;
}

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
  const title = fr ? "MyCoco | La garde qui s'adapte à votre famille" : "MyCoco | Childcare that fits your family";
  const description = fr ? "MyCoco aide les familles du Québec à trouver une solution de garde adaptée à leurs besoins, près de chez elles." : "MyCoco helps Quebec families find childcare that fits their needs, close to home.";
  return { title: { default: title, template: `%s | MyCoco` }, description, alternates: { canonical: `/${locale}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } }, openGraph: { locale: fr ? "fr_CA" : "en_CA", alternateLocale: fr ? ["en_CA"] : ["fr_CA"], siteName: site.name, type: "website", title, description, url: `${site.url}/${locale}` }, robots: { index: true, follow: true } };
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
    <a className="skip-link" href="#main-content">{fr ? "Aller au contenu principal" : "Skip to main content"}</a>
    <header className="mc-global-header">
      <div className="mc-global-inner">
        <Link className="mc-global-brand" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mc-brand-mark">m</span><span>my<span>coco</span></span></Link>
        <nav className="mc-global-nav" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          <Link className="mc-nav-active" href={`/${locale}/mon-besoin`}>{fr ? "Trouver une garde" : "Find childcare"}</Link>
          <Link href={`/${locale}/garderies`}>{fr ? "Garderies & CPE" : "Daycares & CPEs"}</Link>
          <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services" : "For providers"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
          <Link className="mc-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
          <Link className="mc-header-action" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"}<span>→</span></Link>
        </nav>
        <details className="mc-mobile-nav">
          <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><i></i><i></i><i></i></summary>
          <div>
            <Link className="mc-mobile-primary" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"}<span>→</span></Link>
            <Link href={`/${locale}/garderies`}>{fr ? "Garderies & CPE" : "Daycares & CPEs"}</Link>
            <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services" : "For providers"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>
        </details>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="mc-global-footer">
      <div className="mc-footer-inner">
        <div><Link className="mc-footer-brand" href={`/${locale}`}>my<span>coco</span></Link><p>{fr ? "La garde qui s'adapte à votre famille." : "Childcare that fits your family."}</p><small>{d.footer.trust}</small></div>
        <div className="mc-footer-links"><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
      </div>
    </footer>
    <style>{`
      .mc-global-header{position:sticky;top:0;z-index:100;background:rgba(252,251,247,.92);border-bottom:1px solid #e2e8e4;backdrop-filter:blur(18px)}.mc-global-inner{width:min(1240px,calc(100% - 40px));height:74px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:28px}.mc-global-brand{display:inline-flex;align-items:center;gap:9px;color:#18352c;font-size:21px;font-weight:950;letter-spacing:-.06em}.mc-global-brand>span:last-child>span,.mc-footer-brand span{color:#6ea48a}.mc-brand-mark{display:grid;place-items:center;width:29px;height:29px;border-radius:10px 10px 10px 4px;background:#183f33;color:#fff;font-size:13px;font-weight:950}.mc-global-nav{display:flex;align-items:center;gap:25px;color:#617069;font-size:12px;font-weight:800}.mc-global-nav a{transition:color .16s ease}.mc-global-nav a:hover{color:#18352c}.mc-nav-active{color:#18352c!important}.mc-lang{padding:7px 9px;border:1px solid #d9e3dd;border-radius:999px}.mc-header-action{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;border-radius:11px;background:#183f33;color:#fff!important;box-shadow:0 8px 20px rgba(24,63,51,.13)}.mc-header-action:hover{background:#102f26}.mc-mobile-nav{display:none}.mc-global-footer{background:#112a24;color:#fff;padding:45px 0}.mc-footer-inner{width:min(1240px,calc(100% - 40px));margin:auto;display:flex;justify-content:space-between;gap:30px}.mc-footer-brand{font-size:20px;font-weight:950;letter-spacing:-.05em}.mc-footer-inner p{margin:9px 0 2px;color:#d5e2dd;font-size:12px}.mc-footer-inner small{color:#91aaa0;font-size:10px}.mc-footer-links{display:flex;align-items:flex-start;gap:20px;color:#bfd0c8;font-size:11px}.mc-footer-links a:hover{color:#fff}@media(max-width:900px){.mc-global-nav{display:none}.mc-mobile-nav{display:block;position:relative}.mc-mobile-nav summary{list-style:none;width:42px;height:42px;border:1px solid #d9e3dd;border-radius:11px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-nav summary::-webkit-details-marker{display:none}.mc-mobile-nav summary i{display:block;width:17px;height:1.5px;background:#18352c}.mc-mobile-nav>div{position:absolute;right:0;top:52px;width:min(320px,calc(100vw - 28px));padding:9px;background:#fff;border:1px solid #dfe7e2;border-radius:16px;box-shadow:0 22px 55px rgba(24,53,44,.15)}.mc-mobile-nav a{display:flex;align-items:center;justify-content:space-between;padding:13px 14px;border-radius:10px;color:#18352c;font-size:13px;font-weight:800}.mc-mobile-nav a:hover{background:#f1f6f2}.mc-mobile-nav .mc-mobile-primary{margin-bottom:5px;background:#183f33;color:#fff}.mc-global-inner{width:min(100% - 28px,1240px);height:68px}.mc-footer-inner{width:min(100% - 28px,1240px);flex-direction:column}.mc-footer-links{padding-top:15px;flex-wrap:wrap}}@media(max-width:600px){.mc-global-brand{font-size:19px}.mc-global-header{position:relative}}
    `}</style>
  </>;
}

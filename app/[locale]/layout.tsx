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
  const title = fr ? "MyCoco | Trouver une solution de garde et de vie familiale au Québec" : "MyCoco | Find childcare and family-care solutions in Quebec";
  const description = fr ? "MyCoco aide les familles du Québec à trouver une solution de garde adaptée à leurs besoins, près de chez elles." : "MyCoco helps families in Quebec find childcare that fits their needs, close to home.";
  return { title: { default: title, template: `%s | MyCoco` }, description, alternates: { canonical: `/${locale}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } }, openGraph: { locale: fr ? "fr_CA" : "en_CA", alternateLocale: fr ? ["en_CA"] : ["fr_CA"], siteName: "MyCoco", type: "website", title, description, url: `${site.url}/${locale}` }, robots: { index: true, follow: true } };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const other = locale === "fr" ? "en" : "fr";
  const fr = locale === "fr";
  return <>
    <FunnelTracker />
    <a className="skip-link" href="#main-content">{fr ? "Aller au contenu principal" : "Skip to main content"}</a>
    <header className="site-header mc-site-header">
      <div className="site-header-inner mc-header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="brand-mark" aria-hidden="true"><i /></span><span className="brand-word">my<span>coco</span></span></Link>
        <nav className="mc-desktop-nav" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          <Link className="mc-nav-primary" href={`/${locale}/mon-besoin`}>{fr ? "Trouver une garde" : "Find childcare"}</Link>
          <Link href={`/${locale}/garderies`}>{fr ? "Garderies & CPE" : "Daycares & CPEs"}</Link>
          <details className="mc-menu">
            <summary>{fr ? "Types de garde" : "Childcare types"}</summary>
            <div className="mc-dropdown">
              <Link href={`/${locale}/cpe`}><strong>CPE</strong><span>{fr ? "Comprendre et trouver un CPE" : "Understand and find a CPE"}</span></Link>
              <Link href={`/${locale}/garderie-subventionnee`}><strong>{fr ? "Garderies subventionnées" : "Subsidized daycares"}</strong><span>{fr ? "Voir les options subventionnées" : "Explore subsidized options"}</span></Link>
              <Link href={`/${locale}/garderies?type=milieu-familial`}><strong>{fr ? "Milieux familiaux" : "Home childcare"}</strong><span>{fr ? "Explorer les services en milieu familial" : "Explore home childcare"}</span></Link>
            </div>
          </details>
          <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services" : "For providers"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
          <Link className="language-switch" href={`/${other}`} aria-label={fr ? "Passer à l’anglais" : "Switch to French"}>{other.toUpperCase()}</Link>
          <Link className="header-cta" href={`/${locale}/mon-besoin`}>{fr ? "Décrire mon besoin" : "Describe my need"}<span aria-hidden="true">→</span></Link>
        </nav>
        <details className="mc-mobile-menu">
          <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><span></span><span></span><span></span></summary>
          <div className="mc-mobile-panel">
            <Link className="mc-mobile-cta" href={`/${locale}/mon-besoin`}>{fr ? "Trouver une garde" : "Find childcare"} <span>→</span></Link>
            <Link href={`/${locale}/garderies`}>{fr ? "Garderies & CPE" : "Daycares & CPEs"}</Link>
            <Link href={`/${locale}/cpe`}>CPE</Link>
            <Link href={`/${locale}/garderie-subventionnee`}>{fr ? "Garderies subventionnées" : "Subsidized daycares"}</Link>
            <Link href={`/${locale}/garderies?type=milieu-familial`}>{fr ? "Milieux familiaux" : "Home childcare"}</Link>
            <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services" : "For providers"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>
        </details>
      </div>
      <div className="mc-launchbar" role="region" aria-label={fr ? "Commencer une recherche" : "Start a search"}>
        <div className="mc-launchbar-inner">
          <div className="mc-launch-copy"><span className="mc-launch-dot" aria-hidden="true" /><div><strong>{fr ? "Commencez par votre besoin" : "Start with your need"}</strong><span>{fr ? "Ville · âge de l’enfant · type de garde" : "City · child's age · childcare type"}</span></div></div>
          <a className="mc-launch-cta" href={`/${locale}/mon-besoin`}>{fr ? "Commencer" : "Start"}<span aria-hidden="true">→</span></a>
        </div>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer">
      <div><strong>mycoco</strong><p>{d.footer.tagline}</p><small>{d.footer.trust}</small></div>
      <nav className="footer-links" aria-label={fr ? "Liens légaux" : "Legal links"}><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link><Link href={`/${locale}/temoins`}>{d.footer.cookies}</Link></nav>
    </footer>
    <style>{`.mc-site-header{z-index:100;position:relative}.mc-header-inner{max-width:1280px}.mc-desktop-nav{display:flex;align-items:center;gap:24px;color:var(--ink-2);font-size:.84rem;font-weight:750}.mc-desktop-nav>a{transition:color .18s ease}.mc-desktop-nav>a:hover{color:var(--green)}.mc-nav-primary{font-weight:900;color:var(--ink)!important}.mc-menu{position:relative}.mc-menu summary{list-style:none;cursor:pointer}.mc-menu summary::-webkit-details-marker{display:none}.mc-menu summary:after{content:"⌄";font-size:.75rem;margin-left:5px;color:var(--muted)}.mc-dropdown{position:absolute;top:32px;left:-18px;width:300px;padding:9px;background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 20px 55px rgba(23,63,58,.13)}.mc-dropdown a{display:block;padding:12px;border-radius:11px}.mc-dropdown a:hover{background:#f2f6f3}.mc-dropdown strong,.mc-dropdown span{display:block}.mc-dropdown strong{font-size:.82rem;color:var(--ink)}.mc-dropdown span{font-size:.7rem;color:var(--muted);margin-top:2px}.mc-launchbar{border-top:1px solid rgba(23,63,58,.08);background:#edf6f1}.mc-launchbar-inner{width:min(1280px,calc(100% - 40px));min-height:60px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:18px}.mc-launch-copy{display:flex;align-items:center;gap:12px}.mc-launch-copy strong,.mc-launch-copy span{display:block}.mc-launch-copy strong{font-size:.83rem;line-height:1.15;color:#214b3e}.mc-launch-copy span:not(.mc-launch-dot){margin-top:3px;font-size:.68rem;color:#6b7b74}.mc-launch-dot{width:9px;height:9px;flex:0 0 9px;border-radius:50%;background:#5c9b7c;box-shadow:0 0 0 5px #dceee5}.mc-launch-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:38px;padding:0 16px;border-radius:10px;background:#193f32;color:#fff;font-size:.75rem;font-weight:900;text-decoration:none;box-shadow:0 7px 18px rgba(25,63,50,.16);transition:transform .16s ease,background .16s ease;cursor:pointer;position:relative;z-index:101;pointer-events:auto}.mc-launch-cta:hover{background:#102f26;transform:translateY(-1px)}.mc-launch-cta:focus-visible{outline:3px solid rgba(92,155,124,.35);outline-offset:3px}.mc-mobile-menu{display:none}.mc-mobile-menu summary{list-style:none}.mc-mobile-menu summary::-webkit-details-marker{display:none}.mc-mobile-panel{position:absolute;right:20px;top:66px;width:min(330px,calc(100vw - 40px));padding:10px;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 20px 60px rgba(23,63,58,.16)}.mc-mobile-panel a{display:flex;align-items:center;justify-content:space-between;padding:13px 14px;border-radius:10px;font-weight:800}.mc-mobile-panel a:hover{background:#f2f6f3}.mc-mobile-panel .mc-mobile-cta{margin-bottom:6px;background:var(--ink);color:#fff}.mc-mobile-panel .mc-mobile-cta:hover{background:var(--ink)}@media(max-width:980px){.mc-desktop-nav{display:none}.mc-mobile-menu{display:block;position:relative}.mc-mobile-menu summary{width:44px;height:44px;border:1px solid var(--line-strong);border-radius:12px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-menu summary span{display:block;width:18px;height:1.5px;background:var(--ink)}.site-header{padding-left:20px;padding-right:20px}.mc-launchbar-inner{width:100%;padding:0 20px;gap:12px}.mc-launch-copy strong{font-size:.78rem}.mc-launch-copy span:not(.mc-launch-dot){display:none}.mc-launch-cta{margin-left:auto;flex:0 0 auto}.mc-launchbar{margin-left:-20px;margin-right:-20px}}`}</style>
  </>;
}

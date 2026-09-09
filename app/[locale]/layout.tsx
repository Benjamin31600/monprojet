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
  const description = fr ? "MyCoco aide les familles du Québec à trouver une solution de garde adaptée à leurs besoins, puis à découvrir les services utiles autour de l’enfant." : "MyCoco helps families in Quebec find childcare that fits their needs, then discover useful services around their child.";
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
          <details className="mc-menu">
            <summary>{fr ? "Explorer" : "Explore"}</summary>
            <div className="mc-dropdown">
              <Link href={`/${locale}/garderies`}><strong>{fr ? "Toutes les solutions" : "All childcare"}</strong><span>{fr ? "Rechercher près de chez vous" : "Search near you"}</span></Link>
              <Link href={`/${locale}/cpe`}><strong>CPE</strong><span>{fr ? "Comprendre et trouver un CPE" : "Find and understand CPEs"}</span></Link>
              <Link href={`/${locale}/garderie-subventionnee`}><strong>{fr ? "Garderies subventionnées" : "Subsidized daycares"}</strong><span>{fr ? "Explorer les options subventionnées" : "Explore subsidized options"}</span></Link>
            </div>
          </details>
          <Link href={`/${locale}/mon-besoin`}>{fr ? "Mon besoin" : "My need"}</Link>
          <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services" : "For providers"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
          <Link className="language-switch" href={`/${other}`} aria-label={fr ? "Passer à l’anglais" : "Switch to French"}>{other.toUpperCase()}</Link>
          <Link className="header-cta" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"}<span aria-hidden="true">→</span></Link>
        </nav>
        <details className="mc-mobile-menu">
          <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><span></span><span></span><span></span></summary>
          <div className="mc-mobile-panel">
            <Link href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma solution" : "Find my solution"}</Link>
            <Link href={`/${locale}/garderies`}>{fr ? "Explorer les garderies" : "Explore childcare"}</Link>
            <Link href={`/${locale}/cpe`}>CPE</Link>
            <Link href={`/${locale}/garderie-subventionnee`}>{fr ? "Garderies subventionnées" : "Subsidized daycares"}</Link>
            <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services" : "For providers"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>
        </details>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer">
      <div><strong>mycoco</strong><p>{d.footer.tagline}</p><small>{d.footer.trust}</small></div>
      <nav className="footer-links" aria-label={fr ? "Liens légaux" : "Legal links"}><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link><Link href={`/${locale}/temoins`}>{d.footer.cookies}</Link></nav>
    </footer>
    <style>{`.mc-site-header{z-index:100}.mc-header-inner{max-width:1280px}.mc-desktop-nav{display:flex;align-items:center;gap:25px;color:var(--ink-2);font-size:.84rem;font-weight:750}.mc-desktop-nav>a{transition:color .18s ease}.mc-desktop-nav>a:hover{color:var(--green)}.mc-menu{position:relative}.mc-menu summary{list-style:none;cursor:pointer}.mc-menu summary::-webkit-details-marker{display:none}.mc-menu summary:after{content:"⌄";font-size:.75rem;margin-left:5px;color:var(--muted)}.mc-dropdown{position:absolute;top:32px;left:-18px;width:290px;padding:9px;background:#fff;border:1px solid var(--line);border-radius:16px;box-shadow:0 20px 55px rgba(23,63,58,.13)}.mc-dropdown a{display:block;padding:12px;border-radius:11px}.mc-dropdown a:hover{background:#f2f6f3}.mc-dropdown strong,.mc-dropdown span{display:block}.mc-dropdown strong{font-size:.82rem;color:var(--ink)}.mc-dropdown span{font-size:.7rem;color:var(--muted);margin-top:2px}.mc-mobile-menu{display:none}.mc-mobile-menu summary{list-style:none}.mc-mobile-menu summary::-webkit-details-marker{display:none}.mc-mobile-panel{position:absolute;right:20px;top:66px;width:min(320px,calc(100vw - 40px));padding:10px;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 20px 60px rgba(23,63,58,.16)}.mc-mobile-panel a{display:block;padding:13px 14px;border-radius:10px;font-weight:800}.mc-mobile-panel a:hover{background:#f2f6f3}@media(max-width:980px){.mc-desktop-nav{display:none}.mc-mobile-menu{display:block;position:relative}.mc-mobile-menu summary{width:44px;height:44px;border:1px solid var(--line-strong);border-radius:12px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-menu summary span{display:block;width:18px;height:1.5px;background:var(--ink)}.site-header{padding-left:20px;padding-right:20px}}`}</style>
  </>;
}

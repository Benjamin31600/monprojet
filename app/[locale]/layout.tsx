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
  const description = fr ? "Trouvez une solution de garde qui correspond vraiment à votre famille. Comparez les services près de chez vous et gardez votre recherche active." : "Find childcare that genuinely fits your family. Compare local services and keep your search active.";
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
          <Link href={`/${locale}/mon-besoin`}>{fr ? "Je suis une famille" : "I'm a family"}</Link>
          <Link href={`/${locale}/garderies`}>{fr ? "Trouver une garde" : "Find childcare"}</Link>
          <Link href={`/${locale}/pour-les-services`}>{fr ? "Je suis un service" : "I'm a provider"}</Link>
          <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
          <Link className="mc-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
          <Link className="mc-header-space" href={`/${locale}/espace-service`}>{fr ? "Créer mon espace" : "Create my space"}</Link>
          <Link className="mc-header-action" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}<span>→</span></Link>
        </nav>
        <details className="mc-mobile-nav">
          <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><i></i><i></i><i></i></summary>
          <div>
            <span>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span>
            <Link className="mc-mobile-primary" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}<span>→</span></Link>
            <Link href={`/${locale}/garderies`}>{fr ? "Parcourir les services de garde" : "Browse childcare services"}</Link>
            <Link href={`/${locale}/espace-famille`}>{fr ? "Mon espace famille" : "My family space"}</Link>
            <span>{fr ? "POUR LES SERVICES DE GARDE" : "FOR CHILDCARE PROVIDERS"}</span>
            <Link href={`/${locale}/espace-service`}>{fr ? "Créer mon espace service" : "Create my provider space"}</Link>
            <Link href={`/${locale}/pour-les-services`}>{fr ? "Pourquoi rejoindre MyCoco" : "Why join MyCoco"}</Link>
            <span>MYCOCO</span>
            <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr ? "À propos de MyCoco" : "About MyCoco"}</Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>
        </details>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="mc-global-footer">
      <div className="mc-footer-inner">
        <div><Link className="mc-footer-brand" href={`/${locale}`}>my<span>coco</span></Link><p>{fr ? "La garde qui s'adapte à votre famille." : "Childcare that fits your family."}</p><small>{d.footer.trust}</small></div>
        <div className="mc-footer-columns">
          <div><strong>{fr ? "Familles" : "Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr ? "Voir les services de garde" : "Browse childcare"}</Link><Link href={`/${locale}/espace-famille`}>{fr ? "Mon espace famille" : "My family space"}</Link></div>
          <div><strong>{fr ? "Services de garde" : "Childcare providers"}</strong><Link href={`/${locale}/espace-service`}>{fr ? "Créer mon espace" : "Create my space"}</Link><Link href={`/${locale}/pour-les-services`}>{fr ? "Pourquoi rejoindre MyCoco" : "Why join MyCoco"}</Link></div>
          <div><strong>MyCoco</strong><Link href={`/${locale}/a-propos`}>{fr ? "À propos de MyCoco" : "About MyCoco"}</Link><Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
        </div>
      </div>
    </footer>
    <style>{`
      .mc-global-header{position:sticky;top:0;z-index:100;background:rgba(250,248,243,.96);border-bottom:1px solid #e5e7e2;backdrop-filter:blur(18px)}.mc-global-inner{width:min(1280px,calc(100% - 48px));height:76px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:22px}.mc-global-brand{display:inline-flex;align-items:center;gap:9px;color:#18352c;font-size:21px;font-weight:950;letter-spacing:-.06em}.mc-global-brand>span:last-child>span,.mc-footer-brand span{color:#c47745}.mc-brand-mark{display:grid;place-items:center;width:30px;height:30px;border-radius:11px 11px 11px 4px;background:#18352c;color:#fff;font-size:13px;font-weight:950}.mc-global-nav{display:flex;align-items:center;gap:17px;color:#5d6b64;font-size:11px;font-weight:850}.mc-global-nav a{transition:color .16s ease}.mc-global-nav a:hover{color:#18352c}.mc-lang{padding:7px 9px;border:1px solid #d9dfd9;border-radius:999px}.mc-header-space{color:#365b4e!important;padding:9px 11px;border:1px solid #d7e0da;border-radius:10px;background:#fff}.mc-header-action{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:0 15px;border-radius:12px;background:#18352c;color:#fff!important;box-shadow:0 8px 20px rgba(24,53,44,.14)}.mc-header-action:hover{background:#102f26}.mc-mobile-nav{display:none}.mc-global-footer{background:#10271f;color:#fff;padding:55px 0}.mc-footer-inner{width:min(1280px,calc(100% - 48px));margin:auto;display:flex;justify-content:space-between;gap:45px}.mc-footer-brand{font-size:21px;font-weight:950;letter-spacing:-.05em}.mc-footer-inner p{margin:9px 0 2px;color:#d4dfda;font-size:12px}.mc-footer-inner small{color:#8fa49b;font-size:10px}.mc-footer-columns{display:grid;grid-template-columns:repeat(3,160px);gap:28px}.mc-footer-columns div{display:flex;flex-direction:column;gap:9px}.mc-footer-columns strong{font-size:11px;color:#fff;margin-bottom:3px}.mc-footer-columns a{font-size:10px;color:#aebfb7}.mc-footer-columns a:hover{color:#fff}@media(max-width:1050px){.mc-global-nav{gap:10px}.mc-global-inner{width:min(100% - 28px,1280px)}}@media(max-width:900px){.mc-global-nav{display:none}.mc-mobile-nav{display:block;position:relative}.mc-mobile-nav summary{list-style:none;width:42px;height:42px;border:1px solid #d7ded8;border-radius:11px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-nav summary::-webkit-details-marker{display:none}.mc-mobile-nav summary i{display:block;width:17px;height:1.5px;background:#18352c}.mc-mobile-nav>div{position:absolute;right:0;top:52px;width:min(360px,calc(100vw - 28px));padding:12px;background:#fff;border:1px solid #dfe4df;border-radius:18px;box-shadow:0 22px 55px rgba(24,53,44,.15)}.mc-mobile-nav>div>span{display:block;padding:9px 13px 5px;color:#89958f;font-size:9px;font-weight:950;letter-spacing:.13em}.mc-mobile-nav a{display:flex;align-items:center;justify-content:space-between;padding:12px 13px;border-radius:10px;color:#18352c;font-size:13px;font-weight:800}.mc-mobile-nav a:hover{background:#f1f4f0}.mc-mobile-nav .mc-mobile-primary{margin-bottom:4px;background:#18352c;color:#fff}.mc-footer-inner{width:min(100% - 28px,1280px);flex-direction:column}.mc-footer-columns{grid-template-columns:repeat(3,1fr)}}@media(max-width:560px){.mc-footer-columns{grid-template-columns:1fr 1fr}.mc-global-inner{height:68px}}
    `}</style>
  </>;
}

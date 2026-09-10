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
  const description = fr ? "Trouvez, comparez et suivez les solutions de garde qui correspondent à votre famille." : "Find, compare and follow childcare options that fit your family.";
  return { title:{default:title,template:`%s | MyCoco`}, description, alternates:{canonical:`/${locale}`,languages:{"fr-CA":"/fr","en-CA":"/en","x-default":"/fr"}}, openGraph:{locale:fr?"fr_CA":"en_CA",siteName:site.name,type:"website",title,description,url:`${site.url}/${locale}`},robots:{index:true,follow:true} };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale; const fr = locale === "fr"; const other = fr ? "en" : "fr"; const d = getDictionary(locale);
  return <>
    <FunnelTracker />
    <a className="skip-link" href="#main-content">{fr ? "Aller au contenu principal" : "Skip to main content"}</a>
    <header className="mc-global-header">
      <div className="mc-global-inner">
        <Link className="mc-global-brand" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="mc-brand-mark">m</span><span>my<span>coco</span></span></Link>
        <nav className="mc-global-nav" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          <Link href={`/${locale}/mon-besoin`}>{fr ? "Familles" : "Families"}</Link>
          <Link href={`/${locale}/garderies`}>{fr ? "Explorer" : "Explore"}</Link>
          <Link href={`/${locale}/pour-les-services`}>{fr ? "Services" : "Providers"}</Link>
          <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
          <Link className="mc-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
          <Link className="mc-header-space" href={`/${locale}/espace-service`}>{fr ? "Espace service" : "Provider space"}</Link>
          <Link className="mc-header-action" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}<span>→</span></Link>
        </nav>
        <details className="mc-mobile-nav">
          <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><i></i><i></i><i></i></summary>
          <div>
            <span>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span>
            <Link className="mc-mobile-primary" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}<span>→</span></Link>
            <Link href={`/${locale}/garderies`}>{fr ? "Explorer les services" : "Explore providers"}</Link>
            <Link href={`/${locale}/espace-famille`}>{fr ? "Mon espace famille" : "My family space"}</Link>
            <span>{fr ? "POUR LES SERVICES" : "FOR PROVIDERS"}</span>
            <Link href={`/${locale}/espace-service`}>{fr ? "Créer mon espace service" : "Create provider space"}</Link>
            <Link href={`/${locale}/pour-les-services`}>{fr ? "Pourquoi rejoindre MyCoco" : "Why join MyCoco"}</Link>
            <span>MYCOCO</span>
            <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link>
            <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About MyCoco"}</Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>
        </details>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="mc-global-footer"><div className="mc-footer-inner"><div><Link className="mc-footer-brand" href={`/${locale}`}>my<span>coco</span></Link><p>{fr ? "La garde qui s'adapte à votre famille." : "Childcare that fits your family."}</p><small>{d.footer.trust}</small></div><div className="mc-footer-columns"><div><strong>{fr?"Familles":"Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr?"Trouver ma garde":"Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr?"Explorer":"Explore"}</Link><Link href={`/${locale}/espace-famille`}>{fr?"Mon espace":"My space"}</Link></div><div><strong>{fr?"Services":"Providers"}</strong><Link href={`/${locale}/espace-service`}>{fr?"Créer mon espace":"Create my space"}</Link><Link href={`/${locale}/pour-les-services`}>{fr?"Rejoindre MyCoco":"Join MyCoco"}</Link></div><div><strong>MyCoco</strong><Link href={`/${locale}/a-propos`}>{fr?"À propos":"About"}</Link><Link href={`/${locale}/comment-ca-marche`}>{fr?"Comment ça marche":"How it works"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div></div></div></footer>
  </>;
}

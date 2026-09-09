import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const fr = locale === "fr";
  const title = fr ? "MyCoco | Trouver une solution de garde et de vie familiale au Québec" : "MyCoco | Find childcare and family-care solutions in Quebec";
  const description = fr ? "MyCoco aide les familles du Québec à trouver une solution de garde adaptée à leurs besoins, puis à découvrir les services utiles autour de l’enfant." : "MyCoco helps families in Quebec find childcare that fits their needs, then discover useful services around their child.";
  return {
    title: { default: title, template: `%s | MyCoco` },
    description,
    alternates: { canonical: `/${locale}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } },
    openGraph: { locale: fr ? "fr_CA" : "en_CA", alternateLocale: fr ? ["en_CA"] : ["fr_CA"], siteName: "MyCoco", type: "website", title, description, url: `${site.url}/${locale}` },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const other = locale === "fr" ? "en" : "fr";
  return <>
    <a className="skip-link" href="#main-content">{locale === "fr" ? "Aller au contenu principal" : "Skip to main content"}</a>
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="MyCoco — accueil"><span className="brand-mark" aria-hidden="true"><i /></span><span className="brand-word">my<span>coco</span></span></Link>
        <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
          <Link href={`/${locale}/garderies`}>{d.nav.search}</Link>
          <Link href={`/${locale}/mon-besoin`}>{d.nav.need}</Link>
          <Link href={`/${locale}/garderie-subventionnee`}>{d.nav.subsidized}</Link>
          <Link href={`/${locale}/cpe`}>{d.nav.cpe}</Link>
          <Link href={`/${locale}/a-propos`}>{d.nav.about}</Link>
          <Link className="language-switch" href={`/${other}`} aria-label={locale === "fr" ? "Passer à l’anglais" : "Switch to French"}>{other.toUpperCase()}</Link>
          <Link className="header-cta" href={`/${locale}/mon-besoin`}>{d.nav.cta}<span aria-hidden="true">→</span></Link>
        </nav>
      </div>
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer">
      <div><strong>mycoco</strong><p>{d.footer.tagline}</p><small>{d.footer.trust}</small></div>
      <nav className="footer-links" aria-label={locale === "fr" ? "Liens légaux" : "Legal links"}>
        <Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link>
        <Link href={`/${locale}/securite`}>{d.footer.security}</Link>
        <Link href={`/${locale}/conditions`}>{d.footer.terms}</Link>
        <Link href={`/${locale}/temoins`}>{d.footer.cookies}</Link>
      </nav>
    </footer>
  </>;
}

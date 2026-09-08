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
  const title = fr ? "MyCoco | Garderies, CPE et solutions de garde au Québec" : "MyCoco | Daycares, CPEs & childcare in Quebec";
  const description = fr
    ? "Trouvez une garderie, un CPE ou un service de garde près de chez vous. MyCoco aide les familles du Québec à trouver une solution de garde adaptée."
    : "Find a daycare, CPE or childcare service near you. MyCoco helps families across Quebec find the right childcare solution.";

  return {
    title: { default: title, template: `%s | MyCoco` },
    description,
    alternates: { canonical: `/${locale}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } },
    openGraph: { locale: fr ? "fr_CA" : "en_CA", alternateLocale: fr ? ["en_CA"] : ["fr_CA"], siteName: "MyCoco", type: "website", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const other = locale === "fr" ? "en" : "fr";

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="brand" href={`/${locale}`} aria-label="MyCoco"><span className="brand-mark" aria-hidden="true"><i /></span><span className="brand-word">my<span>coco</span></span></Link>
          <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
            <Link href={`/${locale}/garderies`}>{d.nav.search}</Link>
            <Link href={`/${locale}/garderie-subventionnee`}>{d.nav.subsidized}</Link>
            <Link href={`/${locale}/cpe`}>{d.nav.cpe}</Link>
            <Link href={`/${locale}/a-propos`}>{d.nav.about}</Link>
            <Link className="language-switch" href={`/${other}`} aria-label={locale === "fr" ? "Switch to English" : "Passer au français"}>{other.toUpperCase()}</Link>
            <Link className="header-cta" href={`/${locale}/garderies`}>{d.nav.cta}<span aria-hidden="true">→</span></Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div><strong>mycoco</strong><p>{d.footer.tagline}</p></div>
        <nav className="footer-links">
          <Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link>
          <Link href={`/${locale}/conditions`}>{d.footer.terms}</Link>
          <Link href={`/${locale}/temoins`}>{d.footer.cookies}</Link>
        </nav>
      </footer>
    </>
  );
}

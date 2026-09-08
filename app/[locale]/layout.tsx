import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";
import { site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const title = locale === "fr" ? `${site.name} | Trouvez une solution de garde au Québec` : `${site.name} | Find childcare in Quebec`;
  const description = locale === "fr" ? site.description : "Find daycares, CPEs, home daycares and childcare solutions near you in Quebec.";
  return { title: { default: title, template: `%s | ${site.name}` }, description, metadataBase: new URL(site.url), alternates: { canonical: `/${locale}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } }, openGraph: { locale: locale === "fr" ? "fr_CA" : "en_CA", alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"], siteName: site.name, type: "website" }, robots: { index: true, follow: true } };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale);
  const other = locale === "fr" ? "en" : "fr";
  return <html lang={locale === "fr" ? "fr-CA" : "en-CA"><body>
    <header className="site-header"><Link className="brand" href={`/${locale}`}>{site.name}</Link>
      <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
        <Link href={`/${locale}/garderies`}>{d.nav.search}</Link><Link href={`/${locale}/garderie-subventionnee`}>{d.nav.subsidized}</Link><Link href={`/${locale}/cpe`}>{d.nav.cpe}</Link><Link href={`/${locale}/a-propos`}>{d.nav.about}</Link><Link className="language-switch" href={`/${other}`}>{other.toUpperCase()}</Link>
      </nav></header>
    <main>{children}</main>
    <footer className="site-footer"><div><strong>{site.name}</strong><p>{d.footer.tagline}</p></div><nav className="footer-links" aria-label={locale === "fr" ? "Informations légales" : "Legal information"}><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link><Link href={`/${locale}/temoins`}>{d.footer.cookies}</Link></nav></footer>
  </body></html>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { HomeExperience } from "@/components/home-experience";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const fr = locale === "fr";
  const title = fr
    ? "MyCoco | Trouvez une garde qui convient vraiment à votre famille"
    : "MyCoco | Find childcare that truly fits your family";
  const description = fr
    ? "Décrivez votre besoin et découvrez des services de garde pertinents. Recherche gratuite, sans carte bancaire et sans engagement."
    : "Tell us what you need and discover relevant childcare services. Free search, no credit card and no commitment.";
  return {
    title: { default: title, template: `%s | MyCoco` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" },
    },
    openGraph: {
      locale: fr ? "fr_CA" : "en_CA",
      alternateLocale: fr ? ["en_CA"] : ["fr_CA"],
      siteName: site.name,
      type: "website",
      title,
      description,
      url: `${site.url}/${locale}`,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <HomeExperience locale={raw as Locale} />;
}

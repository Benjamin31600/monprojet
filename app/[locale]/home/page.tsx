import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { HomeExperience } from "@/components/home-experience";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  const title = fr ? "MyCoco | Trouver une garde qui correspond à votre famille" : "MyCoco | Find childcare that fits your family";
  const description = fr ? "Décrivez votre besoin et découvrez des services de garde pertinents, gratuitement et sans carte bancaire." : "Tell us what you need and discover relevant childcare services, for free and with no credit card.";
  return { title, description, alternates: { canonical: `/${raw}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } }, openGraph: { title, description, siteName: site.name, type: "website", url: `${site.url}/${raw}` } };
}

export default async function NewHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <HomeExperience locale={raw as Locale} />;
}

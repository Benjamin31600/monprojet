import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import SecureSpace from "@/components/SecureSpace";

export default async function ProviderSpacePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale: raw } = await params;
  const query = await searchParams;
  if (!isLocale(raw)) notFound();
  return <SecureSpace locale={raw as Locale} audience="provider" newlyCreated={query.nouveau === "1"} />;
}

import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import SecureSpace from "@/components/SecureSpace";

export default async function ProviderSpacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <SecureSpace locale={raw as Locale} audience="provider" />;
}

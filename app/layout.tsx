import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Trouvez une solution de garde au Québec`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  category: "childcare",
  alternates: { canonical: "/fr" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: site.name,
    title: `${site.name} | Trouvez une solution de garde au Québec`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Trouvez une solution de garde au Québec`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA">
      <body>{children}</body>
    </html>
  );
}

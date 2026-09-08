import type { Metadata } from "next";
import "./globals.css";
import "./mycoco.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MyCoco | Garderies, CPE et solutions de garde au Québec",
    template: "%s | MyCoco",
  },
  description: site.description,
  applicationName: "MyCoco",
  category: "childcare",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: "MyCoco",
    title: "MyCoco | Garderies, CPE et solutions de garde au Québec",
    description: site.description,
    url: site.url,
    countryName: "Canada",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyCoco | Garderies, CPE et solutions de garde au Québec",
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MyCoco",
    alternateName: "MyCoco Childcare",
    url: site.url,
    description: site.description,
    inLanguage: ["fr-CA", "en-CA"],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Quebec",
      containedInPlace: { "@type": "Country", name: "Canada" },
    },
  };

  return (
    <html lang="fr-CA">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

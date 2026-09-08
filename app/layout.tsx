import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Garderies et services de garde au Québec`,
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
    title: `${site.name} | Garderies et services de garde au Québec`,
    description: site.description,
    url: site.url,
    countryName: "Canada",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Garderies et services de garde au Québec`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
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

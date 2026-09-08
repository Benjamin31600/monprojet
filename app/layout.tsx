import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Trouvez une solution de garde au Québec`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  category: "childcare",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: site.locale, siteName: site.name, title: `${site.name} | Trouvez une solution de garde au Québec`, description: site.description, url: site.url },
  twitter: { card: "summary_large_image", title: `${site.name} | Trouvez une solution de garde au Québec`, description: site.description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr-CA"><body>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Accueil">{site.name}</a>
      <nav aria-label="Navigation principale">
        <a href="/garderies">Garderies</a><a href="/garderie-subventionnee">Garderie subventionnée</a><a href="/cpe">CPE</a><a href="/a-propos">À propos</a>
      </nav>
    </header>
    <main>{children}</main>
    <footer className="site-footer">
      <div><strong>{site.name}</strong><p>La recherche de garde pensée pour les familles québécoises.</p></div>
      <nav className="footer-links" aria-label="Informations légales"><a href="/confidentialite">Confidentialité</a><a href="/conditions">Conditions</a><a href="/temoins">Témoins</a></nav>
    </footer>
  </body></html>;
}

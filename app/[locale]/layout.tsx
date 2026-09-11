import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import FunnelTracker from "@/components/FunnelTracker";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import PolishStyles from "@/components/PolishStyles";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const fr = locale === "fr";
  const title = fr ? "MyCoco | La garde qui correspond vraiment à votre famille" : "MyCoco | Childcare that truly fits your family";
  const description = fr ? "Matching personnalisé, distance, disponibilités et espace famille : MyCoco aide les familles et les services de garde à mieux se trouver." : "Personalized matching, distance, openings and family spaces: MyCoco helps families and childcare providers find the right fit.";
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return {
    title: { default: title, template: `%s | MyCoco` },
    description,
    alternates: { canonical: `/${locale}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } },
    openGraph: { locale: fr ? "fr_CA" : "en_CA", siteName: site.name, type: "website", title, description, url: `${site.url}/${locale}` },
    robots: { index: true, follow: true },
    verification: verification ? { google: verification } : undefined,
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const other = fr ? "en" : "fr";
  const d = getDictionary(locale);

  return <>
    <FunnelTracker />
    <GoogleAnalytics />
    <PolishStyles />
    <CookieConsent locale={locale} />
    <a className="skip-link" href="#main-content">{fr ? "Aller au contenu principal" : "Skip to main content"}</a>

    <header className="mc-nav13">
      <div className="mc-nav13-wrap">
        <Link className="mc-nav13-brand" href={`/${locale}`} aria-label="MyCoco — accueil">
          <span className="mc-nav13-mark">m</span><span>my<strong>coco</strong></span>
        </Link>

        <nav className="mc-nav13-links" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          <Link href={`/${locale}/mon-besoin`}>{fr ? "Pour les familles" : "For families"}</Link>
          <Link href={`/${locale}/pour-les-services`}>{fr ? "Pour les services de garde" : "For childcare providers"}</Link>
          <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link>
          <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link>
        </nav>

        <div className="mc-nav13-actions">
          <Link className="mc-nav13-signin" href={`/${locale}/connexion`}>{fr ? "Connexion" : "Sign in"}</Link>
          <Link className="mc-nav13-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
          <Link className="mc-nav13-cta" href={`/${locale}/mon-besoin`}>{fr ? "Trouver une garde" : "Find childcare"}<span>→</span></Link>
        </div>

        <details className="mc-nav13-mobile">
          <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><i/><i/><i/></summary>
          <div className="mc-nav13-panel">
            <Link className="family" href={`/${locale}/mon-besoin`}><div><small>{fr ? "JE SUIS UNE FAMILLE" : "I’M A FAMILY"}</small><strong>{fr ? "Trouver une garde" : "Find childcare"}</strong></div><b>→</b></Link>
            <Link className="provider" href={`/${locale}/pour-les-services`}><div><small>{fr ? "JE SUIS UN SERVICE" : "I’M A PROVIDER"}</small><strong>{fr ? "Créer ou gérer mon espace" : "Create or manage my space"}</strong></div><b>→</b></Link>
            <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}<span>→</span></Link>
            <Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}<span>→</span></Link>
            <Link href={`/${locale}/connexion`}>{fr ? "Connexion" : "Sign in"}<span>→</span></Link>
            <Link href={`/${other}`}>{other.toUpperCase()}<span>→</span></Link>
          </div>
        </details>
      </div>
    </header>

    <div id="main-content">{children}</div>

    <footer className="mc-foot13">
      <div className="mc-foot13-wrap">
        <div className="mc-foot13-brand"><Link href={`/${locale}`}>my<span>coco</span></Link><p>{fr ? "L’écosystème pensé pour les familles et les professionnels de l’enfance." : "The ecosystem built for families and childhood professionals."}</p></div>
        <div className="mc-foot13-cols">
          <div><strong>{fr ? "Familles" : "Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr ? "Trouver une garde" : "Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr ? "Voir les services" : "Browse providers"}</Link><Link href={`/${locale}/espace-famille`}>{fr ? "Espace famille" : "Family space"}</Link></div>
          <div><strong>{fr ? "Professionnels" : "Professionals"}</strong><Link href={`/${locale}/pour-les-services`}>{fr ? "Pourquoi MyCoco" : "Why MyCoco"}</Link><Link href={`/${locale}/inscription?role=provider`}>{fr ? "Créer mon espace" : "Create my space"}</Link><Link href={`/${locale}/espace-service`}>{fr ? "Espace service" : "Provider space"}</Link></div>
          <div><strong>MyCoco</strong><Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
        </div>
      </div>
      <div className="mc-foot13-bottom"><span>© 2026 MyCoco</span><span>{fr ? "Québec · Familles · Enfance" : "Quebec · Families · Childhood"}</span></div>
    </footer>

    <style>{`
      .skip-link{position:absolute;left:-9999px}.skip-link:focus{left:10px;top:10px;z-index:999;background:#fff;padding:10px;border-radius:8px}.mc-nav13{position:sticky;top:0;z-index:120;background:rgba(255,250,244,.94);border-bottom:1px solid #e3e8e4;backdrop-filter:blur(18px)}.mc-nav13-wrap{width:min(1240px,calc(100% - 36px));height:72px;margin:auto;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:34px}.mc-nav13-brand{display:inline-flex;align-items:center;gap:9px;color:#153b35;font-size:23px;font-weight:950;letter-spacing:-.065em}.mc-nav13-brand strong,.mc-foot13-brand>a span{color:#f07b63}.mc-nav13-mark{display:grid;place-items:center;width:31px;height:31px;border-radius:10px 10px 10px 4px;background:#153b35;color:#fff;font-size:13px}.mc-nav13-links{display:flex;justify-content:center;gap:27px;align-items:center}.mc-nav13-links a{font-size:10px;font-weight:850;color:#556d64;white-space:nowrap}.mc-nav13-links a:hover{color:#153b35}.mc-nav13-actions{display:flex;align-items:center;gap:10px}.mc-nav13-signin{font-size:9px;font-weight:900;color:#435d54}.mc-nav13-lang{display:grid;place-items:center;width:31px;height:31px;border:1px solid #d9e2dc;border-radius:999px;font-size:7px;font-weight:950;color:#61746d}.mc-nav13-cta{display:inline-flex;align-items:center;gap:9px;min-height:42px;padding:0 14px;border-radius:11px;background:#153b35;color:#fff;font-size:9px;font-weight:950;box-shadow:0 9px 24px rgba(21,59,53,.13)}.mc-nav13-cta:hover{background:#0e2c27;transform:translateY(-1px)}.mc-nav13-mobile{display:none}.mc-foot13{background:#0e2c27;color:#fff}.mc-foot13-wrap{width:min(1160px,calc(100% - 40px));margin:auto;padding:58px 0 45px;display:grid;grid-template-columns:.9fr 1.2fr;gap:75px}.mc-foot13-brand>a{font-size:27px;font-weight:950;letter-spacing:-.06em}.mc-foot13-brand p{max-width:340px;color:#b9ccc4;font-size:11px;line-height:1.6}.mc-foot13-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:34px}.mc-foot13-cols>div{display:grid;align-content:start;gap:9px}.mc-foot13-cols strong{font-size:8px;letter-spacing:.11em;text-transform:uppercase;margin-bottom:6px}.mc-foot13-cols a{font-size:9px;color:#a9beb5}.mc-foot13-cols a:hover{color:#fff}.mc-foot13-bottom{width:min(1160px,calc(100% - 40px));margin:auto;min-height:43px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;color:#789087;font-size:7px}.mc-nav13-mobile summary{list-style:none}.mc-nav13-mobile summary::-webkit-details-marker{display:none}@media(max-width:1040px){.mc-nav13-links,.mc-nav13-actions{display:none}.mc-nav13-wrap{display:flex;justify-content:space-between;width:calc(100% - 28px);height:66px}.mc-nav13-mobile{display:block;position:relative}.mc-nav13-mobile summary{width:43px;height:43px;border:1px solid #d8e1dc;border-radius:12px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-nav13-mobile summary i{display:block;width:17px;height:1.5px;background:#153b35}.mc-nav13-panel{position:absolute;right:0;top:53px;width:min(360px,calc(100vw - 28px));padding:10px;background:#fff;border:1px solid #dfe6e2;border-radius:18px;box-shadow:0 28px 70px rgba(21,59,53,.18)}.mc-nav13-panel>a{display:flex;justify-content:space-between;align-items:center;padding:13px 12px;border-radius:11px;color:#153b35;font-size:10px;font-weight:850}.mc-nav13-panel>a.family,.mc-nav13-panel>a.provider{padding:15px;margin-bottom:7px}.mc-nav13-panel>a.family{background:#e9f5ef}.mc-nav13-panel>a.provider{background:#fff0e9}.mc-nav13-panel small,.mc-nav13-panel strong{display:block}.mc-nav13-panel small{font-size:7px;letter-spacing:.09em;color:#788b83;margin-bottom:3px}.mc-nav13-panel strong{font-size:11px}.mc-foot13-wrap{grid-template-columns:1fr;gap:35px}}@media(max-width:650px){.mc-foot13-cols{grid-template-columns:1fr 1fr}.mc-foot13-cols>div:last-child{grid-column:1/-1}.mc-foot13-bottom{gap:20px}}
    `}</style>
  </>;
}

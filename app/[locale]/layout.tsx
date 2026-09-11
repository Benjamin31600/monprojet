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
  const title = fr ? "MyCoco | Trouver la bonne solution de garde" : "MyCoco | Find the right childcare solution";
  const description = fr ? "Trouvez, comparez et suivez les services de garde qui correspondent à votre famille au Québec." : "Find, compare and follow childcare services that fit your family in Quebec.";
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

    <header className="mc-nav12">
      <div className="mc-nav12-note">
        <div>
          <Link href={`/${locale}/mon-besoin`}><span>👨‍👩‍👧</span><b>{fr ? "Familles" : "Families"}</b><small>{fr ? "Recherche gratuite · sans engagement" : "Free search · no commitment"}</small></Link>
          <i />
          <Link href={`/${locale}/pour-les-services`}><span>🏫</span><b>{fr ? "Services de garde" : "Childcare providers"}</b><small>{fr ? "Créez votre espace gratuitement" : "Create your space for free"}</small></Link>
        </div>
      </div>

      <div className="mc-nav12-main">
        <div className="mc-nav12-wrap">
          <Link className="mc-nav12-brand" href={`/${locale}`} aria-label="MyCoco — accueil">
            <span className="mc-nav12-mark">m</span><span>my<strong>coco</strong></span>
          </Link>

          <nav className="mc-nav12-links" aria-label={fr ? "Navigation principale" : "Main navigation"}>
            <Link className="family" href={`/${locale}/mon-besoin`}><small>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</small><b>{fr ? "Trouver une garde" : "Find childcare"}</b></Link>
            <Link href={`/${locale}/garderies`}><small>{fr ? "DÉCOUVRIR" : "DISCOVER"}</small><b>{fr ? "Annuaire" : "Directory"}</b></Link>
            <Link className="provider" href={`/${locale}/pour-les-services`}><small>{fr ? "POUR LES SERVICES" : "FOR PROVIDERS"}</small><b>{fr ? "Espace professionnel" : "Provider space"}</b></Link>
            <Link href={`/${locale}/comment-ca-marche`}><small>MYCOCO</small><b>{fr ? "Comment ça marche" : "How it works"}</b></Link>
            <Link href={`/${locale}/a-propos`}><small>MYCOCO</small><b>{fr ? "À propos" : "About"}</b></Link>
          </nav>

          <div className="mc-nav12-actions">
            <Link className="mc-nav12-signin" href={`/${locale}/connexion`}>{fr ? "Connexion" : "Sign in"}</Link>
            <Link className="mc-nav12-lang" href={`/${other}`}>{other.toUpperCase()}</Link>
            <Link className="mc-nav12-cta" href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"}<span>→</span></Link>
          </div>

          <details className="mc-nav12-mobile">
            <summary aria-label={fr ? "Ouvrir le menu" : "Open menu"}><i /><i /><i /></summary>
            <div className="mc-nav12-panel">
              <div className="mc-nav12-panel-title">{fr ? "JE SUIS…" : "I AM…"}</div>
              <Link className="mc-nav12-role family" href={`/${locale}/mon-besoin`}><span>👨‍👩‍👧</span><div><strong>{fr ? "Une famille" : "A family"}</strong><small>{fr ? "Trouver une garde gratuitement" : "Find childcare for free"}</small></div><b>→</b></Link>
              <Link className="mc-nav12-role provider" href={`/${locale}/pour-les-services`}><span>🏫</span><div><strong>{fr ? "Un service de garde" : "A childcare provider"}</strong><small>{fr ? "Créer ou gérer ma présence" : "Create or manage my presence"}</small></div><b>→</b></Link>
              <div className="mc-nav12-panel-title">{fr ? "EXPLORER" : "EXPLORE"}</div>
              <Link href={`/${locale}/garderies`}>{fr ? "Annuaire des services" : "Provider directory"}<span>→</span></Link>
              <Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}<span>→</span></Link>
              <Link href={`/${locale}/a-propos`}>{fr ? "À propos de MyCoco" : "About MyCoco"}<span>→</span></Link>
              <Link href={`/${locale}/connexion`}>{fr ? "Se connecter" : "Sign in"}<span>→</span></Link>
              <Link href={`/${other}`}>{other.toUpperCase()}<span>→</span></Link>
            </div>
          </details>
        </div>
      </div>
    </header>

    <div id="main-content">{children}</div>

    <footer className="mc-foot12">
      <div className="mc-foot12-wrap">
        <div className="mc-foot12-brand"><Link href={`/${locale}`}>my<span>coco</span></Link><p>{fr ? "La garde qui s’adapte à votre famille." : "Childcare that fits your family."}</p><div><span>✓ {fr ? "Gratuit pour les familles" : "Free for families"}</span><span>✓ {fr ? "Pensé pour le Québec" : "Built for Quebec"}</span></div></div>
        <div className="mc-foot12-cols">
          <div><strong>{fr ? "Familles" : "Families"}</strong><Link href={`/${locale}/mon-besoin`}>{fr ? "Trouver une garde" : "Find childcare"}</Link><Link href={`/${locale}/garderies`}>{fr ? "Explorer les services" : "Browse providers"}</Link><Link href={`/${locale}/inscription?role=family`}>{fr ? "Créer mon espace famille" : "Create family space"}</Link><Link href={`/${locale}/espace-famille`}>{fr ? "Mon espace famille" : "My family space"}</Link></div>
          <div><strong>{fr ? "Services de garde" : "Providers"}</strong><Link href={`/${locale}/pour-les-services`}>{fr ? "Pourquoi rejoindre MyCoco" : "Why join MyCoco"}</Link><Link href={`/${locale}/inscription?role=provider`}>{fr ? "Créer mon espace service" : "Create provider space"}</Link><Link href={`/${locale}/espace-service`}>{fr ? "Mon espace service" : "My provider space"}</Link></div>
          <div><strong>MyCoco</strong><Link href={`/${locale}/comment-ca-marche`}>{fr ? "Comment ça marche" : "How it works"}</Link><Link href={`/${locale}/a-propos`}>{fr ? "À propos" : "About"}</Link><Link href={`/${locale}/confidentialite`}>{d.footer.privacy}</Link><Link href={`/${locale}/securite`}>{d.footer.security}</Link><Link href={`/${locale}/conditions`}>{d.footer.terms}</Link></div>
        </div>
      </div>
      <div className="mc-foot12-bottom"><div><span>© 2026 MyCoco</span><span>{d.footer.trust}</span></div></div>
    </footer>

    <style>{`
      .skip-link{position:absolute;left:-9999px}.skip-link:focus{left:10px;top:10px;z-index:999;background:#fff;padding:10px;border-radius:8px}.mc-nav12{position:sticky;top:0;z-index:120;background:#fffdf9;border-bottom:1px solid #e2e8e3}.mc-nav12-note{background:#102b23;color:#fff}.mc-nav12-note>div{width:min(1260px,calc(100% - 36px));height:34px;margin:auto;display:flex;align-items:center;justify-content:flex-end;gap:8px}.mc-nav12-note a{display:flex;align-items:center;gap:6px;color:#dce8e2}.mc-nav12-note a>span{font-size:11px}.mc-nav12-note b{font-size:8px}.mc-nav12-note small{font-size:7px;color:#99b0a7}.mc-nav12-note i{width:1px;height:12px;background:rgba(255,255,255,.18);margin:0 5px}.mc-nav12-main{background:rgba(255,253,249,.96);backdrop-filter:blur(18px)}.mc-nav12-wrap{width:min(1260px,calc(100% - 36px));height:72px;margin:auto;display:grid;grid-template-columns:auto 1fr auto;gap:30px;align-items:center}.mc-nav12-brand{display:inline-flex;align-items:center;gap:9px;color:#17352c;font-size:23px;font-weight:950;letter-spacing:-.065em}.mc-nav12-brand strong,.mc-foot12-brand>a span{color:#ef7e61}.mc-nav12-mark{display:grid;place-items:center;width:31px;height:31px;border-radius:10px 10px 10px 4px;background:#17352c;color:#fff;font-size:13px}.mc-nav12-links{display:flex;justify-content:center;align-items:center;gap:25px}.mc-nav12-links>a{display:grid;gap:2px;position:relative;color:#486057;white-space:nowrap}.mc-nav12-links>a small{font-size:6px;font-weight:950;letter-spacing:.1em;color:#97a29d}.mc-nav12-links>a b{font-size:9px;font-weight:880}.mc-nav12-links>a:after{content:"";position:absolute;left:0;right:100%;bottom:-9px;height:2px;background:#ef7e61;transition:right .18s ease}.mc-nav12-links>a:hover:after{right:0}.mc-nav12-links>a:hover b{color:#17352c}.mc-nav12-links>a.family small{color:#4d8a6d}.mc-nav12-links>a.provider small{color:#c36d56}.mc-nav12-actions{display:flex;align-items:center;gap:9px}.mc-nav12-signin{font-size:9px;font-weight:900;color:#334f45}.mc-nav12-lang{display:grid;place-items:center;width:31px;height:31px;border:1px solid #dbe3de;border-radius:999px;color:#60736a;font-size:7px;font-weight:950}.mc-nav12-cta{display:inline-flex;align-items:center;gap:10px;min-height:42px;padding:0 14px;border-radius:11px;background:#17352c;color:#fff;font-size:9px;font-weight:950;box-shadow:0 9px 24px rgba(23,53,44,.14)}.mc-nav12-cta:hover{background:#0d241d;transform:translateY(-1px)}.mc-nav12-mobile{display:none}.mc-foot12{background:#0d241d;color:#fff}.mc-foot12-wrap{width:min(1180px,calc(100% - 40px));margin:auto;display:grid;grid-template-columns:.8fr 1.2fr;gap:80px;padding:65px 0 52px}.mc-foot12-brand>a{font-size:26px;font-weight:950;letter-spacing:-.06em}.mc-foot12-brand p{margin:12px 0 18px;color:#c9d9d2;font-size:12px}.mc-foot12-brand>div{display:grid;gap:6px;color:#8fa69c;font-size:8px}.mc-foot12-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:38px}.mc-foot12-cols>div{display:grid;align-content:start;gap:9px}.mc-foot12-cols strong{font-size:8px;letter-spacing:.09em;color:#fff;margin-bottom:5px;text-transform:uppercase}.mc-foot12-cols a{color:#aec3ba;font-size:9px}.mc-foot12-cols a:hover{color:#fff}.mc-foot12-bottom{border-top:1px solid rgba(255,255,255,.1)}.mc-foot12-bottom>div{width:min(1180px,calc(100% - 40px));min-height:42px;margin:auto;display:flex;justify-content:space-between;align-items:center;color:#789087;font-size:7px}.mc-foot12-bottom>div{gap:20px}.mc-foot12-bottom span+span{margin-left:auto}@media(max-width:1110px){.mc-nav12-note,.mc-nav12-links,.mc-nav12-actions{display:none}.mc-nav12-wrap{height:66px;width:calc(100% - 28px);display:flex;justify-content:space-between}.mc-nav12-mobile{display:block;position:relative}.mc-nav12-mobile summary{list-style:none;width:43px;height:43px;border:1px solid #d8e1dc;border-radius:12px;background:#fff;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-nav12-mobile summary::-webkit-details-marker{display:none}.mc-nav12-mobile summary i{display:block;width:17px;height:1.5px;background:#17352c}.mc-nav12-panel{position:absolute;right:0;top:53px;width:min(380px,calc(100vw - 28px));max-height:82vh;overflow:auto;padding:10px;background:#fff;border:1px solid #dfe6e2;border-radius:18px;box-shadow:0 28px 70px rgba(23,53,44,.18)}.mc-nav12-panel-title{padding:10px 10px 7px;color:#93a099;font-size:7px;font-weight:950;letter-spacing:.13em}.mc-nav12-panel>a:not(.mc-nav12-role){display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:10px;color:#17352c;font-size:10px;font-weight:850}.mc-nav12-role{display:grid;grid-template-columns:34px 1fr auto;gap:10px;align-items:center;padding:14px;border-radius:13px;margin-bottom:7px;color:#17352c}.mc-nav12-role>span{font-size:18px}.mc-nav12-role strong,.mc-nav12-role small{display:block}.mc-nav12-role strong{font-size:11px}.mc-nav12-role small{font-size:8px;color:#6c7d75;margin-top:3px}.mc-nav12-role.family{background:#edf6f1}.mc-nav12-role.provider{background:#fff0e9}.mc-foot12-wrap{grid-template-columns:1fr;gap:38px}}@media(max-width:650px){.mc-nav12-brand{font-size:21px}.mc-foot12-wrap{width:calc(100% - 28px);padding:48px 0}.mc-foot12-cols{grid-template-columns:1fr;gap:28px}.mc-foot12-bottom>div{width:calc(100% - 28px);align-items:flex-start;padding:13px 0;flex-direction:column}.mc-foot12-bottom span+span{margin-left:0}}
    `}</style>
  </>;
}

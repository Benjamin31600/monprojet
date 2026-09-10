import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import OnboardingSignup from "@/components/OnboardingSignup";

export default async function SignupPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const q = await searchParams;
  const role = q.role === "provider" ? "provider" : "family";
  const returnTo = typeof q.returnTo === "string" ? q.returnTo : `/${locale}/${role === "provider" ? "espace-service" : "espace-famille"}`;
  const fr = locale === "fr";
  const family = role === "family";

  return <main className="signup-new">
    <div className="signup-new-shell">
      <header className="signup-new-top">
        <Link href={`/${locale}`} className="signup-new-logo">my<span>coco</span></Link>
        <Link href={`/${locale}/connexion?returnTo=${encodeURIComponent(returnTo)}`} className="signup-new-login">{fr ? "J'ai déjà un compte" : "I already have an account"} →</Link>
      </header>

      <div className="signup-new-grid">
        <section className="signup-new-intro">
          <span>{family ? (fr ? "POUR LES FAMILLES" : "FOR FAMILIES") : (fr ? "POUR LES SERVICES DE GARDE" : "FOR CHILDCARE PROVIDERS")}</span>
          <h1>{family ? (fr ? "Votre recherche mérite un espace à vous." : "Your childcare search deserves a space of its own.") : (fr ? "Votre service mérite une vraie présence locale." : "Your service deserves a real local presence.")}</h1>
          <p>{family ? (fr ? "Décrivez votre famille, votre secteur et ce qui compte pour vous. MyCoco conserve ces informations pour que votre recherche reste personnelle et évolutive." : "Tell us about your family, your area and what matters to you. MyCoco keeps this information so your search stays personal and flexible.") : (fr ? "Présentez votre service une seule fois. Les familles pourront mieux comprendre votre offre et vous pourrez faire évoluer votre fiche depuis votre espace." : "Present your service once. Families can better understand your offer, and you can keep improving your page from your space.")}</p>
          <div className="signup-new-points">
            <div><b>01</b><strong>{fr ? "Créer" : "Create"}</strong><span>{family ? (fr ? "Votre espace famille" : "Your family space") : (fr ? "Votre espace service" : "Your provider space")}</span></div>
            <div><b>02</b><strong>{fr ? "Personnaliser" : "Personalize"}</strong><span>{family ? (fr ? "Votre famille et vos préférences" : "Family and preferences") : (fr ? "Votre offre et vos informations" : "Offer and information")}</span></div>
            <div><b>03</b><strong>{fr ? "Retrouver" : "Return"}</strong><span>{family ? (fr ? "Recherches, alertes, favoris" : "Searches, alerts, favourites") : (fr ? "Visibilité, messages, demandes" : "Visibility, messages, requests")}</span></div>
          </div>
          <div className="signup-new-switch"><span>{fr ? "Vous n'êtes pas au bon endroit ?" : "Not in the right place?"}</span><Link className={family ? "active" : ""} href={`/${locale}/inscription?role=family`}>{fr ? "Je suis une famille" : "I'm a family"}</Link><Link className={!family ? "active" : ""} href={`/${locale}/inscription?role=provider`}>{fr ? "Je suis un service" : "I'm a provider"}</Link></div>
        </section>
        <section>
          <OnboardingSignup locale={locale} role={role} returnTo={returnTo} />
        </section>
      </div>
    </div>
    <style>{`.signup-new{min-height:calc(100vh - 76px);background:linear-gradient(125deg,#fcf6ed 0%,#eef4f0 58%,#f8e7df 100%);padding:34px 0 88px;color:#19213e}.signup-new-shell{width:min(1180px,calc(100% - 40px));margin:auto}.signup-new-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:48px}.signup-new-logo{font-size:25px;font-weight:950;letter-spacing:-.07em;color:#1d2240}.signup-new-logo span{color:#e87858}.signup-new-login{font-size:10px;font-weight:900;color:#626b7f}.signup-new-grid{display:grid;grid-template-columns:minmax(0,1fr) 540px;gap:70px;align-items:center}.signup-new-intro{max-width:650px}.signup-new-intro>span{font-size:10px;font-weight:950;letter-spacing:.16em;color:#a15c4c}.signup-new-intro h1{font-size:clamp(46px,6vw,79px);line-height:.93;letter-spacing:-.075em;margin:16px 0 22px}.signup-new-intro>p{max-width:590px;color:#70758a;font-size:17px;line-height:1.7;margin:0}.signup-new-points{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #dad6ce;border-bottom:1px solid #dad6ce;margin-top:32px}.signup-new-points>div{display:grid;gap:4px;padding:16px 10px 16px 0}.signup-new-points b{font-size:9px;color:#bb735d}.signup-new-points strong{font-size:11px;color:#27304a}.signup-new-points span{font-size:8px;line-height:1.35;color:#858a9a}.signup-new-switch{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:24px;color:#818697;font-size:9px;font-weight:800}.signup-new-switch a{padding:8px 12px;border-radius:999px;color:#657083;background:rgba(255,255,255,.55);border:1px solid rgba(216,211,203,.8)}.signup-new-switch a.active{background:#1d2240;color:#fff;border-color:#1d2240}@media(max-width:980px){.signup-new-grid{grid-template-columns:1fr;gap:38px}.signup-new-intro{max-width:850px}.signup-new-grid>section:last-child{max-width:620px;width:100%}}@media(max-width:600px){.signup-new-shell{width:calc(100% - 28px)}.signup-new-top{margin-bottom:30px}.signup-new-intro h1{font-size:45px}.signup-new-intro>p{font-size:15px}.signup-new-points{grid-template-columns:1fr}.signup-new-grid{gap:28px}}`}</style>
  </main>;
}

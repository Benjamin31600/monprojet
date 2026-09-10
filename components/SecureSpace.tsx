"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type Props = { locale: "fr" | "en"; audience: "family" | "provider" };

export default function SecureSpace({ locale, audience }: Props) {
  const fr = locale === "fr";
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div className="mc-secure-state">{fr ? "Vérification de votre session sécurisée…" : "Checking your secure session…"}</div>;
  if (!session) return <div className="mc-secure-state"><span>🔒</span><h1>{fr ? "Cet espace est privé." : "This space is private."}</h1><p>{fr ? "Connectez-vous pour accéder à vos informations MyCoco." : "Sign in to access your MyCoco information."}</p><Link href={`/${locale}/connexion?type=${audience}`}>{fr ? "Me connecter" : "Sign in"} →</Link></div>;

  const name = session.user?.name || (fr ? "Votre espace" : "Your space");
  const email = session.user?.email || "";

  async function logout() {
    await authClient.signOut();
    window.location.assign(`/${locale}`);
  }

  const familyCards = [
    [fr ? "Ma recherche active" : "My active search", fr ? "Retrouvez et ajustez le besoin de garde de votre famille." : "Review and adjust your family's childcare need.", `/${locale}/mon-besoin`, fr ? "Modifier ma recherche" : "Edit search"],
    [fr ? "Mes favoris" : "My favourites", fr ? "Gardez les services que vous souhaitez comparer." : "Keep the providers you want to compare.", `/${locale}/garderies`, fr ? "Explorer les services" : "Browse providers"],
    [fr ? "Mes alertes" : "My alerts", fr ? "Soyez informé lorsqu'une solution pertinente apparaît." : "Get notified when a relevant solution appears.", "#alerts", fr ? "Gérer mes alertes" : "Manage alerts"],
  ];
  const providerCards = [
    [fr ? "Ma fiche publique" : "My public listing", fr ? "Complétez les informations visibles par les familles." : "Complete the information families can see.", `/${locale}/pour-les-services`, fr ? "Compléter ma fiche" : "Complete listing"],
    [fr ? "Photos et présentation" : "Photos and presentation", fr ? "Ajoutez uniquement des photos que vous êtes autorisé à publier." : "Add only photos you are authorized to publish.", "#photos", fr ? "Gérer mes photos" : "Manage photos"],
    [fr ? "Demandes reçues" : "Received requests", fr ? "Suivez les familles qui ont manifesté un intérêt pour votre service." : "Track families who expressed interest in your service.", "#leads", fr ? "Voir mes demandes" : "View requests"],
  ];
  const cards = audience === "family" ? familyCards : providerCards;

  return <main className="mc-secure-space">
    <aside className="mc-space-side"><Link className="mc-space-logo" href={`/${locale}`}>my<span>coco</span></Link><div className="mc-space-role">{audience === "family" ? "👨‍👩‍👧" : "🏫"}<span>{audience === "family" ? (fr ? "Espace famille" : "Family space") : (fr ? "Espace service" : "Provider space")}</span></div><nav>{cards.map(([title,,,href]) => <Link key={title} href={href}>{title}</Link>)}</nav><button onClick={logout}>{fr ? "Se déconnecter" : "Sign out"}</button></aside>
    <section className="mc-space-main"><header><div><span>{fr ? "ESPACE SÉCURISÉ" : "SECURE SPACE"}</span><h1>{fr ? `Bonjour ${name.split(" ")[0]}.` : `Hello ${name.split(" ")[0]}.`}</h1><p>{email}</p></div><div className="mc-session-badge">🔒 {fr ? "Session protégée" : "Protected session"}</div></header><div className="mc-space-grid">{cards.map(([title,text,href,cta]) => <article key={title}><span>{audience === "family" ? "◌" : "✦"}</span><h2>{title}</h2><p>{text}</p><Link href={href}>{cta} →</Link></article>)}</div><div className="mc-space-security"><b>{fr ? "Vos données ne sont pas publiques" : "Your data is not public"}</b><p>{fr ? "Les informations de compte sont séparées des fiches publiques. Les données sensibles ne doivent jamais être affichées dans l'annuaire. Vous pourrez demander l'accès, la correction ou la suppression de vos renseignements." : "Account information is separated from public listings. Sensitive data must never appear in the directory. You can request access, correction or deletion of your information."}</p></div></section>
    <style>{`.mc-secure-space{min-height:calc(100vh - 74px);display:grid;grid-template-columns:245px 1fr;background:#f7f4ef;color:#2d2925}.mc-space-side{background:#173f36;color:#fff;padding:28px 20px;display:flex;flex-direction:column;min-height:calc(100vh - 74px)}.mc-space-logo{font-size:23px;font-weight:950;letter-spacing:-.06em}.mc-space-logo span{color:#a6d0bb}.mc-space-role{display:flex;gap:9px;align-items:center;margin:34px 0 18px;padding:12px;border-radius:12px;background:rgba(255,255,255,.08);font-size:12px;font-weight:850}.mc-space-side nav{display:grid;gap:5px}.mc-space-side nav a{padding:11px 12px;border-radius:10px;color:#dce9e3;font-size:11px;font-weight:750}.mc-space-side nav a:hover{background:rgba(255,255,255,.07);color:#fff}.mc-space-side button{margin-top:auto;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;border-radius:10px;padding:11px;cursor:pointer}.mc-space-main{padding:45px clamp(22px,5vw,70px)}.mc-space-main>header{display:flex;justify-content:space-between;gap:25px;align-items:start}.mc-space-main header span{font-size:10px;font-weight:900;letter-spacing:.12em;color:#8e5d43}.mc-space-main h1{font-size:clamp(36px,5vw,58px);letter-spacing:-.06em;line-height:1;margin:10px 0 7px}.mc-space-main header p{margin:0;color:#7f776f;font-size:12px}.mc-session-badge{background:#e7f1ec;color:#255244;border-radius:999px;padding:9px 12px;font-size:10px;font-weight:850}.mc-space-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}.mc-space-grid article{background:#fff;border:1px solid #e4ded4;border-radius:20px;padding:23px}.mc-space-grid article>span{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#f2ebe2;color:#8e5d43}.mc-space-grid h2{font-size:20px;letter-spacing:-.03em;margin:24px 0 8px}.mc-space-grid p{color:#776f67;font-size:12px;line-height:1.6;min-height:58px}.mc-space-grid a{font-size:11px;font-weight:900;color:#1e5748}.mc-space-security{margin-top:22px;padding:18px;border-radius:16px;background:#eef4f1;border:1px solid #d9e7e0}.mc-space-security b{font-size:12px;color:#244b40}.mc-space-security p{font-size:10px;line-height:1.6;color:#60736c;margin:5px 0 0}.mc-secure-state{min-height:60vh;display:grid;place-items:center;align-content:center;text-align:center;gap:9px;padding:30px;background:#f7f4ef;color:#2d2925}.mc-secure-state>span{font-size:28px}.mc-secure-state h1{font-size:36px;letter-spacing:-.05em;margin:0}.mc-secure-state p{color:#746c65;margin:0}.mc-secure-state a{margin-top:8px;background:#173f36;color:#fff;padding:12px 16px;border-radius:11px;font-weight:850}@media(max-width:850px){.mc-secure-space{grid-template-columns:1fr}.mc-space-side{min-height:auto}.mc-space-side nav{display:none}.mc-space-side button{margin-top:20px}.mc-space-grid{grid-template-columns:1fr}.mc-space-main>header{flex-direction:column}.mc-session-badge{align-self:flex-start}}`}</style>
  </main>;
}

import Link from "next/link";
import { getCurrentFamily } from "@/lib/family-auth";
import { getProviderAccount } from "@/lib/providerAuth";

type Props = { locale: "fr" | "en"; audience: "family" | "provider" };

function Mark({ label }: { label: string }) {
  return <span className="mc-space-mark" aria-hidden="true">{label}</span>;
}

export default async function SecureSpace({ locale, audience }: Props) {
  const fr = locale === "fr";
  const account = audience === "family" ? await getCurrentFamily() : await getProviderAccount();

  if (!account) {
    return <main className="mc-secure-state">
      <Mark label={audience === "family" ? "F" : "S"} />
      <h1>{fr ? "Cet espace est privé." : "This space is private."}</h1>
      <p>{fr ? "Connectez-vous avec le compte correspondant pour retrouver votre espace MyCoco." : "Sign in with the matching account to access your MyCoco space."}</p>
      <Link href={`/${locale}/connexion?role=${audience}`}>{fr ? "Me connecter" : "Sign in"} <span>→</span></Link>
    </main>;
  }

  const name = audience === "family"
    ? String(account.first_name || (fr ? "votre famille" : "your family"))
    : String(account.name || (fr ? "votre service" : "your provider"));
  const email = String(account.email || "");

  const familyCards = [
    [fr ? "Mes recherches" : "My searches", fr ? "Retrouvez vos besoins de garde, leur ancienneté et relancez une recherche quand nécessaire." : "Review your childcare needs, how long they have been active and restart a search when needed.", `/${locale}/mon-besoin`, fr ? "Créer ou relancer une recherche" : "Create or restart a search"],
    [fr ? "Mes favoris" : "My favourites", fr ? "Gardez les annonces que vous souhaitez comparer avant de contacter un service." : "Keep listings you want to compare before contacting a provider.", `/${locale}/garderies`, fr ? "Voir les annonces" : "View listings"],
    [fr ? "Mes alertes" : "My alerts", fr ? "Recevez les nouvelles annonces et disponibilités correspondant à votre besoin." : "Receive new listings and openings matching your needs.", `/${locale}/mon-besoin`, fr ? "Gérer mon besoin" : "Manage my need"],
  ];

  const providerCards = [
    [fr ? "Mon annonce" : "My listing", fr ? "Présentez votre service comme une vraie annonce : description, horaires, tarifs, activités et disponibilités." : "Present your service as a real listing: description, schedule, pricing, activities and openings.", `/${locale}/pour-les-services`, fr ? "Compléter mon annonce" : "Complete my listing"],
    [fr ? "Photos" : "Photos", fr ? "Ajoutez des photos autorisées qui montrent votre environnement et ce que vous proposez aux enfants." : "Add authorized photos showing your environment and what you offer children.", `/${locale}/pour-les-services`, fr ? "Gérer mes photos" : "Manage photos"],
    [fr ? "Demandes reçues" : "Received requests", fr ? "Centralisez les familles et professionnels intéressés par votre annonce." : "Centralize families and professionals interested in your listing.", `/${locale}/pour-les-services`, fr ? "Voir mes demandes" : "View requests"],
  ];
  const cards = audience === "family" ? familyCards : providerCards;
  const logoutAction = audience === "family" ? `/api/famille/deconnexion?locale=${locale}` : `/api/providers/logout?locale=${locale}`;

  return <main className="mc-secure-space">
    <aside className="mc-space-side">
      <Link className="mc-space-logo" href={`/${locale}`}>my<span>coco</span></Link>
      <div className="mc-space-role"><Mark label={audience === "family" ? "F" : "S"} /><div><small>{fr ? "MON ESPACE" : "MY SPACE"}</small><strong>{audience === "family" ? (fr ? "Famille" : "Family") : (fr ? "Service de garde" : "Childcare provider")}</strong></div></div>
      <nav>{cards.map(([title,,,href]) => <Link key={title} href={href}>{title}</Link>)}</nav>
      <form action={logoutAction} method="post"><button type="submit">{fr ? "Se déconnecter" : "Sign out"}</button></form>
    </aside>
    <section className="mc-space-main">
      <header><div><span>{fr ? "ESPACE MYCOCO" : "MYCOCO SPACE"}</span><h1>{fr ? `Bonjour ${name}.` : `Hello ${name}.`}</h1><p>{email}</p></div><div className="mc-session-badge">{fr ? "Session active" : "Active session"}</div></header>
      <div className="mc-space-intro"><strong>{audience === "family" ? (fr ? "Votre recherche vous suit, pas l’inverse." : "Your search follows you, not the other way around.") : (fr ? "Votre annonce doit donner envie de vous contacter." : "Your listing should make families want to contact you.")}</strong><p>{audience === "family" ? (fr ? "Centralisez ici vos besoins, vos annonces préférées et vos futures alertes." : "Keep your needs, favourite listings and future alerts in one place.") : (fr ? "Mettez en avant votre approche, vos activités, vos horaires, vos coûts et vos places disponibles." : "Highlight your approach, activities, hours, pricing and openings.")}</p></div>
      <div className="mc-space-grid">{cards.map(([title,text,href,cta], index) => <article key={title}><b>0{index+1}</b><h2>{title}</h2><p>{text}</p><Link href={href}>{cta} <span>→</span></Link></article>)}</div>
      <div className="mc-space-security"><b>{fr ? "Compte privé, annonce publique maîtrisée" : "Private account, controlled public listing"}</b><p>{fr ? "Les données de connexion restent privées. Seules les informations que le service choisit de publier doivent apparaître dans son annonce." : "Login data stays private. Only information the provider chooses to publish should appear on its listing."}</p></div>
    </section>
    <style>{`
      .mc-secure-space{min-height:calc(100vh - 74px);display:grid;grid-template-columns:260px 1fr;background:#f7fbfa;color:#0d3b3f}.mc-space-side{background:#0d3b3f;color:#fff;padding:30px 22px;display:flex;flex-direction:column;min-height:calc(100vh - 74px)}.mc-space-logo{font-size:25px;font-weight:950;letter-spacing:-.06em}.mc-space-logo span{color:#5ed2c9}.mc-space-role{display:flex;gap:12px;align-items:center;margin:36px 0 22px;padding:14px;border:1px solid rgba(255,255,255,.11);border-radius:15px;background:rgba(255,255,255,.05)}.mc-space-role small,.mc-space-role strong{display:block}.mc-space-role small{font-size:9px;letter-spacing:.1em;color:#9bc6c3}.mc-space-role strong{font-size:14px;margin-top:2px}.mc-space-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#12a9a2;color:#fff;font-weight:950;font-size:15px;flex:0 0 auto}.mc-space-side nav{display:grid;gap:6px}.mc-space-side nav a{padding:12px 13px;border-radius:10px;color:#d6e8e7;font-size:12px;font-weight:800}.mc-space-side nav a:hover{background:rgba(255,255,255,.07);color:#fff}.mc-space-side form{margin-top:auto}.mc-space-side button{width:100%;border:1px solid rgba(255,255,255,.18);background:transparent;color:#fff;border-radius:11px;padding:12px;cursor:pointer;font-weight:800}.mc-space-main{padding:48px clamp(24px,5vw,72px)}.mc-space-main>header{display:flex;justify-content:space-between;gap:25px;align-items:start}.mc-space-main header>div>span{font-size:10px;font-weight:950;letter-spacing:.13em;color:#078b87}.mc-space-main h1{font-size:clamp(38px,5vw,60px);letter-spacing:-.06em;line-height:1;margin:10px 0 8px;color:#0d3b3f}.mc-space-main header p{margin:0;color:#6d7f80;font-size:13px}.mc-session-badge{background:#ddf5f1;color:#0c6f6b;border-radius:999px;padding:10px 13px;font-size:10px;font-weight:900}.mc-space-intro{margin-top:34px;max-width:760px}.mc-space-intro strong{font-size:22px;letter-spacing:-.03em}.mc-space-intro p{color:#657b7c;line-height:1.65}.mc-space-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:30px}.mc-space-grid article{background:#fff;border:1px solid #d8ebe8;border-radius:20px;padding:24px}.mc-space-grid article>b{font-size:10px;color:#078b87;letter-spacing:.08em}.mc-space-grid h2{font-size:21px;letter-spacing:-.03em;margin:28px 0 8px;color:#0d3b3f}.mc-space-grid p{color:#687c7c;font-size:13px;line-height:1.6;min-height:82px}.mc-space-grid a{font-size:12px;font-weight:900;color:#078b87}.mc-space-security{margin-top:24px;padding:20px;border-radius:16px;background:#eaf7f5;border:1px solid #d3ebe7}.mc-space-security b{font-size:13px}.mc-space-security p{font-size:11px;line-height:1.6;color:#5f7776;margin:5px 0 0}.mc-secure-state{min-height:62vh;display:grid;place-items:center;align-content:center;text-align:center;gap:12px;padding:30px;background:#f7fbfa;color:#0d3b3f}.mc-secure-state h1{font-size:38px;letter-spacing:-.05em;margin:4px 0}.mc-secure-state p{max-width:560px;color:#677b7b;margin:0}.mc-secure-state a{margin-top:8px;background:#12a9a2;color:#fff;padding:13px 17px;border-radius:12px;font-weight:900}@media(max-width:900px){.mc-secure-space{grid-template-columns:1fr}.mc-space-side{min-height:auto}.mc-space-side nav{display:none}.mc-space-side form{margin-top:20px}.mc-space-grid{grid-template-columns:1fr}.mc-space-main>header{flex-direction:column}.mc-session-badge{align-self:flex-start}.mc-space-grid p{min-height:0}}
    `}</style>
  </main>;
}

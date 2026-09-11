import Link from "next/link";
import { getCurrentFamily } from "@/lib/family-auth";
import { getProviderAccount } from "@/lib/providerAuth";

type Props = { locale: "fr" | "en"; audience: "family" | "provider" };

function Mark({ label }: { label: string }) { return <span className="mc-space-mark" aria-hidden="true">{label}</span>; }

export default async function SecureSpace({ locale, audience }: Props) {
  const fr = locale === "fr";
  const account: any = audience === "family" ? await getCurrentFamily() : await getProviderAccount();

  if (!account) return <main className="mc-secure-state"><Mark label={audience === "family" ? "F" : "S"}/><h1>{fr ? "Cet espace est privé." : "This space is private."}</h1><p>{fr ? "Connectez-vous pour retrouver votre profil, vos informations et vos actions MyCoco." : "Sign in to access your profile, information and MyCoco actions."}</p><Link href={`/${locale}/connexion?role=${audience}`}>{fr ? "Me connecter" : "Sign in"} <span>→</span></Link><style>{stateCss}</style></main>;

  const name = audience === "family" ? String(account.first_name || (fr ? "votre famille" : "your family")) : String(account.name || (fr ? "votre service" : "your provider"));
  const email = String(account.email || "");
  const logoutAction = audience === "family" ? `/api/famille/deconnexion?locale=${locale}` : `/api/providers/logout?locale=${locale}`;

  const familyCards = [
    [fr ? "Profil de mon enfant" : "My child profile", fr ? "Prénom, allergies, repas, siestes, activités préférées, langues et habitudes utiles." : "Name, allergies, meals, naps, favourite activities, languages and useful routines.", `/${locale}/espace-famille`, fr ? "Compléter le profil" : "Complete profile"],
    [fr ? "Mes critères" : "My criteria", fr ? "Distance, horaires, âge, date de début et préférences utilisées dans le matching." : "Distance, hours, age, start date and preferences used for matching.", `/${locale}/mon-besoin`, fr ? "Mettre à jour mes critères" : "Update criteria"],
    [fr ? "Mes meilleurs matchs" : "My best matches", fr ? "Comparez les services par compatibilité, distance et places annoncées." : "Compare providers by compatibility, distance and announced openings.", `/${locale}/garderies`, fr ? "Voir mes matchs" : "View matches"],
    [fr ? "Mes favoris" : "My favourites", fr ? "Gardez les services que vous voulez comparer ou contacter plus tard." : "Save providers you want to compare or contact later.", `/${locale}/garderies`, fr ? "Voir mes favoris" : "View favourites"],
  ];

  const providerCards = [
    [fr ? "Places disponibles" : "Available spots", fr ? "Mettez à jour le nombre de places restantes dès qu’un enfant arrive ou quitte le service." : "Update remaining spots as soon as a child joins or leaves your service.", `/${locale}/pour-les-services`, fr ? "Mettre à jour les places" : "Update openings"],
    [fr ? "Mon profil professionnel" : "My professional profile", fr ? "Horaires, âges accueillis, langues, animaux, repas, activités, tarifs et particularités." : "Hours, ages, languages, pets, meals, activities, pricing and special features.", `/${locale}/pour-les-services`, fr ? "Compléter mon profil" : "Complete profile"],
    [fr ? "Familles compatibles" : "Matching families", fr ? "Priorisez les familles dont les besoins correspondent réellement à votre offre." : "Prioritize families whose needs genuinely match your offer.", `/${locale}/pour-les-services`, fr ? "Voir les familles" : "View families"],
    [fr ? "Enfants accueillis" : "Enrolled children", fr ? "Centralisez les informations utiles que les parents choisissent de partager pour l’accueil quotidien." : "Keep useful information parents choose to share for daily childcare.", `/${locale}/pour-les-services`, fr ? "Gérer les enfants" : "Manage children"],
  ];

  const cards = audience === "family" ? familyCards : providerCards;

  return <main className="mc-secure-space">
    <aside className="mc-space-side">
      <Link className="mc-space-logo" href={`/${locale}`}>my<span>coco</span></Link>
      <div className="mc-space-role"><Mark label={audience === "family" ? "F" : "S"}/><div><small>{fr ? "MON ESPACE" : "MY SPACE"}</small><strong>{audience === "family" ? (fr ? "Famille" : "Family") : (fr ? "Service de garde" : "Childcare provider")}</strong></div></div>
      <nav>{cards.map(([title,,,href]) => <Link key={title} href={href}>{title}</Link>)}</nav>
      <form action={logoutAction} method="post"><button type="submit">{fr ? "Se déconnecter" : "Sign out"}</button></form>
    </aside>

    <section className="mc-space-main">
      <header><div><span>{fr ? "ESPACE MYCOCO" : "MYCOCO SPACE"}</span><h1>{fr ? `Bonjour ${name}.` : `Hello ${name}.`}</h1><p>{email}</p></div><div className="mc-session-badge">{fr ? "Session active" : "Active session"}</div></header>

      {audience === "family" ? <div className="mc-space-hero family">
        <div><span>{fr ? "VOTRE MATCHING" : "YOUR MATCHING"}</span><strong>94%</strong><small>{fr ? "meilleur résultat actuel" : "current best result"}</small></div>
        <div><b>{fr ? "Ce qui compte" : "What matters"}</b><p>{fr ? "2,4 km · horaires compatibles · français · sans animaux · 2 places annoncées" : "2.4 km · compatible hours · French · no pets · 2 announced openings"}</p></div>
      </div> : <div className="mc-space-hero provider">
        <div><span>{fr ? "CAPACITÉ ACTUELLE" : "CURRENT CAPACITY"}</span><strong>2</strong><small>{fr ? "places restantes" : "spots remaining"}</small></div>
        <div><b>{fr ? "Une information à garder fraîche" : "Keep this information fresh"}</b><p>{fr ? "Dès qu’un enfant est accueilli, ajustez votre capacité pour que les familles voient une information utile." : "As soon as a child joins, adjust capacity so families see useful information."}</p></div>
      </div>}

      <div className="mc-space-grid">{cards.map(([title,text,href,cta], index) => <article key={title}><b>0{index+1}</b><h2>{title}</h2><p>{text}</p><Link href={href}>{cta} <span>→</span></Link></article>)}</div>

      <div className="mc-space-security"><b>{audience === "family" ? (fr ? "Vos informations restent sous votre contrôle" : "Your information stays under your control") : (fr ? "Compte privé, profil public maîtrisé" : "Private account, controlled public profile")}</b><p>{audience === "family" ? (fr ? "Les informations sensibles concernant votre enfant ne doivent être partagées avec un service que lorsque vous le choisissez." : "Sensitive information about your child should only be shared with a provider when you choose to do so.") : (fr ? "Vous choisissez les informations professionnelles visibles par les familles. Les données privées de votre compte restent séparées." : "You choose which professional information families can see. Private account data stays separate.")}</p></div>
    </section>
    <style>{spaceCss}</style>
  </main>;
}

const stateCss = `.mc-secure-state{min-height:62vh;display:grid;place-items:center;align-content:center;text-align:center;gap:12px;padding:30px;background:#fffaf4;color:#153b35}.mc-secure-state .mc-space-mark{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:#153b35;color:#fff;font-weight:950}.mc-secure-state h1{font-size:38px;letter-spacing:-.05em;margin:4px 0}.mc-secure-state p{max-width:560px;color:#677b73;margin:0}.mc-secure-state a{margin-top:8px;background:#153b35;color:#fff;padding:13px 17px;border-radius:12px;font-weight:900}`;
const spaceCss = `.mc-secure-space{min-height:calc(100vh - 72px);display:grid;grid-template-columns:260px 1fr;background:#f7f8f5;color:#153b35}.mc-space-side{background:#0e2c27;color:#fff;padding:30px 22px;display:flex;flex-direction:column;min-height:calc(100vh - 72px)}.mc-space-logo{font-size:25px;font-weight:950;letter-spacing:-.06em}.mc-space-logo span{color:#f07b63}.mc-space-role{display:flex;gap:12px;align-items:center;margin:36px 0 22px;padding:14px;border:1px solid rgba(255,255,255,.11);border-radius:15px;background:rgba(255,255,255,.05)}.mc-space-role small,.mc-space-role strong{display:block}.mc-space-role small{font-size:9px;letter-spacing:.1em;color:#9db4aa}.mc-space-role strong{font-size:14px;margin-top:2px}.mc-space-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#f07b63;color:#fff;font-weight:950;font-size:15px;flex:0 0 auto}.mc-space-side nav{display:grid;gap:6px}.mc-space-side nav a{padding:12px 13px;border-radius:10px;color:#d4e1db;font-size:11px;font-weight:800}.mc-space-side nav a:hover{background:rgba(255,255,255,.07);color:#fff}.mc-space-side form{margin-top:auto}.mc-space-side button{width:100%;border:1px solid rgba(255,255,255,.18);background:transparent;color:#fff;border-radius:11px;padding:12px;cursor:pointer;font-weight:800}.mc-space-main{padding:48px clamp(24px,5vw,72px)}.mc-space-main>header{display:flex;justify-content:space-between;gap:25px;align-items:start}.mc-space-main header>div>span{font-size:10px;font-weight:950;letter-spacing:.13em;color:#58806f}.mc-space-main h1{font-size:clamp(38px,5vw,60px);letter-spacing:-.06em;line-height:1;margin:10px 0 8px}.mc-space-main header p{margin:0;color:#6d7f78;font-size:13px}.mc-session-badge{background:#e4f4ec;color:#336b56;border-radius:999px;padding:10px 13px;font-size:10px;font-weight:900}.mc-space-hero{display:grid;grid-template-columns:180px 1fr;gap:24px;align-items:center;margin-top:34px;padding:23px;border-radius:20px}.mc-space-hero.family{background:#e7f4ed}.mc-space-hero.provider{background:#fff0e9}.mc-space-hero>div:first-child{padding-right:20px;border-right:1px solid rgba(21,59,53,.13)}.mc-space-hero span,.mc-space-hero strong,.mc-space-hero small{display:block}.mc-space-hero span{font-size:8px;font-weight:950;letter-spacing:.1em;color:#638175}.mc-space-hero strong{font-size:48px;line-height:1;margin:7px 0 3px;letter-spacing:-.06em}.mc-space-hero small{font-size:8px;color:#768a82}.mc-space-hero b{font-size:13px}.mc-space-hero p{margin:5px 0 0;color:#5d746b;font-size:11px;line-height:1.5}.mc-space-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px;margin-top:25px}.mc-space-grid article{background:#fff;border:1px solid #dfe7e2;border-radius:20px;padding:24px}.mc-space-grid article>b{font-size:10px;color:#6b8d7d;letter-spacing:.08em}.mc-space-grid h2{font-size:21px;letter-spacing:-.03em;margin:25px 0 8px}.mc-space-grid p{color:#687c74;font-size:13px;line-height:1.6;min-height:62px}.mc-space-grid a{font-size:11px;font-weight:900;color:#3f755f}.mc-space-security{margin-top:24px;padding:20px;border-radius:16px;background:#fff;border:1px solid #dfe7e2}.mc-space-security b{font-size:13px}.mc-space-security p{font-size:11px;line-height:1.6;color:#5f7770;margin:5px 0 0}@media(max-width:900px){.mc-secure-space{grid-template-columns:1fr}.mc-space-side{min-height:auto}.mc-space-side nav{display:none}.mc-space-side form{margin-top:20px}.mc-space-grid{grid-template-columns:1fr}.mc-space-main>header{flex-direction:column}.mc-session-badge{align-self:flex-start}}@media(max-width:600px){.mc-space-hero{grid-template-columns:1fr}.mc-space-hero>div:first-child{border-right:0;border-bottom:1px solid rgba(21,59,53,.13);padding:0 0 17px}.mc-space-main{padding:30px 18px}}`;

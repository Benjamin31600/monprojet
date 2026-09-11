import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { neon } from "@neondatabase/serverless";
import { isLocale } from "@/lib/i18n";
import { getCurrentFamily } from "@/lib/family-auth";

export const dynamic = "force-dynamic";

function db() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL;
  return url ? neon(url) : null;
}

function ageLabel(value: string, fr: boolean) {
  if (value === "0-18") return fr ? "0–18 mois" : "0–18 months";
  if (value === "18-36") return fr ? "18–36 mois" : "18–36 months";
  if (value === "3-5") return fr ? "3–5 ans" : "3–5 years";
  return fr ? "5 ans et +" : "5+ years";
}

export default async function FamilySpacePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const { locale } = await params;
  const q = await searchParams;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";
  const family = await getCurrentFamily();
  if (!family) redirect(`/${locale}/connexion?role=family`);

  const sql = db();
  let searches: any[] = [];
  let favoriteCount = 0;
  let childCount = 0;
  if (sql) {
    try {
      searches = await sql`SELECT id, city_or_postal, age_range, childcare_type, desired_start_date, status, created_at FROM family_searches WHERE family_id = ${family.id} ORDER BY created_at DESC LIMIT 5`;
      const favorites = await sql`SELECT count(*)::int AS count FROM family_favorites WHERE family_id = ${family.id}`;
      const children = await sql`SELECT count(*)::int AS count FROM children WHERE family_id = ${family.id}`;
      favoriteCount = Number(favorites[0]?.count || 0);
      childCount = Number(children[0]?.count || 0);
    } catch (error) { console.error("MyCoco family dashboard data error", error); }
  }

  const profileBits = [family.city_or_postal, family.phone, childCount > 0 ? "children" : ""].filter(Boolean).length;
  const profilePercent = Math.round(40 + (profileBits / 3) * 60);
  const isNew = q.nouveau === "1";

  return <main className="fam13">
    <section className="fam13-top"><div className="fam13-wrap">
      {isNew && <div className="fam13-welcome"><span>✓</span><div><b>{fr ? "Votre espace famille est créé." : "Your family space is ready."}</b><p>{fr ? "Bienvenue sur MyCoco. Votre compte est actif et votre confirmation a été préparée par courriel lorsque l’envoi transactionnel est configuré." : "Welcome to MyCoco. Your account is active and your confirmation is prepared by email when transactional sending is configured."}</p></div></div>}
      <div className="fam13-head"><div><span>{fr ? "ESPACE FAMILLE" : "FAMILY SPACE"}</span><h1>{fr ? `Bonjour ${family.first_name}.` : `Hello ${family.first_name}.`}</h1><p>{fr ? "Retrouvez votre recherche et continuez là où vous vous étiez arrêté." : "Find your search and continue where you left off."}</p></div><div className="fam13-head-actions"><Link href={`/${locale}/mon-besoin`}>{fr ? "Nouvelle recherche" : "New search"} <b>→</b></Link><form action={`/api/famille/deconnexion?locale=${locale}`} method="post"><button>{fr ? "Déconnexion" : "Sign out"}</button></form></div></div>
    </div></section>

    <section className="fam13-body"><div className="fam13-wrap fam13-layout">
      <div className="fam13-main">
        <div className="fam13-stats"><article><span>🔎</span><div><small>{fr ? "RECHERCHES" : "SEARCHES"}</small><strong>{searches.length}</strong><p>{fr ? "enregistrées récemment" : "recently saved"}</p></div></article><article><span>♡</span><div><small>{fr ? "FAVORIS" : "FAVOURITES"}</small><strong>{favoriteCount}</strong><p>{fr ? "services sauvegardés" : "saved providers"}</p></div></article><article><span>👶</span><div><small>{fr ? "ENFANTS" : "CHILDREN"}</small><strong>{childCount}</strong><p>{fr ? "dans votre profil" : "in your profile"}</p></div></article></div>

        <section className="fam13-card fam13-searches"><div className="fam13-card-head"><div><small>{fr ? "VOS RECHERCHES" : "YOUR SEARCHES"}</small><h2>{fr ? "Reprendre une recherche" : "Continue a search"}</h2></div><Link href={`/${locale}/mon-besoin`}>+ {fr ? "Nouvelle" : "New"}</Link></div>
          {searches.length ? <div className="fam13-search-list">{searches.map((s) => { const href = `/${locale}/garderies?ville=${encodeURIComponent(s.city_or_postal || "")}&age=${encodeURIComponent(s.age_range || "")}${s.childcare_type ? `&type=${encodeURIComponent(s.childcare_type)}` : ""}`; return <Link href={href} key={s.id}><div><span>📍</span><p><b>{s.city_or_postal || (fr ? "Secteur non précisé" : "Area not specified")}</b><small>{ageLabel(String(s.age_range || ""), fr)}{s.childcare_type ? ` · ${s.childcare_type}` : ` · ${fr ? "Toutes les solutions" : "All options"}`}</small></p></div><strong>→</strong></Link>; })}</div> : <div className="fam13-empty"><span>🔎</span><h3>{fr ? "Votre première recherche vous attend." : "Your first search is waiting."}</h3><p>{fr ? "Décrivez votre besoin en quelques étapes. Une fois connecté, vos prochaines recherches seront enregistrées ici automatiquement." : "Describe your need in a few steps. While signed in, your next searches will be saved here automatically."}</p><Link href={`/${locale}/mon-besoin`}>{fr ? "Trouver ma garde" : "Find childcare"} →</Link></div>}
        </section>

        <section className="fam13-card"><div className="fam13-card-head"><div><small>{fr ? "À FAIRE MAINTENANT" : "NEXT STEPS"}</small><h2>{fr ? "Avancer sans se disperser" : "Move forward without the clutter"}</h2></div></div><div className="fam13-actions"><Link href={`/${locale}/garderies`}><span>🏡</span><div><b>{fr ? "Explorer l’annuaire" : "Browse directory"}</b><small>{fr ? "Voir librement les services de garde." : "Freely explore childcare providers."}</small></div><strong>→</strong></Link><Link href={`/${locale}/espace-famille/profil`}><span>👤</span><div><b>{fr ? "Compléter mon profil" : "Complete my profile"}</b><small>{fr ? "Ajoutez seulement les informations utiles." : "Add only useful information."}</small></div><strong>→</strong></Link></div></section>
      </div>

      <aside className="fam13-side">
        <div className="fam13-profile"><div className="fam13-profile-top"><span>{String(family.first_name || "M").slice(0,1).toUpperCase()}</span><div><small>{fr ? "VOTRE PROFIL" : "YOUR PROFILE"}</small><b>{family.first_name} {family.last_name || ""}</b><p>{family.email}</p></div></div><div className="fam13-complete"><div><span>{fr ? "Profil complété" : "Profile complete"}</span><b>{profilePercent}%</b></div><i><em style={{ width: `${profilePercent}%` }} /></i><p>{profilePercent < 100 ? (fr ? "Complétez votre secteur et votre famille pour rendre MyCoco plus pertinent." : "Complete your area and family to make MyCoco more relevant.") : (fr ? "Votre profil contient les informations essentielles." : "Your profile contains the essentials.")}</p></div><Link href={`/${locale}/espace-famille/profil`}>{fr ? "Gérer mon profil" : "Manage profile"} →</Link></div>
        <div className="fam13-note"><span>🔒</span><div><b>{fr ? "Privé par défaut" : "Private by default"}</b><p>{fr ? "Vos coordonnées et informations familiales ne sont pas publiées dans l’annuaire des services." : "Your contact and family information are not published in the provider directory."}</p></div></div>
      </aside>
    </div></section>

    <style>{`.fam13{--ink:#17352c;--deep:#0d241d;--paper:#fffdf9;--cream:#f8f5ef;--coral:#ef7e61;--sage:#edf5f0;--line:#e1e7e3;--muted:#75817b;background:var(--cream);color:var(--ink);min-height:80vh}.fam13-wrap{width:min(1160px,calc(100% - 40px));margin:auto}.fam13-top{padding:42px 0 32px;background:linear-gradient(135deg,#fffaf2,#eef6f1);border-bottom:1px solid var(--line)}.fam13-welcome{display:flex;gap:11px;align-items:start;padding:14px 16px;border:1px solid #cfe4d7;border-radius:14px;background:#f1faf4;margin-bottom:25px}.fam13-welcome>span{display:grid;place-items:center;width:27px;height:27px;border-radius:50%;background:#3a7c60;color:#fff;font-size:10px}.fam13-welcome b{font-size:10px}.fam13-welcome p{margin:3px 0 0;color:#698076;font-size:8px;line-height:1.45}.fam13-head{display:flex;justify-content:space-between;gap:30px;align-items:end}.fam13-head>div:first-child>span{font-size:8px;font-weight:950;letter-spacing:.14em;color:#b35d47}.fam13-head h1{font-size:clamp(42px,5.3vw,64px);letter-spacing:-.065em;line-height:.98;margin:10px 0 8px}.fam13-head p{color:#728078;font-size:12px;margin:0}.fam13-head-actions{display:flex;align-items:center;gap:9px}.fam13-head-actions>a{display:inline-flex;gap:15px;min-height:43px;align-items:center;padding:0 14px;border-radius:11px;background:var(--ink);color:#fff;font-size:8px;font-weight:950}.fam13-head-actions button{height:43px;border:1px solid #d8e1dc;border-radius:11px;background:#fff;color:#5d6c65;padding:0 13px;font-size:8px;font-weight:900;cursor:pointer}.fam13-body{padding:34px 0 75px}.fam13-layout{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:28px;align-items:start}.fam13-main{display:grid;gap:16px}.fam13-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.fam13-stats article{display:grid;grid-template-columns:39px 1fr;gap:10px;align-items:center;padding:16px;border:1px solid var(--line);border-radius:16px;background:#fff}.fam13-stats article>span{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#f4f1eb;font-size:17px}.fam13-stats small,.fam13-stats strong,.fam13-stats p{display:block;margin:0}.fam13-stats small{font-size:6px;font-weight:950;color:#9a7768}.fam13-stats strong{font-size:24px;letter-spacing:-.05em;margin:2px 0}.fam13-stats p{font-size:7px;color:#8a948f}.fam13-card{padding:21px;border:1px solid var(--line);border-radius:20px;background:#fff}.fam13-card-head{display:flex;align-items:end;justify-content:space-between;gap:20px;padding-bottom:15px;border-bottom:1px solid #edf0ed}.fam13-card-head small{font-size:6px;font-weight:950;letter-spacing:.12em;color:#a47967}.fam13-card-head h2{font-size:22px;letter-spacing:-.04em;margin:4px 0 0}.fam13-card-head>a{font-size:8px;font-weight:950;color:#2f604f}.fam13-search-list{display:grid}.fam13-search-list>a{display:flex;justify-content:space-between;align-items:center;padding:14px 2px;border-bottom:1px solid #edf0ed;color:var(--ink)}.fam13-search-list>a:last-child{border-bottom:0}.fam13-search-list>a>div{display:flex;align-items:center;gap:10px}.fam13-search-list>a>div>span{display:grid;place-items:center;width:35px;height:35px;border-radius:11px;background:#edf5f0}.fam13-search-list p{margin:0}.fam13-search-list b,.fam13-search-list small{display:block}.fam13-search-list b{font-size:10px}.fam13-search-list small{font-size:8px;color:#849089;margin-top:3px}.fam13-search-list>a>strong{font-size:13px}.fam13-empty{text-align:center;padding:35px 15px 18px}.fam13-empty>span{font-size:25px}.fam13-empty h3{font-size:19px;margin:9px 0 6px}.fam13-empty p{max-width:490px;margin:0 auto 15px;color:#78847e;font-size:9px;line-height:1.55}.fam13-empty a{display:inline-flex;padding:10px 13px;border-radius:10px;background:#17352c;color:#fff;font-size:8px;font-weight:950}.fam13-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:14px}.fam13-actions>a{display:grid;grid-template-columns:37px 1fr auto;gap:9px;align-items:center;padding:13px;border:1px solid #e3e8e4;border-radius:13px;color:var(--ink)}.fam13-actions>a>span{display:grid;place-items:center;width:35px;height:35px;border-radius:11px;background:#f6f1ea;font-size:15px}.fam13-actions b,.fam13-actions small{display:block}.fam13-actions b{font-size:9px}.fam13-actions small{font-size:7px;color:#84908a;margin-top:2px}.fam13-actions strong{font-size:11px}.fam13-side{display:grid;gap:12px}.fam13-profile,.fam13-note{border:1px solid var(--line);border-radius:18px;background:#fff}.fam13-profile{padding:17px}.fam13-profile-top{display:flex;gap:10px;align-items:center}.fam13-profile-top>span{display:grid;place-items:center;width:43px;height:43px;border-radius:13px;background:#17352c;color:#fff;font-weight:950}.fam13-profile-top small,.fam13-profile-top b,.fam13-profile-top p{display:block}.fam13-profile-top small{font-size:6px;font-weight:950;color:#a27a69}.fam13-profile-top b{font-size:10px;margin:2px 0}.fam13-profile-top p{font-size:7px;color:#88928d;margin:0}.fam13-complete{margin:16px 0;padding:13px;border-radius:12px;background:#f7f5f0}.fam13-complete>div{display:flex;justify-content:space-between;font-size:8px}.fam13-complete>div b{font-size:10px}.fam13-complete>i{display:block;height:5px;border-radius:99px;background:#e4e4df;overflow:hidden;margin:7px 0}.fam13-complete>i em{display:block;height:100%;background:#ef7e61}.fam13-complete p{font-size:7px;line-height:1.45;color:#7d8882;margin:0}.fam13-profile>a{display:flex;justify-content:space-between;color:#2b5c4b;font-size:8px;font-weight:950}.fam13-note{display:grid;grid-template-columns:30px 1fr;gap:9px;padding:15px}.fam13-note>span{font-size:17px}.fam13-note b{font-size:9px}.fam13-note p{color:#7b8781;font-size:7px;line-height:1.5;margin:4px 0 0}@media(max-width:900px){.fam13-layout{grid-template-columns:1fr}.fam13-side{grid-template-columns:1fr 1fr}.fam13-head{align-items:start;flex-direction:column}.fam13-stats{grid-template-columns:1fr 1fr 1fr}}@media(max-width:620px){.fam13-wrap{width:calc(100% - 28px)}.fam13-top{padding:30px 0}.fam13-head h1{font-size:43px}.fam13-head-actions{width:100%;display:grid;grid-template-columns:1fr 1fr}.fam13-head-actions>a,.fam13-head-actions button{width:100%;justify-content:center}.fam13-stats,.fam13-actions,.fam13-side{grid-template-columns:1fr}.fam13-card{padding:16px}.fam13-body{padding-top:20px}}
    `}</style>
  </main>;
}

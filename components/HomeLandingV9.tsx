import Link from "next/link";
import { type Locale } from "@/lib/i18n";

export default function HomeLandingV9({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const t = fr ? {
    eyebrow: "MYCOCO · GARDE D’ENFANTS, SIMPLEMENT",
    title: "Trouvez la garde qui correspond vraiment à votre famille.",
    lead: "MyCoco rapproche les familles et les services de garde selon ce qui compte vraiment : distance, âge, horaires, disponibilités, langues et besoins de votre enfant.",
    primary: "Trouver une garde",
    provider: "Je suis un service de garde",
    proof: ["Gratuit pour les familles", "Matching personnalisé", "Disponibilités mises à jour"],
    matchTitle: "Un résultat utile, pas une liste infinie.",
    matchText: "Chaque service est comparé à vos critères essentiels et à vos préférences pour vous aider à prioriser les meilleures options.",
    criteriaTitle: "Votre enfant est plus qu’un âge et un code postal.",
    criteriaText: "Les critères obligatoires permettent de trouver une solution compatible. Les critères facultatifs affinent ensuite le matching sans compliquer la recherche.",
    basics: "Essentiels",
    basicsItems: ["Ville ou code postal", "Âge de l’enfant", "Date de début", "Jours et horaires", "Type de garde"],
    preferences: "Préférences",
    preferencesItems: ["Allergies et repas", "Animaux", "Langues parlées", "Langue souhaitée pour l’enfant", "Activités préférées", "Siestes et habitudes"],
    liveTitle: "Une place se libère ? Le service la met à jour immédiatement.",
    liveText: "Les professionnels gèrent leurs places restantes, leurs horaires et leurs critères d’accueil depuis leur espace. Dès qu’un enfant est accueilli, la capacité restante peut être ajustée pour éviter les informations périmées.",
    providerTitle: "Un espace professionnel pensé pour gérer, pas seulement pour être visible.",
    providerText: "Le service peut compléter sa fiche, préciser ses disponibilités, ses langues, ses activités, ses repas, ses règles d’accueil et suivre les familles qui correspondent à son offre.",
    childTitle: "Un vrai dossier enfant pour éviter de tout répéter.",
    childText: "Prénom, allergies, repas, activités préférées, siestes, langues, habitudes et informations utiles : la famille garde les données essentielles organisées dans son espace et choisit ce qu’elle partage.",
    ecosystemEyebrow: "PLUS QU’UN ANNUAIRE",
    ecosystemTitle: "MyCoco devient l’écosystème des familles et des professionnels de l’enfance.",
    ecosystemText: "La garde est le point de départ. Demain : activités, camps, événements, professionnels, solutions de secours et services utiles autour de l’enfant — avec le même profil famille et la même logique de confiance.",
    familyCta: "Commencer gratuitement",
    providerCta: "Créer mon espace professionnel",
  } : {
    eyebrow: "MYCOCO · CHILDCARE, MADE SIMPLE",
    title: "Find childcare that truly fits your family.",
    lead: "MyCoco connects families and childcare providers around what really matters: distance, age, hours, openings, languages and your child’s needs.",
    primary: "Find childcare",
    provider: "I’m a childcare provider",
    proof: ["Free for families", "Personalized matching", "Updated openings"],
    matchTitle: "A useful result, not an endless list.",
    matchText: "Each provider is compared with your essential criteria and preferences so you can prioritize the best options.",
    criteriaTitle: "Your child is more than an age and postal code.",
    criteriaText: "Required criteria find compatible options. Optional preferences improve matching without making the search complicated.",
    basics: "Essentials",
    basicsItems: ["City or postal code", "Child age", "Start date", "Days and hours", "Childcare type"],
    preferences: "Preferences",
    preferencesItems: ["Allergies and meals", "Pets", "Languages spoken", "Preferred language for the child", "Favourite activities", "Naps and routines"],
    liveTitle: "A spot opens up? The provider updates it right away.",
    liveText: "Providers manage remaining spots, hours and admission preferences from their space. When a child joins, capacity can be updated immediately to reduce stale information.",
    providerTitle: "A professional space built to manage, not just advertise.",
    providerText: "Providers can complete their profile, update openings, languages, activities, meals and childcare preferences, and follow families that fit their offer.",
    childTitle: "A real child profile so families stop repeating everything.",
    childText: "Name, allergies, meals, favourite activities, naps, languages, routines and useful information stay organized in the family space, with control over what gets shared.",
    ecosystemEyebrow: "MORE THAN A DIRECTORY",
    ecosystemTitle: "MyCoco becomes the ecosystem for families and childhood professionals.",
    ecosystemText: "Childcare is the starting point. Next: activities, camps, events, professionals, backup care and useful family services — all connected to the same family profile and trust layer.",
    familyCta: "Start for free",
    providerCta: "Create my professional space",
  };

  return <main className="mc-home10">
    <section className="mc10-hero">
      <div className="mc10-wrap mc10-hero-grid">
        <div className="mc10-copy">
          <span className="mc10-kicker">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="mc10-actions">
            <Link className="mc10-btn primary" href={`/${locale}/mon-besoin`}>{t.primary}<span>→</span></Link>
            <Link className="mc10-btn secondary" href={`/${locale}/pour-les-services`}>{t.provider}</Link>
          </div>
          <div className="mc10-proof">{t.proof.map((item) => <span key={item}><b>✓</b>{item}</span>)}</div>
        </div>

        <div className="mc10-match-card" aria-label={fr ? "Exemple de résultat MyCoco" : "MyCoco matching example"}>
          <div className="mc10-match-top"><span>MYCOCO MATCH</span><b>94%</b></div>
          <h2>{fr ? "Les Petits Explorateurs" : "Little Explorers"}</h2>
          <p>{fr ? "Milieu familial · Mirabel" : "Home childcare · Mirabel"}</p>
          <div className="mc10-match-facts">
            <div><small>{fr ? "DISTANCE" : "DISTANCE"}</small><strong>2,4 km</strong></div>
            <div><small>{fr ? "PLACES" : "OPENINGS"}</small><strong>{fr ? "2 restantes" : "2 left"}</strong></div>
            <div><small>{fr ? "HORAIRES" : "HOURS"}</small><strong>7:00–17:30</strong></div>
          </div>
          <div className="mc10-match-tags"><span>✓ {fr ? "0–18 mois" : "0–18 months"}</span><span>✓ Français</span><span>✓ {fr ? "Sans animaux" : "No pets"}</span></div>
          <div className="mc10-match-note"><span>↻</span><div><strong>{fr ? "Disponibilité mise à jour" : "Availability updated"}</strong><small>{fr ? "par le service" : "by the provider"}</small></div></div>
        </div>
      </div>
    </section>

    <section className="mc10-simple">
      <div className="mc10-wrap mc10-simple-grid">
        <div><span className="mc10-kicker">MATCHING MYCOCO</span><h2>{t.matchTitle}</h2><p>{t.matchText}</p></div>
        <div className="mc10-score"><b>94%</b><span>{fr ? "de compatibilité" : "compatibility"}</span><small>{fr ? "calculé selon vos critères" : "based on your criteria"}</small></div>
      </div>
    </section>

    <section className="mc10-criteria">
      <div className="mc10-wrap">
        <div className="mc10-head"><span className="mc10-kicker">{fr ? "UNE RECHERCHE QUI VOUS RESSEMBLE" : "A SEARCH THAT FITS YOU"}</span><h2>{t.criteriaTitle}</h2><p>{t.criteriaText}</p></div>
        <div className="mc10-criteria-grid">
          <article><span>{t.basics}</span>{t.basicsItems.map((item) => <div key={item}><b>✓</b>{item}</div>)}</article>
          <article><span>{t.preferences}</span>{t.preferencesItems.map((item) => <div key={item}><b>+</b>{item}</div>)}</article>
        </div>
      </div>
    </section>

    <section className="mc10-live">
      <div className="mc10-wrap mc10-live-grid">
        <div className="mc10-live-visual">
          <div className="mc10-capacity"><span>{fr ? "PLACES DISPONIBLES" : "AVAILABLE SPOTS"}</span><strong>2</strong><small>{fr ? "sur 6 places" : "of 6 spots"}</small></div>
          <div className="mc10-capacity-row"><span>{fr ? "Léa rejoint le service" : "Léa joins the provider"}</span><b>−1</b></div>
          <div className="mc10-capacity-row active"><span>{fr ? "Capacité restante" : "Remaining capacity"}</span><b>1</b></div>
        </div>
        <div><span className="mc10-kicker">{fr ? "DISPONIBILITÉS EN TEMPS RÉEL" : "LIVE AVAILABILITY"}</span><h2>{t.liveTitle}</h2><p>{t.liveText}</p><Link href={`/${locale}/pour-les-services`}>{t.providerCta}<span>→</span></Link></div>
      </div>
    </section>

    <section className="mc10-dual">
      <div className="mc10-wrap mc10-dual-grid">
        <article className="family"><span>{fr ? "ESPACE FAMILLE" : "FAMILY SPACE"}</span><h2>{t.childTitle}</h2><p>{t.childText}</p><div className="mc10-pills"><b>{fr ? "Allergies" : "Allergies"}</b><b>{fr ? "Repas" : "Meals"}</b><b>{fr ? "Siestes" : "Naps"}</b><b>{fr ? "Activités" : "Activities"}</b><b>{fr ? "Langues" : "Languages"}</b></div><Link href={`/${locale}/inscription?role=family`}>{t.familyCta}<span>→</span></Link></article>
        <article className="provider"><span>{fr ? "ESPACE PROFESSIONNEL" : "PROFESSIONAL SPACE"}</span><h2>{t.providerTitle}</h2><p>{t.providerText}</p><div className="mc10-pills"><b>{fr ? "Places" : "Openings"}</b><b>{fr ? "Horaires" : "Hours"}</b><b>{fr ? "Familles" : "Families"}</b><b>{fr ? "Activités" : "Activities"}</b><b>{fr ? "Profil" : "Profile"}</b></div><Link href={`/${locale}/inscription?role=provider`}>{t.providerCta}<span>→</span></Link></article>
      </div>
    </section>

    <section className="mc10-ecosystem">
      <div className="mc10-wrap mc10-eco-grid">
        <div><span className="mc10-kicker">{t.ecosystemEyebrow}</span><h2>{t.ecosystemTitle}</h2></div>
        <div><p>{t.ecosystemText}</p><div className="mc10-eco-list"><span>{fr ? "Garde" : "Childcare"}</span><span>{fr ? "Activités" : "Activities"}</span><span>{fr ? "Camps" : "Camps"}</span><span>{fr ? "Événements" : "Events"}</span><span>{fr ? "Professionnels" : "Professionals"}</span><span>Backup</span></div></div>
      </div>
    </section>

    <section className="mc10-final"><div className="mc10-wrap"><div><small>MYCOCO</small><h2>{fr ? "Moins chercher. Mieux choisir." : "Search less. Choose better."}</h2></div><Link className="mc10-btn light" href={`/${locale}/mon-besoin`}>{t.primary}<span>→</span></Link></div></section>

    <style>{`
      .mc-home10{--ink:#153b35;--ink2:#0e2c27;--coral:#f07b63;--mint:#dff3ea;--cream:#fffaf4;--paper:#fff;--line:#e1e9e4;--muted:#667b73;background:var(--cream);color:var(--ink)}.mc10-wrap{width:min(1160px,calc(100% - 40px));margin:auto}.mc10-hero{padding:84px 0 88px;background:radial-gradient(circle at 80% 18%,#e4f5ed 0,transparent 33%),var(--cream);border-bottom:1px solid var(--line)}.mc10-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 390px;gap:72px;align-items:center}.mc10-kicker{font-size:10px;font-weight:950;letter-spacing:.14em;color:#56816f}.mc10-copy h1{max-width:780px;margin:15px 0 21px;font-size:clamp(50px,6.6vw,84px);line-height:.94;letter-spacing:-.07em}.mc10-copy>p{max-width:690px;margin:0;color:var(--muted);font-size:18px;line-height:1.62}.mc10-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:29px}.mc10-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:53px;padding:0 20px;border-radius:14px;font-size:12px;font-weight:900}.mc10-btn.primary{background:var(--ink);color:#fff;box-shadow:0 13px 28px rgba(21,59,53,.17)}.mc10-btn.primary:hover{background:var(--ink2);transform:translateY(-2px)}.mc10-btn.secondary{background:#fff;border:1px solid #dbe5df;color:var(--ink)}.mc10-btn.light{background:#fff;color:var(--ink)}.mc10-proof{display:flex;gap:16px;flex-wrap:wrap;margin-top:16px}.mc10-proof span{font-size:10px;font-weight:800;color:#62786f}.mc10-proof b{color:#3f856a;margin-right:5px}.mc10-match-card{background:#fff;border:1px solid var(--line);border-radius:26px;padding:25px;box-shadow:0 28px 75px rgba(21,59,53,.12)}.mc10-match-top{display:flex;justify-content:space-between;align-items:center}.mc10-match-top span{font-size:9px;font-weight:950;letter-spacing:.13em;color:#789187}.mc10-match-top b{display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:var(--mint);font-size:18px}.mc10-match-card h2{margin:19px 0 4px;font-size:26px;letter-spacing:-.04em}.mc10-match-card>p{margin:0;color:#778a83;font-size:11px}.mc10-match-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:18px}.mc10-match-facts div{padding:11px 9px;border-radius:11px;background:#f6f8f6}.mc10-match-facts small{display:block;font-size:7px;font-weight:900;letter-spacing:.08em;color:#8b9b95}.mc10-match-facts strong{display:block;margin-top:4px;font-size:11px}.mc10-match-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}.mc10-match-tags span{padding:7px 9px;border-radius:999px;background:#eef7f2;color:#3d6656;font-size:8px;font-weight:850}.mc10-match-note{display:flex;gap:9px;align-items:center;margin-top:16px;padding-top:14px;border-top:1px solid #edf1ee}.mc10-match-note>span{display:grid;place-items:center;width:31px;height:31px;border-radius:9px;background:#fff0eb;color:var(--coral)}.mc10-match-note strong,.mc10-match-note small{display:block}.mc10-match-note strong{font-size:9px}.mc10-match-note small{font-size:8px;color:#85928c;margin-top:2px}.mc10-simple{padding:72px 0;background:#fff}.mc10-simple-grid{display:grid;grid-template-columns:1fr 230px;gap:70px;align-items:center}.mc10-simple h2,.mc10-head h2,.mc10-live h2,.mc10-dual h2,.mc10-ecosystem h2{font-size:clamp(34px,4.5vw,55px);line-height:1.02;letter-spacing:-.055em;margin:11px 0 13px}.mc10-simple p,.mc10-head p,.mc10-live p,.mc10-dual p,.mc10-ecosystem p{color:var(--muted);font-size:14px;line-height:1.65}.mc10-score{padding:23px;border-radius:20px;background:var(--ink);color:#fff}.mc10-score b{display:block;font-size:52px;line-height:1;letter-spacing:-.06em}.mc10-score span,.mc10-score small{display:block}.mc10-score span{font-size:11px;font-weight:900;margin-top:7px}.mc10-score small{font-size:8px;color:#a9bdb5;margin-top:3px}.mc10-criteria{padding:88px 0;background:#f3f8f5}.mc10-head{max-width:800px}.mc10-criteria-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:31px}.mc10-criteria-grid article{padding:25px;background:#fff;border:1px solid var(--line);border-radius:21px}.mc10-criteria-grid article>span{display:block;margin-bottom:16px;font-size:10px;font-weight:950;letter-spacing:.1em;color:#618274}.mc10-criteria-grid article div{display:flex;align-items:center;gap:9px;padding:10px 0;border-top:1px solid #edf1ee;font-size:11px;font-weight:800}.mc10-criteria-grid article b{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#edf6f1;color:#4c7d69;font-size:9px}.mc10-live{padding:88px 0;background:#fff}.mc10-live-grid{display:grid;grid-template-columns:390px 1fr;gap:75px;align-items:center}.mc10-live-visual{padding:21px;border-radius:23px;background:#fff7f3;border:1px solid #f1ddd5}.mc10-capacity{padding:23px;border-radius:17px;background:#fff}.mc10-capacity span,.mc10-capacity small{display:block}.mc10-capacity span{font-size:8px;font-weight:950;letter-spacing:.12em;color:#9b796e}.mc10-capacity strong{display:block;font-size:66px;line-height:1;margin:11px 0 4px;letter-spacing:-.07em}.mc10-capacity small{font-size:9px;color:#947f78}.mc10-capacity-row{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.65);font-size:9px;font-weight:850}.mc10-capacity-row.active{background:var(--ink);color:#fff}.mc10-live a,.mc10-dual a{display:inline-flex;align-items:center;gap:8px;margin-top:14px;font-size:11px;font-weight:900;color:var(--ink)}.mc10-dual{padding:88px 0;background:var(--cream)}.mc10-dual-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.mc10-dual article{padding:30px;border-radius:24px;min-height:390px}.mc10-dual article>span{font-size:9px;font-weight:950;letter-spacing:.12em}.mc10-dual article.family{background:#e8f5ef}.mc10-dual article.provider{background:#fff0e9}.mc10-dual h2{font-size:37px;margin-top:45px}.mc10-pills{display:flex;gap:7px;flex-wrap:wrap;margin-top:18px}.mc10-pills b{padding:7px 9px;border-radius:999px;background:rgba(255,255,255,.65);font-size:8px}.mc10-ecosystem{padding:94px 0;background:#102f29;color:#fff}.mc10-eco-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}.mc10-ecosystem .mc10-kicker{color:#92bca9}.mc10-ecosystem p{color:#bfd0c8;margin-top:5px}.mc10-eco-list{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}.mc10-eco-list span{padding:9px 11px;border:1px solid rgba(255,255,255,.16);border-radius:999px;color:#dbe8e2;font-size:9px;font-weight:850}.mc10-final{padding:52px 0;background:var(--coral);color:#fff}.mc10-final>div{display:flex;align-items:center;justify-content:space-between;gap:25px}.mc10-final small{font-size:8px;font-weight:950;letter-spacing:.13em}.mc10-final h2{font-size:clamp(32px,4vw,49px);letter-spacing:-.055em;margin:6px 0 0}@media(max-width:900px){.mc10-hero-grid,.mc10-simple-grid,.mc10-live-grid,.mc10-eco-grid{grid-template-columns:1fr}.mc10-match-card{max-width:540px}.mc10-live-visual{max-width:540px}.mc10-dual-grid{grid-template-columns:1fr}.mc10-simple-grid,.mc10-live-grid,.mc10-eco-grid{gap:35px}}@media(max-width:600px){.mc10-wrap{width:min(100% - 28px,1160px)}.mc10-hero{padding:55px 0}.mc10-copy h1{font-size:48px}.mc10-copy>p{font-size:15px}.mc10-actions{display:grid}.mc10-btn{width:100%}.mc10-proof{display:grid;gap:7px}.mc10-match-facts{grid-template-columns:1fr}.mc10-criteria-grid{grid-template-columns:1fr}.mc10-dual h2{font-size:31px;margin-top:28px}.mc10-final>div{align-items:flex-start;flex-direction:column}.mc10-final .mc10-btn{width:auto}}
    `}</style>
  </main>;
}

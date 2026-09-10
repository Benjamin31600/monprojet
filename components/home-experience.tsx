import Link from "next/link";
import { getChildcareData, typeLabel } from "@/lib/childcare";
import { type Locale } from "@/lib/i18n";

const Arrow = () => <span aria-hidden="true">↗</span>;

export async function HomeExperience({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 4);

  const copy = fr ? {
    eyebrow: "MYCOCO · POUR LES FAMILLES DU QUÉBEC",
    title: "La bonne garde commence par votre famille.",
    lead: "Dites-nous où vous vivez, l’âge de votre enfant et ce dont vous avez besoin. MyCoco vous aide à trouver des services pertinents — gratuitement.",
    primary: "Trouver ma garde",
    secondary: "Je suis un service de garde",
    proof: ["Gratuit", "Sans carte bancaire", "Sans engagement", "Moins de 2 minutes"],
    familyLabel: "POUR LES FAMILLES",
    familyTitle: "Vous cherchez une solution ?",
    familyText: "Commencez sans compte. Affinez votre besoin en quelques questions, découvrez les options pertinentes, puis créez votre espace seulement quand cela devient utile.",
    familyCta: "Commencer ma recherche",
    providerLabel: "POUR LES SERVICES",
    providerTitle: "Vous voulez être trouvé ?",
    providerText: "Créez votre espace service, complétez votre fiche et présentez votre offre aux familles qui recherchent réellement dans votre secteur.",
    providerCta: "Créer mon espace service",
    whyKicker: "POURQUOI MYCOCO",
    whyTitle: "Pas un annuaire de plus. Un meilleur point de départ.",
    whyText: "Les parents ont déjà accès à des listes. La vraie valeur est de les aider à savoir par où commencer, quoi comparer et quelle solution mérite leur attention.",
    why: [
      ["01", "On part du besoin", "Ville, âge, type de garde et date souhaitée : les critères qui comptent sont réunis dès le départ."],
      ["02", "On rend les options lisibles", "Informations clés, fiches locales et contexte : moins de recherche dispersée, plus de décisions éclairées."],
      ["03", "On garde la recherche vivante", "Favoris, recherches enregistrées et alertes doivent transformer une visite ponctuelle en réflexe familial."],
    ],
    journeyKicker: "LE PARCOURS",
    journeyTitle: "Une expérience pensée pour avancer, pas pour remplir un formulaire.",
    journey: [
      ["1", "Décrire", "Votre situation en quelques questions."],
      ["2", "Découvrir", "Les services pertinents près de vous."],
      ["3", "Comparer", "Les informations qui aident vraiment."],
      ["4", "Contacter", "Le service qui vous semble le meilleur fit."],
    ],
    directoryKicker: "LE RÉSEAU LOCAL",
    directoryTitle: "Commencer localement, puis devenir le réflexe.",
    directoryText: "MyCoco démarre dans les Laurentides. La priorité n’est pas d’être partout : c’est d’être utile là où nous sommes présents.",
    directoryCta: "Explorer l’annuaire",
    visionKicker: "LA SUITE",
    visionTitle: "La garde est notre point de départ.",
    visionText: "À terme, le même espace pourra réunir garde, activités, camps, événements, professionnels et solutions de secours — sans recommencer l’histoire de votre famille à chaque fois.",
    finalTitle: "Votre famille n’a pas besoin d’un autre site à comprendre.",
    finalText: "Elle a besoin d’une façon plus simple de trouver la bonne solution.",
    finalCta: "Trouver ma garde",
    cities: ["Mirabel", "Blainville", "Boisbriand", "Saint-Eustache", "Sainte-Thérèse"],
  } : {
    eyebrow: "MYCOCO · FOR QUEBEC FAMILIES",
    title: "The right childcare starts with your family.",
    lead: "Tell us where you live, your child’s age and what you need. MyCoco helps you find relevant services — for free.",
    primary: "Find my childcare",
    secondary: "I’m a childcare provider",
    proof: ["Free", "No credit card", "No commitment", "Under 2 minutes"],
    familyLabel: "FOR FAMILIES",
    familyTitle: "Looking for a solution?",
    familyText: "Start without an account. Refine your need in a few questions, explore relevant options, then create your space only when it becomes useful.",
    familyCta: "Start my search",
    providerLabel: "FOR PROVIDERS",
    providerTitle: "Want to be discovered?",
    providerText: "Create your provider space, complete your profile and present your offer to families actively searching in your area.",
    providerCta: "Create my provider space",
    whyKicker: "WHY MYCOCO",
    whyTitle: "Not another directory. A better starting point.",
    whyText: "Parents already have access to lists. The real value is helping them know where to start, what to compare and which option deserves their attention.",
    why: [
      ["01", "Start with the need", "Area, age, childcare type and desired start date are brought together from the start."],
      ["02", "Make options easier to read", "Key information, local profiles and context: less scattered research, better decisions."],
      ["03", "Keep the search alive", "Saved searches, favourites and alerts should turn a one-time visit into a family habit."],
    ],
    journeyKicker: "THE JOURNEY",
    journeyTitle: "Designed to help you move forward, not fill out a form.",
    journey: [
      ["1", "Tell us", "Your situation in a few questions."],
      ["2", "Discover", "Relevant services nearby."],
      ["3", "Compare", "The information that actually matters."],
      ["4", "Connect", "The provider that feels right."],
    ],
    directoryKicker: "THE LOCAL NETWORK",
    directoryTitle: "Start local. Become the family reflex.",
    directoryText: "MyCoco starts in the Laurentians. The priority is not being everywhere: it is being useful where we are present.",
    directoryCta: "Explore the directory",
    visionKicker: "WHAT’S NEXT",
    visionTitle: "Childcare is our starting point.",
    visionText: "Over time, the same space can bring together childcare, activities, camps, events, professionals and backup solutions — without restarting your family story every time.",
    finalTitle: "Your family doesn’t need another site to figure out.",
    finalText: "It needs a simpler way to find the right solution.",
    finalCta: "Find my childcare",
    cities: ["Mirabel", "Blainville", "Boisbriand", "Saint-Eustache", "Sainte-Thérèse"],
  };

  return <main className="mx-home">
    <section className="mx-hero">
      <div className="mx-shell mx-hero-grid">
        <div className="mx-hero-copy">
          <div className="mx-kicker">{copy.eyebrow}</div>
          <h1>{copy.title}</h1>
          <p className="mx-hero-lead">{copy.lead}</p>
          <div className="mx-proof" aria-label={fr ? "Avantages" : "Benefits"}>{copy.proof.map((item) => <span key={item}><b>✓</b>{item}</span>)}</div>
          <div className="mx-actions">
            <Link className="mx-btn mx-btn-main" href={`/${locale}/mon-besoin`}>{copy.primary}<Arrow /></Link>
            <Link className="mx-btn mx-btn-ghost" href={`/${locale}/pour-les-services`}>{copy.secondary}</Link>
          </div>
          <p className="mx-microcopy">{fr ? "Aucun paiement demandé. Commencez simplement votre recherche." : "No payment required. Just start your search."}</p>
        </div>

        <div className="mx-hero-visual" aria-hidden="true">
          <div className="mx-dashboard">
            <div className="mx-dashboard-top"><span>MYCOCO</span><span className="mx-live-dot">{fr ? "RECHERCHE ACTIVE" : "ACTIVE SEARCH"}</span></div>
            <div className="mx-dashboard-title">{fr ? "Votre recherche" : "Your search"}</div>
            <div className="mx-search-preview">
              <div><small>{fr ? "Secteur" : "Area"}</small><strong>Mirabel, QC</strong></div>
              <div><small>{fr ? "Enfant" : "Child"}</small><strong>{fr ? "0–18 mois" : "0–18 months"}</strong></div>
              <div><small>{fr ? "Préférence" : "Preference"}</small><strong>{fr ? "Toutes les solutions" : "All options"}</strong></div>
              <div className="mx-search-preview-btn">{fr ? "Voir les options" : "See options"} <Arrow /></div>
            </div>
            <div className="mx-match-card"><div className="mx-match-avatar">MC</div><div><small>{fr ? "MYCOCO MATCH" : "MYCOCO MATCH"}</small><strong>{fr ? "Des services pertinents autour de vous" : "Relevant services near you"}</strong></div><span>94%</span></div>
            <div className="mx-mini-row"><span>✓ {fr ? "Recherche enregistrable" : "Search can be saved"}</span><span>⌁ {fr ? "Alertes bientôt" : "Alerts coming soon"}</span></div>
          </div>
          <div className="mx-floating mx-floating-a"><b>+1</b><span>{fr ? "nouvelle possibilité" : "new possibility"}</span></div>
          <div className="mx-floating mx-floating-b"><b>✓</b><span>{fr ? "sans carte bancaire" : "no credit card"}</span></div>
        </div>
      </div>
    </section>

    <section className="mx-audience">
      <div className="mx-shell">
        <div className="mx-audience-head"><div className="mx-kicker">{fr ? "COMMENCEZ PAR ICI" : "START HERE"}</div><h2>{fr ? "MyCoco sait pourquoi vous êtes là." : "MyCoco knows why you’re here."}</h2></div>
        <div className="mx-audience-grid">
          <Link href={`/${locale}/mon-besoin`} className="mx-audience-card mx-family-card">
            <div className="mx-card-tag">{copy.familyLabel}</div><div className="mx-audience-icon">⌂</div><h3>{copy.familyTitle}</h3><p>{copy.familyText}</p><strong>{copy.familyCta} <Arrow /></strong>
          </Link>
          <Link href={`/${locale}/pour-les-services`} className="mx-audience-card mx-provider-card">
            <div className="mx-card-tag">{copy.providerLabel}</div><div className="mx-audience-icon">◫</div><h3>{copy.providerTitle}</h3><p>{copy.providerText}</p><strong>{copy.providerCta} <Arrow /></strong>
          </Link>
        </div>
      </div>
    </section>

    <section className="mx-why">
      <div className="mx-shell">
        <div className="mx-heading">
          <div className="mx-kicker">{copy.whyKicker}</div><h2>{copy.whyTitle}</h2><p>{copy.whyText}</p>
        </div>
        <div className="mx-why-grid">{copy.why.map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
      </div>
    </section>

    <section className="mx-journey">
      <div className="mx-shell">
        <div className="mx-heading"><div className="mx-kicker">{copy.journeyKicker}</div><h2>{copy.journeyTitle}</h2></div>
        <div className="mx-journey-grid">{copy.journey.map(([n,t,p]) => <article key={n}><div className="mx-journey-number">{n}</div><h3>{t}</h3><p>{p}</p></article>)}</div>
      </div>
    </section>

    <section className="mx-directory">
      <div className="mx-shell">
        <div className="mx-directory-head"><div><div className="mx-kicker">{copy.directoryKicker}</div><h2>{copy.directoryTitle}</h2><p>{copy.directoryText}</p></div><Link className="mx-text-link" href={`/${locale}/garderies`}>{copy.directoryCta} <Arrow /></Link></div>
        {featured.length ? <div className="mx-provider-grid">{featured.map((record) => <Link href={`/${locale}/garderie/${record.slug}`} className="mx-provider-tile" key={record.id}><div className="mx-provider-art"><div className="mx-provider-monogram">{record.name.slice(0,2).toUpperCase()}</div><span>{fr ? "Fiche publique" : "Public profile"}</span></div><div className="mx-provider-content"><small>{typeLabel(record.type, fr)}</small><h3>{record.name}</h3><p>{record.city}</p><div>{fr ? "Voir la fiche" : "View profile"} <Arrow /></div></div></Link>)}</div> : <div className="mx-empty"><strong>{fr ? "Le réseau MyCoco ouvre progressivement." : "The MyCoco network is opening progressively."}</strong><span>{fr ? "Les premiers services apparaîtront ici au fur et à mesure." : "The first services will appear here as the network opens."}</span></div>}
      </div>
    </section>

    <section className="mx-local">
      <div className="mx-shell mx-local-grid">
        <div><div className="mx-kicker">{fr ? "PRÈS DE CHEZ VOUS" : "NEAR YOU"}</div><h2>{fr ? "La recherche locale est au cœur du modèle." : "Local discovery is at the heart of the model."}</h2><p>{fr ? "Une famille cherche d’abord autour d’elle. MyCoco construit donc sa valeur ville par ville, avec une expérience utile avant de chercher la taille." : "Families start close to home. MyCoco therefore builds value city by city, making the experience useful before making it large."}</p></div>
        <div className="mx-city-links">{copy.cities.map((city) => <Link key={city} href={`/${locale}/garderies/${city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}`}>{city}<Arrow /></Link>)}</div>
      </div>
    </section>

    <section className="mx-vision"><div className="mx-shell mx-vision-grid"><div><div className="mx-kicker">{copy.visionKicker}</div><h2>{copy.visionTitle}</h2></div><p>{copy.visionText}</p></div></section>

    <section className="mx-final"><div className="mx-shell"><div className="mx-final-copy"><div className="mx-kicker">MYCOCO</div><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p><Link className="mx-btn mx-btn-light" href={`/${locale}/mon-besoin`}>{copy.finalCta} <Arrow /></Link></div></div></section>

    <style>{`
      .mx-home{--mx-ink:#162a25;--mx-green:#2f7a61;--mx-green-2:#6f9f8b;--mx-mint:#e7f1eb;--mx-cream:#fbfaf7;--mx-sand:#f2eee6;--mx-coral:#e96f4f;--mx-white:#fff;--mx-line:#dfe7e2;color:var(--mx-ink);background:var(--mx-cream);overflow:hidden}.mx-shell{width:min(1180px,calc(100% - 40px));margin:0 auto}.mx-kicker{font-size:11px;letter-spacing:.15em;font-weight:950;color:var(--mx-green)}.mx-hero{background:radial-gradient(circle at 82% 8%,#dff0e6 0,transparent 28%),linear-gradient(180deg,#fbfaf7 0,#f4f7f3 100%);padding:78px 0 92px;border-bottom:1px solid var(--mx-line)}.mx-hero-grid{display:grid;grid-template-columns:minmax(0,1.02fr) minmax(420px,.98fr);align-items:center;gap:74px}.mx-hero-copy h1{font-size:clamp(48px,6vw,79px);line-height:.95;letter-spacing:-.068em;margin:17px 0 21px;max-width:760px}.mx-hero-lead{max-width:650px;color:#60716a;font-size:18px;line-height:1.6;margin:0}.mx-proof{display:flex;flex-wrap:wrap;gap:10px 18px;margin:24px 0 0;color:#50665d;font-size:11px;font-weight:850}.mx-proof span{display:inline-flex;align-items:center;gap:6px}.mx-proof b{display:grid;place-items:center;width:17px;height:17px;border-radius:50%;background:#dff0e7;color:var(--mx-green);font-size:9px}.mx-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:29px}.mx-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:52px;padding:0 20px;border-radius:13px;font-size:13px;font-weight:950;transition:.18s ease}.mx-btn-main{background:var(--mx-ink);color:#fff;box-shadow:0 14px 28px rgba(22,42,37,.13)}.mx-btn-main:hover{transform:translateY(-2px);box-shadow:0 18px 35px rgba(22,42,37,.17)}.mx-btn-ghost{background:#fff;border:1px solid #d7e2dc;color:var(--mx-ink)}.mx-btn-ghost:hover{transform:translateY(-2px)}.mx-microcopy{margin:11px 0 0;color:#87928d;font-size:10px;font-weight:750}.mx-hero-visual{position:relative;min-height:430px;display:grid;place-items:center}.mx-dashboard{position:relative;width:min(100%,470px);padding:19px;border-radius:30px;background:#fff;border:1px solid #d9e5de;box-shadow:0 35px 90px rgba(27,65,54,.13);transform:rotate(1deg)}.mx-dashboard-top{display:flex;justify-content:space-between;align-items:center;color:#789188;font-size:10px;font-weight:950;letter-spacing:.11em}.mx-live-dot{padding:5px 8px;border-radius:999px;background:#edf6f0;color:#4a826a;letter-spacing:.07em;font-size:8px}.mx-dashboard-title{font-size:23px;font-weight:950;letter-spacing:-.04em;margin:24px 0 13px}.mx-search-preview{border:1px solid #e1e9e4;border-radius:17px;padding:13px;display:grid;grid-template-columns:1fr 1fr;gap:11px;background:#fbfcfb}.mx-search-preview>div{padding:9px 10px;border-radius:11px;background:#fff}.mx-search-preview small,.mx-search-preview strong{display:block}.mx-search-preview small{color:#8b9791;font-size:8px;text-transform:uppercase;letter-spacing:.08em;font-weight:900}.mx-search-preview strong{font-size:11px;margin-top:4px}.mx-search-preview-btn{grid-column:1 / -1!important;background:var(--mx-green)!important;color:#fff;display:flex;align-items:center;justify-content:center;gap:7px;font-size:11px;font-weight:900;padding:12px!important}.mx-match-card{display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:10px;margin-top:12px;padding:13px;border-radius:15px;background:#e8f2ec;border:1px solid #d5e7dc}.mx-match-avatar{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#173a31;color:#fff;font-size:10px;font-weight:950}.mx-match-card small{display:block;color:#608373;font-size:7px;letter-spacing:.09em;font-weight:950}.mx-match-card strong{display:block;font-size:10px;line-height:1.3;margin-top:4px}.mx-match-card>span{font-size:18px;font-weight:950;color:var(--mx-green)}.mx-mini-row{display:flex;justify-content:space-between;gap:15px;margin-top:14px;color:#7f8b86;font-size:8px;font-weight:800}.mx-floating{position:absolute;display:flex;gap:8px;align-items:center;padding:11px 13px;background:#fff;border:1px solid var(--mx-line);border-radius:14px;box-shadow:0 18px 45px rgba(22,42,37,.11);font-size:9px;font-weight:850}.mx-floating b{display:grid;place-items:center;width:22px;height:22px;border-radius:8px;background:#eef5f1;color:var(--mx-green);font-size:9px}.mx-floating-a{right:-4px;top:42px}.mx-floating-b{left:-14px;bottom:46px}.mx-audience{background:#fff;padding:84px 0;border-bottom:1px solid var(--mx-line)}.mx-audience-head{margin-bottom:31px}.mx-audience-head h2{font-size:42px;letter-spacing:-.055em;line-height:1.02;margin:10px 0 0}.mx-audience-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.mx-audience-card{min-height:320px;padding:28px;border-radius:24px;display:flex;flex-direction:column;justify-content:flex-end;border:1px solid var(--mx-line);transition:.18s ease}.mx-audience-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(22,42,37,.08)}.mx-family-card{background:#f4f8f5}.mx-provider-card{background:#f9f1eb;border-color:#ead7cd}.mx-card-tag{align-self:flex-start;position:absolute;transform:translateY(-245px);font-size:10px;letter-spacing:.12em;font-weight:950;color:#70857d}.mx-audience-icon{width:47px;height:47px;display:grid;place-items:center;border-radius:14px;background:#fff;color:var(--mx-green);font-size:18px;margin-bottom:18px}.mx-audience-card h3{font-size:29px;letter-spacing:-.045em;line-height:1.05;margin:0 0 10px}.mx-audience-card p{max-width:470px;color:#6f7e77;font-size:12px;line-height:1.65;margin:0 0 18px}.mx-audience-card strong{color:var(--mx-ink);font-size:11px}.mx-why{padding:92px 0;background:var(--mx-cream)}.mx-heading{max-width:790px}.mx-heading h2{font-size:clamp(34px,4vw,56px);line-height:1;letter-spacing:-.06em;margin:11px 0 13px}.mx-heading p{max-width:700px;color:#697970;font-size:15px;line-height:1.7;margin:0}.mx-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}.mx-why-grid article{padding:27px;border-top:2px solid #cfe0d6}.mx-why-grid article>span{font-size:10px;font-weight:950;color:var(--mx-green-2)}.mx-why-grid h3{font-size:22px;line-height:1.05;letter-spacing:-.04em;margin:30px 0 9px}.mx-why-grid p{font-size:12px;color:#72817a;line-height:1.65;margin:0}.mx-journey{padding:82px 0;background:#edf4ef}.mx-journey-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:39px;border-top:1px solid #d0ded6}.mx-journey-grid article{padding:23px 18px 20px;border-right:1px solid #d0ded6}.mx-journey-grid article:last-child{border-right:0}.mx-journey-number{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#fff;color:var(--mx-green);font-size:10px;font-weight:950}.mx-journey-grid h3{font-size:20px;margin:17px 0 6px;letter-spacing:-.03em}.mx-journey-grid p{font-size:11px;line-height:1.55;color:#75847d;margin:0}.mx-directory{padding:88px 0;background:#fff}.mx-directory-head{display:flex;justify-content:space-between;align-items:end;gap:28px}.mx-directory-head h2{font-size:clamp(34px,4vw,54px);line-height:1.02;letter-spacing:-.06em;margin:10px 0 10px}.mx-directory-head p{max-width:650px;color:#718078;font-size:13px;line-height:1.6;margin:0}.mx-text-link{white-space:nowrap;font-size:11px;font-weight:950;color:var(--mx-green)}.mx-provider-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:36px}.mx-provider-tile{border:1px solid var(--mx-line);border-radius:18px;background:#fff;overflow:hidden;transition:.17s ease}.mx-provider-tile:hover{transform:translateY(-3px);box-shadow:0 18px 45px rgba(22,42,37,.08)}.mx-provider-art{height:135px;background:linear-gradient(135deg,#e7f1eb,#f7eee6);display:flex;align-items:flex-end;justify-content:space-between;padding:13px}.mx-provider-monogram{display:grid;place-items:center;width:52px;height:52px;border-radius:15px;background:#173a31;color:#fff;font-size:14px;font-weight:950}.mx-provider-art span{padding:6px 8px;border-radius:999px;background:rgba(255,255,255,.75);color:#64756d;font-size:8px;font-weight:850}.mx-provider-content{padding:15px}.mx-provider-content small{color:#719084;font-size:8px;font-weight:950;text-transform:uppercase;letter-spacing:.08em}.mx-provider-content h3{font-size:16px;line-height:1.08;margin:7px 0 5px;letter-spacing:-.03em}.mx-provider-content p{font-size:10px;color:#7c8984;margin:0}.mx-provider-content div{display:flex;align-items:center;gap:6px;margin-top:14px;color:var(--mx-green);font-size:9px;font-weight:950}.mx-empty{margin-top:36px;padding:35px;border:1px dashed #ccd9d2;border-radius:18px;background:#f7faf8;display:grid;gap:5px}.mx-empty strong{font-size:16px}.mx-empty span{font-size:11px;color:#74827c}.mx-local{padding:90px 0;background:#173a31;color:#fff}.mx-local-grid{display:grid;grid-template-columns:1fr .9fr;gap:80px;align-items:center}.mx-local .mx-kicker{color:#9fc7b2}.mx-local h2{font-size:clamp(34px,4vw,52px);line-height:1.01;letter-spacing:-.06em;margin:11px 0 14px}.mx-local p{max-width:600px;color:#d3e2db;font-size:14px;line-height:1.7;margin:0}.mx-city-links{border-top:1px solid rgba(255,255,255,.15)}.mx-city-links a{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.15);color:#f0f5f2;font-size:13px;font-weight:850}.mx-city-links a span{color:#a5c9b8}.mx-vision{padding:83px 0;background:#f5f2eb}.mx-vision-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:80px;align-items:end}.mx-vision h2{font-size:clamp(34px,4vw,54px);letter-spacing:-.055em;line-height:1;margin:10px 0 0}.mx-vision p{font-size:16px;line-height:1.7;color:#64736d;margin:0;max-width:650px}.mx-final{padding:95px 0;background:radial-gradient(circle at 80% 20%,#ffe6dc 0,transparent 31%),#fbfaf7}.mx-final-copy{max-width:780px}.mx-final h2{font-size:clamp(38px,4.8vw,64px);line-height:.98;letter-spacing:-.06em;margin:11px 0 14px}.mx-final p{color:#718078;font-size:15px;margin:0}.mx-btn-light{margin-top:24px;background:var(--mx-coral);color:#fff;box-shadow:0 14px 28px rgba(233,111,79,.18)}.mx-btn-light:hover{transform:translateY(-2px);background:#d85f40}@media(max-width:900px){.mx-hero-grid,.mx-local-grid,.mx-vision-grid{grid-template-columns:1fr;gap:45px}.mx-hero{padding-top:55px}.mx-hero-visual{min-height:390px}.mx-provider-grid{grid-template-columns:1fr 1fr}.mx-journey-grid{grid-template-columns:1fr 1fr}.mx-why-grid{grid-template-columns:1fr}.mx-directory-head{align-items:flex-start;flex-direction:column}.mx-floating-a{right:4px}.mx-floating-b{left:3px}}@media(max-width:600px){.mx-shell{width:calc(100% - 28px)}.mx-hero{padding:42px 0 56px}.mx-hero-copy h1{font-size:44px}.mx-hero-lead{font-size:15px}.mx-proof{gap:8px 12px}.mx-actions{flex-direction:column}.mx-btn{width:100%}.mx-hero-visual{min-height:320px}.mx-dashboard{transform:none;border-radius:22px;padding:14px}.mx-floating{font-size:8px}.mx-floating-a{top:7px;right:0}.mx-floating-b{left:0;bottom:8px}.mx-audience,.mx-why,.mx-journey,.mx-directory,.mx-local,.mx-vision,.mx-final{padding:60px 0}.mx-audience-head h2{font-size:32px}.mx-audience-grid{grid-template-columns:1fr}.mx-audience-card{min-height:270px}.mx-card-tag{transform:translateY(-205px)}.mx-provider-grid{grid-template-columns:1fr}.mx-journey-grid{grid-template-columns:1fr}.mx-journey-grid article{border-right:0;border-bottom:1px solid #d0ded6}.mx-journey-grid article:last-child{border-bottom:0}.mx-provider-art{height:120px}.mx-local-grid{gap:34px}}
    `}</style>
  </main>;
}

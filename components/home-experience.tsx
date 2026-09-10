import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

const Arrow = () => <span aria-hidden="true">↗</span>;

export async function HomeExperience({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 3);
  const copy = fr
    ? {
        eyebrow: "LA GARDE QUI S’ADAPTE À VOTRE FAMILLE",
        title: "Trouvez une garde qui ressemble à votre vraie vie.",
        lead: "Dites-nous où vous vivez, l’âge de votre enfant et ce qui compte pour vous. MyCoco vous montre les solutions à regarder en premier.",
        mainCta: "Trouver ma garde",
        providerCta: "Créer mon espace service",
        proof: ["Recherche gratuite", "Sans compte pour commencer", "Données et disponibilité clairement distinguées"],
        chooser: "Vous êtes ici pour…",
        familyTitle: "Trouver une solution pour ma famille",
        familyText: "Définissez votre besoin en quelques questions, comparez les services et gardez votre recherche active.",
        providerTitle: "Présenter mon service aux bonnes familles",
        providerText: "Créez votre fiche, complétez votre espace et soyez découvert par les familles qui cherchent réellement dans votre secteur.",
        demoKicker: "VOUS GARDEZ LE CONTRÔLE",
        demoTitle: "Un produit qui transforme une recherche dispersée en parcours clair.",
        demoText: "MyCoco commence par le besoin. Ensuite seulement viennent l’annuaire, la comparaison, la mise en relation et les alertes.",
        steps: [
          ["01", "Définir le besoin", "Secteur · âge · type · date"],
          ["02", "Découvrir", "Services pertinents autour de vous"],
          ["03", "Choisir", "Comparer puis contacter"],
        ],
        directoryKicker: "L’ANNUAIRE MYCOCO",
        directoryTitle: "Pas une liste froide. Des fiches conçues pour décider.",
        directoryText: "Chaque service peut commencer avec une fiche publique, puis la revendiquer et la compléter depuis son espace professionnel.",
        directoryCta: "Parcourir l’annuaire",
        localTitle: "Commencer localement. Devenir le réflexe.",
        localText: "MyCoco se construit ville par ville. Nous préférons une expérience dense et utile dans les Laurentides à un annuaire immense et vide.",
        localCta: "Voir les services près de moi",
        visionKicker: "CE QUE MYCOCO VEUT DEVENIR",
        visionTitle: "La garde est le point de départ. Pas la destination.",
        visionText: "À terme : garde, activités, camps, événements, professionnels et solutions de secours dans un même espace familial.",
        finalTitle: "Moins de recherche. Plus de bonnes décisions.",
        finalCta: "Commencer ma recherche",
        cities: ["Mirabel", "Blainville", "Boisbriand", "Saint-Eustache", "Sainte-Thérèse"],
      }
    : {
        eyebrow: "CHILDCARE THAT FITS YOUR FAMILY",
        title: "Find childcare that fits your real life.",
        lead: "Tell us where you live, your child’s age and what matters to you. MyCoco shows you the options worth looking at first.",
        mainCta: "Find my childcare",
        providerCta: "Create my provider space",
        proof: ["Free search", "No account to start", "Data and availability clearly separated"],
        chooser: "I’m here to…",
        familyTitle: "Find a solution for my family",
        familyText: "Define your need in a few questions, compare providers and keep your search moving.",
        providerTitle: "Put my service in front of the right families",
        providerText: "Create your listing, complete your space and get discovered by families actively searching in your area.",
        demoKicker: "YOU STAY IN CONTROL",
        demoTitle: "A product that turns scattered research into a clear journey.",
        demoText: "MyCoco starts with the need. Only then come directory discovery, comparison, connection and alerts.",
        steps: [["01", "Define the need", "Area · age · type · timing"], ["02", "Discover", "Relevant services nearby"], ["03", "Choose", "Compare then connect"]],
        directoryKicker: "THE MYCOCO DIRECTORY",
        directoryTitle: "Not a cold list. Profiles built to help families decide.",
        directoryText: "Every provider can start with a public profile, then claim and complete it from a professional space.",
        directoryCta: "Browse the directory",
        localTitle: "Start local. Become the family reflex.",
        localText: "MyCoco grows city by city. We would rather be genuinely useful in the Laurentians than publish a huge empty directory.",
        localCta: "See childcare near me",
        visionKicker: "WHAT MYCOCO CAN BECOME",
        visionTitle: "Childcare is the starting point. Not the destination.",
        visionText: "Over time: childcare, activities, camps, events, professionals and backup solutions in one family space.",
        finalTitle: "Less searching. Better decisions.",
        finalCta: "Start my search",
        cities: ["Mirabel", "Blainville", "Boisbriand", "Saint-Eustache", "Sainte-Thérèse"],
      };

  return (
    <main className="mycoco-home-v5">
      <section className="v5-hero">
        <div className="v5-shell v5-hero-grid">
          <div className="v5-hero-copy">
            <span className="v5-eyebrow">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p className="v5-lead">{copy.lead}</p>
            <div className="v5-actions">
              <Link className="v5-btn v5-btn-main" href={`/${locale}/mon-besoin`}>{copy.mainCta}<Arrow /></Link>
              <Link className="v5-btn v5-btn-secondary" href={`/${locale}/pour-les-services`}>{copy.providerCta}<Arrow /></Link>
            </div>
            <div className="v5-proof">{copy.proof.map((item) => <span key={item}><b>✓</b>{item}</span>)}</div>
          </div>

          <div className="v5-product-stage" aria-label="Aperçu de l’expérience MyCoco">
            <div className="v5-window">
              <div className="v5-window-bar"><div className="v5-dots"><i></i><i></i><i></i></div><span>mycoco.ca</span><b>FAMILLE</b></div>
              <div className="v5-window-body">
                <div className="v5-mini-nav"><strong>my<span>coco</span></strong><span>{fr ? "Ma recherche" : "My search"}</span></div>
                <div className="v5-demo-title">{fr ? "Trouvons ce qui vous convient." : "Let’s find what fits."}</div>
                <div className="v5-demo-fields"><div><small>{fr ? "SECTEUR" : "AREA"}</small><strong>Mirabel</strong></div><div><small>{fr ? "ÂGE" : "AGE"}</small><strong>{fr ? "0–18 mois" : "0–18 months"}</strong></div><div><small>{fr ? "PRÉFÉRENCE" : "PREFERENCE"}</small><strong>{fr ? "Toutes les solutions" : "All options"}</strong></div></div>
                <div className="v5-demo-result"><div className="v5-result-badge">94%</div><div><small>MYCOCO MATCH</small><strong>{fr ? "Services à regarder en premier" : "Services worth looking at first"}</strong><span>{fr ? "Selon votre besoin et votre secteur" : "Based on your need and area"}</span></div><Arrow /></div>
              </div>
            </div>
            <div className="v5-float v5-float-a"><b>✓</b><div><strong>{fr ? "Recherche enregistrée" : "Search saved"}</strong><span>{fr ? "Revenez quand vous voulez" : "Come back anytime"}</span></div></div>
            <div className="v5-float v5-float-b"><b>+1</b><div><strong>{fr ? "Nouvelle possibilité" : "New possibility"}</strong><span>{fr ? "Dans votre secteur" : "In your area"}</span></div></div>
          </div>
        </div>
      </section>

      <section className="v5-chooser">
        <div className="v5-shell">
          <div className="v5-section-head"><span>{fr ? "COMMENCEZ PAR LÀ" : "START HERE"}</span><h2>{copy.chooser}</h2></div>
          <div className="v5-chooser-grid">
            <Link href={`/${locale}/mon-besoin`} className="v5-chooser-card v5-chooser-family"><span className="v5-card-kicker">{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span><div className="v5-chooser-icon">⌂</div><h3>{copy.familyTitle}</h3><p>{copy.familyText}</p><strong>{copy.mainCta}<Arrow /></strong></Link>
            <Link href={`/${locale}/pour-les-services`} className="v5-chooser-card v5-chooser-provider"><span className="v5-card-kicker">{fr ? "POUR LES SERVICES" : "FOR PROVIDERS"}</span><div className="v5-chooser-icon">◫</div><h3>{copy.providerTitle}</h3><p>{copy.providerText}</p><strong>{copy.providerCta}<Arrow /></strong></Link>
          </div>
        </div>
      </section>

      <section className="v5-product">
        <div className="v5-shell v5-product-grid">
          <div><span className="v5-eyebrow">{copy.demoKicker}</span><h2>{copy.demoTitle}</h2><p>{copy.demoText}</p><div className="v5-steps">{copy.steps.map(([n,t,p]) => <div key={n}><b>{n}</b><div><strong>{t}</strong><span>{p}</span></div></div>)}</div></div>
          <div className="v5-dashboard-mock">
            <div className="v5-dashboard-head"><span>{fr ? "MON ESPACE FAMILLE" : "MY FAMILY SPACE"}</span><i>{fr ? "Actif" : "Active"}</i></div>
            <div className="v5-profile-row"><div className="v5-avatar">B</div><div><strong>{fr ? "Ma famille" : "My family"}</strong><span>{fr ? "Mirabel · 2 enfants" : "Mirabel · 2 children"}</span></div><button>{fr ? "Modifier" : "Edit"}</button></div>
            <div className="v5-dash-card"><small>{fr ? "BESOIN ACTIF" : "ACTIVE NEED"}</small><strong>{fr ? "Garde · 0–18 mois" : "Childcare · 0–18 months"}</strong><span>Mirabel, QC · {fr ? "Dès que possible" : "As soon as possible"}</span><div className="v5-dash-progress"><i style={{ width: "72%" }}></i></div><em>72%</em></div>
            <div className="v5-dash-links"><div><b>03</b><span>{fr ? "services à comparer" : "providers to compare"}</span></div><div><b>04</b><span>{fr ? "étapes restantes" : "steps remaining"}</span></div></div>
          </div>
        </div>
      </section>

      <section className="v5-directory">
        <div className="v5-shell">
          <div className="v5-section-head v5-section-head-row"><div><span>{copy.directoryKicker}</span><h2>{copy.directoryTitle}</h2><p>{copy.directoryText}</p></div><Link href={`/${locale}/garderies`} className="v5-outline-link">{copy.directoryCta}<Arrow /></Link></div>
          <div className="v5-provider-grid">
            {featured.map((record) => <Link className="v5-provider" href={`/${locale}/garderie/${record.slug}`} key={record.id}><div className="v5-provider-visual"><div>{record.name.slice(0, 1).toUpperCase()}</div><span>{fr ? "FICHE PUBLIQUE" : "PUBLIC PROFILE"}</span></div><div className="v5-provider-body"><small>{typeLabel(record.type, fr)}</small><h3>{record.name}</h3><p>{record.city}</p><strong>{fr ? "Voir la fiche" : "View profile"}<Arrow /></strong></div></Link>)}
          </div>
        </div>
      </section>

      <section className="v5-local"><div className="v5-shell v5-local-grid"><div><span>{fr ? "LE RÉSEAU LOCAL" : "LOCAL NETWORK"}</span><h2>{copy.localTitle}</h2><p>{copy.localText}</p><Link className="v5-btn v5-btn-main" href={`/${locale}/garderies`}>{copy.localCta}<Arrow /></Link></div><div className="v5-city-grid">{copy.cities.map((city) => <Link href={`/${locale}/garderies/${city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")}`} key={city}><span>{city}</span><Arrow /></Link>)}</div></div></section>

      <section className="v5-vision"><div className="v5-shell v5-vision-grid"><div><span>{copy.visionKicker}</span><h2>{copy.visionTitle}</h2></div><p>{copy.visionText}</p></div></section>
      <section className="v5-final"><div className="v5-shell"><span>MYCOCO</span><h2>{copy.finalTitle}</h2><Link className="v5-btn v5-btn-light" href={`/${locale}/mon-besoin`}>{copy.finalCta}<Arrow /></Link></div></section>

      <style>{`
        .mycoco-home-v5{--ink:#17322b;--green:#2f765f;--mint:#e5f0e9;--cream:#fbf8f1;--sand:#f0e9df;--coral:#e87858;--line:#d8e2dc;--muted:#66756e;background:var(--cream);color:var(--ink);overflow:hidden}.v5-shell{width:min(1180px,calc(100% - 40px));margin:auto}.v5-hero{padding:70px 0 92px;background:linear-gradient(135deg,#fbf8f1 0%,#edf4ef 50%,#f7efe7 100%);border-bottom:1px solid var(--line)}.v5-hero-grid{display:grid;grid-template-columns:1.02fr .98fr;gap:70px;align-items:center}.v5-eyebrow,.v5-section-head>span,.v5-local>div>div>span,.v5-vision span,.v5-final>div>span{display:block;color:var(--green);font-size:10px;font-weight:950;letter-spacing:.15em}.v5-hero-copy h1{max-width:720px;margin:15px 0 20px;font-size:clamp(48px,6.2vw,78px);line-height:.95;letter-spacing:-.07em}.v5-lead{max-width:610px;font-size:18px;line-height:1.65;color:var(--muted);margin:0}.v5-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:27px}.v5-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:50px;padding:0 18px;border-radius:12px;font-size:12px;font-weight:900}.v5-btn-main{background:var(--ink);color:#fff;box-shadow:0 14px 28px rgba(23,50,43,.14)}.v5-btn-secondary{border:1px solid #ccd8d1;background:#fff;color:var(--ink)}.v5-btn-light{background:#fff;color:var(--ink)}.v5-proof{display:flex;flex-wrap:wrap;gap:16px;margin-top:18px;color:#6c7b74;font-size:10px;font-weight:750}.v5-proof span{display:flex;align-items:center;gap:6px}.v5-proof b{color:var(--green)}.v5-product-stage{position:relative;min-height:430px}.v5-window{position:absolute;inset:10px 20px 30px 10px;background:#fff;border:1px solid #d5e0da;border-radius:25px;box-shadow:0 35px 90px rgba(23,50,43,.16);overflow:hidden;transform:rotate(1deg)}.v5-window-bar{height:47px;padding:0 16px;display:flex;align-items:center;gap:13px;border-bottom:1px solid #e8eeeb;background:#fbfbf9;color:#71817a;font-size:9px}.v5-window-bar>span{flex:1;text-align:center}.v5-window-bar>b{color:var(--green);font-size:8px;letter-spacing:.12em}.v5-dots{display:flex;gap:5px}.v5-dots i{width:7px;height:7px;border-radius:50%;background:#dce4df}.v5-window-body{padding:24px}.v5-mini-nav{display:flex;justify-content:space-between;color:#84918b;font-size:9px}.v5-mini-nav strong{color:var(--ink);font-size:13px;letter-spacing:-.04em}.v5-mini-nav strong span{color:var(--green)}.v5-demo-title{max-width:390px;margin:38px 0 22px;font-size:31px;line-height:1.02;letter-spacing:-.05em}.v5-demo-fields{display:grid;grid-template-columns:1fr 1fr;gap:9px}.v5-demo-fields div{padding:12px;border:1px solid #dde6e1;border-radius:12px}.v5-demo-fields small,.v5-demo-fields strong{display:block}.v5-demo-fields small{font-size:7px;color:#92a099;letter-spacing:.12em}.v5-demo-fields strong{font-size:11px;margin-top:4px}.v5-demo-result{display:grid;grid-template-columns:48px 1fr 18px;align-items:center;gap:10px;margin-top:11px;padding:12px;background:#edf5f0;border:1px solid #d6e5db;border-radius:14px}.v5-result-badge{display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:var(--ink);color:#fff;font-weight:950;font-size:12px}.v5-demo-result small{display:block;color:var(--green);font-size:7px;font-weight:950}.v5-demo-result strong{display:block;font-size:10px;line-height:1.25;margin-top:3px}.v5-demo-result span{display:block;color:#7a8982;font-size:8px;margin-top:3px}.v5-float{position:absolute;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #d8e2dc;border-radius:15px;padding:10px 12px;box-shadow:0 16px 40px rgba(23,50,43,.13)}.v5-float b{display:grid;place-items:center;width:32px;height:32px;border-radius:10px;background:var(--mint);color:var(--green);font-size:11px}.v5-float strong,.v5-float span{display:block}.v5-float strong{font-size:8px}.v5-float span{font-size:7px;color:#7f8c86;margin-top:2px}.v5-float-a{left:-12px;bottom:35px}.v5-float-b{right:-5px;top:65px}.v5-float-b b{background:#fde9e2;color:var(--coral)}.v5-chooser{padding:76px 0;background:#fff}.v5-section-head{max-width:760px;margin-bottom:30px}.v5-section-head h2{font-size:clamp(33px,4vw,51px);line-height:1.02;letter-spacing:-.055em;margin:10px 0}.v5-section-head p{max-width:700px;color:var(--muted);line-height:1.65;margin:0}.v5-chooser-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.v5-chooser-card{padding:30px;border-radius:22px;border:1px solid var(--line);min-height:280px}.v5-chooser-family{background:#17322b;color:#fff;border-color:#17322b}.v5-chooser-provider{background:#f4eee5}.v5-card-kicker{font-size:9px;font-weight:950;letter-spacing:.14em;opacity:.7}.v5-chooser-icon{margin:48px 0 15px;font-size:26px}.v5-chooser-card h3{font-size:25px;line-height:1.05;letter-spacing:-.045em;margin:0 0 9px}.v5-chooser-card p{max-width:470px;font-size:12px;line-height:1.6;opacity:.74;margin:0}.v5-chooser-card strong{display:inline-flex;gap:7px;margin-top:22px;font-size:10px}.v5-chooser-family strong{color:#fff}.v5-product{padding:92px 0;background:#f1f5f2}.v5-product-grid{display:grid;grid-template-columns:1fr 470px;gap:80px;align-items:center}.v5-product-grid h2{max-width:630px;font-size:clamp(34px,4.6vw,57px);line-height:1;letter-spacing:-.06em;margin:12px 0 15px}.v5-product-grid>div>p{max-width:610px;color:var(--muted);line-height:1.65}.v5-steps{margin-top:30px;border-top:1px solid #d4dfd9}.v5-steps>div{display:grid;grid-template-columns:38px 1fr;gap:10px;padding:16px 0;border-bottom:1px solid #d4dfd9}.v5-steps b{font-size:10px;color:var(--green)}.v5-steps strong,.v5-steps span{display:block}.v5-steps strong{font-size:11px}.v5-steps span{font-size:9px;color:#7a8882;margin-top:3px}.v5-dashboard-mock{background:#fff;border:1px solid #d7e1db;border-radius:22px;padding:20px;box-shadow:0 24px 70px rgba(23,50,43,.11)}.v5-dashboard-head{display:flex;justify-content:space-between;font-size:8px;font-weight:950;letter-spacing:.13em;color:#7d8b85}.v5-dashboard-head i{font-style:normal;color:var(--green);letter-spacing:0}.v5-profile-row{display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;margin:24px 0 16px}.v5-avatar{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#f5e6d9;color:#b96045;font-weight:950}.v5-profile-row strong,.v5-profile-row span{display:block}.v5-profile-row strong{font-size:11px}.v5-profile-row span{font-size:9px;color:#808e88;margin-top:3px}.v5-profile-row button{border:1px solid #d9e3dd;border-radius:8px;background:#fff;color:#6d7b75;font-size:8px;padding:8px 9px}.v5-dash-card{position:relative;padding:16px;border-radius:15px;background:#edf5f0}.v5-dash-card small{display:block;font-size:7px;color:var(--green);font-weight:950;letter-spacing:.12em}.v5-dash-card strong{display:block;font-size:14px;margin-top:6px}.v5-dash-card span{display:block;font-size:8px;color:#798781;margin-top:4px}.v5-dash-card em{position:absolute;right:14px;top:15px;font-size:10px;font-style:normal;font-weight:950;color:var(--green)}.v5-dash-progress{height:4px;border-radius:99px;background:#d9e5de;margin-top:16px;overflow:hidden}.v5-dash-progress i{display:block;height:100%;background:var(--green);border-radius:99px}.v5-dash-links{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.v5-dash-links div{display:grid;gap:4px;padding:13px;border:1px solid #e0e7e3;border-radius:12px}.v5-dash-links b{font-size:16px}.v5-dash-links span{font-size:8px;color:#7c8983}.v5-directory{padding:92px 0;background:#fff}.v5-section-head-row{display:flex;justify-content:space-between;align-items:end;gap:35px}.v5-outline-link{display:inline-flex;gap:8px;padding:11px 13px;border:1px solid var(--line);border-radius:11px;font-size:9px;font-weight:900;white-space:nowrap}.v5-provider-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.v5-provider{border:1px solid var(--line);border-radius:19px;overflow:hidden;background:#fff;transition:transform .16s ease,box-shadow .16s ease}.v5-provider:hover{transform:translateY(-4px);box-shadow:0 18px 42px rgba(23,50,43,.1)}.v5-provider-visual{height:155px;background:linear-gradient(135deg,#dfeae4,#f3e9de);display:flex;align-items:flex-end;justify-content:space-between;padding:15px}.v5-provider-visual>div{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:#17322b;color:#fff;font-size:19px;font-weight:950}.v5-provider-visual span{font-size:7px;font-weight:950;letter-spacing:.12em;color:#5e7068}.v5-provider-body{padding:18px}.v5-provider-body small{color:var(--green);font-size:8px;font-weight:950}.v5-provider-body h3{font-size:19px;line-height:1.05;letter-spacing:-.03em;margin:7px 0}.v5-provider-body p{font-size:9px;color:#75827c;margin:0}.v5-provider-body strong{display:inline-flex;gap:7px;margin-top:17px;font-size:9px}.v5-local{padding:86px 0;background:#17322b;color:#fff}.v5-local-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}.v5-local h2{font-size:clamp(33px,4.5vw,55px);line-height:1;letter-spacing:-.06em;margin:12px 0 14px}.v5-local p{max-width:580px;color:#d0ddd7;line-height:1.65}.v5-city-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.v5-city-grid a{display:flex;justify-content:space-between;align-items:center;padding:17px 15px;border:1px solid rgba(255,255,255,.16);border-radius:12px;color:#edf5f1;font-size:10px;font-weight:850;background:rgba(255,255,255,.03)}.v5-city-grid a:hover{background:rgba(255,255,255,.07)}.v5-vision{padding:82px 0;background:#f5f1e9}.v5-vision-grid{display:grid;grid-template-columns:1fr 1fr;gap:75px;align-items:start}.v5-vision h2{max-width:550px;font-size:clamp(34px,4.5vw,56px);line-height:1;letter-spacing:-.06em;margin:11px 0}.v5-vision p{margin:0;max-width:560px;color:#68766f;font-size:15px;line-height:1.7}.v5-final{padding:80px 0;background:#ea7658;color:#fff}.v5-final>div{display:flex;align-items:center;justify-content:space-between;gap:30px}.v5-final>div>span{color:#ffe3da}.v5-final h2{max-width:670px;margin:9px 0 0;font-size:clamp(33px,4.6vw,58px);line-height:1;letter-spacing:-.06em}.v5-final .v5-btn{margin-left:auto;white-space:nowrap}@media(max-width:900px){.v5-hero-grid,.v5-product-grid,.v5-local-grid,.v5-vision-grid{grid-template-columns:1fr}.v5-product-stage{max-width:650px;margin:auto;width:100%}.v5-provider-grid{grid-template-columns:1fr 1fr}.v5-product-grid{gap:45px}.v5-section-head-row{align-items:start;flex-direction:column}.v5-final>div{align-items:flex-start;flex-direction:column}.v5-final .v5-btn{margin-left:0}.v5-local-grid{gap:45px}}@media(max-width:620px){.v5-shell{width:calc(100% - 28px)}.v5-hero{padding:48px 0 55px}.v5-hero-copy h1{font-size:45px}.v5-lead{font-size:15px}.v5-actions{display:grid}.v5-btn{width:100%}.v5-product-stage{min-height:340px}.v5-window{inset:0 4px 20px 4px}.v5-window-body{padding:17px}.v5-demo-title{font-size:25px;margin-top:24px}.v5-float-a{left:5px;bottom:0}.v5-float-b{right:3px;top:32px}.v5-chooser,.v5-product,.v5-directory,.v5-vision{padding:62px 0}.v5-chooser-grid,.v5-provider-grid,.v5-city-grid{grid-template-columns:1fr}.v5-chooser-card{min-height:245px;padding:24px}.v5-chooser-icon{margin:30px 0 12px}.v5-local{padding:62px 0}.v5-vision p{font-size:14px}}
      `}</style>
    </main>
  );
}

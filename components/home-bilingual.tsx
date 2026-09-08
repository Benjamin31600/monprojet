import Link from "next/link";
import { cities } from "@/lib/site";
import { getDictionary, type Locale } from "@/lib/i18n";

type IconName = "pin" | "baby" | "grid" | "search" | "arrow" | "shield" | "clock" | "heart";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "pin") return <svg {...common}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
  if (name === "baby") return <svg {...common}><circle cx="12" cy="7" r="3"/><path d="M6.5 21v-4.2a5.5 5.5 0 0 1 11 0V21M9 12.5h6M8 17h8"/></svg>;
  if (name === "grid") return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>;
  if (name === "search") return <svg {...common}><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4.2 4.2"/></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>;
  return <svg {...common}><path d="M20.8 8.9c0 5.2-8.8 10.3-8.8 10.3S3.2 14.1 3.2 8.9A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.9Z"/></svg>;
}

export function BilingualHome({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const fr = locale === "fr";

  const benefits = fr
    ? [
        { icon: "pin" as IconName, title: "Près de chez vous", text: "Recherchez par ville ou code postal et concentrez-vous sur les services de votre secteur." },
        { icon: "clock" as IconName, title: "Information plus claire", text: "Voyez quand les informations ont été mises à jour pour éviter les recherches à l’aveugle." },
        { icon: "heart" as IconName, title: "Pensé pour les familles", text: "Une expérience simple aujourd’hui, conçue pour évoluer vers une solution complète de garde." },
      ]
    : [
        { icon: "pin" as IconName, title: "Close to home", text: "Search by city or postal code and focus on childcare services in your area." },
        { icon: "clock" as IconName, title: "Clearer information", text: "See when information was last updated instead of relying on outdated availability." },
        { icon: "heart" as IconName, title: "Built for families", text: "A simple experience today, designed to grow into a complete childcare solution." },
      ];

  return (
    <main>
      <section className="home-hero">
        <div className="home-container hero-layout">
          <div className="hero-copy">
            <div className="location-badge"><span className="badge-dot" /> Québec · Canada</div>
            <h1>{fr ? <>Trouvez la bonne <em>solution de garde.</em></> : <>Find the right <em>childcare solution.</em></>}</h1>
            <p>{fr ? "Garderies, CPE et milieux familiaux : recherchez les options de garde autour de vous, simplement." : "Daycares, CPEs and home daycares: find childcare options around you, simply."}</p>
            <div className="hero-actions">
              <Link className="hero-primary" href={`/${locale}/garderies`}>{fr ? "Trouver une garde" : "Find childcare"}<Icon name="arrow" size={18} /></Link>
              <span className="hero-note"><Icon name="shield" size={16} /> {fr ? "Recherche gratuite" : "Free search"}</span>
            </div>
          </div>

          <div className="hero-search-wrap">
            <div className="search-card-new">
              <div className="search-card-head">
                <div className="search-icon-box"><Icon name="search" size={21} /></div>
                <div><strong>{fr ? "Commencez votre recherche" : "Start your search"}</strong><span>{fr ? "Quelques informations suffisent." : "Just a few details are enough."}</span></div>
              </div>
              <form action={`/${locale}/garderies`} method="get">
                <label className="search-field full-field"><span>{fr ? "Où cherchez-vous ?" : "Where are you looking?"}</span><div className="field-control"><Icon name="pin" size={18} /><input name="ville" placeholder={fr ? "Ville ou code postal" : "City or postal code"} autoComplete="postal-code" /></div></label>
                <div className="search-row">
                  <label className="search-field"><span>{fr ? "Âge" : "Age"}</span><div className="field-control"><Icon name="baby" size={18} /><select name="age" defaultValue=""><option value="">{fr ? "Âge de l’enfant" : "Child’s age"}</option><option value="0-18">0–18 mois</option><option value="18-36">18–36 mois</option><option value="3-5">3–5 ans</option></select></div></label>
                  <label className="search-field"><span>{fr ? "Type de garde" : "Childcare type"}</span><div className="field-control"><Icon name="grid" size={18} /><select name="type" defaultValue=""><option value="">{fr ? "Tous les types" : "All types"}</option><option value="cpe">CPE</option><option value="subventionnee">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="milieu-familial">{fr ? "Milieu familial" : "Home daycare"}</option><option value="non-subventionnee">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></div></label>
                </div>
                <button className="search-submit" type="submit">{fr ? "Rechercher" : "Search"}<Icon name="arrow" size={18} /></button>
              </form>
              <div className="search-footer"><span>✓ {fr ? "Sans inscription" : "No account required"}</span><span>✓ {fr ? "Partout au Québec" : "Across Quebec"}</span></div>
            </div>
            <div className="floating-card"><div className="mini-icon"><Icon name="heart" size={17} /></div><div><strong>{fr ? "Une recherche pensée pour vous" : "A search made for families"}</strong><span>{fr ? "Simple · locale · gratuite" : "Simple · local · free"}</span></div></div>
          </div>
        </div>
      </section>

      <section className="trust-strip"><div className="home-container trust-inner"><span>{fr ? "Pensé pour les familles du Québec" : "Built for Quebec families"}</span><div><span><Icon name="pin" size={16} /> Québec</span><span><Icon name="shield" size={16} /> {fr ? "Recherche gratuite" : "Free search"}</span><span><Icon name="heart" size={16} /> {fr ? "Français & English" : "French & English"}</span></div></div></section>

      <section className="benefits-section"><div className="home-container"><div className="section-heading"><span className="section-kicker">{fr ? "POURQUOI NOUS" : "WHY US"}</span><h2>{fr ? "La garde d’enfants devrait être plus simple." : "Finding childcare should be simpler."}</h2><p>{fr ? "Nous construisons un outil local qui aide les familles à chercher, comparer et, à terme, trouver une solution de garde quand elles en ont besoin." : "We are building a local tool to help families search, compare and, over time, find childcare when they need it."}</p></div><div className="benefit-grid">{benefits.map((item, i) => <article className="benefit-card" key={item.title}><div className="benefit-number">0{i + 1}</div><div className="benefit-icon"><Icon name={item.icon} size={22} /></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>

      <section className="city-section-new"><div className="home-container"><div className="section-heading compact"><span className="section-kicker">{fr ? "PRÈS DE CHEZ VOUS" : "NEAR YOU"}</span><h2>{fr ? "Commencez localement." : "Start local."}</h2><p>{fr ? "Découvrez les secteurs où nous commençons à bâtir notre réseau de garde au Québec." : "Explore the areas where we are starting to build our Quebec childcare network."}</p></div><div className="city-grid-new">{cities.map((city) => <Link className="city-card-new" key={city.slug} href={`/${locale}/garderie/${city.slug}`}><div><span className="city-pin"><Icon name="pin" size={17} /></span><strong>{city.name}</strong><small>{fr ? "Garderies et services de garde" : "Daycares and childcare"}</small></div><span className="city-arrow"><Icon name="arrow" size={17} /></span></Link>)}</div></div></section>

      <section className="future-section"><div className="home-container future-layout"><div><span className="section-kicker light">{fr ? "ET CE N’EST QUE LE DÉBUT" : "AND THIS IS JUST THE START"}</span><h2>{fr ? "Trouver une place. Et ne jamais rester sans solution." : "Find a spot. And never be left without a solution."}</h2></div><div className="future-list"><div><span>01</span><p>{fr ? "Place régulière" : "Regular childcare"}</p></div><div><span>02</span><p>{fr ? "Garde de remplacement" : "Backup care"}</p></div><div><span>03</span><p>{fr ? "Solutions ponctuelles" : "Occasional care"}</p></div></div></div></section>

      <section className="bottom-cta"><div className="home-container bottom-cta-inner"><div><span className="section-kicker">{fr ? "PRÊT À COMMENCER ?" : "READY TO START?"}</span><h2>{fr ? "Votre recherche commence ici." : "Your childcare search starts here."}</h2></div><Link className="hero-primary" href={`/${locale}/garderies`}>{fr ? "Rechercher une garde" : "Search childcare"}<Icon name="arrow" size={18} /></Link></div></section>
    </main>
  );
}

import Link from "next/link";
import { cities } from "@/lib/site";
import { getDictionary, type Locale } from "@/lib/i18n";

const icons = {
  pin: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  child: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="3"/><path d="M5 21c.7-4.2 3-6 7-6s6.3 1.8 7 6"/></svg>,
  clock: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  shield: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 3v5c0 4.7-3 8-7 10-4-2-7-5.3-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>,
  arrow: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>,
};

export function BilingualHome({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const fr = locale === "fr";

  const benefits = fr
    ? [
        { icon: icons.pin, title: "Près de chez vous", text: "Cherchez par ville ou code postal et concentrez-vous sur les options qui comptent vraiment." },
        { icon: icons.clock, title: "Une information plus claire", text: "Voyez quand les informations ont été mises à jour et évitez les recherches dans le vide." },
        { icon: icons.shield, title: "Pensé pour le Québec", text: "CPE, garderies, milieux familiaux et solutions de garde réunis dans une même expérience." },
      ]
    : [
        { icon: icons.pin, title: "Close to home", text: "Search by city or postal code and focus on the options that matter to your family." },
        { icon: icons.clock, title: "Clearer information", text: "See when information was updated and spend less time chasing outdated listings." },
        { icon: icons.shield, title: "Built for Quebec", text: "CPEs, daycares, home daycares and childcare solutions in one simple experience." },
      ];

  return (
    <main>
      <section className="hero">
        <div className="hero-inner hero-layout">
          <div className="hero-copy">
            <div className="location-badge"><span className="maple-mark">✦</span> {fr ? "Pour les familles du Québec" : "For families across Quebec"}</div>
            <span className="eyebrow">{d.home.eyebrow}</span>
            <h1>{d.home.title}</h1>
            <p className="hero-intro">{d.home.intro}</p>
            <div className="hero-points">
              <span>✓ {fr ? "Recherche gratuite" : "Free search"}</span>
              <span>✓ {fr ? "Partout au Québec" : "Across Quebec"}</span>
              <span>✓ {fr ? "Français · English" : "French · English"}</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-blob hero-blob-one" />
            <div className="hero-blob hero-blob-two" />
            <div className="hero-family-card">
              <div className="family-icon">⌂</div>
              <div><strong>{fr ? "Votre recherche, simplement." : "Childcare, made simpler."}</strong><span>{fr ? "Une place adaptée à votre famille." : "A solution that fits your family."}</span></div>
            </div>
            <div className="hero-mini-card hero-mini-top"><span>✓</span>{fr ? "Options locales" : "Local options"}</div>
            <div className="hero-mini-card hero-mini-bottom"><span>⌕</span>{fr ? "Recherche par secteur" : "Search by area"}</div>
          </div>
        </div>

        <div className="hero-inner">
          <form className="search-card" action={`/${locale}/garderies`} method="get">
            <div className="search-heading">
              <div><span className="search-kicker">01</span><strong>{fr ? "Commencez votre recherche" : "Start your search"}</strong></div>
              <span>{fr ? "Quelques informations suffisent pour commencer." : "A few details are enough to get started."}</span>
            </div>
            <div className="search-grid">
              <label>
                <span>{fr ? "Où cherchez-vous ?" : "Where are you looking?"}</span>
                <div className="field-icon">{icons.pin}<input name="ville" placeholder={fr ? "Ville ou code postal" : "City or postal code"} autoComplete="postal-code" /></div>
              </label>
              <label>
                <span>{fr ? "Âge de l'enfant" : "Child's age"}</span>
                <div className="field-icon">{icons.child}<select name="age" defaultValue=""><option value="">{d.home.age}</option><option value="0-18">{d.home.ages.a}</option><option value="18-36">{d.home.ages.b}</option><option value="3-5">{d.home.ages.c}</option></select></div>
              </label>
              <label>
                <span>{fr ? "Type de garde" : "Childcare type"}</span>
                <select name="type" defaultValue=""><option value="">{d.home.type}</option><option value="cpe">{d.home.types.cpe}</option><option value="subventionnee">{d.home.types.subsidized}</option><option value="milieu-familial">{d.home.types.family}</option><option value="non-subventionnee">{d.home.types.private}</option></select>
              </label>
              <button className="search-submit" type="submit">{d.home.search}{icons.arrow}</button>
            </div>
            <div className="search-foot"><span>{fr ? "Aucun compte nécessaire pour commencer" : "No account needed to start"}</span><span>•</span><span>{fr ? "Données pensées pour le Québec" : "Designed around Quebec childcare"}</span></div>
          </form>
        </div>
      </section>

      <section className="value-section">
        <div className="section-inner">
          <div className="section-heading-row"><div><span className="eyebrow">{fr ? "Une recherche différente" : "A better way to search"}</span><h2>{fr ? "Moins chercher. Mieux trouver." : "Search less. Find better."}</h2></div><p>{fr ? "Une expérience conçue autour des réalités des familles québécoises." : "An experience designed around the realities of families in Quebec."}</p></div>
          <div className="cards">{benefits.map((item, i) => <article className="card" key={item.title}><div className="card-top"><span className="card-icon">{item.icon}</span><span className="card-number">0{i + 1}</span></div><h3>{item.title}</h3><p className="muted">{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="city-section">
        <div className="section-inner">
          <div className="section-heading-row city-heading"><div><span className="eyebrow">{fr ? "Commencez localement" : "Start locally"}</span><h2>{d.home.cities}</h2></div><Link className="inline-link" href={`/${locale}/garderies`}>{fr ? "Voir toutes les recherches" : "Browse all searches"} {icons.arrow}</Link></div>
          <div className="city-list">{cities.map((city) => <Link className="city-card" key={city.slug} href={`/${locale}/garderie/${city.slug}`}><span><small>{fr ? "Québec" : "Quebec"}</small>{city.name}</span><span className="city-arrow">{icons.arrow}</span></Link>)}</div>
        </div>
      </section>

      <section className="future-section">
        <div className="section-inner future-grid"><div><span className="eyebrow">{fr ? "Plus qu'une recherche" : "More than a search"}</span><h2>{fr ? "Votre solution de garde, au même endroit." : "Your childcare plan, in one place."}</h2></div><div className="future-copy"><p>{fr ? "Aujourd'hui, trouvez une option près de chez vous. Demain, gérez votre recherche, vos demandes, vos alertes et vos solutions de remplacement depuis un seul espace." : "Today, find an option near you. Tomorrow, manage your search, requests, alerts and backup care from one place."}</p><Link className="secondary-button" href={`/${locale}/a-propos`}>{fr ? "Découvrir le projet" : "Discover the project"} {icons.arrow}</Link></div></div>
      </section>

      <section className="final-cta"><div className="section-inner final-cta-inner"><div><span className="eyebrow">{fr ? "Prêt à commencer ?" : "Ready to start?"}</span><h2>{fr ? "Trouvez une solution de garde près de chez vous." : "Find a childcare solution near you."}</h2></div><Link className="cta-link" href={`/${locale}/garderies`}>{d.home.search}{icons.arrow}</Link></div></section>
    </main>
  );
}

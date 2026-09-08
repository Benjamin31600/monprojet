import Link from "next/link";
import { cities } from "@/lib/site";
import { getDictionary, type Locale } from "@/lib/i18n";

export function BilingualHome({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const fr = locale === "fr";

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">{d.home.eyebrow}</span>
          <h1>{d.home.title}</h1>
          <p className="hero-intro">{d.home.intro}</p>

          <form className="search-card" action={`/${locale}/garderies`} method="get">
            <div className="search-heading">
              <strong>{fr ? "Commencez votre recherche" : "Start your search"}</strong>
              <span>{fr ? "Quelques informations suffisent." : "Just a few details to get started."}</span>
            </div>
            <div className="search-grid">
              <label>
                <span>{fr ? "Où cherchez-vous ?" : "Where are you looking?"}</span>
                <input name="ville" placeholder={d.home.location} autoComplete="postal-code" />
              </label>
              <label>
                <span>{fr ? "Âge de l'enfant" : "Child's age"}</span>
                <select name="age" defaultValue="">
                  <option value="">{d.home.age}</option>
                  <option value="0-18">{d.home.ages.a}</option>
                  <option value="18-36">{d.home.ages.b}</option>
                  <option value="3-5">{d.home.ages.c}</option>
                </select>
              </label>
              <label>
                <span>{fr ? "Type de garde" : "Childcare type"}</span>
                <select name="type" defaultValue="">
                  <option value="">{d.home.type}</option>
                  <option value="cpe">{d.home.types.cpe}</option>
                  <option value="subventionnee">{d.home.types.subsidized}</option>
                  <option value="milieu-familial">{d.home.types.family}</option>
                  <option value="non-subventionnee">{d.home.types.private}</option>
                </select>
              </label>
              <button type="submit">{d.home.search} <span aria-hidden="true">→</span></button>
            </div>
          </form>

          <div className="trust-row">
            <span>✓ {fr ? "Recherche gratuite" : "Free search"}</span>
            <span>✓ {fr ? "Options près de chez vous" : "Local options"}</span>
            <span>✓ {fr ? "Français et English" : "French & English"}</span>
          </div>
        </div>
      </section>

      <section className="value-section">
        <div className="section-inner">
          <span className="eyebrow">{d.home.why}</span>
          <h2>{d.home.notDirectory}</h2>
          <p className="section-lead">
            {fr
              ? "Nous voulons rendre la recherche de garde plus simple, plus claire et plus rapide pour les familles du Québec."
              : "We want to make finding childcare simpler, clearer and faster for families in Quebec."}
          </p>
          <div className="cards">
            {d.home.cards.map((title, i) => (
              <article className="card" key={title}>
                <span className="pill">0{i + 1}</span>
                <h3>{title}</h3>
                <p className="muted">{d.home.cardText[i]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="city-section">
        <div className="section-inner">
          <span className="eyebrow">{d.home.local}</span>
          <h2>{d.home.cities}</h2>
          <div className="city-list">
            {cities.map((city) => (
              <Link className="city-card" key={city.slug} href={`/${locale}/garderie/${city.slug}`}>
                <span>{city.name}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="section-inner">
          <h2>{fr ? "Votre recherche commence ici." : "Your childcare search starts here."}</h2>
          <Link className="cta-link" href={`/${locale}/garderies`}>
            {d.home.search} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

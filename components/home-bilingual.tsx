import Link from "next/link";
import { cities as defaultCities } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
import { getChildcareData, typeLabel } from "@/lib/childcare";

type IconProps = { size?: number };
const Arrow = ({ size = 18 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="m13 6 6 6-6 6"/></svg>;
const Pin = ({ size = 18 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>;
const Shield = ({ size = 18 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 19 6v5c0 4.6-3 8-7 10-4-2-7-5.4-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
const Heart = ({ size = 18 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.8 8.9c0 5.2-8.8 10.3-8.8 10.3S3.2 14.1 3.2 8.9A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.9Z"/></svg>;

const samplePhotos = [
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?auto=format&fit=crop&w=1200&q=82",
];

export async function BilingualHome({ locale, cities = defaultCities }: { locale: Locale; cities?: readonly { slug: string; name: string }[] }) {
  const fr = locale === "fr";
  const data = await getChildcareData();
  const featured = data.records.slice(0, 3);

  const t = {
    heroKicker: fr ? "MYCOCO · POUR LES FAMILLES DU QUÉBEC" : "MYCOCO · FOR QUEBEC FAMILIES",
    heroTitle: fr ? <>Trouver une garde devrait être <em>simple.</em></> : <>Finding childcare should be <em>simple.</em>,</>,
    heroText: fr ? "Dites-nous où vous cherchez, pour quel âge et ce qui compte pour votre famille. MyCoco vous aide à découvrir les services pertinents et à garder votre recherche active." : "Tell us where you are looking, your child’s age and what matters to your family. MyCoco helps you discover relevant services and keep your search active.",
    primary: fr ? "Trouver ma garde" : "Find my childcare",
    browse: fr ? "Parcourir les services" : "Browse providers",
    free: fr ? "Recherche gratuite · sans compte pour commencer" : "Free search · no account to start",
    audienceKicker: fr ? "Vous êtes ici parce que…" : "You are here because…",
    familyTitle: fr ? "Je suis une famille" : "I’m a family",
    familyText: fr ? "Je cherche une solution de garde pour mon enfant." : "I’m looking for childcare for my child.",
    familyCta: fr ? "Trouver ma garde" : "Find childcare",
    providerTitle: fr ? "Je suis un service de garde" : "I’m a childcare provider",
    providerText: fr ? "Je veux présenter mon service et être trouvé par les familles de mon secteur." : "I want to present my service and be discovered by families in my area.",
    providerCta: fr ? "Créer mon espace service" : "Create my provider space",
    finderKicker: fr ? "Commencer une recherche" : "Start a search",
    finderTitle: fr ? "Une question à la fois. Une recherche qui vous ressemble." : "One question at a time. A search that fits your family.",
    finderText: fr ? "Pas besoin de connaître le bon type de garde. Commencez par votre situation et nous ferons le tri avec vous." : "You don’t need to know the right childcare type. Start with your situation and we’ll help narrow it down.",
    step1: fr ? "Où cherchez-vous ?" : "Where are you looking?",
    step1Value: fr ? "Mirabel ou votre code postal" : "Mirabel or your postal code",
    step2: fr ? "Quel âge a votre enfant ?" : "How old is your child?",
    step2Value: fr ? "0 à 18 mois" : "0–18 months",
    step3: fr ? "Quel type de garde ?" : "What type of childcare?",
    step3Value: fr ? "Toutes les solutions" : "All options",
    finderCta: fr ? "Commencer ma recherche" : "Start my search",
    howKicker: fr ? "Le parcours MyCoco" : "The MyCoco journey",
    howTitle: fr ? "De la recherche à la bonne décision." : "From searching to the right decision.",
    howText: fr ? "Nous avons conçu MyCoco autour du vrai parcours d’une famille, pas autour d’un simple annuaire." : "MyCoco is designed around a family’s real journey, not just a directory.",
    directoryKicker: fr ? "Le réseau local" : "The local network",
    directoryTitle: fr ? "Des services de garde à découvrir autour de vous." : "Childcare services to discover around you.",
    directoryCta: fr ? "Voir tout l’annuaire" : "View the directory",
    trustKicker: fr ? "Pourquoi les familles reviennent" : "Why families come back",
    trustTitle: fr ? "Plus qu’une liste de services." : "More than a list of providers.",
    aboutKicker: fr ? "À propos" : "About",
    aboutTitle: fr ? "MyCoco crée le lien entre un besoin familial et une offre locale." : "MyCoco connects a family need with local supply.",
    aboutText: fr ? "Nous commençons par la garde parce que c’est un besoin concret. Notre ambition est de construire progressivement le réflexe familial pour découvrir, comparer, contacter et organiser les services utiles autour de l’enfant." : "We start with childcare because it is a concrete need. Our ambition is to become the family reflex for discovering, comparing, connecting and organizing useful services around children.",
    aboutCta: fr ? "Découvrir notre vision" : "Discover our vision",
    localKicker: fr ? "Nous lançons localement" : "Launching locally",
    localTitle: fr ? "Mirabel et les Laurentides d’abord." : "Mirabel and the Laurentians first.",
    localText: fr ? "Une marketplace est utile quand elle est dense. Nous préférons être excellents dans quelques secteurs avant d’élargir le réseau." : "A marketplace works when it is dense. We would rather be excellent in a few areas before expanding the network.",
    footerCta: fr ? "Prêt à commencer ?" : "Ready to get started?",
  };

  return <main className="mc-home">
    <section className="mc-home-hero">
      <div className="mc-home-container mc-home-hero-inner">
        <div className="mc-home-hero-copy">
          <span className="mc-home-kicker">{t.heroKicker}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="mc-home-actions">
            <Link className="mc-btn mc-btn-primary" href={`/${locale}/mon-besoin`}>{t.primary}<Arrow /></Link>
            <Link className="mc-btn mc-btn-quiet" href={`/${locale}/garderies`}>{t.browse}</Link>
          </div>
          <div className="mc-home-reassurance"><Shield size={15} />{t.free}</div>
        </div>
        <div className="mc-hero-surface" aria-label={fr ? "Aperçu de la recherche MyCoco" : "MyCoco search preview"}>
          <div className="mc-hero-surface-top"><span>{fr ? "VOTRE RECHERCHE" : "YOUR SEARCH"}</span><b>MYCOCO</b></div>
          <div className="mc-hero-search-card">
            <div className="mc-mini-label"><Pin size={14} />{fr ? "Votre secteur" : "Your area"}</div>
            <strong>{fr ? "Mirabel, Québec" : "Mirabel, Quebec"}</strong>
            <div className="mc-mini-separator" />
            <div className="mc-mini-label">{fr ? "Pour mon enfant" : "For my child"}</div>
            <strong>{fr ? "0 à 18 mois" : "0–18 months"}</strong>
            <div className="mc-mini-separator" />
            <div className="mc-mini-label">{fr ? "Type de garde" : "Childcare type"}</div>
            <strong>{fr ? "Toutes les solutions" : "All options"}</strong>
            <Link className="mc-mini-cta" href={`/${locale}/mon-besoin`}>{t.primary}<Arrow size={15} /></Link>
          </div>
          <div className="mc-hero-note"><span>✓</span>{fr ? "Vous pourrez sauvegarder votre recherche plus tard." : "You can save your search later."}</div>
        </div>
      </div>
    </section>

    <section className="mc-audience-section">
      <div className="mc-home-container">
        <div className="mc-section-kicker">{t.audienceKicker}</div>
        <div className="mc-audience-grid">
          <Link className="mc-audience-card mc-audience-family" href={`/${locale}/mon-besoin`}>
            <div className="mc-audience-icon"><Heart /></div>
            <div><span>{fr ? "POUR LES FAMILLES" : "FOR FAMILIES"}</span><h2>{t.familyTitle}</h2><p>{t.familyText}</p></div>
            <div className="mc-audience-link">{t.familyCta}<Arrow size={16} /></div>
          </Link>
          <Link className="mc-audience-card mc-audience-provider" href={`/${locale}/pour-les-services`}>
            <div className="mc-audience-icon"><Shield /></div>
            <div><span>{fr ? "POUR LES SERVICES" : "FOR PROVIDERS"}</span><h2>{t.providerTitle}</h2><p>{t.providerText}</p></div>
            <div className="mc-audience-link">{t.providerCta}<Arrow size={16} /></div>
          </Link>
        </div>
      </div>
    </section>

    <section className="mc-finder-section">
      <div className="mc-home-container mc-finder-grid">
        <div className="mc-finder-copy">
          <span className="mc-home-kicker">{t.finderKicker}</span>
          <h2>{t.finderTitle}</h2>
          <p>{t.finderText}</p>
          <div className="mc-finder-steps">
            <div><b>01</b><span>{t.step1}</span><strong>{t.step1Value}</strong></div>
            <div><b>02</b><span>{t.step2}</span><strong>{t.step2Value}</strong></div>
            <div><b>03</b><span>{t.step3}</span><strong>{t.step3Value}</strong></div>
          </div>
        </div>
        <div className="mc-finder-panel">
          <div className="mc-progress"><i className="active" /><i /><i /></div>
          <span className="mc-panel-label">01 / 03</span>
          <h3>{t.step1}</h3>
          <p>{fr ? "Nous chercherons d’abord près de chez vous." : "We’ll start close to home."}</p>
          <div className="mc-field-preview"><Pin size={17} /><span>{t.step1Value}</span><Arrow size={16} /></div>
          <Link className="mc-btn mc-btn-primary mc-btn-full" href={`/${locale}/mon-besoin`}>{t.finderCta}<Arrow /></Link>
          <small>{fr ? "4 questions · moins de 2 minutes · sans compte" : "4 questions · under 2 minutes · no account"}</small>
        </div>
      </div>
    </section>

    <section className="mc-process-section">
      <div className="mc-home-container">
        <div className="mc-section-heading center"><span>{t.howKicker}</span><h2>{t.howTitle}</h2><p>{t.howText}</p></div>
        <div className="mc-process-grid">
          <article><b>01</b><div className="mc-process-num">1</div><h3>{fr ? "Je décris" : "I describe"}</h3><p>{fr ? "Ma ville, mon enfant et mon besoin." : "My area, my child and my need."}</p></article>
          <article><b>02</b><div className="mc-process-num">2</div><h3>{fr ? "Je découvre" : "I discover"}</h3><p>{fr ? "Les services qui correspondent le mieux." : "The services that fit best."}</p></article>
          <article><b>03</b><div className="mc-process-num">3</div><h3>{fr ? "Je compare" : "I compare"}</h3><p>{fr ? "Les informations utiles avant de choisir." : "The information that matters before choosing."}</p></article>
          <article><b>04</b><div className="mc-process-num">4</div><h3>{fr ? "Je contacte" : "I connect"}</h3><p>{fr ? "Je prends contact avec le service choisi." : "I connect with the provider I choose."}</p></article>
        </div>
      </div>
    </section>

    <section className="mc-directory-section">
      <div className="mc-home-container">
        <div className="mc-section-heading row"><div><span>{t.directoryKicker}</span><h2>{t.directoryTitle}</h2></div><Link className="mc-text-link" href={`/${locale}/garderies`}>{t.directoryCta}<Arrow size={15} /></Link></div>
        {featured.length ? <div className="mc-provider-grid">{featured.map((record, index) => <Link className="mc-provider-card" key={record.id} href={`/${locale}/garderie/${record.slug}`}>
          <div className="mc-provider-image"><img src={samplePhotos[index % samplePhotos.length]} alt="" loading="lazy"/><span>{fr ? "Fiche répertoriée" : "Listed profile"}</span></div>
          <div className="mc-provider-body"><small>{typeLabel(record.type, fr)}</small><h3>{record.name}</h3><p>{record.city}{record.postalCode ? ` · ${record.postalCode}` : ""}</p><div className="mc-provider-foot"><span>{fr ? "Voir la fiche" : "View profile"}</span><Arrow size={15} /></div></div>
        </Link>)}</div> : <div className="mc-empty-provider"><Shield /><h3>{fr ? "Le réseau MyCoco ouvre progressivement." : "The MyCoco network is opening progressively."}</h3><p>{fr ? "Les premières fiches apparaîtront ici au fur et à mesure de l’ouverture du réseau." : "The first profiles will appear here as the network opens."}</p></div>}
        <p className="mc-disclaimer">{fr ? "Une fiche publique ne garantit jamais une place disponible. Les informations doivent être confirmées auprès du service. MyCoco complète les démarches officielles du Québec et ne les remplace pas." : "A public listing never guarantees a spot. Information should be confirmed with the provider. MyCoco complements Quebec’s official process and does not replace it."}</p>
      </div>
    </section>

    <section className="mc-trust-section">
      <div className="mc-home-container">
        <div className="mc-section-heading center"><span>{t.trustKicker}</span><h2>{t.trustTitle}</h2></div>
        <div className="mc-trust-grid">
          <article><div><Shield /></div><h3>{fr ? "Des informations lisibles" : "Clear information"}</h3><p>{fr ? "Les informations importantes sont structurées pour vous aider à comparer." : "Important information is structured to help you compare."}</p></article>
          <article><div><Heart /></div><h3>{fr ? "Un besoin qui reste actif" : "A search that stays active"}</h3><p>{fr ? "Sauvegardez votre recherche et revenez lorsque votre famille évolue." : "Save your search and return when your family’s needs change."}</p></article>
          <article><div><Pin /></div><h3>{fr ? "Un lancement local" : "A local launch"}</h3><p>{fr ? "Nous construisons d’abord un réseau utile dans quelques secteurs des Laurentides." : "We are first building a useful network in selected Laurentians communities."}</p></article>
        </div>
      </div>
    </section>

    <section className="mc-about-section">
      <div className="mc-home-container mc-about-grid">
        <div><span className="mc-home-kicker">{t.aboutKicker}</span><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><Link className="mc-outline-button" href={`/${locale}/a-propos`}>{t.aboutCta}<Arrow size={16} /></Link></div>
        <div className="mc-about-card"><span>MYCOCO</span><strong>{fr ? "Pas seulement trouver une place." : "Not just finding a place."}</strong><b>{fr ? "Trouver la bonne solution." : "Finding the right solution."}</b><small>{fr ? "Garde · activités · événements · professionnels · backup" : "Childcare · activities · events · professionals · backup"}</small></div>
      </div>
    </section>

    <section className="mc-local-section">
      <div className="mc-home-container">
        <span className="mc-home-kicker">{t.localKicker}</span><h2>{t.localTitle}</h2><p>{t.localText}</p>
        <div className="mc-city-grid">{cities.map(city => <Link key={city.slug} href={`/${locale}/garderies/${city.slug}`}><span>{city.name}</span><Arrow size={16} /></Link>)}</div>
      </div>
    </section>

    <section className="mc-final-section"><div className="mc-home-container"><div><span>MYCOCO</span><h2>{t.footerCta}</h2></div><Link className="mc-btn mc-btn-primary" href={`/${locale}/mon-besoin`}>{t.primary}<Arrow /></Link></div></section>
  </main>;
}

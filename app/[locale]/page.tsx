import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const fr = raw === "fr";
  const title = fr ? "MyCoco | La garde qui s'adapte à votre famille" : "MyCoco | Childcare that fits your family";
  const description = fr ? "Décrivez votre besoin et trouvez les options de garde pertinentes près de chez vous." : "Tell us what your family needs and find relevant childcare options close to home.";
  return { title, description, alternates: { canonical: `/${raw}`, languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" } }, openGraph: { title, description, siteName: site.name, type: "website", url: `${site.url}/${raw}` } };
}

const cities = [["Mirabel", "mirabel"], ["Blainville", "blainville"], ["Boisbriand", "boisbriand"], ["Saint-Eustache", "saint-eustache"], ["Sainte-Thérèse", "sainte-therese"]] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const fr = locale === "fr";
  const copy = fr ? {
    eyebrow: "LA GARDE QUI S'ADAPTE À VOTRE FAMILLE",
    title: "Trouver une garde ne devrait pas être un deuxième emploi.",
    lead: "Dites-nous ce dont votre famille a besoin. MyCoco vous aide à repérer les solutions pertinentes près de chez vous, puis à rester à l'affût.",
    cta: "Trouver ma solution", secondary: "Explorer les garderies",
    reassurance: "Gratuit · Sans compte · En moins de 2 minutes",
    finderTitle: "Commencez par votre besoin",
    finderText: "Pas besoin de connaître le bon type de garde. On commence par votre situation.",
    finderItems: ["Votre secteur", "L'âge de votre enfant", "Votre préférence de garde"],
    whyEyebrow: "POURQUOI MYCOCO",
    whyTitle: "Moins chercher. Mieux décider.",
    whyText: "Les familles ne manquent pas de listes. Elles manquent de temps, de clarté et d'une façon simple de comparer ce qui peut réellement leur convenir.",
    cards: [["01", "On part de votre réalité", "Votre ville, l'âge de votre enfant et votre besoin passent avant les listes de services."], ["02", "On vous montre ce qui compte", "Type de garde, secteur et données disponibles : les résultats sont pensés pour être comparables."], ["03", "Votre recherche peut continuer", "Une recherche utile ne s'arrête pas après un clic. MyCoco pourra vous aider à suivre les nouvelles possibilités."]],
    howEyebrow: "COMMENT ÇA MARCHE",
    howTitle: "Une recherche simple, pensée comme un parcours.",
    how: [["01", "Décrivez", "4 questions courtes pour comprendre votre besoin."], ["02", "Découvrez", "Des options pertinentes autour de votre secteur."], ["03", "Choisissez", "Comparez, contactez et confirmez directement auprès du service."]],
    localEyebrow: "ON COMMENCE ICI",
    localTitle: "Mirabel et les Laurentides d'abord.",
    localText: "Une marketplace n'est utile que lorsqu'elle est suffisamment dense. Nous préférons être vraiment utiles dans quelques villes avant de nous étendre partout.",
    localCta: "Voir les garderies",
    ecosystemEyebrow: "NOTRE VISION",
    ecosystemTitle: "La garde est le début, pas la fin.",
    ecosystemText: "À terme, MyCoco veut devenir le réflexe des familles : garde, activités, camps, événements, professionnels et solutions de secours — au même endroit, avec la même logique de confiance.",
    finalTitle: "Votre famille change. MyCoco évolue avec elle.", finalCta: "Trouver ma solution",
  } : {
    eyebrow: "CHILDCARE THAT FITS YOUR FAMILY",
    title: "Finding childcare shouldn't feel like a second job.",
    lead: "Tell us what your family needs. MyCoco helps you spot relevant options nearby, then stay in the loop as new possibilities appear.",
    cta: "Find my solution", secondary: "Browse childcare", reassurance: "Free · No account · Under 2 minutes",
    finderTitle: "Start with your need", finderText: "You don't need to know the right childcare category. Start with your family's situation.", finderItems: ["Your area", "Your child's age", "Your childcare preference"],
    whyEyebrow: "WHY MYCOCO", whyTitle: "Less searching. Better decisions.", whyText: "Families don't need more lists. They need time, clarity and a simple way to compare what may actually fit.",
    cards: [["01", "Start with your reality", "Your city, your child's age and your needs come before endless directories."], ["02", "See what matters", "Childcare type, area and available data are organized to make options easier to compare."], ["03", "Keep your search moving", "A useful search shouldn't end after one click. MyCoco can help you watch for new possibilities."]],
    howEyebrow: "HOW IT WORKS", howTitle: "A simple search designed as a journey.", how: [["01", "Tell us", "Four short questions to understand your need."], ["02", "Explore", "Relevant options around your area."], ["03", "Choose", "Compare, contact and confirm directly with the provider."]],
    localEyebrow: "STARTING HERE", localTitle: "Mirabel and the Laurentians first.", localText: "A marketplace only works when it has enough local density. We would rather be genuinely useful in a few cities before expanding everywhere.", localCta: "Browse childcare", ecosystemEyebrow: "OUR VISION", ecosystemTitle: "Childcare is the beginning, not the end.", ecosystemText: "Over time, MyCoco aims to become a family reflex: childcare, activities, camps, events, professionals and backup solutions — with one consistent trust experience.", finalTitle: "Your family changes. MyCoco evolves with it.", finalCta: "Find my solution",
  };

  const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "MyCoco", url: `${site.url}/${locale}`, description: copy.lead, inLanguage: fr ? "fr-CA" : "en-CA" };

  return <main className="mc-home-v2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="mc-home-hero">
      <div className="mc-home-wrap mc-home-hero-grid">
        <div className="mc-home-copy">
          <span className="mc-home-eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.lead}</p>
          <div className="mc-home-actions"><Link className="mc-home-primary" href={`/${locale}/mon-besoin`}>{copy.cta}<span>→</span></Link><Link className="mc-home-secondary" href={`/${locale}/garderies`}>{copy.secondary}</Link></div>
          <div className="mc-home-reassurance"><span>✓</span>{copy.reassurance}</div>
        </div>
        <div className="mc-finder-card">
          <div className="mc-finder-top"><div className="mc-finder-icon">✦</div><span>{fr ? "MYCOCO" : "MYCOCO"}</span></div>
          <h2>{copy.finderTitle}</h2><p>{copy.finderText}</p>
          <div className="mc-finder-list">{copy.finderItems.map((item, index) => <div key={item}><b>0{index + 1}</b><span>{item}</span><i>✓</i></div>)}</div>
          <Link className="mc-finder-button" href={`/${locale}/mon-besoin`}>{copy.cta}<span>→</span></Link>
          <small>{fr ? "Vous pourrez revenir en arrière à tout moment." : "You can go back at any time."}</small>
        </div>
      </div>
    </section>

    <section className="mc-home-trust"><div className="mc-home-wrap"><span>{fr ? "Une expérience conçue pour les familles québécoises" : "An experience designed for Quebec families"}</span><div><b>Simple</b><b>Local</b><b>Transparent</b><b>Sans compte</b></div></div></section>

    <section className="mc-home-section mc-white"><div className="mc-home-wrap"><div className="mc-home-heading"><span>{copy.whyEyebrow}</span><h2>{copy.whyTitle}</h2><p>{copy.whyText}</p></div><div className="mc-home-cards">{copy.cards.map(([number, title, text]) => <article key={number}><b className="mc-card-number">{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="mc-home-section mc-soft"><div className="mc-home-wrap"><div className="mc-home-heading"><span>{copy.howEyebrow}</span><h2>{copy.howTitle}</h2></div><div className="mc-how-grid">{copy.how.map(([number, title, text]) => <article key={number}><b>{number}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="mc-home-local"><div className="mc-home-wrap mc-local-grid"><div><span>{copy.localEyebrow}</span><h2>{copy.localTitle}</h2><p>{copy.localText}</p><Link className="mc-light-button" href={`/${locale}/garderies`}>{copy.localCta}<span>→</span></Link></div><div className="mc-city-list">{cities.map(([name, slug]) => <Link key={slug} href={`/${locale}/garderies/${slug}`}><span>{name}</span><b>→</b></Link>)}</div></div></section>

    <section className="mc-home-section mc-white"><div className="mc-home-wrap"><div className="mc-vision"><div><span>{copy.ecosystemEyebrow}</span><h2>{copy.ecosystemTitle}</h2></div><p>{copy.ecosystemText}</p></div></div></section>

    <section className="mc-home-final"><div className="mc-home-wrap"><h2>{copy.finalTitle}</h2><Link className="mc-home-primary" href={`/${locale}/mon-besoin`}>{copy.finalCta}<span>→</span></Link></div></section>

    <style>{`
      .mc-home-v2{--m-ink:#18352c;--m-green:#4b7b66;--m-soft:#f1f5f2;--m-cream:#fbfaf7;--m-line:#dfe7e2;background:var(--m-cream);color:var(--m-ink);overflow:hidden}.mc-home-wrap{width:min(1160px,calc(100% - 40px));margin:0 auto}.mc-home-hero{background:radial-gradient(circle at 83% 17%,#e2f0e8 0,rgba(226,240,232,0) 31%),linear-gradient(180deg,#fbfaf7 0,#f5f8f5 100%);border-bottom:1px solid var(--m-line)}.mc-home-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 370px;gap:80px;align-items:center;padding:78px 0 88px}.mc-home-copy{max-width:760px}.mc-home-eyebrow,.mc-home-heading>span,.mc-home-local>div>div>span,.mc-vision span{font-size:11px;font-weight:900;letter-spacing:.14em;color:var(--m-green)}.mc-home-copy h1{font-size:clamp(46px,6.1vw,76px);line-height:.97;letter-spacing:-.068em;margin:17px 0 22px;max-width:800px}.mc-home-copy>p{max-width:650px;color:#64736c;font-size:18px;line-height:1.6;margin:0}.mc-home-actions{display:flex;flex-wrap:wrap;gap:10px;margin:29px 0 14px}.mc-home-primary,.mc-home-secondary{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:52px;padding:0 20px;border-radius:13px;font-size:13px;font-weight:900;transition:transform .16s ease,box-shadow .16s ease,background .16s ease}.mc-home-primary{background:var(--m-ink);color:#fff;box-shadow:0 13px 28px rgba(24,53,44,.15)}.mc-home-primary:hover{transform:translateY(-2px);box-shadow:0 17px 34px rgba(24,53,44,.2);background:#102f26}.mc-home-secondary{border:1px solid #d8e2dc;background:#fff;color:var(--m-ink)}.mc-home-secondary:hover{transform:translateY(-2px)}.mc-home-reassurance{display:flex;align-items:center;gap:8px;color:#718078;font-size:11px;font-weight:750}.mc-home-reassurance span{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#e3f0e8;color:var(--m-green);font-size:10px}.mc-finder-card{padding:25px;background:#fff;border:1px solid #dce7e1;border-radius:24px;box-shadow:0 25px 70px rgba(24,53,44,.11)}.mc-finder-top{display:flex;align-items:center;justify-content:space-between;color:#789087;font-size:10px;font-weight:900;letter-spacing:.12em}.mc-finder-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#e5f1e9;color:#183f33;font-size:19px}.mc-finder-card h2{font-size:24px;line-height:1.05;letter-spacing:-.04em;margin:20px 0 7px}.mc-finder-card>p{color:#728079;font-size:12px;line-height:1.5;margin:0 0 15px}.mc-finder-list{display:grid;gap:8px}.mc-finder-list div{display:grid;grid-template-columns:25px 1fr 18px;align-items:center;gap:8px;padding:11px 10px;border:1px solid #e5ece8;border-radius:11px}.mc-finder-list b{font-size:9px;color:#77a28d}.mc-finder-list span{font-size:11px;font-weight:800}.mc-finder-list i{font-style:normal;color:#4b7b66;font-size:10px}.mc-finder-button{display:flex;align-items:center;justify-content:center;gap:8px;min-height:47px;margin-top:14px;border-radius:11px;background:#183f33;color:#fff;font-size:12px;font-weight:900}.mc-finder-card small{display:block;text-align:center;color:#8a9690;font-size:9px;margin-top:10px}.mc-home-trust{border-bottom:1px solid var(--m-line);background:#fff}.mc-home-trust>div{min-height:62px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:#687770;font-size:11px}.mc-home-trust div>div{display:flex;gap:24px;color:#35594b}.mc-home-section{padding:88px 0}.mc-white{background:#fff}.mc-soft{background:#f1f5f2}.mc-home-heading{max-width:730px;margin-bottom:38px}.mc-home-heading h2,.mc-vision h2,.mc-home-local h2,.mc-home-final h2{font-size:clamp(36px,4.8vw,58px);line-height:1;letter-spacing:-.06em;margin:12px 0 14px}.mc-home-heading p,.mc-vision p,.mc-home-local p{max-width:660px;color:#697770;font-size:17px;line-height:1.65;margin:0}.mc-home-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.mc-home-cards article{min-height:215px;padding:25px;border:1px solid var(--m-line);border-radius:20px;background:#fff}.mc-card-number{color:#75a88f;font-size:11px}.mc-home-cards h3{font-size:20px;letter-spacing:-.03em;margin:45px 0 9px}.mc-home-cards p{color:#718078;font-size:13px;line-height:1.6;margin:0}.mc-how-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #dbe5df}.mc-how-grid article{display:grid;grid-template-columns:36px 1fr;gap:12px;padding:25px 25px 20px 0;border-right:1px solid #dbe5df}.mc-how-grid article:not(:first-child){padding-left:25px}.mc-how-grid article:last-child{border-right:0}.mc-how-grid b{color:#75a88f;font-size:11px}.mc-how-grid h3{margin:0 0 7px;font-size:19px}.mc-how-grid p{margin:0;color:#718078;font-size:13px;line-height:1.55}.mc-home-local{padding:88px 0;background:#183f33;color:#fff}.mc-local-grid{display:grid;grid-template-columns:1fr 390px;gap:80px;align-items:center}.mc-home-local h2{max-width:700px}.mc-home-local p{color:#d6e3de}.mc-light-button{display:inline-flex;align-items:center;gap:8px;margin-top:25px;padding:12px 17px;border-radius:11px;background:#fff;color:#183f33;font-size:12px;font-weight:900}.mc-city-list{border-top:1px solid rgba(255,255,255,.16)}.mc-city-list a{display:flex;justify-content:space-between;align-items:center;min-height:59px;border-bottom:1px solid rgba(255,255,255,.16);color:#eef4f1;font-size:13px;font-weight:800}.mc-city-list b{color:#9fc4b3}.mc-vision{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}.mc-home-final{padding:76px 0;background:#e7f1eb}.mc-home-final>div{display:flex;align-items:center;justify-content:space-between;gap:30px}.mc-home-final h2{max-width:730px;margin:0}.mc-home-final .mc-home-primary{flex:none}@media(max-width:900px){.mc-home-hero-grid,.mc-local-grid,.mc-vision{grid-template-columns:1fr}.mc-home-hero-grid{gap:40px;padding:55px 0 65px}.mc-finder-card{max-width:520px}.mc-home-cards,.mc-how-grid{grid-template-columns:1fr}.mc-how-grid article,.mc-how-grid article:not(:first-child){padding:22px 0;border-right:0;border-bottom:1px solid #dbe5df}.mc-home-trust>div{padding:12px 0;display:block}.mc-home-trust div>div{margin-top:8px;gap:15px;flex-wrap:wrap}.mc-home-final>div{display:block}.mc-home-final .mc-home-primary{margin-top:22px}.mc-local-grid{gap:40px}}@media(max-width:600px){.mc-home-wrap{width:min(100% - 28px,760px)}.mc-home-copy h1{font-size:44px}.mc-home-copy>p{font-size:16px}.mc-home-section{padding:65px 0}.mc-home-heading h2,.mc-home-local h2,.mc-home-final h2{font-size:38px}.mc-finder-card{padding:20px}.mc-home-actions{display:grid}.mc-home-primary,.mc-home-secondary{width:100%}.mc-city-list{margin-top:4px}}
    `}</style>
  </main>;
}

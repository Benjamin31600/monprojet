import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function ProviderSpacePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fr = locale === "fr";

  const serviceTypes = fr
    ? ["Garderie / CPE", "Milieu familial", "Garderie privée", "Babysitting / garde à domicile", "Camp de jour", "Activités pour enfants", "Professionnel enfance / famille"]
    : ["Daycare / CPE", "Home childcare", "Private daycare", "Babysitting / in-home care", "Day camp", "Children's activities", "Child & family professional"];
  const activities = fr
    ? ["Musique", "Danse", "Sport", "Natation", "Arts créatifs", "Théâtre", "Éveil / développement", "Aide aux devoirs", "Camp de jour", "Sorties / activités extérieures", "Bilingue / anglais", "Besoins particuliers"]
    : ["Music", "Dance", "Sports", "Swimming", "Arts & crafts", "Theatre", "Early development", "Homework help", "Day camp", "Outdoor activities", "Bilingual / English", "Special needs"];
  const goals = fr
    ? ["Remplir mes places", "Recevoir des demandes qualifiées", "Présenter mes activités", "Développer ma visibilité locale", "Créer une liste d'attente", "Recruter du personnel"]
    : ["Fill my openings", "Receive qualified leads", "Showcase my activities", "Grow local visibility", "Build a waitlist", "Recruit staff"];

  return <main className="mc-provider-onboarding">
    <section className="mc-po-hero">
      <div className="mc-po-wrap mc-po-hero-grid">
        <div>
          <span className="mc-po-eyebrow">MYCOCO · {fr ? "CRÉER MON ESPACE SERVICE" : "CREATE MY PROVIDER SPACE"}</span>
          <h1>{fr ? "Faites découvrir ce qui rend votre service unique." : "Show families what makes your service different."}</h1>
          <p>{fr ? "Votre espace MyCoco n'est pas une simple fiche. C'est votre vitrine locale, votre point de contact avec les familles et, à terme, votre outil pour remplir vos places." : "Your MyCoco space is not just a listing. It is your local storefront, your connection point with families and, over time, your tool to fill openings."}</p>
          <div className="mc-po-trust"><span>✓ {fr ? "Création gratuite au lancement" : "Free during launch"}</span><span>✓ {fr ? "Vous contrôlez vos informations" : "You control your information"}</span><span>✓ {fr ? "Vous pourrez enrichir votre profil plus tard" : "You can complete it later"}</span></div>
        </div>
        <aside className="mc-po-preview">
          <span>{fr ? "CE QUE LES FAMILLES VERRONT" : "WHAT FAMILIES WILL SEE"}</span>
          <div className="mc-po-preview-photo">✦</div>
          <strong>{fr ? "Votre service" : "Your service"}</strong>
          <small>{fr ? "Profil en construction" : "Profile in progress"}</small>
          <div className="mc-po-score"><b>01</b><span>{fr ? "Identité" : "Identity"}</span><i></i></div>
          <div className="mc-po-score"><b>02</b><span>{fr ? "Offre & activités" : "Offer & activities"}</span><i></i></div>
          <div className="mc-po-score"><b>03</b><span>{fr ? "Disponibilités" : "Availability"}</span><i></i></div>
        </aside>
      </div>
    </section>

    <section className="mc-po-main">
      <div className="mc-po-wrap mc-po-layout">
        <div className="mc-po-form">
          <div className="mc-po-form-head">
            <span>{fr ? "VOTRE ESPACE" : "YOUR SPACE"}</span>
            <strong>{fr ? "On avance ensemble, une étape à la fois." : "One step at a time."}</strong>
            <p>{fr ? "Ne cherchez pas la formulation parfaite. Donnez-nous les informations utiles aux familles : nous structurerons votre fiche." : "Don't worry about perfect wording. Give us the information families need and we'll structure your profile."}</p>
          </div>

          <details className="mc-po-step" open>
            <summary><b>01</b><span><strong>{fr ? "Qui êtes-vous ?" : "Who are you?"}</strong><small>{fr ? "Le point de départ de votre fiche" : "The starting point of your profile"}</small></span><em>✓</em></summary>
            <div className="mc-po-step-body">
              <label>{fr ? "Nom de votre service" : "Service name"}<input placeholder={fr ? "Ex. Les Petits Explorateurs" : "e.g. Little Explorers"} /></label>
              <label>{fr ? "Ville / secteur" : "City / area"}<input placeholder={fr ? "Ex. Mirabel" : "e.g. Mirabel"} /></label>
              <div className="mc-po-choice-grid">{serviceTypes.map((x) => <button type="button" key={x}>{x}</button>)}</div>
              <p className="mc-po-help">{fr ? "Vous pourrez proposer plusieurs types de services plus tard. MyCoco doit refléter votre vraie activité, pas vous enfermer dans une catégorie." : "You can add more services later. MyCoco should reflect what you really offer, not box you into one category."}</p>
            </div>
          </details>

          <details className="mc-po-step">
            <summary><b>02</b><span><strong>{fr ? "Qu'est-ce que vous proposez ?" : "What do you offer?"}</strong><small>{fr ? "Votre différence devient visible" : "Make your difference visible"}</small></span><em>+</em></summary>
            <div className="mc-po-step-body">
              <p className="mc-po-question">{fr ? "Cochez tout ce que les enfants peuvent vivre chez vous." : "Select everything children can experience with you."}</p>
              <div className="mc-po-tags">{activities.map((x) => <button type="button" key={x}>{x}</button>)}</div>
              <label>{fr ? "Une activité ou spécialité que nous n'avons pas proposée ?" : "Something special we didn't list?"}<input placeholder={fr ? "Ex. initiation au piano, yoga enfants…" : "e.g. piano, kids yoga…"} /></label>
              <div className="mc-po-insight"><b>✦</b><span>{fr ? "Plus votre offre est précise, plus MyCoco pourra vous présenter aux familles qui recherchent exactement cela." : "The more precise your offer, the better MyCoco can surface you to families looking for exactly that."}</span></div>
            </div>
          </details>

          <details className="mc-po-step">
            <summary><b>03</b><span><strong>{fr ? "Pour quels enfants ?" : "Which children?"}</strong><small>{fr ? "Âges, capacité et besoins" : "Ages, capacity and needs"}</small></span><em>+</em></summary>
            <div className="mc-po-step-body">
              <div className="mc-po-two"><label>{fr ? "Âge minimum" : "Minimum age"}<select><option>{fr ? "Choisir" : "Choose"}</option><option>0–12 mois</option><option>1–3 ans</option><option>3–5 ans</option><option>5 ans et +</option></select></label><label>{fr ? "Âge maximum" : "Maximum age"}<select><option>{fr ? "Choisir" : "Choose"}</option><option>3 ans</option><option>5 ans</option><option>7 ans</option><option>12 ans et +</option></select></label></div>
              <label>{fr ? "Capacité / nombre de places" : "Capacity / number of places"}<input type="number" placeholder="Ex. 42" /></label>
              <div className="mc-po-checkline"><button type="button">{fr ? "Places actuellement disponibles" : "Openings available now"}</button><button type="button">{fr ? "Liste d'attente" : "Waitlist"}</button></div>
            </div>
          </details>

          <details className="mc-po-step">
            <summary><b>04</b><span><strong>{fr ? "Quand et comment êtes-vous disponible ?" : "When and how are you available?"}</strong><small>{fr ? "Donnez aux familles des informations concrètes" : "Give families concrete information"}</small></span><em>+</em></summary>
            <div className="mc-po-step-body">
              <div className="mc-po-two"><label>{fr ? "Ouverture" : "Opening"}<input type="time" defaultValue="07:30" /></label><label>{fr ? "Fermeture" : "Closing"}<input type="time" defaultValue="18:00" /></label></div>
              <div className="mc-po-days">{(fr ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).map((x) => <button type="button" key={x}>{x}</button>)}</div>
              <label>{fr ? "Tarif indicatif" : "Indicative price"}<input placeholder={fr ? "Ex. 52 $ / jour" : "e.g. $52 / day"} /></label>
              <p className="mc-po-help">{fr ? "Les tarifs et disponibilités peuvent évoluer. Vous pourrez les mettre à jour depuis votre espace." : "Pricing and availability can change. You will be able to update them from your space."}</p>
            </div>
          </details>

          <details className="mc-po-step">
            <summary><b>05</b><span><strong>{fr ? "Pourquoi une famille devrait vous choisir ?" : "Why should a family choose you?"}</strong><small>{fr ? "Votre histoire, vos forces, votre personnalité" : "Your story, strengths and personality"}</small></span><em>+</em></summary>
            <div className="mc-po-step-body">
              <label>{fr ? "Décrivez votre service en quelques mots" : "Describe your service in a few words"}<textarea rows={5} placeholder={fr ? "Qu'est-ce qui rend votre service différent ? Votre équipe ? Votre approche ? Vos installations ?" : "What makes your service different? Your team? Your approach? Your facilities?"}></textarea></label>
              <label>{fr ? "Site web" : "Website"}<input placeholder="https://" /></label>
              <div className="mc-po-insight"><b>♥</b><span>{fr ? "Une fiche qui ressemble à votre service convertit mieux qu'une fiche générique. Nous vous aiderons à la rendre claire et humaine." : "A profile that feels like your service converts better than a generic listing. We'll help make it clear and human."}</span></div>
            </div>
          </details>

          <details className="mc-po-step">
            <summary><b>06</b><span><strong>{fr ? "Qu'aimeriez-vous obtenir grâce à MyCoco ?" : "What would you like MyCoco to help you achieve?"}</strong><small>{fr ? "On construit votre espace autour de vos objectifs" : "We'll build your space around your goals"}</small></span><em>+</em></summary>
            <div className="mc-po-step-body">
              <div className="mc-po-tags">{goals.map((x) => <button type="button" key={x}>{x}</button>)}</div>
              <div className="mc-po-business"><strong>{fr ? "Votre objectif devient notre logique." : "Your goal becomes our logic."}</strong><p>{fr ? "Si vous cherchez à remplir 3 places, MyCoco doit vous montrer les familles pertinentes. Si vous proposez de la musique ou des camps, nous devons aussi vous rendre visible dans ces recherches." : "If you need three openings filled, MyCoco should surface relevant families. If you offer music or camps, we should also make you discoverable for those searches."}</p></div>
            </div>
          </details>

          <div className="mc-po-submit"><div><b>{fr ? "Votre espace est prêt à prendre forme." : "Your space is ready to take shape."}</b><span>{fr ? "La création de base est gratuite au lancement." : "Basic setup is free during launch."}</span></div><button type="button">{fr ? "Créer mon espace service" : "Create my provider space"} →</button></div>
        </div>

        <aside className="mc-po-sidebar">
          <div className="mc-po-side-card"><span>{fr ? "POURQUOI ON VOUS DEMANDE ÇA" : "WHY WE ASK"}</span><h3>{fr ? "Pas pour remplir un formulaire. Pour vous apporter les bonnes familles." : "Not to fill a form. To bring you the right families."}</h3><ul><li>{fr ? "Profil plus complet" : "Stronger profile"}</li><li>{fr ? "Meilleur référencement local" : "Better local discovery"}</li><li>{fr ? "Matching plus pertinent" : "Better matching"}</li><li>{fr ? "Leads plus qualifiés" : "Higher-intent leads"}</li></ul></div>
          <div className="mc-po-side-card mc-po-side-green"><span>{fr ? "CE QUE MYCOCO PEUT DEVENIR POUR VOUS" : "WHAT MYCOCO CAN BECOME"}</span><strong>{fr ? "Une source de demandes. Un outil de visibilité. Puis un vrai outil de gestion." : "A source of demand. A visibility tool. Then a real business tool."}</strong></div>
        </aside>
      </div>
    </section>

    <style>{`.mc-provider-onboarding{background:#f7f2e9;color:#18352c;min-height:100vh}.mc-po-wrap{width:min(1180px,calc(100% - 40px));margin:auto}.mc-po-hero{background:#18352c;color:#fff;padding:74px 0 78px}.mc-po-hero-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;align-items:center}.mc-po-eyebrow{font-size:10px;font-weight:950;letter-spacing:.14em;color:#a9c9b8}.mc-po-hero h1{font-size:clamp(44px,5.8vw,72px);line-height:.97;letter-spacing:-.067em;margin:18px 0 20px;max-width:800px}.mc-po-hero p{max-width:720px;color:#d1ded8;font-size:18px;line-height:1.6}.mc-po-trust{display:flex;flex-wrap:wrap;gap:9px;margin-top:23px}.mc-po-trust span{border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:8px 11px;color:#d8e6df;font-size:10px;font-weight:800}.mc-po-preview{padding:23px;background:#fbf8f1;color:#18352c;border-radius:23px;box-shadow:0 25px 65px rgba(0,0,0,.2)}.mc-po-preview>span{font-size:9px;font-weight:950;letter-spacing:.13em;color:#72837b}.mc-po-preview-photo{height:110px;margin:15px 0;border-radius:16px;background:linear-gradient(135deg,#dfece3,#f1dccb);display:grid;place-items:center;color:#567763;font-size:28px}.mc-po-preview strong,.mc-po-preview small{display:block}.mc-po-preview strong{font-size:17px}.mc-po-preview small{margin-top:3px;color:#7b8882;font-size:10px}.mc-po-score{display:grid;grid-template-columns:28px 1fr 60px;align-items:center;gap:8px;padding:10px 0;border-top:1px solid #e4e5df;margin-top:7px}.mc-po-score b{font-size:9px;color:#c47745}.mc-po-score span{font-size:10px;font-weight:800}.mc-po-score i{height:5px;border-radius:99px;background:#dbe6df;position:relative}.mc-po-score i:after{content:"";display:block;width:70%;height:100%;border-radius:99px;background:#6c987f}.mc-po-main{padding:65px 0 90px}.mc-po-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:42px;align-items:start}.mc-po-form{min-width:0}.mc-po-form-head{margin-bottom:18px}.mc-po-form-head>span{font-size:10px;font-weight:950;letter-spacing:.13em;color:#5b866f}.mc-po-form-head>strong{display:block;font-size:31px;line-height:1.05;letter-spacing:-.045em;margin-top:8px}.mc-po-form-head>p{color:#6d7b75;font-size:13px;line-height:1.6;margin:9px 0 0}.mc-po-step{background:#fff;border:1px solid #dde4df;border-radius:18px;margin:12px 0;overflow:hidden;box-shadow:0 7px 25px rgba(24,53,44,.035)}.mc-po-step summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:38px 1fr 25px;align-items:center;gap:12px;padding:19px 20px}.mc-po-step summary::-webkit-details-marker{display:none}.mc-po-step summary>b{font-size:10px;color:#c47745}.mc-po-step summary strong,.mc-po-step summary small{display:block}.mc-po-step summary strong{font-size:15px}.mc-po-step summary small{color:#7b8782;font-size:10px;margin-top:3px}.mc-po-step summary em{font-style:normal;width:25px;height:25px;border-radius:50%;display:grid;place-items:center;background:#eff4f0;color:#4c7b65;font-weight:900}.mc-po-step-body{padding:0 20px 22px 70px;display:grid;gap:13px}.mc-po-step-body label{display:grid;gap:6px;color:#40574e;font-size:10px;font-weight:850}.mc-po-step-body input,.mc-po-step-body select,.mc-po-step-body textarea{width:100%;border:1px solid #dbe3de;border-radius:10px;background:#fff;padding:12px 13px;font:inherit;font-size:12px;color:#18352c;outline:none}.mc-po-step-body textarea{resize:vertical}.mc-po-step-body input:focus,.mc-po-step-body select:focus,.mc-po-step-body textarea:focus{border-color:#6c987f;box-shadow:0 0 0 3px #e5f0e9}.mc-po-choice-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.mc-po-choice-grid button,.mc-po-tags button,.mc-po-checkline button,.mc-po-days button{border:1px solid #dbe3de;background:#fbfcfa;color:#304e43;border-radius:10px;padding:11px 10px;text-align:left;font-size:10px;font-weight:800;cursor:pointer}.mc-po-choice-grid button:hover,.mc-po-tags button:hover,.mc-po-checkline button:hover,.mc-po-days button:hover{border-color:#77a08b;background:#f0f6f2}.mc-po-tags{display:flex;flex-wrap:wrap;gap:7px}.mc-po-tags button{border-radius:999px}.mc-po-checkline,.mc-po-days{display:flex;flex-wrap:wrap;gap:7px}.mc-po-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mc-po-help{margin:0;color:#7b8882;font-size:10px;line-height:1.55}.mc-po-insight{display:flex;gap:10px;align-items:flex-start;padding:13px;border-radius:12px;background:#edf5ef;color:#4d6f5d;font-size:10px;line-height:1.55}.mc-po-insight b{font-size:14px}.mc-po-business{padding:17px;border-radius:13px;background:#18352c;color:#fff}.mc-po-business strong{font-size:13px}.mc-po-business p{margin:6px 0 0;color:#d1ded8;font-size:10px;line-height:1.55}.mc-po-submit{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:18px;padding:18px 20px;border-radius:17px;background:#e5eee8;border:1px solid #d1dfd6}.mc-po-submit b,.mc-po-submit span{display:block}.mc-po-submit b{font-size:13px}.mc-po-submit span{font-size:10px;color:#708078;margin-top:4px}.mc-po-submit button{border:0;border-radius:11px;background:#18352c;color:#fff;padding:13px 17px;font-size:11px;font-weight:900;white-space:nowrap;cursor:pointer}.mc-po-sidebar{position:sticky;top:96px}.mc-po-side-card{background:#fff;border:1px solid #dfe5df;border-radius:18px;padding:21px;margin-bottom:12px}.mc-po-side-card>span{font-size:9px;font-weight:950;letter-spacing:.12em;color:#5f8871}.mc-po-side-card h3{font-size:20px;line-height:1.08;letter-spacing:-.035em;margin:12px 0 17px}.mc-po-side-card ul{list-style:none;padding:0;margin:0;display:grid;gap:10px}.mc-po-side-card li{font-size:10px;font-weight:800;color:#496358}.mc-po-side-card li:before{content:"✓";color:#5f8b72;margin-right:8px}.mc-po-side-green{background:#18352c;color:#fff;border:0}.mc-po-side-green>span{color:#a9c9b8}.mc-po-side-green strong{display:block;font-size:14px;line-height:1.45;margin-top:11px}@media(max-width:900px){.mc-po-hero-grid,.mc-po-layout{grid-template-columns:1fr}.mc-po-sidebar{position:static}.mc-po-preview{max-width:520px}.mc-po-step-body{padding-left:20px}}@media(max-width:560px){.mc-po-wrap{width:min(100% - 28px,1180px)}.mc-po-hero{padding:52px 0 60px}.mc-po-choice-grid,.mc-po-two{grid-template-columns:1fr}.mc-po-submit{align-items:stretch;flex-direction:column}.mc-po-submit button{width:100%}}
    `}</style>
  </main>;
}

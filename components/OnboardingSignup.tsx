"use client";

import { FormEvent, useMemo, useState } from "react";

type Role = "family" | "provider";
type Locale = "fr" | "en";

export default function OnboardingSignup({ locale, role, returnTo }: { locale: Locale; role: Role; returnTo: string }) {
  const fr = locale === "fr";
  const family = role === "family";
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [providerType, setProviderType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [childAge, setChildAge] = useState("");
  const [carePreference, setCarePreference] = useState("");
  const [startDate, setStartDate] = useState("");
  const [childrenCount, setChildrenCount] = useState("1");

  const canContinue = useMemo(() => {
    if (step === 1) return family ? firstName.trim().length >= 2 : name.trim().length >= 2 && providerType !== "";
    if (step === 2) return city.trim().length >= 2 && (family ? Boolean(childAge) : postalCode.trim().length >= 3);
    if (step === 3) return family ? Boolean(carePreference) : true;
    return email.includes("@") && password.length >= (family ? 10 : 8) && (!family || confirmPassword === password);
  }, [step, family, firstName, name, providerType, city, postalCode, childAge, carePreference, email, password, confirmPassword]);

  function next(event?: FormEvent) {
    event?.preventDefault();
    if (canContinue) setStep((s) => Math.min(4, s + 1));
  }

  function previous() {
    setStep((s) => Math.max(1, s - 1));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    if (step < 4) {
      next(event);
      return;
    }
  }

  const ageLabel = childAge === "0-18" ? (fr ? "0 à 18 mois" : "0–18 months") : childAge === "18-36" ? (fr ? "18 à 36 mois" : "18–36 months") : childAge === "3-5" ? (fr ? "3 à 5 ans" : "3–5 years") : (fr ? "5 ans et +" : "5+ years");

  return (
    <form className="mc-onboarding" action={family ? "/api/famille/inscription" : "/api/providers/register"} method="post" onSubmit={submit}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="returnTo" value={returnTo} />
      {family ? (
        <>
          <input type="hidden" name="profileCity" value={city} />
          <input type="hidden" name="childrenCount" value={childrenCount} />
          <input type="hidden" name="children" value={JSON.stringify([{ ageRange: childAge }])} />
          <input type="hidden" name="preferences" value={JSON.stringify({ carePreference, startDate, postalCode, childrenCount })} />
        </>
      ) : (
        <>
          <input type="hidden" name="postalCode" value={postalCode} />
          <input type="hidden" name="address" value={address} />
          <input type="hidden" name="website" value={website} />
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="capacity" value={capacity} />
        </>
      )}

      <div className="mc-onboarding-head"><div><span>{family ? (fr ? "ESPACE FAMILLE" : "FAMILY SPACE") : (fr ? "ESPACE SERVICE" : "PROVIDER SPACE")}</span><strong>{fr ? `Étape ${step} sur 4` : `Step ${step} of 4`}</strong></div><small>{fr ? "Vos informations restent modifiables dans votre espace." : "You can update your information from your space."}</small></div>
      <div className="mc-onboarding-progress" aria-label={fr ? `Étape ${step} sur 4` : `Step ${step} of 4`}>{[1,2,3,4].map(n=><i key={n} className={n<=step?"active":""}/>)}</div>

      {step === 1 && <section><span className="mc-onboarding-number">01</span><h2>{family ? (fr ? "Qui êtes-vous ?" : "Who are you?") : (fr ? "Présentez votre service." : "Tell us about your service.")}</h2><p>{family ? (fr ? "On commence par les informations essentielles de votre foyer." : "Start with the essential information about your family.") : (fr ? "Votre nom et votre type de service permettent aux familles de vous identifier immédiatement." : "Your name and service type help families identify you immediately.")}</p>{family ? <div className="mc-onboarding-two"><label><span>{fr?"Prénom":"First name"}</span><input value={firstName} onChange={e=>setFirstName(e.target.value)} autoComplete="given-name" placeholder={fr?"Votre prénom":"Your first name"}/></label><label><span>{fr?"Nom":"Last name"}</span><input value={lastName} onChange={e=>setLastName(e.target.value)} autoComplete="family-name" placeholder={fr?"Votre nom":"Your last name"}/></label></div> : <><label><span>{fr?"Nom du service":"Provider name"}</span><input value={name} onChange={e=>setName(e.target.value)} autoComplete="organization" placeholder={fr?"Ex. Les Petits Explorateurs":"e.g. Little Explorers"}/></label><label><span>{fr?"Type de service":"Service type"}</span><select value={providerType} onChange={e=>setProviderType(e.target.value)}><option value="">{fr?"Choisir le type de service":"Choose the service type"}</option><option value="cpe">CPE</option><option value="subsidized_daycare">{fr?"Garderie subventionnée":"Subsidized daycare"}</option><option value="home_daycare">{fr?"Milieu familial":"Home childcare"}</option><option value="private_daycare">{fr?"Garderie non subventionnée":"Non-subsidized daycare"}</option><option value="in_home">{fr?"Garde à domicile":"In-home care"}</option></select></label></>}</section>}

      {step === 2 && <section><span className="mc-onboarding-number">02</span><h2>{family ? (fr ? "Où vivez-vous ? Et pour quel âge ?" : "Where do you live? And for what age?") : (fr ? "Où pouvons-nous vous trouver ?" : "Where can families find you?")}</h2><p>{family ? (fr ? "La zone et l'âge de l'enfant sont au cœur du matching MyCoco." : "Area and child age are central to MyCoco matching.") : (fr ? "Une fiche locale précise augmente votre visibilité dans les recherches de proximité." : "A precise local profile improves nearby discovery.")}</p><div className="mc-onboarding-two"><label><span>{fr?"Ville":"City"}</span><input value={city} onChange={e=>setCity(e.target.value)} autoComplete="address-level2" placeholder={fr?"Ex. Mirabel":"e.g. Mirabel"}/></label><label><span>{fr?"Code postal":"Postal code"}</span><input value={postalCode} onChange={e=>setPostalCode(e.target.value)} autoComplete="postal-code" placeholder="J7J 1A1"/></label></div>{family ? <><label><span>{fr?"Âge de votre enfant":"Your child's age"}</span><select value={childAge} onChange={e=>setChildAge(e.target.value)}><option value="">{fr?"Choisir une tranche d'âge":"Choose an age range"}</option><option value="0-18">{fr?"0 à 18 mois":"0–18 months"}</option><option value="18-36">{fr?"18 à 36 mois":"18–36 months"}</option><option value="3-5">{fr?"3 à 5 ans":"3–5 years"}</option><option value="5+">{fr?"5 ans et +":"5+ years"}</option></select></label><label><span>{fr?"Nombre d'enfants concernés":"Number of children"}</span><select value={childrenCount} onChange={e=>setChildrenCount(e.target.value)}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4+</option></select></label></> : <><label><span>{fr?"Adresse":"Address"}</span><input value={address} onChange={e=>setAddress(e.target.value)} autoComplete="street-address" placeholder={fr?"Numéro et rue":"Street address"}/></label><div className="mc-onboarding-two"><label><span>{fr?"Téléphone":"Phone"}</span><input value={phone} onChange={e=>setPhone(e.target.value)} autoComplete="tel" placeholder="514 000-0000"/></label><label><span>{fr?"Capacité d'accueil":"Capacity"}</span><input value={capacity} onChange={e=>setCapacity(e.target.value)} inputMode="numeric" placeholder={fr?"Ex. 78":"e.g. 78"}/></label></div></>}</section>}

      {step === 3 && <section><span className="mc-onboarding-number">03</span><h2>{family ? (fr ? "Quelle solution cherchez-vous ?" : "What kind of childcare do you need?") : (fr ? "Ajoutons les informations publiques utiles." : "Let's add useful public details.")}</h2><p>{family ? (fr ? "Ces préférences servent à personnaliser votre recherche et vos futures alertes." : "These preferences personalize your search and future alerts.") : (fr ? "Votre site web peut aider une famille à valider son choix avant de vous contacter." : "Your website can help a family validate its choice before contacting you.")}</p>{family ? <><div className="mc-onboarding-choice-grid">{[["all",fr?"Je suis ouvert à toutes les solutions":"I'm open to all options"],["cpe","CPE"],["subsidized",fr?"Garderie subventionnée":"Subsidized daycare"],["home",fr?"Milieu familial":"Home childcare"],["private",fr?"Garderie non subventionnée":"Non-subsidized daycare"]].map(([v,l])=><button type="button" key={v} className={carePreference===v?"selected":""} onClick={()=>setCarePreference(v)}>{l}<span>{carePreference===v?"✓":""}</span></button>)}</div><label><span>{fr?"Date de début souhaitée (facultatif)":"Desired start date (optional)"}</span><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}/></label></> : <><label><span>{fr?"Site internet (facultatif)":"Website (optional)"}</span><input value={website} onChange={e=>setWebsite(e.target.value)} type="url" placeholder="https://" /></label><div className="mc-onboarding-info"><strong>{fr?"Votre fiche publique, puis votre espace":"Your public profile, then your space"}</strong><p>{fr?"Après la création, vous pourrez compléter horaires, description, photos, services, disponibilités et informations de contact depuis votre espace service.":"After sign-up, you can complete hours, description, photos, services, availability and contact information from your provider space."}</p></div></>}</section>}

      {step === 4 && <section><span className="mc-onboarding-number">04</span><h2>{family ? (fr ? "Créez votre accès MyCoco." : "Create your MyCoco access.") : (fr ? "Créez votre accès service." : "Create your provider access.")}</h2><p>{family ? (fr ? "Vous pourrez revenir à votre recherche sans tout recommencer." : "Come back to your search without starting over.") : (fr ? "Votre espace vous permettra de piloter votre présence et vos demandes." : "Your space will let you manage your presence and requests.")}</p><label><span>{fr?"Courriel":"Email"}</span><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required autoComplete="email" placeholder="vous@exemple.ca"/></label><label><span>{fr?"Mot de passe":"Password"}</span><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required minLength={family?10:8} autoComplete="new-password" placeholder={fr?`${family?10:8} caractères minimum`:`${family?10:8} characters minimum`}/></label>{family&&<label><span>{fr?"Confirmer le mot de passe":"Confirm password"}</span><input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" required minLength={10} autoComplete="new-password" placeholder={fr?"Répétez le mot de passe":"Repeat your password"}/></label>}<div className="mc-onboarding-summary"><strong>{fr?"Résumé":"Summary"}</strong>{family?<><span>{firstName} · {city} · {ageLabel}</span><span>{carePreference==="all"?(fr?"Toutes les solutions":"All options"):carePreference}</span></>:<><span>{name} · {city}</span><span>{providerType}{postalCode?` · ${postalCode}`:""}</span></>}</div></section>}

      <div className="mc-onboarding-actions">{step>1?<button type="button" onClick={previous} className="mc-onboarding-back">← {fr?"Retour":"Back"}</button>:<span/>}<button type="submit" className="mc-onboarding-next" disabled={!canContinue}>{step===4?(family?(fr?"Créer mon espace famille":"Create my family space"):(fr?"Créer mon espace service":"Create my provider space")):(fr?"Continuer":"Continue")} <b>→</b></button></div>
      <p className="mc-onboarding-foot">{fr?"Gratuit au lancement · Aucune carte bancaire · Vos informations restent modifiables.":"Free at launch · No credit card · Your information stays editable."}</p>

      <style>{`
        .mc-onboarding{background:#fffdfa;border:1px solid #e2ddd4;border-radius:26px;padding:28px;box-shadow:0 24px 65px rgba(29,34,64,.12);color:#1d2240}.mc-onboarding-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}.mc-onboarding-head div{display:grid;gap:4px}.mc-onboarding-head span{font-size:9px;font-weight:950;letter-spacing:.15em;color:#9e5a4a}.mc-onboarding-head strong{font-size:13px}.mc-onboarding-head small{max-width:190px;text-align:right;color:#8b8f9d;font-size:8px;line-height:1.35}.mc-onboarding-progress{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:13px 0 30px}.mc-onboarding-progress i{height:4px;border-radius:999px;background:#e8e1d9}.mc-onboarding-progress i.active{background:#1d2240}.mc-onboarding section{min-height:385px}.mc-onboarding-number{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:#f0e8fb;color:#5e4e81;font-weight:950;font-size:10px}.mc-onboarding h2{font-size:30px;line-height:1.02;letter-spacing:-.05em;margin:17px 0 9px}.mc-onboarding section>p{max-width:520px;color:#72778b;font-size:12px;line-height:1.55;margin:0 0 22px}.mc-onboarding label{display:grid;gap:6px;margin-top:12px}.mc-onboarding label>span{font-size:9px;font-weight:900;color:#596074}.mc-onboarding input,.mc-onboarding select{width:100%;height:45px;border:1px solid #dbd7cf;border-radius:11px;background:#fff;color:#1d2240;padding:0 12px;font:inherit;font-size:11px;outline:none}.mc-onboarding input:focus,.mc-onboarding select:focus{border-color:#c57b61;box-shadow:0 0 0 3px rgba(197,123,97,.12)}.mc-onboarding-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}.mc-onboarding-choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:14px}.mc-onboarding-choice-grid button{min-height:58px;border:1px solid #e1dcd4;border-radius:12px;background:#fff;text-align:left;padding:10px 11px;font-size:10px;font-weight:800;color:#28304b;cursor:pointer;position:relative}.mc-onboarding-choice-grid button span{position:absolute;right:11px;top:10px;color:#b55f49}.mc-onboarding-choice-grid button.selected{border-color:#b55f49;background:#fbefe9;box-shadow:0 0 0 2px rgba(181,95,73,.07)}.mc-onboarding-info{margin-top:14px;background:#f3f0fa;border:1px solid #e2dcef;border-radius:14px;padding:13px}.mc-onboarding-info strong{font-size:10px}.mc-onboarding-info p{margin:5px 0 0;color:#7b7f90;font-size:9px;line-height:1.5}.mc-onboarding-summary{display:grid;gap:4px;margin-top:18px;padding:13px;border-radius:13px;background:#f4f0e9;border:1px solid #ebe6dd}.mc-onboarding-summary strong{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#8b675d}.mc-onboarding-summary span{font-size:10px;color:#5c6174}.mc-onboarding-actions{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:18px;border-top:1px solid #eee9e2}.mc-onboarding-back{border:0;background:none;color:#74798b;font-size:10px;font-weight:900;cursor:pointer}.mc-onboarding-next{min-height:47px;border:0;border-radius:11px;padding:0 16px;background:#1d2240;color:#fff;font-size:10px;font-weight:950;cursor:pointer;box-shadow:0 9px 20px rgba(29,34,64,.15)}.mc-onboarding-next:hover{background:#14182f;transform:translateY(-1px)}.mc-onboarding-next:disabled{opacity:.42;cursor:not-allowed;transform:none}.mc-onboarding-next b{font-size:13px}.mc-onboarding-foot{text-align:center;color:#9699a5;font-size:8px;margin:10px 0 0;line-height:1.4}@media(max-width:650px){.mc-onboarding{padding:19px;border-radius:20px}.mc-onboarding-head small{display:none}.mc-onboarding section{min-height:400px}.mc-onboarding h2{font-size:26px}.mc-onboarding-two,.mc-onboarding-choice-grid{grid-template-columns:1fr}.mc-onboarding-actions{padding-top:14px}}
      `}</style>
    </form>
  );
}

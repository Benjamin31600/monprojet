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
    <form
      className="mc-onboarding"
      action={family ? "/api/famille/inscription" : "/api/providers/register"}
      method="post"
      onSubmit={submit}
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="returnTo" value={returnTo} />
      {family ? (
        <>
          <input type="hidden" name="profileCity" value={city} />
          <input type="hidden" name="childrenCount" value={childrenCount} />
          <input type="hidden" name="children" value={JSON.stringify([{ ageRange: childAge }])} />
          <input type="hidden" name="preferences" value={JSON.stringify({ carePreference, startDate, postalCode })} />
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

      <div className="mc-onboarding-head">
        <div>
          <span>{family ? (fr ? "ESPACE FAMILLE" : "FAMILY SPACE") : (fr ? "ESPACE SERVICE" : "PROVIDER SPACE")}</span>
          <strong>{fr ? `Étape ${step} sur 4` : `Step ${step} of 4`}</strong>
        </div>
        <small>{fr ? "Vous pourrez modifier vos informations plus tard." : "You can update your information later."}</small>
      </div>
      <div className="mc-onboarding-progress" aria-label={fr ? `Étape ${step} sur 4` : `Step ${step} of 4`}>
        {[1, 2, 3, 4].map((n) => <i key={n} className={n <= step ? "active" : ""} />)}
      </div>

      {step === 1 && (
        <section>
          <span className="mc-onboarding-number">01</span>
          <h2>{family ? (fr ? "Qui êtes-vous ?" : "Who are you?") : (fr ? "Parlez-nous de votre service." : "Tell us about your service.")}</h2>
          <p>{family ? (fr ? "On crée votre espace avant de vous demander des informations plus personnelles sur votre recherche." : "We create your space before asking for more personal details about your search.") : (fr ? "Cette première étape sert à identifier clairement votre service dans MyCoco." : "This first step identifies your service clearly on MyCoco.")}</p>
          {family ? (
            <div className="mc-onboarding-two">
              <label><span>{fr ? "Prénom" : "First name"}</span><input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" placeholder={fr ? "Votre prénom" : "Your first name"} /></label>
              <label><span>{fr ? "Nom" : "Last name"}</span><input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" placeholder={fr ? "Votre nom" : "Your last name"} /></label>
            </div>
          ) : (
            <>
              <label><span>{fr ? "Nom du service" : "Provider name"}</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="organization" placeholder={fr ? "Ex. Les Petits Explorateurs" : "e.g. Little Explorers"} /></label>
              <label><span>{fr ? "Type de service" : "Service type"}</span><select value={providerType} onChange={(e) => setProviderType(e.target.value)}><option value="">{fr ? "Choisir le type de service" : "Choose the service type"}</option><option value="cpe">CPE</option><option value="subsidized_daycare">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="home_daycare">{fr ? "Milieu familial" : "Home childcare"}</option><option value="private_daycare">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option><option value="in_home">{fr ? "Garde à domicile" : "In-home care"}</option></select></label>
            </>
          )}
        </section>
      )}

      {step === 2 && (
        <section>
          <span className="mc-onboarding-number">02</span>
          <h2>{family ? (fr ? "Où et pour quel âge ?" : "Where and for what age?") : (fr ? "Où êtes-vous situé ?" : "Where are you located?")}</h2>
          <p>{family ? (fr ? "Ces informations servent à personnaliser les résultats et les alertes." : "This helps personalize your results and alerts.") : (fr ? "Une adresse précise rend votre fiche plus utile et améliore les recherches locales." : "A precise address makes your profile more useful and improves local discovery.")}</p>
          <div className="mc-onboarding-two">
            <label><span>{fr ? "Ville" : "City"}</span><input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" placeholder={fr ? "Ex. Mirabel" : "e.g. Mirabel"} /></label>
            <label><span>{fr ? "Code postal" : "Postal code"}</span><input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} autoComplete="postal-code" placeholder="J7J 1A1" /></label>
          </div>
          {family ? (
            <>
              <label><span>{fr ? "Âge de votre enfant" : "Your child's age"}</span><select value={childAge} onChange={(e) => setChildAge(e.target.value)}><option value="">{fr ? "Choisir une tranche d'âge" : "Choose an age range"}</option><option value="0-18">{fr ? "0 à 18 mois" : "0–18 months"}</option><option value="18-36">{fr ? "18 à 36 mois" : "18–36 months"}</option><option value="3-5">{fr ? "3 à 5 ans" : "3–5 years"}</option><option value="5+">{fr ? "5 ans et +" : "5+ years"}</option></select></label>
              <label><span>{fr ? "Nombre d'enfants concernés" : "Number of children"}</span><select value={childrenCount} onChange={(e) => setChildrenCount(e.target.value)}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4+</option></select></label>
            </>
          ) : (
            <>
              <label><span>{fr ? "Adresse" : "Address"}</span><input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" placeholder={fr ? "Numéro et rue" : "Street address"} /></label>
              <div className="mc-onboarding-two">
                <label><span>{fr ? "Téléphone" : "Phone"}</span><input value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="514 000-0000" /></label>
                <label><span>{fr ? "Capacité" : "Capacity"}</span><input value={capacity} onChange={(e) => setCapacity(e.target.value)} inputMode="numeric" placeholder={fr ? "Ex. 78 enfants" : "e.g. 78 children"} /></label>
              </div>
            </>
          )}
        </section>
      )}

      {step === 3 && (
        <section>
          <span className="mc-onboarding-number">03</span>
          <h2>{family ? (fr ? "Qu'est-ce qui compte pour votre famille ?" : "What matters to your family?") : (fr ? "Ajoutons les informations utiles." : "Let's add the useful details.")}</h2>
          <p>{family ? (fr ? "On garde les préférences dans votre espace pour vous présenter des options plus pertinentes." : "We save these preferences to show more relevant options.") : (fr ? "Ces informations seront visibles aux familles et pourront être complétées depuis votre espace service." : "Families will see these details, and you can complete your profile from your provider space.")}</p>
          {family ? (
            <>
              <div className="mc-onboarding-choice-grid">{[["all",fr?"Je suis ouvert à toutes les solutions":"I'm open to all options"],["cpe","CPE"],["subsidized",fr?"Garderie subventionnée":"Subsidized daycare"],["home",fr?"Milieu familial":"Home childcare"],["private",fr?"Garderie non subventionnée":"Non-subsidized daycare"]].map(([v,l])=><button type="button" key={v} className={carePreference===v?"selected":""} onClick={()=>setCarePreference(v)}>{l}<span>{carePreference===v?"✓":""}</span></button>)}</div>
              <label><span>{fr ? "Date de début souhaitée (facultatif)" : "Desired start date (optional)"}</span><input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} /></label>
            </>
          ) : (
            <>
              <label><span>{fr ? "Site internet (facultatif)" : "Website (optional)"}</span><input value={website} onChange={(e)=>setWebsite(e.target.value)} type="url" placeholder="https://" /></label>
              <div className="mc-onboarding-info"><strong>{fr ? "Votre fiche publique" : "Your public profile"}</strong><p>{fr ? "Après la création, vous pourrez ajouter vos horaires, vos services, vos photos et une description complète depuis votre espace service." : "After sign-up, you can add hours, services, photos and a complete description from your provider space."}</p></div>
            </>
          )}
        </section>
      )}

      {step === 4 && (
        <section>
          <span className="mc-onboarding-number">04</span>
          <h2>{family ? (fr ? "Sécurisons votre espace." : "Secure your space.") : (fr ? "Créez votre accès service." : "Create your provider access.")}</h2>
          <p>{fr ? "Votre compte vous permettra de retrouver vos informations, votre recherche et vos futurs échanges." : "Your account lets you keep your information, search and future conversations in one place."}</p>
          <label><span>{fr ? "Courriel" : "Email"}</span><input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required autoComplete="email" placeholder="vous@exemple.ca" /></label>
          <label><span>{fr ? "Mot de passe" : "Password"}</span><input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required minLength={family?10:8} autoComplete="new-password" placeholder={fr ? `${family?10:8} caractères minimum` : `${family?10:8} characters minimum`} /></label>
          {family && <label><span>{fr ? "Confirmer le mot de passe" : "Confirm password"}</span><input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" required minLength={10} autoComplete="new-password" placeholder={fr ? "Répétez le mot de passe" : "Repeat your password"} /></label>}
          <div className="mc-onboarding-summary"><strong>{fr ? "Votre configuration" : "Your setup"}</strong>{family ? <span>{firstName} · {city} · {ageLabel}</span> : <span>{name} · {city} · {providerType}</span>}<span>{family ? (carePreference === "all" ? (fr ? "Toutes les solutions" : "All options") : carePreference) : `${address}${postalCode ? ` · ${postalCode}` : ""}`}</span></div>
        </section>
      )}

      <div className="mc-onboarding-actions">
        {step > 1 ? <button type="button" onClick={previous} className="mc-onboarding-back">← {fr ? "Retour" : "Back"}</button> : <span />}
        <button type="submit" className="mc-onboarding-next" disabled={!canContinue}>{step === 4 ? (family ? (fr ? "Créer mon espace famille" : "Create my family space") : (fr ? "Créer mon espace service" : "Create my provider space")) : (fr ? "Continuer" : "Continue")} <b>→</b></button>
      </div>
      <p className="mc-onboarding-foot">{fr ? "Gratuit au lancement · Vous contrôlez vos informations · Aucune carte bancaire" : "Free at launch · You control your information · No credit card"}</p>
    </form>
  );
}

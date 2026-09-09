"use client";

import { FormEvent, useMemo, useState } from "react";

type Props = { locale: "fr" | "en"; error?: string };

export default function NeedWizard({ locale, error = "" }: Props) {
  const fr = locale === "fr";
  const [step, setStep] = useState(1);
  const [ville, setVille] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("");
  const [debut, setDebut] = useState("");

  const canContinue = useMemo(() => {
    if (step === 1) return ville.trim().length >= 2;
    if (step === 2) return Boolean(age);
    return true;
  }, [step, ville, age]);

  const next = () => setStep((current) => Math.min(4, current + 1));
  const back = () => setStep((current) => Math.max(1, current - 1));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    if (step < 4) {
      event.preventDefault();
      next();
    }
  };

  return (
    <form className="mc-wizard" action="/api/demandes" method="post" onSubmit={submit}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="ville" value={ville} />
      <input type="hidden" name="age" value={age} />
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="debut" value={debut} />
      <input className="mc-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {error && <div className="mc-wizard-error" role="alert">{error}</div>}

      <div className="mc-wizard-top">
        <div>
          <span className="mc-wizard-kicker">{fr ? "VOTRE RECHERCHE" : "YOUR SEARCH"}</span>
          <strong>{fr ? `Étape ${step} sur 4` : `Step ${step} of 4`}</strong>
        </div>
        <span>{fr ? "Sans compte · gratuit" : "No account · free"}</span>
      </div>
      <div className="mc-wizard-progress" aria-label={fr ? `Étape ${step} sur 4` : `Step ${step} of 4`}>
        {[1, 2, 3, 4].map((item) => <span key={item} className={item <= step ? "active" : ""} />)}
      </div>

      {step === 1 && (
        <section className="mc-wizard-step">
          <span className="mc-step-number">01</span>
          <h2>{fr ? "Où cherchez-vous une solution de garde ?" : "Where are you looking for childcare?"}</h2>
          <p>{fr ? "Commencez par votre secteur. Nous chercherons d'abord près de chez vous." : "Start with your area. We'll look close to home first."}</p>
          <label>
            <span>{fr ? "Ville ou code postal" : "City or postal code"}</span>
            <input autoFocus value={ville} onChange={(event) => setVille(event.target.value)} placeholder={fr ? "Ex. Mirabel, J7J 1A1" : "e.g. Mirabel, J7J 1A1"} autoComplete="postal-code" />
          </label>
        </section>
      )}

      {step === 2 && (
        <section className="mc-wizard-step">
          <span className="mc-step-number">02</span>
          <h2>{fr ? "Quel âge aura votre enfant ?" : "How old will your child be?"}</h2>
          <p>{fr ? "L'âge est essentiel pour écarter les solutions qui ne conviennent pas." : "Age is essential to rule out options that won't fit."}</p>
          <div className="mc-choice-grid">
            {[["0-18", fr ? "0 à 18 mois" : "0–18 months"], ["18-36", fr ? "18 à 36 mois" : "18–36 months"], ["3-5", fr ? "3 à 5 ans" : "3–5 years"], ["5+", fr ? "5 ans et +" : "5+ years"]].map(([value, label]) => (
              <button key={value} type="button" className={age === value ? "selected" : ""} onClick={() => setAge(value)}>{label}<span>{age === value ? "✓" : ""}</span></button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="mc-wizard-step">
          <span className="mc-step-number">03</span>
          <h2>{fr ? "Quel type de garde vous intéresse ?" : "What type of childcare interests you?"}</h2>
          <p>{fr ? "Vous hésitez ? Aucun problème : laissez-nous explorer toutes les options." : "Not sure? No problem — keep every option open."}</p>
          <div className="mc-choice-list">
            {[["", fr ? "Je suis ouvert à toutes les solutions" : "I'm open to all options"], ["cpe", "CPE"], ["subventionnee", fr ? "Garderie subventionnée" : "Subsidized daycare"], ["milieu-familial", fr ? "Milieu familial" : "Home childcare"], ["non-subventionnee", fr ? "Garderie non subventionnée" : "Non-subsidized daycare"]].map(([value, label]) => (
              <button key={label} type="button" className={type === value ? "selected" : ""} onClick={() => setType(value)}><span>{label}</span><b>{type === value ? "✓" : ""}</b></button>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="mc-wizard-step">
          <span className="mc-step-number">04</span>
          <h2>{fr ? "Quand aimeriez-vous commencer ?" : "When would you like to start?"}</h2>
          <p>{fr ? "Une date aide à prioriser votre recherche. Vous pouvez aussi la laisser vide." : "A date helps prioritize your search. You can also leave it blank."}</p>
          <label>
            <span>{fr ? "Date de début souhaitée (facultatif)" : "Desired start date (optional)"}</span>
            <input type="date" value={debut} onChange={(event) => setDebut(event.target.value)} />
          </label>
          <div className="mc-wizard-summary"><strong>{fr ? "Votre recherche" : "Your search"}</strong><span>{ville} · {age === "0-18" ? (fr ? "0–18 mois" : "0–18 months") : age === "18-36" ? (fr ? "18–36 mois" : "18–36 months") : age === "3-5" ? (fr ? "3–5 ans" : "3–5 years") : (fr ? "5 ans et +" : "5+ years")}</span><span>{type === "" ? (fr ? "Toutes les solutions" : "All options") : type === "cpe" ? "CPE" : type === "subventionnee" ? (fr ? "Garderie subventionnée" : "Subsidized daycare") : type === "milieu-familial" ? (fr ? "Milieu familial" : "Home childcare") : (fr ? "Garderie non subventionnée" : "Non-subsidized daycare")}</span></div>
        </section>
      )}

      <div className="mc-wizard-actions">
        {step > 1 ? <button type="button" className="mc-back" onClick={back}>{fr ? "Retour" : "Back"}</button> : <span />}
        <button type="submit" className="mc-next" disabled={!canContinue}>{step === 4 ? (fr ? "Voir mes solutions" : "See my options") : (fr ? "Continuer" : "Continue")} <span>→</span></button>
      </div>
      <p className="mc-wizard-foot">{fr ? "Les résultats indiquent des options pertinentes. Une place doit toujours être confirmée auprès du service." : "Results show relevant options. A spot must always be confirmed with the childcare service."}</p>
    </form>
  );
}

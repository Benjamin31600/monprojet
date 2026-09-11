"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Props = { locale: "fr" | "en"; audience: "family" | "provider"; mode?: "signup" | "signin" };

export default function AuthPortal({ locale, audience, mode: initialMode = "signup" }: Props) {
  const fr = locale === "fr";
  const [mode, setMode] = useState(initialMode);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [providerStep, setProviderStep] = useState(1);
  const signup = mode === "signup";

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("erreur") || new URLSearchParams(window.location.search).get("error");
    if (!code) return;
    if (code === "email" || code === "email-exists") setError(fr ? "Un compte existe déjà avec cette adresse courriel. Essayez de vous connecter." : "An account already exists with this email. Try signing in.");
    else if (code === "identifiants" || code === "login") setError(fr ? "Adresse courriel ou mot de passe incorrect." : "Incorrect email address or password.");
    else if (code === "validation") setError(fr ? "Certaines informations sont incomplètes ou invalides. Vérifiez le formulaire." : "Some information is incomplete or invalid. Check the form.");
    else setError(fr ? "Une erreur temporaire est survenue. Réessayez." : "A temporary error occurred. Please try again.");
  }, [fr]);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const signupAction = audience === "family" ? "/api/famille/inscription" : "/api/providers/register";
  const signinAction = audience === "family" ? "/api/famille/connexion" : "/api/providers/login";
  const roleIcon = audience === "family" ? "👨‍👩‍👧" : "🏫";
  const roleTitle = audience === "family" ? (fr ? "Espace famille" : "Family space") : (fr ? "Espace service" : "Provider space");

  return <div className={`mc-auth13 ${audience}`}>
    <div className="mc-auth13-role"><span>{roleIcon}</span><div><small>{fr ? "ESPACE SÉCURISÉ" : "SECURE SPACE"}</small><b>{roleTitle}</b><p>{audience === "family" ? (fr ? "Recherche, profil et prochaines alertes au même endroit." : "Search, profile and future alerts in one place.") : (fr ? "Votre fiche publique et vos informations professionnelles." : "Your public profile and professional information.")}</p></div></div>

    <div className="mc-auth13-tabs">
      <button type="button" className={signup ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>{fr ? "Créer mon compte" : "Create account"}</button>
      <button type="button" className={!signup ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>{fr ? "Me connecter" : "Sign in"}</button>
    </div>

    {signup && <div className="mc-auth13-free"><span>✓</span><div><b>{fr ? "Gratuit · sans engagement" : "Free · no commitment"}</b><small>{audience === "family" ? (fr ? "Vous pouvez même commencer votre recherche avant de créer un compte." : "You can even start searching before creating an account.") : (fr ? "Créez votre présence MyCoco sans abonnement." : "Create your MyCoco presence without a subscription.")}</small></div></div>}

    <form action={signup ? signupAction : signinAction} method="post" onSubmit={() => setBusy(true)}>
      <input type="hidden" name="locale" value={locale} />
      {signup && <input type="hidden" name="returnTo" value={audience === "family" ? `/${locale}/espace-famille?nouveau=1` : `/${locale}/espace-service?nouveau=1`} />}

      {signup && audience === "family" && <>
        <div className="mc-auth13-row"><label><span>{fr ? "Prénom" : "First name"}</span><input required name="firstName" minLength={2} maxLength={80} autoComplete="given-name" placeholder={fr ? "Marie" : "Marie"} /></label><label><span>{fr ? "Nom (facultatif)" : "Last name (optional)"}</span><input name="lastName" maxLength={80} autoComplete="family-name" placeholder="Tremblay" /></label></div>
        <label><span>{fr ? "Ville ou secteur (facultatif)" : "City or area (optional)"}</span><input name="profileCity" maxLength={120} autoComplete="address-level2" placeholder={fr ? "Ex. Mirabel" : "e.g. Mirabel"} /></label>
        <label><span>{fr ? "Téléphone (facultatif)" : "Phone (optional)"}</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="514 555-0000" /></label>
      </>}

      {signup && audience === "provider" && <>
        <div className="mc-auth13-progress"><span className={providerStep >= 1 ? "on" : ""}/><span className={providerStep >= 2 ? "on" : ""}/></div>
        {providerStep === 1 ? <div className="mc-provider-step">
          <div className="mc-provider-step-title"><small>{fr ? "ÉTAPE 1 SUR 2" : "STEP 1 OF 2"}</small><b>{fr ? "Votre service" : "Your service"}</b></div>
          <label><span>{fr ? "Nom du service" : "Provider name"}</span><input required name="name" minLength={2} maxLength={160} placeholder={fr ? "Ex. Garderie Les Petits Explorateurs" : "e.g. Little Explorers Childcare"} /></label>
          <div className="mc-auth13-row"><label><span>{fr ? "Type de service" : "Provider type"}</span><select required name="providerType" defaultValue=""><option value="" disabled>{fr ? "Choisir" : "Choose"}</option><option value="CPE">CPE</option><option value="Garderie subventionnée">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="Milieu familial">{fr ? "Milieu familial" : "Home childcare"}</option><option value="Garderie non subventionnée">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label><label><span>{fr ? "Ville" : "City"}</span><input required name="city" minLength={2} maxLength={120} placeholder="Mirabel" /></label></div>
          <div className="mc-auth13-row"><label><span>{fr ? "Code postal" : "Postal code"}</span><input name="postalCode" maxLength={20} placeholder="J7J 1A1" /></label><label><span>{fr ? "Capacité (facultatif)" : "Capacity (optional)"}</span><input name="capacity" type="number" min="0" max="10000" placeholder="40" /></label></div>
          <button className="mc-auth13-next" type="button" onClick={() => setProviderStep(2)}>{fr ? "Continuer" : "Continue"} <b>→</b></button>
        </div> : <div className="mc-provider-step">
          <div className="mc-provider-step-title"><small>{fr ? "ÉTAPE 2 SUR 2" : "STEP 2 OF 2"}</small><b>{fr ? "Coordonnées et accès" : "Contact and access"}</b></div>
          <label><span>{fr ? "Adresse publique (facultatif)" : "Public address (optional)"}</span><input name="address" maxLength={240} autoComplete="street-address" /></label>
          <div className="mc-auth13-row"><label><span>{fr ? "Téléphone public" : "Public phone"}</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label><label><span>{fr ? "Site web" : "Website"}</span><input name="website" type="url" maxLength={300} placeholder="https://" /></label></div>
          <button className="mc-auth13-back" type="button" onClick={() => setProviderStep(1)}>← {fr ? "Retour" : "Back"}</button>
        </div>}
      </>}

      {(!signup || audience === "family" || providerStep === 2) && <>
        <label><span>{fr ? "Adresse courriel" : "Email address"}</span><input required name="email" type="email" maxLength={240} autoComplete="email" placeholder="vous@exemple.ca" /></label>
        <label><span>{fr ? "Mot de passe" : "Password"}</span><input required name="password" type="password" minLength={signup && audience === "family" ? 10 : 8} maxLength={200} autoComplete={signup ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={fr ? (signup && audience === "family" ? "10 caractères minimum" : "8 caractères minimum") : (signup && audience === "family" ? "At least 10 characters" : "At least 8 characters")} />{signup && <div className="mc-password-meter"><div>{[1,2,3,4].map((n) => <i key={n} className={passwordScore >= n ? "on" : ""}/>)}</div><small>{password.length === 0 ? (fr ? "Utilisez un mot de passe unique." : "Use a unique password.") : passwordScore <= 1 ? (fr ? "Faible" : "Weak") : passwordScore <= 2 ? (fr ? "Correct" : "Fair") : (fr ? "Bon" : "Good")}</small></div>}</label>
        {signup && audience === "family" && <label><span>{fr ? "Confirmer le mot de passe" : "Confirm password"}</span><input required name="confirmPassword" type="password" minLength={10} maxLength={200} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} /><small className={confirm && confirm !== password ? "mc-mismatch show" : "mc-mismatch"}>{fr ? "Les mots de passe doivent être identiques." : "Passwords must match."}</small></label>}
        {signup && <label className="mc-auth13-consent"><input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} /><span>{fr ? <>J’accepte les <Link href={`/${locale}/conditions`}>conditions</Link> et la <Link href={`/${locale}/confidentialite`}>politique de confidentialité</Link>.</> : <>I accept the <Link href={`/${locale}/conditions`}>terms</Link> and <Link href={`/${locale}/confidentialite`}>privacy policy</Link>.</>}</span></label>}
        {error && <p className="mc-auth13-error" role="alert"><span>!</span>{error}</p>}
        <button className="mc-auth13-submit" disabled={busy || (signup && (!accepted || (audience === "family" && (password.length < 10 || password !== confirm))))}><span>{busy ? (fr ? "Création sécurisée…" : "Securing your account…") : signup ? (audience === "family" ? (fr ? "Créer mon espace famille" : "Create my family space") : (fr ? "Créer mon espace service" : "Create my provider space")) : (fr ? "Me connecter" : "Sign in")}</span><b>→</b></button>
      </>}
    </form>

    {!signup && audience === "family" && <Link className="mc-auth13-forgot" href={`/${locale}/espace-famille/mot-de-passe-oublie`}>{fr ? "Mot de passe oublié ?" : "Forgot password?"}</Link>}
    <div className="mc-auth13-security"><span>🔒</span><p><b>{fr ? "Informations privées" : "Private information"}</b><small>{fr ? "Le compte et la fiche publique sont séparés. Vos informations personnelles ne deviennent pas automatiquement publiques." : "Your account and public listing are separate. Personal information does not automatically become public."}</small></p></div>
    <p className="mc-auth13-bottom">{signup ? (fr ? "Déjà inscrit ?" : "Already registered?") : (fr ? "Nouveau sur MyCoco ?" : "New to MyCoco?")} <button type="button" onClick={() => { setMode(signup ? "signin" : "signup"); setError(""); setBusy(false); }}>{signup ? (fr ? "Se connecter" : "Sign in") : (fr ? "Créer un compte" : "Create account")}</button></p>

    <style>{`
      .mc-auth13{background:#fff;border:1px solid #e1e7e3;border-radius:26px;padding:24px;box-shadow:0 28px 80px rgba(23,53,44,.11);color:#17352c}.mc-auth13-role{display:flex;align-items:center;gap:12px;padding-bottom:17px;border-bottom:1px solid #edf1ee}.mc-auth13-role>span{display:grid;place-items:center;width:48px;height:48px;border-radius:15px;background:#edf6f1;font-size:22px}.mc-auth13.provider .mc-auth13-role>span{background:#fff0e9}.mc-auth13-role small,.mc-auth13-role b,.mc-auth13-role p{display:block}.mc-auth13-role small{font-size:6px;font-weight:950;letter-spacing:.13em;color:#a17a69}.mc-auth13-role b{font-size:15px;margin:3px 0}.mc-auth13-role p{font-size:8px;color:#7d8983;margin:0}.mc-auth13-tabs{display:grid;grid-template-columns:1fr 1fr;padding:4px;background:#f4f3ef;border-radius:12px;margin:17px 0 11px}.mc-auth13-tabs button{border:0;background:transparent;border-radius:9px;padding:9px;color:#7e8681;font-size:9px;font-weight:900;cursor:pointer}.mc-auth13-tabs button.active{background:#fff;color:#17352c;box-shadow:0 3px 9px rgba(23,53,44,.07)}.mc-auth13-free{display:flex;gap:9px;align-items:center;padding:9px 11px;border-radius:10px;background:#eef7f2;margin-bottom:13px}.mc-auth13-free>span{display:grid;place-items:center;width:23px;height:23px;border-radius:50%;background:#37785d;color:#fff;font-size:9px}.mc-auth13-free b,.mc-auth13-free small{display:block}.mc-auth13-free b{font-size:8px}.mc-auth13-free small{font-size:7px;color:#6c8076;margin-top:2px}.mc-auth13 form{display:grid;gap:11px}.mc-auth13 form>label,.mc-auth13-row>label,.mc-provider-step>label{display:grid;gap:5px}.mc-auth13 form label>span{font-size:8px;font-weight:900;color:#52635b}.mc-auth13 input:not([type=checkbox]),.mc-auth13 select{width:100%;height:47px;border:1px solid #d9e1dc;border-radius:10px;background:#fff;padding:0 12px;color:#17352c;font:inherit;font-size:11px;outline:none}.mc-auth13 input:not([type=checkbox]):focus,.mc-auth13 select:focus{border-color:#4f8a70;box-shadow:0 0 0 4px rgba(79,138,112,.08)}.mc-auth13-row{display:grid;grid-template-columns:1fr 1fr;gap:9px}.mc-auth13-progress{display:grid;grid-template-columns:1fr 1fr;gap:5px}.mc-auth13-progress span{height:3px;border-radius:99px;background:#e6e9e6}.mc-auth13-progress span.on{background:#9d503d}.mc-provider-step{display:grid;gap:11px}.mc-provider-step-title{display:flex;align-items:end;justify-content:space-between;padding:3px 0}.mc-provider-step-title small{font-size:6px;font-weight:950;color:#a87563}.mc-provider-step-title b{font-size:11px}.mc-auth13-next,.mc-auth13-back{border:0;background:transparent;cursor:pointer;font-weight:900}.mc-auth13-next{min-height:45px;border-radius:10px;background:#f2e9e3;color:#8e4938;display:flex;align-items:center;justify-content:space-between;padding:0 13px;font-size:9px}.mc-auth13-back{justify-self:start;color:#6f7d76;font-size:8px;padding:2px 0}.mc-password-meter{display:flex;justify-content:space-between;align-items:center;gap:8px}.mc-password-meter>div{display:grid;grid-template-columns:repeat(4,22px);gap:3px}.mc-password-meter i{height:3px;border-radius:99px;background:#e7eae7}.mc-password-meter i.on{background:#5a9879}.mc-password-meter small{font-size:6px;color:#8e9691}.mc-mismatch{display:none;color:#a34837!important;font-size:7px!important}.mc-mismatch.show{display:block}.mc-auth13-consent{display:grid!important;grid-template-columns:15px 1fr;gap:7px!important;align-items:start}.mc-auth13-consent input{margin-top:2px;accent-color:#17352c}.mc-auth13-consent>span{font-size:7px!important;line-height:1.5!important;font-weight:600!important;color:#7e8782!important}.mc-auth13-consent a{font-weight:900;color:#245747;text-decoration:underline}.mc-auth13-error{display:grid;grid-template-columns:20px 1fr;gap:7px;align-items:center;margin:0;padding:9px;border-radius:9px;background:#fff0ec;color:#8b3d2e;font-size:8px;line-height:1.45}.mc-auth13-error>span{display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#e27d65;color:#fff;font-weight:950}.mc-auth13-submit{height:50px;border:0;border-radius:11px;background:#17352c;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 15px;font-size:9px;font-weight:950;cursor:pointer;box-shadow:0 10px 24px rgba(23,53,44,.16)}.mc-auth13.provider .mc-auth13-submit{background:#9d503d}.mc-auth13-submit:disabled{opacity:.42;cursor:not-allowed;box-shadow:none}.mc-auth13-forgot{display:block;text-align:right;margin-top:9px;color:#315e50;font-size:8px;font-weight:900}.mc-auth13-security{display:grid;grid-template-columns:25px 1fr;gap:7px;margin-top:13px;padding:10px;border-radius:10px;background:#faf8f4}.mc-auth13-security>span{font-size:13px}.mc-auth13-security p{margin:0}.mc-auth13-security b,.mc-auth13-security small{display:block}.mc-auth13-security b{font-size:8px}.mc-auth13-security small{margin-top:2px;color:#858d89;font-size:7px;line-height:1.4}.mc-auth13-bottom{text-align:center;color:#88908b;font-size:7px;margin:13px 0 0}.mc-auth13-bottom button{border:0;background:transparent;color:#245747;font-size:7px;font-weight:950;cursor:pointer}@media(max-width:520px){.mc-auth13{padding:17px;border-radius:20px}.mc-auth13-row{grid-template-columns:1fr}}
    `}</style>
  </div>;
}

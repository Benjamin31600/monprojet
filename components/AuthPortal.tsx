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
  const [provider, setProvider] = useState({ name: "", providerType: "", city: "", postalCode: "", capacity: "", address: "", phone: "", website: "" });
  const signup = mode === "signup";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("erreur") || params.get("error");
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
  const roleLabel = audience === "family" ? "F" : "S";
  const roleTitle = audience === "family" ? (fr ? "Espace famille" : "Family space") : (fr ? "Espace service" : "Provider space");
  const providerStep1Valid = provider.name.trim().length >= 2 && provider.providerType && provider.city.trim().length >= 2;

  function updateProvider(key: keyof typeof provider, value: string) { setProvider((current) => ({ ...current, [key]: value })); }

  return <div className={`mc-auth13 ${audience}`}>
    <div className="mc-auth13-role"><span>{roleLabel}</span><div><small>{fr ? "ESPACE SÉCURISÉ" : "SECURE SPACE"}</small><b>{roleTitle}</b><p>{audience === "family" ? (fr ? "Recherche, profil et alertes au même endroit." : "Search, profile and alerts in one place.") : (fr ? "Votre annonce, vos demandes et vos informations professionnelles." : "Your listing, requests and professional information.")}</p></div></div>

    <div className="mc-auth13-tabs"><button type="button" className={signup ? "active" : ""} onClick={() => { setMode("signup"); setError(""); setBusy(false); }}>{fr ? "Créer mon compte" : "Create account"}</button><button type="button" className={!signup ? "active" : ""} onClick={() => { setMode("signin"); setError(""); setBusy(false); }}>{fr ? "Me connecter" : "Sign in"}</button></div>

    {signup && <div className="mc-auth13-free"><span>✓</span><div><b>{fr ? "Gratuit pour commencer" : "Free to start"}</b><small>{audience === "family" ? (fr ? "Créez votre espace pour enregistrer vos recherches et recevoir des alertes." : "Create your space to save searches and receive alerts.") : (fr ? "Créez votre annonce et présentez clairement votre service aux familles." : "Create your listing and clearly present your service to families.")}</small></div></div>}

    <form action={signup ? signupAction : signinAction} method="post" onSubmit={() => setBusy(true)}>
      <input type="hidden" name="locale" value={locale} />
      {signup && <input type="hidden" name="returnTo" value={audience === "family" ? `/${locale}/espace-famille?nouveau=1` : `/${locale}/espace-service?nouveau=1`} />}

      {signup && audience === "family" && <>
        <div className="mc-auth13-row"><label><span>{fr ? "Prénom" : "First name"}</span><input required name="firstName" minLength={2} maxLength={80} autoComplete="given-name" /></label><label><span>{fr ? "Nom (facultatif)" : "Last name (optional)"}</span><input name="lastName" maxLength={80} autoComplete="family-name" /></label></div>
        <label><span>{fr ? "Ville ou secteur (facultatif)" : "City or area (optional)"}</span><input name="profileCity" maxLength={120} autoComplete="address-level2" placeholder={fr ? "Ex. Mirabel" : "e.g. Mirabel"} /></label>
        <label><span>{fr ? "Téléphone (facultatif)" : "Phone (optional)"}</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
      </>}

      {signup && audience === "provider" && <>
        <input type="hidden" name="name" value={provider.name} /><input type="hidden" name="providerType" value={provider.providerType} /><input type="hidden" name="city" value={provider.city} /><input type="hidden" name="postalCode" value={provider.postalCode} /><input type="hidden" name="capacity" value={provider.capacity} /><input type="hidden" name="address" value={provider.address} /><input type="hidden" name="phone" value={provider.phone} /><input type="hidden" name="website" value={provider.website} />
        <div className="mc-auth13-progress"><span className={providerStep >= 1 ? "on" : ""}/><span className={providerStep >= 2 ? "on" : ""}/></div>
        {providerStep === 1 ? <div className="mc-provider-step">
          <div className="mc-provider-step-title"><small>{fr ? "ÉTAPE 1 SUR 2" : "STEP 1 OF 2"}</small><b>{fr ? "Présentez votre service" : "Present your service"}</b></div>
          <label><span>{fr ? "Nom du service" : "Provider name"}</span><input value={provider.name} onChange={(e)=>updateProvider("name",e.target.value)} minLength={2} maxLength={160} placeholder={fr ? "Ex. Les Petits Explorateurs" : "e.g. Little Explorers"} /></label>
          <div className="mc-auth13-row"><label><span>{fr ? "Type de service" : "Provider type"}</span><select value={provider.providerType} onChange={(e)=>updateProvider("providerType",e.target.value)}><option value="">{fr ? "Choisir" : "Choose"}</option><option value="CPE">CPE</option><option value="Garderie subventionnée">{fr ? "Garderie subventionnée" : "Subsidized daycare"}</option><option value="Milieu familial">{fr ? "Milieu familial / nounou" : "Home childcare"}</option><option value="Garderie non subventionnée">{fr ? "Garderie non subventionnée" : "Non-subsidized daycare"}</option></select></label><label><span>{fr ? "Ville" : "City"}</span><input value={provider.city} onChange={(e)=>updateProvider("city",e.target.value)} minLength={2} maxLength={120} placeholder="Mirabel" /></label></div>
          <div className="mc-auth13-row"><label><span>{fr ? "Code postal" : "Postal code"}</span><input value={provider.postalCode} onChange={(e)=>updateProvider("postalCode",e.target.value)} maxLength={20} /></label><label><span>{fr ? "Capacité (facultatif)" : "Capacity (optional)"}</span><input value={provider.capacity} onChange={(e)=>updateProvider("capacity",e.target.value)} type="number" min="0" max="10000" /></label></div>
          <button className="mc-auth13-next" disabled={!providerStep1Valid} type="button" onClick={() => setProviderStep(2)}>{fr ? "Continuer" : "Continue"} <b>→</b></button>
        </div> : <div className="mc-provider-step">
          <div className="mc-provider-step-title"><small>{fr ? "ÉTAPE 2 SUR 2" : "STEP 2 OF 2"}</small><b>{fr ? "Coordonnées et accès" : "Contact and access"}</b></div>
          <label><span>{fr ? "Adresse publique (facultatif)" : "Public address (optional)"}</span><input value={provider.address} onChange={(e)=>updateProvider("address",e.target.value)} maxLength={240} autoComplete="street-address" /></label>
          <div className="mc-auth13-row"><label><span>{fr ? "Téléphone public" : "Public phone"}</span><input value={provider.phone} onChange={(e)=>updateProvider("phone",e.target.value)} type="tel" maxLength={40} /></label><label><span>{fr ? "Site web" : "Website"}</span><input value={provider.website} onChange={(e)=>updateProvider("website",e.target.value)} type="url" maxLength={300} placeholder="https://" /></label></div>
          <button className="mc-auth13-back" type="button" onClick={() => setProviderStep(1)}>← {fr ? "Retour" : "Back"}</button>
        </div>}
      </>}

      {(!signup || audience === "family" || providerStep === 2) && <>
        <label><span>{fr ? "Adresse courriel" : "Email address"}</span><input required name="email" type="email" maxLength={240} autoComplete="email" placeholder="vous@exemple.ca" /></label>
        <label><span>{fr ? "Mot de passe" : "Password"}</span><input required name="password" type="password" minLength={signup && audience === "family" ? 10 : 8} maxLength={200} autoComplete={signup ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} /><div className="mc-password-meter">{signup && <><div>{[1,2,3,4].map((n) => <i key={n} className={passwordScore >= n ? "on" : ""}/>)}</div><small>{password.length === 0 ? (fr ? "Utilisez un mot de passe unique." : "Use a unique password.") : passwordScore <= 1 ? (fr ? "Faible" : "Weak") : passwordScore <= 2 ? (fr ? "Correct" : "Fair") : (fr ? "Bon" : "Good")}</small></>}</div></label>
        {signup && audience === "family" && <label><span>{fr ? "Confirmer le mot de passe" : "Confirm password"}</span><input required name="confirmPassword" type="password" minLength={10} maxLength={200} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} /><small className={confirm && confirm !== password ? "mc-mismatch show" : "mc-mismatch"}>{fr ? "Les mots de passe doivent être identiques." : "Passwords must match."}</small></label>}
        {signup && <label className="mc-auth13-consent"><input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} /><span>{fr ? <>J’accepte les <Link href={`/${locale}/conditions`}>conditions</Link> et la <Link href={`/${locale}/confidentialite`}>politique de confidentialité</Link>.</> : <>I accept the <Link href={`/${locale}/conditions`}>terms</Link> and <Link href={`/${locale}/confidentialite`}>privacy policy</Link>.</>}</span></label>}
        {error && <p className="mc-auth13-error" role="alert"><span>!</span>{error}</p>}
        <button className="mc-auth13-submit" disabled={busy || (signup && (!accepted || (audience === "family" && (password.length < 10 || password !== confirm))))}><span>{busy ? (fr ? "Validation…" : "Validating…") : signup ? (audience === "family" ? (fr ? "Créer mon espace famille" : "Create my family space") : (fr ? "Créer mon espace service" : "Create my provider space")) : (fr ? "Me connecter à mon espace" : "Sign in to my space")}</span><b>→</b></button>
      </>}
    </form>

    {!signup && audience === "family" && <Link className="mc-auth13-forgot" href={`/${locale}/espace-famille/mot-de-passe-oublie`}>{fr ? "Mot de passe oublié ?" : "Forgot password?"}</Link>}
    <div className="mc-auth13-security"><span>PRIVÉ</span><p><b>{fr ? "Vos données de compte restent privées" : "Your account data stays private"}</b><small>{fr ? "Une annonce service est publique uniquement avec les informations choisies pour être publiées." : "A provider listing is public only with information chosen for publication."}</small></p></div>
    <p className="mc-auth13-bottom">{signup ? (fr ? "Déjà inscrit ?" : "Already registered?") : (fr ? "Nouveau sur MyCoco ?" : "New to MyCoco?")} <button type="button" onClick={() => { setMode(signup ? "signin" : "signup"); setError(""); setBusy(false); }}>{signup ? (fr ? "Se connecter" : "Sign in") : (fr ? "Créer un compte" : "Create account")}</button></p>

    <style>{`
      .mc-auth13{background:#fff;border:1px solid #dcebea;border-radius:24px;padding:25px;box-shadow:0 24px 70px rgba(13,59,63,.1);color:#0d3b3f}.mc-auth13-role{display:flex;align-items:center;gap:12px;padding-bottom:17px;border-bottom:1px solid #edf3f2}.mc-auth13-role>span{display:grid;place-items:center;width:48px;height:48px;border-radius:15px;background:#dff7f4;color:#078b87;font-size:14px;font-weight:950}.mc-auth13.provider .mc-auth13-role>span{background:#0d3b3f;color:#fff}.mc-auth13-role small,.mc-auth13-role b,.mc-auth13-role p{display:block}.mc-auth13-role small{font-size:8px;font-weight:950;letter-spacing:.12em;color:#71898a}.mc-auth13-role b{font-size:16px;margin:3px 0}.mc-auth13-role p{font-size:10px;color:#718486;margin:0}.mc-auth13-tabs{display:grid;grid-template-columns:1fr 1fr;padding:4px;background:#f2f7f6;border-radius:12px;margin:17px 0 12px}.mc-auth13-tabs button{border:0;background:transparent;border-radius:9px;padding:10px;color:#728586;font-size:10px;font-weight:900;cursor:pointer}.mc-auth13-tabs button.active{background:#fff;color:#0d3b3f;box-shadow:0 3px 9px rgba(13,59,63,.08)}.mc-auth13-free{display:flex;gap:9px;align-items:center;padding:10px 11px;border-radius:11px;background:#e8f8f5;margin-bottom:14px}.mc-auth13-free>span{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#12a9a2;color:#fff;font-size:10px}.mc-auth13-free b,.mc-auth13-free small{display:block}.mc-auth13-free b{font-size:9px}.mc-auth13-free small{font-size:8px;color:#627979;margin-top:2px;line-height:1.4}.mc-auth13 form{display:grid;gap:12px}.mc-auth13 form>label,.mc-auth13-row>label,.mc-provider-step>label{display:grid;gap:6px}.mc-auth13 form label>span{font-size:10px;font-weight:900;color:#50696a}.mc-auth13 input:not([type=checkbox]),.mc-auth13 select{width:100%;height:48px;border:1px solid #d6e6e4;border-radius:10px;background:#fff;padding:0 12px;color:#0d3b3f;font:inherit;font-size:12px;outline:none}.mc-auth13 input:not([type=checkbox]):focus,.mc-auth13 select:focus{border-color:#12a9a2;box-shadow:0 0 0 4px rgba(18,169,162,.09)}.mc-auth13-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}.mc-auth13-progress{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:2px 0 4px}.mc-auth13-progress span{height:4px;border-radius:99px;background:#e5efee}.mc-auth13-progress span.on{background:#12a9a2}.mc-provider-step{display:grid;gap:12px}.mc-provider-step-title small,.mc-provider-step-title b{display:block}.mc-provider-step-title small{font-size:8px;font-weight:950;color:#078b87;letter-spacing:.1em}.mc-provider-step-title b{font-size:15px;margin-top:3px}.mc-auth13-next,.mc-auth13-back{border:0;cursor:pointer;font-weight:900}.mc-auth13-next{height:48px;border-radius:11px;background:#0d3b3f;color:#fff}.mc-auth13-next:disabled{opacity:.4;cursor:not-allowed}.mc-auth13-back{background:transparent;color:#607777;justify-self:start;padding:4px 0}.mc-auth13-consent{display:flex!important;align-items:flex-start;grid-template-columns:auto 1fr!important;gap:8px!important}.mc-auth13-consent input{margin-top:2px}.mc-auth13-consent span{font-size:9px!important;line-height:1.5!important}.mc-auth13-consent a{text-decoration:underline}.mc-auth13-submit{min-height:50px;border:0;border-radius:11px;background:#12a9a2;color:#fff;padding:0 15px;font-weight:950;display:flex;align-items:center;justify-content:space-between;cursor:pointer}.mc-auth13-submit:disabled{opacity:.45;cursor:not-allowed}.mc-auth13-error{display:flex;gap:8px;align-items:center;margin:0;padding:10px;border-radius:10px;background:#fff3ef;color:#8a3f32;font-size:10px}.mc-auth13-error>span{font-weight:950}.mc-password-meter{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center}.mc-password-meter>div{display:grid;grid-template-columns:repeat(4,1fr);gap:3px}.mc-password-meter i{height:3px;background:#e6eeee;border-radius:99px}.mc-password-meter i.on{background:#12a9a2}.mc-password-meter small{font-size:8px;color:#758788}.mc-mismatch{display:none}.mc-mismatch.show{display:block;color:#a44535;font-size:8px}.mc-auth13-forgot{display:inline-flex;margin-top:12px;color:#078b87;font-size:10px;font-weight:900}.mc-auth13-security{display:flex;gap:9px;margin-top:16px;padding-top:15px;border-top:1px solid #edf3f2;align-items:flex-start}.mc-auth13-security>span{padding:5px 7px;border-radius:6px;background:#e7f6f3;color:#078b87;font-size:7px;font-weight:950;letter-spacing:.08em}.mc-auth13-security b,.mc-auth13-security small{display:block}.mc-auth13-security b{font-size:9px}.mc-auth13-security small{font-size:8px;color:#718485;line-height:1.45;margin-top:2px}.mc-auth13-bottom{text-align:center;color:#778788;font-size:9px;margin:16px 0 0}.mc-auth13-bottom button{border:0;background:none;color:#078b87;font-weight:900;cursor:pointer}@media(max-width:560px){.mc-auth13-row{grid-template-columns:1fr}.mc-auth13{padding:20px}}
    `}</style>
  </div>;
}

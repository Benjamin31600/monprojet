"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = { locale: "fr" | "en"; audience: "family" | "provider"; mode?: "signup" | "signin" };

export default function AuthPortal({ locale, audience, mode: initialMode = "signup" }: Props) {
  const fr = locale === "fr";
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const destination = audience === "family" ? `/${locale}/espace-famille` : `/${locale}/espace-service`;
  const signup = mode === "signup";

  const passwordScore = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (signup && !accepted) {
      setError(fr ? "Acceptez les conditions et la politique de confidentialité pour créer votre espace." : "Accept the terms and privacy policy to create your space.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = signup
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password, callbackURL: destination })
        : await authClient.signIn.email({ email: email.trim(), password, rememberMe: true, callbackURL: destination });

      if (result.error) {
        const message = String(result.error.message || result.error.code || "").toLowerCase();
        if (message.includes("verify") || message.includes("verification")) {
          setError(fr ? "Votre adresse courriel doit être confirmée avant la connexion. Consultez le courriel envoyé par MyCoco." : "Your email address must be confirmed before signing in. Check the email sent by MyCoco.");
        } else if (message.includes("password") || message.includes("credential")) {
          setError(fr ? "Adresse courriel ou mot de passe incorrect." : "Incorrect email address or password.");
        } else {
          setError(fr ? "Impossible de poursuivre avec ces informations. Vérifiez votre adresse courriel ou essayez de vous connecter si un compte existe déjà." : "We couldn't continue with these details. Check your email or sign in if an account already exists.");
        }
        return;
      }

      try { localStorage.setItem("mycoco_account_role", audience); } catch {}
      window.location.assign(`${destination}${signup ? "?nouveau=1" : ""}`);
    } catch {
      setError(fr ? "Une erreur temporaire est survenue. Réessayez dans quelques instants." : "A temporary error occurred. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  const roleIcon = audience === "family" ? "👨‍👩‍👧" : "🏫";
  const roleTitle = audience === "family" ? (fr ? "Espace famille" : "Family space") : (fr ? "Espace service" : "Provider space");
  const roleText = audience === "family"
    ? (fr ? "Gardez votre recherche, vos favoris et vos prochaines alertes au même endroit." : "Keep your search, favourites and future alerts in one place.")
    : (fr ? "Gérez votre fiche, vos informations et vos futures demandes depuis un espace privé." : "Manage your listing, information and future enquiries from a private space.");

  return <div className={`mc-auth12 ${audience}`}>
    <div className="mc-auth12-role"><span>{roleIcon}</span><div><small>{fr ? "VOUS CRÉEZ" : "YOU’RE CREATING"}</small><b>{roleTitle}</b><p>{roleText}</p></div></div>

    <div className="mc-auth12-tabs" role="tablist" aria-label={fr ? "Créer un compte ou se connecter" : "Create account or sign in"}>
      <button type="button" className={signup ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>{fr ? "Créer mon compte" : "Create account"}</button>
      <button type="button" className={!signup ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>{fr ? "Me connecter" : "Sign in"}</button>
    </div>

    {signup && <div className="mc-auth12-free"><span>✓</span><div><b>{fr ? "Gratuit pour commencer" : "Free to start"}</b><small>{fr ? "Aucun abonnement, aucun engagement." : "No subscription, no commitment."}</small></div></div>}

    <form onSubmit={submit} noValidate>
      {signup && <label><span>{fr ? "Votre nom" : "Your name"}</span><input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={fr ? "Ex. Marie Tremblay" : "e.g. Marie Tremblay"} /></label>}
      <label><span>{fr ? "Adresse courriel" : "Email address"}</span><input required type="email" maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.ca" /></label>
      <label><span>{fr ? "Mot de passe" : "Password"}</span><input required type="password" minLength={8} maxLength={128} autoComplete={signup ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={fr ? "8 caractères minimum" : "At least 8 characters"} />
        {signup && <div className="mc-password-meter" aria-label={fr ? "Robustesse du mot de passe" : "Password strength"}><div>{[1,2,3,4].map((n) => <i key={n} className={passwordScore >= n ? "on" : ""} />)}</div><small>{password.length === 0 ? (fr ? "Utilisez un mot de passe unique." : "Use a unique password.") : passwordScore <= 1 ? (fr ? "Mot de passe faible" : "Weak password") : passwordScore <= 2 ? (fr ? "Correct" : "Fair") : (fr ? "Bon mot de passe" : "Good password")}</small></div>}
      </label>

      {signup && <label className="mc-auth12-consent"><input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} /><span>{fr ? <>J’accepte les <Link href={`/${locale}/conditions`}>conditions d’utilisation</Link> et la <Link href={`/${locale}/confidentialite`}>politique de confidentialité</Link>.</> : <>I accept the <Link href={`/${locale}/conditions`}>terms of use</Link> and <Link href={`/${locale}/confidentialite`}>privacy policy</Link>.</>}</span></label>}

      {error && <p className="mc-auth12-error" role="alert"><span>!</span>{error}</p>}

      <button className="mc-auth12-submit" disabled={busy || (signup && (!name.trim() || password.length < 8 || !accepted))}>
        <span>{busy ? (fr ? "Connexion sécurisée…" : "Secure connection…") : signup ? (audience === "family" ? (fr ? "Créer mon espace famille" : "Create my family space") : (fr ? "Créer mon espace service" : "Create my provider space")) : (fr ? "Me connecter" : "Sign in")}</span><b>→</b>
      </button>
    </form>

    <div className="mc-auth12-reassurance">
      <div><span>🔒</span><p><b>{fr ? "Privé par défaut" : "Private by default"}</b><small>{fr ? "Vos informations de compte ne sont jamais affichées dans l’annuaire." : "Your account information is never displayed in the directory."}</small></p></div>
      <div><span>✉️</span><p><b>{fr ? "Confirmation immédiate" : "Immediate confirmation"}</b><small>{fr ? "Une fois le compte créé, MyCoco confirme la création dans votre espace." : "Once your account is created, MyCoco confirms it inside your space."}</small></p></div>
    </div>

    <p className="mc-auth12-bottom">{signup ? (fr ? "Vous avez déjà un compte ?" : "Already have an account?") : (fr ? "Pas encore de compte ?" : "No account yet?")} <button type="button" onClick={() => { setMode(signup ? "signin" : "signup"); setError(""); }}>{signup ? (fr ? "Se connecter" : "Sign in") : (fr ? "Créer mon espace" : "Create my space")}</button></p>

    <style>{`
      .mc-auth12{background:#fff;border:1px solid #e3e8e4;border-radius:26px;padding:25px;box-shadow:0 26px 75px rgba(23,53,44,.11);color:#17352c}.mc-auth12-role{display:flex;gap:13px;align-items:center;padding-bottom:19px;border-bottom:1px solid #edf0ed}.mc-auth12-role>span{display:grid;place-items:center;width:51px;height:51px;border-radius:16px;background:#edf6f1;font-size:23px}.mc-auth12.provider .mc-auth12-role>span{background:#fff0e9}.mc-auth12-role>div{min-width:0}.mc-auth12-role small,.mc-auth12-role b,.mc-auth12-role p{display:block}.mc-auth12-role small{font-size:7px;font-weight:950;letter-spacing:.12em;color:#9a7667}.mc-auth12-role b{font-size:16px;margin:3px 0}.mc-auth12-role p{font-size:9px;line-height:1.45;color:#75827c;margin:0}.mc-auth12-tabs{display:grid;grid-template-columns:1fr 1fr;padding:4px;background:#f4f3ef;border-radius:12px;margin:19px 0 13px}.mc-auth12-tabs button{border:0;background:transparent;border-radius:9px;padding:10px 7px;color:#7b817d;font-size:10px;font-weight:900;cursor:pointer}.mc-auth12-tabs button.active{background:#fff;color:#17352c;box-shadow:0 3px 10px rgba(23,53,44,.07)}.mc-auth12-free{display:flex;align-items:center;gap:9px;padding:10px 12px;background:#edf7f1;border-radius:11px;margin-bottom:15px}.mc-auth12-free>span{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#2f7559;color:#fff;font-size:10px}.mc-auth12-free b,.mc-auth12-free small{display:block}.mc-auth12-free b{font-size:9px}.mc-auth12-free small{font-size:8px;color:#648073;margin-top:2px}.mc-auth12 form{display:grid;gap:13px}.mc-auth12 form>label:not(.mc-auth12-consent){display:grid;gap:6px}.mc-auth12 form>label>span{font-size:9px;font-weight:900;color:#495d54}.mc-auth12 input:not([type=checkbox]){width:100%;height:49px;border:1px solid #d9e1dc;border-radius:11px;padding:0 13px;color:#17352c;font-size:13px;outline:none;background:#fff}.mc-auth12 input:not([type=checkbox]):focus{border-color:#46836a;box-shadow:0 0 0 4px rgba(70,131,106,.09)}.mc-password-meter{display:flex;align-items:center;justify-content:space-between;gap:10px}.mc-password-meter>div{display:grid;grid-template-columns:repeat(4,24px);gap:3px}.mc-password-meter i{height:3px;border-radius:99px;background:#e8ebe8}.mc-password-meter i.on{background:#5d987b}.mc-password-meter small{color:#8a938e;font-size:7px}.mc-auth12-consent{display:grid;grid-template-columns:16px 1fr;gap:7px;align-items:start}.mc-auth12-consent input{margin-top:2px;accent-color:#17352c}.mc-auth12-consent>span{font-size:8px!important;line-height:1.5!important;font-weight:600!important;color:#78817c!important}.mc-auth12-consent a{font-weight:900;color:#245747;text-decoration:underline;text-underline-offset:2px}.mc-auth12-error{display:grid;grid-template-columns:22px 1fr;gap:7px;align-items:center;margin:0;padding:10px;border-radius:10px;background:#fff1ed;color:#8a3c2d;font-size:9px;line-height:1.45}.mc-auth12-error>span{display:grid;place-items:center;width:21px;height:21px;border-radius:50%;background:#e7907d;color:#fff;font-weight:950}.mc-auth12-submit{height:51px;border:0;border-radius:12px;background:#17352c;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:10px;font-weight:950;cursor:pointer;box-shadow:0 10px 24px rgba(23,53,44,.16)}.mc-auth12.provider .mc-auth12-submit{background:#9d503d}.mc-auth12-submit:disabled{opacity:.45;cursor:not-allowed;box-shadow:none}.mc-auth12-reassurance{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:15px}.mc-auth12-reassurance>div{display:grid;grid-template-columns:24px 1fr;gap:7px;padding:10px;background:#faf8f4;border-radius:10px}.mc-auth12-reassurance>div>span{font-size:13px}.mc-auth12-reassurance p{margin:0}.mc-auth12-reassurance b,.mc-auth12-reassurance small{display:block}.mc-auth12-reassurance b{font-size:8px}.mc-auth12-reassurance small{font-size:7px;line-height:1.4;color:#858b87;margin-top:2px}.mc-auth12-bottom{text-align:center;color:#88908b;font-size:8px;margin:15px 0 0}.mc-auth12-bottom button{border:0;background:transparent;color:#245747;font-size:8px;font-weight:950;cursor:pointer;padding:0}@media(max-width:520px){.mc-auth12{padding:18px;border-radius:20px}.mc-auth12-reassurance{grid-template-columns:1fr}}
    `}</style>
  </div>;
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = { locale: "fr" | "en"; audience: "family" | "provider"; mode?: "signup" | "signin" };

export default function AuthPortal({ locale, audience, mode: initialMode = "signup" }: Props) {
  const fr = locale === "fr";
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const destination = audience === "family" ? `/${locale}/espace-famille` : `/${locale}/espace-service`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = mode === "signup"
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password, callbackURL: destination })
        : await authClient.signIn.email({ email: email.trim(), password, rememberMe: true, callbackURL: destination });
      if (result.error) {
        setError(fr ? "Impossible de poursuivre. Vérifiez vos informations ou utilisez une autre adresse courriel." : "We couldn't continue. Check your details or use another email address.");
        return;
      }
      window.location.assign(destination);
    } catch {
      setError(fr ? "Une erreur temporaire est survenue. Réessayez." : "A temporary error occurred. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="mc-auth-card">
    <div className="mc-auth-audience"><span>{audience === "family" ? "👨‍👩‍👧" : "🏫"}</span><div><b>{audience === "family" ? (fr ? "Espace famille" : "Family space") : (fr ? "Espace service" : "Provider space")}</b><small>{audience === "family" ? (fr ? "Recherche, favoris et alertes au même endroit." : "Search, favourites and alerts in one place.") : (fr ? "Votre fiche, votre visibilité et vos demandes." : "Your listing, visibility and requests.")}</small></div></div>
    <div className="mc-auth-tabs"><button type="button" className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>{fr ? "Créer mon compte" : "Create account"}</button><button type="button" className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>{fr ? "Me connecter" : "Sign in"}</button></div>
    <form onSubmit={submit}>
      {mode === "signup" && <label><span>{fr ? "Prénom et nom" : "Full name"}</span><input required minLength={2} maxLength={100} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></label>}
      <label><span>{fr ? "Adresse courriel" : "Email address"}</span><input required type="email" maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label><span>{fr ? "Mot de passe" : "Password"}</span><input required type="password" minLength={8} maxLength={128} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} /><small>{mode === "signup" ? (fr ? "8 caractères minimum. N'utilisez pas un mot de passe déjà utilisé ailleurs." : "At least 8 characters. Do not reuse a password from another service.") : ""}</small></label>
      {error && <p className="mc-auth-error" role="alert">{error}</p>}
      <button className="mc-auth-submit" disabled={busy}>{busy ? (fr ? "Connexion sécurisée…" : "Secure connection…") : mode === "signup" ? (fr ? "Créer mon espace" : "Create my space") : (fr ? "Me connecter" : "Sign in")} <span>→</span></button>
    </form>
    <div className="mc-auth-privacy"><b>🔒 {fr ? "Vos données restent privées" : "Your data stays private"}</b><p>{fr ? "MyCoco collecte uniquement les informations nécessaires au service. Nous ne vendons pas vos renseignements personnels." : "MyCoco only collects information needed to provide the service. We do not sell your personal information."}</p><Link href={`/${locale}/confidentialite`}>{fr ? "Politique de confidentialité" : "Privacy policy"} →</Link></div>
    <style>{`.mc-auth-card{background:#fff;border:1px solid #e4ded4;border-radius:24px;padding:26px;box-shadow:0 24px 70px rgba(43,36,31,.1)}.mc-auth-audience{display:flex;gap:13px;align-items:center;padding-bottom:20px;border-bottom:1px solid #eee8df}.mc-auth-audience>span{display:grid;place-items:center;width:48px;height:48px;border-radius:15px;background:#f6efe5;font-size:22px}.mc-auth-audience div{display:grid;gap:4px}.mc-auth-audience b{font-size:15px;color:#2b2723}.mc-auth-audience small{font-size:11px;color:#7d756d}.mc-auth-tabs{display:grid;grid-template-columns:1fr 1fr;background:#f5f2ed;border-radius:12px;padding:4px;margin:20px 0}.mc-auth-tabs button{border:0;background:transparent;border-radius:9px;padding:10px;font-weight:850;font-size:12px;color:#756d66;cursor:pointer}.mc-auth-tabs button.active{background:#fff;color:#2b2723;box-shadow:0 3px 10px rgba(43,36,31,.06)}.mc-auth-card form{display:grid;gap:14px}.mc-auth-card label{display:grid;gap:6px}.mc-auth-card label>span{font-size:11px;font-weight:850;color:#4b453f}.mc-auth-card input{height:50px;border:1px solid #ddd6cc;border-radius:12px;padding:0 13px;font-size:14px;outline:none}.mc-auth-card input:focus{border-color:#1e5748;box-shadow:0 0 0 4px rgba(30,87,72,.08)}.mc-auth-card label small{font-size:9px;color:#8b837b}.mc-auth-submit{height:52px;border:0;border-radius:12px;background:#1e5748;color:#fff;font-weight:900;cursor:pointer;margin-top:3px}.mc-auth-submit:disabled{opacity:.6}.mc-auth-error{margin:0;padding:11px 12px;border-radius:10px;background:#fff1ed;color:#8a3c2d;font-size:11px}.mc-auth-privacy{margin-top:18px;padding:15px;border-radius:14px;background:#f4f8f6;color:#53665f}.mc-auth-privacy b{font-size:11px;color:#244b40}.mc-auth-privacy p{font-size:10px;line-height:1.55;margin:5px 0 7px}.mc-auth-privacy a{font-size:10px;font-weight:850;color:#1e5748}`}</style>
  </div>;
}

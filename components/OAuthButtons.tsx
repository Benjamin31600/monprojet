"use client";

import { useState } from "react";

type Props = { locale: "fr" | "en"; role: "family" | "provider"; returnTo?: string };

export default function OAuthButtons({ locale, role, returnTo }: Props) {
  const fr = locale === "fr";
  const [loading, setLoading] = useState<"google" | "apple" | null>(null);
  const start = (provider: "google" | "apple") => {
    setLoading(provider);
    const params = new URLSearchParams({ provider, locale, role });
    if (returnTo) params.set("returnTo", returnTo);
    window.location.assign(`/api/auth/oauth?${params.toString()}`);
  };
  return <div className="mc-oauth-buttons">
    <button className="mc-oauth-google" type="button" onClick={() => start("google")} disabled={Boolean(loading)} aria-busy={loading === "google"}>
      <span className="mc-google-icon" aria-hidden="true">G</span><span>{loading === "google" ? (fr ? "Connexion à Google…" : "Connecting to Google…") : (fr ? "Continuer avec Google" : "Continue with Google")}</span><span className="mc-oauth-arrow">→</span>
    </button>
    <button className="mc-oauth-apple" type="button" onClick={() => start("apple")} disabled={Boolean(loading)} aria-busy={loading === "apple"}>
      <span className="mc-apple-mark" aria-hidden="true"></span><span>{loading === "apple" ? (fr ? "Connexion…" : "Signing in…") : (fr ? "Continuer avec Apple" : "Continue with Apple")}</span><span className="mc-oauth-arrow">→</span>
    </button>
    <p className="mc-oauth-reassurance">{role === "family" ? (fr ? "Votre espace garde vos recherches et vos alertes au même endroit." : "Your space keeps your searches and alerts together.") : (fr ? "Créez votre présence gratuitement au lancement." : "Create your presence for free at launch.")}</p>
  </div>;
}

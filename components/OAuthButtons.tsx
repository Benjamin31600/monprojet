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
  return (
    <div className="mc-oauth-buttons">
      <button type="button" onClick={() => start("google")} disabled={Boolean(loading)} aria-busy={loading === "google"}>
        <span className="mc-google-g">G</span>{loading === "google" ? (fr ? "Connexion…" : "Signing in…") : (fr ? "Continuer avec Google" : "Continue with Google")}
      </button>
      <button type="button" onClick={() => start("apple")} disabled={Boolean(loading)} aria-busy={loading === "apple"}>
        <span className="mc-apple-mark"></span>{loading === "apple" ? (fr ? "Connexion…" : "Signing in…") : (fr ? "Continuer avec Apple" : "Continue with Apple")}
      </button>
    </div>
  );
}

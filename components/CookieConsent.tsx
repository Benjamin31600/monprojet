"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "mycoco_consent_v1";

export function analyticsConsentGiven() {
  try { return window.localStorage.getItem(CONSENT_KEY) === "accepted"; } catch { return false; }
}

export default function CookieConsent({ locale }: { locale: "fr" | "en" }) {
  const fr = locale === "fr";
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(!window.localStorage.getItem(CONSENT_KEY)); } catch { setVisible(false); }
  }, []);
  const choose = (value: "accepted" | "refused") => {
    try { window.localStorage.setItem(CONSENT_KEY, value); } catch {}
    setVisible(false);
    window.dispatchEvent(new CustomEvent("mycoco-consent", { detail: value }));
  };
  if (!visible) return null;
  return <aside className="mc-cookie" aria-label={fr ? "Préférences de confidentialité" : "Privacy preferences"}>
    <div className="mc-cookie-copy"><span>{fr ? "VOTRE VIE PRIVÉE" : "YOUR PRIVACY"}</span><strong>{fr ? "Vous gardez le choix." : "You stay in control."}</strong><p>{fr ? "MyCoco utilise les cookies essentiels pour fonctionner. Avec votre accord, nous utilisons aussi la mesure d’audience pour améliorer le parcours." : "MyCoco uses essential cookies to work. With your consent, we also use audience measurement to improve the experience."} <Link href={`/${locale}/confidentialite`}>{fr ? "En savoir plus" : "Learn more"}</Link></p></div>
    <div className="mc-cookie-actions"><button className="mc-cookie-secondary" onClick={() => choose("refused")}>{fr ? "Refuser" : "Decline"}</button><button className="mc-cookie-primary" onClick={() => choose("accepted")}>{fr ? "Accepter" : "Accept"}</button></div>
    <style>{`.mc-cookie{position:fixed;left:20px;right:20px;bottom:20px;z-index:250;display:flex;align-items:center;justify-content:space-between;gap:24px;max-width:1080px;margin:auto;padding:18px 20px;background:#102a23;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:18px;box-shadow:0 24px 70px rgba(16,42,35,.28);animation:mc-cookie-in .4s cubic-bezier(.2,.75,.2,1)}.mc-cookie-copy{min-width:0}.mc-cookie-copy>span{display:block;margin-bottom:5px;color:#9ac5b1;font-size:8px;font-weight:950;letter-spacing:.14em}.mc-cookie-copy strong{display:block;font-size:15px;line-height:1.1}.mc-cookie-copy p{max-width:700px;margin:5px 0 0;color:#c5d5cf;font-size:10px;line-height:1.5}.mc-cookie-copy a{color:#fff;text-decoration:underline;text-underline-offset:2px}.mc-cookie-actions{display:flex;gap:8px;flex:0 0 auto}.mc-cookie-actions button{min-height:42px;padding:0 15px;border-radius:10px;font-size:10px;font-weight:900;cursor:pointer}.mc-cookie-secondary{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.2)}.mc-cookie-primary{background:#e87858;color:#fff;border:1px solid #e87858}@keyframes mc-cookie-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@media(max-width:700px){.mc-cookie{left:12px;right:12px;bottom:12px;display:block;padding:16px}.mc-cookie-actions{margin-top:13px}.mc-cookie-actions button{flex:1}}`}</style>
  </aside>;
}

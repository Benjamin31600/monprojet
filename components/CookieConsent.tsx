"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY="mycoco_consent_v1";
export function analyticsConsentGiven(){try{return window.localStorage.getItem(CONSENT_KEY)==="accepted"}catch{return false}}

export default function CookieConsent({locale}:{locale:"fr"|"en"}){
  const fr=locale==="fr";const[visible,setVisible]=useState(false);
  useEffect(()=>{try{setVisible(!window.localStorage.getItem(CONSENT_KEY))}catch{setVisible(false)}},[]);
  const choose=(value:"accepted"|"refused")=>{try{window.localStorage.setItem(CONSENT_KEY,value)}catch{}setVisible(false);window.dispatchEvent(new CustomEvent("mycoco-consent",{detail:value}))};
  if(!visible)return null;
  return <aside className="mc-cookie14" aria-label={fr?"Préférences de confidentialité":"Privacy preferences"}><div><small>{fr?"CONFIDENTIALITÉ":"PRIVACY"}</small><strong>{fr?"Les cookies non essentiels restent désactivés sans votre accord.":"Non-essential cookies stay off unless you agree."}</strong><p>{fr?<>MyCoco utilise ce qui est nécessaire au fonctionnement du service. La mesure d’audience n’est activée qu’avec votre consentement. Refuser ne bloque pas la recherche. <Link href={`/${locale}/confidentialite`}>En savoir plus</Link>.</>:<>MyCoco uses what is necessary to run the service. Audience measurement is enabled only with your consent. Declining does not block search. <Link href={`/${locale}/confidentialite`}>Learn more</Link>.</>}</p></div><div className="mc-cookie14-actions"><button className="mc-cookie14-reject" onClick={()=>choose("refused")}>{fr?"Continuer sans mesure":"Continue without analytics"}</button><button className="mc-cookie14-accept" onClick={()=>choose("accepted")}>{fr?"Accepter la mesure":"Accept analytics"}</button></div></aside>;
}

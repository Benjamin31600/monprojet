"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { analyticsConsentGiven } from "./CookieConsent";

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const sync = () => setAllowed(analyticsConsentGiven());
    sync();
    window.addEventListener("mycoco-consent", sync);
    return () => window.removeEventListener("mycoco-consent", sync);
  }, []);
  if (!measurementId || !allowed) return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
    </Script>
  </>;
}

"use client";

import { useEffect } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
type FunnelEvent = { event: "page_view" | "cta_click" | "form_start" | "step_complete" | "demand_submitted" | "results_view" | "provider_click"; path: string; locale?: "fr" | "en"; step?: number; source?: string; providerId?: string };

function persistAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) { const value = params.get(key); if (value) window.localStorage.setItem(`mycoco_${key}`, value.slice(0, 120)); }
  } catch {}
}
function attribution() {
  try { return UTM_KEYS.map(key => { const value = window.localStorage.getItem(`mycoco_${key}`); return value ? `${key}=${encodeURIComponent(value)}` : ""; }).filter(Boolean).join("&").slice(0, 450); } catch { return ""; }
}
function sessionId() {
  try {
    const key = "mycoco_session_id";
    let id = window.localStorage.getItem(key);
    if (!id) { id = crypto.randomUUID(); window.localStorage.setItem(key, id); }
    return id;
  } catch { return "anonymous-session"; }
}
function send(event: FunnelEvent) {
  const payload = JSON.stringify({ ...event, sessionId: sessionId(), source: event.source || attribution() || undefined });
  try {
    if (navigator.sendBeacon) { navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" })); return; }
    void fetch("/api/events", { method: "POST", headers: { "content-type": "application/json" }, body: payload, keepalive: true });
  } catch {}
}

export default function FunnelTracker() {
  useEffect(() => {
    persistAttribution();
    const path = window.location.pathname;
    const locale = path.startsWith("/en") ? "en" : path.startsWith("/fr") ? "fr" : undefined;
    send({ event: "page_view", path, locale });
    if (path.includes("/garderies")) send({ event: "results_view", path, locale });

    let formStarted = false;
    const completed = new Set<string>();
    const onFocus = (event: Event) => { const target = event.target as HTMLElement | null; if (!target?.closest("form[action='/api/demandes']")) return; if (!formStarted) { formStarted = true; send({ event: "form_start", path, locale }); } };
    const onChange = (event: Event) => { const target = event.target as HTMLInputElement | HTMLSelectElement | null; if (!target?.name || !target.closest("form[action='/api/demandes']")) return; const step = target.name === "ville" ? 1 : target.name === "age" ? 2 : target.name === "type" ? 3 : target.name === "debut" ? 4 : 0; if (!step || completed.has(target.name)) return; completed.add(target.name); send({ event: "step_complete", path, locale, step }); };
    const onClick = (event: Event) => { const target = event.target as HTMLElement | null; const link = target?.closest("a,button") as HTMLAnchorElement | HTMLButtonElement | null; if (!link) return; if (link.closest("form[action='/api/demandes']") && link.tagName === "BUTTON") return; const href = link instanceof HTMLAnchorElement ? link.getAttribute("href") || "" : ""; const text = (link.textContent || "").trim().toLowerCase(); if (href.includes("/mon-besoin") || text.includes("trouver ma solution") || text.includes("find my solution")) send({ event: "cta_click", path, locale }); if (href.includes("/garderie/") && !href.includes("/garderies?")) send({ event: "provider_click", path, locale, providerId: href.split("/garderie/")[1]?.split(/[?#]/)[0] }); };
    const onSubmit = (event: Event) => { const form = event.target as HTMLFormElement | null; if (form?.action.includes("/api/demandes")) send({ event: "demand_submitted", path, locale }); };
    document.addEventListener("focusin", onFocus); document.addEventListener("change", onChange); document.addEventListener("click", onClick); document.addEventListener("submit", onSubmit);
    return () => { document.removeEventListener("focusin", onFocus); document.removeEventListener("change", onChange); document.removeEventListener("click", onClick); document.removeEventListener("submit", onSubmit); };
  }, []);
  return null;
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const other = fr ? "en" : "fr";
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const go = () => setOpen(null);
  const toggle = (menu: string) => setOpen((current) => current === menu ? null : menu);

  return <>
    <header className="mc-site-header" ref={ref}>
      <div className="mc-site-inner">
        <Link className="mc-site-brand" href={`/${locale}`} onClick={go} aria-label="MyCoco — accueil">
          <span className="mc-site-mark">m</span><span>my<span>coco</span></span>
        </Link>
        <nav className="mc-site-desktop" aria-label={fr ? "Navigation principale" : "Main navigation"}>
          <div className="mc-menu-wrap">
            <button className={open === "family" ? "mc-menu-trigger active" : "mc-menu-trigger"} onClick={() => toggle("family")} aria-expanded={open === "family"}>
              {fr ? "Pour les familles" : "For families"}<span>⌄</span>
            </button>
            {open === "family" && <div className="mc-menu-panel">
              <div className="mc-panel-label">{fr ? "FAMILLES" : "FAMILIES"}</div>
              <Link className="mc-panel-main" href={`/${locale}/mon-besoin`} onClick={go}>{fr ? "Trouver une garde" : "Find childcare"}<small>{fr ? "Définir votre besoin et voir les solutions pertinentes." : "Define your need and see relevant options."}</small></Link>
              <Link href={`/${locale}/garderies`} onClick={go}>{fr ? "Parcourir l’annuaire" : "Browse the directory"}<small>{fr ? "Comparer les services de garde." : "Compare childcare services."}</small></Link>
              <Link href={`/${locale}/inscription?role=family`} onClick={go}>{fr ? "Créer mon espace famille" : "Create my family space"}<small>{fr ? "Enregistrer recherches, favoris et alertes." : "Save searches, favourites and alerts."}</small></Link>
            </div>}
          </div>
          <div className="mc-menu-wrap">
            <button className={open === "provider" ? "mc-menu-trigger active" : "mc-menu-trigger"} onClick={() => toggle("provider")} aria-expanded={open === "provider"}>
              {fr ? "Pour les services" : "For providers"}<span>⌄</span>
            </button>
            {open === "provider" && <div className="mc-menu-panel">
              <div className="mc-panel-label">{fr ? "SERVICES DE GARDE" : "CHILDCARE PROVIDERS"}</div>
              <Link className="mc-panel-main provider" href={`/${locale}/inscription?role=provider`} onClick={go}>{fr ? "Créer mon espace service" : "Create provider space"}<small>{fr ? "Présenter votre service et gérer votre fiche." : "Showcase your service and manage your listing."}</small></Link>
              <Link href={`/${locale}/pour-les-services`} onClick={go}>{fr ? "Pourquoi rejoindre MyCoco ?" : "Why join MyCoco?"}<small>{fr ? "Comprendre le modèle et les avantages." : "Understand the model and benefits."}</small></Link>
              <Link href={`/${locale}/espace-service`} onClick={go}>{fr ? "Accéder à mon espace service" : "Open my provider space"}<small>{fr ? "Gérer votre présence MyCoco." : "Manage your MyCoco presence."}</small></Link>
            </div>}
          </div>
          <Link href={`/${locale}/garderies`} onClick={go}>{fr ? "Annuaire" : "Directory"}</Link>
          <Link href={`/${locale}/comment-ca-marche`} onClick={go}>{fr ? "Comment ça marche" : "How it works"}</Link>
          <Link href={`/${locale}/a-propos`} onClick={go}>{fr ? "À propos" : "About"}</Link>
          <Link className="mc-site-login" href={`/${locale}/connexion`} onClick={go}>{fr ? "Se connecter" : "Sign in"}</Link>
          <Link className="mc-site-lang" href={`/${other}`} onClick={go}>{other.toUpperCase()}</Link>
          <Link className="mc-site-cta" href={`/${locale}/mon-besoin`} onClick={go}>{fr ? "Trouver ma garde" : "Find my childcare"}<span>→</span></Link>
        </nav>
        <div className="mc-mobile-shell">
          <button className="mc-mobile-trigger" onClick={() => toggle("mobile")} aria-label={fr ? "Ouvrir le menu" : "Open menu"} aria-expanded={open === "mobile"}>
            <i></i><i></i><i></i>
          </button>
          {open === "mobile" && <div className="mc-mobile-panel">
            <div className="mc-panel-label">{fr ? "FAMILLES" : "FAMILIES"}</div>
            <Link className="mc-mobile-main" href={`/${locale}/mon-besoin`} onClick={go}>{fr ? "Trouver une garde" : "Find childcare"}<span>→</span></Link>
            <Link href={`/${locale}/garderies`} onClick={go}>{fr ? "Parcourir l’annuaire" : "Browse directory"}</Link>
            <Link href={`/${locale}/inscription?role=family`} onClick={go}>{fr ? "Créer mon espace famille" : "Create my family space"}</Link>
            <div className="mc-panel-label">{fr ? "SERVICES" : "PROVIDERS"}</div>
            <Link className="mc-mobile-main provider" href={`/${locale}/inscription?role=provider`} onClick={go}>{fr ? "Créer mon espace service" : "Create provider space"}<span>→</span></Link>
            <Link href={`/${locale}/pour-les-services`} onClick={go}>{fr ? "Pourquoi rejoindre MyCoco ?" : "Why join MyCoco?"}</Link>
            <div className="mc-panel-label">MYCOCO</div>
            <Link href={`/${locale}/comment-ca-marche`} onClick={go}>{fr ? "Comment ça marche" : "How it works"}</Link>
            <Link href={`/${locale}/a-propos`} onClick={go}>{fr ? "À propos" : "About"}</Link>
            <Link href={`/${locale}/connexion`} onClick={go}>{fr ? "Se connecter" : "Sign in"}</Link>
            <Link href={`/${other}`} onClick={go}>{other.toUpperCase()}</Link>
          </div>}
        </div>
      </div>
    </header>
    <style>{`.mc-site-header{position:sticky;top:0;z-index:1000;background:rgba(251,248,241,.96);border-bottom:1px solid #d9e2dc;backdrop-filter:blur(20px)}.mc-site-inner{height:76px;width:min(1240px,calc(100% - 40px));margin:auto;display:flex;align-items:center;justify-content:space-between;gap:28px}.mc-site-brand{display:inline-flex;align-items:center;gap:9px;color:#17322b;font-size:21px;font-weight:950;letter-spacing:-.06em;flex:0 0 auto}.mc-site-brand>span:last-child>span{color:#e87858}.mc-site-mark{display:grid;place-items:center;width:30px;height:30px;border-radius:10px 10px 10px 4px;background:#17322b;color:#fff;font-size:13px}.mc-site-desktop{display:flex;align-items:center;justify-content:flex-end;gap:19px;color:#53645d;font-size:11px;font-weight:850}.mc-site-desktop>a,.mc-menu-trigger{white-space:nowrap}.mc-menu-wrap{position:relative}.mc-menu-trigger{border:0;background:none;padding:7px 2px;color:#53645d;font:inherit;cursor:pointer}.mc-menu-trigger span{margin-left:5px;font-size:10px}.mc-menu-trigger.active,.mc-menu-trigger:hover,.mc-site-desktop>a:hover,.mc-site-login{color:#17322b}.mc-menu-panel{position:absolute;top:40px;left:-16px;width:290px;padding:8px;background:#fff;border:1px solid #d9e2dc;border-radius:16px;box-shadow:0 25px 65px rgba(23,50,43,.16)}.mc-panel-label{padding:10px 12px 6px;color:#92a099;font-size:7px;font-weight:950;letter-spacing:.16em}.mc-menu-panel a{display:block;padding:12px;border-radius:10px;color:#17322b;font-size:11px;font-weight:850}.mc-menu-panel a:hover{background:#f3f7f4}.mc-menu-panel a.provider{background:#fff7f3}.mc-menu-panel a small{display:block;margin-top:4px;color:#7b8983;font-size:9px;line-height:1.45;font-weight:650}.mc-site-login{margin-left:2px}.mc-site-lang{border:1px solid #d6e1da;border-radius:999px;padding:6px 8px}.mc-site-cta{display:inline-flex;align-items:center;gap:7px;min-height:42px;padding:0 15px;border-radius:11px;background:#e87858;color:#fff!important;box-shadow:0 8px 18px rgba(232,120,88,.18)}.mc-site-cta:hover{background:#d9684b}.mc-mobile-shell{display:none}.mc-mobile-trigger{border:1px solid #d6e1da;border-radius:11px;background:#fff;width:42px;height:42px;display:grid;place-content:center;gap:4px;cursor:pointer}.mc-mobile-trigger i{width:17px;height:1.5px;background:#17322b;display:block}.mc-mobile-panel{position:absolute;right:14px;top:60px;width:min(350px,calc(100vw - 28px));max-height:calc(100vh - 76px);overflow:auto;padding:10px;background:#fff;border:1px solid #d9e2dc;border-radius:16px;box-shadow:0 25px 65px rgba(23,50,43,.18)}.mc-mobile-panel a{display:flex;align-items:center;justify-content:space-between;padding:12px;border-radius:10px;color:#17322b;font-size:11px;font-weight:850}.mc-mobile-panel a:hover{background:#f3f7f4}.mc-mobile-panel .mc-mobile-main{background:#17322b;color:#fff;margin-bottom:3px}.mc-mobile-panel .mc-mobile-main.provider{background:#e87858}.mc-mobile-panel .mc-panel-label{padding-top:12px}@media(max-width:1060px){.mc-site-desktop{display:none}.mc-mobile-shell{display:block;position:relative}.mc-site-inner{height:68px;width:min(100% - 28px,1240px)}}@media(max-width:600px){.mc-site-brand{font-size:19px}.mc-site-mark{width:28px;height:28px}}`}</style>
  </>;
}

export default function PolishStyles() {
  return <style>{`
    @media (prefers-reduced-motion:no-preference){
      .mc-home-v2 .mc-home-copy,.mc-home-v2 .mc-finder-card,.mc-home-v2 .mc-home-trust,.mc-home-v2 .mc-home-section,.mc-home-v2 .mc-home-local,.mc-home-v2 .mc-home-final,.mycoco-home-v5 .v5-hero-copy,.mycoco-home-v5 .v5-product-stage,.signup-v5 .signup-intro,.signup-v5 .signup-card,.mc-standard-page .mc-standard-hero{animation:mc-fade-up .55s cubic-bezier(.2,.7,.2,1) both}
      .mc-home-v2 .mc-finder-card,.mycoco-home-v5 .v5-product-stage{animation-delay:.08s}
      .mc-home-v2 .mc-home-primary,.mc-home-v2 .mc-home-secondary,.mc-home-v2 .mc-finder-button,.mycoco-home-v5 .v5-btn,.signup-v5 .signup-submit,.mc-global-header a{transition:transform .18s ease,box-shadow .18s ease,background-color .18s ease,color .18s ease,border-color .18s ease}
      .mc-home-v2 .mc-home-primary:hover,.mc-home-v2 .mc-finder-button:hover,.mycoco-home-v5 .v5-btn:hover,.signup-v5 .signup-submit:hover{transform:translateY(-2px)}
      .mc-home-v2 .mc-home-cards article,.mc-home-v2 .mc-how-grid article,.mc-home-v2 .mc-city-list a,.mycoco-home-v5 .v5-chooser-card,.mycoco-home-v5 .v5-provider,.mc-nav-menu>div a{transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}
      .mc-home-v2 .mc-home-cards article:hover,.mc-home-v2 .mc-how-grid article:hover,.mc-home-v2 .mc-city-list a:hover,.mycoco-home-v5 .v5-chooser-card:hover,.mycoco-home-v5 .v5-provider:hover{transform:translateY(-3px);box-shadow:0 18px 45px rgba(24,53,44,.09)}
      .mc-oauth-google:hover:not(:disabled){box-shadow:0 10px 26px rgba(24,53,44,.08);transform:translateY(-1px)}
      .mc-oauth-google,.mc-oauth-apple{position:relative;display:flex;align-items:center;gap:10px;width:100%;height:50px;padding:0 14px;border-radius:12px;font-size:11px;font-weight:900;cursor:pointer}
      .mc-oauth-google{border:1px solid #d8e2dc;background:#fff;color:#17322b;box-shadow:0 6px 16px rgba(23,50,43,.04)}
      .mc-oauth-apple{border:1px solid #17322b;background:#17322b;color:#fff}
      .mc-oauth-google:disabled,.mc-oauth-apple:disabled{opacity:.55;cursor:wait}
      .mc-google-icon,.mc-apple-mark{display:grid;place-items:center;flex:0 0 26px;height:26px;border-radius:8px;font-weight:950}.mc-google-icon{background:#f4f7f5;font-size:13px}.mc-apple-mark{font-size:16px}.mc-oauth-arrow{margin-left:auto;font-size:14px}.mc-oauth-reassurance{margin:9px 0 0;text-align:center;color:#829088;font-size:9px;line-height:1.45}
      .signup-v5 .signup-eyebrow,.signup-v5 .signup-card-kicker{color:#2f765f}.signup-v5 .signup-intro h1{max-width:690px}.signup-v5 .signup-submit{background:#e87858;box-shadow:0 10px 25px rgba(232,120,88,.18)}.signup-v5 .signup-submit:hover{background:#d9684b;box-shadow:0 14px 30px rgba(232,120,88,.22)}
      .signup-v5 .signup-card{box-shadow:0 30px 80px rgba(23,50,43,.11)}
    }
    @keyframes mc-fade-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
    :focus-visible{outline:3px solid rgba(232,120,88,.45);outline-offset:3px}
  `}</style>;
}

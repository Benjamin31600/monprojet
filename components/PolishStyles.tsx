export default function PolishStyles() {
  return <style>{`
    :root{
      --mc-ink:#0d3b3f;
      --mc-ink-2:#174f52;
      --mc-turquoise:#12a9a2;
      --mc-turquoise-strong:#078b87;
      --mc-turquoise-soft:#dff7f4;
      --mc-mint:#eefaf8;
      --mc-cream:#fffdf8;
      --mc-paper:#ffffff;
      --mc-line:#d7ebe8;
      --mc-muted:#647b7b;
      --mc-shadow:0 22px 55px rgba(13,59,63,.10);
    }

    body{color:var(--mc-ink);background:var(--mc-cream);font-size:16px;line-height:1.55}
    a{text-underline-offset:3px}
    :focus-visible{outline:3px solid rgba(18,169,162,.38);outline-offset:3px}

    /* Navigation: readable, explicit, marketplace-like */
    .mc-nav12{background:rgba(255,253,248,.97)!important;border-bottom:1px solid var(--mc-line)!important}
    .mc-nav12-note{background:var(--mc-ink)!important}
    .mc-nav12-note>div{height:42px!important}
    .mc-nav12-note a{gap:9px!important;color:#eef8f6!important}
    .mc-nav12-note a>span{font-size:16px!important}
    .mc-nav12-note b{font-size:12px!important;letter-spacing:.01em!important}
    .mc-nav12-note small{font-size:11px!important;color:#bcd8d5!important}
    .mc-nav12-wrap{height:84px!important;gap:28px!important}
    .mc-nav12-brand{font-size:28px!important;color:var(--mc-ink)!important}
    .mc-nav12-brand strong,.mc-foot12-brand>a span{color:var(--mc-turquoise)!important}
    .mc-nav12-mark{width:38px!important;height:38px!important;border-radius:12px 12px 12px 5px!important;background:var(--mc-turquoise)!important;font-size:17px!important;box-shadow:0 8px 20px rgba(18,169,162,.24)!important}
    .mc-nav12-links{gap:22px!important}
    .mc-nav12-links>a{gap:3px!important;padding:10px 3px!important;color:#476263!important}
    .mc-nav12-links>a small{font-size:9px!important;letter-spacing:.08em!important;color:#789091!important}
    .mc-nav12-links>a b{font-size:13px!important;line-height:1.15!important;font-weight:850!important}
    .mc-nav12-links>a.family small,.mc-nav12-links>a.provider small{color:var(--mc-turquoise-strong)!important}
    .mc-nav12-links>a:after{background:var(--mc-turquoise)!important;bottom:1px!important}
    .mc-nav12-signin{font-size:13px!important}
    .mc-nav12-lang{width:38px!important;height:38px!important;font-size:10px!important}
    .mc-nav12-cta{min-height:48px!important;padding:0 18px!important;border-radius:14px!important;background:var(--mc-turquoise)!important;font-size:13px!important;box-shadow:0 10px 24px rgba(18,169,162,.22)!important}
    .mc-nav12-cta:hover{background:var(--mc-turquoise-strong)!important}

    /* Global marketplace sections */
    .mc-home-v12,.mc-provider-page,.mc-search-page,.mc-about{color:var(--mc-ink)!important;background:var(--mc-cream)!important}
    .v12-eyebrow,.v12-heading>span,.v12-section-copy>span,.mc-dir-eyebrow,.mc-eyebrow,.mc-aside-kicker{color:var(--mc-turquoise-strong)!important;font-size:12px!important;letter-spacing:.1em!important}
    .v12-hero-copy>p,.v12-section-copy>p,.v12-heading>p,.mc-provider-hero>div>p,.mc-search-intro p,.mc-about section:first-child p{font-size:17px!important;line-height:1.65!important;color:var(--mc-muted)!important}
    .v12-btn,.mc-provider-cta,.mc-provider-secondary,.mc-next,.mc-home-primary,.mc-finder-button{font-size:14px!important;min-height:52px!important}
    .v12-btn-primary,.mc-provider-cta,.mc-next,.mc-home-primary,.mc-finder-button{background:var(--mc-turquoise)!important;color:#fff!important;box-shadow:0 12px 28px rgba(18,169,162,.22)!important}
    .v12-btn-primary:hover,.mc-provider-cta:hover,.mc-next:hover,.mc-home-primary:hover,.mc-finder-button:hover{background:var(--mc-turquoise-strong)!important}
    .v12-proof span,.v12-trustbar span{font-size:13px!important}
    .v12-benefits article,.v12-how article,.mc-provider-grid2 article,.mc-about-grid article{border-color:var(--mc-line)!important;box-shadow:0 10px 30px rgba(13,59,63,.04)!important}
    .v12-benefits h3,.v12-how h3,.mc-provider-grid2 h3,.mc-about-grid h2{font-size:22px!important}
    .v12-benefits p,.v12-how p,.mc-provider-grid2 p,.mc-about-grid p{font-size:14px!important;line-height:1.65!important}
    .v12-product,.mc-wizard{border-color:var(--mc-line)!important;box-shadow:var(--mc-shadow)!important}
    .v12-product-status,.v12-search-chips span{font-size:12px!important}
    .v12-mini-result strong{font-size:13px!important}.v12-mini-result small{font-size:11px!important}

    /* Replace tiny emoji feeling with larger icon tiles */
    .v12-benefit-icon,.v12-how-top>span{display:grid!important;place-items:center!important;width:52px!important;height:52px!important;border-radius:16px!important;background:var(--mc-turquoise-soft)!important;color:var(--mc-ink)!important;font-size:24px!important;line-height:1!important}
    .v12-trustbar span:first-letter{font-size:18px}

    /* Search wizard readability */
    .mc-wizard{padding:34px!important}
    .mc-wizard-kicker{font-size:11px!important;color:var(--mc-turquoise-strong)!important}
    .mc-wizard-top strong{font-size:16px!important}.mc-wizard-top>span{font-size:12px!important}
    .mc-step-number{background:var(--mc-turquoise-soft)!important;color:var(--mc-turquoise-strong)!important;font-size:13px!important}
    .mc-wizard-step h2{font-size:34px!important}
    .mc-wizard-step>p{font-size:15px!important}
    .mc-wizard-step label>span{font-size:13px!important}
    .mc-choice-grid button,.mc-choice-list button{font-size:14px!important;min-height:62px!important}
    .mc-wizard-foot{font-size:12px!important}

    /* Footer */
    .mc-foot12{background:var(--mc-ink)!important}
    .mc-foot12-brand>a{font-size:30px!important}
    .mc-foot12-brand p{font-size:14px!important}
    .mc-foot12-brand>div{font-size:11px!important}
    .mc-foot12-cols strong{font-size:11px!important}.mc-foot12-cols a{font-size:12px!important;line-height:1.45!important}
    .mc-foot12-bottom>div{font-size:10px!important}

    @media (prefers-reduced-motion:no-preference){
      .mc-home-v12 .v12-hero-copy,.mc-home-v12 .v12-product,.mc-home-v12 .v12-section,.mc-provider-page section,.mc-search-page section,.mc-about section{animation:mc-fade-up .5s cubic-bezier(.2,.7,.2,1) both}
      .mc-home-v12 .v12-product{animation-delay:.07s}
      .v12-btn,.mc-provider-cta,.mc-provider-secondary,.mc-next,.mc-nav12-cta,.mc-nav12-links>a,.mc-nav12-role{transition:transform .18s ease,box-shadow .18s ease,background-color .18s ease,color .18s ease,border-color .18s ease}
      .v12-btn:hover,.mc-provider-cta:hover,.mc-provider-secondary:hover,.mc-next:hover{transform:translateY(-2px)}
    }
    @keyframes mc-fade-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

    @media(max-width:1110px){
      .mc-nav12-wrap{height:72px!important}
      .mc-nav12-panel-title{font-size:10px!important}
      .mc-nav12-panel>a:not(.mc-nav12-role){font-size:14px!important;padding:14px!important}
      .mc-nav12-role{grid-template-columns:46px 1fr auto!important;padding:16px!important}
      .mc-nav12-role>span{font-size:24px!important}
      .mc-nav12-role strong{font-size:14px!important}.mc-nav12-role small{font-size:11px!important}
    }
    @media(max-width:640px){
      body{font-size:15px}
      .mc-nav12-brand{font-size:25px!important}.mc-nav12-mark{width:35px!important;height:35px!important}
      .mc-wizard{padding:22px 18px!important}.mc-wizard-step h2{font-size:29px!important}
      .v12-benefit-icon,.v12-how-top>span{width:48px!important;height:48px!important;font-size:22px!important}
    }
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
  `}</style>;
}

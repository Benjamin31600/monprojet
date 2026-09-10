export default function PolishStyles() {
  return <style>{`
    @media (prefers-reduced-motion: no-preference) {
      .mc-home-v2 .mc-home-copy,
      .mc-home-v2 .mc-finder-card,
      .mc-home-v2 .mc-home-trust,
      .mc-home-v2 .mc-home-section,
      .mc-home-v2 .mc-home-local,
      .mc-home-v2 .mc-home-final {
        animation: mc-fade-up .55s cubic-bezier(.2,.7,.2,1) both;
      }
      .mc-home-v2 .mc-finder-card { animation-delay: .08s; }
      .mc-home-v2 .mc-finder-list div { animation: mc-fade-up .4s cubic-bezier(.2,.7,.2,1) both; }
      .mc-home-v2 .mc-finder-list div:nth-child(2) { animation-delay: .06s; }
      .mc-home-v2 .mc-finder-list div:nth-child(3) { animation-delay: .12s; }
      .mc-home-v2 .mc-finder-list div:nth-child(4) { animation-delay: .18s; }
      .mc-home-v2 .mc-home-primary,
      .mc-home-v2 .mc-home-secondary,
      .mc-home-v2 .mc-finder-button,
      .mc-global-header a {
        transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, color .18s ease, border-color .18s ease;
      }
      .mc-home-v2 .mc-home-primary:hover,
      .mc-home-v2 .mc-finder-button:hover { transform: translateY(-2px); }
      .mc-home-v2 .mc-home-cards article,
      .mc-home-v2 .mc-how-grid article,
      .mc-home-v2 .mc-city-list a { transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
      .mc-home-v2 .mc-home-cards article:hover,
      .mc-home-v2 .mc-how-grid article:hover,
      .mc-home-v2 .mc-city-list a:hover { transform: translateY(-3px); box-shadow: 0 18px 45px rgba(24,53,44,.09); }
    }
    @keyframes mc-fade-up {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
    }
    :focus-visible { outline: 3px solid rgba(232,120,88,.45); outline-offset: 3px; }
  `}</style>;
}

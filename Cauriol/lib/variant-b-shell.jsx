/* Variant B — "Bollettino Sportivo" — utility-first, condensed display, data-forward */

const B_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Narrow:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

function useBCSS(T) {
  return `
    .vb * { box-sizing: border-box; }
    .vb {
      font-family: 'IBM Plex Sans', system-ui, sans-serif;
      color: ${T.ink};
      background: ${T.bg};
      --line: ${T.line};
      --accent: ${T.accent};
      --ink70: ${T.ink70};
      --ink50: ${T.ink50};
      font-size: 15px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .vb .display { font-family: 'Archivo Narrow', 'Archivo', sans-serif; font-weight: 700; letter-spacing: -0.015em; line-height: 0.95; text-transform: uppercase; }
    .vb .display-wide { font-family: 'Archivo', sans-serif; font-weight: 800; letter-spacing: -0.02em; line-height: 0.95; }
    .vb .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; }
    .vb .label { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink70); }
    .vb .container { max-width: 1440px; margin: 0 auto; padding: 0 32px; }
    .vb a { color: inherit; text-decoration: none; }
    .vb button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }
    .vb .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 16px; background: ${T.ink}; color: ${T.bg};
      font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 12px;
      letter-spacing: 0.08em; text-transform: uppercase;
      transition: background .12s;
    }
    .vb .btn:hover { background: ${T.accent}; }
    .vb .btn-accent { background: ${T.accent}; }
    .vb .btn-accent:hover { background: ${T.ink}; }
    .vb .btn-ghost { background: transparent; color: ${T.ink}; border: 1px solid ${T.ink}; }
    .vb .btn-ghost:hover { background: ${T.ink}; color: ${T.bg}; }
    .vb .chip {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: 'Archivo', sans-serif; font-weight: 600; font-size: 10.5px;
      letter-spacing: 0.1em; text-transform: uppercase;
      padding: 5px 8px; background: ${T.ink}; color: ${T.bg};
    }
    .vb .chip-outline { background: transparent; color: ${T.ink}; border: 1px solid ${T.ink}; padding: 4px 7px; }
    .vb .chip-accent { background: ${T.accent}; }
    .vb .grid-lines { background-image: linear-gradient(to right, ${T.line} 1px, transparent 1px); }
  `;
}

/* Header */
function BHeader({ T, current, setCurrent }) {
  const nav = [['about','Associazione'],['team','Team'],['calendar','Calendario'],['blog','Bollettino'],['sponsor','Partner'],['contact','Contatti']];
  return (
    <header style={{ background: T.bg, borderBottom: `2px solid ${T.ink}` }}>
      <div style={{ background: T.ink, color: T.bg }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 32px' }}>
          <div className="label" style={{ color: 'rgba(250,250,247,0.7)' }}>STAGIONE 2026 / 27 · N° 01</div>
          <div className="label" style={{ color: 'rgba(250,250,247,0.7)' }}>ZIANO · VAL DI FIEMME · TN</div>
        </div>
      </div>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '20px 32px' }}>
        <nav style={{ display: 'flex', gap: 24 }}>
          {nav.slice(0, 3).map(([id, label]) => (
            <button key={id} onClick={() => setCurrent(id)} className="display" style={{ fontSize: 14, color: current === id ? T.accent : T.ink }}>{label}</button>
          ))}
        </nav>
        <button onClick={() => setCurrent('home')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CaurioLogo size={44} />
          <div style={{ textAlign: 'left' }}>
            <div className="display-wide" style={{ fontSize: 24 }}>CAURIOL</div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.22em', color: T.ink70 }}>ASD · DAL 1956</div>
          </div>
        </button>
        <nav style={{ display: 'flex', gap: 24, justifyContent: 'flex-end' }}>
          {nav.slice(3).map(([id, label]) => (
            <button key={id} onClick={() => setCurrent(id)} className="display" style={{ fontSize: 14, color: current === id ? T.accent : T.ink }}>{label}</button>
          ))}
          <button className="btn btn-accent">Tesserati</button>
        </nav>
      </div>
    </header>
  );
}

function BFooter({ T, setCurrent }) {
  return (
    <footer style={{ background: T.paper, color: T.bg, marginTop: 64 }}>
      <div className="container" style={{ padding: '56px 32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 32, paddingBottom: 40, borderBottom: '1px solid rgba(250,250,247,0.15)' }}>
          <div>
            <CaurioLogoWhite size={48} />
            <div className="display-wide" style={{ fontSize: 20, marginTop: 16 }}>CAURIOL ASD</div>
            <div className="label" style={{ color: 'rgba(250,250,247,0.6)', marginTop: 4 }}>70 ANNI DI SPORT · 1956–2026</div>
          </div>
          <div>
            <div className="label" style={{ color: 'rgba(250,250,247,0.6)' }}>Sede</div>
            <p style={{ fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>Via dei Dossi 14<br/>38030 Ziano di Fiemme (TN)<br/>+39 0462 571 234</p>
          </div>
          <div>
            <div className="label" style={{ color: 'rgba(250,250,247,0.6)' }}>Email</div>
            <p style={{ fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>info@cauriol.it<br/>segreteria@cauriol.it<br/>privacy@cauriol.it</p>
          </div>
          <div>
            <div className="label" style={{ color: 'rgba(250,250,247,0.6)' }}>Indice</div>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['home','Home'],['team','Team'],['calendar','Calendario'],['transparency','Trasparenza'],['privacy','Privacy']].map(([id,l]) => (
                <button key={id} onClick={() => setCurrent(id)} style={{ textAlign: 'left', fontSize: 14, color: 'rgba(250,250,247,0.85)' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(250,250,247,0.5)', textTransform: 'uppercase' }}>© 1956–2026 Cauriol ASD · C.F. 91004070229</div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(250,250,247,0.5)', textTransform: 'uppercase', display: 'flex', gap: 16 }}>
            <button onClick={() => setCurrent('privacy')}>Privacy</button><button>Cookie</button><button onClick={() => setCurrent('transparency')}>Trasparenza</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { B_FONTS, useBCSS, BHeader, BFooter });

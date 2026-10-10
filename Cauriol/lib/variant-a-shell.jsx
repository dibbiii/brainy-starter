/* Cauriol ASD — Variant A — "Editoriale" */
/* Sito istituzionale: tipografia editoriale, carta warm, verde bosco — non una testata cartacea. */

const A_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

function useACSS(T) {
  return `
    .va * { box-sizing: border-box; }
    .va {
      font-family: 'IBM Plex Sans', system-ui, sans-serif;
      color: ${T.ink};
      background: ${T.bg};
      --line: ${T.line};
      --paper: ${T.paper};
      --accent: ${T.accent};
      --ink70: ${T.ink70};
      --ink50: ${T.ink50};
      font-size: 15px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .va .serif { font-family: 'IBM Plex Serif', Georgia, serif; font-weight: 400; letter-spacing: -0.01em; }
    .va .mono  { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-variant-numeric: tabular-nums; }
    .va .eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink70); }
    .va hr { border: 0; border-top: 1px solid var(--line); margin: 0; }
    .va a { color: inherit; text-decoration: none; }
    .va button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }
    .va .container { max-width: 1360px; margin: 0 auto; padding: 0 40px; }
    .va .rule-top    { border-top: 1px solid var(--line); }
    .va .rule-bottom { border-bottom: 1px solid var(--line); }
    .va .btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 12px 18px; border: 1px solid var(--ink70);
      font-family: 'IBM Plex Mono', monospace; font-size: 12px;
      letter-spacing: 0.1em; text-transform: uppercase;
      transition: background .15s, color .15s;
    }
    .va .btn:hover { background: ${T.ink}; color: ${T.bg}; }
    .va .btn-primary { background: ${T.accent}; color: ${T.accentInk}; border-color: ${T.accent}; }
    .va .btn-primary:hover { background: ${T.ink}; border-color: ${T.ink}; color: ${T.bg}; }
    .va .tag { display: inline-flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; border: 1px solid var(--line); color: var(--ink70); background: ${T.bg}; }
    .va .tag-accent { color: ${T.accent}; border-color: ${T.accent}; background: ${T.accentSoft}; }
    .va .dot { width: 6px; height: 6px; border-radius: 50%; background: ${T.accent}; display: inline-block; }
  `;
}

/* ======== header ======== */
function AHeader({ T, current, setCurrent, tocItems }) {
  const nav = ['Associazione', 'Team', 'Calendario', 'Blog', 'Sponsor', 'Contatti'];
  const goMap = { 'Associazione': 'about', 'Team': 'team', 'Calendario': 'calendar', 'Blog': 'blog', 'Sponsor': 'sponsor', 'Contatti': 'contact' };
  return (
    <header style={{ borderBottom: `1px solid ${T.line}`, background: T.bg, position: 'relative' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '18px 40px' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70 }}>
          Val di Fiemme · Trentino · dal 1956
        </div>
        <button onClick={() => setCurrent('home')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CaurioLogo size={36} />
          <span className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>Cauriol <span style={{ color: T.ink50 }}>ASD</span></span>
        </button>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70, textAlign: 'right', display: 'flex', gap: 14, justifyContent: 'flex-end', alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span className="dot" /> Tesseramento 2026 aperto</span>
          <span>IT · EN</span>
        </div>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', borderTop: `1px solid ${T.line}`, gap: 24, flexWrap: 'wrap' }}>
        <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {nav.map(n => {
            const id = goMap[n];
            const active = current === id;
            return (
              <button key={n} onClick={() => setCurrent(id)} className="mono" style={{
                fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: active ? T.accent : T.ink, paddingBottom: 4,
                borderBottom: active ? `2px solid ${T.accent}` : '2px solid transparent',
              }}>
                {n}
              </button>
            );
          })}
        </nav>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
          <button className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon.search /> Cerca
          </button>
          <span style={{ width: 1, height: 14, background: T.line }} />
          <button onClick={() => setCurrent('transparency')} className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70 }}>Trasparenza</button>
          <a className="btn btn-primary" href="https://tesseramento.cauriol.it" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 14px', fontSize: 11 }}>Tesseramento <Icon.arrow /></a>
        </div>
      </div>
    </header>
  );
}

/* ======== footer ======== */
function AFooter({ T, setCurrent }) {
  return (
    <footer style={{ background: T.ink, color: T.bg, marginTop: 80 }}>
      <div className="container" style={{ padding: '64px 40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <CaurioLogoWhite size={56} />
            <p className="serif" style={{ fontSize: 20, marginTop: 24, maxWidth: 360, lineHeight: 1.4 }}>
              Da settant’anni allenare, correre, salire.<br/>In Val di Fiemme.
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(250,250,247,0.6)' }}>Sede</div>
            <p className="serif" style={{ fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>
              Via dei Dossi 14<br/>
              38030 Ziano di Fiemme (TN)<br/>
              C.F. 91004070229<br/>
              P.IVA 02134980228
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(250,250,247,0.6)' }}>Contatti</div>
            <p className="serif" style={{ fontSize: 15, marginTop: 12, lineHeight: 1.7 }}>
              info@cauriol.it<br/>
              +39 0462 571 234<br/>
              Lun–Ven 9:00–12:30
            </p>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(250,250,247,0.6)' }}>Indice</div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12, gap: 6 }}>
              {[['home','Home'],['about','Associazione'],['team','Team'],['calendar','Calendario'],['blog','Blog'],['sponsor','Sponsor'],['transparency','Trasparenza'],['privacy','Privacy']].map(([id, label]) => (
                <button key={id} onClick={() => setCurrent(id)} className="serif" style={{ fontSize: 15, textAlign: 'left', color: 'rgba(250,250,247,0.8)' }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 56, paddingTop: 20, borderTop: '1px solid rgba(250,250,247,0.18)' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(250,250,247,0.5)', textTransform: 'uppercase' }}>
            © 1956–2026 Cauriol ASD · Tutti i diritti riservati
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(250,250,247,0.5)', textTransform: 'uppercase', display: 'flex', gap: 18 }}>
            <button onClick={() => setCurrent('privacy')}>Privacy</button>
            <button>Cookie</button>
            <button>Credits</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { A_FONTS, useACSS, AHeader, AFooter });

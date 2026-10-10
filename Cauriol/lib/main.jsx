/* Main app — renders the design canvas with both variants */

const { DesignCanvas, DCSection, DCArtboard } = window;

/* ============ Tweaks defaults ============ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentA": "#1F3A2E",
  "accentB": "#2F6B3A",
  "paperA":  "#F3F1EA",
  "fontPairA": "serif",
  "heroVariantA": "manifesto",
  "darkB": false
}/*EDITMODE-END*/;

/* ============ Tweaks panel ============ */
function TweaksPanel({ state, setState }) {
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === '__activate_edit_mode')   setActive(true);
      if (e.data.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!active) return null;

  const update = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };

  const panelStyle = {
    position: 'fixed', bottom: 20, right: 20, zIndex: 10000,
    width: open ? 320 : 'auto',
    background: '#FAFAF7', color: '#0E0F0C',
    border: '1px solid rgba(14,15,12,0.25)',
    fontFamily: 'IBM Plex Sans, system-ui, sans-serif',
    fontSize: 13,
    boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
  };

  const label = { fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(14,15,12,0.7)', marginBottom: 6 };

  const swatches = {
    green: ['#1F3A2E','#2F6B3A','#3F8A4A','#0E4D2B','#0A3521'],
    alt:   ['#7A1C1C','#B54A12','#9A5A00','#1F3A54','#2D2E2A'],
  };

  return (
    <div style={panelStyle}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(14,15,12,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Tweaks</div>
        <button onClick={() => setOpen(!open)} style={{ border: 0, background: 'none', cursor: 'pointer', fontSize: 16 }}>{open ? '–' : '+'}</button>
      </div>
      {open && (
        <div style={{ padding: 16, display: 'grid', gap: 18 }}>
          <div>
            <div style={label}>Variante A · accento</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[...swatches.green, ...swatches.alt].map(c => (
                <button key={c} onClick={() => update({ accentA: c })} style={{
                  width: 26, height: 26, background: c, border: state.accentA === c ? '2px solid #0E0F0C' : '1px solid rgba(14,15,12,0.2)', cursor: 'pointer',
                }} title={c} />
              ))}
            </div>
            <input type="text" value={state.accentA} onChange={(e) => update({ accentA: e.target.value })}
              style={{ width: '100%', marginTop: 6, padding: 6, border: '1px solid rgba(14,15,12,0.2)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }} />
          </div>

          <div>
            <div style={label}>Variante A · carta</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#F3F1EA','#EEEAE0','#ECE9DD','#F6F3ED','#EFECE3'].map(c => (
                <button key={c} onClick={() => update({ paperA: c })} style={{
                  width: 36, height: 26, background: c, border: state.paperA === c ? '2px solid #0E0F0C' : '1px solid rgba(14,15,12,0.2)', cursor: 'pointer',
                }} />
              ))}
            </div>
          </div>

          <div>
            <div style={label}>Variante A · titoli</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[['serif','Serif'],['sans','Sans'],['display','Fraunces']].map(([id,l]) => (
                <button key={id} onClick={() => update({ fontPairA: id })} style={{
                  padding: '6px 10px', border: '1px solid rgba(14,15,12,0.2)',
                  background: state.fontPairA === id ? '#0E0F0C' : 'transparent',
                  color: state.fontPairA === id ? '#FAFAF7' : '#0E0F0C',
                  fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{l}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={label}>Variante A · layout hero</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {[['manifesto','Manifesto'],['utility','Next event'],['editorial','Editoriale']].map(([id,l]) => (
                <button key={id} onClick={() => update({ heroVariantA: id })} style={{
                  padding: '6px 10px', border: '1px solid rgba(14,15,12,0.2)',
                  background: state.heroVariantA === id ? '#0E0F0C' : 'transparent',
                  color: state.heroVariantA === id ? '#FAFAF7' : '#0E0F0C',
                  fontSize: 11, cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(14,15,12,0.12)', paddingTop: 14 }}>
            <div style={label}>Variante B · accento</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[...swatches.green, ...swatches.alt].map(c => (
                <button key={c} onClick={() => update({ accentB: c })} style={{
                  width: 26, height: 26, background: c, border: state.accentB === c ? '2px solid #0E0F0C' : '1px solid rgba(14,15,12,0.2)', cursor: 'pointer',
                }} />
              ))}
            </div>
            <input type="text" value={state.accentB} onChange={(e) => update({ accentB: e.target.value })}
              style={{ width: '100%', marginTop: 6, padding: 6, border: '1px solid rgba(14,15,12,0.2)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }} />
          </div>

          <div style={{ fontSize: 11, color: 'rgba(14,15,12,0.55)', borderTop: '1px solid rgba(14,15,12,0.12)', paddingTop: 12 }}>
            Modifiche applicate in tempo reale · salvate nel file.
          </div>
        </div>
      )}
    </div>
  );
}

/* ============ App ============ */
function App() {
  const [tw, setTw] = React.useState(TWEAK_DEFAULTS);

  const tokensA = {
    ...CAURIOL_TOKENS_DEFAULT.A,
    accent: tw.accentA,
    accentSoft: tw.accentA + '22',
    paper: tw.paperA,
  };
  const tokensB = {
    ...CAURIOL_TOKENS_DEFAULT.B,
    accent: tw.accentB,
    accentSoft: tw.accentB + '22',
  };

  const aWrap = (key, content) => (
    <div className="va">
      <style dangerouslySetInnerHTML={{ __html: A_FONTS + useACSS(tokensA) }} />
      <AHeader T={tokensA} current={key} setCurrent={() => {}} />
      {content}
      <AFooter T={tokensA} setCurrent={() => {}} />
    </div>
  );
  const bWrap = (key, content) => (
    <div className="vb">
      <style dangerouslySetInnerHTML={{ __html: B_FONTS + useBCSS(tokensB) }} />
      <BHeader T={tokensB} current={key} setCurrent={() => {}} />
      {content}
      <BFooter T={tokensB} setCurrent={() => {}} />
    </div>
  );
  const noop = () => {};
  const aBoards = [
    ['home',         '01 · Homepage',         2600, aWrap('home',         <AHome         T={tokensA} setCurrent={noop} heroVariant={tw.heroVariantA} />)],
    ['about',        '02 · Associazione',     2200, aWrap('about',        <AAbout        T={tokensA} />)],
    ['team',         '03 · Team',             2200, aWrap('team',         <ATeam         T={tokensA} />)],
    ['calendar',     '04 · Calendario',       2600, aWrap('calendar',     <ACalendar     T={tokensA} setCurrent={noop} />)],
    ['event',        '05 · Dettaglio evento', 2000, aWrap('event',        <AEventDetail  T={tokensA} setCurrent={noop} />)],
    ['blog',         '06 · Blog',             2200, aWrap('blog',         <ABlog         T={tokensA} setCurrent={noop} />)],
    ['article',      '07 · Articolo',         2400, aWrap('article',      <AArticle      T={tokensA} setCurrent={noop} />)],
    ['contact',      '08 · Contatti',         1600, aWrap('contact',      <AContact      T={tokensA} />)],
    ['sponsor',      '09 · Sponsor',          2200, aWrap('sponsor',      <ASponsor      T={tokensA} />)],
    ['transparency', '10 · Trasparenza',      2400, aWrap('transparency', <ATransparency T={tokensA} />)],
    ['privacy',      '11 · Privacy',          1700, aWrap('privacy',      <APrivacy      T={tokensA} />)],
  ];
  const bBoards = [
    ['home',         '01 · Homepage',         2800, bWrap('home',         <BHome         T={tokensB} setCurrent={noop} />)],
    ['about',        '02 · Associazione',     2000, bWrap('about',        <BAbout        T={tokensB} />)],
    ['team',         '03 · Team',             2100, bWrap('team',         <BTeam         T={tokensB} />)],
    ['calendar',     '04 · Calendario',       2400, bWrap('calendar',     <BCalendar     T={tokensB} setCurrent={noop} />)],
    ['event',        '05 · Dettaglio evento', 2000, bWrap('event',        <BEventDetail  T={tokensB} setCurrent={noop} />)],
    ['blog',         '06 · Blog',             2200, bWrap('blog',         <BBlog         T={tokensB} setCurrent={noop} />)],
    ['article',      '07 · Articolo',         2100, bWrap('article',      <BArticle      T={tokensB} setCurrent={noop} />)],
    ['contact',      '08 · Contatti',         1600, bWrap('contact',      <BContact      T={tokensB} />)],
    ['sponsor',      '09 · Sponsor',          2200, bWrap('sponsor',      <BSponsor      T={tokensB} />)],
    ['transparency', '10 · Trasparenza',      2400, bWrap('transparency', <BTransparency T={tokensB} />)],
    ['privacy',      '11 · Privacy',          1700, bWrap('privacy',      <BPrivacy      T={tokensB} />)],
  ];

  return (
    <>
      <DesignCanvas bg="#E9E6DC" initialZoom={0.5}>
        <DCSection id="variant-a" title="Variante A — Editoriale" subtitle="Sito istituzionale: tipografia serif, carta warm, verde bosco, ritmo editoriale">
          {aBoards.map(([id, label, h, content]) => (
            <DCArtboard key={id} id={`a-${id}`} label={label} width={1440} height={h}>
              {content}
            </DCArtboard>
          ))}
        </DCSection>
        <DCSection id="variant-b" title="Variante B — Bollettino Sportivo" subtitle="Display condensed, strutture tabulari, nero istituzionale, dati in evidenza">
          {bBoards.map(([id, label, h, content]) => (
            <DCArtboard key={id} id={`b-${id}`} label={label} width={1440} height={h}>
              {content}
            </DCArtboard>
          ))}
        </DCSection>
      </DesignCanvas>
      <TweaksPanel state={tw} setState={setTw} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

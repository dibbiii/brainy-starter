/* Variant B pages 2 — Calendar, Event, Blog, Article */

function BCalendar({ T, setCurrent }) {
  const [disc, setDisc] = React.useState('all');
  const [lev, setLev] = React.useState('all');
  const [typ, setTyp] = React.useState('all');
  const filtered = EVENTS.filter(e =>
    (disc === 'all' || e.discipline === disc) &&
    (lev === 'all' || e.level === lev) &&
    (typ === 'all' || e.type === typ)
  );

  const Chip = ({ active, onClick, children }) => (
    <button onClick={onClick} className="mono" style={{
      fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
      padding: '6px 10px',
      background: active ? T.accent : 'transparent',
      color: active ? T.bg : T.ink,
      border: `1px solid ${active ? T.accent : T.line}`,
    }}>{children}</button>
  );

  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Agenda 2026</div>
          <h1 className="display-wide" style={{ fontSize: 140, margin: '14px 0 0', lineHeight: 0.9 }}>CALENDARIO.</h1>
          <p style={{ fontSize: 18, color: T.ink70, marginTop: 24, maxWidth: 580 }}>
            Gare, allenamenti, raduni e appuntamenti sociali. Filtra per disciplina, livello e tipo di evento.
          </p>
        </div>
      </section>
      <section style={{ position: 'sticky', top: 0, background: T.bg, zIndex: 5, borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="label">DISCIPLINA</span>
            <Chip active={disc === 'all'} onClick={() => setDisc('all')}>Tutte</Chip>
            {DISCIPLINES.map(d => <Chip key={d.id} active={disc === d.id} onClick={() => setDisc(d.id)}>{d.short}</Chip>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="label">LIVELLO</span>
            <Chip active={lev === 'all'} onClick={() => setLev('all')}>Tutti</Chip>
            {LEVELS.map(l => <Chip key={l.id} active={lev === l.id} onClick={() => setLev(l.id)}>{l.name}</Chip>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="label">TIPO</span>
            <Chip active={typ === 'all'} onClick={() => setTyp('all')}>Tutti</Chip>
            {EVENT_TYPES.map(t => <Chip key={t.id} active={typ === t.id} onClick={() => setTyp(t.id)}>{t.name}</Chip>)}
          </div>
          <div style={{ marginLeft: 'auto' }} className="mono">{filtered.length} eventi</div>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: '32px 32px' }}>
          <div style={{ border: `1px solid ${T.line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 2fr 1fr 1fr 120px 110px 24px', padding: '12px 16px', background: T.ink, color: T.bg }}>
              {['DATA / ORA','EVENTO','DISCIPLINA','LIVELLO','LUOGO','TIPO',''].map((h, i) => (
                <span key={i} className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', fontWeight: 600 }}>{h}</span>
              ))}
            </div>
            {filtered.map(e => {
              const d = new Date(e.date);
              const disc = DISCIPLINES.find(x => x.id === e.discipline);
              const l = LEVELS.find(x => x.id === e.level);
              return (
                <button key={e.id} onClick={() => setCurrent('event')} style={{
                  display: 'grid', gridTemplateColumns: '110px 2fr 1fr 1fr 120px 110px 24px',
                  padding: '16px', borderBottom: `1px solid ${T.line}`, width: '100%', textAlign: 'left', alignItems: 'center',
                }}
                  onMouseEnter={(ev) => ev.currentTarget.style.background = T.accentSoft}
                  onMouseLeave={(ev) => ev.currentTarget.style.background = 'transparent'}>
                  <div>
                    <div className="display-wide" style={{ fontSize: 22 }}>{String(d.getDate()).padStart(2,'0')}.{String(d.getMonth()+1).padStart(2,'0')}</div>
                    <div className="mono" style={{ fontSize: 11, color: T.ink70 }}>{d.toLocaleDateString('it-IT', { weekday: 'short' }).toUpperCase()} · {e.time}</div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{e.title}</span>
                  <span className="chip chip-outline">{disc?.name}</span>
                  <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{l?.name}</span>
                  <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{e.loc}</span>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent }}>{e.type}</span>
                  <span style={{ color: T.ink70 }}><Icon.arrow /></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function BEventDetail({ T, setCurrent }) {
  const e = EVENTS[0];
  const d = new Date(e.date);
  const disc = DISCIPLINES.find(x => x.id === e.discipline);
  return (
    <div>
      <section style={{ background: T.ink, color: T.bg, borderBottom: `4px solid ${T.accent}` }}>
        <div className="container" style={{ padding: '24px 32px 48px' }}>
          <button onClick={() => setCurrent('calendar')} className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(250,250,247,0.6)', textTransform: 'uppercase' }}>← CALENDARIO</button>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <span className="chip chip-accent">{disc?.name}</span>
            <span className="chip" style={{ background: 'rgba(250,250,247,0.15)' }}>{e.type.toUpperCase()}</span>
          </div>
          <h1 className="display-wide" style={{ fontSize: 80, margin: '20px 0 24px', lineHeight: 0.95 }}>{e.title.toUpperCase()}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 48 }}>
            {[
              ['DATA', d.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })],
              ['ORA', e.time],
              ['LUOGO', e.loc],
              ['REFERENTE', 'Luca Felicetti'],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="label" style={{ color: 'rgba(250,250,247,0.6)' }}>{k}</div>
                <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: '48px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }}>
          <div>
            <p style={{ fontSize: 20, lineHeight: 1.55 }}>
              {e.desc} La giornata si apre con il ritrovo allo chalet dell'Alpe Cermis, ricognizione alle 8:15, prima manche alle 9:30 e seconda manche al termine della prima.
            </p>
            <PhotoPlaceholder label="Foto evento — Alpe Cermis" ratio="16/9" style={{ marginTop: 32 }} />
            <div className="label" style={{ marginTop: 40 }}>Programma della giornata</div>
            <div style={{ border: `1px solid ${T.line}`, marginTop: 12 }}>
              {[
                ['08:00', 'Ritrovo e consegna pettorali', 'Chalet Cermis'],
                ['08:15', 'Ricognizione tracciato', 'Pista Olimpia III'],
                ['09:30', 'Prima manche', 'Allievi + Giovani'],
                ['11:30', 'Seconda manche', '—'],
                ['13:30', 'Premiazioni', 'Chalet Cermis'],
              ].map(([t, title, loc], i) => (
                <div key={t} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', padding: '16px', borderBottom: i < 4 ? `1px solid ${T.line}` : 'none', alignItems: 'center' }}>
                  <span className="display-wide" style={{ fontSize: 20, color: T.accent }}>{t}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{title}</span>
                  <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{loc}</span>
                </div>
              ))}
            </div>
          </div>
          <aside>
            <div style={{ border: `1px solid ${T.ink}`, padding: 24, position: 'sticky', top: 24 }}>
              <PhotoPlaceholder label="mappa" ratio="4/3" />
              <button className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>ISCRIVITI</button>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}><Icon.cal /> AGGIUNGI AL CALENDARIO</button>
              <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 24, paddingTop: 16 }}>
                <div className="label">CONTATTO</div>
                <div style={{ fontSize: 14, marginTop: 6, fontWeight: 600 }}>Luca Felicetti</div>
                <div className="mono" style={{ fontSize: 12, color: T.accent }}>luca.felicetti@cauriol.it</div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function BBlog({ T, setCurrent }) {
  const [cat, setCat] = React.useState('Tutti');
  const cats = ['Tutti', 'Cronache', 'Risultati', 'Notizie', 'Guide tecniche'];
  const filtered = cat === 'Tutti' ? ARTICLES : ARTICLES.filter(a => a.cat === cat);
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Bollettino</div>
          <h1 className="display-wide" style={{ fontSize: 140, margin: '14px 0 0', lineHeight: 0.9 }}>DAL <span style={{ color: T.accent }}>CAMPO,</span><br/>DALLA NEVE.</h1>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '24px 32px', borderBottom: `1px solid ${T.line}`, display: 'flex', gap: 8 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className="mono" style={{
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '8px 12px',
              background: cat === c ? T.ink : 'transparent',
              color: cat === c ? T.bg : T.ink,
              border: `1px solid ${cat === c ? T.ink : T.line}`,
            }}>{c}</button>
          ))}
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '40px 32px' }}>
          <button onClick={() => setCurrent('article')} style={{ width: '100%', textAlign: 'left', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 40, marginBottom: 40, paddingBottom: 40, borderBottom: `1px solid ${T.line}` }}>
            <PhotoPlaceholder label="feature" ratio="4/3" />
            <div>
              <span className="chip chip-accent">{filtered[0].cat.toUpperCase()} · IN PRIMO PIANO</span>
              <h2 className="display-wide" style={{ fontSize: 56, margin: '18px 0 18px', lineHeight: 0.95 }}>{filtered[0].title}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: T.ink70 }}>{filtered[0].excerpt}</p>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: T.ink70, textTransform: 'uppercase', marginTop: 24 }}>{filtered[0].author} · {filtered[0].date} · {filtered[0].read} min</div>
            </div>
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {filtered.slice(1).map(a => (
              <button key={a.id} onClick={() => setCurrent('article')} style={{ textAlign: 'left', border: `1px solid ${T.line}`, padding: 20 }}>
                <PhotoPlaceholder label={a.cat.toLowerCase()} ratio="16/10" />
                <span className="chip chip-outline" style={{ marginTop: 14 }}>{a.cat.toUpperCase()}</span>
                <h3 className="display-wide" style={{ fontSize: 22, margin: '10px 0 8px', lineHeight: 1.05 }}>{a.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: T.ink70 }}>{a.excerpt}</p>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: T.ink50, textTransform: 'uppercase', marginTop: 12 }}>{a.author} · {a.date}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BArticle({ T, setCurrent }) {
  const a = ARTICLES[0];
  return (
    <div>
      <section style={{ background: T.ink, color: T.bg, borderBottom: `4px solid ${T.accent}` }}>
        <div className="container" style={{ padding: '24px 32px 56px' }}>
          <button onClick={() => setCurrent('blog')} className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(250,250,247,0.6)', textTransform: 'uppercase' }}>← BOLLETTINO</button>
          <span className="chip chip-accent" style={{ marginTop: 24, display: 'inline-flex' }}>{a.cat.toUpperCase()} · {a.date}</span>
          <h1 className="display-wide" style={{ fontSize: 84, margin: '20px 0 24px', lineHeight: 0.96, maxWidth: 1100 }}>{a.title.toUpperCase()}</h1>
          <div style={{ display: 'flex', gap: 32, fontSize: 13, color: 'rgba(250,250,247,0.7)' }}>
            <span><strong style={{ color: T.bg }}>{a.author}</strong> · Responsabile comunicazione</span>
            <span>{a.read} min di lettura</span>
          </div>
        </div>
      </section>
      <article>
        <div className="container" style={{ padding: '48px 32px', maxWidth: 900 }}>
          <PhotoPlaceholder label="Foto copertina — partenza prima manche" ratio="16/9" />
          <p style={{ fontSize: 24, lineHeight: 1.45, marginTop: 36, fontWeight: 500 }}>
            <strong>Trentotto anni dopo la prima edizione</strong>, il Trofeo Cauriol è tornato sull'Olimpia III con la stessa promessa: pista dura, tracciato onesto, nessuno che resta fuori dalle classifiche senza aver provato.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.7, marginTop: 18 }}>
            Centoquarantotto atleti al cancelletto, dodici società iscritte, un fuori-pista nella prima manche che ha tolto qualche brivido ma nessun ferito. Il cielo ha tenuto, la neve anche.
          </p>
          <blockquote style={{ fontSize: 28, lineHeight: 1.3, margin: '36px 0', padding: '4px 0 4px 28px', borderLeft: `4px solid ${T.accent}`, fontWeight: 600, fontStyle: 'italic' }}>
            «I nostri ragazzi sono cresciuti, e si vede. Ma soprattutto è cresciuta la valle.»
          </blockquote>
          <p style={{ fontSize: 18, lineHeight: 1.7 }}>
            Luca Felicetti, responsabile tecnico, l'ha detto così. E ha aggiunto la cosa che in associazione pensiamo da anni: che un buon trofeo non è quello che vince uno dei nostri, è quello in cui l'ospite tornerebbe anche senza invito.
          </p>
        </div>
      </article>
    </div>
  );
}

Object.assign(window, { BCalendar, BEventDetail, BBlog, BArticle });

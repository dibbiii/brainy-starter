/* Cauriol — Variant A — pages 2: Calendar, Event, Blog, Article */

/* ======== CALENDAR ======== */
function ACalendar({ T, setCurrent }) {
  const [disc, setDisc] = React.useState('all');
  const [lev, setLev] = React.useState('all');
  const [typ, setTyp] = React.useState('all');
  const [view, setView] = React.useState('list');

  const filtered = EVENTS.filter(e =>
    (disc === 'all' || e.discipline === disc) &&
    (lev === 'all' || e.level === lev) &&
    (typ === 'all' || e.type === typ)
  );

  // group by month
  const months = {};
  filtered.forEach(e => {
    const d = new Date(e.date);
    const key = d.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
    if (!months[key]) months[key] = [];
    months[key].push(e);
  });

  const Chip = ({ active, onClick, children }) => (
    <button onClick={onClick} className="mono" style={{
      fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '8px 12px',
      border: `1px solid ${active ? T.ink : T.line}`,
      background: active ? T.ink : 'transparent',
      color: active ? T.bg : T.ink,
    }}>{children}</button>
  );

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 40 }}>
            <div>
              <div className="eyebrow">Agenda 2026</div>
              <h1 className="serif" style={{ fontSize: 88, lineHeight: 1, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
                Calendario.
              </h1>
              <p className="serif" style={{ fontSize: 19, color: T.ink70, marginTop: 24, maxWidth: 560, lineHeight: 1.55 }}>
                Gare, allenamenti, raduni e appuntamenti sociali. Filtra per disciplina, livello o tipo di evento.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <Chip active={view === 'list'} onClick={() => setView('list')}>Lista</Chip>
              <Chip active={view === 'grid'} onClick={() => setView('grid')}>Mese</Chip>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ position: 'sticky', top: 0, background: T.bg, zIndex: 5, borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink50 }}>Disciplina</span>
            <Chip active={disc === 'all'} onClick={() => setDisc('all')}>Tutte</Chip>
            {DISCIPLINES.map(d => <Chip key={d.id} active={disc === d.id} onClick={() => setDisc(d.id)}>{d.name}</Chip>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink50 }}>Livello</span>
            <Chip active={lev === 'all'} onClick={() => setLev('all')}>Tutti</Chip>
            {LEVELS.map(l => <Chip key={l.id} active={lev === l.id} onClick={() => setLev(l.id)}>{l.name}</Chip>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink50 }}>Tipo</span>
            <Chip active={typ === 'all'} onClick={() => setTyp('all')}>Tutti</Chip>
            {EVENT_TYPES.map(t => <Chip key={t.id} active={typ === t.id} onClick={() => setTyp(t.id)}>{t.name}</Chip>)}
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 12, color: T.ink70, fontFamily: 'IBM Plex Mono, monospace' }}>
            {filtered.length} eventi
          </div>
        </div>
      </section>

      {/* List */}
      {view === 'list' && (
        <section>
          <div className="container" style={{ padding: '40px 40px 24px' }}>
            {Object.keys(months).map(mKey => (
              <div key={mKey} style={{ marginBottom: 56 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 18 }}>
                  <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.01em', margin: 0, textTransform: 'capitalize' }}>{mKey}</h2>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink50 }}>· {months[mKey].length} eventi</span>
                </div>
                <div style={{ borderTop: `1px solid ${T.line}` }}>
                  {months[mKey].map(e => {
                    const d = new Date(e.date);
                    const disc = DISCIPLINES.find(x => x.id === e.discipline);
                    const lev = LEVELS.find(x => x.id === e.level);
                    return (
                      <button key={e.id} onClick={() => setCurrent('event')} style={{
                        display: 'grid', gridTemplateColumns: '90px 1.2fr 1fr 130px 24px',
                        gap: 32, alignItems: 'center',
                        padding: '24px 0', borderBottom: `1px solid ${T.line}`,
                        width: '100%', textAlign: 'left', transition: 'background .12s',
                      }}
                        onMouseEnter={(ev) => ev.currentTarget.style.background = T.paper}
                        onMouseLeave={(ev) => ev.currentTarget.style.background = 'transparent'}>
                        <div>
                          <div className="serif" style={{ fontSize: 44, lineHeight: 0.9, fontWeight: 400 }}>{String(d.getDate()).padStart(2,'0')}</div>
                          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70, marginTop: 6 }}>
                            {d.toLocaleDateString('it-IT', { weekday: 'short' })} · {e.time}
                          </div>
                        </div>
                        <div>
                          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                            <span className="tag tag-accent">{disc?.short}</span>
                            <span className="tag">{e.type}</span>
                            <span className="tag">{lev?.name}</span>
                          </div>
                          <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{e.title}</div>
                        </div>
                        <div className="mono" style={{ fontSize: 12, color: T.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Icon.pin /> {e.loc}
                        </div>
                        <div style={{ fontSize: 13, color: T.ink70, lineHeight: 1.4 }}>{e.desc.slice(0, 70)}{e.desc.length > 70 ? '…' : ''}</div>
                        <div style={{ color: T.accent }}><Icon.arrow /></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid (month view) */}
      {view === 'grid' && (
        <section>
          <div className="container" style={{ padding: '40px 40px' }}>
            {Object.keys(months).slice(0, 2).map(mKey => {
              const first = new Date(months[mKey][0].date);
              const y = first.getFullYear(), m = first.getMonth();
              const daysIn = new Date(y, m+1, 0).getDate();
              const startDay = (new Date(y, m, 1).getDay() + 6) % 7; // Monday=0
              const byDay = {};
              months[mKey].forEach(e => { const d = new Date(e.date).getDate(); (byDay[d] = byDay[d] || []).push(e); });
              const cells = [];
              for (let i = 0; i < startDay; i++) cells.push(null);
              for (let i = 1; i <= daysIn; i++) cells.push(i);
              return (
                <div key={mKey} style={{ marginBottom: 56 }}>
                  <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 18px', textTransform: 'capitalize' }}>{mKey}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', border: `1px solid ${T.line}` }}>
                    {['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map(d => (
                      <div key={d} className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70, padding: '10px 12px', borderBottom: `1px solid ${T.line}`, background: T.paper }}>{d}</div>
                    ))}
                    {cells.map((day, i) => (
                      <div key={i} style={{ minHeight: 110, borderRight: (i % 7 < 6) ? `1px solid ${T.line}` : 'none', borderTop: i >= 7 ? `1px solid ${T.line}` : 'none', padding: 10 }}>
                        {day && (
                          <>
                            <div className="mono" style={{ fontSize: 11, color: T.ink70 }}>{String(day).padStart(2,'0')}</div>
                            {(byDay[day] || []).map(ev => {
                              const disc = DISCIPLINES.find(x => x.id === ev.discipline);
                              return (
                                <button key={ev.id} onClick={() => setCurrent('event')} style={{
                                  display: 'block', textAlign: 'left', width: '100%',
                                  marginTop: 6, padding: '4px 6px',
                                  background: T.accentSoft, borderLeft: `2px solid ${T.accent}`,
                                  fontSize: 11, lineHeight: 1.25,
                                }}>
                                  <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.accent, marginRight: 6 }}>{disc?.short}</span>
                                  {ev.title.slice(0, 28)}
                                </button>
                              );
                            })}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

/* ======== EVENT DETAIL ======== */
function AEventDetail({ T, setCurrent }) {
  const e = EVENTS[0];
  const d = new Date(e.date);
  const disc = DISCIPLINES.find(x => x.id === e.discipline);
  const lev  = LEVELS.find(x => x.id === e.level);
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '32px 40px' }}>
          <button onClick={() => setCurrent('calendar')} className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon.arrow /></span> Calendario
          </button>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64 }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              <span className="tag tag-accent">{disc?.short}</span>
              <span className="tag">{e.type}</span>
              <span className="tag">{lev?.name}</span>
            </div>
            <h1 className="serif" style={{ fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.02em', fontWeight: 400, margin: 0 }}>{e.title}</h1>
            <p className="serif" style={{ fontSize: 19, color: T.ink70, marginTop: 28, lineHeight: 1.55, maxWidth: 640 }}>
              {e.desc} La giornata si apre con il ritrovo allo chalet dell’Alpe Cermis, ricognizione alle 8:15, prima manche alle 9:30 e seconda manche al termine della prima. Premiazione subito dopo l’arrivo dell’ultimo atleta.
            </p>
            <PhotoPlaceholder label="Foto evento — Alpe Cermis" ratio="16/9" style={{ marginTop: 36 }} />

            <div style={{ marginTop: 40 }}>
              <div className="eyebrow">Programma della giornata</div>
              <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 14 }}>
                {[
                  ['08:00', 'Ritrovo e consegna pettorali', 'Chalet Cermis (base pista)'],
                  ['08:15', 'Ricognizione tracciato', 'Pista Olimpia III'],
                  ['09:30', 'Prima manche', 'Categorie Allievi + Giovani'],
                  ['11:30', 'Seconda manche', '—'],
                  ['13:30', 'Premiazioni', 'Chalet Cermis'],
                ].map(([t, title, loc]) => (
                  <div key={t} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', padding: '14px 0', borderBottom: `1px solid ${T.line}`, alignItems: 'baseline' }}>
                    <div className="mono" style={{ fontSize: 13, color: T.accent }}>{t}</div>
                    <div className="serif" style={{ fontSize: 17 }}>{title}</div>
                    <div style={{ fontSize: 13, color: T.ink70 }}>{loc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div style={{ border: `1px solid ${T.line}`, padding: 24, position: 'sticky', top: 24 }}>
              <div className="eyebrow">Quando</div>
              <div className="serif" style={{ fontSize: 28, fontWeight: 500, marginTop: 6 }}>
                {d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="mono" style={{ fontSize: 13, color: T.ink70, marginTop: 4 }}>Ore {e.time}</div>

              <hr style={{ margin: '24px 0' }} />

              <div className="eyebrow">Dove</div>
              <div className="serif" style={{ fontSize: 18, marginTop: 6 }}>{e.loc}</div>
              <PhotoPlaceholder label="mappa" ratio="4/3" style={{ marginTop: 12 }} />

              <hr style={{ margin: '24px 0' }} />

              <div className="eyebrow">Referente</div>
              <div className="serif" style={{ fontSize: 17, marginTop: 6 }}>Luca Felicetti</div>
              <div style={{ fontSize: 13, color: T.ink70 }}>Responsabile tecnico sci alpino</div>
              <div className="mono" style={{ fontSize: 12, color: T.accent, marginTop: 6 }}>luca.felicetti@cauriol.it</div>

              <a className="btn btn-primary" href="https://www.fisi.org/tesseramento" target="_blank" rel="noopener noreferrer" style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>Iscriviti sul portale FISI <Icon.arrow /></a>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70, marginTop: 10, textAlign: 'center' }}>
                Iscrizione gestita dal portale federale esterno
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

/* ======== BLOG ======== */
function ABlog({ T, setCurrent }) {
  const [cat, setCat] = React.useState('Tutti');
  const cats = ['Tutti', 'Cronache', 'Risultati', 'Notizie', 'Guide tecniche'];
  const filtered = cat === 'Tutti' ? ARTICLES : ARTICLES.filter(a => a.cat === cat);

  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">News</div>
          <h1 className="serif" style={{ fontSize: 88, lineHeight: 1, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
            Dal campo, dalla neve.
          </h1>
          <p className="serif" style={{ fontSize: 19, color: T.ink70, marginTop: 24, maxWidth: 640, lineHeight: 1.55 }}>
            Cronache delle gare, risultati, notizie dall’associazione e guide tecniche — scritte da tecnici, genitori e atleti del Cauriol.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.line}` }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className="mono" style={{
                fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '8px 12px',
                border: `1px solid ${cat === c ? T.ink : T.line}`,
                background: cat === c ? T.ink : 'transparent',
                color: cat === c ? T.bg : T.ink,
              }}>{c}</button>
            ))}
          </div>
          <button className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon.search /> Cerca nell’archivio
          </button>
        </div>
      </section>

      {/* Featured */}
      <section>
        <div className="container" style={{ padding: '48px 40px' }}>
          <button onClick={() => setCurrent('article')} style={{ textAlign: 'left', width: '100%', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, paddingBottom: 48, borderBottom: `1px solid ${T.line}` }}>
            <PhotoPlaceholder label="foto feature — pista cermis all'alba" ratio="5/4" />
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent }}>
                In primo piano · {filtered[0].cat}
              </div>
              <h2 className="serif" style={{ fontSize: 54, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '18px 0 18px' }}>{filtered[0].title}</h2>
              <p className="serif" style={{ fontSize: 19, color: T.ink70, lineHeight: 1.55 }}>{filtered[0].excerpt}</p>
              <div className="mono" style={{ fontSize: 12, color: T.ink70, marginTop: 24 }}>{filtered[0].author} · {filtered[0].date} · {filtered[0].read} min di lettura</div>
            </div>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 48 }}>
            {filtered.slice(1).map((a) => (
              <button key={a.id} onClick={() => setCurrent('article')} style={{ textAlign: 'left' }}>
                <PhotoPlaceholder label={a.cat.toLowerCase()} ratio="4/3" />
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent, marginTop: 20 }}>
                  {a.cat} · {a.date}
                </div>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.2, margin: '10px 0 10px' }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.55 }}>{a.excerpt}</p>
                <div className="mono" style={{ fontSize: 11, color: T.ink50, marginTop: 14 }}>{a.author} · {a.read} min</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======== ARTICLE ======== */
function AArticle({ T, setCurrent }) {
  const a = ARTICLES[0];
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '32px 40px' }}>
          <button onClick={() => setCurrent('blog')} className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><Icon.arrow /></span> Bollettino
          </button>
        </div>
      </section>
      <article>
        <div className="container" style={{ padding: '56px 40px', maxWidth: 1100 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent }}>{a.cat} · {a.date}</div>
          <h1 className="serif" style={{ fontSize: 68, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.04, margin: '20px 0 28px', maxWidth: 900 }}>{a.title}</h1>
          <div style={{ display: 'flex', gap: 32, paddingBottom: 24, borderBottom: `1px solid ${T.line}`, fontSize: 13, color: T.ink70 }}>
            <span><strong style={{ color: T.ink }}>{a.author}</strong> · Responsabile comunicazione</span>
            <span>{a.read} min di lettura</span>
            <span>Condividi</span>
          </div>
          <PhotoPlaceholder label="Foto copertina — partenza prima manche" ratio="16/9" style={{ marginTop: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.4fr', gap: 48, marginTop: 48 }}>
            <aside>
              <div className="eyebrow">In questo articolo</div>
              <div style={{ borderLeft: `1px solid ${T.line}`, marginTop: 12 }}>
                {['La giornata', 'I risultati', 'Dichiarazioni', 'Prossime gare'].map((s, i) => (
                  <div key={s} className="serif" style={{ padding: '8px 14px', fontSize: 15, color: i === 0 ? T.accent : T.ink70, borderLeft: i === 0 ? `2px solid ${T.accent}` : '2px solid transparent', marginLeft: -1 }}>
                    {String(i+1).padStart(2,'0')} · {s}
                  </div>
                ))}
              </div>
            </aside>
            <div>
              <p className="serif" style={{ fontSize: 22, lineHeight: 1.5, marginTop: 0 }}>
                <strong style={{ letterSpacing: '-0.01em' }}>Trentotto anni dopo la prima edizione</strong>, il Trofeo Cauriol è tornato sull’Olimpia III con la stessa promessa: pista dura, tracciato onesto, e nessuno che resta fuori dalle classifiche senza aver provato.
              </p>
              <p className="serif" style={{ fontSize: 18, lineHeight: 1.65, marginTop: 18 }}>
                Centoquarantotto atleti al cancelletto, dodici società iscritte, un fuori-pista nella prima manche che ha tolto qualche brivido ma nessun ferito. Il cielo ha tenuto, la neve anche.
              </p>
              <blockquote className="serif" style={{ fontSize: 28, fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.01em', lineHeight: 1.3, margin: '32px 0', padding: '4px 0 4px 28px', borderLeft: `3px solid ${T.accent}` }}>
                «I nostri ragazzi sono cresciuti, e si vede. Ma soprattutto è cresciuta la valle, che in questa edizione ha portato anche società che di solito non arrivano fin qui.»
              </blockquote>
              <p className="serif" style={{ fontSize: 18, lineHeight: 1.65 }}>
                Luca Felicetti, responsabile tecnico del settore sci alpino, l’ha detto così. E ha aggiunto la cosa che in associazione pensiamo da anni: che un buon trofeo non è quello che vince uno dei nostri, è quello in cui l’ospite tornerebbe anche senza invito.
              </p>
              <p className="serif" style={{ fontSize: 18, lineHeight: 1.65 }}>
                Nelle prossime settimane pubblicheremo le classifiche complete e una gallery fotografica a cura di Davide Partel. Intanto, grazie a chi c’era — e a chi nevicava al posto nostro.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

Object.assign(window, { ACalendar, AEventDetail, ABlog, AArticle });

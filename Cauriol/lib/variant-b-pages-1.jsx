/* Variant B pages — Home, About, Team, Calendar, Event, Blog, Article, Contact, Sponsor, Transparency, Privacy */

function BHome({ T, setCurrent }) {
  const next = EVENTS.slice(0, 6);
  const feat = ARTICLES.slice(0, 4);
  return (
    <div>
      {/* HERO: ticker + headline + meta strip */}
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div style={{ background: T.accent, color: T.bg, overflow: 'hidden' }}>
          <div className="container" style={{ padding: '8px 32px', display: 'flex', gap: 40, whiteSpace: 'nowrap', fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <span>● LIVE · Trofeo Cauriol domenica 11.01</span>
            <span>▲ Iscrizioni 2026/27 aperte fino al 30.06</span>
            <span>▸ 712 tesserati · 4 discipline</span>
            <span>◆ Cauriol 1 sul podio Coppa Dolomiti</span>
          </div>
        </div>
        <div className="container" style={{ padding: '48px 32px 24px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48 }}>
          <div>
            <div className="label" style={{ color: T.accent }}>N° 01 · STAGIONE 2026/27 · MANIFESTO</div>
            <h1 className="display-wide" style={{ fontSize: 140, margin: '20px 0 0', color: T.ink }}>
              SETTANTA<br/>
              <span style={{ color: T.accent }}>ANNI</span> DI<br/>
              FIATO CORTO.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 520, marginTop: 28, color: T.ink70 }}>
              Associazione Sportiva Dilettantistica Cauriol. Calcio, sci alpino, biathlon, sci di fondo. Ziano di Fiemme, dal 1956.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
              <button className="btn btn-accent" onClick={() => setCurrent('about')}>L'ASSOCIAZIONE <Icon.arrow /></button>
              <button className="btn btn-ghost" onClick={() => setCurrent('calendar')}>CALENDARIO</button>
            </div>
          </div>
          <div>
            <PhotoPlaceholder label="Foto manifesto — partenza biathlon Lago di Tesero" ratio="4/5" />
          </div>
        </div>
        {/* Stats strip */}
        <div style={{ borderTop: `1px solid ${T.line}` }}>
          <div className="container" style={{ padding: 0, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {[['70','ANNI'],['712','TESSERATI'],['04','DISCIPLINE'],['38','STAFF'],['156','EVENTI/ANNO']].map(([n,l], i) => (
              <div key={l} style={{ padding: '20px 24px', borderLeft: i > 0 ? `1px solid ${T.line}` : 'none' }}>
                <div className="display-wide" style={{ fontSize: 48 }}>{n}</div>
                <div className="label" style={{ marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next events — data-style */}
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '48px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28 }}>
            <div>
              <div className="label">Agenda · prossimi 30 giorni</div>
              <h2 className="display-wide" style={{ fontSize: 64, margin: '8px 0 0' }}>IN CALENDARIO</h2>
            </div>
            <button onClick={() => setCurrent('calendar')} className="btn btn-ghost">Tutti gli eventi <Icon.arrow /></button>
          </div>
          <div style={{ border: `1px solid ${T.line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 80px 2fr 1fr 1fr 120px 24px', padding: '12px 16px', background: T.accent, color: T.bg }}>
              {['GG','ORA','EVENTO','DISCIPLINA','LUOGO','TIPO',''].map((h, i) => (
                <span key={i} className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', fontWeight: 600 }}>{h}</span>
              ))}
            </div>
            {next.map(e => {
              const d = new Date(e.date);
              const disc = DISCIPLINES.find(x => x.id === e.discipline);
              return (
                <button key={e.id} onClick={() => setCurrent('event')} style={{
                  display: 'grid', gridTemplateColumns: '80px 80px 2fr 1fr 1fr 120px 24px',
                  padding: '16px', borderBottom: `1px solid ${T.line}`, width: '100%', textAlign: 'left', alignItems: 'center',
                  transition: 'background .1s',
                }}
                  onMouseEnter={(ev) => ev.currentTarget.style.background = T.accentSoft}
                  onMouseLeave={(ev) => ev.currentTarget.style.background = 'transparent'}>
                  <span className="display-wide" style={{ fontSize: 28 }}>{String(d.getDate()).padStart(2,'0')}.{String(d.getMonth()+1).padStart(2,'0')}</span>
                  <span className="mono" style={{ fontSize: 13 }}>{e.time}</span>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{e.title}</span>
                  <span className="chip chip-outline">{disc?.name}</span>
                  <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{e.loc}</span>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent }}>{e.type}</span>
                  <span style={{ color: T.ink70 }}><Icon.arrow /></span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sezioni / Discipline */}
      <section style={{ background: T.ink, color: T.bg }}>
        <div className="container" style={{ padding: '64px 32px' }}>
          <div className="label" style={{ color: 'rgba(250,250,247,0.6)' }}>Sezioni</div>
          <h2 className="display-wide" style={{ fontSize: 88, margin: '12px 0 40px', lineHeight: 0.9 }}>
            QUATTRO SPORT,<br/>UNA MAGLIA.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(250,250,247,0.15)' }}>
            {[
              { code: 'CAL', name: 'CALCIO', tess: 304, note: 'Dalla scuola calcio alla prima squadra (Seconda Categoria).' },
              { code: 'SCI', name: 'SCI ALPINO', tess: 184, note: 'Allenamenti in Pampeago, Cermis, Bellamonte.' },
              { code: 'BIA', name: 'BIATHLON',   tess: 96,  note: 'Base tecnica al Centro del fondo di Lago di Tesero.' },
              { code: 'FON', name: 'SCI DI FONDO', tess: 128, note: 'Tecnica classica e skating da 6 anni ai Master.' },
            ].map(d => (
              <div key={d.code} style={{ background: T.ink, padding: 28, minHeight: 280, display: 'flex', flexDirection: 'column' }}>
                <div className="display-wide" style={{ fontSize: 100, color: T.accent }}>{d.code}</div>
                <div className="display-wide" style={{ fontSize: 28, marginTop: 'auto' }}>{d.name}</div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(250,250,247,0.5)', marginTop: 6 }}>{d.tess} TESSERATI</div>
                <p style={{ fontSize: 13, marginTop: 12, color: 'rgba(250,250,247,0.75)', lineHeight: 1.5 }}>{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bollettino */}
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 28 }}>
            <div>
              <div className="label">Bollettino</div>
              <h2 className="display-wide" style={{ fontSize: 64, margin: '8px 0 0' }}>ULTIME DALLA VALLE</h2>
            </div>
            <button onClick={() => setCurrent('blog')} className="btn btn-ghost">Archivio <Icon.arrow /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 0, border: `1px solid ${T.line}` }}>
            <button onClick={() => setCurrent('article')} style={{ textAlign: 'left', padding: 24, borderRight: `1px solid ${T.line}` }}>
              <PhotoPlaceholder label={feat[0].cat.toLowerCase()} ratio="16/10" />
              <div className="chip chip-accent" style={{ marginTop: 16 }}>{feat[0].cat}</div>
              <h3 className="display-wide" style={{ fontSize: 34, margin: '12px 0 8px', lineHeight: 1 }}>{feat[0].title}</h3>
              <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.55 }}>{feat[0].excerpt}</p>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: T.ink50, textTransform: 'uppercase', marginTop: 12 }}>{feat[0].author} · {feat[0].date}</div>
            </button>
            <div style={{ borderRight: `1px solid ${T.line}` }}>
              {feat.slice(1, 3).map((a, i) => (
                <button key={a.id} onClick={() => setCurrent('article')} style={{ display: 'block', textAlign: 'left', padding: 20, borderBottom: i === 0 ? `1px solid ${T.line}` : 'none', width: '100%' }}>
                  <div className="chip chip-outline">{a.cat}</div>
                  <h4 className="display-wide" style={{ fontSize: 22, margin: '10px 0 6px', lineHeight: 1.05 }}>{a.title}</h4>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: T.ink50, textTransform: 'uppercase' }}>{a.author} · {a.date}</div>
                </button>
              ))}
            </div>
            <button onClick={() => setCurrent('article')} style={{ textAlign: 'left', padding: 24 }}>
              <div className="chip chip-outline">{feat[3].cat}</div>
              <h4 className="display-wide" style={{ fontSize: 22, margin: '10px 0 8px', lineHeight: 1.05 }}>{feat[3].title}</h4>
              <p style={{ fontSize: 13, color: T.ink70, lineHeight: 1.55 }}>{feat[3].excerpt}</p>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: T.ink50, textTransform: 'uppercase', marginTop: 12 }}>{feat[3].author} · {feat[3].date}</div>
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: T.accent, color: T.bg }}>
        <div className="container" style={{ padding: '64px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'rgba(250,250,247,0.7)', textTransform: 'uppercase' }}>Tesseramento 2026/27 · APERTO</div>
            <h2 className="display-wide" style={{ fontSize: 96, margin: '14px 0 0', lineHeight: 0.92 }}>ISCRIVITI<br/>AL CAURIOL.</h2>
          </div>
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(250,250,247,0.9)' }}>
              Scuola calcio dai 5 anni, sci club dai 6, biathlon dagli 11. Prove gratuite tutti i mercoledì.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn" style={{ background: T.ink }}>MODULO</button>
              <button className="btn btn-ghost" style={{ borderColor: T.bg, color: T.bg }}>PRENOTA PROVA</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BAbout({ T }) {
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Chi siamo</div>
          <h1 className="display-wide" style={{ fontSize: 140, margin: '16px 0 0', lineHeight: 0.9 }}>
            PRENDIAMO IL NOME<br/>DA UNA <span style={{ color: T.accent }}>MONTAGNA.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, marginTop: 32, maxWidth: 720, color: T.ink70 }}>
            Il Cauriol è la cima che chiude la valle a est. Da quella cima abbiamo preso il nome nel 1956, quando un gruppo di maestri di sci e operai decise di fondare una società che allenasse i ragazzi della valle senza chiedere dove fossero nati.
          </p>
        </div>
      </section>

      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '48px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div className="label">Identità associativa</div>
            <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 14 }}>
              {[
                ['FORMA', 'ASD · APS'],
                ['RUNTS', '104 587'],
                ['CONI', '32 218 · dal 1978'],
                ['FONDAZIONE', '14.03.1956 — Ziano di Fiemme'],
                ['C.F.', '91004070229'],
                ['SOCI 2026', '712 · 38 staff'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '14px 0', borderBottom: `1px solid ${T.line}` }}>
                  <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: T.ink70 }}>{k}</span>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <PhotoPlaceholder label="Foto d'archivio — 1957" ratio="4/3" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Settant'anni per tappe</div>
          <h2 className="display-wide" style={{ fontSize: 56, margin: '10px 0 32px' }}>STORIA</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${T.line}` }}>
            {[
              ['1956', 'FONDAZIONE', 'Dodici soci, una sede in canonica, una squadra di calcio.'],
              ['1971', 'SCI CLUB', 'Prima delle quattro sezioni: gli sci alpini.'],
              ['1994', 'BIATHLON', 'Con il centro del fondo di Tesero arriva la carabina.'],
              ['2026', '70 ANNI', '712 tesserati, 4 discipline, un unico corpo tecnico.'],
            ].map(([y, t, d], i) => (
              <div key={y} style={{ padding: 24, borderRight: i < 3 ? `1px solid ${T.line}` : 'none' }}>
                <div className="display-wide" style={{ fontSize: 56, color: T.accent }}>{y}</div>
                <div className="display" style={{ fontSize: 18, marginTop: 8 }}>{t}</div>
                <p style={{ fontSize: 13, color: T.ink70, marginTop: 10, lineHeight: 1.5 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function BTeam({ T }) {
  const [sec, setSec] = React.useState('Tutti');
  const sections = ['Tutti', 'Direttivo', 'Tecnici', 'Staff'];
  const filtered = sec === 'Tutti' ? TEAM : TEAM.filter(t => t.section === sec);
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Team</div>
          <h1 className="display-wide" style={{ fontSize: 120, margin: '14px 0 0', lineHeight: 0.9 }}>LA <span style={{ color: T.accent }}>PANCHINA.</span></h1>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '32px 32px' }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.line}`, marginBottom: 24 }}>
            {sections.map(s => (
              <button key={s} onClick={() => setSec(s)} className="display" style={{
                fontSize: 14, padding: '14px 20px',
                borderBottom: sec === s ? `2px solid ${T.accent}` : '2px solid transparent',
                color: sec === s ? T.accent : T.ink,
                marginBottom: -1,
              }}>{s.toUpperCase()}</button>
            ))}
            <div style={{ marginLeft: 'auto', alignSelf: 'center' }} className="mono">{filtered.length} PERSONE</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${T.line}` }}>
            {filtered.map((p, i) => (
              <article key={p.name} style={{ padding: 20, borderRight: (i % 4 < 3) ? `1px solid ${T.line}` : 'none', borderBottom: i < filtered.length - 4 ? `1px solid ${T.line}` : 'none' }}>
                <PhotoPlaceholder label={`#${String(i+1).padStart(2,'0')}`} ratio="1/1" />
                <div className="chip chip-outline" style={{ marginTop: 14 }}>{p.section.toUpperCase()} · DAL {p.since}</div>
                <h3 className="display" style={{ fontSize: 20, margin: '10px 0 4px' }}>{p.name}</h3>
                <div style={{ fontSize: 13, color: T.ink70 }}>{p.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { BHome, BAbout, BTeam });

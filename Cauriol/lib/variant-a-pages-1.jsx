/* Cauriol — Variant A — pages */

/* ======== HOME ======== */
function AHome({ T, setCurrent, heroVariant = 'manifesto' }) {
  const next = EVENTS.slice(0, 4);
  const feat = ARTICLES.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end' }}>
            <div>
              <div className="eyebrow">Manifesto · Stagione 2026</div>
              <h1 className="serif" style={{ fontSize: 84, lineHeight: 0.98, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
                Si allena dove<br/>
                gli altri<br/>
                <em style={{ color: T.accent }}>vanno in vacanza.</em>
              </h1>
              <p className="serif" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 520, marginTop: 32, color: T.ink70 }}>
                Associazione Sportiva Dilettantistica Cauriol — calcio, sci alpino, biathlon e sci di fondo in Val di Fiemme, dal 1956. Settecento tesserati, quattro discipline, una valle.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <button className="btn btn-primary" onClick={() => setCurrent('about')}>L’Associazione <Icon.arrow /></button>
                <button className="btn" onClick={() => setCurrent('calendar')}>Prossimi eventi</button>
              </div>
            </div>
            <div>
              <PhotoPlaceholder label="Foto stagione — atleti su pista Pampeago" ratio="4/5" />
            </div>
          </div>
        </div>
        <div className="container" style={{ padding: '0 40px' }}>
          <div className="rule-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', paddingTop: 18 }}>
            {[
              ['70', 'anni di attività'],
              ['712', 'tesserati 2026'],
              ['04', 'discipline'],
              ['38', 'allenatori e staff'],
            ].map(([n, l]) => (
              <div key={l} style={{ paddingRight: 24 }}>
                <div className="serif" style={{ fontSize: 56, lineHeight: 1, fontWeight: 400 }}>{n}</div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT EVENTS */}
      <section className="rule-bottom">
        <div className="container" style={{ padding: '56px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div>
              <div className="eyebrow">Agenda</div>
              <h2 className="serif" style={{ fontSize: 44, margin: '8px 0 0', fontWeight: 400, letterSpacing: '-0.01em' }}>In calendario</h2>
            </div>
            <button onClick={() => setCurrent('calendar')} className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent, display: 'flex', alignItems: 'center', gap: 8 }}>
              Tutti gli eventi <Icon.arrow />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${T.line}` }}>
            {next.map((e, i) => {
              const d = new Date(e.date);
              const disc = DISCIPLINES.find(x => x.id === e.discipline);
              return (
                <button key={e.id} onClick={() => setCurrent('event')} style={{
                  borderRight: i < 3 ? `1px solid ${T.line}` : 'none',
                  padding: '28px 24px 32px',
                  textAlign: 'left',
                  borderBottom: `1px solid ${T.line}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="serif" style={{ fontSize: 52, lineHeight: 1, fontWeight: 400 }}>{String(d.getDate()).padStart(2,'0')}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70 }}>
                      {d.toLocaleDateString('it-IT', { month: 'short' })} · {e.time}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
                    <span className="tag tag-accent">{disc?.short}</span>
                    <span className="tag">{e.type}</span>
                  </div>
                  <div className="serif" style={{ fontSize: 18, marginTop: 14, lineHeight: 1.3 }}>{e.title}</div>
                  <div className="mono" style={{ fontSize: 11, color: T.ink70, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon.pin /> {e.loc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section style={{ background: T.paper }}>
        <div className="container" style={{ padding: '72px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48 }}>
            <div>
              <div className="eyebrow">Discipline</div>
              <h2 className="serif" style={{ fontSize: 44, margin: '8px 0 0', fontWeight: 400, letterSpacing: '-0.01em' }}>
                Quattro sport,<br/>una sola identità.
              </h2>
              <p className="serif" style={{ fontSize: 17, color: T.ink70, marginTop: 20, maxWidth: 360, lineHeight: 1.55 }}>
                Dalla neve al campo, ogni settore ha il proprio staff tecnico e il proprio calendario. Ma la maglia è sempre la stessa.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: T.line }}>
              {[
                { name: 'Sci alpino', tesserati: 184, desc: 'Dai Baby Master ai Master. Allenamenti in Pampeago, Cermis e Bellamonte.' },
                { name: 'Biathlon',   tesserati: 96,  desc: 'Sede tecnica al Centro del fondo di Lago di Tesero.' },
                { name: 'Sci di fondo', tesserati: 128, desc: 'Tecnica classica e skating dai 6 anni ai Master.' },
                { name: 'Calcio',     tesserati: 304, desc: 'Dalla scuola calcio alla prima squadra militante in Seconda Categoria.' },
              ].map((d) => (
                <div key={d.name} style={{ background: T.paper, padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 500 }}>{d.name}</h3>
                    <span className="mono" style={{ fontSize: 12, color: T.accent }}>{d.tesserati} tess.</span>
                  </div>
                  <p style={{ fontSize: 14, color: T.ink70, marginTop: 10, lineHeight: 1.5 }}>{d.desc}</p>
                  <button className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16, color: T.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Scopri il settore <Icon.arrow />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL / BLOG */}
      <section>
        <div className="container" style={{ padding: '72px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div>
              <div className="eyebrow">News</div>
              <h2 className="serif" style={{ fontSize: 44, margin: '8px 0 0', fontWeight: 400, letterSpacing: '-0.01em' }}>Ultime dalla valle</h2>
            </div>
            <button onClick={() => setCurrent('blog')} className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent, display: 'flex', alignItems: 'center', gap: 8 }}>
              Archivio <Icon.arrow />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 32, borderTop: `1px solid ${T.line}`, paddingTop: 32 }}>
            {/* Featured */}
            <article>
              <PhotoPlaceholder label="Foto cronaca gara" ratio="4/3" />
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent, marginTop: 20 }}>
                {feat[0].cat} · {feat[0].date}
              </div>
              <h3 className="serif" style={{ fontSize: 34, margin: '12px 0 12px', lineHeight: 1.15, fontWeight: 400, letterSpacing: '-0.01em' }}>
                {feat[0].title}
              </h3>
              <p className="serif" style={{ fontSize: 17, color: T.ink70, lineHeight: 1.55 }}>{feat[0].excerpt}</p>
              <button onClick={() => setCurrent('article')} className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16, color: T.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                Leggi · {feat[0].read} min <Icon.arrow />
              </button>
            </article>
            {feat.slice(1).map((a) => (
              <article key={a.id} style={{ borderLeft: `1px solid ${T.line}`, paddingLeft: 32 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent }}>
                  {a.cat} · {a.date}
                </div>
                <h3 className="serif" style={{ fontSize: 22, margin: '12px 0 10px', lineHeight: 1.2, fontWeight: 500 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.55 }}>{a.excerpt}</p>
                <div className="mono" style={{ fontSize: 11, color: T.ink50, marginTop: 12 }}>{a.author} · {a.read} min</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section style={{ background: T.ink, color: T.bg }}>
        <div className="container" style={{ padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,250,247,0.6)' }}>Tesseramento 2026 · aperto</div>
            <h2 className="serif" style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '16px 0 0', fontWeight: 400 }}>
              Unisciti alla squadra<br/>più antica della valle.
            </h2>
          </div>
          <div>
            <p className="serif" style={{ fontSize: 18, lineHeight: 1.55, color: 'rgba(250,250,247,0.85)', maxWidth: 480 }}>
              Iscrizioni aperte per la stagione 2026/27. Scuola calcio dai 5 anni, sci club dai 6, biathlon dagli 11. Prove gratuite tutti i mercoledì.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="https://tesseramento.cauriol.it" target="_blank" rel="noopener noreferrer">Iscriviti online <Icon.arrow /></a>
              <a className="btn" href="https://www.figc.it/it/dilettanti/" target="_blank" rel="noopener noreferrer" style={{ borderColor: 'rgba(250,250,247,0.5)', color: T.bg }}>Portale FIGC <Icon.arrow /></a>
              <a className="btn" href="https://www.fisi.org/tesseramento" target="_blank" rel="noopener noreferrer" style={{ borderColor: 'rgba(250,250,247,0.5)', color: T.bg }}>Portale FISI <Icon.arrow /></a>
            </div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,250,247,0.55)', marginTop: 16 }}>
              Le iscrizioni avvengono sui portali federali esterni
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======== ABOUT ======== */
function AAbout({ T }) {
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">Chi siamo</div>
          <h1 className="serif" style={{ fontSize: 96, lineHeight: 0.98, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400, maxWidth: 1100 }}>
            Una società sportiva<br/>che porta <em style={{ color: T.accent }}>il nome</em><br/>di una montagna.
          </h1>
          <p className="serif" style={{ fontSize: 20, color: T.ink70, lineHeight: 1.55, maxWidth: 680, marginTop: 36 }}>
            Il Cauriol è la cima che chiude la valle a est. Da quella cima abbiamo preso il nome nel 1956, quando un gruppo di maestri di sci e operai decise di fondare una società che allenasse i ragazzi della valle senza chiedere dove fossero nati.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: '64px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
            <div>
              <div className="eyebrow">Identità</div>
              <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.01em', margin: '8px 0 24px' }}>Chi siamo, in breve.</h2>
              <div style={{ borderTop: `1px solid ${T.line}` }}>
                {[
                  ['Forma giuridica', 'Associazione Sportiva Dilettantistica · APS'],
                  ['Iscrizione RUNTS', '104 587 · sez. APS'],
                  ['Registro CONI', '32 218 · dal 1978'],
                  ['Fondazione', '14 marzo 1956 · Ziano di Fiemme'],
                  ['Soci 2026', '712 tesserati · 38 staff'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', padding: '14px 0', borderBottom: `1px solid ${T.line}` }}>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70 }}>{k}</div>
                    <div className="serif" style={{ fontSize: 16 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PhotoPlaceholder label="Foto d'archivio — squadra fondatori, 1957" ratio="5/3" />
              <div style={{ columnCount: 2, columnGap: 40, marginTop: 32 }}>
                <p className="serif" style={{ fontSize: 17, lineHeight: 1.6 }}>
                  Oggi Cauriol è quattro sezioni — <strong>calcio, sci alpino, sci di fondo, biathlon</strong> — e un unico corpo tecnico. Alleniamo settecento tesserati tra Ziano, Tesero, Panchià e Predazzo, con trasferte regolari in Pampeago e Cermis.
                </p>
                <p className="serif" style={{ fontSize: 17, lineHeight: 1.6 }}>
                  Non siamo una società-vetrina. Siamo un luogo in cui un bambino di otto anni si presenta al campo con le scarpe sbagliate e il giorno dopo qualcuno gliele ha procurate. Il resto — i trofei, le nazionali, i 70 anni — viene da lì.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: T.paper }}>
        <div className="container" style={{ padding: '72px 40px' }}>
          <div className="eyebrow">Storia</div>
          <h2 className="serif" style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.01em', margin: '8px 0 40px' }}>Settant’anni, per tappe.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: T.line, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
            {[
              ['1956', 'Fondazione', 'Dodici soci, una sede in canonica, una squadra di calcio.'],
              ['1971', 'Nasce lo sci club', 'Prima delle quattro sezioni: gli sci alpini.'],
              ['1994', 'Biathlon', 'Con il centro del fondo di Tesero arriva anche la carabina.'],
              ['2026', '70 anni', 'Settecento tesserati, quattro discipline, un unico corpo tecnico.'],
            ].map(([y, t, d]) => (
              <div key={y} style={{ background: T.paper, padding: 28 }}>
                <div className="serif" style={{ fontSize: 48, fontWeight: 400, color: T.accent }}>{y}</div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 500, marginTop: 8 }}>{t}</div>
                <p style={{ fontSize: 14, color: T.ink70, marginTop: 10, lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: '72px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 48 }}>
            {[
              ['Missione', 'Offrire un percorso sportivo serio e accessibile a tutti i ragazzi della Val di Fiemme, dalla prima infanzia all’età adulta.'],
              ['Metodo', 'Tecnici qualificati, rapporto allievi/allenatore sotto 1:10, medico sociale in ogni sezione. Nessun bambino lasciato indietro.'],
              ['Territorio', 'Parte attiva della comunità di valle: collaborazioni con scuole, comuni e rifugi. Il territorio ci allena, noi restituiamo.'],
            ].map(([t, d]) => (
              <div key={t}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.accent }}>{t}</div>
                <p className="serif" style={{ fontSize: 22, marginTop: 14, lineHeight: 1.4 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======== TEAM ======== */
function ATeam({ T }) {
  const [section, setSection] = React.useState('Tutti');
  const sections = ['Tutti', 'Direttivo', 'Tecnici', 'Staff'];
  const filtered = section === 'Tutti' ? TEAM : TEAM.filter(t => t.section === section);
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">Team</div>
          <h1 className="serif" style={{ fontSize: 88, lineHeight: 1, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
            Trentotto persone,<br/>un’unica <em style={{ color: T.accent }}>panchina.</em>
          </h1>
          <p className="serif" style={{ fontSize: 19, color: T.ink70, marginTop: 28, maxWidth: 640, lineHeight: 1.55 }}>
            Consiglio direttivo, corpo tecnico, staff medico e comunicazione. Tutti volontari o con contratti sportivi dilettantistici.
          </p>
        </div>
      </section>

      <section>
        <div className="container" style={{ padding: '40px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottom: `1px solid ${T.line}` }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {sections.map(s => (
                <button key={s} onClick={() => setSection(s)} className="mono" style={{
                  fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '8px 14px', border: `1px solid ${section === s ? T.ink : T.line}`,
                  background: section === s ? T.ink : 'transparent',
                  color: section === s ? T.bg : T.ink,
                }}>{s}</button>
              ))}
            </div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70 }}>
              {filtered.length} persone
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 32 }}>
            {filtered.map((p, i) => (
              <article key={p.name}>
                <PhotoPlaceholder label={`ritratto ${String(i+1).padStart(2,'0')}`} ratio="3/4" />
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent, marginTop: 16 }}>
                  {p.section} · dal {p.since}
                </div>
                <h3 className="serif" style={{ fontSize: 22, margin: '6px 0 4px', fontWeight: 500, letterSpacing: '-0.01em' }}>{p.name}</h3>
                <div style={{ fontSize: 14, color: T.ink70 }}>{p.role}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AHome, AAbout, ATeam });

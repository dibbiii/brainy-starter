/* Variant B pages 3 — Contact, Sponsor, Transparency, Privacy + app */

function BContact({ T }) {
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Contatti</div>
          <h1 className="display-wide" style={{ fontSize: 120, margin: '14px 0 0', lineHeight: 0.9 }}>CI TROVI QUI.</h1>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '48px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <PhotoPlaceholder label="mappa — via dei Dossi 14, Ziano di Fiemme" ratio="4/3" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, marginTop: 32, border: `1px solid ${T.line}` }}>
              {[
                ['SEDE', 'Via dei Dossi 14\n38030 Ziano di Fiemme (TN)'],
                ['TELEFONO', '+39 0462 571 234\nLun–Ven 9:00–12:30'],
                ['EMAIL', 'info@cauriol.it\nsegreteria@cauriol.it'],
                ['FATTURAZIONE', 'SDI: M5UXCR1\nPEC: cauriol@pec.it'],
              ].map(([k, v], i) => (
                <div key={k} style={{ padding: 20, borderRight: i % 2 === 0 ? `1px solid ${T.line}` : 'none', borderBottom: i < 2 ? `1px solid ${T.line}` : 'none' }}>
                  <div className="label">{k}</div>
                  <p style={{ fontSize: 14, marginTop: 6, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="display-wide" style={{ fontSize: 40, margin: '0 0 24px' }}>SCRIVICI</h2>
            <form style={{ display: 'grid', gap: 16 }}>
              {[['Nome','text'],['Email','email'],['Oggetto','select'],['Messaggio','textarea']].map(([l,t]) => (
                <label key={l}>
                  <div className="label">{l.toUpperCase()}</div>
                  {t === 'textarea' ? (
                    <textarea rows={5} style={{ width: '100%', border: `1px solid ${T.line}`, padding: 12, fontSize: 14, fontFamily: 'inherit', marginTop: 6 }} />
                  ) : t === 'select' ? (
                    <select style={{ width: '100%', border: `1px solid ${T.line}`, padding: 12, fontSize: 14, fontFamily: 'inherit', marginTop: 6, background: T.bg }}>
                      {['Informazioni','Tesseramento','Sci alpino','Biathlon','Calcio','Fondo','Stampa','Sponsor'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={t} style={{ width: '100%', border: `1px solid ${T.line}`, padding: 12, fontSize: 14, marginTop: 6 }} />
                  )}
                </label>
              ))}
              <label style={{ display: 'flex', gap: 10, fontSize: 12, color: T.ink70 }}>
                <input type="checkbox" style={{ marginTop: 3 }} /> Accetto l'informativa privacy (art. 13 GDPR).
              </label>
              <button className="btn btn-accent" style={{ justifySelf: 'start' }}>INVIA MESSAGGIO <Icon.arrow /></button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function BSponsor({ T }) {
  const tiers = ['Main partner', 'Patrocinio', 'Tecnico', 'Sostenitore'];
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Partner & Sostenitori</div>
          <h1 className="display-wide" style={{ fontSize: 120, margin: '14px 0 0', lineHeight: 0.9 }}>CHI CI <span style={{ color: T.accent }}>SOSTIENE.</span></h1>
        </div>
      </section>
      {tiers.map((tier, ti) => (
        <section key={tier} style={{ borderBottom: ti < tiers.length - 1 ? `1px solid ${T.line}` : 'none', background: ti === 0 ? T.accentSoft : 'transparent' }}>
          <div className="container" style={{ padding: '40px 32px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <div className="display-wide" style={{ fontSize: 32 }}>{tier.toUpperCase()}</div>
              <div className="mono" style={{ fontSize: 12, color: T.ink70, marginTop: 6 }}>{SPONSORS.filter(s => s.tier === tier).length} PARTNER</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${T.line}`, background: T.bg }}>
              {SPONSORS.filter(s => s.tier === tier).map((s, i) => (
                <div key={s.name} style={{ padding: 20, borderRight: (i % 4 < 3) ? `1px solid ${T.line}` : 'none', borderBottom: i < SPONSORS.filter(x => x.tier === tier).length - 1 && Math.floor(i / 4) < Math.floor((SPONSORS.filter(x => x.tier === tier).length - 1) / 4) ? `1px solid ${T.line}` : 'none', minHeight: 140, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="display" style={{ fontSize: 18 }}>{s.name.toUpperCase()}</div>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: T.accent }}>DAL {s.since}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section style={{ background: T.ink, color: T.bg }}>
        <div className="container" style={{ padding: '56px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <h2 className="display-wide" style={{ fontSize: 56, margin: 0, lineHeight: 0.95 }}>DIVENTA<br/>PARTNER.</h2>
          <div>
            <p style={{ fontSize: 16, color: 'rgba(250,250,247,0.85)', lineHeight: 1.6 }}>Quattro formule di sponsorizzazione, dal pacchetto "Amico del Cauriol" (500 €/anno) al Main partner stagionale. Ogni contributo è fiscalmente deducibile e pubblicato nella sezione Trasparenza.</p>
            <button className="btn btn-accent" style={{ marginTop: 20 }}>RICHIEDI IL DOSSIER</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function BTransparency({ T }) {
  const years = [...new Set(TRANSPARENCY_DOCS.map(d => d.year))].sort((a,b) => b-a);
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Amministrazione trasparente</div>
          <h1 className="display-wide" style={{ fontSize: 96, margin: '14px 0 0', lineHeight: 0.92 }}>DOCUMENTI<br/>E CONTRIBUTI<br/><span style={{ color: T.accent }}>PUBBLICI.</span></h1>
          <p style={{ fontSize: 17, color: T.ink70, marginTop: 24, maxWidth: 720, lineHeight: 1.55 }}>
            Ai sensi della Legge 124/2017 art. 1 commi 125–129, pubblichiamo l'elenco dei contributi pubblici ricevuti superiori a € 10.000 annui, insieme ai bilanci e allo statuto.
          </p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '48px 32px' }}>
          <h2 className="display-wide" style={{ fontSize: 36, margin: '0 0 20px' }}>CONTRIBUTI PUBBLICI 2025</h2>
          <div style={{ border: `1px solid ${T.line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', padding: '14px 20px', background: T.ink, color: T.bg }}>
              {['ENTE EROGATORE','CAUSALE','DATA','IMPORTO (€)'].map((h, i) => (
                <span key={i} className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', fontWeight: 600, textAlign: i === 3 ? 'right' : 'left' }}>{h}</span>
              ))}
            </div>
            {[
              ['Provincia Autonoma di Trento', 'L.P. 8/2003 art. 21 — attività giovanile', '24/03/2025', '18.500,00'],
              ['Comune di Ziano di Fiemme', 'Contributo ordinario 2025', '12/05/2025', '14.200,00'],
              ['Comunità territoriale Val di Fiemme', 'Progetto "Sport e scuola"', '09/07/2025', '11.800,00'],
              ['CONI — Comitato provinciale TN', 'Bando giovanile 2025', '14/10/2025', '6.400,00'],
              ['Ministero Interno — 5×1000 (2023)', 'Erogazione ordinaria', '02/09/2025', '9.318,47'],
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', padding: '14px 20px', borderBottom: `1px solid ${T.line}`, alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{row[0]}</span>
                <span style={{ fontSize: 13, color: T.ink70 }}>{row[1]}</span>
                <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{row[2]}</span>
                <span className="mono" style={{ fontSize: 14, textAlign: 'right', fontWeight: 600 }}>{row[3]}</span>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', padding: '14px 20px', background: T.accent, color: T.bg }}>
              <span className="display-wide" style={{ fontSize: 16 }}>TOTALE 2025</span>
              <span /><span />
              <span className="mono" style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>60.218,47</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '0 32px 80px' }}>
          <h2 className="display-wide" style={{ fontSize: 36, margin: '0 0 20px' }}>BILANCI E DOCUMENTI</h2>
          {years.map(y => (
            <div key={y} style={{ marginBottom: 28 }}>
              <div className="label" style={{ color: T.accent, marginBottom: 10 }}>ESERCIZIO {y}</div>
              <div style={{ border: `1px solid ${T.line}` }}>
                {TRANSPARENCY_DOCS.filter(d => d.year === y).map((d, i, arr) => (
                  <button key={d.name} style={{
                    display: 'grid', gridTemplateColumns: '24px 1fr 160px 100px 24px',
                    gap: 20, alignItems: 'center', width: '100%',
                    padding: '14px 20px', borderBottom: i < arr.length - 1 ? `1px solid ${T.line}` : 'none', textAlign: 'left',
                  }}>
                    <span style={{ color: T.accent }}><Icon.doc /></span>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{d.name}</span>
                    <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{d.type} · {d.size}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.accent }}>SCARICA</span>
                    <span style={{ color: T.ink70 }}><Icon.arrow /></span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BPrivacy({ T }) {
  return (
    <div>
      <section style={{ borderBottom: `2px solid ${T.ink}` }}>
        <div className="container" style={{ padding: '56px 32px' }}>
          <div className="label">Privacy · GDPR</div>
          <h1 className="display-wide" style={{ fontSize: 96, margin: '14px 0 0', lineHeight: 0.92 }}>INFORMATIVA<br/>TRATTAMENTO<br/>DATI.</h1>
          <div className="mono" style={{ fontSize: 12, color: T.ink70, marginTop: 20, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Ultimo aggiornamento: 14.01.2026 · v. 3.2 · Reg. UE 2016/679
          </div>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '48px 32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 48 }}>
          <aside>
            <div className="label">Indice</div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
              {['Titolare','Dati raccolti','Finalità','Base giuridica','Conservazione','Destinatari','Diritti','Cookie','Modifiche'].map((s, i) => (
                <div key={s} className="mono" style={{ padding: '8px 12px', fontSize: 12, letterSpacing: '0.08em', color: i === 0 ? T.accent : T.ink70, textTransform: 'uppercase', borderLeft: i === 0 ? `2px solid ${T.accent}` : '2px solid transparent' }}>
                  {String(i+1).padStart(2,'0')} · {s}
                </div>
              ))}
            </div>
          </aside>
          <div style={{ maxWidth: 720 }}>
            <h2 className="display-wide" style={{ fontSize: 32, margin: '0 0 12px' }}>01 · TITOLARE</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
              Titolare del trattamento è <strong>Associazione Sportiva Dilettantistica Cauriol</strong>, via dei Dossi 14, 38030 Ziano di Fiemme (TN), C.F. 91004070229, in persona del legale rappresentante pro tempore Giorgio Delvai. Diritti artt. 15–22 GDPR: <strong style={{ color: T.accent }}>privacy@cauriol.it</strong>.
            </p>
            <h2 className="display-wide" style={{ fontSize: 32, margin: '36px 0 12px' }}>02 · DATI RACCOLTI</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
              Anagrafica del tesserato e del genitore/tutore, dati di contatto, certificato medico sportivo, dati bancari per i rimborsi, e — solo previo consenso esplicito — immagini raccolte durante gli eventi.
            </p>
            <h2 className="display-wide" style={{ fontSize: 32, margin: '36px 0 12px' }}>03 · FINALITÀ</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
              Tesseramento presso Federazioni e CONI; gestione amministrativa; comunicazioni su attività, gare e assemblee; adempimenti fiscali e assicurativi; pubblicazione su consenso di risultati e foto sul sito.
            </p>
            <h2 className="display-wide" style={{ fontSize: 32, margin: '36px 0 12px' }}>04 · BASE GIURIDICA</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
              Esecuzione contratto associativo (art. 6.1.b), obblighi di legge (6.1.c), legittimo interesse (6.1.f), consenso esplicito (6.1.a) per le finalità facoltative.
            </p>
            <p className="mono" style={{ fontSize: 11, color: T.ink50, marginTop: 24, letterSpacing: '0.1em' }}>
              [… TESTO SINTETIZZATO PER IL PROTOTIPO — L'INFORMATIVA COMPLETA SARÀ VALIDATA DAL DPO.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function VariantB({ tokens }) {
  const [current, setCurrent] = React.useState('home');
  const T = tokens;
  const css = useBCSS(T);
  return (
    <div className="vb">
      <style dangerouslySetInnerHTML={{ __html: B_FONTS + css }} />
      <BHeader T={T} current={current} setCurrent={setCurrent} />
      {current === 'home'         && <BHome         T={T} setCurrent={setCurrent} />}
      {current === 'about'        && <BAbout        T={T} />}
      {current === 'team'         && <BTeam         T={T} />}
      {current === 'calendar'     && <BCalendar     T={T} setCurrent={setCurrent} />}
      {current === 'event'        && <BEventDetail  T={T} setCurrent={setCurrent} />}
      {current === 'blog'         && <BBlog         T={T} setCurrent={setCurrent} />}
      {current === 'article'      && <BArticle      T={T} setCurrent={setCurrent} />}
      {current === 'contact'      && <BContact      T={T} />}
      {current === 'sponsor'      && <BSponsor      T={T} />}
      {current === 'transparency' && <BTransparency T={T} />}
      {current === 'privacy'      && <BPrivacy      T={T} />}
      <BFooter T={T} setCurrent={setCurrent} />
    </div>
  );
}

Object.assign(window, { BContact, BSponsor, BTransparency, BPrivacy, VariantB });

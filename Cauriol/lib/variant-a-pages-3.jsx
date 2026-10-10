/* Cauriol — Variant A — pages 3: Contact, Sponsor, Transparency, Privacy */

/* ======== CONTACT ======== */
function AContact({ T }) {
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">Contatti</div>
          <h1 className="serif" style={{ fontSize: 88, lineHeight: 1, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
            Ci trovi qui.
          </h1>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <PhotoPlaceholder label="mappa — via dei Dossi 14, Ziano di Fiemme" ratio="4/3" />
            <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, borderTop: `1px solid ${T.line}`, paddingTop: 32 }}>
              {[
                ['Sede', 'Via dei Dossi 14\n38030 Ziano di Fiemme (TN)'],
                ['Telefono', '+39 0462 571 234\nLun–Ven 9:00–12:30'],
                ['Email', 'info@cauriol.it\nsegreteria@cauriol.it'],
                ['Fatturazione', 'SDI: M5UXCR1\nPEC: cauriol@pec.it'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="eyebrow">{k}</div>
                  <p className="serif" style={{ fontSize: 16, marginTop: 8, whiteSpace: 'pre-line', lineHeight: 1.55 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 24px' }}>Scrivici</h2>
            <form style={{ display: 'grid', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <Field T={T} label="Nome" />
                <Field T={T} label="Cognome" />
              </div>
              <Field T={T} label="Email" type="email" />
              <Field T={T} label="Oggetto" type="select" options={['Informazioni generali', 'Tesseramento', 'Settore calcio', 'Settore sci alpino', 'Settore biathlon', 'Settore fondo', 'Stampa', 'Sponsor']} />
              <Field T={T} label="Messaggio" type="textarea" />
              <label style={{ display: 'flex', gap: 10, fontSize: 12, color: T.ink70, lineHeight: 1.5 }}>
                <input type="checkbox" style={{ marginTop: 4 }} />
                Ho letto e accetto l’informativa sulla privacy (art. 13 GDPR).
              </label>
              <button type="button" className="btn btn-primary" style={{ justifySelf: 'start' }}>Invia messaggio <Icon.arrow /></button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ T, label, type = 'text', options }) {
  const base = {
    width: '100%',
    border: 0, borderBottom: `1px solid ${T.line}`,
    padding: '12px 0', fontSize: 16, fontFamily: 'inherit',
    background: 'transparent', color: T.ink, outline: 'none',
  };
  return (
    <label style={{ display: 'block' }}>
      <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.ink70 }}>{label}</div>
      {type === 'textarea' ? (
        <textarea rows={5} style={{ ...base, resize: 'vertical', paddingTop: 10 }} />
      ) : type === 'select' ? (
        <select style={base}>{options.map(o => <option key={o}>{o}</option>)}</select>
      ) : (
        <input type={type} style={base} />
      )}
    </label>
  );
}

/* ======== SPONSOR ======== */
function ASponsor({ T }) {
  const tiers = ['Main partner', 'Patrocinio', 'Tecnico', 'Sostenitore'];
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">Sostenitori</div>
          <h1 className="serif" style={{ fontSize: 88, lineHeight: 1, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
            Chi ci sostiene<br/>da sempre.
          </h1>
          <p className="serif" style={{ fontSize: 19, color: T.ink70, marginTop: 24, maxWidth: 640, lineHeight: 1.55 }}>
            Enti pubblici, aziende del territorio e partner tecnici che rendono possibile, ogni anno, una stagione intera di allenamenti, gare e trasferte.
          </p>
        </div>
      </section>
      {tiers.map(tier => (
        <section key={tier} style={{ borderBottom: `1px solid ${T.line}` }}>
          <div className="container" style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div className="eyebrow">{tier}</div>
              <div className="serif" style={{ fontSize: 28, fontWeight: 500, marginTop: 8 }}>
                {SPONSORS.filter(s => s.tier === tier).length} partner
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: T.line, borderTop: `1px solid ${T.line}` }}>
              {SPONSORS.filter(s => s.tier === tier).map(s => (
                <div key={s.name} style={{ background: T.bg, padding: 28, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ height: 56, display: 'flex', alignItems: 'center' }}>
                    <div style={{ fontFamily: '"IBM Plex Serif", serif', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', color: T.ink }}>{s.name}</div>
                  </div>
                  <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70 }}>Dal {s.since}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section style={{ background: T.paper }}>
        <div className="container" style={{ padding: '64px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">Diventa partner</div>
            <h2 className="serif" style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.01em', margin: '8px 0 0' }}>
              Sostieni lo sport<br/>della tua valle.
            </h2>
          </div>
          <div>
            <p className="serif" style={{ fontSize: 17, color: T.ink70, lineHeight: 1.6 }}>
              Abbiamo quattro formule di sponsorizzazione, dal pacchetto “Amico del Cauriol” (500 €/anno) al Main partner stagionale. Ogni contributo è fiscalmente deducibile e viene pubblicato nella sezione Trasparenza.
            </p>
            <button className="btn btn-primary" style={{ marginTop: 20 }}>Richiedi il dossier sponsor</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ======== TRANSPARENCY ======== */
function ATransparency({ T }) {
  const years = [...new Set(TRANSPARENCY_DOCS.map(d => d.year))].sort((a,b) => b-a);
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">Amministrazione trasparente</div>
          <h1 className="serif" style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
            Documenti pubblici<br/>e contributi ricevuti.
          </h1>
          <p className="serif" style={{ fontSize: 19, color: T.ink70, marginTop: 24, maxWidth: 720, lineHeight: 1.55 }}>
            Ai sensi della Legge 124/2017 art. 1 commi 125–129, pubblichiamo l’elenco dei contributi pubblici ricevuti superiori a € 10.000 annui, insieme ai bilanci e allo statuto.
          </p>
        </div>
      </section>

      {/* Contributi pubblici table */}
      <section>
        <div className="container" style={{ padding: '56px 40px' }}>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 20px' }}>Contributi pubblici 2025</h2>
          <div style={{ border: `1px solid ${T.line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr', padding: '14px 20px', background: T.paper, borderBottom: `1px solid ${T.line}` }} className="mono">
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70 }}>Ente erogatore</span>
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70 }}>Causale</span>
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70 }}>Data</span>
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink70, textAlign: 'right' }}>Importo (€)</span>
            </div>
            {[
              ['Provincia Autonoma di Trento', 'L.P. 8/2003 art. 21 — attività sportiva giovanile', '24/03/2025', '18.500,00'],
              ['Comune di Ziano di Fiemme', 'Contributo ordinario 2025', '12/05/2025', '14.200,00'],
              ['Comunità territoriale Val di Fiemme', 'Progetto “Sport e scuola”', '09/07/2025', '11.800,00'],
              ['CONI — Comitato provinciale TN', 'Bando giovanile 2025', '14/10/2025', '6.400,00'],
              ['Ministero Interno — 5×1000 (anno d’imposta 2023)', 'Erogazione ordinaria', '02/09/2025', '9.318,47'],
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr', padding: '16px 20px', borderBottom: `1px solid ${T.line}`, alignItems: 'center' }}>
                <span className="serif" style={{ fontSize: 15 }}>{row[0]}</span>
                <span style={{ fontSize: 13, color: T.ink70 }}>{row[1]}</span>
                <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{row[2]}</span>
                <span className="mono" style={{ fontSize: 14, textAlign: 'right' }}>{row[3]}</span>
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr', padding: '16px 20px', background: T.paper }}>
              <span className="serif" style={{ fontSize: 15, fontWeight: 600 }}>Totale 2025</span>
              <span></span>
              <span></span>
              <span className="mono" style={{ fontSize: 15, textAlign: 'right', fontWeight: 600 }}>60.218,47</span>
            </div>
          </div>
        </div>
      </section>

      {/* Docs */}
      <section>
        <div className="container" style={{ padding: '0 40px 80px' }}>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 400, letterSpacing: '-0.01em', margin: '0 0 20px' }}>Bilanci e documenti</h2>
          {years.map(y => (
            <div key={y} style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.accent, marginBottom: 10 }}>Esercizio {y}</div>
              <div style={{ borderTop: `1px solid ${T.line}` }}>
                {TRANSPARENCY_DOCS.filter(d => d.year === y).map(d => (
                  <button key={d.name} style={{
                    display: 'grid', gridTemplateColumns: '24px 1fr 120px 80px 24px',
                    gap: 20, alignItems: 'center', width: '100%',
                    padding: '16px 0', borderBottom: `1px solid ${T.line}`, textAlign: 'left',
                  }}>
                    <span style={{ color: T.accent }}><Icon.doc /></span>
                    <span className="serif" style={{ fontSize: 17 }}>{d.name}</span>
                    <span className="mono" style={{ fontSize: 12, color: T.ink70 }}>{d.type} · {d.size}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.ink70 }}>Scarica</span>
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

/* ======== PRIVACY ======== */
function APrivacy({ T }) {
  return (
    <div>
      <section style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="container" style={{ padding: '56px 40px' }}>
          <div className="eyebrow">Privacy</div>
          <h1 className="serif" style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '18px 0 0', fontWeight: 400 }}>
            Informativa<br/>sul trattamento dei dati.
          </h1>
          <p className="mono" style={{ fontSize: 12, color: T.ink70, marginTop: 20, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Ultimo aggiornamento: 14 gennaio 2026 · v. 3.2 · Reg. UE 2016/679 (GDPR)
          </p>
        </div>
      </section>
      <section>
        <div className="container" style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 56 }}>
          <aside>
            <div className="eyebrow">Indice</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, borderLeft: `1px solid ${T.line}` }}>
              {['Titolare del trattamento', 'Dati raccolti', 'Finalità', 'Base giuridica', 'Conservazione', 'Destinatari', 'Diritti dell’interessato', 'Cookie', 'Modifiche'].map((s, i) => (
                <div key={s} className="serif" style={{ padding: '6px 14px', fontSize: 14, color: i === 0 ? T.accent : T.ink70, borderLeft: i === 0 ? `2px solid ${T.accent}` : '2px solid transparent', marginLeft: -1 }}>
                  {String(i+1).padStart(2,'0')} · {s}
                </div>
              ))}
            </div>
          </aside>
          <div style={{ maxWidth: 720 }}>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: '0 0 12px' }}>01 · Titolare del trattamento</h2>
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, color: T.ink }}>
              Titolare del trattamento dei dati personali è <strong>Associazione Sportiva Dilettantistica Cauriol</strong>, con sede in via dei Dossi 14, 38030 Ziano di Fiemme (TN), C.F. 91004070229, in persona del legale rappresentante pro tempore Giorgio Delvai.
            </p>
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, color: T.ink70, marginTop: 12 }}>
              Per esercitare i diritti di cui agli artt. 15–22 GDPR è possibile scrivere a <strong style={{ color: T.accent }}>privacy@cauriol.it</strong>.
            </p>

            <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: '40px 0 12px' }}>02 · Dati raccolti</h2>
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, color: T.ink }}>
              Raccogliamo unicamente i dati necessari all’attività associativa: anagrafica del tesserato e del genitore/tutore, dati di contatto, certificato medico sportivo, dati bancari per i rimborsi, e — solo previo consenso esplicito — immagini raccolte durante gli eventi.
            </p>

            <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: '40px 0 12px' }}>03 · Finalità</h2>
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, color: T.ink }}>
              I dati sono trattati per: (a) tesseramento presso le Federazioni Sportive competenti e il CONI; (b) gestione amministrativa dell’associazione; (c) comunicazioni informative relative ad attività, gare e assemblee; (d) adempimenti fiscali e assicurativi; (e) pubblicazione — su consenso — di risultati e foto nelle sezioni News e Calendario del sito.
            </p>

            <h2 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: '40px 0 12px' }}>04 · Base giuridica</h2>
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.7, color: T.ink }}>
              Il trattamento si fonda, a seconda del caso, sull’esecuzione del contratto associativo (art. 6.1.b GDPR), sull’adempimento di obblighi di legge (art. 6.1.c), sul legittimo interesse dell’associazione (art. 6.1.f) e sul consenso esplicito dell’interessato (art. 6.1.a) per le finalità facoltative.
            </p>
            <p className="mono" style={{ fontSize: 12, color: T.ink50, marginTop: 24, letterSpacing: '0.08em' }}>
              [… testo sintetizzato ai fini del prototipo. Sul sito definitivo verrà inserita l’informativa completa validata dal DPO.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { AContact, ASponsor, ATransparency, APrivacy });

/* Cauriol ASD — shared primitives (tokens, logo, placeholders, icons) */

const CAURIOL_TOKENS_DEFAULT = {
  // Variante A — Giornale Alpino
  A: {
    bg: '#FAFAF7',
    paper: '#F3F1EA',
    ink: '#0E0F0C',
    ink70: 'rgba(14,15,12,0.70)',
    ink50: 'rgba(14,15,12,0.50)',
    line: 'rgba(14,15,12,0.14)',
    accent: '#1F3A2E',
    accentInk: '#FAFAF7',
    accentSoft: '#E3EADF',
  },
  B: {
    bg: '#FAFAF7',
    paper: '#0E0F0C',
    ink: '#0E0F0C',
    ink70: 'rgba(14,15,12,0.72)',
    ink50: 'rgba(14,15,12,0.52)',
    line: 'rgba(14,15,12,0.16)',
    accent: '#2F6B3A',
    accentInk: '#FAFAF7',
    accentSoft: '#D9E7DC',
  },
};

/* ---------- Logo (inline SVG, scales to currentColor) ---------- */
function CaurioLogo({ size = 40, mono = true, showWordmark = true }) {
  // Simplified reproduction of the Cauriol shield (original-art, traced proportions)
  return (
    <img
      src={window.__resources ? window.__resources.logoDark : "assets/cauriol-logo.png"}
      alt="Cauriol ASD"
      style={{
        height: size,
        width: 'auto',
        display: 'block',
        filter: mono ? 'none' : 'invert(1)',
      }}
    />
  );
}

function CaurioLogoWhite({ size = 40 }) {
  return (
    <img
      src={window.__resources ? window.__resources.logoWhite : "assets/cauriol-logo-white.png"}
      alt="Cauriol ASD"
      style={{ height: size, width: 'auto', display: 'block' }}
    />
  );
}

/* ---------- Photo placeholder (diagonal stripes + caption) ---------- */
function PhotoPlaceholder({ label = 'photo', ratio = '16/9', tone = 'light', children, style = {} }) {
  const isDark = tone === 'dark';
  const bg = isDark ? '#1a1c18' : '#E9E6DC';
  const stripe = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(14,15,12,0.05)';
  const fg = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(14,15,12,0.45)';
  return (
    <div
      style={{
        aspectRatio: ratio,
        width: '100%',
        background: `repeating-linear-gradient(135deg, ${bg} 0 14px, ${stripe} 14px 28px)`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 14,
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
        fontSize: 11,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: fg,
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(14,15,12,0.10)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <span>▨ {label}</span>
      <span>{ratio}</span>
      {children}
    </div>
  );
}

/* ---------- Tiny icons (hairline SVG) ---------- */
const Icon = {
  arrow: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square"/>
    </svg>
  ),
  arrowDown: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" {...p}>
      <path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square"/>
    </svg>
  ),
  pin: (p = {}) => (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" {...p}>
      <path d="M6 13s4.5-4.3 4.5-7.5a4.5 4.5 0 0 0-9 0C1.5 8.7 6 13 6 13Z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="6" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  cal: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <rect x="1.5" y="2.5" width="11" height="10" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4 1v3M10 1v3M1.5 5.5h11" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  search: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}>
      <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.2"/>
      <path d="m9.3 9.3 3.2 3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
    </svg>
  ),
  plus: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.25"/>
    </svg>
  ),
  check: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}>
      <path d="m2 6.5 2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
    </svg>
  ),
  doc: (p = {}) => (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" {...p}>
      <path d="M1.5 1.5h6L10.5 5v7.5h-9v-11Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7.5 1.5V5h3" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
};

/* ---------- Data (mock, but sensible for Val di Fiemme) ---------- */
const DISCIPLINES = [
  { id: 'calcio', name: 'Calcio', short: 'CAL' },
  { id: 'sci', name: 'Sci alpino', short: 'SCI' },
  { id: 'biathlon', name: 'Biathlon', short: 'BIA' },
  { id: 'fondo', name: 'Sci di fondo', short: 'FON' },
];

const LEVELS = [
  { id: 'baby', name: 'Baby (5–8)' },
  { id: 'giovanili', name: 'Giovanili (9–14)' },
  { id: 'allievi', name: 'Allievi (15–18)' },
  { id: 'agonisti', name: 'Agonisti' },
  { id: 'amatori', name: 'Amatori' },
];

const EVENT_TYPES = [
  { id: 'gara', name: 'Gara' },
  { id: 'allenamento', name: 'Allenamento' },
  { id: 'raduno', name: 'Raduno' },
  { id: 'sociale', name: 'Sociale' },
];

const EVENTS = [
  { id: 'e01', title: 'Trofeo Cauriol — slalom gigante', date: '2026-01-11', time: '09:30', loc: 'Alpe Cermis, Cavalese', discipline: 'sci', level: 'agonisti', type: 'gara', desc: 'XXXVIII edizione del trofeo sociale. Gara FISI cat. Allievi–Giovani.' },
  { id: 'e02', title: 'Allenamento tiro — Lago di Tesero', date: '2026-01-14', time: '16:00', loc: 'Centro del fondo, Lago di Tesero', discipline: 'biathlon', level: 'giovanili', type: 'allenamento', desc: 'Tiro a terra e in piedi, 50 colpi. Presenza tecnico federale.' },
  { id: 'e03', title: 'Torneo invernale U13 — girone A', date: '2026-01-17', time: '14:00', loc: 'Palazzetto, Ziano di Fiemme', discipline: 'calcio', level: 'giovanili', type: 'gara', desc: 'Terza giornata. Cauriol vs. US Predazzo.' },
  { id: 'e04', title: 'Raduno tecnico regionale — sci alpino', date: '2026-01-24', time: '08:30', loc: 'Pampeago', discipline: 'sci', level: 'allievi', type: 'raduno', desc: 'Raduno FISI Trentino, 2 giorni. Porte, gigante e slalom.' },
  { id: 'e05', title: 'Cena sociale 70° anniversario', date: '2026-01-31', time: '20:00', loc: 'Sede ASD, Ziano', discipline: 'calcio', level: 'amatori', type: 'sociale', desc: 'Cena con tutti i tesserati per celebrare i 70 anni dell’associazione.' },
  { id: 'e06', title: 'Coppa Dolomiti — staffetta biathlon', date: '2026-02-07', time: '10:00', loc: 'Lago di Tesero', discipline: 'biathlon', level: 'agonisti', type: 'gara', desc: 'Staffetta 4×6 km. Formazione Cauriol 1 e Cauriol 2 iscritte.' },
  { id: 'e07', title: 'Allenamento fondo — tecnica classica', date: '2026-02-10', time: '17:00', loc: 'Lago di Tesero', discipline: 'fondo', level: 'giovanili', type: 'allenamento', desc: 'Sessione di tecnica con video-analisi.' },
  { id: 'e08', title: 'Open day primavera — calcio', date: '2026-03-14', time: '15:00', loc: 'Campo sportivo Ziano', discipline: 'calcio', level: 'baby', type: 'sociale', desc: 'Pomeriggio di prove aperte per i nati 2017–2020.' },
  { id: 'e09', title: 'Campionati italiani — biathlon giovanile', date: '2026-03-21', time: '09:00', loc: 'Forni Avoltri', discipline: 'biathlon', level: 'allievi', type: 'gara', desc: 'Trasferta nazionale, 4 atleti qualificati.' },
  { id: 'e10', title: 'Assemblea soci 2026', date: '2026-04-18', time: '18:00', loc: 'Sede ASD, Ziano', discipline: 'calcio', level: 'amatori', type: 'sociale', desc: 'Ordine del giorno: bilancio consuntivo 2025, programma stagione 2026/27.' },
];

const TEAM = [
  { name: 'Giorgio Delvai', role: 'Presidente', section: 'Direttivo', since: 2019 },
  { name: 'Ilaria Zorzi', role: 'Vicepresidente', section: 'Direttivo', since: 2021 },
  { name: 'Marco Vanzetta', role: 'Segretario', section: 'Direttivo', since: 2020 },
  { name: 'Chiara Deflorian', role: 'Tesoriere', section: 'Direttivo', since: 2022 },
  { name: 'Luca Felicetti', role: 'Responsabile tecnico — Sci alpino', section: 'Tecnici', since: 2015 },
  { name: 'Sara Gabrielli', role: 'Allenatrice — Biathlon', section: 'Tecnici', since: 2018 },
  { name: 'Paolo Varesco', role: 'Allenatore — Sci di fondo', section: 'Tecnici', since: 2017 },
  { name: 'Nicola Bellante', role: 'Mister — Calcio Prima squadra', section: 'Tecnici', since: 2023 },
  { name: 'Francesca Bonelli', role: 'Preparatrice atletica', section: 'Tecnici', since: 2021 },
  { name: 'Tommaso Longo', role: 'Medico sociale', section: 'Staff', since: 2016 },
  { name: 'Elena Iori', role: 'Fisioterapista', section: 'Staff', since: 2020 },
  { name: 'Davide Partel', role: 'Responsabile comunicazione', section: 'Staff', since: 2022 },
];

const ARTICLES = [
  { id: 'a01', cat: 'Cronache', title: 'Trofeo Cauriol: una XXXVIII edizione da ricordare', date: '2026-01-12', author: 'Davide Partel', excerpt: 'Neve dura, cielo terso e 148 atleti al cancelletto: la giornata raccontata dalla pista.', read: 6 },
  { id: 'a02', cat: 'Risultati', title: 'Coppa Dolomiti — Cauriol 1 sul podio', date: '2026-02-08', author: 'Sara Gabrielli', excerpt: 'La staffetta chiude terza dietro a Dobbiaco e Gsiesertal. Ottima prova dei nostri tiratori.', read: 3 },
  { id: 'a03', cat: 'Notizie', title: 'Bilancio 2025 approvato all’unanimità', date: '2026-04-19', author: 'Marco Vanzetta', excerpt: 'Assemblea dei soci: cresciuti i tesserati giovanili e completato il rinnovo dello spogliatoio.', read: 4 },
  { id: 'a04', cat: 'Guide tecniche', title: 'Sciolinatura a freddo: guida pratica per genitori', date: '2026-01-28', author: 'Luca Felicetti', excerpt: 'Cosa serve davvero per preparare gli sci di un giovane atleta quando fa −12 °C.', read: 8 },
  { id: 'a05', cat: 'Cronache', title: 'Torneo U13: Cauriol primo a punteggio pieno', date: '2026-01-18', author: 'Nicola Bellante', excerpt: 'Tre vittorie su tre al Palazzetto di Ziano. Il gruppo convince anche in fase difensiva.', read: 5 },
  { id: 'a06', cat: 'Notizie', title: '70 anni di Cauriol: il programma delle celebrazioni', date: '2026-01-05', author: 'Davide Partel', excerpt: 'Dal 1956 al 2026: mostra fotografica, cena sociale e pubblicazione del volume storico.', read: 4 },
];

const SPONSORS = [
  { name: 'Cassa Rurale di Fiemme', tier: 'Main partner', since: 2011 },
  { name: 'Latte Trento', tier: 'Main partner', since: 2018 },
  { name: 'Comune di Ziano di Fiemme', tier: 'Patrocinio', since: 1956 },
  { name: 'Comun General de Fascia', tier: 'Patrocinio', since: 2003 },
  { name: 'APT Val di Fiemme', tier: 'Patrocinio', since: 2008 },
  { name: 'Dolomiti Superski', tier: 'Tecnico', since: 2015 },
  { name: 'Fischer Italia', tier: 'Tecnico', since: 2020 },
  { name: 'Rossignol', tier: 'Tecnico', since: 2019 },
  { name: 'Fiemme Servizi', tier: 'Sostenitore', since: 2017 },
  { name: 'Panificio Zorzi', tier: 'Sostenitore', since: 2014 },
  { name: 'Hotel Shandranj', tier: 'Sostenitore', since: 2012 },
  { name: 'Ottica Felicetti', tier: 'Sostenitore', since: 2016 },
];

const TRANSPARENCY_DOCS = [
  { year: 2025, name: 'Bilancio consuntivo 2025', size: '412 KB', type: 'PDF' },
  { year: 2025, name: 'Relazione di missione 2025', size: '280 KB', type: 'PDF' },
  { year: 2025, name: 'Elenco contributi pubblici 2025', size: '94 KB', type: 'PDF' },
  { year: 2024, name: 'Bilancio consuntivo 2024', size: '398 KB', type: 'PDF' },
  { year: 2024, name: 'Relazione di missione 2024', size: '264 KB', type: 'PDF' },
  { year: 2024, name: 'Elenco contributi pubblici 2024', size: '88 KB', type: 'PDF' },
  { year: 2023, name: 'Bilancio consuntivo 2023', size: '372 KB', type: 'PDF' },
  { year: 2023, name: 'Statuto aggiornato', size: '210 KB', type: 'PDF' },
];

/* expose to other babel scripts */
Object.assign(window, {
  CAURIOL_TOKENS_DEFAULT,
  CaurioLogo, CaurioLogoWhite, PhotoPlaceholder, Icon,
  DISCIPLINES, LEVELS, EVENT_TYPES, EVENTS, TEAM, ARTICLES, SPONSORS, TRANSPARENCY_DOCS,
});

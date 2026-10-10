# Piano: cosa va nella base e cosa è solo di Cauriol

Fonte: PDF "ASD Cauriol — Redesign sito" (18 schermate desktop, 33 pagine A4)
e confronto con lo stato attuale della base.

## Regole del piano

1. **Tutto ciò che si aggiunge alla base è facoltativo.** Un campo vuoto o un
   blocco non inserito deve lasciare il sito identico a prima. Il sito demo
   deve continuare a funzionare dopo ogni passo.
2. **`public/admin/config.yml` e `src/content.config.ts` si cambiano insieme**
   (o `src/lib/site.ts` per i file in `src/data/`). Se non coincidono la build
   si ferma.
3. **Un passo alla volta**, ognuno con: build che passa, README aggiornato,
   demo controllata nel browser.
4. **Il resto è del cliente**: tema (`theme.json`), contenuti, `public/uploads/`
   e la cartella `src/brand/` (passo 12).

## Cosa NON va nella base

| Elemento | Perché |
|---|---|
| Newsletter nel footer | Serve un servizio esterno, consenso esplicito e informativa (GDPR). Si decide con il cliente. |
| Pagina "Informativa cookie" | La base non usa cookie: basta la privacy. |
| Montagne e boschi illustrati, logo, citazione del footer | Identità visiva di Cauriol (`src/brand/` e `theme.json`). |
| Tabella gare con risultati, atleti per fascia (Orienteering) | Usata da una sola pagina. Si fa come contenuto di Cauriol; diventa blocco "tabella" solo se serve a un secondo cliente. |
| Elenco sostenitori del Calcio | Contenuto, non struttura. |

## Passi, in ordine

### 0. Correggere il README
- La checklist dice "Use this template", ma così non si possono portare i
  miglioramenti nei siti già creati. Va scritto: **clonare la base e tenere il
  remote `base`** (la procedura `git remote add base …` è già nel README).
- File: `README.md`.

### 1. Header: pulsante in evidenza, logo + nome + sottotitolo
- Oggi: logo **oppure** nome (`Header.astro`).
- Nuovi campi in `site.json` (tutti facoltativi): `header_button` (testo e
  link), `show_name_with_logo`, `header_subtitle`.
- File: `public/admin/config.yml` (Dati del sito), `src/lib/site.ts`,
  `src/components/Header.astro`.
- Il menu a tendina esiste già e non cambia.

### 2. Intestazione di pagina: briciole, descrizione, immagine
- Oggi: titolo della pagina con `show_title` (`[...slug].astro`).
- Nuovo: fascia in cima con briciole di pane (ricavate dall'URL e dal menu),
  descrizione (campo `description`, già presente) e immagine facoltativa a
  destra (nuovo campo `header_image`, usato dalle pagine disciplina).
- File: `config.yml` e `content.config.ts` (collezione `pages`), nuovo
  componente `PageHeader.astro`, `[...slug].astro`.
- Nella fascia c'è un punto di aggancio per la decorazione (passo 12).

### 3. Footer a colonne, con citazione
- Oggi: 3 colonne fisse (nome, contatti, social).
- Nuovo, facoltativo: `footer_quote` e `footer_columns` (titolo + elenco di
  link). Una colonna può essere generata dalle Attività (passo 6).
- File: `site.json`, `config.yml`, `site.ts`, `Footer.astro`.

### 4. Blocco "Numeri"
- 2–4 cifre con etichetta (es. 1947 · anno di fondazione). Appare in Home,
  La storia, Vantaggi economici, Orienteering.
- Nuovo blocco `stats` (vedi "Aggiungere un nuovo blocco" nel README): voce in
  `config.yml`, schema in `content.config.ts`, `blocks/Stats.astro`,
  registrazione in `Blocks.astro`.

### 5. Blocco "Linea del tempo" (facoltativo)
- Mostra un periodo con data di inizio e fine (nel mockup: mandato del
  direttivo, 19.04.2024 → primavera 2028).
- Nuovo blocco `timeline`, con la stessa procedura del passo 4. Chi non lo
  vuole non lo inserisce nella pagina.

### 6. Collezione "Attività" (discipline, gare, corsi)
- Un file per attività: nome, immagine, descrizione, responsabile e contenuto
  a blocchi (come le pagine).
- Da lì si generano: griglia, pagine di dettaglio, sottomenu, colonna del
  footer, "Altre discipline" in fondo a ogni dettaglio.
- Il nome mostrato nel pannello si cambia per cliente (`label` in
  `config.yml`): "Discipline", "Gare", "Corsi".
- **Responsabile**: menu a tendina che pesca dalle persone di `team.json`
  (widget `relation` di Decap).
  **Da verificare prima di scrivere codice**: come si collega un campo
  `relation` a un file con una lista, nella versione di Decap fissata in
  `package.json` (controllare la documentazione).
- Le news ricevono un campo facoltativo `activity` per mostrare "Notizie"
  filtrate su ogni disciplina.
- File: `config.yml`, `content.config.ts`, `src/pages/` (nuove rotte),
  `src/lib/` (helper), componenti griglia e "Altre attività".

### 7. Persone: cariche e responsabili di settore
- Oggi il blocco `team` mostra tutte le persone. Servono: cariche con iniziali
  nel cerchio, e "responsabili di settore" (nome + disciplina).
- Si estende il blocco `team` con un campo `layout` (elenco / cariche /
  responsabili); i responsabili si leggono dalle Attività (passo 6).

### 8. Notizie: filtro per anno, ultima in evidenza, colonna laterale
- Elenco: filtro per anno e prima notizia in evidenza (`src/pages/news/`,
  `NewsList.astro`, `NewsCard.astro`). Va tenuta la paginazione esistente:
  il mockup mostra 48 articoli in una pagina sola, ma il sito reale non deve
  caricarli tutti insieme.
- Dettaglio: colonna "Altre notizie" e scheda opzionale (es. tesseramento).

### 9. Navigazione tra le pagine di una sezione
- Le pagine di "La società" mostrano in fondo le altre pagine della sezione.
  Si ricava dal menu (`menu.json`), senza campi nuovi.
- Nota: nel menu attuale i figli puntano ad ancore (`/la-societa#team`).
  Per Cauriol servono pagine vere; il menu lo permette già.

### 10. Pulsanti di condivisione (X e Facebook)
- Solo link con l'indirizzo della pagina, **nessuno script e nessun SDK
  esterno**, quindi nessuna richiesta a terzi finché il visitatore non clicca.
- Attivabili per pagina o per news con un campo facoltativo.
- File: nuovo `ShareLinks.astro`, `news/[slug].astro`, `[...slug].astro`.
- Da annotare nel README (sezione GDPR).

### 11. Documenti: anno, "Apri" e "Scarica"
- Il blocco `documents` ha etichetta e file. Aggiungere un campo facoltativo
  `year`, l'ordinamento (più recenti / meno recenti) e il doppio pulsante.
- File: `config.yml`, `content.config.ts`, `blocks/Documents.astro`.

### 12. Punti di aggancio per il cliente: `src/brand/`
- Cartella con file neutri nella base: un componente decorativo per header e
  footer e un file CSS extra. I componenti della base li includono sempre.
- Nella base non disegnano nulla; nel repository di Cauriol contengono montagne
  e boschi.
- Si fa **per ultimo**, quando i passi 2 e 3 hanno chiarito dove servono
  davvero.

## Cosa resta da chiarire (non blocca i passi 0–5)

- **Sponsor**: il mockup ha un carosello di loghi (richiede JavaScript). Il
  blocco attuale è una griglia: probabilmente basta quella.
- **Contatti**: il QR del gruppo WhatsApp è un'immagine da aggiungere al
  blocco Contatti, con campo facoltativo.
- **Mobile**: nel PDF non ci sono schermate mobile. Il comportamento si
  decide con la base reale.
- **Pagina privacy**: non disegnata nel mockup.
- **Carattere dei titoli**: Source Serif 4 non è tra le opzioni
  (`theme.json` ha Barlow, Archivo, Fraunces). Va aggiunto via Fontsource,
  self-hosted come gli altri, per non fare richieste a Google.
- **Testi e immagini reali**: il mockup ha segnaposto ("[TESTO
  DELL'ARTICOLO]", "[NOME SOSTENITORE]"). Vanno presi dal sito WordPress.
- **Migrazione delle news**: ~48 articoli dal 2019 (WordPress →
  Markdown, con script di adattamento allo schema).

## Dopo la base: sito Cauriol

1. Clonare la base nel repository `cauriol` con il remote `base`.
2. Impostare tema, dati, menu e team dal pannello.
3. Inserire le Attività (7 discipline), le pagine e le news migrate.
4. Disegnare montagne e boschi in `src/brand/`.
5. Deploy e account degli editor (vedi README).

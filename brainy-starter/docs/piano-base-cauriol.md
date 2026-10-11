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

### 1. Header: pulsante in evidenza, logo + nome + sottotitolo — FATTO
- Era: logo **oppure** nome (`Header.astro`).
- Campi in `site.json` (tutti facoltativi): `header_button_label` e
  `header_button_url` (due campi separati: Decap salva in modo poco affidabile
  gli oggetti vuoti), `show_name_with_logo`, `header_subtitle`.
- File: `config.yml` (Dati del sito), `site.ts`, `Header.astro`.
- Corretto anche lo script del menu mobile, che non si richiudeva passando da
  desktop a mobile.

### 2. Intestazione di pagina: briciole, descrizione, immagine — FATTO
- Un **interruttore unico per il sito**, `page_header_style` in `site.json`:
  `simple` (come prima, predefinito) oppure `band` (fascia colorata con
  briciole di pane, titolo, descrizione e immagine). Non è per pagina: tutte
  le pagine di un sito devono avere la stessa testata.
- Per pagina, solo l'immagine in cima: `header_image` e `header_image_alt`
  (usata dalle pagine disciplina).
- File: `config.yml`, `content.config.ts`, `site.ts`,
  `src/lib/breadcrumbs.ts` (nuovo), `src/components/PageHeader.astro`
  (nuovo), `src/pages/[...slug].astro`.
- Lo stile `band` ha solo il colore pieno. La decorazione (montagne) è del
  cliente e arriva al passo 12. `PageHeader` accetta briciole passate
  dall'esterno, per le news (passo 8) e le Attività (passo 6).

### 3. Footer a colonne — FATTO
- Era: 3 colonne fisse (nome, contatti, social).
- Nuovo, facoltativo: `footer_logo` (versione chiara del logo) e
  `footer_columns` (colonne con titolo ed elenco di link).
- **Niente `footer_quote`**: la frase in corsivo del mockup è il "Motto"
  (`tagline`), che il footer mostra già. Lo stile (corsivo) è del cliente.
- Una colonna potrà essere alimentata dalle Attività (passo 6).
- File: `config.yml`, `site.ts`, `Footer.astro`.

### 4. Blocco "Numeri" — FATTO
- 2–4 cifre con etichetta (es. 1947 · anno di fondazione). Appare in Home,
  La storia, Vantaggi economici, Orienteering.
- Due aspetti, come nel mockup: `row` (riquadro diviso da filetti) e `cards`
  (schede separate). Senza icone (la base non ha un sistema di icone).
- File: `config.yml`, `content.config.ts`, `blocks/Stats.astro`,
  `Blocks.astro`. Guida: `docs/aggiungere-un-blocco.md`.

### 5. Blocco "Periodo" (linea del tempo) — FATTO
- Nel mockup è una riga con un'etichetta all'inizio, una linea e
  un'etichetta alla fine (mandato del direttivo: 19.04.2024 → primavera 2028).
  Non una cronologia con tanti punti. Le due etichette sono testo libero.
- Blocco `timeline`, stessa procedura del passo 4. Chi non lo vuole non lo
  inserisce nella pagina.

### 6. Collezione "Attività" (discipline, gare, corsi) — FATTO
- **6.0 Team come collezione**: una persona = un file (`src/content/team/`). Serve a
  collegare le attività alle persone con un identificativo stabile: il nome del file non
  cambia se si rinomina la persona (verificato nel codice di Decap e nel pannello).
  `team.json` non esiste più.
- Collezione `activities`: nome, descrizione, immagine, **responsabili** (scelti dal Team),
  ordine, sezioni (stesso elenco di blocchi delle pagine, riusato con un'ancora YAML).
- Pagine di dettaglio generate da `[...slug].astro` con prefisso configurabile
  (`activities_path`): intestazione, responsabili, sezioni, **news collegate** e
  "Altre attività". L'elenco è una pagina normale con il blocco *Elenco delle attività*.
- Persona eliminata: sparisce dai responsabili e la build avvisa senza fermarsi.
- Nome della sezione e testi "Altre…/Tutte…" sono impostazioni (il genere cambia: discipline /
  corsi).
- Guida: `docs/aggiungere-una-collezione.md`.

### 7. Persone: cariche e responsabili di settore — FATTO
- Blocco `team` con `layout` (foto grande / schede centrate / schede compatte) e `group`
  (mostra solo un gruppo). I "responsabili di settore" del mockup sono persone del Team con
  il ruolo uguale al settore, non dati derivati dalle attività.

### 8. Notizie — FATTO
- Filtro per anno (pagine `/news/anno/AAAA`, solo se ci sono news di più anni), prima news in
  evidenza, colonna laterale con "Altre news" e riquadro facoltativo; usa `PageHeader` nello
  stile `band`. Tutto a interruttore nelle impostazioni.

### 9. Navigazione tra le pagine di una sezione — FATTO
- `show_section_nav`: in fondo alle pagine di un sottomenu, le altre pagine della sezione
  (le voci con `#` non sono pagine e si saltano).

### 10. Pulsanti di condivisione (X e Facebook) — FATTO
- Semplici link, senza script. `show_share_links` per news e attività; `show_share` per pagina.

### 11. Documenti: anno, "Apri" e "Scarica" — FATTO
- `year` per documento, `sort` e `show_open`. Non c'è l'interruttore interattivo
  "più recenti / meno recenti" del mockup (richiederebbe JavaScript): l'ordine si sceglie nel blocco.

### 11b. Menu e footer alimentati dalle attività — FATTO
- `activities_submenu` su una voce del menu e `from_activities` su una colonna del footer.

### 12. Punti di aggancio per il cliente: `src/brand/` — FATTO
- `PageHeaderDecor.astro`, `FooterDecor.astro`, `brand.css`: vuoti nella base. Guida in
  `src/brand/README.md`. Elenco completo delle funzioni facoltative:
  `docs/funzioni-facoltative.md`.

## Cosa resta da chiarire

Fatti nella base (dopo il passo 12): il carattere **Source Serif 4** tra le opzioni dei titoli e
l'**immagine a lato** nel blocco Contatti (per il QR di WhatsApp).

Non fatti, per scelta o perché riguardano solo il cliente:

- **Sponsor**: il mockup ha un carosello di loghi (richiede JavaScript). Il blocco della base è
  una griglia, che per ora basta.
- **Mobile**: nel PDF non ci sono schermate mobile; il comportamento è stato verificato sulla base
  reale a 400 px.
- **Pagina privacy**: non disegnata nel mockup; il demo ha un testo segnaposto.
- **Icone** (Home del mockup, contatti e social del footer): la base non ha un sistema di icone.
- **Testi e immagini reali**: il mockup ha segnaposto ("[TESTO DELL'ARTICOLO]", "[NOME
  SOSTENITORE]"). Vanno presi dal sito WordPress.
- **Migrazione delle news**: ~48 articoli dal 2019 (WordPress → Markdown, con script di
  adattamento allo schema).
- **Controllo dei tipi**: ora c'è (`npm run check`, con `tsconfig.json` strict): 0 errori su 54 file.
  La build da sola non controlla i tipi, quindi va lanciato a parte.


## Dopo la base: sito Cauriol

1. Clonare la base nel repository `cauriol` con il remote `base`.
2. Impostare tema, dati, menu e team dal pannello.
3. Inserire le Attività (7 discipline), le pagine e le news migrate.
4. Disegnare montagne e boschi in `src/brand/`.
5. Deploy e account degli editor (vedi README).

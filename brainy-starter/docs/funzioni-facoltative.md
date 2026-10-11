# Funzioni facoltative della base

La base è fatta in modo che **ogni novità sia spenta o vuota finché non la si attiva**:
un sito che non le usa resta identico (verificato confrontando l'HTML di prima e dopo).
Questa pagina elenca dove si attiva ogni funzione.

## Impostazioni → Dati del sito

| Funzione | Campo | Cosa fa |
|---|---|---|
| Nome accanto al logo | `show_name_with_logo` | Con il logo caricato mostra anche il nome |
| Sottotitolo | `header_subtitle` | Riga piccola sotto il nome, nell'intestazione |
| Pulsante in evidenza | `header_button_label`, `header_button_url` | Pulsante nell'intestazione (es. Tesseramento). Serve compilare entrambi |
| Intestazione delle pagine interne | `page_header_style` | `simple` (titolo) oppure `band` (fascia con briciole di pane, descrizione e immagine) |
| Logo del piè di pagina | `footer_logo` | Versione chiara del logo, per il fondo scuro |
| Colonne di link nel piè di pagina | `footer_columns` | Colonne con titolo e link; una colonna può includere in automatico le attività |
| Attività | `activities_label`, `activities_path`, `activities_more_title`, `activities_all_label` | Nome, indirizzo e testi della sezione (vedi README) |
| Altre pagine della sezione | `show_section_nav` | In fondo alle pagine di un sottomenu, mostra le altre pagine di quel sottomenu |
| Condivisione | `show_share_links` | Link per condividere news e attività su X e Facebook |
| News in evidenza | `news_featured` | La news più recente appare grande in cima all'elenco |
| Colonna laterale delle news | `news_sidebar` | Accanto a una news: le altre news e, se impostato, un riquadro in evidenza |
| Riquadro nella colonna | `news_box_title`, `news_box_text`, `news_box_button_label`, `news_box_button_url` | Es. "Tesseramento" con un pulsante. Si vede solo con la colonna laterale |

## Impostazioni → Menu

| Funzione | Campo | Cosa fa |
|---|---|---|
| Attività come sottomenu | `activities_submenu` (per voce) | Aggiunge in automatico, sotto quella voce, tutte le attività |

## Pagine

| Funzione | Campo | Cosa fa |
|---|---|---|
| Immagine in cima | `header_image`, `header_image_alt` | Si vede nello stile `band` |
| Condivisione | `show_share` | Link per condividere quella pagina su X e Facebook |

## Blocchi

| Blocco | Opzioni |
|---|---|
| Numeri (`stats`) | `layout` (in riga / schede), da 2 a 4 numeri |
| Periodo (`timeline`) | inizio e fine, testo libero |
| Elenco delle attività (`activities`) | titolo, introduzione, link a destra del titolo, mostra i responsabili |
| Team (`team`) | `layout` (foto grande / schede centrate / schede compatte), `group` (mostra solo un gruppo), `limit` |
| Documenti (`documents`) | `year` per documento, `sort` (come inseriti / dal più recente / dal meno recente), `show_open` (pulsante Apri) |
| Contatti (`contacts`) | `image`, `image_alt`, `image_caption`: immagine a lato (es. il QR del gruppo WhatsApp) |

## Impostazioni → Aspetto

| Funzione | Cosa fa |
|---|---|
| Carattere dei titoli: Source Serif 4 | Serif editoriale, self-hosted come gli altri (Fontsource): nessuna richiesta a Google Fonts |

## Collezioni

| Collezione | Contenuto |
|---|---|
| News | In più: `activity` (attività collegata) |
| Team | Una persona per file; `group` e `order` |
| Attività | Una per file: nome, descrizione, immagine, responsabili (dal Team), ordine, sezioni |

## Personalizzazioni del cliente: `src/brand/`

`PageHeaderDecor.astro` (dietro la fascia), `FooterDecor.astro` (sopra il footer) e
`brand.css`. Nella base sono vuoti; vedi `src/brand/README.md`.

## Privacy (GDPR)

- I **link di condivisione** sono semplici indirizzi, senza script né pulsanti ufficiali:
  nessuna richiesta a X o Facebook finché il visitatore non clicca. Si aprono in una
  nuova scheda con `rel="noopener noreferrer"`.
- La base non usa cookie, non include newsletter e non ha moduli.

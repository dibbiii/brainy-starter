# Brainy Starter — Astro + Decap CMS

Base riutilizzabile per siti statici di associazioni, eventi e piccole aziende.
Il cliente aggiorna news, pagine, team e sponsor da `/admin`; ogni modifica
diventa un commit su Git e il sito si ricostruisce da solo.

## Avvio in locale

```bash
npm install          # installa e copia Decap in public/admin/vendor
npm run dev          # terminale 1 → http://localhost:4321
npm run cms          # terminale 2 → abilita il pannello in locale
```

Apri `http://localhost:4321/admin/` e clicca **Accedi**: in locale non serve
password, le modifiche vengono scritte direttamente nei file del progetto.

## Come è organizzato

```
public/admin/config.yml     ← definizione del pannello (campi, blocchi)
src/content.config.ts       ← schema dei contenuti (il "gemello" di config.yml)
src/content/news/*.md       ← una news per file
src/content/pages/*.md      ← una pagina per file, composta da blocchi
src/data/*.json             ← impostazioni: dati sito, aspetto, menu, team, sponsor
src/components/blocks/      ← un componente per ogni tipo di blocco
src/layouts/Base.astro      ← <head>, SEO, header, footer
public/uploads/             ← immagini e file caricati dal pannello
```

La regola d'oro: **config.yml e content.config.ts devono descrivere gli stessi
campi.** Se ne cambi uno, cambia l'altro. Se non coincidono, la build si ferma
e l'errore indica il campo.

## Blocchi disponibili

Ogni pagina è una lista di sezioni che l'editor aggiunge e riordina:
copertina, testo, testo con immagine, schede (gare, corsi, discipline),
team, sponsor, galleria, invito all'azione, numeri, periodo (linea del tempo), documenti, ultime news,
video YouTube (con consenso), contatti.

### Aggiungere un nuovo blocco

1. `public/admin/config.yml` → aggiungi un elemento sotto `sections.types`
2. `src/content.config.ts` → crea lo schema con `type: z.literal('nome')` e
   aggiungilo a `discriminatedUnion`
3. `src/components/blocks/Nome.astro` → il componente
4. `src/components/Blocks.astro` → registralo nella mappa

Guida dettagliata, con un esempio completo e i controlli da fare:
[`docs/aggiungere-un-blocco.md`](docs/aggiungere-un-blocco.md).

Se il blocco può servire ad altri clienti, aggiungilo **qui nella base**.

## Nuovo cliente: checklist

1. **Clona la base** (non usare "Use this template": il nuovo sito
   perderebbe il collegamento con la base e non potresti più portargli
   i miglioramenti). Prima crea su GitHub il repository **vuoto**
   `brainylabs/nome-cliente`, poi:
   ```bash
   git clone https://github.com/brainylabs/brainy-starter.git nome-cliente
   cd nome-cliente
   git remote rename origin base        # la base resta collegata come "base"
   git remote add origin https://github.com/brainylabs/nome-cliente.git
   git push -u origin main
   ```
2. `public/admin/config.yml` → `backend.repo: brainylabs/nome-cliente`
3. `npm install && npm run dev && npm run cms`
4. Dal pannello, **Impostazioni**:
   - *Dati del sito*: nome, URL, contatti, social
   - *Aspetto*: colori, caratteri, angoli
   - *Menu*, *Team*, *Sponsor*
5. Dal pannello, **Pagine**: componi home e pagine interne
6. Cancella le news e le immagini di esempio in `public/uploads/`
7. Scrivi l'informativa privacy reale (pagina `privacy`)
8. La favicon (`src/pages/favicon.svg.ts`) usa già i colori scelti in *Aspetto*; modifica quel file solo se il cliente vuole un disegno diverso
9. Deploy (vedi sotto) e crea gli account degli editor

Se un cliente vuole un layout molto diverso, si modificano i componenti nel
suo repository; il pannello e i contenuti restano gli stessi.

## Deploy

Il sito è HTML statico (`npm run build` → cartella `dist/`), quindi può
andare su qualunque hosting. Il punto delicato è **il login al pannello**.

### Netlify (più semplice)

1. Collega il repository: build `npm run build`, cartella `dist`
   (già impostati in `netlify.toml`)
2. Su GitHub crea una **OAuth App** (Settings → Developer settings →
   OAuth Apps) con callback `https://api.netlify.com/auth/done`
3. Su Netlify inserisci Client ID e Secret nella sezione OAuth/accesso del sito
4. Ogni editor accede con il proprio account GitHub, che deve avere
   accesso in scrittura al repository

Netlify Identity e Git Gateway sono in dismissione: non usarli.

### Altri hosting (Cloudflare Pages, hosting europeo, server proprio)

Serve un piccolo servizio OAuth intermedio tra Decap e GitHub, per esempio
un Cloudflare Worker o una funzione serverless. Una volta attivo, aggiungi
in `config.yml`:

```yaml
backend:
  name: github
  repo: brainylabs/nome-cliente
  base_url: https://auth.tuodominio.it
```

Un unico proxy può servire tutti i clienti.

## GDPR: cosa fa già la base

- **Caratteri self-hosted** (Fontsource): nessuna richiesta a Google Fonts
- **Decap servito dal nostro dominio**, non da CDN esterne
- **Nessun cookie** e nessuno strumento di analisi
- **Video YouTube a due clic**: nulla viene caricato da YouTube finché
  il visitatore non lo chiede, poi si usa `youtube-nocookie.com`
- **Nessun modulo di contatto**: solo email e telefono cliccabili

Con questa configurazione di solito **non serve un banner cookie**.
Va però sempre scritta un'informativa privacy (trattamenti dell'hosting,
email di contatto, eventuali iscrizioni).

### Cose da valutare caso per caso

- **Hosting**: Netlify, Cloudflare e GitHub sono aziende USA. Si possono
  usare con DPA e clausole contrattuali standard, ma per clienti più
  sensibili si può pubblicare `dist/` su un hosting con sede in UE.
- **Statistiche**: se servono, scegliere uno strumento senza cookie e
  ospitato in UE (es. Plausible o Umami self-hosted) e citarlo
  nell'informativa.
- **Moduli** (contatti, iscrizioni gare): richiedono un servizio che
  riceve dati personali; scegliere un fornitore UE e aggiornare
  l'informativa.
- **Mappe**: stesso schema del video (caricamento al clic) oppure
  un'immagine statica con link.

Queste note sono indicazioni tecniche, non consulenza legale: per ogni
cliente l'informativa va verificata da chi se ne occupa.

## Manutenzione

- `npm outdated` / `npm update` una volta ogni qualche mese
- Le versioni di Decap sono fissate in `package.json` (nessun
  aggiornamento automatico da CDN che possa rompere il pannello)
- Per portare un miglioramento della base in un sito cliente già
  esistente (il remote `base` c'è già se il sito è stato creato con la
  checklist sopra):
  ```bash
  git fetch base
  git merge base/main   # risolvere eventuali conflitti
  ```
  Se il remote `base` non esiste (sito creato in altro modo), aggiungilo prima
  con `git remote add base https://github.com/brainylabs/brainy-starter.git`.

### Piano B se Decap venisse abbandonato

Sveltia CMS legge lo stesso `config.yml` di Decap. In quel caso basta
sostituire lo script in `src/pages/admin/index.astro`; contenuti, schema e
sito non cambiano. È il vantaggio di un CMS basato su file: i contenuti
sono Markdown e JSON, non sono prigionieri di nessun software.

# Aggiungere una collezione alla base

Una **collezione** è un gruppo di contenuti tutti uguali, uno per file: le news, le
persone del Team, le attività. Si distingue da un **blocco** (vedi
`aggiungere-un-blocco.md`), che è un pezzo di una pagina. Questa guida usa come
esempio le collezioni **Team** (`src/content/team/`) e **Attività**
(`src/content/activities/`).

## Quando serve una collezione

- Il contenuto si ripete (più persone, più discipline) e va **elencato in più posti**
  (griglia, menu, "altre attività", responsabili).
- Un elemento deve potersi **collegare** ad altri (una news a una disciplina,
  una disciplina ai suoi responsabili).
- Ogni elemento ha, o può avere, una **pagina propria**.

Se serve solo un elenco semplice dentro una pagina, basta una lista in un blocco.

## I pezzi

| # | File | Compito |
|---|------|---------|
| 1 | `src/content/<nome>/*.md` | I contenuti: un file per elemento |
| 2 | `public/admin/config.yml` | La collezione nel pannello (`folder`, campi) |
| 3 | `src/content.config.ts` | Lo schema (`defineCollection` + `glob`) |
| 4 | `src/lib/<nome>.ts` | Funzioni per leggere e ordinare gli elementi |
| 5 | Una rotta, se ogni elemento ha una pagina | `getStaticPaths` |
| 6 | Un blocco, se serve un elenco in una pagina | vedi la guida dei blocchi |

## 1–3: collezione, pannello e schema

`config.yml` (collezione a cartella):

```yaml
  - name: team
    label: Team
    folder: src/content/team
    create: true
    slug: "{{slug}}"
    identifier_field: name      # il campo che fa da titolo
    fields:
      - { label: Nome, name: name, widget: string }
      ...
```

`content.config.ts`:

```ts
const teamMembers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({ name: z.string(), order: z.number().nullish().transform((v) => v ?? 0) }),
});
export const collections = { news, pages, team: teamMembers };
```

Il nome della collezione nel pannello (`name: team`) e la chiave esportata
(`team:`) devono coincidere.

## Collegare una collezione a un'altra

Nel pannello si usa il widget `relation`:

```yaml
      - label: Responsabili
        name: managers
        widget: relation
        collection: team
        search_fields: [name, role]
        value_field: "{{slug}}"                # si salva il NOME DEL FILE
        display_fields: ["{{name}} — {{role}}"]
        multiple: true
```

Regole imparate:

- **Si salva lo `{{slug}}`, cioè il nome del file**, non il nome della persona.
  Verificato nel codice di Decap (`decap-cms-core/src/backend.ts`): il nome del
  file viene generato solo alla creazione, quindi **rinominare una persona non
  rompe i collegamenti**. Verificato anche nel pannello.
- Per questo il Team è una collezione a cartella e non una lista dentro un file:
  nelle liste non c'è un identificativo stabile (Decap non ha un campo che lo
  generi da solo).
- Nello schema il collegamento è un semplice testo o una lista di testi
  (`z.array(z.string())`).
- **Persona eliminata**: chi legge il collegamento deve ignorarla e avvisare
  nel registro della build, senza fermarla (`membersById` in `src/lib/team.ts`).
  L'editor non vede gli errori di build: un sito che smette di pubblicarsi in
  silenzio è peggio di un nome che sparisce.

## Riusare un elenco di campi: ancore YAML

L'elenco dei blocchi (`sections`) serve sia alle Pagine sia alle Attività.
Si definisce una volta con un'ancora e si richiama con l'alias:

```yaml
      - &sections_field        # nella collezione Pagine
        label: Sezioni
        name: sections
        ...
      - *sections_field        # nella collezione Attività
```

Decap legge `config.yml` con la libreria `yaml` e le opzioni `maxAliasCount: -1`
e `merge: true`: gli alias sono supportati (verificato nel codice e nel pannello).

## 5: una pagina per elemento

Le pagine create dal pannello sono gestite da `src/pages/[...slug].astro`. Le
attività aggiungono i loro percorsi alla stessa funzione:

```ts
export async function getStaticPaths() {
  const pages = await getCollection('pages', (p) => p.id !== 'home');
  const activities = await allActivities();
  return [
    ...pages.map((page) => ({ params: { slug: page.id }, props: { page, activity: undefined } })),
    ...activities.map((activity) => ({
      params: { slug: `${activitiesPath}/${activity.id}` },
      props: { page: undefined, activity },
    })),
  ];
}
```

Il prefisso (`discipline`, `gare`…) viene da `site.json`, quindi cambia per cliente
senza toccare il codice.

## Cose da ricordare

- **Collezione vuota = avvisi a ogni build** (`No files found…`, `The collection …
  does not exist or is empty`). La base include quindi alcuni elementi di esempio;
  si cancellano all'avvio di un cliente.
- **Testi che dipendono dal genere** ("Altre discipline" / "Altri corsi"): non si
  ricavano dal nome della sezione. Sono impostazioni a parte.
- **Controllare un elemento che non esiste** con `getCollection(..., filtro)` e non
  con `getEntry`, che stampa un avviso quando manca.
- L'ordine dei file in una cartella non è significativo: serve un campo `order`
  e un'ordinazione esplicita (`order`, poi nome).
- Le pagine di prova e i dati temporanei vanno cancellati a fine prova.

## Come si prova

1. `npx astro sync` con file validi e non validi (errore che indica il campo).
2. `npm run build`: nessun avviso nuovo.
3. `npm run dev` + `npm run cms`: aprire il pannello, creare un elemento, controllare
   il file scritto in `src/content/<nome>/`.
4. Rinominare un elemento dal pannello e controllare che il nome del file resti lo stesso.
5. Provare gli stati limite: elemento senza campi facoltativi, collegamento a un
   elemento eliminato, nessun elemento.

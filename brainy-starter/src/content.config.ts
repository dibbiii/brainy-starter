// Schema dei contenuti. È il "gemello" di public/admin/config.yml:
// ogni campo definito là deve esistere qui (e viceversa), altrimenti
// la build si ferma con un errore che dice quale campo non torna.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Decap salva i campi vuoti come "" oppure null: li trattiamo come assenti.
const optStr = z.string().nullish().transform((v) => v || undefined);

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: optStr,
    cover: optStr,
    cover_alt: optStr,
    attachments: z.array(z.object({ label: z.string(), file: z.string() })).nullish().default([]),
    draft: z.boolean().nullish().default(false),
  }),
});

// --- Blocchi del page builder: uno per ogni "type" in config.yml ---
const hero = z.object({
  type: z.literal('hero'),
  title: z.string(),
  subtitle: optStr,
  image: optStr,
  button_label: optStr,
  button_url: optStr,
  size: z.enum(['large', 'medium']).default('large'),
});
const text = z.object({ type: z.literal('text'), title: optStr, content: z.string() });
const textImage = z.object({
  type: z.literal('text_image'),
  title: optStr,
  content: z.string(),
  image: z.string(),
  image_alt: optStr,
  image_side: z.enum(['left', 'right']).default('right'),
});
const cards = z.object({
  type: z.literal('cards'),
  title: optStr,
  intro: optStr,
  items: z.array(
    z.object({ title: z.string(), highlight: optStr, text: optStr, image: optStr, url: optStr }),
  ),
});
const team = z.object({ type: z.literal('team'), title: optStr, intro: optStr, limit: z.number().default(0) });
const sponsors = z.object({ type: z.literal('sponsors'), title: optStr, intro: optStr });
const gallery = z.object({
  type: z.literal('gallery'),
  title: optStr,
  images: z.array(z.object({ image: z.string(), caption: optStr })),
});
const cta = z.object({
  type: z.literal('cta'),
  title: z.string(),
  text: optStr,
  button_label: z.string(),
  button_url: z.string(),
});
const documents = z.object({
  type: z.literal('documents'),
  title: optStr,
  files: z.array(z.object({ label: z.string(), file: z.string() })),
});
const latestNews = z.object({ type: z.literal('latest_news'), title: optStr, count: z.number().default(3) });
const video = z.object({ type: z.literal('video'), title: optStr, url: z.string() });
const contacts = z.object({ type: z.literal('contacts'), title: optStr, intro: optStr });
const stats = z.object({
  type: z.literal('stats'),
  title: optStr,
  layout: z.enum(['row', 'cards']).default('row'),
  items: z.array(z.object({ value: z.string(), label: z.string() })).min(2).max(4),
});
const timeline = z.object({
  type: z.literal('timeline'),
  title: optStr,
  start: z.string(),
  end: z.string(),
});

export const section = z.discriminatedUnion('type', [
  hero, text, textImage, cards, team, sponsors, gallery, cta, stats, timeline, documents, latestNews, video, contacts,
]);
export type Section = z.infer<typeof section>;

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: optStr,
    show_title: z.boolean().nullish().default(true),
    header_image: optStr,
    header_image_alt: optStr,
    sections: z.array(section).nullish().default([]),
  }),
});

export const collections = { news, pages };

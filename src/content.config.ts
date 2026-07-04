import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * IDs are the plain filename without extension. The default loader slugifies
 * (e.g. `v1.6.x` → `v16x`), which would break URLs the Hugo site published.
 * Collections are flat on purpose: ids map 1:1 onto single-segment routes.
 */
const markdown = (base: string) =>
  glob({
    pattern: '*.md',
    base,
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  });

/** Standalone pages: /about/, /install/, /faq/. */
const pages = defineCollection({
  loader: markdown('./src/content/pages'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const docs = defineCollection({
  loader: markdown('./src/content/docs'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Position in the docs index and menu-independent ordering. */
    order: z.number(),
  }),
});

const news = defineCollection({
  loader: markdown('./src/content/news'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Meta description; posts without one fall back to their excerpt. */
    description: z.string().optional(),
    /** Drafts are excluded from listings, feeds and the build. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, docs, news };

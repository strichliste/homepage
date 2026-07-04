import { getCollection, type CollectionEntry } from 'astro:content';

export type NewsPost = CollectionEntry<'news'>;

/** Published news posts, newest first. */
export async function getNewsPosts(): Promise<NewsPost[]> {
  const posts = await getCollection('news', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Teaser HTML for a post: everything up to the `<!--more-->` marker, or the
 * first paragraph when a post has no marker.
 */
export function excerptOf(post: NewsPost): string {
  const html = post.rendered?.html ?? '';
  const marker = html.indexOf('<!--more-->');
  if (marker !== -1) return html.slice(0, marker).trim();
  const firstParagraphEnd = html.indexOf('</p>');
  return firstParagraphEnd === -1 ? html : html.slice(0, firstParagraphEnd + '</p>'.length);
}

const longDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

/** "June 12, 2026" — the visible form of a news date. */
export function formatDate(date: Date): string {
  return longDate.format(date);
}

/** "2026-06-12" — the machine-readable form for `<time datetime>`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

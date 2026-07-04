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

/** URL of a post — the one shape shared by pages and the RSS feed. */
export function newsPath(post: NewsPost): string {
  return `/news/${post.id}/`;
}

/* News dates are authored in German local time; rendering them in UTC could
   shift a late-evening post to the previous calendar day. */
const TIME_ZONE = 'Europe/Berlin';

const longDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: TIME_ZONE });
const isoDay = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** "June 12, 2026" — the visible form of a news date. */
export function formatDate(date: Date): string {
  return longDate.format(date);
}

/** "2026-06-12" — the machine-readable form for `<time datetime>`. */
export function isoDate(date: Date): string {
  return isoDay.format(date);
}

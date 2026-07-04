import rss from '@astrojs/rss';
import { SITE_TITLE } from '../consts';
import { excerptOf, getNewsPosts, newsPath } from './news';

function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The site feed is a news feed: reference pages (docs, about, …) don't belong
 * in subscribers' readers. Served at /index.xml and, for subscribers of the
 * old per-section Hugo feed, at /news/index.xml.
 */
export async function newsFeed(site: URL | undefined): Promise<Response> {
  if (!site) throw new Error('astro.config must set `site` to build the feed');
  const posts = await getNewsPosts();
  return rss({
    title: SITE_TITLE,
    description: `News from ${SITE_TITLE}`,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      link: newsPath(post),
      pubDate: post.data.date,
      description: plainText(excerptOf(post)),
    })),
    customData: '<language>en-us</language>',
  });
}

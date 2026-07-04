import type { APIRoute } from 'astro';
import { newsFeed } from '../../lib/feed';

export const GET: APIRoute = ({ site }) => newsFeed(site);

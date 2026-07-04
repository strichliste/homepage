import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { bootstrapContent } from './src/lib/satteri-bootstrap';

export default defineConfig({
  site: 'https://www.strichliste.org',
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [bootstrapContent] }),
    shikiConfig: { theme: 'github-light' },
  },
});

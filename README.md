[![Build Status](https://github.com/strichliste/homepage/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/strichliste/homepage/actions/workflows/build.yml)

### strichliste Homepage

[Astro](https://astro.build/)-based static homepage for strichliste.

#### Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run check    # type-check
```

#### Authoring

##### Create a new blogpost

Add a Markdown file under `src/content/news/` — its filename becomes the URL
(`my-post.md` → `/news/my-post/`):

```markdown
---
title: My post
date: 2026-07-04T09:00:00+02:00
---

Teaser paragraph shown on the homepage and in the feed.

<!--more-->

The rest of the post.
```

Everything above the optional `<!--more-->` marker (or the first paragraph)
is the teaser. Add `draft: true` to keep a post out of listings, feeds and
the build. The homepage lists the five newest posts and teasers the newest.

##### Create a content page

Standalone pages live in `src/content/pages/` (`/about/`, `/install/`, …),
documentation in `src/content/docs/` (ordered by their `order` frontmatter).
Frontmatter schemas are defined in `src/content.config.ts`.

##### Modifying the menu

Edit `NAV_ITEMS` in `src/consts.ts`.

#### Deployment

This homepage is auto-deployed using GitHub Actions. For details on the
deployment process, please check `.github/workflows/build.yml`. The site is
built on every push to `master` and on every pull request; deployment to the
`gh-pages` branch only happens upon new commits on the `master` branch.

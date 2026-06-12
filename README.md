[![Build Status](https://github.com/strichliste/homepage/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/strichliste/homepage/actions/workflows/build.yml)

### strichliste Homepage

[hugo](https://gohugo.io/)-based static homepage for strichliste.

#### Authoring

##### Create a new blogpost

In order to create a new blogpost, run `hugo new news/myblogpost.md`. Make sure
to set the draft status to false (only non-draft entries will be published).

`news` is the so-called section. You can set default frontmatter settings by
defining an archetype in the `archetype` folder. See the [hugo manual](https://gohugo.io/content/archetypes/)
for more information on this.

The title of the first 5 blogpost entries will be listed on the homepage; the
first one will be teasered (only the summary is shown).

##### Create a content page

Simply run `hugo new mysection/myentry.md` to create a new content page.

##### Modifying the menu

You can create menu entries by modifying `config.toml`.

#### Deployment

This homepage is auto-deployed using GitHub Actions. For details on the
deployment process, please check `.github/workflows/build.yml`. The site is
built on every push to `master` and on every pull request; deployment to the `gh-pages` branch
only happens upon new commits on the `master` branch.

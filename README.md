[![Build Status](https://travis-ci.org/strichliste/homepage.svg?branch=master)](https://travis-ci.org/strichliste/homepage)

### strichliste Homepage

[hugo](http://gohugo.io/)-based static homepage for strichliste.

#### Authoring

##### Create a new blogpost

In order to create a new blogpost, run `hugo new news/myblogpost.md`. Make sure
to set the draft status to false (only non-draft entries will be published).

`news` is the so-called section. You can set default frontmatter settings by
defining an archetype in the `archetype` folder. See the [hugo manual](http://gohugo.io/content/archetypes/)
for more information on this.

The title of the first 5 blgopost entries will be listed on the homepage; the
first one will be teasered (only the summary is shown).

##### Create a content page

Simply run `hugo new mysection/myentry.md` to create a new content page.

##### Modifying the menu

You can create menu entries by modifying `config.toml`.

#### Deployment

This homepage is auto-deployed using travis. For details on the deployment
process, please check `.travis.yml` and the `deploy.sh` script. Deployment
only happens upon new commits on the `master` branch.

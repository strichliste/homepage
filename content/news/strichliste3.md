---
title: "strichliste 3: one application, no separate frontend"
date: 2026-06-12T09:00:00+02:00
draft: false
---

The next generation of strichliste is here — and it is one application
again. The separate React frontend is gone: the Symfony backend now renders
the complete UI itself, with the same look and feel long-time users know.
One application to deploy instead of two.

<!--more-->

What's new:

* **Works without JavaScript** — every action is a real HTML form, so the
  kiosk stays usable on old donated tablets. JavaScript only layers comfort
  on top: snappier navigation, the barcode listener, the idle timer.
* **Modern stack** — PHP 8.4+ and Symfony 7.4 instead of PHP 7.1.
* **Docker first** — the repository ships a production-grade FrankenPHP
  setup; install and upgrade are the same single command. The image builds
  multi-arch and runs on a Raspberry Pi 4/5 (arm64).
* **Database your choice** — SQLite is now a fine default for small
  installs; the Docker setup bundles PostgreSQL, and MariaDB/MySQL works
  too.
* **Live API docs** — the REST API is documented as OpenAPI/Swagger, served
  by your own instance at `/api/doc`.
* **The API contract is frozen** — JSON shapes stay byte-compatible with
  strichliste v1.8, so existing barcode scanners, Android apps and space
  automations keep working unchanged.
* **Kiosk polish** — dark theme via `prefers-color-scheme`, booking sound,
  idle return to the user list, English and German localization.

Honest fine print: there is no tagged release of the rewrite yet — you
install it from the
[git repository](https://github.com/strichliste/strichliste-backend), and
the [demo](https://demo.strichliste.org) still runs strichliste 2. The
[install instructions](/install/) and [documentation](/docs/) on this site
already describe the new version.

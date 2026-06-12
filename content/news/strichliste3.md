---
title: "strichliste 3 is here"
date: 2026-06-12T09:00:00+02:00
draft: false
---

The next generation of strichliste is here: **one single application** with
the look and feel long-time users know. One thing to install, one thing to
update — and a lot of care for the screen by the fridge.

<!--more-->

What strichliste 3 brings to your club, hackerspace or kiosk:

* **Works without JavaScript** — every action is a real HTML form, so it
  stays usable on old donated tablets. JavaScript only layers comfort on
  top: snappier navigation, the barcode listener, the idle timer.
* **Modern stack** — built on PHP 8.4+ and Symfony 7.4.
* **Docker first** — the repository ships a ready-to-run Docker setup;
  install and upgrade are the same single command. The image builds
  multi-arch and runs on a Raspberry Pi 4/5 (arm64).
* **Database your choice** — SQLite is a fine default for small installs;
  the Docker setup bundles PostgreSQL, and MariaDB/MySQL works too.
* **Live API docs** — the REST API is documented as OpenAPI/Swagger, built
  into your own strichliste server at `/api/doc`.
* **Existing integrations keep working** — barcode scanners, Android apps
  and space automations talk to the same stable API; they keep working
  without any modification.
* **Made for the screen by the fridge** — a dark theme that follows your
  device, a booking sound, idle return to the user list, English and German
  localization.

strichliste 3 lives in the
[git repository](https://github.com/strichliste/strichliste-backend); the
[install instructions](/install/) and [documentation](/docs/) on this site
describe it.

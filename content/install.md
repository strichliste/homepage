+++
date = "2026-06-12T09:00:00+02:00"
draft = false
title = "Install strichliste"
description = "How to install strichliste 3: Docker (recommended) or classic bare metal."
[menu]
  [menu.main]
    parent = "Install"
+++

This page describes installing **strichliste 3**. The short version:
use Docker, set two values in `.env`, run one command. The
[README](https://github.com/strichliste/strichliste-backend#readme) is the
full operations manual (TLS options, every knob, backup & restore, upgrades,
rollback); this page is the orientation.

> **Security first:** everything — the UI, `/api/*`, and the Swagger UI at
> `/api/doc` — is unauthenticated by design. strichliste trusts the network
> like the kiosk trusts the room. Keep it restricted to your LAN/VPN at the
> firewall, or put a reverse proxy with HTTP basic auth in front.
> **Do not port-forward strichliste to the internet.**

## Try it in five minutes

With a current Docker (Engine 25+, Compose v2.30+):

```bash
git clone https://github.com/strichliste/strichliste-backend.git
cd strichliste-backend
docker compose up -d --build --wait
```

Open **https://localhost** (accept the one-time certificate warning, or run
`make tls` to trust the local CA). You get a dev environment with Postgres
and the database schema already migrated. Add a user, add an article under
*Article List*, buy it — that's the whole loop.

To wipe the dev data and start fresh: `docker compose down -v`, then `up`
again.

## Production with Docker (recommended)

The repository ships a production-grade container setup: FrankenPHP
(Caddy + PHP) running the app in worker mode — Symfony boots once and stays
resident, which a Raspberry-Pi-class kiosk box appreciates. The image is
multi-arch and works on arm64 (e.g. Pi 4/5 with a 64-bit OS).

1. Edit `.env`:
   * set a unique `APP_SECRET` (`openssl rand -hex 32`),
   * uncomment `COMPOSE_FILE=compose.yaml:compose.prod.yaml`, so a casual
     `docker compose up` later doesn't load the *development* override,
   * optionally set `SERVER_NAME`: a real hostname for automatic Let's
     Encrypt certificates (requires the box to be publicly reachable, which
     contradicts the LAN-only advice), `localhost` (default) for a
     self-signed local CA, or `":80"` for plain HTTP behind your own
     TLS-terminating proxy.

   Two things to know about `.env`: it is **git-tracked**, so your local
   edits must survive `git pull` (watch for conflicts when upgrading). And
   it gets **baked into the image** at build time — that is fine when the
   image is built and run on the same box, but never push such an image to
   a registry; for registry-based deploys pass `APP_SECRET` as a real
   environment variable instead.
2. Start it:

```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d --build --wait
# or: make prod
```

The container waits for the database and applies migrations on every boot —
first install and upgrades are the same command (`git pull && make prod`).
Health checks, restart policy and log rotation are preconfigured.

Note that there is **no prebuilt image on a registry** — NAS/Portainer
users build with `docker build --target frankenphp_prod` and push to their
own registry (mind the baked-`.env` warning above).

When something breaks, the page to open is `docker compose logs app` —
access log, PHP errors and the entrypoint's progress all go to container
output. For external uptime monitoring, probe `GET /api/settings` (cheap,
unauthenticated, returns 200 + JSON).

## Choosing a database

**SQLite**, **MySQL/MariaDB** and **PostgreSQL** are all supported — the
database is a connection-string choice, not a code choice:

* **SQLite** — perfect for a single kiosk in a small space; zero
  administration, one file to back up.
* **PostgreSQL / MariaDB** — pick one of these when several devices write at
  once or the instance is long-lived and busy.

**With Docker** it is a pure `.env` decision: the bundled Postgres is the
default; or set `DATABASE_URL` to any Doctrine DSN (SQLite file, external
MariaDB/MySQL or Postgres) and switch the bundled Postgres off with
`COMPOSE_PROFILES=` (empty). The image contains all three drivers, and the
container applies migrations on boot.

**On bare metal**, for example with **mysql/mariadb** on the same host:

```
DATABASE_URL="mysql://strichliste:32YourPassWord42@localhost/strichliste?serverVersion=10.11.2-MariaDB"
```

Create a database and a separate user:

```sql
CREATE DATABASE strichliste;
CREATE USER 'strichliste'@'localhost' IDENTIFIED BY '32YourPassWord42';
GRANT ALL PRIVILEGES ON strichliste.* TO 'strichliste'@'localhost';
FLUSH PRIVILEGES;
```

Then apply the schema:

```bash
php bin/console doctrine:migrations:migrate
```

## Bare metal (without Docker)

The classic setup still works, modernized:

1. **Requirements**: PHP ≥ 8.4 with `intl`, `ctype`, `iconv`, `json` and the
   PDO driver for your database (`pdo_sqlite`, `pdo_mysql` or `pdo_pgsql`);
   a web server with PHP-FPM.
2. **Get the code**: build from a git checkout (no release of the rewrite
   has been tagged yet — once releases exist, a tarball with bundled
   `vendor/` and pre-compiled assets will be the easier route):

```bash
composer install --no-dev --optimize-autoloader
php bin/console importmap:install
php bin/console asset-map:compile
```

3. **Configure the database** via environment (or `.env.local`) as shown
   above, then run the migrations.
4. **Configure the web server**: point the document root at `public/` and
   route everything through `public/index.php`. Working nginx (plain + SSL)
   and Apache examples live in the repository's
   [`examples/`](https://github.com/strichliste/strichliste-backend/tree/master/examples)
   directory.
5. Set `APP_ENV=prod`, `APP_DEBUG=0` and a unique `APP_SECRET` in the
   environment, then warm the cache: `php bin/console cache:clear`.
   Errors land in your PHP-FPM/web-server error log — the app does not
   write log files of its own.

## Common pitfalls

* Check your folder owner/group if you're using SQLite as your database!
  Otherwise strichliste can't write to it.
* JSON API requests need a `Content-Type: application/json` header — without
  it the body is silently ignored.

## Importing your old data

To import a **strichliste 1** `database.sqlite`, see the
[`app:import` command](/docs/commands/#import-a-strichliste-1-database).
**It wipes the target database first** — only run it on a fresh install.

## Before you rely on it for real money

Read the
[backup, upgrades & rollback section](https://github.com/strichliste/strichliste-backend#backup-upgrades-rollback)
in the README and set up the nightly backup *before* go-live. It is short,
tested, and the difference between "restore from last night" and a shoebox
full of receipts.

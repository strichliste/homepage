+++
date = "2026-06-12T09:00:00+02:00"
draft = false
title = "Install strichliste"
description = "How to install strichliste 3: with Docker (recommended) or directly on your own server."
[menu]
  [menu.main]
    parent = "Install"
+++

This page describes installing **strichliste 3**. The short version:
use Docker, set two values in `.env`, run one command. The
[README](https://github.com/strichliste/strichliste-backend#readme) is the
full operations manual (TLS options, every knob, backup & restore, upgrades,
rollback); this page covers the essentials.

> **Security first:** strichliste has no passwords anywhere — by design. It
> trusts the network like the kiosk trusts the room. Keep it reachable only
> inside your own network (LAN/VPN), or put a password-protecting proxy
> (HTTP basic auth) in front.
> **Do not port-forward strichliste to the internet.**

## Try it in five minutes

You need **git** and a **running Docker** (Engine 25+, Compose v2.30+ — any
recent Docker Desktop qualifies):

```bash
git clone https://github.com/strichliste/strichliste-backend.git
cd strichliste-backend
make up
```

`make up` is the plain `docker compose up -d --build --wait` with a generous
first-boot timeout — the initial build downloads all dependencies, which can
outlast Docker's default wait. No `make`? Run it directly and add the
timeout yourself:

```bash
docker compose up -d --build --wait --wait-timeout 300
```

The first `make up` builds the image and downloads dependencies, so it can
take a few minutes; later starts are quick. Then open **https://localhost**.
Your browser shows a one-time certificate warning (in Chrome: *Your
connection is not private* → **Advanced** → **Proceed to localhost**) — that
is just the self-signed local certificate, expected on localhost. To silence
it, run `make tls` once to trust the local CA (it asks for your password and
only affects this machine). You get a test setup with the database already
prepared. Add a user, add an article under *Article List*, buy it — that's
the whole loop.

If ports 80/443 are already taken on your machine, set `HTTP_PORT` /
`HTTPS_PORT` / `HTTP3_PORT` in `.env` and open the HTTPS port directly (e.g.
`https://localhost:8443`).

To wipe the dev data and start fresh: `docker compose down -v`, then `up`
again.

## Production with Docker (recommended)

The repository ships a ready-to-run production container. Under the hood it
uses FrankenPHP (a web server with PHP built in) and keeps the app loaded
between requests — so it stays fast even on a Raspberry Pi. The image works
on arm64 too (e.g. Pi 4/5 with a 64-bit OS).

1. Edit `.env`:
   * set a unique `APP_SECRET` (`openssl rand -hex 32`),
   * uncomment `COMPOSE_FILE=compose.yaml:compose.prod.yaml`, so that
     running plain `docker compose up` later doesn't accidentally start the
     development version,
   * optionally set `SERVER_NAME`. Three choices:
     * `localhost` (the default) — a self-signed certificate; browsers show
       a one-time warning.
     * `":80"` — plain HTTP, for when your own proxy handles HTTPS.
     * a real hostname — automatic Let's Encrypt certificates. This
       requires the box to be reachable from the internet, which goes
       against the LAN-only advice above, so most installs won't want it.

   Two things to know about `.env`: it is **git-tracked**, so your local
   edits must survive `git pull` (watch for conflicts when upgrading). And
   it gets **baked into the image** at build time — that is fine when the
   image is built and run on the same box, but never push such an image to
   a registry; for registry-based deploys pass `APP_SECRET` as a real
   environment variable instead. Because it is baked at build time, edit
   `.env` *before* your first production build — change it later and you
   must rebuild (`make prod`) for the new value to take effect.
2. Start it — either the raw command, or `make prod` (the better choice for
   upgrades: it also re-pulls the base images, so FrankenPHP/PHP and Postgres
   security patches arrive — a plain `up --build` reuses the cached base
   layers):

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

**With Docker** you choose the database in `.env`. The bundled Postgres is
the default. To use something else, set `DATABASE_URL` to your database's
connection string (an SQLite file, or an external MariaDB/MySQL or
Postgres) and turn the bundled Postgres off by setting `COMPOSE_PROFILES=`
to empty. The image contains all three drivers, and the container prepares
the database schema on boot. For example, single-container SQLite (stored in
the `app_var` volume — note the **four** slashes for an absolute path):

```dotenv
DATABASE_URL="sqlite:////app/var/data.db"
COMPOSE_PROFILES=
```

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
2. **Get the code**: build from a git checkout (tagged releases with a
   ready-built package will follow):

```bash
composer install --no-dev --optimize-autoloader
php bin/console importmap:install
php bin/console asset-map:compile
```

3. **Configure the database** via environment (or `.env.local`) as shown
   above, then run the migrations.
4. **Configure the web server**: point the document root at `public/` and
   route every request that isn't a real file through `public/index.php`.
   For Apache, the repository ships a ready rewrite rule in
   [`public/.htaccess.example`](https://github.com/strichliste/strichliste-backend/blob/master/public/.htaccess.example)
   — enable `mod_rewrite` and rename it to `.htaccess`. A minimal nginx
   server block:

   ```nginx
   server {
       listen 80;
       server_name strichliste.example.com;
       root /var/www/strichliste/public;

       location / {
           try_files $uri /index.php$is_args$args;
       }

       location ~ ^/index\.php(/|$) {
           # adjust to your PHP-FPM socket or 127.0.0.1:9000
           fastcgi_pass unix:/run/php/php-fpm.sock;
           fastcgi_split_path_info ^(.+\.php)(/.*)$;
           include fastcgi_params;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           fastcgi_param DOCUMENT_ROOT $realpath_root;
       }

       location ~ \.php$ { return 404; }
   }
   ```

   This is the standard Symfony layout; the
   [Symfony web-server docs](https://symfony.com/doc/current/setup/web_server_configuration.html)
   cover the TLS variant and the full Apache config.
5. Set `APP_ENV=prod`, `APP_DEBUG=0` and a unique `APP_SECRET` in the
   environment, then warm the cache: `php bin/console cache:clear`.
   Errors land in your PHP-FPM/web-server error log — the app does not
   write log files of its own.

## Common pitfalls

* Check your folder owner/group if you're using SQLite as your database!
  Otherwise strichliste can't write to it.
* JSON API requests need a `Content-Type: application/json` header — without
  it the body is silently ignored.

## Keeping your existing data

**Already running strichliste (2 or newer)?** There is **no import step** —
point `DATABASE_URL` at your existing database (SQLite file, MariaDB/MySQL
or Postgres) and start the app. The schema migrations detect a populated
database and bring it up to the current version safely on first boot. With
Docker that means copying the old SQLite file into the `app_var` volume, or
setting the DSN of your external server, and booting. **Back up first** —
and on MySQL/MariaDB the backup is your only safety net, because DDL there
isn't transactional and a half-finished migration can't roll itself back.

Coming from the much older **strichliste 1** (a different schema)? That one
*does* need a one-time conversion with the
[`app:import` command](/docs/commands/#import-a-strichliste-1-database). It
**replaces** all current data, so it refuses to run against a non-empty
database unless you pass `--force` — only convert into a fresh install.
(strichliste 1 is the original version from before the REST API existed; if
your current install already serves an `/api`, you are on 2 or newer and
need no import.)

## Before you rely on it for real money

Set up a nightly backup *before* go-live. With the bundled Postgres it is a
one-liner you can drop into cron:

```bash
docker compose exec database pg_dump -U strichliste strichliste > strichliste-$(date +%F).sql
```

If you use SQLite instead, snapshot it consistently even while running:

```bash
docker compose exec app php bin/console dbal:run-sql "VACUUM INTO '/app/var/backup.db'"
docker compose cp app:/app/var/backup.db strichliste-$(date +%F).db
```

The README's
[backup, upgrades & rollback section](https://github.com/strichliste/strichliste-backend#backup-upgrades-rollback)
covers restore and rollback in full. A tested backup is the difference
between "restore from last night" and a shoebox full of receipts.

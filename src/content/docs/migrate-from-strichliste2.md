---
title: Migrate from strichliste 2
description: Point strichliste 3 at your existing database — no export, no import.
order: 6
---

strichliste 3 starts directly on a strichliste 2 database. On first boot it
upgrades the schema and keeps all users, balances, articles and history.
The API is unchanged, so barcode scanners and apps keep working. The
separate web frontend is gone — strichliste 3 serves the UI itself.

## 1. Back up

Dump your database (`mysqldump` / `pg_dump`), or copy the SQLite file while
the old instance is stopped. Don't skip this: on MySQL/MariaDB a failed
migration cannot roll itself back — the backup is your only way out.

## 2. Point strichliste 3 at your database

Set up strichliste 3 as described in [Install](/install/), but before
starting it, set your existing database in `.env`. For an external
MySQL/MariaDB or Postgres:

```dotenv
DATABASE_URL="mysql://strichliste:secret@192.168.1.10:3306/strichliste?serverVersion=10.11.2-MariaDB&charset=utf8mb4"
COMPOSE_PROFILES=
```

`COMPOSE_PROFILES=` (empty) switches the bundled Postgres off.

Using an SQLite file? Point at the container volume:

```dotenv
DATABASE_URL="sqlite:////app/var/data.db"
COMPOSE_PROFILES=
```

then copy your file in after the first start (step 3):

```bash
docker compose cp ./your-old-data.db app:/app/var/data.db
docker compose restart app
```

## 3. Start it

```bash
make prod
```

The migrations run on boot. Open the site — your users and balances are
there.

## 4. Carry over your settings

strichliste 3 keeps the `strichliste.yaml` format. Copy your customized
values into `config/strichliste.yaml` — [Configuration](/docs/configuration/)
documents every key.

## Coming from strichliste 1?

That's a different schema and needs a one-time conversion — see the
[`app:import` command](/docs/commands/#import-a-strichliste-1-database).

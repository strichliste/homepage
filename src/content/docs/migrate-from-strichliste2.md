---
title: Migrate from strichliste 2
description: Point strichliste 3 at your existing database — no export, no import.
order: 6
---

strichliste 3 starts directly on a strichliste 2 database. On first boot it
upgrades the schema and keeps all users, balances, articles and history.
The API keeps its exact shape, so barcode scanners and apps keep working
(undo via the API now follows the
[payment.undo](/docs/configuration/#paymentundo) window). The separate web
frontend is gone — strichliste 3 serves the UI itself.

## 1. Stop strichliste 2 and back up

Stop the old instance first. Bookings made from now on would be lost, and
nothing may write to the database while the schema is upgraded.

Then back up. The database credentials are in the old install's `.env`:

```bash
mysqldump -u strichliste -p strichliste > strichliste2-backup.sql   # MariaDB/MySQL
pg_dump -U strichliste strichliste > strichliste2-backup.sql        # Postgres
# SQLite: copy the database file
```

Don't skip this. On MySQL/MariaDB a failed migration cannot roll itself
back — restoring this dump and restarting strichliste 2 is your only way
back.

## 2. Point strichliste 3 at your database

On the machine that will run strichliste 3 — a new one is fine, it only
needs to reach the database — follow
[Production with Docker](/install/#production-with-docker-recommended)
including the `COMPOSE_FILE` line, but **don't start it yet**. First set
your database in `.env`:

```dotenv
DATABASE_URL="mysql://strichliste:secret@192.168.1.10:3306/strichliste?serverVersion=10.11.2-MariaDB&charset=utf8mb4"
COMPOSE_PROFILES=
```

* User, password and database name come from the old install's `.env`.
  Replace `10.11.2-MariaDB` with your server's version (`SELECT VERSION();`).
* Use the database host's LAN IP, not `localhost` — inside the container,
  localhost is the container. The database must accept connections from
  that address (MariaDB: `bind-address` and the user's host grant).
* `COMPOSE_PROFILES=` (empty) switches the bundled Postgres off.

For an SQLite file:

```dotenv
DATABASE_URL="sqlite:////app/var/data.db"
COMPOSE_PROFILES=
```

Only a Postgres dump and no running server? Keep
`COMPOSE_PROFILES=database` and restore into the bundled Postgres — see
["Reusing an existing database" in the README](https://github.com/strichliste/strichliste-backend#reusing-an-existing-database).

## 3. Start it

```bash
make prod
```

The first boot takes a few minutes — watch the migrations finish with
`docker compose logs -f app`. If they fail, the app doesn't come up:
restore your backup and restart strichliste 2.

**SQLite only:** the first start created a fresh database — now replace it
with your file and restart:

```bash
docker compose cp ./your-old-data.db app:/app/var/data.db
docker compose exec -u root app chown www-data /app/var/data.db
docker compose restart app
```

(The `chown` is needed because `docker compose cp` leaves the file
root-owned and the app runs as `www-data`.)

Open the site — your users and balances are there.

## 4. Carry over your settings

strichliste 3 keeps the `strichliste.yaml` format. Copy your customized
values from the old install's `config/strichliste.yaml` into the same file
in the new checkout, then run `make prod` again — the file is baked into
the image. [Configuration](/docs/configuration/) documents every key and a
bind-mount alternative.

## Afterwards

The old strichliste 2 app and its web frontend can be removed. The
database stays where it is — strichliste 3 keeps using it.

Coming from strichliste 1? That's a different schema and needs a one-time
conversion: [`app:import`](/docs/commands/#import-a-strichliste-1-database).

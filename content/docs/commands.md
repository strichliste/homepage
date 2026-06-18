+++
date = "2026-06-12T09:00:00+02:00"
draft = false
weight = 20
title = "Console commands"
description = "Command-line tools: import, user cleanup, deleting old data, LDAP import."
[menu]
  [menu.main]
    parent = "Docs"
+++

Run with `php bin/console …` — inside Docker:

```bash
docker compose exec app php bin/console …
```

| Command | Purpose |
| --- | --- |
| `app:import <file>` | Import a strichliste 1 `database.sqlite`. **Replaces all data** — refuses a non-empty database without `--force`. |
| `app:user:status <user> <true\|false>` | Deactivate (`true`) or reactivate (`false`) an account, by name or id. |
| `app:user:cleanup` | Bulk-disable accounts inactive for longer than an interval. |
| `app:retire-data` | **Delete** transactions older than an interval — the data-privacy tool. |
| `app:ldapimport` | Create/update users from an LDAP directory (cron-able). |
| `cache:clear` | Apply `strichliste.yaml` changes (bare metal; the Docker entrypoint does this on boot). |
| `doctrine:migrations:migrate` | Apply schema migrations (automatic in Docker). |

## Import a strichliste 1 database

> **For migrating from strichliste 1 only.** If you are already on
> strichliste 2 or newer, do **not** use this — point `DATABASE_URL` at
> your existing database and start the app; the migrations run safely on it
> (see [Install](/install/#keeping-your-existing-data)).

```bash
php bin/console app:import database.sqlite
```

**This replaces all data** — every existing user, transaction *and* article
is deleted before the import. To guard against accidents it **refuses to run
against a non-empty database unless you pass `--force`**, so only convert
into a fresh install. It imports users and transactions; the product list is
entered by hand afterwards. After a successful import the terminal outputs
"Import done!".

| argument / option | description |
| --- | --- |
| `<file>` | strichliste 1 SQLite database to import |
| `--force` | Required when the target database already holds data (wipes it) |

Importing into Docker — the file must be inside the container:

```bash
docker compose cp database.sqlite app:/tmp/old.sqlite
docker compose exec app php bin/console app:import /tmp/old.sqlite
```

There is **no CSV / paper-list importer**. The practical route is a small
shell loop over the [API](/docs/api/): `POST /api/user` per member, then
`POST /api/user/{id}/transaction` with the opening balance.

## User status

Deactivates or reactivates a user account by id or name. Note the second
argument is `disable`, so the sense is inverted: **`true` deactivates** the
account, `false` brings it back.

```bash
php bin/console app:user:status <userId> <disable>
```

| argument | description |
| --- | --- |
| userId | username or id |
| disable | `true` deactivates the account, `false` reactivates it |

## Cleanup accounts

Bulk-disable accounts that have been unused for a while:

```bash
php bin/console app:user:cleanup --days=3 --months=10 --maxBalance=300 --confirm
```

| option | description |
| --- | --- |
| days / months / years | Inactivity interval |
| minBalance / maxBalance | Only touch accounts within this balance range (cents) |
| confirm | Skip the confirmation question |

## Retire data

Deletes transactions older than the given interval — useful for data
privacy (GDPR retention). Check your bookkeeping retention duties before
deleting financial records.

```bash
php bin/console app:retire-data --days=3 --months=10 --confirm
```

| option | description |
| --- | --- |
| days / months / years | Age threshold |
| confirm | Skip the confirmation question |

## Import from LDAP

**Attention:** this command needs the `symfony/ldap` package, which is not
included by default (and not available in the stock Docker image). Inside
your installation run:

```bash
composer require symfony/ldap
```

Bare minimum example:

```bash
php bin/console app:ldapimport --host=ldap.company.tld \
  --bindDn="cn=reader,ou=ldapuser,dc=company" \
  --password="yourpass" --baseDn="ou=employee,dc=company"
```

| option | description |
| --- | --- |
| host | hostname or IP |
| port | port of your LDAP server (default: 636) |
| ssl | none, ssl or tls (default: ssl) |
| bindDn | LDAP user |
| password | Password |
| baseDn | LDAP base DN |
| query | LDAP filter query (default: `($userField=*)`) |
| userField | Username field (default: `uid`) |
| emailField | Mail address field (default: off) |
| update | Update the mail address if the user exists (default: off) |

You can run this command as a cronjob to pick up changes in your LDAP
directory, e.g. new members or changed mail addresses.

## Getting data out

For backups and exports, see the backup commands in the
[README](https://github.com/strichliste/strichliste-backend#readme) (SQL
dump / SQLite file) — or read everything as JSON via the
[API](/docs/api/). There is no dedicated export command.

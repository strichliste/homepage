---
title: Frequently Asked Questions
description: Common questions about strichliste, answered.
---

## Documentation

New here? Start with the [getting started tutorial](/docs/getting-started/).
Reference documentation lives on this site:
[configuration](/docs/configuration/), [console commands](/docs/commands/),
the [REST API](/docs/api/) and a guide for
[the screen by the fridge](/docs/screen/). The interactive API documentation
(Swagger UI) is built into your own strichliste server at `/api/doc`.

## Is there a login or admin role?

No — by design. strichliste is a digital tally sheet, not a banking product.
Anyone at the kiosk can book on any account, just like anyone could make a
pencil mark on paper. So keep it on a trusted network only.

## Can I make it reachable from the internet?

Don't. Nothing in strichliste is password-protected — not the pages, not the
API. Keep it inside your own network (LAN/VPN), or put a password-protecting
proxy in front. See [Install](/install/) for details.

## Does the PayPal feature verify payments?

No. It's a payment *link*, not a verified payment integration: the account is
credited when the member returns from PayPal, but strichliste cannot confirm
the payment completed. Reconcile your PayPal account against the books, the
same way you compare the cash box against the metrics page.

## What about my members' data (GDPR)?

strichliste stores names, optional e-mail addresses, and a complete log of who
booked what and when — visible to everyone at the kiosk. That is personal
data: tell your members, mention it in your privacy notice, and decide a
retention period. The [`app:retire-data` command](/docs/commands/#retire-data)
deletes transactions older than a chosen interval — but check your bookkeeping
retention duties before deleting financial records.

## I already run strichliste — do I need to import anything to upgrade?

No. From strichliste 2 onwards there is no import step: point `DATABASE_URL`
at your existing database (SQLite, MariaDB/MySQL or Postgres) and start the
app — the migrations bring it up to date safely on first boot. Back up first.
Step by step: [Migrate from strichliste 2](/docs/migrate-from-strichliste2/).

## How do I import my old strichliste 1 data?

The much older strichliste 1 used a different schema, so it needs a one-time
conversion with the
[`app:import` command](/docs/commands/#import-a-strichliste-1-database). It
replaces all data and refuses to run against a non-empty database without
`--force`, so only run it on a fresh install.

## How to get in touch?

Question the documentation doesn't answer? Open an issue on the
[GitHub issue tracker](https://github.com/strichliste/strichliste-backend/issues).

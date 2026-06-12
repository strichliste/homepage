+++
date = "2026-06-12T09:00:00+02:00"
draft = false
title = "Frequently Asked Questions"
description = "Common questions about strichliste, answered."
[menu]
  [menu.main]
    parent = "FAQ"
+++

## Documentation

The reference documentation lives on this site now:
[configuration](/docs/configuration/), [console commands](/docs/commands/),
the [REST API](/docs/api/) and a guide for
[the screen by the fridge](/docs/screen/). The interactive API
documentation (Swagger UI) is built into your own strichliste server at
`/api/doc`.

## Is there a login or admin role?

No — by design. strichliste is a digital tally sheet, not a banking
product. Anyone standing at the kiosk can book on any account, just like
anyone could make a pencil mark on paper. So: put it on a trusted network
only.

## Can I make it reachable from the internet?

Please don't. Nothing in strichliste has password protection — neither the
pages nor the API. Keep strichliste inside your own network (LAN/VPN), or
put a password-protecting proxy in front. See [Install](/install/) for
details.

## Does the PayPal feature verify payments?

No. It is a payment *link*, not a verified payment integration: the account
is credited when the member returns from PayPal, but strichliste cannot
verify the payment really completed. Reconcile your PayPal account against
the books — the same way you compare the cash box against the metrics page.

## What about my members' data (GDPR)?

strichliste stores names, optional e-mail addresses, and a complete log of
who booked what and when — visible to everyone at the kiosk. That is
personal data: tell your members, mention it in your privacy notice, and
decide a retention period. The
[`app:retire-data` command](/docs/commands/#retire-data) deletes
transactions older than a chosen interval — but check your bookkeeping
retention duties before deleting financial records.

## How do I import my old strichliste 1 data?

With the [`app:import` command](/docs/commands/#import-a-strichliste-1-database).
Mind that it wipes the target database first.

## How to get in touch?

If you have any questions which are not answered by the documentation,
please open an issue on the
[GitHub issue tracker](https://github.com/strichliste/strichliste-backend/issues).

+++
date = "2026-06-12T09:00:00+02:00"
draft = false
title = "What is this project about?"
description = "strichliste is the digital tally sheet for hackerspaces, club rooms and small offices."
[menu]
  [menu.main]
    parent = "About"
+++

_strichliste_ ([ʃtʀɪçˈlɪstə], German for *tally sheet*) replaces the paper
list next to the fridge in a hackerspace, club room or small office. Members
pick their name on a shared screen, tap what they took or how much money they
put in the cash box, and strichliste tracks everyone's balance.

It runs on the same trust as a paper list: **no logins, passwords or roles**.
Anyone at the kiosk can book on any account, just like anyone could make a
pencil mark on paper. Over paper you gain correct arithmetic, an undo button,
statistics, and an API for barcode scanners and phone apps.

![The user list — what the screen by the fridge shows by default](/img/screenshots/user-list.png)

## Feature tour

* **User accounts** — anyone can add themselves with just a name (optionally
  an e-mail). Users inactive for a while move to an "inactive" tab and
  reappear on their next booking.
* **Deposit / dispense** — put money in or take it out, via configurable
  one-tap buttons or a free amount field. Balances may go negative down to a
  limit you set.
* **Articles with barcodes** — keep a product list ("Club-Mate, 1.50 €") and
  buy with one tap. A USB barcode scanner works on a user's page without
  drivers or setup.
* **Undo** — every transaction has an undo button for a configurable grace
  period.
* **Transfers and split invoice** — send money to another account with an
  optional comment, or split one order across several members in one step.
* **Statistics** — a system metrics page (sum of all balances for cash-box
  reconciliation, transaction volume, top articles) and a personal metrics
  page per user.
* **Search** — find users and articles from the header on every page.
* **PayPal top-up** *(optional)* — users can settle their balance via
  paypal.me-style payment links, with a configurable percentage fee passed on
  to the payer.
* **Touch-friendly UI** — touch targets sized for fingers, a dark theme that
  follows the device's dark-mode preference, a booking sound, and an idle
  timer that returns the screen to the user list.
* **Localization** — English and German, with the configured currency used
  everywhere.
* **REST API + OpenAPI docs** — everything above is scriptable; see the
  [API documentation](/docs/api/).

![A user's page with the buy tab open](/img/screenshots/user-buy.png)

![The metrics page: sum of all balances, transaction volume and top articles](/img/screenshots/metrics.png)

## Architecture

strichliste is **one application** — one thing to install, one thing to
update (PHP 8.4+, Symfony 8.1). It serves two faces:

* **The web UI** — server-rendered pages for a wall-mounted touchscreen.
  It is **fully operable without JavaScript** — every action is a real HTML
  form, so old donated tablets still work. JavaScript only adds comfort:
  snappier navigation, the barcode listener, the idle timer.
* **The REST API** at `/api/*` for third-party clients (Android apps, DIY
  hardware, automation scripts). It is **stable**, so existing integrations
  keep working.

Switching databases is a one-line setting: **SQLite** for a single kiosk in a
small space, **PostgreSQL or MariaDB/MySQL** when several devices write at
once. All money is integer cents — no floating-point anywhere.

Development happens in the
[strichliste-backend](https://github.com/strichliste/strichliste-backend)
repository.

## Demo

A public demo runs at [demo.strichliste.org](https://demo.strichliste.org/).

## Troubleshooting

Found a problem? File an issue on the
[GitHub issue tracker](https://github.com/strichliste/strichliste-backend/issues).

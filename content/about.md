+++
date = "2026-06-12T09:00:00+02:00"
draft = false
title = "What is this project about?"
description = "strichliste is the digital tally sheet for hackerspaces, club rooms and small offices."
[menu]
  [menu.main]
    parent = "About"
+++

_strichliste_ ([ʃtʀɪçˈlɪstə], the German word for *tally sheet*) replaces the
paper tally sheet next to the fridge in a hackerspace, club room or small
office. Members pick their name on a shared screen, tap what they took (a
drink, a snack) or how much money they put into the cash box, and strichliste
keeps everyone's balance.

It is built around the same trust a paper list has — **there are no logins,
passwords or user roles**. Anyone standing at the kiosk can book on any
account, just like anyone could make a pencil mark on paper. What you gain
over paper is arithmetic that is always correct, an undo button, statistics,
and an API for barcode scanners and phone apps.

![The user list — what the screen by the fridge shows by default](/img/screenshots/user-list.png)

## Feature tour

* **User accounts** — anyone can add themselves at the kiosk with just a name
  (optionally an e-mail). Users who haven't booked anything for a while are
  tucked away on an "inactive" tab and reappear on their next booking.
* **Deposit / dispense** — put money in or take money out, via configurable
  one-tap amount buttons or a free amount field. Balances may go negative
  down to a configurable limit, so "I'll pay next week" works — but only up
  to the boundary you set.
* **Articles with barcodes** — maintain a product list ("Club-Mate, 1.50 €")
  and buy with one tap. A USB barcode scanner works on a user's page without
  drivers or configuration.
* **Undo** — every transaction shows an undo button for a configurable grace
  period, so a slipped finger is not a treasury incident.
* **Transfers and split invoice** — send money to another account with an
  optional comment, or split one group order across any set of members in
  one step.
* **Statistics** — a metrics page for the whole system (sum of all balances
  for cash-box reconciliation, transaction volume, top articles) and a
  personal metrics page per user.
* **Search** — find users and articles from the header on every page.
* **PayPal top-up** *(optional)* — users can settle their balance via
  paypal.me-style payment links, with a configurable percentage fee passed on
  to the payer.
* **Touch-friendly UI** — touch targets sized for fingers, a dark theme that
  follows the device's dark-mode preference, a booking sound, and an idle
  timer that returns the screen to the user list.
* **Localization** — the interface ships in English and German and follows
  the configured currency everywhere.
* **REST API + OpenAPI docs** — everything above is also scriptable; see the
  [API documentation](/docs/api/).

![A user's page with the buy tab open](/img/screenshots/user-buy.png)

![The metrics page: sum of all balances, transaction volume and top articles](/img/screenshots/metrics.png)

## Architecture

strichliste is **one single application** — one thing to install, one thing
to update. (For the curious: PHP 8.4+, Symfony 7.4.) That one application
serves two faces:

* **The web UI** — server-rendered pages designed for a wall-mounted
  touchscreen.
  It is **fully operable without JavaScript** — every action is a real HTML
  form, so it stays usable on old donated tablets. JavaScript only layers
  comfort on top: snappier navigation, the barcode listener, the idle timer.
* **The REST API** at `/api/*` for third-party clients (Android apps, DIY
  hardware, space-automation scripts). The API is **stable**, so existing
  integrations keep working.

strichliste works with several databases, and switching is a one-line
setting: **SQLite** is a fine default for a single kiosk in a small space,
**PostgreSQL or MariaDB/MySQL** are the better pick when several devices
write at once. Everything monetary is an integer number of cents — there is
no floating-point money anywhere.

Development happens in the
[strichliste-backend](https://github.com/strichliste/strichliste-backend)
repository.

## Demo

That's what you're here for, right? A public demo runs at
[demo.strichliste.org](https://demo.strichliste.org/).

## Troubleshooting

In case of problems, please file an issue on our
[GitHub issue tracker](https://github.com/strichliste/strichliste-backend/issues).

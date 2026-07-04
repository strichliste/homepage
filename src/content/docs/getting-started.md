---
title: Getting started
description: Set up a test instance and make your first booking.
order: 1
---

In about fifteen minutes you'll have strichliste running on your own
computer and book your first drink. You need [git](https://git-scm.com/)
and a running [Docker](https://www.docker.com/products/docker-desktop/).

## 1. Start strichliste

```bash
git clone https://github.com/strichliste/strichliste-backend.git
cd strichliste-backend
make up
```

The first start builds everything and takes a few minutes. No `make`? Run
`docker compose up -d --build --wait --wait-timeout 300` instead.

Open **https://localhost**. The browser warns about the certificate once —
that's the self-signed localhost certificate, expected here. In Chrome:
*Advanced* → *Proceed to localhost*.

## 2. Create a user

Click **Add user** and enter a name — that's the whole account. No
password, no e-mail. This is how members will add themselves at the kiosk.

## 3. Add an article

Articles are the things people buy — the price list. Open **Article List**
in the header, click **Add article**, and create one: name "Club-Mate",
price 1.50.

## 4. Book something

Back on the start page, tap your user. On the **Buy article** tab, tap
Club-Mate — your balance drops to −1.50 €.

Now put money in: under **Deposit**, tap +5.00 € (or use the custom amount
field). Balance: 3.50 €. That's the everyday loop at the kiosk: tap your
name, tap what you took, drop coins in the cash box now and then.

## 5. Undo a mistake

Tap the undo arrow next to a recent transaction. Bookings stay undoable
for 5 minutes (configurable) — after that they are final.

## Where next?

* [Install](/install/) — run it for real: production setup, choosing a
  database, backups.
* [Configuration](/docs/configuration/) — currency, balance limits,
  one-tap amounts, PayPal top-up.
* [The screen by the fridge](/docs/screen/) — turn a tablet or Raspberry
  Pi into the kiosk, with a barcode scanner.

Done playing? `docker compose down -v` removes the test instance and
**all its data**.

---
title: Getting started
description: Set up a test instance and make your first booking.
order: 1
---

In about fifteen minutes you'll have strichliste running on your own
computer and your first drink booked. You need
[git](https://git-scm.com/downloads) and
[Docker Desktop](https://www.docker.com/products/docker-desktop/) —
install both, then start Docker Desktop.

## 1. Start strichliste

Open a terminal (Terminal on macOS, PowerShell on Windows) and run:

```bash
git clone https://github.com/strichliste/strichliste-backend.git
cd strichliste-backend
make up
```

The first start builds everything and takes a few minutes. Two common
errors: `make: command not found` — run
`docker compose up -d --build --wait --wait-timeout 300` instead;
"Cannot connect to the Docker daemon" — Docker Desktop isn't running.
Ports 80/443 already taken? Set `HTTP_PORT`/`HTTPS_PORT` in `.env`
([Install](/install/) has details).

When the command finishes, open **https://localhost**. The browser warns
about the certificate once — that's the self-signed localhost certificate,
expected here. In Chrome: *Advanced* → *Proceed to localhost*; other
browsers word it similarly.

## 2. Create a user

Click **Add user** and enter a name — that's the whole account. No
password, no e-mail. This is how members will add themselves at the kiosk.

## 3. Add an article

Articles are the things people buy — the price list. Open **Article List**
in the header, click **Add article**, and create one: name "Club-Mate",
price 1.50.

## 4. Book something

Back on the start page, tap your user. On the **Buy article** tab, tap
Club-Mate — your balance drops to -€1.50.

Now put money in: under **Deposit**, tap **+€5.00** (or use the custom
amount field). Balance: €3.50. That's the everyday loop at the kiosk: tap
your name, tap what you took, drop coins in the cash box now and then.

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

Everything runs in the `strichliste-backend` folder: `docker compose down`
stops it, `make up` brings it back. Done playing?
`docker compose down -v` removes it with **all data**.

+++
date = "2026-06-12T09:00:00+02:00"
draft = false
weight = 40
title = "Building the kiosk"
description = "The screen by the fridge: hardware, kiosk browser, barcode scanners."
[menu]
  [menu.main]
    parent = "Docs"
+++

The server is half the job — the other half is the screen by the fridge.
strichliste's part is ready (touch-sized buttons, a no-JS fallback for weak
hardware, a dark theme via `prefers-color-scheme`, idle return to the user
list); the OS side is yours.

## Hardware

A Raspberry Pi 4/5 with a 64-bit OS runs server *and* fullscreen browser at
once (4 GB RAM comfortably; 2 GB if the server runs elsewhere). Older
32-bit Pis: run the server elsewhere and use the Pi only as a browser
terminal. Any old tablet pointed at the server works too — the UI works
without JavaScript, so even ancient browsers hold up.

## Kiosk browser

The usual recipe is Chromium in kiosk mode:

```bash
chromium --kiosk --noerrdialogs --disable-pinch \
  --autoplay-policy=no-user-gesture-required \
  https://your-server/user/active
```

plus `unclutter` to hide the cursor and disabling screen blanking.
Ready-made kiosk distributions (FullPageOS, porteus-kiosk, a Wayland `cage`
session) all work — strichliste is just a web page. The `--autoplay-policy`
flag is what allows the booking sound; `--force-dark-mode` forces the dark
theme on a screen that runs at night.

There is no kiosk lockdown in strichliste itself — preventing people from
browsing elsewhere is the kiosk browser's job. strichliste also does not
ship an on-screen keyboard; for adding users on a pure touchscreen, enable
the OS keyboard (`squeekboard`, `onboard`, or the tablet's native one).

## Barcode scanner

Any scanner that presents as a **USB/Bluetooth HID keyboard** works — scans
are recognized by their fast keystroke burst (keys < 200 ms apart, ending
with Enter, ≥ 3 characters), so no driver or configuration is needed.
Precisely:

* Scanning works **on a user's detail page only** — the flow at the fridge
  is: tap your name, scan the bottle. (Set
  [`article.autoOpen: true`](/docs/configuration/#article) so the page
  opens on the buy tab — that's the intended scanner-kiosk mode.)
* An unknown barcode shows an "unknown barcode" message and changes nothing.
* To teach an article its barcode: open the article's edit page, click the
  barcode field, scan into it.
* Serial (RS-232/USB-CDC) scanners and very slow Bluetooth scanners that
  type with > 200 ms between keys are **not** recognized — wrap them with a
  small script against the [API](/docs/api/) instead.

## Offline behavior

There is none — no service worker, no offline queue. If the kiosk loses the
server, the browser shows an error page until it reconnects. The practical
mitigation is the recommended setup anyway: run server and kiosk on the
same box (SQLite), and the Wi-Fi stops mattering.

## Integrations

* **NFC/RFID member cards**: not built in. A popular DIY pattern: card
  reader → look up the member (`GET /api/user/search?query=…`) → point the
  kiosk browser at `/user/{id}`.
* **Space dashboard**: `GET /api/metrics` serves the global numbers (sum of
  balances, transaction counts, top articles) as JSON.
* **Events/MQTT**: strichliste emits no webhooks or MQTT messages —
  integrations poll the [API](/docs/api/).

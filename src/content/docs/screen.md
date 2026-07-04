---
title: The screen by the fridge
description: Hardware, fullscreen browser and barcode scanners for the screen at your kiosk.
order: 5
---

The server is half the job; the screen by the fridge is the other half.
strichliste's part is ready: big touch buttons, works without JavaScript on
weak hardware, a dark theme that follows the device, and a return to the user
list when idle. Setting up the device is up to you.

## Hardware

A Raspberry Pi 4/5 with a 64-bit OS runs server *and* fullscreen browser at
once (4 GB RAM comfortably; 2 GB if the server runs elsewhere). On older
32-bit Pis, run the server elsewhere and use the Pi only as a browser
terminal. Any old tablet pointed at the server works too — the UI needs no
JavaScript, so even ancient browsers hold up.

## Fullscreen browser

The usual recipe is Chromium in "kiosk mode" — the browser's name for
fullscreen without any controls:

```bash
chromium --kiosk --noerrdialogs --disable-pinch \
  --autoplay-policy=no-user-gesture-required \
  https://your-server/user/active
```

Add `unclutter` to hide the cursor, and disable screen blanking. Ready-made
kiosk systems (FullPageOS, Porteus Kiosk, a Wayland `cage` session) work too —
strichliste is just a web page. `--autoplay-policy` enables the booking sound;
`--force-dark-mode` forces the dark theme on a screen that runs at night.

strichliste has no lockdown — stopping people from browsing elsewhere is the
browser's job. It also ships no on-screen keyboard; for adding users on a pure
touchscreen, enable the OS keyboard (`squeekboard`, `onboard`, or the tablet's
native one).

## Barcode scanner

Any scanner that presents as a **USB/Bluetooth HID keyboard** works. Scans are
recognized by their fast keystroke burst (keys < 200 ms apart, ending with
Enter, ≥ 3 characters), so no driver or configuration is needed:

* Scanning works **on a user's detail page only** — the flow at the fridge is:
  tap your name, scan the bottle. (Set
  [`article.autoOpen: true`](/docs/configuration/#article) so the page opens
  on the buy tab — the intended setup for scanning.)
* An unknown barcode shows an "unknown barcode" message and changes nothing.
* To teach an article its barcode: open the article's edit page, click the
  barcode field, scan into it.
* Serial (RS-232/USB-CDC) scanners and very slow Bluetooth scanners that type
  with > 200 ms between keys are **not** recognized — wrap them with a small
  script against the [API](/docs/api/) instead.

## Offline behavior

There is none — no service worker, no offline queue. If the screen loses the
server, the browser shows an error page until it reconnects. The fix is the
recommended setup anyway: run server and screen on the same box (SQLite), and
Wi-Fi stops mattering.

## Integrations

* **NFC/RFID member cards**: not built in. A popular DIY pattern: card reader →
  look up the member (`GET /api/user/search?query=…`) → point the browser at
  `/user/{id}`.
* **Space dashboard**: `GET /api/metrics` serves the global numbers (sum of
  balances, transaction counts, top articles) as JSON.
* **Events/MQTT**: strichliste emits no webhooks or MQTT messages —
  integrations poll the [API](/docs/api/).

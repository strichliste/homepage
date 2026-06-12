+++
date = "2026-06-12T09:00:00+02:00"
draft = false
weight = 10
title = "Configuration"
description = "Every setting in config/strichliste.yaml, with defaults."
[menu]
  [menu.main]
    parent = "Docs"
+++

All application-level behavior is configured in **one file**,
`config/strichliste.yaml`, under the `parameters.strichliste` key. The same
values drive the web UI **and** are exposed verbatim to API clients via
`GET /api/settings`.

Applying changes:

* **Bare metal**: edit the file, then `php bin/console cache:clear`.
* **Docker**: bind-mount your copy into the `app` service — the entrypoint
  recompiles the cache on every boot, so a restart applies it. See the
  README section *"Settings without rebuilding"* for the exact snippet.

Two recurring datatypes:

* **money** — always integer **cents**: `1000` = 10.00 €. There is no
  floating-point money anywhere.
* **timeperiod** — a PHP relative date string like `'5 minute'`,
  `'10 day'`, `'2 week'`
  ([format reference](https://www.php.net/manual/en/datetime.formats.relative.php)).

## article

| key | type | default | what it does |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Master switch for the article system. Off: no *Buy* tab on user pages, no article routes in the UI. |
| `autoOpen` | bool | `false` | When on, a user's page opens directly on the *Buy* tab — the intended mode for scanner kiosks. |

## common

| key | type | default | what it does |
| --- | --- | --- | --- |
| `idleTimeout` | int (ms) | `30000` | After this many milliseconds without input, the kiosk returns to the user list — so the screen is never left on someone's account page. `0` disables. (Needs JavaScript; without JS there is simply no auto-return.) |

## paypal

| key | type | default | what it does |
| --- | --- | --- | --- |
| `enabled` | bool | `false` | Show a PayPal top-up option on user pages. **Change `recipient` before enabling** — the shipped placeholder is a stranger's address. |
| `recipient` | string | `foo@bar.de` (placeholder!) | The receiving PayPal account (e-mail address). |
| `fee` | int (percent) | `0` | Percentage added **on top** of the chosen amount and paid by the user, so PayPal's cut doesn't drain the cash box. Example: top-up 10 €, `fee: 3` → user pays 10.30 €, account is credited 10 €. |

Note: the account is credited when the member returns from PayPal via a
signed, single-use return link. strichliste does **not** verify with PayPal
that the money arrived — reconcile your PayPal account against the books.

## user

| key | type | default | what it does |
| --- | --- | --- | --- |
| `stalePeriod` | timeperiod | `'10 day'` | Users with no transaction within this period are moved to the *inactive* tab (they are hidden, not deleted, and return on their next booking). |

## i18n

| key | type | default | what it does |
| --- | --- | --- | --- |
| `dateFormat` | string | `'YYYY-MM-DD HH:mm:ss'` | Display format for timestamps. |
| `timezone` | string | `'auto'` | Timezone for display; `auto` uses the server/browser default. |
| `language` | string | `'en'` | UI language. Shipped: `en`, `de`. |
| `currency.name` | string | `'Euro'` | Currency name. |
| `currency.symbol` | string | `'€'` | Symbol shown next to every amount. |
| `currency.alpha3` | string | `'EUR'` | ISO 4217 code (used e.g. for PayPal). |

## account.boundary

| key | type | default | what it does |
| --- | --- | --- | --- |
| `upper` | money or `false` | `20000` | Maximum balance (200 €). Transactions that would exceed it are rejected. `false` = no limit. |
| `lower` | money or `false` | `-20000` | Minimum balance (−200 €) — i.e. **the credit line you extend to every member**. Decide this consciously before go-live. `false` = no limit. |

## payment.undo

| key | type | default | what it does |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Show an undo button on recent transactions (in the web UI). |
| `delete` | bool | `false` | `false`: the undone transaction stays in the history, marked as reverted. `true`: undo removes it from the database entirely — **bad for auditability; leave it off if a treasurer ever has to check the books.** |
| `timeout` | timeperiod or `false` | `'5 minute'` | How long a transaction stays undoable in the UI. `false` = forever. |

Note: these settings govern the **web UI**. The legacy API's
`DELETE …/transaction/{id}` honors the frozen v1.8 contract and reverts
regardless of `enabled`/`timeout` — one more reason the API must only be
reachable from a trusted network.

## payment.boundary

| key | type | default | what it does |
| --- | --- | --- | --- |
| `upper` | money or `false` | `15000` | Largest single transaction (150 €) — guards against an accidental extra zero. `false` = no limit. |
| `lower` | money or `false` | `-2000` | Largest single deduction (−20 €). `false` = no limit. |

## payment.transactions

| key | type | default | what it does |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Allow user-to-user transfers (with optional comment). |

## payment.splitInvoice

| key | type | default | what it does |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Enable the *Split invoice* page (divide one amount across several users). |

## payment.deposit / payment.dispense

Deposit = putting money in; dispense = taking money out. Both share the same
shape:

| key | type | default | what it does |
| --- | --- | --- | --- |
| `enabled` | bool | `true` | Show this action on user pages. |
| `custom` | bool | `true` | Allow free-form amounts (off: only the step buttons). |
| `steps` | money[] | `[50, 100, 200, 500, 1000]` | The one-tap amount buttons (in cents: 0.50 € … 10 €). |

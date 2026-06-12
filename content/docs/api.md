+++
date = "2026-06-12T09:00:00+02:00"
draft = false
weight = 30
title = "REST API"
description = "The REST API: endpoints, conventions, examples."
[menu]
  [menu.main]
    parent = "Docs"
+++

The `/api/*` endpoints are **stable** — existing clients keep working
unchanged. The API is documented as an OpenAPI 3 specification served by
the application itself:

* **`/api/doc`** — interactive Swagger UI on your own instance (browse
  endpoints, try requests — mind that "Try it out" executes *real*
  bookings).
* **`/api/doc.json`** — the raw OpenAPI document, ready for code generators
  or Postman/Insomnia import.

## Essentials

* Amounts are **integer cents**; timestamps are `YYYY-MM-DD HH:MM:SS`.
* Request bodies may be JSON or form-encoded. **JSON bodies require
  `Content-Type: application/json`** — without it the body is silently
  ignored and you get a confusing "parameter missing" error.
* Errors use one envelope, where `class` is the PHP exception class name
  clients switch on:

```json
{"error": {"class": "App\\Exception\\TransactionBoundaryException",
           "code": 400, "message": "Transaction boundary reached"}}
```

* **Pagination is uneven (kept for compatibility):** `/api/transaction`,
  `/api/user/{id}/transaction` and `/api/article` accept
  `?limit=…&offset=…` with a **default limit of 25** — forget `limit` and
  you silently see only 25 rows. `GET /api/user` ignores both and always
  returns **all** users. The `/search` endpoints accept `limit` only.
* **No idempotency mechanism**: retrying a timed-out `POST …/transaction`
  books twice. Reconcile via `GET /api/user/{id}/transaction` after network
  errors.
* **No webhooks/push**: to watch for new bookings, poll
  `GET /api/transaction`.
* User routes accept a numeric id **or the exact name**
  (`GET /api/user/alice`); the transaction routes take numeric ids only.
* There is **no authentication** — the API trusts the network like the
  kiosk trusts the room. CORS is deliberately wide open and there are no
  rate limits. Both are consistent with the trusted-network model — and more
  reasons not to expose it publicly.

## The two calls every integration makes

```bash
# deposit 1.00 € with a comment
curl -X POST http://server/api/user/4/transaction \
  -H 'Content-Type: application/json' \
  -d '{"amount": 100, "comment": "cash box"}'

# buy an article (server computes the price; amount must be omitted
# or negative — sending a positive amount with articleId is rejected)
curl -X POST http://server/api/user/4/transaction \
  -H 'Content-Type: application/json' \
  -d '{"articleId": 3, "quantity": 1}'
# → {"transaction": {"id": …, "amount": -150, "article": {…}, …}}
```

The scanner-script recipe (e.g. for a serial scanner or vending machine):
`GET /api/article?barcode=<scan>` → take `articles[0].id` →
`POST /api/user/{id}/transaction` with `{"articleId": …}`.

## Resource overview

Full, browsable detail at `/api/doc` on your instance; prose examples in
the repository's
[docs/API.md](https://github.com/strichliste/strichliste-backend/blob/master/docs/API.md).

| Resource | Endpoints |
| --- | --- |
| Users | `GET/POST /api/user`, `GET/POST /api/user/{id}` (id or exact name), `GET /api/user/search` |
| Transactions | `GET /api/transaction` (global list), `GET/POST /api/user/{id}/transaction`, `GET/DELETE /api/user/{id}/transaction/{tid}` (DELETE = undo/revert) |
| Articles | `GET/POST /api/article` (filters: `barcode`, `active`, …), `GET/POST /api/article/{id}`, `DELETE /api/article/{id}` (soft delete: deactivates), `GET /api/article/search` |
| Barcodes / tags | `GET /api/barcode`, `GET /api/tag`, and per article `GET/POST …/barcode`, `GET/DELETE …/barcode/{bid}` (same shape for `…/tag`) |
| Metrics | `GET /api/metrics` (system-wide: sum of balances, counts, top articles), `GET /api/user/{id}/metrics` |
| Settings | `GET /api/settings` — serves the [strichliste.yaml](/docs/configuration/) values |

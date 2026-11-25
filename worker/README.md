# mote-api Worker

The hosted half of Mote Desktop's feedback feature. A standalone Cloudflare
Worker on `motedesktop.com/api/*`, separate from the Pages project that serves
the marketing site.

It is separate on purpose. The site is a Pages project with hand-tuned DNS,
redirect and robots configuration; adding a Wrangler config to it would make
that file the source of truth and the dashboard read-only for those fields. A
Worker on a route of the same zone is same-origin with the site, deploys on its
own schedule, and cannot take the site down if it breaks.

The rules this implements — what may be stored, what must be redacted, how long
a contact address lives — belong to
`mote-desktop/docs/feedback-analytics-and-legal-plan.md`. Read that before
changing behaviour here, and keep `src/routes/privacy.tsx` in step with it.

## Routes

| Method | Path                       | Auth                      | Purpose                          |
| ------ | -------------------------- | ------------------------- | -------------------------------- |
| `GET`  | `/api/health`              | none                      | Liveness check                   |
| `POST` | `/api/feedback`            | `X-Mote-App-Token`        | Submit one report                |
| `GET`  | `/api/feedback/admin`      | `Authorization: Bearer …` | Read recent reports as JSON      |
| `POST` | `/api/mac-waitlist`        | Explicit consent          | Register interest once per email |
| `POST` | `/api/mac-waitlist/remove` | Private removal key       | Withdraw and delete a signup     |
| `GET`  | `/api/mac-waitlist/admin`  | `Authorization: Bearer …` | Count active signups             |

A report may carry diagnostics (app 0.9.0 and later): recent steps and their
outcomes, and network facts such as whether Windows Firewall blocks Mote. They
are accepted only as lowercase codes, whole numbers, and booleans, and land in
the `diagnostics` and `diagnostics_code` columns from migration 0002. Invalid
diagnostics are dropped and the report kept.

A daily cron at 03:00 UTC clears contact addresses that have outlived their
retention window.

The same cron deletes Mac interest entries after one year. Each new signup
sends one confirmation with a private removal link from
`support@motedesktop.com`. Duplicate submissions do not send another message.
Keep the frontend consent text, the privacy policy and the Worker consent
version in sync.

To try the form locally, apply migrations with
`bunx wrangler d1 migrations apply mote-feedback --local --config worker/wrangler.jsonc`,
then run `bun run worker:dev` (port 8787) and `vp dev` in separate terminals.
Vite forwards the waitlist requests to the local Worker. For local testing,
provide dummy values for `APP_TOKEN`, `ADMIN_TOKEN` and `RATE_LIMIT_SALT`.
Set `MAC_WAITLIST_SITE_URL` to the local Vite origin so the removal link opens
the preview. Wrangler simulates delivery and prints where it saved the email.

When publishing is approved, onboard `motedesktop.com` for
[Cloudflare Email Sending](https://developers.cloudflare.com/email-service/get-started/send-emails/).
Sending to arbitrary recipients requires Workers Paid. Keep the existing inbox
MX records in place. Apply migration 0003 and deploy the Worker before
publishing the site.

## Resources

| Resource | Name / id                                                             |
| -------- | --------------------------------------------------------------------- |
| Worker   | `mote-api`                                                            |
| D1       | `mote-feedback` — `eb3acf44-a661-4ba5-ae40-355ebe490292`, region EEUR |
| KV       | `RATE_LIMIT` — `d2975a376a674418a71b29709c531d27`                     |

Those identifiers are not secrets; they are useless without account
credentials, which is why Cloudflare's own documentation commits them.

## Secrets

Set with `wrangler secret put <NAME> --config worker/wrangler.jsonc`. None of
them are in the repository.

| Secret               | Purpose                                                   |
| -------------------- | --------------------------------------------------------- |
| `APP_TOKEN`          | Must match the desktop build's `MOTE_FEEDBACK_APP_TOKEN`  |
| `ADMIN_TOKEN`        | Guards the feedback and Mac interest admin routes         |
| `RATE_LIMIT_SALT`    | Salts the hashed-address counters                         |
| `NOTIFY_WEBHOOK_URL` | Where a new report is announced                           |
| `NOTIFY_TARGET`      | Destination for channels that need one (Telegram chat id) |

`APP_TOKEN` is not a security boundary and is not treated as one — a token
inside a shipped binary can be extracted. It keeps the endpoint from being an
open write target for anyone who merely finds the URL. The rate limits and a
human reading the table are what actually hold.

Currently configured: a Telegram bot, `@MoteDesktopFeedbackBot`, delivering to
the owner's private chat. `NOTIFY_WEBHOOK_URL` holds
`https://api.telegram.org/bot<token>/sendMessage` and `NOTIFY_TARGET` the chat
id. Rotate the token with `/revoke` in @BotFather, then re-put the secret.

`NOTIFY_WEBHOOK_URL` is any URL that accepts a POST: a Discord or Slack webhook,
an ntfy topic, a Telegram bot, or something personal. Set `NOTIFY_FORMAT` in
`wrangler.jsonc` to `discord`, `slack`, `ntfy` or `json` to match it. Unset, the
Worker stores the report and sends no notification. Mac signup confirmations
use a separate outbound email binding and do not go through the feedback bot.

## Commands

Run from the repository root.

```bash
bun run worker:deploy
```

```bash
bun run worker:migrate
```

```bash
bun run worker:tail
```

Unit tests for the redaction and validation rules live beside them in `src/`
and run with the site's suite via `bun run test`.

## Reading feedback

```bash
curl -s -H "authorization: Bearer $MOTE_FEEDBACK_ADMIN_TOKEN" "https://motedesktop.com/api/feedback/admin?limit=20"
```

`?status=new` filters, `?limit=` caps at 200.

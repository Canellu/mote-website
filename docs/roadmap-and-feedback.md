# Roadmap and feedback — website side

Status: **feedback API built and deployed; roadmap not started.**

The plan of record is
`mote-desktop/docs/feedback-and-roadmap-delivery-plan.md`. Read it before
building anything here. This file exists so nobody re-derives the decision from
scratch inside this repository; it deliberately repeats no detail.

## Built

- `worker/` — the `mote-api` Cloudflare Worker on `motedesktop.com/api/*`,
  holding the private feedback endpoint, a token-guarded admin read, per-address
  rate limiting, an optional notification webhook, and a daily retention cron.
  Operational detail lives in [worker/README.md](../worker/README.md).
- A `mote-feedback` D1 database and a `RATE_LIMIT` KV namespace on the existing
  Cloudflare account. No new vendor.
- The **Feedback you send from the app** section in `src/routes/privacy.tsx`,
  and the removal of the "no in-app feedback upload" claim that it made false.

The Worker is deliberately _not_ Pages Functions inside the site's own project:
a Wrangler configuration file makes itself the source of truth and the matching
Pages dashboard fields read-only, and this site's DNS, redirect and robots
configuration was hard-won. A Worker on a route of the same zone is same-origin
with the site, deploys separately, and cannot take the site down.

## Still to come, with the roadmap

- `/roadmap`, `/roadmap/<slug>` and `/changelog` routes, prerendered from a
  build-time snapshot and hydrated with live vote counts.
- A Turnstile site key. There is none yet on purpose — P1 has no browser write
  path, because the only feedback client is the desktop app.
- Generated request slugs feeding `scripts/public-routes.json`,
  `scripts/generate-sitemap.ts` and `scripts/verify-static-output.mjs`, so a
  request page that fails to prerender fails the build.
- A second privacy-policy change. The vote cookie will be the site's first
  cookie, and the "cookieless" claim has to narrow to "no tracking or analytics
  cookies" in the same release as the vote button.

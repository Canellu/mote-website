# Website next steps

Last reviewed: **11 October 2026**.

This is the website's working list. It points at the plans that own each decision rather than
restating them. When an item ships, delete it here and record it where its plan says. The
desktop side of the same picture is `mote-desktop/docs/website-launch-plan.md` and
`mote-desktop/docs/plan-index.md`; keep the two in step.

## Where things stand

- **Live at `https://motedesktop.com`** through Cloudflare Pages: home, `/features`,
  `/features/pc-sync`, `/features/desktop-widgets`, the Windows Hue setup guide, `/privacy`,
  `/terms`, `/support`, and a real 404. Every item in [SITE-AUDIT.md](../SITE-AUDIT.md) is
  resolved.
- **The Store serves Mote Desktop 0.10.1.** 0.11.0 is in certification as Submission 21, and
  0.11.1 (lights resync on focus, wake and a timer, plus Refresh in Settings > Bridge) is built to
  follow it. Neither needs a tier, privacy, or legal change on the site. Source:
  `mote-desktop/docs/windows-store-commerce-spike.md`.
- **Copy matches the feature matrix as of 0.10.1:**
  - Tiers: PC Sync free since 0.8.0, one Sync Box and one widget on Free, the 14-day trial, and
    Mote Pro as a one-time in-app purchase.
  - `/features` covers all five automations and the IP-address route. It also mentions
    translucent widget tiles, and switch, dimmer, motion sensor and fixture setup.
  - The Hue Bridge answer uses the wording from the bridgeless spike.
- **Legal effective date: 3 October 2026**, in `src/lib/legal.ts`. 0.10.1's What's new links to it.
- **Search Console:** the sitemap was submitted on 4 October 2026 and read the same day (Success,
  8 pages).
- **Feedback API live** as the `mote-api` Worker, with diagnostics
  ([worker/README.md](../worker/README.md)). The public roadmap has not started
  ([roadmap-and-feedback.md](./roadmap-and-feedback.md)).

## 1. Copy and pages

The 4 October copy (automations section and row, connecting by IP, the Hue Bridge answer,
translucent tiles, switch and sensor setup) went live on 12 October in `cf22488`.

- **When 0.11.0 publishes:** the room and light control block on `/features` can mention the All
  lights page (every light by room or as one list, and one color wheel for the whole home) and
  fixtures showing as one tile. Free, and no comparison row changes.
- **In-app comparison row.** The app's Free vs Mote Pro table
  (`mote-desktop/src/features/pro/PlanOverview.tsx`) has the row "Automations: on air and away",
  which leaves out focus sessions, presence, and calendar rules, all Pro since 0.6.0. The site's
  row reads "Automations: calls, locking, focus, presence, and calendar". Bring the app's row up
  to it in the next desktop release.
- **Automations capture, then a block or page.** `/features` describes automations in words
  because no real capture exists. Take one (the Automations screen, or a focus session) through
  the `public/product/PROVENANCE.md` process. Then promote the section to a catalog block, or to
  a `/features/automations` page beside PC Sync and widgets. A new route goes in
  `scripts/public-routes.json`.
- **Not mentioned yet, and probably not worth a block:** units and formats, interface scale and
  spacing, and What's new after updates.

## 2. Owner actions that are still open

- **Bing Webmaster Tools.** Sign in, then use Import from Google Search Console, which brings the
  site, verification and sitemap. Record it in
  [discoverability/implementation-record.md](./discoverability/implementation-record.md).
- **Day-30 discoverability review, due 11 October 2026.** The page-indexing half is in the
  record (7 indexed; the 9 not indexed are expected redirects and one uncrawled page). Performance
  numbers still need reading against the baseline, in absolute terms.
- **Request indexing for `/features/desktop-widgets/`** in URL inspection. Don't re-validate
  "Page with redirect"; those URLs are supposed to redirect.
- **Validate the live homepage** in Schema.org Validator and the Rich Results Test.
- **Decide on showing the price.** Mote Pro is on sale at NOK 149, but the site shows no price.
  `PRODUCT.md` keeps it off until it is in approved Store listing copy and market conversions are
  reviewed.
- **Create `privacy@motedesktop.com`**, or confirm `support@` stays the only privacy contact.

## 3. Public roadmap and changelog (P2–P4)

Owned by `mote-desktop/docs/feedback-and-roadmap-delivery-plan.md`. Summary in
[roadmap-and-feedback.md](./roadmap-and-feedback.md).

- A `/changelog` (P4) could come first. `mote-desktop/CHANGELOG.md` holds user-facing notes from
  0.2.0 to 0.10.1, the app opens What's new after each update, and a changelog needs no backend,
  voting identity, or cookie. The delivery plan orders it last, so changing the order is that
  plan's decision.
- `/roadmap` read-only (P2), then submissions and voting (P3). The vote cookie is the site's first
  cookie and needs the privacy-policy change in the same release.

## 4. Housekeeping

- The TanStack Start patch in `patches/` stays until
  [TanStack/router#7614](https://github.com/TanStack/router/issues/7614) is fixed upstream.
- `public/visual-check.*` sits in the working tree (gitignored) and is stripped from builds.

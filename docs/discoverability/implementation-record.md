# Discoverability implementation record

Status: complete and live. The discoverability build and the trailing-slash canonical fix reached
production on 11 September 2026, and the three Cloudflare dashboard actions were applied and
verified the same day. Search Console sitemap submission and the Partner Center review remain open.

Checked: 11 September 2026

Next review: 11 October 2026

This record accompanies the copied implementation brief. It distinguishes verified product facts,
repository work, and owner-only account actions.

## Claim ledger

| claim                  | exact wording                                                                                                                                     | evidence source                                                                                                                                                   | evidence date/build                                                  | owner    | status                                                                           | pages/listings using it                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Product category       | “Mote Desktop is an unofficial Windows app for controlling compatible Philips Hue lights, rooms, zones, and scenes over your local network.”      | `mote-desktop/docs/v1-feature-inventory.md`; `mote-desktop/docs/known-limitations.md`; current app routes and Hue client implementation                           | Docs reviewed 2026-08-14; repository checked 2026-09-11              | Anton Vo | Verified for release-candidate copy                                              | `/`; FAQ; Store draft                                   |
| Supported OS           | “The first release supports Windows 10 and Windows 11 on x64 PCs.”                                                                                | `mote-desktop/docs/known-limitations.md`; `mote-desktop/docs/microsoft-store-listing-copy.md`                                                                     | Docs reviewed 2026-08-14                                             | Anton Vo | Verified for release candidate; final hardware acceptance remains a release gate | `/`; `/support`; setup guide; FAQ; schema; Store draft  |
| Bridge requirement     | “A compatible Hue Bridge is required for lighting control.”                                                                                       | `mote-desktop/docs/microsoft-store-listing-copy.md`; setup wizard and Hue session implementation                                                                  | Listing draft reviewed 2026-08-14; implementation checked 2026-09-11 | Anton Vo | Verified                                                                         | Setup guide; FAQ; Store draft                           |
| Bluetooth-only control | “Mote Desktop does not connect directly to Bluetooth-only lights.”                                                                                | Bridge-backed setup flow; Bluetooth control is absent from `mote-desktop/docs/v1-feature-inventory.md` and explicitly outside the shipped connection architecture | Repository checked 2026-09-11                                        | Anton Vo | Verified by implementation scope; recheck if a Bluetooth provider is added       | Setup guide; FAQ                                        |
| Pairing workflow       | “Choose Connect, select a discovered bridge when needed, then press the round bridge link button.”                                                | `mote-desktop/src/features/setup-wizard/steps/WelcomeStep.tsx`, `SelectBridgeStep.tsx`, and `PairingStep.tsx`                                                     | Implementation checked 2026-09-11                                    | Anton Vo | Verified                                                                         | Setup guide; FAQ                                        |
| Local-network behavior | “Core lighting commands travel between the PC and Hue Bridge across the local network.”                                                           | `mote-desktop/docs/known-limitations.md`; website privacy policy; Hue client architecture                                                                         | Repository checked 2026-09-11                                        | Anton Vo | Verified with explicit exceptions                                                | Homepage; setup guide; FAQ; Store draft                 |
| Free tier availability | “Mote Desktop is free on the Microsoft Store.”                                                                                                    | Live Store product ID `9P910JMMP9SZ`; website `PRODUCT.md`; `src/lib/links.ts`                                                                                    | Store and repositories checked 2026-09-11                            | Anton Vo | Verified                                                                         | Header, homepage, footer, features, schema, setup guide |
| Mote Pro availability  | “Mote Pro is planned as a one-time Microsoft Store purchase and is not yet available to buy.”                                                     | Website `PRODUCT.md`; `mote-desktop/docs/windows-store-commerce-spike.md`; hidden add-on state                                                                    | Repositories checked 2026-09-11                                      | Anton Vo | Verified current state; must change when the add-on is published                 | Features; FAQ; Store draft notes                        |
| Mote Pro features      | “Mote Pro adds PC Sync, advanced and additional widgets, a custom dashboard layout, and multiple saved Hue Bridges.”                              | `mote-desktop/docs/free-pro-feature-matrix.md`; `docs/known-limitations.md`; current app implementation                                                           | Docs reviewed 2026-08-14; implementation checked 2026-09-11          | Anton Vo | Verified as entitlement plan; purchase/restore acceptance remains a release gate | Homepage PC Sync section; features; FAQ; Store draft    |
| Multiple bridges       | “Mote Pro can save and switch among multiple Hue Bridges, with one active at a time.”                                                             | `mote-desktop/docs/free-pro-feature-matrix.md`; `docs/known-limitations.md`                                                                                       | Docs reviewed 2026-08-14                                             | Anton Vo | Verified                                                                         | Features; setup guide; FAQ; Store draft                 |
| PC Sync                | “PC Sync can run Video, Games, and Music modes with compatible Hue entertainment hardware; Music uses system-audio loopback, not the microphone.” | `mote-desktop/docs/v1-feature-inventory.md`; `docs/known-limitations.md`; PC Sync UI and host commands                                                            | Docs reviewed 2026-08-14; implementation checked 2026-09-11          | Anton Vo | Verified with display/HDR/audio/hardware acceptance caveat                       | Homepage; features; FAQ; Store draft                    |
| Publisher relationship | “Mote Desktop is not affiliated with, authorized by, sponsored by, or endorsed by Signify.”                                                       | `mote-desktop/docs/microsoft-store-listing-copy.md`; website legal copy                                                                                           | Listing draft reviewed 2026-08-14; website checked 2026-09-11        | Anton Vo | Owner-approved repository wording; final legal review remains required           | FAQ; Store draft                                        |
| Store destination      | `https://apps.microsoft.com/detail/9p910jmmp9sz`                                                                                                  | `mote-desktop/docs/windows-store-commerce-spike.md`; website link constant                                                                                        | Checked 2026-09-11                                                   | Anton Vo | Verified                                                                         | All Store calls to action; schema                       |

## Repository delivery status

| Area                           | Status                                    | Evidence                                                                                                                                                                                      |
| ------------------------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Positioning and metadata       | Implemented in source                     | Homepage title, description, H1, visible definition, and Store CTA use the verified Windows/Hue category language.                                                                            |
| Canonicals and social metadata | Implemented in source                     | `src/lib/seo.ts` emits one absolute canonical plus Open Graph and Twitter metadata with a real 1200 × 630 product card.                                                                       |
| Crawlable rendering            | Implemented in source                     | TanStack Start prerenders public routes; `scripts/verify-static-output.mjs` checks built HTML for `<main>` and `<title>`.                                                                     |
| Robots and sitemap             | Implemented in source                     | `public/robots.txt` allows the public site and declares the absolute sitemap. `scripts/public-routes.json` drives sitemap generation and static-output verification.                          |
| Software application entity    | Implemented in source                     | Homepage JSON-LD identifies one `SoftwareApplication` entity with a stable `@id`, official Store URL, publisher, operating systems, and truthful free offer. No rating or review is declared. |
| Visible FAQ and FAQ markup     | Implemented in source                     | Ten evidence-backed questions render as semantic `details` elements. `FAQPage` markup is generated from the same question and answer strings. No rich-result promise is made.                 |
| Practical setup content        | Implemented in source                     | `/guides/control-philips-hue-from-windows` follows the shipping setup wizard and includes prerequisites, recovery, internal links, and an authentic app capture.                              |
| Website measurement            | Implemented before this pass and retained | Cloudflare Web Analytics loads only when `VITE_CF_BEACON_TOKEN` is configured. Store links use `cid` values: `web-header`, `web-hero`, `web-footer`, `web-compare`, and `web-guide`.          |
| Store listing package          | Draft only                                | See `microsoft-store-listing-spec.md`. Nothing was changed or submitted in Partner Center.                                                                                                    |

## Baseline and tracking definitions

No Google Search Console, Bing Webmaster Tools, Cloudflare analytics, or Partner Center account was
available in this local task. No search or acquisition baseline is claimed.

When access is available, save these exact baseline slices before or alongside deployment:

- Google Search Console: property, date range, country/device filters, pages, queries, impressions,
  clicks, CTR, average position, indexing status, user-declared canonical, and Google-selected
  canonical.
- Bing Webmaster Tools: site, date range, indexed URL inventory, crawl issues, queries, impressions,
  and clicks.
- Cloudflare Web Analytics: hostname, equal comparison windows, page views, visits, Core Web Vitals,
  and referrers. The build must contain the expected beacon token before this is treated as active.
- Partner Center: listing visits and acquisitions by market, date, and available `cid` campaign.
  Compare compatible windows and definitions; do not equate an outbound click with an install.

The first useful non-brand Search Console filter should group queries around Windows Hue control,
desktop widgets, and PC Sync while excluding `mote` brand terms. Record absolute numbers when the
baseline is zero or small; do not calculate percentage growth from zero.

## Account-dependent owner actions

1. Deploy only after owner approval, then verify HTTP → HTTPS and alternate-host redirects resolve to
   one `https://motedesktop.com` URL without a chain or loop.
2. Fetch every sitemap URL in production and record the final status, canonical, rendered `<main>`,
   robots directives, release identifier, date, and checker.
3. Verify the domain property in Google Search Console with an owner-controlled DNS method. Submit
   `https://motedesktop.com/sitemap.xml` once, inspect the homepage and setup guide, and record both
   indexed and live-test results.
4. Add the same site and sitemap to Bing Webmaster Tools and record submission/crawl results.
5. Validate the deployed homepage in Schema.org Validator and Google Rich Results Test. Record
   warnings without adding invented ratings or reviews. The truthful entity is not expected to earn
   a software-app rich result without genuine rating/review data, and FAQ rich results are generally
   restricted to authoritative health and government sites.
6. Confirm `VITE_CF_BEACON_TOKEN` in the production build environment and verify one page view without
   duplicate beacon requests. Confirm each Store CTA retains its intended `cid` in the final HTML.
7. Review the Store draft in Partner Center against the current package, market, language, keyword,
   and screenshot fields. Do not publish Mote Pro copy until commerce, entitlement, and acceptance
   gates pass.

Deployment reached production through the existing Cloudflare Pages Git integration. No indexing
request, Store submission, or outreach was performed.

### Cloudflare dashboard actions — completed 11 September 2026

All three were applied in the Cloudflare dashboard for account `9e22016d…` and verified against the
live site. Navigation is recorded because Cloudflare moves these pages.

1. **www now redirects to the apex.** `www.motedesktop.com` already existed as a proxied `A` record,
   so no DNS change was needed and the documented `192.0.2.1` placeholder record did not apply. Under
   Rules, Redirect Rules, the "Redirect from WWW to root" template was deployed as a single redirect
   named "Redirect www to apex": wildcard `https://www.*` to `https://${1}`, 301, with preserve query
   string enabled. Cloudflare warned that www might not be proxied; that warning was a false negative
   and "ignore and deploy" was correct, since creating a second record would have conflicted.
2. **Always Use HTTPS was turned on** under SSL/TLS, Edge Certificates. The redirect rule matches
   only the `https://` scheme, so `http://www.motedesktop.com` was still answering 200 without ever
   reaching the apex. The zone is on Full encryption mode, so the redirect-loop warning attached to
   this setting — which applies to Flexible mode — did not apply. It also closed roughly 140 requests
   in the preceding 24 hours that were being served over plaintext HTTP.
3. **Cloudflare's managed robots.txt was disabled** under Security, Settings, Bot traffic, "Manage
   your robots.txt", by selecting "Disable robots.txt configuration" in place of "Instruct AI bots to
   not scrape content". The live file is now exactly the repository's, with zero `Disallow`
   directives. Separately, the AI bot policies for Search, Agent and Training were already set to
   "Allow (do not block)", and the deprecated Block AI bots preference was changed from "mixed
   purpose crawlers will be blocked on September 15" to "will continue to be allowed", since
   mixed-purpose crawlers are used for search indexing as well as training.

`VITE_CF_BEACON_TOKEN` was deliberately **not** set. Web Analytics for `motedesktop.com` is already
configured with RUM automatic injection, and the live page loads `beacon.min.js` under token
`6720e39a…` with page views recording. Adding the build-time token would have injected a second
beacon and double-counted every view, which is the duplicate-beacon failure the owner action above
warns about. A `curl` of the HTML does not show the script because the edge skips injection for
non-browser clients; verify this one in a real browser, not with `curl`.

Two observations worth carrying forward: the apex is a proxied `CNAME` to `mote-website.pages.dev`,
which names the Pages project, and a `google-site-verification` TXT record already exists on the
apex, so Search Console is verified and only the sitemap submission remains.

## Local verification — 11 September 2026

- The copied brief has the same SHA-256 hash as its source:
  `975E04C6FB2FA382B5CA54818E8D7E6AE76C9772180D892EB6A914573DEACD68`.
- `vp check --no-fmt` passed with no lint, type, or warning findings in 28 checked files.
- Formatting passed for the implementation-authored source and supporting records. The copied brief
  was preserved byte-for-byte, and the generated route tree remains excluded by project config. The
  repository-wide `vp check` still reports pre-existing formatting drift in 56 files, including
  locally modified Graft wiring; those unrelated files were not rewritten.
- `vp test run` passed: one test file and one route-inventory test.
- The sitemap generator emitted six canonical URLs.
- `vp build` passed and prerendered all six public routes, including the setup guide.
- `node scripts/verify-static-output.mjs` verified prerendered `<main>` content and metadata for all
  six routes and confirmed development-only assets were absent.
- Local JSON-LD parsed successfully as one `SoftwareApplication` and one `FAQPage` containing the ten
  visible questions. The homepage and guide emitted the intended absolute canonicals.
- Browser QA covered the homepage and setup guide at desktop and a 390 × 844 phone viewport. Both
  phone pages had one `<h1>`, one `<main>`, and no horizontal overflow; the FAQ expanded through its
  semantic disclosure control and exposed the answer in the accessibility tree.
- The Impeccable detector was run once over all changed UI targets. Its warnings/advisories describe
  the committed Geist direction and older design-token drift; the two new off-ramp type values it
  identified were moved onto existing design-system sizes before the final build.
- Schema.org Validator, Google Rich Results Test, Google URL Inspection, HTTP/redirect checks, and
  analytics/Store account reports remain production/account checks and were not represented as local
  passes.
- Graft served an automatically refreshed working graph copied from the main checkout for repository
  orientation. `graft_check_freshness` reported that this worktree has no committed
  `graft/manifest.json`, so committed-graph freshness could not be certified here.

## Production verification — 11 September 2026

Checked against `https://motedesktop.com` with `curl`. No account access was used or required.

A Cloudflare deploy landed partway through this check, so the results come in two halves. Earlier in
the session production still served a build predating `a8671eb`: the homepage carried no FAQ and no
`FAQPage` markup, the sitemap listed five URLs without the setup guide, and the guide path returned
200 while serving homepage content under a canonical pointing at `/`. Those readings were taken with
cache-busted requests against `cf-cache-status: DYNAMIC` responses, so they reflect the origin at the
time rather than a stale edge copy. The documentation formatting fixed by `67aa19e` had been blocking
that build.

The current deployed state is good: ten FAQ disclosures render, `FAQPage`, `Question`, `Answer`,
`SoftwareApplication` and `Offer` are all present, the sitemap lists all six canonical URLs, and the
setup guide serves its own title and canonical. Treat the earlier half as the reason the first
indexing attempt should not be trusted, not as the current state.

One defect remains, found during the same pass:

| Check            | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trailing slashes | Every non-root route 308-redirects to a trailing-slash URL (`/features` to `/features/`, and the same for `/privacy`, `/terms`, `/support` and the guide), while the sitemap and each page's own canonical declared the slashless form. Five of six inventory URLs were therefore redirects, and each canonical named a URL that redirects rather than the 200 answering it. Fixed and verified live: `canonical()` in `src/lib/canonical.ts` appends the slash, and both the page metadata and `scripts/generate-sitemap.ts` build every URL through it |
| Apex host        | `http://motedesktop.com` redirects once to `https://motedesktop.com/` and returns 200                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `www` host       | Was serving Cloudflare's "is not set up yet" placeholder. A `_redirects` file cannot fix this: Pages documents domain-level redirects as unsupported there, so it only ever matches paths. Fixed with a Redirect Rule plus Always Use HTTPS; every www variant now reaches the apex over HTTPS with the query string preserved                                                                                                                                                                                                                           |
| Analytics beacon | No Insights script appears in a `curl` of the HTML, but the edge injects it for real browsers. Web Analytics is configured with RUM automatic injection and is recording views, so `VITE_CF_BEACON_TOKEN` must stay unset to avoid a second beacon                                                                                                                                                                                                                                                                                                       |
| `robots.txt`     | Cloudflare's managed robots.txt was prepending `Disallow: /` for ClaudeBot, GPTBot, Google-Extended, CCBot, Applebot-Extended, meta-externalagent and Bytespider, plus `Content-Signal: ai-train=no`. Managed robots.txt is now disabled and the live file carries zero `Disallow` directives                                                                                                                                                                                                                                                            |

The trailing-slash mismatch failed two of the section 12 criteria at once: a single final 200
response for the whole indexable inventory, and a sitemap carrying zero redirect URLs. The fix
deployed the same day and was rechecked against production. All six sitemap URLs now return 200
with zero redirects, and each page carries a self-referential canonical matching its sitemap entry,
so both criteria pass. The homepage still renders ten FAQ disclosures with `FAQPage`,
`SoftwareApplication` and `Offer` markup intact. Sitemap submission and indexing requests are no
longer blocked.

The `robots.txt` blocks are blanket `Disallow` directives, so they prevent retrieval and citation,
not only model training. That contradicts section 10 of the brief and is a Cloudflare dashboard
setting rather than a repository change; record an explicit owner decision either way.

## Measurement baseline — 11 September 2026

Section 12 asks for a dated baseline before growth is claimed. This is it. Every figure below was
read from the live account on 11 September 2026; where a figure does not exist yet, that is recorded
as an absence rather than as a zero measurement, because the two mean different things.

| Source                   | Baseline                                                                                                                                                                                            | Definition and caveat                                                                                                                                                                                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Search Console    | Domain property `sc-domain:motedesktop.com`, verified by DNS TXT. Performance reports "Processing data, please check again in a day or so" and returns no queries, impressions, clicks or positions | This is data not yet available, not a measured zero. The property predates this pass; search performance has never been collected for it                                                                                                       |
| Sitemap                  | `https://motedesktop.com/sitemap.xml` submitted 11 September 2026, status Success, six pages discovered                                                                                             | Submitted before the feature pages shipped, so the inventory becomes eight once that deploy lands. Google re-reads on its own schedule                                                                                                         |
| Cloudflare Web Analytics | Site created 7 September 2026, RUM automatic injection. Eight page views and zero visits in the trailing 24 hours as read at roughly 13:00 UTC                                                      | A visit requires arrival from another site or a direct entry, so zero visits alongside eight page views is a definition difference, not a contradiction. Four days of history exists, so day 30 is not comparing against an empty prior period |
| Bing Webmaster Tools     | Not set up                                                                                                                                                                                          | No site, no sitemap, no crawl history                                                                                                                                                                                                          |
| Partner Center           | Not read during this pass                                                                                                                                                                           | Listing visits and acquisitions by market remain uncaptured                                                                                                                                                                                    |

Consequences for the day-30 review, which falls on 11 October 2026:

- Report absolute numbers. There is no prior 28-day search period to compare against, and percentage
  growth from an unavailable baseline is meaningless.
- Search Console and Cloudflare count different things over different windows. Do not add them, and
  do not treat a page view as a visit or an outbound click as an install.
- The first search data will describe a site that already carries the trailing-slash fix and the
  feature pages, so early impressions cannot be attributed to any single change. Record release
  dates and accept the confounding rather than explaining it away.

# Discoverability implementation record

Status: repository implementation complete and passing locally; NOT yet live. Production serves a
build that predates the discoverability work. No account submission performed.

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

No public deployment, indexing request, Store submission, or outreach was performed by this task.

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

The deployed site predates commit `a8671eb`, so none of the discoverability work above is live. The
Cloudflare build was blocked by documentation formatting; `67aa19e` fixed that, but no successful
deploy has followed. `vp check` and the full `bun run build` both pass locally as of this date, so
the build gate is clear and a rebuild is the only outstanding step.

| Check                                      | Production                                                                                                                                                                                     | Repository / local build                            |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| FAQ disclosure elements                    | Zero `<details>` in the homepage HTML                                                                                                                                                          | Ten evidence-backed questions                       |
| FAQ markup                                 | No `FAQPage`, `Question`, or `Answer` types                                                                                                                                                    | Emitted by `src/lib/seo.ts`                         |
| Application markup                         | `SoftwareApplication`, `Offer`, `Person` present from the earlier pass                                                                                                                         | Unchanged                                           |
| `/guides/control-philips-hue-from-windows` | Returns 200 but serves the homepage: homepage `<title>`, homepage `<h1>`, and `canonical` pointing at `https://motedesktop.com/`                                                               | Prerenders as its own page with its own canonical   |
| `sitemap.xml`                              | Five URLs; the setup guide is absent. `cf-cache-status: DYNAMIC` and a cache-busted request returned the same five, so this is a stale deploy rather than an edge cache                        | Six URLs including the guide                        |
| Apex host                                  | `http://motedesktop.com` redirects once to `https://motedesktop.com/` and returns 200                                                                                                          | —                                                   |
| `www` host                                 | Not attached to the Pages project; serves Cloudflare's "is not set up yet" placeholder. `public/_redirects` now carries the www-to-apex rule and takes effect once the custom domain is added  | —                                                   |
| Analytics beacon                           | No Cloudflare Insights script in the production HTML, so `VITE_CF_BEACON_TOKEN` is unset in the build environment                                                                              | Loads only when the token is configured             |
| `robots.txt`                               | Cloudflare's managed robots.txt prepends `Disallow: /` for ClaudeBot, GPTBot, Google-Extended, CCBot, Applebot-Extended, meta-externalagent and Bytespider, plus `Content-Signal: ai-train=no` | Repository file is `Allow: /` plus the sitemap line |

The guide result is the most damaging: the priority non-brand landing page does not exist in
production, and the fallback canonicalises it to the homepage, so it would be dropped even if
crawled. Do not submit the sitemap or request indexing until a rebuild has shipped, or the first
Search Console data will describe a site that does not contain the work.

The `robots.txt` blocks are blanket `Disallow` directives, so they prevent retrieval and citation,
not only model training. That contradicts section 10 of the brief and is a Cloudflare dashboard
setting, not a repository change; record an explicit owner decision either way.

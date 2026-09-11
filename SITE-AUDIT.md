# Mote website audit — 2026-09-10

Measured against the live dev server and the built `dist/`, not eyeballed.

## Performance — highest leverage

`dist/client/product/` ships **8.2 MB of PNGs**. `/features` alone pulls 2.77 MB of images per load.

- **Two captures are ~1.1 MB each.** `mote-space-controls-dark.png` (1126 KB) and
  `mote-scene-gallery-dark.png` (1113 KB) are 1402px wide, displayed at 396px and 562px
  CSS on a 1x display — 2.5–3.5x oversampled.
- **No WebP/AVIF anywhere.** Re-encoding at ~1.5x display width takes these to ~60–120 KB.
  Roughly a 90% cut on the site's dominant payload. Single highest-leverage change.
- **No `srcset`/`sizes`** in `src/components/product-capture.tsx` — phones download the
  1402px file.
- **Preload targets the wrong asset.** Built HTML preloads `/brand/mote-app-icon.png`
  (24 KB, decorative) while the LCP hero poster (785 KB PNG) gets nothing.
- **Carousel fires ~2.4 MB at once.** `src/routes/index.tsx` sets `priority={hasEntered}`
  with a 300px rootMargin, so all three captures load eagerly as the section approaches.
- **Dev tooling ships to production.** `public/visual-check.html` and `visual-check.js` are
  gitignored but still in `public/`, so they land in `dist/client/` and are crawlable.

JS is fine: 101 KB gzipped main bundle.

## SEO & analytics

- **No `og:image`** in `src/lib/seo.ts` — every Slack/Discord/X/iMessage share renders a bare
  text card. Add 1200x630 and switch `twitter:card` to `summary_large_image`.
- **No JSON-LD.** A `SoftwareApplication` block (operatingSystem "Windows 10, Windows 11",
  applicationCategory, offers price 0, downloadUrl -> Store listing) drives app rich results.
- **No analytics at all.** No measurement of Store click-through, the site's only conversion.
  A cookieless option (Plausible / Umami / Cloudflare Web Analytics) needs no cookie banner
  and preserves the privacy story. Add an outbound-click event on `MICROSOFT_STORE_URL`.
- `sitemap.xml` is hand-maintained, no `lastmod`, and lists two placeholder pages.
- `Features — Mote Desktop` is a thin title. Canonicals and description lengths are correct.

## Accessibility — genuinely strong

Verified in the live DOM: all images have alt text, no unnamed buttons/links, `lang="en"`,
no duplicate IDs, clean h1 -> h2 -> h3 order. No outline suppression, explicit
`:focus-visible` rules. Reduced-motion handled thoroughly (video, carousel, view
transitions, aurora). Scrollable comparison table is a labelled `role="region"`.

Minor: `aria-valuetext` on `<progress>` is ignored by several screen readers. The sync
section renders twice (wide + compact) with one `display:none` — correct for AT, duplicated
markup.

## Content

- **Privacy and Terms are placeholders.** `src/routes/privacy.tsx` says "This summary will be
  replaced by a legally reviewed privacy policy before release." Linked from every footer,
  in the sitemap, and required by the Microsoft Store listing. **Highest priority —
  compliance, not copy.**
- **No price anywhere.** "one-time Microsoft Store purchase" with no number.
- **No FAQ.** Cheapest SEO content available, and feeds FAQPage schema.
- Home page never mentions Pro exists until `/features`.

## Features page layout

Measured: 6,679px tall at 1440px wide, 8 blocks, each 421–464px. A metronome.

1. **Screenshots too small to read.** `.feature-block__media img` caps at `max-height: 24rem`
   inside a `min-height: 26rem` panel (`src/styles.css:1081`), so a 1402x1122 capture renders
   ~396px wide. Paying 1.1 MB for an unreadable thumbnail. Crop each capture to the region
   its block describes, or widen the media column.
2. **Nothing outweighs anything else.** PC Sync (flagship Pro feature) gets the same
   treatment as App preferences. Give hero features a taller/full-bleed block; compress the
   minor ones into a two-up grid.
3. **Tier label is the smallest thing on the page** — 0.72rem uppercase muted
   (`src/styles.css:1005`) for the page's main axis. Make it a badge.
4. **Comparison table buried** after ~5000px of scroll; its anchor link is styled as a small
   muted `footer-link`. Move the table up, right after the intro.
5. Side alternation (`nth-child(even)`) and colour cycle (`nth-child(3n)`) run on different
   periods — pattern repeats every 6 blocks, reads as drift.
6. Below 62rem everything stacks into 8 identical pairs, image capped at 20rem — same
   legibility problem, worse.

## Suggested order

1. Real privacy policy + terms (compliance blocker)
2. WebP/AVIF + `srcset` in `ProductCapture`; fix the preload target
3. `og:image` + `SoftwareApplication` JSON-LD
4. Analytics with a Store outbound-click event
5. Features page: move the comparison up, vary block weight, crop the captures
6. Remove `visual-check.*` from `public/`

## Tooling state

- Graft: built, 22 map files, 85 nodes / 145 edges. `.mcp.json` + `.claude/` wiring written.
  MCP server still shows "Pending approval" — run `claude` in a terminal to approve.
- Mobbin MCP: connected via claude.ai connector (`https://api.mobbin.com/mcp`, healthy).
  Use it for tiered feature-catalog and pricing-comparison patterns.

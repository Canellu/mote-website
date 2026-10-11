# Mote website audit — 2026-09-10

Status, 24 September 2026: **resolved.** Every item below shipped between 11 and 18 September
2026, mostly in `41330a8` and `a8671eb`. The audit is kept as the record of why the site looks the
way it does; what comes next is in [docs/next-steps.md](docs/next-steps.md).

| Audit item                                  | Resolution                                                                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Placeholder privacy policy and terms        | Real documents, effective date in `src/lib/legal.ts`                                                                                                |
| 8.2 MB of PNGs, no WebP/AVIF, no `srcset`   | `public/product/derived/` AVIF + WebP at 480/960/full, served through `<picture>` in `src/components/product-capture.tsx`                           |
| Preload aimed at the app icon               | The homepage preloads the hero poster                                                                                                               |
| No `og:image`, no JSON-LD                   | 1200 × 630 card in `public/brand/`, `summary_large_image`, `SoftwareApplication` and `FAQPage` JSON-LD                                              |
| No analytics                                | Cloudflare Web Analytics by edge injection, cookieless. `VITE_CF_BEACON_TOKEN` stays unset to avoid a double beacon; see the discoverability record |
| Hand-maintained sitemap                     | Generated from `scripts/public-routes.json`, which also drives static-output verification                                                           |
| No FAQ, no price, home never mentions Pro   | Home FAQ and Pro/trial line shipped. The price is still deliberately absent; see `PRODUCT.md`                                                       |
| Features page: buried table, uniform blocks | Comparison opens the page; PC Sync and desktop widgets got their own pages                                                                          |
| `visual-check.*` shipped in `dist/`         | Still in `public/` locally (gitignored), but `vite.config.ts` excludes them and `scripts/verify-static-output.mjs` fails the build if they appear   |

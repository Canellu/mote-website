# Mote Desktop: SEO, AI discoverability and Microsoft Store implementation brief

Prepared: 10 September 2026; implementation guidance checked 11 September 2026  
Audience: AI agents and maintainers working on the Mote Desktop website, app and Store listing  
Website identified in the source conversation: https://motedesktop.com

## 1. Scope, evidence and guardrails

Turn the earlier discoverability discussion into actionable project work. This document is a proposed implementation plan, not a fresh crawl or a verified report of the live website's defects.

Source: the ChatGPT conversation **Improve App Discoverability**, ID `6aa316a4-46cc-83ed-9b1b-f2b81a88607d`. The retrieved conversation contains truncated audit responses; missing details have not been reconstructed as findings. Recommendations beyond the visible audit are proposed implementation work.

The conversation describes Mote Desktop as a Windows application for controlling compatible Philips Hue lights and accessories over a local network. It attributes PC Sync, advanced widgets, custom dashboards and multiple Hue Bridges to Mote Pro. Verify these statements against the current shipping build, documentation and Store listing before publication.

Treat these earlier observations as historical, unverified claims: the app was “four days old”; the website had almost no searchable footprint; the Store listing appeared in Microsoft and third-party indexes; other products made the name “Mote” ambiguous. Do not repeat them as current facts. No Search Console export, analytics baseline, keyword volume study, technical crawl or Store acquisition report was supplied. The conversation's opaque citation tokens are not independently usable evidence.

Implementation rules:

- Keep the product name **Mote Desktop**. Use **Mote Pro** consistently for the paid tier if that remains its actual name.
- Verify supported Windows versions, Hue Bridge requirements, supported accessories, feature tiers, pricing and PC Sync behavior. Record evidence and date for each claim.
- Do not claim official Philips Hue affiliation, universal compatibility, complete offline operation, zero telemetry, lowest latency, superior performance or guaranteed rankings without evidence.
- “Local network control” does not establish that every feature, purchase, update or setup step works without internet access.
- Never invent ratings, reviews, downloads, awards, customer quotes or endorsements.
- Inspect repository instructions and existing routes before editing. Adapt proposed routes to the existing architecture; preserve useful URLs and redirect replaced URLs.
- This brief authorizes no external outreach by itself. Prepare messages and listing assets for the project owner; send or publish only within the owner's actual authorization.

Before writing customer-facing copy, create a claim ledger with these columns: `claim`, `exact wording`, `evidence source`, `evidence date/build`, `owner`, `status`, and `pages/listings using it`. Acceptable evidence is the shipping app, package manifest, current first-party documentation, Partner Center data or an owner-confirmed product decision. Mark a claim `blocked` rather than softening a guess into publishable language. Product facts are a release gate; keyword research and account access are not gates for drafting truthful pages.

## 2. Goals and positioning

Help people who do not know the brand find the product through Windows and Hue use cases. Make website, Store and public references consistently connect:

**Mote Desktop → Philips Hue → Windows → desktop lighting control**

Working category description: **Philips Hue desktop controller for Windows**.

Use clear product facts, readable documentation and original screenshots to help search engines and AI systems understand the app. Inclusion, citations, rich results and ranking gains are outcomes to measure, not promises.

## 3. Target query map

These are qualitative query hypotheses, not verified search-volume or competitiveness estimates. Validate them using actual search impressions and acquisition data.

| Intent | Candidate queries | Primary destination | Publication condition |
| --- | --- | --- | --- |
| Find a Windows Hue controller | Philips Hue Windows app; Philips Hue desktop app; Philips Hue PC controller | Homepage | Verify Windows and Hue support |
| Complete a task | control Philips Hue from PC; control Hue lights from Windows | `/guides/control-philips-hue-from-windows/` or the equivalent existing guide | Test the documented workflow |
| Desktop widgets | Philips Hue desktop widgets; Hue widgets Windows | Widgets feature page | Verify widgets, placement and tier |
| Screen synchronization | sync Philips Hue with PC; Philips Hue PC sync | PC Sync page | Verify exactly what is synchronized and requirements |
| Supported OS | Hue lights Windows 11 | Homepage/requirements section | Confirm Windows 11 support |
| Background access | Philips Hue system tray | Relevant feature page or FAQ | Use only if a shipping tray feature exists |
| Brand and purchase | Mote Desktop; Mote Desktop download; Mote Pro | Homepage and pricing | Link to verified official Store product |

Assign one primary page per intent. Avoid separate near-identical pages for every keyword variation. Do not target “best,” “free,” music sync, Bluetooth-only control or remote control unless the content and product justify those terms.

## 4. Homepage changes

Proposed title:

> Mote Desktop | Control Philips Hue from Windows

Proposed H1:

> Control your Philips Hue lights from Windows

Proposed meta description, subject to feature verification:

> Control compatible Philips Hue lights and accessories from your Windows PC with Mote Desktop. Explore features, requirements and the Microsoft Store download.

Proposed introductory copy based on the conversation's core description:

> Mote Desktop is a Windows app for controlling compatible Philips Hue lights and accessories over your local network.

Optional second paragraph, publish only after confirming feature availability and tier:

> Mote Pro adds PC Sync, advanced widgets, custom dashboards and support for multiple Hue Bridges.

Do not publish the earlier broad hero draft's screen-sync and dashboard claims without qualifying their tier and limitations. Explain “PC Sync” in ordinary language once its exact behavior is verified.

Implement:

- Unique title and description, one clear primary H1, and useful H2 sections rather than repeated keyword headings.
- Visible product explanation and primary **Get Mote Desktop on Microsoft Store** link near the top. Confirm product ID and destination; do not invent a Store URL.
- An authentic app screenshot with a factual caption and meaningful alternative text.
- Short sections covering core control, verified Pro features, requirements, setup, pricing/tier differences and FAQ.
- Links to setup, features, support and privacy information through ordinary crawlable links.
- Canonical URL using the chosen production hostname, plus Open Graph title, description and a real preview image.
- Important text and links available in initial or reliably rendered HTML. Test what crawlers actually receive.
- Responsive layout, readable text, accessible buttons and stable image dimensions. Check page speed and fix observed bottlenecks without inventing a performance score target.
- A concise compatibility/non-affiliation statement where users need it, using wording approved by the owner. Do not use Philips Hue logos or other third-party brand assets without documented permission.

Acceptance: inspect rendered HTML and page source at the canonical production URL; verify a single indexable 200 response, metadata, heading order, ordinary anchor links, screenshot dimensions/alt text and the Store destination. Confirm no placeholders, staging hosts or unsupported claims remain. Record the deployed URL, commit/release identifier, check date and checker.

## 5. Indexing, Search Console and sitemap

First establish a baseline. Do not diagnose non-indexing from a single manual search or treat a `site:` query as a complete index inventory.

1. Choose the canonical HTTPS hostname and inspect redirects from alternate hostnames and HTTP. Eliminate loops and duplicate indexable versions.
2. Check intended public pages return HTTP 200, with no accidental `noindex`, blocking `X-Robots-Tag`, authentication requirement or robots restriction. Keep private and staging pages protected.
3. Review canonical tags and rendering. Ensure each indexable page has a coherent canonical destination and accessible main content.
4. Generate `/sitemap.xml` from real canonical public routes. Use absolute URLs and include only intended indexable URLs; exclude redirects, errors and duplicates. Emit `<lastmod>` only when it reflects the last significant page change. Omit `changefreq` and `priority`; Google ignores them.
5. Add the absolute sitemap location to `/robots.txt`. Test both resources in production.
6. Verify the domain in Google Search Console using an owner-controlled method. If access is unavailable, document the exact owner action and continue repository work.
7. Submit the sitemap and use URL Inspection for the homepage and a representative guide. Record both the indexed result and, when troubleshooting, the live-test result; they answer different questions. Record discovery, crawl status, user-declared canonical, Google-selected canonical and rendered HTML. Request indexing once after material fixes where available; requests are quota-limited and do not guarantee indexing.
8. Set up or verify Bing Webmaster Tools and submit the same canonical sitemap where the owner has access.
9. Recheck indexing reports weekly. Investigate exclusions by reason; repeated submissions are not a substitute for fixing technical or content issues.

Sitemap submission helps discovery but does not guarantee indexing. Follow Google's [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [sitemap construction guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [URL Inspection documentation](https://support.google.com/webmasters/answer/9012289) when implementing.

## 6. Page architecture and content plan

Proposed paths are suggestions; reuse equivalent existing pages. Link every published page from a relevant parent or related article.

| Page | Purpose and required substance | Priority |
| --- | --- | --- |
| `/` | Product/category explanation, screenshot, requirements, download | First 48 hours |
| `/guides/control-philips-hue-from-windows/` | Tested installation, pairing and first-control steps, screenshots, troubleshooting | First 48 hours or week 1 |
| `/features/desktop-widgets/` | Actual widget types, workflow, limitations, tier and screenshots | Weeks 2–3 if supported |
| `/features/pc-sync/` | What sync does, setup, hardware/OS/tier requirements and limitations | Weeks 2–3 if supported |
| `/pricing/` | Verified base/Pro differences, purchase model and links; avoid stale price claims | Week 1 |
| `/support/` | Contact route, compatibility and common connection problems | Week 1 |
| `/privacy/` | Actual data handling consistent with the application | Verify immediately |

Content sequence:

1. Publish the practical Windows setup guide first. Lead with a direct answer, list prerequisites, give numbered tested steps and explain recovery when pairing fails.
2. Add a troubleshooting guide based on issues actually reproducible in the app or reported through support. Do not advise disabling security software broadly.
3. Publish focused widget and PC Sync explanations with current screenshots and clear base/Pro labels.
4. Consider a comparison page only after researching current alternatives from primary sources. Describe use-case differences with dated evidence; avoid unsupported superiority claims.

Each guide needs a descriptive title, concise answer, original useful detail, internal links, a relevant Store CTA, and a genuine review/update date. Do not generate bulk thin pages, fake freshness or unrelated keyword articles.

## 7. Microsoft Store listing

Inspect the current listing, package type, markets and listing languages in Partner Center before changing fields. Preserve the brand title: Store policy says titles must not contain marketing text or extraneous keywords. Metadata and screenshots must accurately represent the shipping product. For the current MSIX flow, Microsoft documents at most seven keywords, at most 40 characters each and at most 21 words across all keywords; confirm that the same fields and limits appear for this submission type. Store policy also forbids using another product's title as a search term, so do not submit **Philips Hue**, **Hue**, **Windows** or another third-party product title in the hidden keyword field unless Partner Center/Microsoft confirms the use is permitted for this listing. This restriction does not prevent an accurate compatibility explanation in customer-visible copy, subject to rights and policy review. Sources: [Store policies](https://learn.microsoft.com/en-us/windows/apps/publish/store-policies), [MSIX additional information](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/add-additional-information) and [Microsoft trademark guidance](https://learn.microsoft.com/en-us/windows/apps/publish/partner-center/trademark-and-copyright-protection).

### Proposed description

Use after verifying the underlying claims:

> Control compatible Philips Hue lights and accessories from your Windows PC with Mote Desktop over your local network.
>
> Use Mote Desktop to manage your lighting from your computer. Check the requirements below to confirm compatibility with your setup.

Then add concrete, verified base-feature bullets. Follow with a separate **Mote Pro** section describing confirmed paid features and the purchase model. End with requirements, limitations and the verified support URL. Do not leave instruction text in the customer-facing listing.

Conditional Pro sentence:

> Mote Pro adds PC Sync, advanced widgets, custom dashboards and support for multiple Hue Bridges.

### Candidate keyword slots

These deliberately exclude third-party product titles. Validate each against the shipping app, duplication in the title/description, the actual Partner Center field and the total word/character limits before submission:

1. smart lighting
2. light controller
3. desktop widgets — only if supported
4. screen sync — only if that accurately describes PC Sync
5. lighting dashboard — only if supported
6. multi bridge — only if supported and understandable to customers
7. local network control

Treat this as a candidate pool, not a requirement to fill seven slots. Prefer terms backed by acquisition data; omit weak, redundant, promotional or ambiguous terms. Record the final set per listing language and do not mechanically translate English search behavior.

### Screenshot sequence

1. Core control screen: show the actual primary lighting workflow.
2. Relevant room/light organization: only if supported.
3. Desktop widgets: label Pro if applicable.
4. Custom dashboard: label Pro if applicable.
5. PC Sync: explain the actual effect; label Pro and requirements where relevant.
6. Multiple bridges or setup: whichever is most useful and verified.

Use readable captures from the current build, concise factual captions and consistent framing. Exclude personal data, fabricated UI and unsupported outcome imagery. For the current MSIX desktop guidance, screenshots are PNG, at least 1366 × 768, no larger than 50 MB; one is required, up to ten desktop screenshots are accepted, and Microsoft suggests at least four for a supported device family. Recheck the live submission flow because requirements can vary by package/device family. Keep critical UI and text in the top two-thirds, where Store overlays are less likely to obscure them. Include fewer screenshots if fewer distinct features warrant them. Source: [Microsoft Store screenshot guidance](https://learn.microsoft.com/en-us/windows/apps/publish/publish-your-app/msix/screenshots-and-images).

Acceptance: listing copy matches app behavior and website tier labels, Store links work, screenshots match the released UI, and the selected category and supported languages are accurate.

## 8. FAQ content specification

Publish plain visible questions and answers. The first draft may use the core definition below; all remaining answers require project evidence.

| Question | Answer requirements |
| --- | --- |
| What is Mote Desktop? | A Windows app for controlling compatible Philips Hue lights and accessories over a local network; verify before publishing. |
| Can I control Philips Hue lights from my PC? | Describe the tested Mote workflow, requirements and download link. |
| Do I need a Hue Bridge? | State the actual requirement and supported models; explicitly address Bluetooth-only setups if known. |
| Which Windows versions are supported? | Use current package and tested support information. |
| What is included in Mote Pro? | List confirmed features and purchase model; link to the maintained tier comparison. |
| Can I sync lights with my screen? | Explain verified PC Sync behavior, supported configurations, tier and limitations. |
| Does Mote Desktop work without internet? | Distinguish local lighting control from setup, licensing, updates and other network dependencies. |
| Can I use multiple Hue Bridges? | State confirmed tier and any tested limits. |
| Is Mote Desktop an official Philips Hue app? | State the actual publisher relationship without implying endorsement. |
| What should I do if my lights are not found? | Link to tested pairing/network troubleshooting and support. |

Do not publish unanswered questions, guessed compatibility or placeholder responses. A visible FAQ is useful independently of structured data. Do not add `QAPage` markup to a publisher-written FAQ. `FAQPage` markup is optional and has little expected Google presentation value for this product: Google limits FAQ rich results mainly to well-known authoritative government and health sites. Do not promise an FAQ rich result. Source: [Google's FAQ rich-result change](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

## 9. SoftwareApplication JSON-LD

Add one consistent product entity to the homepage or primary app page. This minimal draft is valid as a proposed Schema.org entity but is intentionally incomplete for Google's software-app rich-result eligibility. It encodes only the conversation's core description; verify it before use:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://motedesktop.com/#software",
  "name": "Mote Desktop",
  "url": "https://motedesktop.com/",
  "operatingSystem": "Windows",
  "applicationCategory": "UtilitiesApplication",
  "description": "A Windows app for controlling compatible Philips Hue lights and accessories over a local network."
}
```

Implementation requirements:

- Align hostname, category and description with the actual product and visible page.
- Add verified publisher, screenshot and official install URL (`installUrl`) only when known and visible or supported by the page.
- Add offers only after confirming the actual purchase model, price and currency. Never infer a zero price from the existence of a paid tier; represent base/Pro differences accurately.
- Omit `aggregateRating` and `review` unless genuine, eligible supporting data is available. Do not manufacture them to satisfy a validator.
- Validate JSON syntax and Schema.org vocabulary with the Schema Markup Validator. Then use Google's Rich Results Test to assess Google feature eligibility and URL Inspection to confirm Google receives the deployed markup. Record errors, warnings and the tested URL/date; do not describe a clean Schema.org validation as rich-result eligibility.

This minimal entity is not eligible for Google's software-app rich result by itself. Current Google documentation requires `name`, `offers.price`, and either `aggregateRating` or `review` for that presentation. If genuine required data is unavailable, retain truthful Schema.org markup only if it serves a documented entity-consistency purpose, or omit it; document the eligibility limitation. Never change facts merely to eliminate a validation warning. Source: [Google's SoftwareApplication documentation](https://developers.google.com/search/docs/appearance/structured-data/software-app).

## 10. AI discoverability and external evidence

Use the same product name, category, canonical website and feature facts throughout the site and Store. Make requirements, tier distinctions and support answers easy to quote accurately. Link official profiles only after verifying ownership.

Google documents that ordinary SEO practices support its AI search features and that no special AI schema is required. Pages need to be indexed and eligible to appear with a snippet to qualify as supporting links, but inclusion is not guaranteed. Follow the current [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) and [generative-AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). Review crawler and snippet controls deliberately; do not assume search indexing, AI retrieval and model training are identical permissions. Google says it ignores `llms.txt` for Search, so it is not a priority or a substitute for crawlable, accurate pages.

Prepare a small public information kit: factual description, current screenshots, requirements, base/Pro table, official Store URL, website and support contact. Keep it consistent with the release.

Build a qualified shortlist of 5–10 relevant Hue/Windows communities, software directories and reviewers. For each candidate, record audience fit, example coverage, current submission/promotion rule, contact route, proposed angle, disclosure wording and status. Propose useful setup demonstrations or request an honest independent review with clear developer affiliation. Obtain authorization before sending messages. Do not buy links, fabricate discussions, seed undisclosed endorsements or submit to unrelated directories at scale.

Invite genuine users to leave honest feedback at an appropriate point in their experience, following the current Store rules. Do not gate requests by predicted sentiment, condition support on a review, or reward positive ratings. Track authentic mentions and referral visits; more mentions do not automatically mean higher rankings.

## 11. Prioritized execution

### First 48 hours

| Order | Work | Completion evidence |
| --- | --- | --- |
| P0 | Verify product facts, current routes and official Store URL | Claim/evidence table, unresolved questions listed |
| P0 | Capture search and Store baseline where access exists | Dated exports with property, market and date range, or explicit access limitations |
| P0 | Inspect and fix demonstrated indexing blockers | URL-by-URL HTTP, robots, canonical, sitemap and rendered-content checks |
| P0 | Update homepage positioning, metadata and CTA | Reviewed page and mobile/desktop check |
| P1 | Produce sitemap and verify Search Console setup | Valid production sitemap; submission/inspection record or named owner action |
| P1 | Prepare Store copy, keyword candidates and screenshot plan | Complete reviewable listing draft |
| P1 | Add truthful app JSON-LD and essential FAQ answers | Validation results and factual review |
| P1 | Draft tested setup guide | Reproducible steps and original captures |

Complete work that can proceed without account access. Never claim an account configuration, submission or deployment was completed without evidence.

### First 30 days

- **Week 1:** finish the setup guide, requirements/tier information and authorized website/Store updates. Confirm production pages and links after release.
- **Week 2:** publish one or two substantial feature pages if supported; improve troubleshooting from real support evidence. Inspect indexing exclusions.
- **Week 3:** qualify 5–10 reviewer/community candidates and, where authorized, contact no more than five strong matches with individualized pitches. Keep an outreach log and record sends, responses, declines and published mentions. A response or link is not a completion dependency.
- **Week 4:** compare search visibility and Store acquisition with baseline. Improve pages attracting relevant impressions but weak engagement; revise confusing listing assets. Set the next month's priorities from observed data.

Do not expand to more content until foundational pages are accurate and usable. Track release dates so later analysis can distinguish changes and acknowledge confounding factors.

## 12. Measurement and success criteria

Separate delivery criteria from desired market outcomes. The first month is an observation window, not a ranking guarantee.

| Metric | Baseline and cadence | Success criterion or interpretation |
| --- | --- | --- |
| Technical readiness | Inspect at baseline and each release | 100% of the agreed indexable URL inventory returns a single final 200 response, declares the intended canonical, exposes its main content and has no accidental robots or `noindex` block |
| Factual quality | Review each publication | 100% of product/compatibility/tier claims have a current ledger entry; zero placeholders, invented reviews or unmarked paid-feature claims |
| Sitemap coverage | Check each release | 100% of the agreed canonical URL inventory is represented; zero redirect, error, duplicate or intentionally non-indexable URLs |
| Search indexing | Search Console weekly | Homepage and priority guide indexed as a desired outcome; investigate non-indexed pages by recorded reason |
| Non-brand discovery | Search Console weekly and day 30 | Record impressions, clicks, CTR and average position for a saved non-brand query filter; seek growth against baseline, not a promised position |
| Relevant query reach | Count distinct observed target-intent queries | Establish first non-brand impressions if baseline is zero; report absolute counts and data limitations |
| Website-to-Store engagement | Track outbound Store CTA clicks with a documented event name and denominator | Event fires once per intentional click in QA; compare clicks and rate over equal windows; outbound clicks are not installs |
| Store acquisition | Available Partner Center reports weekly | Record listing visits, acquisitions and market/date filters where exposed; compute conversion only from compatible definitions and periods |
| External discovery | Monthly candidate/outreach/mention log | Every candidate has a relevance rationale and checked promotion rule; record authorized sends, responses, authentic mentions and attributable traffic; no backlink or positive-response quota |
| AI visibility | Fixed small prompt set at baseline and day 30 | Log system, date, locale, prompt, browsing mode, mention accuracy and cited URL; exploratory evidence only |

At baseline, save available preceding-period data or record that the launch history is too short. Compare equal windows when possible; do not invent a prior 30-day period or report percentage growth from zero. Separate branded from non-branded queries. Small samples, reporting delays and changing rankings limit causal conclusions.

Day-30 review must include completed changes, unresolved blockers, indexing status, absolute search/Store metrics, data gaps and three prioritized next actions. Set numerical growth targets only after observing a usable baseline; they are planning targets, not guarantees.

## 13. Required agent handoff

Return the following with implementation work:

1. Files and routes changed, plus a concise explanation of the user-visible result.
2. Product claim/evidence table and remaining owner questions.
3. Final homepage and Store copy, selected keywords and screenshot assets/captions.
4. Sitemap, canonical, rendering and JSON-LD validation evidence.
5. Published/submitted status versus draft status, with account-dependent actions clearly identified.
6. Baseline measurement record, tracking definitions and next review date.

Completion means accurate, reviewable changes with recorded checks. It does not mean asserting that rankings, indexing or AI citations have already improved.

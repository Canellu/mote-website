/** The live Microsoft Store listing, without any attribution attached. */
export const MICROSOFT_STORE_URL = "https://apps.microsoft.com/detail/9p910jmmp9sz";

/**
 * Which call to action sent the reader to the Store. Microsoft reports
 * acquisitions broken down by this value in Partner Center, so it answers the
 * question the site cannot answer about itself: not how many people clicked,
 * but how many of them installed, and from which button.
 *
 * It matters because the site's analytics are deliberately cookieless and
 * page-view-only — Cloudflare Web Analytics has no custom events — so this is
 * where click-through lives instead. It also measures further down the funnel
 * than a click event would.
 */
type StoreCampaign =
  | "web-header"
  | "web-hero"
  | "web-footer"
  | "web-compare"
  | "web-guide"
  | "web-pc-sync"
  | "web-widgets";

export function storeUrl(campaign: StoreCampaign): string {
  return `${MICROSOFT_STORE_URL}?cid=${campaign}`;
}

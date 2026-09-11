/**
 * Cloudflare Web Analytics, and nothing else.
 *
 * It was chosen for what it does not do. There are no cookies and no
 * identifier stored on the reader's device, so the site never has to ask
 * permission to measure it and never grows a consent banner — which matters for
 * a product whose whole argument is that it keeps your lighting on your own
 * network. The trade is that it counts page views and Core Web Vitals and
 * nothing more: it has no custom events, so the click through to the Store is
 * measured on Microsoft's side instead, through the campaign IDs in links.ts.
 *
 * The token is a build-time value. Without it — a local `bun dev`, a fork, a
 * preview build — this returns nothing and no third-party script is served at
 * all, rather than a beacon posting to somebody else's dashboard.
 */
const BEACON_SOURCE = "https://static.cloudflareinsights.com/beacon.min.js";

export function analyticsScripts() {
  const token = import.meta.env.VITE_CF_BEACON_TOKEN;
  if (!token) return [];

  return [
    {
      src: BEACON_SOURCE,
      defer: true,
      "data-cf-beacon": JSON.stringify({ token }),
    },
  ];
}

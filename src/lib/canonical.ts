/** The single origin every canonical URL, sitemap entry and absolute link uses. */
export const SITE_URL = "https://motedesktop.com";

/**
 * Cloudflare Pages serves every prerendered route from its own directory, so it
 * 308-redirects /features to /features/. A canonical tag or sitemap entry
 * written without the slash names that redirect rather than the 200 answering
 * it, which fails the single-final-response bar the discoverability record
 * measures against.
 *
 * This lives in its own dependency-free module because the sitemap generator
 * runs under tsconfig.node.json and the page metadata under tsconfig.app.json.
 * Sharing one leaf file is what keeps a sitemap entry and the canonical tag on
 * the page it names from ever disagreeing about the slash.
 */
export function canonical(path: string) {
  const url = new URL(path, SITE_URL);
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.toString();
}

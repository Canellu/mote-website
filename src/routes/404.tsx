import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "../components/not-found";

/*
 * Prerendered only so scripts/write-404.mjs can copy it to dist/client/404.html.
 * Without that file Cloudflare Pages treats the site as a SPA and answers every
 * unknown path with the home page and a 200, which Search Console reports as a
 * soft 404 and a duplicate of the home page.
 */
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page not found — Mote Desktop" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFound,
});

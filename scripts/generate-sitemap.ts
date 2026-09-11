import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonical } from "../src/lib/canonical";

const inventoryPath = path.resolve("scripts/public-routes.json");
const sitemapPath = path.resolve("public/sitemap.xml");
const inventory = JSON.parse(await readFile(inventoryPath, "utf8")) as { paths: string[] };

// canonical() comes from the page metadata so a sitemap entry and the canonical
// tag on the page it names can never disagree about the trailing slash.
const urls = inventory.paths.map((route) => `  <url><loc>${canonical(route)}</loc></url>`);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(sitemapPath, sitemap, "utf8");
console.log(`Generated sitemap for ${inventory.paths.length} canonical public routes.`);

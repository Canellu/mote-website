import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://motedesktop.com";
const inventoryPath = path.resolve("scripts/public-routes.json");
const sitemapPath = path.resolve("public/sitemap.xml");
const inventory = JSON.parse(await readFile(inventoryPath, "utf8")) as { paths: string[] };

const urls = inventory.paths.map((route) => {
  const canonical = new URL(route, siteUrl).toString();
  return `  <url><loc>${canonical}</loc></url>`;
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

await writeFile(sitemapPath, sitemap, "utf8");
console.log(`Generated sitemap for ${inventory.paths.length} canonical public routes.`);

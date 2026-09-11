import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const inventory = JSON.parse(await readFile(path.resolve("scripts/public-routes.json"), "utf8"));
const routes = inventory.paths.map((route) => route.replace(/^\//, ""));
// Served from public/ during development, so they are in the copy Vite makes of
// it; a plugin removes them again after the client build. This is the assertion
// that the removal actually happened before anything is deployed.
const devOnlyAssets = ["visual-check.html", "visual-check.js"];
const outputDirectory = path.resolve("dist/client");

for (const route of routes) {
  const htmlPath = path.join(outputDirectory, route, "index.html");
  await access(htmlPath, constants.R_OK);
  const html = await readFile(htmlPath, "utf8");

  if (!html.includes("<main") || !html.includes("<title>")) {
    throw new Error(`${htmlPath} is missing prerendered page content or metadata.`);
  }
}

for (const asset of devOnlyAssets) {
  const assetPath = path.join(outputDirectory, asset);
  const shipped = await access(assetPath, constants.R_OK).then(
    () => true,
    () => false,
  );

  if (shipped) {
    throw new Error(`${assetPath} is a development-only asset and must not be deployed.`);
  }
}

console.log(`Verified prerendered HTML for ${routes.length} public routes.`);

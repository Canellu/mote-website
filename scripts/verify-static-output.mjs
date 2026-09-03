import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const routes = ["", "features", "privacy", "terms", "support"];
const outputDirectory = path.resolve("dist/client");

for (const route of routes) {
  const htmlPath = path.join(outputDirectory, route, "index.html");
  await access(htmlPath, constants.R_OK);
  const html = await readFile(htmlPath, "utf8");

  if (!html.includes("<main") || !html.includes("<title>")) {
    throw new Error(`${htmlPath} is missing prerendered page content or metadata.`);
  }
}

console.log(`Verified prerendered HTML for ${routes.length} public routes.`);

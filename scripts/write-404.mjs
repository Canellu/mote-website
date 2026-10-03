import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

// Cloudflare Pages answers unknown paths with the nearest 404.html and a 404
// status. The /404 route is prerendered as a directory like every other route,
// so it is moved to the file name Pages looks for and the directory removed,
// leaving no indexable /404/ page behind.
const outputDirectory = path.resolve("dist/client");
const prerendered = path.join(outputDirectory, "404", "index.html");

const html = await readFile(prerendered, "utf8");
if (!html.includes('name="robots" content="noindex"')) {
  throw new Error(`${prerendered} is missing its noindex tag.`);
}

await writeFile(path.join(outputDirectory, "404.html"), html, "utf8");
await rm(path.join(outputDirectory, "404"), { recursive: true });
console.log("Wrote dist/client/404.html.");

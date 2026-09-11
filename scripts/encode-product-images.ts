/**
 * Re-encodes every product capture as AVIF and WebP at the widths the site
 * actually paints them at.
 *
 * The PNGs in public/product are the originals and stay that way: they are what
 * the capture scripts produce and what PROVENANCE.md accounts for. What ships to
 * a reader is one of the files this writes into public/product/derived, which
 * the build copies verbatim like the rest of public/. The outputs are committed
 * so that a clone, a CI build, and the dev server all serve the same bytes
 * without needing an encoder.
 *
 * Run it after adding or replacing a capture:
 *
 *   bun scripts/encode-product-images.ts
 *
 * It is idempotent — an output newer than its source is left alone — so the
 * build can call it without paying for the encode every time.
 */
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { Sharp } from "sharp";
import { CAPTURE_FORMATS, captureWidths } from "../src/lib/capture-variants.ts";
import type { CaptureFormat } from "../src/lib/capture-variants.ts";

const sourceDirectory = path.resolve("public/product");
const derivedDirectory = path.join(sourceDirectory, "derived");

/*
 * Product captures are dense user interface: small text, thin borders, flat
 * fills with hard edges. That is the worst case for chroma subsampling, which
 * is why both encoders keep full colour resolution here even though it costs a
 * few kilobytes — orange text on a dark panel is exactly what 4:2:0 smears.
 * The quality figures are chosen against that text rather than against the
 * gradients, and the slow effort settings are affordable because this runs once
 * per capture rather than once per request.
 */
const encoders: Record<CaptureFormat, (image: Sharp) => Sharp> = {
  avif: (image) => image.avif({ quality: 62, effort: 6, chromaSubsampling: "4:4:4" }),
  webp: (image) => image.webp({ quality: 82, effort: 6, smartSubsample: true }),
};

async function modifiedAt(file: string): Promise<number> {
  return stat(file).then(
    (stats) => stats.mtimeMs,
    () => 0,
  );
}

async function encodeCapture(fileName: string) {
  const source = path.join(sourceDirectory, fileName);
  const sourceModified = await modifiedAt(source);
  const metadata = await sharp(source).metadata();
  const intrinsicWidth = metadata.width;

  if (!intrinsicWidth) throw new Error(`${fileName} has no readable width.`);

  const written: string[] = [];
  const kept: string[] = [];

  for (const width of captureWidths(intrinsicWidth)) {
    for (const format of CAPTURE_FORMATS) {
      const name = `${fileName.replace(/\.png$/, "")}-${width}.${format}`;
      const destination = path.join(derivedDirectory, name);
      kept.push(name);

      if ((await modifiedAt(destination)) > sourceModified) continue;

      const resized = sharp(source).resize({ width, withoutEnlargement: true });
      await writeFile(destination, await encoders[format](resized).toBuffer());
      written.push(name);
    }
  }

  return { kept, written };
}

const captures = (await readdir(sourceDirectory)).filter((name) => name.endsWith(".png")).sort();

await mkdir(derivedDirectory, { recursive: true });

const expected = new Set<string>();
let writtenCount = 0;

for (const capture of captures) {
  const { kept, written } = await encodeCapture(capture);
  for (const name of kept) expected.add(name);
  writtenCount += written.length;
  if (written.length > 0) console.log(`${capture} -> ${written.join(", ")}`);
}

// A capture that was removed or renamed would otherwise leave its encodes
// behind to be copied into the build forever.
const stale = (await readdir(derivedDirectory)).filter((name) => !expected.has(name));
for (const name of stale) await rm(path.join(derivedDirectory, name));

console.log(
  `${captures.length} captures, ${expected.size} derived files (${writtenCount} written, ${stale.length} stale removed).`,
);

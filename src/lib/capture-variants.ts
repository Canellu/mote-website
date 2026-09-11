/**
 * The one place that knows how a product capture is re-encoded and named.
 *
 * The captures are the site's dominant payload — two of them are over a
 * megabyte of PNG for a picture that never paints wider than about 500 CSS
 * pixels — so every one of them is also published as AVIF and WebP at a few
 * widths. `scripts/encode-product-images.ts` writes those files and this module
 * addresses them; both import the ladder from here so a new width is a one-line
 * change that cannot drift between the writer and the reader.
 *
 * The original PNG stays the `src` of the `<img>`. It is the last resort rather
 * than the expected download: anything that understands `<picture>` takes one
 * of the modern formats first.
 */

/**
 * The widths worth keeping. 480 covers the features page at 1x, 960 covers it
 * at 2x and the home page at 1x, and 1440 covers the home page at 2x. Anything
 * finer is a file nobody downloads.
 */
export const CAPTURE_LADDER = [480, 960, 1440] as const;

/** Where the encoder writes, relative to the site root. */
export const DERIVED_DIRECTORY = "/product/derived";

/** The formats generated for every capture, widest support last. */
export const CAPTURE_FORMATS = ["avif", "webp"] as const;

export type CaptureFormat = (typeof CAPTURE_FORMATS)[number];

const LARGEST = CAPTURE_LADDER[CAPTURE_LADDER.length - 1];

/**
 * The widths to encode a capture at, given the width it was captured at. Never
 * upscales, and never emits a step within a hair of the one below it: a 988px
 * source alongside a 960px step is the same picture twice.
 */
export function captureWidths(intrinsicWidth: number): number[] {
  const steps: number[] = CAPTURE_LADDER.filter((width) => width < intrinsicWidth);
  const largest = steps[steps.length - 1];

  if (largest === undefined) return [intrinsicWidth];
  if (intrinsicWidth <= LARGEST && intrinsicWidth >= largest * 1.15) steps.push(intrinsicWidth);

  return steps;
}

/** `/product/mote-dashboard-dark.png` at 960 in AVIF. */
export function captureVariantPath(src: string, width: number, format: CaptureFormat): string {
  const name = src.slice(src.lastIndexOf("/") + 1).replace(/\.png$/, "");
  return `${DERIVED_DIRECTORY}/${name}-${width}.${format}`;
}

export function captureSrcSet(src: string, intrinsicWidth: number, format: CaptureFormat): string {
  return captureWidths(intrinsicWidth)
    .map((width) => `${captureVariantPath(src, width, format)} ${width}w`)
    .join(", ");
}

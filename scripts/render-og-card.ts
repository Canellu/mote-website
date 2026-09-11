/**
 * Renders scripts/og-card.html to public/brand/mote-social-card.png — the image
 * every Slack, Discord, X and iMessage preview of this site shows.
 *
 * It drives whichever Chromium is already installed on the machine rather than
 * pulling a browser down for one screenshot: the card is a page, and a page
 * needs a page renderer. Captured at twice the size and resampled back down, so
 * the type is as clean as the site's own.
 *
 *   bun scripts/render-og-card.ts
 *
 * Re-run it after changing the card's copy, the capture it frames, or the brand
 * icon. The result is committed, so nothing at build time depends on a browser
 * being present.
 */
import { spawn } from "node:child_process";
import { access, mkdtemp, rm } from "node:fs/promises";
import { constants } from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

/** The card's published size, fixed by what the social platforms crop to. */
const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;

const CHROMIUM_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

async function findChromium(): Promise<string> {
  for (const candidate of CHROMIUM_CANDIDATES) {
    const usable = await access(candidate, constants.X_OK).then(
      () => true,
      () => false,
    );
    if (usable) return candidate;
  }

  throw new Error(
    "No Chrome or Edge found. Install one, or add its path to CHROMIUM_CANDIDATES in this script.",
  );
}

function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { stdio: "ignore" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${path.basename(command)} exited with ${code}`)),
    );
  });
}

const browser = await findChromium();
// Chrome refuses to share a profile with a running instance, and this runs on a
// machine where one usually is.
const profile = await mkdtemp(path.join(os.tmpdir(), "mote-og-"));
const shot = path.join(profile, "card.png");
const source = pathToFileURL(path.resolve("scripts/og-card.html")).href;
const destination = path.resolve("public/brand/mote-social-card.png");

try {
  await run(browser, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    `--user-data-dir=${profile}`,
    `--force-device-scale-factor=${SCALE}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    // Lets the webfont and both captures settle before the frame is taken.
    "--virtual-time-budget=6000",
    `--screenshot=${shot}`,
    source,
  ]);

  const rendered = sharp(shot);
  const { width, height } = await rendered.metadata();
  if (width !== WIDTH * SCALE || height !== HEIGHT * SCALE) {
    throw new Error(
      `Expected a ${WIDTH * SCALE}x${HEIGHT * SCALE} capture, got ${width}x${height}`,
    );
  }

  await rendered
    .resize({ width: WIDTH, height: HEIGHT, fit: "fill" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(destination);

  console.log(`Wrote ${path.relative(process.cwd(), destination)} at ${WIDTH}x${HEIGHT}.`);
} finally {
  await rm(profile, { force: true, recursive: true });
}

// Record the sibling app's real UI from lossless browser frames, then encode once.
// See scripts/record-hero-demo.md for dependencies and the local-only fixture.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const fs = require("node:fs/promises");
const path = require("node:path");
const fixture = require("./hero-demo-fixture.cjs");
const seed = require("./hero-demo-setup.cjs");
const fps = 24;
const out = path.resolve(__dirname, "../public/product");
const work = path.resolve(__dirname, "../node_modules/.cache/hero-demo");

async function main() {
  await fs.mkdir(work, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 960, height: 1060 },
    deviceScaleFactor: 2.5,
  });
  await context.addInitScript(({ lights, roomZones }) => {
    localStorage.setItem("themeMode", "dark");
    let callbackId = 0;
    window.__TAURI_INTERNALS__ = {
      invoke: async (command) => {
        if (command === "get-hue-session")
          return {
            configured: true,
            connected: true,
            bridgeId: "demo",
            bridgeIp: "192.168.1.2",
            error: null,
          };
        if (command === "get-hue-lights") return lights;
        if (command === "get-hue-rooms") return roomZones.filter((x) => x.resourceType === "room");
        if (command === "get-hue-zones") return roomZones.filter((x) => x.resourceType === "zone");
        if (command === "get-hue-home-name") return "Home";
        if (command === "get-host-sync-status")
          return { state: "idle", areaId: null, error: null, warning: null };
        if (command === "get-host-sync-overview")
          return { displays: [], preferences: { automaticDisplay: true, displayIds: [] } };
        if (
          [
            "get-hue-scenes",
            "get-hue-resource",
            "get-hue-accessory-services",
            "list-widgets",
          ].includes(command)
        )
          return [];
        return null;
      },
      transformCallback(callback) {
        const id = ++callbackId;
        window[`_${id}`] = callback;
        return id;
      },
      unregisterCallback(id) {
        delete window[`_${id}`];
      },
    };
  }, fixture);
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  await page.goto(process.env.MOTE_URL || "http://127.0.0.1:1420");
  await page.getByText("Studio", { exact: true }).waitFor();
  await seed(page);
  await page.getByRole("button", { name: "Send feedback" }).evaluate((el) => {
    el.style.display = "none";
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const pointer = document.createElement("div");
    pointer.id = "capture-pointer";
    pointer.style.cssText =
      "position:fixed;left:0;top:0;width:24px;height:30px;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 2px 3px #0009);transform:translate(910px,1000px)";
    pointer.innerHTML =
      '<svg viewBox="0 0 24 30"><path d="M3 2v23l6-6 5 9 4-2-5-9h9Z" fill="white" stroke="#171717" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    document.body.append(pointer);
  });
  await page.waitForTimeout(700);

  const ffmpeg = spawn(
    process.env.FFMPEG_PATH || "ffmpeg",
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "warning",
      "-f",
      "image2pipe",
      "-framerate",
      String(fps),
      "-vcodec",
      "png",
      "-i",
      "pipe:0",
      "-an",
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "18",
      "-b:v",
      "0",
      "-row-mt",
      "1",
      "-cpu-used",
      "4",
      "-pix_fmt",
      "yuv420p",
      path.join(work, "demo.webm"),
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "17",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      path.join(work, "demo.mp4"),
    ],
    { stdio: ["pipe", "ignore", "inherit"], windowsHide: true },
  );
  const completed = once(ffmpeg, "close");
  ffmpeg.stdin.on("error", () => {});
  let frameCount = 0;
  const chapters = [];
  async function write(buffer, count = 1) {
    for (let i = 0; i < count; i++) {
      if (!ffmpeg.stdin.write(buffer)) await once(ffmpeg.stdin, "drain");
      frameCount++;
    }
  }
  async function frame() {
    await write(await page.screenshot());
  }
  async function hold(seconds) {
    await write(await page.screenshot(), Math.round(seconds * fps));
  }
  async function animate(seconds = 0.5) {
    for (let i = 0; i < Math.round(seconds * fps); i++) await frame();
  }
  async function chapter(name) {
    chapters.push({ name, seconds: frameCount / fps });
    process.stdout.write(`${(frameCount / fps).toFixed(1)}s ${name}\n`);
    await page.screenshot({ path: path.join(work, `${chapters.length}.png`), scale: "css" });
  }
  let cursor = { x: 910, y: 1000 };
  async function move(x, y, seconds = 0.7) {
    const start = cursor;
    const steps = Math.round(seconds * fps);
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const ease = t * t * (3 - 2 * t);
      cursor = { x: start.x + (x - start.x) * ease, y: start.y + (y - start.y) * ease };
      await page.mouse.move(cursor.x, cursor.y);
      await page.evaluate(({ x, y }) => {
        document.getElementById("capture-pointer").style.transform = `translate(${x}px,${y}px)`;
      }, cursor);
      await frame();
    }
  }
  async function click(locator) {
    const box = await locator.boundingBox();
    if (!box) throw new Error("Capture target is not visible");
    await move(box.x + box.width / 2, box.y + box.height / 2);
    await hold(0.25);
    await page.mouse.down();
    await frame();
    await page.mouse.up();
    await animate();
  }
  async function dragSlider(locator, from, to) {
    // Base UI's accessible range input is visually hidden; drag its real track.
    const box = await locator.evaluate((element) => {
      const track = element
        .closest('[data-slot="slider"]')
        .querySelector('[data-slot="slider-track"]');
      const { x, y, width, height } = track.getBoundingClientRect();
      return { x, y, width, height };
    });
    if (!box) throw new Error("Slider is not visible");
    await move(box.x + box.width * from, box.y + box.height / 2);
    await page.mouse.down();
    await move(box.x + box.width * to, box.y + box.height / 2, 1.35);
    await page.mouse.up();
    await animate(0.25);
  }
  async function assertLight(check, message) {
    const valid = await page.evaluate(
      async ({ check }) => {
        const { useHueResourcesStore } = await import("/src/stores/HueResourcesStore.tsx");
        const light = useHueResourcesStore.getState().lights.find((x) => x.id === "desk");
        if (check === "dimmed") return light.brightness < 50;
        if (check === "scene") return light.xy[0] < 0.4;
        if (check === "white") return light.ct > 250;
        return false;
      },
      { check },
    );
    if (!valid) throw new Error(message);
  }
  try {
    await page.screenshot({ path: path.join(work, "poster.png") });
    await chapter("Your rooms, together");
    await hold(3);
    await dragSlider(
      page.getByRole("slider", { name: "Studio brightness", exact: true }),
      0.68,
      0.38,
    );
    await assertLight("dimmed", "Room brightness did not update");
    await hold(2);
    await click(page.getByText("Studio", { exact: true }));
    await page.getByText("Retro current", { exact: true }).waitFor();
    await chapter("Set the room's mood");
    await hold(2);
    await click(page.getByText("Retro current", { exact: true }));
    await assertLight("scene", "Scene did not update the lights");
    await hold(3);
    await click(page.getByText("Desk lamp", { exact: true }));
    await page.getByRole("tab", { name: "Color", exact: true }).waitFor();
    await chapter("Fine-tune one light");
    await hold(2);
    const wheel = await page.locator("canvas:visible").boundingBox();
    if (!wheel) throw new Error("Color wheel is not visible");
    await move(wheel.x + wheel.width * 0.18, wheel.y + wheel.height * 0.58);
    await page.mouse.down();
    await move(wheel.x + wheel.width * 0.62, wheel.y + wheel.height * 0.23, 1.6);
    await page.mouse.up();
    await animate(0.3);
    await hold(2);
    await click(page.getByRole("tab", { name: "White", exact: true }));
    await hold(1);
    const white = await page.locator("canvas:visible").boundingBox();
    await move(white.x + white.width * 0.5, white.y + white.height * 0.48);
    await page.mouse.down();
    await move(white.x + white.width * 0.5, white.y + white.height * 0.22, 1.2);
    await page.mouse.up();
    await animate(0.3);
    await assertLight("white", "White temperature did not update");
    await chapter("A warmer desk light");
    await hold(2.5);
    await click(page.getByRole("button", { name: "Close", exact: true }).first());
    await click(page.getByRole("button", { name: "Back", exact: true }).first());
    await page.getByRole("slider", { name: "Studio brightness", exact: true }).waitFor();
    await chapter("Back to your day");
    await move(910, 1000);
    await hold(3);
    ffmpeg.stdin.end();
    const [code] = await completed;
    if (code !== 0) throw new Error(`Video encoding failed: ${code}`);
    // Replace published assets only after the complete capture and encode succeed.
    await fs.copyFile(path.join(work, "demo.webm"), path.join(out, "mote-hero-demo-hd.webm"));
    await fs.copyFile(path.join(work, "demo.mp4"), path.join(out, "mote-hero-demo-hd.mp4"));
    await fs.copyFile(path.join(work, "poster.png"), path.join(out, "mote-hero-poster-hd.png"));
    await fs.writeFile(
      path.join(work, "chapters.json"),
      JSON.stringify(
        { width: 2400, height: 2650, fps, duration: frameCount / fps, chapters },
        null,
        2,
      ),
    );
    process.stdout.write(`Finished: ${frameCount / fps}s at 2400 × 2650\n`);
  } finally {
    if (!ffmpeg.stdin.writableEnded) ffmpeg.kill();
    await browser.close();
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

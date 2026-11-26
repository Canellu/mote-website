// Record a looping demo of the sibling app's real desktop widget folding into
// its moth mascot and opening back out, from lossless browser frames.
// See scripts/record-feature-demos.md for how to run it.
//
// Capture-only: the wallpaper, the taskbar strip, the pointer, and the stage
// that stands in for the widget's OS window. The widget runs unmodified in an
// iframe sized like that window. As in widget.rs, folding in place keeps the
// window at its open size and clips it to the pill (SetWindowRgn); the stage
// mirrors that clip with CSS. No Hue bridge or Tauri backend is contacted.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const fs = require("node:fs/promises");
const path = require("node:path");
const fixture = require("./hero-demo-fixture.cjs");
const seed = require("./hero-demo-setup.cjs");

const name = "mote-widget-mascot-demo";
const fps = 24;
const scale = 2;
const stage = { width: 600, height: 460, taskbar: 44, widgetX: 110, widgetY: 44 };
const appUrl = process.env.MOTE_URL || "http://127.0.0.1:1434";
const out = path.resolve(__dirname, "../public/product");
const work = path.resolve(__dirname, "../node_modules/.cache/widget-mascot-demo");
const stageUrl = `${appUrl}/__capture-widget-stage`;
// Free's default mascot drawing; `celShaded` is the one Settings labels "Cartoon".
const mascotStyle = "celShaded";

/** Browser-only Tauri stand-in for the widget window. Window commands are
 * forwarded to the stage, which plays the OS window's part. */
function installIpc({ lights, roomZones, mascotStyle }) {
  if (!new URLSearchParams(location.search).has("widgetId")) return;
  // Motion plays transforms and opacity on Web Animations, which run on the
  // browser clock rather than the paused page clock. Without it, motion runs
  // the same curves on animation frames, which the recorder steps.
  delete Element.prototype.animate;
  localStorage.setItem("themeMode", "dark");
  localStorage.setItem("whats-new-last-seen-version", "9.9.9");
  let callbackId = 0;
  const listeners = {};
  window.__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener() {} };
  const snapshot = () => window.__CAPTURE_STORE__?.getState();
  const stageWindow = (command, args) => window.parent.__captureWindow?.(command, args);
  let widget;
  const widgetState = async () => {
    if (widget) return widget;
    const { HUE_SCENE_GALLERY_SECTIONS } =
      await import("/src/features/space-screen/data/hueSceneGallery.ts");
    const byName = new Map(
      HUE_SCENE_GALLERY_SECTIONS.flatMap((section) => section.scenes).map((p) => [p.name, p.id]),
    );
    widget = {
      widgetId: "capture",
      title: "Studio",
      enabled: true,
      pinned: false,
      alwaysOnTop: false,
      userSized: false,
      themeMode: "dark",
      sizeMode: "default",
      cornerMode: "rounded",
      backgroundMode: "solid",
      tileOpacity: 40,
      scale: 100,
      // A real setting (up to 300%): the moth reads at website size.
      collapsedScale: 150,
      collapseMode: "mascot",
      foldAnimation: "stack",
      mascotStyle,
      mascotAnimated: true,
      mascotFacing: "right",
      expandVertical: "down",
      expandHorizontal: "right",
      autoCollapseSeconds: -1,
      collapseCorner: "topLeft",
      collapsed: false,
      controls: [
        {
          id: "studio-control",
          type: "control",
          target: { kind: "room", id: "studio" },
          showBrightness: true,
          sceneIds: ["Retro current", "Relax", "Read"].map((n) => byName.get(n)),
        },
        {
          id: "lounge-control",
          type: "control",
          target: { kind: "room", id: "lounge" },
          showBrightness: true,
          sceneIds: [],
        },
      ],
    };
    return widget;
  };
  window.__TAURI_INTERNALS__ = {
    metadata: {
      currentWindow: { label: "widget-capture" },
      currentWebview: { label: "widget-capture" },
    },
    invoke: async (command, args) => {
      const live = snapshot();
      if (command === "plugin:event|listen") {
        (listeners[args.event] ??= []).push(args.handler);
        return args.handler;
      }
      if (command === "get-widget-state" || command === "widget-frontend-ready")
        return widgetState();
      if (command === "set-widget-collapsed") {
        const state = await widgetState();
        stageWindow(command, { ...args, zoom: state.collapsedScale / 100 });
        return { ...state, collapsed: args.collapsed, collapseCorner: "topLeft" };
      }
      if (["sync-widget-layout", "clip-widget-to-panel", "clear-widget-clip"].includes(command)) {
        stageWindow(command, args);
        return null;
      }
      if (command === "get-widget-pinned" || command === "get-widget-user-sized") return false;
      if (command === "plugin:window|inner_size" || command === "plugin:window|outer_size")
        return { width: window.innerWidth, height: window.innerHeight };
      if (command === "plugin:window|outer_position") return { x: 0, y: 0 };
      if (command === "plugin:window|scale_factor") return 1;
      if (command === "get-entitlements" || command === "refresh-entitlements")
        return { pro: "active", household: "inactive", trial: null };
      if (command === "get-regional-defaults")
        return { region: "US", clock24: false, metric: false };
      if (command === "get-hue-session")
        return {
          configured: true,
          connected: true,
          bridgeId: "demo",
          bridgeIp: "192.0.2.1",
          error: null,
        };
      const spaces = live?.roomZones?.length ? live.roomZones : roomZones;
      if (command === "get-hue-lights") return live?.lights?.length ? live.lights : lights;
      if (command === "get-hue-rooms") return spaces.filter((x) => x.resourceType === "room");
      if (command === "get-hue-zones") return spaces.filter((x) => x.resourceType === "zone");
      if (command === "get-hue-scenes") return live?.scenes ?? [];
      if (command === "get-hue-home-name") return "Home";
      if (command === "get-host-sync-status")
        return { state: "idle", areaId: null, error: null, warning: null };
      if (
        [
          "get-hue-resource",
          "get-hue-accessory-services",
          "list-widgets",
          "get-shortcuts",
          "get-entertainment-areas",
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
}

/** The desktop the widget sits on, and the OS window it runs in. */
function stageHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    :root { color-scheme: dark; }
    html, body { margin: 0; height: 100%; overflow: hidden; }
    body { background: radial-gradient(circle at 18% 22%, rgb(255 179 66 / 0.32), transparent 42%),
      radial-gradient(circle at 74% 60%, rgb(113 224 207 / 0.22), transparent 45%),
      radial-gradient(circle at 40% 96%, rgb(193 72 213 / 0.24), transparent 40%), #121413; }
    #widget-frame { position: absolute; left: ${stage.widgetX}px; top: ${stage.widgetY}px;
      width: 360px; height: 160px; border: 0; background: transparent; }
    #taskbar { position: fixed; left: 0; right: 0; bottom: 0; height: ${stage.taskbar}px;
      display: flex; align-items: center; gap: 4px; padding: 0 10px; box-sizing: border-box;
      background: rgb(28 30 30 / 0.92); border-top: 1px solid rgb(255 255 255 / 0.08);
      font: 12px/1.25 "Segoe UI Variable", "Segoe UI", system-ui, sans-serif; color: #f2f2f2; }
    #taskbar .app { width: 38px; height: 38px; display: grid; place-items: center; }
    #taskbar .app i { width: 22px; height: 22px; border-radius: 6px; display: block; }
    #taskbar .spacer { flex: 1; }
    #taskbar .clock { text-align: right; padding: 0 8px; }
  </style></head><body>
    <iframe id="widget-frame" src="${appUrl}/?window=widget&widgetId=capture" allowtransparency="true"></iframe>
    <div id="taskbar">
      <span class="app"><i style="background:linear-gradient(135deg,#5b6b78,#3c4650)"></i></span>
      <span class="app"><i style="background:linear-gradient(135deg,#7a6a58,#4c4237)"></i></span>
      <span class="app"><i style="background:linear-gradient(135deg,#5a7468,#394a42)"></i></span>
      <span class="spacer"></span><span class="clock">9:41 PM<br>11/26/2026</span>
    </div>
    <script>
      // Plays the OS window: the height follows the content and an auto-fit
      // sizes the width to its minimum (widget.rs sync_widget_layout), and a
      // clip hides what lies outside the panel or pill (set_window_region).
      const frame = document.getElementById("widget-frame");
      const clip = (rect) => {
        frame.style.clipPath = rect
          ? "inset(" + rect.y + "px " + (frame.offsetWidth - rect.x - rect.width) + "px " +
            (frame.offsetHeight - rect.y - rect.height) + "px " + rect.x + "px)"
          : "";
      };
      window.__captureWindow = (command, args) => {
        if (command === "sync-widget-layout") {
          const width = Math.max(args.minWidth, 360);
          if (args.autoFit || frame.offsetWidth < width) frame.style.width = width + "px";
          frame.style.height = Math.max(args.minHeight, 136) + "px";
        } else if (command === "clip-widget-to-panel") clip(args.rect);
        else if (command === "clear-widget-clip") clip(null);
        else if (command === "set-widget-collapsed")
          // Folded at the top-left corner it was opened from, sized like
          // set_widget_collapsed: the clamped pill at the folded zoom. Opening lifts the clip.
          clip(args.collapsed
            ? { x: 0, y: 0,
                width: Math.min(Math.max(args.width, 32), 360) * args.zoom,
                height: Math.min(Math.max(args.height, 32), 96) * args.zoom }
            : null);
      };
    </script>
  </body></html>`;
}

function encoder() {
  return spawn(
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
      "32",
      "-b:v",
      "0",
      "-row-mt",
      "1",
      "-cpu-used",
      "3",
      "-pix_fmt",
      "yuv420p",
      path.join(work, `${name}.webm`),
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      path.join(work, `${name}.mp4`),
    ],
    { stdio: ["pipe", "ignore", "inherit"], windowsHide: true },
  );
}

/**
 * Frame-by-frame recorder on a paused page clock: each frame advances the
 * app's timers and animation frames by exactly one video frame, so the fold
 * plays at its real speed however long a screenshot takes.
 */
function recorder(page, ffmpeg, start) {
  let frames = 0;
  let elapsed = 0;
  let cursor = start;
  const tick = async () => {
    const target = Math.round(((frames + 1) * 1000) / fps);
    await page.clock.runFor(target - elapsed);
    elapsed = target;
  };
  const frame = async () => {
    await tick();
    const buffer = await page.screenshot();
    if (!ffmpeg.stdin.write(buffer)) await once(ffmpeg.stdin, "drain");
    frames++;
    return buffer;
  };
  const r = {
    get seconds() {
      return frames / fps;
    },
    frame,
    hold: async (seconds) => {
      for (let i = 0; i < Math.round(seconds * fps); i++) await frame();
    },
    async move(x, y, seconds = 0.7) {
      const from = cursor;
      const steps = Math.max(1, Math.round(seconds * fps));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const ease = t * t * (3 - 2 * t);
        cursor = { x: from.x + (x - from.x) * ease, y: from.y + (y - from.y) * ease };
        await page.mouse.move(cursor.x, cursor.y);
        await page.evaluate(({ x, y }) => {
          document.getElementById("capture-pointer").style.transform = `translate(${x}px,${y}px)`;
        }, cursor);
        await frame();
      }
    },
    async click(locator, settle = 0.5) {
      const box = await locator.boundingBox();
      if (!box) throw new Error("Capture target is not visible");
      await r.move(box.x + box.width / 2, box.y + box.height / 2);
      await r.hold(0.25);
      await page.mouse.down();
      await frame();
      await page.mouse.up();
      await r.hold(settle);
    },
    async dragSlider(locator, from, to, seconds = 1.1) {
      // Base UI's accessible range input is visually hidden; drag its real track.
      const track = await locator.evaluate((element) => {
        const { x, y, width, height } = element
          .closest('[data-slot="slider"]')
          .querySelector('[data-slot="slider-track"]')
          .getBoundingClientRect();
        return { x, y, width, height };
      });
      const x = stage.widgetX + track.x;
      const y = stage.widgetY + track.y + track.height / 2;
      await r.move(x + track.width * from, y);
      await page.mouse.down();
      await r.move(x + track.width * to, y, seconds);
      await page.mouse.up();
      await r.hold(0.3);
    },
  };
  return r;
}

async function addPointer(page, { x, y }) {
  await page.evaluate(
    ({ x, y }) => {
      const pointer = document.createElement("div");
      pointer.id = "capture-pointer";
      pointer.style.cssText = `position:fixed;left:0;top:0;width:22px;height:28px;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 2px 3px #0009);transform:translate(${x}px,${y}px)`;
      pointer.innerHTML =
        '<svg viewBox="0 0 24 30"><path d="M3 2v23l6-6 5 9 4-2-5-9h9Z" fill="white" stroke="#171717" stroke-width="1.5" stroke-linejoin="round"/></svg>';
      document.body.append(pointer);
    },
    { x, y },
  );
}

/** Seed the sample home, then put this file's IPC back so window commands
 * still reach the stage. The rooms get a grouped light, which the widget
 * needs before it offers a brightness slider. */
async function seedHome(app) {
  await app.evaluate(() => {
    window.__captureInvoke = window.__TAURI_INTERNALS__.invoke;
  });
  await seed(app);
  await app.evaluate(async () => {
    const { useHueResourcesStore } = await import("/src/stores/HueResourcesStore.tsx");
    window.__CAPTURE_STORE__ = useHueResourcesStore;
    window.__TAURI_INTERNALS__.invoke = window.__captureInvoke;
    useHueResourcesStore.setState((state) => ({
      roomZones: state.roomZones.map((space) => ({
        ...space,
        groupedLightId: `${space.id}-group`,
      })),
    }));
  });
}

/** One take. Returns whether its last frame matches its first, so it loops. */
async function capture(browser) {
  const context = await browser.newContext({
    viewport: { width: stage.width, height: stage.height },
    deviceScaleFactor: scale,
  });
  const ffmpeg = encoder();
  ffmpeg.stdin.on("error", () => {});
  try {
    await context.addInitScript(installIpc, { ...fixture, mascotStyle });
    await context.route(stageUrl, (route) =>
      route.fulfill({ contentType: "text/html", body: stageHtml() }),
    );
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.on("pageerror", (error) => console.error(error.message));
    await page.clock.install();
    await page.goto(stageUrl);
    const app = page.frame({ url: /widgetId=capture/ });
    const widget = page.frameLocator("#widget-frame");
    await widget.getByRole("switch", { name: "Toggle Studio" }).waitFor();
    await seedHome(app);
    await widget.getByRole("slider", { name: "Studio brightness" }).waitFor({ state: "attached" });
    await app.evaluate(() => document.fonts.ready);

    // Start from Retro current already applied, which the loop ends on too.
    await widget.getByText("Retro current", { exact: true }).click();
    const start = { x: 540, y: 330 };
    await page.mouse.move(start.x, start.y);
    await addPointer(page, start);
    // Lets the start state settle, then holds the clock for the recorder. CSS
    // transitions run on the real clock, so they get real time too.
    await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 2000);
    await page.waitForTimeout(1500);

    const rec = recorder(page, ffmpeg, start);
    const first = await rec.frame();
    await fs.writeFile(path.join(work, `${name}.png`), first);
    await rec.hold(1);

    await rec.dragSlider(widget.getByRole("slider", { name: "Studio brightness" }), 0.8, 0.3);
    await rec.hold(0.5);
    await rec.click(widget.getByText("Relax", { exact: true }), 1);

    await rec.click(widget.getByRole("button", { name: "Collapse widget" }), 1.6);
    const mascot = widget.getByRole("button", { name: "Expand Studio" });
    if (!(await mascot.isVisible())) throw new Error("The widget did not fold into the mascot");
    await rec.move(stage.widgetX + 150, stage.widgetY + 150, 0.8);
    await rec.hold(1.6);
    await rec.click(mascot, 1.4);
    if (await mascot.isVisible()) throw new Error("The mascot did not open the widget");

    await rec.click(widget.getByText("Retro current", { exact: true }), 1);
    await rec.move(start.x, start.y, 1);
    await rec.hold(0.4);
    const seamless = (await page.screenshot()).equals(first);

    ffmpeg.stdin.end();
    const [code] = await once(ffmpeg, "close");
    if (code !== 0) throw new Error(`Video encoding failed: ${code}`);
    process.stdout.write(`${name}: ${rec.seconds.toFixed(1)}s, seamless: ${seamless}
`);
    return seamless;
  } finally {
    if (!ffmpeg.stdin.writableEnded) ffmpeg.kill();
    await context.close();
  }
}

async function main() {
  await fs.mkdir(work, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  try {
    // Now and then Chrome draws the cards a subpixel apart just after the
    // unfold, so the loop would jump; such a take is recorded again.
    let seamless = false;
    for (let take = 1; take <= 3 && !seamless; take++) seamless = await capture(browser);
    if (!seamless) throw new Error("No take ended on its first frame");
    if (!process.env.MOTE_DRY_RUN)
      for (const ext of ["webm", "mp4", "png"])
        await fs.copyFile(path.join(work, `${name}.${ext}`), path.join(out, `${name}.${ext}`));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

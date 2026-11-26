// Record short looping feature demos from the sibling app's real UI.
// See scripts/record-feature-demos.md for dependencies and what is capture-only.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const fs = require("node:fs/promises");
const path = require("node:path");
const fixture = require("./hero-demo-fixture.cjs");
const seed = require("./hero-demo-setup.cjs");

const fps = 24;
const scale = 2;
const appUrl = process.env.MOTE_URL || "http://127.0.0.1:1420";
const appRoot = process.env.MOTE_APP_ROOT || path.resolve(__dirname, "../../mote-desktop");
const out = path.resolve(__dirname, "../public/product");
const work = path.resolve(__dirname, "../node_modules/.cache/feature-demos");

/** Browser-only Tauri stand-in: every command ends here and no bridge is contacted. */
function installIpc({ lights, roomZones, windowLabel, widget }) {
  localStorage.setItem("themeMode", "dark");
  localStorage.setItem("whats-new-last-seen-version", "9.9.9");
  let callbackId = 0;
  const listeners = {};
  window.__CAPTURE_LISTENERS__ = listeners;
  window.__TAURI_EVENT_PLUGIN_INTERNALS__ = { unregisterListener() {} };
  // Reads come from the live store once it is seeded, so a reload triggered
  // by opening the panel returns the same sample home instead of an empty one.
  const snapshot = () => window.__CAPTURE_STORE__?.getState();
  window.__TAURI_INTERNALS__ = {
    metadata: { currentWindow: { label: windowLabel }, currentWebview: { label: windowLabel } },
    invoke: async (command, args) => {
      const live = snapshot();
      if (command === "plugin:event|listen") {
        (listeners[args.event] ??= []).push(args.handler);
        return args.handler;
      }
      if (command === "tray-panel-ready")
        return { open: false, anchor: { horizontal: "right", vertical: "bottom" } };
      if (command === "hide-tray-panel") {
        window.__captureEmit("tray-panel-visibility", {
          open: false,
          anchor: { horizontal: "right", vertical: "bottom" },
        });
        return null;
      }
      if (command === "get-widget-state" || command === "widget-frontend-ready") return widget;
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
  window.__captureEmit = (event, payload) => {
    for (const id of listeners[event] ?? []) window[`_${id}`]?.({ event, id, payload });
  };
}

/** Seed sample scenes through the shared hero setup, keeping this file's IPC afterwards. */
async function seedHome(page) {
  await page.evaluate(() => {
    window.__captureInvoke = window.__TAURI_INTERNALS__.invoke;
  });
  await seed(page);
  await page.evaluate(async () => {
    const { useHueResourcesStore } = await import("/src/stores/HueResourcesStore.tsx");
    window.__CAPTURE_STORE__ = useHueResourcesStore;
    window.__TAURI_INTERNALS__.invoke = window.__captureInvoke;
  });
}

function encoder(name) {
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
      "30",
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
      "22",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      path.join(work, `${name}.mp4`),
    ],
    { stdio: ["pipe", "ignore", "inherit"], windowsHide: true },
  );
}

/** Frame-by-frame recorder with a capture-only pointer. */
function recorder(page, ffmpeg, start) {
  let frames = 0;
  let cursor = start;
  const write = async (buffer, count = 1) => {
    for (let i = 0; i < count; i++) {
      if (!ffmpeg.stdin.write(buffer)) await once(ffmpeg.stdin, "drain");
      frames++;
    }
  };
  const frame = async () => write(await page.screenshot());
  const r = {
    get seconds() {
      return frames / fps;
    },
    frame,
    hold: async (seconds) => write(await page.screenshot(), Math.round(seconds * fps)),
    animate: async (seconds = 0.5) => {
      for (let i = 0; i < Math.round(seconds * fps); i++) await frame();
    },
    // The panel's fly-in is shorter than one 2x screenshot, so advance time one
    // video frame per capture: the fake clock drives Motion's requestAnimationFrame
    // values, and Web Animations (Motion's opacity) are held paused and seeked by
    // hand, since left alone they finish before the first capture.
    async stepped(action, seconds = 0.5) {
      const step = Math.round(1000 / fps);
      await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 50);
      await page.evaluate(() => {
        const original = Object.getOwnPropertyDescriptor(Element.prototype, "animate");
        window.__captureAnimate = original;
        window.__captureAnimations = [];
        Element.prototype.animate = function (...args) {
          const animation = original.value.apply(this, args);
          animation.pause();
          animation.play = () => {};
          Object.defineProperty(animation, "startTime", { get: () => null, set() {} });
          window.__captureAnimations.push(animation);
          return animation;
        };
      });
      await action();
      const seek = (ms) =>
        page.evaluate((ms) => {
          for (const animation of window.__captureAnimations) {
            if (ms !== null) animation.currentTime = ms;
            else animation.finish();
          }
          if (ms === null)
            Object.defineProperty(Element.prototype, "animate", window.__captureAnimate);
        }, ms);
      for (let i = 1; i <= Math.round(seconds * fps); i++) {
        await page.clock.runFor(step);
        await seek(i * step);
        await frame();
      }
      await seek(null);
      await page.clock.resume();
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
      await r.hold(0.2);
      await page.mouse.down();
      await frame();
      await page.mouse.up();
      await r.animate(settle);
    },
    async dragSlider(locator, from, to, seconds = 1.1) {
      // Base UI's accessible range input is visually hidden; drag its real track.
      const box = await locator.evaluate((element) => {
        const track = element
          .closest('[data-slot="slider"]')
          .querySelector('[data-slot="slider-track"]');
        const { x, y, width, height } = track.getBoundingClientRect();
        return { x, y, width, height };
      });
      await r.move(box.x + box.width * from, box.y + box.height / 2);
      await page.mouse.down();
      await r.move(box.x + box.width * to, box.y + box.height / 2, seconds);
      await page.mouse.up();
      await r.animate(0.3);
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

async function finish(ffmpeg, name, rec) {
  ffmpeg.stdin.end();
  const [code] = await once(ffmpeg, "close");
  if (code !== 0) throw new Error(`Video encoding failed for ${name}: ${code}`);
  process.stdout.write(`${name}: ${rec.seconds.toFixed(1)}s\n`);
}

async function publish(name) {
  for (const ext of ["webm", "mp4", "png"])
    await fs.copyFile(path.join(work, `${name}.${ext}`), path.join(out, `${name}.${ext}`));
}

const flyoutStage = { width: 460, height: 720, taskbar: 48 };

/**
 * A plain desktop and taskbar strip around the real panel. The panel window is
 * 396 logical pixels wide and spans the work area above the taskbar, which is
 * what the app's tray_panel.rs sizes it to.
 */
async function stageTaskbar(page, trayIcon) {
  await page.evaluate(
    ({ trayIcon, stage }) => {
      const style = document.createElement("style");
      style.textContent = `
        html, body { background: transparent !important; }
        body { margin: 0; overflow: hidden;
          background: radial-gradient(circle at 18% 22%, rgb(255 179 66 / 0.32), transparent 42%),
            radial-gradient(circle at 70% 64%, rgb(113 224 207 / 0.22), transparent 45%),
            radial-gradient(circle at 40% 92%, rgb(193 72 213 / 0.24), transparent 40%), #121413 !important; }
        #root { position: fixed !important; top: 0; right: 0; bottom: ${stage.taskbar}px; width: 396px !important; height: auto !important; }
        #root .h-screen { height: 100% !important; }
        #root .w-screen { width: 100% !important; }
        #capture-taskbar { position: fixed; left: 0; right: 0; bottom: 0; height: ${stage.taskbar}px;
          display: flex; align-items: center; gap: 4px; padding: 0 10px; box-sizing: border-box;
          background: rgb(28 30 30 / 0.92); border-top: 1px solid rgb(255 255 255 / 0.08);
          font: 12px/1.25 "Segoe UI Variable", "Segoe UI", system-ui, sans-serif; color: #f2f2f2; }
        #capture-taskbar .app { width: 40px; height: 40px; border-radius: 6px; display: grid; place-items: center; }
        #capture-taskbar .app i { width: 24px; height: 24px; border-radius: 6px; display: block; }
        #capture-taskbar .spacer { flex: 1; }
        #capture-taskbar .tray { height: 40px; min-width: 32px; padding: 0 6px; border-radius: 6px;
          display: grid; place-items: center; box-sizing: border-box; }
        #capture-taskbar .tray.hot { background: rgb(255 255 255 / 0.08); }
        #capture-taskbar .tray.down { background: rgb(255 255 255 / 0.05); }
        #capture-taskbar .tray img { width: 18px; height: 18px; }
        #capture-taskbar .tray svg { width: 16px; height: 16px; }
        #capture-taskbar .icons { display: flex; gap: 8px; }
        #capture-taskbar .clock { text-align: right; padding: 0 8px; }
      `;
      document.head.append(style);
      const bar = document.createElement("div");
      bar.id = "capture-taskbar";
      const app = (a, b) =>
        `<span class="app"><i style="background:linear-gradient(135deg,${a},${b})"></i></span>`;
      const glyph = (d) =>
        `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">${d}</svg>`;
      bar.innerHTML = `
        ${app("#5b6b78", "#3c4650")}${app("#7a6a58", "#4c4237")}${app("#5a7468", "#394a42")}
        <span class="spacer"></span>
        <span class="tray">${glyph('<path d="M4 10l4-4 4 4"/>')}</span>
        <span class="tray" id="capture-mote-icon"><img src="${trayIcon}" alt=""></span>
        <span class="tray icons">${glyph('<path d="M2 6.5a9 9 0 0 1 12 0M4.3 9a5.6 5.6 0 0 1 7.4 0M6.6 11.5a2.2 2.2 0 0 1 2.8 0"/>')}${glyph('<path d="M3 6h2.5L9 3v10L5.5 10H3zM11.5 5.5a3.5 3.5 0 0 1 0 5"/>')}</span>
        <span class="tray clock">9:41 PM<br>11/26/2026</span>`;
      document.body.append(bar);
    },
    { trayIcon, stage: flyoutStage },
  );
}

async function recordFlyout(browser) {
  const name = "mote-taskbar-flyout-demo";
  const context = await browser.newContext({
    viewport: { width: flyoutStage.width, height: flyoutStage.height },
    deviceScaleFactor: scale,
  });
  await context.addInitScript(() =>
    localStorage.setItem(
      "mote-tray-panel-config",
      JSON.stringify({ order: [], spaces: { focus: { visible: false } } }),
    ),
  );
  await context.addInitScript(installIpc, { ...fixture, windowLabel: "tray-panel" });
  const page = await context.newPage();
  await page.clock.install();
  page.setDefaultTimeout(12000);
  page.on("pageerror", (error) => console.error(error.message));
  await page.goto(`${appUrl}/?window=tray-panel`);
  await page.locator("aside").waitFor({ state: "attached" });
  await page.waitForFunction(async () => {
    const { useHueResourcesStore } = await import("/src/stores/HueResourcesStore.tsx");
    return useHueResourcesStore.getState().hasLoaded;
  });
  await seedHome(page);
  const iconPng = await fs.readFile(path.join(appRoot, "src-tauri/icons/32x32.png"));
  await stageTaskbar(page, `data:image/png;base64,${iconPng.toString("base64")}`);
  await page.evaluate(() => document.fonts.ready);
  const start = { x: 260, y: 330 };
  await addPointer(page, start);
  await page.waitForTimeout(500);

  const ffmpeg = encoder(name);
  ffmpeg.stdin.on("error", () => {});
  const rec = recorder(page, ffmpeg, start);
  const icon = page.locator("#capture-mote-icon");
  const studioOn = async () =>
    page.evaluate(() => {
      const state = window.__CAPTURE_STORE__.getState();
      return state.roomZones.find((space) => space.id === "studio");
    });
  try {
    await rec.hold(1.2);
    const box = await icon.boundingBox();
    await rec.move(box.x + box.width / 2, box.y + box.height / 2, 0.9);
    await icon.evaluate((el) => el.classList.add("hot"));
    await rec.hold(0.3);
    await icon.evaluate((el) => el.classList.add("down"));
    await rec.frame();
    await rec.stepped(async () => {
      await page.evaluate(() =>
        window.__captureEmit("tray-panel-visibility", {
          open: true,
          anchor: { horizontal: "right", vertical: "bottom" },
        }),
      );
      await icon.evaluate((el) => el.classList.remove("down"));
    });
    await page.getByRole("switch", { name: "Toggle Studio" }).waitFor();
    await rec.animate(0.1);
    await page.screenshot({ path: path.join(work, `${name}.png`) });
    await rec.hold(0.8);
    await icon.evaluate((el) => el.classList.remove("hot"));

    const studioBrightness = page.getByRole("slider", { name: "Studio brightness", exact: true });
    await rec.dragSlider(studioBrightness, 0.82, 0.32);
    if ((await studioOn()).brightness > 50) throw new Error("Studio did not dim");
    await rec.hold(0.8);
    await rec.click(page.getByRole("button", { name: "Toggle scenes for Studio" }));
    await page.getByText("Relax", { exact: true }).waitFor();
    await rec.hold(0.8);
    await rec.click(page.getByText("Relax", { exact: true }), 0.6);
    await rec.hold(1);
    await rec.click(page.getByText("Retro current", { exact: true }), 0.6);
    await rec.hold(1.2);
    await rec.click(page.getByRole("switch", { name: "Toggle Lounge" }), 0.5);
    if (
      await page.evaluate(
        () =>
          window.__CAPTURE_STORE__.getState().roomZones.find((space) => space.id === "lounge")
            .anyOn,
      )
    )
      throw new Error("Lounge did not switch off");
    await rec.hold(1.2);
    // A desktop click beside the panel; in the app, Windows hides the panel on focus loss.
    await rec.move(34, 150, 0.8);
    await page.mouse.down();
    await rec.frame();
    await page.mouse.up();
    await rec.stepped(() =>
      page.evaluate(() =>
        window.__captureEmit("tray-panel-visibility", {
          open: false,
          anchor: { horizontal: "right", vertical: "bottom" },
        }),
      ),
    );
    await rec.move(start.x, start.y, 0.6);
    await rec.hold(0.6);
    await finish(ffmpeg, name, rec);
  } finally {
    if (!ffmpeg.stdin.writableEnded) ffmpeg.kill();
    await context.close();
  }
  return name;
}

async function main() {
  await fs.mkdir(work, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
  try {
    const only = process.argv[2];
    const names = [];
    if (!only || only === "flyout") names.push(await recordFlyout(browser));
    // Replace published assets only after every requested capture succeeds.
    if (!process.env.MOTE_DRY_RUN) for (const name of names) await publish(name);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

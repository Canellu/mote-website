import {
  expect,
  test,
} from "file:///C:/Users/Anton/AppData/Local/Temp/bunx-1504773743-@playwright/test@latest/node_modules/@playwright/test/index.mjs";

const outputRoot = "D:/Documents/GitHub/mote-website/public/product";

const lights = [
  ["light-1", "TV left"],
  ["light-2", "TV right"],
  ["light-3", "Floor lamp"],
  ["light-4", "Ceiling strip"],
].map(([id, name]) => ({
  id,
  deviceId: null,
  name,
  isOn: true,
  brightness: 70,
  reachable: true,
  colorMode: "xy",
  xy: [0.35, 0.35],
  ct: null,
  effect: null,
  effects: [],
  effectV2: null,
  effectsV2: [],
  supportsColor: true,
  supportsCt: false,
  ctMin: null,
  ctMax: null,
  gamut: null,
  modelId: null,
  productName: "Hue Play",
  typeName: null,
  swVersion: null,
  uniqueId: null,
  function: "decorative",
  powerup: null,
}));

const services = lights.map((light, index) => ({
  id: `service-${index + 1}`,
  type: "entertainment",
  renderer: true,
  renderer_reference: { rid: light.id, rtype: "light" },
}));

const positions = [
  { x: -0.82, y: 0.25, z: 0.48 },
  { x: 0.82, y: 0.25, z: 0.48 },
  { x: -0.6, y: -0.45, z: -0.62 },
  { x: 0.35, y: -0.15, z: 0.88 },
];

const area = {
  id: "tv-area",
  type: "entertainment_configuration",
  metadata: { name: "TV area" },
  configuration_type: "screen",
  status: "inactive",
  locations: {
    service_locations: services.map((service, index) => ({
      service: { rid: service.id, rtype: "entertainment" },
      positions: [positions[index]],
    })),
  },
  channels: services.map((service, index) => ({
    channel_id: index,
    members: [{ service: { rid: service.id, rtype: "entertainment" } }],
  })),
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(
    ({ lights, services, area }) => {
      localStorage.setItem("themeMode", "dark");
      let callbackId = 0;
      const invoke = async (command: string, args?: Record<string, unknown>) => {
        if (command === "get-hue-session") {
          return {
            configured: true,
            connected: true,
            bridgeId: "bridge-1",
            bridgeIp: "192.168.1.2",
            error: null,
          };
        }
        if (command === "list-hue-bridges") {
          return [
            {
              bridgeId: "bridge-1",
              bridgeIp: "192.168.1.2",
              name: "Home",
              active: true,
            },
          ];
        }
        if (command === "get-hue-lights") return lights;
        if (command === "get-hue-rooms") return [];
        if (command === "get-hue-zones") return [];
        if (command === "get-hue-scenes") return [];
        if (command === "get-hue-accessory-services") return [];
        if (command === "get-hue-home-name") return "Home";
        if (command === "get-host-sync-status") {
          return { state: "idle", areaId: null, error: null, warning: null };
        }
        if (command === "get-host-sync-overview") {
          return {
            displays: [],
            preferences: { automaticDisplay: true, displayIds: [] },
          };
        }
        if (command === "get-hue-resource") {
          const resourceType = args?.resourceType;
          if (resourceType === "entertainment_configuration") return [area];
          if (resourceType === "entertainment") return services;
          return [];
        }
        if (command === "get-sync-box-session") return null;
        return null;
      };

      Object.defineProperty(window, "__TAURI_INTERNALS__", {
        configurable: true,
        value: {
          invoke,
          transformCallback(callback: (...args: unknown[]) => unknown) {
            const id = ++callbackId;
            Object.defineProperty(window, `_${id}`, {
              configurable: true,
              value: callback,
            });
            return id;
          },
          unregisterCallback(id: number) {
            delete (window as unknown as Record<string, unknown>)[`_${id}`];
          },
        },
      });
    },
    { lights, services, area },
  );
});

test("current configure step", async ({ page }) => {
  await page.setViewportSize({ width: 2033, height: 1029 });
  await page.goto("http://127.0.0.1:5175/#/settings/widget-wizard?step=0");
  await page.getByRole("heading", { name: "Name your widget" }).waitFor();
  await page.getByRole("textbox").fill("Studio controls");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("checkbox", { name: /TV left/ }).click();
  await page.getByRole("checkbox", { name: /TV right/ }).click();
  await page.getByRole("checkbox", { name: /Floor lamp/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Configure" })).toBeVisible();
  await page.waitForTimeout(800);
  await page
    .getByRole("button", { name: "Send feedback" })
    .evaluate((element) => element.setAttribute("hidden", ""));
  await page
    .locator("div.max-w-5xl")
    .filter({ has: page.getByRole("heading", { name: "Configure" }) })
    .first()
    .screenshot({ path: `${outputRoot}/mote-widget-configure-dark.png` });
});

test("current display placement", async ({ page }) => {
  await page.setViewportSize({ width: 1534, height: 1025 });
  await page.goto("http://127.0.0.1:5175/#/settings/entertainment-placement/tv-area");
  await expect(page.getByRole("button", { name: /Screen sampling/ })).toBeVisible();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outputRoot}/mote-placement-screen-dark.png` });
});

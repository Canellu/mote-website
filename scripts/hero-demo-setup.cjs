const { lights, roomZones, layout } = require("./hero-demo-fixture.cjs");
module.exports = async function (page) {
  await page.evaluate(
    async ({ roomZones, lights, layout }) => {
      const { HUE_SCENE_GALLERY_SECTIONS } =
        await import("/src/features/space-screen/data/hueSceneGallery.ts");
      const { useHueResourcesStore } = await import("/src/stores/HueResourcesStore.tsx");
      const wanted = new Set(["Retro current", "Read", "Relax"]);
      const presets = HUE_SCENE_GALLERY_SECTIONS.flatMap((section) => section.scenes).filter(
        (preset) => wanted.has(preset.name),
      );
      const studio = roomZones.find((space) => space.id === "studio");
      const studioLights = lights.filter((light) => studio.lightIds.includes(light.id));
      const scenes = presets.map((preset, index) => ({
        id: preset.id,
        name: preset.name,
        resourceType: "scene",
        group: studio.id,
        sceneType: null,
        status: index === 0 ? "active" : "inactive",
        dynamic: preset.dynamic,
        speed: preset.speed,
        autoDynamic: false,
        smart: false,
        colors: preset.colors.map(({ xy, mirek }) => ({ xy, mirek })),
        actions: studioLights.map((light, lightIndex) => ({
          targetId: light.id,
          on: true,
          brightness: preset.brightness,
          xy: preset.colors[lightIndex % preset.colors.length]?.xy ?? null,
          mirek: preset.colors[lightIndex % preset.colors.length]?.mirek ?? null,
          effect: null,
          effectV2: null,
        })),
      }));

      useHueResourcesStore.setState({
        roomZones,
        lights,
        scenes,
        accessoryServices: [],
        homeName: "Hue Bridge",
        isLoading: false,
        hasLoaded: true,
        error: null,
        layout,
        displayLayout: layout,
        storedLayout: layout,
        draftLayout: [],
        groupingMode: "custom",
      });

      // Keep capture interactions local: the same real UI and optimistic state
      // run, while Hue/Tauri writes are acknowledged by this capture harness.
      window.__TAURI_INTERNALS__ = {
        ...window.__TAURI_INTERNALS__,
        invoke: async () => null,
      };
    },
    { roomZones, lights, layout },
  );
};

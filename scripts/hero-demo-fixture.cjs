const lightSpecs = [
  ["desk", "Desk lamp", true, 82, [0.45, 0.41]],
  ["shelf", "Shelf strip", true, 68, [0.57, 0.36]],
  ["floor", "Floor lamp", true, 54, [0.31, 0.33]],
  ["sofa", "Sofa light", true, 76, [0.52, 0.38]],
  ["tv", "TV gradient strip", true, 64, [0.22, 0.18]],
  ["ceiling", "Ceiling lights", false, 58, [0.38, 0.38]],
  ["bed", "Bedside lamp", true, 46, [0.49, 0.4]],
  ["wardrobe", "Wardrobe", false, 42, [0.42, 0.38]],
  ["hall", "Hallway", false, 44, [0.39, 0.39]],
];

const spaces = [
  ["studio", "Studio", "room", "office", ["desk", "shelf", "floor"]],
  ["lounge", "Lounge", "room", "living_room", ["sofa", "tv", "ceiling"]],
  ["bedroom", "Bedroom", "room", "bedroom", ["bed", "wardrobe"]],
  ["downstairs", "Downstairs", "zone", "other", ["sofa", "tv", "ceiling", "hall"]],
  ["focus", "Focus", "zone", "other", ["desk", "shelf"]],
];

const lights = lightSpecs.map(([id, name, isOn, brightness, xy]) => ({
  id,
  deviceId: null,
  name,
  isOn,
  brightness,
  reachable: true,
  colorMode: "xy",
  xy,
  ct: null,
  effect: null,
  effects: [],
  effectV2: null,
  effectsV2: [],
  supportsColor: true,
  supportsCt: true,
  ctMin: null,
  ctMax: null,
  gamut: null,
  modelId: null,
  productName: "Philips Hue",
  typeName: null,
  swVersion: null,
  uniqueId: null,
  function: "decorative",
  powerup: null,
}));

const roomZones = spaces.map(([id, name, resourceType, roomClass, lightIds]) => {
  const members = lights.filter((light) => lightIds.includes(light.id));
  const onMembers = members.filter((light) => light.isOn);
  return {
    id,
    name,
    class: roomClass,
    resourceType,
    anyOn: onMembers.length > 0,
    allOn: onMembers.length === members.length,
    brightness:
      onMembers.reduce((sum, light) => sum + light.brightness, 0) / Math.max(1, onMembers.length),
    lightCount: lightIds.length,
    lightIds,
    deviceIds: [],
    groupedLightId: null,
    accessories: [],
  };
});

const layout = [
  { id: "rooms", name: "Rooms", spaceIds: ["studio", "lounge", "bedroom"] },
  { id: "zones", name: "Zones", spaceIds: ["downstairs", "focus"] },
];

module.exports = { lights, roomZones, layout };

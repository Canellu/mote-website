import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProductCapture } from "../components/product-capture";
import { pageHead } from "../lib/seo";

const featureGroups = [
  {
    id: "dashboard",
    tier: "Free",
    title: "Home dashboard",
    summary:
      "Every room, zone, and light in one view. Check power, color, and brightness at a glance, then adjust what you need.",
    points: [
      "Rooms, zones, lights, scenes, devices, and entertainment areas in a single dashboard",
      "Power, brightness, and color controls on each card",
      "Standard grouping layouts in Free",
      "Reorder cards and save a custom layout with Mote Pro",
    ],
    src: "/product/mote-dashboard-dark.png",
    alt: "Mote Desktop dashboard showing colorful Hue rooms and zones",
    width: 960,
    height: 1061,
  },
  {
    id: "room-control",
    tier: "Free",
    title: "Room and light control",
    summary: "Open a room to work with scenes and individual lights in the same view.",
    points: [
      "Scene tiles and per-light controls side by side",
      "A color inspector for precise color and white temperature",
      "Controls for lights, rooms, zones, and devices",
    ],
    src: "/product/mote-space-controls-dark.png",
    alt: "Mote Desktop room view with scene tiles, individual light controls, and a color inspector",
    width: 1402,
    height: 1122,
  },
  {
    id: "scenes",
    tier: "Free",
    title: "Hue scenes",
    summary: "Preview and save the Hue scenes already set up for a space.",
    points: [
      "Browse the scene gallery for a room or zone",
      "Preview a scene before applying it",
      "Save scenes for recall from the dashboard or a widget",
    ],
    src: "/product/mote-scene-gallery-dark.png",
    alt: "Mote Desktop Hue scene gallery with colorful preset palettes",
    width: 1402,
    height: 1122,
  },
  {
    id: "widgets",
    tier: "Free and Mote Pro",
    title: "Desktop widgets",
    summary: "Keep the controls you use most pinned beside your work.",
    points: [
      "Name each widget so it is easy to recognize later",
      "Combine rooms, zones, and individual lights in one widget",
      "Arrange the controls, choose the density and appearance, and preview the result",
      "Free includes one standard widget with one room, zone, or light",
      "Mote Pro adds unlimited advanced widgets with multiple controls and customization",
    ],
    src: "/product/mote-widget-configure-dark.png",
    alt: "Mote Desktop widget configuration showing full and compact controls beside a live preview",
    width: 1025,
    height: 861,
  },
  {
    id: "pc-sync",
    tier: "Mote Pro",
    title: "PC Sync",
    summary: "Match a compatible entertainment area to what is happening on your PC.",
    points: [
      "Video, Games, and Music modes for a compatible entertainment area",
      "Choose which part of the display each light follows",
      "Position each light within a three-dimensional view of the room",
      "Processing happens on your PC; captured pixels and audio are not uploaded",
    ],
    src: "/product/mote-placement-screen-dark.png",
    alt: "Mote Desktop light placement screen showing display sampling regions",
    width: 1534,
    height: 1025,
  },
  {
    id: "hardware",
    tier: "Free and Mote Pro",
    title: "Bridges and Sync Box",
    summary: "Connect the Hue hardware you already own.",
    points: [
      "Choose a Hue Bridge Pro or a classic Hue Bridge found on your network",
      "Pair using the bridge link button",
      "Free saves one bridge; Mote Pro switches among multiple bridges",
      "Control a single Hue Play HDMI Sync Box in both Free and Mote Pro",
    ],
    src: "/product/mote-bridge-dark.png",
    alt: "Mote Desktop setup screen with a selected Hue Bridge Pro beside a classic Hue Bridge",
    width: 960,
    height: 1061,
  },
  {
    id: "preferences",
    tier: "Free",
    title: "App preferences",
    summary: "Set how Mote looks and behaves on your desktop.",
    points: [
      "Choose the app appearance",
      "Set feedback and window behavior",
      "Keep connection details, preferences, layouts, and widget configuration on your device",
    ],
    src: "/product/mote-settings-theme-dark.png",
    alt: "Mote Desktop general settings with appearance and window behavior controls",
    width: 960,
    height: 1061,
  },
] as const;

const comparisonRows = [
  {
    name: "Hue control",
    free: "Lights, rooms, zones, scenes, devices, and entertainment areas",
    pro: "Same Hue controls as Free",
  },
  {
    name: "Hue Bridge",
    free: "Save and use one bridge",
    pro: "Save and switch among multiple bridges",
  },
  {
    name: "Desktop widgets",
    free: "One standard widget with one room, zone, or light",
    pro: "Unlimited advanced widgets with multiple controls and customization",
  },
  {
    name: "Home dashboard",
    free: "Standard grouping layouts",
    pro: "Reorder cards and save a custom layout",
  },
  {
    name: "PC Sync",
    free: "Requirements and upgrade information",
    pro: "Video, Games, and Music modes with a compatible entertainment area",
  },
  {
    name: "Hue Play HDMI Sync Box",
    free: "Current single-box controls",
    pro: "Same Sync Box controls as Free",
  },
];

function FeatureBlock({ group }: { group: (typeof featureGroups)[number] }) {
  const headingId = `${group.id}-title`;
  const tierClass = group.tier === "Mote Pro" ? "feature-tier feature-tier--pro" : "feature-tier";

  return (
    <section className="feature-block" aria-labelledby={headingId}>
      <div className="feature-block__copy">
        <p className={tierClass}>{group.tier}</p>
        <h2 id={headingId}>{group.title}</h2>
        <p className="feature-block__summary">{group.summary}</p>
        <ul className="feature-block__points">
          {group.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <figure className="feature-block__media">
        <ProductCapture src={group.src} alt={group.alt} width={group.width} height={group.height} />
      </figure>
    </section>
  );
}

function FeaturesPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Everything Mote Desktop does">
        <p>
          Mote keeps Philips Hue lights, rooms, zones, and scenes available while you use your PC.
          Everyday control is free. Mote Pro adds multiple bridges, advanced widgets, custom
          dashboard layouts, and PC Sync as a one-time Microsoft Store purchase.
        </p>
        <p className="mt-6 text-base">
          <a className="footer-link" href="#comparison-title">
            Skip to the Free and Mote Pro comparison
          </a>
        </p>
      </PageIntro>

      <div className="feature-catalog">
        {featureGroups.map((group) => (
          <FeatureBlock group={group} key={group.id} />
        ))}
      </div>

      <section className="py-12 sm:py-16" aria-labelledby="comparison-title">
        <h2 id="comparison-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Free and Mote Pro
        </h2>
        <p className="mt-5 max-w-2xl leading-7 text-mote-muted">
          Both tiers share the same Hue control. Pro expands the workflow rather than holding back
          everyday functionality.
        </p>
        <p className="mt-8 text-sm text-mote-muted sm:hidden">Scroll horizontally to compare.</p>
        <div
          className="mt-6 overflow-x-auto rounded-lg focus-visible:outline-offset-4 sm:mt-10"
          role="region"
          aria-label="Scrollable Free and Mote Pro comparison"
          tabIndex={0}
        >
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-mote-muted/40 text-base text-mote-ink">
                <th className="w-1/4 py-4 pr-6 font-medium" scope="col">
                  Feature
                </th>
                <th className="w-3/8 px-6 py-4 font-medium" scope="col">
                  Free
                </th>
                <th
                  className="w-3/8 py-4 pl-6 font-semibold text-[var(--mote-signal-strong)]"
                  scope="col"
                >
                  Mote Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr className="border-b border-mote-line align-top" key={row.name}>
                  <th className="py-6 pr-6 font-semibold" scope="row">
                    {row.name}
                  </th>
                  <td className="px-6 py-6 leading-7 text-mote-muted">{row.free}</td>
                  <td className="py-6 pl-6 font-medium leading-7 text-mote-ink">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="readable py-12 text-mote-muted">
        <h2 className="text-xl font-semibold text-mote-ink">PC Sync requirements</h2>
        <p className="mt-4 leading-7">
          PC Sync requires Windows, a compatible Hue Bridge and entertainment area, and supported
          display capture or system-audio loopback. Network isolation, VPNs, firewalls, and hardware
          capabilities can affect availability.
        </p>
      </aside>
    </main>
  );
}

export const Route = createFileRoute("/features")({
  head: () =>
    pageHead({
      title: "Features — Mote Desktop",
      description:
        "Every Mote Desktop feature, from the home dashboard and desktop widgets to PC Sync, with a full Free and Mote Pro comparison.",
      path: "/features",
    }),
  component: FeaturesPage,
});

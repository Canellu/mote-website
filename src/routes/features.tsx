import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProductCapture } from "../components/product-capture";
import { storeUrl } from "../lib/links";
import { pageHead } from "../lib/seo";

/**
 * How much of the page a feature is worth.
 *
 * The catalog used to be eight blocks of the same height alternating sides,
 * which said that positioning a light in a 3D room and choosing a window
 * behaviour matter equally. They do not. `hero` is for the two features that
 * are reasons to install the application at all; `standard` is the ordinary
 * two-column block; `compact` is for setup, which people read once and which
 * shares a two-up row with its neighbour rather than taking a screen of its own.
 */
type FeatureWeight = "hero" | "standard" | "compact";

const featureGroups = [
  {
    id: "dashboard",
    weight: "hero",
    tiers: ["Free"],
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
    frame: "amber",
    side: "right",
  },
  {
    id: "room-control",
    weight: "standard",
    tiers: ["Free"],
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
    frame: "magenta",
    side: "left",
  },
  {
    id: "scenes",
    weight: "standard",
    tiers: ["Free"],
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
    frame: "aqua",
    side: "right",
  },
  {
    id: "widgets",
    weight: "standard",
    tiers: ["Free", "Mote Pro"],
    title: "Desktop widgets",
    summary: "Keep the controls you use most pinned beside your work.",
    points: [
      "Name each widget so it is easy to recognize later",
      "Combine rooms, zones, and individual lights in one widget",
      "Arrange the controls, choose the density and appearance, and preview the result",
      "Free includes one standard widget with one room, zone, or light",
      "Mote Pro adds unlimited advanced widgets with multiple controls and customization",
    ],
    src: "/product/mote-widget-stack-dark.png",
    alt: "A stack of colorful Mote Desktop widgets for rooms, scenes, and lights",
    width: 401,
    height: 702,
    frame: "amber",
    side: "left",
    // The one portrait capture on the page. A crop of a stack of widgets is a
    // stack of widgets with the bottom one missing, so this one is fitted.
    fit: "contain",
  },
  {
    id: "pc-sync",
    weight: "hero",
    tiers: ["Mote Pro"],
    title: "PC Sync",
    summary: "Match a compatible entertainment area to what is happening on your PC.",
    points: [
      "Video, Games, and Music modes for a compatible entertainment area",
      "Choose which part of the display each light follows",
      "Position each light of the entertainment area in a three-dimensional model of the space",
      "Processing happens on your PC; captured pixels and audio are not uploaded",
    ],
    src: "/product/mote-sync-placement-screen-dark.png",
    alt: "Mote Desktop light placement screen showing display sampling regions",
    width: 1298,
    height: 1121,
    frame: "aqua",
    side: "right",
  },
  {
    id: "sync-box",
    weight: "standard",
    tiers: ["Free", "Mote Pro"],
    title: "Hue Play HDMI Sync Box",
    summary: "Drive the same entertainment area from a Sync Box instead of your PC.",
    points: [
      "Pick which HDMI source the box follows",
      "Video, Game, and Music styles with an intensity setting",
      "Fine-tune how strongly the entertainment lights react",
      "Power and sync controls for a single Sync Box in both Free and Mote Pro",
    ],
    src: "/product/mote-sync-hdmi-box-dark.png",
    alt: "Mote Desktop Sync Box screen showing HDMI sources and sync style controls",
    width: 989,
    height: 1108,
    frame: "magenta",
    side: "left",
  },
  {
    id: "hardware",
    weight: "compact",
    tiers: ["Free", "Mote Pro"],
    title: "Hue Bridges",
    summary:
      "Pair the Hue Bridge Pro or classic bridge you already own. Free saves one; Mote Pro switches among several.",
    points: [
      "Choose a Hue Bridge Pro or a classic Hue Bridge found on your network",
      "Pair using the bridge link button",
    ],
    src: "/product/mote-bridge-dark.png",
    alt: "Mote Desktop setup screen with a selected Hue Bridge Pro beside a classic Hue Bridge",
    width: 960,
    height: 1061,
    frame: "aqua",
    side: "right",
  },
  {
    id: "preferences",
    weight: "compact",
    tiers: ["Free"],
    title: "App preferences",
    summary:
      "Choose the appearance, feedback, and window behavior. Everything Mote saves stays on your device.",
    points: [
      "Choose the app appearance, feedback, and window behavior",
      "Connection details, preferences, layouts, and widgets stay on your device",
    ],
    src: "/product/mote-settings-theme-dark.png",
    alt: "Mote Desktop general settings with appearance and window behavior controls",
    width: 960,
    height: 1061,
    frame: "amber",
    side: "right",
  },
] as const;

type FeatureGroup = (typeof featureGroups)[number];

/**
 * One capability a row, stated as a mark rather than a sentence.
 *
 * Every cell used to be a clause — "Lights, rooms, zones, scenes, devices, and
 * entertainment areas" against "Same Hue controls as Free" — which is a table
 * you have to read rather than one you can scan, and which needed 44rem of
 * width to lay out, so a phone got a horizontal scrollbar over the page's most
 * wanted content. `true` is included, `false` is not, and a string is used only
 * where the tiers differ by amount rather than by presence.
 */
type ComparisonValue = boolean | string;

const comparisonRows: { name: string; free: ComparisonValue; pro: ComparisonValue }[] = [
  { name: "Rooms, zones, lights, and scenes", free: true, pro: true },
  { name: "Devices and entertainment areas", free: true, pro: true },
  { name: "Color and white temperature inspector", free: true, pro: true },
  { name: "Hue Play HDMI Sync Box", free: "One box", pro: "One box" },
  { name: "Hue Bridges", free: "One", pro: "Multiple" },
  { name: "Desktop widgets", free: "1 standard", pro: "Unlimited" },
  { name: "Multiple controls in one widget", free: false, pro: true },
  { name: "Dashboard layout", free: "Standard", pro: "Custom" },
  { name: "PC Sync: Video, Games, and Music", free: false, pro: true },
  { name: "Display sampling and 3D light placement", free: false, pro: true },
];

/**
 * A tick, a dash, or a short value. The glyph is hidden from assistive
 * technology and the word is given instead: a table read aloud as "check,
 * check, dash" is a table nobody can follow.
 */
function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (typeof value === "string") return <>{value}</>;

  return (
    <>
      <span aria-hidden="true">{value ? "✓" : "—"}</span>
      <span className="sr-only">{value ? "Included" : "Not included"}</span>
    </>
  );
}

/**
 * The tier, as a badge rather than the caption it used to be. It is the axis
 * the whole page turns on, and at 0.72rem of muted uppercase it was the
 * quietest mark on it. Two badges mean the feature is in both tiers; the points
 * beneath say where the line falls.
 */
function TierBadges({ tiers }: { tiers: FeatureGroup["tiers"] }) {
  return (
    <ul className="feature-tiers">
      {tiers.map((tier) => (
        <li
          className={tier === "Mote Pro" ? "feature-tier feature-tier--pro" : "feature-tier"}
          key={tier}
        >
          {tier}
        </li>
      ))}
    </ul>
  );
}

/**
 * How wide the capture paints, by weight. The hero stage is the widest on the
 * page; the compact pair sit two to a row; a standard block's capture takes a
 * little under half of it.
 */
function stageSizes(weight: FeatureWeight): string {
  if (weight === "hero") return "(min-width: 62rem) 62vw, 88vw";
  if (weight === "compact") return "(min-width: 62rem) 40vw, 88vw";
  return "(min-width: 62rem) 44vw, 88vw";
}

function FeatureBlock({ group }: { group: FeatureGroup }) {
  const headingId = `${group.id}-title`;
  const fit = "fit" in group ? group.fit : "cover";

  return (
    <section
      className="feature-block"
      data-weight={group.weight}
      data-side={group.side}
      aria-labelledby={headingId}
    >
      <div className="feature-block__copy">
        <div className="feature-block__lead">
          <TierBadges tiers={group.tiers} />
          <h2 id={headingId}>{group.title}</h2>
          <p className="feature-block__summary">{group.summary}</p>
        </div>
        {/* A compact feature says its whole piece in the summary. A bullet
            list under it would make the pair as tall as the blocks they were
            compressed out of. */}
        {group.weight !== "compact" && (
          <ul className="feature-block__points">
            {group.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
      </div>
      <figure className="feature-block__media" data-frame={group.frame} data-fit={fit}>
        <ProductCapture
          src={group.src}
          alt={group.alt}
          width={group.width}
          height={group.height}
          sizes={stageSizes(group.weight)}
        />
      </figure>
    </section>
  );
}

/**
 * Consecutive compact features share one two-up row. Grouping is read out of
 * the data rather than assumed to be the tail of it, so moving a compact
 * feature up the catalog moves its row with it.
 */
function toRuns(groups: readonly FeatureGroup[]): (FeatureGroup | FeatureGroup[])[] {
  const runs: (FeatureGroup | FeatureGroup[])[] = [];

  for (const group of groups) {
    const last = runs[runs.length - 1];
    if (group.weight !== "compact") runs.push(group);
    else if (Array.isArray(last)) last.push(group);
    else runs.push([group]);
  }

  return runs;
}

function FeaturesPage() {
  return (
    <main id="main" className="features-page">
      <div className="features-shell">
        <PageIntro title="Everything Mote Desktop does">
          <p>
            Mote keeps Philips Hue lights, rooms, zones, and scenes available while you use your PC.
            Everyday control is free. Mote Pro adds multiple bridges, advanced widgets, custom
            dashboard layouts, and PC Sync.
          </p>
        </PageIntro>

        {/*
         * The comparison opens the page rather than closing it. It used to sit
         * about five thousand pixels down behind a small muted jump link, which
         * put the one thing a reader weighing the two tiers came for behind the
         * whole catalog. Read first, it also gives the catalog underneath
         * something to be evidence for.
         */}
        <section className="tier-compare" aria-labelledby="comparison-title">
          <h2 id="comparison-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Free and Mote Pro
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-mote-muted">
            Both tiers share the same Hue control. Pro expands the workflow rather than holding back
            everyday functionality. It is a one-time purchase rather than a subscription, and it is
            not yet available to buy.
          </p>
          {/*
           * table-layout: fixed, so the columns take the widths declared here
           * and long feature names wrap inside them. Left to auto the table
           * sizes to its content and simply runs off the side of a phone,
           * which is what a min-width could floor but never prevent.
           */}
          <div className="mt-8 overflow-x-auto rounded-lg focus-visible:outline-offset-4 sm:mt-10">
            <table className="tier-table w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-mote-muted/40 text-base text-mote-ink">
                  <th className="w-2/5 py-4 pr-2 font-medium sm:pr-6" scope="col">
                    Feature
                  </th>
                  <th className="px-2 py-4 font-medium sm:px-6" scope="col">
                    <span className="feature-tier">Free</span>
                  </th>
                  <th className="px-2 py-4 font-medium sm:px-6" scope="col">
                    <span className="feature-tier feature-tier--pro">Mote Pro</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr className="border-b border-mote-line" key={row.name}>
                    <th className="py-4 pr-2 leading-6 font-medium sm:pr-6" scope="row">
                      {row.name}
                    </th>
                    <td className="px-2 py-4 leading-6 text-mote-muted sm:px-6">
                      <ComparisonCell value={row.free} />
                    </td>
                    <td className="px-2 py-4 leading-6 font-medium text-mote-ink sm:px-6">
                      <ComparisonCell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
              {/*
               * The table used to end and drop the reader into the catalog with
               * nothing to act on. Every comparison worth copying puts the way
               * out in the column it belongs to — which is what a tfoot is, and
               * it stays aligned with the columns for free.
               */}
              <tfoot className="tier-table__actions">
                <tr>
                  <td />
                  <td className="px-2 pt-8 align-top sm:px-6">
                    <a
                      className="inline-flex min-h-11 items-center rounded-xl bg-mote-mint px-5 py-3 font-semibold text-mote-ink no-underline outline-offset-4 transition-transform duration-150 active:scale-[0.97]"
                      href={storeUrl("web-compare")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Mote Free
                    </a>
                  </td>
                  <td className="px-2 pt-8 align-top leading-6 text-mote-muted sm:px-6">
                    A one-time purchase rather than a subscription. Not yet available to buy.
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>

      <div className="feature-catalog">
        {toRuns(featureGroups).map((run) =>
          Array.isArray(run) ? (
            <div className="feature-row" key={run[0].id}>
              {run.map((group) => (
                <FeatureBlock group={group} key={group.id} />
              ))}
            </div>
          ) : (
            <FeatureBlock group={run} key={run.id} />
          ),
        )}
      </div>

      <div className="features-shell">
        <aside className="readable py-12 text-mote-muted">
          <h2 className="text-xl font-semibold text-mote-ink">PC Sync requirements</h2>
          <p className="mt-4 leading-7">
            PC Sync requires Windows, a compatible Hue Bridge and entertainment area, and supported
            display capture or system-audio loopback. Network isolation, VPNs, firewalls, and
            hardware capabilities can affect availability.
          </p>
        </aside>
      </div>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProductCapture } from "../components/product-capture";
import { MoteMascot } from "../components/mote-mascot";
import { storeUrl } from "../lib/links";
import { pageHead } from "../lib/seo";

/**
 * Sourced from `mote-desktop/docs/free-pro-feature-matrix.md` and
 * `docs/known-limitations.md` and the 0.12.0 widget settings, reviewed 2026-10-30.
 *
 * Free is one widget. Until 2026-09-18 the app set no limit on how many widgets
 * existed and only charged for what one widget held; the owner narrowed Free
 * that day, and `open-widget-window` now refuses a second widget without Pro.
 */
const freeCapabilities = [
  "One widget on the desktop",
  "One room, zone, or light in it — each counts as one target",
  "Collapse into a mascot, named pill, or bubble, then click to open or drag to move",
  "The Cartoon mascot, optional animation, and a choice of facing direction",
  "Stacking or fading, expansion direction, and an optional auto-collapse delay",
  "Standard widget size and corners, the system theme, and ordinary window behaviour",
];

const proCapabilities = [
  "As many widgets as you want",
  "Four more mascot styles: Low poly, Pixel art, Paper, and Watercolor",
  "More than one control in a widget, and multi-target toggle groups",
  "Widget theme, size, corners, translucent tiles, and placement chosen rather than inherited",
  "Pinning and always-on-top behaviour",
  "Separate sizes for the open widget and its collapsed look",
];

const mascotStyles = [
  ["low-poly", "Low poly"],
  ["pixel-art", "Pixel art"],
  ["paper-cutout", "Paper"],
  ["watercolor", "Watercolor"],
] as const;

function DesktopWidgetsPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Desktop widgets for your Hue lights">
        <p>
          A widget is a small always-available window that controls your lights without opening the
          full dashboard. The free app gives you one, for one room, zone, or light. Mote Pro lets
          you keep as many as you like and fill each with several controls.
        </p>
      </PageIntro>

      <div className="grid items-start gap-x-16 gap-y-12 py-12 sm:py-16 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <section aria-labelledby="free-title">
            <h2 id="free-title" className="text-2xl font-semibold tracking-tight">
              In the free app
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-mote-muted marker:text-mote-mint">
              {freeCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12" aria-labelledby="pro-title">
            <h2 id="pro-title" className="text-2xl font-semibold tracking-tight">
              With Mote Pro
            </h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-mote-muted marker:text-mote-mint">
              {proCapabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
            <p className="mt-6 leading-7 text-mote-muted">
              Mote Pro is free to try for 14 days, then a one-time purchase through the Microsoft
              Store rather than a subscription.
            </p>
          </section>
        </div>

        <figure className="m-0">
          <ProductCapture
            src="/product/mote-widget-stack-dark.png"
            alt="A stack of colorful Mote Desktop widgets for rooms, scenes, and lights"
            sizes="(min-width: 1024px) 30vw, 70vw"
            width={401}
            height={702}
          />
          <figcaption className="mt-4 text-sm leading-6 text-mote-muted">
            Widgets for rooms, scenes, and lights, sitting beside whatever else is on the desktop.
          </figcaption>
        </figure>
      </div>

      <section className="py-12 sm:py-16" aria-labelledby="mascot-title">
        <div className="readable">
          <h2 id="mascot-title" className="scroll-mt-28 text-2xl font-semibold tracking-tight">
            A mascot for your desktop
          </h2>
          <p className="mt-5 leading-7 text-mote-muted">
            Fold your widget away and leave a little mascot beside your work. It idles, blinks,
            glows, and flutters on hover. Cartoon is included free; turn it to face the other way,
            or switch its animation off. Prefer something simpler? Use a pill with the widget's name
            or a round bubble instead.
          </p>
        </div>
        <figure className="mt-8 w-fit text-center">
          <MoteMascot label="Play with the Cartoon mascot" className="mote-mascot--gallery" />
          <figcaption className="mt-3 text-sm text-mote-muted">Cartoon · Free</figcaption>
        </figure>
        <h3 className="mt-10 text-xl font-semibold tracking-tight">
          More mascot styles with Mote Pro
        </h3>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {mascotStyles.map(([style, label]) => (
            <figure key={style} className="m-0 text-center">
              <MoteMascot
                style={style}
                label={`Play with the ${label} mascot`}
                className="mote-mascot--gallery"
              />
              <figcaption className="mt-3 text-sm text-mote-muted">{label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 text-sm text-mote-muted">Hover or tap a mascot to see it move.</p>
        <p className="readable mt-8 leading-7 text-mote-muted">
          In widget settings, choose cards that stack one by one or a panel that fades as it folds.
          Set the direction it opens, or open evenly around the mascot. Auto collapse folds it away
          after the pointer leaves for the delay you choose. With Mote Pro, set open and collapsed
          sizes separately; pinned controls float without a background until you hover the top edge
          for the toolbar.
        </p>
      </section>

      <section className="readable py-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight">What counts as one target</h2>
        <p className="mt-5 leading-7 text-mote-muted">
          A room is one target. So is a zone, and so is a single light — a widget pointed at the
          living room is one control even though the room holds several bulbs. What requires Pro is
          a second widget, more than one control in the same widget, or a toggle that acts on
          several targets at once.
        </p>
      </section>

      <section className="readable py-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Try it free</h2>
        <p className="mt-5 leading-7 text-mote-muted">
          Your free widget works as soon as a bridge is paired, and pairing also starts a 14-day
          Mote Pro trial, so extra widgets and multi-control widgets are free to try too. See the{" "}
          <Link to="/features/">full feature and tier comparison</Link>, or start with the{" "}
          <Link to="/guides/control-philips-hue-from-windows/">Windows setup guide</Link>.
        </p>
        <a
          className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-mote-mint px-5 py-3 font-semibold text-mote-ink no-underline outline-offset-4 transition-transform duration-150 active:scale-[0.97]"
          href={storeUrl("web-widgets")}
          target="_blank"
          rel="noreferrer"
        >
          Get Mote Desktop on Microsoft Store
        </a>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/features_/desktop-widgets")({
  head: () =>
    pageHead({
      title: "Philips Hue desktop widgets for Windows — Mote Desktop",
      description:
        "Keep Hue controls beside your work. The Cartoon mascot and one widget are free; Mote Pro adds four more mascot styles and unlimited widgets.",
      path: "/features/desktop-widgets",
    }),
  component: DesktopWidgetsPage,
});

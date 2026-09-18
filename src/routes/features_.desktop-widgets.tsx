import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProductCapture } from "../components/product-capture";
import { storeUrl } from "../lib/links";
import { pageHead } from "../lib/seo";

/**
 * Sourced from `mote-desktop/docs/free-pro-feature-matrix.md` and
 * `docs/known-limitations.md`, reviewed 2026-09-18.
 *
 * Free is one widget. Until 2026-09-18 the app set no limit on how many widgets
 * existed and only charged for what one widget held; the owner narrowed Free
 * that day, and `open-widget-window` now refuses a second widget without Pro.
 */
const freeCapabilities = [
  "One widget on the desktop",
  "One room, zone, or light in it — each counts as one target",
  "Standard widget size and corners, the system theme, and ordinary window behaviour",
];

const proCapabilities = [
  "As many widgets as you want",
  "More than one control in a widget, and multi-target toggle groups",
  "Widget theme, size, corners, and placement chosen rather than inherited",
  "Pinning and always-on-top behaviour",
];

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
          <Link to="/features">full feature and tier comparison</Link>, or start with the{" "}
          <Link to="/guides/control-philips-hue-from-windows">Windows setup guide</Link>.
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
        "Keep a room, zone, or light in a small always-available window on your Windows desktop. The free app includes one widget; Mote Pro adds more.",
      path: "/features/desktop-widgets",
    }),
  component: DesktopWidgetsPage,
});

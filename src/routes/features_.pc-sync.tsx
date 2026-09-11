import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProductCapture } from "../components/product-capture";
import { storeUrl } from "../lib/links";
import { pageHead } from "../lib/seo";

/**
 * Every statement here traces to `mote-desktop/docs/free-pro-feature-matrix.md`
 * and `docs/known-limitations.md`, reviewed 2026-09-01. PC Sync is the one
 * feature where the honest answer is conditional on hardware, so the caveats
 * are given the same weight as the capability rather than tucked into a
 * footnote.
 */
const modes = [
  {
    name: "Video",
    detail:
      "Drives a configured entertainment area from what is on the display you choose, so lights behind the screen follow the picture.",
  },
  {
    name: "Games",
    detail: "The same display pipeline, selected separately so it can be tuned for games.",
  },
  {
    name: "Music",
    detail:
      "Reads system-audio loopback — what the PC is playing. It does not use the microphone, so nothing in the room is listened to.",
  },
];

const requirements = [
  "Windows 10 or Windows 11 on an x64 PC",
  "A compatible Hue Bridge on the same local network",
  "A compatible Hue entertainment area, created and positioned in Mote Desktop",
  "An entertainment credential, provisioned when the area is first set up",
  "Mote Pro, to start a session",
];

const limits = [
  "Which displays, HDR modes, and audio devices work depends on Windows, your drivers, and your hardware. That behaviour is still being finalised through acceptance testing, so treat your own setup as the test.",
  "Music mode uses system-audio loopback rather than the microphone. Audio routed away from the system mixer will not reach it.",
  "PC Sync runs against one bridge. Syncing across several bridges at once is not part of the first release.",
  "Without Pro, Mote Desktop shows the requirements and the upgrade entry point but cannot start a session.",
];

function PcSyncPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="PC Sync: lights that follow your screen">
        <p>
          PC Sync drives a Hue entertainment area from your Windows PC — from a display, or from
          what the PC is playing. It needs compatible Hue entertainment hardware and Mote Pro, which
          is a one-time purchase rather than a subscription and is not yet available to buy.
        </p>
      </PageIntro>

      <div className="grid gap-x-16 gap-y-12 py-12 sm:py-16 lg:grid-cols-[1fr_1fr]">
        <section aria-labelledby="modes-title">
          <h2 id="modes-title" className="text-2xl font-semibold tracking-tight">
            Three modes
          </h2>
          <dl className="mt-8 space-y-8">
            {modes.map((mode) => (
              <div key={mode.name}>
                <dt className="text-lg font-semibold text-mote-ink">{mode.name}</dt>
                <dd className="mt-2 leading-7 text-mote-muted">{mode.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <figure className="m-0">
          <ProductCapture
            src="/product/mote-sync-this-pc-dark.png"
            alt="The PC Sync screen in Mote Desktop, showing mode selection and the display being synced."
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
          <figcaption className="mt-4 text-sm leading-6 text-mote-muted">
            PC Sync in Mote Desktop. Starting a session requires Mote Pro and a configured
            entertainment area.
          </figcaption>
        </figure>
      </div>

      <section className="readable py-12 sm:py-16" aria-labelledby="requirements-title">
        <h2 id="requirements-title" className="text-2xl font-semibold tracking-tight">
          What you need
        </h2>
        <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-mote-muted marker:text-mote-mint">
          {requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </section>

      <section className="readable py-12 sm:py-16" aria-labelledby="limits-title">
        <h2 id="limits-title" className="text-2xl font-semibold tracking-tight">
          Where it stops
        </h2>
        <p className="mt-5 leading-7 text-mote-muted">
          PC Sync depends on hardware Mote Desktop does not control, so it is worth knowing the
          edges before you count on it.
        </p>
        <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-mote-muted marker:text-mote-mint">
          {limits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </section>

      <section className="readable py-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Start with the free app</h2>
        <p className="mt-5 leading-7 text-mote-muted">
          Mote Desktop is free on the Microsoft Store, and entertainment areas can be created,
          positioned, and tested without Pro. That is the way to find out whether your hardware is
          ready before anything is charged for. See the{" "}
          <Link to="/features">full feature and tier comparison</Link>, or follow the{" "}
          <Link to="/guides/control-philips-hue-from-windows">Windows setup guide</Link> to pair a
          bridge first.
        </p>
        <a
          className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-mote-mint px-5 py-3 font-semibold text-mote-ink no-underline outline-offset-4 transition-transform duration-150 active:scale-[0.97]"
          href={storeUrl("web-pc-sync")}
          target="_blank"
          rel="noreferrer"
        >
          Get Mote Desktop on Microsoft Store
        </a>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/features_/pc-sync")({
  head: () =>
    pageHead({
      title: "PC Sync for Philips Hue on Windows — Mote Desktop",
      description:
        "Sync a compatible Hue entertainment area with your Windows display or system audio. Video, Games, and Music modes, the hardware you need, and the limits that apply.",
      path: "/features/pc-sync",
    }),
  component: PcSyncPage,
});

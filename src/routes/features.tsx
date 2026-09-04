import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { pageHead } from "../lib/seo";

const features = [
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

function FeaturesPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Free and Mote Pro">
        <p>
          Free includes everyday Hue control. Mote Pro adds multiple bridges, advanced widgets,
          custom dashboard layouts, and PC Sync. Pro will be a one-time Microsoft Store purchase.
        </p>
      </PageIntro>

      <section className="py-12 sm:py-16" aria-labelledby="comparison-title">
        <h2 id="comparison-title" className="sr-only">
          Free and Mote Pro comparison
        </h2>
        <p className="mb-4 text-sm text-mote-muted sm:hidden">Scroll horizontally to compare.</p>
        <div
          className="overflow-x-auto rounded-lg focus-visible:outline-offset-4"
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
              {features.map((feature) => (
                <tr className="border-b border-mote-line align-top" key={feature.name}>
                  <th className="py-6 pr-6 font-semibold" scope="row">
                    {feature.name}
                  </th>
                  <td className="px-6 py-6 leading-7 text-mote-muted">{feature.free}</td>
                  <td className="py-6 pl-6 font-medium leading-7 text-mote-ink">{feature.pro}</td>
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
      description: "Compare the features included with Mote Desktop Free and Mote Pro.",
      path: "/features",
    }),
  component: FeaturesPage,
});

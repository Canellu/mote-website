import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { pageHead } from "../lib/seo";

const checks = [
  "Check that your PC and Hue Bridge or Sync Box are powered on and connected to the same local network.",
  "Check whether Windows Firewall, a VPN, or other security software is blocking local discovery.",
  "If the bridge is unreachable, restart Mote Desktop and use the reconnect action.",
  "Write down what you expected, what happened, and the steps needed to reproduce the problem.",
];

function SupportPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Mote Desktop support">
        <p>
          Run these checks before requesting help. Contact details and response times will be added
          before Mote Desktop is released.
        </p>
      </PageIntro>

      <div className="grid gap-x-16 gap-y-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-labelledby="checks-title">
          <h2 id="checks-title" className="text-2xl font-semibold tracking-tight">
            Checks to run first
          </h2>
          <ol className="mt-8 space-y-6">
            {checks.map((check, index) => (
              <li className="flex gap-4 leading-7 text-mote-muted" key={check}>
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-mote-panel text-sm font-semibold text-mote-mint tabular-nums"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5">{check}</span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="lg:pl-12">
          <h2 className="text-2xl font-semibold tracking-tight">System requirements</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-mote-muted marker:text-mote-mint">
            <li>Windows 10 or Windows 11 on an x64 PC</li>
            <li>A compatible Hue Bridge on the same local network</li>
            <li>Physical access to the Hue Bridge link button during pairing</li>
            <li>A compatible entertainment area for PC Sync</li>
            <li>A configured Hue Play HDMI Sync Box for Sync Box controls</li>
          </ul>
        </aside>
      </div>

      <section className="readable py-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Do not include credentials</h2>
        <p className="mt-5 leading-7 text-mote-muted">
          Do not send Hue application keys, entertainment credentials, Sync Box tokens, bridge or
          Sync Box addresses, captured PC Sync content, or unrelated personal information with a
          support request.
        </p>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/support")({
  head: () =>
    pageHead({
      title: "Support — Mote Desktop",
      description:
        "Requirements and troubleshooting help for Mote Desktop and compatible Hue hardware.",
      path: "/support",
    }),
  component: SupportPage,
});

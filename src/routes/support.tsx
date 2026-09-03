import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { pageHead } from "../lib/seo";

const checks = [
  "Confirm the PC and Hue Bridge or Sync Box are powered and on the same local network.",
  "Confirm Windows Firewall, a VPN, or other security software is not blocking local discovery.",
  "Restart Mote Desktop and use its reconnect action if the bridge is unreachable.",
  "Note what you expected, what happened, and the steps that reproduce the problem.",
];

function SupportPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Let’s get your lights talking again.">
        <p>
          Start with the checks below. The support address and response expectations will appear
          here after the Mote Desktop domain and email are active.
        </p>
      </PageIntro>

      <div className="grid gap-x-16 gap-y-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-labelledby="checks-title">
          <h2 id="checks-title" className="text-2xl font-semibold tracking-tight">
            Before contacting support
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

        <aside className="border-t border-mote-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <h2 className="text-2xl font-semibold tracking-tight">What you’ll need</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-mote-muted marker:text-mote-mint">
            <li>Windows 10 or Windows 11 on an x64 PC</li>
            <li>A compatible Hue Bridge on the same local network</li>
            <li>Physical access to the Hue Bridge link button during pairing</li>
            <li>A compatible entertainment area for PC Sync</li>
            <li>A configured Hue Play HDMI Sync Box for Sync Box controls</li>
          </ul>
        </aside>
      </div>

      <section className="readable border-t border-mote-line py-12 sm:py-16">
        <h2 className="text-2xl font-semibold tracking-tight">Keep credentials private</h2>
        <p className="mt-5 leading-7 text-mote-muted">
          Never send Hue application keys, entertainment credentials, Sync Box tokens, bridge or
          Sync Box addresses, captured PC Sync content, or unrelated personal information in a
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

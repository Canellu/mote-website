import { Link, createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProductCapture } from "../components/product-capture";
import { ProseContents } from "../components/prose-contents";
import { storeUrl } from "../lib/links";
import { pageHead } from "../lib/seo";

const sections = [
  { id: "requirements", label: "What you need" },
  { id: "connect", label: "Connect your bridge" },
  { id: "first-control", label: "Make your first change" },
  { id: "troubleshooting", label: "If Mote cannot find the bridge" },
  { id: "network", label: "Internet and local-network behavior" },
] as const;

function SetupGuidePage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Control Philips Hue from Windows">
        <p>
          Mote Desktop connects a Windows PC to a compatible Hue Bridge on the same local network.
          This guide follows the current in-app setup flow from installation to the first light
          change.
        </p>
        <p className="prose-effective">
          Reviewed against the Windows release candidate on 11 September 2026
        </p>
      </PageIntro>

      <article className="guide-page">
        <ProseContents sections={sections} />

        <section id="requirements">
          <h2>What you need</h2>
          <ul>
            <li>A Windows 10 or Windows 11 PC with an x64 processor</li>
            <li>A compatible Hue Bridge, powered and connected to your router</li>
            <li>The PC and Hue Bridge on the same local network</li>
            <li>Physical access to the round link button on the bridge during pairing</li>
          </ul>
          <p>
            A Hue Bridge is required for lighting control. Mote does not connect directly to a
            Bluetooth-only light setup.
          </p>
        </section>

        <section id="connect">
          <h2>Connect your Hue Bridge</h2>
          <ol className="guide-steps">
            <li>
              <h3>Install and open Mote Desktop</h3>
              <p>
                Use the official Microsoft Store listing, then open Mote Desktop. The Free tier is
                enough to pair and control one saved Hue Bridge.
              </p>
            </li>
            <li>
              <h3>Start discovery</h3>
              <p>
                Choose <strong>Connect</strong>. Mote scans the local network for Hue Bridges. If it
                finds more than one, select the bridge you want and choose <strong>Continue</strong>
                .
              </p>
            </li>
            <li>
              <h3>Press the bridge link button</h3>
              <p>
                When Mote asks, press the round button on top of the Hue Bridge. Keep Mote open
                while the bridge authorizes the connection.
              </p>
            </li>
            <li>
              <h3>Open the dashboard</h3>
              <p>
                After Mote shows <strong>Connected</strong>, continue to the dashboard. Your bridge
                reports its rooms, zones, lights, and scenes directly to Mote.
              </p>
            </li>
          </ol>

          <a
            className="guide-store-link"
            href={storeUrl("web-guide")}
            target="_blank"
            rel="noreferrer"
          >
            Get Mote Desktop on Microsoft Store
          </a>
        </section>

        <figure className="guide-capture">
          <ProductCapture
            src="/product/mote-bridge-dark.png"
            alt="Mote Desktop bridge settings showing saved Hue Bridge Pro and Hue Bridge connections"
            width={960}
            height={1061}
            sizes="(min-width: 48rem) 44rem, 92vw"
          />
          <figcaption>
            Once connected, saved bridges appear in Mote&apos;s Bridge settings. Mote Pro can save
            multiple bridges, with one active at a time.
          </figcaption>
        </figure>

        <section id="first-control">
          <h2>Make your first light change</h2>
          <p>
            The dashboard shows the rooms and zones reported by the active bridge. Use the power and
            brightness controls there, or open a room or zone to reach its member lights and scenes.
            Color and color-temperature controls appear where the selected lights support them.
          </p>
          <p>
            Essential Hue control is included in Free. See the maintained{" "}
            <Link to="/features">Free and Mote Pro comparison</Link> for widget, dashboard, bridge,
            and PC Sync tier details.
          </p>
        </section>

        <section id="troubleshooting">
          <h2>If Mote cannot find the bridge</h2>
          <ul>
            <li>Confirm the bridge is powered and connected to your router by Ethernet.</li>
            <li>Confirm the PC and bridge are on the same local network.</li>
            <li>
              Temporarily disconnect a VPN or leave guest Wi-Fi if either isolates the PC from local
              devices.
            </li>
            <li>
              Check whether firewall rules, router client isolation, or multicast filtering are
              blocking discovery, then try again.
            </li>
            <li>
              If pairing times out, restart the flow and press the bridge button when prompted.
            </li>
          </ul>
          <p>
            If discovery still fails, use the <Link to="/support">support checklist</Link> and send
            a support request without application keys, bridge credentials, addresses, or unrelated
            personal information.
          </p>
        </section>

        <section id="network">
          <h2>Internet and local-network behavior</h2>
          <p>
            Core lighting commands travel between the PC and Hue Bridge across your local network;
            Mote does not relay them through its publisher. Internet access can still be needed for
            Microsoft Store installation, licensing and updates, and for fallback bridge discovery.
          </p>
          <p>
            Mote does not include remote Hue cloud control. Read the{" "}
            <Link to="/privacy">privacy policy</Link> for the complete data-handling description.
          </p>
        </section>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/guides/control-philips-hue-from-windows")({
  head: () =>
    pageHead({
      title: "How to Control Philips Hue from Windows | Mote Desktop",
      description:
        "Connect a compatible Hue Bridge to Mote Desktop on Windows, control your first light, and troubleshoot local-network discovery.",
      path: "/guides/control-philips-hue-from-windows",
    }),
  component: SetupGuidePage,
});

import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCapture } from "../components/product-capture";
import { storeUrl } from "../lib/links";
import { pageHead } from "../lib/seo";
import "../setup-guide.css";

const sections = [
  { id: "requirements", label: "Before you start" },
  { id: "connect", label: "Connect your bridge" },
  { id: "first-control", label: "Control your lights" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "network", label: "How the connection works" },
] as const;

function GuideContents() {
  const [active, setActive] = useState<string>("requirements");
  useEffect(() => {
    const update = () => {
      let current: string = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.3)
          current = section.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <nav aria-label="On this page" className="setup-index">
      {sections.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>
          {label}
        </a>
      ))}
    </nav>
  );
}

function SetupGuidePage() {
  const [contentsOpen, setContentsOpen] = useState(true);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const update = () => setContentsOpen(desktop.matches);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);
  return (
    <main id="main" className="setup-guide">
      <div className="setup-container">
        <header className="setup-opening">
          <h1>
            Control Philips Hue
            <br className="hidden sm:block" /> from Windows.
          </h1>
          <div className="setup-opening__intro">
            <p>
              From your Hue Bridge to your first light change. Get connected with Mote Desktop, then
              make the room your own.
            </p>
            <a
              className="setup-download"
              href={storeUrl("web-guide")}
              target="_blank"
              rel="noreferrer"
            >
              Get Mote Free
            </a>
            <span className="setup-opening__availability">For Windows 10 &amp; 11 · x64</span>
          </div>
        </header>
        <div className="setup-layout">
          <aside className="setup-sidebar">
            <details
              className="setup-contents"
              open={contentsOpen}
              onToggle={(event) => setContentsOpen(event.currentTarget.open)}
            >
              <summary>On this page</summary>
              <GuideContents />
            </details>
            <p className="setup-sidebar__help">
              Already connected?
              <br />
              <a href="#first-control">Jump to light controls</a>
            </p>
          </aside>
          <article className="setup-article">
            <section id="requirements" className="setup-requirements">
              <h2>Before you start</h2>
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <li>
                  <strong>A Windows PC</strong>
                  <span>Windows 10 or 11, with an x64 processor.</span>
                </li>
                <li>
                  <strong>A compatible Hue Bridge</strong>
                  <span>Powered on and connected to your router by Ethernet.</span>
                </li>
                <li>
                  <strong>The same local network</strong>
                  <span>Your PC and bridge need to be able to reach each other.</span>
                </li>
                <li>
                  <strong>Your bridge within reach</strong>
                  <span>You’ll press its round link button during pairing.</span>
                </li>
              </ul>
              <p className="setup-requirements__note">
                A Hue Bridge is required. Bluetooth-only light setups cannot connect directly to
                Mote.
              </p>
            </section>
            <section id="connect" className="setup-connect">
              <h2>Connect your Hue Bridge</h2>
              <p className="setup-section-intro">One setup. Your lights, right on your desktop.</p>
              <ol className="setup-steps">
                <li>
                  <span className="setup-step-number" aria-hidden="true">
                    1
                  </span>
                  <div className="setup-step-content">
                    <h3>Install and open Mote</h3>
                    <p>
                      Install Mote Desktop from the{" "}
                      <a href={storeUrl("web-guide")} target="_blank" rel="noreferrer">
                        Microsoft Store
                      </a>
                      , then open the app. The Free tier includes pairing and control of one saved
                      Hue Bridge.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="setup-step-number" aria-hidden="true">
                    2
                  </span>
                  <div className="setup-step-content">
                    <h3>Find your bridge</h3>
                    <p>
                      Choose <strong>Connect</strong> to scan your local network. If Mote finds more
                      than one bridge, select the one you want and choose <strong>Continue</strong>.
                    </p>
                    <figure className="setup-bridge-figure">
                      <div className="setup-bridge-image">
                        <ProductCapture
                          src="/product/mote-bridge-dark.png"
                          alt="Mote’s bridge selection screen, with Hue Bridge Pro selected and a Continue button below"
                          width={960}
                          height={1061}
                          sizes="(min-width: 80rem) 790px, (min-width: 64rem) 65vw, 90vw"
                        />
                      </div>
                      <figcaption>
                        Choose the bridge you want to connect to. Example devices shown.
                      </figcaption>
                    </figure>
                  </div>
                </li>
                <li>
                  <span className="setup-step-number" aria-hidden="true">
                    3
                  </span>
                  <div className="setup-step-content">
                    <h3>Press the round link button</h3>
                    <p>
                      When Mote asks, press the button on top of your Hue Bridge. Keep Mote open
                      while the bridge authorizes the connection.
                    </p>
                    <p className="setup-tip">
                      <strong>Wait for the prompt.</strong> Press the bridge button during pairing,
                      so Mote can complete the connection.
                    </p>
                  </div>
                </li>
                <li id="first-control">
                  <span className="setup-step-number" aria-hidden="true">
                    4
                  </span>
                  <div className="setup-step-content">
                    <h3>Make your first light change</h3>
                    <p>
                      When Mote shows <strong>Connected</strong>, continue to the dashboard. Your
                      rooms, zones, lights, and scenes come directly from the active bridge.
                    </p>
                    <p>
                      Try the power or brightness controls. Open a room or zone to find its lights
                      and scenes. Color and white-temperature controls appear where your lights
                      support them.
                    </p>
                    <figure className="setup-controls-figure">
                      <ProductCapture
                        src="/product/mote-space-controls-dark.png"
                        alt="Mote room controls showing a brightness slider, Hue scenes, individual light switches, and a color wheel"
                        width={1402}
                        height={1122}
                        sizes="(min-width: 80rem) 790px, (min-width: 64rem) 65vw, 90vw"
                      />
                      <figcaption>
                        Brightness, scenes, and individual lights, together in the room view.
                      </figcaption>
                    </figure>
                    <p className="setup-free-note">
                      You’re set. Essential Hue control is included in Free.{" "}
                      <Link to="/features">Compare Free and Mote Pro</Link> for widgets, custom
                      dashboards, multiple bridges, and PC Sync. Mote Pro can save multiple bridges,
                      with one active at a time.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
            <section id="troubleshooting" className="setup-troubleshooting">
              <h2>Stuck getting connected?</h2>
              <p className="setup-section-intro">Start with the issue you’re seeing.</p>
              <div className="setup-answers">
                <details open>
                  <summary>
                    <span>Mote can’t find my bridge</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
                    </svg>
                  </summary>
                  <div>
                    <ul>
                      <li>
                        Check that your bridge is powered and connected to your router by Ethernet.
                      </li>
                      <li>Make sure your PC and bridge are on the same local network.</li>
                      <li>
                        If a VPN or guest Wi-Fi isolates your PC from local devices, disconnect the
                        VPN temporarily or join your regular home network.
                      </li>
                      <li>
                        Check whether firewall rules, router client isolation, or multicast
                        filtering are blocking discovery, then try again.
                      </li>
                    </ul>
                  </div>
                </details>
                <details>
                  <summary>
                    <span>Pairing times out</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
                    </svg>
                  </summary>
                  <div>
                    <p>
                      Restart the connection flow. Wait for Mote to ask, then press the round link
                      button on the bridge. Leave Mote open until the connection completes.
                    </p>
                  </div>
                </details>
                <details>
                  <summary>
                    <span>I only have Bluetooth lights</span>
                    <svg aria-hidden="true" viewBox="0 0 20 20">
                      <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
                    </svg>
                  </summary>
                  <div>
                    <p>
                      Mote needs a compatible Hue Bridge to control your lighting. It does not
                      connect directly to a Bluetooth-only setup.
                    </p>
                  </div>
                </details>
              </div>
              <div className="setup-support">
                <p>
                  <strong>Still need a hand?</strong> Follow the{" "}
                  <Link to="/support">support checklist</Link> to send a request.
                </p>
                <p>
                  Leave out application keys, bridge credentials, addresses, and unrelated personal
                  information.
                </p>
              </div>
            </section>
            <section id="network" className="setup-network">
              <h2>A local connection to your lights.</h2>
              <p>
                Core lighting commands travel from your PC to your Hue Bridge over your local
                network. Mote does not relay them through its publisher, and does not include remote
                Hue cloud control.
              </p>
              <p>
                Internet access can still be needed for Microsoft Store installation, licensing,
                updates, and fallback bridge discovery. Read the{" "}
                <Link to="/privacy">privacy policy</Link> for the full data-handling details.
              </p>
            </section>
            <p className="setup-reviewed">
              Reviewed against the Windows release candidate ·{" "}
              <time dateTime="2026-09-11">11 September 2026</time>
            </p>
          </article>
        </div>
      </div>
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

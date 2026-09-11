import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProseContents } from "../components/prose-contents";
import {
  LEGAL_EFFECTIVE_DATE,
  MICROSOFT_STORE_TERMS_URL,
  PUBLISHER,
  SUPPORT_EMAIL,
} from "../lib/legal";
import { pageHead } from "../lib/seo";

// The license first, because that is what a reader came for, then the
// obligations that only exist because Mote drives hardware in a real room.
const sections = [
  { id: "agreement", label: "Who this agreement is with" },
  { id: "store-terms", label: "Where your license comes from" },
  { id: "license", label: "What you may do with Mote" },
  { id: "restrictions", label: "What you may not do" },
  { id: "pro", label: "Mote Pro" },
  { id: "your-setup", label: "Your hardware and your network" },
  { id: "safety", label: "Lighting effects and safety" },
  { id: "third-party", label: "Philips Hue, Microsoft, and other names" },
  { id: "availability", label: "Updates and availability" },
  { id: "warranty", label: "What is and is not promised" },
  { id: "liability", label: "Limits on liability" },
  { id: "local-law", label: "Your local law comes first" },
  { id: "changes", label: "Changes to these terms" },
] as const;

const supportHref = `mailto:${SUPPORT_EMAIL}`;

function TermsPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Terms of use">
        <p>
          The conditions on which you may install and use Mote Desktop, and the small number of
          things Mote asks of you in return — most of them because a lighting app changes something
          physical in the room you are sitting in.
        </p>
        <p className="prose-effective">Effective {LEGAL_EFFECTIVE_DATE}</p>
      </PageIntro>

      <article className="prose-page">
        <ProseContents sections={sections} />

        <section>
          <h2 id="agreement">Who this agreement is with</h2>
          <p>
            These terms are between you and {PUBLISHER}, an individual, the publisher of Mote
            Desktop. Installing or using the application means you accept them. If you do not, do
            not install it, and uninstall it if you already have.
          </p>
        </section>

        <section>
          <h2 id="store-terms">Where your license comes from</h2>
          <p>
            Mote Desktop is distributed through the Microsoft Store, and the license itself is
            granted under the{" "}
            <a
              className="footer-link"
              href={MICROSOFT_STORE_TERMS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Microsoft Standard Application License Terms
            </a>
            , which you accept when you install from the Store. These terms sit alongside them and
            describe the publisher&apos;s side of the arrangement. Where the two disagree about the
            license itself, the Microsoft terms govern.
          </p>
        </section>

        <section>
          <h2 id="license">What you may do with Mote</h2>
          <p>
            You receive a personal, limited, non-exclusive, non-transferable, revocable license to
            install and use Mote Desktop on devices you own or control, for your own use or for the
            internal use of an organization you are acting for. The license lasts as long as you
            comply with these terms.
          </p>
          <p>
            Mote is software, not hardware, and it does not grant you rights in the Philips Hue
            devices it talks to, in Windows, or in anything else on your network.
          </p>
        </section>

        <section>
          <h2 id="restrictions">What you may not do</h2>
          <ul>
            <li>
              Sell, rent, sublicense, or redistribute Mote Desktop, or make it available as a
              service to other people
            </li>
            <li>
              Work around the licensing that separates Free from Mote Pro, or unlock paid features
              by any means other than buying them
            </li>
            <li>
              Reverse engineer, decompile, or disassemble the application, except to the extent the
              law where you live allows it regardless of this restriction
            </li>
            <li>
              Remove or obscure the publisher&apos;s or a third party&apos;s notices, names, or
              marks
            </li>
            <li>
              Use Mote to reach Hue hardware you are not authorized to control, or to interfere with
              anyone else&apos;s network or devices
            </li>
          </ul>
        </section>

        <section>
          <h2 id="pro">Mote Pro</h2>
          <p>
            Everyday Hue control is free. Mote Pro is a paid tier that adds multiple bridges,
            advanced widgets, custom dashboard layouts, and PC Sync. It is intended as a one-time
            purchase rather than a subscription, and it is not yet available to buy.
          </p>
          <p>
            When it is, the purchase happens through the Microsoft Store: Microsoft takes the
            payment, issues the receipt, and handles refunds and billing questions under the Store
            policy that applies where you bought it. The publisher cannot process or refund a Store
            payment. Which capabilities sit in each tier may change as the application develops; the
            features page describes the current split, and paid features already unlocked are not
            moved back behind a further purchase.
          </p>
        </section>

        <section>
          <h2 id="your-setup">Your hardware and your network</h2>
          <p>
            You are responsible for your Philips Hue hardware, your Windows PC, your local network
            and its configuration, your backups, and the physical environment the lights are in.
            Mote reads and changes the state your bridge reports; it cannot verify what is
            physically attached to it.
          </p>
          <p>
            Features may be unavailable or behave differently because of hardware, bridge firmware,
            network isolation, VPNs, firewalls, Windows, or third-party changes outside the
            publisher&apos;s control. PC Sync in particular depends on display capture, system-audio
            loopback, and a compatible entertainment area.
          </p>
        </section>

        <section>
          <h2 id="safety">Lighting effects and safety</h2>
          <p>
            Mote can change lights quickly, and PC Sync and Hue scenes can produce rapid changes in
            brightness and color. Do not use these effects where flashing light could create a
            safety risk, and do not use them if you or anyone present is affected by photosensitive
            epilepsy or is sensitive to flickering light. Stop synchronization immediately if it
            causes discomfort.
          </p>
          <p>
            Do not rely on Mote for lighting that something depends on — a security routine, an
            occupancy signal, or a light someone needs to be on. It is a controller for consumer
            lighting, not a safety system, and a network or bridge failure will stop it working
            without warning.
          </p>
        </section>

        <section>
          <h2 id="third-party">Philips Hue, Microsoft, and other names</h2>
          <p>
            Mote Desktop is an independent application. It is not affiliated with, authorized by,
            sponsored by, or endorsed by Signify. Philips, Philips Hue, Hue Bridge, Hue Play HDMI
            Sync Box, Microsoft, Windows, and the Microsoft Store are the marks of their respective
            owners and are used here only to say what Mote works with.
          </p>
          <p>
            Those products, and the services behind them, have their own terms and may change
            independently of Mote. A change on their side can remove a capability from this one.
          </p>
        </section>

        <section>
          <h2 id="availability">Updates and availability</h2>
          <p>
            Mote Desktop may be updated, changed, suspended, or discontinued. Updates arrive through
            the Microsoft Store and may add, alter, or remove features. Reasonable care is taken to
            preserve your bridges, preferences, layouts, and widgets across a supported upgrade, but
            keeping your own record of an elaborate setup is wise.
          </p>
        </section>

        <section>
          <h2 id="warranty">What is and is not promised</h2>
          <p>
            Mote Desktop is provided as it is. To the extent the law allows, no warranty is given
            that it will be uninterrupted, error-free, compatible with any particular hardware or
            firmware, or fit for a purpose you have in mind, and no advice given over support
            creates one.
          </p>
          <p>
            This does not displace the guarantees your own consumer law gives you, or the rights the
            Microsoft Store terms give you against Microsoft.
          </p>
        </section>

        <section>
          <h2 id="liability">Limits on liability</h2>
          <p>
            To the extent the law allows, the publisher is not liable for indirect or consequential
            loss, lost profits, lost data, or damage arising from your use of Mote Desktop —
            including from lighting behavior, an interrupted sync, or a bridge or network failure.
          </p>
          <p>
            Nothing here excludes or limits liability that cannot lawfully be excluded, including
            liability for death or personal injury caused by negligence, and for fraud or fraudulent
            misrepresentation.
          </p>
        </section>

        <section>
          <h2 id="local-law">Your local law comes first</h2>
          <p>
            Nothing in these terms limits the mandatory consumer rights you have where you live. If
            a provision here conflicts with a right your law gives you, your law wins, and the rest
            of these terms stay in force.
          </p>
        </section>

        <section>
          <h2 id="changes">Changes to these terms</h2>
          <p>
            These terms may change as the application changes. The date at the top of this page is
            the date the current wording took effect, and a material change is called out in the
            release notes. Continuing to use Mote Desktop after a change means accepting the revised
            terms; if you do not accept them, uninstall the application.
          </p>
          <p>
            Questions about any of this go to{" "}
            <a className="footer-link" href={supportHref}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of use — Mote Desktop",
      description:
        "The license for Mote Desktop, what Mote Pro is, and the responsibilities that come with running lighting effects in a real room.",
      path: "/terms",
    }),
  component: TermsPage,
});

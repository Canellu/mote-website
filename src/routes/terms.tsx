import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { pageHead } from "../lib/seo";

function TermsPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Terms of use">
        <p>
          These pre-publication terms summarize the intended conditions for Mote Desktop. Final
          terms and their effective date require legal review before release.
        </p>
      </PageIntro>

      <article className="prose-page">
        <section>
          <h2>License</h2>
          <p>
            Subject to the final terms, you receive a personal, limited, non-exclusive,
            non-transferable, and revocable license to install and use Mote Desktop on devices you
            own or control, as permitted by the Microsoft Store license terms.
          </p>
        </section>

        <section>
          <h2>Hue hardware and your network</h2>
          <p>
            You are responsible for your Philips Hue hardware, compatible Windows device, local
            network, configuration, backups, physical environment, and safe use of lighting effects.
            Features may be unavailable because of hardware, firmware, network, Windows, or
            third-party changes.
          </p>
          <p>
            Do not use lighting effects where rapid light changes could create a safety risk. Stop
            synchronization if it causes discomfort or unsafe conditions.
          </p>
        </section>

        <section>
          <h2>Third-party products</h2>
          <p>
            Mote Desktop is not affiliated with, authorized by, sponsored by, or endorsed by
            Signify. Philips Hue and related marks belong to their respective owners. Windows,
            Microsoft Store, Philips Hue services, and other third-party products have their own
            terms and may change independently.
          </p>
        </section>

        <section>
          <h2>Availability and updates</h2>
          <p>
            The application may be updated, changed, suspended, or discontinued. Reasonable efforts
            will be made to preserve local settings during supported upgrades, but uninterrupted or
            error-free operation is not guaranteed. Mandatory consumer rights are not limited by
            these terms.
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
      description: "The pre-publication terms governing use of Mote Desktop.",
      path: "/terms",
    }),
  component: TermsPage,
});

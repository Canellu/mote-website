import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { pageHead } from "../lib/seo";

function PrivacyPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Privacy policy">
        <p>
          Mote Desktop is designed to control Hue hardware over your local network. This summary
          will be replaced by a legally reviewed privacy policy before release.
        </p>
      </PageIntro>

      <article className="prose-page">
        <section>
          <h2>Information stored on your device</h2>
          <p>
            Mote stores the information needed to reconnect to your Hue hardware and restore your
            preferences. Bridge and Sync Box connection details, application preferences, dashboard
            layouts, and widget configuration stay on your device. Credentials are kept in the
            Windows credential store.
          </p>
        </section>

        <section>
          <h2>Network communication</h2>
          <p>
            Core control travels directly between your PC and compatible Hue hardware on your local
            network. PC Sync processes captured display frames or system-audio loopback on your PC
            to calculate lighting output; it does not upload captured pixels or audio.
          </p>
          <p>
            Mote may contact Signify&apos;s Hue discovery service when local bridge discovery does
            not find a bridge. Opening website, privacy, terms, support, or release-note links uses
            your default browser.
          </p>
        </section>

        <section>
          <h2>Services not included at release</h2>
          <p>
            The first release does not include Mote accounts, advertising, automatic analytics,
            automatic crash uploads, session replay, or in-app feedback upload. Mote does not
            intentionally send Hue names, bridge addresses, credentials, screenshots, captured
            frames, audio, clipboard contents, or personal file paths to the publisher.
          </p>
        </section>

        <section>
          <h2>Support contact</h2>
          <p>
            If you email <a href="mailto:support@motedesktop.com">support@motedesktop.com</a>, the
            publisher receives the address, message, and attachments you choose to send. Retention
            details, hosting and email providers, the effective date, and the deletion procedure
            will be confirmed before publication.
          </p>
        </section>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy — Mote Desktop",
      description: "How Mote Desktop stores local settings and communicates with Hue hardware.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "../components/page-intro";
import { ProseContents } from "../components/prose-contents";
import {
  LEGAL_EFFECTIVE_DATE,
  MICROSOFT_PRIVACY_URL,
  PUBLISHER,
  SUPPORT_EMAIL,
} from "../lib/legal";
import { pageHead } from "../lib/seo";

// Ordered as the reader's questions arrive: who is asking, what stays here,
// what leaves, and only then the housekeeping.
const sections = [
  { id: "who", label: "Who this policy is from" },
  { id: "on-your-device", label: "What Mote stores on your PC" },
  { id: "local-network", label: "What travels on your local network" },
  { id: "pc-sync", label: "PC Sync, screen capture, and audio" },
  { id: "internet", label: "When Mote reaches the internet" },
  { id: "not-included", label: "What Mote does not do" },
  { id: "website", label: "This website" },
  { id: "store", label: "The Microsoft Store" },
  { id: "in-app-feedback", label: "Feedback you send from the app" },
  { id: "support-email", label: "Email you send to support" },
  { id: "children", label: "Children" },
  { id: "your-rights", label: "Your rights" },
  { id: "changes", label: "Changes to this policy" },
] as const;

const supportHref = `mailto:${SUPPORT_EMAIL}`;

function PrivacyPage() {
  return (
    <main id="main" className="page-shell">
      <PageIntro title="Privacy policy">
        <p>
          Mote Desktop controls Hue hardware over your local network. Nearly everything it knows
          about your lighting stays on your PC. This policy covers the few things that leave it,
          what this website measures, and who receives what.
        </p>
        <p className="prose-effective">Effective {LEGAL_EFFECTIVE_DATE}</p>
      </PageIntro>

      <article className="prose-page">
        <ProseContents sections={sections} />

        <section>
          <h2 id="who">Who this policy is from</h2>
          <p>
            Mote Desktop is published by {PUBLISHER}, an individual, who decides what the
            application and this website do with the information described here. It covers the Mote
            Desktop application for Windows and the motedesktop.com website. Questions about it go
            to{" "}
            <a className="footer-link" href={supportHref}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p>
            Mote has no accounts. There is nothing to sign in to, so there is no profile held about
            you, and no way to tie a copy of Mote to a person.
          </p>
        </section>

        <section>
          <h2 id="on-your-device">What Mote stores on your PC</h2>
          <p>
            Mote keeps what it needs to reconnect to your Hue hardware and to restore how you left
            the application. All of it stays on your PC:
          </p>
          <ul>
            <li>Hue Bridge and Hue Play HDMI Sync Box connection details</li>
            <li>Application preferences, including appearance and window behavior</li>
            <li>Your dashboard layout and the widgets you have configured</li>
            <li>The names of the rooms, zones, lights, and scenes your bridge reports</li>
          </ul>
          <p>
            The credentials Mote is issued when you pair with a bridge or a Sync Box are held in the
            Windows credential store rather than in a settings file. None of this is sent to the
            publisher.
          </p>
          <p>
            Removing a saved bridge or Sync Box in Mote&apos;s settings is what clears it.
            Uninstalling the application may deliberately leave your preferences and credentials
            behind, so that reinstalling or upgrading does not silently erase a setup you spent time
            on. If you want everything gone, remove the saved bridge and your widgets inside Mote
            first.
          </p>
        </section>

        <section>
          <h2 id="local-network">What travels on your local network</h2>
          <p>
            Control is direct. When you change a light, the command goes from your PC to your Hue
            Bridge or Sync Box across your own network, and the state Mote shows you comes back the
            same way. It is not relayed through the publisher, and it does not need an internet
            connection.
          </p>
          <p>
            Anything else on your network that can already reach your bridge sees that traffic the
            way it would from any other Hue client. Mote does not open your bridge to the internet.
          </p>
        </section>

        <section>
          <h2 id="pc-sync">PC Sync, screen capture, and audio</h2>
          <p>
            PC Sync, a Mote Pro feature, follows what is on your display or coming out of your
            speakers. To do that it reads captured display frames or the system-audio loopback while
            sync is running, and reduces them to the color and brightness values sent to your
            entertainment area.
          </p>
          <p>
            That reduction happens on your PC. Captured pixels and audio are not written to disk,
            not kept past the frame they came from, and not uploaded anywhere. What leaves your PC
            is lighting output — the same kind of instruction any other Hue command carries.
          </p>
        </section>

        <section>
          <h2 id="internet">When Mote reaches the internet</h2>
          <p>
            Mote may contact Signify&apos;s Hue discovery service at discovery.meethue.com when it
            cannot find a bridge on your local network. That request comes from your PC, so Signify
            receives your IP address and returns the bridges seen on your connection. Signify&apos;s
            own privacy terms cover what they do with it.
          </p>
          <p>
            Opening a website, privacy, terms, support, or release-note link from inside Mote hands
            the address to your default browser; nothing about the visit comes back to the
            application. Updates are delivered by the Microsoft Store, not by Mote.
          </p>
        </section>

        <section>
          <h2 id="not-included">What Mote does not do</h2>
          <p>
            The application has no Mote accounts, no advertising, no automatic analytics, no
            automatic crash uploads, and no session replay. Nothing is uploaded unless you fill in
            the feedback form and press Send. Mote does not send the publisher your Hue names,
            bridge or Sync Box addresses, credentials, screenshots, captured frames, audio,
            clipboard contents, or file paths.
          </p>
          <p>
            Nothing about your lighting or your PC is sold, rented, or handed to advertisers or data
            brokers. There is nothing collected to sell.
          </p>
        </section>

        <section>
          <h2 id="website">This website</h2>
          <p>
            motedesktop.com is a static site hosted on Cloudflare Pages. Delivering and protecting
            it means Cloudflare processes the ordinary details of each request — IP address,
            approximate location, browser, and the page asked for — as the site&apos;s hosting
            provider.
          </p>
          <p>
            Visits are measured with Cloudflare Web Analytics, which counts page views so the
            publisher can tell whether the site does its job. It records no custom events, so it
            cannot see which links you follow. It sets no cookies, stores no identifier on your
            device, and builds no profile of you across sites or visits. The site sets no cookies of
            its own either, which is why it never asks you to accept any.
          </p>
        </section>

        <section>
          <h2 id="store">The Microsoft Store</h2>
          <p>
            Mote Desktop is distributed through the Microsoft Store. Your Store account, the
            download, and any future purchase are handled by Microsoft under the{" "}
            <a
              className="footer-link"
              href={MICROSOFT_PRIVACY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Microsoft privacy statement
            </a>
            . The publisher never sees your payment details.
          </p>
          <p>
            Microsoft gives the publisher aggregated reports about the listing: install and
            acquisition counts, ratings, reliability data, and the reviews people choose to leave.
            Individual visitors cannot be picked out of the aggregate figures. A review shows
            whatever nickname you have set in the Store, because you chose to publish it there.
          </p>
          <p>
            Links from this site to the Store carry a short campaign tag naming the button you used
            — the header, the hero, the footer, the feature comparison, or the setup guide. It
            identifies the link, not you, and it reaches the publisher only inside those same
            aggregated reports.
          </p>
        </section>

        <section>
          <h2 id="in-app-feedback">Feedback you send from the app</h2>
          <p>
            Mote has a feedback form in its title bar and under Settings. It sends nothing until you
            press Send. When you do, your message is delivered to a Cloudflare Worker on this domain
            and stored in a Cloudflare D1 database in the European Union, together with the
            application version, the platform, the release channel, and the time. You get back a
            short reference such as <code>f_abc123</code> so you can quote the report later.
          </p>
          <p>
            Before your message leaves your PC, Mote removes text that looks like an email address,
            a phone number, an IP or bridge address, a Hue resource identifier, a credential, or a
            Windows file path, and replaces each with a placeholder. The form says so, and the
            hosted endpoint repeats the same pass on arrival. It is a safety net rather than a
            guarantee: please still leave personal details out of the message.
          </p>
          <p>
            The email field is optional and empty by default. Leave it blank and no address is sent
            or stored. Fill it in and it is attached to that one report, used only to answer you or
            to tell you what happened to it, and never used for a newsletter, for product
            announcements, for analytics, or to recognise you across reports. It is deleted ninety
            days after the report is resolved, or after twelve months, whichever comes first, and
            the message text is kept without it. Ask for it to be deleted sooner and it will be.
          </p>
          <p>
            No account, device identifier, or installation identifier is sent. Your IP address is
            not stored: it is combined with a daily-rotating secret and hashed to count submissions
            per connection, and those counters expire on their own. Feedback is private and is not
            published anywhere.
          </p>
        </section>

        <section>
          <h2 id="support-email">Email you send to support</h2>
          <p>
            If you email{" "}
            <a className="footer-link" href={supportHref}>
              {SUPPORT_EMAIL}
            </a>
            , the publisher receives your address, your message, and anything you attach, and uses
            them only to answer you, to fix what you reported, and to meet legal obligations. The
            mailbox for motedesktop.com is hosted by Domeneshop, a Norwegian domain and email
            provider.
          </p>
          <p>
            Your email is kept until the thing you reported is resolved and for ninety days after
            that, or for at most twelve months with no further activity — whichever comes first —
            and is then deleted. Ask for it to be deleted sooner and it will be. Please do not send
            Hue application keys, entertainment credentials, Sync Box tokens, bridge addresses,
            captured PC Sync content, or unrelated personal information; support does not need them.
          </p>
        </section>

        <section>
          <h2 id="children">Children</h2>
          <p>
            Mote Desktop controls lighting hardware and is not directed at children. The publisher
            does not knowingly collect personal information from anyone under 13, and there is no
            account, profile, or messaging feature through which a child could supply any.
          </p>
        </section>

        <section>
          <h2 id="your-rights">Your rights</h2>
          <p>
            Because Mote holds nothing about you beyond the email you choose to send, most requests
            resolve quickly. Write to{" "}
            <a className="footer-link" href={supportHref}>
              {SUPPORT_EMAIL}
            </a>{" "}
            to ask for a copy of your support correspondence, to have it corrected, or to have it
            deleted before the retention period is up.
          </p>
          <p>
            Depending on where you live you may also have a statutory right to object to or restrict
            how that correspondence is used, to receive it in a portable form, and to complain to
            your national data protection authority. Anything Mote stored on your own PC is already
            yours: it is in your hands, not the publisher&apos;s.
          </p>
        </section>

        <section>
          <h2 id="changes">Changes to this policy</h2>
          <p>
            This page carries the date its current wording took effect. If what Mote or this site
            does with information changes, the wording and that date change with it, and a material
            change is called out in the application&apos;s release notes rather than left for you to
            notice. The version published here is always the one in force.
          </p>
          <p>
            Questions, corrections, and requests all go to{" "}
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

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy policy — Mote Desktop",
      description:
        "What Mote Desktop keeps on your PC, what leaves it, what this website measures, and who receives what.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

import { Link } from "@tanstack/react-router";
import { type FormEvent, useEffect, useRef, useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "error"; message: string }
  | { kind: "joined" }
  | { kind: "removed" };

const removalFragment = "leave-mac-waitlist=";
const tokenPattern = /^[a-f0-9]{32}$/;

export function MacWaitlist() {
  const section = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [removalToken, setRemovalToken] = useState("");
  const [ready, setReady] = useState(false);
  const busy = status.kind === "pending";

  useEffect(() => {
    function showRemovalForm() {
      const fragment = window.location.hash.slice(1);
      const token = fragment.startsWith(removalFragment)
        ? fragment.slice(removalFragment.length)
        : "";
      if (!tokenPattern.test(token)) {
        setRemovalToken("");
        return;
      }
      setRemovalToken(token);
      section.current?.scrollIntoView({ behavior: "instant" });
    }

    showRemovalForm();
    setReady(true);
    window.addEventListener("hashchange", showRemovalForm);
    return () => window.removeEventListener("hashchange", showRemovalForm);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    const email = fields.get("email");
    const consent = fields.has("consent");
    if (!removalToken && (typeof email !== "string" || !consent)) return;
    setStatus({ kind: "pending" });
    try {
      const response = await fetch(
        removalToken ? "/api/mac-waitlist/remove" : "/api/mac-waitlist",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(removalToken ? { token: removalToken } : { email, consent }),
        },
      );
      if (response.status === 429) {
        setStatus({ kind: "error", message: "Too many signups. Try again in a little while." });
        return;
      }
      if (response.status === 503) {
        setStatus({
          kind: "error",
          message: "The confirmation email could not be sent. Please try again.",
        });
        return;
      }
      if (!response.ok) throw new Error();
      if (removalToken) {
        setStatus({ kind: "removed" });
        return;
      }
      setStatus({ kind: "joined" });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <section
      className="cx-waitlist cx-shell"
      id="mac-waitlist"
      ref={section}
      aria-labelledby="mac-waitlist-title"
    >
      <div className="cx-section-head">
        <h2 id="mac-waitlist-title">Would you use Mote on a Mac?</h2>
        <p>
          I’m considering a macOS version. Leave your email to help me decide whether to build it.
        </p>
      </div>
      <div className="cx-waitlist__panel">
        {status.kind === "removed" ? (
          <p role="status">There is no longer an active signup for this link.</p>
        ) : removalToken ? (
          <form onSubmit={submit} method="post" action="/api/mac-waitlist/remove">
            <p>Remove the email associated with this private link from the Mac interest list.</p>
            <button className="cx-button cx-button--quiet" type="submit" disabled={busy}>
              {busy ? "Removing…" : "Remove my email"}
            </button>
          </form>
        ) : status.kind === "joined" ? (
          <>
            <p role="status">Thanks for registering your interest.</p>
            <p>
              Check your inbox for a confirmation email with a private removal link. If you already
              joined, use your original email.
            </p>
          </>
        ) : (
          <form onSubmit={submit} method="post" action="/api/mac-waitlist">
            <label htmlFor="mac-waitlist-email">Email address</label>
            <input
              id="mac-waitlist-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
            />
            <label className="cx-waitlist__consent">
              <input name="consent" type="checkbox" required />
              <span>
                I agree to let Mote Desktop store my email for up to one year to measure interest in
                a Mac version and send me one confirmation email.
              </span>
            </label>
            <button className="cx-button cx-button--quiet" type="submit" disabled={!ready || busy}>
              {busy ? "Saving…" : "Register my interest"}
            </button>
            <noscript>Enable JavaScript to register your interest.</noscript>
          </form>
        )}
        {status.kind === "error" && <p role="alert">{status.message}</p>}
        {!removalToken && (
          <p className="cx-waitlist__privacy">
            The confirmation email includes a link to remove your signup.{" "}
            <Link to="/privacy/" hash="mac-interest" className="cx-waitlist__link">
              Privacy policy
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

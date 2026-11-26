import { Link } from "@tanstack/react-router";
import { type FormEvent, useEffect, useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "error"; message: string }
  | { kind: "joined" };

export function MacWaitlist() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // The button waits for hydration, so a click never falls through to the bare form post.
  const [ready, setReady] = useState(false);
  const busy = status.kind === "pending";

  useEffect(() => setReady(true), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    const email = fields.get("email");
    const consent = fields.has("consent");
    if (typeof email !== "string" || !consent) return;
    setStatus({ kind: "pending" });
    try {
      const response = await fetch("/api/mac-waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
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
      setStatus({ kind: "joined" });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <section
      className="cx-waitlist cx-shell"
      id="mac-waitlist"
      aria-labelledby="mac-waitlist-title"
    >
      <div className="cx-section-head">
        <h2 id="mac-waitlist-title">Would you use Mote on a Mac?</h2>
        <p>
          I’m considering a macOS version. Leave your email to help me decide whether to build it.
        </p>
      </div>
      <div className="cx-waitlist__panel">
        <div className="cx-waitlist__titlebar" aria-hidden="true">
          <span className="cx-waitlist__lights">
            <i />
            <i />
            <i />
          </span>
          Mac interest list
        </div>
        {status.kind === "joined" ? (
          <>
            <p role="status">Thanks, you’re on the list.</p>
            <p>
              Check your inbox for a confirmation email. Every email from the waitlist has an
              unsubscribe link. If you had already joined, nothing changes.
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
              <span>Email me about Mote for Mac. Unsubscribe anytime.</span>
            </label>
            <button className="cx-button cx-button--quiet" type="submit" disabled={!ready || busy}>
              {busy ? "Joining…" : "Join the waitlist"}
            </button>
            <noscript>Enable JavaScript to register your interest.</noscript>
          </form>
        )}
        {status.kind === "error" && <p role="alert">{status.message}</p>}
        <p className="cx-waitlist__privacy">
          Every email has an unsubscribe link.{" "}
          <Link to="/privacy/" hash="mac-interest" className="cx-waitlist__link">
            Privacy policy
          </Link>
        </p>
      </div>
    </section>
  );
}

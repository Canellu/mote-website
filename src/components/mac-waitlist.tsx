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
        <div className="cx-waitlist__titlebar" aria-hidden="true">
          <span className="cx-waitlist__lights">
            <i />
            <i />
            <i />
          </span>
          Mac interest list
        </div>
        {status.kind === "removed" ? (
          <p role="status">You are unsubscribed from the Mac waitlist.</p>
        ) : removalToken ? (
          <form onSubmit={submit} method="post" action="/api/mac-waitlist/remove">
            <p>Unsubscribe from the Mac waitlist and delete your email from it.</p>
            <button className="cx-button cx-button--quiet" type="submit" disabled={busy}>
              {busy ? "Unsubscribing…" : "Unsubscribe"}
            </button>
          </form>
        ) : status.kind === "joined" ? (
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
              <span>
                Email me about Mote for Mac. Emails are rare, and there may be none. Unsubscribe
                anytime.
              </span>
            </label>
            <button className="cx-button cx-button--quiet" type="submit" disabled={!ready || busy}>
              {busy ? "Joining…" : "Join the waitlist"}
            </button>
            <noscript>Enable JavaScript to register your interest.</noscript>
          </form>
        )}
        {status.kind === "error" && <p role="alert">{status.message}</p>}
        {!removalToken && (
          <p className="cx-waitlist__privacy">
            Every email has an unsubscribe link.{" "}
            <Link to="/privacy/" hash="mac-interest" className="cx-waitlist__link">
              Privacy policy
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

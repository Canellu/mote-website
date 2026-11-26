import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent, useEffect, useState } from "react";
import { SUPPORT_EMAIL } from "../lib/legal";

// Kept in step with `unsubscribeReasons` in worker/src/mac-waitlist.ts.
const reasons = [
  { value: "not-interested", label: "I’m no longer interested in Mote for Mac" },
  { value: "too-many-emails", label: "I don’t want emails about it" },
  { value: "did-not-sign-up", label: "I don’t remember signing up" },
  { value: "other-app", label: "I’m using a different app" },
  { value: "other", label: "Something else" },
] as const;

const tokenPattern = /^[a-f0-9]{32}$/;

type Status = "loading" | "missing" | "ready" | "pending" | "done" | "error";

function UnsubscribePage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("loading");

  // The token arrives in the fragment, so it never reaches a server log.
  useEffect(() => {
    const fromLink = window.location.hash.slice(1);
    setToken(fromLink);
    setStatus(tokenPattern.test(fromLink) ? "ready" : "missing");
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const chosen = new FormData(event.currentTarget).getAll("reason");
    setStatus("pending");
    try {
      const response = await fetch(
        `/api/mac-waitlist/unsubscribe?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ reasons: chosen }),
        },
      );
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main
      id="main"
      className="mx-auto grid min-h-[calc(100dvh-2.5rem)] w-[min(32rem,calc(100%-2rem))] content-center pt-20 pb-28"
    >
      <div className="rounded-3xl border border-mote-line/60 bg-white/80 px-6 py-8 text-center shadow-[0_18px_40px_rgb(80_40_30/0.08)] backdrop-blur sm:px-10">
        <img
          src="/mascot/moth-cel-shaded.webp"
          alt=""
          width={256}
          height={256}
          className="mx-auto size-20"
        />
        {status === "done" ? (
          <>
            <h1 className="mt-4 text-[1.75rem] leading-tight font-semibold tracking-tight">
              You’re unsubscribed
            </h1>
            <p className="mt-4 leading-7 text-mote-muted" role="status">
              Your email has been deleted from the Mac waitlist, and you won’t hear about it again.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex min-h-11 items-center rounded-full bg-mote-ink/5 px-5 font-semibold text-mote-ink no-underline"
            >
              Back to Mote Desktop
            </Link>
          </>
        ) : status === "missing" ? (
          <>
            <h1 className="mt-4 text-[1.75rem] leading-tight font-semibold tracking-tight">
              This link is incomplete
            </h1>
            <p className="mt-4 leading-7 text-mote-muted">
              Open the Unsubscribe link straight from a Mote Desktop email. If it still doesn’t
              work, email {SUPPORT_EMAIL} and I’ll remove you by hand.
            </p>
          </>
        ) : (
          <form onSubmit={submit}>
            <h1 className="mt-4 text-[1.75rem] leading-tight font-semibold tracking-tight">
              Unsubscribe from the Mac waitlist?
            </h1>
            <p className="mt-4 leading-7 text-mote-muted">
              Your email will be deleted and you won’t get any more emails about Mote for Mac.
            </p>
            <fieldset className="mt-6 text-left">
              <legend className="text-sm font-semibold text-mote-ink">
                Mind telling me why? <span className="font-normal text-mote-muted">Optional</span>
              </legend>
              <div className="mt-3 grid gap-2">
                {reasons.map((reason) => (
                  <label
                    key={reason.value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-mote-line/60 px-4 py-2.5 text-sm has-[:checked]:border-mote-ink/40 has-[:checked]:bg-mote-ink/5"
                  >
                    <input
                      type="checkbox"
                      name="reason"
                      value={reason.value}
                      className="size-4 accent-[#ef4a15]"
                    />
                    {reason.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              type="submit"
              disabled={status !== "ready" && status !== "error"}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#ef4a15] px-5 font-semibold text-[#14160f] transition-transform duration-150 active:scale-[0.98] disabled:opacity-60"
            >
              {status === "pending" ? "Unsubscribing…" : "Unsubscribe"}
            </button>
            {status === "error" && (
              <p className="mt-4 text-sm text-mote-muted" role="alert">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}

export const Route = createFileRoute("/unsubscribe")({
  head: () => ({
    meta: [{ title: "Unsubscribe — Mote Desktop" }, { name: "robots", content: "noindex" }],
  }),
  component: UnsubscribePage,
});

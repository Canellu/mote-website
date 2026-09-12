/**
 * Notification on a new report.
 *
 * The channel is a single secret holding a URL, because every option worth
 * having — Discord, Slack, Telegram, ntfy, a personal endpoint — is reachable
 * that way, and none of them need an account this Worker has to hold
 * credentials for. Cloudflare's own `send_email` binding was
 * rejected: it wants Email Routing enabled on the zone, which would replace
 * motedesktop.com's MX records and take support@motedesktop.com down too.
 *
 * Notification is best-effort by design. A failed webhook must never fail a
 * submission — the report is already durable in D1 by the time this runs.
 */

export type NotifyFormat = "telegram" | "discord" | "slack" | "ntfy" | "json";

export interface NotifyInput {
  reportId: string;
  category: string;
  message: string;
  contactEmail: string | null;
  appVersion: string | null;
  source: string;
}

const PREVIEW_LIMIT = 1500;

function summarise(input: NotifyInput): string {
  const preview =
    input.message.length > PREVIEW_LIMIT
      ? `${input.message.slice(0, PREVIEW_LIMIT)}…`
      : input.message;

  return [
    `New ${input.category} feedback — ${input.reportId}`,
    `from ${input.source}${input.appVersion ? ` v${input.appVersion}` : ""}`,
    input.contactEmail ? `reply to: ${input.contactEmail}` : "no reply requested",
    "",
    preview,
  ].join("\n");
}

function payloadFor(format: NotifyFormat, input: NotifyInput, target?: string) {
  const text = summarise(input);

  switch (format) {
    case "telegram":
      // Telegram caps a message at 4096 characters and wants the chat id in the
      // body rather than the URL, so the bot token can stay the whole of the
      // secret URL and the destination travels separately.
      return {
        body: JSON.stringify({ chat_id: target, text: text.slice(0, 4000) }),
        json: true,
      };
    case "discord":
      // Discord rejects a message body over 2000 characters outright.
      return { body: JSON.stringify({ content: text.slice(0, 1990) }), json: true };
    case "slack":
      return { body: JSON.stringify({ text }), json: true };
    case "ntfy":
      // ntfy takes the message as the raw body and the rest as headers.
      return { body: text, json: false };
    case "json":
      return { body: JSON.stringify({ text, ...input }), json: true };
  }
}

export async function notify(
  url: string | undefined,
  format: NotifyFormat,
  input: NotifyInput,
  target?: string,
): Promise<void> {
  if (!url) return;
  // Telegram has nowhere to deliver without a chat id, so a half-configured
  // channel stays silent rather than failing on every submission.
  if (format === "telegram" && !target) return;

  const { body, json } = payloadFor(format, input, target);
  const headers: Record<string, string> = {
    "content-type": json ? "application/json" : "text/plain; charset=utf-8",
  };

  if (format === "ntfy") {
    headers["title"] = `Mote feedback — ${input.category}`;
    headers["tags"] = input.category === "bug" ? "beetle" : "bulb";
  }

  try {
    await fetch(url, { method: "POST", headers, body });
  } catch {
    // Swallowed on purpose. The report is stored; losing the ping is a nuisance,
    // losing the submission would not be.
  }
}

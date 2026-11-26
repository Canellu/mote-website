// Email clients ignore stylesheets and modern layout, so this is a centred
// table with inline styles. Images must be absolute URLs on the live site.

const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const ink = "#0f1110";
const body = "#3d413b";
const muted = "#7a7e76";
const accent = "#ef4a15";
// The site hero's warm-to-lilac wash. Outlook ignores gradients and shows the
// table's bgcolor instead.
const backdrop = "linear-gradient(160deg,#fde3cf 0%,#f8e2ea 50%,#e2e3f8 100%)";

export function confirmationEmail(siteUrl: string, unsubscribe: string) {
  const asset = (path: string) => new URL(path, siteUrl).href;
  const thanks =
    "Thanks for showing interest in Mote Desktop for Mac and signing up for the waitlist.";
  const update = "I’ll keep you updated.";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>You’re on the Mote Desktop Mac waitlist</title>
</head>
<body style="margin:0;padding:0;background:#fbe9df;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${thanks}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#fbe9df" style="background-color:#fbe9df;background-image:${backdrop};">
<tr><td align="center" style="padding:64px 16px 56px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
    <tr><td align="center" style="padding-bottom:36px;">
      <a href="${siteUrl}" style="text-decoration:none;color:${ink};font-family:${font};font-size:15px;font-weight:600;">
        <img src="${asset("/brand/mote-app-icon.png")}" width="28" height="28" alt="" style="vertical-align:middle;border-radius:7px;border:0;">
        <span style="vertical-align:middle;padding-left:8px;">Mote Desktop</span>
      </a>
    </td></tr>
    <tr><td align="center" style="background:#ffffff;border-radius:24px;padding:56px 40px 52px;border-top:4px solid ${accent};box-shadow:0 18px 40px rgba(80,40,30,0.10);">
      <img src="${asset("/email/mote-mascot.gif")}" width="140" height="140" alt="Mote’s moth mascot, waving its wings" style="display:block;border:0;margin:0 auto 28px;">
      <h1 style="margin:0 0 20px;font-family:${font};font-size:28px;line-height:1.25;font-weight:700;letter-spacing:-0.01em;color:${ink};">You’re on the Mac waitlist</h1>
      <p style="margin:0 0 20px;font-family:${font};font-size:16px;line-height:1.7;color:${body};">${thanks}</p>
      <p style="margin:0;font-family:${font};font-size:16px;line-height:1.7;font-weight:600;color:${ink};">${update}</p>
    </td></tr>
    <tr><td align="center" style="padding:36px 16px 0;font-family:${font};font-size:13px;line-height:1.6;color:${muted};">
      <a href="${siteUrl}" style="color:${muted};text-decoration:none;">motedesktop.com</a>
      &nbsp;·&nbsp;
      <a href="${unsubscribe}" style="color:${muted};text-decoration:underline;">Unsubscribe</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  return {
    subject: "You’re on the Mote Desktop Mac waitlist",
    html,
    text: `${thanks}\n\n${update}\n\nUnsubscribe: ${unsubscribe}\n`,
  };
}

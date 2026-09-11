# Microsoft Store listing specification

Status: submitted to certification on 11 September 2026; Partner Center is now the record

Prepared: 11 September 2026

Language: English (United States)

This describes the currently available Free listing. Mote Pro still cannot be bought — its durable
add-on was submitted the same day and publishes manually — so the customer-facing description
presents no purchase path or price.

Two corrections were made in Partner Center before submitting, and both are the reason to treat the
live listing rather than this file as the record. A product feature read "Create one standard
desktop lighting widget" and the short description called "multiple widgets" a Pro feature. Neither
is true: the app sets no limit on widget windows, and the paid boundary is how much one widget may
hold. The package, pricing, properties and age ratings were all unchanged.

## Product name

Mote Desktop

Keep the title free of marketing terms and hidden keywords.

## Short description

Control compatible Philips Hue lights, rooms, zones, and scenes from your Windows PC.

## Description

Mote Desktop is an unofficial Windows controller for compatible Philips Hue hardware. It keeps
lights, rooms, zones, scenes, devices, and entertainment areas available from your desktop and
communicates with your Hue Bridge over your local network.

With Mote Desktop you can:

- Control power, brightness, color, and color temperature where your lights support them.
- View and activate Hue scenes, and manage supported rooms, zones, devices, and entertainment areas.
- Use a home dashboard with standard grouping layouts.
- Discover, pair, restore, rename, and remove one saved Hue Bridge.
- Create desktop widgets, each holding one room, zone, or light.
- Discover, pair, and control one Hue Play HDMI Sync Box.
- Choose light, dark, or system appearance and configure supported tray and startup behavior.

Requirements:

- Windows 10 or Windows 11 on an x64 PC.
- A compatible Philips Hue Bridge and lights on the same local network for lighting control.
- Physical access to the Hue Bridge link button during pairing.
- Compatible hardware and configuration for Hue Play HDMI Sync Box controls.

Network isolation, VPNs, firewalls, multicast filtering, and guest Wi-Fi can affect bridge discovery.
Remote Hue cloud control is not included. Mote Desktop is not affiliated with, authorized by,
sponsored by, or endorsed by Signify. Philips Hue and related marks belong to their respective
owners.

Learn more, compare Free with the planned Mote Pro tier, and get support at
https://motedesktop.com.

## Mote Pro launch insert — hold until purchase is live

Still held as of 11 September 2026. The add-on (`mote-pro`, Store ID `9P3J5KCBFVQZ`) was submitted
that day but publishes manually, so it is not yet purchasable. Publishing it is what releases this
insert — and the same window must update `/features` and `/terms`, which both currently say Mote Pro
"is not yet available to buy". That sentence is true today and false the moment the add-on goes
live.

Insert only after Partner Center shows the durable add-on as published and release acceptance has
verified purchase, restore, offline license, refund/revocation, and locked-state behavior:

> Mote Pro is a one-time Microsoft Store purchase that adds Video, Games, and Music PC Sync modes,
> advanced and additional desktop widgets, a custom home-dashboard layout, and multiple saved Hue
> Bridges. One bridge is active at a time. PC Sync requires a compatible Hue entertainment area;
> display, driver, HDR, audio, and hardware conditions can affect availability. Music mode uses
> system-audio loopback, not the microphone.

Do not add the saved NOK 149 base price until the approved Store listing exposes the reviewed market
prices and the website launch gate permits advertising them.

## Candidate hidden keywords

Candidate pool, in preference order:

1. smart lighting
2. light controller
3. desktop widgets
4. screen sync
5. lighting dashboard
6. multi bridge
7. local network control

These candidates deliberately omit `Philips Hue`, `Hue`, `Windows`, competitor names, and other
third-party product titles. Before submission, confirm the exact field and limits for this package;
the current implementation brief records a maximum of seven keywords, 40 characters per keyword,
and 21 words total for the relevant MSIX flow. Remove terms that duplicate title/description fields,
misdescribe the released tier, or lack acquisition evidence. Do not mechanically translate this set.

Recommended initial set while Mote Pro is unavailable: `smart lighting`, `light controller`,
`desktop widgets`, `lighting dashboard`, `local network control`. Hold `screen sync` and `multi
bridge` until the corresponding paid features can be purchased.

## Screenshot specification

Produce PNG screenshots at 1366 × 768 or larger in the current Partner Center-approved aspect ratio,
under 50 MB each. Recheck the live submission UI: Microsoft currently documents at least one and up
to ten desktop screenshots, and suggests at least four for a supported device family. Keep essential
UI and caption text in the top two-thirds. Use captures from the release build, not mock UI.

| order | source/reference                              | caption                                                                                | tier label      | acceptance notes                                                                                                                                                                                      |
| ----- | --------------------------------------------- | -------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `public/product/mote-dashboard-dark.png`      | “Control rooms, zones, lights, and scenes from one Windows dashboard.”                 | Free            | Lead with the primary control workflow; use non-personal sample names.                                                                                                                                |
| 2     | `public/product/mote-space-controls-dark.png` | “Open a room for scenes, individual lights, brightness, color, and white temperature.” | Free            | Show only controls supported by the captured lights.                                                                                                                                                  |
| 3     | `public/product/mote-widget-stack-dark.png`   | “Keep a room, zone, or light close in a desktop widget.”                               | Free capture    | The app does not limit how many widget windows are open, so a stack of widgets is an accurate Free capture. Check that no single widget in it holds more than one target, which is the Free boundary. |
| 4     | `public/product/mote-sync-hdmi-box-dark.png`  | “Control a configured Hue Play HDMI Sync Box from Mote Desktop.”                       | Free            | State that compatible Sync Box hardware and setup are required.                                                                                                                                       |
| 5     | `public/product/mote-sync-this-pc-dark.png`   | “Sync a compatible Hue entertainment area with a display or system audio.”             | Mote Pro        | Hold until Pro is purchasable; label Pro and requirements visibly.                                                                                                                                    |
| 6     | `public/product/mote-bridge-dark.png`         | “Save one Hue Bridge in Free; Mote Pro can switch among multiple saved bridges.”       | Free / Mote Pro | Current source contains multiple bridges, so hold it until Pro launches or recapture a single-bridge Free state.                                                                                      |

The website PNGs are truthful source references with provenance in `public/product/PROVENANCE.md`,
but most are not ready-made 1366 × 768 Store assets. Re-capture from the release candidate at the
required canvas and verify that no development controls, credentials, addresses, or personal data
appear. Use consistent framing and concise factual captions; do not fabricate outcomes or ratings.

## Final Partner Center checks

- Confirm Store product ID `9P910JMMP9SZ`, package type, category, supported device family, markets,
  listing languages, and every field limit in the active submission.
- Confirm the website, privacy, terms, and support URLs return final HTTPS 200 responses.
- Confirm the description matches the submitted package and current Free/Pro entitlement behavior.
- Confirm screenshots match the released build and each tier label is visible and accurate.
- Review current Microsoft Store policy and trademark guidance before using compatibility terms.
- Submit only with explicit owner authorization; archive the exact submitted copy and asset hashes.

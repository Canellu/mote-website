# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Desktop users with Philips Hue lighting who want everyday controls close to the work already happening on their computer. The first release is for Windows.

## Product Purpose

Mote Desktop makes Philips Hue lights, rooms, zones, scenes, and focused controls readily available on the desktop. Success means a visitor quickly understands that Mote reduces the distance between working at a computer and adjusting their lighting.

## Positioning

Mote brings Hue control into the desktop workflow through a customizable home dashboard and desktop widgets, rather than requiring the user to reach for a separate mobile device. Windows is the initial release platform, not the extent of the product's positioning.

## Operating Context

People use Mote while working, playing, watching video, or listening to music at a desktop computer connected to a compatible Hue setup.

## Capabilities and Constraints

- Control compatible Hue lights, rooms, zones, scenes, devices, and entertainment areas.
- Save one Hue Bridge for free; Mote Pro supports switching among multiple bridges.
- Use one standard desktop widget for free; Mote Pro supports unlimited advanced customizable widgets, including translucent tiles.
- Use standard dashboard grouping layouts for free; Mote Pro supports reordering cards and saving a custom layout.
- PC Sync includes Video, Games, and Music modes for compatible entertainment areas and is free (since app 0.8.0, 26 September 2026).
- PC Sync availability can depend on display capture, system-audio loopback, networking, firewall, VPN, and hardware conditions.
- One Hue Play HDMI Sync Box is free; Mote Pro pairs more and switches between them (since 0.7.0).
- Switch, dimmer, and motion sensor setup, fixtures, units and formats, and connecting to a bridge by IP address when discovery fails are free (0.9.0–0.10.0).
- The initial release targets Windows. Core product language should describe Mote as a desktop product; mention Windows only for current availability, requirements, or platform-specific behavior.
- Global keyboard shortcuts and automations are Mote Pro features. Automations are the on-air light, lights that follow the PC locking or sleeping, focus sessions, presence from phones on the home Wi-Fi, and calendar rules (0.6.0). Setting one up is free; starting one needs Pro. The priority order between them is free.
- The Microsoft Store listing is live and the free tier can be downloaded today. Mote Pro is on sale as a one-time purchase made from inside the app, never a subscription, and every installation gets a 14-day Mote Pro trial from its first paired bridge, with no account or payment details.
- Mote Pro's base price is NOK 149, but the site does not show it. The add-on is hidden from Store discovery and bought only inside the app, its market conversions are unreviewed, and a price belongs in approved Store listing copy before it appears here. Source: `mote-desktop/docs/windows-store-commerce-spike.md`.
- Site copy follows the version live in the Store, not the version in the desktop repository. As of 11 October 2026 that is 0.10.1. 0.11.0 (the All lights page, fixtures as one tile, and fixes) is in certification, and 0.11.1 (lights resync on their own, with Refresh in Settings > Bridge) is built to follow it. Neither changes a tier, privacy, or legal claim. Privacy and terms changes go live before the app version that needs them. Source of truth for tiers: `mote-desktop/docs/free-pro-feature-matrix.md`; for release state: `mote-desktop/docs/windows-store-commerce-spike.md`.

## Brand Commitments

- Product name: Mote Desktop; paid tier: Mote Pro.
- Keep the voice direct, calm, and factual.
- The landing page uses a single light presentation, with the interactive lighting control sitting in its brightest field.

## Evidence on Hand

The repository contains confirmed launch copy, a detailed Free versus Mote Pro comparison in `src/routes/features.tsx`, and real product captures documented in `public/product/PROVENANCE.md`. It currently has no testimonials, customer logos, usage metrics, or press evidence; future work must not fabricate them.

## Product Principles

- Keep lighting control close to the user’s active desktop workflow.
- Make essential Hue control useful for free.
- Explain Pro through concrete workflow expansion rather than artificial limitation.
- Prefer demonstrations of product behavior over broad lifestyle claims.
- State compatibility and release limitations plainly.

## Accessibility & Inclusion

Preserve semantic HTML, keyboard navigation, visible focus, responsive layouts, sufficient contrast, and reduced-motion support.

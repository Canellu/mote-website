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
- Use one standard desktop widget for free; Mote Pro supports unlimited advanced customizable widgets.
- Use standard dashboard grouping layouts for free; Mote Pro supports reordering cards and saving a custom layout.
- PC Sync includes Video, Games, and Music modes for compatible entertainment areas and is a Mote Pro feature.
- PC Sync availability can depend on display capture, system-audio loopback, networking, firewall, VPN, and hardware conditions.
- The initial release targets Windows. Core product language should describe Mote as a desktop product; mention Windows only for current availability, requirements, or platform-specific behavior.
- The Microsoft Store listing is live and the free tier can be downloaded today. The one-time Mote Pro purchase is not yet available, so the website must not imply that visitors can buy Pro today.
- A Mote Pro base retail price of NOK 149 is saved in Partner Center, but the site must not show it. The add-on is hidden and set to publish manually, its market conversions are unreviewed, and the sibling repository's `docs/website-launch-plan.md` forbids advertising a price before it appears in approved Store listing copy. Source: `mote-desktop/docs/windows-store-commerce-spike.md`.

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

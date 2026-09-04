---
name: Mote Desktop
description: An illumination-led product story that brings colorful Hue control into the desktop workflow.
colors:
  graphite-night: "#0b0c0b"
  mineral-white: "#f2f2ed"
  text-on-dark: "#f5f5f1"
  text-on-light: "#121410"
  ink: "#10120f"
  signal-orange: "#ff4500"
  signal-orange-strong: "#a83200"
  muted-on-dark: "#a9ada6"
  muted-on-light: "#5e625b"
  panel-dark: "#181a18"
  panel-light: "#e5e6df"
  line-dark: "#30332f"
  line-light: "#c7c9c1"
  daylight-field: "#ecece6"
  scene-focus: "#e7f06a"
  scene-golden: "#ffb342"
  scene-sunset: "#ff7d6b"
  scene-aurora: "#71e0cf"
  widget-violet: "#5123bc"
  widget-magenta: "#d72be8"
  widget-teal: "#0b6269"
  widget-blue: "#123c68"
typography:
  display:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "clamp(4.4rem, 5.6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "clamp(3.2rem, 4.8vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "clamp(2.6rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.08em"
  interface:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: "0.7rem"
  nav: "0.75rem"
  media: "1rem"
  glass: "1.15rem"
  panel: "1.2rem"
  pill: "999px"
spacing:
  xs: "0.35rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "6rem"
components:
  primary-action:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.15rem"
    height: "3rem"
  navigation-link:
    textColor: "{colors.muted-on-dark}"
    rounded: "{rounded.nav}"
    padding: "0 0.75rem"
    height: "2.75rem"
  scene-option:
    backgroundColor: "{colors.panel-dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.control}"
    padding: "0.65rem"
    height: "4.2rem"
  capture-frame:
    rounded: "{rounded.panel}"
    padding: "3rem 3rem 0"
---

# Design System: Mote Desktop

## Overview

**Creative North Star: "The Master Dimmer"**

Mote Desktop turns the page itself into an illumination control. One continuous mineral-light canvas shifts gently in temperature and brightness as colorful Hue state emerges through a working control and real product captures. The interactive lighting chapter is the brightest point. The visual world is direct, calm, and technically precise without feeling sterile.

The system uses Geist Variable across display, reading, and interface roles. Solid controls, sparse technical ticks, functional glass, and minimally rounded product frames keep the interface grounded while light, color, and authentic Mote screens supply the emotion. Ornament never competes with product evidence.

**Key Characteristics:**

- A continuous mineral-light field with softly overlapping tonal transitions.
- Oversized Geist headlines paired with quieter Geist body and control text.
- Neon orange used as a scarce signal for actions, state, focus, and brand rhythm.
- Functional glass reserved for the sticky navigation veil and compact contextual labels.
- Real, colorful Mote captures presented as the primary proof of the product.

## Colors

The palette moves between graphite night and mineral daylight, with neon orange acting as electrical current and Hue-derived color appearing inside demonstrations and product evidence.

### Primary

- **Neon Orange:** The system signal for primary actions, active controls, visible focus, selection, the brand bars, and the scrollbar thumb. It should feel powered, not decorative. Dark ink is used on orange for accessible text contrast.

### Secondary

- **Hue Scene Color:** The interactive scene control may introduce focused yellow, amber, coral, and aqua. These colors belong to live lighting state, glows, and the controlled room wash rather than general page chrome.

### Neutral

- **Graphite Night:** The dark canvas and deepest structural surfaces.
- **Mineral White:** The single site canvas, preserving a soft, non-clinical character.
- **Daylight Field:** The brightest atmospheric area, attached to the interactive lighting chapter and fading gradually into its neighbors.
- **Dark Interface Neutrals:** Graphite remains inside product captures, the scene lab, and other evidence-bearing surfaces where it creates useful contrast.

### Named Rules

**The Current, Not Paint Rule.** Neon orange marks energy, selection, focus, or action; it does not fill large decorative areas.

**The Product Owns Color Rule.** Saturated amber, coral, aqua, violet, and blue belong primarily to real Mote screens, scene state, or the framing atmosphere immediately around them.

## Typography

**Display Font:** Geist Variable (with sans-serif fallback)

**Body Font:** Geist Variable (with sans-serif fallback)

**Label Font:** Geist Variable (with sans-serif fallback)
**Embedded Interface Font:** Geist Variable (matching the Mote Desktop application)

**Character:** Geist Variable gives the site and embedded product controls one precise, contemporary typographic texture. Weight, scale, tracking, and measure distinguish product storytelling from explanatory and interface roles. Tight display tracking and short line lengths create conviction without resorting to all-caps spectacle.

### Hierarchy

- **Display:** Bold, tightly tracked, and compact; reserved for the opening statement, with enough measure for short phrases rather than isolated words.
- **Headline:** Bold and balanced; used for major chapter statements and calls to action, usually held to ten to twelve characters.
- **Title:** Bold and direct; used for individual product-capture stories.
- **Body:** Regular Geist with generous leading; explanatory passages generally stop around 28–32rem rather than spanning the canvas.
- **Label:** Small interface and technical copy; uppercase with tracked lettering only for explicit interaction hints. Numeric readouts use tabular figures.

### Named Rules

**The One Family Rule.** Geist serves every role; scale, weight, spacing, and measure create the distinction between product story, site explanation, and embedded controls.

## Layout

The desktop composition is editorial and asymmetric after a centered opening sequence. The sticky header spans the viewport while its contents align to a 76rem grid; story sections can expand to 86rem and readable utility pages stop at 44rem. The opening message is centered above a large, real Mote window that serves as the primary dashboard proof. Dashboard, settings, and Sync Box evidence then alternate copy and media. A second evidence gallery holds room controls, the scene library, and two light-placement modes in one large changing surface; the three related widget stories likewise consolidate into one changing media surface with a stacked selector.

Section rhythm is deliberately spacious, typically 6–10rem vertically. Broad, overlapping gradients change the light's temperature and intensity without exposing hard chapter boundaries. The three broad product captures use alternating 0.58/1.42 and 1.42/0.58 columns. The widget showcase uses a 1.2/0.8 media-to-copy split, keeping one real screenshot dominant while all three choices remain visible.

At 64rem and below, the hero typography tightens. At 50rem and below, the header compacts, the secondary brand word becomes visually hidden, the hero image scales within the available width, all major sections become one column, scene options become a two-column grid, capture stories stop alternating, and the widget showcase places its active image before the stacked selector. At 35rem and below, the hero returns to left alignment, navigation and panel padding tighten, and calls to action stack. The page remains usable from a 320px viewport.

### Hero Focus Sequence

The opening copy is deliberately more compact than the product evidence beneath it. A large dashboard capture follows in normal document flow, centered in a wide stage while remaining contained at every viewport width. The frame, warm illumination, and compact caption give the image context without surrounding annotations competing with or colliding with the interface.

**The Evidence Leads Rule.** When space tightens, preserve the real product image, functional controls, and readable copy; remove peripheral annotation first.

## Elevation & Depth

The system is tonal and atmospheric at rest, then selectively lifted around product-bearing surfaces. The header uses a translucent, borderless glass veil whose tint and blur fade into the page. Product windows and interactive panels use broad, low-contrast shadows, while color halos explain the light-producing product rather than merely decorating the page.

### Shadow Vocabulary

- **Navigation Veil:** A masked 8px blur that preserves visible page detail while dissolving into the page without a rim or shadow.
- **Product Lift:** Large offset shadows under Mote captures and the scene lab so the evidence reads as a physical window above the page.
- **Context Capsule:** A smaller soft shadow beneath the hero capture caption.
- **Hue Emission:** Colored blur and glow radiate from scene state, lamp light, and the widget atmosphere; they never replace legible control boundaries.

### Named Rules

**The Earned Glass Rule.** Backdrop blur belongs to floating functional chrome and compact contextual labels, not to every surface.

## Shapes

The overall form language is controlled and minimally rounded. Large frames and glass chrome use gently softened corners, compact controls use tighter radii, and pills are reserved for primary actions, switches, captions, and the small brand-bar ends. Real screenshots are clipped inside darker framing fields, with their top corners softened and lower edge allowed to disappear into the frame.

Thin dividers and one-pixel strokes establish structure without creating a card grid. The brand bars, room geometry, and real application controls supply the rectilinear counterpoint.

**The Radius Has a Job Rule.** Use medium rounding for containers, tighter rounding for controls, and full pills only for singular actions or binary state.

## Components

### Buttons

- **Shape:** The primary action is a compact full pill; scene choices are compact rounded rectangles; the power control is a true switch pill; widget choices are full-width text rows separated by one-pixel rules.
- **Primary:** Citron background, dark ink text, 3rem minimum height, and compact horizontal padding. It is a link when it navigates and a button when it changes state.
- **Hover / Focus:** Fine-pointer hover slightly brightens the primary action. Pressed controls scale to 97%. Every interactive element receives the shared 2px neon-orange focus outline with a 4px offset.
- **Secondary / Ghost:** Navigation stays translucent and muted until hover, focus, or current-page state raises its contrast.

### Chips

- **Style:** Scene choices are four compact state tiles with a colored dot, label, dark panel fill, and quiet border.
- **State:** The selected scene takes its border from the active scene color and lifts its fill and text contrast. Fine-pointer hover strengthens only the border. On narrow screens the four choices resolve into two columns.

### Cards / Containers

- **Corner Style:** Scene lab and capture frames use the large panel radius; embedded screenshot corners are slightly tighter.
- **Background:** Dark tonal surfaces carry the interactive demo and widget media. The surrounding page remains light, while dashboard, settings, and Sync Box screenshots receive warm, blue, and violet framing gradients keyed to their content.
- **Shadow Strategy:** Use Product Lift only for the primary evidence-bearing surface.
- **Border:** Dividers and low-contrast one-pixel borders clarify structure; avoid boxed feature-card repetition.
- **Internal Padding:** Capture frames use generous top and side padding on desktop and halve it on narrow screens.

### Inputs / Fields

- **Style:** The brightness range spans the panel width and inherits the current scene color as its native accent.
- **Focus:** The global neon-orange outline remains visible around keyboard-focused inputs and controls.
- **Disabled:** Turning the workspace off disables the range, changes the cursor to not-allowed, and lowers opacity while preserving the last chosen brightness for restoration.

### Navigation

The header is a full-width glass veil fixed to the top edge, with brand and primary links aligned to the page grid. Its translucent mineral surface and backdrop blur fade vertically into the page without a border, shadow, or visible bottom edge.

### Scene Lab

The signature control is explicitly illustrative but functionally real: a dark desktop-style widget overlays a furnished workspace scene with two monitors, a desk lamp, a floor lamp, and an ambient light strip. Scene tiles, a brightness range, and an accessible power switch update the room wash and visible light sources. Registered custom properties for scene color, wash, and intensity allow those changes to interpolate smoothly over 220ms. Power and scene buttons expose switch and pressed state through ARIA.

### Product Capture Frame

Use authentic Mote imagery with descriptive alternative text, explicit intrinsic dimensions, and lazy loading below the hero. The first capture is fetched at high priority. The light website presents dark application captures for strong product contrast. Framing color should support the visible screen without recoloring or obscuring it.

### Deep Control Gallery

Four real Mote application states share one large evidence surface: room controls, the Hue scene gallery, screen sampling, and 3D room placement. A persistent four-choice index swaps the image while keeping every view discoverable. The index uses hairline structure rather than independent cards, and collapses from four columns to two and then one as space tightens.

### Widget Showcase

Three related widget stories share one evidence surface instead of repeating three page sections. A large real screenshot leads on the left over a vivid teal-to-blue-to-violet illumination field; three persistent text buttons stack on the right. Clicking a row swaps the screenshot, exposes pressed state, and moves a one-pixel neon-orange indicator. The image transition uses a short opacity, blur, and vertical settle; reduced motion makes the swap effectively immediate. On narrow screens, image and choices stack in DOM order.

## Do's and Don'ts

### Do:

- **Do** let the page progress from graphite to mineral-white as a scroll-level illumination story.
- **Do** reserve neon orange for powered, selected, focused, or actionable moments.
- **Do** use real Mote captures as the dominant evidence and give each one a content-aware color frame.
- **Do** preserve visible keyboard focus, semantic control state, forced-color borders, and descriptive image alternatives.
- **Do** reduce transitions to effectively instantaneous timing and disable smooth scrolling when reduced motion is requested.
- **Do** keep the site in its single mineral-light presentation and let dark product UI provide contrast.

### Don't:

- **Don't** turn the story into a generic stack of same-sized feature cards.
- **Don't** spread glass blur across ordinary content surfaces or use it without a functional reason.
- **Don't** use colorful Hue gradients as generic decoration detached from product evidence or lighting state.
- **Don't** flatten Geist into one undifferentiated weight and size or use display styling for dense interface copy.
- **Don't** hide essential interaction, navigation, or product evidence at mobile sizes; remove peripheral annotation first.
- **Don't** animate scene changes, presses, or smooth scrolling when the user requests reduced motion.

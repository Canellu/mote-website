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
    fontSize: "clamp(3.6rem, 4.4vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, sans-serif"
    fontSize: "clamp(2.8rem, 3.6vw, 3.6rem)"
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
  section: "5rem"
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

- **Hue Scene Color:** The interactive scene control may introduce focused yellow, amber, coral, and aqua. These colors belong to live lighting state, glows, the controlled room wash, and the ambient field described under Hue Ambient Light rather than to page chrome, type, or control surfaces.

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

The desktop composition is editorial but follows one stable reading edge. The fixed header spans the viewport while its contents, hero copy, story sections, and footer align to one 80rem grid with shared 1.5–3rem responsive gutters. Atmospheric media can expand to 96rem, the hero background remains broadly inset, and readable utility pages stop at 44rem. The opening message sits beside a large, real Mote window that serves as the primary dashboard proof. Dashboard, settings, and bridge-setup evidence share one changing media surface with a stacked selector. Room controls, the scene library, light placement, and widget setup repeat that same dependable selector-to-media relationship.

Section rhythm is compact and deliberate, typically 4–5rem vertically, so the edge of the previous or next chapter remains visible during ordinary scrolling. Broad, overlapping gradients and spacing distinguish the narrative chapters without divider rules. Multi-image stories place selectors on the left and the changing image on the right, with a 0.65/1.35 selector-to-media split. The document order follows the same read, choose, inspect sequence.

At 64rem and below, the hero typography tightens. At 50rem and below, the header compacts, the secondary brand word becomes visually hidden, the hero image scales within the available width, all major sections become one column, scene options become a two-column grid, and gallery selectors become horizontally scrollable strips above their active media. At 35rem and below, navigation and panel padding tighten and calls to action stack. The page remains usable from a 320px viewport.

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
- **Hue Ambient Light:** A small number of very large, low-opacity Hue lights sit behind the whole page, drifting slowly. They are the room the product is used in, not an effect applied to it: they stay behind every surface, carry no contrast of their own, and are removed under forced colors.

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
- **Background:** Dark tonal surfaces carry the interactive demo and widget media. The surrounding page remains light, while dashboard, settings, and bridge-setup screenshots receive warm, blue, and violet framing gradients keyed to their content.
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

### Product Story Switcher

Related screenshots share one bordered stage: the active product capture on the left and concise persistent choices on the right. Selection moves a two-pixel orange current and swaps only the media, preserving the reader's place. On narrow screens the choices become a horizontally scrollable strip below the media that deliberately exposes the next option, and the current moves to the bottom edge of the selected choice, against the media it belongs to, rather than staying on a left edge it no longer shares with it. On phone widths the switcher gives way entirely to the same carousel the story sections use: a strip of choices under a stage is unreadable at that width, and the carousel carries the identical views as swipeable cards.

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
- **Do** treat ambient Hue light as the ground the page sits on, holding it behind every legible surface and letting the reader's motion preference stop it.

### Don't:

- **Don't** turn the story into a generic stack of same-sized feature cards.
- **Don't** spread glass blur across ordinary content surfaces or use it without a functional reason.
- **Don't** put colorful Hue gradients on content surfaces, type, or controls. Ambient Hue light belongs behind the page, where nothing legible is painted on it.
- **Don't** flatten Geist into one undifferentiated weight and size or use display styling for dense interface copy.
- **Don't** hide essential interaction, navigation, or product evidence at mobile sizes; remove peripheral annotation first.
- **Don't** animate scene changes, presses, or smooth scrolling when the user requests reduced motion.

### Selected frosted header refinement (September 2026)

The header now uses one slim floating mineral-white glass bar, inset 20px on desktop, with a 64px minimum height, 16px corners, a fine translucent rim and a restrained downward shadow. A 10px backdrop blur and 58% mineral-white tint let the underlying page show through while supporting readable dark navigation. The original icon and wordmark remain left; Features, Support and the compact orange primary action sit right. At narrow phone widths the links form a second row below the brand and action. The header action reads Get Mote Free and links to the Microsoft Store listing. This supersedes the earlier navigation veil and bracketed navigation descriptions.

### Ambient light and the single close (September 2026)

The site canvas is no longer flat. Four very large Hue lights — amber, magenta, aqua and blue — are fixed to the viewport behind every page, with their centers off screen so only the falloff reaches the reader. They drift on slow, unequal cycles, hold still under reduced motion, and disappear under forced colors. Every page surface still paints its own ground over them, so no text ever sits on unmanaged color. The opening panel carries cool light at its left edge alongside the warm light it already had.

The page's close and the site footer are one band rather than two. A single graphite surface, lit from inside by the same four colors screened over it, carries the call to action, the brand, the legal links and the copyright, and it now ends every page rather than only the homepage. This supersedes the separate closing section and thin footer rule.

The homepage argues rather than catalogs. Its PC Sync section shows two views — what drives the lights, and where the lights are — and its third tile links through to the features page for the screens it no longer shows. Captures are not repeated across the two pages: where both pages cover a capability, each shows a different real screen.

### Crossing between pages (September 2026)

Moving between pages is one motion, not three. A navigation runs inside a view transition: the page being left is held while the page being entered rises ten pixels and fades over it, both halves on the same 320ms curve so the browser's plus-lighter blending stays complementary and the middle of the crossing never washes out. The header is named out of that snapshot and holds still — it is the one thing a navigation does not change, and left in the page's snapshot its own bottom edge doubles against the copy of itself ten pixels below. Under reduced motion the transition's animations are dropped, which ends it on its first frame: the page still changes, it just does not travel to get there.

The scroll reset is instant and happens underneath that crossing, where it is never seen. The stylesheet asks for smooth scrolling so in-page anchors glide, and a navigation left on the default behavior inherited it: the reader watched the page they were leaving scroll itself back up before the next one arrived, and the animation was interrupted by the incoming page besides. Restoration, reset and hash landings are all taken instantly now. Going back still returns the reader to where they were.

The closing band's Compare Free and Pro goes to the top of the features page rather than to the comparison heading. Aimed at the anchor it worked exactly as asked and that was the problem: the reader left the bottom of one page and arrived four fifths of the way down another they had never seen, scrollbar already near its end, with nothing to say they had gone anywhere. The features page opens with its own jump to the comparison, so the table is still one move away and signposted by the page itself.

The header is frosted from the first pixel rather than only once scrolled. Dark navigation used to sit straight on whatever ran under the bar; a light mineral-white tint over a real blur keeps the page legible through it while flattening the detail the type has to compete with. Scrolling deepens the tint and brings the hairline up from nothing, so the bar still reads as an edge only once there is content above it.

The homepage's PC Sync section is three views and no way out. Every tile is a screen — what drives the lights from the PC, the Hue Play HDMI Sync Box that can drive the same area instead, and where each light of that area sits in the placement model — so every tile behaves the same way. The earlier third tile linked through to the features page, which broke the section open right where the reader was still reading it. Showing the Sync Box here is the one place a capture is shared between the two pages: the section's own opening sentence promises it, and the alternative was a tile that does something other than what it sits beside. This supersedes the paragraph above it.

### The phone header and its centred openings (September 2026)

The header is one row tall at every width. Below 50rem the two page links leave
the bar for a menu under it, opened by a button that draws as two rules and
crosses into an X while the panel is up; the brand stays left, and Get Mote Free
stays in the bar beside the button. The one thing a reader came to do is not put
behind a burger, and the second row the links used to form below 35rem — which
cost a third of a phone's first screen before any page had spoken — is gone.
This supersedes the two-row phone header described above.

The open panel is glass like the bar it hangs from — a deeper blur and a light
tint, not a white sheet — so the page stays visible behind it as something out
of focus, which is what says the panel is over the page rather than a page of
its own. It closes on a navigation, on Escape, and on a widening past the
breakpoint that puts the links back in the bar.

Below 40rem the page and section openings are centred: the hero's title, its
paragraph and its buttons, the homepage's section heads with the carousel arrows
under them, and every subpage's title and standfirst. On a phone that copy is
the full width of the page rather than a column beside something, and a ragged
left edge with nothing to its right reads as a stray margin instead of an
alignment. The hero title comes down with it — a line that fills a desktop
column has to be read three or four lines deep on a phone, and the smaller size
buys back the space the old one took from the paragraph beneath it. Feature
blocks and their lists stay left: a centred heading over a bulleted list is a
heading that has left its own content.

### The blur that was never there (September 2026)

The header's backdrop blur had been asked for repeatedly and had never once
rendered: what showed was a flat white wash over perfectly sharp text. The
property was set, `backdrop-filter: blur(16px)`, on the pseudo-element that
carried the bar's tint — and it was on the wrong element. The header carries
`view-transition-name`, which makes it a backdrop root, so a backdrop-filter on
anything inside the header can only sample what the header itself paints, which
is nothing. The blur was compositing an empty backdrop, faithfully, forever.

The tint and the blur now sit on the bar itself, where the backdrop is the page
behind it, and the pseudo-element is left holding only the hairline. The blur is
slight — 4px, enough to soften what runs under the bar so the type on it has an
edge, not enough to hide the page; the open phone menu takes it to 18px, where
the page behind reads as colour and shape rather than as words. Tint carries the
rest: 40% mineral white at rest, 62% once something has scrolled under the bar,
and 55% under the open menu, which is lower than the bar it hangs from on
purpose. Anything that overrides the bar's surface — the home page's short-
viewport rule — now sets it on the header too, or it sets nothing at all.

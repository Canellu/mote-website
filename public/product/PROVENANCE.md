# Product capture provenance

These are real Mote Desktop application captures sourced from the sibling `mote-desktop` repository. No interface content was generated for the website.

The PNGs in this directory are the originals and the record. What a reader actually downloads is one of the AVIF or WebP encodes in `derived/`, written from these files by `scripts/encode-product-images.ts` at the widths the site paints them at. Nothing in `derived/` is a separate capture — regenerate it rather than editing it, and re-run the script after replacing any PNG here.

The theme-paired captures were rendered directly from the sibling application's development views with `scripts/capture-product-themes.cjs`, which writes a light and a dark variant of each. Only the dark variant is published, because the site presents dark product interface throughout. The dashboard uses local sample Hue resources injected into the app store for capture only; the bridge and settings views use the application's own development sample states. Development controls and development-only errors are excluded from the captures.

`mote-hero-demo-hd.webm`, its MP4 fallback, and `mote-hero-poster-hd.png` were captured from the current local Mote Desktop frontend with `scripts/record-hero-demo.cjs`. The 960 × 1060 viewport is rendered at 2.5× device scale (2400 × 2650). Lossless PNG frames are encoded once at 24 fps to VP9 WebM and H.264 MP4; the poster retains the original PNG pixels. The edited walkthrough shows room dimming, applying Retro current, adjusting the desk lamp's color and white temperature, and returning to the dashboard. Sample rooms, zones, lights, and scenes are capture-only. Actions run through the real controls and app state, with hardware commands acknowledged locally. A capture-only pointer makes gestures visible; static reading pauses are held frames, so the edit is not a latency benchmark. See `scripts/record-hero-demo.md` for reproduction instructions.

| Theme-paired website asset     | Live application view                                       |
| ------------------------------ | ----------------------------------------------------------- |
| `mote-dashboard-dark.png`      | Home dashboard with capture-only sample Hue resources       |
| `mote-settings-theme-dark.png` | General settings and appearance                             |
| `mote-bridge-dark.png`         | Bridge selection with Hue Bridge Pro and classic Hue Bridge |

The captures below were supplied from the installed Mote Desktop application. The room-control and scene-gallery labels were changed from `ANTON PC` to `Studio` for the website while preserving the surrounding interface. The placement captures preserve the user's real `TV area`, light positions, and chosen 3D camera angle.

| Website asset                         | Live application view                                     |
| ------------------------------------- | --------------------------------------------------------- |
| `mote-space-controls-dark.png`        | User-supplied room controls, relabeled `Studio`           |
| `mote-scene-gallery-dark.png`         | User-supplied Hue scene gallery, relabeled `Studio`       |
| `mote-sync-this-pc-dark.png`          | PC Sync with Video, Games, and Music styles and intensity |
| `mote-sync-hdmi-box-dark.png`         | Sync Box view with HDMI sources and sync style controls   |
| `mote-sync-placement-screen-dark.png` | Light placement, display sampling regions                 |
| `mote-sync-placement-room-dark.png`   | Light placement, 3D room view at the chosen angle         |
| `mote-widget-stack-dark.png`          | Desktop widgets for rooms, scenes, and lights             |

Captures from earlier iterations of the site — the Microsoft Store screenshot set, the light-theme variants, the widget wizard steps, and a superseded vintage of the light placement views — were removed on 6 September 2026 once no page referenced them. The sibling repository and the scripts in `scripts/` remain the source for any that are needed again.

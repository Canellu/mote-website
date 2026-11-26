# Product capture provenance

`mote-taskbar-quick-controls-dark.png` is a 744×970 capture of the taskbar
panel from the sibling app’s 0.13.1 source (`a2744aa`), rendered in Chrome
with local sample rooms, scenes, and Mote Pro active.

These are real Mote Desktop application captures sourced from the sibling `mote-desktop` repository. No interface content was generated for the website.

The PNGs in this directory are the originals and the record. What a reader actually downloads is one of the AVIF or WebP encodes in `derived/`, written from these files by `scripts/encode-product-images.ts` at the widths the site paints them at. Nothing in `derived/` is a separate capture — regenerate it rather than editing it, and re-run the script after replacing any PNG here.

The theme-paired captures were rendered directly from the sibling application's development views with `scripts/capture-product-themes.cjs`, which writes a light and a dark variant of each. Only the dark variant is published, because the site presents dark product interface throughout. The dashboard uses local sample Hue resources injected into the app store for capture only; the bridge and settings views use the application's own development sample states. Development controls and development-only errors are excluded from the captures.

`mote-hero-demo-hd.webm`, its MP4 fallback, and `mote-hero-poster-hd.png` were captured from the current local Mote Desktop frontend with `scripts/record-hero-demo.cjs`. The 960 × 1060 viewport is rendered at 2.5× device scale (2400 × 2650). Lossless PNG frames are encoded once at 24 fps to VP9 WebM and H.264 MP4; the poster retains the original PNG pixels. The edited walkthrough shows room dimming, applying Retro current, adjusting the desk lamp's color and white temperature, and returning to the dashboard. Sample rooms, zones, lights, and scenes are capture-only. Actions run through the real controls and app state, with hardware commands acknowledged locally. A capture-only pointer makes gestures visible; static reading pauses are held frames, so the edit is not a latency benchmark. See `scripts/record-hero-demo.md` for reproduction instructions.

`mote-taskbar-flyout-demo.webm`, its MP4 fallback, and `mote-taskbar-flyout-demo.png` were captured from the sibling app's 0.13.1 source (`a2744aa`) with `scripts/record-feature-demos.cjs`. The panel is the real taskbar panel view, rendered in Chrome at 460 × 720 CSS pixels and 2× device scale (920 × 1440), and encoded at 24 fps. The 19-second loop shows a click on Mote's tray icon opening the panel, dimming Studio, applying the Relax and Retro current scenes, switching Lounge off, and dismissing the panel with a desktop click. Sample rooms, zones, and scenes are capture-only, and hardware commands are acknowledged locally. The desktop wallpaper, the Windows-style taskbar strip around Mote's real tray icon, the icon hover state, and the pointer are drawn for the capture only. Open and close are triggered by the same visibility event the desktop app sends, and the panel's own fly-in and fly-out animations are stepped frame by frame so they show at video speed. Reading pauses are held frames, so the edit is not a latency benchmark. See `scripts/record-feature-demos.md` for reproduction instructions.

`mote-widget-mascot-demo.webm`, its MP4 fallback, and `mote-widget-mascot-demo.png` were captured from the sibling app's 0.13.1 source (`a2744aa`) with `scripts/record-widget-mascot-demo.cjs`. The widget is the real widget window view (`/?window=widget`), rendered in Chrome inside a 600 × 460 CSS-pixel stage at 2× device scale (1200 × 920) and encoded at 24 fps. The 16-second loop shows Studio being dimmed and set to Relax, the widget's Collapse button folding the cards into the Cartoon moth, the moth fluttering under the pointer, a click opening the widget again, and Retro current being reapplied so the last frame matches the first. The widget uses the Mascot collapse look with the Stack fold and a 150% folded size, all real widget settings. Sample rooms and scenes are capture-only, and hardware commands are acknowledged locally. The desktop wallpaper, taskbar strip, and pointer are drawn for the capture only. The widget's OS window is stood in for by an iframe sized the way the desktop app sizes it, and the folded window's clip to the moth is mirrored with CSS. The fold animations are stepped one video frame at a time on the page clock so they show at their real speed. Reading pauses are held frames, so the edit is not a latency benchmark. See `scripts/record-feature-demos.md` for reproduction instructions.

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

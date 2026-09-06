# Product capture provenance

These are real Mote Desktop application captures sourced from the sibling `mote-desktop` repository. No interface content was generated for the website.

The paired `*-light.png` and `*-dark.png` captures were rendered directly from the sibling application's development views with `scripts/capture-product-themes.cjs`. The dashboard uses local sample Hue resources injected into the app store for capture only; the bridge, widget wizard, and Sync Box setup use the application's own development sample states. Development controls and development-only errors are excluded from the captures.

`mote-hero-demo-hd.webm`, its MP4 fallback, and `mote-hero-poster-hd.png` were captured from the current local Mote Desktop frontend with `scripts/record-hero-demo.cjs`. The 960 × 1060 viewport is rendered at 2.5× device scale (2400 × 2650). Lossless PNG frames are encoded once at 24 fps to VP9 WebM and H.264 MP4; the poster retains the original PNG pixels. The edited walkthrough shows room dimming, applying Retro current, adjusting the desk lamp's color and white temperature, and returning to the dashboard. Sample rooms, zones, lights, and scenes are capture-only. Actions run through the real controls and app state, with hardware commands acknowledged locally. A capture-only pointer makes gestures visible; static reading pauses are held frames, so the edit is not a latency benchmark. See `scripts/record-hero-demo.md` for reproduction instructions.

| Website asset              | Source capture                                                         |
| -------------------------- | ---------------------------------------------------------------------- |
| `mote-dashboard.png`       | `../mote-desktop/store-assets/screenshots/raw/01-dashboard.png`        |
| `mote-sync-areas.png`      | `../mote-desktop/store-assets/screenshots/raw/02-pc-sync.png`          |
| `mote-pc-sync.png`         | `../mote-desktop/store-assets/screenshots/raw/03-pc-sync-controls.png` |
| `mote-widget-settings.png` | `../mote-desktop/store-assets/screenshots/raw/04-widgets-settings.png` |
| `mote-desktop-widgets.png` | `../mote-desktop/store-assets/screenshots/raw/05-desktop-widget.png`   |
| `mote-widget-config.png`   | `../mote-desktop/store-assets/screenshots/raw/06-widget-config.png`    |

| Theme-paired website asset               | Live application view                                       |
| ---------------------------------------- | ----------------------------------------------------------- |
| `mote-dashboard-{light,dark}.png`        | Home dashboard with capture-only sample Hue resources       |
| `mote-settings-theme-{light,dark}.png`   | General settings and appearance                             |
| `mote-bridge-dark.png`                   | Bridge selection with Hue Bridge Pro and classic Hue Bridge |
| `mote-sync-box-{light,dark}.png`         | Sync Box selection development state                        |
| `mote-widget-profile-{light,dark}.png`   | Widget wizard name step                                     |
| `mote-widget-controls-{light,dark}.png`  | Widget wizard control selection step                        |
| `mote-widget-configure-{light,dark}.png` | Widget wizard appearance and preview step                   |

The four captures below were supplied from the installed Mote Desktop application. The room-control and scene-gallery labels were changed from `ANTON PC` to `Studio` for the website while preserving the surrounding interface. The placement captures preserve the user's real `TV area`, light positions, and chosen 3D camera angle.

| Website asset                    | Live application view                               |
| -------------------------------- | --------------------------------------------------- |
| `mote-space-controls-dark.png`   | User-supplied room controls, relabeled `Studio`     |
| `mote-scene-gallery-dark.png`    | User-supplied Hue scene gallery, relabeled `Studio` |
| `mote-placement-screen-dark.png` | User-supplied `TV area` screen-sampling view        |
| `mote-placement-room-dark.png`   | User-supplied `TV area` 3D view at the chosen angle |

The homepage's PC Sync section and widget statement use five further captures supplied from the installed Mote Desktop application. The placement captures preserve the user's real `TV area`, light positions, and chosen 3D camera angle.

| Website asset                         | Live application view                                     |
| ------------------------------------- | --------------------------------------------------------- |
| `mote-sync-this-pc-dark.png`          | PC Sync with Video, Games, and Music styles and intensity |
| `mote-sync-hdmi-box-dark.png`         | Sync Box view with HDMI sources and sync style controls   |
| `mote-sync-placement-screen-dark.png` | Light placement, display sampling regions                 |
| `mote-sync-placement-room-dark.png`   | Light placement, 3D room view at the chosen angle         |
| `mote-widget-stack-dark.png`          | Desktop widgets for rooms, scenes, and lights             |

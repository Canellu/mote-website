# Product capture provenance

These are real Mote Desktop application captures sourced from the sibling `mote-desktop` repository. No interface content was generated for the website.

The paired `*-light.png` and `*-dark.png` captures were rendered directly from the sibling application's development views with `scripts/capture-product-themes.cjs`. The dashboard uses local sample Hue resources injected into the app store for capture only; the widget wizard and Sync Box setup use the application's own development sample states. Development controls and development-only errors are excluded from the captures.

| Website asset              | Source capture                                                         |
| -------------------------- | ---------------------------------------------------------------------- |
| `mote-dashboard.png`       | `../mote-desktop/store-assets/screenshots/raw/01-dashboard.png`        |
| `mote-sync-areas.png`      | `../mote-desktop/store-assets/screenshots/raw/02-pc-sync.png`          |
| `mote-pc-sync.png`         | `../mote-desktop/store-assets/screenshots/raw/03-pc-sync-controls.png` |
| `mote-widget-settings.png` | `../mote-desktop/store-assets/screenshots/raw/04-widgets-settings.png` |
| `mote-desktop-widgets.png` | `../mote-desktop/store-assets/screenshots/raw/05-desktop-widget.png`   |
| `mote-widget-config.png`   | `../mote-desktop/store-assets/screenshots/raw/06-widget-config.png`    |

| Theme-paired website asset               | Live application view                                 |
| ---------------------------------------- | ----------------------------------------------------- |
| `mote-dashboard-{light,dark}.png`        | Home dashboard with capture-only sample Hue resources |
| `mote-settings-theme-{light,dark}.png`   | General settings and appearance                       |
| `mote-sync-box-{light,dark}.png`         | Sync Box selection development state                  |
| `mote-widget-profile-{light,dark}.png`   | Widget wizard name step                               |
| `mote-widget-controls-{light,dark}.png`  | Widget wizard control selection step                  |
| `mote-widget-configure-{light,dark}.png` | Widget wizard appearance and preview step             |

The four captures below were supplied from the installed Mote Desktop application. The room-control and scene-gallery labels were changed from `ANTON PC` to `Studio` for the website while preserving the surrounding interface. The placement captures preserve the user's real `TV area`, light positions, and chosen 3D camera angle.

| Website asset                    | Live application view                               |
| -------------------------------- | --------------------------------------------------- |
| `mote-space-controls-dark.png`   | User-supplied room controls, relabeled `Studio`     |
| `mote-scene-gallery-dark.png`    | User-supplied Hue scene gallery, relabeled `Studio` |
| `mote-placement-screen-dark.png` | User-supplied `TV area` screen-sampling view        |
| `mote-placement-room-dark.png`   | User-supplied `TV area` 3D view at the chosen angle |

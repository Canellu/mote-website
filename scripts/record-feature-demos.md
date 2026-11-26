# Feature demonstrations

`record-feature-demos.cjs` records short looping clips from the actual sibling
Mote Desktop frontend using sample Hue resources. No Hue hardware is connected or
controlled: a browser-only stand-in for Tauri acknowledges every command locally,
and the app's own controls and optimistic updates produce the visible changes.

## Taskbar flyout

`flyout` renders the real taskbar panel (`/?window=tray-panel`) beside a
capture-only desktop wallpaper and Windows-style taskbar strip that carries
Mote's tray icon from `mote-desktop/src-tauri/icons/32x32.png`. The pointer clicks
the icon, the panel flies in above the taskbar at the right edge, Studio is dimmed,
its scenes open, Relax and then Retro current are applied, Lounge is switched off,
and a desktop click dismisses the panel. The last frame matches the first, so the
clip loops without a jump.

The taskbar, wallpaper, pointer, and icon hover state are drawn by the script.
The panel's open and close are driven by the `tray-panel-visibility` event the
desktop app sends. The panel's fly-in lasts about 220 ms, shorter than one
screenshot, so the script steps the page clock and the panel's animations one
video frame at a time while it opens and closes.

## Widget folding into the mascot

`record-widget-mascot-demo.cjs` records `mote-widget-mascot-demo` the same way,
from the real widget window (`/?window=widget&widgetId=capture`). Studio is
dimmed and set to Relax. The Collapse button then stacks the cards into the
Cartoon moth (`celShaded`, at a 150% folded size), the moth flutters under the
pointer, and a click opens the widget again. Reapplying Retro current returns it
to the first frame. The script records a take again (up to three times) when the
last frame doesn't match the first, and publishes only a take that loops cleanly.

In the desktop app, the widget's window keeps its open size when it folds and is
clipped to the moth (`set_widget_collapsed` in `widget.rs`). The script plays that
window with an iframe on a capture-only wallpaper. The iframe takes the size from
the widget's `sync-widget-layout` request, and its CSS clip follows
`clip-widget-to-panel` and `set-widget-collapsed`. The widget and moth pixels are
the app's own. Motion would run the fold on Web Animations, which ignore the
page clock. The script removes `Element.prototype.animate` in the widget frame,
so Motion plays the same curves on animation frames. The script steps those frames
one video frame at a time.

Run it against its own app frontend, for example on port 1434:

```sh
MOTE_URL=http://127.0.0.1:1434 node scripts/record-widget-mascot-demo.cjs
```

It takes the same environment variables as below, except `MOTE_APP_ROOT`, and
writes to `node_modules/.cache/widget-mascot-demo` before publishing.

## Running it

Start the sibling application's frontend, then run:

```sh
node scripts/record-feature-demos.cjs flyout
```

The script needs Playwright, Chromium, and a full FFmpeg build with PNG decoding,
VP9 and H.264 encoding. Use these environment variables when those tools are
installed outside this project's normal module search path:

- `PLAYWRIGHT_MODULE`: path to the Playwright package.
- `CHROMIUM_PATH`: path to the Chromium executable; otherwise Playwright's bundled browser.
- `FFMPEG_PATH`: path to FFmpeg; otherwise `ffmpeg` on PATH.
- `MOTE_URL`: the app frontend, default `http://127.0.0.1:1420`.
- `MOTE_APP_ROOT`: the sibling app checkout, default `../mote-desktop`.
- `MOTE_DRY_RUN=1`: record into the cache only and leave `public/product` alone.

The stage is 460 × 720 CSS pixels at 2× device scale. Lossless PNG frames are
encoded once to 920 × 1440 VP9 WebM and H.264 MP4 at 24 fps. Reading pauses
repeat the exact frame, so this is an edited demonstration, not a measurement of
app or bridge latency.

Output goes to `node_modules/.cache/feature-demos` first. Only after every
requested capture succeeds does the script copy `mote-taskbar-flyout-demo.webm`,
`.mp4`, and the `.png` poster (the panel just after it opens) into
`public/product`. The script checks that Studio dims and Lounge turns off in the
app state and fails without publishing if they don't.

Inspect the exported video before accepting a new capture, for example by pulling
stills with `ffmpeg -ss <seconds> -i <video> -frames:v 1 still.png`. Run
`vp check`, `vp test run`, and `vp build` after updating the website assets.

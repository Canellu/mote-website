# Hero demonstration

`record-hero-demo.cjs` captures the actual sibling Mote Desktop frontend using
sample Hue resources. It demonstrates room dimming, scene application, individual
light color and white temperature, and returning home. No Hue hardware is
connected or controlled. The fixture acknowledges Tauri commands locally; the
app's own controls and optimistic updates produce the visible changes.

Start the sibling application's development server on port 1420, then run:

```sh
node scripts/record-hero-demo.cjs
```

The script needs Playwright, Chromium, and a full FFmpeg build with PNG decoding,
VP9 and H.264 encoding. Use the following environment variables when those tools
are installed outside this project's normal module search path:

- `PLAYWRIGHT_MODULE`: path to the Playwright package.
- `CHROMIUM_PATH`: path to the Chromium executable; otherwise Playwright's bundled browser.
- `FFMPEG_PATH`: path to FFmpeg; otherwise `ffmpeg` on PATH.
- `MOTE_URL`: defaults to `http://127.0.0.1:1420`.

The viewport is 960 × 1060 CSS pixels at 2.5× device scale. Lossless PNG frames
are encoded once to 2400 × 2650 VP9 WebM and H.264 MP4, at 24 fps. Static reading
pauses repeat the exact frame; cursor movements are sampled frame by frame.
This is an edited demonstration, not a measurement of app or bridge latency.
The pointer overlay is capture-only. The app's floating feedback button is hidden.

Successful captures replace the two `public/product/mote-hero-demo-hd` video
formats and the full-resolution PNG poster. Intermediate files, chapter stills,
and a duration/chapter manifest remain under `node_modules/.cache/hero-demo`.
The script verifies that dimming, the scene, and white temperature actually change
the sample light state, and does not replace the website assets on capture failure.

Inspect the exported video and its chapter stills before accepting a new capture.
Run `vp check`, `vp test run`, and `vp build` after updating the website assets.

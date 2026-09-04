import { useState, type CSSProperties } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ProductCapture } from "../components/product-capture";
import { pageHead } from "../lib/seo";

const scenes = [
  { name: "Focus", color: "#e7f06a", wash: "#776f32" },
  { name: "Golden hour", color: "#ffb342", wash: "#9b542d" },
  { name: "Sunset", color: "#ff7d6b", wash: "#82435f" },
  { name: "Aurora", color: "#71e0cf", wash: "#375c78" },
] as const;

const captures = [
  {
    src: "/product/mote-dashboard-dark.png",
    title: "Rooms and zones in one view",
    text: "Check power, color, and brightness from the dashboard, then adjust what you need.",
    alt: "Mote Desktop dashboard showing colorful Hue rooms and zones",
  },
  {
    src: "/product/mote-settings-theme-dark.png",
    title: "Set your preferences",
    text: "Choose the app appearance, feedback control, and window behavior.",
    alt: "Mote Desktop general settings with appearance and window behavior controls",
  },
  {
    src: "/product/mote-sync-box-dark.png",
    title: "Connect a Hue Sync Box",
    text: "Find a compatible Sync Box on your network, check its firmware, and select it in Mote.",
    alt: "Mote Desktop setup screen for choosing a Philips Hue Sync Box",
  },
] as const;

const widgetStories = [
  {
    src: "/product/mote-widget-profile-dark.png",
    title: "Name the widget",
    text: "Give each widget a name that is easy to recognize later.",
    alt: "Mote Desktop widget creation screen for naming a widget",
  },
  {
    src: "/product/mote-widget-controls-dark.png",
    title: "Add controls",
    text: "Combine rooms, zones, and individual lights in one widget.",
    alt: "Mote Desktop widget control picker with rooms, zones, and individual lights",
  },
  {
    src: "/product/mote-widget-configure-dark.png",
    title: "Set the layout",
    text: "Arrange the controls, choose the density and appearance, and preview the result.",
    alt: "Mote Desktop widget configuration with an appearance preview",
  },
] as const;

const deepDiveStories = [
  {
    src: "/product/mote-space-controls-dark.png",
    title: "Control a room",
    text: "Use scenes and individual light controls in the same view.",
    alt: "Mote Desktop room view with scene tiles, individual light controls, and a color inspector",
    width: 1402,
    height: 1122,
    presentation: "top",
  },
  {
    src: "/product/mote-scene-gallery-dark.png",
    title: "Browse scenes",
    text: "Preview and save Hue scenes.",
    alt: "Mote Desktop Hue scene gallery with colorful preset palettes",
    width: 1402,
    height: 1122,
    presentation: "center",
  },
  {
    src: "/product/mote-placement-screen-dark.png",
    title: "Map lights to the display",
    text: "Choose which part of the display each light follows.",
    alt: "Mote Desktop light placement screen showing display sampling regions",
    width: 1534,
    height: 1025,
    presentation: "center",
  },
  {
    src: "/product/mote-placement-room-dark.png",
    title: "Place lights in the room",
    text: "Position each light correctly within your entertainment area.",
    alt: "Mote Desktop three-dimensional room view for positioning entertainment lights",
    width: 1534,
    height: 1025,
    presentation: "center",
  },
] as const;

function BrandMark() {
  return (
    <span className="brand-bars" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function HeroShowcase() {
  return (
    <div className="hero-stage">
      <figure className="hero-product">
        <ProductCapture
          src="/product/mote-dashboard-dark.png"
          alt="Mote Desktop dashboard with colorful Hue room controls"
          priority
        />
        <figcaption>Hue Bridge · dashboard</figcaption>
      </figure>
    </div>
  );
}

function ScenePlayground() {
  const [scene, setScene] = useState<(typeof scenes)[number]>(scenes[0]);
  const [brightness, setBrightness] = useState(72);
  const [enabled, setEnabled] = useState(true);
  const style = {
    "--scene-color": scene.color,
    "--scene-wash": scene.wash,
    "--scene-level": `${enabled ? brightness : 0}%`,
  } as CSSProperties;

  return (
    <div className="scene-lab" style={style}>
      <div className="scene-lab__room" aria-hidden="true">
        <span className="room-glow" />
        <span className="room-window" />
        <span className="room-shelf" />
        <span className="room-strip-light" />
        <span className="room-desk" />
        <span className="room-monitor" />
        <span className="room-monitor room-monitor--second" />
        <span className="room-keyboard" />
        <span className="room-lamp" />
        <span className="room-floor-lamp" />
      </div>
      <div className="scene-lab__panel">
        <div className="scene-widget__master">
          <div className="scene-lab__topline">
            <div className="scene-lab__identity">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="12" rx="2" />
                <path d="M8 21h8M12 17v4M7 9h4M9 7v4" />
              </svg>
              <div>
                <strong>Workspace</strong>
                <span>{enabled ? scene.name : "Off"}</span>
              </div>
            </div>
            <button
              className="power-switch"
              type="button"
              role="switch"
              aria-checked={enabled}
              aria-label="Workspace lights"
              onClick={() => setEnabled((value) => !value)}
            >
              <span />
            </button>
          </div>
          <label className="brightness-control">
            <span className="sr-only">Brightness</span>
            <output>{enabled ? brightness : 0}%</output>
            <input
              type="range"
              min="1"
              max="100"
              value={brightness}
              disabled={!enabled}
              onChange={(event) => setBrightness(Number(event.currentTarget.value))}
            />
          </label>
        </div>
        <fieldset className="scene-picker">
          <legend>Scenes</legend>
          <div>
            {scenes.map((option) => (
              <button
                type="button"
                key={option.name}
                aria-pressed={scene.name === option.name}
                onClick={() => {
                  setScene(option);
                  setEnabled(true);
                }}
              >
                <i style={{ background: option.color }} aria-hidden="true" />
                <span>{option.name}</span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}

function WidgetShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = widgetStories[activeIndex];

  return (
    <section className="widget-showcase" aria-labelledby="widget-showcase-title">
      <div className="widget-showcase__intro">
        <h2 id="widget-showcase-title">Build a widget for the controls you use.</h2>
      </div>
      <div className="widget-showcase__layout">
        <figure className="widget-showcase__media" id="widget-showcase-media">
          <ProductCapture key={activeStory.src} src={activeStory.src} alt={activeStory.alt} />
        </figure>
        <div className="widget-showcase__choices" aria-label="Widget views">
          {widgetStories.map((story, index) => (
            <button
              type="button"
              key={story.src}
              aria-pressed={activeIndex === index}
              aria-controls="widget-showcase-media"
              onClick={() => setActiveIndex(index)}
            >
              <span>{story.title}</span>
              <small>{story.text}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeepDiveGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = deepDiveStories[activeIndex];

  return (
    <section className="deep-dive" aria-labelledby="deep-dive-title">
      <div className="deep-dive__intro">
        <h2 id="deep-dive-title">Control beyond the dashboard.</h2>
        <p>
          Open a room to control scenes and individual lights, or map an entertainment area for PC
          Sync.
        </p>
      </div>
      <figure
        className={`deep-dive__viewer deep-dive__viewer--${activeStory.presentation}`}
        id="deep-dive-viewer"
      >
        <ProductCapture
          key={activeStory.src}
          src={activeStory.src}
          alt={activeStory.alt}
          width={activeStory.width}
          height={activeStory.height}
        />
      </figure>
      <div className="deep-dive__choices" aria-label="Detailed product views">
        {deepDiveStories.map((story, index) => (
          <button
            type="button"
            key={story.src}
            aria-pressed={activeIndex === index}
            aria-controls="deep-dive-viewer"
            onClick={() => setActiveIndex(index)}
          >
            <span>{story.title}</span>
            <small>{story.text}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main id="main" className="home">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">Philips Hue controls on your desktop.</h1>
          <p>
            Mote Desktop keeps your lights, rooms, zones, and scenes available while you use your
            PC.
          </p>
          <div className="hero-actions">
            <Link className="primary-action" to="/features">
              View features
            </Link>
            <span>For Windows · Microsoft Store release coming soon</span>
          </div>
        </div>
        <HeroShowcase />
      </section>

      <section className="statement" aria-labelledby="statement-title">
        <div className="statement-copy">
          <h2 id="statement-title">Control the room without reaching for your phone.</h2>
          <p>
            Use the dashboard for an overview, or keep the controls you reach for most in a desktop
            widget beside your work.
          </p>
        </div>
        <figure className="statement-visual">
          <div className="statement-visual__desktop">
            <ProductCapture
              src="/product/mote-desktop-widgets.png"
              alt="A stack of colorful Mote Desktop widgets for rooms, scenes, and lights"
              width={360}
              height={760}
            />
          </div>
          <figcaption>
            <span aria-hidden="true" />
            Pinned on your desktop
          </figcaption>
        </figure>
      </section>

      <section className="playground-section" aria-labelledby="playground-title">
        <div className="playground-copy">
          <h2 id="playground-title">Try a Mote widget.</h2>
          <p>
            This interactive preview lets you switch the workspace on, change its brightness, and
            select a scene.
          </p>
          <span className="interaction-hint">Interactive preview</span>
        </div>
        <ScenePlayground />
      </section>

      <section className="captures-section" aria-labelledby="captures-title">
        <div className="captures-heading">
          <h2 id="captures-title">See how Mote works.</h2>
          <p>Explore the dashboard, app settings, and Hue Sync Box setup.</p>
        </div>
        <div className="capture-list">
          {captures.map((capture) => (
            <article className="capture-story" key={capture.src}>
              <div className="capture-story__copy">
                <h3>{capture.title}</h3>
                <p>{capture.text}</p>
              </div>
              <figure className="capture-frame">
                <ProductCapture src={capture.src} alt={capture.alt} />
              </figure>
            </article>
          ))}
        </div>
      </section>

      <DeepDiveGallery />

      <WidgetShowcase />

      <section className="final-section" aria-labelledby="final-title">
        <BrandMark />
        <h2 id="final-title">Mote Desktop for Windows.</h2>
        <p>Coming soon to the Microsoft Store.</p>
        <Link className="primary-action" to="/features">
          Compare Free and Pro
        </Link>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Mote Desktop — Philips Hue controls for Windows",
      description:
        "Control compatible Philips Hue lights, rooms, zones, and scenes from your Windows desktop.",
      path: "/",
    }),
  component: HomePage,
});

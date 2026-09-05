import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ProductCapture } from "../components/product-capture";
import { pageHead } from "../lib/seo";

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
    src: "/product/mote-bridge-dark.png",
    title: "Connect a bridge",
    text: "Choose a Hue Bridge Pro or classic Hue Bridge found on your network.",
    alt: "Mote Desktop setup screen with a selected Hue Bridge Pro beside a classic Hue Bridge",
  },
] as const;

const widgetStories = [
  {
    src: "/product/mote-widget-profile-dark.png",
    title: "Name the widget",
    text: "Give each widget a name that is easy to recognize later.",
    alt: "Mote Desktop widget creation screen for naming a widget",
    width: 960,
    height: 1061,
  },
  {
    src: "/product/mote-widget-controls-dark.png",
    title: "Add controls",
    text: "Combine rooms, zones, and individual lights in one widget.",
    alt: "Mote Desktop widget control picker with rooms, zones, and individual lights",
    width: 960,
    height: 1061,
  },
  {
    src: "/product/mote-widget-configure-dark.png",
    title: "Set the layout",
    text: "Arrange the controls, choose the density and appearance, and preview the result.",
    alt: "Mote Desktop widget configuration showing full and compact controls beside a live preview",
    width: 1025,
    height: 861,
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackPreferenceRef = useRef<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playback, setPlayback] = useState({ elapsed: 0, duration: 0 });

  const syncProgress = (video: HTMLVideoElement) => {
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    setPlayback({ elapsed: Math.min(video.currentTime, duration), duration });
  };
  const formatTime = (seconds: number) => {
    const whole = Math.floor(seconds);
    return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
  };
  const remaining = Math.max(0, Math.floor(playback.duration) - Math.floor(playback.elapsed));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Metadata can arrive before hydration, including when autoplay is disabled.
    const duration = Number.isFinite(video.duration) ? video.duration : 0;
    setPlayback({ elapsed: Math.min(video.currentTime, duration), duration });

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const syncPlayback = () => {
      const playbackPreference = playbackPreferenceRef.current;
      const shouldPlay =
        isVisible &&
        document.visibilityState === "visible" &&
        (playbackPreference === true || (playbackPreference === null && !motionPreference.matches));

      if (shouldPlay) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    motionPreference.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      playbackPreferenceRef.current = true;
      void video.play().catch(() => {
        playbackPreferenceRef.current = null;
      });
    } else {
      playbackPreferenceRef.current = false;
      video.pause();
    }
  };

  return (
    <div className="hero-stage">
      <figure className="hero-product">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/product/mote-hero-poster-hd.png?v=2"
          width={960}
          height={1060}
          aria-label="Mote Desktop demo: dim the Studio room, apply a scene, adjust the desk lamp's color and white temperature, and return to the dashboard"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={(event) => syncProgress(event.currentTarget)}
          onDurationChange={(event) => syncProgress(event.currentTarget)}
          onTimeUpdate={(event) => syncProgress(event.currentTarget)}
          onEmptied={() => setPlayback({ elapsed: 0, duration: 0 })}
          onClick={togglePlayback}
        >
          <source src="/product/mote-hero-demo-hd.webm?v=2" type="video/webm" />
          <source src="/product/mote-hero-demo-hd.mp4?v=2" type="video/mp4" />
        </video>
        <button
          className="hero-product__playback"
          type="button"
          aria-label={isPlaying ? "Pause dashboard demo" : "Play dashboard demo"}
          onClick={togglePlayback}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {isPlaying ? (
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            ) : (
              <path d="m8.5 5.5 9.5 6.5-9.5 6.5z" />
            )}
          </svg>
        </button>
        <figcaption className="hero-product__timeline">
          <div className="hero-product__timing" aria-hidden="true">
            <span>
              {formatTime(playback.elapsed)} /{" "}
              {playback.duration ? formatTime(playback.duration) : "–:––"}
            </span>
            <span className="hero-product__loop">
              {playback.duration ? `${formatTime(Math.ceil(remaining))} left` : "–:–– left"}
              <span className="hero-product__loop-label">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path d="m16 3 4 4-4 4M4 11V9a2 2 0 0 1 2-2h14M8 21l-4-4 4-4m12 0v2a2 2 0 0 1-2 2H4" />
                </svg>
                Loops
              </span>
            </span>
          </div>
          <progress
            className="hero-product__progress"
            max={playback.duration || 1}
            value={playback.elapsed}
            aria-label="Demo playback"
            aria-valuetext={
              playback.duration
                ? `${formatTime(playback.elapsed)} elapsed, ${formatTime(Math.ceil(remaining))} remaining. Video loops.`
                : "Loading video duration. Video loops."
            }
          />
        </figcaption>
      </figure>
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
        <p>Move through the three setup steps without losing sight of the result.</p>
      </div>
      <div className="widget-showcase__layout product-switcher">
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
        <figure className="widget-showcase__media" id="widget-showcase-media">
          <ProductCapture
            key={activeStory.src}
            src={activeStory.src}
            alt={activeStory.alt}
            width={activeStory.width}
            height={activeStory.height}
          />
        </figure>
      </div>
    </section>
  );
}

function CaptureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = captures[activeIndex];

  return (
    <section className="captures-section" aria-labelledby="captures-title">
      <div className="captures-heading">
        <h2 id="captures-title">See how Mote works.</h2>
        <p>Move between the dashboard, app settings, and Hue Bridge setup in one place.</p>
      </div>
      <div className="capture-switcher product-switcher">
        <div className="capture-switcher__choices" aria-label="Mote product views">
          {captures.map((story, index) => (
            <button
              type="button"
              key={story.src}
              aria-pressed={activeIndex === index}
              aria-controls="capture-switcher-media"
              onClick={() => setActiveIndex(index)}
            >
              <span>{story.title}</span>
              <small>{story.text}</small>
            </button>
          ))}
        </div>
        <figure className="capture-switcher__media" id="capture-switcher-media">
          <ProductCapture key={activeStory.src} src={activeStory.src} alt={activeStory.alt} />
        </figure>
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
      <div className="deep-dive__layout product-switcher">
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
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main id="main" className="home">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title">Philips Hue controls on your desktop.</h1>
            <p>
              Mote Desktop keeps your lights, rooms, zones, and scenes available while you use your
              PC.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" to="/features">
                Compare Free &amp; Pro
              </Link>
              <span>For Windows · Microsoft Store release coming soon</span>
            </div>
          </div>
          <HeroShowcase />
        </div>
      </section>

      <section className="statement" aria-labelledby="statement-title">
        <div className="statement-copy">
          <h2 id="statement-title">Control the room without reaching for your phone.</h2>
          <p>
            Use the dashboard for an overview, or keep your most-used controls in a desktop widget
            beside your work.
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

      <div className="future-interaction" aria-hidden="true" />

      <CaptureShowcase />

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

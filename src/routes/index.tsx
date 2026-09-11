/**
 * The homepage: hero demo, what the app does, what PC Sync does, and the store.
 *
 * Its styles live in src/home.css rather than the shared stylesheet, linked
 * from this route's head — the page carries a whole visual language (its own
 * tokens, reveals and stage shapes) that no other route uses.
 */
import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ProductCapture } from "../components/product-capture";
import { pageHead, softwareApplicationJsonLd } from "../lib/seo";
import { storeUrl } from "../lib/links";
import homeStyles from "../home.css?url";

// One chapter proving Mote is a complete Hue client, rather than two that made
// the same point with the same switcher.
const captures = [
  {
    src: "/product/mote-dashboard-dark.png",
    title: "Dashboard",
    text: "Check power, color, and brightness across every room and zone, then adjust what you need.",
    alt: "Mote Desktop dashboard showing colorful Hue rooms and zones",
    width: 960,
    height: 1061,
  },
  {
    src: "/product/mote-space-controls-dark.png",
    title: "Room controls",
    text: "Open a room for its scenes and each light in it, in the same view.",
    alt: "Mote Desktop room view with scene tiles, individual light controls, and a color inspector",
    width: 1402,
    height: 1122,
  },
  {
    src: "/product/mote-scene-gallery-dark.png",
    title: "Scenes",
    text: "Preview a Hue scene live, then save the one you want.",
    alt: "Mote Desktop Hue scene gallery with colorful preset palettes",
    width: 1402,
    height: 1122,
  },
] as const;

// The section's own argument, in the order the intro makes it: the two things
// that can drive an entertainment area, and then where the lights it drives
// actually sit. Every tile is a view, so every tile behaves the same way — an
// earlier third tile linked out to the features page instead, which broke the
// section open right where the reader was still reading it.
const syncViews = [
  {
    src: "/product/mote-sync-this-pc-dark.png",
    title: "Sync with this PC",
    text: "Follow a display with Video, Games, or Music, then set the intensity and how bright the synced lights get.",
    alt: "Mote Desktop PC Sync screen with Video, Games, and Music styles and an intensity control",
    width: 988,
    height: 1107,
  },
  {
    src: "/product/mote-sync-hdmi-box-dark.png",
    title: "Sync Box",
    text: "Hand the same entertainment area to a Hue Play HDMI Sync Box, then choose the HDMI source it follows.",
    alt: "Mote Desktop Sync Box screen showing HDMI sources and sync style controls",
    width: 989,
    height: 1108,
  },
  {
    src: "/product/mote-sync-placement-room-dark.png",
    title: "3D room",
    text: "Position each light of the entertainment area in a model of the space, so the sync knows which light is where.",
    alt: "Mote Desktop three-dimensional room view for positioning entertainment lights",
    width: 1301,
    height: 1119,
  },
] as const;

/*
 * The first thing the page paints, and until now it was a 766 KB PNG for a
 * frame that is never wider than about 800 CSS pixels. WebP rather than the
 * smaller AVIF because a poster has no fallback mechanism at all: whatever this
 * names is what the reader gets or does not get, and WebP is understood by
 * every browser that can play the sources beneath it. Preloaded from the route
 * head, since the browser cannot see a poster attribute until it has parsed the
 * video element.
 */
const HERO_POSTER = "/product/derived/mote-hero-poster-hd-1440.webp";

// Shared by the two sync sections below, which are the same section at two
// widths.
const SYNC_TITLE = "Light that follows what is on screen.";
const SYNC_INTRO =
  "PC Sync, a Mote Pro feature, drives a compatible entertainment area from your display. A Hue Play HDMI Sync Box can drive the same area instead, in Free and Mote Pro.";

function HeroMedia() {
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
    syncProgress(video);

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
    <div className="cx-hero-stage cx-reveal">
      <figure className="cx-hero-product">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
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
          className="cx-hero-product__playback"
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
        <figcaption className="cx-hero-product__timeline">
          <div className="cx-hero-product__timing" aria-hidden="true">
            <span>
              {formatTime(playback.elapsed)} /{" "}
              {playback.duration ? formatTime(playback.duration) : "–:––"}
            </span>
            <span className="cx-hero-product__loop">
              {playback.duration ? `${formatTime(Math.ceil(remaining))} left` : "–:–– left"}
              <span className="cx-hero-product__loop-label">
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
            className="cx-hero-product__progress"
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

function ChevronIcon({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={back ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
    </svg>
  );
}

/**
 * How far the track has to be scrolled for `card` to sit at the start of the
 * scrollport. The track carries left padding so the cards' shadows have room
 * to spill past their own edges; that padding has to come back out of the
 * offset, or every card would land one bleed too far left.
 */
function cardOffset(track: HTMLElement, card: HTMLElement) {
  const bleed = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
  return card.offsetLeft - track.offsetLeft - bleed;
}

const SLIDE_MS = 5200;
/** How long one slide takes to travel. Long and eased, not a snap. */
const SLIDE_EASE_MS = 900;

interface CarouselItem {
  readonly alt: string;
  readonly height?: number;
  readonly src: string;
  readonly text: string;
  readonly title: string;
  readonly width?: number;
}

interface CarouselProps {
  /** Advances on its own, with a filling progress indicator and a pause control. */
  autoplay?: boolean;
  /** Appended to the section, for the pair that swap places by width. */
  className?: string;
  headingId: string;
  intro: string;
  items: readonly CarouselItem[];
  label: string;
  title: string;
}

/**
 * A horizontal, snap-scrolling track. The scrolling itself is native, so touch,
 * trackpad and keyboard all work without JS; the controls only drive scrollTo,
 * and an observer reads back which card actually landed. That keeps the
 * indicator honest even when the reader swipes past the controls entirely.
 */
function Carousel({
  autoplay = false,
  className = "",
  headingId,
  intro,
  items,
  label,
  title,
}: CarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  // atStart/atEnd come from scroll position, not from the index: the last card
  // cannot always align to the left edge, so an index-based "is last" would
  // leave Next enabled while the track has nothing left to scroll.
  const [nav, setNav] = useState({ atEnd: false, atStart: true, index: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const frameRef = useRef(0);
  // What is left of the current slide's time, and when the run began. A pause
  // banks the remainder so play resumes where it stopped rather than starting
  // the slide's clock over.
  const remainingRef = useRef(SLIDE_MS);
  const startedAtRef = useRef(0);
  const active = nav.index;

  activeRef.current = active;

  const stopGlide = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
  };

  /**
   * scrollTo({behavior:"smooth"}) uses the browser's own curve and duration,
   * which lands too abruptly for a slide this large. This drives scrollLeft
   * directly so the easing and the timing are ours. Snapping is suspended for
   * the duration, otherwise mandatory snap fights the frame-by-frame writes.
   */
  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;

    stopGlide();
    const to = cardOffset(track, card);
    const from = track.scrollLeft;

    if (Math.abs(to - from) < 1) {
      track.style.scrollSnapType = "";
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.scrollLeft = to;
      track.style.scrollSnapType = "";
      return;
    }

    track.style.scrollSnapType = "none";
    const started = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - started) / SLIDE_EASE_MS);
      const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      track.scrollLeft = from + (to - from) * eased;

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = 0;
        track.style.scrollSnapType = "";
      }
    };

    frameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => stopGlide, []);

  /*
   * Cards past the first sit outside the track's own viewport, so lazy loading
   * never fires for them until they are scrolled to — and autoplay would then
   * advance onto a blank card. Once the section is near, load the whole set.
   * Eagerly, but not at high priority: the set is wanted before the reader
   * reaches it, not ahead of whatever the page is still painting.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Read the landed card back out of the track rather than assuming it. This is
  // measured from scroll offset, not intersection: with several cards visible at
  // once, "is intersecting" is true for two or three of them at a time and gives
  // no single answer, whereas the card nearest the scroll origin always does.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length === 0) return;

      let nearest = 0;
      let shortest = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const distance = Math.abs(cardOffset(track, card) - track.scrollLeft);
        if (distance < shortest) {
          shortest = distance;
          nearest = index;
        }
      });

      const furthest = track.scrollWidth - track.clientWidth;
      setNav({
        atEnd: track.scrollLeft >= furthest - 1,
        atStart: track.scrollLeft <= 1,
        index: nearest,
      });
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(read);
    };

    read();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Autoplay only while on screen, on a visible tab, and not under reduced
  // motion — and never once the reader has taken control.
  useEffect(() => {
    if (!autoplay) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;

    const sync = () => {
      setIsPlaying(
        inView &&
          document.visibilityState === "visible" &&
          !motion.matches &&
          !userPaused &&
          !isHovered,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [autoplay, userPaused, isHovered]);

  // Declared before the timer below so that on a slide change the ordering is:
  // the timer's cleanup banks its remainder, this resets the budget, and only
  // then does the timer start again — on a full slide rather than a leftover.
  useEffect(() => {
    remainingRef.current = SLIDE_MS;
  }, [active]);

  // A timeout over what remains, not a fixed interval: pausing (hover, off
  // screen, the play control) has to hold the slide's clock where it is, and an
  // interval would silently restart it from a full slide on every resume.
  useEffect(() => {
    if (!isPlaying) return;

    startedAtRef.current = performance.now();
    const id = setTimeout(() => {
      remainingRef.current = SLIDE_MS;
      goTo((activeRef.current + 1) % items.length);
    }, remainingRef.current);

    return () => {
      clearTimeout(id);
      const spent = performance.now() - startedAtRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - spent);
    };
  }, [isPlaying, active, items.length]);

  const takeControl = (index: number) => {
    setUserPaused(true);
    goTo(index);
  };

  return (
    <section
      className={`cx-carousel cx-shell cx-reveal cx-reveal--group${autoplay ? " cx-carousel--wide" : ""}${className ? ` ${className}` : ""}`}
      aria-labelledby={headingId}
      ref={sectionRef}
      // The progress fill is timed from the same constant as the timer, so the
      // bar cannot drift out of step with the actual advance.
      style={{ "--cx-slide": `${SLIDE_MS}ms` } as React.CSSProperties}
    >
      <div className="cx-carousel__head">
        <div className="cx-section-head">
          <h2 id={headingId}>{title}</h2>
          <p>{intro}</p>
        </div>

        <div className="cx-carousel__controls">
          {autoplay && (
            <>
              <div className="cx-carousel__dots">
                {items.map((item, index) => (
                  <button
                    type="button"
                    key={item.src}
                    aria-label={`Show ${item.title}`}
                    aria-current={index === active}
                    onClick={() => takeControl(index)}
                  >
                    {index === active && (
                      // Keyed on the slide alone. Keying on isPlaying as well
                      // remounted the fill on every pause, restarting it from
                      // empty instead of holding it where the reader left it.
                      <i
                        key={active}
                        style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
              <button
                className="cx-carousel__play"
                type="button"
                aria-label={isPlaying ? `Pause ${label}` : `Play ${label}`}
                onClick={() => setUserPaused((paused) => !paused)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {isPlaying ? (
                    <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
                  ) : (
                    <path d="m9 5.5 9 6.5-9 6.5z" />
                  )}
                </svg>
              </button>
            </>
          )}
          <button
            className="cx-carousel__step"
            type="button"
            aria-label={`Previous ${label}`}
            disabled={nav.atStart}
            onClick={() => takeControl(active - 1)}
          >
            <ChevronIcon back />
          </button>
          <button
            className="cx-carousel__step"
            type="button"
            aria-label={`Next ${label}`}
            disabled={nav.atEnd}
            onClick={() => takeControl(active + 1)}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>

      <div
        className="cx-carousel__track"
        ref={trackRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        onPointerEnter={
          autoplay
            ? (event) => {
                if (event.pointerType === "mouse") setIsHovered(true);
              }
            : undefined
        }
        onPointerLeave={
          autoplay
            ? (event) => {
                if (event.pointerType === "mouse") setIsHovered(false);
              }
            : undefined
        }
      >
        {items.map((item) => (
          <figure key={item.src}>
            <div className="cx-carousel__media">
              <ProductCapture
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                load={hasEntered ? "eager" : "lazy"}
                sizes="(min-width: 62rem) 54vw, 86vw"
              />
            </div>
            <figcaption>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/**
 * Stacked choices on the left, one capture on the right. The capture is
 * deliberately cropped — sized to the stage's width and anchored to the top, so
 * the window's lower half runs out of the frame and the controls that matter
 * sit large and legible instead of shrunk to fit.
 */
type SwitcherProps = Omit<CarouselProps, "autoplay">;

function Switcher({ className = "", headingId, intro, items, label, title }: SwitcherProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];
  const mediaId = `${headingId}-media`;

  return (
    <section
      className={`cx-switcher cx-shell cx-reveal${className ? ` ${className}` : ""}`}
      aria-labelledby={headingId}
    >
      <div className="cx-section-head">
        <h2 id={headingId}>{title}</h2>
        <p>{intro}</p>
      </div>

      <div className="cx-switcher__layout">
        <div className="cx-switcher__choices" aria-label={label}>
          {items.map((item, index) => (
            <button
              type="button"
              key={item.src}
              aria-pressed={activeIndex === index}
              aria-controls={mediaId}
              onClick={() => setActiveIndex(index)}
            >
              <span>{item.title}</span>
              <small>{item.text}</small>
            </button>
          ))}
        </div>

        <figure className="cx-switcher__media" id={mediaId}>
          <ProductCapture
            key={active.src}
            src={active.src}
            alt={active.alt}
            width={active.width}
            height={active.height}
            sizes="(min-width: 62rem) 52vw, 86vw"
          />
        </figure>
      </div>
    </section>
  );
}

function HomePage() {
  const pageRef = useRef<HTMLElement>(null);

  // Reveal-on-scroll is opt-in from JS so the page renders fully visible
  // without it (server-render, no-JS, or a failed hydration).
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const targets = Array.from(page.querySelectorAll<HTMLElement>(".cx-reveal"));
    page.dataset.reveal = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main" className="home-page" ref={pageRef}>
      <section className="cx-hero" aria-labelledby="cx-hero-title">
        <div className="cx-hero__layout">
          <div className="cx-hero__copy">
            <h1 className="cx-reveal" id="cx-hero-title">
              Philips Hue controls on your desktop.
            </h1>
            <p className="cx-reveal">
              Mote Desktop keeps your lights, rooms, zones, and scenes available while you use your
              PC.
            </p>
            <div className="cx-hero-actions cx-reveal">
              <a className="cx-button" href={storeUrl("web-hero")} target="_blank" rel="noreferrer">
                Get Mote Free
              </a>
              <Link className="cx-button cx-button--quiet" to="/features">
                See all features
              </Link>
              <span>
                <span>On the Microsoft Store ·</span> <span>For Windows 10 and 11</span>
              </span>
            </div>
          </div>
          <HeroMedia />
        </div>
      </section>

      <section className="cx-statement cx-shell cx-reveal" aria-labelledby="cx-statement-title">
        <div className="cx-section-head">
          <h2 id="cx-statement-title">Control the room from a desktop widget, not your phone.</h2>
          <p>
            Build a widget from the rooms, zones, and lights you actually use, then keep it pinned
            beside your work.
          </p>
        </div>
        <figure className="cx-statement-visual">
          <ProductCapture
            src="/product/mote-widget-stack-dark.png"
            alt="A stack of colorful Mote Desktop widgets for rooms, scenes, and lights"
            width={401}
            height={702}
            sizes="401px"
          />
          <figcaption>
            <i aria-hidden="true" />
            Pinned on your desktop
          </figcaption>
        </figure>
      </section>

      <Carousel
        autoplay
        headingId="cx-captures-title"
        title="From the dashboard into any room."
        intro="See every room and zone at a glance, then open one for its scenes and individual lights."
        label="Mote product views"
        items={captures}
      />

      {/*
        The same three views, twice: the switcher on a wide screen, and on a
        phone the carousel the section above uses. Stacked, the switcher asks
        the reader to tie a sideways strip of choices to a stage above it,
        which on a phone shows one and a half cut-off choices and no stage
        wide enough to answer them. Only one of the two is ever displayed —
        see .cx-sync--compact in home.css — and both draw the same captures,
        so the hidden one costs no extra bytes.
      */}
      <Switcher
        className="cx-sync--wide"
        headingId="cx-sync-title"
        title={SYNC_TITLE}
        intro={SYNC_INTRO}
        label="PC Sync views"
        items={syncViews}
      />
      <Carousel
        className="cx-sync--compact"
        headingId="cx-sync-title-compact"
        title={SYNC_TITLE}
        intro={SYNC_INTRO}
        label="PC Sync views"
        items={syncViews}
      />
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () => {
    const head = pageHead({
      title: "Mote Desktop — Philips Hue controls for Windows",
      description:
        "Control compatible Philips Hue lights, rooms, zones, and scenes from your Windows desktop. Free on the Microsoft Store.",
      path: "/",
      jsonLd: softwareApplicationJsonLd(),
    });

    return {
      ...head,
      links: [
        ...head.links,
        { rel: "stylesheet", href: homeStyles },
        {
          rel: "preload",
          as: "image",
          href: HERO_POSTER,
          type: "image/webp",
          fetchPriority: "high",
        },
      ],
    };
  },
  component: HomePage,
});

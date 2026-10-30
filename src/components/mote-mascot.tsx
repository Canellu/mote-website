import { useEffect, useRef, useState } from "react";

type MascotStyle = "cel-shaded" | "low-poly" | "pixel-art" | "paper-cutout" | "watercolor";
type Animation = "bob" | "flutter" | "blink" | "breathe";

// The desktop app's six-column atlas and exact frame timings.
const animations: Record<Animation, { start: number; durations: number[] }> = {
  bob: { start: 0, durations: Array(12).fill(110) },
  flutter: { start: 12, durations: Array(12).fill(60) },
  blink: { start: 24, durations: [30, 20, 20, 20, 20, 50, 50, 25, 25, 25, 25, 30] },
  breathe: { start: 36, durations: [350, 240, 220, 220, 240, 300, 300, 240, 220, 220, 240, 350] },
};

export function MoteMascot({
  style = "cel-shaded",
  label = "Play with Mote's moth",
  className = "",
}: {
  style?: MascotStyle;
  label?: string;
  className?: string;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const lastActivation = useRef(0);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [loadedStyle, setLoadedStyle] = useState<MascotStyle | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activation, setActivation] = useState(0);
  const [frame, setFrame] = useState(36);
  const ready = loadedStyle === style;
  const engaged = hovered || focused;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(motion.matches);
    const syncVisibility = () => setVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (button.current) observer.observe(button.current);
    syncMotion();
    syncVisibility();
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!inView || ready) return;
    let canceled = false;
    const image = new Image();
    image.onload = () => {
      if (!canceled) setLoadedStyle(style);
    };
    image.src = `/mascot/moth-${style}-sheet.webp`;
    return () => {
      canceled = true;
    };
  }, [inView, ready, style]);

  useEffect(() => {
    if (!ready || !inView || !visible || reducedMotion) return;
    let timer: number;
    let animation: Animation =
      activation !== lastActivation.current ? "bob" : engaged ? "flutter" : "breathe";
    lastActivation.current = activation;
    let index = 0;
    const step = () => {
      const current = animations[animation];
      setFrame(current.start + index);
      timer = window.setTimeout(() => {
        index += 1;
        if (index < current.durations.length) return step();
        index = 0;
        if (animation === "breathe") animation = "blink";
        else if (animation === "blink") {
          setFrame(36);
          return;
        } else animation = engaged ? "flutter" : "breathe";
        step();
      }, current.durations[index]);
    };
    step();
    return () => window.clearTimeout(timer);
  }, [activation, engaged, inView, ready, reducedMotion, visible]);

  const shown = reducedMotion || !inView || !visible ? 36 : frame;
  return (
    <button
      ref={button}
      type="button"
      className={`mote-mascot ${className}`}
      aria-label={label}
      data-engaged={engaged || undefined}
      data-style={style}
      data-frame={ready ? shown : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => setActivation((value) => value + 1)}
    >
      {ready ? (
        <span
          className="mote-mascot__sprite"
          aria-hidden="true"
          style={{
            backgroundImage: `url(/mascot/moth-${style}-sheet.webp)`,
            backgroundPosition: `${((shown % 6) / 5) * 100}% ${(Math.floor(shown / 6) / 7) * 100}%`,
          }}
        />
      ) : (
        <img src={`/mascot/moth-${style}.webp`} width={256} height={256} alt="" loading="lazy" />
      )}
    </button>
  );
}

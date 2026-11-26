import { useEffect, useRef } from "react";

type LoopingDemoProps = {
  /** Path without extension; the `.webm` and `.mp4` encodes sit beside it. */
  src: string;
  /** Still shown before playback and under reduced motion. */
  poster: string;
  label: string;
  width: number;
  height: number;
};

/**
 * A short silent clip of the real app that loops like a GIF, at a fraction of
 * a GIF's size. It plays only while on screen, and holds on its poster for
 * readers who ask for reduced motion.
 */
export function LoopingDemo({ src, poster, label, width, height }: LoopingDemoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const sync = () => {
      if (isVisible && !reducedMotion.matches && document.visibilityState === "visible") {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="looping-demo"
      aria-label={label}
      width={width}
      height={height}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

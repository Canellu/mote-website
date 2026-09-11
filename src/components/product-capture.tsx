import { captureSrcSet } from "../lib/capture-variants";

type ProductCaptureProps = {
  src: string;
  alt: string;
  /**
   * How wide the capture paints, written the way the browser needs it: a list
   * of media conditions and the resulting width. It has no default because
   * every stage on this site frames its captures differently, and a wrong guess
   * here is silently paid for in bytes.
   */
  sizes: string;
  width?: number;
  height?: number;
  /**
   * `lazy` waits for the capture to approach the viewport. `eager` fetches it
   * now but at ordinary priority — for stages like the carousel, whose later
   * cards sit outside their own scroller and would never trip a lazy load, yet
   * have no claim on the bandwidth the page's first paint wants. `priority` is
   * for the capture that *is* the first paint, and there is at most one.
   */
  load?: "lazy" | "eager" | "priority";
};

/**
 * A real Mote screen, served in the smallest format the reader's browser
 * understands at roughly the size it will be painted.
 *
 * The PNG stays on the `<img>` as the address of record — it is the file
 * PROVENANCE.md accounts for, and the one thing that works with no `<picture>`
 * support at all — but in practice nothing downloads it. AVIF is offered first
 * and takes these dense interface captures down by around 95%, WebP catches
 * everything a little older.
 */
export function ProductCapture({
  src,
  alt,
  sizes,
  width = 960,
  height = 1061,
  load = "lazy",
}: ProductCaptureProps) {
  const loading = load === "lazy" ? "lazy" : "eager";
  const fetchPriority = load === "priority" ? "high" : "auto";

  return (
    <picture>
      <source type="image/avif" srcSet={captureSrcSet(src, width, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={captureSrcSet(src, width, "webp")} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}

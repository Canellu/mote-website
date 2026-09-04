type ProductCaptureProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function ProductCapture({
  src,
  alt,
  width = 960,
  height = 1061,
  priority = false,
}: ProductCaptureProps) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
    />
  );
}

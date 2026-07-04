"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Blur-up image: shows the tiny base64 preview (stretched + blurred) as a
 * background until the full image finishes loading, then unblurs.
 * If the image fails to load, renders `fallback` instead (or nothing).
 */
export default function BlurImage({
  src,
  alt,
  blur,
  className,
  fallback,
  onError,
}: {
  src: string;
  alt: string;
  blur?: string;
  className?: string;
  fallback?: React.ReactNode;
  onError?: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  // Cached images may complete before hydration and never fire onLoad/onError.
  const onRef = useCallback((img: HTMLImageElement | null) => {
    if (!img?.complete) return;
    if (img.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setFailed(true);
      onErrorRef.current?.();
    }
  }, []);

  if (failed) return <>{fallback ?? null}</>;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={onRef}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        setFailed(true);
        onError?.();
      }}
      className={`img-blur-up ${loaded ? "" : "img-loading"} ${className ?? ""}`}
      style={
        blur && !loaded
          ? {
              backgroundImage: `url(${blur})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    />
  );
}

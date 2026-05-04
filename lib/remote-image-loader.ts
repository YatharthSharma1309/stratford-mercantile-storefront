import type { ImageLoaderProps } from "next/image";

/**
 * Skip Next's `_next/image` proxy for known remote hosts so the browser loads the CDN directly.
 * Avoids dev-time "upstream image response failed" when the optimizer cannot reach Unsplash.
 */
export function remoteProductImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("/")) return src;
  try {
    const u = new URL(src);
    if (u.hostname === "images.unsplash.com") {
      u.searchParams.set("w", String(Math.min(Math.max(width, 1), 1920)));
      u.searchParams.set("q", String(quality ?? 82));
      return u.toString();
    }
    if (u.hostname === "picsum.photos" || u.hostname === "fastly.picsum.photos") {
      return src;
    }
  } catch {
    /* invalid URL */
  }
  return src;
}

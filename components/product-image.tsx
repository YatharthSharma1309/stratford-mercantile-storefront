"use client";

import Image, { type ImageProps } from "next/image";
import { remoteProductImageLoader } from "@/lib/remote-image-loader";

/** Remote CDN URLs load in the browser (custom loader) so images don’t depend on Next’s optimizer fetch to Unsplash. */
export function ProductImage(props: Omit<ImageProps, "loader">) {
  return <Image {...props} loader={remoteProductImageLoader} />;
}

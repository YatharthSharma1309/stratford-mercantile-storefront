import type { ProductKind } from "./types";

export interface ProductMedia {
  image: string;
  productKind: ProductKind;
}

export const PRODUCT_KIND_LABELS: Record<ProductKind, string> = {
  headphones: "Over-ear headphones",
  "action-camera": "Action camera",
  smartwatch: "Smartwatch",
  "mechanical-keyboard": "Mechanical keyboard",
  "true-wireless-earbuds": "True wireless earbuds",
  "office-chair": "Office seating",
  "adjustable-dumbbells": "Strength training",
  "leather-bag": "Leather carry",
  "smart-home-hub": "Smart home hub",
  "yoga-mat": "Yoga & mobility",
  "portable-speaker": "Portable speaker",
  sunglasses: "Eyewear",
  "espresso-machine": "Espresso appliance",
  "resistance-bands": "Resistance training",
  "usb-microphone": "USB microphone",
  "desk-lamp": "Desk lighting",
  "fitness-tracker": "Fitness tracker",
  "slim-wallet": "Wallet",
  webcam: "Webcam",
  "insulated-bottle": "Hydration",
};

const q = "auto=format&fit=crop&w=900&h=900&q=82";

/** Hostnames used for Unsplash photo *pages* (`/photos/…`). Those URLs are HTML, not image files, and are blocked by `next/image` + `remotePatterns`. */
const UNSPLASH_PAGE_HOSTS = new Set(["unsplash.com", "www.unsplash.com"]);

/**
 * Ensures `src` is suitable for `next/image`. Gallery links like `https://unsplash.com/photos/…`
 * fail at runtime with: `hostname "unsplash.com" is not configured under images in your config`.
 * Fix: use `https://images.unsplash.com/photo-…?auto=format&fit=crop&w=900&h=900&q=82` (from “Copy image link” / download on Unsplash).
 */
export function assertNextImageRemoteUrl(url: string): void {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    throw new Error(`Invalid product image URL (not a valid URL): ${url}`);
  }
  if (UNSPLASH_PAGE_HOSTS.has(host)) {
    throw new Error(
      `Use the CDN image URL (images.unsplash.com), not the gallery page (${host}). On Unsplash: open the photo → Download or right‑click → copy image / image address → must look like https://images.unsplash.com/photo-…`
    );
  }
}

/** Full URLs keyed by catalog id (`p001` … `p020`). Use `images.unsplash.com` only — `unsplash.com/photos/…` breaks `next/image`. */
export const PRODUCT_MEDIA: Record<string, ProductMedia> = {
  p001: {
    productKind: "headphones",
    image: `https://images.unsplash.com/photo-1484704849700-f032a568e944?${q}`,
  },
  p002: {
    productKind: "action-camera",
    image: `https://images.unsplash.com/photo-1516035069371-29a1b244cc32?${q}`,
  },
  p003: {
    productKind: "smartwatch",
    image: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?${q}`,
  },
  p004: {
    productKind: "mechanical-keyboard",
    image: `https://images.unsplash.com/photo-1587829741301-dc798b83add3?${q}`,
  },
  p005: {
    productKind: "true-wireless-earbuds",
    image: `https://images.unsplash.com/photo-1590658268037-6bf12165a8df?${q}`,
  },
  p006: {
    productKind: "office-chair",
    image: `https://images.unsplash.com/photo-1505843513577-22bb7d21e455?${q}`,
  },
  p007: {
    productKind: "adjustable-dumbbells",
    image: `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?${q}`,
  },
  p008: {
    productKind: "leather-bag",
    image: `https://images.unsplash.com/photo-1548036328-c9fa89d128fa?${q}`,
  },
  p009: {
    productKind: "smart-home-hub",
    image: `https://images.unsplash.com/photo-1558002038-1055907df827?${q}`,
  },
  p010: {
    productKind: "yoga-mat",
    image: `https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?${q}`,
  },
  p011: {
    productKind: "portable-speaker",
    image: `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?${q}`,
  },
  p012: {
    productKind: "sunglasses",
    image: `https://images.unsplash.com/photo-1572635196237-14b3f281503f?${q}`,
  },
  p013: {
    productKind: "espresso-machine",
    image: `https://images.unsplash.com/photo-1509042239860-f550ce710b93?${q}`,
  },
  p014: {
    productKind: "resistance-bands",
    image: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?${q}`,
  },
  p015: {
    productKind: "usb-microphone",
    image: `https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?${q}`,
  },
  p016: {
    productKind: "desk-lamp",
    image: `https://images.unsplash.com/photo-1507473885765-e6ed057f782c?${q}`,
  },
  p017: {
    productKind: "fitness-tracker",
    image: `https://images.unsplash.com/photo-1579586337278-3befd40fd17a?${q}`,
  },
  p018: {
    productKind: "slim-wallet",
    image: `https://images.unsplash.com/photo-1627123424574-724758594e93?${q}`,
  },
  p019: {
    productKind: "webcam",
    image: `https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?${q}`,
  },
  p020: {
    productKind: "insulated-bottle",
    image: `https://images.unsplash.com/photo-1602143407151-7111542de6e8?${q}`,
  },
};

export function mediaForProductId(id: string): ProductMedia {
  const m = PRODUCT_MEDIA[id];
  if (!m) {
    throw new Error(`Missing PRODUCT_MEDIA entry for ${id}`);
  }
  assertNextImageRemoteUrl(m.image);
  return m;
}

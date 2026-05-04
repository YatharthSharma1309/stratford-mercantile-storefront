export type Category =
  | "electronics"
  | "audio"
  | "wearables"
  | "home"
  | "fitness"
  | "accessories";

/** Merchandising / visual family — distinct from store `category` navigation. */
export type ProductKind =
  | "headphones"
  | "action-camera"
  | "smartwatch"
  | "mechanical-keyboard"
  | "true-wireless-earbuds"
  | "office-chair"
  | "adjustable-dumbbells"
  | "leather-bag"
  | "smart-home-hub"
  | "yoga-mat"
  | "portable-speaker"
  | "sunglasses"
  | "espresso-machine"
  | "resistance-bands"
  | "usb-microphone"
  | "desk-lamp"
  | "fitness-tracker"
  | "slim-wallet"
  | "webcam"
  | "insulated-bottle";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents to avoid float issues
  category: Category;
  /** Product family label for badges — sourced from `product-media.ts`. */
  productKind: ProductKind;
  rating: number; // 0–5
  reviewCount: number;
  image: string; // URL
  inStock: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

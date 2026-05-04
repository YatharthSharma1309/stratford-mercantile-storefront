import type { Product } from "./types";
import { mediaForProductId } from "./product-media";

type ProductSeed = Omit<Product, "image" | "productKind">;

const seeds: ProductSeed[] = [
  {
    id: "p001",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 40-hour battery, and studio-grade sound.",
    price: 29900,
    category: "audio",
    rating: 4.7,
    reviewCount: 1284,
    inStock: true,
  },
  {
    id: "p002",
    name: "4K Ultra HD Action Camera",
    description:
      "Waterproof to 30m, 4K/60fps recording, built-in stabilization. Perfect for adventure.",
    price: 24900,
    category: "electronics",
    rating: 4.5,
    reviewCount: 642,
    inStock: true,
  },
  {
    id: "p003",
    name: "Smart Fitness Watch Pro",
    description:
      "Track heart rate, sleep, GPS routes, and 100+ sports modes. 14-day battery life.",
    price: 19900,
    category: "wearables",
    rating: 4.6,
    reviewCount: 2103,
    inStock: true,
  },
  {
    id: "p004",
    name: "Mechanical Keyboard RGB",
    description:
      "Hot-swappable switches, per-key RGB, aluminum frame. Tactile and built to last.",
    price: 13900,
    category: "electronics",
    rating: 4.8,
    reviewCount: 891,
    inStock: true,
  },
  {
    id: "p005",
    name: "Wireless Earbuds Mini",
    description:
      "True wireless earbuds with ANC, 30-hour total battery, and IPX5 water resistance.",
    price: 11900,
    category: "audio",
    rating: 4.4,
    reviewCount: 3421,
    inStock: true,
  },
  {
    id: "p006",
    name: "Ergonomic Office Chair",
    description:
      "Mesh back, lumbar support, adjustable armrests. Built for 8+ hour workdays.",
    price: 39900,
    category: "home",
    rating: 4.5,
    reviewCount: 412,
    inStock: true,
  },
  {
    id: "p007",
    name: "Adjustable Dumbbell Set",
    description:
      "5-52.5 lb adjustable in 2.5 lb increments. Replaces 15 pairs of dumbbells.",
    price: 34900,
    category: "fitness",
    rating: 4.7,
    reviewCount: 728,
    inStock: true,
  },
  {
    id: "p008",
    name: "Leather Crossbody Bag",
    description:
      "Full-grain Italian leather, brass hardware, fits a 13\" laptop. Ages beautifully.",
    price: 17900,
    category: "accessories",
    rating: 4.6,
    reviewCount: 234,
    inStock: true,
  },
  {
    id: "p009",
    name: "Smart Home Hub",
    description:
      "Control 200+ smart devices, voice assistant built-in, Matter & Thread compatible.",
    price: 14900,
    category: "electronics",
    rating: 4.3,
    reviewCount: 567,
    inStock: false,
  },
  {
    id: "p010",
    name: "Yoga Mat Premium",
    description:
      "6mm thick, eco-friendly TPE, non-slip, with carrying strap. 72\" x 26\".",
    price: 5900,
    category: "fitness",
    rating: 4.8,
    reviewCount: 1956,
    inStock: true,
  },
  {
    id: "p011",
    name: "Bluetooth Portable Speaker",
    description:
      "20W stereo, 24-hour playback, IPX7 waterproof, party-link two together for true stereo.",
    price: 8900,
    category: "audio",
    rating: 4.5,
    reviewCount: 1102,
    inStock: true,
  },
  {
    id: "p012",
    name: "Aluminum Sunglasses",
    description:
      "Polarized, UV400, lightweight aluminum frame. Comes with hard case and microfiber pouch.",
    price: 7900,
    category: "accessories",
    rating: 4.4,
    reviewCount: 318,
    inStock: true,
  },
  {
    id: "p013",
    name: "Espresso Machine Compact",
    description:
      "15-bar pump, milk frother, fits in any kitchen. Cafe-quality espresso at home.",
    price: 21900,
    category: "home",
    rating: 4.6,
    reviewCount: 489,
    inStock: true,
  },
  {
    id: "p014",
    name: "Resistance Bands Set",
    description:
      "5 bands, 10–50 lb, with handles, ankle straps, door anchor. Full home gym.",
    price: 3900,
    category: "fitness",
    rating: 4.7,
    reviewCount: 2841,
    inStock: true,
  },
  {
    id: "p015",
    name: "Studio Microphone USB",
    description:
      "Cardioid condenser, 24-bit/96kHz, zero-latency monitoring. Plug-and-play for streaming.",
    price: 12900,
    category: "audio",
    rating: 4.5,
    reviewCount: 673,
    inStock: true,
  },
  {
    id: "p016",
    name: "LED Desk Lamp",
    description:
      "Touch dimmer, 5 color temps, USB charging port, memory function. Eye-care certified.",
    price: 4900,
    category: "home",
    rating: 4.6,
    reviewCount: 1247,
    inStock: true,
  },
  {
    id: "p017",
    name: "Fitness Tracker Slim",
    description:
      "Heart rate, sleep tracking, 7-day battery, water resistant to 50m. Discreet wear.",
    price: 6900,
    category: "wearables",
    rating: 4.3,
    reviewCount: 982,
    inStock: true,
  },
  {
    id: "p018",
    name: "Minimalist Wallet",
    description:
      "RFID-blocking, holds 12 cards, slim aluminum body. Designed in Berlin.",
    price: 4900,
    category: "accessories",
    rating: 4.7,
    reviewCount: 1583,
    inStock: true,
  },
  {
    id: "p019",
    name: "4K Webcam Pro",
    description:
      "Auto-focus, dual stereo mics, privacy shutter, works with all major platforms.",
    price: 15900,
    category: "electronics",
    rating: 4.4,
    reviewCount: 426,
    inStock: true,
  },
  {
    id: "p020",
    name: "Insulated Water Bottle",
    description:
      "32 oz, double-wall vacuum, keeps cold 24h / hot 12h. Leak-proof, dishwasher safe.",
    price: 3500,
    category: "fitness",
    rating: 4.8,
    reviewCount: 4127,
    inStock: true,
  },
];

export const products: Product[] = seeds.map((p) => {
  const { image, productKind } = mediaForProductId(p.id);
  return { ...p, image, productKind };
});

export const categories: { value: import("./types").Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "audio", label: "Audio" },
  { value: "wearables", label: "Wearables" },
  { value: "home", label: "Home" },
  { value: "fitness", label: "Fitness" },
  { value: "accessories", label: "Accessories" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import type { Category } from "@/lib/types";

const ALL_CATEGORIES: Category[] = [
  "electronics",
  "audio",
  "wearables",
  "home",
  "fitness",
  "accessories",
];

/**
 * GET /api/products
 *
 * Query params (all optional):
 *   q          — case-insensitive substring match against name + description
 *   category   — filter to a single category
 *   minPrice   — cents
 *   maxPrice   — cents
 *   sort       — "price-asc" | "price-desc" | "rating" | "popular"
 *   inStock    — "1" | "true" — only products where inStock === true
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase().trim();
  const categoryParam = searchParams.get("category") as Category | null;
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const sort = searchParams.get("sort") ?? "popular";
  const inStockOnly =
    searchParams.get("inStock") === "1" || searchParams.get("inStock") === "true";

  let result = [...products];

  if (categoryParam && ALL_CATEGORIES.includes(categoryParam)) {
    result = result.filter((p) => p.category === categoryParam);
  }

  if (q) {
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  if (inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
    default:
      result.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  return NextResponse.json({ products: result, count: result.length });
}

"use client";

import { useEffect, useState } from "react";
import { PackageSearch } from "lucide-react";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "./product-grid-skeleton";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  query: string;
  category: string;
  sort: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

export function ProductGrid({
  query,
  category,
  sort,
  minPrice,
  maxPrice,
  inStockOnly,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "all") params.set("category", category);
    if (sort) params.set("sort", sort);
    if (minPrice !== undefined) params.set("minPrice", String(minPrice));
    if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
    if (inStockOnly) params.set("inStock", "1");

    fetch(`/api/products?${params.toString()}`)
      .then(async (res) => {
        if (!res.ok) return { products: [] as Product[] };
        const ct = res.headers.get("content-type") ?? "";
        const text = await res.text();
        if (!ct.includes("application/json") && !/^\s*\{/.test(text)) {
          return { products: [] as Product[] };
        }
        try {
          const data = JSON.parse(text) as { products?: Product[] };
          return { products: Array.isArray(data.products) ? data.products : [] };
        } catch {
          return { products: [] as Product[] };
        }
      })
      .then((data: { products: Product[] }) => {
        if (!cancelled) setProducts(Array.isArray(data.products) ? data.products : []);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, category, sort, minPrice, maxPrice, inStockOnly]);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground gap-3">
        <PackageSearch className="h-10 w-10" />
        <div>
          <p className="font-medium text-foreground">No products found</p>
          <p className="text-sm">Try a different search term or clear filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

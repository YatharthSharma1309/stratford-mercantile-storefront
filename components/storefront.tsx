"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "./product-grid";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";

const SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const PRICE_OPTIONS = [
  { value: "any", label: "Any price" },
  { value: "under100", label: "Under $100" },
  { value: "mid", label: "$100 – $300" },
  { value: "over300", label: "$300+" },
] as const;

type PriceTier = (typeof PRICE_OPTIONS)[number]["value"];

function tierToPriceParams(tier: PriceTier): { minPrice?: number; maxPrice?: number } {
  switch (tier) {
    case "under100":
      return { maxPrice: 9999 };
    case "mid":
      return { minPrice: 10000, maxPrice: 30000 };
    case "over300":
      return { minPrice: 30000 };
    default:
      return {};
  }
}

function parsePriceTier(raw: string | null): PriceTier {
  if (raw === "under100" || raw === "mid" || raw === "over300") return raw;
  return "any";
}

const DEBOUNCE_MS = 320;

export function Storefront() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /** Keeps latest query string without forcing `replaceQuery` / effects to churn on every navigation tick. */
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const category = searchParams.get("category") ?? "all";
  const sort = searchParams.get("sort") ?? "popular";
  const priceTier = parsePriceTier(searchParams.get("price"));
  const inStockOnly = searchParams.get("inStock") === "1";

  const qFromUrl = searchParams.get("q") ?? "";

  const [queryInput, setQueryInput] = useState(() => qFromUrl);
  const [debouncedQuery, setDebouncedQuery] = useState(() => qFromUrl);

  /** Sync typing state only when the URL `q` changes (back/forward, shared links), not when other filters change. */
  useEffect(() => {
    setQueryInput(qFromUrl);
    setDebouncedQuery(qFromUrl);
  }, [qFromUrl]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQuery(queryInput.trim());
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [queryInput]);

  const replaceQuery = useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const p = new URLSearchParams(searchParamsRef.current.toString());
      mutate(p);
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const current = (searchParamsRef.current.get("q") ?? "").trim();
    if (debouncedQuery === current) return;
    replaceQuery((p) => {
      if (debouncedQuery) p.set("q", debouncedQuery);
      else p.delete("q");
    });
  }, [debouncedQuery, replaceQuery]);

  const { minPrice, maxPrice } = useMemo(() => tierToPriceParams(priceTier), [priceTier]);

  const hasActiveFilters =
    debouncedQuery !== "" ||
    category !== "all" ||
    sort !== "popular" ||
    priceTier !== "any" ||
    inStockOnly;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Search products…"
            className="pl-9"
            aria-label="Search products"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <select
            value={sort}
            onChange={(e) => {
              const v = e.target.value;
              replaceQuery((p) => {
                if (v === "popular") p.delete("sort");
                else p.set("sort", v);
              });
            }}
            className="h-10 w-full sm:w-[200px] rounded-md border border-input bg-background px-3 text-sm"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <select
            value={priceTier}
            onChange={(e) => {
              const v = e.target.value as PriceTier;
              replaceQuery((p) => {
                if (v === "any") p.delete("price");
                else p.set("price", v);
              });
            }}
            className="h-10 w-full sm:w-[200px] rounded-md border border-input bg-background px-3 text-sm"
            aria-label="Filter by price"
          >
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <Button
            key={c.value}
            variant={category === c.value ? "default" : "outline"}
            size="sm"
            type="button"
            onClick={() =>
              replaceQuery((p) => {
                if (c.value === "all") p.delete("category");
                else p.set("category", c.value);
              })
            }
            className={cn("shrink-0")}
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) =>
              replaceQuery((p) => {
                if (e.target.checked) p.set("inStock", "1");
                else p.delete("inStock");
              })
            }
            className="h-4 w-4 rounded border border-input bg-background"
          />
          In stock only
        </label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={!hasActiveFilters}
          className="self-start sm:self-auto text-muted-foreground"
          onClick={() => {
            setQueryInput("");
            setDebouncedQuery("");
            router.replace(pathname, { scroll: false });
          }}
        >
          Clear filters
        </Button>
      </div>

      <ProductGrid
        query={debouncedQuery}
        category={category}
        sort={sort}
        minPrice={minPrice}
        maxPrice={maxPrice}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

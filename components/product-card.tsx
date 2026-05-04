"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { PRODUCT_KIND_LABELS } from "@/lib/product-media";
import { WishlistButton } from "@/components/wishlist-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, setOpen } from "@/lib/cart-slice";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

const ADDED_MS = 1400;

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function addToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem({ productId: product.id, quantity: 1 }));
    dispatch(setOpen(true));
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), ADDED_MS);
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group rounded-lg border bg-card overflow-hidden transition-shadow hover:shadow-md motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <WishlistButton
          productId={product.id}
          className="absolute left-2 top-2 z-10"
        />
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of stock
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-2">
        <Badge
          variant="outline"
          className="w-fit max-w-full truncate px-2 py-0 text-[10px] font-normal uppercase tracking-wide"
        >
          {PRODUCT_KIND_LABELS[product.productKind] ?? "Product"}
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount.toLocaleString()})</span>
        </div>
        <h3 className="font-medium text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <Button
            size="sm"
            onClick={addToCart}
            disabled={!product.inStock}
            variant={added ? "secondary" : "default"}
            aria-label={added ? `Added ${product.name} to cart` : `Add ${product.name} to cart`}
            className={cn(
              "min-w-[4.25rem] motion-safe:transition-[transform,background-color] motion-safe:duration-200",
              added && "motion-safe:scale-[1.02]",
            )}
          >
            {added ? (
              <>
                <Check className="h-4 w-4 mr-1 motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-50 motion-safe:duration-200 motion-reduce:animate-none" />
                Added
              </>
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}

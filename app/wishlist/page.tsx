"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { products } from "@/lib/products";
import { removeFromWishlist } from "@/lib/wishlist-slice";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.wishlist.ids);

  const saved: Product[] = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  if (saved.length === 0) {
    return (
      <main className="container py-16 max-w-lg text-center space-y-4">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden />
        <h1 className="text-2xl font-bold tracking-tight">Your wishlist is empty</h1>
        <p className="text-muted-foreground">
          Tap the heart on any product to save it here for later.
        </p>
        <Link href="/" className={cn(buttonVariants())}>
          Return to {SITE_NAME}
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8 space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wishlist</h1>
          <p className="text-muted-foreground">{saved.length} saved items</p>
        </div>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Continue shopping
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {saved.map((p) => (
          <li key={p.id} className="rounded-lg border bg-card overflow-hidden flex flex-col">
            <Link href={`/product/${p.id}`} className="relative block aspect-square bg-muted">
              <ProductImage
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </Link>
            <div className="p-4 flex flex-col flex-1 gap-3">
              <div className="min-h-0 flex-1">
                <Link href={`/product/${p.id}`} className="font-medium text-sm leading-snug line-clamp-2 hover:underline">
                  {p.name}
                </Link>
                <p className="mt-1 text-lg font-semibold">{formatPrice(p.price)}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                className="w-full"
                onClick={() => dispatch(removeFromWishlist(p.id))}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleWishlist } from "@/lib/wishlist-slice";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

export function WishlistButton({ productId, className }: WishlistButtonProps) {
  const dispatch = useAppDispatch();
  const saved = useAppSelector((s) => s.wishlist.ids.includes(productId));

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      className={cn(
        "h-9 w-9 shrink-0 bg-background/90 shadow-sm backdrop-blur-sm hover:bg-background",
        className,
      )}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(productId));
      }}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-colors motion-reduce:transition-none",
          saved && "fill-red-500 text-red-500",
        )}
      />
    </Button>
  );
}

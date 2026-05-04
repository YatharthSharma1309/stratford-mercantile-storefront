"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setOpen } from "@/lib/cart-slice";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector((s) =>
    s.cart.lines.reduce((sum, l) => sum + l.quantity, 0),
  );
  const wishlistCount = useAppSelector((s) => s.wishlist.ids.length);

  return (
    <header className="border-b sticky top-0 z-30 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "relative",
            )}
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span
                className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-secondary-foreground border border-border"
                aria-hidden
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => dispatch(setOpen(true))}
            className="relative"
            aria-label={`Cart with ${itemCount} items`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                aria-hidden
              >
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { addItem, setOpen } from "@/lib/cart-slice";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
}

const ADDED_MS = 1400;

export function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleAdd() {
    dispatch(addItem({ productId, quantity: qty }));
    dispatch(setOpen(true));
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), ADDED_MS);
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-r-none"
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={disabled || qty <= 1}
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 text-center text-sm font-medium" aria-live="polite">
          {qty}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-l-none"
          type="button"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          disabled={disabled}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={handleAdd}
        disabled={disabled}
        size="lg"
        variant={added ? "secondary" : "default"}
        type="button"
        className={cn(
          "flex-1 sm:flex-none min-w-[10rem] motion-safe:transition-[transform,background-color] motion-safe:duration-200",
          added && "motion-safe:scale-[1.01]",
        )}
      >
        {added ? (
          <>
            <Check className="h-4 w-4 mr-2 motion-safe:animate-in motion-safe:fade-in motion-reduce:animate-none" />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {disabled ? "Out of stock" : "Add to cart"}
          </>
        )}
      </Button>
    </div>
  );
}

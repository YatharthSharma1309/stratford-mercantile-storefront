"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector, useCart } from "@/lib/hooks";
import { setOpen, setQuantity, removeItem } from "@/lib/cart-slice";
import { formatPrice, cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";

export function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.cart.isOpen);
  const { items, subtotal, shipping, tax, total } = useCart();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    dispatch(setOpen(false));
  }, [dispatch]);

  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    const closeBtn = closeBtnRef.current;
    const prevActive = document.activeElement as HTMLElement | null;

    function collectFocusables(): HTMLElement[] {
      if (!sheet) return [];
      const sel =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      return Array.from(sheet.querySelectorAll<HTMLElement>(sel)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );
    }

    const focusables = collectFocusables();
    const first = focusables[0] ?? closeBtn;
    window.requestAnimationFrame(() => first?.focus());

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;

      const list = collectFocusables();
      if (list.length === 0) return;

      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else if (active === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      prevActive?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity motion-reduce:transition-none motion-reduce:backdrop-blur-none",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={close}
        aria-hidden
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sheet-title"
        aria-label="Shopping cart"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mx-auto flex w-full max-h-[min(88vh,calc(100dvh-3rem))] max-w-lg flex-col rounded-t-3xl border border-border/80 bg-background shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.35)] transition-transform duration-300 motion-reduce:transition-none [transition-timing-function:cubic-bezier(0.32,0.72,0,1)] md:max-w-xl",
          isOpen ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
      >
        {/* Drag affordance */}
        <div className="flex shrink-0 justify-center pt-3 pb-1" aria-hidden>
          <div className="h-1.5 w-12 rounded-full bg-muted-foreground/25" />
        </div>

        <div className="flex items-start justify-between gap-3 border-b px-4 pb-3 pt-1">
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 text-foreground">
              <ShoppingBag className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
              <h2 id="cart-sheet-title" className="truncate text-lg font-semibold tracking-tight">
                Your cart
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {items.length === 0
                ? `Add items from ${SITE_NAME}`
                : `${items.length} ${items.length === 1 ? "item" : "items"} · ${formatPrice(subtotal)} subtotal`}
            </p>
          </div>
          <Button
            ref={closeBtnRef}
            variant="ghost"
            size="icon"
            type="button"
            onClick={close}
            className="shrink-0 rounded-full"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3"
          aria-labelledby="cart-sheet-title"
        >
          {items.length === 0 ? (
            <div className="flex min-h-[12rem] flex-col items-center justify-center gap-2 px-4 py-8 text-center text-muted-foreground">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" aria-hidden />
              </div>
              <p className="font-medium text-foreground">Your cart is empty</p>
              <p className="max-w-xs text-sm">
                Browse products and tap <span className="font-medium text-foreground">Add</span>{" "}
                to build your bag.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 py-4 first:pt-1">
                  <Link
                    href={`/product/${product.id}`}
                    onClick={close}
                    className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border"
                  >
                    <ProductImage
                      src={product.image}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${product.id}`}
                        onClick={close}
                        className="line-clamp-2 text-sm font-medium leading-snug text-foreground hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {formatPrice(product.price)}{" "}
                        <span className="text-muted-foreground/70">each</span>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-8 w-8 rounded-md"
                          onClick={() =>
                            dispatch(
                              setQuantity({ productId: product.id, quantity: quantity - 1 }),
                            )
                          }
                          aria-label={`Decrease quantity of ${product.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-[2rem] px-1 text-center text-sm font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-8 w-8 rounded-md"
                          onClick={() =>
                            dispatch(
                              setQuantity({ productId: product.id, quantity: quantity + 1 }),
                            )
                          }
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="ml-auto h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => dispatch(removeItem(product.id))}
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div
            className="shrink-0 space-y-3 border-t bg-background/95 px-4 pt-4 backdrop-blur-sm"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <dl className="grid gap-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Tax (est.)</dt>
                <dd className="tabular-nums">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-2 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              onClick={close}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Checkout · {formatPrice(total)}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

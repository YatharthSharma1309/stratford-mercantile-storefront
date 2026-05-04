"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChevronLeft, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useCart } from "@/lib/hooks";
import { clear } from "@/lib/cart-slice";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, subtotal, shipping, tax, total } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate payment processing — in production this hits Stripe / your PSP
    await new Promise((r) => setTimeout(r, 1200));
    setDone(true);
    dispatch(clear());
    setSubmitting(false);
  }

  if (done) {
    return (
      <main className="container py-16 max-w-md text-center space-y-4">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h1 className="text-2xl font-bold">Order placed!</h1>
        <p className="text-muted-foreground">
          Thanks for your purchase. A confirmation has been sent to your email.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container py-16 max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Add something to your cart to check out.</p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-8 max-w-5xl">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-[1fr_360px]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4 rounded-lg border p-6">
            <legend className="px-2 text-sm font-semibold">Contact</legend>
            <Input type="email" placeholder="Email address" required autoComplete="email" />
          </fieldset>

          <fieldset className="space-y-4 rounded-lg border p-6">
            <legend className="px-2 text-sm font-semibold">Shipping</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="First name" required autoComplete="given-name" />
              <Input placeholder="Last name" required autoComplete="family-name" />
            </div>
            <Input placeholder="Street address" required autoComplete="street-address" />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input placeholder="City" required autoComplete="address-level2" />
              <Input placeholder="State / Province" required autoComplete="address-level1" />
              <Input placeholder="ZIP / Postal code" required autoComplete="postal-code" />
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-lg border p-6">
            <legend className="px-2 text-sm font-semibold flex items-center gap-2">
              Payment <Lock className="h-3 w-3 text-muted-foreground" />
            </legend>
            <Input placeholder="Card number" required inputMode="numeric" autoComplete="cc-number" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="MM / YY" required autoComplete="cc-exp" />
              <Input placeholder="CVC" required inputMode="numeric" autoComplete="cc-csc" />
            </div>
            <p className="text-xs text-muted-foreground">
              Demo only — do not enter real card details. Form is non-functional.
            </p>
          </fieldset>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing…
              </>
            ) : (
              <>Place order — {formatPrice(total)}</>
            )}
          </Button>
        </form>

        {/* Order summary */}
        <aside className="rounded-lg border p-6 h-max sticky top-20 space-y-4">
          <h2 className="font-semibold">Order summary</h2>
          <ul className="space-y-3">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium leading-tight line-clamp-2">{product.name}</p>
                  <p className="text-muted-foreground">Qty {quantity}</p>
                </div>
                <span className="shrink-0">{formatPrice(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-1.5 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}

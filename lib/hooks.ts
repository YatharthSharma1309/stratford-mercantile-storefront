import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { products } from "./products";

/** Convenience selector: cart lines joined with full product data + totals. */
export function useCart() {
  const lines = useAppSelector((s) => s.cart.lines);

  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      return { product, quantity: line.quantity };
    })
    .filter(<T,>(x: T | null): x is T => x !== null);

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
  const itemCount = items.reduce((sum, { quantity }) => sum + quantity, 0);

  // Free shipping over $50 — common UX pattern
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 599;
  const tax = Math.round(subtotal * 0.0875); // mock 8.75% tax
  const total = subtotal + shipping + tax;

  return { items, subtotal, shipping, tax, total, itemCount };
}

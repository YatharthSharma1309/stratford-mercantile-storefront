"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/lib/store";
import { hydrate } from "@/lib/cart-slice";
import { hydrateWishlist } from "@/lib/wishlist-slice";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = makeStore();
  }

  // Hydrate cart from localStorage after first render (client only)
  useEffect(() => {
    storeRef.current?.dispatch(hydrate());
    storeRef.current?.dispatch(hydrateWishlist());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

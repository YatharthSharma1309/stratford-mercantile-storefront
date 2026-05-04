import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { persistCartState } from "./cart-slice";
import wishlistReducer, { persistWishlistState } from "./wishlist-slice";

export function makeStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
  });

  // Persist cart + wishlist on every change (client only)
  if (typeof window !== "undefined") {
    store.subscribe(() => {
      const s = store.getState();
      persistCartState(s.cart);
      persistWishlistState(s.wishlist);
    });
  }

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

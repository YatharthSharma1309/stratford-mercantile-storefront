import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: string[];
}

const initialState: WishlistState = {
  ids: [],
};

function loadInitial(): WishlistState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem("wishlist:v1");
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as { ids?: unknown };
    const ids = Array.isArray(parsed.ids)
      ? parsed.ids.filter((id): id is string => typeof id === "string")
      : [];
    return { ids };
  } catch {
    return initialState;
  }
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    hydrateWishlist(state) {
      const loaded = loadInitial();
      state.ids = loaded.ids;
    },
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      const i = state.ids.indexOf(id);
      if (i >= 0) state.ids.splice(i, 1);
      else state.ids.push(id);
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((x) => x !== action.payload);
    },
  },
});

export const { hydrateWishlist, toggleWishlist, removeFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

export function persistWishlistState(state: WishlistState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("wishlist:v1", JSON.stringify({ ids: state.ids }));
  } catch {
    /* ignore */
  }
}

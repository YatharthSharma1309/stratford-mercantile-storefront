import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
}

const initialState: CartState = {
  lines: [],
  isOpen: false,
};

/** Try to hydrate from localStorage on first read (client only). */
function loadInitial(): CartState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem("cart:v1");
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as { lines?: CartLine[] };
    return {
      ...initialState,
      lines: Array.isArray(parsed.lines) ? parsed.lines : [],
    };
  } catch {
    return initialState;
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate(state) {
      const loaded = loadInitial();
      state.lines = loaded.lines;
    },
    addItem(state, action: PayloadAction<{ productId: string; quantity?: number }>) {
      const { productId, quantity = 1 } = action.payload;
      const existing = state.lines.find((l) => l.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.lines.push({ productId, quantity });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((l) => l.productId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      const line = state.lines.find((l) => l.productId === productId);
      if (!line) return;
      if (quantity <= 0) {
        state.lines = state.lines.filter((l) => l.productId !== productId);
      } else {
        line.quantity = quantity;
      }
    },
    clear(state) {
      state.lines = [];
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const { hydrate, addItem, removeItem, setQuantity, clear, setOpen } =
  cartSlice.actions;
export default cartSlice.reducer;

// Persistence side effect — wired up in store.ts via subscribe()
export function persistCartState(state: CartState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart:v1", JSON.stringify({ lines: state.lines }));
  } catch {
    /* ignore quota errors */
  }
}

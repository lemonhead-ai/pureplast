import { create } from "zustand";

export interface CartProduct {
  id: string;
  name: string;
  price?: number;
  image: string;
  isEngineered: boolean;
  quantity: number;
  sku?: string;
}

type DrawerTab = "buy" | "quote";

interface CartStore {
  // Drawer state
  isDrawerOpen: boolean;
  drawerTab: DrawerTab;
  openDrawer: (tab?: DrawerTab) => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: DrawerTab) => void;

  // Buy-now cart
  buyNowCart: CartProduct[];
  addToBuyNow: (product: Omit<CartProduct, "quantity">) => void;
  removeFromBuyNow: (id: string) => void;
  clearBuyNow: () => void;

  // Quote list
  quoteCart: CartProduct[];
  addToQuote: (product: Omit<CartProduct, "quantity">) => void;
  removeFromQuote: (id: string) => void;
  clearQuote: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  isDrawerOpen: false,
  drawerTab: "buy",

  openDrawer: (tab = "buy") =>
    set({ isDrawerOpen: true, drawerTab: tab }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  setDrawerTab: (tab) => set({ drawerTab: tab }),

  buyNowCart: [],
  addToBuyNow: (product) =>
    set((state) => {
      const existing = state.buyNowCart.find((p) => p.id === product.id);
      if (existing) {
        return {
          buyNowCart: state.buyNowCart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return { buyNowCart: [...state.buyNowCart, { ...product, quantity: 1 }] };
    }),
  removeFromBuyNow: (id) =>
    set((state) => ({
      buyNowCart: state.buyNowCart.filter((p) => p.id !== id),
    })),
  clearBuyNow: () => set({ buyNowCart: [] }),

  quoteCart: [],
  addToQuote: (product) =>
    set((state) => {
      const existing = state.quoteCart.find((p) => p.id === product.id);
      if (existing) {
        return {
          quoteCart: state.quoteCart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return { quoteCart: [...state.quoteCart, { ...product, quantity: 1 }] };
    }),
  removeFromQuote: (id) =>
    set((state) => ({
      quoteCart: state.quoteCart.filter((p) => p.id !== id),
    })),
  clearQuote: () => set({ quoteCart: [] }),
}));
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartProduct {
  id: string;
  name: string;
  price?: number;
  image: string;
  isEngineered: boolean;
  quantity: number;
  sku?: string;
  unit?: string;
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
  addToBuyNow: (product: Omit<CartProduct, "quantity">, quantity?: number) => void;
  updateBuyNowQuantity: (id: string, quantity: number) => void;
  removeFromBuyNow: (id: string) => void;
  clearBuyNow: () => void;

  // Quote list
  quoteCart: CartProduct[];
  addToQuote: (product: Omit<CartProduct, "quantity">, quantity?: number) => void;
  updateQuoteQuantity: (id: string, quantity: number) => void;
  removeFromQuote: (id: string) => void;
  clearQuote: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      isDrawerOpen: false,
      drawerTab: "buy",

      openDrawer: (tab = "buy") =>
        set({ isDrawerOpen: true, drawerTab: tab }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      setDrawerTab: (tab) => set({ drawerTab: tab }),

      buyNowCart: [],
      addToBuyNow: (product, quantity = 1) =>
        set((state) => {
          const qty = Math.max(1, quantity);
          const existing = state.buyNowCart.find((p) => p.id === product.id);
          if (existing) {
            return {
              buyNowCart: state.buyNowCart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
              ),
            };
          }
          return {
            buyNowCart: [
              ...state.buyNowCart,
              { ...product, quantity: qty, unit: product.unit },
            ],
          };
        }),
      updateBuyNowQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              buyNowCart: state.buyNowCart.filter((p) => p.id !== id),
            };
          }
          return {
            buyNowCart: state.buyNowCart.map((p) =>
              p.id === id ? { ...p, quantity } : p
            ),
          };
        }),
      removeFromBuyNow: (id) =>
        set((state) => ({
          buyNowCart: state.buyNowCart.filter((p) => p.id !== id),
        })),
      clearBuyNow: () => set({ buyNowCart: [] }),

      quoteCart: [],
      addToQuote: (product, quantity = 1) =>
        set((state) => {
          const qty = Math.max(1, quantity);
          const existing = state.quoteCart.find((p) => p.id === product.id);
          if (existing) {
            return {
              quoteCart: state.quoteCart.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
              ),
            };
          }
          return {
            quoteCart: [
              ...state.quoteCart,
              { ...product, quantity: qty, unit: product.unit },
            ],
          };
        }),
      updateQuoteQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              quoteCart: state.quoteCart.filter((p) => p.id !== id),
            };
          }
          return {
            quoteCart: state.quoteCart.map((p) =>
              p.id === id ? { ...p, quantity } : p
            ),
          };
        }),
      removeFromQuote: (id) =>
        set((state) => ({
          quoteCart: state.quoteCart.filter((p) => p.id !== id),
        })),
      clearQuote: () => set({ quoteCart: [] }),
    }),
    {
      name: "pureplast-cart-v1",
      partialize: (state) => ({
        buyNowCart: state.buyNowCart,
        quoteCart: state.quoteCart,
      }),
    }
  )
);
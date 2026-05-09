import { create } from 'zustand';

export type Product = {
  id: string;
  name: string;
  price?: number;
  image: string;
  isEngineered?: boolean;
};

export type CartItem = Product & { quantity: number };

interface CartState {
  buyNowCart: CartItem[];
  quoteCart: CartItem[];
  isDrawerOpen: boolean;
  drawerTab: 'buy' | 'quote';
  
  addToBuyNow: (product: Product) => void;
  removeFromBuyNow: (id: string) => void;
  
  addToQuote: (product: Product) => void;
  removeFromQuote: (id: string) => void;
  
  openDrawer: (tab: 'buy' | 'quote') => void;
  closeDrawer: () => void;
  setDrawerTab: (tab: 'buy' | 'quote') => void;
}

export const useCartStore = create<CartState>((set) => ({
  buyNowCart: [],
  quoteCart: [],
  isDrawerOpen: false,
  drawerTab: 'buy',
  
  addToBuyNow: (product) => set((state) => {
    const exists = state.buyNowCart.find(item => item.id === product.id);
    if (exists) {
      return { buyNowCart: state.buyNowCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { buyNowCart: [...state.buyNowCart, { ...product, quantity: 1 }], drawerTab: 'buy', isDrawerOpen: true };
  }),
  
  removeFromBuyNow: (id) => set((state) => ({
    buyNowCart: state.buyNowCart.filter(item => item.id !== id)
  })),
  
  addToQuote: (product) => set((state) => {
    const exists = state.quoteCart.find(item => item.id === product.id);
    if (exists) {
      return { quoteCart: state.quoteCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { quoteCart: [...state.quoteCart, { ...product, quantity: 1 }], drawerTab: 'quote', isDrawerOpen: true };
  }),
  
  removeFromQuote: (id) => set((state) => ({
    quoteCart: state.quoteCart.filter(item => item.id !== id)
  })),
  
  openDrawer: (tab) => set({ isDrawerOpen: true, drawerTab: tab }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  setDrawerTab: (tab) => set({ drawerTab: tab }),
}));

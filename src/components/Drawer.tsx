"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Trash2, ShoppingCart, FileText } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/Button";

export function Drawer() {
  const { isDrawerOpen, closeDrawer, drawerTab, setDrawerTab, buyNowCart, quoteCart, removeFromBuyNow, removeFromQuote } = useCartStore();

  const currentCart = drawerTab === 'buy' ? buyNowCart : quoteCart;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-2xl border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-semibold tracking-tight">Cart</h2>
              <button onClick={closeDrawer} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex p-4 border-b border-border gap-2">
              <Button 
                variant={drawerTab === 'buy' ? 'default' : 'ghost'} 
                className="flex-1"
                onClick={() => setDrawerTab('buy')}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              <Button 
                variant={drawerTab === 'quote' ? 'default' : 'ghost'} 
                className="flex-1"
                onClick={() => setDrawerTab('quote')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Quote List
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {currentCart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  {drawerTab === 'buy' ? <ShoppingCart size={48} /> : <FileText size={48} />}
                  <p>Your {drawerTab === 'buy' ? 'shopping cart' : 'quote list'} is empty.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {currentCart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-20 h-20 bg-[#E5E5E5] rounded-3xl overflow-hidden shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs opacity-50">No Img</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-black/60 mt-1">Qty: {item.quantity}</p>
                        {item.price && <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>}
                      </div>
                      <button 
                        onClick={() => drawerTab === 'buy' ? removeFromBuyNow(item.id) : removeFromQuote(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border">
              {drawerTab === 'buy' ? (
                <Button className="w-full" size="lg" disabled={currentCart.length === 0}>
                  Proceed to Checkout
                </Button>
              ) : (
                <Button className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white" size="lg" disabled={currentCart.length === 0}>
                  Request Custom Quote
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

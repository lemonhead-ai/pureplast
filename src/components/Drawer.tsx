"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingCart, FileText } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/Button";

export function Drawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    drawerTab,
    setDrawerTab,
    buyNowCart,
    quoteCart,
    removeFromBuyNow,
    removeFromQuote,
    updateBuyNowQuantity,
    updateQuoteQuantity,
  } = useCartStore();

  const currentCart = drawerTab === "buy" ? buyNowCart : quoteCart;
  const buyNowSubtotal = buyNowCart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

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
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Factory Cart</h2>
                <p className="text-xs text-black/50 mt-0.5">Wholesale orders sold by bundle</p>
              </div>
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
                Buy Now ({buyNowCart.reduce((sum, i) => sum + i.quantity, 0)})
              </Button>
              <Button 
                variant={drawerTab === 'quote' ? 'default' : 'ghost'} 
                className="flex-1"
                onClick={() => setDrawerTab('quote')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Quote List ({quoteCart.reduce((sum, i) => sum + i.quantity, 0)})
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
                    <div key={item.id} className="flex gap-4 items-start p-3 rounded-2xl bg-black/[0.02] border border-[#E5E5E5]/60">
                      <div className="w-20 h-20 bg-[#E5E5E5] rounded-2xl overflow-hidden shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs opacity-50">No Img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-[#0B1215] leading-snug">{item.name}</h4>
                        {item.unit && (
                          <p className="text-xs text-[#004C97] font-medium mt-0.5">{item.unit}</p>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2.5">
                          <div className="inline-flex items-center border border-[#E5E5E5] rounded-lg bg-white shadow-xs">
                            <button
                              type="button"
                              onClick={() => {
                                if (drawerTab === "buy") {
                                  updateBuyNowQuantity(item.id, item.quantity - 1);
                                } else {
                                  updateQuoteQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="w-7 h-7 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-l-lg transition-colors font-bold text-sm"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (drawerTab === "buy") {
                                  updateBuyNowQuantity(item.id, item.quantity + 1);
                                } else {
                                  updateQuoteQuantity(item.id, item.quantity + 1);
                                }
                              }}
                              className="w-7 h-7 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-r-lg transition-colors font-bold text-sm"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[11px] text-black/50 font-medium">
                            {item.quantity === 1 ? "bundle" : "bundles"}
                          </span>
                        </div>

                        {/* Price */}
                        {item.price ? (
                          <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-sm font-bold text-[#0B1215]">
                              KES {((item.price) * item.quantity).toLocaleString()}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[11px] text-black/40">
                                (KES {item.price.toLocaleString()}/bundle)
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-black/60 font-medium mt-2">Wholesale Quote Schedule</p>
                        )}
                      </div>
                      <button 
                        onClick={() => drawerTab === 'buy' ? removeFromBuyNow(item.id) : removeFromQuote(item.id)}
                        className="p-1.5 text-black/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border bg-[#FAFAF8]">
              {drawerTab === 'buy' ? (
                <>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-black/60 font-medium">Subtotal</span>
                      <span className="text-lg font-bold text-[#0B1215]">
                        KES {buyNowSubtotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[11px] text-black/45 leading-tight">
                      Factory orders sold in bundle units. Shipping calculated at checkout.
                    </p>
                  </div>
                  <Link href="/checkout" onClick={closeDrawer}>
                    <Button className="w-full h-12 text-base font-semibold" size="lg" disabled={currentCart.length === 0}>
                      Proceed to Checkout ({buyNowCart.reduce((sum, i) => sum + i.quantity, 0)} {buyNowCart.reduce((sum, i) => sum + i.quantity, 0) === 1 ? "bundle" : "bundles"})
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/request-quote" onClick={closeDrawer}>
                  <Button className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white h-12 text-base font-semibold" size="lg" disabled={currentCart.length === 0}>
                    Request Custom Quote
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

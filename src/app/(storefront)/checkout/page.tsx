"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { processCheckout } from "./actions";

export default function CheckoutPage() {
  const router = useRouter();
  const buyNowCart = useCartStore((state) => state.buyNowCart);
  const updateBuyNowQuantity = useCartStore((state) => state.updateBuyNowQuantity);
  const removeFromBuyNow = useCartStore((state) => state.removeFromBuyNow);
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "bank">("mpesa");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate totals
  const subtotal = buyNowCart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const shipping = 500; // Flat rate
  const total = subtotal + shipping;

  if (!mounted) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#F5F5F2] flex items-center justify-center">
        <p className="text-black/40 text-sm">Loading checkout...</p>
      </main>
    );
  }

  if (buyNowCart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center bg-[#F5F5F2]">
        <h1 className="text-3xl font-semibold text-[#0B1215] mb-4">Your Cart is Empty</h1>
        <p className="text-black/60 mb-8">Add items from the catalog to proceed to checkout.</p>
        <Button onClick={() => router.push("/products")}>Browse Products</Button>
      </div>
    );
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const cartItems = buyNowCart.map(item => ({
        id: item.id,
        quantity: item.quantity,
      }));

      const result = await processCheckout(formData, cartItems);

      if (result.success) {
        toast.success("Checkout processed successfully!");
        router.push(`/checkout/success?orderNumber=${result.orderNumber}`);
      }
    } catch (err: any) {
      console.error("Checkout failed:", err);
      toast.error(err.message || "An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-[#F5F5F2]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#0B1215] mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Form */}
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              
              {/* Customer Information */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E5E5] shadow-sm">
                <h2 className="text-xl font-semibold text-[#0B1215] mb-6">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-[#0B1215]">Full Name</label>
                    <input name="fullName" required className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0B1215]">Email Address</label>
                    <input name="email" type="email" required className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0B1215]">Phone Number</label>
                    <input name="phone" type="tel" required placeholder="07XX XXX XXX" className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm" />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E5E5] shadow-sm">
                <h2 className="text-xl font-semibold text-[#0B1215] mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-[#0B1215]">Street Address</label>
                    <input name="addressLine1" required className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0B1215]">City</label>
                    <input name="city" required className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0B1215]">Postal Code</label>
                    <input name="postalCode" required className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E5E5] shadow-sm">
                <h2 className="text-xl font-semibold text-[#0B1215] mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "mpesa" ? "border-[#00A15D] bg-[#00A15D]/5" : "border-[#E5E5E5]"}`}>
                    <input type="radio" name="paymentMethod" value="mpesa" checked={paymentMethod === "mpesa"} onChange={() => setPaymentMethod("mpesa")} className="w-4 h-4 text-[#00A15D] focus:ring-[#00A15D]" />
                    <div className="ml-3">
                      <span className="block text-sm font-semibold text-[#0B1215]">M-Pesa Express</span>
                      <span className="block text-xs text-black/50">Pay instantly via STK Push</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "bank" ? "border-[#004C97] bg-[#004C97]/5" : "border-[#E5E5E5]"}`}>
                    <input type="radio" name="paymentMethod" value="bank" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} className="w-4 h-4 text-[#004C97] focus:ring-[#004C97]" />
                    <div className="ml-3">
                      <span className="block text-sm font-semibold text-[#0B1215]">Bank Transfer</span>
                      <span className="block text-xs text-black/50">EFT or RTGS (Order processed upon receipt)</span>
                    </div>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E5E5E5] shadow-sm sticky top-32">
              <h2 className="text-xl font-semibold text-[#0B1215] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {buyNowCart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start pb-4 border-b border-[#E5E5E5]/60 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5F5F2] flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-black/30">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#0B1215] leading-tight line-clamp-2">{item.name}</h3>
                      {item.unit && (
                        <p className="text-xs text-[#004C97] font-medium mt-0.5">{item.unit}</p>
                      )}
                      
                      {/* Bundle quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center border border-[#E5E5E5] rounded-lg bg-[#F5F5F2]">
                          <button
                            type="button"
                            onClick={() => updateBuyNowQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-l-lg transition-colors font-bold text-xs"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateBuyNowQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-r-lg transition-colors font-bold text-xs"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[11px] text-black/50 font-medium">
                          {item.quantity === 1 ? "bundle" : "bundles"}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromBuyNow(item.id)}
                          className="ml-auto text-[11px] text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {item.price && item.price > 0 ? (
                        <>
                          <div className="text-sm font-semibold text-[#0B1215]">
                            KES {(item.price * item.quantity).toLocaleString()}
                          </div>
                          {item.quantity > 1 && (
                            <span className="text-[10px] text-black/40 block mt-0.5">
                              KES {item.price.toLocaleString()} / bundle
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs text-amber-600 font-medium">Quote Required</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E5E5] pt-4 space-y-3 mb-6">
                {subtotal > 0 ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Subtotal</span>
                      <span className="font-semibold text-[#0B1215]">KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Shipping</span>
                      <span className="font-semibold text-[#0B1215]">KES {shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t border-[#E5E5E5]">
                      <span className="font-semibold text-[#0B1215]">Total</span>
                      <span className="font-bold text-[#0B1215]">KES {total.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-black/60 font-medium">
                    Order submitted for factory invoice and payment processing.
                  </p>
                )}
                <p className="text-[11px] text-black/45 leading-tight pt-1">
                  All items are supplied in factory bundle packaging.
                </p>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                disabled={loading}
                className="w-full py-6 text-lg shadow-xl shadow-[#004C97]/20"
              >
                {loading ? "Processing..." : subtotal > 0 ? `Pay KES ${total.toLocaleString()}` : "Submit Factory Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

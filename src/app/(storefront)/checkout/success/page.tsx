"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get("orderNumber");
  const clearBuyNow = useCartStore((state) => state.clearBuyNow);

  useEffect(() => {
    // Clear the cart on successful checkout
    clearBuyNow();
  }, [clearBuyNow]);

  if (!orderNumber) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center bg-[#F5F5F2]">
        <h1 className="text-3xl font-semibold text-[#0B1215] mb-4">Invalid Order</h1>
        <p className="text-black/60 mb-8">No order number was provided.</p>
        <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center bg-[#F5F5F2]">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E5E5E5] shadow-xl shadow-[#004C97]/5 max-w-lg w-full text-center">
        
        <div className="w-20 h-20 bg-[#00A15D]/10 text-[#00A15D] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-3xl font-semibold text-[#0B1215] mb-2">Order Confirmed!</h1>
        <p className="text-lg text-black/60 mb-6">Order #{orderNumber}</p>

        <div className="bg-[#F5F5F2] rounded-xl p-6 mb-8 text-left space-y-4">
          <h3 className="font-semibold text-[#0B1215]">Next Steps</h3>
          
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-[#004C97]/10 text-[#004C97] flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">1</div>
            <div>
              <p className="text-sm font-semibold text-[#0B1215]">M-Pesa Prompt</p>
              <p className="text-xs text-black/60 mt-1">If you selected M-Pesa, check your phone for the PIN prompt. Enter your PIN to complete payment.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-[#004C97]/10 text-[#004C97] flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">2</div>
            <div>
              <p className="text-sm font-semibold text-[#0B1215]">Payment Confirmation</p>
              <p className="text-xs text-black/60 mt-1">Once paid, we will automatically update your order status and send an email receipt.</p>
            </div>
          </div>

        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 py-6" onClick={() => router.push("/products")}>
            Shop More
          </Button>
          <Button className="flex-1 py-6" onClick={() => router.push("/account/orders")}>
            View Orders
          </Button>
        </div>
      </div>
    </main>
  );
}

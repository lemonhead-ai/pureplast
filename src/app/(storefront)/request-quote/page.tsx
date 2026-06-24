"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { processQuoteRequest } from "./actions";
import Image from "next/image";

export default function RequestQuotePage() {
  const { quoteCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (quoteCart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold text-[#0B1215] mb-4">Your Quote Request is Empty</h1>
        <p className="text-black/60 mb-8 max-w-md">Add items to your quote list from our catalog to request bulk pricing or custom manufacturing.</p>
        <Button onClick={() => router.push("/products")}>Browse Products</Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await processQuoteRequest(formData, quoteCart);

      if (result.success) {
        toast.success("Quote request submitted successfully!");
        router.push(`/request-quote/success`);
      }
    } catch (err: any) {
      console.error("Quote submission failed:", err);
      toast.error(err.message || "An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-[#0B1215] mb-2">Request Custom Quote</h1>
      <p className="text-black/60 mb-8">Provide your company details and we will get back to you with custom pricing.</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E5E5E5] p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#0B1215] mb-6">Company Information</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0B1215]">Full Name *</label>
                  <input required name="fullName" type="text" className="w-full h-12 px-4 rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 transition-shadow" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0B1215]">Company Name *</label>
                  <input required name="companyName" type="text" className="w-full h-12 px-4 rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 transition-shadow" placeholder="e.g. Acme Plastics Ltd" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0B1215]">Email Address *</label>
                  <input required name="email" type="email" className="w-full h-12 px-4 rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 transition-shadow" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0B1215]">Phone Number</label>
                  <input name="phone" type="tel" className="w-full h-12 px-4 rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 transition-shadow" placeholder="0712 345 678" />
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5E5E5]">
                <Button type="submit" size="lg" className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white" disabled={loading}>
                  {loading ? "Submitting Request..." : "Submit Quote Request"}
                </Button>
                <p className="text-xs text-center text-black/50 mt-4">By submitting, you agree to our terms and conditions.</p>
              </div>
            </div>
          </form>
        </div>

        {/* Quote Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#F5F5F2] rounded-3xl p-8 sticky top-32">
            <h2 className="text-xl font-semibold text-[#0B1215] mb-6">Requested Items</h2>
            
            <div className="space-y-6">
              {quoteCart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white overflow-hidden shrink-0 border border-[#E5E5E5]">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0B1215] text-sm leading-snug">{item.name}</h4>
                    <p className="text-xs text-black/50 mt-1 uppercase tracking-wide">{item.sku}</p>
                    <p className="text-xs font-medium text-[#004C97] mt-2">Requested Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <div className="flex justify-between text-sm mb-2 text-black/60">
                <span>Total Items Requested</span>
                <span className="font-medium text-[#0B1215]">{quoteCart.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <p className="text-xs text-black/50 mt-4 leading-relaxed">
                Our sales team will review your requested quantities and provide a custom pricing offer via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

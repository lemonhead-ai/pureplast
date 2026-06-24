"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function QuoteSuccessPage() {
  const { clearQuote } = useCartStore();

  useEffect(() => {
    // Clear the cart on success
    clearQuote();
  }, [clearQuote]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-500">
        <CheckCircle size={40} />
      </div>
      
      <h1 className="text-3xl font-bold text-[#0B1215] mb-4">Request Submitted Successfully!</h1>
      
      <p className="text-black/60 mb-8 leading-relaxed">
        Thank you for choosing PurePlast. Our sales team has received your bulk quote request and will get back to you shortly with custom pricing.
      </p>

      <div className="space-y-4">
        <Link href="/">
          <Button size="lg" className="bg-[#0B1215] hover:bg-[#0B1215]/90 text-white w-full sm:w-auto">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}

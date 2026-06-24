import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, User } from "lucide-react";
import QuoteReplyClient from "./QuoteReplyClient";
import { QuoteStatusBadge } from "../page";

export const revalidate = 0;

export default async function AdminQuoteDetailPage({ params }: { params: { id: string } }) {
  const quote = await prisma.quote.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      items: {
        include: { product: true }
      },
    }
  });

  if (!quote) notFound();

  // Calculate standard total
  const standardTotal = quote.items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/quotes" className="inline-flex items-center text-sm font-medium text-black/50 hover:text-[#0B1215] mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to Quotes
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#0B1215] flex items-center gap-3">
              Quote Request
              <QuoteStatusBadge status={quote.status} />
            </h1>
            <p className="text-sm text-black/50 mt-1">{new Date(quote.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quote Items */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quote Items */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center gap-3">
              <Package size={20} className="text-[#004C97]" />
              <h2 className="text-lg font-semibold text-[#0B1215]">Requested Items</h2>
            </div>
            <div className="p-6 space-y-4">
              {quote.items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F5F2] overflow-hidden flex-shrink-0">
                      {item.product.imageUrl ? (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0B1215]">{item.product.name}</p>
                      <p className="text-xs text-black/50">SKU: {item.product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0B1215]">Requested Qty: {item.quantity}</p>
                    <p className="text-xs text-black/50">Standard Price: KES {item.product.price.toLocaleString()} / unit</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center">
                <span className="text-sm font-semibold text-black/60">Standard Catalog Total</span>
                <span className="text-lg font-bold text-black/50">KES {standardTotal.toLocaleString()}</span>
              </div>
              
              {quote.offeredPrice && (
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-sm font-semibold text-[#00A15D]">Your Custom Offer</span>
                  <span className="text-lg font-bold text-[#00A15D]">KES {quote.offeredPrice.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Customer */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center gap-3">
              <User size={20} className="text-[#0B1215]" />
              <h2 className="text-lg font-semibold text-[#0B1215]">Customer</h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <p className="text-xs text-black/50 mb-1">Full Name</p>
                <p className="text-sm font-medium text-[#0B1215]">{quote.user.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-black/50 mb-1">Email</p>
                <p className="text-sm font-medium text-[#0B1215]">{quote.user.email}</p>
              </div>
              <div>
                <p className="text-xs text-black/50 mb-1">Phone</p>
                <p className="text-sm font-medium text-[#0B1215]">{quote.user.phone || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div>
          <QuoteReplyClient 
            quoteId={quote.id} 
            currentStatus={quote.status}
            currentOfferedPrice={quote.offeredPrice}
            currentAdminNotes={quote.adminNotes}
          />
        </div>
      </div>
    </div>
  );
}

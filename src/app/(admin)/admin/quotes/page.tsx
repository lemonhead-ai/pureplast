import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Eye } from "lucide-react";
import { QuoteStatus } from "@prisma/client";

export const revalidate = 0;

export default async function AdminQuotesPage() {
  const quotes = await prisma.quote.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: true,
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0B1215]">Quote Requests</h1>
        <p className="text-sm text-black/50 mt-1">Review bulk purchase requests and provide custom pricing.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Items</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-black/50 text-sm">
                    No quote requests found.
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm text-black/60">{new Date(quote.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#0B1215]">{quote.user.fullName}</span>
                      <span className="block text-xs text-black/50">{quote.user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#0B1215]">{quote.items.length} items</span>
                    </td>
                    <td className="px-6 py-4">
                      <QuoteStatusBadge status={quote.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#F5F5F2] text-[#004C97] hover:bg-[#004C97]/10 transition-colors"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function QuoteStatusBadge({ status }: { status: QuoteStatus }) {
  let styles = "bg-gray-100 text-gray-600";
  
  if (status === "PENDING") styles = "bg-orange-100 text-orange-700";
  if (status === "REVIEWING") styles = "bg-blue-100 text-blue-700";
  if (status === "APPROVED") styles = "bg-green-100 text-green-700";
  if (status === "REJECTED") styles = "bg-red-100 text-red-700";
  if (status === "EXPIRED") styles = "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full ${styles}`}>
      {status}
    </span>
  );
}

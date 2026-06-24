import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Eye } from "lucide-react";
import { OrderStatus } from "@prisma/client";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: true,
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#0B1215]">Orders</h1>
        <p className="text-sm text-black/50 mt-1">Manage customer orders and update shipping statuses.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F2] border-b border-[#E5E5E5]">
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Order #</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-black/50 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-black/50 text-sm">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#0B1215]">{order.orderNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-black/60">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#0B1215]">{order.user.fullName}</span>
                      <span className="block text-xs text-black/50">{order.user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#0B1215]">KES {order.totalAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
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

export function StatusBadge({ status }: { status: OrderStatus }) {
  let styles = "bg-gray-100 text-gray-600";
  
  if (status === "PENDING") styles = "bg-orange-100 text-orange-700";
  if (status === "PAID") styles = "bg-blue-100 text-blue-700";
  if (status === "PROCESSING") styles = "bg-purple-100 text-purple-700";
  if (status === "SHIPPED") styles = "bg-green-100 text-green-700";
  if (status === "DELIVERED") styles = "bg-teal-100 text-teal-700";
  if (status === "CANCELLED") styles = "bg-red-100 text-red-700";

  return (
    <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full ${styles}`}>
      {status}
    </span>
  );
}

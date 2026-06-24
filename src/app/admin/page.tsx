import { prisma } from "@/lib/prisma";
import { Package, Users, FileText, ShoppingBag } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminOverviewPage() {
  const [
    totalProducts,
    totalOrders,
    totalQuotes,
    totalCustomers
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.quote.count(),
    prisma.user.count(),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-[#0B1215] mb-6">Dashboard Overview</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Total Products"
          value={totalProducts}
          icon={<Package size={24} />}
          href="/admin/products"
          color="bg-blue-50 text-blue-600"
        />
        <MetricCard
          title="Orders"
          value={totalOrders}
          icon={<ShoppingBag size={24} />}
          href="/admin/orders"
          color="bg-green-50 text-green-600"
        />
        <MetricCard
          title="Quote Requests"
          value={totalQuotes}
          icon={<FileText size={24} />}
          href="/admin/quotes"
          color="bg-purple-50 text-purple-600"
        />
        <MetricCard
          title="Customers"
          value={totalCustomers}
          icon={<Users size={24} />}
          href="/admin/customers"
          color="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Stub */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h2 className="text-lg font-semibold text-[#0B1215] mb-4">Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-black/50">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b border-[#E5E5E5] last:border-0">
                  <div>
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-black/50">{order.user.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">KES {order.totalAmount.toLocaleString()}</p>
                    <p className="text-[10px] uppercase font-bold text-black/40">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href="/admin/orders" className="block mt-4 text-sm font-medium text-[#004C97] hover:underline">
            View all orders
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
          <h2 className="text-lg font-semibold text-[#0B1215] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E5E5] hover:bg-black/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Package size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-[#0B1215]">Add New Product</p>
                <p className="text-xs text-black/50">Create a new item in the catalog</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, href, color }: any) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 transition-all group-hover:shadow-md group-hover:border-black/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-black/50">{title}</p>
            <p className="text-3xl font-semibold text-[#0B1215] mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );
}

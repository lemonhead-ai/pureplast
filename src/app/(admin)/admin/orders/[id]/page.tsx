import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Package, Truck, User } from "lucide-react";
import OrderStatusClient from "./OrderStatusClient";
import { StatusBadge } from "../page";

export const revalidate = 0;

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      items: {
        include: { product: true }
      },
      payments: true,
    }
  });

  if (!order) notFound();

  // Find address
  const address = await prisma.address.findFirst({
    where: { userId: order.userId },
    orderBy: { id: 'desc' }
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/orders" className="inline-flex items-center text-sm font-medium text-black/50 hover:text-[#0B1215] mb-4">
          <ArrowLeft size={16} className="mr-2" /> Back to Orders
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#0B1215] flex items-center gap-3">
              Order {order.orderNumber}
              <StatusBadge status={order.status} />
            </h1>
            <p className="text-sm text-black/50 mt-1">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          
          <OrderStatusClient orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Items & Payment */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center gap-3">
              <Package size={20} className="text-[#004C97]" />
              <h2 className="text-lg font-semibold text-[#0B1215]">Items Ordered</h2>
            </div>
            <div className="p-6 space-y-4">
              {order.items.map((item: any) => (
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
                    <p className="text-sm font-semibold text-[#0B1215]">KES {item.priceSnapshot.toLocaleString()}</p>
                    <p className="text-xs text-black/50">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-[#E5E5E5] flex justify-between items-center">
                <span className="text-sm font-semibold text-black/60">Total Amount</span>
                <span className="text-lg font-bold text-[#0B1215]">KES {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center gap-3">
              <CheckCircle size={20} className="text-[#00A15D]" />
              <h2 className="text-lg font-semibold text-[#0B1215]">Payment Information</h2>
            </div>
            <div className="p-6">
              {order.payments.length > 0 ? (
                <div className="space-y-3">
                  {order.payments.map((payment: any) => (
                    <div key={payment.id} className="p-4 rounded-xl border border-[#00A15D]/20 bg-[#00A15D]/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-[#00A15D]">Successful Payment</span>
                        <span className="text-xs font-bold text-[#00A15D] uppercase">{payment.status}</span>
                      </div>
                      <p className="text-sm text-[#0B1215]">Amount: <span className="font-semibold">KES {payment.amount.toLocaleString()}</span></p>
                      <p className="text-sm text-[#0B1215]">M-Pesa Receipt: <span className="font-semibold">{payment.mpesaReceipt || 'N/A'}</span></p>
                      <p className="text-xs text-black/50 mt-1">{new Date(payment.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-black/50">No payments recorded for this order yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Customer Info */}
        <div className="space-y-8">
          
          {/* Customer */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center gap-3">
              <User size={20} className="text-[#0B1215]" />
              <h2 className="text-lg font-semibold text-[#0B1215]">Customer</h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <p className="text-xs text-black/50 mb-1">Full Name</p>
                <p className="text-sm font-medium text-[#0B1215]">{order.user.fullName}</p>
              </div>
              <div>
                <p className="text-xs text-black/50 mb-1">Email</p>
                <p className="text-sm font-medium text-[#0B1215]">{order.user.email}</p>
              </div>
              <div>
                <p className="text-xs text-black/50 mb-1">Phone</p>
                <p className="text-sm font-medium text-[#0B1215]">{order.user.phone || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center gap-3">
              <Truck size={20} className="text-[#0B1215]" />
              <h2 className="text-lg font-semibold text-[#0B1215]">Shipping Address</h2>
            </div>
            <div className="p-6">
              {address ? (
                <div className="space-y-1">
                  <p className="text-sm text-[#0B1215]">{address.addressLine1}</p>
                  {address.addressLine2 && <p className="text-sm text-[#0B1215]">{address.addressLine2}</p>}
                  <p className="text-sm text-[#0B1215]">{address.city}, {address.postalCode}</p>
                  <p className="text-sm text-[#0B1215]">{address.country}</p>
                </div>
              ) : (
                <p className="text-sm text-black/50">No address provided.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

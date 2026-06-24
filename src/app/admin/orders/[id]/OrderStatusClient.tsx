"use client";

import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import { toast } from "sonner";
import { updateOrderStatus } from "../actions";

export default function OrderStatusClient({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string, 
  currentStatus: OrderStatus 
}) {
  const [loading, setLoading] = useState(false);

  const statuses: OrderStatus[] = [
    "PENDING",
    "PAID",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED"
  ];

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    
    // Ask for confirmation if marking as shipped
    if (newStatus === "SHIPPED") {
      const confirm = window.confirm("Marking this order as SHIPPED will send an email notification to the customer. Proceed?");
      if (!confirm) {
        e.target.value = currentStatus; // revert select
        return;
      }
    }

    setLoading(true);
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-[#0B1215]">Update Status:</span>
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={loading}
        className="h-10 px-4 rounded-xl border border-[#E5E5E5] bg-white focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm font-medium disabled:opacity-50"
      >
        {statuses.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

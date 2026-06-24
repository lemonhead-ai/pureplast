"use client";

import { useState } from "react";
import { QuoteStatus } from "@prisma/client";
import { toast } from "sonner";
import { replyToQuote, updateQuoteStatus } from "../actions";
import { Button } from "@/components/ui/Button";

export default function QuoteReplyClient({ 
  quoteId, 
  currentStatus,
  currentOfferedPrice,
  currentAdminNotes
}: { 
  quoteId: string, 
  currentStatus: QuoteStatus,
  currentOfferedPrice: number | null,
  currentAdminNotes: string | null
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<QuoteStatus>(currentStatus);

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as QuoteStatus;
    setLoading(true);
    try {
      await updateQuoteStatus(quoteId, newStatus);
      setStatus(newStatus);
      toast.success(`Quote status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quote status");
    } finally {
      setLoading(false);
    }
  }

  async function handleReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await replyToQuote(quoteId, formData);
      setStatus("APPROVED");
      toast.success("Reply sent to customer");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Status Update */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#0B1215]">Update Status:</span>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={loading}
          className="h-10 px-4 rounded-xl border border-[#E5E5E5] bg-white focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm font-medium disabled:opacity-50"
        >
          {["PENDING", "REVIEWING", "APPROVED", "REJECTED", "EXPIRED"].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
        <h2 className="text-lg font-semibold text-[#0B1215] mb-4">Reply to Customer</h2>
        <form onSubmit={handleReply} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0B1215]">Custom Price Offer (KES) - Optional</label>
            <input 
              name="offeredPrice"
              type="number" 
              step="0.01" 
              defaultValue={currentOfferedPrice || ""}
              placeholder="e.g. 150000"
              className="w-full h-11 px-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm"
            />
            <p className="text-xs text-black/50">Leave blank if quoting standard prices.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#0B1215]">Message / Notes</label>
            <textarea 
              name="adminNotes"
              defaultValue={currentAdminNotes || ""}
              rows={4}
              placeholder="Type your reply to the customer..."
              className="w-full p-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 text-sm resize-none"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Approve & Send Reply"}
          </Button>
        </form>
      </div>
    </div>
  );
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { QuoteStatus } from "@prisma/client";

export async function updateQuoteStatus(quoteId: string, status: QuoteStatus) {
  await prisma.quote.update({
    where: { id: quoteId },
    data: { status }
  });

  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${quoteId}`);
  revalidatePath("/admin");
  
  return { success: true };
}

export async function replyToQuote(quoteId: string, formData: FormData) {
  const offeredPriceStr = formData.get("offeredPrice") as string;
  const adminNotes = formData.get("adminNotes") as string;

  const offeredPrice = offeredPriceStr ? parseFloat(offeredPriceStr) : null;

  await prisma.quote.update({
    where: { id: quoteId },
    data: {
      status: "APPROVED", // Auto approve when replying with price
      offeredPrice,
      adminNotes
    }
  });

  revalidatePath("/admin/quotes");
  revalidatePath(`/admin/quotes/${quoteId}`);
  
  return { success: true };
}

"use server";

import { prisma } from "@/lib/prisma";
import type { CartProduct } from "@/store/useCartStore";

export async function processQuoteRequest(formData: FormData, quoteItems: CartProduct[]) {
  if (!quoteItems || quoteItems.length === 0) {
    throw new Error("Your quote cart is empty.");
  }

  const email = formData.get("email") as string;
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const companyName = formData.get("companyName") as string;

  if (!email || !fullName || !companyName) {
    throw new Error("Missing required contact information.");
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert User
      const user = await tx.user.upsert({
        where: { email },
        update: {
          fullName,
          phone: phone || null,
        },
        create: {
          email,
          fullName,
          phone: phone || null,
        },
      });

      // 2. Create Quote
      const quote = await tx.quote.create({
        data: {
          userId: user.id,
          status: "PENDING",
        },
      });

      // 3. Create QuoteItems
      const quoteItemsData = quoteItems.map(item => ({
        quoteId: quote.id,
        productId: item.id,
        quantity: item.quantity,
      }));

      await tx.quoteItem.createMany({
        data: quoteItemsData,
      });

      return { success: true, quoteId: quote.id };
    });

    return result;
  } catch (error: any) {
    console.error("Quote submission error:", error);
    throw new Error(error.message || "Failed to submit quote request.");
  }
}

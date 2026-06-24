"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { sendOrderShippedEmail } from "@/lib/email";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      user: true,
    }
  });

  if (status === OrderStatus.SHIPPED && order.user.email) {
    // Send email notification
    await sendOrderShippedEmail(order.user.email, order.orderNumber, order.user.fullName);
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin");
  
  return { success: true };
}

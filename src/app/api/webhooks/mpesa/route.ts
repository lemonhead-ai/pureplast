import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received M-Pesa Webhook:", JSON.stringify(data, null, 2));

    const body = data.Body.stkCallback;
    const checkoutRequestID = body.CheckoutRequestID;
    const resultCode = body.ResultCode;

    // We can extract metadata if payment was successful
    let mpesaReceiptNumber = null;
    let amount = 0;
    let phoneNumber = "";
    
    if (resultCode === 0 && body.CallbackMetadata) {
      const metadata = body.CallbackMetadata.Item;
      metadata.forEach((item: any) => {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
        if (item.Name === "PhoneNumber") phoneNumber = item.Value;
      });
    }

    // Since Daraja webhook only gives us the phone number, amount, and receipt number,
    // we have to match it against orders. However, ideally we stored the `CheckoutRequestID`
    // in the `Payment` table when initiating STK push.
    // For this simplified version, let's just log it and assume we match it manually,
    // or we can find the most recent PENDING order for this phone number.
    
    if (resultCode === 0 && mpesaReceiptNumber) {
      // Find the most recent PENDING order for a user with this phone number
      const user = await prisma.user.findFirst({
        where: { phone: { contains: phoneNumber.toString().slice(-9) } }, // Match last 9 digits safely
        orderBy: { createdAt: 'desc' }
      });

      if (user) {
        const order = await prisma.order.findFirst({
          where: { userId: user.id, status: OrderStatus.PENDING },
          orderBy: { createdAt: 'desc' }
        });

        if (order) {
          // Create Payment record
          await prisma.payment.create({
            data: {
              orderId: order.id,
              amount: amount,
              mpesaReceipt: mpesaReceiptNumber,
              transactionId: checkoutRequestID,
              status: PaymentStatus.SUCCESS,
              paidAt: new Date(),
            }
          });

          // Update Order
          await prisma.order.update({
            where: { id: order.id },
            data: { status: OrderStatus.PAID }
          });

          console.log(`Successfully processed payment for order ${order.orderNumber}`);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("M-Pesa Webhook Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Received M-Pesa Webhook:", JSON.stringify(data, null, 2));

    const body = data?.Body?.stkCallback;
    if (!body) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    const checkoutRequestID = body.CheckoutRequestID;
    const resultCode = body.ResultCode;

    let mpesaReceiptNumber: string | null = null;
    let amount = 0;
    
    if (resultCode === 0 && body.CallbackMetadata) {
      const metadata = body.CallbackMetadata.Item;
      metadata.forEach((item: any) => {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value;
      });
    }

    if (!checkoutRequestID) {
      return NextResponse.json({ success: false, error: "Missing CheckoutRequestID" }, { status: 400 });
    }

    // 1. Find the payment record created during STK push
    const payment = await prisma.payment.findUnique({
      where: { transactionId: checkoutRequestID },
      include: { order: true }
    });

    if (!payment) {
      console.error(`Payment not found for CheckoutRequestID: ${checkoutRequestID}`);
      return NextResponse.json({ success: false, error: "Payment not found" }, { status: 404 });
    }

    // 2. Idempotency Check: Don't process if already successful
    if (payment.status === PaymentStatus.SUCCESS) {
      console.log(`Payment ${payment.id} already processed.`);
      return NextResponse.json({ success: true, message: "Already processed" });
    }

    if (resultCode === 0 && mpesaReceiptNumber) {
      // 3. Process Successful Payment
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: payment.id },
          data: {
            mpesaReceipt: mpesaReceiptNumber,
            status: PaymentStatus.SUCCESS,
            paidAt: new Date(),
          }
        });

        await tx.order.update({
          where: { id: payment.orderId },
          data: { status: OrderStatus.PAID }
        });
      });

      console.log(`Successfully processed payment for order ${payment.order.orderNumber}`);
    } else {
      // 4. Process Failed Payment
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.FAILED }
      });
      console.log(`Payment failed for order ${payment.order.orderNumber}. ResultCode: ${resultCode}`);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("M-Pesa Webhook Error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


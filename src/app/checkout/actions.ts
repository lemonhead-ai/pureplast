"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { initiateStkPush } from "@/lib/mpesa";

export async function processCheckout(
  formData: FormData,
  cartItems: { id: string; quantity: number }[]
) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const addressLine1 = formData.get("addressLine1") as string;
  const city = formData.get("city") as string;
  const postalCode = formData.get("postalCode") as string;
  const paymentMethod = formData.get("paymentMethod") as string;

  if (!cartItems.length) {
    throw new Error("Cart is empty");
  }

  // 1. Fetch products from database to ensure accurate pricing and stock
  const productIds = cartItems.map((item) => item.id);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new Error("Some products in your cart are no longer available.");
  }

  // Calculate totals and prepare order items
  let subtotal = 0;
  const orderItemsData = [];

  for (const cartItem of cartItems) {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) continue;

    if (product.stockQuantity < cartItem.quantity) {
      throw new Error(`Not enough stock for ${product.name}`);
    }

    subtotal += product.price * cartItem.quantity;
    orderItemsData.push({
      productId: product.id,
      quantity: cartItem.quantity,
      priceSnapshot: product.price,
    });
  }

  const shipping = 500; // Hardcoded flat rate for now
  const totalAmount = subtotal + shipping;

  // Generate unique order number
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

  // 2. Perform database transaction
  const order = await prisma.$transaction(async (tx) => {
    // Upsert User
    const user = await tx.user.upsert({
      where: { email },
      update: {
        fullName,
        phone,
      },
      create: {
        email,
        fullName,
        phone,
      },
    });

    // Create Address
    await tx.address.create({
      data: {
        userId: user.id,
        addressLine1,
        city,
        postalCode,
        country: "Kenya", // Defaulting for now
      },
    });

    // Create Order
    const newOrder = await tx.order.create({
      data: {
        userId: user.id,
        orderNumber,
        totalAmount,
        status: OrderStatus.PENDING,
        items: {
          create: orderItemsData,
        },
      },
    });

    // Deduct stock
    for (const item of orderItemsData) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    return newOrder;
  });

  if (paymentMethod === "mpesa") {
    try {
      await initiateStkPush(phone, totalAmount, order.orderNumber);
    } catch (err: any) {
      console.error("M-Pesa STK Push Error:", err);
      // We don't fail the order creation, but we could return a warning
      // so the user knows they need to pay via paybill manually or retry.
    }
  }

  console.log("Order created:", order.orderNumber);

  revalidatePath("/admin/orders");
  
  return { 
    success: true, 
    orderId: order.id, 
    orderNumber: order.orderNumber 
  };
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { initiateStkPush } from "@/lib/mpesa";

import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Phone number is too short"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(2, "Postal code is required"),
  paymentMethod: z.string(),
});

export async function processCheckout(
  formData: FormData,
  cartItems: { id: string; quantity: number }[]
) {
  const rawData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    addressLine1: formData.get("addressLine1"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    paymentMethod: formData.get("paymentMethod"),
  };

  const parsed = checkoutSchema.safeParse(rawData);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { fullName, email, phone, addressLine1, city, postalCode, paymentMethod } = parsed.data;

  if (!cartItems || !cartItems.length) {
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
  const orderItemsData: { productId: string; quantity: number; priceSnapshot: number }[] = [];

  for (const cartItem of cartItems) {
    const product = products.find((p) => p.id === cartItem.id);
    if (!product) continue;

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
      const response = await initiateStkPush(phone, totalAmount, order.orderNumber);
      
      if (response && response.CheckoutRequestID) {
        // Log the pending payment to track it securely with CheckoutRequestID
        await prisma.payment.create({
          data: {
            orderId: order.id,
            amount: totalAmount,
            transactionId: response.CheckoutRequestID,
            status: "PENDING"
          }
        });
      }
    } catch (err: any) {
      console.error("M-Pesa STK Push Error:", err);
      // Even if STK Push fails, order is created. User can retry payment from their dashboard.
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

import { prisma } from "@/lib/prisma";
import { Package, Users, FileText, ShoppingBag, Plus, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminOverviewPage() {
  const [
    totalProducts,
    totalOrders,
    totalQuotes,
    totalCustomers
  ] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.quote.count(),
    prisma.user.count(),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <AdminDashboardClient 
      metrics={{ totalProducts, totalOrders, totalQuotes, totalCustomers }} 
      recentOrders={recentOrders} 
    />
  );
}

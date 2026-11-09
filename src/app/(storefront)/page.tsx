import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientHome from "./ClientHome";
import { mapDbProduct, PRODUCTS } from "@/data/products";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "PurePlast | Industrial Precision Plastic Manufacturing Kenya",
  description:
    "PurePlast is an industrial plastic manufacturer based in Kitengela, Kenya. We manufacture precision engineered plastic components, consumer homewares, and custom injection-moulded tooling.",
};

export default async function Home() {
  let allProducts = PRODUCTS;

  try {
    const dbProducts = await prisma.product.findMany({
      where: { active: true },
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbProducts.length > 0) {
      allProducts = dbProducts.map(mapDbProduct);
    }
  } catch (error) {
    console.error("Database connection fallback on Home:", error);
    // Graceful fallback to static products catalog
  }

  const categoryCounts: Record<string, number> = {};
  for (const product of allProducts) {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  }

  const featuredProducts = allProducts.filter((p) => p.featured);

  return (
    <ClientHome
      featuredProducts={featuredProducts}
      categoryCounts={categoryCounts}
    />
  );
}

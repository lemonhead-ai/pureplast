import { prisma } from "@/lib/prisma";
import ClientHome from "./ClientHome";
import { mapDbProduct } from "@/data/products";

export const revalidate = 60;

export default async function Home() {
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  const allProducts = dbProducts.map(mapDbProduct);

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

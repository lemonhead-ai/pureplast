import { prisma } from "@/lib/prisma";
import ClientHome from "./ClientHome";
import { type Product, type ProductCategory } from "@/data/products";

export const revalidate = 60; // Revalidate every minute

export default async function Home() {
  // Fetch active products
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  });

  // Convert dbProducts to frontend Product interface
  const allProducts: Product[] = dbProducts.map((p: any) => {
    const sortedImages = p.images
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
      .map((img: any) => img.imageUrl);

    const aImages =
      sortedImages.length > 0
        ? sortedImages
        : p.imageUrl
        ? [p.imageUrl]
        : [];

    return {
      id: p.id,
      name: p.name,
      description: p.description || "",
      price: p.price,
      image: p.imageUrl || "",
      images: aImages,
      isEngineered: p.category === "engineered",
      category: p.category as ProductCategory,
      sku: p.sku,
      featured: p.featured,
      unit: p.unit || undefined,
      inStock: p.category === "engineered" ? true : p.stockQuantity >= 0,
    };
  });

  // Calculate category counts
  const categoryCounts: Record<string, number> = {};
  for (const product of allProducts) {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  }

  // Get featured products
  const featuredProducts = allProducts.filter((p) => p.featured);

  return (
    <ClientHome
      featuredProducts={featuredProducts}
      categoryCounts={categoryCounts}
    />
  );
}
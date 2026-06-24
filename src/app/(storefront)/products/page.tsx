import { prisma } from "@/lib/prisma";
import ClientCatalog from "./ClientCatalog";
import { type Product, type ProductCategory } from "@/data/products";

// Revalidate the product catalog every 60 seconds
export const revalidate = 60;

export default async function ProductsPage() {
  // Fetch active products from the database, including all their images
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    orderBy: { createdAt: "asc" },
  });

  const products: Product[] = dbProducts.map((p: any) => {
    // Ensure we sort images correctly by their sortOrder
    const sortedImages = p.images
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
      .map((img: any) => img.imageUrl);

    // If the product has images, we prepend the main imageUrl to the list
    // or just use the sortedImages. In the seed script, we inserted all images.
    const allImages =
      sortedImages.length > 0
        ? sortedImages
        : p.imageUrl
        ? [p.imageUrl]
        : [];

    return {
      id: p.id, // Using the DB ID here!
      name: p.name,
      description: p.description || "",
      price: p.price,
      image: p.imageUrl || "",
      images: allImages,
      isEngineered: p.category === "engineered",
      category: p.category as ProductCategory,
      sku: p.sku,
      featured: p.featured,
      unit: p.unit || undefined,
      inStock: p.category === "engineered" ? true : p.stockQuantity >= 0, // Fallback logic
    };
  });

  return <ClientCatalog products={products} />;
}
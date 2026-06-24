import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ClientProductDetail from "./ClientProductDetail";
import { type Product, type ProductCategory } from "@/data/products";

// Revalidate every minute
export const revalidate = 60;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // 1. Fetch the requested product by ID
  const dbProduct = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!dbProduct || !dbProduct.active) {
    notFound();
  }

  // 2. Fetch related products (same category, active, exclude current)
  const dbRelated = await prisma.product.findMany({
    where: {
      category: dbProduct.category,
      active: true,
      id: { not: dbProduct.id },
    },
    take: 3,
    include: { images: true },
  });

  // Ensure images are sorted
  const sortedImages = dbProduct.images
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
    .map((img: any) => img.imageUrl);

  const aImages =
    sortedImages.length > 0
      ? sortedImages
      : dbProduct.imageUrl
      ? [dbProduct.imageUrl]
      : [];

  const product: Product = {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description || "",
    price: dbProduct.price,
    image: dbProduct.imageUrl || "",
    images: aImages,
    isEngineered: dbProduct.category === "engineered",
    category: dbProduct.category as ProductCategory,
    sku: dbProduct.sku,
    featured: dbProduct.featured,
    unit: dbProduct.unit || undefined,
    inStock: dbProduct.category === "engineered" ? true : dbProduct.stockQuantity >= 0,
  };

  // Convert related products
  const relatedProducts: Product[] = dbRelated.map((p: any) => {
    const relSortedImages = p.images
      .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
      .map((img: any) => img.imageUrl);

    return {
      id: p.id,
      name: p.name,
      description: p.description || "",
      price: p.price,
      image: p.imageUrl || "",
      images: relSortedImages.length > 0 ? relSortedImages : p.imageUrl ? [p.imageUrl] : [],
      isEngineered: p.category === "engineered",
      category: p.category as ProductCategory,
      sku: p.sku,
      featured: p.featured,
      unit: p.unit || undefined,
      inStock: p.category === "engineered" ? true : p.stockQuantity >= 0,
    };
  });

  return <ClientProductDetail product={product} relatedProducts={relatedProducts} />;
}

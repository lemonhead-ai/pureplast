import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientProductDetail from "./ClientProductDetail";
import { mapDbProduct, PRODUCTS } from "@/data/products";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let product = PRODUCTS.find((p) => p.id === id);

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (dbProduct) {
      product = mapDbProduct(dbProduct);
    }
  } catch {
    // fallback to static
  }

  if (!product) {
    return {
      title: "Product Not Found | PurePlast",
    };
  }

  return {
    title: `${product.name} (${product.sku}) | PurePlast Kenya`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product = PRODUCTS.find((p) => p.id === id);
  let relatedProducts = PRODUCTS.filter(
    (p) => p.category === product?.category && p.id !== id
  ).slice(0, 3);

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (dbProduct && dbProduct.active) {
      product = mapDbProduct(dbProduct);

      const dbRelated = await prisma.product.findMany({
        where: {
          category: dbProduct.category,
          active: true,
          id: { not: dbProduct.id },
        },
        take: 3,
        include: { images: true },
      });

      if (dbRelated.length > 0) {
        relatedProducts = dbRelated.map(mapDbProduct);
      }
    }
  } catch (error) {
    console.error("Database fallback on Product detail page:", error);
  }

  if (!product) {
    notFound();
  }

  return <ClientProductDetail product={product} relatedProducts={relatedProducts} />;
}

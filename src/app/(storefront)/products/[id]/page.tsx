import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ClientProductDetail from "./ClientProductDetail";
import { mapDbProduct } from "@/data/products";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const dbProduct = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!dbProduct || !dbProduct.active) {
    notFound();
  }

  const dbRelated = await prisma.product.findMany({
    where: {
      category: dbProduct.category,
      active: true,
      id: { not: dbProduct.id },
    },
    take: 3,
    include: { images: true },
  });

  const product = mapDbProduct(dbProduct);
  const relatedProducts = dbRelated.map(mapDbProduct);

  return <ClientProductDetail product={product} relatedProducts={relatedProducts} />;
}

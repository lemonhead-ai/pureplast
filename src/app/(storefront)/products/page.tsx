import { prisma } from "@/lib/prisma";
import ClientCatalog from "./ClientCatalog";
import { mapDbProduct } from "@/data/products";

export const revalidate = 60;

export default async function ProductsPage() {
  const dbProducts = await prisma.product.findMany({
    where: { active: true },
    include: { images: true },
    orderBy: { createdAt: "asc" },
  });

  const products = dbProducts.map(mapDbProduct);

  return <ClientCatalog products={products} />;
}

import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientCatalog from "./ClientCatalog";
import { mapDbProduct, PRODUCTS } from "@/data/products";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Product Catalogue | PurePlast Industrial Plastics Kenya",
  description:
    "Explore PurePlast's full catalogue of industrial plastic products: basins, tableware plates, mugs, tumblers, clothes hangers, laundry pegs, and precision engineered components.",
};

export default async function ProductsPage() {
  let products = PRODUCTS;

  try {
    const dbProducts = await prisma.product.findMany({
      where: { active: true },
      include: { images: true },
      orderBy: { createdAt: "asc" },
    });

    if (dbProducts.length > 0) {
      products = dbProducts.map(mapDbProduct);
    }
  } catch (error) {
    console.error("Database connection fallback on Products page:", error);
  }

  return <ClientCatalog products={products} />;
}

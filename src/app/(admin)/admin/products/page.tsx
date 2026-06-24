import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { orderItems: true, quoteItems: true }
      }
    }
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#0B1215]">Products</h1>
          <p className="text-sm text-black/50 mt-1">Manage your product catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F5F5F2] text-xs uppercase font-bold text-black/50 border-b border-[#E5E5E5]">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-black/50">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-black/5 overflow-hidden flex-shrink-0">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-black/20">
                              <span className="text-xs">No img</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-[#0B1215]">{product.name}</p>
                          <p className="text-xs text-black/50">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">{product.category.replace("-", " ")}</span>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      KES {product.price.toLocaleString()}
                      {product.unit && <span className="text-xs text-black/50 ml-1">/ {product.unit}</span>}
                    </td>
                    <td className="px-6 py-4">
                      {product.category === "engineered" ? (
                        <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-md">Custom</span>
                      ) : (
                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${product.stockQuantity > 10 ? "bg-green-100 text-green-700" : product.stockQuantity > 0 ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                          {product.stockQuantity} in stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {product.active ? (
                          <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                        )}
                        <span className={product.active ? "text-green-700" : "text-red-700"}>
                          {product.active ? "Active" : "Draft"}
                        </span>
                      </div>
                      {product.featured && (
                        <span className="text-[10px] uppercase font-bold text-[#004C97] mt-1 block">Featured</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <button className="w-8 h-8 rounded-lg hover:bg-black/5 flex items-center justify-center text-black/50 hover:text-black transition-colors" title="Edit">
                            <Edit2 size={14} />
                          </button>
                        </Link>
                        {/* Delete logic would be a client component or server action form */}
                        <form action={async () => {
                          "use server"
                          // In a real app we'd call an action here
                        }}>
                          <button disabled className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-black/50 hover:text-red-600 transition-colors opacity-50 cursor-not-allowed" title="Delete (coming soon)">
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

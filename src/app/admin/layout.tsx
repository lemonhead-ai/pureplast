import Link from "next/link";
import { Package, Users, FileText, Settings, ShoppingBag, LayoutDashboard, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5E5E5] flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#E5E5E5]">
          <Link href="/" className="font-bold text-xl text-[#0B1215]">
            PurePlast <span className="text-[#004C97]">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-black/70 hover:bg-black/5 hover:text-black transition-colors"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            Catalog
          </p>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-black/70 hover:bg-black/5 hover:text-black transition-colors"
          >
            <Package size={18} />
            Products
          </Link>

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            Sales
          </p>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-black/70 hover:bg-black/5 hover:text-black transition-colors"
          >
            <ShoppingBag size={18} />
            Orders
          </Link>

          <Link
            href="/admin/quotes"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-black/70 hover:bg-black/5 hover:text-black transition-colors"
          >
            <FileText size={18} />
            Quotes
          </Link>

          <p className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            Customers
          </p>

          <Link
            href="/admin/customers"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-black/70 hover:bg-black/5 hover:text-black transition-colors"
          >
            <Users size={18} />
            Customers
          </Link>
        </nav>

        <div className="p-4 border-t border-[#E5E5E5]">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-black/70 hover:bg-black/5 hover:text-black transition-colors mb-1"
          >
            <Settings size={18} />
            Settings
          </Link>
          <button
            type="button"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

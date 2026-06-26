"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Package, 
  Users, 
  FileText, 
  Settings, 
  ShoppingBag, 
  LayoutDashboard, 
  LogOut 
} from "lucide-react";
import { logout } from "@/app/(auth)/login/actions";

type User = {
  fullName: string | null;
  email: string;
};

export default function AdminSidebar({ user }: { user?: User | null }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, group: "general" },
    { name: "Products", href: "/admin/products", icon: Package, group: "catalog" },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag, group: "sales" },
    { name: "Quotes", href: "/admin/quotes", icon: FileText, group: "sales" },
    { name: "Customers", href: "/admin/customers", icon: Users, group: "customers" },
  ];

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col flex-shrink-0 rounded-[2rem] overflow-hidden relative z-20">
      <div className="h-20 flex items-center px-8">
        <Link href="/" className="font-bold text-xl tracking-tight text-[#0B1215]">
          PurePlast <span className="text-[#004C97] font-semibold opacity-80">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-3 px-4 py-3 text-[14px] font-medium rounded-2xl transition-colors z-10 ${
                isActive ? "text-[#004C97]" : "text-[#0B1215]/60 hover:text-[#0B1215]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 bg-[#004C97]/10 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={18} className={isActive ? "opacity-100" : "opacity-60"} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile / Settings Area */}
      <div className="p-4 mt-auto">
        <div className="bg-white/50 border border-white/40 rounded-2xl p-3 shadow-sm backdrop-blur-md">
          <Link
            href="/admin/settings"
            className={`relative flex items-center gap-3 px-3 py-2 text-[14px] font-medium rounded-xl transition-colors mb-2 z-10 ${
              pathname.startsWith("/admin/settings") ? "text-[#004C97] bg-[#004C97]/10" : "text-[#0B1215]/60 hover:bg-black/5 hover:text-[#0B1215]"
            }`}
          >
            <Settings size={18} strokeWidth={2} />
            Settings
          </Link>
          
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#004C97] to-[#60A5FA] text-white flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0">
                {user?.fullName?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#0B1215] truncate">{user?.fullName || "Admin"}</p>
                <p className="text-[10px] text-[#0B1215]/50 truncate">{user?.email}</p>
              </div>
            </div>
            
            {/* Logout uses an empty href or form to sign out in a real app, here we just link to a logout route or action */}
            <form action={logout}>
              <button
                type="submit"
                className="w-8 h-8 rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors"
                title="Logout"
              >
                <LogOut size={14} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}

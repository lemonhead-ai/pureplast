"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Package, Users, FileText, ShoppingBag, Plus, ArrowRight, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function AdminDashboardClient({ metrics, recentOrders }: { metrics: any, recentOrders: any[] }) {
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: metrics.totalProducts,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-50 text-blue-600",
      trend: "+12%"
    },
    {
      title: "Orders",
      value: metrics.totalOrders,
      icon: ShoppingBag,
      href: "/admin/orders",
      color: "bg-green-50 text-green-600",
      trend: "+4.5%"
    },
    {
      title: "Quotes",
      value: metrics.totalQuotes,
      icon: FileText,
      href: "/admin/quotes",
      color: "bg-purple-50 text-purple-600",
      trend: "+18%"
    },
    {
      title: "Customers",
      value: metrics.totalCustomers,
      icon: Users,
      href: "/admin/customers",
      color: "bg-orange-50 text-orange-600",
      trend: "+2.4%"
    }
  ];

  return (
    <div className="p-10 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-semibold text-[#0B1215] tracking-tight">{greeting}, Admin</h1>
        <p className="text-[#0B1215]/50 mt-1">Here is what is happening with your store today.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} variants={itemVariants}>
              <Link href={stat.href} className="block group">
                <div className="bg-white rounded-[1.5rem] border border-[#E5E5E5] p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-black/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${stat.color}`}>
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                      <TrendingUp size={12} strokeWidth={3} />
                      {stat.trend}
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0B1215]/50 uppercase tracking-wider">{stat.title}</p>
                    <p className="text-4xl font-semibold text-[#0B1215] mt-1 tracking-tight">{stat.value}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 bg-white rounded-[1.5rem] border border-[#E5E5E5] p-7 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#0B1215] tracking-tight">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-[#004C97] hover:underline flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          {recentOrders.length === 0 ? (
            <div className="py-12 text-center bg-[#FAFAF8] rounded-2xl border border-dashed border-[#E5E5E5]">
              <p className="text-sm text-[#0B1215]/50 font-medium">No orders yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: any, idx: number) => {
                let statusColor = "bg-gray-100 text-gray-700";
                if (order.status === "PENDING") statusColor = "bg-yellow-100 text-yellow-800";
                if (order.status === "PAID") statusColor = "bg-green-100 text-green-800";
                if (order.status === "SHIPPED") statusColor = "bg-blue-100 text-blue-800";
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1) }}
                    key={order.id} 
                    className="flex justify-between items-center p-4 rounded-2xl border border-[#E5E5E5] hover:bg-[#FAFAF8] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#FAFAF8] border border-[#E5E5E5] flex items-center justify-center font-semibold text-xs text-[#0B1215]">
                        {order.user.fullName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0B1215]">{order.user.fullName}</p>
                        <p className="text-xs text-[#0B1215]/50 font-medium">{order.orderNumber}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="text-sm font-bold text-[#0B1215]">KES {order.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-[#0B1215]/50 font-medium mt-0.5">Today</p>
                      </div>
                      <span className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full ${statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white rounded-[1.5rem] border border-[#E5E5E5] p-7 shadow-sm flex flex-col"
        >
          <h2 className="text-xl font-semibold text-[#0B1215] tracking-tight mb-6">Quick Actions</h2>
          <div className="space-y-4 flex-1">
            <Link
              href="/admin/products/new"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] hover:bg-white hover:shadow-md hover:border-[#004C97]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
                <Plus size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B1215]">Add Product</p>
                <p className="text-[13px] text-[#0B1215]/60 mt-0.5">Create a new item</p>
              </div>
            </Link>

            <Link
              href="/admin/customers/invite"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] hover:bg-white hover:shadow-md hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 group-hover:scale-110 transition-transform">
                <Users size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B1215]">Invite Customer</p>
                <p className="text-[13px] text-[#0B1215]/60 mt-0.5">Send portal access</p>
              </div>
            </Link>
          </div>
          
          <div className="mt-6 p-5 rounded-2xl bg-[#004C97]/5 border border-[#004C97]/10 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-[#004C97] mb-1">Need help?</h3>
              <p className="text-xs text-[#004C97]/70 leading-relaxed mb-3">View documentation on how to manage orders and quotes.</p>
              <Link href="#" className="text-xs font-bold bg-white text-[#004C97] px-3 py-1.5 rounded-lg shadow-sm hover:shadow inline-block transition-shadow">
                Docs &rarr;
              </Link>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#004C97]/10 rounded-full blur-xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

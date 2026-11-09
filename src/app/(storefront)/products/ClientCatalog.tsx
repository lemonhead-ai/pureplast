"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Package } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";
import {
  CATEGORIES,
  type ProductCategory,
  type Product,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

function getCategoryCount(category: string, products: Product[]): number {
  return products.filter((p) => p.category === category).length;
}

// ─── Category icons ──────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  household: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M6 2v6a3 3 0 006 0V2M6 8v14M18 2a4 4 0 010 8v12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "laundry-storage": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 6l2-4h14l2 4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  furniture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M4 17V8a2 2 0 012-2h12a2 2 0 012 2v9M4 17h16M7 17v3m10-3v3M4 11h16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "retail-hanging": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 3a2 2 0 012 2v1l6 4v10a1 1 0 01-1 1H5a1 1 0 01-1-1V10l6-4V5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  engineered: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// ─── Sidebar category nav ─────────────────────────────────────────────────────

function SidebarNav({
  active,
  onChange,
  collapsed,
  products,
}: {
  active: ProductCategory | "all";
  onChange: (c: ProductCategory | "all") => void;
  collapsed: boolean;
  products: Product[];
}) {
  const allCount = products.length;

  const allIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 shrink-0">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );

  return (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => onChange("all")}
        title={collapsed ? "All Products" : undefined}
        className={`group flex items-center text-left rounded-2xl transition-all duration-200 ${
          collapsed ? "justify-center px-0 py-3" : "justify-between px-4 py-3"
        } ${
          active === "all"
            ? "bg-[#0B1215] text-white"
            : "hover:bg-black/5 text-[#0B1215]"
        }`}
      >
        <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
          <span className={`${active === "all" ? "text-white/60" : "text-black/40"}`}>
            {allIcon}
          </span>
          {!collapsed && <span className="font-semibold text-sm">All Products</span>}
        </div>
        {!collapsed && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            active === "all" ? "bg-white/20 text-white" : "bg-black/8 text-black/50"
          }`}>
            {allCount}
          </span>
        )}
      </button>

      <div className="my-2 h-px bg-[#E5E5E5]" />

      {CATEGORIES.map((cat) => {
        const count = getCategoryCount(cat.id, products);
        const isActive = active === cat.id;
        const isComingSoon = cat.isComingSoon || count === 0;

        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            title={collapsed ? cat.label : undefined}
            className={`group flex items-center text-left rounded-2xl transition-all duration-200 ${
              collapsed ? "justify-center px-0 py-3" : "justify-between px-4 py-3"
            } ${
              isActive ? "text-white" : "hover:bg-black/5 text-[#0B1215]"
            }`}
            style={isActive ? { background: cat.accentColor } : {}}
          >
            <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
              <span className={`transition-colors shrink-0 ${isActive ? "text-white/70" : "text-black/40"}`}>
                {CATEGORY_ICONS[cat.id]}
              </span>
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="font-semibold text-sm leading-snug">{cat.label}</span>
                  {isComingSoon && !isActive && (
                    <span className="text-[10px] text-black/40">Coming soon</span>
                  )}
                </div>
              )}
            </div>
            {!collapsed && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-black/8 text-black/50"
              }`}>
                {isComingSoon ? "Soon" : count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ─── Mobile top tab bar ───────────────────────────────────────────────────────

function MobileCategoryBar({
  active,
  onChange,
  products,
}: {
  active: ProductCategory | "all";
  onChange: (c: ProductCategory | "all") => void;
  products: Product[];
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        onClick={() => onChange("all")}
        className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
          active === "all"
            ? "bg-[#0B1215] text-white"
            : "bg-black/6 text-[#0B1215]"
        }`}
      >
        All ({products.length})
      </button>

      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        const count = getCategoryCount(cat.id, products);
        const isComingSoon = cat.isComingSoon || count === 0;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all"
            style={{
              background: isActive ? cat.accentColor : `${cat.accentColor}18`,
              color: isActive ? "white" : cat.accentColor,
            }}
          >
            {cat.label} {isComingSoon ? "(Soon)" : `(${count})`}
          </button>
        );
      })}
    </div>
  );
}

// ─── Inner Page ───────────────────────────────────────────────────────────────

function ClientCatalogInner({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory | null;
    const validIds = CATEGORIES.map((c) => c.id) as string[];
    if (cat && validIds.includes(cat)) {
      setTimeout(() => setActiveCategory(cat), 0);
    } else {
      setTimeout(() => setActiveCategory("all"), 0);
    }
  }, [searchParams]);

  const activeData =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const filtered = search.trim()
    ? activeData.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase())
      )
    : activeData;

  const activeCategoryMeta =
    activeCategory !== "all"
      ? CATEGORIES.find((c) => c.id === activeCategory)
      : null;

  function handleCategoryChange(c: ProductCategory | "all") {
    setActiveCategory(c);
    setSearch("");
    if (window.innerWidth < 1024 && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-2 text-sm text-black/40 mb-2">
                <Link href="/" className="hover:text-[#004C97] transition-colors">Home</Link>
                <ChevronRight size={14} />
                <span className="text-[#004C97] font-semibold">Product Catalogue</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215]">
                {activeCategoryMeta ? (
                  <>
                    <span style={{ color: activeCategoryMeta.accentColor }}>
                      {activeCategoryMeta.label}
                    </span>
                    <span className="text-[#575859]"> Products</span>
                  </>
                ) : (
                  "Product Catalogue"
                )}
              </h1>
              <p className="mt-2 text-black/60 text-base max-w-lg">
                {activeCategoryMeta
                  ? activeCategoryMeta.tagline
                  : "Explore our complete range of factory-manufactured plastic products and engineered components."}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search products or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-3xl bg-[#F5F5F2] border border-[#E5E5E5] text-sm placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Mobile category pills */}
        <div className="lg:hidden mb-6">
          <MobileCategoryBar
            active={activeCategory}
            onChange={handleCategoryChange}
            products={products}
          />
        </div>

        <div className="flex gap-8 items-start">
          {/* ── Desktop Sidebar ─────────────────────────────────── */}
          <aside
            className="hidden lg:block shrink-0 sticky top-24 transition-all duration-300 ease-in-out"
            style={{ width: sidebarCollapsed ? "56px" : "260px" }}
          >
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-3 overflow-hidden">
              <div className={`flex items-center mb-1 ${sidebarCollapsed ? "justify-center" : "justify-between px-3"}`}>
                {!sidebarCollapsed && (
                  <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 py-2">
                    Categories
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed((v) => !v)}
                  title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-black/6 text-black/40 hover:text-black/70 transition-all duration-200 shrink-0"
                >
                  {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
              </div>

              <SidebarNav
                active={activeCategory}
                onChange={handleCategoryChange}
                collapsed={sidebarCollapsed}
                products={products}
              />
            </div>

            {/* Engineered CTA Card */}
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 rounded-3xl overflow-hidden bg-[#0B1215] p-5 space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60">
                  {CATEGORY_ICONS["engineered"]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">
                    Custom Parts Tooling
                  </h4>
                  <p className="text-white/55 text-xs mt-1 leading-relaxed">
                    We manufacture to exact CAD specifications (STEP/STL) with 24-hour quote turnaround.
                  </p>
                </div>
                <Link
                  href="/contact?type=custom-engineering"
                  className="block text-center py-2 bg-[#108E2B] hover:bg-[#108E2B]/90 text-white text-xs font-bold rounded-2xl transition-colors"
                >
                  Submit Drawings
                </Link>
              </motion.div>
            )}
          </aside>

          {/* ── Product Grid ─────────────────────────────────────── */}
          <div ref={gridRef} className="flex-1 min-w-0">
            {/* Results count header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-black/50 font-medium">
                {filtered.length === 0
                  ? "No products found"
                  : `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
                {search && (
                  <span className="ml-1">
                    matching <span className="text-[#004C97] font-semibold">&quot;{search}&quot;</span>
                  </span>
                )}
              </p>
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-sm text-black/50 hover:text-black underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-[#E5E5E5] bg-white"
              >
                <Package size={48} className="text-black/20 mb-4" />
                <h3 className="text-lg font-semibold text-black/60">
                  No products found
                </h3>
                <p className="text-sm text-black/40 mt-1 max-w-sm">
                  We couldn&apos;t find any items matching your filter. Try clearing the search or exploring our other product families.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-full"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearch("");
                  }}
                >
                  View All Products
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + search}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-300 ${
                    sidebarCollapsed ? "lg:grid-cols-3 xl:grid-cols-4" : "xl:grid-cols-3"
                  }`}
                >
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Custom Engineering Banner */}
            {activeCategory !== "engineered" && !search && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 rounded-3xl bg-[#0B1215] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                      Bespoke Polymer Engineering
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    Need a custom component or branded mould?
                  </h3>
                  <p className="text-white/60 text-sm mt-1 max-w-xl leading-relaxed">
                    We fabricate custom injection tooling and print prototypes from your STEP/STL files. Get a comprehensive technical review and cost estimate within 24 hours.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link href="/contact?type=custom-engineering">
                    <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 h-11 px-6 rounded-full font-semibold">
                      Request Technical Quote
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientCatalog({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={null}>
      <ClientCatalogInner products={products} />
    </Suspense>
  );
}

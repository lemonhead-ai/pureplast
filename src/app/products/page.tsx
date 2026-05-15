"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, FileText, ChevronRight, Package } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import {
  CATEGORIES,
  PRODUCTS,
  getCategoryCount,
  type ProductCategory,
  type Product,
} from "@/data/products";

// ─── Category icons (inline SVG strings rendered as components) ───────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  household: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  kitchen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M6 2v6a3 3 0 006 0V2M6 8v14M18 2a4 4 0 010 8v12" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "laundry-storage": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 6l2-4h14l2 4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  furniture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M4 17V8a2 2 0 012-2h12a2 2 0 012 2v9M4 17h16M7 17v3m10-3v3M4 11h16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "retail-hanging": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M12 3a2 2 0 012 2v1l6 4v10a1 1 0 01-1 1H5a1 1 0 01-1-1V10l6-4V5a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  engineered: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};


// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToBuyNow, addToQuote, openDrawer } = useCartStore();
  const [added, setAdded] = useState(false);

  const category = CATEGORIES.find((c) => c.id === product.category);

  function handleAdd() {
    if (product.isEngineered) {
      addToQuote(product);
      openDrawer("quote");
    } else {
      addToBuyNow(product);
      openDrawer("buy");
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group flex flex-col bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-2xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image zone */}
      <div className="relative aspect-[4/3] bg-[#F5F5F2] overflow-hidden">
        {product.image ? (
          /* ── Cloudinary image (or any absolute URL) ── */
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* ── Placeholder shown until a Cloudinary URL is added ── */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-black/20">
            <Package size={40} />
            <span className="text-xs font-medium tracking-wide uppercase">
              {product.sku}
            </span>
          </div>
        )}

        {/* Badge top-left */}
        <div className="absolute top-3 left-3 z-10">
          {product.isEngineered ? (
            <span
              className="px-3.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full"
              style={{
                background: `${category?.accentColor}18`,
                color: category?.accentColor,
                border: `1px solid ${category?.accentColor}30`,
              }}
            >
              Quote Only
            </span>
          ) : (
            <span className="px-2.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-white/80 backdrop-blur text-black/60 border border-black/10">
              In Stock
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/4 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category tag */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: category?.accentColor }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
            {category?.label}
          </span>
        </div>

        <h3 className="font-semibold text-[15px] leading-snug text-[#0B1215] flex-1">
          {product.name}
        </h3>
        <p className="text-xs text-black/50 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-3 border-t border-[#F0F0EE] flex items-center justify-between gap-3">
          {/* Price */}
          <div>
            {product.price ? (
              <>
                <p className="text-lg font-bold text-[#0B1215]">
                  KES {product.price.toLocaleString()}
                </p>
                {product.unit && (
                  <p className="text-[10px] text-black/40 -mt-0.5">{product.unit}</p>
                )}
              </>
            ) : (
              <p className="text-sm font-regular text-red-500">Quote Required</p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-2xl transition-all duration-200 whitespace-nowrap
              ${
                added
                  ? "bg-[#108E2B] text-white scale-95"
                  : product.isEngineered
                  ? "bg-[#004C97]/10 text-[#004C97] hover:bg-[#004C97] hover:text-white"
                  : "bg-[#0B1215]/8 text-[#0B1215] hover:bg-[#0B1215] hover:text-white"
              }`}
          >
            {added ? (
              "Added ✓"
            ) : product.isEngineered ? (
              <>
                <FileText size={13} /> Quote
              </>
            ) : (
              <>
                <ShoppingCart size={13} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Sidebar category nav ─────────────────────────────────────────────────────

function SidebarNav({
  active,
  onChange,
}: {
  active: ProductCategory | "all";
  onChange: (c: ProductCategory | "all") => void;
}) {
  const allCount = PRODUCTS.length;

  return (
    <nav className="flex flex-col gap-1">
      <button
        onClick={() => onChange("all")}
        className={`group flex items-center justify-between text-left px-4 py-3 rounded-2xl transition-all duration-200 ${
          active === "all"
            ? "bg-[#0B1215] text-white"
            : "hover:bg-black/5 text-[#0B1215]"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`${active === "all" ? "text-white/60" : "text-black/40"}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </span>
          <span className="font-semibold text-sm">All Products</span>
        </div>
        <span
          className={`text-sm font-regular px-2 py-0.5 rounded-full ${
            active === "all" ? "bg-white/20 text-white" : "bg-black/8 text-black/50"
          }`}
        >
          {allCount}
        </span>
      </button>

      <div className="my-2 h-px bg-[#E5E5E5]" />

      {CATEGORIES.map((cat) => {
        const count = getCategoryCount(cat.id);
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`group flex items-center justify-between text-left px-4 py-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? "text-white"
                : "hover:bg-black/5 text-[#0B1215]"
            }`}
            style={isActive ? { background: cat.accentColor } : {}}
          >
            <div className="flex items-center gap-3">
              <span
                className={`transition-colors ${
                  isActive ? "text-white/70" : "text-black/40"
                }`}
              >
                {CATEGORY_ICONS[cat.id]}
              </span>
              <span className="font-semibold text-sm leading-snug">{cat.label}</span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isActive ? "bg-white/20 text-white" : "bg-black/8 text-black/50"
              }`}
            >
              {count}
            </span>
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
}: {
  active: ProductCategory | "all";
  onChange: (c: ProductCategory | "all") => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      style={{ scrollbarWidth: "none" }}
    >
      {/* All */}
      <button
        onClick={() => onChange("all")}
        className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
          active === "all"
            ? "bg-[#0B1215] text-white"
            : "bg-black/6 text-[#0B1215]"
        }`}
      >
        All ({PRODUCTS.length})
      </button>

      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all text-white"
            style={{
              background: isActive ? cat.accentColor : `${cat.accentColor}18`,
              color: isActive ? "white" : cat.accentColor,
            }}
          >
            {cat.label} ({getCategoryCount(cat.id)})
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    "all"
  );
  const [search, setSearch] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  // Sync ?category= URL param → active filter on first render
  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory | null;
    const validIds = CATEGORIES.map((c) => c.id) as string[];
    if (cat && validIds.includes(cat)) {
      setTimeout(() => {
        setActiveCategory(cat);
      }, 0);
    } else {
      setTimeout(() => {
        setActiveCategory("all");
      }, 0);
    }
  }, [searchParams]);

  const activeData =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

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
    // Smooth scroll to grid on mobile
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
              <div className="flex items-center gap-2 text-sm text-black/40 font-regular mb-2">
                <span>PurePlast</span>
                <ChevronRight size={14} />
                <span className="font-regular text-[#004C97]">Product Catalog</span>
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
                  "Product Catalog"
                )}
              </h1>
              <p className="mt-2 text-black/50 text-base max-w-lg">
                {activeCategoryMeta
                  ? activeCategoryMeta.tagline
                  : "Browse our complete range of plastic products."}
              </p>
            </div>

            {/* Search */}
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
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-3xl bg-[#F5F5F2] border border-[#E5E5E5] text-sm placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Mobile category bar */}
        <div className="lg:hidden mb-6">
          <MobileCategoryBar
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="flex gap-8 items-start">
          {/* ── Desktop Sidebar ─────────────────────────────────── */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28">
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-3">
              <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-black/60 px-6 py-2">
                Categories
              </p>
              <SidebarNav
                active={activeCategory}
                onChange={handleCategoryChange}
              />
            </div>

            {/* Engineered CTA card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 rounded-3xl overflow-hidden"
              style={{ background: "#0B1215" }}
            >
              <div className="p-5 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white/60">
                  {CATEGORY_ICONS["engineered"]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">
                    Need custom parts?
                  </h4>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">
                    We manufacture to your exact specifications. Share your drawings or CAD files.
                  </p>
                </div>
                <button
                  onClick={() => handleCategoryChange("engineered")}
                  className="py-1 bg-[#108E2B] hover:bg-white text-white hover:text-green-950 border-0 h-10 px-3 rounded-3xl transition-colors"
                >
                  View Engineered Parts
                </button>
              </div>
            </motion.div>
          </aside>

          {/* ── Product Grid ─────────────────────────────────────── */}
          <div ref={gridRef} className="flex-1 min-w-0">
            {/* Results count / state */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-black/40 font-medium">
                {filtered.length === 0
                  ? "No products found"
                  : `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
                {search && (
                  <span className="ml-1">
                    for{" "}
                    <span className="text-[#004C97] font-semibold">
                      &quot;{search}&quot;
                    </span>
                  </span>
                )}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-sm text-black/40 hover:text-black underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <Package size={48} className="text-black/20 mb-4" />
                <h3 className="text-lg font-semibold text-black/40">
                  No products found
                </h3>
                <p className="text-sm text-black/30 mt-1">
                  Try a different search term or category.
                </p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + search}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Engineered banner (shown for non-engineered views) */}
            {activeCategory !== "engineered" && !search && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 rounded-3xl bg-[#0B1215] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
                      Custom Manufacturing
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    Can&apos;t find what you need?
                  </h3>
                  <p className="text-white/50 text-sm mt-1 max-w-md">
                    We produce custom-engineered plastic components from your specifications. Request a quote and our engineering team will respond within 24 hours.
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white hover:text-black h-11 px-3 bg-transparent"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}
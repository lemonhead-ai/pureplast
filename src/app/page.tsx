"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@geist-ui/icons";
import { CATEGORIES, FEATURED_PRODUCTS, getCategoryCount } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";

// ─── Stat strip ───────────────────────────────────────────────────────────────

const STATS = [
  { value: "30+", label: "Product lines" },
  { value: "6", label: "Categories" },
  { value: "100%", label: "BPA-free materials" },
  { value: "24h", label: "Quote turnaround" },
];

// ─── Category colour map (matches CATEGORIES data) ────────────────────────────

const CAT_COLORS: Record<string, string> = {
  household: "#004C97",
  kitchen: "#108E2B",
  "laundry-storage": "#E67E22",
  furniture: "#8E44AD",
  "retail-hanging": "#C0392B",
  engineered: "#0B1215",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { addToBuyNow, addToQuote, openDrawer } = useCartStore();

  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/heropage.png"
            alt="PurePlast Manufacturing Facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E5E5E5] mb-7 text-sm font-medium text-[#0B1215]"
            >
              <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
              Engineered for Africa. Built to last.
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 text-balance">
              Industrial<br />
              Precision{" "}
              <span className="text-[#004C97]">Plastic</span><br />
              Solutions
            </h1>

            <p className="text-lg text-black/65 mb-10 max-w-xl leading-relaxed">
              From everyday household items to custom-engineered components — PurePlast manufactures high-quality plastic products trusted across Kenya and beyond.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="h-13 px-8 text-base rounded-full bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0"
                >
                  Browse Catalog <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-base rounded-full bg-white/60 backdrop-blur-md border-black/15 hover:bg-white"
                >
                  Request Custom Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scrolling stats strip pinned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md border-t border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xl font-bold text-[#004C97]">{s.value}</span>
                <span className="text-sm text-black/50 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-3xl font-bold tracking-tighter text-[#0B1215]">
              What we manufacture
            </h2>
            <p className="text-black/50 mt-2">
              Six specialised product families — from stock items to made-to-order parts.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat, i) => {
              const count = getCategoryCount(cat.id);
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link href={`/products?category=${cat.id}`}>
                    <div className="group relative p-6 rounded-3xl border border-[#E5E5E5] bg-white hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full">
                      {/* Colour swatch top-right */}
                      <div
                        className="absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] opacity-8 transition-opacity group-hover:opacity-12"
                        style={{ background: cat.accentColor }}
                      />

                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                        style={{
                          background: `${cat.accentColor}15`,
                          color: cat.accentColor,
                        }}
                      >
                        <ArrowRight size={18} />
                      </div>

                      <h3 className="font-bold text-base text-[#0B1215] mb-1">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-black/45 leading-relaxed mb-3">
                        {cat.tagline}
                      </p>
                      <span
                        className="text-xs font-bold"
                        style={{ color: cat.accentColor }}
                      >
                        {count} product{count !== 1 ? "s" : ""} →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#004C97] mb-2">
                Handpicked
              </p>
              <h2 className="text-3xl font-bold tracking-tighter text-[#0B1215]">
                Featured Products
              </h2>
            </div>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-black/15 rounded-full hover:bg-black hover:text-white transition-all"
              >
                View full catalog <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.slice(0, 6).map((product, i) => {
              const cat = CATEGORIES.find((c) => c.id === product.category);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image zone */}
                  <div className="aspect-[4/3] bg-[#F5F5F2] relative flex items-center justify-center">
                    <span className="text-xs text-black/20 font-medium tracking-wide uppercase">
                      {product.sku}
                    </span>
                    <div className="absolute top-3 left-3">
                      {product.isEngineered ? (
                        <span
                          className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full"
                          style={{
                            background: `${cat?.accentColor}15`,
                            color: cat?.accentColor,
                          }}
                        >
                          Quote Only
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-white/80 text-black/50 border border-black/10">
                          In Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: cat?.accentColor }}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40">
                        {cat?.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[15px] text-[#0B1215] mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-black/45 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ENGINEERED PARTS CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1215]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-white/40">
                  Custom Engineering
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-white mb-5">
                Need a part built<br />to specification?
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 max-w-md">
                Our injection-moulding and thermoforming capabilities cover housings, clips, trays, agricultural components, and more. Share your CAD file or a sketch — we&apos;ll handle the rest.
              </p>
              <div className="flex gap-4">
                <Link href="/products?category=engineered">
                  <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 rounded-full h-12 px-7">
                    See Engineered Parts
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-7 bg-transparent"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right — spec list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Injection Moulding", detail: "Complex geometries, tight tolerances" },
                { label: "Custom Colours", detail: "Pantone matched on request" },
                { label: "Material Options", detail: "ABS, PP, HDPE, PET & more" },
                { label: "Fast Turnaround", detail: "Quote within 24 hours" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-3xl border border-white/10 bg-white/5"
                >
                  <h4 className="font-bold text-sm text-white mb-1">{item.label}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
  }
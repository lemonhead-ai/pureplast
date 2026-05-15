"use client";

import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Package, ShoppingCart, FileText } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import {
  PRODUCTS,
  CATEGORIES,
  type Product,
} from "@/data/products";

// ─── Related products ─────────────────────────────────────────────────────────

function RelatedProducts({ current }: { current: Product }) {
  const related = PRODUCTS.filter(
    (p) => p.category === current.category && p.id !== current.id
  ).slice(0, 3);

  if (related.length === 0) return null;

  const category = CATEGORIES.find((c) => c.id === current.category);

  return (
    <section className="py-16 border-t border-[#E5E5E5] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#0B1215] mb-8">
          More from {category?.label}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/products/${product.id}`}>
                <div className="group bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] bg-[#F5F5F2] relative overflow-hidden">
                    {product.image ? (
                      <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package size={32} className="text-black/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-base text-[#0B1215] mb-1">{product.name}</h3>
                    {product.price ? (
                      <p className="text-base font-bold text-[#004C97]">KES {product.price.toLocaleString()}</p>
                    ) : (
                      <p className="text-sm text-red-500 font-semibold">Quote Required</p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.id === product.category);
  const { addToBuyNow, addToQuote, openDrawer } = useCartStore();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (product.isEngineered) {
      addToQuote(product);
      openDrawer("quote");
    } else {
      addToBuyNow(product);
      openDrawer("buy");
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-black/40 font-medium flex-wrap">
            <Link href="/" className="hover:text-[#004C97] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-[#004C97] transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-[#004C97] transition-colors"
              style={{ color: category?.accentColor }}
            >
              {category?.label}
            </Link>
            <ChevronRight size={14} />
            <span className="text-[#0B1215] font-semibold truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Product Detail ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square bg-[#F5F5F2] rounded-3xl overflow-hidden border border-[#E5E5E5]"
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-black/20">
                <Package size={72} />
                <span className="text-sm font-mono">{product.sku}</span>
              </div>
            )}

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              {product.isEngineered ? (
                <span
                  className="px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-full"
                  style={{
                    background: `${category?.accentColor}18`,
                    color: category?.accentColor,
                    border: `1px solid ${category?.accentColor}30`,
                  }}
                >
                  Quote Only
                </span>
              ) : (
                <span className="px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-full bg-white/90 text-[#108E2B] border border-[#108E2B]/20">
                  In Stock
                </span>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-7"
          >
            {/* Category tag */}
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: category?.accentColor }}
              />
              <span
                className="text-md font-regular uppercase tracking-widest"
                style={{ color: category?.accentColor }}
              >
                {category?.label}
              </span>
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-regular tracking-tighter text-[#0B1215] mb-3">
                {product.name}
              </h1>
              <p className="text-black/80 leading-relaxed text-base md:text-lg">{product.description}</p>
            </div>

            {/* SKU */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase tracking-widest text-black/30">SKU</span>
              <span className="text-sm font-mono text-black/50 bg-black/5 px-3 py-1 rounded-full">
                {product.sku}
              </span>
            </div>

            {/* Price */}
            <div className="py-6 border-t border-b border-[#E5E5E5]">
              {product.price ? (
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-[#0B1215]">
                    KES {product.price.toLocaleString()}
                  </p>
                  {product.unit && (
                    <p className="text-base text-black/40 mt-2">{product.unit}</p>
                  )}
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                    <p className="text-sm text-amber-700 font-medium leading-relaxed">
                      <strong>Minimum order quantities apply.</strong> PurePlast
                      supplies businesses and wholesalers. Products are sold in
                      bundle quantities — contact us for bulk pricing details.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-3xl font-bold text-red-500">Quote Required</p>
                  <p className="text-base text-black/45 mt-2">
                    Pricing is based on your specifications, volumes, and material requirements.
                  </p>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {product.isEngineered ? (
                <>
                  <Button
                    onClick={handleAdd}
                    className={`flex-1 rounded-full h-13 text-base border-0 transition-all ${
                      added
                        ? "bg-[#108E2B] text-white"
                        : "bg-[#0B1215] hover:bg-[#0B1215]/90 text-white"
                    }`}
                  >
                    {added ? (
                      "Added to Quote ✓"
                    ) : (
                      <>
                        <FileText size={18} className="mr-2" />
                        Add to Quote List
                      </>
                    )}
                  </Button>
                  <Link href="/contact" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-full h-13 text-base border-[#E5E5E5] hover:bg-black hover:text-white transition-all"
                    >
                      Discuss This Part <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleAdd}
                    className={`flex-1 rounded-full h-13 text-base border-0 transition-all ${
                      added
                        ? "bg-[#108E2B] text-white"
                        : "bg-[#004C97] hover:bg-[#004C97]/90 text-white"
                    }`}
                  >
                    {added ? (
                      "Added ✓"
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Bulk Order
                      </>
                    )}
                  </Button>
                  <Link href="/contact" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-full h-13 text-base border-[#E5E5E5] hover:bg-black hover:text-white transition-all"
                    >
                      Enquire Directly <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Additional info for engineered */}
            {product.isEngineered && (
              <div className="p-6 rounded-2xl bg-[#0B1215]/4 border border-[#0B1215]/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#0B1215] mb-3">
                  Custom Manufacturing
                </h4>
                <p className="text-base text-black/55 leading-relaxed">
                  This is a custom-engineered product. Pricing depends on
                  geometry, material, quantity, and lead time. Share your CAD
                  file or drawings with our team for a detailed quote within
                  24 hours.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#004C97]"
                >
                  Submit your drawings <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────────────────────────────── */}
      <RelatedProducts current={product} />

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0B1215]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-semibold text-white tracking-tighter mb-3">
              Need something custom?
            </h2>
            <p className="text-white/50 text-base max-w-md leading-relaxed">
              Can&apos;t find exactly what you need? We manufacture to
              specification — share your requirements with our engineering team.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact">
              <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 rounded-full h-12 px-7 text-base">
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-7 bg-transparent text-base">
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

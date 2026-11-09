"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Package,
  ShoppingCart,
  Phone,
  Layers,
  CheckCircle,
} from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, getMaterialGradeLabel, type Product } from "@/data/products";
import { SITE_CONFIG } from "@/config/site";

function RelatedProducts({ current, related }: { current: Product; related: Product[] }) {
  if (related.length === 0) return null;

  const category = CATEGORIES.find((c) => c.id === current.category);

  return (
    <section className="py-16 border-t border-[#E5E5E5] bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#0B1215] mb-8">
          More from {category?.label}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((prod, i) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={`/products/${prod.id}`}>
                <div className="group bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] bg-white relative overflow-hidden border-b border-[#F0F0EE]">
                    {prod.image ? (
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package size={32} className="text-black/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[10px] uppercase text-black/40 block mb-1">
                      {prod.sku}
                    </span>
                    <h3 className="font-semibold text-base text-[#0B1215] mb-1.5">{prod.name}</h3>
                    {prod.price && prod.price > 0 ? (
                      <p className="text-base font-bold text-[#004C97]">
                        KES {prod.price.toLocaleString()}
                        {prod.unit && (
                          <span className="text-xs font-normal text-black/50 ml-1">
                            ({prod.unit})
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className="text-xs font-bold uppercase tracking-wider text-black/60">
                        Quote Required
                      </p>
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

export default function ClientProductDetail({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const category = CATEGORIES.find((c) => c.id === product.category);
  const { addToBuyNow, addToQuote, openDrawer } = useCartStore();
  const [added, setAdded] = useState(false);
  const [bundleQuantity, setBundleQuantity] = useState(1);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const hasMultipleImages = product.images && product.images.length > 1;
  const currentImage = hasMultipleImages ? product.images![currentImageIdx] : product.image;

  const hasPrice = product.price != null && product.price > 0;
  const bundleSize = product.bundleSize || 40;
  const totalItems = bundleQuantity * bundleSize;
  const unitPrice = hasPrice ? Math.round(product.price! / bundleSize) : null;

  function handleOrder() {
    if (!product) return;
    addToBuyNow(product, bundleQuantity);
    openDrawer("buy");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleQuote() {
    if (!product) return;
    addToQuote(product, bundleQuantity);
    openDrawer("quote");
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
            <span className="text-[#0B1215] font-semibold truncate max-w-[240px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Product Detail ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Images */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square bg-white rounded-3xl overflow-hidden border border-[#E5E5E5]"
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
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
                    className="px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-white/90 shadow-xs backdrop-blur"
                    style={{
                      color: category?.accentColor || "#0B1215",
                      border: `1px solid ${category?.accentColor || "#0B1215"}30`,
                    }}
                  >
                    Custom Engineering
                  </span>
                ) : (
                  <span className="px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full bg-white/95 text-[#108E2B] border border-[#108E2B]/20 shadow-xs backdrop-blur">
                    In Stock · Factory Production
                  </span>
                )}
              </div>
            </motion.div>

            {/* Thumbnails */}
            {hasMultipleImages && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-3 overflow-x-auto pb-2"
              >
                {product.images!.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIdx(idx)}
                    className={`relative w-20 h-20 bg-white rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      idx === currentImageIdx ? "border-[#004C97]" : "border-transparent hover:border-black/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-contain p-1" />
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column: Info & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category tag & SKU */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: category?.accentColor }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: category?.accentColor }}
                >
                  {category?.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/5 px-3 py-1 rounded-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/40">SKU:</span>
                <span className="text-xs font-mono font-semibold text-black/70">{product.sku}</span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-3">
                {product.name}
              </h1>
              <p className="text-black/75 leading-relaxed text-base">{product.description}</p>
            </div>

            {/* Grade Variants Links if available */}
            {product.gradeVariants && product.gradeVariants.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-[#E5E5E5]">
                <p className="text-xs font-bold uppercase tracking-widest text-black/45 mb-2">
                  Also available in other grades:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.gradeVariants.map((gv) => (
                    <Link
                      key={gv.id}
                      href={`/products/${gv.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-black/10 text-xs font-semibold hover:border-[#004C97] hover:text-[#004C97] transition-all bg-[#FAFAF8]"
                    >
                      <Layers size={13} /> {gv.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#0B1215]">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {product.materialGrade && (
                  <div>
                    <span className="text-xs text-black/45 block">Material Grade</span>
                    <span className="font-semibold text-black/85">
                      {getMaterialGradeLabel(product.materialGrade)}
                    </span>
                  </div>
                )}
                {product.resinType && (
                  <div>
                    <span className="text-xs text-black/45 block">Polymer / Resin</span>
                    <span className="font-semibold text-black/85">{product.resinType}</span>
                  </div>
                )}
                {product.capacity && (
                  <div>
                    <span className="text-xs text-black/45 block">Capacity</span>
                    <span className="font-semibold text-black/85">{product.capacity}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="text-xs text-black/45 block">Dimensions</span>
                    <span className="font-semibold text-black/85">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="text-xs text-black/45 block">Unit Weight</span>
                    <span className="font-semibold text-black/85">{product.weight}</span>
                  </div>
                )}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="text-xs text-black/45 block">Available Colours</span>
                    <span className="font-semibold text-black/85">{product.colors.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Engineered Specific Specs */}
              {product.engineeringSpecs && (
                <div className="pt-3 border-t border-[#E5E5E5] space-y-2 text-xs">
                  {product.engineeringSpecs.tolerances && (
                    <div className="flex justify-between">
                      <span className="text-black/50">Tolerances:</span>
                      <span className="font-semibold text-black/85">{product.engineeringSpecs.tolerances}</span>
                    </div>
                  )}
                  {product.engineeringSpecs.finishes && (
                    <div className="flex justify-between">
                      <span className="text-black/50">Surface Finish:</span>
                      <span className="font-semibold text-black/85">{product.engineeringSpecs.finishes}</span>
                    </div>
                  )}
                  {product.engineeringSpecs.leadTime && (
                    <div className="flex justify-between">
                      <span className="text-black/50">Production Lead Time:</span>
                      <span className="font-semibold text-black/85">{product.engineeringSpecs.leadTime}</span>
                    </div>
                  )}
                  {product.engineeringSpecs.fileFormats && (
                    <div className="flex justify-between">
                      <span className="text-black/50">Supported Formats:</span>
                      <span className="font-semibold text-black/85">
                        {product.engineeringSpecs.fileFormats.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {product.sustainabilityNotes && (
                <p className="text-xs text-black/55 leading-relaxed pt-3 border-t border-[#E5E5E5]">
                  {product.sustainabilityNotes}
                </p>
              )}
            </div>

            {/* ── PRICING & ORDERING SECTION ── */}
            {product.isEngineered ? (
              /* Custom Engineering Flow */
              <div className="p-6 rounded-3xl bg-[#0B1215] text-white space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                    Bespoke Moulding
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  Quoted to Your Geometry &amp; Volume
                </h3>
                <p className="text-xs text-white/65 leading-relaxed">
                  Tooling costs, material formulations, and piece prices are computed from your technical drawings or CAD files. Technical feedback delivered within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/contact?type=custom-engineering&product=${product.id}&sku=${encodeURIComponent(product.sku)}&name=${encodeURIComponent(product.name)}`}
                    className="flex-1"
                  >
                    <Button className="w-full h-12 rounded-full bg-[#108E2B] hover:bg-[#108E2B]/90 text-white font-semibold border-0 text-sm">
                      Request Technical Quote
                    </Button>
                  </Link>
                  <a
                    href={SITE_CONFIG.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-12 rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent text-sm"
                    >
                      <Phone size={16} className="mr-2" /> Talk to an Engineer
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              /* Stock Wholesale Item Flow */
              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5]">
                  {hasPrice ? (
                    <div>
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <p className="text-3xl md:text-4xl font-bold text-[#0B1215] tabular-nums">
                          KES {(product.price! * bundleQuantity).toLocaleString()}
                        </p>
                        <span className="text-sm font-medium text-black/50">
                          (KES {product.price!.toLocaleString()} per bundle)
                        </span>
                      </div>
                      <p className="text-xs text-[#004C97] font-semibold mt-1">
                        {bundleQuantity} {bundleQuantity === 1 ? "bundle" : "bundles"} = {totalItems.toLocaleString()} pcs
                        {unitPrice ? ` (KES ${unitPrice} each)` : ""}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#004C97]">
                          Factory Wholesale Order
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-[#0B1215]">
                        Wholesale Price Schedule
                      </p>
                      <p className="text-xs text-black/50 mt-1">
                        Sold in factory wholesale bundles ({product.unit || "bulk packaging"}). Add to cart for pro-forma invoicing, or request immediate price list.
                      </p>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="mt-5 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-black/50">
                        Order Bundles
                      </span>
                      <span className="text-xs text-black/70 font-medium">
                        {product.unit || `In bundles of ${bundleSize}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center border border-[#E5E5E5] rounded-xl bg-[#FAFAF8]">
                        <button
                          type="button"
                          onClick={() => setBundleQuantity(Math.max(1, bundleQuantity - 1))}
                          className="w-10 h-10 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-l-xl transition-colors font-bold text-base"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-12 text-center text-sm font-bold tabular-nums">
                          {bundleQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBundleQuantity(bundleQuantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 rounded-r-xl transition-colors font-bold text-base"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-black/60">
                        {bundleQuantity === 1 ? "bundle" : "bundles"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleOrder}
                    className={`flex-1 rounded-full h-13 text-base border-0 transition-all font-semibold ${
                      added
                        ? "bg-[#108E2B] text-white"
                        : "bg-[#004C97] hover:bg-[#004C97]/90 text-white"
                    }`}
                  >
                    {added ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle size={18} /> Added to Cart
                      </span>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Order {bundleQuantity} {bundleQuantity === 1 ? "Bundle" : "Bundles"}
                      </>
                    )}
                  </Button>

                  <Link
                    href={`/contact?type=quote&product=${product.id}&sku=${encodeURIComponent(product.sku)}&name=${encodeURIComponent(product.name)}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full rounded-full h-13 text-base border-[#E5E5E5] hover:bg-[#0B1215] hover:text-white transition-all font-semibold bg-white"
                    >
                      Enquire Directly <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>

                <p className="text-[11px] text-black/45 text-center leading-relaxed">
                  Orders placed through the website are processed by our sales desk for pro-forma invoicing, warehouse pickup in Kitengela, or direct freight dispatch across Kenya.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────────────────────────────── */}
      <RelatedProducts current={product} related={relatedProducts} />

      {/* ── Bottom Custom CTA (Only shown for non-engineered items) ───────── */}
      {!product.isEngineered && (
        <section className="py-20 bg-[#0B1215]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-semibold text-white tracking-tighter mb-2">
                Need proprietary branding or bespoke tooling?
              </h2>
              <p className="text-white/60 text-base max-w-lg leading-relaxed">
                We engineer custom injection moulds with embossed logos, exclusive colour ways, and scheduled capacity for wholesale partners.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/contact?type=custom-engineering">
                <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 rounded-full h-12 px-7 text-base font-semibold">
                  Discuss Custom Tooling
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-7 bg-transparent text-base">
                  Back to Catalogue
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

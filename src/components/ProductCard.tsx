"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ChevronRight, ChevronLeft, Package } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { CATEGORIES, type Product } from "@/data/products";
import { useMotionSafe } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  index: number;
  showCTA?: boolean;
}

export function ProductCard({ product, index, showCTA = true }: ProductCardProps) {
  const { addToBuyNow, addToQuote, openDrawer } = useCartStore();
  const { spring, hover, tap, reduced, viewport } = useMotionSafe();
  const [added, setAdded] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const category = CATEGORIES.find((c) => c.id === product.category);

  const hasMultipleImages = product.images && product.images.length > 1;
  const currentImage = hasMultipleImages ? product.images![currentImageIdx] : product.image;

  function handleNextImage(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (product.images) {
      setCurrentImageIdx((prev) => (prev + 1) % product.images!.length);
    }
  }

  function handlePrevImage(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (product.images) {
      setCurrentImageIdx((prev) => (prev - 1 + product.images!.length) % product.images!.length);
    }
  }

  function handleAddBuyNow(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    addToBuyNow(product);
    openDrawer("buy");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleAddQuote(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    addToQuote(product);
    openDrawer("quote");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const hasPrice = product.price != null && product.price > 0;
  const unitPrice =
    hasPrice && product.bundleSize && product.bundleSize > 0
      ? Math.round(product.price! / product.bundleSize)
      : null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...spring, delay: reduced ? 0 : index * 0.05 }}
      whileHover={hover}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white transition-shadow duration-300 hover:shadow-xl hover:shadow-black/6"
    >
      {/* ── Image zone ──────────────────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] bg-white overflow-hidden border-b border-[#F0F0EE]">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-0 block">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-black/25">
              <Package size={40} />
              <span className="text-xs font-semibold tracking-wide uppercase text-black/40">
                {product.name}
              </span>
            </div>
          )}
        </Link>

        {/* Status / Category badge */}
        <div className="pointer-events-none absolute top-3 left-3 z-10">
          {product.isEngineered ? (
            <span
              className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase shadow-xs backdrop-blur"
              style={{
                color: category?.accentColor || "#0B1215",
                border: `1px solid ${category?.accentColor || "#0B1215"}30`,
              }}
            >
              Engineered
            </span>
          ) : product.materialGrade === "GR2" || product.materialGrade === "GR3" ? (
            <span className="rounded-full border border-emerald-800/20 bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-800 shadow-xs backdrop-blur">
              Recycled {product.materialGrade}
            </span>
          ) : null}
        </div>

        {/* Carousel buttons */}
        {hasMultipleImages && (
          <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-between p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black/70 shadow-md backdrop-blur-md transition-colors hover:bg-white hover:text-black"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black/70 shadow-md backdrop-blur-md transition-colors hover:bg-white hover:text-black"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Carousel pagination dots */}
        {hasMultipleImages && (
          <div className="pointer-events-none absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
            {product.images!.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIdx ? "w-3 bg-black/70" : "w-1.5 bg-black/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5 gap-2.5">
        {/* Category & SKU */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: category?.accentColor }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-black/45">
              {category?.label}
            </span>
          </div>
          <span className="font-mono text-[11px] text-black/40">
            {product.sku}
          </span>
        </div>

        {/* Title Link */}
        <Link href={`/products/${product.id}`} className="block group-hover:text-[#004C97] transition-colors">
          <h3 className="text-base font-semibold leading-snug text-[#0B1215]">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="line-clamp-2 text-xs leading-relaxed text-black/60">
          {product.description}
        </p>

        {/* Footer: Price & Actions */}
        <div className="mt-auto pt-3 border-t border-[#F0F0EE] flex items-end justify-between gap-3">
          {/* Pricing info */}
          <div className="min-w-0">
            {hasPrice ? (
              <div>
                <p className="text-base font-bold text-[#0B1215] tabular-nums">
                  KES {product.price!.toLocaleString()}
                </p>
                {product.bundleSize ? (
                  <p className="text-[11px] font-medium text-[#004C97] truncate">
                    bundle of {product.bundleSize} {unitPrice ? `(KES ${unitPrice} ea)` : ""}
                  </p>
                ) : product.unit ? (
                  <p className="text-[11px] font-medium text-black/50 truncate">
                    {product.unit}
                  </p>
                ) : null}
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0B1215]">
                  Wholesale Pricing
                </p>
                {product.unit ? (
                  <p className="text-[11px] font-medium text-black/50 truncate">
                    {product.unit}
                  </p>
                ) : (
                  <p className="text-[11px] font-medium text-black/50">
                    Bespoke / OEM
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action buttons (Cleanly outside link) */}
          {showCTA && (
            <div className="flex shrink-0 items-center gap-1.5">
              {!product.isEngineered ? (
                <>
                  <motion.button
                    type="button"
                    onClick={handleAddQuote}
                    whileHover={tap ? { scale: 1.02 } : undefined}
                    whileTap={tap}
                    transition={spring}
                    className={`flex items-center justify-center whitespace-nowrap rounded-2xl px-3.5 py-2 text-xs font-semibold transition-colors duration-200 ${
                      added
                        ? "bg-[#108E2B] text-white"
                        : "bg-[#004C97] text-white hover:bg-[#004C97]/90"
                    }`}
                  >
                    {added ? "Added" : "Quote"}
                  </motion.button>
                  <Link
                    href={`/contact?type=quote&product=${product.id}&sku=${encodeURIComponent(product.sku)}&name=${encodeURIComponent(product.name)}`}
                  >
                    <motion.span
                      whileHover={tap ? { scale: 1.02 } : undefined}
                      whileTap={tap}
                      transition={spring}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-[#0B1215] transition-colors duration-200 hover:bg-black/5"
                    >
                      Enquire
                    </motion.span>
                  </Link>
                </>
              ) : (
                <Link
                  href={`/contact?type=custom-engineering&product=${product.id}&sku=${encodeURIComponent(product.sku)}&name=${encodeURIComponent(product.name)}`}
                >
                  <motion.span
                    whileHover={tap ? { scale: 1.02 } : undefined}
                    whileTap={tap}
                    transition={spring}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-[#0B1215] px-4 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#004C97]"
                  >
                    Custom Quote
                  </motion.span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

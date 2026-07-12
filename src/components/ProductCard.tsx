"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, FileText, ChevronRight, ChevronLeft, Package } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { CATEGORIES, getSustainabilityBadges, type Product } from "@/data/products";
import { SustainabilityBadge } from "@/components/sustainability/SustainabilityBadge";
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
    e.preventDefault();
    if (product.images) {
      setCurrentImageIdx((prev) => (prev + 1) % product.images!.length);
    }
  }

  function handlePrevImage(e: React.MouseEvent) {
    e.preventDefault();
    if (product.images) {
      setCurrentImageIdx((prev) => (prev - 1 + product.images!.length) % product.images!.length);
    }
  }

  function handleAddBuyNow(e: React.MouseEvent) {
    e.preventDefault();
    addToBuyNow(product);
    openDrawer("buy");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleAddQuote(e: React.MouseEvent) {
    e.preventDefault();
    addToQuote(product);
    openDrawer("quote");
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ ...spring, delay: reduced ? 0 : index * 0.06 }}
        whileHover={hover}
        whileTap={tap}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white hover:shadow-xl hover:shadow-black/6"
      >
        {/* Image zone */}
        <div className="relative aspect-[4/3] bg-white overflow-hidden border-b border-[#F0F0EE]">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
            />
          ) : (
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
                className="px-3.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-white/50 backdrop-blur"
                style={{
                  color: category?.accentColor,
                  border: `1px solid ${category?.accentColor}30`,
                }}
              >
                Quote Only
              </span>
            ) : product.inStock !== false ? (
              <span className="px-2.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-[#108E2B]/10 backdrop-blur text-[#108E2B] border border-[#108E2B]/20">
                In Stock
              </span>
            ) : (
              <span className="px-2.5 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full bg-red-500/90 backdrop-blur text-white border border-red-500">
                Out of Stock
              </span>
            )}
          </div>

          {/* Carousel Controls */}
          {hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button
                onClick={handlePrevImage}
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-black/70 hover:text-black hover:bg-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextImage}
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-black/70 hover:text-black hover:bg-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Pagination Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
              {product.images!.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIdx ? "bg-black/70 w-3" : "bg-black/20 w-1.5"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/4 transition-colors duration-300 pointer-events-none z-10" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
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

          <h3 className="font-semibold text-[15px] leading-snug text-[#0B1215]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-black/60">
            {product.description}
          </p>

          {/* Sustainability Badges */}
          {(() => {
            const badges = getSustainabilityBadges(product);
            if (badges.length === 0) return null;
            const displayBadges = badges.slice(0, 2);
            const extra = badges.length - 2;
            return (
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                {displayBadges.map((badge, i) => (
                  <SustainabilityBadge key={i} label={badge} icon={i === 0} className="scale-90 origin-left" />
                ))}
                {extra > 0 && (
                  <span className="text-[10px] font-semibold text-[#108E2B] bg-[#108E2B]/10 px-1.5 py-0.5 rounded-md">
                    +{extra}
                  </span>
                )}
              </div>
            );
          })()}

          <div className={`mt-auto pt-3 ${showCTA ? "border-t border-[#F0F0EE] flex items-center justify-between gap-3" : ""}`}>
            {/* Status & Unit */}
            <div>
              {!product.isEngineered ? (
                <>
                  {product.unit && (
                    <p className="text-xs font-medium text-black/70">
                      {product.unit}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm font-regular text-red-500">Quote Required</p>
              )}
            </div>

            {/* CTA */}
            {showCTA && (
              <div className="flex items-center gap-2">
                {!product.isEngineered && (
                  <motion.button
                    onClick={product.inStock !== false ? handleAddBuyNow : undefined}
                    disabled={product.inStock === false}
                    whileHover={tap ? { scale: 1.02 } : undefined}
                    whileTap={tap}
                    transition={spring}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-2xl px-3 py-2 text-xs font-semibold transition-colors duration-200
                      ${
                        added
                          ? "bg-[#108E2B] text-white scale-95"
                          : product.inStock !== false
                          ? "bg-[#0B1215]/8 text-[#0B1215] hover:bg-[#0B1215] hover:text-white"
                          : "bg-black/5 text-black/30 cursor-not-allowed"
                      }`}
                  >
                    <ShoppingCart size={13} /> Order
                  </motion.button>
                )}
                
                <motion.button
                  onClick={handleAddQuote}
                  whileHover={tap ? { scale: 1.02 } : undefined}
                  whileTap={tap}
                  transition={spring}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-2xl bg-[#004C97]/10 px-3 py-2 text-xs font-semibold text-[#004C97] transition-colors duration-200 hover:bg-[#004C97] hover:text-white"
                >
                  <FileText size={13} /> Quote
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

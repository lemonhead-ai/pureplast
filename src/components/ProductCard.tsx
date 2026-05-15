"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, FileText, ChevronRight, ChevronLeft, Package } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { CATEGORIES, type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index: number;
  showCTA?: boolean;
}

export function ProductCard({ product, index, showCTA = true }: ProductCardProps) {
  const { addToBuyNow, addToQuote, openDrawer } = useCartStore();
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

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
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
    <Link href={`/products/${product.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
        className="group flex flex-col h-full bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-2xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300"
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
          <p className="text-xs text-black/50 leading-relaxed line-clamp-2">
            {product.description}
          </p>

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
              <button
                onClick={product.inStock !== false ? handleAdd : undefined}
                disabled={product.inStock === false && !product.isEngineered}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-2xl transition-all duration-200 whitespace-nowrap
                  ${
                    added
                      ? "bg-[#108E2B] text-white scale-95"
                      : product.isEngineered
                      ? "bg-[#004C97]/10 text-[#004C97] hover:bg-[#004C97] hover:text-white"
                      : product.inStock !== false
                      ? "bg-[#0B1215]/8 text-[#0B1215] hover:bg-[#0B1215] hover:text-white"
                      : "bg-black/5 text-black/30 cursor-not-allowed"
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
                    <ShoppingCart size={13} /> Order Now
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

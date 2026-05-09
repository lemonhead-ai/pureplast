"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu } from "@geist-ui/icons";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/Button";

export function Navbar() {
  const { openDrawer, buyNowCart, quoteCart } = useCartStore();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth progressive effect (Safari-like)
  const progress = Math.min(scrollY / 80, 1); // 0 → 1
  const opacity = progress; // fade in
  const blur = 8 + progress * 12; // 8px → 20px blur

  const totalItems =
    buyNowCart.reduce((acc, item) => acc + item.quantity, 0) +
    quoteCart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed  top-0 left-0 right-0 z-30">

      {/*  Dynamic gradient blur layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-200"
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255,255,255,${opacity * 0.8})`, // adjust if using dark mode
          maskImage: "linear-gradient(to bottom,black 30%, black 40%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, black 40%, transparent)",
        }}
      />

      {/* Border fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-200"
        style={{
          opacity: opacity,
          background: "linear-gradient(to right, transparent, transparent, transparent)",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/pureplastlogonobg.PNG"
            alt="PurePlast Logo"
            width={150}
            height={144}
            className="h-36 mt-4 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link href="/" className="hover:text-[#004C97] transition-colors">Home</Link>
          <Link href="/products" className="hover:text-[#004C97] transition-colors">Products</Link>
          <Link href="/partners" className="hover:text-[#004C97] transition-colors">Partners</Link>
          <Link href="/about" className="hover:text-[#004C97] transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-[#004C97] transition-colors">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => openDrawer("buy")}
            className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
            aria-label="Cart and Quotes"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#004C97] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
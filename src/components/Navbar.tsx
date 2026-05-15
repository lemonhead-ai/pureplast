"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  {href: "/3Dprinting", label: "3D Printing" },
  { href: "/about", label: "About Us" },
  { href: "/partners", label: "Our Partners" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const { openDrawer, buyNowCart, quoteCart } = useCartStore();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Exact match for "/", prefix match for everything else
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const progress = Math.min(scrollY / 80, 1);
  const blur = 8 + progress * 12;
  const bgOpacity = mobileOpen ? 0.95 : progress * 0.8;

  const totalItems =
    buyNowCart.reduce((acc, item) => acc + item.quantity, 0) +
    quoteCart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30">
        {/* Dynamic blur layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-200"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            backgroundColor: `rgba(255,255,255,${bgOpacity})`,
            maskImage: "linear-gradient(to bottom, black 30%, black 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, black 40%, transparent)",
          }}
        />

        {/* Border fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-200"
          style={{
            opacity: progress,
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0), transparent)",
          }}
        />

        {/* Content row */}
        <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <Image
              src="/images/pureplastlogonobg.PNG"
              alt="PurePlast Logo"
              width={150}
              height={144}
              className="h-36 mt-6 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4 text-lg font-medium">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative pb-0.5 transition-colors${
                    active ? "text-[#004C97]" : "hover:text-[#004C97]"
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1  left-0 right-0 h-0.5 rounded-full bg-[#004C97]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => openDrawer("buy")}
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label="Cart and Quotes"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#004C97] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden relative bg-white/95 backdrop-blur-xl border-t border-black/5"
            >
              <nav className="flex flex-col px-6 py-6 gap-1">
                {NAV_LINKS.map(({ href, label }, i) => {
                  const active = isActive(href);
                  return (
                    <motion.div
                      key={href}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 py-3 px-3 text-xl font-medium rounded-xl transition-colors ${
                          active
                            ? "text-[#004C97] bg-[#004C97]/8"
                            : "text-gray-800 hover:text-[#004C97] hover:bg-[#004C97]/5"
                        }`}
                      >
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#004C97] flex-shrink-0" />
                        )}
                        {label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* CTA inside mobile menu */}
                <motion.div
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.2 }}
                  className="mt-4 pt-4 border-t border-black/5"
                >
                  <Button
                    className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white"
                    size="lg"
                    onClick={() => { setMobileOpen(false); openDrawer("quote"); }}
                  >
                    Request a Quote
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop overlay — closes menu on tap outside */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-20 bg-black/20 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
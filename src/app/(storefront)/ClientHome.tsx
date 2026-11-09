"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@geist-ui/icons";
import { CATEGORIES, type Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { SITE_CONFIG } from "@/config/site";
import {
  fadeUp,
  staggerContainer,
  useMotionSafe,
} from "@/lib/motion";

const STATS = [
  { value: "21", label: "Catalogued products" },
  { value: "6", label: "Product categories" },
  { value: "Kitengela", label: "Manufactured locally" },
  { value: SITE_CONFIG.standards.quoteTurnaroundShort, label: "Quote turnaround" },
];

const ENGINEERED_SPECS = [
  { label: "Injection Moulding", detail: "Complex geometries, precision tolerances" },
  { label: "Custom Colours", detail: "Pantone matched masterbatch on request" },
  { label: "Material Options", detail: "PP, HDPE, LDPE, ABS & recycled grades" },
  { label: "Fast Turnaround", detail: `Technical quote within ${SITE_CONFIG.standards.quoteTurnaround}` },
];

function MotionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const { hover, tap, spring } = useMotionSafe();

  return (
    <Link href={href} className={className}>
      <motion.span
        className="inline-flex"
        whileHover={hover}
        whileTap={tap}
        transition={spring}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export default function ClientHome({
  featuredProducts,
  categoryCounts,
}: {
  featuredProducts: Product[];
  categoryCounts: Record<string, number>;
}) {
  const motionSafe = useMotionSafe();

  return (
    <div className="flex flex-col">

      {/* ── FIXED HERO BACKGROUND IMAGE (Stays stationary as hero content scrolls) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/heropage.png"
          alt="PurePlast Manufacturing Facility Kitengela"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/25" />
      </div>

      {/* ── HERO CONTENT (Scrolls naturally over the stationary background) ──────── */}
      <section className="relative z-10 -mt-16 flex h-screen min-h-[640px] flex-col justify-between">
        <div className="mx-auto w-full max-w-7xl px-6 my-auto pt-16">
          <motion.div
            initial={motionSafe.reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionSafe.entranceSpring}
            className="max-w-2xl"
          >
            <motion.h1
              initial={motionSafe.reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionSafe.entranceSpring, delay: motionSafe.reduced ? 0 : 0.1 }}
              className="mb-5 text-balance text-5xl font-semibold leading-[1.05] tracking-tighter text-[#0B1215] sm:text-6xl md:text-7xl"
            >
              Industrial
              <br />
              Precision{" "}
              <span className="text-[#004C97]">Plastic</span>
              <br />
              Solutions
            </motion.h1>

            <motion.p
              initial={motionSafe.reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionSafe.entranceSpring, delay: motionSafe.reduced ? 0 : 0.15 }}
              className="mb-9 max-w-xl text-lg leading-relaxed text-black/70"
            >
              From everyday household items to custom injection-moulded components — PurePlast
              manufactures high-quality polymer products in Kitengela for clients across East Africa.
            </motion.p>

            <motion.div
              initial={motionSafe.reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionSafe.entranceSpring, delay: motionSafe.reduced ? 0 : 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <MotionLink href="/products">
                <Button
                  size="lg"
                  className="h-12 rounded-full border-0 bg-[#004C97] px-8 text-base text-white hover:bg-[#004C97]/90 font-semibold"
                >
                  Browse Catalogue <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </MotionLink>
              <MotionLink href="/contact?type=custom-engineering">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-black/20 bg-white/70 px-8 text-base text-[#0B1215] backdrop-blur-md hover:bg-white font-semibold"
                >
                  Request Engineering Quote
                </Button>
              </MotionLink>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={motionSafe.reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...motionSafe.entranceSpring, delay: motionSafe.reduced ? 0 : 0.28 }}
          className="border-t border-[#E5E5E5] bg-white/90 backdrop-blur-md"
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-start gap-10 overflow-x-auto px-6 md:justify-center md:gap-16">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={motionSafe.reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...motionSafe.spring,
                  delay: motionSafe.reduced ? 0 : 0.32 + i * 0.04,
                }}
                className="flex shrink-0 items-center gap-2.5"
              >
                <span className="text-xl font-bold tabular-nums text-[#004C97]">{s.value}</span>
                <span className="text-sm font-medium text-black/60">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── OVERLAYING CONTENT (Curtain Sheet over Sticky Hero) ───────────────── */}
      <div className="relative z-10 bg-white rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.14)] border-t border-[#E5E5E5] overflow-hidden">
        {/* ── CAPABILITIES ──────────────────────────────────────────────────────── */}
        <section className="border-b border-[#E5E5E5] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={motionSafe.reduced ? false : "hidden"}
            whileInView="visible"
            viewport={motionSafe.viewport}
            variants={fadeUp}
            transition={motionSafe.entranceSpring}
            className="mb-12 md:mb-16"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#004C97]">
              Capabilities
            </p>
            <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215] md:text-4xl">
              What we manufacture
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/60">
              Specialised product families produced to industrial specifications — from stock bundles to custom-engineered parts.
            </p>
          </motion.div>

          <motion.div
            initial={motionSafe.reduced ? false : "hidden"}
            whileInView="visible"
            viewport={motionSafe.viewport}
            variants={staggerContainer(0.07)}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
          >
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isComingSoon = cat.isComingSoon || count === 0;

              return (
                <motion.div
                  key={cat.id}
                  variants={fadeUp}
                  transition={motionSafe.spring}
                  whileHover={motionSafe.hover}
                  whileTap={motionSafe.tap}
                  className="h-full"
                >
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#E5E5E5] bg-white p-5 md:p-6"
                  >
                    <div
                      className="absolute right-0 top-0 h-24 w-24 rounded-bl-[60px] opacity-[0.08] transition-opacity duration-200 group-hover:opacity-[0.14]"
                      style={{ background: cat.accentColor }}
                      aria-hidden
                    />

                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{
                        background: `${cat.accentColor}15`,
                        color: cat.accentColor,
                      }}
                    >
                      <ArrowRight size={18} />
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#0B1215]">{cat.label}</h3>
                      {isComingSoon && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/5 text-black/50">
                          Coming soon
                        </span>
                      )}
                    </div>
                    
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-black/60">
                      {cat.tagline}
                    </p>
                    
                    <span
                      className="text-xs font-bold"
                      style={{ color: cat.accentColor }}
                    >
                      {isComingSoon ? "Soon →" : `${count} product${count !== 1 ? "s" : ""} →`}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={motionSafe.reduced ? false : "hidden"}
            whileInView="visible"
            viewport={motionSafe.viewport}
            variants={fadeUp}
            transition={motionSafe.entranceSpring}
            className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
          >
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#004C97]">
                Selected Lines
              </p>
              <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215] md:text-4xl">
                Featured Products
              </h2>
            </div>
            <MotionLink href="/products">
              <Button
                variant="outline"
                className="rounded-full border-black/15 hover:bg-[#0B1215] hover:text-white"
              >
                View full catalogue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </MotionLink>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featuredProducts.slice(0, 6).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} showCTA={true} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERED PARTS CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#0B1215] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
            <motion.div
              initial={motionSafe.reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={motionSafe.viewport}
              transition={motionSafe.entranceSpring}
            >
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#108E2B]" aria-hidden />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                  Custom Engineering
                </span>
              </div>
              <h2 className="mb-5 text-3xl font-semibold tracking-tighter text-white md:text-4xl">
                Need a component built
                <br />
                to specification?
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/70">
                Our injection-moulding and precision tooling capabilities cover housings, fasteners,
                trays, and agricultural components. Share your CAD file (STEP, STL) or drawings for a technical review.
              </p>
              <div className="flex flex-wrap gap-3">
                <MotionLink href="/products?category=engineered">
                  <Button className="h-12 rounded-full border-0 bg-[#108E2B] px-7 text-white hover:bg-[#108E2B]/90">
                    See Engineered Parts
                  </Button>
                </MotionLink>
                <MotionLink href="/contact?type=custom-engineering">
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-white/25 bg-transparent px-7 text-white hover:bg-white/10"
                  >
                    Request Technical Quote
                  </Button>
                </MotionLink>
              </div>
            </motion.div>

            <motion.div
              initial={motionSafe.reduced ? false : "hidden"}
              whileInView="visible"
              viewport={motionSafe.viewport}
              variants={staggerContainer(0.06, 0.08)}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              {ENGINEERED_SPECS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  transition={motionSafe.spring}
                  whileHover={motionSafe.hover}
                  whileTap={motionSafe.tap}
                  className="rounded-3xl border border-white/12 bg-white/[0.06] p-5"
                >
                  <h4 className="mb-1.5 text-sm font-bold text-white">{item.label}</h4>
                  <p className="text-xs leading-relaxed text-white/65">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

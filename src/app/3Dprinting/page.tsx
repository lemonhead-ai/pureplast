"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Upload, Package, Layers, Zap, Globe, ChevronRight } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "0.1mm", label: "Layer resolution" },
  { value: "FDM / SLA", label: "Print technologies" },
  { value: "15+", label: "Material colours" },
  { value: "48h", label: "Turnaround time" },
];

const DESK_PRODUCTS = [
  {
    id: "dp-001",
    name: "Modular Desk Organiser",
    desc: "Snap-together tray system for pens, cables, and stationery. Customise the layout to your desk.",
    material: "PLA+",
    colors: ["#0B1215", "#004C97", "#F5F5F2"],
    badge: "Bestseller",
    badgeColor: "#108E2B",
  },
  {
    id: "dp-002",
    name: "Monitor Riser & Storage",
    desc: "Elevate your screen to ergonomic height while gaining under-riser storage for keyboards and notepads.",
    material: "PETG",
    colors: ["#0B1215", "#E5E5E5"],
    badge: "New",
    badgeColor: "#004C97",
  },
  {
    id: "dp-003",
    name: "Adjustable Phone Stand",
    desc: "Universal phone cradle with three tilt positions. Folds flat for portability.",
    material: "PLA+",
    colors: ["#0B1215", "#004C97", "#108E2B"],
    badge: "In Stock",
    badgeColor: "#0B1215",
  },
  {
    id: "dp-004",
    name: "Headphone Wall Hook",
    desc: "Sleek under-desk or wall-mount hook rated for up to 1.5 kg. No tools required.",
    material: "ABS",
    colors: ["#0B1215", "#F5F5F2"],
    badge: "In Stock",
    badgeColor: "#0B1215",
  },
  {
    id: "dp-005",
    name: "Cable Management Clips",
    desc: "Magnetic edge-mount clips that route USB, power, and audio cables cleanly along your desk.",
    material: "TPU",
    colors: ["#0B1215", "#004C97", "#E5E5E5"],
    badge: "Pack of 6",
    badgeColor: "#8E44AD",
  },
  {
    id: "dp-006",
    name: "Laptop Cooling Stand",
    desc: "Ventilated raised stand with adjustable angle. Compatible with 13\u201317 inch laptops.",
    material: "PETG",
    colors: ["#0B1215", "#E5E5E5"],
    badge: "Custom Size",
    badgeColor: "#004C97",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your STL File",
    body: "Send us your .STL, .OBJ, or .3MF file — or describe what you need and our team will design it for you.",
  },
  {
    step: "02",
    icon: Layers,
    title: "We Slice & Optimise",
    body: "Our engineers review the geometry, select the optimal material, infill %, and supports for structural integrity.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Print & Quality Check",
    body: "We print on calibrated FDM and SLA machines and measure every critical dimension before dispatch.",
  },
  {
    step: "04",
    icon: Package,
    title: "Delivered to You",
    body: "Nairobi same-day delivery available. Nationwide shipping within 3 business days.",
  },
];

const MATERIALS = [
  { name: "PLA+", use: "Desk accessories, prototypes", strength: 75, color: "#004C97" },
  { name: "PETG", use: "Functional parts, enclosures", strength: 85, color: "#108E2B" },
  { name: "ABS",  use: "Heat-resistant components", strength: 80, color: "#E67E22" },
  { name: "TPU",  use: "Flexible grips, cable clips", strength: 60, color: "#8E44AD" },
  { name: "ASA",  use: "Outdoor / UV-stable parts", strength: 88, color: "#C0392B" },
  { name: "Resin (SLA)", use: "High-detail figurines & jewellery", strength: 70, color: "#0B1215" },
];

const WHY_AFRICA = [
  { title: "Untapped Market", body: "3D printing adoption in sub-Saharan Africa is under 2%. We are building the infrastructure — and the product line — that will change that." },
  { title: "Local Manufacturing", body: "Every product is printed, finished, and quality-checked here in Nairobi. No import delays, no customs duties." },
  { title: "Bespoke by Default", body: "Unlike mass-produced imports, every item can be customised to your exact colour, dimension, or logo — with no minimum order." },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ThreeDPrinting() {
  return (
    <div className="flex flex-col bg-[#FAFAF8]">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#0B1215]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/3d_printer_hero.png"
            alt="PurePlast 3D Printer in action"
            fill
            className="object-cover opacity-40"
            priority
          />
          {/* layered gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1215]/95 via-[#0B1215]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215] via-transparent to-transparent" />
        </div>

        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#004C97]/20 border border-[#004C97]/40 mb-8 text-sm font-semibold text-[#60A5FA]"
            >
              <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
              Africa&apos;s 3D Printing Manufacturer
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] mb-6 text-white text-balance">
              Print Tomorrow&apos;s
              <br />
              Products{" "}
              <span className="text-[#60A5FA]">Today.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/55 mb-10 max-w-xl leading-relaxed">
              PurePlast brings precision 3D printing to Kenya — custom desk accessories, functional prototypes, and bespoke plastic parts. Upload your STL or order from our catalogue.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="h-13 px-8 text-base rounded-full bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0"
                >
                  Upload STL File <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="#catalogue">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-base rounded-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Browse Catalogue
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xl font-bold text-[#60A5FA]">{s.value}</span>
                <span className="text-sm text-white/40 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY 3D PRINTING IN AFRICA ─────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

            {/* Left — image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E5E5E5] bg-[#0B1215]"
            >
              <Image
                src="/images/stl_wireframe.png"
                alt="STL wireframe 3D model preview"
                fill
                className="object-cover"
              />
              {/* overlay badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold text-[#0B1215]">
                <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
                .STL → Physical Part in 48h
              </div>
            </motion.div>

            {/* Right — text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-3">
                The Opportunity
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] mb-5 leading-snug">
                3D Printing in Africa is still{" "}
                <span className="text-[#004C97]">wide open.</span>
              </h2>
              <p className="text-black/55 leading-relaxed mb-8">
                Most of the world has already embraced additive manufacturing for rapid prototyping, custom consumer goods, and on-demand production. Africa is at the dawn of that revolution — and PurePlast is here to lead it.
              </p>
              <ul className="space-y-5">
                {WHY_AFRICA.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-[#004C97]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe size={16} className="text-[#004C97]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#0B1215] mb-0.5">{item.title}</p>
                      <p className="text-xs text-black/50 leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DESK CATALOGUE ────────────────────────────────────────────────────── */}
      <section id="catalogue" className="py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
                Desk Setup Collection
              </p>
              <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215]">
                Ready-to-Print Products
              </h2>
              <p className="text-black/50 mt-2 max-w-md">
                Order as-is, or customise colour, size, and material — every item ships within 48 hours.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="outline" className="border-black/15 rounded-full hover:bg-black hover:text-white transition-all">
                Request Custom Design <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESK_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image zone — dark background with layer-lines texture */}
                <div className="aspect-[4/3] bg-[#0B1215] relative flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/3d_desk_products.png"
                    alt={product.name}
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full text-white"
                      style={{ background: product.badgeColor }}
                    >
                      {product.badge}
                    </span>
                  </div>
                  {/* Material label */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-white/15 text-white border border-white/20">
                      {product.material}
                    </span>
                  </div>
                  {/* Colour swatches */}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="w-4 h-4 rounded-full border-2 border-white/40"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-[15px] text-[#0B1215] mb-1.5">{product.name}</h3>
                  <p className="text-xs text-black/45 leading-relaxed mb-4">{product.desc}</p>
                  <Link href="/contact">
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-[#004C97] hover:gap-2.5 transition-all">
                      Order / Customise <ChevronRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
              Process
            </p>
            <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215]">
              From STL file to your doorstep
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-7 rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-5xl font-black text-[#004C97]/8 leading-none block mb-5 tracking-tighter">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#004C97]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#004C97]" />
                  </div>
                  <h3 className="font-semibold text-sm text-[#0B1215] mb-2">{step.title}</h3>
                  <p className="text-xs text-black/50 leading-relaxed">{step.body}</p>
                  {/* Connector line (desktop only) */}
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-[#E5E5E5]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MATERIALS ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAF8] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
              Materials
            </p>
            <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215]">
              The right filament for every job
            </h2>
            <p className="text-black/50 mt-2 max-w-lg">
              We stock a curated range of engineering-grade filaments and resins. Not sure which to choose? Our team will advise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATERIALS.map((mat, i) => (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-6 rounded-2xl border border-[#E5E5E5] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-base text-[#0B1215]">{mat.name}</h3>
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: mat.color }}
                  />
                </div>
                <p className="text-xs text-black/45 mb-4">{mat.use}</p>
                {/* Strength bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-black/30 uppercase tracking-widest">
                    <span>Strength</span>
                    <span>{mat.strength}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E5E5E5] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mat.strength}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: mat.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1215]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40">
                  Custom 3D Printing
                </span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tighter text-white mb-5 leading-snug">
                Have a design in mind?<br />
                <span className="text-[#60A5FA]">Let&apos;s print it.</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 max-w-md">
                Upload your STL file, share a sketch, or simply describe the part you need. Our engineering team will quote you within 24 hours — no MOQ required.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0 rounded-full h-12 px-7">
                    Send Your STL File
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-7 bg-transparent"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "No Minimum Order", detail: "Print 1 or 1 000 units" },
                { label: "Full Colour Range", detail: "15+ filament colours in stock" },
                { label: "STL, OBJ & 3MF", detail: "All major CAD formats accepted" },
                { label: "Nairobi Delivery", detail: "Same-day within CBD" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
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

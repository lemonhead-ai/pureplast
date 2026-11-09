"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Upload, Package, Layers, Zap, ChevronRight, Check } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";

const STATS = [
  { value: "0.1mm", label: "Layer resolution" },
  { value: "FDM / SLA", label: "Print technologies" },
  { value: "15+", label: "Engineering materials" },
  { value: "From 48h", label: "Turnaround time" },
];

const DESK_PRODUCTS = [
  {
    id: "dp-001",
    name: "Modular Desk Organiser",
    desc: "Snap-together tray system for instruments, cables, and stationery. Customised to your desk layout.",
    material: "PLA+",
    colors: ["#0B1215", "#004C97", "#F5F5F2"],
    badge: "Made to order · from 48h",
    badgeColor: "#108E2B",
  },
  {
    id: "dp-002",
    name: "Monitor Riser & Storage",
    desc: "Elevate your screen to ergonomic eye level with integrated underside cable channels.",
    material: "PETG",
    colors: ["#0B1215", "#E5E5E5"],
    badge: "Made to order · from 48h",
    badgeColor: "#004C97",
  },
  {
    id: "dp-003",
    name: "Adjustable Device Stand",
    desc: "Multi-angle articulated phone and tablet cradle with non-slip silicone feet recesses.",
    material: "PLA+",
    colors: ["#0B1215", "#004C97", "#108E2B"],
    badge: "Made to order · from 48h",
    badgeColor: "#0B1215",
  },
  {
    id: "dp-004",
    name: "Heavy-Duty Equipment Hook",
    desc: "Under-desk or wall-mount tool hook rated for up to 3 kg continuous load.",
    material: "ABS",
    colors: ["#0B1215", "#F5F5F2"],
    badge: "Made to order · from 48h",
    badgeColor: "#0B1215",
  },
  {
    id: "dp-005",
    name: "Magnetic Cable Clips (Pack of 6)",
    desc: "Flexible edge-mount organisers that route power, video, and data cables cleanly.",
    material: "TPU (Flexible)",
    colors: ["#0B1215", "#004C97", "#E5E5E5"],
    badge: "Pack of 6 · from 48h",
    badgeColor: "#8E44AD",
  },
  {
    id: "dp-006",
    name: "Ventilated Laptop Stand",
    desc: "Thermal-flow riser with adjustable incline. Compatible with 13–17 inch workstations.",
    material: "PETG",
    colors: ["#0B1215", "#E5E5E5"],
    badge: "Made to order · from 48h",
    badgeColor: "#004C97",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Upload,
    title: "Send CAD or Sketches",
    body: "Upload your STEP, STL, OBJ, or 3MF file. No CAD? Share dimensioned sketches and our engineers will model it.",
  },
  {
    step: "02",
    icon: Layers,
    title: "Material & Slicing Review",
    body: "We select the optimal polymer, infill geometry, and print orientation for structural strength.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Print & Quality Verification",
    body: "Printed on calibrated industrial FDM and SLA resin equipment with digital calliper tolerance checks.",
  },
  {
    step: "04",
    icon: Package,
    title: "Dispatched to Your Door",
    body: "Same-day delivery across Nairobi upon print completion; nationwide shipping within 2 business days.",
  },
];

interface MaterialSpec {
  name: string;
  use: string;
  strength: number; // out of 5
  heat: number;     // out of 5
  flexibility: number; // out of 5
  uv: number;       // out of 5
  color: string;
}

const MATERIALS: MaterialSpec[] = [
  { name: "PLA+", use: "Rapid aesthetic prototypes, desk organisers, fit tests", strength: 3, heat: 2, flexibility: 1, uv: 2, color: "#004C97" },
  { name: "PETG", use: "Functional enclosures, water-resistant parts, mechanical brackets", strength: 4, heat: 3, flexibility: 2, uv: 4, color: "#108E2B" },
  { name: "ABS", use: "High-impact components, automotive clips, heat-exposed housings", strength: 4, heat: 4, flexibility: 2, uv: 2, color: "#E67E22" },
  { name: "TPU (95A)", use: "Flexible gaskets, vibration dampers, protective bumper boots", strength: 4, heat: 3, flexibility: 5, uv: 4, color: "#8E44AD" },
  { name: "ASA", use: "Outdoor enclosures, agricultural fixtures, UV-exposed outdoor parts", strength: 4, heat: 4, flexibility: 2, uv: 5, color: "#C0392B" },
  { name: "SLA Engineering Resin", use: "Micro-detailed parts, visual master patterns, dental/jewellery moulds", strength: 3, heat: 3, flexibility: 1, uv: 3, color: "#0B1215" },
];

function RatingStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-500 text-xs">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= count ? "opacity-100" : "opacity-20"}>
          ★
        </span>
      ))}
    </div>
  );
}

const CUSTOMER_BENEFITS = [
  {
    title: "Zero Tooling Capital",
    body: "Validate fit, assembly, and customer demand without committing \$10,000+ to steel injection-mould tooling.",
  },
  {
    title: "Rapid Same-Week Iteration",
    body: "Turn CAD changes into physical, testable parts within 48 hours instead of waiting months for overseas samples.",
  },
  {
    title: "Bridge to Mass Injection Moulding",
    body: "Prototype your parts here on our 3D printers, and when your demand scales, PurePlast will tool the steel mould for mass factory production.",
  },
];

export default function ThreeDClient() {
  return (
    <div className="flex flex-col bg-[#FAFAF8]">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative -mt-16 min-h-screen flex items-center justify-center overflow-hidden bg-[#0B1215]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/3d_printer_hero.png"
            alt="PurePlast Precision 3D Printing in Kitengela"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1215]/95 via-[#0B1215]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-6 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
              Additive Manufacturing &amp; Rapid Prototyping
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] mb-6 text-white text-balance">
              Precision 3D Printing.
              <br />
              <span className="text-[#60A5FA]">Rapid Prototyping.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              From functional prototypes to bespoke low-volume components. Upload your STEP or STL file for a prompt technical review — delivered across Nairobi from 48 hours.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact?type=3d_upload">
                <Button
                  size="lg"
                  className="h-13 px-8 text-base rounded-full bg-[#004C97] hover:bg-[#004C97]/90 text-white font-semibold border-0"
                >
                  <Upload size={18} className="mr-2" /> Upload CAD / STL File
                </Button>
              </Link>
              <a href="#catalogue">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-base rounded-full border-white/25 text-white hover:bg-white/10 bg-transparent font-semibold"
                >
                  Browse Printed Accessories
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <span className="text-xl font-bold text-[#60A5FA]">{s.value}</span>
                <span className="text-xs text-white/60 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT BENEFITS & BRIDGE TO INJECTION MOULDING ────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E5E5E5] bg-[#0B1215]"
            >
              <Image
                src="/images/stl_wireframe.png"
                alt="CAD wireframe to physical polymer component"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 text-xs font-bold text-[#0B1215] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
                CAD File → Physical Component from 48h
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
                Why 3D Print With PurePlast
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] mb-5 leading-snug">
                Prototype here. Scale with{" "}
                <span className="text-[#004C97]">injection moulding.</span>
              </h2>
              <p className="text-black/65 leading-relaxed mb-8">
                Most companies have to choose between a prototyping workshop and a mass production factory. PurePlast integrates both under one roof: test your component with additive manufacturing, then transition smoothly into steel injection tooling when market demand warrants volume.
              </p>
              <div className="space-y-4">
                {CUSTOMER_BENEFITS.map((item) => (
                  <div key={item.title} className="flex gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-[#108E2B]/10 flex items-center justify-center shrink-0 mt-0.5 text-[#108E2B]">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#0B1215] mb-0.5">{item.title}</h4>
                      <p className="text-xs text-black/60 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DESK CATALOGUE ────────────────────────────────────────────────────── */}
      <section id="catalogue" className="py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
                On-Demand Print Collection
              </p>
              <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215]">
                Desk &amp; Workspace Accessories
              </h2>
              <p className="text-black/55 mt-2 max-w-md text-sm">
                Each product is 3D printed on demand in your choice of material and colour with no minimum order.
              </p>
            </div>
            <Link href="/contact?type=3d">
              <Button variant="outline" className="border-black/15 rounded-full hover:bg-black hover:text-white transition-all text-sm font-semibold">
                Request Custom 3D Design <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESK_PRODUCTS.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-[#0B1215] relative flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/3d_desk_products.png"
                    alt={prod.name}
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full text-white"
                      style={{ background: prod.badgeColor }}
                    >
                      {prod.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white/15 text-white border border-white/20">
                      {prod.material}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {prod.colors.map((c) => (
                      <span
                        key={c}
                        className="w-3.5 h-3.5 rounded-full border-2 border-white/50"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-base text-[#0B1215] mb-1.5">{prod.name}</h3>
                  <p className="text-xs text-black/55 leading-relaxed mb-4">{prod.desc}</p>
                  <Link
                    href={`/contact?type=3d&product=${encodeURIComponent(prod.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004C97] hover:gap-2 transition-all"
                  >
                    Order / Customise <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center max-w-xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
              Process
            </p>
            <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215]">
              From digital CAD to your doorstep
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="p-6 rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] space-y-3"
                >
                  <span className="text-4xl font-black text-[#004C97]/15 leading-none block">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-[#004C97]/10 flex items-center justify-center text-[#004C97]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-[#0B1215]">{step.title}</h3>
                  <p className="text-xs text-black/60 leading-relaxed">{step.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MATERIALS TABLE WITH STAR RATINGS ─────────────────────────────────── */}
      <section className="py-24 bg-[#FAFAF8] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
              Materials
            </p>
            <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215]">
              The right polymer for every application
            </h2>
            <p className="text-black/60 mt-2 text-sm leading-relaxed">
              We stock engineering-grade thermoplastics and high-resolution SLA photopolymer resins. Compare properties to match your structural requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MATERIALS.map((mat) => (
              <div
                key={mat.name}
                className="p-6 rounded-3xl border border-[#E5E5E5] bg-white space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#0B1215]">{mat.name}</h3>
                  <span className="w-3 h-3 rounded-full" style={{ background: mat.color }} />
                </div>
                <p className="text-xs text-black/60 leading-relaxed min-h-[36px]">{mat.use}</p>

                {/* Rating Metrics */}
                <div className="space-y-2 pt-3 border-t border-[#E5E5E5] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-black/50">Mechanical Strength</span>
                    <RatingStars count={mat.strength} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/50">Heat Resistance</span>
                    <RatingStars count={mat.heat} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/50">Flexibility</span>
                    <RatingStars count={mat.flexibility} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/50">UV Stability</span>
                    <RatingStars count={mat.uv} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1215]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase text-white/50">
                  Ready to Build
                </span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tighter text-white mb-4 leading-snug">
                Have a CAD file ready?<br />
                <span className="text-[#60A5FA]">Let&apos;s start printing.</span>
              </h2>
              <p className="text-white/65 leading-relaxed mb-8 max-w-md text-sm">
                Upload your STEP, STL, or 3MF file. Our engineering team reviews infill, wall thickness, and draft angles to return a detailed quote within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=3d_upload">
                  <Button className="bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0 rounded-full h-12 px-7 font-semibold">
                    Submit 3D Model
                  </Button>
                </Link>
                <Link href="/contact?type=3d">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-7 bg-transparent font-semibold"
                  >
                    Request Technical Callback
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "No Minimum Order", detail: "Print 1 prototype or 1,000 units" },
                { label: "15+ Material Options", detail: "PLA+, PETG, ABS, TPU & SLA resin" },
                { label: "STEP, STL, OBJ & 3MF", detail: "All standard CAD formats accepted" },
                { label: "Nairobi & Nationwide", detail: "Same-day Nairobi delivery on completion" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-3xl border border-white/10 bg-white/5"
                >
                  <h4 className="font-bold text-sm text-white mb-1">{item.label}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


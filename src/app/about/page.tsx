"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "15+", label: "Years manufacturing" },
  { value: "30+", label: "Product lines" },
  { value: "6", label: "Product categories" },
  { value: "48h", label: "Custom quote turnaround" },
];

const CORE_VALUES = [
  {
    label: "Precision Engineering",
    detail: "Exact dimensional tolerances — every batch, every mould.",
    color: "#004C97",
    bg: "#004C97",
  },
  {
    label: "Long-Term Partnerships",
    detail: "Custom tooling, branded moulds, and exclusive formulations — investments we make together.",
    color: "#108E2B",
    bg: "#108E2B",
  },
  {
    label: "Local Manufacturing",
    detail: "Designed, moulded, and finished at our Kitengela facility. No import delays.",
    color: "#E67E22",
    bg: "#E67E22",
  },
  {
    label: "Sustainable Production",
    detail: "Recyclable polymers and responsible practices — reducing waste at every stage.",
    color: "#8E44AD",
    bg: "#8E44AD",
  },
  {
    label: "Continuous Innovation",
    detail: "From 3D-printed prototypes to full injection-mould tooling — staying ahead.",
    color: "#C0392B",
    bg: "#C0392B",
  },
  {
    label: "Client-First Flexibility",
    detail: "Custom colours, dimensions, logos, and materials on request.",
    color: "#0B1215",
    bg: "#0B1215",
  },
];

const CAPABILITIES = [
  {
    title: "Injection Moulding",
    body: "High-volume production of complex plastic parts with tight tolerances. Multi-cavity tooling for consumer goods, industrial components, and custom OEM parts.",
    materials: ["PP", "ABS", "HDPE", "PETG", "PET"],
    color: "#004C97",
  },
  {
    title: "Thermoforming",
    body: "Precision forming of flat plastic sheets into trays, enclosures, and packaging. Ideal for food-safe containers and industrial fitments.",
    materials: ["PET", "HIPS", "ABS", "PP"],
    color: "#108E2B",
  },
  {
    title: "FDM / SLA 3D Printing",
    body: "Rapid prototyping and short-run production of custom parts. We print from STL files and provide design support.",
    materials: ["PLA+", "PETG", "ABS", "TPU", "Resin"],
    color: "#E67E22",
  },
  {
    title: "Custom Mould Tooling",
    body: "In-house mould design and fabrication for long-term manufacturing partnerships. Built to exact client specifications with logo integration.",
    materials: ["All polymers", "Custom spec"],
    color: "#0B1215",
  },
];

const CERTIFICATIONS = [
  { label: "KEBS Certified", sub: "Kenya Bureau of Standards" },
  { label: "BPA-Free Production", sub: "All consumer products" },
  { label: "ISO 9001 Ready", sub: "Quality Management — in progress" },
  { label: "Food-Safe Materials", sub: "Kitchen & packaging lines" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 pt-12 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#108E2B]">
                Who We Are
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-[#0B1215] mb-5">
              About PurePlast
            </h1>
            <p className="text-lg md:text-xl text-black/55 leading-relaxed max-w-2xl">
              An industrial precision plastic manufacturer — building Kenya&apos;s most
              capable polymer manufacturing infrastructure, one long-term partnership at a time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── FACTORY HERO IMAGE ──────────────────────────────────────────────── */}
      <div className="relative w-full h-[360px] md:h-[500px] overflow-hidden bg-[#0B1215]">
        <Image
          src="/images/factory.png"
          alt="PurePlast manufacturing facility, Kitengela"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/80 via-transparent to-transparent" />

        {/* Stats strip over image */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/15">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-start md:justify-center gap-10 md:gap-24 overflow-x-auto">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3 flex-shrink-0">
                <span className="text-3xl font-black text-white tracking-tight">{s.value}</span>
                <span className="text-sm text-white/55 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COMPANY STORY ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-4">
                  Our Story
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] mb-6 leading-snug">
                  Built in Kenya.{" "}
                  <span className="text-[#004C97]">Trusted across the region.</span>
                </h2>
                <p className="text-base md:text-lg text-black/60 leading-relaxed mb-5">
                  PurePlast was established in Kitengela, Kajiado County, with a
                  singular focus: manufacture plastic products that match
                  global quality standards at prices that work for the East African market.
                </p>
                <p className="text-base md:text-lg text-black/60 leading-relaxed">
                  What began as a household plastics operation has grown into a
                  full-spectrum polymer manufacturing business — spanning everyday consumer
                  goods, custom injection-moulded components, and precision 3D-printed parts.
                </p>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="w-1 h-14 bg-[#108E2B] rounded-full flex-shrink-0 mt-1" />
                <p className="text-base text-black/50 italic leading-relaxed">
                  &ldquo;Our model is built on long-term partnerships, not one-off transactions.
                  When a client&apos;s business grows, ours grows with it.&rdquo;
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E5E5E5]">
                <Image
                  src="/images/factory.png"
                  alt="PurePlast production floor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-[#004C97] text-white">
                  <p className="text-2xl font-bold mb-1">Kitengela</p>
                  <p className="text-sm text-white/60">Kenya Prisons Road, Kajiado County</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#108E2B] text-white">
                  <p className="text-2xl font-bold mb-1">100%</p>
                  <p className="text-sm text-white/60">BPA-free consumer products</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215]">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-7 rounded-3xl border border-[#E5E5E5] bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${v.bg}15` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: v.color }} />
                </div>
                <h3 className="font-bold text-lg text-[#0B1215] mb-3">{v.label}</h3>
                <p className="text-base text-black/50 leading-relaxed">{v.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANUFACTURING CAPABILITIES ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-3">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] max-w-lg">
              Manufacturing Capabilities
            </h2>
            <p className="text-base md:text-lg text-black/50 mt-3 max-w-lg leading-relaxed">
              From high-volume injection moulding to precision 3D printing — we cover the full polymer manufacturing stack.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-3 h-10 rounded-full mb-6"
                  style={{ background: cap.color }}
                />
                <h3 className="font-bold text-xl text-[#0B1215] mb-3">{cap.title}</h3>
                <p className="text-base text-black/50 leading-relaxed mb-5">{cap.body}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.materials.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 text-sm font-bold tracking-wide uppercase rounded-full border"
                      style={{
                        borderColor: `${cap.color}30`,
                        color: cap.color,
                        background: `${cap.color}08`,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP DARK SECTION ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#0B1215]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#108E2B] animate-pulse" />
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-white/40">
                  How We Work
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-5 leading-snug">
                Built for long-term{" "}
                <span className="text-[#60A5FA]">manufacturing partnerships.</span>
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
                PurePlast is not a catalogue supplier. Our highest-value
                relationships are multi-year agreements where we co-invest in
                custom tooling, exclusive formulations, and dedicated production
                capacity — for companies that need a reliable partner, not a vendor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0 rounded-full h-12 px-7 text-base">
                    Discuss a Partnership <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/partners">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-7 bg-transparent text-base"
                  >
                    Partner Types
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 gap-4"
            >
              {[
                { label: "Custom Mould Investment", detail: "Co-invest in tooling. Your branded mould is designed, fabricated, and owned as part of a long-term supply agreement." },
                { label: "Dedicated Production Runs", detail: "Long-term partners get scheduled production capacity. Predictable lead times built into your supply chain." },
                { label: "Logo & Brand Integration", detail: "Embossed logos, custom colour matching, proprietary shapes — engineered directly into the mould at no recurring cost." },
                { label: "Pricing That Works Long-Term", detail: "Multi-year agreements let us price at production cost plus a fair margin — not spot-order pricing." },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-2xl border border-white/10 bg-white/5"
                >
                  <h4 className="font-bold text-base text-white mb-1">{item.label}</h4>
                  <p className="text-sm text-white/45 leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-bold tracking-[0.15em] uppercase text-black/30 mb-10 text-center">
            Standards & Compliance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-6 rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] text-center"
              >
                <p className="font-bold text-base text-[#0B1215] mb-2">{cert.label}</p>
                <p className="text-sm text-black/40">{cert.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#FAFAF8] border-t border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-5">
              Ready to talk manufacturing?
            </h2>
            <p className="text-base md:text-lg text-black/50 max-w-lg mx-auto mb-10 leading-relaxed">
              Whether you need bulk standard products, custom-engineered
              components, or a long-term manufacturing partnership — we want to hear from you.
            </p>
            <Link href="/contact">
              <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 rounded-full h-14 px-10 text-lg">
                Contact Our Team <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
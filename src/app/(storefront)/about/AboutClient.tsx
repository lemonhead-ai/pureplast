"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Cpu } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";

const STATS = [
  { value: "Est. 2026", label: "Kitengela facility" },
  { value: "21", label: "Catalogued lines" },
  { value: "3", label: "Material grades (Virgin, GR2, GR3)" },
  { value: SITE_CONFIG.standards.quoteTurnaroundShort, label: "Technical quote reply" },
];

const CORE_VALUES = [
  {
    label: "Dimensional Precision",
    detail: "Tight tolerances engineered into our injection moulds and validated with digital inspection on every batch.",
    color: "#004C97",
    bg: "#004C97",
  },
  {
    label: "Local Production",
    detail: "Moulded, finished, and packaged at our facility on Kenya Prisons Road in Kitengela. Designed for the East African climate.",
    color: "#108E2B",
    bg: "#108E2B",
  },
  {
    label: "Material Integrity",
    detail: "Transparent polymer allocation: prime virgin resin for tableware, and reprocessed GR2/GR3 polymers for utility lines.",
    color: "#E67E22",
    bg: "#E67E22",
  },
  {
    label: "Tooling Partnership",
    detail: "We engineer proprietary moulds for OEM clients, with clear exclusive ownership and scheduled production allocation.",
    color: "#8E44AD",
    bg: "#8E44AD",
  },
  {
    label: "Tooling Validation",
    detail: "Rapid prototype sampling and fit tests, coupled directly with high-tonnage injection moulding for volume scale.",
    color: "#C0392B",
    bg: "#C0392B",
  },
  {
    label: "Commercial Transparency",
    detail: "Straightforward wholesale pricing schedules and predictable lead times with direct factory dispatch.",
    color: "#0B1215",
    bg: "#0B1215",
  },
];

const CAPABILITIES = [
  {
    title: "High-Volume Injection Moulding",
    body: "Multi-cavity hydraulic and electric injection presses for consumer household goods, industrial fitments, and bespoke B2B parts.",
    materials: ["Polypropylene (PP)", "HDPE", "ABS", "Reprocessed PE"],
    color: "#004C97",
  },
  {
    title: "Precision Tooling & Sampling",
    body: "Rapid prototype tooling, dimensional validation, and pre-production sampling for custom components and proprietary shapes.",
    materials: ["P20 Tool Steel", "Aluminium Test Moulds", "CAD/CAM Validation"],
    color: "#E67E22",
  },
  {
    title: "Proprietary Mould Tooling",
    body: "Collaborative CAD mould design and precision tool fabrication for private-label brand production runs.",
    materials: ["P20 Tool Steel", "Aluminium Prototyping", "Multi-Cavity"],
    color: "#0B1215",
  },
  {
    title: "Closed-Loop Scrap Regrind",
    body: "In-line granulation systems that reprocess clean internal sprues and runners immediately into compatible utility lines.",
    materials: ["Clean production regrind", "Closed-loop utility reuse"],
    color: "#108E2B",
  },
];

export default function AboutClient() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-2">
              Who We Are
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-[#0B1215] mb-4">
              About PurePlast
            </h1>
            <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl">
              A modern polymer manufacturing facility in Kitengela — dedicated to high-precision injection moulding, wholesale utility homewares, and custom industrial components.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Factory Hero Banner & Stats ─────────────────────────── */}
      <div className="relative w-full h-[320px] md:h-[460px] overflow-hidden bg-[#0B1215]">
        <Image
          src="/images/factory.png"
          alt="PurePlast Manufacturing Plant Kitengela"
          fill
          className="object-cover opacity-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215]/85 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/15">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-start md:justify-center gap-10 md:gap-20 overflow-x-auto">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2.5 shrink-0">
                <span className="text-2xl md:text-3xl font-black text-white tracking-tight">{s.value}</span>
                <span className="text-xs text-white/60 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Company Story ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
                  Our Story
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] mb-5 leading-snug">
                  Engineered locally.{" "}
                  <span className="text-[#004C97]">Built to industrial standards.</span>
                </h2>
                <p className="text-base text-black/65 leading-relaxed mb-4">
                  PurePlast was established in Kitengela, Kajiado County, to supply the East African market with durable, precision-manufactured plastic products without reliance on long-lead overseas shipping.
                </p>
                <p className="text-base text-black/65 leading-relaxed">
                  Our facility bridges everyday consumer essentials (basins, tableware, hangers, laundry pegs) with advanced industrial engineering. By housing precision prototype sampling and high-capacity injection tooling under one management team, we assist commercial clients from their first component validation all the way through to commercial mass production.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAFAF8] border-l-4 border-[#108E2B] space-y-1">
                <p className="text-sm text-black/75 italic leading-relaxed">
                  &ldquo;Our focus is operational honesty: publish what is true on day one, build tooling that lasts decades, and maintain zero compromise on material safety.&rdquo;
                </p>
                <p className="text-xs font-bold text-[#0B1215] pt-1">
                  — Managing Director, PurePlast Industries Ltd
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E5E5E5]">
                <Image
                  src="/images/factory.png"
                  alt="PurePlast Kitengela Production Floor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#004C97] text-white">
                  <p className="text-xl font-bold mb-1">Kitengela</p>
                  <p className="text-xs text-white/70">Kenya Prisons Road, Kajiado County</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#108E2B] text-white">
                  <p className="text-xl font-bold mb-1">3 Material Grades</p>
                  <p className="text-xs text-white/70">Virgin, GR2 &amp; GR3 recycled lines</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-2">
              Our Principles
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215]">
              Core Manufacturing Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_VALUES.map((v) => (
              <div
                key={v.label}
                className="p-6 rounded-3xl border border-[#E5E5E5] bg-white hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${v.bg}15` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: v.color }} />
                </div>
                <h3 className="font-bold text-base text-[#0B1215] mb-2">{v.label}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215]">
              What We Produce in Kitengela
            </h2>
            <p className="text-black/60 text-sm mt-2 leading-relaxed">
              We cover polymer processing from early rapid prototyping to continuous multi-cavity injection moulding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] space-y-3"
              >
                <div className="w-3 h-8 rounded-full mb-3" style={{ background: cap.color }} />
                <h3 className="font-bold text-lg text-[#0B1215]">{cap.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed mb-3">{cap.body}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.materials.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-full border border-black/10 bg-white text-black/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Concise Sustainability Teaser (Not duplicate) ──────── */}
      <section className="py-16 bg-[#108E2B] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70 block mb-2">
              Sustainability Built In
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2">
              Two of our three material grades use recycled polymer.
            </h2>
            <p className="text-white/80 text-sm max-w-xl leading-relaxed">
              We use prime virgin resin strictly where tableware safety or technical engineering requires it. All other utility lines integrate clean post-industrial reprocessed plastic.
            </p>
          </div>
          <Link href="/sustainability" className="shrink-0">
            <Button className="bg-white text-[#108E2B] hover:bg-white/95 font-semibold rounded-full h-12 px-7 text-sm border-0">
              Read Our Materials Policy <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Partnerships Teaser ──────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#0B1215] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest uppercase text-white/50 block mb-2">
                Long-Term Production
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-white mb-4">
                More than a catalogue supplier.
              </h2>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                PurePlast is more than a catalogue supplier. We partner with distributors, retail chains, and OEM manufacturers to co-invest in dedicated mould tooling. Client-funded moulds remain the exclusive property of the partner, reserved exclusively for their production scheduling.
              </p>
              <Link href="/partners">
                <Button className="bg-[#004C97] hover:bg-[#004C97]/90 text-white font-semibold rounded-full h-12 px-7 text-sm border-0">
                  Explore Partnership Programs <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>

            <div className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4 text-xs">
              <div className="flex gap-3">
                <Shield size={20} className="text-[#60A5FA] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Protected Tooling Ownership</h4>
                  <p className="text-white/60 leading-relaxed">
                    Client-financed tooling contracts stipulate that moulds are the sole proprietary asset of the client and can never be used for competing commercial runs.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pt-3 border-t border-white/10">
                <Cpu size={20} className="text-[#108E2B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Priority Capacity Scheduling</h4>
                  <p className="text-white/60 leading-relaxed">
                    Long-term OEM partners receive dedicated production slots on our injection presses, providing predictable replenishment without import bottlenecks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final Contact CTA ────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-[#E5E5E5] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215] mb-3">
            Visit Our Factory in Kitengela
          </h2>
          <p className="text-black/60 text-sm mb-8 leading-relaxed">
            Discuss wholesale orders, inspect our material grades in person, or review CAD files with our tooling team.
          </p>
          <Link href="/contact">
            <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white font-semibold rounded-full h-13 px-8 text-sm border-0">
              Contact Sales Desk <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const CORE_VALUES = [
  {
    label: "Precision Engineering",
    detail: "Every product is manufactured to exact tolerances — no shortcuts.",
    color: "#004C97",
  },
  {
    label: "Sustainable Solutions",
    detail: "We prioritise recyclable materials and responsible production processes.",
    color: "#108E2B",
  },
  {
    label: "Continuous Innovation",
    detail: "We invest in modern tooling and processes to stay ahead of industry standards.",
    color: "#0B1215",
  },
];

const MISSION_PILLARS = [
  {
    number: "01",
    title: "Manufacture for Africa",
    body: "We produce practical, durable plastic products that meet the real demands of Kenyan households, businesses, and industries — at a price point that makes sense.",
  },
  {
    number: "02",
    title: "Raise the Standard",
    body: "Our ambition is to elevate local manufacturing to world-class mould-making levels, proving that precision-engineered plastics can be made right here.",
  },
  {
    number: "03",
    title: "Grow With Our Clients",
    body: "From standard stock items to fully custom-engineered components, we scale our capabilities around what our clients need — not the other way around.",
  },
];

export default function About() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 pt-28 pb-10 md:pt-24 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2 md:mb-3">
              Who We Are
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-4 md:mb-5">
              About PurePlast
            </h1>
            <p className="text-base md:text-xl text-black/55 leading-relaxed">
              PurePlast is an industrial precision plastic manufacturing company
              dedicated to producing high-quality household plastics and custom
              engineered solutions — built in Kenya, trusted across the region.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Vision + Image ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">

          {/* Text — shown first on mobile so it reads top-to-bottom */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-5 md:space-y-7 order-1 md:order-2"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B1215] mb-3 md:mb-4">
                Our Vision
              </h2>
              <p className="text-sm md:text-base text-black/60 leading-relaxed">
                We aim to embody the pinnacle of plastic manufacturing. While we
                pride ourselves on our core line of everyday products — durable
                mugs, basins, and chairs — we are actively growing our
                infrastructure to world-class mould manufacturing levels,
                providing end-to-end solutions for complex, custom-engineered
                parts.
              </p>
            </div>

            <div className="pt-5 md:pt-6 border-t border-[#E5E5E5]">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/30 mb-3 md:mb-5">
                Core Values
              </h3>
              <ul className="space-y-3 md:space-y-4">
                {CORE_VALUES.map((v) => (
                  <li key={v.label} className="flex items-start gap-3 md:gap-4">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: v.color }}
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#0B1215]">{v.label}</p>
                      <p className="text-xs text-black/45 mt-0.5 leading-relaxed">{v.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image — below text on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="aspect-video bg-[#E5E5E5] rounded-2xl md:rounded-3xl flex items-center justify-center text-black/25 border border-[#E5E5E5] overflow-hidden order-2 md:order-1"
          >
            {/* Replace with: <Image src="/images/facility.jpg" alt="PurePlast Facility" fill className="object-cover" /> */}
            <span className="font-medium text-xs md:text-sm text-center px-4">
              About Image Placeholder (Facility or Team)
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Mission ──────────────────────────────────────────────── */}
      <div className="border-t border-[#E5E5E5] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-14"
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#004C97] mb-2 md:mb-3">
              Our Mission
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tighter text-[#0B1215] max-w-xl leading-snug">
              To manufacture products that improve everyday life — reliably, affordably, and at scale.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {MISSION_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-5 md:p-7 rounded-2xl md:rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl md:text-5xl font-black text-[#004C97]/10 leading-none block mb-3 md:mb-5 tracking-tighter">
                  {pillar.number}
                </span>
                <h3 className="font-semibold text-sm md:text-base text-[#0B1215] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs md:text-sm text-black/50 leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

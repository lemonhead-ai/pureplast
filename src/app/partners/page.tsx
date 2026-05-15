"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PARTNER_TYPES = [
  {
    title: "OEM Manufacturing Partners",
    body: "Custom-moulded plastic components produced to your exact specifications, supplied on a long-term exclusive basis.",
    examples: "Consumer goods brands, packaging companies, FMCG manufacturers",
    commitment: "Multi-year agreement",
    color: "black",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Distribution Partners",
    body: "Regional and national distributors who carry our standard product lines, into retail and wholesale channels across East Africa.",
    examples: "Hardware distributors, retail chains, wholesale traders",
    commitment: "Annual supply agreement",
    color: "black",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m-9 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M13 11h8a2 2 0 012 2v6a2 2 0 01-2 2h-8a2 2 0 01-2-2v-6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Raw Material Suppliers",
    body: "Polymer resin suppliers, masterbatch manufacturers, and additive producers who supply consistent, quality-certified raw materials for our production lines.",
    examples: "Polymer importers, resin distributors, chemical suppliers",
    commitment: "Ongoing supply relationship",
    color: "black",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Technology & Tooling Partners",
    body: "CAD design bureaus, tooling fabricators, and machinery suppliers who help us expand our manufacturing capabilities.",
    examples: "Mould makers, CAD/CAM firms, machinery suppliers",
    commitment: "Project-based to long-term",
    color: "black",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const WHY_PARTNER = [
  { label: "No Import Risk", detail: "100% locally manufactured.", color: "grey" },
  { label: "Exclusive Tooling", detail: "Branded components no competitor can replicate.", color: "grey" },
  { label: "Scalable Volumes", detail: "We scale with your demand.", color: "grey" },
  { label: "Direct Relationship", detail: "No agents, no middlemen.", color: "grey" },
];

// ─── Partnership Enquiry Form ──────────────────────────────────────────────────

function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const company     = data.get("company") as string;
    const name        = data.get("name") as string;
    const email       = data.get("email") as string;
    const phone       = data.get("phone") as string;
    const type        = data.get("type") as string;
    const description = data.get("description") as string;

    const subject = `Partnership Enquiry — ${company} (${type})`;
    const body = [
      `Company: ${company}`,
      `Contact: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Partnership Type: ${type}`,
      ``,
      `Description:`,
      description,
    ].join("\n");

    // TODO: Replace with API call to /api/partner-enquiry when backend is live
    window.location.href = `mailto:martinmwai901@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center gap-5"
      >
        <div className="w-16 h-16 rounded-full bg-[#108E2B]/10 flex items-center justify-center text-[#108E2B]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0B1215]">Enquiry sent!</h3>
          <p className="text-base text-black/50 mt-2 leading-relaxed">
            Your email client should have opened with the enquiry pre-filled.<br />
            We&apos;ll respond within one business day.
          </p>
        </div>
        <button onClick={() => setSubmitted(false)} className="text-sm text-[#004C97] underline mt-2">
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Company Name *</label>
          <Input name="company" placeholder="Acme Distributors Ltd" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Your Name *</label>
          <Input name="name" placeholder="John Kamau" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Email Address *</label>
          <Input name="email" type="email" placeholder="john@company.co.ke" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Phone</label>
          <Input name="phone" type="tel" placeholder="+254 7XX XXX XXX" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Partnership Type *</label>
        <select
          name="type"
          required
          className="flex h-12 w-full rounded-3xl border border-[#E5E5E5] bg-white px-4 py-2 text-base text-[#0B1215] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 transition-all"
        >
          <option value="">Select partnership type…</option>
          <option value="OEM Manufacturing">OEM Manufacturing Partner</option>
          <option value="Distribution">Distribution Partner</option>
          <option value="Raw Material Supply">Raw Material Supplier</option>
          <option value="Technology & Tooling">Technology &amp; Tooling Partner</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">
          Tell us about your business &amp; what you need *
        </label>
        <textarea
          name="description"
          required
          placeholder="Describe your products, target volumes, timeline, and any specific requirements…"
          className="flex w-full rounded-3xl border border-[#E5E5E5] bg-white px-5 py-4 text-base placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 min-h-[160px] resize-none transition-all"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 rounded-full h-14 text-base"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending…
          </span>
        ) : (
          "Submit Partnership Enquiry"
        )}
      </Button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Partners() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center -mt-10 gap-2 mb-4">
              <p className="text-md font-regular tracking-[0.15em] uppercase text-[#086e1e]">
                Work With Us
              </p>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-5">
              Partners &amp; Partnerships
            </h1>
            <p className="text-lg md:text-xl text-black/55 leading-relaxed max-w-2xl">
              PurePlast builds long-term manufacturing relationships. We work with distributors, OEM clients, raw
              material suppliers, and technology partners across East Africa.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── PARTNERSHIP TYPES ───────────────────────────────────────────────── */}
      <section className="py-2 md:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-7"
          >
            <p className="text-md font-regular -mt-10 tracking-[0.15em] uppercase text-[#1d62a8] mb-3">
              Types of Partners
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215]">
              Who we partner with
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PARTNER_TYPES.map((pt, i) => (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-10 rounded-3xl border border-[#E5E5E5] bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${pt.color}12`, color: pt.color }}
                >
                  {pt.icon}
                </div>
                <h3 className="font-bold text-xl text-[#0B1215] mb-3">{pt.title}</h3>
                <p className="text-base text-black/50 leading-relaxed mb-5">{pt.body}</p>
                <div className="flex flex-col gap-2 pt-5 border-t border-[#E5E5E5]">
                  <p className="text-xs text-black/35 uppercase tracking-widest font-semibold">Examples</p>
                  <p className="text-sm text-black/55">{pt.examples}</p>
                  <span
                    className="mt-2 w-fit px-3 py-1.5 text-sm font-bold tracking-wide uppercase rounded-full"
                    style={{ background: `${pt.color}10`, color: pt.color }}
                  >
                    {pt.commitment}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PARTNER — dark section ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#0B1215]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-4">
              <p className="text-md font-regular tracking-[0.15em] uppercase text-white/40">
                The Advantage
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tighter text-white">
              Why partner with PurePlast?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_PARTNER.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-2 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
              >
                <div
                  className="w-6 h-6 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}25` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">{item.label}</h4>
                <p className="text-base text-white/45 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP ENQUIRY FORM ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" id="enquire">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

            {/* Left — context */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <p className="text-md font-regular tracking-[0.15em] uppercase text-[#108E2B]">
                  Get Started
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] mb-6 leading-snug">
                Become a<br />PurePlast partner.
              </h2>
              <p className="text-base md:text-lg text-black/55 leading-relaxed mb-8">
                Tell us about your business and what you need. Our team will
                review your enquiry and come back with a tailored proposal — typically within one business day.
              </p>
              <div className="space-y-4">
                {[
                  "Bulk standard product supply",
                  "Custom OEM / branded manufacturing",
                  "Raw material or tooling supply",
                  "Distribution of PurePlast products",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#108E2B]/10 flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#108E2B" strokeWidth={2.5} className="w-3.5 h-3.5">
                        <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-base text-black/60">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-[#E5E5E5]">
                <p className="text-sm text-black/40 mb-4 uppercase tracking-widest font-semibold">Or reach us directly</p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-[#E5E5E5] text-[#0B1215] hover:bg-[#0B1215] hover:text-white rounded-full h-12 px-7 text-base transition-all"
                  >
                    General Contact <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 bg-white rounded-3xl border border-[#E5E5E5] p-8 md:p-10"
            >
              <h3 className="text-2xl font-semibold text-[#0B1215] mb-1">Partnership Enquiry</h3>
              <PartnershipForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
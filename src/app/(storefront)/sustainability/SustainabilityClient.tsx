"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Layers,
  ArrowRight,
  Printer,
} from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";
import {
  MATERIAL_GRADES,
  MANUFACTURING_PRACTICES,
  DATED_COMMITMENTS,
  BUYER_FAQS,
  SUPPLIER_SUSTAINABILITY_STATEMENT,
} from "@/data/sustainability";

export default function SustainabilityClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showStatementModal, setShowStatementModal] = useState(false);

  function toggleFaq(index: number) {
    setOpenFaq(openFaq === index ? null : index);
  }

  function handlePrintStatement() {
    window.print();
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E5E5E5] pt-14 pb-14 md:pt-20 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-3">
              Materials &amp; Environmental Policy
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-[#0B1215] mb-6">
              Recycled plastic is built into our range.
            </h1>
            <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-2xl mx-auto">
              PurePlast produces two of its three material grades from recycled plastic. Choose GR2 or GR3 and you&apos;re buying a product that kept plastic out of landfill. We use prime virgin polymer only where food-contact safety or engineering specifications require it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 1: MATERIAL GRADES BREAKDOWN ────────────────── */}
      <section className="py-20 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#004C97] block mb-2">
              Polymer Sourcing
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215]">
              Our Three Material Grades Explained
            </h2>
            <p className="text-black/60 text-sm mt-2 leading-relaxed">
              We never blend unverified scrap into food-contact items, nor do we hide recycled content. Every product is moulded from a declared, traceable resin grade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MATERIAL_GRADES.map((mg) => (
              <div
                key={mg.grade}
                className="p-7 rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                        mg.grade === "VIRGIN"
                          ? "bg-[#004C97]/10 text-[#004C97] border border-[#004C97]/20"
                          : mg.grade === "GR2"
                          ? "bg-[#108E2B]/10 text-[#108E2B] border border-[#108E2B]/20"
                          : "bg-black/5 text-black/70 border border-black/10"
                      }`}
                    >
                      {mg.grade}
                    </span>
                    <Layers size={18} className="text-black/30" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1215] mb-2">{mg.title}</h3>
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <span className="font-semibold text-black/85 block">Feedstock Source:</span>
                      <p className="text-black/60">{mg.source}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-black/85 block">Primary Applications:</span>
                      <p className="text-black/60">{mg.bestUsedFor}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E5E5E5]">
                      <span className="font-semibold text-black/85 block">Food Contact Status:</span>
                      <p className="text-black/60">{mg.foodContactStatus}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5E5] text-[11px] text-black/70">
                  <strong className="text-black/90">Environmental Benefit: </strong>
                  {mg.environmentalBenefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: HOW WE PRODUCE (CIRCULAR OPERATIONS) ──────── */}
      <section className="py-20 bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#108E2B] block mb-2">
              Factory Systems
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215]">
              How We Produce in Kitengela
            </h2>
            <p className="text-black/60 text-sm mt-2 leading-relaxed">
              Operational processes running inside our plant from day one of production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {MANUFACTURING_PRACTICES.map((mp, i) => (
              <div
                key={mp.title}
                className="p-7 rounded-3xl border border-[#E5E5E5] bg-white space-y-3 shadow-xs"
              >
                <div className="w-9 h-9 rounded-2xl bg-[#108E2B]/10 text-[#108E2B] flex items-center justify-center font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-base text-[#0B1215]">{mp.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed">{mp.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: DATED COMMITMENTS & REPORTING ROADMAP ─────── */}
      <section className="py-20 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#004C97] block mb-2">
              Clear Roadmap
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215]">
              Our Commitments &amp; What We Will Report
            </h2>
            <p className="text-black/60 text-sm mt-2 leading-relaxed">
              Rather than presenting unverified claims on launch day, we commit to concrete dated milestones and publish transparent metrics as production scales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DATED_COMMITMENTS.map((c) => (
              <div
                key={c.title}
                className="p-6 rounded-3xl border border-[#E5E5E5] bg-[#FAFAF8] space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#004C97]/10 text-[#004C97] mb-3">
                    {c.year}
                  </span>
                  <h4 className="font-bold text-sm text-[#0B1215] mb-2">{c.title}</h4>
                  <p className="text-xs text-black/60 leading-relaxed">{c.target}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics that will be reported */}
          <div className="mt-12 p-8 rounded-3xl bg-[#0B1215] text-white">
            <h4 className="text-lg font-bold text-white mb-2">
              Metrics Published in Our First Impact Report
            </h4>
            <p className="text-xs text-white/60 mb-6 max-w-xl leading-relaxed">
              Our inaugural annual report will be published after 12 months of operations with measured figures across these four core operational indicators:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1">Recycled Tonnage</p>
                <p className="text-white/50">Total metric tonnes of reprocessed polymer consumed</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1">% Recycled per Line</p>
                <p className="text-white/50">Measured feedstock percentages for each product category</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1">Scrap Recovery Rate</p>
                <p className="text-white/50">Percentage of in-house trimmings granulating back into utility runs</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="font-bold text-white mb-1">Energy per Kilogram</p>
                <p className="text-white/50">Kilowatt-hours consumed per kilogram of finished polymer output</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: BUYER FAQ ─────────────────────────────────── */}
      <section className="py-20 bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#108E2B] block mb-2">
              Procurement Questions
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215]">
              Buyer Sustainability FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {BUYER_FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0B1215]"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-black/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-black/65 leading-relaxed border-t border-[#F0F0EE]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: SUPPLIER SUSTAINABILITY STATEMENT (B2B DOCUMENT) ── */}
      <section id="statement" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#108E2B]/10 text-[#108E2B] flex items-center justify-center mx-auto mb-4">
            <FileText size={28} />
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215] mb-3">
            Supplier Sustainability Statement
          </h2>
          <p className="text-sm text-black/60 leading-relaxed mb-8 max-w-xl mx-auto">
            A comprehensive, one-page declaration covering our raw materials policy, grade allocations, circular scrap systems, and compliance roadmap for enterprise procurement questionnaires.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setShowStatementModal(true)}
              className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white font-semibold rounded-full h-12 px-7 text-sm border-0"
            >
              View Supplier Statement
            </Button>
            <Link href="/contact?type=statement">
              <Button
                variant="outline"
                className="rounded-full h-12 px-7 text-sm font-semibold border-black/20"
              >
                Request Procurement Documents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATEMENT MODAL / VIEW ───────────────────────────────── */}
      {showStatementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 md:p-10 max-h-[90vh] overflow-y-auto border border-[#E5E5E5] space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E5E5E5] pb-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#108E2B] block">
                  Official Procurement Documentation
                </span>
                <h3 className="text-2xl font-bold text-[#0B1215] mt-1">
                  {SUPPLIER_SUSTAINABILITY_STATEMENT.title}
                </h3>
                <p className="text-xs text-black/50 mt-1">
                  {SUPPLIER_SUSTAINABILITY_STATEMENT.entity} · {SUPPLIER_SUSTAINABILITY_STATEMENT.version}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowStatementModal(false)}
                className="text-black/40 hover:text-black font-bold text-lg p-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-black/70 leading-relaxed bg-[#FAFAF8] p-4 rounded-2xl border border-[#E5E5E5]">
              {SUPPLIER_SUSTAINABILITY_STATEMENT.summary}
            </p>

            <div className="space-y-5 text-xs text-black/75 leading-relaxed">
              {SUPPLIER_SUSTAINABILITY_STATEMENT.sections.map((sec) => (
                <div key={sec.heading} className="space-y-1.5">
                  <h4 className="font-bold text-sm text-[#0B1215]">{sec.heading}</h4>
                  <p>{sec.content}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
              <span className="text-[11px] text-black/40">
                Issued by PurePlast Compliance &amp; Operations Desk
              </span>
              <div className="flex gap-3">
                <Button
                  onClick={handlePrintStatement}
                  variant="outline"
                  className="rounded-full text-xs h-10 px-4"
                >
                  <Printer size={14} className="mr-1.5" /> Print Statement
                </Button>
                <Button
                  onClick={() => setShowStatementModal(false)}
                  className="bg-[#0B1215] text-white rounded-full text-xs h-10 px-5"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


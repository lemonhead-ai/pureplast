"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download } from "@geist-ui/icons";
import {
  SUSTAINABILITY_METRICS,
  SUSTAINABILITY_PILLARS,
  ESG_REPORT_PATH,
  isEsgReportAvailable,
} from "@/data/sustainability";
import { ImpactCounter } from "@/components/sustainability/ImpactCounter";
import { SustainabilityPillar } from "@/components/sustainability/SustainabilityPillar";
import { PendingMetricSlot } from "@/components/sustainability/PendingMetricSlot";
import { TrustSection } from "@/components/sustainability/TrustSection";

export default function SustainabilityPage() {
  const esgAvailable = isEsgReportAvailable();

  return (
    <div className="min-h-screen bg-white">
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-[#FAFAF8] border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-6">
              Sustainability
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-[#0B1215] mb-8">
              We manufacture with what already exists.
            </h1>
            <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl mx-auto">
              We are on a journey — not claiming perfection. We are committed to transparent,
              measurable progress in reducing virgin plastic dependency and offsetting our
              manufacturing footprint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT COUNTER ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <ImpactCounter metric={SUSTAINABILITY_METRICS.recycledTonnes} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PendingMetricSlot metric={SUSTAINABILITY_METRICS.recycledFeedstock} />
            <PendingMetricSlot metric={SUSTAINABILITY_METRICS.treesPlanted} />
            <PendingMetricSlot metric={SUSTAINABILITY_METRICS.carbonOffset} />
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 bg-[#FAFAF8] border-y border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SUSTAINABILITY_PILLARS.map((pillar) => (
              <SustainabilityPillar
                key={pillar.id}
                title={pillar.title}
                description={pillar.description}
              >
                {pillar.id === "recycled-materials" && (
                  <PendingMetricSlot metric={SUSTAINABILITY_METRICS.recycledFeedstock} />
                )}
                {pillar.id === "carbon-offset" && (
                  <div className="p-6 rounded-3xl bg-black/[0.03] border border-black/5 text-sm text-black/60">
                    <p className="font-semibold text-black/80 mb-2">
                      Programme details being documented
                    </p>
                    <p>
                      Location, species, quantity planted, and verification body for our tree
                      planting initiative will be published here once fully established.
                    </p>
                  </div>
                )}
                {pillar.id === "manufacturing-practices" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#108E2B]" />
                      <span className="text-sm font-semibold text-black/60">
                        Closed-loop scrap recycling in operation
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
                      <span className="text-sm font-semibold text-black/60">
                        ISO 14001 certification in progress
                      </span>
                    </div>
                  </div>
                )}
              </SustainabilityPillar>
            ))}
          </div>
        </div>
      </section>

      {/* ── B2B DOWNLOAD BLOCK ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#108E2B]/10 text-[#108E2B] mb-6">
            <Download size={24} />
          </div>
          <h2 className="text-3xl font-semibold tracking-tighter text-[#0B1215] mb-4">
            ESG & Sustainability Data
          </h2>
          <p className="text-black/60 leading-relaxed mb-8">
            Documentation of our environmental impact, sourcing policies, and compliance
            standards for procurement teams.
          </p>

          <div className="flex flex-col items-center gap-4">
            {esgAvailable ? (
              <a href={ESG_REPORT_PATH} download>
                <Button
                  size="lg"
                  className="h-14 px-8 text-base rounded-full bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0"
                >
                  Download ESG Data Sheet (PDF)
                </Button>
              </a>
            ) : (
              <>
                <Button
                  size="lg"
                  disabled
                  className="h-14 px-8 text-base rounded-full bg-black/5 text-black/40 border-0 opacity-100 cursor-not-allowed"
                >
                  Download ESG Data Sheet (PDF)
                </Button>
                <p className="text-sm text-black/40">
                  Report in preparation — please{" "}
                  <Link href="/contact?subject=esg" className="text-[#004C97] hover:underline">
                    contact us
                  </Link>{" "}
                  for procurement enquiries.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0B1215] text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-semibold tracking-tighter text-white mb-6">
            Partner with us for sustainable manufacturing
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            Need supplier environmental credentials for your procurement documentation? Our team
            can provide verified data and product-level sustainability attributes.
          </p>
          <Link href="/contact">
            <Button className="bg-[#108E2B] hover:bg-[#108E2B]/90 text-white border-0 rounded-full h-14 px-8 text-lg mt-4">
              Discuss Your Requirements <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

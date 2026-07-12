"use client";

import { motion } from "framer-motion";
import {
  VERIFIED_CERTIFICATIONS,
  TARGET_CERTIFICATIONS,
  CLIENT_LOGOS,
} from "@/data/sustainability";

interface TrustSectionProps {
  variant?: "light" | "dark";
}

export function TrustSection({ variant = "light" }: TrustSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-16 md:py-20 ${isDark ? "bg-[#0B1215]" : "bg-white border-t border-[#E5E5E5]"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p
            className={`text-xs font-semibold tracking-[0.15em] uppercase mb-3 ${isDark ? "text-[#108E2B]" : "text-[#108E2B]"}`}
          >
            B2B Trust
          </p>
          <h2
            className={`text-2xl md:text-3xl font-semibold tracking-tighter ${isDark ? "text-white" : "text-[#0B1215]"}`}
          >
            Standards & compliance
          </h2>
        </motion.div>

        <div className="mb-12">
          <p
            className={`text-xs font-bold tracking-[0.15em] uppercase mb-4 text-center ${isDark ? "text-white/40" : "text-black/40"}`}
          >
            Verified today
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VERIFIED_CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-6 rounded-2xl border text-center ${
                  isDark
                    ? "border-[#108E2B]/30 bg-[#108E2B]/10"
                    : "border-[#108E2B]/30 bg-[#108E2B]/5"
                }`}
              >
                <p className={`font-bold text-base mb-2 ${isDark ? "text-[#108E2B]" : "text-[#108E2B]"}`}>
                  {cert.label}
                </p>
                <p className={`text-sm ${isDark ? "text-white/50" : "text-black/40"}`}>{cert.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <p
            className={`text-xs font-bold tracking-[0.15em] uppercase mb-4 text-center ${isDark ? "text-white/40" : "text-black/40"}`}
          >
            Near-term goals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {TARGET_CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-5 rounded-2xl border text-center ${
                  isDark ? "border-white/10 bg-white/5" : "border-[#E5E5E5] bg-[#FAFAF8]"
                }`}
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E67E22]/10 text-[#E67E22] mb-2">
                  {cert.status === "target" ? "Target" : "In progress"}
                </span>
                <p className={`font-bold text-base mb-1 ${isDark ? "text-white" : "text-[#0B1215]"}`}>
                  {cert.label}
                </p>
                <p className={`text-sm ${isDark ? "text-white/45" : "text-black/40"}`}>{cert.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p
            className={`text-xs font-bold tracking-[0.15em] uppercase mb-4 ${isDark ? "text-white/40" : "text-black/40"}`}
          >
            Client partnerships
          </p>
          {CLIENT_LOGOS.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-8">
              {CLIENT_LOGOS.map((logo) => (
                <img key={logo.name} src={logo.imageUrl} alt={logo.name} className="h-8 opacity-60" />
              ))}
            </div>
          ) : (
            <p className={`text-sm ${isDark ? "text-white/45" : "text-black/45"}`}>
              Client partnerships available on request
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { type ImpactMetric } from "@/data/sustainability";
import { motion } from "framer-motion";

interface ImpactCounterProps {
  metric: ImpactMetric;
}

export function ImpactCounter({ metric }: ImpactCounterProps) {
  if (metric.status !== "verified" || !metric.value) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-10 rounded-3xl bg-[#108E2B] text-white overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />
      
      <div className="relative z-10 text-center">
        <div className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
          {metric.value}
        </div>
        <div className="text-xl md:text-2xl font-medium text-white/90">
          {metric.label} {metric.unit && <span className="opacity-70">({metric.unit})</span>}
        </div>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Verified Metric
        </div>
      </div>
    </motion.div>
  );
}

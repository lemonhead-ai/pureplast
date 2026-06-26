import React from "react";
import { type ImpactMetric } from "@/data/sustainability";

interface PendingMetricSlotProps {
  metric: ImpactMetric;
}

export function PendingMetricSlot({ metric }: PendingMetricSlotProps) {
  if (metric.status === "verified") return null;

  return (
    <div className="flex flex-col p-6 rounded-3xl bg-black/[0.03] border border-black/5">
      <h3 className="text-sm font-semibold text-black/60 mb-2">{metric.label}</h3>
      <div className="flex items-center gap-2 mt-auto pt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <span className="text-xs font-medium text-black/40 uppercase tracking-wider">
          Data pending verification
        </span>
      </div>
    </div>
  );
}

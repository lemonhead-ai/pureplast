import React from "react";
import { Leaf } from "@geist-ui/icons";

interface SustainabilityBadgeProps {
  label: string;
  className?: string;
  icon?: boolean;
}

export function SustainabilityBadge({ label, className = "", icon = true }: SustainabilityBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#108E2B]/10 border border-[#108E2B]/20 text-xs font-semibold text-[#108E2B] ${className}`}
    >
      {icon && <Leaf size={14} />}
      {label}
    </div>
  );
}

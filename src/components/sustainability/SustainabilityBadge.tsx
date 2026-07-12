import React from "react";

interface SustainabilityBadgeProps {
  label: string;
  className?: string;
  icon?: boolean;
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

export function SustainabilityBadge({ label, className = "", icon = true }: SustainabilityBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#108E2B]/10 border border-[#108E2B]/20 text-xs font-semibold text-[#108E2B] ${className}`}
    >
      {icon && <LeafIcon />}
      {label}
    </div>
  );
}

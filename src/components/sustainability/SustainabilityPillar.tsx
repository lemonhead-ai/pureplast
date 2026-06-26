import React from "react";

interface SustainabilityPillarProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function SustainabilityPillar({ title, description, children }: SustainabilityPillarProps) {
  return (
    <div className="flex flex-col h-full p-8 rounded-3xl bg-white border border-[#E5E5E5]">
      <h3 className="text-2xl font-semibold text-[#0B1215] mb-4">{title}</h3>
      <p className="text-black/60 leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      {children && (
        <div className="mt-auto pt-6 border-t border-[#E5E5E5]">
          {children}
        </div>
      )}
    </div>
  );
}

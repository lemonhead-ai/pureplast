import type { Metadata } from "next";
import SustainabilityClient from "./SustainabilityClient";

export const metadata: Metadata = {
  title: "Sustainability & Materials Policy | PurePlast Kenya",
  description:
    "PurePlast produces two of its three material grades (GR2 and GR3) from recycled polymer. Learn about our polymer grade definitions, closed-loop regrind systems, and Supplier Sustainability Statement.",
};

export default function SustainabilityPage() {
  return <SustainabilityClient />;
}

import type { Metadata } from "next";
import ThreeDClient from "./ThreeDClient";

export const metadata: Metadata = {
  title: "Precision 3D Printing & Prototyping Nairobi | PurePlast",
  description:
    "Fast-turnaround industrial 3D printing and additive prototyping in Nairobi and Kitengela. Print from STEP, STL, and OBJ in PLA+, PETG, ABS, TPU, and SLA resin. Delivered from 48 hours.",
};

export default function ThreeDPage() {
  return <ThreeDClient />;
}

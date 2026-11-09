import type { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Work With Us | OEM & Distribution Partnerships | PurePlast",
  description:
    "Partner with PurePlast Industries Ltd in Kitengela, Kenya. We offer OEM contract manufacturing with exclusive tooling ownership, and regional wholesale distribution across East Africa.",
};

export default function PartnersPage() {
  return <PartnersClient />;
}

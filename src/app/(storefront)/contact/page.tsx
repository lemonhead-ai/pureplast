import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | PurePlast Factory Kitengela",
  description:
    "Contact PurePlast Industries Ltd for wholesale plastic product orders, custom injection-moulding quotes, tooling consultations, or supplier partnerships in Kitengela, Kenya.",
};

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactClient />
    </Suspense>
  );
}

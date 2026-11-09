import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | PurePlast Manufacturing Kitengela",
  description:
    "PurePlast Industries Ltd is a precision plastic injection moulding manufacturer located in Kitengela, Kenya. We manufacture durable consumer homewares and custom industrial components.",
};

export default function AboutPage() {
  return <AboutClient />;
}

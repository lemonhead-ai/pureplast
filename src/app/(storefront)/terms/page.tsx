"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LAST_UPDATED = "May 2025";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the PurePlast website (pureplast.co.ke), submitting an enquiry, or entering into a purchase or supply agreement with PurePlast Limited, you agree to be bound by these Terms of Service.

If you do not agree to these terms, please do not use this website or our services.`,
  },
  {
    title: "2. Business-to-Business Services",
    content: `PurePlast supplies products and manufacturing services primarily to businesses, wholesalers, retailers, and commercial organisations. By submitting an order or enquiry, you confirm that you are acting in a business capacity.

Standard products are supplied in minimum bundle quantities as specified at the time of quotation. We reserve the right to decline orders that do not meet minimum volume requirements.`,
  },
  {
    title: "3. Quotations & Orders",
    content: `All quotations provided by PurePlast are valid for 30 days from the date of issue, unless otherwise stated.

An order is only accepted and binding when PurePlast issues a written order confirmation. Verbal or informal agreements are not binding.

Prices are quoted exclusive of VAT and delivery charges unless explicitly stated otherwise. Prices are subject to change without notice until an order is confirmed.`,
  },
  {
    title: "4. Custom Engineering & Tooling",
    content: `For custom-engineered components or branded tooling, specific terms will be set out in a separate Manufacturing Partnership Agreement.

Tooling costs, lead times, minimum production run quantities, exclusivity terms, and intellectual property rights in custom moulds will be defined in that agreement.

By default, tooling fabricated by PurePlast remains the property of PurePlast until the tooling cost is fully paid by the client, after which ownership may transfer as agreed in writing.`,
  },
  {
    title: "5. Delivery & Risk",
    content: `Delivery timelines communicated at the time of quotation are estimates only. PurePlast will not be liable for delays caused by factors outside our reasonable control, including raw material shortages, transport disruptions, or force majeure events.

Risk in goods passes to the buyer on delivery. Title in goods passes when full payment is received.`,
  },
  {
    title: "6. Payment Terms",
    content: `Standard payment terms are stated in each quotation or agreement. Unless otherwise agreed in writing, payment is required before goods are dispatched.

For long-term supply agreements, payment schedules will be set out in the relevant contract.

Overdue payments may incur interest at the rate prescribed by Kenyan law.`,
  },
  {
    title: "7. Returns & Defects",
    content: `PurePlast products are manufactured to defined quality standards. If you receive goods that are materially defective or do not match the agreed specification, please notify us in writing within 7 days of delivery.

We will investigate and, where a valid defect is confirmed, offer a replacement, credit, or refund at our discretion.

Returns for reasons other than defects require prior written approval from PurePlast.`,
  },
  {
    title: "8. Intellectual Property",
    content: `All content on this website — including text, images, product descriptions, and design — is the property of PurePlast Limited and protected by applicable copyright and intellectual property law.

You may not reproduce, distribute, or use our content without prior written permission.

For custom-engineered products, any designs, CAD files, or drawings submitted by the client remain the intellectual property of the client. PurePlast will not share or use client designs for any other purpose without written consent.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by Kenyan law, PurePlast's total liability in connection with any product or service shall not exceed the amount paid by the client for the specific goods or services giving rise to the claim.

PurePlast shall not be liable for indirect, consequential, or special losses, including loss of profit, loss of business, or loss of data.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms of Service are governed by the laws of Kenya. Any disputes arising from these terms or our services will be subject to the exclusive jurisdiction of the Kenyan courts.`,
  },
  {
    title: "11. Changes to These Terms",
    content: `We may update these Terms of Service from time to time. Continued use of our website or services after changes are posted constitutes acceptance of the updated terms.`,
  },
  {
    title: "12. Contact",
    content: `For questions about these terms, please contact:

PurePlast Limited
Kenya Prisons Road, Kitengela, Kajiado County, Kenya
Phone: +254 710 678 753
Email: info@pureplast.co.ke`,
  },
];

export default function Terms() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#004C97]" />
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#004C97]">
                Legal
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-4">
              Terms of Service
            </h1>
            <p className="text-base text-black/45">Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#E5E5E5] p-8 md:p-12"
        >
          <p className="text-base text-black/60 leading-relaxed mb-10 pb-10 border-b border-[#E5E5E5]">
            These Terms of Service govern your use of the PurePlast website and
            your business relationship with{" "}
            <strong className="text-[#0B1215]">PurePlast Limited</strong>,
            a plastic manufacturing company registered and operating in Kenya.
            Please read them carefully before placing an order or entering into
            a supply agreement.
          </p>

          <div className="space-y-10">
            {SECTIONS.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="pb-10 border-b border-[#E5E5E5] last:border-0 last:pb-0"
              >
                <h2 className="text-lg font-bold text-[#0B1215] mb-4">
                  {section.title}
                </h2>
                <p className="text-base text-black/60 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <Link href="/privacy" className="text-base text-[#004C97] hover:underline font-medium">
            ← Privacy Policy
          </Link>
          <span className="text-black/20">|</span>
          <Link href="/" className="text-base text-[#004C97] hover:underline font-medium">
            Back to Home →
          </Link>
        </div>
      </div>
    </div>
  );
}

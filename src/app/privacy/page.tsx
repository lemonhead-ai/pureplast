"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LAST_UPDATED = "May 2025";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `When you submit an enquiry, quote request, or contact form on this website, we collect personal information you voluntarily provide, including:

• Your name, company name, and job title
• Email address and phone number
• Details of your enquiry (product requirements, volumes, timelines)
• Any attachments you choose to upload (e.g. STL files, design drawings)

We do not collect payment card information through this website.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information you provide solely to:

• Respond to your product, engineering, or partnership enquiry
• Prepare and send quotes and proposals
• Fulfil orders and manage supply agreements
• Communicate updates relevant to your enquiry or order
• Comply with applicable Kenyan law and regulatory requirements

We do not use your information for unsolicited marketing without your consent.`,
  },
  {
    title: "3. Sharing Your Information",
    content: `PurePlast does not sell, rent, or trade your personal information to third parties.

We may share information with trusted service providers who assist us in operating this website or conducting our business (for example, email delivery services), subject to strict confidentiality agreements.

We may disclose information where required by Kenyan law or valid legal process.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law.

For enquiries that do not result in a business relationship, we typically retain contact information for up to 24 months.

For active client and partner relationships, we retain relevant records for the duration of the relationship and for a reasonable period thereafter for legal and accounting purposes.`,
  },
  {
    title: "5. Cookies & Website Analytics",
    content: `This website may use standard browser cookies to improve user experience (for example, remembering your preferences).

We may use basic website analytics to understand traffic patterns and improve site performance. Analytics data is aggregated and does not identify individual users.

You can disable cookies through your browser settings; this may affect some site functionality.`,
  },
  {
    title: "6. Security",
    content: `We take reasonable technical and organisational measures to protect your personal information from unauthorised access, disclosure, or loss.

However, no internet transmission is completely secure. While we take all reasonable steps to protect your data, we cannot guarantee absolute security of information transmitted to or from this website.`,
  },
  {
    title: "7. Your Rights",
    content: `Under applicable Kenyan law and in line with good practice, you have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information, subject to our legal obligations
• Withdraw consent for marketing communications at any time

To exercise any of these rights, contact us at the details below.`,
  },
  {
    title: "8. Third-Party Links",
    content: `This website may contain links to third-party websites (for example, Google Maps for our location). We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. Continued use of this website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `If you have questions about this Privacy Policy or how we handle your personal information, please contact us:

PurePlast Limited
Kenya Prisons Road, Kitengela, Kajiado County, Kenya
Phone: +254 710 678 753
Email: info@pureplast.co.ke`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#108E2B]" />
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#108E2B]">
                Legal
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-4">
              Privacy Policy
            </h1>
            <p className="text-base text-black/45">Last updated: {LAST_UPDATED}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#E5E5E5] p-8 md:p-12"
        >
          <p className="text-base text-black/60 leading-relaxed mb-10 pb-10 border-b border-[#E5E5E5]">
            PurePlast Limited (&ldquo;PurePlast&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
            &ldquo;us&rdquo;) is committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and protect information
            you provide when you use our website at{" "}
            <strong className="text-[#0B1215]">pureplast.co.ke</strong> or
            contact us about our products and services.
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

        {/* Back link */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <Link href="/" className="text-base text-[#004C97] hover:underline font-medium">
            ← Back to Home
          </Link>
          <span className="text-black/20">|</span>
          <Link href="/terms" className="text-base text-[#004C97] hover:underline font-medium">
            Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}

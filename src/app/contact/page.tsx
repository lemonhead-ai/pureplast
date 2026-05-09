"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const CONTACT_DETAILS = [
  {
    label: "Address",
    value: "Kenya Prisons Road, Kitengela, Kajiado County, Kenya",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+254 710 678 753",
    href: "tel:+254710678753",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 10.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Sales",
    value: "sales@pureplast.co.ke",
    href: "mailto:sales@pureplast.co.ke",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "Support",
    value: "support@pureplast.co.ke",
    href: "mailto:support@pureplast.co.ke",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

// Kitengela, Kenya Prisons Road — lat: -1.4770626, lng: 36.9454802
const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=-1.4770626,36.9454802&t=&z=16&ie=UTF8&iwloc=&output=embed";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=-1.4770626,36.9454802";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-lg font-regular tracking-[0.15em] uppercase text-[#004C97] mb-3">
              Get in Touch
            </p>
            <h1 className="text-5xl font-semibold tracking-tighter text-[#132126] mb-3">
              Contact Us
            </h1>
            <p className="text-lg text-black/50 max-w-xl leading-relaxed">
              Questions about our products, custom engineering quotes, or distribution partnerships — we're here to help.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Form + Info grid ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── Form (3 cols) ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-white rounded-3xl border border-[#E5E5E5] p-8 md:p-10"
          >
            <h2 className="text-xl font-semibold text-[#0B1215] mb-1">Send a message</h2>
            <p className="text-sm text-black/40 mb-8">
              We typically respond within one business day.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#108E2B]/10 flex items-center justify-center text-[#108E2B]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1215]">Message sent!</h3>
                  <p className="text-sm text-black/50 mt-1">
                    We&apos;ll get back to you within one business day.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#004C97] underline mt-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                      First Name
                    </label>
                    <Input placeholder="Martin" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                      Last Name
                    </label>
                    <Input placeholder="Mwai" required />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                    Email Address
                  </label>
                  <Input type="email" placeholder="martin@company.com" required />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                    Company / Organisation
                  </label>
                  <Input placeholder="Company Name" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                    Subject
                  </label>
                  <select className="flex h-10 w-full rounded-3xl border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#0B1215] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 transition-all">
                    <option value="">Select a subject…</option>
                    <option value="product">Product Enquiry</option>
                    <option value="quote">Custom Engineering Quote</option>
                    <option value="distribution">Distribution / Partnership</option>
                    <option value="support">After-Sales Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50">
                    Message
                  </label>
                  <textarea
                    required
                    placeholder="How can we help you?"
                    className="flex w-full rounded-3xl border border-[#E5E5E5] bg-white px-4 py-3 text-sm placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 disabled:opacity-50 min-h-[140px] resize-none transition-all"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0 rounded-full h-12"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending…
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* ── Info panel (2 cols) ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact details */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-7">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-black/30 mb-5">
                Contact Details
              </h3>
              <div className="space-y-5">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-2xl bg-[#004C97]/8 text-[#004C97] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-[#0B1215] hover:text-[#004C97] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#0B1215] leading-snug">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-7">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black/30 mb-5">
                Business Hours
              </h3>
              <div className="space-y-3">
                {BUSINESS_HOURS.map((row) => (
                  <div key={row.day} className="flex items-center justify-between">
                    <span className="text-sm text-black/60">{row.day}</span>
                    <span
                      className={`text-sm font-semibold ${
                        row.hours === "Closed" ? "text-red-400" : "text-[#0B1215]"
                      }`}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote tip */}
            <div className="p-6 bg-[#004C97]/6 border border-[#004C97]/15 rounded-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#108E2B]" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#004C97]">
                  Faster Quotes
                </h4>
              </div>
              <p className="text-sm text-black/60 leading-relaxed">
                For custom engineered parts, use the{" "}
                <strong className="text-[#0B1215]">Quote List</strong> feature
                in the product catalog. Our engineering team reviews quote lists
                within 24 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Map section ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pb-20"
      >
        <div className="rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-sm">
          {/* Map header bar */}
          <div className="bg-white px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#004C97]/8 text-[#004C97] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-md text-[#0B1215]">PurePlast Factory</p>
                <p className="text-xs text-black/45">Kenya Prisons Road, Kitengela, Kajiado County</p>
              </div>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#004C97] hover:bg-[#004C97]/90 text-white text-xs font-bold rounded-full transition-colors flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path d="M3 12l18-9-9 18-2-8-7-1z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Get Directions
            </a>
          </div>

          {/* Iframe map */}
          <div className="relative w-full h-[420px] bg-[#F5F5F2]">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PurePlast Factory Location — Kitengela, Kenya Prisons Road"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
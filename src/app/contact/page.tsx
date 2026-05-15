"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// ─── Config — swap these when backend is live ──────────────────────────────────
const CONTACT_EMAIL = "martinmwai901@gmail.com"; // TODO: Replace with sales@pureplast.co.ke when live

// ─── Static data ──────────────────────────────────────────────────────────────

const CONTACT_DETAILS = [
  {
    label: "",
    value: "Kenya Prisons Road, Kitengela, Kajiado County, Kenya",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "",
    value: "+254 710 678 753",
    href: "tel:+254710678753",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.89 10.6a19.79 19.79 0 01-3.07-8.67A2 2 0 012.81 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "",
    value: "sales@pureplast.co.ke",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "",
    value: "support@pureplast.co.ke",
    href: `mailto:${CONTACT_EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=-1.4770626,36.9454802&t=&z=16&ie=UTF8&iwloc=&output=embed";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=-1.4770626,36.9454802";

const ENQUIRY_TYPES = [
  {
    id: "bulk-order",
    label: "Bulk Product Order",
    color: "#004C97",
  },
  {
    id: "custom-engineering",
    label: "Custom Engineering / OEM",
    color: "#0B1215",
  },
  {
    id: "3d-printing",
    label: "3D Printing Service",
    color: "#E67E22",
  },
  {
    id: "partnership",
    label: "Distribution Partnership",
    color: "#108E2B",
  },
  {
    id: "support",
    label: "After-Sales Support",
    color: "#8E44AD",
  },
  {
    id: "other",
    label: "Other",
    color: "#666",
  },
];

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName   = data.get("firstName") as string;
    const lastName    = data.get("lastName") as string;
    const email       = data.get("email") as string;
    const phone       = data.get("phone") as string;
    const company     = data.get("company") as string;
    const enquiryType = data.get("enquiryType") as string;
    const message     = data.get("message") as string;

    const subject = `[PurePlast] ${enquiryType || "General Enquiry"} — ${company || `${firstName} ${lastName}`}`;
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Enquiry Type: ${enquiryType}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    // TODO: Replace with fetch call to /api/contact when backend is live
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center gap-5"
      >
        <div className="w-16 h-16 rounded-full bg-[#108E2B]/10 flex items-center justify-center text-[#108E2B]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0B1215]">Message sent!</h3>
          <p className="text-base text-black/50 mt-2 leading-relaxed">
            Your email client should have opened with the message pre-filled.<br />
            We&apos;ll get back to you within one business day.
          </p>
        </div>
        <button onClick={() => setSubmitted(false)} className="text-sm text-[#004C97] underline mt-2">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>

      {/* Enquiry type selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-red-600 block">
         Just click onto how we help you! *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ENQUIRY_TYPES.map((type) => (
            <label
              key={type.id}
              className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedType === type.label
                  ? "border-[#004C97] bg-[#004C97]/5"
                  : "border-[#E5E5E5] hover:border-[#004C97]/40"
              }`}
            >
              <input
                type="radio"
                name="enquiryType"
                value={type.label}
                className="sr-only"
                required
                onChange={() => setSelectedType(type.label)}
              />
              <div
                className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ background: selectedType === type.label ? type.color : "#ccc" }}
              />
              <div>
                <p className="text-sm font-semibold text-[#0B1215]">{type.label}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">First Name *</label>
          <Input name="firstName" placeholder="Martin" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Last Name *</label>
          <Input name="lastName" placeholder="Mwai" required />
        </div>
      </div>

      {/* Email + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Email Address *</label>
          <Input name="email" type="email" placeholder="martin@company.co.ke" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Phone / WhatsApp</label>
          <Input name="phone" type="tel" placeholder="+254 7XX XXX XXX" />
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Company / Organisation</label>
        <Input name="company" placeholder="Company Name (if applicable)" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-semibold uppercase tracking-wider text-black/50 block">Message *</label>
        <textarea
          name="message"
          required
          placeholder="Describe what you need — product type, quantities, timeline, or any specific requirements…"
          className="flex w-full rounded-3xl border border-[#E5E5E5] bg-white px-5 py-4 text-base placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 min-h-[160px] resize-none transition-all"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0 rounded-full h-14 text-base"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-md font-regular tracking-[0.15em] uppercase text-[#108E2B]">
                Get in Touch
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-2">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-black/50 max-w-xl leading-relaxed">
              Bulk orders, custom engineering quotes, distribution enquiries, or
              manufacturing partnerships — we&apos;ll get back to you within one business day.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── FORM + INFO ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 bg-white rounded-3xl border border-[#E5E5E5] p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-[#0B1215] mb-1">Get In Touch</h2>
            <p className="text-base text-black/40 mb-4">Minimum order quantities apply for standard products.
            </p>
            <ContactForm />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Contact details */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-7">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-black/30 mb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-2xl bg-[#004C97]/8 text-[#004C97] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-black/35 mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="text-base font-medium text-[#0B1215] hover:text-[#004C97] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-base font-medium text-[#0B1215] leading-snug">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-7">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black/30 mb-6">
                Business Hours
              </h3>
              <div className="space-y-4">
                {BUSINESS_HOURS.map((row) => (
                  <div key={row.day} className="flex items-center justify-between">
                    <span className="text-base text-black/60">{row.day}</span>
                    <span className={`text-base font-semibold ${row.hours === "Closed" ? "text-red-400" : "text-[#108E2B]"}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimum order note */}
            <div className="p-6 bg-[#004C97]/6 border border-[#004C97]/15 rounded-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#004C97]" />
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#004C97]">
                  Minimum Orders
                </h4>
              </div>
              <p className="text-base text-black/60 leading-relaxed">
                PurePlast supplies businesses and wholesalers.{" "}
                <strong className="text-[#0B1215]">Standard products</strong> are
                sold in bundle quantities (e.g. 120 units per SKU). Custom
                engineered parts require a formal quote and partnership agreement.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAP ─────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pb-20"
      >
        <div className="rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-sm">
          <div className="bg-white px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#108E2B]/10 text-[#108E2B] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-base text-[#0B1215]">PurePlast Factory</p>
                <p className="text-sm text-black/45">Kenya Prisons Road, Kitengela, Kajiado County</p>
              </div>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#108E2B] hover:bg-[#108E2B]/90 text-white text-sm font-bold rounded-full transition-colors flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M3 12l18-9-9 18-2-8-7-1z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Get Directions
            </a>
          </div>
          <div className="relative w-full h-[420px] bg-[#F5F5F2]">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PurePlast Factory — Kitengela, Kenya Prisons Road"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
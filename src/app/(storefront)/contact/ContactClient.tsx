"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/site";
import { Phone, CheckCircle, Upload, MessageCircle, AlertCircle } from "@geist-ui/icons";

interface EnquiryOption {
  id: string;
  label: string;
  color: string;
}

const ENQUIRY_TYPES: EnquiryOption[] = [
  { id: "quote", label: "Quote for a Listed Product", color: "#004C97" },
  { id: "bulk-order", label: "Bulk Wholesale Order", color: "#108E2B" },
  { id: "custom-engineering", label: "Custom Engineering / Mould Tooling", color: "#0B1215" },
  { id: "partnership", label: "Distribution / Commercial Partnership", color: "#8E44AD" },
  { id: "statement", label: "Supplier Sustainability Statement", color: "#108E2B" },
  { id: "support", label: "After-Sales & Technical Support", color: "#555555" },
  { id: "other", label: "Other Enquiry", color: "#777777" },
];

export default function ContactClient() {
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState<string>("Quote for a Listed Product");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  // Read URL query params on mount
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const subjectParam = searchParams.get("subject");
    const productParam = searchParams.get("product");
    const skuParam = searchParams.get("sku");
    const nameParam = searchParams.get("name");

    if (typeParam === "custom-engineering" || typeParam === "engineered" || typeParam === "3d" || typeParam === "3d_upload") {
      setSelectedType("Custom Engineering / Mould Tooling");
      if (nameParam) {
        setMessage(`Enquiry regarding custom production for: ${nameParam} (${skuParam || ""}).`);
      } else {
        setMessage("I would like a custom tooling and injection moulding quote. (See attached specifications below).");
      }
    } else if (typeParam === "statement" || subjectParam === "esg") {
      setSelectedType("Supplier Sustainability Statement");
      setMessage("Please provide PurePlast's Supplier Sustainability Statement and materials policy for procurement evaluation.");
    } else if (nameParam || skuParam) {
      setSelectedType("Quote for a Listed Product");
      setMessage(`I would like to request pricing and availability for ${nameParam || "product"} (SKU: ${skuParam || productParam || ""}). Estimated order quantity: `);
    }
  }, [searchParams]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!privacyConsent) {
      alert("Please accept the Data Protection consent to submit your enquiry.");
      return;
    }

    setLoading(true);

    const subject = `[PurePlast Website] ${selectedType} — ${company || `${firstName} ${lastName}`}`;
    const bodyLines = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      `Enquiry Type: ${selectedType}`,
      fileName ? `Attached File: ${fileName}` : "",
      ``,
      `Message:`,
      message,
    ].filter(Boolean);

    const mailtoUrl = `mailto:${SITE_CONFIG.contact.emails.sales}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    // Open user's email client with pre-filled content
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-2">
              Factory &amp; Sales Desk
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-3">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-xl leading-relaxed">
              Wholesale orders, custom injection-moulding quotes, or distribution agreements — we respond within {SITE_CONFIG.standards.quoteTurnaround}.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Form & Info Grid ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left Form (3 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white rounded-3xl border border-[#E5E5E5] p-7 md:p-10 shadow-xs"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#108E2B]/10 flex items-center justify-center text-[#108E2B]">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-[#0B1215]">Enquiry Prepared!</h3>
                <p className="text-sm text-black/60 max-w-md leading-relaxed">
                  Your email client has been opened with your pre-formatted enquiry to <strong>{SITE_CONFIG.contact.emails.sales}</strong>.
                  Our Kitengela sales team will review and reply within {SITE_CONFIG.standards.quoteTurnaround}.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="rounded-full mt-4"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0B1215] block">
                    How can we help? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ENQUIRY_TYPES.map((type) => {
                      const isSelected = selectedType === type.label || selectedType === type.id;
                      return (
                        <label
                          key={type.id}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#004C97] bg-[#004C97]/5 text-[#004C97] font-semibold"
                              : "border-[#E5E5E5] hover:border-black/20 text-[#0B1215]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="enquiryType"
                            value={type.label}
                            checked={isSelected}
                            onChange={() => setSelectedType(type.label)}
                            className="sr-only"
                          />
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: isSelected ? type.color : "#ccc" }}
                          />
                          <span className="text-xs leading-tight">{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                      First Name *
                    </label>
                    <Input
                      name="firstName"
                      placeholder="e.g. John"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                      Last Name *
                    </label>
                    <Input
                      name="lastName"
                      placeholder="e.g. Kamau"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                      Business Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@company.co.ke"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                      Phone / WhatsApp
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                    Company / Organisation (if applicable)
                  </label>
                  <Input
                    name="company"
                    placeholder="Company or Trading Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                    Message / Specifications *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your requirements: product SKU, expected volumes, required material grades, delivery destination, or tooling timeline…"
                    className="w-full rounded-2xl border border-[#E5E5E5] bg-white p-4 text-sm text-[#0B1215] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 focus:border-[#004C97]/50 resize-none transition-all"
                  />
                </div>

                {/* File Upload (Optional for Custom Engineering) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                    Attach CAD / Spec Sheet (Optional)
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-dashed border-[#E5E5E5] bg-[#FAFAF8] hover:bg-black/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center text-black/60">
                        <Upload size={16} />
                      </div>
                      <span className="text-xs text-black/60">
                        {fileName ? fileName : "Upload STEP, STL, OBJ, 3MF, PDF, or drawing file"}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#004C97] underline">
                      {fileName ? "Change" : "Browse"}
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".stl,.obj,.3mf,.step,.stp,.iges,.igs,.pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <p className="text-[11px] text-black/40">
                    Maximum 25MB. Technical files are treated under strict NDA confidentiality.
                  </p>
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-[#004C97] focus:ring-[#004C97]"
                    />
                    <span className="text-xs text-black/60 leading-relaxed">
                      I consent to PurePlast processing my contact details in accordance with Kenya&apos;s Data Protection Act for the purpose of fulfilling this enquiry.
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white font-semibold border-0 rounded-full h-13 text-base shadow-xs"
                >
                  {loading ? "Preparing message…" : "Send Enquiry"}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Right Info Panel (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Direct WhatsApp Callout */}
            <div className="bg-[#108E2B]/10 border border-[#108E2B]/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#108E2B] text-white flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0B1215]">Need an immediate answer?</h3>
                  <p className="text-xs text-black/60">Chat directly with our sales desk on WhatsApp</p>
                </div>
              </div>
              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full py-3 text-center bg-[#108E2B] hover:bg-[#108E2B]/90 text-white text-xs font-bold rounded-full transition-colors"
              >
                Open WhatsApp Chat
              </a>
            </div>

            {/* Direct Contact Info */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-black/40">
                Factory &amp; Sales Contacts
              </h3>
              
              <div className="space-y-3.5 text-sm">
                <div>
                  <span className="text-xs text-black/45 block">General Enquiries</span>
                  <a href={`mailto:${SITE_CONFIG.contact.emails.general}`} className="font-semibold text-[#0B1215] hover:text-[#004C97]">
                    {SITE_CONFIG.contact.emails.general}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-black/45 block">Wholesale &amp; Custom Quotes</span>
                  <a href={`mailto:${SITE_CONFIG.contact.emails.sales}`} className="font-semibold text-[#0B1215] hover:text-[#004C97]">
                    {SITE_CONFIG.contact.emails.sales}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-black/45 block">After-Sales Support</span>
                  <a href={`mailto:${SITE_CONFIG.contact.emails.support}`} className="font-semibold text-[#0B1215] hover:text-[#004C97]">
                    {SITE_CONFIG.contact.emails.support}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-black/45 block">Phone Support</span>
                  <a href={`tel:${SITE_CONFIG.contact.phoneTel}`} className="font-semibold text-[#0B1215] hover:text-[#004C97]">
                    {SITE_CONFIG.contact.phone}
                  </a>
                </div>

                <div>
                  <span className="text-xs text-black/45 block">Physical Factory Location</span>
                  <p className="font-medium text-black/75">
                    {SITE_CONFIG.location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white rounded-3xl border border-[#E5E5E5] p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-3">
                Operating Hours
              </h3>
              <div className="space-y-2 text-xs">
                {SITE_CONFIG.hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-1 border-b border-black/5 last:border-0">
                    <span className="text-black/60">{h.day}</span>
                    <span className={`font-semibold ${h.hours === "Closed" ? "text-red-500" : "text-[#108E2B]"}`}>
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wholesale Minimum Orders Note */}
            <div className="p-6 bg-[#004C97]/5 border border-[#004C97]/15 rounded-3xl space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-[#004C97]" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#004C97]">
                  Wholesale Packaging
                </h4>
              </div>
              <p className="text-xs text-black/70 leading-relaxed">
                Standard catalogue products are dispatched in factory wholesale bundles (ranging from 40 up to 4,320 units per bundle depending on SKU). 
              </p>
              <p className="text-xs text-black/70 leading-relaxed font-semibold">
                Custom-engineered parts are quoted individually based on tooling and production volume.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Factory Location Map Pin ────────────────────────────── */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-[#E5E5E5] bg-white shadow-xs">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E5E5]">
            <div>
              <h3 className="font-bold text-base text-[#0B1215]">PurePlast Factory Gate</h3>
              <p className="text-xs text-black/50">{SITE_CONFIG.location.address}</p>
            </div>
            <a
              href={SITE_CONFIG.location.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#108E2B] hover:bg-[#108E2B]/90 text-white text-xs font-bold rounded-full transition-colors shrink-0"
            >
              Get Directions on Google Maps
            </a>
          </div>
          <div className="w-full h-[380px] bg-[#FAFAF8]">
            <iframe
              src={SITE_CONFIG.location.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="PurePlast Factory Location Kitengela"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Truck, Zap, Cpu } from "@geist-ui/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SITE_CONFIG } from "@/config/site";

const PARTNER_PROGRAMS = [
  {
    title: "OEM Contract Manufacturing",
    body: "Custom-moulded plastic components and proprietary product lines produced exclusively for your brand on multi-year agreements.",
    target: "FMCG brands, consumer goods companies, industrial equipment assemblers",
    terms: "Exclusive proprietary mould ownership & dedicated production allocation",
    color: "#004C97",
    icon: <Cpu size={24} />,
  },
  {
    title: "Regional Distribution Network",
    body: "Wholesale distribution of PurePlast standard product lines (basins, tableware, hangers, pegs) into retail, hardware, and institutional supply chains across Kenya and East Africa.",
    target: "Major wholesalers, supermarket chains, regional distributors",
    terms: "Tiered wholesale price schedules & priority dispatch from Kitengela",
    color: "#108E2B",
    icon: <Truck size={24} />,
  },
];

const ADVANTAGES = [
  {
    title: "No Import Delays on Finished Goods",
    desc: "Eliminate 8–12 week ocean shipping delays and port clearance headaches by procuring directly from our Kitengela factory.",
    icon: <Shield size={18} className="text-[#004C97]" />,
  },
  {
    title: "Exclusive Mould Tooling Ownership",
    desc: "Co-invest in custom tooling designed to your exact dimensions. Your moulds remain your sole legal property.",
    icon: <Cpu size={18} className="text-[#108E2B]" />,
  },
  {
    title: "Direct Factory Pricing",
    desc: "Multi-year commercial supply contracts direct from the manufacturer — avoiding trading middlemen margins.",
    icon: <Zap size={18} className="text-[#E67E22]" />,
  },
  {
    title: "Founding Partner Allocation",
    desc: "Early corporate partners receive guaranteed machine press scheduling, frozen annual price bands, and co-developed tooling.",
    icon: <CheckCircle size={18} className="text-[#8E44AD]" />,
  },
];

export default function PartnersClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("OEM Manufacturing");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const subject = `[Partnership Enquiry] ${type} — ${company} (${name})`;
    const body = [
      `Company: ${company}`,
      `Contact Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Partnership Program: ${type}`,
      ``,
      `Business Requirements:`,
      description,
    ].join("\n");

    const mailtoUrl = `mailto:${SITE_CONFIG.contact.emails.sales}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

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
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#108E2B] mb-2">
              Commercial Collaboration
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-[#0B1215] mb-4">
              Work With Us
            </h1>
            <p className="text-base md:text-lg text-black/60 leading-relaxed max-w-2xl">
              PurePlast builds dedicated manufacturing partnerships with OEM clients and regional distributors across East Africa.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Core Programs: OEM & Distribution ───────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#004C97] block mb-2">
              Partnership Models
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0B1215]">
              How We Partner With Industry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PARTNER_PROGRAMS.map((prog) => (
              <div
                key={prog.title}
                className="p-8 md:p-10 rounded-3xl border border-[#E5E5E5] bg-white space-y-5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                    style={{ background: prog.color }}
                  >
                    {prog.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B1215]">{prog.title}</h3>
                  <p className="text-sm text-black/65 leading-relaxed">{prog.body}</p>
                  
                  <div className="pt-2 text-xs space-y-1.5">
                    <p className="font-semibold text-black/85">Ideal For:</p>
                    <p className="text-black/60">{prog.target}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E5E5]">
                  <span className="text-xs font-bold text-[#004C97] block">
                    {prog.terms}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Supplier Note Line */}
          <div className="mt-8 p-6 rounded-2xl bg-white border border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <p className="text-black/70">
              <strong>Raw Material or Tooling Supplier?</strong> We source prime virgin resins, certified masterbatch pigments, and mould tooling steels.
            </p>
            <Link
              href="/contact?type=partnership"
              className="font-bold text-[#004C97] hover:underline shrink-0"
            >
              Contact Procurement Desk →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Partner Advantages ───────────────────────────────────── */}
      <section className="py-20 bg-[#0B1215] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#60A5FA] block mb-2">
              The PurePlast Advantage
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Why Partner With a Local Manufacturer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  {adv.icon}
                </div>
                <h4 className="font-bold text-base text-white">{adv.title}</h4>
                <p className="text-xs text-white/60 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partnership Enquiry Form ─────────────────────────────── */}
      <section className="py-20 bg-white border-t border-[#E5E5E5]" id="enquire">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#108E2B] block">
                Direct Engagement
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0B1215]">
                Initiate a Partnership Discussion
              </h2>
              <p className="text-sm text-black/65 leading-relaxed">
                Tell us about your distribution reach, product line specifications, or target injection-moulding volumes. Our executive team will schedule a discovery meeting and formal proposal within one business day.
              </p>
              
              <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E5E5E5] space-y-2 text-xs">
                <p className="font-bold text-[#0B1215]">Founding Partner Program</p>
                <p className="text-black/60 leading-relaxed">
                  Enterprise clients onboarding before Q4 2026 receive dedicated machine time allocation and preferential shared-tooling amortization structures.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3 bg-[#FAFAF8] rounded-3xl border border-[#E5E5E5] p-8 md:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#108E2B]/10 text-[#108E2B] flex items-center justify-center mx-auto">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B1215]">Enquiry Received</h3>
                  <p className="text-xs text-black/60 max-w-sm mx-auto leading-relaxed">
                    Your partnership enquiry has been routed to our commercial director at <strong>{SITE_CONFIG.contact.emails.sales}</strong>.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-full text-xs mt-3"
                  >
                    Submit another enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                        Company Name *
                      </label>
                      <Input
                        name="company"
                        placeholder="Company or Trading Name"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                        Contact Person *
                      </label>
                      <Input
                        name="name"
                        placeholder="Your Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                        Business Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="name@company.co.ke"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                        Direct Phone *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                      Partnership Category *
                    </label>
                    <select
                      name="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      className="w-full h-12 rounded-2xl border border-[#E5E5E5] bg-white px-4 text-xs font-semibold text-[#0B1215] focus:outline-none focus:ring-2 focus:ring-[#004C97]/30"
                    >
                      <option value="OEM Manufacturing">OEM Contract Manufacturing</option>
                      <option value="Distribution">Regional Wholesale Distribution</option>
                      <option value="Raw Material Supply">Raw Polymer / Pigment Supply</option>
                      <option value="Tooling Fabrication">Tooling &amp; Mould Fabrication</option>
                      <option value="Other">Other Commercial Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/50 block">
                      Business Overview &amp; Requirements *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Detail your target distribution territory, product lines of interest, projected volumes, or proprietary tooling requirements…"
                      className="w-full rounded-2xl border border-[#E5E5E5] bg-white p-4 text-xs text-[#0B1215] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#004C97]/30 resize-none transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full bg-[#108E2B] hover:bg-[#108E2B]/90 text-white font-semibold rounded-full h-12 text-sm border-0 shadow-xs"
                  >
                    {loading ? "Submitting..." : "Submit Partnership Enquiry"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


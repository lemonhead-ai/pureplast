"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#FAFAF8] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Large 404 */}
          <div className="relative mb-8">
            <span className="text-[160px] md:text-[220px] font-black tracking-tighter text-[#0B1215]/6 leading-none select-none block">
              404
            </span>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#108E2B] animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#108E2B]">
                  Page Not Found
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-[#0B1215] leading-snug px-4">
                This page doesn&apos;t<br />exist in our catalogue.
              </h1>
            </div>
          </div>

          <p className="text-base md:text-lg text-black/50 leading-relaxed mb-10 max-w-md mx-auto">
            You may have followed a broken link or typed the wrong address.
            Let&apos;s get you back to something useful.
          </p>

          {/* Action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                label: "Browse Products",
                sub: "View our full catalogue",
                href: "/products",
                accent: "#004C97",
              },
              {
                label: "Contact Us",
                sub: "Talk to our team",
                href: "/contact",
                accent: "#108E2B",
              },
              {
                label: "About PurePlast",
                sub: "Learn who we are",
                href: "/about",
                accent: "#0B1215",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className="p-5 rounded-2xl border border-[#E5E5E5] bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-left"
                >
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ background: item.accent }}
                  />
                  <p className="font-semibold text-base text-[#0B1215] mb-1">{item.label}</p>
                  <p className="text-sm text-black/45">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#004C97] hover:underline"
          >
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

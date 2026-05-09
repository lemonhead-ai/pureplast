"use client";

import { motion } from "framer-motion";

export default function Partners() {
  const dummyPartners = [1, 2, 3, 4, 5, 6];

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h1 className="text-5xl font-semibold tracking-tighter mb-6">Our Partners</h1>
          <p className="text-lg text-black/70">
            We collaborate with industry leaders to deliver the best plastic materials, new innovations, and distribution channels for our engineered products.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {dummyPartners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square bg-white border border-border rounded-3xl flex items-center justify-center p-6 hover:shadow-lg transition-all"
            >
              <div className="w-full h-full bg-[#E5E5E5] rounded-3xl flex items-center justify-center text-xs text-black/30 font-medium text-center">
                {/* Dummy Partner Logo Placeholder */}
                Partner {partner} Logo
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-32 p-12 bg-[#0B1215] rounded-3xl text-center text-white"
        >
          <h2 className="text-3xl font-semibold tracking-tighter mb-6">Become a Partner</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Are you a supplier, distributor, or technology provider? We are always looking for strategic partnerships to expand our capabilities.
          </p>
          <button className="px-8 py-4 bg-[#108E2B] hover:bg-[#108E2B]/90 text-white rounded-3xl font-medium transition-colors">
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
}

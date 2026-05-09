"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold tracking-tighter mb-8">About PurePlast</h1>
          <p className="text-xl text-black/70 mb-12 leading-relaxed">
            PurePlast is an industrial precision plastic manufacturing company dedicated to producing high-quality household plastics and custom engineered solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="aspect-video bg-[#E5E5E5] rounded-3xl flex items-center justify-center text-black/30 border border-border"
          >
            {/* Dummy About Image Placeholder. Replace with ~1200x800 image of facility/team */}
            <span className="font-medium text-sm">About Image Placeholder (Facility or Team)</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-semibold tracking-tight">Our Vision</h2>
            <p className="text-black/70 leading-relaxed">
              We aim to embody the pinnacle of plastic manufacturing. While we pride ourselves on our core line of everyday products—such as durable mugs, basins, and chairs—we are actively looking to grow our infrastructure to world-class mold manufacturing levels, providing end-to-end solutions for complex, custom-engineered parts.
            </p>
            <div className="pt-6 border-t border-border">
              <h3 className="text-xl font-medium mb-4">Core Values</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#004C97]" />
                  <span>Precision Engineering</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#108E2B]" />
                  <span>Sustainable Solutions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-black" />
                  <span>Continuous Innovation</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShoppingCart, FileText } from "@geist-ui/icons";

const DUMMY_PRODUCTS = [
  { id: '1', name: 'Premium Plastic Mug', price: 4.50, image: '', isEngineered: false },
  { id: '2', name: 'Heavy Duty Wash Basin', price: 12.00, image: '', isEngineered: false },
  { id: '3', name: 'Durable Plastic Chair', price: 25.00, image: '', isEngineered: false },
  { id: '4', name: 'Custom Engineered Pegs & Hangers', image: '', isEngineered: true },
];

export default function Home() {
  const { addToBuyNow, addToQuote } = useCartStore();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/heropage.png" 
            alt="PurePlast Manufacturing Facility" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-md border border-border mb-6 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#108E2B] animate-pulse" />
              Engineered for the Future.
            </div>
            <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-[1.1] mb-6 text-balance">
              Industrial Precision <br />
              <span className="text-[#004C97]">Plastic Solutions</span>
            </h1>
            <p className="text-lg text-black/80 mb-10 text-balance max-w-xl leading-relaxed">
              From everyday household items like mugs, basins, and chairs to custom engineered plastic parts. We provide reliable manufacturing solutions tailored to your needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-base rounded-4xl bg-[#004C97] hover:bg-[#004C97]/90 text-white border-0">
                Explore Catalog
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-4xl bg-white/50 backdrop-blur-md">
                Request Custom Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { title: "Household Plastics", desc: "Durable mugs, basins, tumblers, and chairs for everyday use." },
              { title: "Retail & Storage", desc: "High-quality hangers, pegs, and buckets built to last." },
              { title: "Engineered Parts", desc: "Precision custom molding for specialized applications." },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 rounded-3xl bg-background border border-border flex items-center justify-center text-[#004C97]">
                  <ArrowRight />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-semibold tracking-tighter mb-4">Product Catalog</h2>
              <p className="text-lg text-black/60">
                Browse our selection of standard plastic products for immediate purchase or discover our custom engineered parts available for quotation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DUMMY_PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-white rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:border-black/10 transition-all duration-300"
              >
                <div className="aspect-square bg-[#E5E5E5] relative overflow-hidden flex items-center justify-center">
                   {/* Dummy Product Image Placeholder. Replace with ~800x800 square product image */}
                   <span className="text-xs text-black/30 font-medium">Product Image Placeholder</span>
                   <div className="absolute top-4 left-4">
                     {product.isEngineered ? (
                       <span className="px-2 py-1 bg-[#108E2B]/10 text-[#108E2B] text-xs font-semibold rounded-3xl backdrop-blur-md">Engineered Part</span>
                     ) : (
                       <span className="px-2 py-1 bg-white/80 text-black text-xs font-semibold rounded-3xl backdrop-blur-md">Standard Stock</span>
                     )}
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg leading-tight mb-2 flex-1">{product.name}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    {product.price ? (
                      <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                    ) : (
                      <span className="text-sm font-medium text-black/60">Quote Required</span>
                    )}
                    
                    {product.isEngineered ? (
                      <Button size="sm" variant="outline" className="border-[#004C97] text-[#004C97] hover:bg-[#004C97] hover:text-white" onClick={() => addToQuote(product)}>
                        <FileText className="w-4 h-4 mr-2" /> Add to Quote
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => addToBuyNow(product)}>
                        <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

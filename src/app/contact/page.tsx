"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tighter mb-6">Contact Us</h1>
          <p className="text-lg text-black/70">
            Have a question about our standard products or need a custom engineering quote? Reach out to our team of experts today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Company Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  className="flex w-full rounded-3xl border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
                  placeholder="How can we help you?"
                />
              </div>
              <Button size="lg" className="w-full bg-[#004C97] hover:bg-[#004C97]/90 text-white">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12 lg:pl-12"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Headquarters</h3>
              <p className="text-black/70 leading-relaxed">
                Industrial Park, Suite 100<br />
                Manufacturing District<br />
                City, State 12345
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Direct Contacts</h3>
              <div className="space-y-2 text-black/70">
                <p><strong>Sales:</strong> sales@pureplast.com</p>
                <p><strong>Support:</strong> support@pureplast.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </div>
            <div className="p-6 bg-[#FBFAF2] border border-border rounded-3xl">
              <h4 className="font-medium text-[#108E2B] mb-2">Quote Requests</h4>
              <p className="text-sm text-black/70">
                For custom engineered parts, please use the <strong>Quote List</strong> feature in the product catalog for faster processing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

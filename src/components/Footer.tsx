import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] text-[#000000] py-16 border-t border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="space-y-2 lg:col-span-1">
          <div className="bg-none p-6 rounded-2xl inline-block w-fit">
            <Image
              src="/images/logoemblemnobg.PNG"
              alt="PurePlast Logo"
              width={100}
              height={80}
              className="h-20 -mt-16 w-auto object-contain"
            />
          </div>
          <p className="text-sm opacity-60 max-w-xs">
            Industrial precision plastic manufacturing and high-tolerance engineered components.
          </p>
          <p className="text-xs text-[#004C97] font-semibold pt-2">
            {SITE_CONFIG.location.regionalPresence}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-[#0B1215]">Company</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link href="/about" className="hover:opacity-100 hover:text-[#004C97] transition-all">About Us</Link></li>
            <li><Link href="/partners" className="hover:opacity-100 hover:text-[#004C97] transition-all">Work With Us</Link></li>
            <li><Link href="/contact" className="hover:opacity-100 hover:text-[#004C97] transition-all">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#0B1215]">Capabilities</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link href="/products" className="hover:opacity-100 hover:text-[#004C97] transition-all">Household &amp; Tableware</Link></li>
            <li><Link href="/products?category=engineered" className="hover:opacity-100 hover:text-[#004C97] transition-all">Engineered Parts</Link></li>
            <li><Link href="/contact?type=custom-engineering" className="hover:opacity-100 hover:text-[#004C97] transition-all">Custom Mould Tooling</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#0B1215]">Sustainability</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link href="/sustainability" className="hover:opacity-100 hover:text-[#004C97] transition-all">Materials &amp; Grades</Link></li>
            <li>
              <Link href="/sustainability#statement" className="hover:opacity-100 hover:text-[#004C97] transition-all">
                Supplier Sustainability Statement
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#0B1215]">Contact</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li>
              <a href={`mailto:${SITE_CONFIG.contact.emails.general}`} className="hover:text-[#004C97] transition-colors">
                {SITE_CONFIG.contact.emails.general}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE_CONFIG.contact.phoneTel}`} className="hover:text-[#004C97] transition-colors">
                {SITE_CONFIG.contact.phone}
              </a>
            </li>
            <li>{SITE_CONFIG.location.shortAddress}</li>
            <li className="pt-2 text-xs font-semibold text-[#108E2B]">
              Quote reply within {SITE_CONFIG.standards.quoteTurnaround}
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 mt-12 border-t border-[#E5E5E5] text-sm opacity-60 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} PurePlast Industries Ltd. All rights reserved.</p>
        <div className="flex space-x-6 text-sm">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <a href={SITE_CONFIG.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#108E2B] font-semibold hover:underline">
            WhatsApp Support
          </a>
        </div>
      </div>
    </footer>
  );
}

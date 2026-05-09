import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#FFFFFF] text-[#000000] py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-2">
          <div className="bg-none p-6 rounded-2xl inline-block w-fit">
            <Image src="/images/logoemblemnobg.PNG" alt="PurePlast Logo" width={100} height={80} className="h-20 -mt-16 w-auto object-contain" />
          </div>
          <p className="text-sm opacity-60 max-w-xs">
            High-quality household plastics and precision engineered solutions for the future.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li><Link href="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
            <li><Link href="/partners" className="hover:opacity-100 transition-opacity">Our Partners</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Capabilities</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li><Link href="/products" className="hover:opacity-100 transition-opacity">Household Plastics</Link></li>
            <li><Link href="/engineering" className="hover:opacity-100 transition-opacity">Engineered Parts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm opacity-60">
            <li>info@pureplast.com</li>
            <li>+254 710 678753</li>
            <li>Prisons RD, Kitengela</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-md opacity-40 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} PurePlast. All rights reserved.</p>
        <div className="flex space-x-4 text-md mt-4 md:mt-0">
          <Link href="https://martinmwai.vercel.app">About Developer</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

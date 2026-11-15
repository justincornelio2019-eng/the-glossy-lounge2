// src/components/layout/Footer.tsx
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="font-serif font-bold text-lg text-neutral-900">
                The Glossy Lounge
              </span>
            </Link>
            <p className="text-sm text-neutral-500">
              Where your nails get their glow. Premium nail art and self-care in Sampaloc, Manila.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-neutral-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li><Link href="/book" className="hover:text-pink-600 transition-colors">Book an Appointment</Link></li>
              <li><Link href="/gallery" className="hover:text-pink-600 transition-colors">View Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-pink-600 transition-colors">Visit Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-neutral-900 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>416 Kundiman St. Sampaloc Manila</li>
              <li>0912 345 6789</li>
              <li>theglossylounge26@gmail.com</li>
              <li className="pt-2">Open Daily: 10:00 AM – 9:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} The Glossy Lounge. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">
              Instagram
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">
              Facebook
            </Link>
            <Link href="/admin/login" className="hover:text-neutral-600 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
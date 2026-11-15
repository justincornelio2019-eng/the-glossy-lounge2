// src/components/layout/Footer.tsx
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Clock, Camera, ThumbsUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50/30 border-t border-neutral-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand & Description (Spans 5 columns on desktop) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="p-2 bg-pink-100 rounded-full">
                <Sparkles className="w-5 h-5 text-pink-600" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-neutral-900">
                The Glossy Lounge
              </span>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
              Where your nails get their glow. Premium nail art, gel extensions, and self-care in the heart of Sampaloc, Manila.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white border border-neutral-200 rounded-full text-neutral-500 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-all shadow-sm">
                <Camera className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white border border-neutral-200 rounded-full text-neutral-500 hover:text-pink-600 hover:border-pink-200 hover:bg-pink-50 transition-all shadow-sm">
                <ThumbsUp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (Spans 3 columns) */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="font-semibold text-neutral-900 tracking-wide uppercase text-xs">Explore</h3>
            <ul className="space-y-3 text-sm text-neutral-500 font-medium">
              <li>
                <Link href="/book" className="hover:text-pink-600 transition-colors flex items-center gap-2">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-pink-600 transition-colors flex items-center gap-2">
                  View Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-600 transition-colors flex items-center gap-2">
                  Visit Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info (Spans 4 columns) */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="font-semibold text-neutral-900 tracking-wide uppercase text-xs">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <span>416 Kundiman St. Sampaloc Manila</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                <a href="tel:+639123456789" className="hover:text-pink-600 transition-colors">0912 345 6789</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                <a href="mailto:theglossylounge26@gmail.com" className="hover:text-pink-600 transition-colors">theglossylounge26@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Open Daily: 10:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200/60 flex flex-col md:flex-row items-center justify-between gap-4 pb-28 md:pb-0">
          <p className="text-xs text-neutral-400 font-medium">
            © {new Date().getFullYear()} The Glossy Lounge. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-400 font-medium">
            <Link href="/admin/login" className="hover:text-neutral-900 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
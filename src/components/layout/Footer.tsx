// src/components/layout/Footer.tsx
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pb-28 md:pb-8">
      <div className="max-w-5xl mx-auto px-4 pt-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Socials */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-pink-50 rounded-full">
                <Sparkles className="w-5 h-5 text-pink-500" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-neutral-900">
                The Glossy Lounge
              </span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              Where your nails get their glow. Premium nail art, gel extensions, and self-care in the heart of Sampaloc, Manila.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 bg-neutral-100 hover:bg-pink-500 text-neutral-500 hover:text-white rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 bg-neutral-100 hover:bg-pink-500 text-neutral-500 hover:text-white rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4 tracking-wide uppercase text-sm">Explore</h3>
            <ul className="space-y-3 text-sm text-neutral-500">
              <li>
                <Link href="/book" className="hover:text-pink-600 hover:underline underline-offset-4 transition-all">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-pink-600 hover:underline underline-offset-4 transition-all">
                  View Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-600 hover:underline underline-offset-4 transition-all">
                  Visit Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4 tracking-wide uppercase text-sm">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-500 shrink-0" />
                <span>416 Kundiman St. Sampaloc Manila</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-pink-500 shrink-0" />
                <a href="tel:+639123456789" className="hover:text-pink-600 transition-colors">0912 345 6789</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pink-500 shrink-0" />
                <a href="mailto:theglossylounge26@gmail.com" className="hover:text-pink-600 transition-colors truncate">
                  theglossylounge26@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-pink-500 shrink-0" />
                <span>Open Daily: 10:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} The Glossy Lounge. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <Link href="/admin/login" className="hover:text-pink-500 transition-colors font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
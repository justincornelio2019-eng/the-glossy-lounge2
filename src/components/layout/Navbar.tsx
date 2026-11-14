// src/components/layout/Navbar.tsx
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="font-serif font-bold text-lg tracking-tight text-neutral-900">
            The Glossy Lounge
          </span>
        </Link>

        {/* Desktop Nav (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          <Link href="/gallery" className="hover:text-pink-600 transition-colors">Gallery</Link>
          <Link href="/contact" className="hover:text-pink-600 transition-colors">Visit Us</Link>
          <Link 
            href="/book" 
            className="bg-neutral-900 text-white px-5 py-2.5 rounded-full hover:bg-pink-600 transition-colors"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile CTA (visible only on mobile) */}
        <Link 
          href="/book" 
          className="md:hidden bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full"
        >
          Book
        </Link>
      </div>
    </header>
  );
}
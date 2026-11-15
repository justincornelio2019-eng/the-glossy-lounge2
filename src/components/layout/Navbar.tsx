// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
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

        {/* Mobile Menu Button (visible only on mobile) */}
        <button 
          className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-neutral-200 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              href="/gallery" 
              className="px-4 py-3 rounded-xl hover:bg-pink-50 hover:text-pink-600 font-medium text-neutral-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-3 rounded-xl hover:bg-pink-50 hover:text-pink-600 font-medium text-neutral-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Visit Us
            </Link>
            <div className="pt-2">
              <Link 
                href="/book" 
                className="flex items-center justify-center w-full bg-pink-500 hover:bg-pink-600 text-white font-bold px-5 py-3 rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
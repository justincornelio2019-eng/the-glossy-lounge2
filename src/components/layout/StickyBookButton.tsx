// src/components/layout/StickyBookButton.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyBookButton() {
  const pathname = usePathname();

  // Hide the button completely if the user is on the booking page
  if (pathname === "/book") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-neutral-200 md:hidden z-50 pb-safe">
      <Link 
        href="/book" 
        className="w-full flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/20 transition-colors"
      >
        Book Appointment
      </Link>
    </div>
  );
}
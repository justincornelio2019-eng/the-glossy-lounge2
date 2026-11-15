// src/app/(public)/layout.tsx
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 relative">
      {/* Main Content grows to fill space */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Footer sits at the bottom */}
      <Footer />

      {/* GLOBAL MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-neutral-200 md:hidden z-50 pb-safe">
        <Link 
          href="/book" 
          className="w-full flex items-center justify-center bg-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/20"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
// src/app/(public)/layout.tsx
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Main Content grows to fill space */}
      <div className="flex-grow">
        {children}
      </div>
      
      {/* Footer sits at the bottom */}
      <Footer />
    </div>
  );
}
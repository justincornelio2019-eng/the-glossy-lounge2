// src/app/(public)/layout.tsx
import { Footer } from "@/components/layout/Footer";
import { StickyBookButton } from "@/components/layout/StickyBookButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      
      {/* Renders the button, but hides it on /book automatically */}
      <StickyBookButton />
    </div>
  );
}
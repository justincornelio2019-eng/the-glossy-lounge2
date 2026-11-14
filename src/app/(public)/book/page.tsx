// src/app/(public)/book/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { BookingForm } from "@/components/booking/BookingForm";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-neutral-50 relative">
      <Navbar />
      {/* Pushed down further so the sticky navbar can't overlap it */}
      <div className="pt-24 pb-12 px-4 relative z-10">
        <BookingForm />
      </div>
    </div>
  );
}
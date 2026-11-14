// src/app/(public)/book/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { BookingForm } from "@/components/booking/BookingForm";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="pt-8 px-4">
        <BookingForm />
      </div>
    </div>
  );
}
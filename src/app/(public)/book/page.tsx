// src/app/(public)/book/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { BookingForm } from "@/components/booking/BookingForm";
import { createClient } from "@/lib/supabase/server";

export default async function BookPage() {
  const supabase = await createClient();
  
  // Fetch only confirmed or pending bookings to block those slots
  const { data: bookings } = await supabase
    .from("bookings")
    .select("appointment_date, appointment_time")
    .in("status", ["pending", "confirmed"]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="pt-8 px-4">
        {/* Pass the existing bookings to the form */}
        <BookingForm existingBookings={bookings || []} />
      </div>
    </div>
  );
}
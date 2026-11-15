// src/app/(public)/book/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { BookingForm } from "@/components/booking/BookingForm";
import { createClient } from "@/lib/supabase/server";

export default async function BookPage() {
  const supabase = await createClient();
  
  // 1. Fetch existing bookings to block overlapping times
  const { data: bookings } = await supabase
    .from("bookings")
    .select("appointment_date, appointment_time")
    .in("status", ["pending", "confirmed"]);

  // 2. Fetch the shop settings (GCash, Deposit, Hours)
  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="pt-8 px-4">
        {/* Pass both props to the form */}
        <BookingForm 
          existingBookings={bookings || []} 
          settings={settings} 
        />
      </div>
    </div>
  );
}
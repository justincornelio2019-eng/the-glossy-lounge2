// src/app/admin/(protected)/dashboard/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(
  bookingId: string,
  newStatus: "confirmed" | "declined"
) {
  const supabase = await createClient();

  // SECURITY CHECK
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", bookingId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/dashboard");
  return { success: true };
}

// ... (keep your existing updateBookingStatus function) ...

export async function markBookingComplete(bookingId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("bookings")
    .update({ status: "completed" })
    .eq("id", bookingId);

  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  return { success: true };
}

export async function rescheduleBooking(bookingId: string, newDate: string, newTime: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("bookings")
    .update({ appointment_date: newDate, appointment_time: newTime, status: "confirmed" })
    .eq("id", bookingId);

  if (error) return { error: error.message };
  revalidatePath("/admin/dashboard");
  return { success: true };
}
// src/app/admin/(protected)/dashboard/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(
  bookingId: string,
  newStatus: "confirmed" | "declined"
) {
  const supabase = await createClient();

  // Verify the user is authenticated (middleware already does this, but double-checking is good practice)
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

  // Tell Next.js to refresh the dashboard data instantly
  revalidatePath("/admin/dashboard");
  return { success: true };
}
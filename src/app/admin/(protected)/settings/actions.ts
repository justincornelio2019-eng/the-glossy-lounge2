// src/app/admin/(protected)/settings/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  // SECURITY CHECK
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const gcash_number = formData.get("gcash_number") as string;
  const gcash_name = formData.get("gcash_name") as string;
  const deposit_amount = parseFloat(formData.get("deposit_amount") as string);
  const open_time = formData.get("open_time") as string;
  const close_time = formData.get("close_time") as string;

  // Basic validation
  if (isNaN(deposit_amount) || deposit_amount < 0) {
    return { success: false, error: "Invalid deposit amount" };
  }

  const { error } = await supabase
    .from("settings")
    .update({
      gcash_number,
      gcash_name,
      deposit_amount,
      open_time,
      close_time,
    })
    .eq("id", 1);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/book");
  revalidatePath("/admin/settings");
  return { success: true };
}
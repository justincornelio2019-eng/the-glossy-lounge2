// src/app/(public)/book/actions.ts
"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { adminBookingEmail } from "@/lib/email/templates";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

type CloudinaryResponse = { secure_url: string };

export async function submitBooking(formData: FormData) {
  try {
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const instagram = formData.get("instagram") as string;
    const gcashRef = formData.get("gcashRef") as string;
    const inspoFile = formData.get("inspoFile") as File | null;

    if (!date || !time || !name || !phone || !email || !gcashRef) {
      return { success: false, error: "Please fill in all required fields." };
    }

    let inspoImageUrl = null;

    // 1. Upload Inspo Image to Cloudinary (if provided)
    if (inspoFile && inspoFile.size > 0) {
      const arrayBuffer = await inspoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise<CloudinaryResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "glossy-lounge/inspo" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryResponse);
          }
        ).end(buffer);
      });

      inspoImageUrl = uploadResponse.secure_url;
    }

    // 2. Save to Supabase
    const supabase = createAdminClient();
    
    const { error } = await supabase.from("bookings").insert({
      client_name: name,
      client_phone: phone,
      client_email: email,
      client_instagram: instagram || null,
      appointment_date: date,
      appointment_time: time,
      gcash_reference: gcashRef,
      inspo_image_url: inspoImageUrl,
      status: "pending",
      deposit_amount: 200,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: "Failed to save booking. Please try again." };
    }

    // 3. Send Email Notification to Admin
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev", // You can only use onboarding@resend.dev until you verify your domain
        to: process.env.ADMIN_EMAIL as string,
        subject: `New Booking: ${name} on ${date}`,
        html: adminBookingEmail({
          client_name: name,
          appointment_date: date,
          appointment_time: time,
          client_phone: phone,
          client_email: email,
          gcash_reference: gcashRef,
        }),
      });
    } catch (emailError) {
      console.error("Failed to send admin email:", emailError);
      // We don't return an error here because the booking was still saved successfully
    }

    revalidatePath("/admin/dashboard"); 
    return { success: true };

  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
// src/app/(public)/book/actions.ts
"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { adminBookingEmail } from "@/lib/email/templates";
import { z } from "zod";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Define the strict validation schema with Zod
const BookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.enum(["10:00", "13:00", "16:00", "19:00"], { message: "Invalid time slot" }),
  
  // Strictly required fields
  name: z.string().min(1, "Full name is required").max(100, "Name is too long"),
  phone: z.string().min(1, "Phone number is required").max(20, "Invalid phone number"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  gcashRef: z.string().min(1, "GCash reference number is required").max(50, "GCash reference is too long"),
  
  // Optional field
  instagram: z.string().max(50).optional().nullable(),
});

type CloudinaryResponse = { secure_url: string };

export async function submitBooking(formData: FormData) {
  try {
    // Extract raw data
    const rawData = {
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      instagram: formData.get("instagram") as string,
      gcashRef: formData.get("gcashRef") as string,
    };

    const inspoFile = formData.get("inspoFile") as File | null;

    // 2. Validate with Zod
    const validatedData = BookingSchema.safeParse(rawData);

    if (!validatedData.success) {
      // Return the first validation error to the user
      const firstError = validatedData.error.issues[0].message;
      return { success: false, error: firstError };
    }

    const { date, time, name, phone, email, instagram, gcashRef } = validatedData.data;

    let inspoImageUrl = null;

    // 3. Secure File Upload
    if (inspoFile && inspoFile.size > 0) {
      // Check if it's actually an image
      if (!inspoFile.type.startsWith("image/")) {
        return { success: false, error: "Inspo file must be an image." };
      }
      // Check file size (Max 5MB)
      if (inspoFile.size > 5 * 1024 * 1024) {
        return { success: false, error: "Inspo image must be under 5MB." };
      }

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

    // 4. Save to Supabase
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

    // 5. Send Email Notification to Admin
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev", 
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
    }

    revalidatePath("/admin/dashboard"); 
    return { success: true };

  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
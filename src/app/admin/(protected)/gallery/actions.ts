// src/app/admin/(protected)/gallery/actions.ts
"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResponse = { secure_url: string; public_id: string };

export async function uploadGalleryImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file || file.size === 0) {
      return { success: false, error: "No file provided." };
    }

    // 1. Upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "glossy-lounge/gallery" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as CloudinaryResponse);
        }
      ).end(buffer);
    });

    // 2. Save to Supabase using Admin Client
    const supabase = createAdminClient();
    
    const { error } = await supabase.from("gallery_images").insert({
      image_url: uploadResponse.secure_url,
      cloudinary_public_id: uploadResponse.public_id,
      caption: caption || null,
      sort_order: 0,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: "Failed to save to database." };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    return { success: true };

  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, error: "Something went wrong during upload." };
  }
}

export async function deleteGalleryImage(id: string, publicId: string) {
  try {
    const supabase = createAdminClient();

    // 1. Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // 2. Delete from Supabase
    const { error } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase Delete Error:", error);
      return { success: false, error: "Failed to delete from database." };
    }

    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Something went wrong." };
  }
}
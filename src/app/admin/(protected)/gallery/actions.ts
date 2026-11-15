// src/app/admin/(protected)/gallery/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResponse = { secure_url: string; public_id: string };

// Helper function to verify authentication
async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function uploadGalleryImage(formData: FormData) {
  try {
    await requireAuth(); // SECURITY CHECK

    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file || file.size === 0) {
      return { success: false, error: "No file provided." };
    }

    // Security: Verify it's actually an image
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image." };
    }

    // Security: Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: "File size must be less than 5MB." };
    }

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
    await requireAuth(); // SECURITY CHECK

    const supabase = createAdminClient();

    await cloudinary.uploader.destroy(publicId);

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
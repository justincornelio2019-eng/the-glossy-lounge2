// src/app/admin/(protected)/gallery/page.tsx
import { createClient } from "@/lib/supabase/server";
import { GalleryUploader } from "@/components/admin/GalleryUploader";
import { Trash2 } from "lucide-react";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Gallery</h1>
        <p className="text-sm text-neutral-600">Manage your portfolio photos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="md:col-span-1">
          <GalleryUploader />
        </div>

        {/* Existing Images */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900">Current Photos</h2>
          
          {!images || images.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
              No photos uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.image_url} alt={img.caption || "Gallery"} className="w-full h-full object-cover" />
                  
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs truncate">
                      {img.caption}
                    </div>
                  )}
                  
                  {/* Delete Button (We'll wire this up next) */}
                  <button className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
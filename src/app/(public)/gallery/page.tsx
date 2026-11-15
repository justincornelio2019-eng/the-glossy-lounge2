// src/app/(public)/gallery/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="bg-neutral-50 pb-24 md:pb-12">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Recent Works</h1>
          <p className="text-neutral-500">Tap an image to view full size.</p>
        </div>

        {!images || images.length === 0 ? (
          <div className="text-center text-neutral-500 py-12 bg-white rounded-3xl border border-neutral-200">
            Photos coming soon!
          </div>
        ) : (
          <GalleryGrid images={images} />
        )}
      </div>
    </div>
  );
}
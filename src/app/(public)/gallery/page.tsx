// src/app/(public)/gallery/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">Recent Works</h1>
          <p className="text-neutral-600">A collection of our favorite sets.</p>
        </div>

        {!images || images.length === 0 ? (
          <div className="text-center text-neutral-500 py-12">
            Photos coming soon!
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {images.map((img) => (
              <div key={img.id} className="break-inside-avoid relative rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.image_url} 
                  alt={img.caption || "Nail Art"} 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="p-4 bg-white">
                    <p className="text-sm font-medium text-neutral-900">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
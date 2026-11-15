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
      
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-12">
        {/* Tighter Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Recent Works</h1>
          <p className="text-sm md:text-base text-neutral-600">A collection of our favorite sets.</p>
        </div>

        {!images || images.length === 0 ? (
          <div className="text-center text-neutral-500 py-12">
            Photos coming soon!
          </div>
        ) : (
          /* NEW GRID LAYOUT */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="group relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.image_url} 
                  alt={img.caption || "Nail Art"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Dark Gradient Overlay at the bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-sm font-medium text-white shadow-sm truncate">
                      {img.caption}
                    </p>
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
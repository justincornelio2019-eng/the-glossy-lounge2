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
    <div className="min-h-screen bg-neutral-50 pb-24 md:pb-12">
      <Navbar />
      
      {/* Reduced padding from py-12 to pt-8 pb-12 to remove top gap */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-12">
        
        {/* Header - Made smaller and tighter */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-2">Recent Works</h1>
          <p className="text-neutral-500">A collection of our favorite sets.</p>
        </div>

        {!images || images.length === 0 ? (
          <div className="text-center text-neutral-500 py-12 bg-white rounded-3xl border border-neutral-200">
            Photos coming soon!
          </div>
        ) : (
          /* Changed from columns to a standard Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-200 group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.image_url} 
                  alt={img.caption || "Nail Art"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Optional: Overlay caption on hover */}
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm font-medium truncate">{img.caption}</p>
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
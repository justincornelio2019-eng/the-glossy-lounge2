// src/components/gallery/GalleryGrid.tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* The Scrollable Box */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-4 shadow-sm">
        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.image_url)}
                className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 group focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.image_url}
                  alt={img.caption || "Nail Art"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium truncate w-full text-left">
                      {img.caption}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage}
            alt="Full size nail art"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
          />
        </div>
      )}
    </>
  );
}
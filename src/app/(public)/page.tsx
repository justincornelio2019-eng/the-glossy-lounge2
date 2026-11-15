// src/app/(public)/page.tsx
import Link from "next/link";
import { MapPin, Clock, Bike, ChevronRight, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch the 10 most recent gallery images
  const { data: recentImages } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="px-4 pt-12 pb-12 md:pt-24 md:pb-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-6">
          <Star className="w-3 h-3 fill-pink-700" />
          <span>Sampaloc, Manila</span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-neutral-900 leading-tight mb-6">
          Where your nails <br className="hidden md:block" />
          get their <span className="text-pink-500 italic">glow.</span>
        </h1>
        
        <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          A cozy nail lounge offering premium nail art, gel extensions, and self-care. 
          Book your appointment online today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/book" 
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-pink-500/30"
          >
            Book an Appointment
          </Link>
          <Link 
            href="/gallery" 
            className="w-full sm:w-auto bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-700 font-medium px-8 py-4 rounded-full text-lg transition-colors flex items-center justify-center gap-2"
          >
            View Portfolio <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* MINI GALLERY TEASER */}
      <section className="py-10 bg-white overflow-hidden border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Recent Works</h2>
          <Link href="/gallery" className="text-sm font-medium text-pink-600 hover:text-pink-700">
            See all
          </Link>
        </div>
        
        {/* Horizontal scroll container */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory hide-scrollbar max-w-5xl mx-auto">
          {recentImages && recentImages.length > 0 ? (
            recentImages.map((img) => (
              <div 
                key={img.id} 
                className="snap-center shrink-0 w-60 h-72 bg-neutral-100 rounded-2xl relative overflow-hidden group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.image_url} 
                  alt={img.caption || "Recent nail work"} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full py-12 text-center text-neutral-400">
              Photos coming soon...
            </div>
          )}
        </div>
      </section>

      {/* LOCATION & INFO */}
      <section className="px-4 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Text Details */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-bold text-neutral-900">Visit the Lounge</h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-pink-50 rounded-xl shrink-0">
                  <MapPin className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Address</h3>
                  <p className="text-neutral-500 text-sm mt-1">416 Kundiman St. Sampaloc Manila</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-pink-50 rounded-xl shrink-0">
                  <Clock className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Hours</h3>
                  <p className="text-neutral-500 text-sm mt-1">Open Daily<br />10:00 AM – 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-pink-50 rounded-xl shrink-0">
                  <Bike className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Parking Note</h3>
                  <p className="text-neutral-500 text-sm mt-1">Available parking for 1 motorcycle only.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="bg-neutral-100 rounded-2xl h-[250px] md:h-[350px] overflow-hidden border border-neutral-200 relative shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1772029836564!2d120.99595407474374!3d14.612326186263782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b70000000000%3A0x0!2s416%20Kundiman%20St%2C%20Sampaloc%2C%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-neutral-200 md:hidden z-50 pb-safe">
        <Link 
          href="/book" 
          className="w-full flex items-center justify-center bg-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/20"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
// src/app/(public)/contact/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { MapPin, Clock, Bike, Phone, Mail, Camera, ChevronRight } from "lucide-react";
import { FacebookIcon } from "@/components/icons/SocialIcons";

export default function ContactPage() {
  return (
    <div className="bg-neutral-50 overflow-x-hidden">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-8 pb-12 w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Visit Us</h1>
          <p className="text-neutral-600 text-base md:text-lg">
            We can't wait to see you. Here's everything you need to know to find us.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Contact Buttons */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 space-y-4">
            <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4">Get in Touch</h2>
            
            <a href="tel:+639123456789" className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">Call or Text</p>
                <p className="text-sm text-neutral-500 truncate">0912 345 6789</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500 shrink-0" />
            </a>

            <a href="mailto:theglossylounge26@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">Email Us</p>
                <p className="text-sm text-neutral-500 truncate">theglossylounge26@gmail.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500 shrink-0" />
            </a>

            <a 
              href="https://www.instagram.com/theglossylounge/" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group"
            >
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors shrink-0">
                <Camera className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">Instagram</p>
                <p className="text-sm text-neutral-500 truncate">@theglossylounge</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500 shrink-0" />
            </a>

            <a 
              href="https://www.facebook.com/theglossylounge" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group"
            >
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors shrink-0">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-neutral-900">Facebook</p>
                <p className="text-sm text-neutral-500 truncate">The Glossy Lounge</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500 shrink-0" />
            </a>
          </div>

          {/* Location Details */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 space-y-6">
            <h2 className="font-serif text-xl font-bold text-neutral-900">Location & Hours</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full shrink-0">
                  <MapPin className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Address</h3>
                  <p className="text-neutral-600 mt-1">416 Kundiman St. Sampaloc Manila</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full shrink-0">
                  <Clock className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Hours</h3>
                  <p className="text-neutral-600 mt-1">Open Daily<br />10:00 AM – 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 rounded-full shrink-0">
                  <Bike className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Parking</h3>
                  <p className="text-neutral-600 mt-1">Available parking for 1 motorcycle only.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="w-full h-[300px] rounded-3xl overflow-hidden border border-neutral-200 relative shadow-sm bg-neutral-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1772029836564!2d120.99595407474374!3d14.612326186263782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b70000000000%3A0x0!2s416%20Kundiman%20St%2C%20Sampaloc%2C%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
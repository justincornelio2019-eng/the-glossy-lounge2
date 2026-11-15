// src/app/(public)/contact/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { MapPin, Clock, Bike, Phone, Mail, Camera, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pb-24 md:pb-12">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-4">Visit Us</h1>
          <p className="text-neutral-600 text-lg">
            We can't wait to see you. Here's everything you need to know to find us.
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Contact Buttons */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200 space-y-4">
            <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4">Get in Touch</h2>
            
            <a href="tel:+639123456789" className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Call or Text</p>
                <p className="text-sm text-neutral-500">0912 345 6789</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500" />
            </a>

            <a href="mailto:theglossylounge26@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Email Us</p>
                <p className="text-sm text-neutral-500">theglossylounge26@gmail.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500" />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-pink-300 hover:bg-pink-50 transition-colors group">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full group-hover:bg-pink-200 transition-colors">
                {/* Replaced Instagram with Camera */}
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-neutral-900">Instagram</p>
                <p className="text-sm text-neutral-500">@theglossylounge</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-300 ml-auto group-hover:text-pink-500" />
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

          {/* Map */}
          <div className="bg-neutral-100 rounded-3xl h-[300px] overflow-hidden border border-neutral-200 relative shadow-sm">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1772029836564!2d120.99595407474374!3d14.612326186263782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b70000000000%3A0x0!2s416%20Kundiman%20St%2C%20Sampaloc%2C%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* CTA */}
          <div className="bg-neutral-900 rounded-3xl p-8 text-center text-white shadow-lg">
            <h2 className="font-serif text-2xl font-bold mb-2">Ready for your glow up?</h2>
            <p className="text-neutral-300 mb-6 text-sm">Secure your slot online. No waiting.</p>
            <Link 
              href="/book" 
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Book an Appointment
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
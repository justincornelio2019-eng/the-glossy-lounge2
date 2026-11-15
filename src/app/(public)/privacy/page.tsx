// src/app/(public)/privacy/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="bg-neutral-50 pb-24 md:pb-12 overflow-x-hidden">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-12 w-full">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-neutral-200 space-y-6 text-neutral-600 text-sm leading-relaxed">
          
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">1. Information We Collect</h2>
            <p>When you book an appointment at The Glossy Lounge, we collect personal information such as your name, phone number, email address, Instagram handle (optional), and GCash reference number. We also collect any inspiration photos you upload.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">2. How We Use Your Information</h2>
            <p>We use your information solely to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and confirm your booking.</li>
              <li>Verify your deposit payment.</li>
              <li>Contact you regarding your appointment (e.g., rescheduling).</li>
              <li>Show you relevant nail art inspiration based on your uploaded photos.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">3. Data Storage and Security</h2>
            <p>Your data is securely stored in our database and image servers. We do not sell, trade, or rent your personal information to third parties.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:theglossylounge26@gmail.com" className="text-pink-600 hover:underline">theglossylounge26@gmail.com</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
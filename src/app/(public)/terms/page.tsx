// src/app/(public)/terms/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="bg-neutral-50 pb-24 md:pb-12 overflow-x-hidden">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-12 w-full">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Terms of Service</h1>
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-neutral-200 space-y-6 text-neutral-600 text-sm leading-relaxed">
          
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">1. Booking and Deposits</h2>
            <p>To secure an appointment, a deposit is required via GCash. Your slot is not confirmed until we have verified your deposit reference number. The remaining balance is to be paid in cash or via GCash in person on the day of your appointment.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">2. Cancellations and Rescheduling</h2>
            <p>We understand that life happens. If you need to reschedule, please contact us as soon as possible. Deposits are non-refundable for no-shows or cancellations made less than 24 hours before the appointment time.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">3. Late Arrivals</h2>
            <p>Please arrive on time for your appointment. If you are more than 15 minutes late, we may need to shorten your service or reschedule your appointment to avoid delaying the next client.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-lg text-neutral-900">4. Satisfaction Guarantee</h2>
            <p>We strive to provide the best service possible. If you have any issues with your nails, please let us know within 3 days of your appointment so we can fix it for you.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
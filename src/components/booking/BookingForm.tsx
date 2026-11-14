// src/components/booking/BookingForm.tsx
"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Clock, Upload, CheckCircle2, ChevronLeft, Loader2, PartyPopper } from "lucide-react";
import Link from "next/link";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { submitBooking } from "@/app/(public)/book/actions";

export function BookingForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Store date as a Date object
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [inspoFile, setInspoFile] = useState<File | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    
    if (!date || !time) {
      setError("Please select both a date and a time.");
      return;
    }
    
    const data = new FormData();
    formData.forEach((value, key) => data.append(key, value));
    
    data.append("date", format(date, "yyyy-MM-dd"));
    data.append("time", time);
    if (inspoFile) data.append("inspoFile", inspoFile);

    startTransition(async () => {
      const result = await submitBooking(data);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.error || "An unknown error occurred");
      }
    });
  }

  // Format the time to look nice (e.g., "14:30" -> "2:30 PM")
  const formatTimeDisplay = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const d = new Date();
    d.setHours(parseInt(hours), parseInt(minutes));
    return format(d, "h:mm a");
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-neutral-200 p-8 text-center mt-12 animate-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Booking Request Sent!</h2>
        <p className="text-neutral-600 mb-6">
          We've received your request and your GCash reference. We will verify your deposit and send a confirmation email to you shortly.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white font-medium px-8 py-3 rounded-full transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // BOOKING FORM
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden mb-24 md:mb-12">
      
      {/* Header */}
      <div className="bg-pink-50 p-6 border-b border-pink-100 flex items-center gap-4">
        <Link href="/" className="p-2 bg-white rounded-full shadow-sm text-pink-500 hover:text-pink-600">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-xl font-bold text-neutral-900">Book an Appointment</h1>
          <p className="text-xs text-neutral-500 mt-1">Secure your slot at The Glossy Lounge</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {/* STEP 1: Date & Time (OUTSIDE THE FORM) */}
        <div className="space-y-4 relative z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">1</span>
            <h2 className="font-medium text-neutral-900">Select Date & Time</h2>
          </div>

          {/* Beautiful DayPicker Calendar */}
          <div className="flex justify-center bg-neutral-50 rounded-2xl p-4 border border-neutral-100 overflow-hidden w-full">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setTime(""); // Reset time if date changes
              }}
              disabled={{ before: new Date() }}
              className="!w-full mx-auto"
            />
          </div>

          {/* Native Time Picker */}
          {date && (
            <div className="mt-4 relative z-10 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Select a Time (10:00 AM - 9:00 PM)
              </label>
              
              <div className="relative">
                <input
                  type="time"
                  min="10:00"
                  max="21:00"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400 text-base bg-white appearance-none cursor-pointer"
                  required
                />
                {/* Show a formatted preview of their chosen time */}
                {time && (
                  <p className="text-xs text-pink-600 font-medium mt-2">
                    Selected: {formatTimeDisplay(time)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <hr className="border-neutral-100" />

        {/* THE FORM STARTS HERE */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          
          {/* STEP 2: Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">2</span>
              <h2 className="font-medium text-neutral-900">Your Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">Full Name *</label>
                <input type="text" name="name" required placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400 text-base" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">Phone Number *</label>
                <input type="tel" name="phone" required placeholder="0912 345 6789" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400 text-base" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700">Email Address *</label>
              <input type="email" name="email" required placeholder="jane@example.com" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400 text-base" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700">Instagram Handle <span className="text-neutral-400 font-normal">(Optional)</span></label>
              <input type="text" name="instagram" placeholder="@janedoe" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400 text-base" />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* STEP 3: Inspo Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">3</span>
              <h2 className="font-medium text-neutral-900">Inspiration Design</h2>
            </div>
            
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-neutral-500">
                <Upload className="w-6 h-6 mb-2 text-pink-500" />
                <p className="text-sm font-medium">{inspoFile ? inspoFile.name : "Tap to upload a photo"}</p>
                <p className="text-xs mt-1">JPEG, PNG or WebP (Max 5MB)</p>
              </div>
              <input 
                type="file" 
                name="inspoFile"
                accept="image/*" 
                className="hidden" 
                onChange={(e) => setInspoFile(e.target.files?.[0] || null)} 
              />
            </label>
          </div>

          <hr className="border-neutral-100" />

          {/* STEP 4: GCash Deposit */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold">4</span>
              <h2 className="font-medium text-neutral-900">GCash Deposit</h2>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm border border-blue-100 space-y-2">
              <p>To secure your slot, please send a <strong>₱200 deposit</strong> via GCash to:</p>
              <div className="bg-white p-3 rounded-xl border border-blue-100">
                <p className="font-bold text-base">0912 345 6789</p>
                <p className="text-xs text-blue-600">Account Name: Glossy Lounge</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700">GCash Reference Number *</label>
              <input type="text" name="gcashRef" required placeholder="e.g. 1234 567 890123" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400 text-base" />
              <p className="text-xs text-neutral-500 mt-1">Please enter the 13-digit reference number from your GCash receipt.</p>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="button" 
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                const formData = new FormData(form);
                handleSubmit(formData);
              }
            }}
            disabled={isPending}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2 text-lg select-none"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Submit Booking Request
              </>
            )}
          </button>
          <p className="text-center text-xs text-neutral-400">
            Your slot is not confirmed until we verify your GCash deposit. You will receive an email shortly.
          </p>
        </form>

      </div>
    </div>
  );
}
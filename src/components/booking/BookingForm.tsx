// src/components/booking/BookingForm.tsx
"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Clock, Upload, CheckCircle2, ChevronLeft, Loader2, PartyPopper, AlertCircle } from "lucide-react";
import Link from "next/link";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; 
import { submitBooking } from "@/app/(public)/book/actions";

interface Booking {
  appointment_date: string;
  appointment_time: string;
}

interface Settings {
  gcash_number: string;
  gcash_name: string;
  deposit_amount: number;
}

export function BookingForm({ 
  existingBookings, 
  settings 
}: { 
  existingBookings: Booking[], 
  settings: Settings 
}) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // State for tracking field-specific errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [inspoFile, setInspoFile] = useState<File | null>(null);

  const timeSlots = [
    { value: "10:00", label: "10:00 AM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "19:00", label: "7:00 PM" },
  ];

  const selectedDateString = date ? format(date, "yyyy-MM-dd") : "";

  const bookedTimesForSelectedDate = existingBookings
    .filter((b) => b.appointment_date.split("T")[0] === selectedDateString)
    .map((b) => b.appointment_time.substring(0, 5));

  async function handleSubmit(formData: FormData) {
    setFieldErrors({});
    setGeneralError(null);
    
    // Frontend validation (The instant feedback)
    const errors: Record<string, string> = {};
    if (!date) errors.date = "Please select a date.";
    if (!time) errors.time = "Please select a time slot.";
    if (!formData.get("name")) errors.name = "Full name is required.";
    if (!formData.get("phone")) errors.phone = "Phone number is required.";
    if (!formData.get("email")) errors.email = "Email is required.";
    if (!formData.get("gcashRef")) errors.gcashRef = "GCash reference is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (bookedTimesForSelectedDate.includes(time)) {
      setGeneralError("Sorry, this time slot has just been booked. Please pick another.");
      return;
    }
    
    // TypeScript fix: We know date is defined here because of the checks above
    const safeDate = date!; 

    const data = new FormData();
    formData.forEach((value, key) => data.append(key, value));
    data.append("date", format(safeDate, "yyyy-MM-dd"));
    data.append("time", time);
    if (inspoFile) data.append("inspoFile", inspoFile);

    startTransition(async () => {
      const result = await submitBooking(data);
      if (result.success) {
        setIsSuccess(true);
      } else {
        // If the server (Zod) rejects it, we show it in the general error box
        setGeneralError(result.error || "An unknown error occurred");
      }
    });
  }

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-neutral-200 p-8 text-center mt-12 mb-8 md:mb-12 animate-in zoom-in-95">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <PartyPopper className="w-10 h-10 text-pink-500" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-3">Booking Request Sent!</h2>
        <p className="text-neutral-500 mb-8">
          We've received your request and your GCash reference. We will verify your deposit and send a confirmation email shortly.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white font-medium px-8 py-3.5 rounded-xl transition-colors w-full sm:w-auto"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // BOOKING FORM
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden mb-8 md:mb-12">
      
      {/* Header */}
      <div className="bg-neutral-50 p-6 border-b border-neutral-200 flex items-center gap-4">
        <Link href="/" className="p-2 bg-white rounded-full shadow-sm text-neutral-500 hover:text-pink-500 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-xl font-bold text-neutral-900">Book an Appointment</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Secure your slot at The Glossy Lounge</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {generalError && (
          <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-start gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{generalError}</p>
          </div>
        )}

        {/* STEP 1: Date & Time */}
        <div className="space-y-4 relative z-20">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold shadow-sm">1</span>
            <h2 className="font-semibold text-neutral-900">Select Date & Time</h2>
          </div>

          {/* Calendar */}
          <div className={`flex justify-center bg-neutral-50 rounded-2xl p-4 border overflow-hidden transition-colors ${fieldErrors.date ? 'border-red-300' : 'border-neutral-100'}`}>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setTime(""); 
                setFieldErrors(prev => ({ ...prev, date: "", time: "" }));
              }}
              disabled={{ before: new Date() }}
              className="!w-full max-w-[320px] mx-auto"
              classNames={{
                day: "h-10 w-10 text-base rounded-full hover:bg-pink-100 focus:bg-pink-100 transition-colors",
                selected: "bg-pink-500 text-white hover:bg-pink-600 focus:bg-pink-600 shadow-md shadow-pink-500/20",
              }}
            />
          </div>
          {fieldErrors.date && <p className="text-xs text-red-500 font-medium">{fieldErrors.date}</p>}

          {/* Time Slots Grid */}
          {date && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2">
              <p className="text-sm font-medium text-neutral-700 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400" /> 
                Available times for {format(date, "MMM d, yyyy")}
              </p>
              
              <div className={`grid grid-cols-2 gap-3 p-1 -m-1 rounded-xl ${fieldErrors.time ? 'border border-red-300 bg-red-50/50' : ''}`}>
                {timeSlots.map((slot) => {
                  const isBooked = bookedTimesForSelectedDate.includes(slot.value);
                  const isSelected = time === slot.value;

                  return (
                    <button
                      key={slot.value}
                      type="button"
                      disabled={isBooked}
                      onClick={() => {
                        setTime(slot.value);
                        setFieldErrors(prev => ({ ...prev, time: "" }));
                      }}
                      className={`py-3 px-2 rounded-xl text-sm font-medium border transition-all flex flex-col items-center justify-center gap-1 ${
                        isBooked 
                          ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60" 
                          : isSelected
                            ? "bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20" 
                            : "bg-white text-neutral-700 border-neutral-200 hover:border-pink-300 hover:bg-pink-50"
                      }`}
                    >
                      <span>{slot.label}</span>
                      {isBooked && <span className="text-[10px] uppercase tracking-wider font-bold">Booked</span>}
                    </button>
                  );
                })}
              </div>
              {fieldErrors.time && <p className="text-xs text-red-500 font-medium mt-2">{fieldErrors.time}</p>}
            </div>
          )}
        </div>

        <hr className="border-neutral-100" />

        {/* THE FORM STARTS HERE */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          
          {/* STEP 2: Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold shadow-sm">2</span>
              <h2 className="font-semibold text-neutral-900">Your Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  onChange={() => setFieldErrors(prev => ({ ...prev, name: "" }))}
                  placeholder="Jane Doe" 
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base transition-all ${fieldErrors.name ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`} 
                />
                {fieldErrors.name && <p className="text-xs text-red-500 font-medium">{fieldErrors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  onChange={() => setFieldErrors(prev => ({ ...prev, phone: "" }))}
                  placeholder="0912 345 6789" 
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base transition-all ${fieldErrors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`} 
                />
                {fieldErrors.phone && <p className="text-xs text-red-500 font-medium">{fieldErrors.phone}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700">Email Address *</label>
              <input 
                type="email" 
                name="email" 
                onChange={() => setFieldErrors(prev => ({ ...prev, email: "" }))}
                placeholder="jane@example.com" 
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base transition-all ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`} 
              />
              {fieldErrors.email && <p className="text-xs text-red-500 font-medium">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-700 flex justify-between">
                Instagram Handle <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input type="text" name="instagram" placeholder="@janedoe" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base transition-all" />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* STEP 3: Inspo Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold shadow-sm">3</span>
              <h2 className="font-semibold text-neutral-900">Inspiration Design</h2>
            </div>
            
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-pink-50 hover:border-pink-300 transition-all group">
              <div className="flex flex-col items-center justify-center text-neutral-500 group-hover:text-pink-600 transition-colors">
                <Upload className="w-6 h-6 mb-2" />
                <p className="text-sm font-medium">{inspoFile ? inspoFile.name : "Tap to upload a photo"}</p>
                <p className="text-xs mt-1 text-neutral-400 group-hover:text-pink-400">JPEG, PNG or WebP</p>
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
            <div className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-pink-500 text-white text-sm font-bold shadow-sm">4</span>
              <h2 className="font-semibold text-neutral-900">GCash Deposit</h2>
            </div>

            <div className="bg-pink-50/50 text-neutral-800 p-5 rounded-2xl text-sm border border-pink-100 space-y-3">
              <p>
                To secure your slot, please send a <strong>₱{settings?.deposit_amount || 200} deposit</strong> via GCash to:
              </p>
              <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
                <p className="font-bold text-lg text-pink-600 tracking-wide">{settings?.gcash_number || "0912 345 6789"}</p>
                <p className="text-xs text-neutral-500 mt-1">Account Name: {settings?.gcash_name || "Glossy Lounge"}</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="text-sm font-medium text-neutral-700">GCash Reference Number *</label>
              <input 
                type="text" 
                name="gcashRef" 
                onChange={() => setFieldErrors(prev => ({ ...prev, gcashRef: "" }))}
                placeholder="e.g. 1234 567 890123" 
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base transition-all ${fieldErrors.gcashRef ? 'border-red-300 bg-red-50' : 'border-neutral-200'}`} 
              />
              {fieldErrors.gcashRef ? (
                <p className="text-xs text-red-500 font-medium">{fieldErrors.gcashRef}</p>
              ) : (
                <p className="text-xs text-neutral-500 mt-1">Please enter the 13-digit reference number from your GCash receipt.</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
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
              className="w-full bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-300 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg select-none"
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
            <p className="text-center text-xs text-neutral-400 mt-3">
              Your slot is not confirmed until we verify your GCash deposit.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
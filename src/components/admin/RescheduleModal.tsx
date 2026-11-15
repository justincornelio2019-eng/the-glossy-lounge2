// src/components/admin/RescheduleModal.tsx
"use client";

import { useState } from "react";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import { rescheduleBooking } from "@/app/admin/(protected)/dashboard/actions";
import { Booking } from "@/types";

export function RescheduleModal({ booking, onClose }: { booking: Booking, onClose: () => void }) {
  const [date, setDate] = useState(booking.appointment_date.split("T")[0]);
  const [time, setTime] = useState(booking.appointment_time.substring(0, 5));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    const res = await rescheduleBooking(booking.id, date, time);
    setLoading(false);
    
    if (res.error) {
      setError(res.error);
    } else {
      onClose(); // Close modal on success
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-serif text-xl font-bold text-neutral-900">Reschedule</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-pink-500" /> New Date
            </label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink-500" /> New Time
            </label>
            <select 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-500 bg-white"
            >
              <option value="10:00">10:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="19:00">7:00 PM</option>
            </select>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors"
          >
            {loading ? "Saving..." : "Confirm Reschedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
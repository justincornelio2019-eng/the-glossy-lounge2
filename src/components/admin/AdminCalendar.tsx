// src/components/admin/AdminCalendar.tsx
"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface Booking {
  id: string;
  appointment_date: string;
  appointment_time: string;
  client_name: string;
  status: string;
}

export function AdminCalendar({ bookings }: { bookings: Booking[] }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedDateString = format(selectedDate, "yyyy-MM-dd");

  // Filter bookings for the selected date
  const dailyBookings = bookings.filter(
    (b) => b.appointment_date.split("T")[0] === selectedDateString
  ).sort((a, b) => a.appointment_time.localeCompare(b.appointment_time));

  return (
    <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-8">
      
      {/* Calendar side */}
      <div className="flex flex-col items-center">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(d) => d && setSelectedDate(d)}
          className="!w-full max-w-[320px] mx-auto"
          classNames={{
            day: "h-10 w-10 text-base rounded-full hover:bg-pink-100 focus:bg-pink-100 transition-colors",
            selected: "bg-pink-500 text-white hover:bg-pink-600 focus:bg-pink-600 shadow-md shadow-pink-500/20",
          }}
        />
      </div>

      {/* List side */}
      <div className="flex-1 border-t md:border-t-0 md:border-l border-neutral-200 pt-6 md:pt-0 md:pl-8">
        <h3 className="font-serif text-xl font-bold text-neutral-900 mb-4">
          Schedule for {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        
        {dailyBookings.length === 0 ? (
          <div className="text-neutral-500 text-sm py-8 text-center bg-neutral-50 rounded-2xl">
            No bookings for this day.
          </div>
        ) : (
          <div className="space-y-3">
            {dailyBookings.map((b) => (
              <div key={b.id} className="flex justify-between items-center p-3 rounded-xl border border-neutral-100 bg-neutral-50">
                <div>
                  <p className="font-semibold text-neutral-900">{b.client_name}</p>
                  <p className="text-sm text-neutral-500">{b.appointment_time}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                  b.status === "confirmed" ? "bg-green-100 text-green-700" : 
                  b.status === "pending" ? "bg-amber-100 text-amber-700" : 
                  "bg-neutral-200 text-neutral-600"
                }`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
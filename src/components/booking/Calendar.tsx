// src/components/booking/Calendar.tsx
"use client";

import { useState } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  addDays, 
  isBefore, 
  startOfToday 
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDateString: string | undefined;
  onSelectDate: (dateString: string) => void;
}

export function Calendar({ selectedDateString, onSelectDate }: CalendarProps) {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const dateStr = format(cloneDay, "yyyy-MM-dd");
      
      const isPast = isBefore(day, today);
      const isSelected = selectedDateString === dateStr;
      const isCurrentMonth = isSameMonth(day, monthStart);

      days.push(
        <div key={day.toString()} className="flex justify-center p-1">
          <button
            type="button"
            disabled={isPast || !isCurrentMonth}
            // Simple onClick. No preventDefault needed here.
            onClick={() => onSelectDate(dateStr)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors select-none
              ${!isCurrentMonth ? "text-transparent pointer-events-none" : ""}
              ${isPast ? "text-neutral-300 pointer-events-none" : "text-neutral-700 active:bg-pink-100"}
              ${isSelected ? "bg-pink-500 text-white shadow-md shadow-pink-500/20 font-bold" : ""}
            `}
          >
            {formattedDate}
          </button>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 w-full" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 relative z-20">
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={prevMonth} className="p-2 bg-white rounded-full shadow-sm hover:bg-neutral-100">
          <ChevronLeft className="w-4 h-4 text-neutral-600" />
        </button>
        <h3 className="font-medium text-neutral-900">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <button type="button" onClick={nextMonth} className="p-2 bg-white rounded-full shadow-sm hover:bg-neutral-100">
          <ChevronRight className="w-4 h-4 text-neutral-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 w-full mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-neutral-400">
            {d}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {rows}
      </div>
    </div>
  );
}
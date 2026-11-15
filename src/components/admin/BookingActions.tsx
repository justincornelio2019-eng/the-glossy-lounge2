// src/components/admin/BookingActions.tsx
"use client";

import { useState } from "react";
import { updateBookingStatus, markBookingComplete } from "@/app/admin/(protected)/dashboard/actions";
import { Loader2, CheckCircle2, XCircle, CalendarClock, RotateCcw } from "lucide-react";
import { RescheduleModal } from "./RescheduleModal";

export function BookingActions({ booking }: { booking: any }) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showReschedule, setShowReschedule] = useState(false);

  async function handleStatusChange(status: "confirmed" | "declined") {
    setIsUpdating(status);
    const result = await updateBookingStatus(booking.id, status);
    if (result.error) alert(result.error);
    setIsUpdating(null);
  }

  async function handleComplete() {
    setIsUpdating("completed");
    const result = await markBookingComplete(booking.id);
    if (result.error) alert(result.error);
    setIsUpdating(null);
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* Pending Actions */}
        {booking.status === "pending" && (
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => handleStatusChange("confirmed")}
              disabled={isUpdating !== null}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              {isUpdating === "confirmed" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Confirm
            </button>
            <button 
              onClick={() => handleStatusChange("declined")}
              disabled={isUpdating !== null}
              className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              {isUpdating === "declined" ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
              Decline
            </button>
          </div>
        )}

        {/* Confirmed Actions */}
        {booking.status === "confirmed" && (
          <>
            <button 
              onClick={handleComplete}
              disabled={isUpdating !== null}
              className="w-full bg-neutral-900 hover:bg-black text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isUpdating === "completed" ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Mark as Completed
            </button>
            <div className="flex gap-2 w-full">
              <button 
                onClick={() => setShowReschedule(true)}
                className="flex-1 bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                <CalendarClock className="w-4 h-4" /> Reschedule
              </button>
              <button 
                onClick={() => handleStatusChange("declined")}
                className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* Reschedule Modal */}
      {showReschedule && (
        <RescheduleModal booking={booking} onClose={() => setShowReschedule(false)} />
      )}
    </>
  );
}
// src/components/admin/BookingActions.tsx
"use client";

import { useState } from "react";
import { updateBookingStatus } from "@/app/admin/(protected)/dashboard/actions";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export function BookingActions({ bookingId }: { bookingId: string }) {
  const [isUpdating, setIsUpdating] = useState<"confirm" | "decline" | null>(null);

  async function handleStatusChange(status: "confirmed" | "declined") {
    setIsUpdating(status === "confirmed" ? "confirm" : "decline");
    
    const result = await updateBookingStatus(bookingId, status);
    
    if (result.error) {
      alert("Error: " + result.error);
      setIsUpdating(null);
    }
    // If successful, the page will automatically refresh via revalidatePath
  }

  return (
    <div className="flex gap-2 w-full">
      <button 
        onClick={() => handleStatusChange("confirmed")}
        disabled={isUpdating !== null}
        className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
      >
        {isUpdating === "confirm" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle2 className="w-4 h-4" />
        )}
        Confirm
      </button>
      
      <button 
        onClick={() => handleStatusChange("declined")}
        disabled={isUpdating !== null}
        className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
      >
        {isUpdating === "decline" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        Decline
      </button>
    </div>
  );
}
// src/app/admin/(protected)/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Calendar, Clock, Phone, Mail, Image as ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all bookings, newest first
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-xl">
        Error loading bookings: {error.message}
      </div>
    );
  }

  // Split into pending and processed for easier viewing
  const pendingBookings = bookings?.filter(b => b.status === "pending") || [];
  const otherBookings = bookings?.filter(b => b.status !== "pending") || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-sm text-neutral-600">
          Welcome back{user?.email ? `, ${user.email}` : ""}.
        </p>
      </div>

      {/* Pending Bookings Section */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          Pending Requests
          <span className="bg-pink-100 text-pink-700 py-0.5 px-2.5 rounded-full text-xs">
            {pendingBookings.length}
          </span>
        </h2>

        {pendingBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-neutral-200 text-center text-neutral-500">
            No pending bookings right now.
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  
                  {/* Left Side: Client Info */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-neutral-900">{booking.client_name}</h3>
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        Pending
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>{format(new Date(booking.appointment_date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                        <span>{booking.appointment_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span>{booking.client_phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                        <a href={`mailto:${booking.client_email}`} className="hover:text-pink-600 truncate">
                          {booking.client_email}
                        </a>
                      </div>
                    </div>

                    {booking.client_instagram && (
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <span className="text-neutral-400 font-medium text-xs shrink-0 w-4 text-center">IG</span>
                        <a href={`https://instagram.com/${booking.client_instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-pink-600">
                          {booking.client_instagram}
                        </a>
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                      <p className="text-xs text-neutral-500 font-medium mb-1">GCash Reference</p>
                      <p className="font-mono text-sm text-neutral-900">{booking.gcash_reference}</p>
                    </div>
                  </div>

                  {/* Right Side: Inspo Image & Actions */}
                  <div className="flex flex-col items-center justify-center gap-4 md:w-48">
                    {booking.inspo_image_url ? (
                      <a href={booking.inspo_image_url} target="_blank" rel="noreferrer" className="group relative block w-full h-32 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={booking.inspo_image_url} 
                          alt="Inspo" 
                          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </a>
                    ) : (
                      <div className="w-full h-32 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-400 text-xs">
                        No photo
                      </div>
                    )}

                    <div className="flex gap-2 w-full">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Confirm
                      </button>
                      <button className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History / Other Bookings Section */}
      {otherBookings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4 mt-8">
            Booking History
          </h2>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <ul className="divide-y divide-neutral-100">
              {otherBookings.map((booking) => (
                <li key={booking.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                  <div>
                    <p className="font-medium text-neutral-900">{booking.client_name}</p>
                    <p className="text-sm text-neutral-500">
                      {format(new Date(booking.appointment_date), "MMM d, yyyy")} at {booking.appointment_time}
                    </p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    booking.status === "confirmed" ? "bg-green-50 text-green-700 ring-green-600/20" : 
                    booking.status === "declined" ? "bg-red-50 text-red-700 ring-red-600/20" : 
                    "bg-neutral-100 text-neutral-600 ring-neutral-500/20"
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
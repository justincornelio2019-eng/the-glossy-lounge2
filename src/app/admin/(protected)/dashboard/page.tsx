// src/app/admin/(protected)/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Calendar, Clock, Phone, Mail, Image as ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import { BookingActions } from "@/components/admin/BookingActions";
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

  const pendingBookings = bookings?.filter(b => b.status === "pending") || [];
  const otherBookings = bookings?.filter(b => b.status !== "pending") || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ""}.
        </p>
      </div>

      {/* Pending Bookings Section */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          Pending Requests
          <span className="bg-pink-100 text-pink-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
            {pendingBookings.length}
          </span>
        </h2>

        {pendingBookings.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 text-center text-neutral-500 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3 opacity-50" />
            <p>You're all caught up!</p>
            <p className="text-xs text-neutral-400 mt-1">No pending booking requests right now.</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl border border-neutral-200 p-5 shadow-sm overflow-hidden relative">
                
                {/* Top Ribbon */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-400"></div>

                <div className="flex flex-col md:flex-row justify-between md:items-start gap-5 mt-2">
                  
                  {/* Left Side: Client Info */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-xl text-neutral-900 leading-tight">{booking.client_name}</h3>
                        <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-pink-500" />
                          {format(new Date(booking.appointment_date), "EEEE, MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-pink-500" />
                          {booking.appointment_time}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        Pending
                      </span>
                    </div>

                    {/* GCash Ref - Highlighted */}
                    <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-1">GCash Reference</p>
                      <p className="font-mono text-base text-neutral-900 font-bold tracking-tight">{booking.gcash_reference}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 text-sm text-neutral-600">
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
                      {booking.client_instagram && (
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 font-bold text-[10px] shrink-0 w-4 text-center">IG</span>
                          <a href={`https://instagram.com/${booking.client_instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-pink-600">
                            {booking.client_instagram}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Inspo Image & Actions */}
                  <div className="flex flex-col items-center justify-center gap-4 md:w-48 shrink-0">
                    {booking.inspo_image_url ? (
                      <a href={booking.inspo_image_url} target="_blank" rel="noreferrer" className="group relative block w-full h-36 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={booking.inspo_image_url} 
                          alt="Inspo" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </a>
                    ) : (
                      <div className="w-full h-36 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center text-neutral-400 text-xs">
                        <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
                        No photo
                      </div>
                    )}

                    {/* Client component for Confirm/Decline buttons */}
                    <BookingActions bookingId={booking.id} />
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
            Recent History
          </h2>
          <div className="grid gap-3">
            {otherBookings.map((booking) => (
              <div key={booking.id} className="bg-white p-4 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-neutral-900">{booking.client_name}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold ${
                      booking.status === "confirmed" ? "bg-green-100 text-green-700" : 
                      booking.status === "declined" ? "bg-red-100 text-red-700" : 
                      "bg-neutral-100 text-neutral-600"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    {format(new Date(booking.appointment_date), "MMM d, yyyy")} at {booking.appointment_time}
                  </p>
                </div>
                {booking.inspo_image_url && (
                  <a href={booking.inspo_image_url} target="_blank" rel="noreferrer" className="text-xs text-pink-600 hover:underline font-medium">
                    View Inspo
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
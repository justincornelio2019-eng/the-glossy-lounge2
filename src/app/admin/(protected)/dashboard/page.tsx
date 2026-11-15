// src/app/admin/(protected)/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Calendar, Clock, Phone, Mail, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { BookingActions } from "@/components/admin/BookingActions";
import { AdminCalendar } from "@/components/admin/AdminCalendar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch all bookings, sorted by date so the calendar makes sense
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-xl">
        Error loading bookings: {error.message}
      </div>
    );
  }

  // Split into three categories
  const pendingBookings = bookings?.filter(b => b.status === "pending") || [];
  const confirmedBookings = bookings?.filter(b => b.status === "confirmed") || [];
  const otherBookings = bookings?.filter(b => b.status === "declined" || b.status === "completed") || [];

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ""}.
        </p>
      </div>

      {/* NEW: Schedule Calendar */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Schedule Overview</h2>
        <AdminCalendar bookings={bookings || []} />
      </section>

      {/* Pending Bookings Section */}
      {pendingBookings.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            Pending Requests
            <span className="bg-pink-100 text-pink-700 py-0.5 px-2.5 rounded-full text-xs font-bold">
              {pendingBookings.length}
            </span>
          </h2>

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

                    <BookingActions booking={booking} />
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Confirmed Upcoming Bookings */}
      {confirmedBookings.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Upcoming Confirmed
          </h2>
          <div className="grid gap-4">
            {confirmedBookings.map((booking) => (
              <div key={booking.id} className="bg-white p-4 rounded-2xl border border-green-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <p className="font-bold text-lg text-neutral-900">{booking.client_name}</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {format(new Date(booking.appointment_date), "MMM d, yyyy")} at {booking.appointment_time}
                  </p>
                </div>
                {/* Pass the full booking object */}
                <div className="w-full md:w-64">
                  <BookingActions booking={booking} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* History / Other Bookings Section */}
      {otherBookings.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 mb-4 mt-8">
            Recent History
          </h2>
          <div className="grid gap-3">
            {otherBookings.map((booking) => (
              <div key={booking.id} className="bg-white p-4 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-80 hover:opacity-100 transition-opacity">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-neutral-900">{booking.client_name}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold ${
                      booking.status === "completed" ? "bg-neutral-200 text-neutral-600" : 
                      booking.status === "confirmed" ? "bg-green-100 text-green-700" : 
                      "bg-red-100 text-red-700"
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
        </section>
      )}
    </div>
  );
}
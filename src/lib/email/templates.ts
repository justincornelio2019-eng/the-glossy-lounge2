// src/lib/email/templates.ts
import { Booking } from "@/types";

// Changed to Partial<Booking>
export function adminBookingEmail(booking: Partial<Booking>) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2>New Booking Request! 💅</h2>
      <p><strong>Client:</strong> ${booking.client_name}</p>
      <p><strong>Date:</strong> ${booking.appointment_date} at ${booking.appointment_time}</p>
      <p><strong>Phone:</strong> ${booking.client_phone}</p>
      <p><strong>Email:</strong> ${booking.client_email}</p>
      <p><strong>GCash Ref:</strong> ${booking.gcash_reference}</p>
      
      <div style="margin-top: 20px;">
        <a href="https://the-glossy-lounge2.vercel.app/admin/dashboard" style="background-color: #ec4899; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          View Dashboard
        </a>
      </div>
    </div>
  `;
}

// Changed to Partial<Booking>
export function clientConfirmationEmail(booking: Partial<Booking>) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2>Your appointment is confirmed! ✨</h2>
      <p>Hi ${booking.client_name},</p>
      <p>We've verified your GCash deposit and your appointment at <strong>The Glossy Lounge</strong> is officially confirmed.</p>
      
      <div style="background-color: #fdf2f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Date:</strong> ${booking.appointment_date}</p>
        <p style="margin: 5px 0 0 0;"><strong>Time:</strong> ${booking.appointment_time}</p>
      </div>

      <p>If you need to reschedule, please contact us as soon as possible.</p>
      <p>See you soon!</p>
      <p>- The Glossy Lounge</p>
    </div>
  `;
}
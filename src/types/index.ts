// src/types/index.ts
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "cancelled"
  | "completed";

export interface Booking {
  id: string;
  client_name: string;
  client_phone: string;
  client_email: string;
  client_instagram: string | null;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // HH:MM
  duration_minutes: number;
  notes: string | null;
  inspo_image_url: string | null;
  gcash_reference: string | null;
  deposit_amount: number;
  status: BookingStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlockedSlot {
  id: string;
  block_date: string;
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  cloudinary_public_id: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface Settings {
  id: number;
  gcash_number: string;
  gcash_name: string;
  deposit_amount: number;
  slot_minutes: number;
  open_time: string;
  close_time: string;
  booking_enabled: boolean;
  updated_at: string;
}
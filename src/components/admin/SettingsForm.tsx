// src/components/admin/SettingsForm.tsx
"use client";

import { useState, useTransition } from "react";
import { updateSettings } from "@/app/admin/(protected)/settings/actions";
import { Loader2, Save } from "lucide-react";

// Define the proper type for settings
interface SettingsData {
  gcash_number: string;
  gcash_name: string;
  deposit_amount: number;
  open_time: string;
  close_time: string;
}

export function SettingsForm({ initialData }: { initialData: SettingsData }) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await updateSettings(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
      } else {
        setError(result.error || "Failed to save settings.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-100">
          Settings saved successfully!
        </div>
      )}

      {/* GCash Details */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">GCash Payment Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">GCash Number</label>
            <input 
              type="text" 
              name="gcash_number" 
              defaultValue={initialData.gcash_number}
              required 
              placeholder="0912 345 6789" 
              className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">Account Name</label>
            <input 
              type="text" 
              name="gcash_name" 
              defaultValue={initialData.gcash_name}
              required 
              placeholder="Glossy Lounge" 
              className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-700">Deposit Amount (₱)</label>
          <input 
            type="number" 
            name="deposit_amount" 
            defaultValue={initialData.deposit_amount}
            required 
            min="0"
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400" 
          />
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">Operating Hours</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">Opening Time</label>
            <input 
              type="time" 
              name="open_time" 
              defaultValue={initialData.open_time}
              required 
              className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-neutral-700">Closing Time</label>
            <input 
              type="time" 
              name="close_time" 
              defaultValue={initialData.close_time}
              required 
              className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400" 
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Settings
          </>
        )}
      </button>
    </form>
  );
}
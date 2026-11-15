// src/app/admin/(protected)/settings/page.tsx
import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error || !settings) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading settings. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Settings</h1>
        <p className="text-sm text-neutral-600">Manage your payment details and business hours.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
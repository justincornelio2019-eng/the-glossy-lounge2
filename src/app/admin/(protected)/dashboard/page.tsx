// src/app/admin/(protected)/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
      <p className="text-neutral-600">
        Welcome back{user?.email ? `, ${user.email}` : ""}.
      </p>
      <p className="text-sm text-neutral-400 mt-6">
        Booking calendar + gallery management coming next.
      </p>
    </div>
  );
}
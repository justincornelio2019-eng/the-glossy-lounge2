// src/app/admin/(protected)/layout.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/admin/login/actions";
import { LayoutDashboard, Image, Settings, LogOut, Sparkles } from "lucide-react";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense in depth — middleware should already catch this
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold text-neutral-900"
          >
            <Sparkles className="w-5 h-5 text-pink-500" />
            The Glossy Lounge
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-sm text-neutral-500">
              {user.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Nav tabs */}
        <nav className="max-w-6xl mx-auto px-4 flex gap-1 -mb-px">
          <AdminNavLink href="/admin/dashboard" icon={<LayoutDashboard className="w-4 h-4" />}>
            Dashboard
          </AdminNavLink>
          <AdminNavLink href="/admin/gallery" icon={<Image className="w-4 h-4" />}>
            Gallery
          </AdminNavLink>
          <AdminNavLink href="/admin/settings" icon={<Settings className="w-4 h-4" />}>
            Settings
          </AdminNavLink>
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

// Small client component for active link highlighting
import { AdminNavLink } from "@/components/admin/AdminNavLink";
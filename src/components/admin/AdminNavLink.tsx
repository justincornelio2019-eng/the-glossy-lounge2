// src/components/admin/AdminNavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? "border-pink-500 text-pink-600"
          : "border-transparent text-neutral-600 hover:text-neutral-900"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
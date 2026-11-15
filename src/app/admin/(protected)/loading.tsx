// src/app/admin/(protected)/loading.tsx
import { Sparkles } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-50/90 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-pink-600 animate-pulse font-serif">
        Loading Dashboard...
      </p>
    </div>
  );
}
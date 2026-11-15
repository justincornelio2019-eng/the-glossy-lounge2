// src/components/admin/DeleteImageButton.tsx
"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteGalleryImage } from "@/app/admin/(protected)/gallery/actions";

export function DeleteImageButton({ id, publicId }: { id: string; publicId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this photo? This cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteGalleryImage(id, publicId);
    
    if (result.error) {
      alert(result.error);
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50 shadow-md"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
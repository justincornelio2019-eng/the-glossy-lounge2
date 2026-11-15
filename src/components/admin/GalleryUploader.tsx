// src/components/admin/GalleryUploader.tsx
"use client";

import { useState, useTransition } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadGalleryImage } from "@/app/admin/(protected)/gallery/actions";

export function GalleryUploader() {
  const [isPending, startTransition] = useTransition();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleUpload(formData: FormData) {
    setError(null);
    setSuccess(false);

    if (!file) {
      setError("Please select an image first.");
      return;
    }

    formData.append("file", file);
    formData.append("caption", caption);

    startTransition(async () => {
      const result = await uploadGalleryImage(formData);
      if (result.success) {
        setSuccess(true);
        setFile(null);
        setCaption("");
        // Reset the input field
        const fileInput = document.getElementById("file-upload") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        setError(result.error || "Failed to upload image.");
      }
    });
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">Upload New Work</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-xl">
          Image uploaded successfully!
        </div>
      )}

      <form action={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Photo
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Caption (Optional)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g., Chrome French Tips"
            className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || !file}
          className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload to Gallery
            </>
          )}
        </button>
      </form>
    </div>
  );
}
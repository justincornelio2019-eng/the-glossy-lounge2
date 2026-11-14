// src/app/admin/login/page.tsx
import { login } from "./actions";
import { Lock } from "lucide-react";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; next?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const errorMessage = params.error;
  const next = params.next ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 mb-4">
            <Lock className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">
            The Glossy Lounge
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Admin Portal</p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
            {errorMessage === "missing_fields"
              ? "Please fill in both email and password."
              : decodeURIComponent(errorMessage)}
          </div>
        )}

        {/* Form */}
        <form
          action={login}
          className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 space-y-4"
        >
          <input type="hidden" name="next" value={next} />

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400 mt-6">
          Forgot your password? Contact your developer to reset it.
        </p>
      </div>
    </div>
  );
}
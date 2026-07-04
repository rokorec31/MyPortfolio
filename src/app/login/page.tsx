"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { isAdminEmail } from "@/lib/admin";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    if (isAdminEmail(user.email)) {
      router.replace("/admin");
    } else {
      router.replace("/unauthorized");
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect handled by the effect above once auth state updates
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      // User closing the popup is not an error worth showing
      if (!message.includes("popup-closed-by-user")) {
        setError(message);
      }
      setSigningIn(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="glass-card fade-in-up relative w-full max-w-md overflow-hidden rounded-3xl p-8 md:p-10">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-[#7796ff]/10 blur-[80px]" />
        <h1 className="relative z-10 text-2xl font-bold tracking-tight">
          Admin Login
        </h1>
        <p className="relative z-10 mt-2 text-sm text-[#798093]">
          Sign in with an authorized Google account to manage projects.
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={signingIn || loading}
          className="relative z-10 mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#7796ff]/40 hover:bg-white/10 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {/* Google G logo */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.57 5.57 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.29A7.19 7.19 0 0 1 4.9 12c0-.8.14-1.57.37-2.29V6.62H1.29a11.99 11.99 0 0 0 0 10.76l3.98-3.09z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
            />
          </svg>
          {signingIn ? "Signing in..." : "Sign in with Google"}
        </button>

        {error && (
          <p className="relative z-10 mt-4 text-sm text-[#ff6568]">{error}</p>
        )}
      </div>
    </div>
  );
}

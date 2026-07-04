"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function UnauthorizedPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="glass-card fade-in-up w-full max-w-md rounded-3xl p-8 text-center md:p-10">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-[#ff6568]/30 bg-[#ff6568]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff6568"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#798093]">
          {user?.email ? (
            <>
              <span className="text-[#c3c8d6]">{user.email}</span> is not
              authorized to access the admin panel.
            </>
          ) : (
            "This account is not authorized to access the admin panel."
          )}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => signOut()}
            className="rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Sign out
          </button>
          <Link
            href="/"
            className="rounded-full bg-[#7796ff] px-6 py-2.5 text-sm font-medium text-[#fcfcfc] transition-colors hover:bg-[#8ba5ff]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

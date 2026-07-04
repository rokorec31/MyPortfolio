"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (!isAdmin) {
      router.replace("/unauthorized");
    }
  }, [user, loading, isAdmin, router]);

  // Block rendering until auth is confirmed — prevents admin UI flash
  if (loading || !user || !isAdmin) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[#6b6157]">
          <div className="size-4 animate-spin rounded-full border-2 border-[#e85d3d]/30 border-t-[#e85d3d]" />
          Verifying access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

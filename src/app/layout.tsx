import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyPortfolio",
  description: "Personal portfolio — projects, experiments, and writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="noise-overlay min-h-full flex flex-col">
        <div className="aurora-bg" aria-hidden>
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
        </div>
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <footer className="border-t border-white/10 py-8 text-center text-sm text-neutral-500">
            © {new Date().getFullYear()} MyPortfolio. All rights reserved.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

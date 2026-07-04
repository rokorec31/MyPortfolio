import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Ethan 洪毅 | Full-stack Developer",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="noise-overlay min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <footer className="border-t border-[#1a1712]/10 py-8 text-center text-sm text-[#6b6157]">
            © {new Date().getFullYear()} Ethan. All rights reserved.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

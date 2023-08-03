import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Receipt Tracker",
  description: "Track grocery prices. They be ridiculous.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <Providers>
          <body className="min-h-screen pt-12 antialiased  ">
            <Navbar />
            <div className="container mx-auto h-full max-w-7xl pt-12">
              {children}
            </div>
            <Toaster />
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}

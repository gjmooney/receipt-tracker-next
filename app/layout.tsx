import Navbar from "@/components/Navbar";

import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
        <QueryProvider>
          <body className="min-h-screen pt-12 antialiased  ">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <div className="container mx-auto h-full max-w-7xl pt-12">
                {children}
              </div>
              <Toaster />
            </ThemeProvider>
          </body>
        </QueryProvider>
      </html>
    </ClerkProvider>
  );
}

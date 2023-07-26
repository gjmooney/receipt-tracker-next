import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
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
        <body className="min-h-screen pt-12 antialiased  ">
          <Navbar />
          <div className="container mx-auto h-full max-w-7xl pt-12">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

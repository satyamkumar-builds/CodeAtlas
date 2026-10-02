import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeAtlas — by Satyam Kumar",
  description:
    "A structured map from Computer Science fundamentals to AI Engineering. 31 curated courses, 1,900+ lessons, practice systems, projects and progress tracking.",
  keywords: ["CodeAtlas", "Computer Science", "DSA", "AI Engineering", "Learning Platform", "Satyam Kumar"],
  authors: [{ name: "Satyam Kumar" }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23101613'/%3E%3Cpath d='M16 6c-4.5 3.2-7 7-7 11.2 0 3.2 1.8 5.6 4.2 5.6 1.4 0 2.2-.7 2.8-2 .6 1.3 1.4 2 2.8 2 2.4 0 4.2-2.4 4.2-5.6C23 13 20.5 9.2 16 6z' fill='%2310b981'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "The Glossy Lounge | Nail Salon in Manila",
  description: "Book your next nail appointment at The Glossy Lounge. Premium nail art, gel extensions, and self-care in Sampaloc, Manila.",
  keywords: ["nail salon", "manila", "sampaloc", "nail art", "gel extensions", "The Glossy Lounge"],
  
  // Open Graph (for Facebook, Messenger, iMessage previews)
  openGraph: {
    title: "The Glossy Lounge",
    description: "Where your nails get their glow. Book your next appointment online.",
    url: "https://the-glossy-lounge2.vercel.app",
    siteName: "The Glossy Lounge",
    locale: "en_PH",
    type: "website",
  },
};

// This colors the top bar of the phone browser to match the brand
export const viewport: Viewport = {
  themeColor: "#ec4899", // Tailwind pink-500
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  );
}
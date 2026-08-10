import type { Metadata } from "next";
import "./globals.css";
import { HotelProvider } from "@/context/HotelContext";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import HeaderNavbar from "@/components/navigation/HeaderNavbar";
import ElegantFooter from "@/components/layout/ElegantFooter";
import { Playfair_Display, Geist, Geist_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-display',
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans-ui',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-tech',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AETHERIS CITADEL | Futuristic Luxury Hotel",
  description: "Experience the pinnacle of hospitality suspended in orbit. Cinematic luxury chambers, quantum AI assistance, and deep-space wellness nodes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f4f4f6] font-sans">
        <HotelProvider>
          <SmoothScrollProvider>
            <HeaderNavbar />
            <div className="flex flex-col flex-1">
              {children}
            </div>
            <ElegantFooter />
          </SmoothScrollProvider>
        </HotelProvider>
      </body>
    </html>
  );
}
export type LayoutProps<T> = {
  children: React.ReactNode;
  params: T;
};

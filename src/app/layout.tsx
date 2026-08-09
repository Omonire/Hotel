import type { Metadata } from "next";
import "./globals.css";
import { HotelProvider } from "@/context/HotelContext";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import HeaderNavbar from "@/components/navigation/HeaderNavbar";
import ElegantFooter from "@/components/layout/ElegantFooter";

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
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f4f4f6]">
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

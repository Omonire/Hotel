'use client';

import React, { useState } from 'react';
import { useHotel } from '@/context/HotelContext';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Sparkles, Users, Maximize, ArrowLeft, ShieldAlert, Cpu, Calendar } from 'lucide-react';

export default function RoomDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { roomTypes } = useHotel();
  const roomType = roomTypes.find((rt) => rt.id === id);

  const [activeImg, setActiveImg] = useState<string>(roomType?.images[0] || '');

  if (!roomType) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-12 h-12 text-gold-400 mb-4 animate-bounce" />
        <h1 className="font-sans text-xl font-bold uppercase text-white tracking-widest mb-2">Chamber Not Found</h1>
        <p className="text-xs text-white/50 mb-6">The requested room chamber registry is invalid or offline.</p>
        <Link href="/rooms" className="px-6 py-2 rounded-full border border-gold-400 text-gold-300 text-xs tracking-widest uppercase hover:bg-gold-400/10 transition-all">
          Return to Registry
        </Link>
      </div>
    );
  }

  // Fallback for default state
  if (!activeImg && roomType.images.length > 0) {
    setActiveImg(roomType.images[0]);
  }

  return (
    <main className="min-h-screen bg-obsidian-950 pt-32 pb-24 px-6 md:px-12">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs tracking-widest text-white/50 hover:text-white uppercase mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Chamber Registry
        </Link>

        {/* Cinematic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Premium Interactive Cinematic Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 glow-ambient">
              <Image
                src={activeImg}
                alt={roomType.name}
                fill
                className="object-cover transition-all duration-700 brightness-95"
                sizes="(max-width: 1200px) 100vw, 800px"
                priority
              />
            </div>
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {roomType.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                    activeImg === img ? 'border-gold-300 ring-1 ring-gold-300' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Image src={img} alt={`${roomType.name} thumbnail ${idx}`} fill className="object-cover" sizes="150px" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold-400/10 border border-gold-400/20 w-fit mb-4">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span className="font-mono text-[9px] tracking-wider uppercase text-gold-200">
                  {roomType.code} Premium Chamber
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-medium text-white tracking-tight mb-4 leading-tight">
                {roomType.name}
              </h1>

              <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                {roomType.description}
              </p>

              {/* Spatial Technical Specs */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-6 mb-8">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">MAX CAPACITY</span>
                  <span className="font-sans text-sm font-bold text-white flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold-300" />
                    {roomType.max_capacity} Guests
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">SPATIAL SIZE</span>
                  <span className="font-sans text-sm font-bold text-white flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-gold-300" />
                    {roomType.size_sqm} m²
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">BED TYPE</span>
                  <span className="font-sans text-sm font-bold text-white leading-tight">
                    {roomType.bed_type}
                  </span>
                </div>
              </div>

              {/* Dynamic Curated Amenities list */}
              <div className="flex flex-col gap-3 mb-8">
                <h4 className="font-mono text-[9px] tracking-widest text-white/40 uppercase">CHAMBER FEATURES</h4>
                <div className="grid grid-cols-2 gap-3">
                  {roomType.amenities.map((am) => (
                    <div key={am} className="flex items-center gap-2 text-xs text-white/80">
                      <Cpu className="w-3.5 h-3.5 text-gold-400" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Booking Drawer card */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 glow-ambient flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col">
                <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">RESERVATION PRICE</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-sans text-2xl font-black text-gold-300">Ω{roomType.base_price}</span>
                  <span className="font-mono text-[9px] text-white/30">/ night</span>
                </div>
              </div>
              <Link
                href={`/book?roomType=${roomType.id}`}
                className="w-full md:w-auto px-8 py-3.5 rounded bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export type PageProps<T> = {
  params: T;
  searchParams: Record<string, string | string[] | undefined>;
};

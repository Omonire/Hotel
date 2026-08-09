'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RoomType } from '@/types';
import { Sparkles, Users, Compass, Eye } from 'lucide-react';

interface RoomCardProps {
  roomType: RoomType;
}

export default function RoomCard({ roomType }: RoomCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-panel hover:border-gold-300/40 transition-all duration-500 glow-ambient hover:shadow-[0_0_40px_rgba(202,152,85,0.15)] h-full">
      {/* Cinematic Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={roomType.images[0]}
          alt={roomType.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Futuristic Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-gold-300/20">
            <Sparkles className="w-3 h-3 text-gold-300" />
            <span className="font-mono text-[9px] tracking-wider uppercase text-gold-200">
              {roomType.code}
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded">
          <span className="font-mono text-[9px] text-white/50 tracking-wider">
            {roomType.size_sqm} m²
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-sans text-lg font-bold tracking-wide text-white group-hover:text-gold-300 transition-colors duration-300">
            {roomType.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">From</span>
            <span className="font-sans text-xl font-black text-gold-300 tracking-tight">
              Ω{roomType.base_price}
            </span>
            <span className="font-mono text-[8px] text-white/30 tracking-wider">/ night</span>
          </div>
        </div>

        <p className="text-xs text-white/50 leading-relaxed font-light mb-5 line-clamp-2">
          {roomType.description}
        </p>

        {/* Highlight Specifications */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-white/[0.02] rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-gold-400/60" />
            <span className="font-sans text-[10px] text-white/60">
              Capacity: {roomType.max_capacity} Guests
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-gold-400/60" />
            <span className="font-sans text-[10px] text-white/60">
              {roomType.view_type.split(' ')[0]} View
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
          <Link
            href={`/rooms/${roomType.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 text-white/80 hover:text-white transition-all text-[11px] tracking-wider uppercase font-semibold"
          >
            <Eye className="w-3.5 h-3.5" />
            Specs
          </Link>
          <Link
            href={`/book?roomType=${roomType.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded bg-gold-400 hover:bg-gold-300 text-black font-semibold text-[11px] tracking-wider uppercase transition-all duration-300"
          >
            Direct Reserv
          </Link>
        </div>
      </div>
    </div>
  );
}

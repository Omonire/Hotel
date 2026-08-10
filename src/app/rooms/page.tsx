'use client';

import React, { useState } from 'react';
import { useHotel } from '@/context/HotelContext';
import RoomCard from '@/components/rooms/RoomCard';
import { Sparkles, SlidersHorizontal, Search, Star } from 'lucide-react';

export default function RoomsPage() {
  const { roomTypes } = useHotel();
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [capacity, setCapacity] = useState<string>('all');

  const filteredRoomTypes = roomTypes.filter((rt) => {
    const matchesSearch = rt.name.toLowerCase().includes(search.toLowerCase()) ||
                          rt.description.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = rt.base_price <= maxPrice;
    const matchesCapacity = capacity === 'all' || rt.max_capacity >= parseInt(capacity);
    return matchesSearch && matchesPrice && matchesCapacity;
  });

  return (
    <main className="min-h-screen bg-obsidian-950 pt-32 pb-24 px-6 md:px-12">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center md:text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold-200">
              Chamber Registry
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
            Our Sacred Sanctuaries
          </h1>
          <p className="max-w-xl text-sm text-white/60 leading-relaxed font-light">
            Bespoke high-atmosphere architectural retreats designed for ultimate tranquility and deep rejuvenation. Select your ideal orbital sanctuary below.
          </p>
        </div>

        {/* Interactive Filter Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl glass-panel">
          {/* Search Input */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Search Sanctuary</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nebula, Sanctuary..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/40 border border-white/10 hover:border-gold-400/30 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none transition-colors"
              />
              <Search className="absolute right-3 top-3 w-4 h-4 text-white/30" />
            </div>
          </div>

          {/* Max Pricing Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Max Energy Price</label>
              <span className="font-mono text-xs text-gold-300">Ω{maxPrice}</span>
            </div>
            <input
              type="range"
              min="500"
              max="4000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-gold-400 cursor-pointer py-2 bg-transparent"
            />
          </div>

          {/* Capacity Filter */}
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Minimum Occupants</label>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full bg-black/40 border border-white/10 hover:border-gold-400/30 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="all" className="bg-obsidian-900">Any capacity</option>
              <option value="2" className="bg-obsidian-900">2+ Occupants</option>
              <option value="4" className="bg-obsidian-900">4+ Occupants</option>
            </select>
          </div>

          {/* Quick HUD Diagnostic Stats */}
          <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-6 justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">CHAMBERS MATCHED</span>
              <span className="font-sans text-2xl font-black text-white">{filteredRoomTypes.length}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-mono text-[8px] tracking-widest text-white/40 uppercase">PROTOCOLS ENABLED</span>
              <span className="font-mono text-[9px] text-gold-400 flex items-center gap-1 justify-end">
                <Star className="w-3 h-3 fill-gold-400" />
                Adaptive AI
              </span>
            </div>
          </div>
        </div>

        {/* Chambers Grid Layout */}
        {filteredRoomTypes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoomTypes.map((rt) => (
              <div key={rt.id} className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                <RoomCard roomType={rt} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-white/10">
            <SlidersHorizontal className="w-8 h-8 text-white/20 mx-auto mb-4" />
            <h3 className="font-sans text-base font-bold text-white uppercase mb-1">No Matching Chambers</h3>
            <p className="text-xs text-white/45">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </main>
  );
}

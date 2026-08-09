'use client';

import React from 'react';
import { useHotel } from '@/context/HotelContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, CalendarRange, KeyRound, DollarSign, Activity, Hotel, Info } from 'lucide-react';

export default function AdminDashboardPage() {
  const { stats, rooms, bookings } = useHotel();

  // Cards summary config
  const summaryCards = [
    {
      title: 'Current Occupancy',
      value: `${stats.occupancy_rate}%`,
      subtitle: `${rooms.filter(r => r.status === 'occupied').length} of ${rooms.length} rooms occupied`,
      icon: Hotel,
      color: 'text-gold-300'
    },
    {
      title: 'Active Bookings',
      value: stats.active_bookings_count,
      subtitle: 'Confirmed or Checked-in',
      icon: CalendarRange,
      color: 'text-emerald-400'
    },
    {
      title: 'Available Rooms',
      value: stats.available_rooms_count,
      subtitle: `${stats.dirty_rooms_count} dirty, ${stats.maintenance_rooms_count} in maint`,
      icon: KeyRound,
      color: 'text-blue-400'
    },
    {
      title: 'Gross System Revenue',
      value: `Ω${stats.revenue_summary.total.toLocaleString()}`,
      subtitle: `Ω${stats.revenue_summary.rooms.toLocaleString()} rooms, Ω${stats.revenue_summary.services.toLocaleString()} services`,
      icon: DollarSign,
      color: 'text-gold-300'
    }
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const activeArrivals = bookings.filter(b => b.check_in_date === todayStr);
  const activeDepartures = bookings.filter(b => b.check_out_date === todayStr);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gold-400/10 border border-gold-400/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold-200">System diagnostics</span>
          </div>
          <h1 className="font-sans text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Overview Terminal</h1>
        </div>
        <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-lg px-4 py-2 text-xs text-white/60 font-mono">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>REALTIME SYNCHRONICITY ACTIVE</span>
        </div>
      </div>

      {/* Overview stats cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div key={idx} className="rounded-xl glass-panel p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">{card.title}</span>
                <IconComp className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-2xl font-black text-white tracking-tight">{card.value}</span>
                <span className="font-sans text-[10px] text-white/40 leading-snug">{card.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Chart and Realtime Arrivals list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Area Chart for system revenue */}
        <div className="lg:col-span-8 rounded-xl glass-panel p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-sm font-bold tracking-wider uppercase text-white">Quantum Revenue Stream</h3>
            <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Past 7 cycles</span>
          </div>

          <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenue_summary.daily} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ca9855" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ca9855" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1b1b26" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" stroke="#f4f4f6" fontSize={9} tickLine={false} opacity={0.3} />
                <YAxis stroke="#f4f4f6" fontSize={9} tickLine={false} axisLine={false} opacity={0.3} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0f', borderColor: 'rgba(218, 183, 129, 0.2)', borderRadius: '8px' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#dab781', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#dab781" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Realtime desk action items */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-xl glass-panel p-6 flex flex-col gap-4 h-full">
            <h3 className="font-sans text-sm font-bold tracking-wider uppercase text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-gold-300" /> Today&apos;s Traffic Desk
            </h3>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="font-sans text-xs text-white/60">Expected Arrivals</span>
                <span className="px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-mono text-[10px] font-bold">
                  {activeArrivals.length} Direct
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="font-sans text-xs text-white/60">Expected Departures</span>
                <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 font-mono text-[10px] font-bold">
                  {activeDepartures.length} Direct
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">System Quick Info</span>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg flex items-start gap-2 text-[10px] text-white/50 leading-relaxed">
                <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Verify direct reservations and room dirty status periodically via the side control desks. Clean rooms can receive occupants instantly.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

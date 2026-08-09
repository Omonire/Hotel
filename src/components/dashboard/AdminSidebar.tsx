'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LayoutDashboard, KeyRound, CalendarCheck, UsersRound, ArrowLeftRight } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Core Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Room Desks', href: '/admin/rooms', icon: KeyRound },
    { name: 'Reservations', href: '/admin/reservations', icon: CalendarCheck },
    { name: 'Staff Control', href: '/admin/staff', icon: UsersRound },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 glass-panel border-r border-white/5 lg:min-h-[calc(100vh-100px)] p-6 flex flex-col gap-8 rounded-2xl">
      <div className="flex items-center gap-3 border-b border-white/5 pb-6">
        <div className="w-8 h-8 rounded bg-gold-400/10 border border-gold-300 flex items-center justify-center">
          <Shield className="w-4 h-4 text-gold-300 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-xs font-black tracking-widest text-white uppercase">AETHERIS CORE</span>
          <span className="font-mono text-[8px] text-gold-400 uppercase tracking-widest">STAFF INTERFACE</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-xs tracking-widest uppercase transition-all ${
                active
                  ? 'bg-gold-400 text-black font-bold border border-gold-400 shadow-[0_0_15px_rgba(202,152,85,0.15)]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Diagnostic parameters */}
      <div className="mt-auto border-t border-white/5 pt-6 hidden lg:flex flex-col gap-3">
        <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-white/30 uppercase">
          <span>Ledger Protocol</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ArrowLeftRight className="w-3 h-3" />
            ONLINE
          </span>
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-white/30 uppercase">
          <span>AI Butler Node</span>
          <span className="text-gold-400">ACTIVE-S9</span>
        </div>
      </div>
    </aside>
  );
}

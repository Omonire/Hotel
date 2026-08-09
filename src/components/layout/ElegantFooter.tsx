'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function ElegantFooter() {
  return (
    <footer className="relative bg-obsidian-950 border-t border-gold-400/10 py-16 px-6 md:px-12 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Description */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Landmark className="w-5 h-5 text-gold-300" />
            <div className="flex flex-col">
              <span className="font-sans text-base font-bold tracking-[0.25em] text-gold-300">
                AETHERIS
              </span>
              <span className="font-mono text-[7px] tracking-[0.4em] text-white/40">
                CITADEL
              </span>
            </div>
          </Link>
          <p className="text-xs text-white/40 leading-relaxed max-w-sm">
            Experience the future of luxurious hospitality. Suspended in orbit, Aetheris Citadel combines multi-layered architectural brilliance with quantum wellness features.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xs tracking-widest uppercase font-semibold text-gold-300">Sanctuary Nodes</h4>
          <ul className="flex flex-col gap-2.5 text-xs text-white/50">
            <li><Link href="/" className="hover:text-white transition-colors">Orbit Center</Link></li>
            <li><Link href="/rooms" className="hover:text-white transition-colors">Chamber Registry</Link></li>
            <li><Link href="/#experiences" className="hover:text-white transition-colors">Astral Wellness</Link></li>
            <li><Link href="/book" className="hover:text-white transition-colors">Direct Entry Protocol</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xs tracking-widest uppercase font-semibold text-gold-300">Communications</h4>
          <ul className="flex flex-col gap-3 text-xs text-white/50">
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-400/60" />
              <span>reservations@aetheriscitadel.io</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400/60" />
              <span>+44 20 7946 0958</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-400/60" />
              <span>Apex Altitude, Sector-9 Grid</span>
            </li>
          </ul>
        </div>

        {/* Operational Staff Portal */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-xs tracking-widest uppercase font-semibold text-gold-300">Administration</h4>
          <p className="text-xs text-white/40 leading-relaxed">
            Authorized personnel only. Access terminal protocols and booking registries.
          </p>
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded border border-white/5 hover:border-gold-400/20 bg-white/[0.02] text-[10px] tracking-widest uppercase text-white/60 hover:text-gold-300 transition-all w-fit"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Terminal Access
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest uppercase text-white/30 relative z-10">
        <span>© {new Date().getFullYear()} AETHERIS CITADEL INC. ALL RIGHTS PRESERVED.</span>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Orbital Codes</Link>
          <Link href="#" className="hover:text-white transition-colors">Quantum Security</Link>
        </div>
      </div>
    </footer>
  );
}

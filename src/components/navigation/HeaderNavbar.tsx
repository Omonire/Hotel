'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarRange, Shield, Menu, X, Landmark } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function HeaderNavbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Sanctuary', href: '/' },
    { name: 'Discover Rooms', href: '/rooms' },
    { name: 'Experiences', href: '/#experiences' },
    { name: 'Reserve', href: '/book' },
  ];

  const isAdmin = pathname?.startsWith('/admin');

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'py-4 bg-obsidian-950/80 backdrop-blur-md border-b border-gold-400/10'
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Futuristic Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Landmark className="w-6 h-6 text-gold-300 transition-transform duration-500 group-hover:rotate-45" />
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-[0.25em] text-gold-300 group-hover:text-gold-100 transition-colors">
              AETHERIS
            </span>
            <span className="font-mono text-[8px] tracking-[0.4em] text-white/40">
              CITADEL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-xs tracking-[0.15em] uppercase transition-all duration-300 relative py-1 ${
                  active ? 'text-gold-300 font-medium' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-500 origin-center ${
                  active ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Dynamic CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-gold-400/30 text-[10px] tracking-widest uppercase transition-all duration-300 ${
              isAdmin ? 'bg-gold-400/10 text-gold-300 border-gold-400/20' : 'text-white/60 hover:text-white'
            }`}
          >
            <Shield className="w-3 h-3" />
            Terminal
          </Link>
          <Link
            href="/book"
            className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-sans text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 group shadow-[0_0_20px_rgba(202,152,85,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <CalendarRange className="w-3.5 h-3.5" />
              BOOK YOUR STAY
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/80 hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-obsidian-950/95 backdrop-blur-xl z-40 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-8 gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-sans text-sm tracking-[0.2em] uppercase text-white/80 hover:text-gold-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-[1px] bg-white/5 my-2" />
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 text-white/60 hover:text-gold-300 text-xs tracking-wider uppercase transition-colors"
            >
              <Shield className="w-4 h-4" />
              Staff Dashboard Terminal
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all"
            >
              BOOK YOUR STAY
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

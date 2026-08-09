'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D Canvas component to ensure no SSR/hydration mismatches on ThreeJS
const HeroCanvas = dynamic(() => import('./HeroCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950/20">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic intro sequence timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    )
    .fromTo(
      [titleLine1Ref.current, titleLine2Ref.current],
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1.6 },
      '-=0.4'
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      '-=1.0'
    )
    .fromTo(
      ctaRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 },
      '-=0.8'
    )
    .fromTo(
      scrollIndicatorRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, repeat: -1, yoyo: true },
      '-=0.4'
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-obsidian-950 overflow-hidden pt-20"
    >
      {/* Immersive Dark Cosmic Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-obsidian-800 via-obsidian-950 to-black pointer-events-none" />

      {/* 3D Core Layer */}
      <HeroCanvas />

      {/* Elegant HUD Overlay Elements */}
      <div className="absolute top-28 left-6 md:left-12 hidden lg:flex flex-col gap-1 z-10 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.3em] text-gold-300 uppercase">SYS STATUS</span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">GRAVITY: 1.0G (Adaptive)</span>
      </div>

      <div className="absolute top-28 right-6 md:right-12 hidden lg:flex flex-col gap-1 text-right z-10 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.3em] text-gold-300 uppercase">COORD MATRIX</span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">ALT: 400KM / APEX GRID</span>
      </div>

      {/* Main Content Interface */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Sparkle Subhead */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold-200">
            Now Boarding Orbital Sector-9
          </span>
        </div>

        {/* Title Lines with Masking */}
        <div className="overflow-hidden mb-1">
          <h1
            ref={titleLine1Ref}
            className="font-sans text-5xl md:text-8xl font-black tracking-[-0.02em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60"
          >
            AETHERIS
          </h1>
        </div>

        <div className="overflow-hidden mb-6">
          <h2
            ref={titleLine2Ref}
            className="font-sans text-4xl md:text-7xl font-light tracking-[0.18em] leading-none text-gold-300 uppercase"
          >
            CITADEL
          </h2>
        </div>

        <p
          ref={subtitleRef}
          className="max-w-xl text-sm md:text-base text-white/50 tracking-wide font-sans leading-relaxed mb-10"
        >
          A masterpiece of multiversal architecture suspended in the high atmosphere. Explore our bespoke anti-gravity sanctuaries, intelligent AI butler services, and unparalleled deep cosmic tranquility.
        </p>

        {/* Core CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/rooms"
            className="px-8 py-3.5 rounded-full border border-gold-300 hover:border-gold-100 bg-transparent text-gold-300 hover:text-gold-100 font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 flex items-center gap-2 group"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            Explore Chambers
          </Link>
          <Link
            href="/book"
            className="px-8 py-3.5 rounded-full bg-gold-300 hover:bg-gold-200 text-black font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-[0_0_30px_rgba(202,152,85,0.3)] hover:shadow-[0_0_40px_rgba(202,152,85,0.5)]"
          >
            Direct Entry Protocol
          </Link>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none cursor-pointer"
      >
        <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/30">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-gold-300/60" />
      </div>
    </section>
  );
}

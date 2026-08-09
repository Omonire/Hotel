'use client';

import React from 'react';
import PremiumHero from '@/components/hero/PremiumHero';
import Link from 'next/link';
import Image from 'next/image';
import { useHotel } from '@/context/HotelContext';
import { Sparkles, ArrowRight, Star, Cpu, Wind } from 'lucide-react';

export default function Home() {
  const { roomTypes } = useHotel();

  const luxuryExperiences = [
    {
      title: 'ASTRAL WELLNESS DECK',
      desc: 'Experience pure weightlessness with our specialized anti-gravity float chambers and sub-zero cellular regeneration protocols.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'METEOR SHIELD OBS Lounge',
      desc: 'Sip on crystal molecular drinks while viewing deep starfield displays behind dynamic atmospheric particle deflectors.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'QUANTUM GASTRONOMY',
      desc: 'Five-star atomic fusion cuisine formulated in cooperation with general cybernetic intelligence culinary units.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <main className="min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Spectacular cinematic hero */}
      <PremiumHero />

      {/* Intro section */}
      <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-obsidian-950 to-black">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-gold-400/5 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold-200">The Sanctuary Manifest</span>
          </div>

          <h2 className="font-sans text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            A DEVIATION FROM THE ORDINARY
          </h2>

          <p className="max-w-2xl text-sm md:text-base text-white/50 leading-relaxed font-light mb-12">
            Aetheris Citadel represents the absolute peak of human orbital habitation. Engineered with high-strength thermal crystalline plates and utilizing quantum particle stability loops, each sanctuary provides an expensive, immersive deep-space rest experience.
          </p>

          {/* Core values HUD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-b border-white/5 py-12">
            <div className="flex flex-col items-center gap-3">
              <Cpu className="w-6 h-6 text-gold-300" />
              <h4 className="font-sans text-xs tracking-widest font-bold text-white uppercase">ADAPTIVE INTELLIGENCE</h4>
              <p className="text-[11px] text-white/40 max-w-xs">Your personal digital butler customizes spatial climate, gravity adjustments, and circadian light levels.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Star className="w-6 h-6 text-gold-300" />
              <h4 className="font-sans text-xs tracking-widest font-bold text-white uppercase">EXPENSIVE ELEGANCE</h4>
              <p className="text-[11px] text-white/40 max-w-xs">Plush zero-G bedding systems, real-time stellar backdrops, and raw obsidian architecture.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Wind className="w-6 h-6 text-gold-300" />
              <h4 className="font-sans text-xs tracking-widest font-bold text-white uppercase">QUANTUM SANCTITY</h4>
              <p className="text-[11px] text-white/40 max-w-xs">Complete atmospheric isolation with sub-atomic filtration blocks ensuring unparalleled deep breathing rest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured rooms carousel preview */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-gold-300 uppercase">EXPERIENCE COMFORT</span>
              <h2 className="font-sans text-3xl md:text-5xl font-black text-white uppercase tracking-tight mt-1">CURATED CHAMBERS</h2>
            </div>
            <Link
              href="/rooms"
              className="text-xs tracking-widest uppercase text-gold-300 hover:text-white flex items-center gap-2 font-bold transition-colors mt-4 md:mt-0"
            >
              Chamber Registry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((rt) => (
              <div key={rt.id} className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.01] hover:border-gold-300/20 transition-all flex flex-col justify-between">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={rt.images[0]} alt={rt.name} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-sans text-base font-bold text-white uppercase mb-2">{rt.name}</h3>
                    <p className="text-[11px] text-white/45 leading-relaxed font-light line-clamp-3 mb-6">{rt.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="font-sans text-sm font-bold text-gold-300">Ω{rt.base_price} <span className="font-mono text-[9px] text-white/30">/ cycle</span></span>
                    <Link href={`/rooms/${rt.id}`} className="text-[10px] tracking-wider uppercase text-white/60 hover:text-white font-mono flex items-center gap-1">
                      Inspect specs <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Experiences sections */}
      <section id="experiences" className="py-24 px-6 md:px-12 bg-gradient-to-b from-black to-obsidian-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[9px] tracking-widest text-gold-300 uppercase">Beyond Accommodation</span>
            <h2 className="font-sans text-3xl md:text-5xl font-black text-white uppercase tracking-tight mt-1">THE CITADEL EXPERIENCES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {luxuryExperiences.map((exp, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-white/5 aspect-[4/5] flex flex-col justify-end p-6">
                <div className="absolute inset-0 z-0">
                  <Image src={exp.image} alt={exp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                  <h3 className="font-sans text-base font-bold text-gold-300 uppercase tracking-wide">{exp.title}</h3>
                  <p className="text-[11px] text-white/60 leading-relaxed font-light">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

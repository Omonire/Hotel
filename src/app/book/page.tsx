'use client';

import React, { useState, useTransition, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useHotel } from '@/context/HotelContext';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, CreditCard, Wallet, Calendar, Users, Cpu } from 'lucide-react';
import Image from 'next/image';

const bookingSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid cosmic address'),
  phone: z.string().min(5, 'Invalid direct link code'),
  country: z.string().min(2, 'Enter your native state or country'),
  special_requests: z.string().optional()
});

type FormValues = z.infer<typeof bookingSchema>;

function BookingWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { roomTypes, rooms, createBooking } = useHotel();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isPending, startTransition] = useTransition();

  // Initial form values from search parameters
  const paramRoomTypeId = searchParams?.get('roomType') || '';
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string>(paramRoomTypeId || roomTypes[0]?.id || '');
  const [checkIn, setCheckIn] = useState<string>(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState<string>(new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]);
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'crypto' | 'quantum_pay' | 'bank_transfer'>('quantum_pay');

  // Form setup via React Hook Form + Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(bookingSchema)
  });

  const selectedRoomType = roomTypes.find(rt => rt.id === selectedRoomTypeId) || roomTypes[0];

  // Price Calculation
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const nights = Math.max(1, Math.round((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)));
  const totalPrice = selectedRoomType ? selectedRoomType.base_price * nights : 0;

  const [confirmedBookingRef, setConfirmedBookingRef] = useState<string>('');

  const onFormSubmit = (data: FormValues) => {
    // Locate an available room of this type
    const matchingRooms = rooms.filter(r => r.room_type_id === selectedRoomTypeId);
    // Find first available room, or fallback to any matching room
    const assignedRoom = matchingRooms.find(r => r.status === 'available') || matchingRooms[0];

    if (!assignedRoom) {
      alert('Internal error: no room chambers allocated. Please configure rooms in the administrative panel first.');
      return;
    }

    startTransition(() => {
      const result = createBooking({
        guest: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          country: data.country,
          special_requests: data.special_requests
        },
        room_id: assignedRoom.id,
        check_in_date: checkIn,
        check_out_date: checkOut,
        total_guests: guestsCount,
        total_price: totalPrice,
        special_requests: data.special_requests,
        payment_method: paymentMethod
      });

      setConfirmedBookingRef(result.booking_reference);
      setStep(4);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left Column: Multi-step interactive flow */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        {/* Progress Tracker Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          {[
            { num: 1, label: 'Horizon Dates' },
            { num: 2, label: 'Identity Matrix' },
            { num: 3, label: 'Quantum Pay' },
            { num: 4, label: 'Confirmation' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] ${
                step === s.num
                  ? 'bg-gold-400 text-black font-bold ring-4 ring-gold-400/20'
                  : step > s.num
                    ? 'bg-gold-400/20 text-gold-300'
                    : 'bg-white/5 text-white/40'
              }`}>
                {s.num}
              </div>
              <span className={`hidden md:inline font-mono text-[9px] tracking-widest uppercase ${
                step === s.num ? 'text-white' : 'text-white/40'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Wizard Steps */}
        {step === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <h3 className="font-sans text-xl font-bold tracking-wide uppercase text-white">Choose Your Habitat Horizon</h3>

            {/* Select Sanctuary Category */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Chamber Sanctuary</label>
              <select
                value={selectedRoomTypeId}
                onChange={(e) => setSelectedRoomTypeId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-3 text-xs text-white focus:outline-none cursor-pointer"
              >
                {roomTypes.map((rt) => (
                  <option key={rt.id} value={rt.id} className="bg-obsidian-900">
                    {rt.name} (Ω{rt.base_price}/night)
                  </option>
                ))}
              </select>
            </div>

            {/* Check-in and Check-out Date Matrix */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Check-in Horizon</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer [color-scheme:dark]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Check-out Horizon</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Accompanied Guests</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setGuestsCount(num)}
                    disabled={num > (selectedRoomType?.max_capacity || 2)}
                    className={`flex-1 py-2 rounded font-sans text-xs tracking-widest border transition-all ${
                      guestsCount === num
                        ? 'bg-gold-400 text-black border-gold-400 font-bold'
                        : 'bg-black/30 text-white/75 border-white/10 hover:border-white/20 disabled:opacity-20'
                    }`}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
              {selectedRoomType && guestsCount > selectedRoomType.max_capacity && (
                <span className="text-[10px] text-red-400/80">Selected chamber capacity limit is {selectedRoomType.max_capacity}.</span>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(202,152,85,0.15)]"
            >
              Continue Protocol
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(() => setStep(3))} className="flex flex-col gap-6 animate-in fade-in duration-300">
            <h3 className="font-sans text-xl font-bold tracking-wide uppercase text-white">Synchronize Guest Identity</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">First Name</label>
                <input
                  type="text"
                  {...register('first_name')}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                  placeholder="Nova"
                />
                {errors.first_name && <span className="text-[10px] text-red-400/80">{errors.first_name.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Last Name</label>
                <input
                  type="text"
                  {...register('last_name')}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                  placeholder="Sterling"
                />
                {errors.last_name && <span className="text-[10px] text-red-400/80">{errors.last_name.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Cosmic Email Link</label>
              <input
                type="email"
                {...register('email')}
                className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                placeholder="nova.sterling@nebula.com"
              />
              {errors.email && <span className="text-[10px] text-red-400/80">{errors.email.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Direct Comms Code</label>
                <input
                  type="text"
                  {...register('phone')}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                  placeholder="+1 (555) 902"
                />
                {errors.phone && <span className="text-[10px] text-red-400/80">{errors.phone.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">State / Country Origin</label>
                <input
                  type="text"
                  {...register('country')}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none"
                  placeholder="Earth Orbit"
                />
                {errors.country && <span className="text-[10px] text-red-400/80">{errors.country.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Ancillary Special Protocols</label>
              <textarea
                {...register('special_requests')}
                rows={2}
                className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none resize-none"
                placeholder="Ex: Anti-gravity density adjustments, specific molecular nourishment requirements..."
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(202,152,85,0.15)]"
              >
                Verify Wallet
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <h3 className="font-sans text-xl font-bold tracking-wide uppercase text-white">Establish Payment Uplink</h3>

            {/* Simulated Payment Methods */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'quantum_pay', label: 'Quantum Credits', desc: 'Secure direct system core ledger', icon: Cpu },
                { id: 'crypto', label: 'Decentralized Blockchain', desc: 'ETH, SOL, or USDC protocol', icon: Wallet },
                { id: 'credit_card', label: 'Standard Ledger Card', desc: 'Global card validation', icon: CreditCard }
              ].map((m) => {
                const IconComp = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as 'credit_card' | 'crypto' | 'quantum_pay' | 'bank_transfer')}
                    className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === m.id
                        ? 'bg-gold-400/5 border-gold-300'
                        : 'bg-black/20 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <IconComp className="w-5 h-5 text-gold-300 mb-2" />
                    <span className="font-sans text-xs font-bold text-white mb-1">{m.label}</span>
                    <span className="font-sans text-[10px] text-white/40 leading-snug">{m.desc}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-lg bg-gold-400/5 border border-gold-400/10 flex items-start gap-3 mt-4">
              <ShieldCheck className="w-4 h-4 text-gold-300 mt-0.5 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[10px] font-bold text-gold-200">GUARANTEED DECENTRALIZED PROTOCOL</span>
                <span className="font-sans text-[9px] text-white/50 leading-relaxed">
                  Your entry is securely written to the local blockchain ledger. Security validated by Aetheris security standards.
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all"
              >
                Identity
              </button>
              <button
                type="button"
                onClick={handleSubmit(onFormSubmit)}
                disabled={isPending}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(202,152,85,0.25)]"
              >
                {isPending ? 'Syncing...' : 'Initiate direct booking'}
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-12 flex flex-col items-center animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-300 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8 text-gold-300 animate-pulse" />
            </div>

            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold-300 mb-2">Protocol Successful</span>
            <h3 className="font-sans text-2xl md:text-3xl font-black text-white uppercase mb-4 tracking-tight">CHAMBER RESERVED</h3>

            <p className="max-w-md text-xs text-white/60 leading-relaxed mb-8">
              Welcome to the Citadel. Your Direct Entry Protocol has been written successfully. Print, download, or present your transaction matrix code at the orbital terminal desk.
            </p>

            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 max-w-sm w-full mb-8 flex flex-col gap-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-white/40 uppercase">ENTRY REFERENCE</span>
                <span className="font-mono text-xs font-bold text-white">{confirmedBookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-white/40 uppercase">CHAMBER</span>
                <span className="font-sans text-xs font-bold text-gold-300">{selectedRoomType?.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="font-mono text-[8px] text-white/40 uppercase">HORIZON</span>
                <span className="font-sans text-xs text-white">{checkIn} to {checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[8px] text-white/40 uppercase">TOTAL PRICE PAID</span>
                <span className="font-sans text-xs font-bold text-white">Ω{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/admin')}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-400/20 text-white font-sans text-xs tracking-widest font-bold uppercase transition-all"
            >
              Access Terminal Dashboard
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Premium Floating Receipt Invoice Summary */}
      {step < 4 && (
        <div className="lg:col-span-5">
          <div className="rounded-2xl glass-panel-heavy p-6 border border-gold-300/10 sticky top-32 glow-ambient">
            <h4 className="font-mono text-[9px] tracking-widest text-gold-300 uppercase mb-4">CHAMBER SUMMARY</h4>

            {/* Room cover image summary */}
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/5 mb-4">
              <Image src={selectedRoomType?.images[0] || ''} alt="Room Preview" fill className="object-cover" />
            </div>

            <h3 className="font-sans text-base font-bold text-white uppercase mb-2">{selectedRoomType?.name}</h3>
            <p className="text-[11px] text-white/40 leading-relaxed font-light mb-6 border-b border-white/5 pb-6">
              {selectedRoomType?.description}
            </p>

            {/* Calculations and Breakdown */}
            <div className="flex flex-col gap-3.5 mb-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 flex items-center gap-1.5 font-mono text-[10px]">
                  <Calendar className="w-3.5 h-3.5 text-gold-400/60" /> Check In
                </span>
                <span className="text-white/80">{checkIn}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 flex items-center gap-1.5 font-mono text-[10px]">
                  <Calendar className="w-3.5 h-3.5 text-gold-400/60" /> Check Out
                </span>
                <span className="text-white/80">{checkOut}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 flex items-center gap-1.5 font-mono text-[10px]">
                  <Users className="w-3.5 h-3.5 text-gold-400/60" /> Occupants
                </span>
                <span className="text-white/80">{guestsCount} Guest(s)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 font-mono text-[10px]">Total Nights</span>
                <span className="text-white/80">{nights} night(s)</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <div className="flex flex-col">
                <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">EST. TRANSACTION PRICE</span>
                <span className="font-mono text-[8px] text-white/20 tracking-wider">ALL INC. QUANTUM FEES</span>
              </div>
              <span className="font-sans text-2xl font-black text-gold-300">Ω{totalPrice}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-obsidian-950 pt-32 pb-24 px-6 md:px-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gold-200">
              Direct Entry Protocol
            </span>
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-2">
            SECURE A CITADEL CHAMBER
          </h1>
          <p className="max-w-xl text-xs text-white/50 leading-relaxed font-light">
            Initialize an orbital entry protocol. All slots are cryptographic, fully integrated, and backed by adaptive AI wellness.
          </p>
        </div>

        {/* Wrap form with Suspense since useSearchParams is utilized inside */}
        <Suspense fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <BookingWizardContent />
        </Suspense>
      </div>
    </main>
  );
}

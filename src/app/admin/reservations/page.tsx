'use client';

import React, { useState } from 'react';
import { useHotel } from '@/context/HotelContext';
import { Sparkles, Search, CheckCircle, LogOut, XCircle, UserCheck, Phone, Mail, Globe } from 'lucide-react';

export default function AdminReservationsPage() {
  const { bookings, guests, rooms, roomTypes, updateBookingStatus } = useHotel();
  const [search, setSearch] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const guest = guests.find((g) => g.id === b.guest_id);
    const room = rooms.find((r) => r.id === b.room_id);
    const matchesSearch =
      b.booking_reference.toLowerCase().includes(search.toLowerCase()) ||
      guest?.first_name.toLowerCase().includes(search.toLowerCase()) ||
      guest?.last_name.toLowerCase().includes(search.toLowerCase()) ||
      room?.room_number.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId);
  const selectedGuest = selectedBooking ? guests.find((g) => g.id === selectedBooking.guest_id) : null;
  const selectedRoom = selectedBooking ? rooms.find((r) => r.id === selectedBooking.room_id) : null;
  const selectedRoomType = selectedRoom ? roomTypes.find((rt) => rt.id === selectedRoom.room_type_id) : null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gold-400/10 border border-gold-400/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold-200">Orbital traffic log</span>
          </div>
          <h1 className="font-sans text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Reservation Logs & Desk</h1>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search Reference, Guest, Room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/10 hover:border-gold-400/30 focus:border-gold-300 rounded-lg px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none transition-colors"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-white/30" />
        </div>
      </div>

      {/* Main split Grid: Listings vs detail inspect panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Listings table */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="rounded-xl glass-panel overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02] font-mono text-[8px] tracking-widest text-white/40 uppercase">
                    <th className="p-4">Reference</th>
                    <th className="p-4">Guest</th>
                    <th className="p-4">Chamber</th>
                    <th className="p-4">Horizon</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {filteredBookings.map((b) => {
                    const guest = guests.find((g) => g.id === b.guest_id);
                    const room = rooms.find((r) => r.id === b.room_id);

                    const statusLabels = {
                      pending: 'text-amber-400 border-amber-400/20 bg-amber-500/5',
                      confirmed: 'text-emerald-400 border-emerald-400/20 bg-emerald-500/5',
                      checked_in: 'text-gold-300 border-gold-400/20 bg-gold-400/5',
                      checked_out: 'text-blue-400 border-blue-400/20 bg-blue-500/5',
                      cancelled: 'text-white/30 border-white/10 bg-white/[0.01]'
                    };

                    return (
                      <tr
                        key={b.id}
                        onClick={() => setSelectedBookingId(b.id)}
                        className={`hover:bg-white/[0.02] cursor-pointer transition-all ${
                          selectedBookingId === b.id ? 'bg-gold-400/5 border-l-2 border-l-gold-300' : ''
                        }`}
                      >
                        <td className="p-4 font-mono font-bold text-white tracking-wider">{b.booking_reference}</td>
                        <td className="p-4 font-semibold text-white/80">
                          {guest ? `${guest.first_name} ${guest.last_name}` : 'Unknown Guest'}
                        </td>
                        <td className="p-4 font-mono text-white/75">{room ? room.room_number : 'N/A'}</td>
                        <td className="p-4 text-white/50">{b.check_in_date.substring(5)} to {b.check_out_date.substring(5)}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded border text-[9px] font-mono uppercase ${statusLabels[b.status]}`}>
                            {b.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-white/30">
                        No orbital reservations found matching keywords.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Detail Inspect & Operations board */}
        <div className="lg:col-span-5">
          {selectedBooking && selectedGuest ? (
            <div className="rounded-xl glass-panel-heavy p-6 border border-gold-300/10 flex flex-col gap-6 sticky top-32 animate-in fade-in duration-300">
              {/* Header Info */}
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div className="flex flex-col">
                  <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Selected Record</span>
                  <span className="font-mono text-base font-black text-white">{selectedBooking.booking_reference}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Total Transaction</span>
                  <span className="font-sans text-lg font-black text-gold-300 block">Ω{selectedBooking.total_price}</span>
                </div>
              </div>

              {/* Guest Profile matrix */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">GUEST DOSSIER</span>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-3 text-xs">
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-gold-300" />
                    {selectedGuest.first_name} {selectedGuest.last_name}
                  </div>
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5 text-white/60">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gold-400/60" />
                      <span>{selectedGuest.email}</span>
                    </div>
                    {selectedGuest.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gold-400/60" />
                        <span>{selectedGuest.phone}</span>
                      </div>
                    )}
                    {selectedGuest.country && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-gold-400/60" />
                        <span>{selectedGuest.country}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chamber Details */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">CHAMBER ALLOCATION</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Chamber Reference</span>
                  <span className="font-mono text-white font-bold">{selectedRoom ? selectedRoom.room_number : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Chamber Class</span>
                  <span className="text-gold-300 font-semibold">{selectedRoomType?.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Occupancy Dates</span>
                  <span className="text-white/80 font-mono">{selectedBooking.check_in_date} to {selectedBooking.check_out_date}</span>
                </div>
              </div>

              {/* Operational State Actions */}
              <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">DIRECT OPERATIONS</span>
                <div className="flex flex-wrap gap-3">
                  {selectedBooking.status === 'confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'checked_in')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-sans text-[10px] tracking-widest font-bold uppercase transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Check In
                    </button>
                  )}
                  {selectedBooking.status === 'checked_in' && (
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'checked_out')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded bg-gold-400 text-black font-sans text-[10px] tracking-widest font-bold uppercase transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Check Out
                    </button>
                  )}
                  {selectedBooking.status !== 'cancelled' && selectedBooking.status !== 'checked_out' && (
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-sans text-[10px] tracking-widest font-bold uppercase transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl glass-panel p-8 text-center border border-dashed border-white/10 flex flex-col items-center justify-center min-h-[300px]">
              <UserCheck className="w-8 h-8 text-white/20 mb-4" />
              <h4 className="font-sans text-sm font-bold text-white uppercase mb-1">Dossier Viewer</h4>
              <p className="text-[10px] text-white/40 max-w-xs">Select any incoming reservation from the logs table to inspect details or execute terminal check-in protocols.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

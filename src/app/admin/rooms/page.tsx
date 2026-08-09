'use client';

import React, { useState } from 'react';
import { useHotel } from '@/context/HotelContext';
import { Sparkles, KeyRound, Trash2, Plus, X } from 'lucide-react';

export default function AdminRoomsPage() {
  const { rooms, roomTypes, addRoom, updateRoom, deleteRoom } = useHotel();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [roomNumber, setRoomNumber] = useState('');
  const [roomTypeId, setRoomTypeId] = useState(roomTypes[0]?.id || '');
  const [roomStatus, setRoomStatus] = useState<'available' | 'occupied' | 'dirty' | 'maintenance' | 'out_of_service'>('available');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber.trim()) return;

    addRoom({
      room_number: roomNumber,
      room_type_id: roomTypeId,
      status: roomStatus
    });

    // Reset Form
    setRoomNumber('');
    setShowAddModal(false);
  };

  const handleUpdateStatus = (id: string, status: 'available' | 'occupied' | 'dirty' | 'maintenance' | 'out_of_service') => {
    updateRoom(id, { status });
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gold-400/10 border border-gold-400/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold-200">Orbital keys desk</span>
          </div>
          <h1 className="font-sans text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Room Chamber Management</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(202,152,85,0.15)]"
        >
          <Plus className="w-4 h-4" />
          Allocate Chamber
        </button>
      </div>

      {/* Grid of rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => {
          const type = roomTypes.find(rt => rt.id === room.room_type_id);

          const statusColors = {
            available: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
            occupied: 'bg-gold-400/10 border-gold-400/20 text-gold-300',
            dirty: 'bg-red-500/10 border-red-500/20 text-red-400',
            maintenance: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
            out_of_service: 'bg-white/5 border-white/10 text-white/40'
          };

          return (
            <div key={room.id} className="rounded-xl glass-panel p-5 flex flex-col justify-between border hover:border-gold-300/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center">
                    <KeyRound className="w-4 h-4 text-gold-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white/40">CHAMBER</span>
                    <span className="font-sans text-lg font-black text-white">{room.room_number}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded border text-[9px] font-mono font-bold uppercase ${statusColors[room.status]}`}>
                  {room.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex flex-col gap-0.5 mb-6">
                <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">CHAMBER TYPE</span>
                <span className="font-sans text-xs font-semibold text-white truncate">{type?.name || 'Unknown Sanctuary'}</span>
              </div>

              {/* Status Mutator Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-2">
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase mr-2">SET STATUS</span>
                  <select
                    value={room.status}
                    onChange={(e) => handleUpdateStatus(room.id, e.target.value as 'available' | 'occupied' | 'dirty' | 'maintenance' | 'out_of_service')}
                    className="bg-black/60 border border-white/5 focus:border-gold-300 rounded px-2 py-1 text-[10px] text-white focus:outline-none cursor-pointer"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="dirty">Dirty</option>
                    <option value="maintenance">Maint</option>
                    <option value="out_of_service">Out-of-service</option>
                  </select>
                </div>

                <button
                  onClick={() => deleteRoom(room.id)}
                  className="p-1.5 rounded hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-white/40 hover:text-red-400 transition-all"
                  title="De-allocate Chamber"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Chamber Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl glass-panel-heavy p-6 border border-gold-300/20 animate-in scale-in duration-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-sans text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-gold-300" /> Allocate New Room Chamber
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Chamber Designation (Room Number)</label>
                <input
                  type="text"
                  required
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  placeholder="Ex: 405, Orbital-12"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Chamber Class</label>
                <select
                  value={roomTypeId}
                  onChange={(e) => setRoomTypeId(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                >
                  {roomTypes.map((rt) => (
                    <option key={rt.id} value={rt.id} className="bg-obsidian-900">
                      {rt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Initial Status</label>
                <select
                  value={roomStatus}
                  onChange={(e) => setRoomStatus(e.target.value as 'available' | 'occupied' | 'dirty' | 'maintenance' | 'out_of_service')}
                  className="w-full bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="available" className="bg-obsidian-900">Available</option>
                  <option value="dirty" className="bg-obsidian-900">Dirty</option>
                  <option value="maintenance" className="bg-obsidian-900">Maintenance</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-3 rounded bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300"
              >
                Sync Chamber to Database
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

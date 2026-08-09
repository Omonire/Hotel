'use client';

import React, { useState } from 'react';
import { useHotel } from '@/context/HotelContext';
import { Sparkles, Trash2, Plus, UsersRound, Mail, X } from 'lucide-react';

export default function AdminStaffPage() {
  const { staff, addStaff, deleteStaff } = useHotel();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'manager' | 'receptionist' | 'housekeeping' | 'maintenance'>('receptionist');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    addStaff({
      full_name: fullName,
      email: email,
      role: role,
      status: 'active'
    });

    setFullName('');
    setEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-gold-400/10 border border-gold-400/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-gold-200">System personnel config</span>
          </div>
          <h1 className="font-sans text-2xl md:text-3xl font-black text-white uppercase tracking-tight">Staff Control Matrix</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(202,152,85,0.15)]"
        >
          <Plus className="w-4 h-4" />
          Onboard Officer
        </button>
      </div>

      {/* Staff members grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => {
          const roleLabels = {
            admin: 'border-red-400/20 bg-red-500/10 text-red-400',
            manager: 'border-gold-400/20 bg-gold-400/10 text-gold-300',
            receptionist: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-400',
            housekeeping: 'border-blue-400/20 bg-blue-500/10 text-blue-400',
            maintenance: 'border-purple-400/20 bg-purple-500/10 text-purple-400'
          };

          return (
            <div key={member.id} className="rounded-xl glass-panel p-5 flex flex-col justify-between border hover:border-gold-300/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center">
                    <UsersRound className="w-4 h-4 text-gold-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-sm font-bold text-white">{member.full_name}</span>
                    <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">{member.id}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded border text-[8px] font-mono font-bold uppercase ${roleLabels[member.role]}`}>
                  {member.role}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/60 mb-6 font-mono">
                <Mail className="w-3.5 h-3.5 text-gold-400/60" />
                <span className="truncate">{member.email}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="font-mono text-[9px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE NODE
                </span>

                <button
                  onClick={() => deleteStaff(member.id)}
                  className="p-1.5 rounded hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-white/40 hover:text-red-400 transition-all"
                  title="Revoke clearance link"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Onboard Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl glass-panel-heavy p-6 border border-gold-300/20 animate-in scale-in duration-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-sans text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2">
                <UsersRound className="w-4 h-4 text-gold-300" /> Onboard Staff Officer
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Full Officer Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  placeholder="Ex: Dr. Evelyn Vance"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">System Email Link</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none"
                  placeholder="Ex: evelyn.vance@aetheris.io"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-white/40 tracking-wider uppercase">Role Assignment</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'manager' | 'receptionist' | 'housekeeping' | 'maintenance')}
                  className="w-full bg-black/40 border border-white/10 focus:border-gold-300 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="receptionist" className="bg-obsidian-900">Receptionist Concierge</option>
                  <option value="housekeeping" className="bg-obsidian-900">Housekeeping Officer</option>
                  <option value="maintenance" className="bg-obsidian-900">Maintenance Engineer</option>
                  <option value="manager" className="bg-obsidian-900">Manager General</option>
                  <option value="admin" className="bg-obsidian-900">Admin Commander</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-3 rounded bg-gold-400 hover:bg-gold-300 text-black font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300"
              >
                Onboard Personnel to Matrix
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

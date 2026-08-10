'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RoomType,
  Amenity,
  Room,
  Guest,
  Booking,
  Staff,
  HotelSettings,
  OperationalStats,
  Payment
} from '../types';

// Seed Initial Mock Data
const defaultAmenities: Amenity[] = [
  { id: 'a1', name: 'Zero-G Bedding', icon: 'Sparkles', category: 'room' },
  { id: 'a2', name: 'Quantum AI Butler', icon: 'Cpu', category: 'room' },
  { id: 'a3', name: 'Holographic Wall System', icon: 'Monitor', category: 'room' },
  { id: 'a4', name: 'Ambient Hydrotherapy Tub', icon: 'Droplets', category: 'room' },
  { id: 'a5', name: 'Sub-Atomic Air Filter', icon: 'Wind', category: 'room' },
  { id: 'a6', name: 'Solar Winds Charging Deck', icon: 'BatteryCharging', category: 'room' },
  { id: 'a7', name: 'Cryo-Recovery Chamber', icon: 'ShieldAlert', category: 'hotel' },
  { id: 'a8', name: 'Meteor Shield Observation Lounge', icon: 'Eye', category: 'hotel' },
];

const defaultRoomTypes: RoomType[] = [
  {
    id: 'rt1',
    name: 'Nebula Horizon Sanctuary',
    code: 'NEB-SANCT',
    description: 'A premium sanctuary suspended in an electromagnetic field, boasting panoramic smart-glass walls projecting live nebula streams. Features personalized gravity controls and bio-adaptive quantum light cycles.',
    base_price: 1250,
    max_capacity: 2,
    bed_type: 'Quantum Levitating King',
    size_sqm: 85,
    view_type: 'Deep Cosmos Live Stream',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: ['Zero-G Bedding', 'Quantum AI Butler', 'Holographic Wall System', 'Sub-Atomic Air Filter']
  },
  {
    id: 'rt2',
    name: 'Chronos Temporal Penthouse',
    code: 'CHR-PENT',
    description: 'The pinnacle of futuristic luxury. Includes a localized chronostatic chamber to experience deep, extended rest, and a private outdoor bio-dome. The absolute premium suite for dignitaries.',
    base_price: 3400,
    max_capacity: 4,
    bed_type: 'Double Super-Position Queen',
    size_sqm: 180,
    view_type: 'Stellar System Apex View',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: ['Zero-G Bedding', 'Quantum AI Butler', 'Holographic Wall System', 'Ambient Hydrotherapy Tub', 'Cryo-Recovery Chamber']
  },
  {
    id: 'rt3',
    name: 'Sub-Orbital Aurora Suite',
    code: 'SUB-AUR',
    description: 'Elegantly minimal rooms built with thermal obsidian panels, overlooking the planet’s magnetic aurora belt. Seamless architectural geometry combined with high-tech immersive wellness nodes.',
    base_price: 850,
    max_capacity: 2,
    bed_type: 'Thermal Smart Mattress King',
    size_sqm: 62,
    view_type: 'Orbital Magnetosphere Aurora',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600'
    ],
    amenities: ['Zero-G Bedding', 'Holographic Wall System', 'Sub-Atomic Air Filter', 'Solar Winds Charging Deck']
  }
];

const defaultRooms: Room[] = [
  { id: 'r1', room_number: '101', room_type_id: 'rt1', status: 'available', created_at: new Date().toISOString() },
  { id: 'r2', room_number: '102', room_type_id: 'rt1', status: 'occupied', created_at: new Date().toISOString() },
  { id: 'r3', room_number: '201', room_type_id: 'rt2', status: 'available', created_at: new Date().toISOString() },
  { id: 'r4', room_number: '202', room_type_id: 'rt2', status: 'maintenance', created_at: new Date().toISOString() },
  { id: 'r5', room_number: '301', room_type_id: 'rt3', status: 'available', created_at: new Date().toISOString() },
  { id: 'r6', room_number: '302', room_type_id: 'rt3', status: 'dirty', created_at: new Date().toISOString() },
  { id: 'r7', room_number: '303', room_type_id: 'rt3', status: 'available', created_at: new Date().toISOString() },
];

const defaultStaff: Staff[] = [
  { id: 's1', full_name: 'Dr. Evelyn Vance', email: 'evelyn.vance@neosphere.io', role: 'admin', status: 'active', created_at: new Date().toISOString() },
  { id: 's2', full_name: 'Kaelen Vance', email: 'kaelen.vance@neosphere.io', role: 'manager', status: 'active', created_at: new Date().toISOString() },
  { id: 's3', full_name: 'Tars-9 Concierge', email: 'tars9@neosphere.io', role: 'receptionist', status: 'active', created_at: new Date().toISOString() },
  { id: 's4', full_name: 'Iris Thorne', email: 'iris.thorne@neosphere.io', role: 'housekeeping', status: 'active', created_at: new Date().toISOString() },
];

const defaultSettings: HotelSettings = {
  id: 'set1',
  hotel_name: 'AETHERIS CITADEL',
  tagline: 'An Immersive Multiversal Sanctuary Above the Clouds',
  contact_email: 'reservations@aetheriscitadel.io',
  contact_phone: '+44 20 7946 0958',
  address: 'Apex Apex Altitude, Sector-9 Grid, Earth Orbit-C',
  check_in_time: '14:00',
  check_out_time: '11:00',
  currency_default: 'Ω'
};

const defaultGuests: Guest[] = [
  { id: 'g1', first_name: 'Nova', last_name: 'Sterling', email: 'nova.sterling@cosmic.com', phone: '+1 415 555 2671', country: 'United States', created_at: new Date().toISOString() },
  { id: 'g2', first_name: 'Aiden', last_name: 'Frost', email: 'aiden.frost@cryo.io', phone: '+33 6 5551 2931', country: 'France', created_at: new Date().toISOString() }
];

const defaultBookings: Booking[] = [
  {
    id: 'b1',
    booking_reference: 'LX-4890-S9',
    guest_id: 'g1',
    room_id: 'r2',
    check_in_date: new Date().toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    total_guests: 2,
    status: 'checked_in',
    total_price: 3750,
    payment_status: 'paid',
    created_at: new Date().toISOString()
  },
  {
    id: 'b2',
    booking_reference: 'LX-5521-T1',
    guest_id: 'g2',
    room_id: 'r1',
    check_in_date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    check_out_date: new Date(Date.now() + 86400000 * 8).toISOString().split('T')[0],
    total_guests: 1,
    status: 'confirmed',
    total_price: 3750,
    payment_status: 'paid',
    created_at: new Date().toISOString()
  }
];

const defaultPayments: Payment[] = [
  {
    id: 'p1',
    booking_id: 'b1',
    amount: 3750,
    currency: 'Ω',
    payment_method: 'quantum_pay',
    status: 'completed',
    transaction_ref: 'QT-99210-911',
    created_at: new Date().toISOString()
  },
  {
    id: 'p2',
    booking_id: 'b2',
    amount: 3750,
    currency: 'Ω',
    payment_method: 'crypto',
    status: 'completed',
    transaction_ref: 'ETH-0x77199',
    created_at: new Date().toISOString()
  }
];

interface HotelContextType {
  amenities: Amenity[];
  roomTypes: RoomType[];
  rooms: Room[];
  staff: Staff[];
  settings: HotelSettings;
  guests: Guest[];
  bookings: Booking[];
  payments: Payment[];
  stats: OperationalStats;

  // Mutators
  addRoom: (room: Omit<Room, 'id' | 'created_at'>) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  createBooking: (bookingData: {
    guest: Omit<Guest, 'id' | 'created_at'>;
    room_id: string;
    check_in_date: string;
    check_out_date: string;
    total_guests: number;
    total_price: number;
    special_requests?: string;
    payment_method: 'credit_card' | 'crypto' | 'quantum_pay' | 'bank_transfer';
  }) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  updateSettings: (newSettings: Partial<HotelSettings>) => void;
  addStaff: (staffMember: Omit<Staff, 'id' | 'created_at'>) => void;
  updateStaff: (id: string, updates: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export function HotelProvider({ children }: { children: React.ReactNode }) {
  const [amenities] = useState<Amenity[]>(defaultAmenities);
  const [roomTypes] = useState<RoomType[]>(defaultRoomTypes);
  const [rooms, setRooms] = useState<Room[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotel_rooms');
      return saved ? JSON.parse(saved) : defaultRooms;
    }
    return defaultRooms;
  });
  const [staff, setStaff] = useState<Staff[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotel_staff');
      return saved ? JSON.parse(saved) : defaultStaff;
    }
    return defaultStaff;
  });
  const [settings, setSettings] = useState<HotelSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotel_settings');
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  });
  const [guests, setGuests] = useState<Guest[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotel_guests');
      return saved ? JSON.parse(saved) : defaultGuests;
    }
    return defaultGuests;
  });
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotel_bookings');
      return saved ? JSON.parse(saved) : defaultBookings;
    }
    return defaultBookings;
  });
  const [payments, setPayments] = useState<Payment[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hotel_payments');
      return saved ? JSON.parse(saved) : defaultPayments;
    }
    return defaultPayments;
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('hotel_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hotel_staff', JSON.stringify(staff));
  }, [staff]);

  useEffect(() => {
    localStorage.setItem('hotel_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('hotel_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('hotel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hotel_payments', JSON.stringify(payments));
  }, [payments]);

  // Compute operational statistics reactively on the fly instead of a state effect to abide by React 19 safety rules
  const getStats = (): OperationalStats => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    const todayStr = new Date().toISOString().split('T')[0];

    const todayArrivals = bookings.filter(b => b.check_in_date === todayStr && b.status !== 'cancelled').length;
    const todayDepartures = bookings.filter(b => b.check_out_date === todayStr && b.status !== 'cancelled').length;
    const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked_in').length;

    const availableCount = rooms.filter(r => r.status === 'available').length;
    const dirtyCount = rooms.filter(r => r.status === 'dirty').length;
    const maintCount = rooms.filter(r => r.status === 'maintenance').length;

    // Calculate revenue summaries
    const roomRevenue = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);

    const serviceRevenue = Math.round(roomRevenue * 0.15); // simulate additional futuristic services
    const totalRevenue = roomRevenue + serviceRevenue;

    // Generate daily revenue mock stats over the past 7 days
    const daily: { date: string; revenue: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayPayments = payments
        .filter(p => p.status === 'completed' && p.created_at.startsWith(dateStr))
        .reduce((sum, p) => sum + p.amount, 0);

      const simulatedBase = [4800, 5600, 3900, 7200, 8900, 9400, totalRevenue ? (totalRevenue % 5000) + 3000 : 5000][6 - i];
      daily.push({
        date: dateStr,
        revenue: dayPayments > 0 ? dayPayments : simulatedBase
      });
    }

    return {
      occupancy_rate: occupancyRate,
      today_arrivals: todayArrivals,
      today_departures: todayDepartures,
      active_bookings_count: activeBookings,
      available_rooms_count: availableCount,
      dirty_rooms_count: dirtyCount,
      maintenance_rooms_count: maintCount,
      revenue_summary: {
        total: totalRevenue,
        rooms: roomRevenue,
        services: serviceRevenue,
        daily
      }
    };
  };

  const stats = getStats();

  // MUTATORS
  const addRoom = (newRoom: Omit<Room, 'id' | 'created_at'>) => {
    const room: Room = {
      ...newRoom,
      id: 'room-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setRooms(prev => [...prev, room]);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const createBooking = (bookingData: {
    guest: Omit<Guest, 'id' | 'created_at'>;
    room_id: string;
    check_in_date: string;
    check_out_date: string;
    total_guests: number;
    total_price: number;
    special_requests?: string;
    payment_method: 'credit_card' | 'crypto' | 'quantum_pay' | 'bank_transfer';
  }) => {
    const guestId = 'guest-' + Math.random().toString(36).substr(2, 9);
    const bookingId = 'book-' + Math.random().toString(36).substr(2, 9);
    const paymentId = 'pay-' + Math.random().toString(36).substr(2, 9);

    const guestRecord: Guest = {
      ...bookingData.guest,
      id: guestId,
      created_at: new Date().toISOString()
    };

    const bookingRecord: Booking = {
      id: bookingId,
      booking_reference: 'LX-' + Math.floor(1000 + Math.random() * 9000) + '-' + bookingData.check_in_date.split('-')[1],
      guest_id: guestId,
      room_id: bookingData.room_id,
      check_in_date: bookingData.check_in_date,
      check_out_date: bookingData.check_out_date,
      total_guests: bookingData.total_guests,
      status: 'confirmed',
      total_price: bookingData.total_price,
      payment_status: 'paid',
      special_requests: bookingData.special_requests,
      created_at: new Date().toISOString()
    };

    const paymentRecord: Payment = {
      id: paymentId,
      booking_id: bookingId,
      amount: bookingData.total_price,
      currency: settings.currency_default,
      payment_method: bookingData.payment_method,
      status: 'completed',
      transaction_ref: 'TR-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      created_at: new Date().toISOString()
    };

    // Safely update states
    setGuests(prev => [...prev, guestRecord]);
    setBookings(prev => [bookingRecord, ...prev]);
    setPayments(prev => [paymentRecord, ...prev]);

    // Update room status to occupied if reservation check-in date is today
    const todayStr = new Date().toISOString().split('T')[0];
    if (bookingData.check_in_date === todayStr) {
      updateRoom(bookingData.room_id, { status: 'occupied' });
    }

    return bookingRecord;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== id) return b;

      // Cascade to room status
      if (status === 'checked_in') {
        updateRoom(b.room_id, { status: 'occupied' });
      } else if (status === 'checked_out') {
        updateRoom(b.room_id, { status: 'dirty' });
      } else if (status === 'cancelled') {
        updateRoom(b.room_id, { status: 'available' });
      }

      return { ...b, status };
    }));
  };

  const updateSettings = (newSettings: Partial<HotelSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addStaff = (staffMember: Omit<Staff, 'id' | 'created_at'>) => {
    const newMember: Staff = {
      ...staffMember,
      id: 'staff-' + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    setStaff(prev => [...prev, newMember]);
  };

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  return (
    <HotelContext.Provider value={{
      amenities,
      roomTypes,
      rooms,
      staff,
      settings,
      guests,
      bookings,
      payments,
      stats,
      addRoom,
      updateRoom,
      deleteRoom,
      createBooking,
      updateBookingStatus,
      updateSettings,
      addStaff,
      updateStaff,
      deleteStaff
    }}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
}

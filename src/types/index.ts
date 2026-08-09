// Strongly typed interface definitions for the Futuristic Hotel application

export type UserRole = 'admin' | 'manager' | 'receptionist' | 'housekeeping' | 'maintenance';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Staff {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'on_leave';
  created_at: string;
}

export interface RoomType {
  id: string;
  name: string;
  code: string;
  description: string;
  base_price: number;
  max_capacity: number;
  bed_type: string;
  size_sqm: number;
  view_type: string;
  images: string[];
  amenities: string[]; // references Amenity names
}

export interface Amenity {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  category: 'room' | 'hotel' | 'experience';
}

export interface Room {
  id: string;
  room_number: string;
  room_type_id: string;
  status: 'available' | 'occupied' | 'dirty' | 'maintenance' | 'out_of_service';
  created_at: string;
}

export interface Guest {
  id: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  passport_number?: string;
  country?: string;
  special_requests?: string;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_reference: string;
  guest_id: string;
  room_id: string;
  check_in_date: string; // ISO date YYYY-MM-DD
  check_out_date: string; // ISO date YYYY-MM-DD
  total_guests: number;
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  total_price: number;
  payment_status: 'unpaid' | 'partially_paid' | 'paid' | 'refunded';
  special_requests?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  payment_method: 'credit_card' | 'crypto' | 'quantum_pay' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_ref: string;
  created_at: string;
}

export interface HotelSettings {
  id: string;
  hotel_name: string;
  tagline: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  check_in_time: string;
  check_out_time: string;
  currency_default: string;
}

export interface OperationalStats {
  occupancy_rate: number;
  today_arrivals: number;
  today_departures: number;
  active_bookings_count: number;
  available_rooms_count: number;
  dirty_rooms_count: number;
  maintenance_rooms_count: number;
  revenue_summary: {
    total: number;
    rooms: number;
    services: number;
    daily: { date: string; revenue: number }[];
  };
}

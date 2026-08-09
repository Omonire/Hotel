-- PostgreSQL Database Schema for Futuristic Luxury Hotel
-- Target stack: Supabase PostgreSQL (includes Row Level Security, UUID helpers, etc.)

-- 1. Profiles / Users (extend Supabase auth)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Staff Profiles with Roles & Permissions
create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  full_name text not null,
  email text not null unique,
  role text not null check (role in ('admin', 'manager', 'receptionist', 'housekeeping', 'maintenance')),
  status text not null default 'active' check (status in ('active', 'inactive', 'on_leave')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Room Categories (Room Types)
create table if not exists public.room_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique, -- e.g. "Cosmic Penthouse", "Sub-Orbital Suite", "Deep-Sea Abyss Residence", "Lunar Oasis Garden"
  code text not null unique, -- e.g. "CSM-PENT", "SUB-ORB"
  description text,
  base_price numeric not null,
  max_capacity integer not null,
  bed_type text not null,
  size_sqm integer not null,
  view_type text,
  images text[] not null default '{}'::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Amenities
create table if not exists public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique, -- e.g., "Zero-G Bedding", "Quantum AI Butler", "Holographic Wall System", "Ambient Hydrotherapy Tub"
  icon text, -- lucide icon key
  category text check (category in ('room', 'hotel', 'experience')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Room Amenities Junction Table
create table if not exists public.room_amenities (
  room_type_id uuid references public.room_types(id) on delete cascade,
  amenity_id uuid references public.amenities(id) on delete cascade,
  primary key (room_type_id, amenity_id)
);

-- 6. Individual Rooms
create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  room_number text not null unique, -- e.g., "701", "Lunar-12", "Sub-04"
  room_type_id uuid references public.room_types(id) on delete restrict,
  status text not null default 'available' check (status in ('available', 'occupied', 'dirty', 'maintenance', 'out_of_service')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Guests (Profile for booked guests, can be associated with user profile)
create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  passport_number text,
  country text,
  special_requests text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Bookings (Reservations)
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique, -- e.g., "LX-2025-4820"
  guest_id uuid references public.guests(id) on delete restrict,
  room_id uuid references public.rooms(id) on delete restrict,
  check_in_date date not null,
  check_out_date date not null,
  total_guests integer not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled')),
  total_price numeric not null,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'partially_paid', 'paid', 'refunded')),
  special_requests text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Booking Guests (for multi-occupant bookings)
create table if not exists public.booking_guests (
  booking_id uuid references public.bookings(id) on delete cascade,
  guest_id uuid references public.guests(id) on delete cascade,
  primary key (booking_id, guest_id)
);

-- 10. Payments
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  amount numeric not null,
  currency text not null default 'USD',
  payment_method text not null check (payment_method in ('credit_card', 'crypto', 'quantum_pay', 'bank_transfer')),
  status text not null default 'pending' check (status in ('pending', 'completed', 'failed', 'refunded')),
  transaction_ref text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Hotel Settings & Parameters
create table if not exists public.hotel_settings (
  id uuid primary key default gen_random_uuid(),
  hotel_name text not null default 'NEO-SPHERE RESORT & CASINO',
  tagline text default 'A Multiverse Luxury Spaceflight Experience',
  contact_email text,
  contact_phone text,
  address text,
  check_in_time time not null default '15:00:00',
  check_out_time time not null default '11:00:00',
  currency_default text not null default 'Credits',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security) on sensitive tables
alter table public.users enable row level security;
alter table public.staff enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.guests enable row level security;
alter table public.rooms enable row level security;
alter table public.room_types enable row level security;
alter table public.amenities enable row level security;
alter table public.room_amenities enable row level security;
alter table public.booking_guests enable row level security;
alter table public.hotel_settings enable row level security;

-- Sample basic read policy for public rooms & settings
create policy "Allow public read access to room_types" on public.room_types
  for select using (true);

create policy "Allow public read access to amenities" on public.amenities
  for select using (true);

create policy "Allow public read access to rooms" on public.rooms
  for select using (true);

create policy "Allow public read access to hotel settings" on public.hotel_settings
  for select using (true);

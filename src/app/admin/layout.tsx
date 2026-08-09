'use client';

import React from 'react';
import AdminSidebar from '@/components/dashboard/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black pt-28 pb-16 px-4 md:px-8">
      {/* Dynamic Grid layout supporting sidebar */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        <AdminSidebar />
        <div className="flex-1 w-full min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}

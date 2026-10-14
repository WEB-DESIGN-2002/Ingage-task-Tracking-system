'use client';

import { useState } from 'react';
import UserSidebar from './UserSidebar';
import UserTopNavbar from './UserTopNavbar';

interface UserLayoutProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
}

export default function UserLayout({
  children,
  searchPlaceholder,
}: UserLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* Employee Sidebar */}
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content View */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <UserTopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          searchPlaceholder={searchPlaceholder}
        />
        <main className="flex-1 pt-20 px-4 sm:px-8 pb-16 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

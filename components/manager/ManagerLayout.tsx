'use client';

import { useState } from 'react';
import ManagerSidebar from './ManagerSidebar';
import ManagerTopNavbar from './ManagerTopNavbar';

export default function ManagerLayout({
  children,
  searchPlaceholder,
}: {
  children: React.ReactNode;
  searchPlaceholder?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex">
      {/* Manager Sidebar */}
      <ManagerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <ManagerTopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          searchPlaceholder={searchPlaceholder}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

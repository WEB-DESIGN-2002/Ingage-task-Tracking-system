'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  searchPlaceholder?: string;
}

export default function WorkspaceLayout({
  children,
  searchPlaceholder,
}: WorkspaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex">
      {/* Sidebar (Desktop fixed left, Mobile drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (Offset by sidebar width on lg) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNavbar
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

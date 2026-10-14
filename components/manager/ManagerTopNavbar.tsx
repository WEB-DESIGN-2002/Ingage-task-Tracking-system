'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Clock,
  LogOut,
  User,
  LayoutDashboard,
} from 'lucide-react';

interface ManagerTopNavbarProps {
  onMenuClick?: () => void;
  searchPlaceholder?: string;
}

export default function ManagerTopNavbar({
  onMenuClick,
  searchPlaceholder = 'Search projects, tasks, or updates...',
}: ManagerTopNavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200/90 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Mobile toggle + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Open manager navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200/80 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 focus:border-[#65a30d] transition-all"
          />
        </div>
      </div>

      {/* Right: Notifications, Messages, Priya Singh profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Manager notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#65a30d] rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50 text-xs animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                <span className="font-bold text-gray-900">Review Queue Alerts</span>
                <span className="text-[10px] text-[#65a30d] font-semibold">4 Awaiting Review</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-amber-50/70 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900 mb-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Blocker Flagged: Amit Kumar</span>
                  </div>
                  <p className="text-gray-600 text-[11px]">DB connection deadlock on staging PostgreSQL instance.</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">35m ago</span>
                </div>

                <div className="p-2 bg-lime-50/70 rounded-xl border border-lime-100">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-900 mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d]" />
                    <span>Rahul Sharma Logged 8.5 hrs</span>
                  </div>
                  <p className="text-gray-600 text-[11px]">Login page UI responsive design with Zod validation.</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">2h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <Link
          href="/manager/daily-updates"
          className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors hidden sm:inline-flex"
          aria-label="Daily team updates"
        >
          <MessageSquare className="w-4 h-4" />
        </Link>

        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        {/* Profile Card */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              PS
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="text-xs font-bold text-gray-900 block">Priya Singh</span>
              <span className="text-[10px] text-gray-500">Manager</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-200 p-1.5 z-50 text-xs animate-fadeIn">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-bold text-gray-900">Priya Singh</p>
                <p className="text-[11px] text-gray-500 truncate">manager@company.com</p>
              </div>
              <Link
                href="/manager/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <User className="w-3.5 h-3.5 text-gray-500" />
                <span>Account &amp; Bio Settings</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Admin Workspace</span>
              </Link>
              <div className="my-1 border-t border-gray-100" />
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

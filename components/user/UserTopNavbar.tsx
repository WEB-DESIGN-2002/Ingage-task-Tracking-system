'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Bell,
  MessageSquare,
  Menu,
  ChevronDown,
  User,
  LogOut,
  FolderOpen,
  PlusCircle,
  CheckSquare,
  Crown,
  ShieldCheck,
} from 'lucide-react';

interface UserTopNavbarProps {
  onMenuClick?: () => void;
  searchPlaceholder?: string;
}

export default function UserTopNavbar({
  onMenuClick,
  searchPlaceholder = 'Search projects, tasks, or updates...',
}: UserTopNavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-4 sm:px-8">
      {/* Left: Mobile hamburger + Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:bg-white focus:border-[#65a30d] focus:ring-1 focus:ring-[#65a30d] transition-all"
          />
        </div>
      </div>

      {/* Right Actions & Profile Pill */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Messages"
          type="button"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Notifications"
          type="button"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-1 cursor-pointer group text-left"
          >
            <div className="text-right hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-slate-800 group-hover:text-[#65a30d] leading-tight transition-colors">
                Rahul Sharma
              </span>
              <span className="text-xs text-slate-500">Senior Frontend Engineer</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#65a30d] text-white flex items-center justify-center font-semibold text-xs shadow-sm ring-2 ring-lime-100">
              RS
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50 text-xs animate-fadeIn space-y-1">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">Rahul Sharma</p>
                <p className="text-[11px] text-slate-400">rahul.sharma@company.com</p>
                <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-lime-100 text-[#4d7c0f]">
                  Active Employee
                </span>
              </div>
              <Link
                href="/user/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Account Profile</span>
              </Link>
              <Link
                href="/user/tasks"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <CheckSquare className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>My Assigned Tasks</span>
              </Link>
              <Link
                href="/user/projects"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>My Projects</span>
              </Link>
              <Link
                href="/user/add-update"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Add Daily Update</span>
              </Link>
              <Link
                href="/user/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Account Profile</span>
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400">
                Switch Portals
              </div>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <Crown className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Admin Dashboard</span>
              </Link>
              <Link
                href="/manager/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>Manager Reviews</span>
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

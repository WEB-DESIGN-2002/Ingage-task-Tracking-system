'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CalendarCheck,
  BarChart3,
  User,
  Settings,
  X,
  Repeat,
  ShieldCheck,
  Crown,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';

interface ManagerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const MANAGER_NAV_ITEMS = [
  { name: 'Dashboard', href: '/manager/dashboard', icon: LayoutDashboard },
  { name: 'My Projects', href: '/manager/projects', icon: FolderKanban },
  { name: 'Team Members', href: '/manager/team', icon: Users },
  { name: 'Daily Updates', href: '/manager/daily-updates', icon: CalendarCheck },
  { name: 'Reviews', href: '/manager/reviews', icon: ShieldCheck },
  { name: 'Reports', href: '/manager/reports', icon: BarChart3 },
  { name: 'Profile', href: '/manager/profile', icon: User },
];

export default function ManagerSidebar({ isOpen, onClose }: ManagerSidebarProps) {
  const pathname = usePathname();
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111827] text-white border-r border-gray-800/90 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-6">
            <Link href="/manager/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#65a30d] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="text-base font-bold text-white tracking-tight block">
                  Ingage <span className="text-[#65a30d]">TaskFlow</span>
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                  Project &amp; Daily Work
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Section Label matching screenshot */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
            MANAGER WORKSPACE
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {MANAGER_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/manager/dashboard'
                  ? pathname === '/manager/dashboard' || pathname === '/manager'
                  : item.href === '/manager/team'
                  ? pathname.startsWith('/manager/team') || pathname.startsWith('/manager/members')
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#65a30d] text-white shadow-sm shadow-[#65a30d]/30'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[2.2] shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Manager Profile & Switch Section */}
        <div className="p-3 border-t border-gray-800/80 bg-[#0e1422] relative space-y-1">
          {/* Settings link */}
          <Link
            href="/manager/profile"
            className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </Link>

          {/* Profile Card */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-gray-800/40 border border-gray-800/60">
            <Link href="/manager/profile" className="flex items-center gap-2.5 truncate flex-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                PS
              </div>
              <div className="truncate text-left leading-tight">
                <p className="text-xs font-semibold text-white truncate">Priya Singh</p>
                <p className="text-[10px] text-gray-400 truncate">manager@company.com</p>
              </div>
            </Link>

            <button
              onClick={() => setShowSwitchMenu(!showSwitchMenu)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/60 transition-colors"
              title="Switch to Admin Workspace"
            >
              <Repeat className="w-3.5 h-3.5 text-lime-400" />
            </button>
          </div>

          {/* Switch menu */}
          {showSwitchMenu && (
            <div className="absolute bottom-20 right-3 left-3 bg-[#1e293b] border border-gray-700 rounded-xl p-2 shadow-2xl text-xs z-50 animate-fadeIn">
              <p className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1">SWITCH WORKSPACE</p>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors font-medium"
              >
                <div className="w-5 h-5 rounded bg-lime-500 text-gray-950 font-bold text-[10px] flex items-center justify-center">
                  AD
                </div>
                <span>Admin Workspace</span>
              </Link>
              <Link
                href="/user/dashboard"
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors font-medium"
              >
                <div className="w-5 h-5 rounded bg-emerald-500 text-gray-950 font-bold text-[10px] flex items-center justify-center">
                  US
                </div>
                <span>User / Member Workspace</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

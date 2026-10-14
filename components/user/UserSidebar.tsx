'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CheckSquare,
  FolderOpen,
  PlusCircle,
  History,
  User,
  MoreVertical,
  X,
  LogOut,
  ShieldCheck,
  Crown,
  Check,
} from 'lucide-react';
import { useState } from 'react';

interface UserSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const USER_NAV_ITEMS = [
  { name: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
  { name: 'My Tasks', href: '/user/tasks', icon: CheckSquare },
  { name: 'My Projects', href: '/user/projects', icon: FolderOpen },
  { name: 'Add Daily Update', href: '/user/add-update', icon: PlusCircle },
  { name: 'My Work History', href: '/user/history', icon: History },
  { name: 'Profile', href: '/user/profile', icon: User },
];

export default function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111827] text-white border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header & Brand matching user mockups */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-6">
            <Link href="/user/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-[#65a30d] flex items-center justify-center text-white shadow-md shadow-lime-950/40 transition-transform group-hover:scale-105">
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
                <span className="text-[10px] font-semibold text-lime-400 tracking-wider uppercase block">
                  Employee Workspace
                </span>
              </div>
            </Link>

            {/* Mobile close button */}
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Section Label */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>User Workspace</span>
            <span className="text-[9px] font-extrabold text-[#65a30d]">ACTIVE</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {USER_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/user/dashboard'
                  ? pathname === '/user/dashboard' || pathname === '/user'
                  : item.href === '/user/add-update'
                  ? pathname === '/user/add-update' || pathname === '/user/daily-updates'
                  : item.href === '/user/history'
                  ? pathname === '/user/history' || pathname === '/user/work-history'
                  : pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (onClose) onClose();
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#65a30d] text-white font-semibold shadow-sm shadow-lime-950/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 stroke-[2] shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.name === 'Add Daily Update' && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-3 m-3 rounded-xl bg-slate-850/80 bg-slate-900 border border-slate-800 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-[#65a30d] text-white font-bold text-xs flex items-center justify-center ring-2 ring-slate-800">
                  RS
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              </div>
              <div className="truncate text-left leading-tight">
                <p className="text-xs font-semibold text-white truncate">Rahul Sharma</p>
                <p className="text-[11px] text-slate-400 truncate">rahul.sharma@company.com</p>
                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-800 text-lime-400 border border-slate-700">
                  Employee
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="User actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Menu */}
          {showMenu && (
            <div className="absolute bottom-16 right-0 left-0 bg-[#1e293b] border border-slate-700 rounded-xl p-1.5 shadow-xl text-xs z-50 animate-fadeIn space-y-1">
              <Link
                href="/user/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <User className="w-3.5 h-3.5 text-lime-400" />
                <span>Account Profile</span>
              </Link>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <Crown className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>Switch to Admin View</span>
              </Link>
              <Link
                href="/manager/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch to Manager View</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                onClick={() => setShowMenu(false)}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

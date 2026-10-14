'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Users,
  ShieldCheck,
  CalendarCheck,
  BarChart3,
  Settings,
  MoreVertical,
  LogOut,
  UserCheck,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_ITEMS = [
  { name: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Assignments', href: '/assignments', icon: ClipboardList },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Managers', href: '/managers', icon: ShieldCheck },
  { name: 'Daily Updates', href: '/daily-updates', icon: CalendarCheck },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Manager View', href: '/manager/dashboard', icon: ShieldCheck },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

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
            <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
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
                  Admin Workspace
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

          {/* Section Label */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2 flex items-center justify-between">
            <span>WORKSPACE NAVIGATION</span>
            <span className="text-[9px] font-extrabold text-[#65a30d]">ADMIN</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin/dashboard'
                  ? pathname === '/admin/dashboard' || pathname === '/dashboard' || pathname === '/admin'
                  : item.href === '/manager/dashboard'
                  ? pathname.startsWith('/manager')
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

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-gray-800/80 bg-[#0e1422] relative">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-800/60 transition-colors">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lime-600 to-lime-400 text-gray-950 font-bold text-xs flex items-center justify-center shrink-0">
                AD
              </div>
              <div className="truncate text-left leading-tight">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white truncate">Rahul Sharma</p>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#65a30d] text-white">
                    Admin
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 truncate">admin@company.com</p>
              </div>
            </div>

            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/60 transition-colors"
              aria-label="User menu"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* User popup menu */}
          {showUserMenu && (
            <div className="absolute bottom-16 right-3 left-3 bg-[#1e293b] border border-gray-700 rounded-xl p-1.5 shadow-xl text-xs z-50 animate-fadeIn">
              <Link
                href="/users"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <UserCheck className="w-3.5 h-3.5 text-lime-400" />
                <span>Switch Role / Profile</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                onClick={() => setShowUserMenu(false)}
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

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FolderOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  Paperclip,
  ChevronRight,
  Sparkles,
  FileText,
  User,
  ShieldCheck,
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';

export default function UserDashboardPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <UserLayout searchPlaceholder="Search projects, tasks, or updates...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header matching mockup */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>WORKSPACE</span>
            <span>/</span>
            <span className="text-[#65a30d] font-bold">OVERVIEW</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track your tasks, assigned projects, and submit daily work progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium text-xs shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Jun 10, 2025 • Week 24</span>
          </div>

          <Link
            href="/user/add-update"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Daily Update</span>
          </Link>
        </div>
      </div>

      {/* 1. KPI Summary Cards Grid (4-card row) matching HTML 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Card 1: My Projects */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">My Projects</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <FolderOpen className="w-5 h-5 text-slate-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">3</span>
              <span className="text-xs font-medium text-slate-500">active assigned</span>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                +1 new assignment
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Tasks Completed */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tasks Completed</span>
            <div className="w-10 h-10 rounded-xl bg-lime-50 flex items-center justify-center text-[#65a30d]">
              <CheckCircle2 className="w-5 h-5 text-[#65a30d]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">8</span>
              <span className="text-xs font-medium text-slate-500">in current sprint</span>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-lime-50 text-lime-800 border border-lime-200/60 text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-[#65a30d]" />
                Sprint 4 on track
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: In Progress */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">In Progress</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <Clock className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">5</span>
              <span className="text-xs font-medium text-slate-500">assigned items</span>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                2 due this week
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Blocked Tasks */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Blocked Tasks</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-600 tracking-tight">1</span>
              <span className="text-xs font-medium text-slate-500">task flagged</span>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                Needs attention
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Weekly Activity Chart (60%) & Assigned Projects (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left: Weekly Activity Card (7 cols / ~60%) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly Activity</h2>
              <p className="text-xs text-slate-500 mt-0.5">14 updates logged across week • avg 7.5 hrs/day</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#65a30d]" />
                Logged Hours
              </span>
            </div>
          </div>

          {/* Histogram Chart Area */}
          <div className="relative pt-8 pb-3">
            <div className="relative h-44 flex items-end justify-between px-4 sm:px-6">
              {[
                { day: 'Mon', hrs: '6.5h', height: '65%', bg: 'bg-lime-200', peak: false },
                { day: 'Tue', hrs: '8.0h', height: '80%', bg: 'bg-lime-300', peak: false },
                { day: 'Wed', hrs: '7.5h', height: '75%', bg: 'bg-lime-400', peak: false },
                { day: 'Thu', hrs: '9.2h', height: '94%', bg: 'bg-[#65a30d]', peak: true },
                { day: 'Fri', hrs: '8.5h', height: '85%', bg: 'bg-lime-500', peak: false },
                { day: 'Sat', hrs: '2.0h', height: '20%', bg: 'bg-slate-200', peak: false },
                { day: 'Sun', hrs: '0.0h', height: '5%', bg: 'bg-slate-100', peak: false },
              ].map((bar) => (
                <div key={bar.day} className="flex flex-col items-center gap-2 flex-1 group">
                  <span
                    className={`font-mono text-xs transition-opacity ${
                      bar.peak ? 'text-[#4d7c0f] font-bold opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {bar.hrs}
                  </span>
                  <div
                    className={`w-7 sm:w-10 rounded-t-md transition-all duration-200 ${bar.bg} ${
                      bar.peak ? 'ring-2 ring-lime-400/50 shadow-sm relative' : 'group-hover:bg-[#65a30d]'
                    }`}
                    style={{ height: bar.height }}
                  >
                    {bar.peak && (
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#3f6a00] ring-2 ring-white" />
                    )}
                  </div>
                  <span className={`text-xs mt-1 ${bar.peak ? 'font-bold text-[#4d7c0f]' : 'font-medium text-slate-500'}`}>
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer summary */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
              Sprint 4 Target: 38 / 40 hrs logged
            </span>
            <span className="font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
              Total: 41.7 hrs
            </span>
          </div>
        </div>

        {/* Right: My Assigned Projects Card (5 cols / ~40%) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">My Assigned Projects</h2>
              <p className="text-xs text-slate-500 mt-0.5">3 active assignments</p>
            </div>
            <Link
              href="/user/projects"
              className="text-xs font-semibold text-[#65a30d] hover:text-[#4d7c0f] flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 py-2">
            {/* Project 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-sm font-semibold text-slate-800 truncate">Learning Management System</span>
                  <span className="font-mono text-xs text-slate-400">PRJ-2025-01</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-lime-100 text-[#4d7c0f]">
                  5 days left
                </span>
              </div>
              <div className="mt-2.5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-800">75%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Manager: Priya Singh
                </span>
                <span>Due 2025-06-15</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-sm font-semibold text-slate-800 truncate">CRM Portal</span>
                  <span className="font-mono text-xs text-slate-400">PRJ-2025-04</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-200 text-slate-700">
                  10 days left
                </span>
              </div>
              <div className="mt-2.5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-800">45%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Manager: Priya Singh
                </span>
                <span>Due 2025-06-20</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex flex-col min-w-0 pr-2">
                  <span className="text-sm font-semibold text-slate-800 truncate">Employee Management System</span>
                  <span className="font-mono text-xs text-slate-400">PRJ-2025-08</span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-200 text-slate-700">
                  15 days left
                </span>
              </div>
              <div className="mt-2.5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-800">30%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Manager: Sneha Patel
                </span>
                <span>Due 2025-06-25</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Recent Daily Updates (60%) & Deadlines / Drafts (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Recent Daily Updates (7 cols / ~60%) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Daily Updates</h2>
                <p className="text-xs text-slate-500 mt-0.5">Your recently logged tasks and manager reviews</p>
              </div>
              <Link
                href="/user/history"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <span>All Statuses</span>
              </Link>
            </div>

            {/* Updates Timeline List */}
            <div className="flex flex-col gap-3.5 mt-4">
              {/* Update 1 */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 transition-all flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-semibold shadow-2xs">
                      Today, 09:30 AM
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Learning Management System</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                    Pending Review
                  </span>
                </div>
                <p className="text-sm text-slate-800 font-normal leading-relaxed">
                  Completed login page UI with responsive design and integrated form validation using Zod.
                </p>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[#65a30d] font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      100% Progress
                    </span>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>3 attachments</span>
                    </div>
                  </div>
                  <Link
                    href="/user/history"
                    className="text-[#65a30d] hover:text-[#4d7c0f] font-semibold flex items-center gap-0.5 hover:underline"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Update 2 */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 transition-all flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-semibold shadow-2xs">
                      Yesterday, 05:45 PM
                    </span>
                    <span className="text-xs font-semibold text-slate-600">Learning Management System</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    Approved
                  </span>
                </div>
                <p className="text-sm text-slate-800 font-normal leading-relaxed">
                  Created modular authentication hooks and session validation state. Integrated refresh token rotation.
                </p>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      80% Progress
                    </span>
                    <span className="text-slate-400">Reviewed by Priya Singh</span>
                  </div>
                  <Link
                    href="/user/history"
                    className="text-[#65a30d] hover:text-[#4d7c0f] font-semibold flex items-center gap-0.5 hover:underline"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Update 3 */}
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:bg-white hover:border-slate-300 transition-all flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-semibold shadow-2xs">
                      Jun 08, 2025
                    </span>
                    <span className="text-xs font-semibold text-slate-600">CRM Portal</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    Approved
                  </span>
                </div>
                <p className="text-sm text-slate-800 font-normal leading-relaxed">
                  Refactored client leads table pagination and sorting controls with unified server-side query state.
                </p>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[#65a30d] font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      100% Progress
                    </span>
                  </div>
                  <Link
                    href="/user/history"
                    className="text-[#65a30d] hover:text-[#4d7c0f] font-semibold flex items-center gap-0.5 hover:underline"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end">
            <Link
              href="/user/history"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#65a30d] hover:text-[#4d7c0f] hover:underline"
            >
              <span>View All My Updates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Upcoming Deadlines & Quick Draft (5 cols / ~40%) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Deadlines Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Upcoming Deadlines</h2>
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold">
                3
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-3">
              {/* Deadline 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">LMS - Final Testing</span>
                    <span className="text-xs text-slate-500">Due Jun 15, 2025</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[11px] font-bold">
                    High
                  </span>
                  <span className="font-mono text-xs text-rose-600 font-semibold">5 days left</span>
                </div>
              </div>

              {/* Deadline 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">CRM Portal - API &amp; Table Dev</span>
                    <span className="text-xs text-slate-500">Due Jun 20, 2025</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[11px] font-semibold">
                    Medium
                  </span>
                  <span className="font-mono text-xs text-slate-500">10 days left</span>
                </div>
              </div>

              {/* Deadline 3 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">EMS - UI Design System Review</span>
                    <span className="text-xs text-slate-500">Due Jun 25, 2025</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px] font-semibold">
                    Normal
                  </span>
                  <span className="font-mono text-xs text-slate-500">15 days left</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Draft Floating Prompt matching screenshot */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-lime-50/70 to-emerald-50/40 border border-lime-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-lime-200/60 flex items-center justify-center text-lime-800 shrink-0">
                <FileText className="w-5 h-5 text-[#4d7c0f]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">Unsaved Update Draft</span>
                <p className="text-xs text-slate-600 mt-0.5">
                  You have 1 unsaved daily update draft from today for{' '}
                  <span className="font-semibold text-slate-900">CRM Portal</span>.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-lime-200/50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Saved today at 11:14 AM</span>
              <Link
                href="/user/add-update"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Resume Draft</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

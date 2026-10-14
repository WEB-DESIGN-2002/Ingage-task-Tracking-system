'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Filter,
  CheckCircle2,
  FolderKanban,
  Users,
  AlertTriangle,
  ClipboardList,
  Check,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  MoreVertical,
  CheckCheck,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

export default function ManagerDashboardPage() {
  const [filterMode, setFilterMode] = useState<'all' | 'pending'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <ManagerLayout searchPlaceholder="Search projects, tasks, or updates...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          WORKSPACE &gt; <span className="text-[#65a30d]">MANAGER DASHBOARD</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Manager Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Monitor your distributed team, sprint deliveries, and assigned projects.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Jun 10, 2025 • Week 24</span>
            </div>
            <button
              onClick={() => showToast('Manager filter view toggled.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>Filter View</span>
            </button>
            <Link
              href="/manager/team"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Assign Work</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Green Banner: Daily Submissions Awaiting Approval */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-2xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] border border-lime-100 flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-bold text-gray-900">
                Daily Submissions Awaiting Approval
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-xs">
                6 Pending
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Rahul Sharma, Priya Singh, and 2 others logged progress today requiring manager review.
            </p>
          </div>
        </div>

        <Link
          href="/manager/daily-updates"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all shrink-0"
        >
          <span>Review Updates</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 6 KPI Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
        {/* KPI 1 */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">ASSIGNED PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">5</span>
            <p className="text-[10px] font-bold text-[#65a30d] mt-0.5">↗ +1 this month</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">TEAM MEMBERS</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">8</span>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
              <span className="font-semibold text-gray-600">+5 reports</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">UPDATES RECVD</span>
            <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">23</span>
            <p className="text-[10px] text-gray-500 mt-0.5">Today&apos;s logs logged</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">PENDING REVIEWS</span>
            <ClipboardList className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">6</span>
            <p className="text-[10px] font-bold text-[#65a30d] mt-0.5">• Action required</p>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">BLOCKED TASKS</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-red-600 tabular-nums">2</span>
            <p className="text-[10px] font-bold text-red-600 mt-0.5">Needs intervention</p>
          </div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">COMPLETED TASKS</span>
            <Check className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">12</span>
            <p className="text-[10px] text-gray-500 mt-0.5">Sprint 4 milestone</p>
          </div>
        </div>
      </div>

      {/* Row 2: Project Progress (4) + Daily Activity (4) + Employee Workload (4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        {/* Project Progress Donut Card */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Project Progress</h2>
              <p className="text-xs text-gray-400">Active delivery health status</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Donut */}
          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* 5 Projects Total: On Track 3 (60%), At Risk 1 (20%), Delayed 1 (20%) */}
                {/* Circumference ≈ 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  stroke="#65a30d"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray="135.7 226.2"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  stroke="#0284c7"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray="45.2 226.2"
                  strokeDashoffset="-135.7"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  stroke="#ef4444"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray="45.2 226.2"
                  strokeDashoffset="-180.9"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-gray-900 leading-none">5</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">PROJECTS</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs px-2 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d]" />
                <span>On Track</span>
              </div>
              <span className="font-bold text-gray-900">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                <span>At Risk</span>
              </div>
              <span className="font-bold text-gray-900">1</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span>Delayed</span>
              </div>
              <span className="font-bold text-gray-900">1</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-400">Completion Velocity</span>
            <span className="font-bold text-[#65a30d]">82% on schedule</span>
          </div>
        </div>

        {/* Daily Activity Wave Chart */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Daily Activity</h2>
              <p className="text-xs text-gray-400">Team update logs submitted over 7 days</p>
            </div>
            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
              This Week
            </span>
          </div>

          <div className="relative w-full h-44 pt-2">
            <svg viewBox="0 0 350 140" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="managerDailyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#65a30d" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#65a30d" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="10" y1="110" x2="340" y2="110" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="10" y1="65" x2="340" y2="65" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

              <path
                d="M 15 100 Q 55 90, 85 85 T 145 92 T 205 30 T 265 110 T 335 45 L 335 125 L 15 125 Z"
                fill="url(#managerDailyGradient)"
              />
              <path
                d="M 15 100 Q 55 90, 85 85 T 145 92 T 205 30 T 265 110 T 335 45"
                fill="none"
                stroke="#65a30d"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <circle cx="205" cy="30" r="4.5" fill="#ffffff" stroke="#65a30d" strokeWidth="2.5" />
            </svg>

            {/* Peak label badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
              14 logs
            </div>
          </div>

          <div className="flex justify-between text-[11px] text-gray-400 font-medium px-2 pt-2 border-t border-gray-100">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span className="font-bold text-[#65a30d]">Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Employee Workload Card */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Employee Workload</h2>
                <p className="text-xs text-gray-400">Active task distribution per member</p>
              </div>
              <span className="text-[10px] font-semibold text-gray-400">Max: 8</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-gray-800 mb-1">
                  <span>Rahul S.</span>
                  <span className="font-mono text-gray-500">6 / 8</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-gray-800 mb-1">
                  <span>Priya S.</span>
                  <span className="font-mono font-bold text-[#65a30d]">7 / 8</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4d7c0f] rounded-full" style={{ width: '87.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-gray-800 mb-1">
                  <span>Amit K.</span>
                  <span className="font-mono text-gray-500">4 / 8</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#84cc16] rounded-full" style={{ width: '50%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-gray-800 mb-1">
                  <span>Sneha P.</span>
                  <span className="font-mono text-gray-500">3 / 8</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#a3e635] rounded-full" style={{ width: '37.5%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mt-4">
            <span className="text-gray-500">
              Team Capacity: <strong className="text-gray-900">62.5%</strong>
            </span>
            <Link href="/manager/team" className="font-semibold text-[#65a30d] hover:underline">
              Rebalance
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Work Updates (8 cols) + Upcoming Deadlines (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Work Updates Table */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Recent Work Updates</h3>
                <p className="text-xs text-gray-400">Real-time daily task submissions submitted today</p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    filterMode === 'all'
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  All Projects
                </button>
                <button
                  onClick={() => setFilterMode('pending')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    filterMode === 'pending'
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Pending Only
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    RS
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-xs text-gray-900">Rahul Sharma</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded">
                        LMS
                      </span>
                      <span className="text-[10px] text-gray-400">• 2 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Implemented user authentication pipeline with NextAuth and token...
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                    Pending Review
                  </span>
                  <Link
                    href="/manager/daily-updates"
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    PS
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-xs text-gray-900">Priya Singh</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded">
                        CRM Portal
                      </span>
                      <span className="text-[10px] text-gray-400">• 4 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Finalized high-fidelity Figma components for the analytics reporting...
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                    Under Review
                  </span>
                  <Link
                    href="/manager/daily-updates"
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    AK
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-xs text-gray-900">Amit Kumar</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded">
                        EMS
                      </span>
                      <span className="text-[10px] text-gray-400">• 6 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Resolved memory leak in live socket connection table rerenders.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-[10px] font-bold">
                    Approved
                  </span>
                  <Link
                    href="/manager/daily-updates"
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Item 4 */}
              <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    SP
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-xs text-gray-900">Sneha Patel</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-gray-200 text-gray-700 rounded">
                        CRM Portal
                      </span>
                      <span className="text-[10px] text-gray-400">• 7 hours ago</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Found CORS blocked issue on staging API endpoint v2/leads/export.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold">
                    Blocked Item
                  </span>
                  <Link
                    href="/manager/daily-updates"
                    className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs mt-3">
            <span className="text-gray-400">Showing 4 of 23 recent daily reports</span>
            <Link
              href="/manager/daily-updates"
              className="font-bold text-[#65a30d] hover:underline flex items-center gap-1"
            >
              <span>View All Daily Updates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Upcoming Deadlines</h3>
                <p className="text-xs text-gray-400">Critical target milestones</p>
              </div>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3">
              {/* Deadline 1 */}
              <div className="p-3 rounded-xl border border-red-100 bg-red-50/40">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                    High Priority
                  </span>
                  <span className="font-mono text-gray-500 font-medium">2025-06-15</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5">LMS — Final Testing</h4>
                <p className="text-[11px] text-gray-500 leading-snug">
                  End-to-end integration checklist before client sign-off.
                </p>
                <div className="flex items-center justify-between text-[10px] font-semibold mt-2 pt-2 border-t border-red-100/60">
                  <span className="text-gray-500">Owner: Rahul Sharma</span>
                  <span className="text-red-600 font-bold">5 days left</span>
                </div>
              </div>

              {/* Deadline 2 */}
              <div className="p-3 rounded-xl border border-blue-100 bg-blue-50/40">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[10px]">
                    Medium Priority
                  </span>
                  <span className="font-mono text-gray-500 font-medium">2025-06-20</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5">CRM Portal — API Dev</h4>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Lead synchronization &amp; webhooks dispatch hardening.
                </p>
                <div className="flex items-center justify-between text-[10px] font-semibold mt-2 pt-2 border-t border-blue-100/60">
                  <span className="text-gray-500">Owner: Priya Singh</span>
                  <span className="text-blue-600 font-bold">10 days left</span>
                </div>
              </div>

              {/* Deadline 3 */}
              <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/60">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 font-bold text-[10px]">
                    Normal
                  </span>
                  <span className="font-mono text-gray-500 font-medium">2025-06-25</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 mb-0.5">EMS — UI Design System</h4>
                <p className="text-[11px] text-gray-500 leading-snug">
                  Tailwind token harmonization and component library sync.
                </p>
                <div className="flex items-center justify-between text-[10px] font-semibold mt-2 pt-2 border-t border-gray-200/60">
                  <span className="text-gray-500">Owner: Amit Kumar</span>
                  <span className="text-gray-600 font-bold">15 days left</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToast('Full sprint calendar modal opened.')}
            className="w-full mt-3 py-2 px-3 bg-blue-50/70 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Open Full Sprint Calendar</span>
          </button>
        </div>
      </div>
    </ManagerLayout>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Filter,
  FolderKanban,
  Zap,
  CheckCircle2,
  Users,
  AlertCircle,
  MoreVertical,
  Plus,
  UserPlus,
  UserCheck,
  FileSpreadsheet,
  Clock,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';

export default function DashboardPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <WorkspaceLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            ENTERPRISE ADMINISTRATION &gt; <span className="text-[#65a30d]">ADMIN DASHBOARD</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-100 text-[#4d7c0f] text-xs font-bold border border-lime-300">
            <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
            <span>Admin Active View</span>
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Admin Dashboard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-900 text-white text-xs font-bold tracking-wide">
                Super Admin
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Complete administrative overview of active enterprise projects, manager reviews, and team velocity.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              <span>Admin Management Hub</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Jun 10, 2025 • Week 24</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Total Projects</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">12</span>
              <span className="text-[11px] font-bold text-[#65a30d] flex items-center">
                ↗ +2 this month
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Total active pipeline</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Active Projects</span>
            <div className="w-7 h-7 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">8</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-50 text-[#4d7c0f] border border-lime-200/60">
                • 6 on schedule
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">66.7% operational load</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Completed</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">3</span>
              <span className="text-[11px] font-semibold text-gray-500">Target: 4 Q2</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Signed off by clients</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Team Members</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">15</span>
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-blue-500 text-[10px] text-white font-bold text-center leading-6">RS</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-purple-500 text-[10px] text-white font-bold text-center leading-6">PS</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-amber-500 text-[10px] text-white font-bold text-center leading-6">AK</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">100% capacity deployed</p>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Pending Reviews</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-red-600 tabular-nums">5</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/60">
                Needs action
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">3 daily tasks, 2 PRs</p>
          </div>
        </div>
      </div>

      {/* Middle Section: Project Status + Daily Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        {/* Project Status Donut Card (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Project Status</h2>
              <p className="text-xs text-gray-400">Current lifecycle distribution</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Donut */}
          <div className="flex items-center justify-center my-3">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Total = 12. Circumference = 2 * PI * 36 ≈ 226.19 */}
                {/* In Progress = 8 (66.67%) -> dasharray = 150.8 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  stroke="#65a30d"
                  strokeWidth="13"
                  fill="transparent"
                  strokeDasharray="150.8 226.2"
                  strokeDashoffset="0"
                />
                {/* Completed = 3 (25%) -> dasharray = 56.55 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  stroke="#0284c7"
                  strokeWidth="13"
                  fill="transparent"
                  strokeDasharray="56.55 226.2"
                  strokeDashoffset="-150.8"
                />
                {/* On Hold = 1 (8.33%) -> dasharray = 18.85 226.2 */}
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  stroke="#ef4444"
                  strokeWidth="13"
                  fill="transparent"
                  strokeDasharray="18.85 226.2"
                  strokeDashoffset="-207.35"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-gray-900 leading-none tabular-nums">12</span>
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">TOTAL</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-around text-xs pt-3 border-t border-gray-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d]" />
                <span className="text-[11px]">In Progress</span>
              </div>
              <span className="font-extrabold text-gray-900 tabular-nums">8</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                <span className="text-[11px]">Completed</span>
              </div>
              <span className="font-extrabold text-gray-900 tabular-nums">3</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-0.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="text-[11px]">On Hold</span>
              </div>
              <span className="font-extrabold text-gray-900 tabular-nums">1</span>
            </div>
          </div>
        </div>

        {/* Daily Team Activity Line Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Daily Team Activity</h2>
              <p className="text-xs text-gray-400">Updates submitted across teams over last 7 days</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#4d7c0f] bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d]" />
              <span>Work Deliveries (Avg: 11.2/day)</span>
            </span>
          </div>

          {/* Smooth Curved Line Graph */}
          <div className="w-full h-40 pt-2">
            <svg viewBox="0 0 400 130" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="dashboardActivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#65a30d" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#65a30d" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Background guidelines */}
              <line x1="20" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="20" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="20" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area */}
              <path
                d="M 20 100 Q 75 60, 135 78 T 255 35 T 320 65 T 380 60 L 380 120 L 20 120 Z"
                fill="url(#dashboardActivityGradient)"
              />
              {/* Stroke */}
              <path
                d="M 20 100 Q 75 60, 135 78 T 255 35 T 320 65 T 380 60"
                fill="none"
                stroke="#65a30d"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="20" cy="100" r="3" fill="#65a30d" />
              <circle cx="80" cy="70" r="3" fill="#65a30d" />
              <circle cx="140" cy="80" r="3" fill="#65a30d" />
              <circle cx="195" cy="70" r="3" fill="#65a30d" />
              <circle cx="255" cy="35" r="4.5" fill="#ffffff" stroke="#65a30d" strokeWidth="2.5" />
              <circle cx="320" cy="65" r="3" fill="#65a30d" />
              <circle cx="380" cy="60" r="3" fill="#65a30d" />
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-gray-400 font-medium px-2 pt-2 border-t border-gray-100">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span className="font-bold text-[#65a30d]">Thu (Peak 14)</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Quick Actions Card (3 cols) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              QUICK ACTIONS
            </h2>
            <div className="space-y-2.5">
              <Link
                href="/projects/create"
                className="w-full py-2.5 px-3.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 group"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create Project</span>
              </Link>

              <Link
                href="/users/add"
                className="w-full py-2 px-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200/80 transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4 text-gray-500" />
                <span>Add User</span>
              </Link>

              <Link
                href="/assignments"
                className="w-full py-2 px-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200/80 transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-gray-500" />
                <span>Assign Team</span>
              </Link>

              <button
                onClick={() => showToast('Exporting active project pipeline report to Excel...')}
                className="w-full py-2 px-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl border border-gray-200/80 transition-all flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#65a30d]" />
                <span>Export Excel</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 text-center">
            Automated sync every 15 mins
          </div>
        </div>
      </div>

      {/* Bottom Row: Project Progress (4 cols) + Upcoming Deadlines (4 cols) + Recent Work Updates (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Project Progress */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Project Progress</h3>
                <p className="text-xs text-gray-400">Key enterprise milestones</p>
              </div>
              <Link href="/projects" className="text-xs font-semibold text-[#65a30d] hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4 text-xs">
              {/* LMS */}
              <div>
                <div className="flex items-center justify-between mb-1 font-semibold text-gray-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-[#65a30d]" />
                    <span>Learning Management System</span>
                  </div>
                  <span className="font-bold text-[#65a30d]">75%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '75%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Sprint 4 of 6</span>
                  <span>Due Jun 15</span>
                </div>
              </div>

              {/* CRM */}
              <div>
                <div className="flex items-center justify-between mb-1 font-semibold text-gray-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-sky-500" />
                    <span>CRM Portal &amp; Client Hub</span>
                  </div>
                  <span className="font-bold text-sky-600">45%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '45%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Sprint 2 of 5</span>
                  <span>Due Jun 20</span>
                </div>
              </div>

              {/* EMS */}
              <div>
                <div className="flex items-center justify-between mb-1 font-semibold text-gray-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-gray-400" />
                    <span>Employee Management System</span>
                  </div>
                  <span className="font-bold text-gray-600">30%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: '30%' }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Architecture Phase</span>
                  <span>Due Jun 25</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Upcoming Deadlines</h3>
                <p className="text-xs text-gray-400">Critical release cutoffs</p>
              </div>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3">
              {/* Deadline 1 */}
              <div className="p-2.5 rounded-xl border border-red-100 bg-red-50/40 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">LMS — Final Testing</p>
                  <p className="text-[10px] text-gray-500">QA Automation pass</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-red-600 block">2025-06-15</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                    HIGH
                  </span>
                </div>
              </div>

              {/* Deadline 2 */}
              <div className="p-2.5 rounded-xl border border-blue-100 bg-blue-50/40 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">CRM Portal — API Dev</p>
                  <p className="text-[10px] text-gray-500">REST endpoint freeze</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-blue-600 block">2025-06-20</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                    MEDIUM
                  </span>
                </div>
              </div>

              {/* Deadline 3 */}
              <div className="p-2.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-900">EMS — UI/UX Design System</p>
                  <p className="text-[10px] text-gray-500">Figma token sync</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-600 block">2025-06-25</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                    NORMAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Work Updates */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Recent Work Updates</h3>
                <p className="text-xs text-gray-400">Daily developer log stream</p>
              </div>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-3 text-xs">
              {/* Update 1 */}
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  RS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-gray-900">Rahul Sharma</span>
                    <span className="text-[10px] text-gray-400">2 hrs ago</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-tight">
                    Completed login page UI responsive design
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 bg-gray-100 text-gray-700 rounded">
                      LMS
                    </span>
                    <span className="text-[9px] font-semibold text-[#4d7c0f] flex items-center gap-0.5">
                      ✓ Done
                    </span>
                  </div>
                </div>
              </div>

              {/* Update 2 */}
              <div className="flex items-start gap-2.5 pb-2.5 border-b border-gray-100">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  PS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-gray-900">Priya Singh</span>
                    <span className="text-[10px] text-gray-400">4 hrs ago</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-tight">
                    Reviewed UI components &amp; test coverage
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 bg-gray-100 text-gray-700 rounded">
                      CRM Portal
                    </span>
                    <span className="text-[9px] font-semibold text-blue-600 flex items-center gap-0.5">
                      ↻ In Review
                    </span>
                  </div>
                </div>
              </div>

              {/* Update 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  AK
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-gray-900">Amit Kumar</span>
                    <span className="text-[10px] text-gray-400">6 hrs ago</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-tight">
                    Fixed database schema migrations
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-semibold px-1.5 py-0.2 bg-gray-100 text-gray-700 rounded">
                      EMS
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-600 flex items-center gap-0.5">
                      ✓ Merged
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

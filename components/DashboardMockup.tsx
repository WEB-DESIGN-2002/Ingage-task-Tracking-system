'use client';

import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Users,
  ShieldCheck,
  CalendarCheck,
  BarChart3,
  Settings,
  Search,
  Bell,
  CheckCircle2,
  Zap,
  Check,
  Plus,
  UserPlus,
  FileSpreadsheet,
  ChevronRight,
} from 'lucide-react';

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[620px] lg:max-w-none mx-auto select-none">
      {/* Glow / Soft Shadow backdrop */}
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-lime-200/40 via-emerald-100/20 to-transparent rounded-3xl blur-2xl -z-10"
        aria-hidden="true"
      />

      {/* Main Desktop Dashboard Window */}
      <div className="bg-[#111827] rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-800 overflow-hidden text-gray-800 transition-all duration-300">
        {/* Window Chrome / Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b0f19] border-b border-gray-800/80">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
            <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
            <span>app.ingagetaskflow.com/dashboard</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Dashboard Body with Dark Sidebar + White Canvas */}
        <div className="grid grid-cols-12 min-h-[440px] sm:min-h-[480px]">
          {/* Dark Sidebar */}
          <div className="hidden sm:flex sm:col-span-4 lg:col-span-3 bg-[#111827] border-r border-gray-800/80 p-3.5 flex-col justify-between">
            <div className="space-y-4">
              {/* App Brand in Sidebar */}
              <div className="flex items-center gap-2 px-2 py-1">
                <div className="w-7 h-7 rounded-lg bg-[#65a30d] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  IT
                </div>
                <span className="text-sm font-bold text-white tracking-tight">
                  IngageTaskFlow
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 text-xs">
                {/* Active Dashboard */}
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-[#65a30d] text-white font-medium shadow-sm">
                  <LayoutDashboard className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Dashboard</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors">
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors">
                  <ClipboardList className="w-3.5 h-3.5" />
                  <span>Assignments</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors">
                  <Users className="w-3.5 h-3.5" />
                  <span>Users</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Managers</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Daily Updates</span>
                </div>

                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Reports</span>
                </div>
              </nav>
            </div>

            {/* Bottom Sidebar Settings */}
            <div className="pt-3 border-t border-gray-800/80">
              <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-xs">
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-9 bg-[#f9fafb] p-3 sm:p-4.5 flex flex-col gap-3.5 overflow-hidden">
            {/* Top Bar with Search & Profile */}
            <div className="flex items-center justify-between gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-gray-400 text-xs flex-1 max-w-[200px]">
                <Search className="w-3.5 h-3.5" />
                <span className="text-gray-400 truncate">Search anything...</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative p-1 text-gray-500 hover:text-gray-700">
                  <Bell className="w-3.5 h-3.5" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#65a30d] rounded-full" />
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#d9f99d] text-[#365314] font-bold text-[10px] flex items-center justify-center">
                    A
                  </div>
                  <div className="hidden min-[450px]:block text-left leading-tight">
                    <p className="text-[11px] font-semibold text-gray-900">Admin</p>
                    <p className="text-[9px] text-gray-400 font-medium">Administrator</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 1: 4 Quick Stat Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {/* Stat 1 */}
              <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-[10px] font-medium">Total Projects</span>
                  <span className="p-1 rounded bg-amber-50 text-amber-600">📁</span>
                </div>
                <span className="text-base font-bold text-gray-900 mt-1 tabular-nums">12</span>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-[10px] font-medium">Active Projects</span>
                  <span className="p-1 rounded bg-amber-50 text-amber-500">
                    <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                  </span>
                </div>
                <span className="text-base font-bold text-gray-900 mt-1 tabular-nums">8</span>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-[10px] font-medium">Completed</span>
                  <span className="p-1 rounded bg-lime-50 text-[#65a30d]">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                </div>
                <span className="text-base font-bold text-gray-900 mt-1 tabular-nums">3</span>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-2.5 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="text-[10px] font-medium">Team Members</span>
                  <span className="p-1 rounded bg-blue-50 text-blue-600">
                    <Users className="w-3 h-3" />
                  </span>
                </div>
                <span className="text-base font-bold text-gray-900 mt-1 tabular-nums">15</span>
              </div>
            </div>

            {/* Row 2: Charts Row (Project Status Donut + Daily Team Activity Line) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Project Status Donut Card */}
              <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs">
                <p className="text-[11px] font-semibold text-gray-900 mb-2">Project Status</p>
                <div className="flex items-center justify-between gap-2">
                  {/* SVG Donut Chart */}
                  <div className="relative w-20 h-20 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      {/* Segment 1: In Progress (6 / 12 = 50%) -> dasharray: 125.6 251.2 */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#65a30d"
                        strokeWidth="11"
                        fill="transparent"
                        strokeDasharray="119.38 238.76"
                        strokeDashoffset="0"
                        className="transition-all"
                      />
                      {/* Segment 2: Completed (3 / 12 = 25%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#0ea5e9"
                        strokeWidth="11"
                        fill="transparent"
                        strokeDasharray="59.69 238.76"
                        strokeDashoffset="-119.38"
                      />
                      {/* Segment 3: On Hold (3 / 12 = 25%) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#f97316"
                        strokeWidth="11"
                        fill="transparent"
                        strokeDasharray="59.69 238.76"
                        strokeDashoffset="-179.07"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs font-extrabold text-gray-900 leading-none">12</span>
                      <span className="text-[8px] text-gray-400 font-medium">Total</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="space-y-1 text-[10px] text-gray-600 font-medium pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                      <span>In Progress</span>
                      <span className="font-bold text-gray-900 ml-auto tabular-nums">6</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0ea5e9]" />
                      <span>Completed</span>
                      <span className="font-bold text-gray-900 ml-auto tabular-nums">3</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f97316]" />
                      <span>On Hold</span>
                      <span className="font-bold text-gray-900 ml-auto tabular-nums">3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Team Activity Line Chart */}
              <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] font-semibold text-gray-900">Daily Team Activity</p>
                  <span className="text-[9px] font-semibold text-[#65a30d] bg-lime-50 px-1.5 py-0.5 rounded">
                    +18%
                  </span>
                </div>
                {/* Activity SVG Curve */}
                <div className="w-full h-16 pt-1">
                  <svg viewBox="0 0 200 60" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#65a30d" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#65a30d" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M 10 50 Q 50 45, 90 30 T 150 18 T 190 12 L 190 55 L 10 55 Z"
                      fill="url(#activityGradient)"
                    />
                    {/* Stroke line */}
                    <path
                      d="M 10 50 Q 50 45, 90 30 T 150 18 T 190 12"
                      fill="none"
                      stroke="#65a30d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Data dots */}
                    <circle cx="10" cy="50" r="2.5" fill="#65a30d" />
                    <circle cx="65" cy="40" r="2.5" fill="#65a30d" />
                    <circle cx="115" cy="24" r="2.5" fill="#65a30d" />
                    <circle cx="160" cy="16" r="2.5" fill="#65a30d" />
                    <circle cx="190" cy="12" r="3.5" fill="#65a30d" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                </div>
                {/* Days row */}
                <div className="flex justify-between text-[9px] text-gray-400 font-medium px-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                </div>
              </div>
            </div>

            {/* Row 3: Recent Updates List */}
            <div className="bg-white p-3 rounded-xl border border-gray-200/80 shadow-2xs">
              <p className="text-[11px] font-semibold text-gray-900 mb-2">Recent Updates</p>
              <div className="space-y-2 text-[11px]">
                {/* Update 1 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                    RS
                  </div>
                  <div className="flex-1 truncate">
                    <span className="font-semibold text-gray-900">Rahul Sharma</span>
                    <span className="text-gray-400 ml-1.5 font-normal text-[10px]">
                      Completed UI design for LMS
                    </span>
                  </div>
                </div>

                {/* Update 2 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                    PS
                  </div>
                  <div className="flex-1 truncate">
                    <span className="font-semibold text-gray-900">Priya Singh</span>
                    <span className="text-gray-400 ml-1.5 font-normal text-[10px]">
                      Updated API Integration
                    </span>
                  </div>
                </div>

                {/* Update 3 */}
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                    AK
                  </div>
                  <div className="flex-1 truncate">
                    <span className="font-semibold text-gray-900">Amit Kumar</span>
                    <span className="text-gray-400 ml-1.5 font-normal text-[10px]">
                      Fixed authentication issue
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mobile Companion Card (matching screenshot on bottom-right) */}
      <div className="absolute -bottom-8 -right-3 sm:-bottom-10 sm:-right-6 w-48 sm:w-56 bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border-4 border-white/90 ring-1 ring-gray-900/10 hidden min-[520px]:block transition-transform hover:scale-[1.02] duration-200">
        {/* Phone Notch indicator */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-2" />

        {/* Brand header */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d]" />
          <span className="text-[10px] font-bold text-gray-900">Ingage TaskFlow</span>
        </div>

        {/* Project Progress Gauge */}
        <div className="bg-gray-50/80 rounded-xl p-2.5 border border-gray-100 text-center mb-2.5">
          <p className="text-[9px] font-medium text-gray-500 mb-1">Project Progress</p>
          <div className="relative w-16 h-16 mx-auto">
            <svg viewBox="0 0 80 80" className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="#e5e7eb"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="#65a30d"
                strokeWidth="7"
                strokeDasharray="188.4"
                strokeDashoffset="47.1"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-900">75%</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 text-[8px] font-medium text-gray-500 mt-1">
            <span className="text-gray-700 font-semibold">• Completed 9</span>
            <span>• Pending 3</span>
          </div>
        </div>

        {/* Quick Actions List */}
        <div>
          <p className="text-[9px] font-bold text-gray-700 mb-1.5">Quick Actions</p>
          <div className="space-y-1 text-[9px] text-gray-700">
            <div className="flex items-center justify-between p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100/80 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-lime-100 text-[#65a30d] flex items-center justify-center font-bold text-[10px]">
                  +
                </span>
                <span className="font-medium">Create Project</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100/80 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
                  👤
                </span>
                <span className="font-medium">Add User</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100/80 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[10px]">
                  🤝
                </span>
                <span className="font-medium">Assign Team</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100/80 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">
                  📊
                </span>
                <span className="font-medium">Export Excel</span>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

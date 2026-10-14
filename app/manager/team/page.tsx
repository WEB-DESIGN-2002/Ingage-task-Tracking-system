'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Search,
  MessageSquare,
  Plus,
  FileSpreadsheet,
  Shuffle,
  ChevronRight,
  Sparkles,
  Zap,
  Lightbulb,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
  X,
  Check,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

interface TeamMemberDetail {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  initials: string;
  avatarColor: string;
  hoursToday: number;
  lastUpdate: string;
  lastUpdateText: string;
  bandwidth: number;
  bandwidthStatus: 'Over Capacity (92%)' | 'Optimal Load (70%)' | 'Optimal Load (75%)' | 'Optimal Load (80%)' | 'Available Capacity (40%)';
  statusColor: 'red' | 'lime' | 'gray';
  assignments: Array<{ name: string; percentage: number; color: string }>;
  stack: string[];
  canTakeMore?: boolean;
}

const TEAM_MEMBERS: TeamMemberDetail[] = [
  {
    id: 'tm-1',
    name: 'Rahul Sharma',
    role: 'Senior Frontend Engineer • Engineering',
    department: 'Frontend',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    initials: 'RS',
    avatarColor: 'bg-emerald-600',
    hoursToday: 8.5,
    lastUpdate: '2h ago',
    lastUpdateText: 'Completed login UI validation',
    bandwidth: 92,
    bandwidthStatus: 'Over Capacity (92%)',
    statusColor: 'red',
    assignments: [
      { name: 'LMS Enterprise Portal', percentage: 60, color: 'bg-gray-900' },
      { name: 'CRM Cloud Portal', percentage: 32, color: 'bg-red-500' },
    ],
    stack: ['React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'tm-2',
    name: 'Sneha Patel',
    role: 'Principal Backend Architect • Core Systems',
    department: 'Backend',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    initials: 'SP',
    avatarColor: 'bg-blue-600',
    hoursToday: 7.0,
    lastUpdate: '4h ago',
    lastUpdateText: 'Optimized Redis cluster sync',
    bandwidth: 70,
    bandwidthStatus: 'Optimal Load (70%)',
    statusColor: 'lime',
    assignments: [
      { name: 'CRM Cloud Portal', percentage: 40, color: 'bg-[#65a30d]' },
      { name: 'EMS Suite', percentage: 30, color: 'bg-blue-500' },
    ],
    stack: ['Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'tm-3',
    name: 'Amit Kumar',
    role: 'Senior QA & Automation Lead • Quality Ops',
    department: 'QA Automation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    initials: 'AK',
    avatarColor: 'bg-amber-600',
    hoursToday: 6.5,
    lastUpdate: '5h ago',
    lastUpdateText: 'Sprint regression pass completed',
    bandwidth: 75,
    bandwidthStatus: 'Optimal Load (75%)',
    statusColor: 'lime',
    assignments: [
      { name: 'EMS Suite', percentage: 50, color: 'bg-[#65a30d]' },
      { name: 'LMS Enterprise Portal', percentage: 25, color: 'bg-blue-500' },
    ],
    stack: ['Cypress', 'Playwright', 'Jest'],
  },
  {
    id: 'tm-4',
    name: 'Maya Chen',
    role: 'Lead UI/UX Designer • Product Design',
    department: 'Product Design',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    initials: 'MC',
    avatarColor: 'bg-purple-600',
    hoursToday: 8.0,
    lastUpdate: '1h ago',
    lastUpdateText: 'Shared checkout wireframes',
    bandwidth: 70,
    bandwidthStatus: 'Optimal Load (70%)',
    statusColor: 'lime',
    assignments: [
      { name: 'LMS Enterprise Portal', percentage: 50, color: 'bg-[#65a30d]' },
      { name: 'Design System Refactor', percentage: 20, color: 'bg-sky-500' },
    ],
    stack: ['Figma', 'Design Tokens', 'Tailwind'],
  },
  {
    id: 'tm-5',
    name: 'Vikram Sengupta',
    role: 'DevOps & Cloud Specialist • Infrastructure',
    department: 'Backend',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    initials: 'VS',
    avatarColor: 'bg-indigo-600',
    hoursToday: 8.0,
    lastUpdate: '3h ago',
    lastUpdateText: 'Cluster autoscaling enabled',
    bandwidth: 80,
    bandwidthStatus: 'Optimal Load (80%)',
    statusColor: 'lime',
    assignments: [
      { name: 'CRM Cloud Portal', percentage: 50, color: 'bg-[#65a30d]' },
      { name: 'Cloud Infrastructure', percentage: 30, color: 'bg-indigo-500' },
    ],
    stack: ['Kubernetes', 'Docker', 'AWS'],
  },
  {
    id: 'tm-6',
    name: 'Pooja Verma',
    role: 'Frontend Developer • Mobile & Web',
    department: 'Frontend',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    initials: 'PV',
    avatarColor: 'bg-pink-600',
    hoursToday: 7.5,
    lastUpdate: '6h ago',
    lastUpdateText: 'API integration tests',
    bandwidth: 40,
    bandwidthStatus: 'Available Capacity (40%)',
    statusColor: 'gray',
    assignments: [{ name: 'Mobile App Integration', percentage: 40, color: 'bg-gray-700' }],
    stack: ['React Native', 'REST APIs', 'Redux'],
    canTakeMore: true,
  },
];

export default function TeamMembersAllocationPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLoad, setSelectedLoad] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [rebalanceModal, setRebalanceModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    const matchesDept = selectedDept === 'All' || m.department === selectedDept;
    const matchesLoad =
      selectedLoad === 'All'
        ? true
        : selectedLoad === 'High >80%'
        ? m.bandwidth >= 80
        : selectedLoad === 'Optimal'
        ? m.bandwidth >= 60 && m.bandwidth < 80
        : m.bandwidth < 60;
    return matchesDept && matchesLoad;
  });

  return (
    <ManagerLayout searchPlaceholder="Search direct reports by name, project, or stack...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls matching screenshot */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            WORKFORCE INTELLIGENCE • <span className="text-[#65a30d]">ACTIVE_SPRINT_42</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Team Members &amp; Resource Allocation
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Monitor direct reports, analyze workload bandwidth, manage project assignments, and check active capacity in real time.
          </p>
        </div>

        {/* Action Buttons matching screenshot */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => showToast('Exporting team directory CSV...')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Team Directory (CSV)</span>
          </button>

          <button
            onClick={() => setRebalanceModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-gray-500" />
            <span>Rebalance Workload</span>
          </button>

          <button
            onClick={() => showToast('Add / Assign Member modal launched.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add / Assign Member</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Row matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Total Direct Reports</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">8</span>
              <span className="text-xs font-bold text-gray-500">Engineers &amp; Designers</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              4 Frontend • 2 Backend • 1 QA • 1 Design
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Avg. Team Bandwidth</span>
            <div className="w-8 h-8 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">76%</span>
              <span className="text-[11px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-lime-100 text-[#4d7c0f]">
                OPTIMAL
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '76%' }} />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Baseline safe zone is 70% – 85%</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Over Capacity (&gt;90%)</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600 tabular-nums">1</span>
              <span className="text-xs font-bold text-red-700">Member Blocked</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              <span className="font-bold text-gray-800">Rahul Sharma</span> at 92% Load
            </p>
            <button
              onClick={() => setRebalanceModal(true)}
              className="text-[11px] font-bold text-red-600 hover:underline mt-1 inline-block"
            >
              Shift Allocations →
            </button>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">On Leave / Unavailable</span>
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">0</span>
              <span className="text-xs font-semibold text-gray-500">Today (100% Active)</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>Next: Pooja V. (Oct 18-20)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter bar matching screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200/90 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="p-2 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          {[
            { id: 'All', label: 'All Members (8)' },
            { id: 'Frontend', label: 'Frontend (4)' },
            { id: 'Backend', label: 'Backend (2)' },
            { id: 'QA Automation', label: 'QA Automation (1)' },
            { id: 'Product Design', label: 'Product Design (1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDept === tab.id
                  ? 'bg-[#111827] text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-gray-400 font-bold uppercase text-[10px]">Load:</span>
          {['All', 'High >80%', 'Optimal', 'Bench'].map((load) => (
            <button
              key={load}
              onClick={() => setSelectedLoad(load)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                selectedLoad === load
                  ? 'bg-lime-100 text-[#4d7c0f] font-bold'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {load}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Team Member Cards */}
        <div className="lg:col-span-8 space-y-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl p-5 border shadow-2xs transition-all ${
                member.bandwidthStatus.includes('Over Capacity')
                  ? 'border-red-300 ring-1 ring-red-200'
                  : 'border-gray-200/90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center font-bold text-gray-800 text-sm overflow-hidden">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-extrabold text-gray-900">{member.name}</h2>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          member.statusColor === 'red'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : member.statusColor === 'lime'
                            ? 'bg-lime-50 text-[#4d7c0f] border border-lime-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {member.bandwidthStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                    <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{member.hoursToday}h logged today</span>
                      <span>•</span>
                      <span>Updated {member.lastUpdate} (&quot;{member.lastUpdateText}&quot;)</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">
                    TOTAL BANDWIDTH
                  </span>
                  <span
                    className={`text-xl font-extrabold tabular-nums ${
                      member.bandwidth >= 90 ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    {member.bandwidth}%
                  </span>
                  <div className="w-24 bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden ml-auto">
                    <div
                      className={`h-full rounded-full ${
                        member.bandwidth >= 90 ? 'bg-red-500' : 'bg-[#65a30d]'
                      }`}
                      style={{ width: `${member.bandwidth}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Assignments Progress Breakdown */}
              <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/70 mb-3">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  <span>ACTIVE ASSIGNMENTS</span>
                  <span>{member.assignments.length} Projects Active</span>
                </div>

                <div className="space-y-2">
                  {member.assignments.map((assign, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-gray-800">{assign.name}</span>
                        <span className="font-extrabold text-gray-900">{assign.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${assign.color}`}
                          style={{ width: `${assign.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {member.canTakeMore && (
                  <button
                    onClick={() => showToast('Assign Surplus Bandwidth dialog opened.')}
                    className="mt-3 w-full py-2 px-3 border border-dashed border-lime-400 bg-lime-50/50 hover:bg-lime-50 text-[#4d7c0f] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Assign Surplus Project Bandwidth (+60%)</span>
                  </button>
                )}
              </div>

              {/* Stack & Action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400 mr-1">Stack:</span>
                  {member.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/manager/daily-updates"
                    className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors"
                  >
                    View Daily Logs
                  </Link>

                  {member.canTakeMore ? (
                    <button
                      onClick={() => showToast(`Assigned new task to ${member.name}.`)}
                      className="px-3 py-1.5 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Assign Tasks</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setRebalanceModal(true)}
                      className="px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors"
                    >
                      Reallocate
                    </button>
                  )}

                  <button
                    onClick={() => showToast(`Opened direct message thread with ${member.name}.`)}
                    className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    title="Send Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right 4 cols: Sprint Capacity Matrix + Project Distribution + Health */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Sprint Capacity Matrix */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                <span>Sprint Capacity Matrix</span>
              </h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase">WEEK 41</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Daily planned vs. logged capacity across sprint workdays.
            </p>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Rahul S.', days: [8.5, 9.0, 9.5, 8.5, 8.0] },
                { name: 'Sneha P.', days: [7.0, 7.0, 7.5, 7.0, 7.0] },
                { name: 'Amit K.', days: [6.5, 7.0, 6.5, 7.0, 7.0] },
                { name: 'Maya C.', days: [8.0, 8.0, 8.0, 8.0, 8.0] },
                { name: 'Vikram S.', days: [8.0, 8.5, 8.0, 8.0, 8.0] },
                { name: 'Pooja V.', days: [5.0, 5.5, 6.0, 7.5, 6.0] },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-50">
                  <span className="font-bold text-gray-800 w-20 truncate">{row.name}</span>
                  <div className="flex items-center gap-1">
                    {row.days.map((val, dIdx) => (
                      <span
                        key={dIdx}
                        className={`w-7 h-6 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                          val >= 9.0
                            ? 'bg-red-500 text-white'
                            : val >= 7.0
                            ? 'bg-[#65a30d] text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-[10px] text-gray-500 font-semibold">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-gray-200" /> &lt;6h
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-[#65a30d]" /> 7-8h
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-red-500" /> &gt;9h
              </span>
            </div>
          </div>

          {/* Card 2: Active Projects Distribution */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <h2 className="text-sm font-bold text-gray-900 mb-3">Active Projects Distribution</h2>

            <div className="space-y-3 text-xs mb-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800">LMS Enterprise Portal</span>
                  <span className="font-extrabold text-emerald-700">135% Eng Load (3 devs)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800">CRM Cloud Portal</span>
                  <span className="font-extrabold text-amber-700">122% Eng Load (3 devs)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800">EMS Suite</span>
                  <span className="font-bold text-gray-700">80% Eng Load (2 devs)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-800">Cloud Infra &amp; Mobile</span>
                  <span className="font-bold text-gray-700">70% Eng Load (2 devs)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>

            {/* AI Recommendation callout */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Recommendation:</span>
                <p className="mt-0.5 text-[11px] leading-relaxed">
                  Shift <span className="font-bold">CRM Cloud Portal (32%)</span> from{' '}
                  <span className="font-bold">Rahul Sharma</span> to{' '}
                  <span className="font-bold">Pooja Verma</span> to normalize team index.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Sprint 42 Health: Stable */}
          <div className="bg-[#111827] text-white p-5 rounded-2xl border border-gray-800 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d] animate-pulse" />
              <h2 className="text-sm font-bold text-white">Sprint 42 Health: Stable</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">
              7 of 8 members are operating within nominal bandwidth targets. Velocity tracking matches weekly timeline deliverables.
            </p>
            <button
              onClick={() => {
                showToast('Initiated 1-Click Auto Rebalance! Allocations optimized.');
              }}
              className="w-full py-2.5 px-3 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              Initiate 1-Click Auto Rebalance
            </button>
          </div>
        </div>
      </div>

      {/* Rebalance Modal */}
      {rebalanceModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Workload Rebalance Wizard</h3>
              <button onClick={() => setRebalanceModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Transfer load from over-capacity specialists to team members with surplus bandwidth.
            </p>
            <div className="space-y-3 mb-6 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <span className="font-bold text-red-900 block">From: Rahul Sharma (92% Load)</span>
                <span className="text-red-700 text-[11px]">Task: CRM Customer Portal API Lead Testing (32% load)</span>
              </div>
              <div className="p-3 bg-lime-50 border border-lime-200 rounded-xl">
                <span className="font-bold text-[#4d7c0f] block">To: Pooja Verma (40% Load)</span>
                <span className="text-[#4d7c0f] text-[11px]">Available Capacity: +60% ready to absorb</span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRebalanceModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Rebalance applied: CRM Cloud Portal shifted to Pooja Verma.');
                  setRebalanceModal(false);
                }}
                className="px-4 py-2 bg-[#65a30d] text-white text-xs font-bold rounded-xl"
              >
                Confirm Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </ManagerLayout>
  );
}

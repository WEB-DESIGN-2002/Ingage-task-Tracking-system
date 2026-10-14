'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  Activity,
  Zap,
  Calendar,
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  BarChart3,
  Award,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

export default function ManagerReportsPage() {
  const [activeTab, setActiveTab] = useState<'velocity' | 'hours' | 'blockers' | 'milestones'>('velocity');
  const [memberSearch, setMemberSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const auditMembers = [
    {
      initials: 'RS',
      color: 'bg-blue-600',
      name: 'Rahul Sharma',
      role: 'Sr. Full Stack',
      project: 'LMS Core',
      hours: 42.5,
      tasks: 8,
      punctuality: '100%',
      feedback: 'Signed off',
    },
    {
      initials: 'SP',
      color: 'bg-purple-600',
      name: 'Sneha Patel',
      role: 'Product Designer',
      project: 'CRM Engine',
      hours: 39.0,
      tasks: 11,
      punctuality: '98%',
      feedback: 'Signed off',
    },
    {
      initials: 'AK',
      color: 'bg-amber-600',
      name: 'Amit Kumar',
      role: 'Backend Engineer',
      project: 'EMS Portal',
      hours: 44.0,
      tasks: 6,
      punctuality: '92%',
      feedback: 'Signed off',
    },
    {
      initials: 'MC',
      color: 'bg-emerald-600',
      name: 'Maya Chen',
      role: 'QA Specialist',
      project: 'LMS Core',
      hours: 36.5,
      tasks: 14,
      punctuality: '100%',
      feedback: 'Signed off',
    },
    {
      initials: 'VS',
      color: 'bg-indigo-600',
      name: 'Vikram Sengupta',
      role: 'DevOps Lead',
      project: 'CRM Engine',
      hours: 38.5,
      tasks: 5,
      punctuality: '95%',
      feedback: 'Signed off',
    },
  ];

  const filteredMembers = auditMembers.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesProj = projectFilter === 'All' || m.project.includes(projectFilter);
    return matchesSearch && matchesProj;
  });

  return (
    <ManagerLayout searchPlaceholder="Search metrics, contributors, or timesheet logs...">
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
            SPRINT 04 TELEMETRY • <span className="text-[#65a30d]">Q2-CY2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Manager Reports &amp; Performance Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Consolidated sprint metrics, team hours audit, project progress velocity, and exportable executive reports.
          </p>
        </div>

        {/* Action Controls matching screenshot */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Jun 01, 2025 – Jun 10, 2025</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <button
            onClick={() => showToast('Preset: Last 14 days telemetry selected.')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <span>Saved Presets</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <button
            onClick={() => showToast('Executive Sprint 4 PDF & Excel report generated.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Export Report (Excel / PDF)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Row matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1: Total Team Hours Logged */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Total Team Hours Logged</span>
            <div className="w-8 h-8 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">348.5</span>
              <span className="text-xs font-bold text-gray-400 uppercase">HRS</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Across 5 managed projects this sprint</p>
            <p className="text-[11px] font-bold text-[#4d7c0f] mt-1 flex items-center gap-1">
              <span>↗ +12.4 hrs vs projected run-rate</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Team On-Time Log Rate */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Team On-Time Log Rate</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">96.2%</span>
              <span className="text-[11px] font-bold text-[#4d7c0f]">↑ 2.4%</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Compared to previous sprint</p>
            <p className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>48 of 50 log updates on schedule</span>
            </p>
          </div>
        </div>

        {/* KPI 3: Sprint Velocity */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Sprint Velocity</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">82%</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-50 text-[#4d7c0f] border border-lime-200">
                On Track
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">4 active milestone deliverables</p>
            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d]" />
              <span>Estimated completion in 3 days</span>
            </p>
          </div>
        </div>

        {/* KPI 4: Review Turnaround */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Review Turnaround</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">1.8</span>
              <span className="text-xs font-bold text-gray-400 uppercase">HRS</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Median approval turnaround time</p>
            <p className="text-[11px] font-bold text-[#4d7c0f] mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#65a30d]" />
              <span>42m faster than org average</span>
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Tabs matching screenshot */}
      <div className="flex items-center gap-2 mb-6">
        {[
          { id: 'velocity', label: 'Project Velocity' },
          { id: 'hours', label: 'Member Hours Audit' },
          { id: 'blockers', label: 'Blocker Frequency' },
          { id: 'milestones', label: 'Milestone Forecast' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 border border-gray-200 shadow-2xs'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Visualizations Grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Left 5 cols: Charts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Chart 1: Weekly Hours per Project */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900">Weekly Hours per Project</h2>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-[#65a30d]">
                  <span className="w-2 h-2 rounded-full bg-[#65a30d]" /> LMS
                </span>
                <span className="flex items-center gap-1 text-blue-600">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> CRM
                </span>
                <span className="flex items-center gap-1 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-gray-700" /> EMS
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Daily distribution across core client accounts
            </p>

            {/* Stacked bar visualization */}
            <div className="flex items-end justify-between h-44 pt-4 px-2 border-b border-gray-100">
              {[
                { day: 'M', lms: 22, crm: 14, ems: 8 },
                { day: 'T', lms: 20, crm: 18, ems: 10 },
                { day: 'W', lms: 26, crm: 16, ems: 12 },
                { day: 'T', lms: 32, crm: 16, ems: 10 }, // Peak
                { day: 'F', lms: 30, crm: 12, ems: 8 },
                { day: 'S', lms: 8, crm: 4, ems: 0 },
                { day: 'S', lms: 4, crm: 2, ems: 0 },
              ].map((bar, bIdx) => (
                <div key={bIdx} className="flex flex-col items-center gap-1.5">
                  <div className="w-7 bg-gray-100 rounded-t-md overflow-hidden flex flex-col justify-end h-36">
                    <div className="w-full bg-[#65a30d]" style={{ height: `${bar.lms}%` }} />
                    <div className="w-full bg-blue-600" style={{ height: `${bar.crm}%` }} />
                    <div className="w-full bg-gray-700" style={{ height: `${bar.ems}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2.5 rounded-xl bg-gray-50 text-[11px] text-gray-600 font-medium">
              Total Peak Output: <span className="font-bold text-gray-900">Thursday (58.4 hrs)</span>{' '}
              <span className="text-[#4d7c0f] font-bold">• LMS: 54% Dominance</span>
            </div>
          </div>

          {/* Lower Row: Task Status Donut & Submission Window */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Task Status */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
              <h3 className="text-xs font-bold text-gray-900 mb-0.5">Task Status</h3>
              <p className="text-[10px] text-gray-400 mb-3">Sprint 4 work packages</p>

              <div className="flex items-center justify-center my-2">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#65a30d"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="153.8 226.2"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#0284c7"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="54.3 226.2"
                      strokeDashoffset="-153.8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      stroke="#ef4444"
                      strokeWidth="11"
                      fill="transparent"
                      strokeDasharray="18.1 226.2"
                      strokeDashoffset="-208.1"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-extrabold text-gray-900">142</span>
                    <span className="text-[8px] font-bold text-gray-400 tracking-wider">TASKS</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-[11px] pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-[#65a30d]" /> Completed
                  </span>
                  <span className="font-extrabold text-gray-900">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-sky-600" /> In Progress
                  </span>
                  <span className="font-extrabold text-gray-900">24%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Blocked
                  </span>
                  <span className="font-extrabold text-gray-900">8%</span>
                </div>
              </div>
            </div>

            {/* Submission Window */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-xs font-bold text-gray-900">Submission Window</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-lime-100 text-[#4d7c0f]">
                    88% AM
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mb-2">AM standup vs PM wrap-up</p>

                {/* Simulated wave SVG */}
                <div className="h-20 w-full relative my-1">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <path
                      d="M0 45 Q20 40 40 15 T80 10 T100 25"
                      fill="none"
                      stroke="#65a30d"
                      strokeWidth="3"
                    />
                    <path
                      d="M0 48 Q30 45 60 40 T100 35"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-1.5 text-[10px] text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span>Morning Standup:</span>
                  <span className="font-bold text-gray-900">9:15 AM avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>EOD Log Wrap:</span>
                  <span className="font-bold text-gray-900">6:10 PM avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 cols: Member Hours & Audit Log matching screenshot */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Member Hours &amp; Audit Log</h2>
                <p className="text-xs text-gray-400">
                  Individual timesheet logs with sign-off status
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder="Filter member..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#65a30d]"
                  />
                </div>

                <select
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl text-gray-700"
                >
                  <option value="All">All Projects</option>
                  <option value="LMS">LMS Core</option>
                  <option value="CRM">CRM Engine</option>
                  <option value="EMS">EMS Portal</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3">TEAM MEMBER</th>
                    <th className="py-2.5 px-3">PROJECT</th>
                    <th className="py-2.5 px-3">TOTAL HOURS</th>
                    <th className="py-2.5 px-3">TASKS</th>
                    <th className="py-2.5 px-3">PUNCTUALITY</th>
                    <th className="py-2.5 px-3 text-right">FEEDBACK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMembers.map((member, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full ${member.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                          >
                            {member.initials}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{member.name}</p>
                            <p className="text-[10px] text-gray-400">{member.role}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-gray-700">
                          {member.project}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-extrabold text-gray-900 tabular-nums">
                          {member.hours}
                        </span>{' '}
                        <span className="text-[10px] text-gray-400">hrs</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-semibold text-gray-700">{member.tasks} done</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{member.punctuality}</span>
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                          {member.feedback}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Footer matching screenshot */}
          <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Showing 5 of 12 logged contributors</span>
            <div className="flex items-center gap-2">
              <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-400 cursor-not-allowed">
                Previous
              </button>
              <span className="font-bold text-gray-900">1 / 3</span>
              <button
                onClick={() => showToast('Next page loaded.')}
                className="px-2.5 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Compliance Footer Card matching screenshot */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-gray-900">Audit Compliance</h3>
              <span className="px-2 py-0.2 rounded font-extrabold text-[9px] uppercase bg-lime-100 text-[#4d7c0f] border border-lime-300">
                ISO-27001 Passed
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              All manager approvals and logged hours are verified according to Sprint 4 governance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">
            Last verified by Priya Singh <span className="font-semibold text-gray-700">Today, 05:45 PM UTC</span>
          </span>
          <button
            onClick={() => showToast('Full ISO-27001 signed audit trail ledger opened.')}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
            <span>Audit Trail</span>
          </button>
        </div>
      </div>
    </ManagerLayout>
  );
}

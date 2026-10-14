'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Calendar,
  Sparkles,
  Plus,
  ChevronDown,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_DAILY_LOGS, type DailyLog } from '@/lib/mockData';

export default function DailyUpdatesPage() {
  const [logs, setLogs] = useState<DailyLog[]>(INITIAL_DAILY_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <WorkspaceLayout searchPlaceholder="Search daily logs by engineer, task, or project...">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            WORKFLOW &gt; <span className="text-[#65a30d]">DAILY WORK TRACKING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Daily Task Submissions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time feed of employee standups, logged hours, deliverables, and blockers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Exporting daily logs to Excel/CSV...')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Daily Log</span>
          </button>

          <Link
            href="/assignments"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Task Log</span>
          </Link>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-gray-500">Submitted Today</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900">24 / 28</span>
            <span className="text-[11px] font-bold text-[#65a30d]">85.7%</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">4 engineers pending standup</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-gray-500">Total Logged Hours</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-gray-900">186.5 hrs</span>
            <span className="text-[11px] font-bold text-gray-500">Avg 7.8h</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">Across active sprint tasks</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-gray-500">Completed Tasks</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600">19</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">Code commits &amp; artifacts checked</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <span className="text-xs font-semibold text-gray-500">Flagged Blockers</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-600">2</span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Needs Attention
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">Dependency approvals waiting</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, descriptions, engineers..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#65a30d] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Daily Logs Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Engineer</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Task Deliverable</th>
                <th className="py-3.5 px-4">Time Logged</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-xs flex items-center justify-center">
                        {log.employee.initials}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{log.employee.name}</p>
                        <p className="text-[10px] text-gray-400">{log.employee.role}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-800">{log.project.name}</span>
                    <span className="block text-[10px] text-gray-400">{log.project.code}</span>
                  </td>

                  <td className="py-3.5 px-4 max-w-md">
                    <p className="font-semibold text-gray-900 truncate">{log.taskTitle}</p>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">{log.taskDescription}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-gray-900">{log.hours} hrs</span>
                    <span className="block text-[10px] text-gray-400">{log.date}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : log.status === 'Blocked'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-lime-50 text-[#4d7c0f] border border-lime-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          log.status === 'Completed'
                            ? 'bg-emerald-500'
                            : log.status === 'Blocked'
                            ? 'bg-red-500'
                            : 'bg-[#65a30d]'
                        }`}
                      />
                      <span>{log.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => showToast(`Verified task: "${log.taskTitle}"`)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

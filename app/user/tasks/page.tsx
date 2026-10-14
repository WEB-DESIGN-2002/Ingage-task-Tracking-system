'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  User,
  Paperclip,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  Flag,
  FileText,
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';

interface UserTask {
  id: string;
  code: string;
  title: string;
  project: string;
  projectCode: string;
  status: 'in_progress' | 'pending_review' | 'completed' | 'blocked';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  progress: number;
  dueDate: string;
  daysRemaining: number;
  manager: string;
  managerAvatar: string;
  description: string;
  estimatedHours: number;
  loggedHours: number;
}

const INITIAL_TASKS: UserTask[] = [
  {
    id: 'tsk-101',
    code: 'TASK-LMS-24',
    title: 'Implement Student Course Assessment & Quiz Player UI',
    project: 'Learning Management System (LMS)',
    projectCode: 'PRJ-2025-01',
    status: 'in_progress',
    priority: 'High',
    progress: 75,
    dueDate: '2025-06-15',
    daysRemaining: 5,
    manager: 'Priya Singh',
    managerAvatar: 'PS',
    description: 'Build interactive multiple-choice & coding assessment player with real-time countdown timer, autosave, and question navigation palette.',
    estimatedHours: 24,
    loggedHours: 18,
  },
  {
    id: 'tsk-102',
    code: 'TASK-LMS-29',
    title: 'Cross-browser Form Validation for Student Registration & SSO',
    project: 'Learning Management System (LMS)',
    projectCode: 'PRJ-2025-01',
    status: 'pending_review',
    priority: 'Urgent',
    progress: 100,
    dueDate: '2025-06-12',
    daysRemaining: 2,
    manager: 'Priya Singh',
    managerAvatar: 'PS',
    description: 'Ensure strict WCAG AA keyboard compliance, CSRF tokens, inline regex validation, and error toast alerts for Google & Microsoft OAuth sign-ins.',
    estimatedHours: 16,
    loggedHours: 16,
  },
  {
    id: 'tsk-103',
    code: 'TASK-CRM-14',
    title: 'Customer Deals Pipeline Drag-and-Drop Kanban Board',
    project: 'CRM Customer Portal',
    projectCode: 'PRJ-2025-04',
    status: 'in_progress',
    priority: 'Medium',
    progress: 45,
    dueDate: '2025-06-20',
    daysRemaining: 10,
    manager: 'Priya Singh',
    managerAvatar: 'PS',
    description: 'Create responsive Kanban stages for Sales Leads (Prospect, Contacted, Proposal, Closed Won/Lost) with optimistic state updates.',
    estimatedHours: 32,
    loggedHours: 14.5,
  },
  {
    id: 'tsk-104',
    code: 'TASK-EMS-08',
    title: 'Leave Application & Attendance Punch-in Flow Redesign',
    project: 'Employee Management System',
    projectCode: 'PRJ-2025-08',
    status: 'blocked',
    priority: 'High',
    progress: 30,
    dueDate: '2025-06-25',
    daysRemaining: 15,
    manager: 'Sneha Patel',
    managerAvatar: 'SP',
    description: 'Awaiting updated leave policy guidelines and API payload specifications from HR Operations team before completing multi-tiered approval UI.',
    estimatedHours: 20,
    loggedHours: 6,
  },
  {
    id: 'tsk-105',
    code: 'TASK-LMS-19',
    title: 'Authentication Layout & Responsive Mobile Nav Drawer',
    project: 'Learning Management System (LMS)',
    projectCode: 'PRJ-2025-01',
    status: 'completed',
    priority: 'Medium',
    progress: 100,
    dueDate: '2025-06-08',
    daysRemaining: 0,
    manager: 'Priya Singh',
    managerAvatar: 'PS',
    description: 'Delivered clean mobile header, slide-out drawer, and accessible focus trap. Verified on iOS Safari and Android Chrome.',
    estimatedHours: 12,
    loggedHours: 12,
  },
];

export default function UserTasksPage() {
  const [tasks, setTasks] = useState<UserTask[]>(INITIAL_TASKS);
  const [statusFilter, setStatusFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateTaskProgress = (id: string, delta: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newProgress = Math.min(100, Math.max(0, t.progress + delta));
          const newStatus =
            newProgress === 100
              ? 'pending_review'
              : newProgress === 0
              ? 'in_progress'
              : t.status === 'completed'
              ? 'in_progress'
              : t.status;
          showToast(`Progress for ${t.code} updated to ${newProgress}%`);
          return { ...t, progress: newProgress, status: newStatus };
        }
        return t;
      })
    );
  };

  const markComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          showToast(`Marked ${t.code} as Completed & Sent for Review!`);
          return { ...t, progress: 100, status: 'completed' };
        }
        return t;
      })
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (statusFilter !== 'All') {
      if (statusFilter === 'in_progress' && t.status !== 'in_progress') return false;
      if (statusFilter === 'pending_review' && t.status !== 'pending_review') return false;
      if (statusFilter === 'completed' && t.status !== 'completed') return false;
      if (statusFilter === 'blocked' && t.status !== 'blocked') return false;
    }
    if (projectFilter !== 'All' && t.projectCode !== projectFilter) {
      return false;
    }
    if (
      searchQuery &&
      !t.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !t.project.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <UserLayout searchPlaceholder="Search tasks, task codes, or projects...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Link href="/user/dashboard" className="hover:text-slate-600 transition-colors">WORKSPACE</Link>
            <span>/</span>
            <span className="text-[#65a30d] font-bold">MY TASKS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Assigned Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your daily deliverable items, update completion progress, and report daily work.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/user/add-update"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log Daily Work</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Status Tabs */}
          {[
            { label: 'All', value: 'All' },
            { label: 'In Progress (2)', value: 'in_progress' },
            { label: 'Pending Review (1)', value: 'pending_review' },
            { label: 'Blocked (1)', value: 'blocked' },
            { label: 'Completed (1)', value: 'completed' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === tab.value
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Project Filter */}
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#65a30d]"
          >
            <option value="All">All Projects</option>
            <option value="PRJ-2025-01">LMS (PRJ-2025-01)</option>
            <option value="PRJ-2025-04">CRM (PRJ-2025-04)</option>
            <option value="PRJ-2025-08">EMS (PRJ-2025-08)</option>
          </select>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter tasks..."
              className="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#65a30d] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Task Cards List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/80">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No tasks found matching your filter</h3>
            <p className="text-xs text-slate-400 mt-1">Try switching to All statuses or clearing your search query.</p>
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 transition-all flex flex-col gap-3.5"
            >
              {/* Header: Project, Code, Status & Priority */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {t.code}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{t.project}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Priority Tag */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      t.priority === 'Urgent'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : t.priority === 'High'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Flag className="w-3 h-3" />
                    <span>{t.priority}</span>
                  </span>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                      t.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : t.status === 'pending_review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : t.status === 'blocked'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        t.status === 'completed'
                          ? 'bg-emerald-600'
                          : t.status === 'pending_review'
                          ? 'bg-amber-500'
                          : t.status === 'blocked'
                          ? 'bg-rose-600'
                          : 'bg-sky-600'
                      }`}
                    />
                    {t.status === 'completed' && 'Completed'}
                    {t.status === 'pending_review' && 'Pending Review'}
                    {t.status === 'in_progress' && 'In Progress'}
                    {t.status === 'blocked' && 'Blocked'}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{t.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.description}</p>
              </div>

              {/* Progress Bar & Actions */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 max-w-md">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">Completion Progress</span>
                    <span className="font-bold text-slate-900 font-mono">{t.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        t.status === 'completed'
                          ? 'bg-emerald-500'
                          : t.status === 'blocked'
                          ? 'bg-rose-500'
                          : 'bg-[#65a30d]'
                      }`}
                      style={{ width: `${t.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Quick percentage adjust buttons */}
                  {t.status !== 'completed' && (
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateTaskProgress(t.id, -10)}
                        className="px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                        title="Decrease 10%"
                      >
                        -10%
                      </button>
                      <span className="px-2 text-[11px] font-mono text-slate-400">adj</span>
                      <button
                        onClick={() => updateTaskProgress(t.id, 10)}
                        className="px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                        title="Increase 10%"
                      >
                        +10%
                      </button>
                    </div>
                  )}

                  {t.status !== 'completed' && (
                    <button
                      onClick={() => markComplete(t.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Finish</span>
                    </button>
                  )}

                  <Link
                    href={`/user/add-update?task=${encodeURIComponent(t.title)}&code=${encodeURIComponent(
                      t.code
                    )}&project=${encodeURIComponent(t.projectCode)}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Daily Update</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Metadata: Manager, Deadline, Logged Hours */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100/80">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                      {t.managerAvatar}
                    </div>
                    <span>Manager: <strong className="text-slate-800">{t.manager}</strong></span>
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Logged: <strong className="text-slate-800 font-mono">{t.loggedHours}h</strong> / {t.estimatedHours}h est.</span>
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Due {t.dueDate}</span>
                  {t.daysRemaining > 0 ? (
                    <span className="text-amber-600 font-semibold ml-1">({t.daysRemaining} days left)</span>
                  ) : (
                    <span className="text-emerald-600 font-semibold ml-1">(Done)</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </UserLayout>
  );
}

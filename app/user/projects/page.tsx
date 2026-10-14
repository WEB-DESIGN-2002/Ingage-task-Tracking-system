'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FolderOpen,
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Zap,
  MessageSquare,
  FileText,
  Check,
  Filter,
  UserCheck,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';

export default function UserProjectsPage() {
  const [sprintFilter, setSprintFilter] = useState('All');
  const [showSprintMenu, setShowSprintMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const projects = [
    {
      id: 'prj-1',
      code: 'PRJ-2025-01',
      name: 'Learning Management System (LMS)',
      sprint: 'Sprint 04 (May 01 - Jun 15, 2025)',
      status: 'In Progress',
      priority: 'High Priority',
      isPrimary: true,
      manager: 'Priya Singh',
      managerRole: 'Lead Project Specialist',
      managerInitials: 'PS',
      description:
        'Modern enterprise LMS with interactive video streaming, automated grading, and role-based student & instructor dashboards.',
      allocation:
        'Lead Frontend Engineer (100% capacity) — Login UI & Form Validation, Assessment Player, Course Outline Builder',
      progress: 75,
      teamCount: '5 Core Engineers',
      color: 'bg-[#65a30d]',
    },
    {
      id: 'prj-2',
      code: 'PRJ-2025-04',
      name: 'CRM Customer Portal',
      sprint: 'Sprint 02 (May 15 - Jun 30, 2025)',
      status: 'In Progress',
      priority: 'Medium Priority',
      isPrimary: false,
      manager: 'Priya Singh',
      managerRole: 'Lead Project Specialist',
      managerInitials: 'PS',
      description:
        'Customer relationship tracking portal with automated lead routing, pipeline Kanban interaction, and multi-tenant security.',
      allocation:
        'Frontend Integration — Pipeline Kanban drag-and-drop & API Middleware client validation',
      progress: 45,
      teamCount: '4 Contributors Assigned',
      color: 'bg-sky-500',
    },
    {
      id: 'prj-3',
      code: 'PRJ-2025-07',
      name: 'Employee Management System (EMS Suite)',
      sprint: 'Sprint 01 (Starts Jun 20, 2025)',
      status: 'Planned / Kickoff',
      priority: 'Medium Priority',
      isPrimary: false,
      manager: 'Vikram Sengupta',
      managerRole: 'Engineering Lead',
      managerInitials: 'VS',
      description:
        'Internal employee lifecycle platform covering onboarding checklists, compliance certifications, and payroll tracking.',
      allocation:
        'Design System Token Integration & Component Library Setup (Starts June 20)',
      progress: 20,
      teamCount: 'Architecture Phase',
      color: 'bg-slate-500',
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (sprintFilter === 'Sprint 04') return p.sprint.includes('Sprint 04');
    if (sprintFilter === 'Sprint 02') return p.sprint.includes('Sprint 02');
    if (sprintFilter === 'Sprint 01') return p.sprint.includes('Sprint 01');
    return true;
  });

  return (
    <UserLayout searchPlaceholder="Search my projects, tasks, or scope...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Hero / Banner context line matching HTML 2 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <span>User Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#65a30d] font-bold">My Projects</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
            Active project allocations, sprint timelines, assigned deliverables, and lead manager contacts.
          </p>
        </div>

        {/* Action Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowSprintMenu(!showSprintMenu)}
              className="inline-flex items-center justify-between gap-2 h-10 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs shadow-2xs transition-colors"
            >
              <Filter className="w-4 h-4 text-slate-400" />
              <span>{sprintFilter === 'All' ? 'Filter by Sprint' : sprintFilter}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showSprintMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-1.5 shadow-xl border border-slate-200 z-30 text-xs animate-fadeIn space-y-1">
                {[
                  { label: 'All Active Sprints', val: 'All' },
                  { label: 'Sprint 04 (LMS Focus)', val: 'Sprint 04' },
                  { label: 'Sprint 02 (CRM Pipeline)', val: 'Sprint 02' },
                  { label: 'Sprint 01 (EMS Setup)', val: 'Sprint 01' },
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      setSprintFilter(item.val);
                      setShowSprintMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      sprintFilter === item.val
                        ? 'bg-lime-50 text-[#4d7c0f] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {sprintFilter === item.val && <Check className="w-3.5 h-3.5 text-[#65a30d]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/user/add-update"
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-bold text-xs shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Quick Log Update</span>
          </Link>
        </div>
      </div>

      {/* Metric KPI Cards (4 cards) matching HTML 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Projects</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-[#65a30d] flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">3</div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
              <span>2 In Progress, 1 Upcoming Sprint</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Open Deliverables</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">8 Tasks</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-rose-600 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>3 Due this week</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Weekly Logged Hours</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-[#65a30d] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                32.5 <span className="text-xs font-medium text-slate-500">/ 40 hrs</span>
              </span>
              <span className="text-xs font-bold text-[#4d7c0f]">81%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '81%' }} />
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Project Health</span>
            <div className="w-8 h-8 rounded-lg bg-lime-100 text-[#4d7c0f] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">98%</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#4d7c0f]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>On-Track &amp; Stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid matching HTML 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Project Cards */}
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Assigned Project Initiatives</h2>
            <span className="font-mono text-xs text-slate-400">
              Showing {filteredProjects.length} Active Engagements
            </span>
          </div>

          {filteredProjects.map((p) => (
            <article
              key={p.id}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.isPrimary && (
                      <span className="px-2.5 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-[10px]">
                        Primary Assignment
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px]">
                      {p.status}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.priority.includes('High')
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {p.priority}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{p.name}</h3>

                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <span className="font-semibold text-slate-700">{p.code}</span>
                    <span>•</span>
                    <span>{p.sprint}</span>
                  </div>
                </div>

                {/* Manager Pill */}
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 shrink-0">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs shadow-2xs">
                    {p.managerInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{p.manager}</span>
                    <span className="text-[10px] text-slate-400">{p.managerRole}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>

              {/* Rahul's Scope Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs uppercase tracking-wide">
                  <UserCheck className="w-3.5 h-3.5 text-[#65a30d]" />
                  <span>Rahul&apos;s Allocation &amp; Scope</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{p.allocation}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Sprint Completion Milestone</span>
                  <span className="text-slate-900 font-bold">{p.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.progress}%` }} />
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="font-medium text-slate-500">{p.teamCount}</span>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => showToast(`Project docs opened for ${p.name}`)}
                    className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  >
                    Project Docs
                  </button>
                  <button
                    onClick={() => showToast(`Deliverables checklist for ${p.name}`)}
                    className="h-8 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                  >
                    View Deliverables
                  </button>
                  <Link
                    href="/user/add-update"
                    className="h-8 px-3.5 rounded-lg bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-bold transition-all flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Daily Update</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Column (4 cols): Deadlines, Effort Allocation, Managers */}
        <aside className="xl:col-span-4 space-y-6">
          {/* Upcoming Deadlines Widget matching HTML 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-slate-900">Upcoming Deadlines</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Sprints 01-04</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#65a30d]">PRJ-2025-01</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                    In 5 Days
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">LMS Final Testing &amp; E2E Validation</h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Jun 15, 2025 • End of Sprint 04
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-sky-600">PRJ-2025-04</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px]">
                    In 10 Days
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">CRM Kanban V2 Client Feedback</h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Jun 20, 2025 • Milestone Review
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-500">PRJ-2025-07</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px]">
                    In 15 Days
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800">EMS Token Audit &amp; System Prep</h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Jun 25, 2025 • Sprint 01 Onset
                </p>
              </div>
            </div>
          </div>

          {/* Weekly Effort Split Widget matching HTML 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Effort Allocation</h3>
              <span className="text-xs text-slate-400">Current Week</span>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div>
                <div className="flex items-center justify-between font-medium mb-1">
                  <span className="text-slate-800">LMS Architecture &amp; Player</span>
                  <span className="font-bold text-[#65a30d]">24 hrs (60%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-medium mb-1">
                  <span className="text-slate-800">CRM Kanban Client Middleware</span>
                  <span className="font-bold text-sky-600">12 hrs (30%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '30%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-medium mb-1">
                  <span className="text-slate-800">EMS Initial Planning</span>
                  <span className="font-bold text-slate-500">4 hrs (10%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>

            <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Zap className="w-4 h-4 text-[#65a30d]" />
                <span>Sprint Velocity</span>
              </div>
              <span className="text-sm font-extrabold text-[#4d7c0f]">94.2 pts</span>
            </div>
          </div>

          {/* Assigned Project Leads matching HTML 2 */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Assigned Project Leads</h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                    PS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Priya Singh</p>
                    <p className="text-[11px] text-slate-400">LMS &amp; CRM Lead</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Opening direct chat with Priya Singh...')}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  title="Chat with Manager"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                    VS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Vikram Sengupta</p>
                    <p className="text-[11px] text-slate-400">EMS Suite Lead</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Opening direct chat with Vikram Sengupta...')}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  title="Chat with Manager"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </UserLayout>
  );
}

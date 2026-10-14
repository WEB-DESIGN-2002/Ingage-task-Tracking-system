'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Rocket,
  Activity,
  Users,
  Bell,
  Search,
  Filter,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Grid,
  List as TableIcon,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Flag,
  FileSpreadsheet,
  X,
  Check,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

interface SupervisedProject {
  id: string;
  code: string;
  name: string;
  status: 'In Progress' | 'At Risk' | 'On Track' | 'Planning' | 'Completed';
  priority: 'High' | 'Medium' | 'Normal';
  progress: number;
  sprint: string;
  sprintEnds: string;
  daysLeft: string;
  nextMilestone: string;
  team: Array<{ initials: string; color: string; name: string }>;
  modulesInfo: string;
  blocker?: string;
  releaseStatus?: string;
  updatesCount?: number;
}

const SUPERVISED_PROJECTS: SupervisedProject[] = [
  {
    id: 'prj-1',
    code: 'PRJ-2025-01',
    name: 'Learning Management System (LMS Portal)',
    status: 'In Progress',
    priority: 'High',
    progress: 75,
    sprint: 'Sprint 04',
    sprintEnds: 'Ends Jun 15, 2025',
    daysLeft: '5 days left',
    nextMilestone: 'Final User Testing & Auth Sign-off',
    team: [
      { initials: 'RS', color: 'bg-emerald-600', name: 'Rahul Sharma' },
      { initials: 'SP', color: 'bg-blue-600', name: 'Sneha Patel' },
      { initials: 'MC', color: 'bg-purple-600', name: 'Maya Chen' },
      { initials: 'AK', color: 'bg-amber-600', name: 'Amit Kumar' },
    ],
    modulesInfo: '4 Modules',
    updatesCount: 14,
  },
  {
    id: 'prj-2',
    code: 'PRJ-2025-04',
    name: 'CRM Customer Portal',
    status: 'At Risk',
    priority: 'Medium',
    progress: 45,
    sprint: 'Sprint 02',
    sprintEnds: 'Ends Jun 20, 2025',
    daysLeft: '10 days left',
    nextMilestone: 'Staging API CORS patch & lead webhook',
    blocker: 'BLOCKER FLAGGED: Staging API CORS bottleneck',
    team: [
      { initials: 'RS', color: 'bg-emerald-600', name: 'Rahul Sharma' },
      { initials: 'SP', color: 'bg-blue-600', name: 'Sneha Patel' },
      { initials: 'VS', color: 'bg-indigo-600', name: 'Vikram Sengupta' },
    ],
    modulesInfo: '2 Blocker tasks',
    updatesCount: 8,
  },
  {
    id: 'prj-3',
    code: 'PRJ-2025-08',
    name: 'Employee Management System (EMS Suite)',
    status: 'On Track',
    priority: 'Normal',
    progress: 30,
    sprint: 'Sprint 01',
    sprintEnds: 'Ends Jun 25, 2025',
    daysLeft: '15 days left',
    nextMilestone: 'Schema migration & RBAC setup',
    team: [
      { initials: 'AK', color: 'bg-amber-600', name: 'Amit Kumar' },
      { initials: 'SP', color: 'bg-blue-600', name: 'Sneha Patel' },
    ],
    modulesInfo: 'Initial Phase',
    updatesCount: 4,
  },
  {
    id: 'prj-4',
    code: 'PRJ-2025-11',
    name: 'Mobile App API Gateway Redesign',
    status: 'Planning',
    priority: 'High',
    progress: 15,
    sprint: 'Kickoff Scheduled',
    sprintEnds: 'Jun 12, 2025',
    daysLeft: 'Queued',
    nextMilestone: 'Architecture Review & Spec Approval',
    team: [
      { initials: 'RS', color: 'bg-emerald-600', name: 'Rahul Sharma' },
      { initials: 'VS', color: 'bg-indigo-600', name: 'Vikram Sengupta' },
      { initials: 'MC', color: 'bg-purple-600', name: 'Maya Chen' },
    ],
    modulesInfo: 'Allocated',
  },
  {
    id: 'prj-5',
    code: 'SYS-2025-02',
    name: 'Corporate Design System v2.0',
    status: 'Completed',
    priority: 'Normal',
    progress: 100,
    sprint: 'Release Finalized',
    sprintEnds: 'All 24 tokens & components delivered',
    daysLeft: 'Archived',
    nextMilestone: 'Handoff complete',
    releaseStatus: 'Published to npm repository & Figma tokens pipeline',
    team: [
      { initials: 'MC', color: 'bg-purple-600', name: 'Maya Chen' },
      { initials: 'RS', color: 'bg-emerald-600', name: 'Rahul Sharma' },
    ],
    modulesInfo: 'Handoff complete',
  },
];

export default function ManagerProjectsPage() {
  const [projects, setProjects] = useState<SupervisedProject[]>(SUPERVISED_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showBlockerModal, setShowBlockerModal] = useState<SupervisedProject | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || p.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <ManagerLayout searchPlaceholder="Search projects, tasks, or team...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Main Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            SUPERVISOR HUB • <span className="text-gray-600">Q2 RUNTIME 2025</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            My Supervised Projects
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage delivery pipelines, monitor sprint velocity, and track milestones across your managed projects
          </p>
        </div>

        {/* Action Buttons matching screenshot */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setStatusFilter(statusFilter === 'All' ? 'At Risk' : 'All')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>Filter by Status</span>
          </button>

          <button
            onClick={() => setShowExtensionModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-gray-500" />
            <span>+ Request Project Extension</span>
          </button>

          <button
            onClick={() => showToast('New Milestone / Project dialog opened.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ New Milestone / Project</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Row matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1: Active Supervised Projects */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Active Supervised Projects</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#65a30d] flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">5</span>
              <span className="text-xs font-bold text-gray-400">Projects</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> 3 On Track
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> 1 At Risk
              </span>
              <span className="flex items-center gap-1 text-red-700">
                <span className="w-2 h-2 rounded-full bg-red-500" /> 1 Delayed
              </span>
            </div>
          </div>
        </div>

        {/* KPI 2: Overall Sprint Velocity */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Overall Sprint Velocity</span>
            <div className="w-8 h-8 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">84.2%</span>
              <span className="text-[11px] font-extrabold text-[#4d7c0f] bg-lime-100 px-1.5 py-0.5 rounded">
                +6.4%
              </span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '84.2%' }} />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Completion across active sprints</p>
          </div>
        </div>

        {/* KPI 3: Assigned Engineers & Designers */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Assigned Engineers &amp; Designers</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">8</span>
              <span className="text-xs font-semibold text-gray-500">Active Specialists</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-emerald-600 text-[10px] text-white font-bold text-center leading-6">RS</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-blue-600 text-[10px] text-white font-bold text-center leading-6">SP</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-purple-600 text-[10px] text-white font-bold text-center leading-6">MC</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-amber-600 text-[10px] text-white font-bold text-center leading-6">AK</span>
              </div>
              <span className="text-[11px] text-gray-400">Across 4 core functional modules</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Upcoming Target Deliverables */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Upcoming Target Deliverables</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600 tabular-nums">3</span>
              <span className="text-xs font-bold text-red-700">Critical Deadlines</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500">
              <span>Next 10 calendar days</span>
              <span className="font-bold text-red-600">Earliest: Jun 15</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar matching screenshot */}
      <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, code (e.g. PRJ-2025)..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#65a30d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none"
          >
            <option value="All">Status: All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="At Risk">At Risk</option>
            <option value="On Track">On Track</option>
            <option value="Planning">Planning</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none"
          >
            <option value="All">Priority: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Normal">Normal</option>
          </select>

          <span className="text-xs text-gray-500 font-semibold px-2">
            {filteredProjects.length} projects mapped
          </span>

          <div className="inline-flex rounded-xl border border-gray-200 p-0.5 bg-gray-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-[#65a30d]' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-[#65a30d]' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5 Project Cards Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filteredProjects.map((p) => {
          return (
            <div
              key={p.id}
              className={`bg-white rounded-2xl border p-5 flex flex-col justify-between shadow-2xs transition-all hover:shadow-md ${
                p.status === 'At Risk' ? 'border-amber-300' : 'border-gray-200/90'
              }`}
            >
              <div>
                {/* Header row: Code, Status, Priority */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-gray-500">{p.code}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.status === 'In Progress'
                          ? 'bg-lime-50 text-[#4d7c0f] border border-lime-200'
                          : p.status === 'At Risk'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : p.status === 'On Track'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'Planning'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      • {p.status}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.priority === 'High'
                          ? 'bg-red-50 text-red-700'
                          : p.priority === 'Medium'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.priority}
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h2 className="text-base font-extrabold text-gray-900 leading-snug mb-3">
                  {p.name}
                </h2>

                {/* Overall Delivery Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-500">Overall Delivery Progress</span>
                    <span className="text-gray-900 font-extrabold">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.progress === 100
                          ? 'bg-gray-700'
                          : p.status === 'At Risk'
                          ? 'bg-amber-500'
                          : 'bg-[#65a30d]'
                      }`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Blocker alert if flagged */}
                {p.blocker && (
                  <div className="mb-3.5 p-2.5 rounded-xl bg-red-50/90 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="font-bold text-[11px]">{p.blocker}</span>
                  </div>
                )}

                {/* Sprint info box */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-bold text-gray-800">{p.sprint}</p>
                      <p className="text-[11px] text-gray-500">{p.sprintEnds}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                      p.daysLeft === 'Archived'
                        ? 'bg-gray-200 text-gray-700'
                        : p.daysLeft === 'Queued'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-lime-100 text-[#4d7c0f]'
                    }`}
                  >
                    {p.daysLeft}
                  </span>
                </div>

                {/* Next Milestone */}
                <div className="mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">
                    NEXT MILESTONE
                  </span>
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {p.nextMilestone}
                  </p>
                </div>

                {/* Assigned Team */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                      ASSIGNED TEAM ({p.team.length})
                    </span>
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {p.team.map((m, idx) => (
                        <span
                          key={idx}
                          title={m.name}
                          className={`inline-block w-6 h-6 rounded-full ring-2 ring-white ${m.color} text-[10px] text-white font-bold text-center leading-6`}
                        >
                          {m.initials}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-400">
                    {p.modulesInfo}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions matching screenshot */}
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                {p.status === 'At Risk' ? (
                  <>
                    <button
                      onClick={() => setShowBlockerModal(p)}
                      className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Resolve Blocker
                    </button>
                    <Link
                      href="/manager/daily-updates"
                      className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      Updates ({p.updatesCount})
                    </Link>
                  </>
                ) : p.status === 'Completed' ? (
                  <>
                    <button
                      onClick={() => showToast('Design System documentation opened.')}
                      className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold"
                    >
                      Documentation
                    </button>
                    <button
                      onClick={() => showToast('Audit log for SYS-2025-02 exported.')}
                      className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold"
                    >
                      Audit Log
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/manager/team"
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
                    >
                      Manage Team
                    </Link>
                    {p.updatesCount && (
                      <Link
                        href="/manager/daily-updates"
                        className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                      >
                        Updates ({p.updatesCount})
                      </Link>
                    )}
                  </>
                )}

                <Link
                  href="/manager/daily-updates"
                  className="text-xs font-bold text-gray-800 hover:text-[#65a30d] flex items-center gap-1 ml-auto"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Budget & Effort Allocation + Gantt Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 cols: Budget & Effort Allocation Donut */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                <span>Budget &amp; Effort Allocation</span>
              </h2>
              <span className="text-[11px] font-bold text-gray-400">Q2 Sprints</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Aggregated hours logged across managed engineers against sprint capacity limits.
            </p>

            {/* SVG Donut */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Total Circumference ≈ 251.3 */}
                  {/* 54% LMS = 135.7 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#65a30d"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="135.7 251.3"
                    strokeDashoffset="0"
                  />
                  {/* 26% CRM = 65.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="65.3 251.3"
                    strokeDashoffset="-135.7"
                  />
                  {/* 20% Other APIs = 50.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="50.3 251.3"
                    strokeDashoffset="-201.0"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-gray-900 leading-none">1,240</span>
                  <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase mt-1">
                    HOURS LOGGED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-center text-xs">
            <div className="p-2 rounded-xl bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-[#65a30d] inline-block mb-1" />
              <p className="font-extrabold text-gray-900">54%</p>
              <p className="text-[10px] text-gray-500">LMS Portal</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block mb-1" />
              <p className="font-extrabold text-gray-900">26%</p>
              <p className="text-[10px] text-gray-500">CRM Portal</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block mb-1" />
              <p className="font-extrabold text-gray-900">20%</p>
              <p className="text-[10px] text-gray-500">Other APIs</p>
            </div>
          </div>
        </div>

        {/* Right 8 cols: Deliverables & Milestones Gantt Preview */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#65a30d]" />
                <span>Deliverables &amp; Milestones Gantt Preview</span>
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
                Sprint Weeks: W24 - W28
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Sprint windows &amp; projected handoffs (Next 30 Days)
            </p>

            {/* Gantt Timeline Grid */}
            <div className="space-y-4">
              {/* Timeline Header */}
              <div className="grid grid-cols-12 text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
                <div className="col-span-4">Project / Milestone</div>
                <div className="col-span-2 text-center">Jun 08 - 14</div>
                <div className="col-span-2 text-center text-[#4d7c0f] font-extrabold bg-lime-50 rounded py-0.5">
                  Jun 15 - 21 (Curr)
                </div>
                <div className="col-span-2 text-center">Jun 22 - 28</div>
                <div className="col-span-2 text-center">Jun 29 - Jul 05</div>
              </div>

              {/* Row 1: LMS Portal */}
              <div className="grid grid-cols-12 items-center text-xs">
                <div className="col-span-4">
                  <p className="font-bold text-gray-900">LMS Portal</p>
                  <p className="text-[10px] text-gray-400 font-mono">PRJ-2025-01</p>
                </div>
                <div className="col-span-8 relative py-2">
                  <div className="w-full bg-gray-100 h-6 rounded-lg relative overflow-hidden flex items-center">
                    <div
                      className="h-full bg-[#65a30d] text-white text-[10px] font-bold flex items-center px-2 rounded-lg"
                      style={{ width: '65%' }}
                    >
                      User Testing Signoff (Jun 18)
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: CRM Portal (At Risk) */}
              <div className="grid grid-cols-12 items-center text-xs">
                <div className="col-span-4">
                  <p className="font-bold text-gray-900">CRM Portal</p>
                  <p className="text-[10px] text-amber-600 font-mono">PRJ-2025-04 [At Risk]</p>
                </div>
                <div className="col-span-8 relative py-2">
                  <div className="w-full bg-gray-100 h-6 rounded-lg relative overflow-hidden flex items-center">
                    <div
                      className="h-full bg-amber-500 text-white text-[10px] font-bold flex items-center px-2 rounded-lg ml-[25%]"
                      style={{ width: '50%' }}
                    >
                      API CORS Patch (Jun 20)
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: EMS Suite */}
              <div className="grid grid-cols-12 items-center text-xs">
                <div className="col-span-4">
                  <p className="font-bold text-gray-900">EMS Suite</p>
                  <p className="text-[10px] text-gray-400 font-mono">PRJ-2025-08</p>
                </div>
                <div className="col-span-8 relative py-2">
                  <div className="w-full bg-gray-100 h-6 rounded-lg relative overflow-hidden flex items-center">
                    <div
                      className="h-full bg-[#4d7c0f] text-white text-[10px] font-bold flex items-center px-2 rounded-lg ml-[40%]"
                      style={{ width: '45%' }}
                    >
                      RBAC &amp; Schema (Jun 25)
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: API Gateway */}
              <div className="grid grid-cols-12 items-center text-xs">
                <div className="col-span-4">
                  <p className="font-bold text-gray-900">API Gateway</p>
                  <p className="text-[10px] text-gray-400 font-mono">PRJ-2025-11</p>
                </div>
                <div className="col-span-8 relative py-2">
                  <div className="w-full bg-gray-100 h-6 rounded-lg relative overflow-hidden flex items-center">
                    <div
                      className="h-full bg-blue-600 text-white text-[10px] font-bold flex items-center px-2 rounded-lg ml-[60%]"
                      style={{ width: '35%' }}
                    >
                      Gateway Spec Kickoff (Jul 02)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend and interactive Gantt action */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d]" />
                <span>On Schedule</span>
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Blocker Attention</span>
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Future Sprint</span>
              </span>
            </div>

            <button
              onClick={() => showToast('Full interactive Gantt module launched.')}
              className="text-xs font-bold text-[#65a30d] hover:underline flex items-center gap-1"
            >
              <span>Open Full Interactive Gantt</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Blocker Resolution Modal */}
      {showBlockerModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <ShieldAlert className="w-5 h-5" />
                <h3 className="text-base font-bold text-gray-900">Resolve Project Blocker</h3>
              </div>
              <button onClick={() => setShowBlockerModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              {showBlockerModal.name} is blocked on:{' '}
              <span className="font-bold text-red-600">{showBlockerModal.blocker}</span>
            </p>
            <div className="space-y-2 mb-6">
              <button
                onClick={() => {
                  showToast('Escalated staging CORS headers to DevOps lead.');
                  setShowBlockerModal(null);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                Escalate to DevOps Team Lead
              </button>
              <button
                onClick={() => {
                  showToast('Temporary proxy workaround activated for developers.');
                  setShowBlockerModal(null);
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold text-xs"
              >
                Apply Local Proxy Workaround
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Project Extension Modal */}
      {showExtensionModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Request Project Extension</h3>
              <button onClick={() => setShowExtensionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Submit sprint window adjustment request to Executive Admin for ratification.
            </p>
            <div className="space-y-3 mb-6 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Target Project</label>
                <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl">
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Requested Extension Window</label>
                <select className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl">
                  <option>+3 Business Days (Sprint buffer)</option>
                  <option>+1 Calendar Week</option>
                  <option>+2 Calendar Weeks (Scope change)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowExtensionModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Extension request submitted to Admin.');
                  setShowExtensionModal(false);
                }}
                className="px-4 py-2 bg-[#65a30d] text-white text-xs font-bold rounded-xl"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </ManagerLayout>
  );
}

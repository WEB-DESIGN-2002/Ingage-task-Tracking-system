'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  History,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  Filter,
  FileSpreadsheet,
  Download,
  Plus,
  Flame,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  Paperclip,
  Check,
  Sparkles,
  GitPullRequest,
  GitCommit,
  Layers,
  ShieldCheck,
  AlertCircle,
  FileText,
  Printer,
  ChevronDown,
  TrendingUp,
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';
import { exportToCSV } from '@/lib/exportUtils';

interface HistoryRow {
  id: string;
  date: string;
  isToday?: boolean;
  hours: number;
  projectName: string;
  projectCode: string;
  sprint: string;
  title: string;
  summary: string;
  deliverablesText: string;
  deliverablesLink?: string;
  status: 'Approved' | 'Pending Review' | 'Changes Needed';
  feedback: string;
  manager: string;
  managerTime: string;
  pr?: string;
}

const HISTORY_ROWS: HistoryRow[] = [
  {
    id: 'row-1',
    date: 'Jun 10, 2025',
    isToday: true,
    hours: 8.5,
    projectName: 'Learning Management System',
    projectCode: 'PRJ-2025-01',
    sprint: 'Sp-04',
    title: 'Login UI & Form Validation with responsive mobile drawer',
    summary: 'Implemented CSS transitions, unified error boundary fallback, and keyboard traps.',
    deliverablesText: '2 files (png)',
    deliverablesLink: 'https://lms.company.com/auth/login',
    status: 'Approved',
    feedback:
      '"Great work on the mobile drawer animation and WCAG accessibility compliance! Approved for staging release."',
    manager: 'Priya Singh',
    managerTime: '16:45 PM',
  },
  {
    id: 'row-2',
    date: 'Jun 09, 2025',
    hours: 8.0,
    projectName: 'CRM Portal',
    projectCode: 'PRJ-2025-04',
    sprint: 'Sp-02',
    title: 'Customer pipeline Kanban interaction redesign and touch drag-and-drop fix',
    summary: 'Resolved Safari touch event collision during column reassignment.',
    deliverablesText: 'Figma v2.4',
    pr: 'PR #412',
    status: 'Approved',
    feedback: '"Fluid interactions look crisp. Merged into develop branch."',
    manager: 'Priya Singh',
    managerTime: 'Jun 09, 18:10',
  },
  {
    id: 'row-3',
    date: 'Jun 08, 2025',
    hours: 7.5,
    projectName: 'Learning Management System',
    projectCode: 'PRJ-2025-01',
    sprint: 'Sp-04',
    title: 'Integrated Zod schema validation & Toast notifications for auth errors',
    summary: 'Replaced manual input sanity triggers with reactive Zod inference.',
    deliverablesText: 'PR #409',
    pr: 'PR #409',
    status: 'Approved',
    feedback: '"Tested error boundary states; error messages are clear and well localized."',
    manager: 'Aman Verma (QA)',
    managerTime: 'Jun 08, 19:20',
  },
  {
    id: 'row-4',
    date: 'Jun 07, 2025',
    hours: 8.0,
    projectName: 'CRM Portal',
    projectCode: 'PRJ-2025-04',
    sprint: 'Sp-02',
    title: 'API Rate limiting middleware client handlers and retry interceptors',
    summary: 'Exponential backoff added on HTTP 429 status response triggers.',
    deliverablesText: '1 Proof (diff)',
    status: 'Pending Review',
    feedback: '"Awaiting review in tomorrow\'s standup."',
    manager: 'Auto-Queued',
    managerTime: 'Pending',
  },
  {
    id: 'row-5',
    date: 'Jun 06, 2025',
    hours: 7.0,
    projectName: 'Learning Management System',
    projectCode: 'PRJ-2025-01',
    sprint: 'Sp-04',
    title: 'Fixed SVG icon rendering glitch on Safari & compressed staging assets',
    summary: 'Stripped unused glyph paths and converted SVGO pipeline.',
    deliverablesText: '1 asset archive',
    status: 'Changes Needed',
    feedback: '"Please ensure the hero SVG icon retains dark mode contrast tokens." (Resolved)',
    manager: 'Kavita Desai',
    managerTime: 'Jun 06, 17:30',
  },
];

export default function UserHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Approved' | 'Pending Review' | 'Changes Needed'>('all');
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<HistoryRow | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredRows = HISTORY_ROWS.filter((row) => {
    const matchesSearch =
      row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProject =
      projectFilter === 'all'
        ? true
        : projectFilter === 'lms'
        ? row.projectCode === 'PRJ-2025-01'
        : row.projectCode === 'PRJ-2025-04';

    const matchesStatus = statusFilter === 'all' ? true : row.status === statusFilter;

    return matchesSearch && matchesProject && matchesStatus;
  });

  return (
    <UserLayout searchPlaceholder="Search work history by task title or deliverables...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Live Context Banner matching HTML 3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/user/projects" className="hover:text-slate-800">
            User Workspace
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#65a30d] font-bold">My Work History</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#65a30d] animate-pulse" />
            Git Sync: Active (commit <span className="font-bold text-slate-800">#9fa21e</span>)
          </span>
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">Sprint 04 • W36</span>
        </div>
      </div>

      {/* Header Section matching HTML 3 */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-[#65a30d]" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Work History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-4">
            Review your past daily updates, logged work entries, approved deliverables, and manager feedback remarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Jun 01, 2025 - Jun 10, 2025</span>
          </div>

          <button
            onClick={() => {
              const exportRows = filteredRows.map((r, idx) => ({
                'S.No': idx + 1,
                'Employee Name': 'Rahul Sharma',
                'Project Name': r.projectName,
                'Project Code': r.projectCode,
                'Sprint': r.sprint,
                'Task Date': r.date,
                'Task Title': r.title,
                'Work Summary': r.summary,
                'Hours': r.hours,
                'Deliverables': r.deliverablesText,
                'Review Status': r.status,
                'Manager Feedback': r.feedback,
                'Reviewer': r.manager,
                'PR': r.pr || 'N/A',
              }));
              exportToCSV(`TaskFlow_RahulSharma_WorkHistory_${new Date().toISOString().slice(0, 10)}`, exportRows);
              showToast(`Exported ${exportRows.length} work history entries to CSV spreadsheet.`);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <Link
            href="/user/add-update"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Update</span>
          </Link>
        </div>
      </div>

      {/* Summary Metrics Bento Bar (4 Cards) matching HTML 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Entries Logged</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-[#65a30d] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">48 Updates</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d]" />
              <span>Across 3 active projects</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Hours Logged</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-[#65a30d] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">184.5</span>
              <span className="text-xs font-bold text-slate-500">hrs</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-[#4d7c0f] font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Avg 7.8 hrs/day (Target: 8.0)</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Approval Rate</span>
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-[#65a30d] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">96.2%</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
              <span className="text-[#4d7c0f] font-bold">44 Approved</span>
              <span>•</span>
              <span className="text-sky-600 font-semibold">3 Pending</span>
              <span>•</span>
              <span className="text-rose-600 font-semibold">1 Revision</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Active Sprint Streak</span>
            <div className="w-8 h-8 rounded-lg bg-lime-100 text-[#4d7c0f] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">12 Days</span>
              <CheckCircle2 className="w-5 h-5 text-[#65a30d]" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Consecutive daily logs on-time</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Console matching HTML 3 */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by task title, ticket ID, or deliverables..."
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#65a30d]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
            >
              <option value="all">All Projects (LMS, CRM, EMS)</option>
              <option value="lms">Learning Management System</option>
              <option value="crm">CRM Portal</option>
            </select>

            <select className="h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <option>All Priorities</option>
              <option>P1 - Critical</option>
              <option>P2 - High</option>
              <option>P3 - Normal</option>
            </select>

            <select className="h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Current Sprint (Sp-04)</option>
            </select>
          </div>
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
            Filter By Status:
          </span>
          {[
            { id: 'all', label: 'All', count: 48 },
            { id: 'Approved', label: 'Approved', count: 44, color: 'bg-[#65a30d]' },
            { id: 'Pending Review', label: 'Pending Review', count: 3, color: 'bg-sky-500' },
            { id: 'Changes Needed', label: 'Changes Needed', count: 1, color: 'bg-rose-500' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setStatusFilter(chip.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === chip.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {chip.color && <span className={`w-2 h-2 rounded-full ${chip.color}`} />}
              <span>{chip.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px] font-mono">
                {chip.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Work History Table matching HTML 3 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8">
        <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900">
            Logged Submission Entries ({filteredRows.length} of 48 shown)
          </span>
          <span className="text-slate-400">Click any row to inspect audit drawer</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/60 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Date &amp; Hours</th>
                <th className="py-3 px-4">Project &amp; Sprint</th>
                <th className="py-3 px-4">Task Summary</th>
                <th className="py-3 px-4">Deliverables</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Manager Feedback</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedDrawerItem(row)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 align-top">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <span>{row.date}</span>
                      {row.isToday && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-lime-100 text-[#4d7c0f]">
                          TODAY
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      <span className="font-bold text-slate-700">{row.hours} hrs</span> logged
                    </p>
                  </td>

                  <td className="py-3.5 px-4 align-top">
                    <p className="font-bold text-slate-900">{row.projectName}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {row.projectCode} • <span className="text-slate-600 font-semibold">{row.sprint}</span>
                    </p>
                  </td>

                  <td className="py-3.5 px-4 align-top max-w-xs">
                    <p className="font-semibold text-slate-900 truncate">{row.title}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{row.summary}</p>
                  </td>

                  <td className="py-3.5 px-4 align-top">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      <Paperclip className="w-3 h-3 text-[#65a30d]" />
                      <span>{row.deliverablesText}</span>
                    </span>
                    {row.deliverablesLink && (
                      <span className="block text-[10px] text-sky-600 truncate mt-1">
                        {row.deliverablesLink}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 align-top">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : row.status === 'Pending Review'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      • {row.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 align-top max-w-xs">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-[11px]">
                      <p className="italic text-slate-700 truncate">{row.feedback}</p>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                        <span className="font-bold text-slate-600">{row.manager}</span>
                        <span>{row.managerTime}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 align-top text-right">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 ml-auto mt-1" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Artifacts & Work Verification Showcase Section matching HTML 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Spotlight 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Deliverable Spotlight
              </span>
              <span className="px-2 py-0.5 rounded bg-lime-100 text-[#4d7c0f] font-mono text-[10px] font-bold">
                PRJ-2025-01
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Login UI &amp; Form Validation State</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              High-fidelity responsive capture with client-side form validation feedback indicators.
            </p>
          </div>

          <div className="relative h-40 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-xs font-mono p-4">
            <div className="text-center">
              <span className="text-[#65a30d] font-bold block mb-1">login-desktop.png (2.4 MB)</span>
              <span className="text-slate-400 text-[11px]">Verified by Priya Singh</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedDrawerItem(HISTORY_ROWS[0])}
            className="text-xs font-bold text-[#65a30d] hover:underline flex items-center gap-1 self-start"
          >
            <span>Inspect Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Spotlight 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Kanban Interaction Audit
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-700 font-mono text-[10px] font-bold">
                PRJ-2025-04
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Mobile Drawer Drag Gesture Demo</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual touch trajectory analysis during Kanban card pipeline updates on handheld viewports.
            </p>
          </div>

          <div className="relative h-40 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white text-xs font-mono p-4">
            <div className="text-center">
              <span className="text-sky-400 font-bold block mb-1">mobile-drawer.png (1.8 MB)</span>
              <span className="text-slate-400 text-[11px]">Merged to Staging</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedDrawerItem(HISTORY_ROWS[1])}
            className="text-xs font-bold text-[#65a30d] hover:underline flex items-center gap-1 self-start"
          >
            <span>Inspect Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sprint Velocity Log Graphic matching HTML 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Sprint Velocity
              </span>
              <span className="text-[#65a30d] font-mono text-[10px] font-bold">Sprint 04 Live</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Daily Logging Distribution</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Consistent daily logging frequency across the ongoing bi-weekly delivery cycle.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span>Past 7 Days Output</span>
              <span className="text-[#4d7c0f]">54.0 hrs Total</span>
            </div>
            <div className="flex items-end justify-between h-20 px-2">
              {[8.0, 7.5, 8.0, 7.0, 8.0, 8.0, 8.5].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 rounded-t ${idx === 6 ? 'bg-[#65a30d]' : 'bg-slate-300'}`}
                    style={{ height: `${val * 8}%` }}
                  />
                  <span className="text-[9px] font-mono text-slate-400">{val}h</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-100">
            <span>Target: 8.0 hrs/day</span>
            <span className="text-[#4d7c0f] font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> On Track (102%)
            </span>
          </div>
        </div>
      </div>

      {/* Slide-out Inspection Drawer matching HTML 3 */}
      {selectedDrawerItem && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setSelectedDrawerItem(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white z-50 shadow-2xl flex flex-col border-l border-slate-200 animate-slideLeft">
            {/* Drawer Header */}
            <div className="p-5 bg-slate-50 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#65a30d] text-white flex items-center justify-center font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Submission Audit Details</h3>
                  <span className="font-mono text-[11px] text-slate-400">
                    LOG-{selectedDrawerItem.date.replace(/[^0-9]/g, '')}-01
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDrawerItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                  <span className="px-2 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] font-bold">
                    {selectedDrawerItem.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{selectedDrawerItem.title}</h4>
                <p className="text-slate-500">
                  Logged by: <strong>Rahul Sharma</strong> • Date:{' '}
                  <strong>
                    {selectedDrawerItem.date} ({selectedDrawerItem.hours} hrs)
                  </strong>
                </p>
              </div>

              {/* Work Scope */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Execution Scope</span>
                <p className="p-3 rounded-xl bg-slate-50 text-slate-700 leading-relaxed border border-slate-200">
                  {selectedDrawerItem.summary}
                </p>
              </div>

              {/* Manager Feedback */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Manager Sign-Off Note</span>
                <div className="bg-lime-50/70 p-4 rounded-xl border border-lime-200 text-slate-800 italic space-y-2">
                  <p>{selectedDrawerItem.feedback}</p>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 not-italic pt-1 border-t border-lime-200/50">
                    <span>{selectedDrawerItem.manager}</span>
                    <span>{selectedDrawerItem.managerTime}</span>
                  </div>
                </div>
              </div>

              {/* Cryptographic audit check */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-[#4d7c0f] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Cryptographically Verified Internal Audit Signature</span>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => showToast('Audit card sent to printer.')}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 font-semibold text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Audit Card</span>
              </button>

              <button
                onClick={() => setSelectedDrawerItem(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}

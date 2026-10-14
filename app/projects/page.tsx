'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Upload,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  ChevronDown,
  Filter,
  List,
  Table as TableIcon,
  Download,
  Eye,
  Edit2,
  MoreVertical,
  X,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_PROJECTS, type Project } from '@/lib/mockData';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredProjects = projects.filter((prj) => {
    const matchesSearch =
      prj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prj.manager.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || prj.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || prj.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <WorkspaceLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          WORKSPACE OVERVIEW / <span className="text-gray-600 font-mono">PRJ-CORE</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Projects
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage, monitor deadlines, and track performance across all corporate initiatives.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-gray-500" />
              <span>Import</span>
            </button>

            <Link
              href="/projects/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              TOTAL INITIATIVES
            </span>
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">12</span>
            <p className="text-[11px] text-[#65a30d] font-bold mt-1">↗ +2 this quarter</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 border border-gray-100 flex items-center justify-center">
            <FolderKanban className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              IN PROGRESS
            </span>
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">8</span>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">↻ 67% of pipeline</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              HIGH ATTENTION
            </span>
            <span className="text-2xl font-extrabold text-red-600 tabular-nums">3</span>
            <p className="text-[11px] text-red-600 font-bold mt-1">! Deadlines &lt; 14 days</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              DELIVERED
            </span>
            <span className="text-2xl font-extrabold text-gray-900 tabular-nums">3</span>
            <p className="text-[11px] text-[#65a30d] font-bold mt-1">✓ 100% on schedule</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] border border-lime-100 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200/90 shadow-2xs mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left Search */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-gray-700 font-semibold focus:outline-none focus:bg-white cursor-pointer"
            >
              <option value="All">Status: All</option>
              <option value="In Progress">In Progress</option>
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-gray-700 font-semibold focus:outline-none focus:bg-white cursor-pointer"
            >
              <option value="All">Priority: All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Date Range Picker trigger */}
          <button
            onClick={() => showToast('Date range: Current Active Quarter (Q2 2025)')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-gray-700 font-semibold hover:bg-slate-100 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Date Range</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
              setPriorityFilter('All');
              showToast('Filters cleared.');
            }}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-gray-600"
            title="Reset Filters"
          >
            <Filter className="w-3.5 h-3.5" />
          </button>

          {/* View switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/70">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>

          {/* Export */}
          <button
            onClick={() => showToast('Exporting 12 projects to spreadsheet CSV...')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-gray-700 font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden mb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-200 text-gray-500 font-bold tracking-wider uppercase text-[10px]">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">PROJECT NAME</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4">PRIORITY</th>
                <th className="py-3.5 px-4">START DATE</th>
                <th className="py-3.5 px-4">DEADLINE</th>
                <th className="py-3.5 px-4">MANAGER</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((prj, idx) => (
                <tr key={prj.id} className="hover:bg-slate-50/70 transition-colors group">
                  <td className="py-4 px-4 text-center font-mono text-gray-400 font-semibold">
                    {idx + 1}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0 border border-blue-100">
                        {prj.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-[#65a30d] transition-colors">
                          {prj.name}
                        </p>
                        <p className="text-[11px] text-gray-400 font-mono">
                          {prj.code} • {prj.modulesCount} modules
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        prj.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : prj.status === 'Completed'
                          ? 'bg-lime-50 text-[#4d7c0f] border-lime-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          prj.status === 'In Progress'
                            ? 'bg-blue-600'
                            : prj.status === 'Completed'
                            ? 'bg-[#65a30d]'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span>{prj.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase ${
                        prj.priority === 'High'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : prj.priority === 'Medium'
                          ? 'bg-gray-100 text-gray-700 border border-gray-200'
                          : 'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {prj.priority === 'High' && '↑'}
                      {prj.priority === 'Low' && '↓'}
                      {prj.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-gray-600">{prj.startDate}</td>
                  <td className="py-4 px-4 font-mono font-bold">
                    <span
                      className={
                        prj.priority === 'High' && prj.status !== 'Completed'
                          ? 'text-red-600'
                          : 'text-gray-700'
                      }
                    >
                      {prj.deadline}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-[9px] flex items-center justify-center">
                        {prj.manager.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800">{prj.manager.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedProject(prj)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedProject(prj)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => showToast(`Actions for ${prj.name}`)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="py-3 px-4 bg-slate-50/60 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
          <div>
            Showing <span className="font-bold text-gray-800">1-{filteredProjects.length}</span> of{' '}
            <span className="font-bold text-gray-800">12</span> projects | Active Filters:{' '}
            <span className="font-semibold text-gray-700">
              {statusFilter !== 'All' ? statusFilter : 'None'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-white disabled:opacity-40">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg bg-[#65a30d] text-white font-bold text-xs shadow-xs">
              1
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-white text-gray-700 font-semibold text-xs border border-gray-200">
              2
            </button>
            <button className="w-7 h-7 rounded-lg hover:bg-white text-gray-700 font-semibold text-xs border border-gray-200">
              3
            </button>
            <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-white">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block">{selectedProject.code}</span>
                <h3 className="text-lg font-bold text-gray-900">{selectedProject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Lifecycle Status</span>
                <span className="font-bold text-[#65a30d]">{selectedProject.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Deadline</span>
                <span className="font-bold font-mono text-gray-900">{selectedProject.deadline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Lead Manager</span>
                <span className="font-bold text-gray-900">{selectedProject.manager.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sprint Progress</span>
                <span className="font-bold text-gray-900">{selectedProject.progress}%</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/assignments"
                className="flex-1 py-2.5 px-3 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-semibold text-center transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                Manage Team Assignments
              </Link>
              <button
                onClick={() => setSelectedProject(null)}
                className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-base font-bold text-gray-900">Bulk Import Projects</h3>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Upload a .CSV, .XLSX, or JSON export containing project definitions and initial scope.
            </p>
            <div className="border-2 border-dashed border-gray-200 hover:border-[#65a30d] rounded-2xl p-6 text-center mb-5 transition-colors cursor-pointer bg-slate-50/50">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700">Click or drag spreadsheet file here</p>
              <p className="text-[10px] text-gray-400 mt-1">Supports CSV, XLSX up to 25MB</p>
            </div>
            <button
              onClick={() => {
                setShowImportModal(false);
                showToast('Import template processed successfully.');
              }}
              className="w-full py-2.5 bg-[#65a30d] text-white rounded-xl text-xs font-semibold"
            >
              Confirm Import
            </button>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}

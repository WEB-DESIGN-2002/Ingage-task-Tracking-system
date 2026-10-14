'use client';

import { useState } from 'react';
import {
  Calendar,
  Filter,
  FileSpreadsheet,
  Download,
  Search,
  ChevronDown,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_DAILY_LOGS, type DailyLog } from '@/lib/mockData';
import { exportToCSV } from '@/lib/exportUtils';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Project-wise' | 'Employee-wise' | 'Status-wise'>('Daily');
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [selectedEmployee, setSelectedEmployee] = useState('All Employees');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [searchQuery, setSearchQuery] = useState('');
  const [logs, setLogs] = useState<DailyLog[]>(INITIAL_DAILY_LOGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = () => {
    setSelectedProject('All Projects');
    setSelectedEmployee('All Employees');
    setSelectedStatus('All Statuses');
    setSelectedPriority('All Priorities');
    setSearchQuery('');
    showToast('Filters reset to default.');
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.taskDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject =
      selectedProject === 'All Projects' || log.project.name.includes(selectedProject);
    const matchesStatus =
      selectedStatus === 'All Statuses' || log.status === selectedStatus;
    const matchesPriority =
      selectedPriority === 'All Priorities' || log.priority === selectedPriority;
    return matchesSearch && matchesProject && matchesStatus && matchesPriority;
  });

  return (
    <WorkspaceLayout>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          WORKSPACE &gt; <span className="text-[#65a30d]">REPORTS &amp; ANALYTICS</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Reports &amp; Analytics
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 max-w-2xl">
              Audit employee daily progress, review submission remarks, monitor tracking metrics, and export consolidated performance spreadsheets.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Jun 01, 2025 - Jun 10, 2025</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>

            <button
              onClick={() => showToast('Saved reporting presets toggled.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>Saved Filters</span>
            </button>

            <button
              onClick={() => {
                const exportData = filteredLogs.map((log, idx) => ({
                  'S.No': idx + 1,
                  'Log ID': log.id,
                  'Date': log.date,
                  'Employee Name': log.employee.name,
                  'Employee Role': log.employee.role,
                  'Project Name': log.project.name,
                  'Project Code': log.project.code,
                  'Task Title': log.taskTitle,
                  'Description': log.taskDescription,
                  'Status': log.status,
                  'Priority': log.priority,
                  'Progress (%)': log.status === 'Completed' ? 100 : log.status === 'In Progress' ? 65 : 25,
                  'Logged Hours': log.hours,
                  'Review Status': log.status === 'Completed' ? 'Approved' : 'Pending Review',
                  'Manager Remarks': log.status === 'Completed' ? 'Approved by Project Manager' : 'Pending Review',
                }));
                exportToCSV(`Ingage_TaskFlow_Report_${activeTab.toLowerCase()}_${new Date().toISOString().slice(0, 10)}`, exportData);
                showToast(`Downloaded ${exportData.length} report records as CSV spreadsheet.`);
              }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Export CSV / Excel</span>
              <Download className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Metric 1 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-gray-600">Total Updates Logged</span>
            <div className="w-7 h-7 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">142</span>
              <span className="text-[11px] font-bold text-[#65a30d]">↗ +18.4%</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Across 8 active sprints this cycle</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-gray-600">On-Time Submission Rate</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">94.6%</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-50 text-[#4d7c0f] border border-lime-200/60">
                ✓ Target &gt;90%
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '94.6%' }} />
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-gray-600">Avg Daily Hours</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">7.8</span>
              <span className="text-xs text-gray-500 font-semibold">hrs</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60">
                Optimal Focus
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Per active team contributor</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-semibold text-gray-600">Pending Manager Feedback</span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-red-600 tabular-nums">7</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200/60">
                Action Req.
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Oldest logged 32 hours ago</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(['Daily', 'Weekly', 'Monthly', 'Project-wise', 'Employee-wise', 'Status-wise'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-[#65a30d] text-white shadow-xs'
                    : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200/80'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
          <span>Auto-sync enabled • Jun 10, 2025</span>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-center text-xs">
        {/* Project */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            PROJECT
          </label>
          <div className="relative">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full appearance-none pl-2.5 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option>All Projects</option>
              <option>LMS Portal</option>
              <option>CRM Portal</option>
              <option>EMS Suite</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Employee */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            EMPLOYEE
          </label>
          <div className="relative">
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full appearance-none pl-2.5 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option>All Employees</option>
              <option>Rahul Sharma</option>
              <option>Sneha Patel</option>
              <option>Amit Kumar</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Date Window */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            DATE WINDOW
          </label>
          <div className="relative">
            <input
              type="text"
              defaultValue="06/10/2025"
              className="w-full pl-2.5 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
            />
            <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Task Status */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            TASK STATUS
          </label>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none pl-2.5 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option>All Statuses</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Blocked</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            PRIORITY
          </label>
          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full appearance-none pl-2.5 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
            >
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            SEARCH
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Title, remark..."
              className="w-full pl-2.5 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-gray-800 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Reset button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-gray-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Daily Progress Audit Log Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-900">Daily Progress Audit Log</h3>
            <span className="px-2 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-xs">
              142 records found
            </span>
          </div>

          <button
            onClick={() => showToast('Audit logs refreshed.')}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
            title="Refresh logs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-gray-200 text-gray-500 font-bold tracking-wider uppercase text-[10px]">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">EMPLOYEE</th>
                <th className="py-3 px-4">PROJECT</th>
                <th className="py-3 px-4">DATE &amp; HOURS</th>
                <th className="py-3 px-4">TASK DETAILS</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PRIORITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log, idx) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-center font-mono text-gray-400">
                    {String(idx + 1).padStart(2, '0')}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full ${log.employee.color} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                      >
                        {log.employee.initials}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{log.employee.name}</p>
                        <p className="text-[10px] text-gray-400">{log.employee.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900">{log.project.name}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{log.project.code}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <p className="text-gray-700">{log.date}</p>
                    <p className="text-[#65a30d] font-bold">{log.hours} hrs logged</p>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-bold text-gray-900">{log.taskTitle}</p>
                    <p className="text-[11px] text-gray-500 truncate">{log.taskDescription}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Completed'
                          ? 'bg-lime-50 text-[#4d7c0f] border border-lime-200'
                          : log.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          log.status === 'Completed'
                            ? 'bg-[#65a30d]'
                            : log.status === 'In Progress'
                            ? 'bg-blue-600'
                            : 'bg-red-500'
                        }`}
                      />
                      <span>{log.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : log.priority === 'Medium'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {log.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="py-3 px-4 bg-slate-50/60 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="bg-white border border-gray-200 rounded px-1 py-0.5">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>Showing 1 to 6 of 142 entries</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button className="p-1 rounded text-gray-400 hover:bg-gray-200">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="w-6 h-6 rounded bg-[#65a30d] text-white font-bold text-xs">
              1
            </button>
            <button className="w-6 h-6 rounded hover:bg-gray-200 text-gray-700">2</button>
            <button className="w-6 h-6 rounded hover:bg-gray-200 text-gray-700">3</button>
            <span>...</span>
            <button className="w-6 h-6 rounded hover:bg-gray-200 text-gray-700">15</button>
            <button className="p-1 rounded text-gray-400 hover:bg-gray-200">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom 2 Charts: Throughput Bars + Donut Ratios */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Daily-Update Throughput Bar Chart */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Weekly Daily-Update Throughput</h3>
                <p className="text-xs text-gray-400">Logged updates submitted across the last 10 work days</p>
              </div>
              <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                Daily Total Count
              </span>
            </div>

            {/* 10 Bar Columns SVG */}
            <div className="w-full h-40 pt-4">
              <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
                <line x1="10" y1="90" x2="490" y2="90" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="10" y1="50" x2="490" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="10" y1="10" x2="490" y2="10" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                {/* Bars */}
                <rect x="25" y="45" width="20" height="45" rx="4" fill="#a3e635" fillOpacity="0.4" />
                <rect x="75" y="35" width="20" height="55" rx="4" fill="#a3e635" fillOpacity="0.5" />
                <rect x="125" y="25" width="20" height="65" rx="4" fill="#65a30d" />
                <rect x="175" y="40" width="20" height="50" rx="4" fill="#a3e635" fillOpacity="0.4" />
                <rect x="225" y="15" width="20" height="75" rx="4" fill="#65a30d" />
                <rect x="275" y="70" width="20" height="20" rx="4" fill="#e2e8f0" />
                <rect x="325" y="75" width="20" height="15" rx="4" fill="#e2e8f0" />
                <rect x="375" y="30" width="20" height="60" rx="4" fill="#65a30d" />
                <rect x="425" y="20" width="20" height="70" rx="4" fill="#65a30d" />
                <rect x="475" y="10" width="20" height="80" rx="4" fill="#4d7c0f" />
              </svg>
            </div>

            {/* Labels */}
            <div className="flex justify-between text-[10px] text-gray-400 font-mono pt-2 border-t border-gray-100">
              <span>06/01</span>
              <span>06/02</span>
              <span>06/03</span>
              <span>06/04</span>
              <span>06/05</span>
              <span>06/06</span>
              <span>06/07</span>
              <span>06/08</span>
              <span>06/09</span>
              <span className="font-bold text-gray-900">06/10</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mt-3">
            <span className="text-gray-500 flex items-center gap-1.5">
              <span className="text-[#65a30d]">↗</span> Peak submissions recorded on Fridays and Tuesdays
            </span>
            <span className="font-bold text-gray-900">Jun 10: 24 Updates</span>
          </div>
        </div>

        {/* Update Status Ratios Donut */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">Update Status Ratios</h3>
              <span className="text-[10px] text-gray-400 font-semibold">Active Sprint</span>
            </div>

            {/* Donut Chart */}
            <div className="flex items-center justify-center my-3">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Completed = 97 (68.3%) -> 154.5 / 226.2 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="#65a30d"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="154.5 226.2"
                    strokeDashoffset="0"
                  />
                  {/* In Progress = 34 (23.9%) -> 54.1 / 226.2 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="#0284c7"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="54.1 226.2"
                    strokeDashoffset="-154.5"
                  />
                  {/* Blocked = 11 (7.7%) -> 17.5 / 226.2 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    stroke="#ef4444"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray="17.5 226.2"
                    strokeDashoffset="-208.6"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-gray-900 leading-none">142</span>
                  <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">Tasks</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d]" />
                  <span>Completed</span>
                </div>
                <span className="font-bold text-gray-900">97 (68%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                  <span>In Progress</span>
                </div>
                <span className="font-bold text-gray-900">34 (24%)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  <span>Blocked / Issues</span>
                </div>
                <span className="font-bold text-gray-900">11 (8%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

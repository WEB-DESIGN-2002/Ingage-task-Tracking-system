'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Check,
  ChevronDown,
  Upload,
  FileText,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';

interface AssignedEmployee {
  id: string;
  name: string;
  avatar: string;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const [projectName, setProjectName] = useState('Enterprise ERP Migration');
  const [description, setDescription] = useState(
    'Centralize procurement, vendor billing, and automated inventory sync with multi-warehouse reconciliation.'
  );
  const [startDate, setStartDate] = useState('2025-06-01');
  const [deadline, setDeadline] = useState('2025-06-30');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Planned');
  const [manager, setManager] = useState('Priya Singh • Lead Project Specialist');
  const [employees, setEmployees] = useState<AssignedEmployee[]>([
    { id: '1', name: 'Rahul Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80' },
    { id: '2', name: 'Priya Singh', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80' },
    { id: '3', name: 'Amit Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
  ]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'PRD_ERP_Migration_v2.pdf', size: '2.4 MB' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddEmployee = () => {
    if (!newEmployeeName.trim()) return;
    setEmployees([
      ...employees,
      {
        id: Date.now().toString(),
        name: newEmployeeName.trim(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
      },
    ]);
    setNewEmployeeName('');
  };

  const handleRemoveEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Project "Enterprise ERP Migration" created successfully!');
      setTimeout(() => {
        router.push('/projects');
      }, 700);
    }, 500);
  };

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
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
          <Link href="/projects" className="hover:text-gray-600 transition-colors">
            Projects
          </Link>
          <span>&gt;</span>
          <span className="text-[#65a30d]">Create Project</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Create Project
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Configure your team, delivery timeline, and initial resources.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200/90 rounded-full text-xs font-semibold text-gray-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
            <span>Draft Auto-Saved</span>
          </div>
        </div>
      </div>

      {/* 2-Column Form Card (matching Image 4) */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm mb-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT COLUMN: GENERAL INFORMATION ================= */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <span className="w-6 h-6 rounded-lg bg-lime-100 text-[#65a30d] flex items-center justify-center text-xs">
                  ≡
                </span>
                <span>General Information</span>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">* Required fields</span>
            </div>

            {/* Project Name */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <label htmlFor="pname" className="font-semibold text-gray-700">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-gray-400 font-mono">
                  {projectName.length}/80
                </span>
              </div>
              <input
                id="pname"
                type="text"
                maxLength={80}
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enterprise ERP Migration"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 focus:border-[#65a30d]"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="pdesc" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="pdesc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the project in detail, including key targets, architecture updates, and team deliverables..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 focus:border-[#65a30d]"
              />
            </div>

            {/* Start Date & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sdate" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="sdate"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edate" className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Deadline <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="edate"
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
                  />
                </div>
              </div>
            </div>

            {/* Priority & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Priority
                </label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer font-medium"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer font-medium"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: TEAM & DOCUMENTATION ================= */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                  👥
                </span>
                <span>Team &amp; Documentation</span>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Collaboration</span>
            </div>

            {/* Select Manager */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Select Manager <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  className="w-full appearance-none pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer font-medium"
                >
                  <option>Priya Singh • Lead Project Specialist</option>
                  <option>Sneha Patel • Engineering Manager</option>
                  <option>Rahul Sharma • Technical Lead</option>
                  <option>Amit Kumar • QA Architect</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Select Employees */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <label className="font-semibold text-gray-700">
                  Select Employees <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Employee directory browser opened.')}
                  className="text-[11px] font-semibold text-[#65a30d] hover:underline"
                >
                  Browse All
                </button>
              </div>

              {/* Chips container */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl min-h-[50px] flex flex-wrap items-center gap-2">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="inline-flex items-center gap-1.5 pl-1.5 pr-2 py-1 bg-white border border-gray-200 rounded-xl text-xs font-medium text-gray-800 shadow-2xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-slate-200 text-gray-700 font-bold text-[9px] flex items-center justify-center">
                      {emp.name[0]}
                    </div>
                    <span>{emp.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmployee(emp.id)}
                      className="text-gray-400 hover:text-red-500 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                <span className="px-2 py-1 bg-lime-50 text-[#4d7c0f] rounded-lg text-xs font-bold border border-lime-200/60">
                  +3 more
                </span>

                <input
                  type="text"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEmployee();
                    }
                  }}
                  placeholder="Type name to add..."
                  className="flex-1 min-w-[120px] bg-transparent text-xs text-gray-800 focus:outline-none placeholder-gray-400 px-1 py-1"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">
                6 team members currently allocated to this sprint scope.
              </p>
            </div>

            {/* Project Documents (Optional) */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <label className="font-semibold text-gray-700">Project Documents (Optional)</label>
                <span className="text-[10px] text-gray-400">Max 10MB</span>
              </div>

              {/* Drag & drop upload box */}
              <div
                onClick={() => showToast('File selector opened.')}
                className="border-2 border-dashed border-gray-200 hover:border-[#65a30d] rounded-2xl p-5 text-center cursor-pointer transition-colors bg-slate-50/50"
              >
                <div className="w-10 h-10 rounded-full bg-lime-50 text-[#65a30d] flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  Click to upload or drag and drop
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  PDF, DOCX, XLSX, PNG, JPG (Max 10MB per file)
                </p>
              </div>

              {/* Uploaded File List */}
              <div className="mt-2.5 space-y-1.5">
                {uploadedFiles.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold">{file.name}</span>
                      <span className="text-gray-400 font-mono text-[10px]">{file.size}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))}
                      className="text-gray-400 hover:text-red-500 p-1"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/projects"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Create Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </WorkspaceLayout>
  );
}

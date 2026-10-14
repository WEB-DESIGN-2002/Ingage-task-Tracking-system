'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Calendar,
  CloudUpload,
  Link as LinkIcon,
  ExternalLink,
  Trash2,
  Eye,
  Download,
  Bold,
  Italic,
  List,
  Code,
  Sparkles,
  Bookmark,
  Send,
  Check,
  ChevronRight,
  Info,
  Flag,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';

interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf';
  previewUrl?: string;
}

export default function UserAddDailyUpdatePage() {
  const [project, setProject] = useState('PRJ-2025-01');
  const [taskDate, setTaskDate] = useState('2025-06-10');
  const [taskTitle, setTaskTitle] = useState(
    'Completed login page UI with responsive design and integrated form validation'
  );
  const [workDescription, setWorkDescription] = useState(
    'Refactored authentication layout to support responsive mobile drawers. Added client-side Zod validation with React Hook Form. Fixed CSRF token submission and integrated error toast notifications for invalid credentials. Ensured strict WCAG AA keyboard navigation compliance.'
  );
  const [remarks, setRemarks] = useState(
    'Ready for manager sign-off. Cross-browser testing completed on Chrome, Safari, and Firefox.'
  );
  const [status, setStatus] = useState<'completed' | 'in_progress' | 'blocked' | 'not_started'>('completed');
  const [priority, setPriority] = useState<'high' | 'urgent' | 'medium' | 'low'>('high');
  const [progress, setProgress] = useState(100);
  const [liveUrl, setLiveUrl] = useState('https://lms.company.com/auth/login');

  const [files, setFiles] = useState<AttachmentFile[]>([
    {
      id: 'f-1',
      name: 'login-desktop-view.png',
      size: '1.4 MB • Image (PNG)',
      type: 'image',
    },
    {
      id: 'f-2',
      name: 'mobile-drawer-responsive.png',
      size: '980 KB • Image (PNG)',
      type: 'image',
    },
    {
      id: 'f-3',
      name: 'auth-flow-test-results.pdf',
      size: '420 KB • Document (PDF)',
      type: 'pdf',
    },
  ]);

  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    showToast('Attachment removed.');
  };

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    setTimeout(() => {
      setIsSavingDraft(false);
      showToast('Draft saved successfully at 02:45 PM.');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Update Submitted Successfully! Logged into Sprint 24 & sent to Priya Singh.');
  };

  return (
    <UserLayout searchPlaceholder="Search projects, tasks, or updates...">
      {/* Toast Notification Micro-interaction */}
      {toastMessage && (
        <div className="fixed bottom-24 right-8 z-50 bg-[#111827] text-white text-xs px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fadeIn">
          <div className="w-7 h-7 rounded-full bg-[#65a30d] text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div>
            <p className="font-bold text-white">Daily Update Recorded</p>
            <p className="text-[11px] text-slate-300 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Breadcrumb & Draft Status matching HTML 1 */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/user/projects" className="hover:text-slate-800 transition-colors">
            My Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Add Daily Update</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-600 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#65a30d] animate-pulse" />
          <span>
            Draft Auto-Saved at <strong className="text-slate-800 font-semibold">02:45 PM</strong>
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#65a30d]" />
        </div>
      </div>

      {/* Page Header with Sprint badge and Weekly stats matching HTML 1 */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add Daily Update</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-xs tracking-wide border border-lime-200">
              SPRINT 24
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Record your daily work progress, update milestones, and submit evidence for manager review.
          </p>
        </div>

        {/* Logged This Week Card */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 self-start sm:self-auto">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Logged This Week
            </span>
            <span className="text-lg font-extrabold text-slate-900">
              32.5 <span className="text-xs text-slate-500 font-medium">/ 40 hrs</span>
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-lime-100 text-[#4d7c0f] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Two-Column Form Layout matching HTML 1 */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
        {/* LEFT COLUMN: Work Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#65a30d]" />
                <h2 className="text-base font-bold text-slate-900">Work Details</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">* Required fields</span>
            </div>

            {/* Project Selector & Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Project Select */}
              <div className="sm:col-span-7 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d]"
                >
                  <option value="PRJ-2025-01">Learning Management System (PRJ-2025-01)</option>
                  <option value="PRJ-2025-02">CRM Integration &amp; Analytics Portal (PRJ-2025-02)</option>
                  <option value="PRJ-2025-03">Employee Mobile Experience Revamp (PRJ-2025-03)</option>
                </select>
              </div>

              {/* Task Date */}
              <div className="sm:col-span-5 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Task Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d]"
                />
              </div>
            </div>

            {/* Task Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">{taskTitle.length} / 120</span>
              </div>
              <input
                type="text"
                value={taskTitle}
                maxLength={120}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="E.g., Design authentication modals, integrate GraphQL mutations"
                className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d]"
              />
            </div>

            {/* Detailed Work Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Work Description <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">Markdown supported</span>
              </div>
              <div className="rounded-xl border border-slate-200 overflow-hidden focus-within:border-[#65a30d] focus-within:ring-1 focus-within:ring-[#65a30d]">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-slate-600">
                  <div className="flex items-center gap-1">
                    <button type="button" className="p-1 rounded hover:bg-slate-200" title="Bold">
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-slate-200" title="Italic">
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-slate-200" title="List">
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" className="p-1 rounded hover:bg-slate-200" title="Code">
                      <Code className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Zod • React Hook Form
                  </span>
                </div>
                <textarea
                  value={workDescription}
                  onChange={(e) => setWorkDescription(e.target.value)}
                  rows={5}
                  className="w-full p-3 bg-white text-sm text-slate-800 focus:outline-none resize-y leading-relaxed border-0"
                />
              </div>
            </div>

            {/* Employee Remarks (Optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>
                  Employee Remarks <span className="font-normal text-slate-400">(Optional)</span>
                </span>
                <span title="Visible to lead and project manager" className="inline-flex">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </span>
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                placeholder="Add notes for your manager, blockers, or special review instructions..."
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d] resize-y leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Execution State & Evidence (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Execution State Card matching HTML 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d]" />
              <h2 className="text-base font-bold text-slate-900">Execution State</h2>
            </div>

            {/* Status & Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d]"
                >
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="not_started">Not Started</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d]"
                >
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Progress Slider & Number */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Progress Completion</label>
                <span className="px-2 py-0.5 rounded-md bg-[#65a30d] text-white font-extrabold text-xs">
                  {progress}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#65a30d]"
              />
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-0.5">
                <div
                  className="bg-[#65a30d] h-full rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Live Project Link */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Live Project Link <span className="font-normal text-slate-400">(Optional)</span>
                </label>
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#4d7c0f] font-semibold hover:underline"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#65a30d] focus:border-[#65a30d]"
                />
              </div>
            </div>
          </div>

          {/* Evidence & Artifacts Card matching HTML 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d]" />
                <h2 className="text-base font-bold text-slate-900">Evidence &amp; Artifacts</h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
                {files.length} files
              </span>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onClick={() => showToast('File picker opened. Select screenshots or test logs.')}
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#65a30d] bg-slate-50/70 hover:bg-lime-50/20 transition-all cursor-pointer text-center"
            >
              <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-[#4d7c0f] mb-2 group-hover:scale-105 transition-transform">
                <CloudUpload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800">Click to upload or drag and drop</p>
              <p className="text-[11px] text-slate-400 mt-0.5">PNG, JPG, WebP, PDF or DOCX up to 10MB each</p>
            </div>

            {/* Uploaded Files List */}
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0 border border-slate-300">
                      {file.type === 'pdf' ? 'PDF' : 'PNG'}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-800 truncate">{file.name}</span>
                      <span className="text-[11px] text-slate-400">{file.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => showToast(`Previewing ${file.name}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
                      title="Preview file"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete attachment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Persistent Action Bar matching HTML 1 */}
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-4 sm:px-8 z-40 flex flex-wrap items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-2 text-slate-500">
            <Info className="w-4 h-4 text-[#65a30d]" />
            <span className="text-xs hidden sm:inline">
              Updates submitted will trigger notification to assigned Team Lead.
            </span>
            <span className="text-xs sm:hidden">Ready for manager review.</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/user/projects"
              className="h-9 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs transition border border-slate-200 flex items-center justify-center"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSavingDraft}
              className="h-9 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition border border-slate-300 inline-flex items-center gap-1.5 shadow-2xs"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span>{isSavingDraft ? 'Saving...' : 'Save Draft'}</span>
            </button>

            <button
              type="submit"
              className="h-9 px-5 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-bold text-xs transition inline-flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Submit Update</span>
            </button>
          </div>
        </div>
      </form>
    </UserLayout>
  );
}

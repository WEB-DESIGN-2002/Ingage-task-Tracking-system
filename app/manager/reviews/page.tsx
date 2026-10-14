'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Check,
  Search,
  Filter,
  ExternalLink,
  Paperclip,
  Eye,
  Download,
  MessageSquare,
  Sparkles,
  Calendar,
  Layers,
  User,
  ArrowRight,
  TrendingUp,
  FileText,
  X,
  Send,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

interface ReviewSubmission {
  id: string;
  employeeName: string;
  employeeRole: string;
  avatar: string;
  projectName: string;
  projectCode: string;
  taskTitle: string;
  date: string;
  timeLogged: string;
  hours: number;
  progress: number;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Pending Review' | 'Approved' | 'Changes Requested';
  workDescription: string;
  employeeRemarks: string;
  managerRemarks: string;
  liveUrl?: string;
  attachments: {
    id: string;
    name: string;
    size: string;
    type: 'image' | 'pdf' | 'doc';
  }[];
  reviewHistory?: {
    date: string;
    actor: string;
    action: string;
    comment: string;
  }[];
}

const INITIAL_REVIEWS: ReviewSubmission[] = [
  {
    id: 'REV-2025-091',
    employeeName: 'Rahul Sharma',
    employeeRole: 'Sr. Frontend Engineer',
    avatar: 'RS',
    projectName: 'Learning Management System (LMS)',
    projectCode: 'PRJ-2025-01',
    taskTitle: 'Completed login page UI with responsive design and form validation',
    date: 'Today, Jun 10, 2025',
    timeLogged: '09:30 AM',
    hours: 8.5,
    progress: 100,
    priority: 'High',
    status: 'Pending Review',
    workDescription:
      'Refactored authentication layout to support responsive mobile drawers. Added client-side Zod validation with React Hook Form. Fixed CSRF token submission and integrated error toast notifications for invalid credentials. Ensured strict WCAG AA keyboard navigation compliance.',
    employeeRemarks:
      'Ready for manager sign-off. Cross-browser testing completed on Chrome, Safari, and Firefox. Lighthouse accessibility score: 98.',
    managerRemarks: '',
    liveUrl: 'https://lms.company.com/auth/login',
    attachments: [
      { id: 'att-1', name: 'login-desktop-view.png', size: '1.4 MB', type: 'image' },
      { id: 'att-2', name: 'mobile-drawer-lighthouse.pdf', size: '820 KB', type: 'pdf' },
      { id: 'att-3', name: 'validation-test-spec.ts', size: '14 KB', type: 'doc' },
    ],
    reviewHistory: [
      {
        date: 'Jun 10, 09:30 AM',
        actor: 'Rahul Sharma',
        action: 'Submitted Work Update',
        comment: 'Initial daily submission for Sprint 4 Day 8.',
      },
    ],
  },
  {
    id: 'REV-2025-092',
    employeeName: 'Ankit Verma',
    employeeRole: 'Full Stack Engineer',
    avatar: 'AV',
    projectName: 'Learning Management System (LMS)',
    projectCode: 'PRJ-2025-01',
    taskTitle: 'Student Assessment Player & Timer Service API Integration',
    date: 'Today, Jun 10, 2025',
    timeLogged: '11:15 AM',
    hours: 7.0,
    progress: 85,
    priority: 'Urgent',
    status: 'Pending Review',
    workDescription:
      'Constructed timer service with web worker fallback to prevent browser throttling in inactive tabs. Implemented auto-save payload sync every 45 seconds to prevent student answer loss on spotty WiFi.',
    employeeRemarks: 'Please verify the WebSocket ping interval configuration before we promote to staging.',
    managerRemarks: '',
    liveUrl: 'https://lms.company.com/assessments/demo-quiz',
    attachments: [
      { id: 'att-4', name: 'timer-sync-architecture.png', size: '2.1 MB', type: 'image' },
    ],
    reviewHistory: [
      {
        date: 'Jun 10, 11:15 AM',
        actor: 'Ankit Verma',
        action: 'Submitted Work Update',
        comment: 'Draft ready for lead review.',
      },
    ],
  },
  {
    id: 'REV-2025-089',
    employeeName: 'Meera Nair',
    employeeRole: 'UI/UX & Design Systems',
    avatar: 'MN',
    projectName: 'CRM Customer Portal',
    projectCode: 'PRJ-2025-04',
    taskTitle: 'Customer Kanban Board Columns & Deal Value Summary',
    date: 'Yesterday, Jun 09, 2025',
    timeLogged: '05:40 PM',
    hours: 8.0,
    progress: 100,
    priority: 'Medium',
    status: 'Approved',
    workDescription:
      'Designed responsive Kanban swimlanes for deal stages: Prospect, Demo Booked, Contract Sent, and Closed Won. Calculated real-time pipeline totals with currency formatting.',
    employeeRemarks: 'Validated with sales team lead; design aligns with Q3 CRM requirements.',
    managerRemarks: 'Excellent execution! Color contrast and draggable card responsiveness look crisp.',
    liveUrl: 'https://crm.company.com/pipeline',
    attachments: [
      { id: 'att-5', name: 'crm-pipeline-stages.png', size: '1.8 MB', type: 'image' },
    ],
    reviewHistory: [
      {
        date: 'Jun 09, 05:40 PM',
        actor: 'Meera Nair',
        action: 'Submitted Work Update',
        comment: 'Ready for review.',
      },
      {
        date: 'Jun 10, 08:30 AM',
        actor: 'Priya Singh (Manager)',
        action: 'Approved',
        comment: 'Excellent execution! Color contrast and draggable card responsiveness look crisp.',
      },
    ],
  },
  {
    id: 'REV-2025-087',
    employeeName: 'Vikram Patel',
    employeeRole: 'Backend Engineer',
    avatar: 'VP',
    projectName: 'Learning Management System (LMS)',
    projectCode: 'PRJ-2025-01',
    taskTitle: 'Video Streaming Endpoint & Bandwidth Adaptive Bitrate',
    date: 'Jun 08, 2025',
    timeLogged: '06:10 PM',
    hours: 7.5,
    progress: 70,
    priority: 'High',
    status: 'Changes Requested',
    workDescription:
      'Configured HLS chunk delivery via CDN cache. Stream segments generated for 1080p, 720p, and 480p fallback.',
    employeeRemarks: 'Tested locally with ffmpeg. Ready for initial security check.',
    managerRemarks:
      'Please ensure signed URL expirations are capped at 4 hours instead of 24 hours to prevent unauthorized hotlinking. Also add unit tests for token renewal.',
    attachments: [
      { id: 'att-6', name: 'hls-manifest-benchmark.pdf', size: '640 KB', type: 'pdf' },
    ],
    reviewHistory: [
      {
        date: 'Jun 08, 06:10 PM',
        actor: 'Vikram Patel',
        action: 'Submitted Work Update',
        comment: 'Initial version submitted.',
      },
      {
        date: 'Jun 09, 10:15 AM',
        actor: 'Priya Singh (Manager)',
        action: 'Changes Requested',
        comment: 'Please cap signed URL expirations at 4 hours instead of 24 hours.',
      },
    ],
  },
];

export default function ManagerReviewsPage() {
  const [reviews, setReviews] = useState<ReviewSubmission[]>(INITIAL_REVIEWS);
  const [selectedReviewId, setSelectedReviewId] = useState<string>('REV-2025-091');
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Approved' | 'Changes'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [managerNoteInput, setManagerNoteInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [previewAttachment, setPreviewAttachment] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentReview = reviews.find((r) => r.id === selectedReviewId) || reviews[0];

  const handleUpdateStatus = (
    newStatus: 'Approved' | 'Changes Requested' | 'Pending Review',
    commentText?: string
  ) => {
    if (!currentReview) return;
    const finalComment = commentText || managerNoteInput || (newStatus === 'Approved' ? 'Work approved by Manager.' : 'Changes requested.');

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === currentReview.id) {
          const newHistory = [
            ...(r.reviewHistory || []),
            {
              date: 'Just now',
              actor: 'Priya Singh (Manager)',
              action: newStatus,
              comment: finalComment,
            },
          ];
          return {
            ...r,
            status: newStatus,
            managerRemarks: finalComment,
            reviewHistory: newHistory,
          };
        }
        return r;
      })
    );

    setManagerNoteInput('');
    showToast(
      newStatus === 'Approved'
        ? `Task ${currentReview.taskTitle.slice(0, 30)}... Approved successfully!`
        : newStatus === 'Changes Requested'
        ? `Revision feedback sent to ${currentReview.employeeName}!`
        : `Task set back to Pending Review.`
    );
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterTab === 'Pending' && r.status !== 'Pending Review') return false;
    if (filterTab === 'Approved' && r.status !== 'Approved') return false;
    if (filterTab === 'Changes' && r.status !== 'Changes Requested') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.employeeName.toLowerCase().includes(q) ||
        r.taskTitle.toLowerCase().includes(q) ||
        r.projectName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = reviews.filter((r) => r.status === 'Pending Review').length;
  const approvedCount = reviews.filter((r) => r.status === 'Approved').length;
  const changesCount = reviews.filter((r) => r.status === 'Changes Requested').length;

  return (
    <ManagerLayout>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Attachment Preview Modal */}
      {previewAttachment && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#65a30d]" />
                <span className="text-xs font-bold text-slate-800">{previewAttachment}</span>
              </div>
              <button
                onClick={() => setPreviewAttachment(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-8 text-center bg-slate-50 rounded-xl my-4 border border-dashed border-slate-200">
              <Eye className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Previewing Deliverable Evidence</p>
              <p className="text-xs text-slate-400 mt-1">
                High-resolution snapshot / document verification view for manager sign-off.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  showToast(`Downloading mock file: ${previewAttachment}`);
                  setPreviewAttachment(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] text-white text-xs font-semibold rounded-xl hover:bg-[#4d7c0f]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Attachment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Link href="/manager/dashboard" className="hover:text-slate-600 transition-colors">
              MANAGER SQUAD
            </Link>
            <span>/</span>
            <span className="text-[#65a30d] font-bold">REVIEWS & SIGN-OFF</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Work Reviews & Sign-Offs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluate team member daily updates, inspect deliverable evidence, and provide feedback.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manager/daily-updates"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <span>All Updates Table</span>
          </Link>
          <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>{pendingCount} Awaiting Review</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Review</p>
            <p className="text-2xl font-extrabold text-amber-600 mt-1">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Approved Today</p>
            <p className="text-2xl font-extrabold text-[#4d7c0f] mt-1">{approvedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#4d7c0f] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Changes Needed</p>
            <p className="text-2xl font-extrabold text-rose-600 mt-1">{changesCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Submissions</p>
            <p className="text-2xl font-extrabold text-slate-800 mt-1">{reviews.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Review Workspace Layout: Left List (5 cols), Right Details & Action Desk (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submissions Queue */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search member or task..."
                className="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#65a30d] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { label: 'All', value: 'All' },
                { label: `Pending (${pendingCount})`, value: 'Pending' },
                { label: `Approved (${approvedCount})`, value: 'Approved' },
                { label: `Changes (${changesCount})`, value: 'Changes' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilterTab(tab.value as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    filterTab === tab.value
                      ? 'bg-[#111827] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions List */}
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {filteredReviews.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80">
                <p className="text-xs font-semibold text-slate-500">No submissions match your filter</p>
              </div>
            ) : (
              filteredReviews.map((r) => {
                const isSelected = r.id === currentReview?.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedReviewId(r.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-lime-50/50 border-[#65a30d] shadow-sm ring-1 ring-[#65a30d]/30'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-[#111827] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                          {r.avatar}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-900 truncate">{r.employeeName}</p>
                          <p className="text-[10px] text-slate-400 truncate">{r.employeeRole}</p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : r.status === 'Changes Requested'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">{r.taskTitle}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {r.workDescription}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{r.projectCode}</span>
                      <span className="font-mono font-medium text-slate-600">{r.hours} hrs logged</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Review Desk */}
        <div className="lg:col-span-7">
          {currentReview ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col gap-5">
              {/* Header: Employee, Project, and Current Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-lime-600 to-lime-400 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {currentReview.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">{currentReview.employeeName}</h2>
                      <span className="text-[11px] font-mono font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {currentReview.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{currentReview.employeeRole} • {currentReview.projectName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      currentReview.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : currentReview.status === 'Changes Requested'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        currentReview.status === 'Approved'
                          ? 'bg-emerald-500'
                          : currentReview.status === 'Changes Requested'
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                      }`}
                    />
                    {currentReview.status}
                  </span>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {currentReview.taskTitle}
                </h3>

                {/* Progress & Metadata Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Date & Time</span>
                    <span className="font-semibold text-slate-800">{currentReview.timeLogged}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Logged Hours</span>
                    <span className="font-bold text-slate-900 font-mono">{currentReview.hours} hrs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Priority</span>
                    <span className="font-bold text-amber-700">{currentReview.priority}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Progress</span>
                    <span className="font-extrabold text-[#4d7c0f] font-mono">{currentReview.progress}%</span>
                  </div>
                </div>

                {/* Detailed Work Description */}
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Work Description & Deliverables
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                    {currentReview.workDescription}
                  </p>
                </div>

                {/* Employee Remarks */}
                {currentReview.employeeRemarks && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Employee Remarks & Verification Notes
                    </h4>
                    <p className="text-xs text-slate-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100/80">
                      {currentReview.employeeRemarks}
                    </p>
                  </div>
                )}

                {/* Live Demo URL */}
                {currentReview.liveUrl && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 truncate">
                      <ExternalLink className="w-3.5 h-3.5 text-[#65a30d] shrink-0" />
                      <span className="truncate">Live Demo: {currentReview.liveUrl}</span>
                    </div>
                    <a
                      href={currentReview.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-800 rounded-lg shrink-0 transition-colors"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                )}

                {/* Deliverables & Evidence Attachments */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Evidence & Deliverable Files ({currentReview.attachments.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentReview.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <Paperclip className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-slate-800 truncate">{att.name}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setPreviewAttachment(att.name)}
                            className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200"
                            title="Preview file"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => showToast(`Downloaded: ${att.name}`)}
                            className="p-1 rounded text-slate-400 hover:text-[#65a30d] hover:bg-slate-200"
                            title="Download file"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manager Decision & Feedback Desk */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#65a30d]" />
                      <span>Manager Feedback & Action</span>
                    </h4>
                    {currentReview.managerRemarks && (
                      <span className="text-[11px] text-[#4d7c0f] font-semibold">
                        Previous comment recorded
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={2}
                    value={managerNoteInput}
                    onChange={(e) => setManagerNoteInput(e.target.value)}
                    placeholder={
                      currentReview.managerRemarks
                        ? `Current comment: "${currentReview.managerRemarks}" — write to append or update...`
                        : 'Write feedback notes or instructions for this employee...'
                    }
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#65a30d] focus:bg-white resize-none"
                  />

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus('Pending Review')}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Reset to Pending
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateStatus(
                            'Changes Requested',
                            managerNoteInput || 'Please adjust the code based on lead guidelines and resubmit.'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Request Revision</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateStatus(
                            'Approved',
                            managerNoteInput || 'Work approved without objection.'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Approve Deliverable</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Audit & History Log */}
                {currentReview.reviewHistory && currentReview.reviewHistory.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Review Activity Audit
                    </h5>
                    <div className="space-y-1.5">
                      {currentReview.reviewHistory.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100"
                        >
                          <div>
                            <span className="font-semibold text-slate-800">{item.actor}</span>
                            <span className="text-slate-400 mx-1.5">•</span>
                            <span className="text-[#65a30d] font-semibold">{item.action}</span>
                            <p className="text-[11px] text-slate-600 mt-0.5">{item.comment}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ManagerLayout>
  );
}

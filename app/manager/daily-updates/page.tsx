'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  Check,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Paperclip,
  Eye,
  Edit2,
  X,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  GitPullRequest,
  CheckCheck,
  Bot,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

interface SubmissionItem {
  id: string;
  name: string;
  role: string;
  project: string;
  projectCode: string;
  time: string;
  hours: number;
  status: 'Pending Review' | 'Approved' | 'Blocker Flagged';
  description: string;
  blockerNote?: string;
  badges?: string[];
  prLink?: string;
  verifiedAt?: string;
  selected?: boolean;
  branch?: string;
  scopeBullets?: string[];
  liveLink?: string;
}

const SUBMISSIONS: SubmissionItem[] = [
  {
    id: 'LOG-2025-084',
    name: 'Rahul Sharma',
    role: 'Sr. Frontend Engineer',
    project: 'LMS Portal',
    projectCode: 'PRJ-2025-01',
    time: '09:30 AM',
    hours: 8.5,
    status: 'Pending Review',
    description:
      'Completed login page UI with responsive design and form validation. Configured SSO redirects and resolved desktop layout shifts.',
    badges: ['2 screenshots attached', '1 live preview link'],
    branch: 'feat/auth-v2',
    scopeBullets: [
      'Implemented modern client-side input validations using Zod schemas. Added instant inline feedback on email sanitization and password complexity meters.',
      'Integrated sliding auth drawer for secondary multi-factor verification.',
      'Connected JWT refresh token dispatch handlers via secure HttpOnly cookie storage.',
      'Verified accessibility: full keyboard tab navigation & screen reader aria tags.',
    ],
    liveLink: 'https://lms.company.com/auth/login',
  },
  {
    id: 'LOG-2025-083',
    name: 'Sneha Patel',
    role: 'Backend Architect',
    project: 'CRM Portal',
    projectCode: 'PRJ-2025-04',
    time: '08:45 AM',
    hours: 7.0,
    status: 'Approved',
    description:
      'API Rate Limiting Middleware with Redis token bucket algorithm implemented and load tested up to 25k req/sec without latency degradation.',
    prLink: 'PR #418 merged to main',
    verifiedAt: 'Verified by Manager • 10:15 AM',
    branch: 'feat/redis-ratelimit',
    scopeBullets: [
      'Implemented Redis token bucket cluster algorithm with automatic key TTL eviction.',
      'Configured 25k req/sec burst headroom without degrading gateway latency.',
      'Integrated Prometheus metrics exporter for rate limit breach alerts.',
    ],
  },
  {
    id: 'LOG-2025-082',
    name: 'Amit Kumar',
    role: 'QA Lead',
    project: 'EMS Suite',
    projectCode: 'PRJ-2025-08',
    time: '08:15 AM',
    hours: 6.5,
    status: 'Blocker Flagged',
    description:
      'End-to-End Cypress Suite for Payroll disbursement flow. Execution halts during multi-tier role authorization checks.',
    blockerNote:
      'DB connection deadlock on staging PostgreSQL instance during simultaneous batch salary calculation test runs.',
    badges: ['Test execution report (Cypress_v13_run.log)'],
    branch: 'qa/payroll-e2e',
    scopeBullets: [
      'Added 14 test scenarios for salary deduction calculations.',
      'Encountered database deadlock on staging PostgreSQL instance during concurrency test.',
    ],
  },
  {
    id: 'LOG-2025-081',
    name: 'Maya Chen',
    role: 'UI Designer',
    project: 'LMS Portal',
    projectCode: 'PRJ-2025-01',
    time: '07:50 AM',
    hours: 8.0,
    status: 'Pending Review',
    description:
      'Design System Token Audit and Dark Mode Figma components. Audited typography hierarchy tokens and built responsive data table variants with accessible contrast checks.',
    badges: ['Figma v2.4 component library branch', 'Awaiting sign-off'],
    branch: 'design/v2.4-tokens',
    scopeBullets: [
      'Updated 48 color semantic tokens with WCAG AAA contrast compliance.',
      'Exported JSON tokens pipeline for React Tailwind v4 theme generator.',
    ],
  },
];

export default function ManagerDailyUpdatesPage() {
  const [submissions, setSubmissions] = useState<SubmissionItem[]>(SUBMISSIONS);
  const [selectedItem, setSelectedItem] = useState<SubmissionItem>(SUBMISSIONS[0]);
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Approved' | 'Blockers'>('All');
  const [feedbackText, setFeedbackText] = useState(
    'Great work Rahul. Form validation handling is buttery smooth. Please verify the mobile landscape orientation before the final merge.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Approved', verifiedAt: 'Verified just now' } : s))
    );
    showToast(`Submission approved for ${selectedItem.name}! Deliverables verified.`);
  };

  const handleRequestChanges = () => {
    showToast(`Revision request sent to ${selectedItem.name}.`);
  };

  const handleReject = () => {
    showToast(`Update rejected and marked as incomplete.`);
  };

  const filteredSubmissions = submissions.filter((s) => {
    if (filterTab === 'Pending') return s.status === 'Pending Review';
    if (filterTab === 'Approved') return s.status === 'Approved';
    if (filterTab === 'Blockers') return s.status === 'Blocker Flagged';
    return true;
  });

  return (
    <ManagerLayout searchPlaceholder="Search submissions by engineer, branch, or keywords...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Controls matching screenshot */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            SUPERVISION • <span className="text-[#65a30d]">PHASE 02</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Team Daily Updates &amp; Review Queue
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Review submissions from your managed engineers, verify code/Figma deliverables, provide feedback, and resolve blockers.
          </p>
        </div>

        {/* Action Controls matching screenshot */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>Jun 10, 2025 (Today)</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <button
            onClick={() => showToast('Exported team daily log to Excel spreadsheet.')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-gray-500" />
            <span>Export Log (Excel)</span>
          </button>

          <button
            onClick={() => {
              setSubmissions((prev) =>
                prev.map((s) => ({ ...s, status: 'Approved', verifiedAt: 'Batch verified' }))
              );
              showToast('Batch approved 3 pending submissions!');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <CheckCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Batch Approve (3)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Row matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Submissions Received</span>
            <div className="w-8 h-8 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">6 / 8</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#65a30d] h-full rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
              <span>Expected today</span>
              <span className="font-bold text-[#4d7c0f]">75% logged</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Awaiting Your Review</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-gray-900 tabular-nums">4</span>
              <span className="text-xs font-bold text-gray-500">Pending Sign-offs</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>Oldest queue item: 3.5 hrs ago</span>
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Blockers Flagged</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-red-600 tabular-nums">1</span>
              <span className="text-xs font-bold text-red-700">Critical issue</span>
            </div>
            <p className="text-[11px] text-red-600 font-bold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Requires Manager Intervention</span>
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Approved Today</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600 tabular-nums">2</span>
              <span className="text-xs font-bold text-gray-500">Completed</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Verified and Accepted</span>
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs matching screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-gray-200/90 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'All', label: 'All Submissions (6)' },
            { id: 'Pending', label: 'Pending Review (4)' },
            { id: 'Approved', label: 'Approved (2)' },
            { id: 'Blockers', label: '• Blockers (1)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterTab === tab.id
                  ? 'bg-[#111827] text-white shadow-2xs'
                  : tab.id === 'Blockers'
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="text-xs text-gray-400 px-2">Changes Requested (0)</span>
        </div>

        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl text-gray-700">
            <option>Project: All Projects (3)</option>
            <option>LMS Portal</option>
            <option>CRM Customer Portal</option>
            <option>EMS Suite</option>
          </select>
        </div>
      </div>

      {/* Split 2-Column Review Interface matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: Submission Cards List */}
        <div className="lg:col-span-6 space-y-4">
          {filteredSubmissions.map((sub) => {
            const isSelected = selectedItem.id === sub.id;

            return (
              <div
                key={sub.id}
                onClick={() => setSelectedItem(sub)}
                className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all shadow-2xs ${
                  isSelected
                    ? 'border-[#65a30d] ring-2 ring-[#65a30d]/20 bg-lime-50/10'
                    : 'border-gray-200/90 hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center font-bold text-gray-800 text-xs">
                      {sub.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-extrabold text-gray-900">{sub.name}</h2>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {sub.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                        <span className="font-semibold text-gray-700">{sub.project}</span>
                        <span>•</span>
                        <span>{sub.time}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sub.status === 'Blocker Flagged'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      • {sub.status}
                    </span>
                    <span className="block text-xs font-extrabold text-gray-900 mt-1">
                      Logged: <span className="tabular-nums">{sub.hours} hrs</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed mb-3">
                  {sub.description}
                </p>

                {/* Blocker Alert Box */}
                {sub.blockerNote && (
                  <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span>Blocker Note:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{sub.blockerNote}</p>
                  </div>
                )}

                {/* Badges & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-[11px]">
                  <div className="flex flex-wrap items-center gap-2">
                    {sub.badges?.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                    {sub.prLink && (
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold flex items-center gap-1">
                        <GitPullRequest className="w-3 h-3" />
                        <span>{sub.prLink}</span>
                      </span>
                    )}
                  </div>

                  {sub.status === 'Blocker Flagged' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast('Blocker escalated to DevOps team.');
                      }}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[10px]"
                    >
                      Escalate to DevOps
                    </button>
                  ) : sub.verifiedAt ? (
                    <span className="text-emerald-700 font-semibold text-[10px]">
                      {sub.verifiedAt}
                    </span>
                  ) : (
                    <span className="text-[#65a30d] font-bold text-[10px] flex items-center gap-1">
                      <span>Selected for Review</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 6 cols: Review Queue Item Details matching screenshot */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-2xs space-y-5">
          {/* Item Header */}
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                REVIEW QUEUE ITEM
              </span>
              <span className="text-xs font-mono font-bold text-gray-500">
                #{selectedItem.id}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-gray-900">
              {selectedItem.name} • {selectedItem.project}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                {selectedItem.hours} hrs (100% Target Logged)
              </span>
              <span className="text-xs text-gray-500">• Frontend Engineering</span>
              {selectedItem.branch && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="font-mono text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                    Branch: {selectedItem.branch}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Engineer Summary & Scope */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              ENGINEER SUMMARY &amp; SCOPE
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-inside leading-relaxed">
              {selectedItem.scopeBullets ? (
                selectedItem.scopeBullets.map((bullet, idx) => <li key={idx}>{bullet}</li>)
              ) : (
                <li>{selectedItem.description}</li>
              )}
            </ul>
          </div>

          {/* Deliverable Verification (3 Artifacts Attached) */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-2.5">
              <span>DELIVERABLE VERIFICATION</span>
              <span className="text-[11px] text-gray-500 font-normal">3 Artifacts Attached</span>
            </div>

            {/* Live Staging Preview Link */}
            <a
              href="https://lms.company.com/auth/login"
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.preventDefault();
                showToast('Staging preview launched in simulated iframe sandbox.');
              }}
              className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-xl text-xs hover:border-[#65a30d] transition-colors group mb-3"
            >
              <div className="flex items-center gap-2 text-gray-800">
                <span className="w-5 h-5 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                  🌐
                </span>
                <div>
                  <p className="font-bold">Live Staging Preview Link</p>
                  <p className="text-[10px] text-gray-400 font-mono">https://lms.company.com/auth/login</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#65a30d]" />
            </a>

            {/* Screenshot thumbnails preview */}
            <div className="grid grid-cols-2 gap-2">
              <div className="h-20 bg-gray-200 rounded-lg border border-gray-300 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                <span className="text-[10px] font-bold text-gray-600">Login Mockup (Desktop)</span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="h-20 bg-gray-200 rounded-lg border border-gray-300 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                <span className="text-[10px] font-bold text-gray-600">Mobile Verification</span>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Manager Feedback & Directives */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-gray-800">
                MANAGER FEEDBACK &amp; DIRECTIVES
              </label>
              <span className="text-[10px] uppercase font-bold text-gray-400">
                OPTIONAL FOR APPROVAL
              </span>
            </div>

            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={3}
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:bg-white focus:outline-none focus:border-[#65a30d]"
            />

            {/* AI Assist pill matching screenshot */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#4d7c0f] font-semibold bg-lime-50 border border-lime-200 px-3 py-1.5 rounded-xl">
              <Bot className="w-3.5 h-3.5 text-[#65a30d]" />
              <span>AI Assist: Feedback tone is constructive • 1 action item detected</span>
            </div>

            {/* Actions matching screenshot */}
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleApprove(selectedItem.id)}
                  className="py-3 px-4 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Approve Submission</span>
                </button>

                <button
                  onClick={handleRequestChanges}
                  className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Request Changes</span>
                </button>
              </div>

              <button
                onClick={handleReject}
                className="w-full py-2 text-center text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center justify-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject Update (Mark as Incomplete)</span>
              </button>
            </div>
          </div>

          {/* Audit Trail matching screenshot */}
          <div className="pt-3 border-t border-gray-100 text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">
              AUDIT TRAIL
            </span>
            <div className="space-y-1 text-gray-500 text-[11px]">
              <div className="flex items-center justify-between">
                <span>• Work log published</span>
                <span className="font-mono text-gray-700">Today, 09:30:14 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Deliverables synchronized</span>
                <span className="font-mono text-gray-700">Today, 09:30:45 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span>• Viewed by Manager (Priya Singh)</span>
                <span className="font-bold text-[#65a30d]">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
}

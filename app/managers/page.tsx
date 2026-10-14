'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FolderKanban,
  Users,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Mail,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Shield,
  Plus,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_TEAM_MEMBERS, INITIAL_PROJECTS } from '@/lib/mockData';

export default function ManagersPage() {
  const managers = INITIAL_TEAM_MEMBERS.filter((m) => m.role.includes('Manager'));
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredManagers = managers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <WorkspaceLayout searchPlaceholder="Search managers by name, squad, or project...">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            ADMINISTRATION &gt; <span className="text-[#65a30d]">MANAGERS PORTAL</span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Project Managers &amp; Squad Leads
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200">
              Admin Governance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Overview of designated managers, active squad assignments, and review throughput.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/manager/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Open Manager Review UI</span>
          </Link>
          <Link
            href="/users/add"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Designate New Manager</span>
          </Link>
        </div>
      </div>

      {/* Managers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filteredManagers.map((mgr) => {
          const assignedProjects = INITIAL_PROJECTS.filter((p) => p.manager.name === mgr.name);

          return (
            <div
              key={mgr.id}
              className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-sm">
                      {mgr.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">{mgr.name}</h2>
                      <p className="text-xs text-gray-500">{mgr.specialization}</p>
                      <span className="inline-block mt-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {mgr.department}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {mgr.status}
                  </span>
                </div>

                <div className="space-y-1.5 py-3 border-y border-gray-100 text-xs">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Assigned Projects:</span>
                    <span className="font-bold text-gray-900">{assignedProjects.length || 1}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Squad Utilization:</span>
                    <span className="font-bold text-[#65a30d]">{mgr.loadPercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Direct Reports:</span>
                    <span className="font-bold text-gray-900">4-6 Engineers</span>
                  </div>
                </div>

                {/* Assigned Projects Badges */}
                <div className="mt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Lead On:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {assignedProjects.length > 0 ? (
                      assignedProjects.map((p) => (
                        <span
                          key={p.id}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-semibold truncate max-w-full"
                        >
                          {p.name}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-semibold">
                        Learning Management System
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/manager/dashboard`}
                  className="text-xs font-bold text-[#65a30d] hover:text-[#4d7c0f] flex items-center gap-1 group"
                >
                  <span>Open Squad Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <button
                  onClick={() => showToast(`Report sent to manager ${mgr.name}`)}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700"
                >
                  Audit Reviews
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </WorkspaceLayout>
  );
}

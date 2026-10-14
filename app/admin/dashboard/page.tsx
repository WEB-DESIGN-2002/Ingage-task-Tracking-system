'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FolderKanban,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  UserPlus,
  ArrowRight,
  Shield,
  Activity,
  FileSpreadsheet,
  Lock,
  Search,
  MoreVertical,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Calendar,
  Filter,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_PROJECTS, INITIAL_TEAM_MEMBERS, INITIAL_DAILY_LOGS, type Project, type TeamMember } from '@/lib/mockData';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'users' | 'approvals' | 'security'>('overview');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickManagerModal, setQuickManagerModal] = useState<Project | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApproveTask = (taskName: string) => {
    showToast(`Admin signed off and approved: "${taskName}"`);
  };

  const handleAssignManager = (projectId: string, newManagerName: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              manager: {
                ...p.manager,
                name: newManagerName,
              },
            }
          : p
      )
    );
    setQuickManagerModal(null);
    showToast(`Project manager updated to ${newManagerName}.`);
  };

  const totalMembers = members.length;
  const activeProjects = projects.filter((p) => p.status === 'In Progress').length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const managerCount = members.filter((m) => m.role.includes('Manager')).length;

  return (
    <WorkspaceLayout searchPlaceholder="Search system projects, users, logs, or audit events...">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Notification Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-gray-900 via-[#111827] to-gray-900 text-white border border-gray-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#65a30d]/20 border border-[#65a30d]/40 flex items-center justify-center text-[#65a30d] shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">
                Admin Control Center • Full System Privileges
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#65a30d] text-white text-[10px] font-extrabold tracking-wider uppercase">
                Active Admin
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              Welcome back, Administrator. You have full oversight over all 12 projects, 15 team members, and manager sign-offs.
            </p>
          </div>
        </div>

        {/* Quick View Portal Switches */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link
            href="/manager/dashboard"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition-colors"
          >
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>Switch to Manager View</span>
          </Link>

          <Link
            href="/projects/create"
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Breadcrumb & Main Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
            ENTERPRISE ADMINISTRATION &gt; <span className="text-[#65a30d]">ADMIN DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Master control room for project governance, team capacity, and enterprise deliverables.
          </p>
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/users/add"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5 text-gray-500" />
            <span>Add User</span>
          </Link>

          <Link
            href="/assignments"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <FolderKanban className="w-3.5 h-3.5 text-gray-500" />
            <span>Assignments</span>
          </Link>

          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Reports</span>
          </Link>
        </div>
      </div>

      {/* 5 Admin Executive KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Total Projects</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">12</span>
              <span className="text-[11px] font-bold text-[#65a30d]">8 Active</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">3 completed, 1 on hold</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Team Accounts</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">{totalMembers}</span>
              <span className="text-[11px] font-semibold text-purple-600">4 Managers</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">2 Admins, 9 Engineers</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Manager Reviews</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-amber-600 tabular-nums">5</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                Action Req.
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Escalated sprint sign-offs</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">Delivery Velocity</span>
            <div className="w-7 h-7 rounded-lg bg-lime-50 text-[#65a30d] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-gray-900 tabular-nums">84.6%</span>
              <span className="text-[11px] font-bold text-[#65a30d]">On Track</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Across 6 engineering squads</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold">System Security</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-600 tabular-nums">99.98%</span>
              <span className="text-[11px] font-bold text-gray-500">Healthy</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">SOC-2 Type II Certified</p>
          </div>
        </div>
      </div>

      {/* Admin Tab Controls */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'overview'
              ? 'bg-[#111827] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          System Overview
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'projects'
              ? 'bg-[#111827] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          All Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'users'
              ? 'bg-[#111827] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          User &amp; Role Management ({members.length})
        </button>

        <button
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'approvals'
              ? 'bg-[#111827] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Pending Approvals Queue (5)
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'security'
              ? 'bg-[#111827] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          System Audit &amp; Security Logs
        </button>
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 cols: High Priority Project Health */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Active Project Governance</h2>
                  <p className="text-xs text-gray-400">Managers assigned &amp; progress breakdown</p>
                </div>
                <Link
                  href="/projects"
                  className="text-xs font-bold text-[#65a30d] hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Projects</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-gray-100">
                {projects.slice(0, 4).map((project) => (
                  <div key={project.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-gray-500">
                          {project.code}
                        </span>
                        <span className="font-bold text-gray-900 text-xs sm:text-sm">
                          {project.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            project.status === 'In Progress'
                              ? 'bg-lime-50 text-[#4d7c0f] border border-lime-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xl">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="text-xs font-semibold text-gray-800">
                          Manager: {project.manager.name}
                        </p>
                        <div className="flex items-center justify-end gap-1.5 mt-1">
                          <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#65a30d] h-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-gray-700">
                            {project.progress}%
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setQuickManagerModal(project)}
                        className="px-2.5 py-1 text-xs font-semibold bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700"
                      >
                        Reassign
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 cols: Admin Quick Actions & Roles Breakdown */}
            <div className="lg:col-span-4 space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
                <h2 className="text-sm font-bold text-gray-900 mb-1">Administrative Shortcuts</h2>
                <p className="text-xs text-gray-400 mb-4">Direct execution tools</p>

                <div className="space-y-2.5">
                  <Link
                    href="/projects/create"
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-lime-50/50 hover:border-lime-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-lime-100 text-[#4d7c0f] flex items-center justify-center">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-[#4d7c0f]">
                          Initialize New Project
                        </p>
                        <p className="text-[10px] text-gray-400">Set manager, squads, deadlines</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#4d7c0f]" />
                  </Link>

                  <Link
                    href="/users/add"
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-lime-50/50 hover:border-lime-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-[#4d7c0f]">
                          Provision User Account
                        </p>
                        <p className="text-[10px] text-gray-400">Assign role and security permissions</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#4d7c0f]" />
                  </Link>

                  <Link
                    href="/assignments"
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-lime-50/50 hover:border-lime-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                        <FolderKanban className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-[#4d7c0f]">
                          Manage Task Allocations
                        </p>
                        <p className="text-[10px] text-gray-400">Inspect squad loads and modules</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#4d7c0f]" />
                  </Link>

                  <Link
                    href="/reports"
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-lime-50/50 hover:border-lime-200 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-[#4d7c0f]">
                          Generate Executive Summary
                        </p>
                        <p className="text-[10px] text-gray-400">Download Excel / CSV analytics</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#4d7c0f]" />
                  </Link>
                </div>
              </div>

              {/* Roles Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
                <h2 className="text-sm font-bold text-gray-900 mb-1">Access Role Hierarchy</h2>
                <p className="text-xs text-gray-400 mb-3">Enterprise IAM Distribution</p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/60 border border-amber-200/60">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-amber-900">System Administrators</span>
                    </div>
                    <span className="font-extrabold text-amber-800">2 accounts</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/60 border border-blue-200/60">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-blue-900">Project Managers</span>
                    </div>
                    <span className="font-extrabold text-blue-800">4 accounts</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="font-bold text-gray-800">Software Engineers &amp; QA</span>
                    </div>
                    <span className="font-extrabold text-gray-700">9 accounts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ALL PROJECTS */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Enterprise Project Directory</h2>
              <p className="text-xs text-gray-400">All registered projects with admin override</p>
            </div>
            <Link
              href="/projects/create"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#65a30d] text-white text-xs font-bold rounded-xl"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Project</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Project Name</th>
                  <th className="py-3 px-4">Designated Manager</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold text-gray-600">{p.code}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{p.name}</td>
                    <td className="py-3 px-4 text-gray-700">{p.manager.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-lime-50 text-[#4d7c0f] border border-lime-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-800">{p.progress}%</td>
                    <td className="py-3 px-4 text-gray-500">{p.deadline}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setQuickManagerModal(p)}
                        className="px-2.5 py-1 text-[11px] font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800"
                      >
                        Change Manager
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: USERS & ROLE MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">User Role &amp; Permission Manager</h2>
              <p className="text-xs text-gray-400">Promote to Manager or Admin, manage user status</p>
            </div>
            <Link
              href="/users/add"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#65a30d] text-white text-xs font-bold rounded-xl"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Admin Role Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div>{m.name}</div>
                      <div className="text-[11px] text-gray-400 font-normal">{m.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          m.role.includes('Admin')
                            ? 'bg-amber-100 text-amber-800'
                            : m.role.includes('Manager')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {m.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{m.department}</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          showToast(`Promoted ${m.name} to Manager privilege.`);
                        }}
                        className="px-2 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                      >
                        Set Manager
                      </button>
                      <button
                        onClick={() => {
                          showToast(`User status toggled for ${m.name}.`);
                        }}
                        className="px-2 py-1 text-[11px] font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Lock / Toggle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: APPROVALS QUEUE */}
      {activeTab === 'approvals' && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Pending Sprint Deliverables Sign-off</h2>
              <p className="text-xs text-gray-400">Manager-submitted deliverables awaiting Admin ratification</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              5 Pending Sign-Offs
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'LMS Module 4 - Quiz Grading Engine',
                project: 'PRJ-2025-01 (Learning Management System)',
                manager: 'Priya Singh',
                submittedBy: 'Ankit Kumar',
                hours: '6.5 hrs',
                summary: 'Completed automated quiz engine and passed test suite 98%.',
              },
              {
                title: 'CRM Lead Ingestion API Microservice',
                project: 'PRJ-2025-04 (CRM Portal)',
                manager: 'Priya Singh',
                submittedBy: 'David Kim',
                hours: '8 hrs',
                summary: 'OAuth token refresh pipeline and webhook dispatcher verified.',
              },
              {
                title: 'E-Commerce Cart Checkout Stripe Integration',
                project: 'PRJ-2025-02 (Mobile Banking App)',
                manager: 'Kavita Menon',
                submittedBy: 'Sneha Patel',
                hours: '5 hrs',
                summary: '3D Secure 2.0 card authentication hooks integrated.',
              },
              {
                title: 'Weekly Sprint 24 Timesheet Sign-off',
                project: 'All Squads',
                manager: 'Vikram Joshi',
                submittedBy: 'Squad Alpha',
                hours: '142 hrs',
                summary: 'Aggregated billable client hours for Week 24 ready for invoicing.',
              },
              {
                title: 'Data Migration Rollback Procedure Spec',
                project: 'PRJ-2025-03 (Cloud Analytics)',
                manager: 'Priya Singh',
                submittedBy: 'Rahul V.',
                hours: '4 hrs',
                summary: 'Documentation of disaster recovery and database snapshot retention.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-200/90 bg-gray-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">{item.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      {item.project}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{item.summary}</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Submitted by: <span className="font-semibold text-gray-700">{item.submittedBy}</span> • Manager: <span className="font-semibold text-gray-700">{item.manager}</span> • Time: <span className="font-semibold text-gray-700">{item.hours}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleApproveTask(item.title)}
                    className="px-3.5 py-1.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Admin Approve</span>
                  </button>

                  <button
                    onClick={() => showToast(`Requested revision for: ${item.title}`)}
                    className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Request Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SECURITY AUDIT LOGS */}
      {activeTab === 'security' && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900">System Security &amp; Compliance Audit Trail</h2>
              <p className="text-xs text-gray-400">Immutable ledger of administrative actions and access records</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>TLS 1.3 • SOC-2 Active</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { time: 'Just now', event: 'ADMIN_SESSION_START', detail: 'Admin signed in from IP 192.168.1.1 (MFA Verified)', status: 'Success' },
              { time: '12 mins ago', event: 'MANAGER_REVIEW_SUBMITTED', detail: 'Manager Priya Singh approved PRJ-2025-01 Module 4', status: 'Notice' },
              { time: '1 hr ago', event: 'ROLE_MODIFICATION', detail: 'User account Ankit Kumar role validated as Developer', status: 'Success' },
              { time: '2 hrs ago', event: 'NEW_PROJECT_INITIALIZED', detail: 'Project "CRM Portal" created with code PRJ-2025-04', status: 'Success' },
              { time: '4 hrs ago', event: 'DAILY_LOG_BATCH', detail: '24 engineer daily task logs committed to database', status: 'Success' },
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 font-sans text-[11px] mr-2">[{log.time}]</span>
                  <span className="font-bold text-gray-800">{log.event}:</span>
                  <span className="text-gray-600 font-sans ml-2 text-xs">{log.detail}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Manager Reassign Modal */}
      {quickManagerModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-scaleUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">
                Reassign Project Manager
              </h3>
              <button
                onClick={() => setQuickManagerModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Selecting a new manager for <span className="font-bold text-gray-800">{quickManagerModal.name}</span>. The designated manager will receive review privileges.
            </p>

            <div className="space-y-2 mb-6">
              {['Priya Singh', 'Vikram Joshi', 'Kavita Menon', 'Rahul Sharma'].map((mgr) => (
                <button
                  key={mgr}
                  onClick={() => handleAssignManager(quickManagerModal.id, mgr)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                    quickManagerModal.manager.name === mgr
                      ? 'border-[#65a30d] bg-lime-50 text-[#4d7c0f]'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <span>{mgr}</span>
                  {quickManagerModal.manager.name === mgr && (
                    <Check className="w-4 h-4 text-[#65a30d]" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setQuickManagerModal(null)}
              className="w-full py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}

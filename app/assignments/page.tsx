'use client';

import { useState } from 'react';
import {
  Scale,
  FileSpreadsheet,
  Search,
  Check,
  ChevronDown,
  UserPlus,
  X,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_MEMBERS, type TeamMember } from '@/lib/mockData';

interface AllocatedMember {
  id: string;
  name: string;
  role: string;
  projectRole: string;
  commitment: string;
  avatar: string;
}

export default function AssignmentsPage() {
  const [filterRole, setFilterRole] = useState<'all' | 'frontend' | 'backend' | 'qa'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(true);

  const [allocatedRoster, setAllocatedRoster] = useState<AllocatedMember[]>([
    {
      id: 'usr-1',
      name: 'Rahul Sharma',
      role: 'Frontend Engineer',
      projectRole: 'Lead Frontend',
      commitment: '100% (40 hrs/wk)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'usr-2',
      name: 'Sneha Patel',
      role: 'Backend Architect',
      projectRole: 'Module Lead',
      commitment: '50% (20 hrs/wk)',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 'usr-4',
      name: 'Maya Chen',
      role: 'Product UI/UX',
      projectRole: 'Design Lead',
      commitment: '100% (40 hrs/wk)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAssign = (member: TeamMember) => {
    if (allocatedRoster.some((m) => m.id === member.id)) {
      showToast(`${member.name} is already assigned to this project.`);
      return;
    }
    setAllocatedRoster([
      ...allocatedRoster,
      {
        id: member.id,
        name: member.name,
        role: member.specialization.split('&')[0].trim(),
        projectRole: 'Contributor',
        commitment: '100% (40 hrs/wk)',
        avatar: member.avatar,
      },
    ]);
    setHasUnsavedChanges(true);
    showToast(`Assigned ${member.name} to roster.`);
  };

  const handleRemove = (id: string) => {
    setAllocatedRoster(allocatedRoster.filter((m) => m.id !== id));
    setHasUnsavedChanges(true);
    showToast('Member removed from project roster.');
  };

  const filteredMembers = INITIAL_MEMBERS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterRole === 'frontend') return matchesSearch && m.department.includes('Frontend');
    if (filterRole === 'backend') return matchesSearch && m.department.includes('Backend');
    if (filterRole === 'qa') return matchesSearch && (m.department.includes('QA') || m.department.includes('Design'));
    return matchesSearch;
  });

  return (
    <WorkspaceLayout>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
          WORKSPACE &gt; ASSIGNMENTS &gt;{' '}
          <span className="text-[#65a30d]">ALLOCATE PROJECT TEAM</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Project Team Assignment
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Assign lead managers and orchestrate resource bandwidth across delivery teams with real-time capacity validation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => showToast('Rebalancing workload algorithm calculated optimal load at 72%.')}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-gray-500" />
              <span>Rebalance Workload</span>
            </button>

            <button
              onClick={() => showToast('Exporting team assignment matrix to Excel...')}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-gray-500" />
              <span>Export Assignment Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Project Card (matching screenshot top bar) */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs mb-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Project Selector (5 cols) */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            <span>TARGET PROJECT</span>
            <span className="font-mono text-[#65a30d]">ID: PRJ-2025-01</span>
          </div>
          <div className="relative">
            <select className="w-full appearance-none pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer">
              <option>Learning Management System (PRJ-2025-01)</option>
              <option>CRM Portal &amp; Client Hub (PRJ-2025-04)</option>
              <option>Employee Management System (PRJ-2025-08)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2 font-medium">
            <span className="inline-flex items-center gap-1 text-[#4d7c0f] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
              In Progress
            </span>
            <span>• Phase 3 of 4</span>
            <span>• 9 Active Modules</span>
          </div>
        </div>

        {/* Assigned Lead Manager (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              PS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">ASSIGNED LEAD MANAGER</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
              </div>
              <p className="text-xs font-bold text-gray-900">Priya Singh</p>
              <p className="text-[10px] text-gray-500">Lead Project Specialist • 5 Projects</p>
            </div>
          </div>
          <button
            onClick={() => showToast('Manager assignment re-routing opened.')}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
            title="Switch Manager"
          >
            ⇄
          </button>
        </div>

        {/* Sprint Cadence (3 cols) */}
        <div className="lg:col-span-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-bold text-gray-400 uppercase">SPRINT CADENCE</span>
            <span className="font-semibold text-gray-700 font-mono">Sprint 04</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>May 01 - Jun 15</span>
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-semibold text-gray-600 mb-1">
              <span>Sprint Progress</span>
              <span className="text-[#65a30d] font-bold">75% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Left Talent Bench / Right Allocated Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
        {/* ================= LEFT COLUMN: TALENT SEARCH & BENCH ================= */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
            {/* Search Input */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, skill, or role"
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 text-xs pb-3 border-b border-gray-100">
              <button
                onClick={() => setFilterRole('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterRole === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All (24)
              </button>
              <button
                onClick={() => setFilterRole('frontend')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterRole === 'frontend'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Frontend (8)
              </button>
              <button
                onClick={() => setFilterRole('backend')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterRole === 'backend'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Backend (7)
              </button>
              <button
                onClick={() => setFilterRole('qa')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  filterRole === 'qa'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                QA/UI (9)
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3">
              <span className="font-bold uppercase tracking-wider">SHOWING BENCH &amp; ALLOCATED TALENT</span>
              <span className="font-semibold text-gray-500">Filtered by capacity &lt; 90%</span>
            </div>
          </div>

          {/* Talent Member Cards */}
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between hover:border-gray-300 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-gray-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-gray-900">{member.name}</h4>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-gray-600 text-[10px] font-semibold">
                        {member.department.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{member.specialization}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            member.loadPercentage > 80
                              ? 'bg-amber-500'
                              : 'bg-[#65a30d]'
                          }`}
                          style={{ width: `${member.loadPercentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {member.activeProjects} Active Project ({member.loadPercentage}% load)
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAssign(member)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-[#65a30d] hover:text-white border border-slate-200/80 rounded-xl text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Assign</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: ALLOCATED ROSTER ================= */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            {/* Roster Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-900">Allocated Roster</h3>
                <span className="px-2 py-0.5 bg-lime-100 text-[#4d7c0f] rounded-full text-xs font-bold">
                  {allocatedRoster.length} Members
                </span>
              </div>
              <button
                onClick={() => {
                  setAllocatedRoster([]);
                  setHasUnsavedChanges(true);
                  showToast('Roster cleared.');
                }}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>
            <p className="text-xs text-gray-400 -mt-2 mb-4">
              Assigned specifically to PRJ-2025-01 LMS
            </p>

            {/* Collective Load Bandwidth */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-gray-700 uppercase tracking-wider text-[11px]">
                  COLLECTIVE LOAD BANDWIDTH
                </span>
                <span className="font-extrabold text-[#65a30d]">72% Optimal</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '72%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>Safe: &lt;85%</span>
                <span>Est. Burn: 142 hrs / sprint</span>
              </div>

              {/* Stat breakdown */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200 text-center text-xs">
                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <p className="text-base font-extrabold text-gray-900">1</p>
                  <p className="text-[10px] text-gray-400">Manager</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <p className="text-base font-extrabold text-gray-900">3</p>
                  <p className="text-[10px] text-gray-400">Engineers</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-slate-100">
                  <p className="text-base font-extrabold text-gray-900">1</p>
                  <p className="text-[10px] text-gray-400">Designer</p>
                </div>
              </div>
            </div>

            {/* Assigned Member Cards with Role & Commitment */}
            <div className="space-y-3 mb-6">
              {allocatedRoster.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 relative"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-300 text-gray-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {m.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{m.name}</h4>
                        <p className="text-[10px] text-gray-400">{m.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemove(m.id)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded-md"
                      title="Remove from roster"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Project Role
                      </label>
                      <div className="relative">
                        <select
                          value={m.projectRole}
                          onChange={(e) => {
                            setAllocatedRoster(
                              allocatedRoster.map((item) =>
                                item.id === m.id
                                  ? { ...item, projectRole: e.target.value }
                                  : item
                              )
                            );
                            setHasUnsavedChanges(true);
                          }}
                          className="w-full appearance-none pl-2 pr-6 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
                        >
                          <option>Lead Frontend</option>
                          <option>Module Lead</option>
                          <option>Design Lead</option>
                          <option>Contributor</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Commitment
                      </label>
                      <div className="relative">
                        <select
                          value={m.commitment}
                          onChange={(e) => {
                            setAllocatedRoster(
                              allocatedRoster.map((item) =>
                                item.id === m.id
                                  ? { ...item, commitment: e.target.value }
                                  : item
                              )
                            );
                            setHasUnsavedChanges(true);
                          }}
                          className="w-full appearance-none pl-2 pr-6 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none"
                        >
                          <option>100% (40 hrs/wk)</option>
                          <option>50% (20 hrs/wk)</option>
                          <option>25% (10 hrs/wk)</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2 top-2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Permission Presets */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2.5">
                PROJECT PERMISSION PRESETS
              </span>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d]"
                  />
                  <span>Enable daily progress submit for all assignees</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d]"
                  />
                  <span>Permit code repository &amp; Jira sync access</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d]"
                  />
                  <span>Notify client stakeholders on roster revision</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Confirmation Bar (matching Image 3) */}
      <div className="fixed bottom-0 left-0 right-0 lg:pl-64 z-30 bg-white border-t border-gray-200/90 py-3.5 px-4 sm:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#65a30d] animate-pulse" />
            <span>Unsaved allocation changes pending for Learning Management System</span>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              onClick={() => {
                setHasUnsavedChanges(false);
                showToast('Allocation changes discarded.');
              }}
              className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Discard Changes
            </button>

            <button
              onClick={() => showToast('Team matrix preview rendered.')}
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Preview Matrix
            </button>

            <button
              onClick={() => {
                setHasUnsavedChanges(false);
                showToast('Assignments saved & deployed to active sprint!');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Save &amp; Confirm Assignments</span>
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

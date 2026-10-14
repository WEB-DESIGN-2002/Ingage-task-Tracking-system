'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  ChevronRight,
  Shield,
  Briefcase,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';
import { INITIAL_TEAM_MEMBERS, type TeamMember } from '@/lib/mockData';

export default function UsersPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || member.role.includes(roleFilter);
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (memberId: string, newRole: TeamMember['role']) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
    showToast(`Role updated successfully for member.`);
  };

  const handleToggleStatus = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextStatus = m.status === 'Active' ? 'On Leave' : 'Active';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
    showToast(`Member status updated.`);
  };

  return (
    <WorkspaceLayout searchPlaceholder="Search users by name, email, or role...">
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
          ADMINISTRATION &gt; <span className="text-[#65a30d]">USER MANAGEMENT</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Team &amp; User Directory
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-lime-100 text-[#4d7c0f] text-xs font-bold border border-lime-300">
                Admin Control
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage system access, designate managers, and assign project roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/users/add"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New User</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Total Members</span>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900">{teamMembers.length}</span>
          <p className="text-[11px] text-gray-400 mt-0.5">Registered workspace accounts</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Active Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-600">
            {teamMembers.filter((m) => m.status === 'Active').length}
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">Ready for project task assignment</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">Project Managers</span>
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-2xl font-extrabold text-blue-600">
            {teamMembers.filter((m) => m.role.includes('Manager')).length}
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">Managing squads &amp; reviews</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-1">
            <span className="text-xs font-semibold">System Admins</span>
            <Shield className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-2xl font-extrabold text-amber-600">
            {teamMembers.filter((m) => m.role.includes('Admin')).length}
          </span>
          <p className="text-[11px] text-gray-400 mt-0.5">Full administrative privilege</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or skill..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#65a30d] focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-700"
            >
              <option value="All">All Roles</option>
              <option value="Admin">System Admin</option>
              <option value="Manager">Manager / Team Lead</option>
              <option value="Employee">Employee / Dev</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl focus:outline-none text-gray-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Member Name</th>
                <th className="py-3.5 px-4">Role &amp; Privilege</th>
                <th className="py-3.5 px-4">Department / Skill</th>
                <th className="py-3.5 px-4">Workload</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center font-bold text-gray-700 text-xs">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-xs">{member.name}</p>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{member.email}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {member.role.includes('Admin') ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                          <Shield className="w-3 h-3" />
                          <span>Admin</span>
                        </span>
                      ) : member.role.includes('Manager') ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Manager</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium text-[10px]">
                          <span>Employee</span>
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-gray-800">{member.specialization}</p>
                    <p className="text-[10px] text-gray-400">{member.department}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            member.loadPercentage > 80
                              ? 'bg-amber-500'
                              : 'bg-[#65a30d]'
                          }`}
                          style={{ width: `${member.loadPercentage}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-gray-700">
                        {member.loadPercentage}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        member.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span>{member.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(member.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-700 transition-colors"
                        title="Toggle Member Status"
                      >
                        {member.status === 'Active' ? 'Set Leave' : 'Set Active'}
                      </button>

                      <button
                        onClick={() =>
                          handleRoleChange(
                            member.id,
                            member.role.includes('Manager')
                              ? 'Employee'
                              : 'Manager / Team Lead'
                          )
                        }
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-lime-50 text-[#4d7c0f] border border-lime-200 hover:bg-lime-100 transition-colors"
                        title="Toggle Manager Role"
                      >
                        {member.role.includes('Manager') ? 'Make Member' : 'Make Manager'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

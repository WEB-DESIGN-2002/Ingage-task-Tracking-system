'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Users,
  Copy,
  KeyRound,
  ShieldCheck,
  Check,
  ChevronDown,
  X,
  Sparkles,
  UserPlus,
  Shield,
  FileSpreadsheet,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';

export default function AddUserPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('Vikram Malhotra');
  const [email, setEmail] = useState('vikram.m@company.com');
  const [empId, setEmpId] = useState('EMP-2025-104');
  const [designation, setDesignation] = useState('Senior Backend Architect');
  const [department, setDepartment] = useState('Backend & Cloud Platform');
  const [contact, setContact] = useState('+1 (555) 349-8291');
  const [tempPassword, setTempPassword] = useState('TaskFlow#9284x!');
  const [selectedRole, setSelectedRole] = useState<'employee' | 'manager' | 'admin'>('employee');
  const [manager, setManager] = useState('Priya Singh — Lead Engineering Lead');
  const [assignedProjects, setAssignedProjects] = useState([
    'Learning Management System',
    'CRM Portal',
    'Employee Management System',
  ]);
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [accountStatusActive, setAccountStatusActive] = useState(true);
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
    let pass = 'TaskFlow#';
    for (let i = 0; i < 4; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    pass += '!';
    setTempPassword(pass);
    showToast('Generated secure temporary credential.');
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(tempPassword);
    showToast('Temporary password copied to clipboard.');
  };

  const handleRemoveProject = (name: string) => {
    setAssignedProjects(assignedProjects.filter((p) => p !== name));
  };

  const handleAddProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val && !assignedProjects.includes(val)) {
      setAssignedProjects([...assignedProjects, val]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`User account created for ${fullName}!`);
    setTimeout(() => {
      router.push('/users');
    }, 700);
  };

  return (
    <WorkspaceLayout>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#65a30d]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
          <Link href="/users" className="hover:text-gray-600 transition-colors">
            Workspace
          </Link>
          <span>&gt;</span>
          <Link href="/users" className="hover:text-gray-600 transition-colors">
            Users
          </Link>
          <span>&gt;</span>
          <span className="text-[#65a30d]">Add New User</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                Add New User
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                Admin Console
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Register a new team member, configure role governance, department alignment, and project onboarding.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => showToast('Bulk CSV import wizard initiated.')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-gray-500" />
              <span>Bulk Import (CSV)</span>
            </button>

            <Link
              href="/users"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <span>View All Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 2-Column Form */}
      <form onSubmit={handleSubmit} className="pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* Card 1: Personal & Employment Details */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                  <span className="w-6 h-6 rounded-lg bg-lime-100 text-[#65a30d] flex items-center justify-center text-xs">
                    🪪
                  </span>
                  <span>Personal &amp; Employment Details</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                  REQ-01
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Official Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram.m@company.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    placeholder="EMP-2025-104"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Job Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Senior Backend Architect"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Department / Squad
                  </label>
                  <div className="relative">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full appearance-none pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer font-medium"
                    >
                      <option>Backend &amp; Cloud Platform</option>
                      <option>Frontend Engineering</option>
                      <option>Product &amp; UX Design</option>
                      <option>QA &amp; Automation</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Number <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+1 (555) 349-8291"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Security & Credentials */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Security &amp; Credentials</span>
                </div>
                <span className="text-[11px] text-gray-400">Initial access credentials</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Initial Temporary Password
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value={tempPassword}
                      className="w-full pl-3.5 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={copyPassword}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-700"
                      title="Copy password"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Generate Strong Key</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-gray-700">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requirePasswordChange}
                    onChange={(e) => setRequirePasswordChange(e.target.checked)}
                    className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d]"
                  />
                  <span>Require password change upon first login</span>
                </label>
                <p className="text-[11px] text-gray-400 pl-6.5">
                  The user will be prompted to choose an authorized password immediately.
                </p>

                <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={enforce2FA}
                    onChange={(e) => setEnforce2FA(e.target.checked)}
                    className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d]"
                  />
                  <span>Enforce Two-Factor Authentication (2FA)</span>
                </label>
                <p className="text-[11px] text-gray-400 pl-6.5">
                  Authenticator app or corporate SSO verification required.
                </p>
              </div>
            </div>

            {/* Card 3: Current Seat Utilization */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    CURRENT SEAT UTILIZATION
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 mt-0.5">
                    Engineering &amp; Operations Unit
                  </h4>
                </div>
                <span className="px-2.5 py-1 bg-lime-100 text-[#4d7c0f] rounded-full text-xs font-bold">
                  ✓ 4 Seats Available
                </span>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="relative w-14 h-14 shrink-0">
                  <svg viewBox="0 0 50 50" className="w-full h-full transform -rotate-90">
                    <circle cx="25" cy="25" r="20" stroke="#f1f5f9" strokeWidth="5" fill="transparent" />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#65a30d"
                      strokeWidth="5"
                      strokeDasharray="125.6"
                      strokeDashoffset="30.1"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-gray-900">
                    76%
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-600 mb-1 font-semibold">
                    <span>Assigned: 38 Employees</span>
                    <span className="text-gray-400">Limit: 50 Licenses</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#65a30d] rounded-full" style={{ width: '76%' }} />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5">
                    Adding this profile consumes 1 Enterprise Work Seat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* Card 1: Corporate Role */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Corporate Role</span>
                </div>
                <span className="text-[11px] text-gray-400">Defines operational capability</span>
              </div>

              {/* Roles radio cards */}
              <div className="space-y-3">
                {/* Employee */}
                <label
                  onClick={() => setSelectedRole('employee')}
                  className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedRole === 'employee'
                      ? 'border-[#65a30d] bg-lime-50/40 ring-1 ring-[#65a30d]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        checked={selectedRole === 'employee'}
                        onChange={() => setSelectedRole('employee')}
                        className="text-[#65a30d] focus:ring-[#65a30d]"
                      />
                      <span className="font-bold text-xs text-gray-900">Employee</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-lime-100 text-[#4d7c0f] text-[10px] font-bold">
                      STANDARD
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 pl-6">
                    Submits daily log entries, executes project sprints, views personal timeline.
                  </p>
                </label>

                {/* Manager / Team Lead */}
                <label
                  onClick={() => setSelectedRole('manager')}
                  className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedRole === 'manager'
                      ? 'border-[#65a30d] bg-lime-50/40 ring-1 ring-[#65a30d]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        checked={selectedRole === 'manager'}
                        onChange={() => setSelectedRole('manager')}
                        className="text-[#65a30d] focus:ring-[#65a30d]"
                      />
                      <span className="font-bold text-xs text-gray-900">Manager / Team Lead</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">
                      REVIEWER
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 pl-6">
                    Approves daily work submissions, assigns team tasks, oversees velocity.
                  </p>
                </label>

                {/* System Administrator */}
                <label
                  onClick={() => setSelectedRole('admin')}
                  className={`block p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedRole === 'admin'
                      ? 'border-[#65a30d] bg-lime-50/40 ring-1 ring-[#65a30d]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        checked={selectedRole === 'admin'}
                        onChange={() => setSelectedRole('admin')}
                        className="text-[#65a30d] focus:ring-[#65a30d]"
                      />
                      <span className="font-bold text-xs text-gray-900">System Administrator</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold">
                      FULL CONTROL
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 pl-6">
                    Unrestricted workspace access, audit logs, user management &amp; billing.
                  </p>
                </label>
              </div>

              {/* Direct Reporting Manager */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Direct Reporting Manager <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer font-medium"
                  >
                    <option>Priya Singh — Lead Engineering Lead</option>
                    <option>Sneha Patel — Engineering Manager</option>
                    <option>Rahul Sharma — Technical Lead</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Card 2: Project Scope */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                  <span className="text-gray-400">📋</span>
                  <span>Project Scope</span>
                </div>
                <span className="text-[11px] text-gray-400 font-semibold">
                  {assignedProjects.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {assignedProjects.map((p) => (
                  <div
                    key={p}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-gray-800"
                  >
                    <span>{p}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(p)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative pt-1">
                <select
                  onChange={handleAddProject}
                  defaultValue=""
                  className="w-full appearance-none pl-3.5 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#65a30d]/20 cursor-pointer"
                >
                  <option value="" disabled>
                    + Assign an additional project...
                  </option>
                  <option value="Mobile App Redesign">Mobile App Redesign</option>
                  <option value="Data Pipeline v2">Data Pipeline v2</option>
                  <option value="Security Audit 2025">Security Audit 2025</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Card 3: Avatar & Operational Status */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-bold text-sm text-gray-900">Avatar &amp; Operational Status</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
                  📷
                </div>
                <div className="text-xs">
                  <p className="font-bold text-gray-800">Upload User Photo</p>
                  <p className="text-[11px] text-gray-400 mb-1.5">PNG, JPG or WebP up to 5MB.</p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showToast('Photo upload file picker opened.')}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-gray-700 font-semibold text-[11px]"
                    >
                      Browse File
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500 text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Account Status</span>
                    <span className="text-[11px] text-gray-400">
                      Active accounts can authenticate immediately.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAccountStatusActive(!accountStatusActive)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      accountStatusActive ? 'bg-[#65a30d]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        accountStatusActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer pt-1 text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={sendWelcomeEmail}
                    onChange={(e) => setSendWelcomeEmail(e.target.checked)}
                    className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d]"
                  />
                  <div>
                    <span className="font-semibold block">Send Welcome &amp; Onboarding Notification</span>
                    <span className="text-[11px] text-gray-400">
                      Dispatches email with secure sign-in link and instructions.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Created Team Accounts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 font-bold text-xs text-gray-700">
              <span className="text-[#65a30d]">↻</span>
              <span>Recently Created Team Accounts</span>
            </div>
            <Link href="/users" className="text-xs font-semibold text-[#65a30d] hover:underline">
              Full Audit Log
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                  SP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Sneha Patel</h4>
                  <p className="text-[10px] text-gray-400">Lead UX Designer</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-lime-100 text-[#4d7c0f] font-bold text-[10px]">
                Active
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Rahul Sharma</h4>
                  <p className="text-[10px] text-gray-400">Backend Developer</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-lime-100 text-[#4d7c0f] font-bold text-[10px]">
                Active
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/90 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Amit Kumar</h4>
                  <p className="text-[10px] text-gray-400">DevOps Specialist</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-bold text-[10px]">
                Invited
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions Bar (matching Image 6) */}
        <div className="fixed bottom-0 left-0 right-0 lg:pl-64 z-30 bg-white border-t border-gray-200/90 py-3.5 px-4 sm:px-8 shadow-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
              <span>Configured permissions will take effect globally across all clusters instantly.</span>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <Link
                href="/users"
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => showToast('Draft saved to local workspace cache.')}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow transition-all"
              >
                <UserPlus className="w-4 h-4 stroke-[2.5]" />
                <span>Create User Account</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </WorkspaceLayout>
  );
}

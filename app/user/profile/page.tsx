'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Save,
  Award,
  Bell,
  Sliders,
  ExternalLink,
  Flame,
  Code2,
  ArrowRight,
} from 'lucide-react';
import UserLayout from '@/components/user/UserLayout';

export default function UserProfilePage() {
  const [name, setName] = useState('Rahul Sharma');
  const [title, setTitle] = useState('Senior Frontend Engineer');
  const [email, setEmail] = useState('rahul.sharma@company.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bangalore, India (IST / UTC+5:30)');
  const [department, setDepartment] = useState('Product Engineering (Core Web)');
  const [employeeId, setEmployeeId] = useState('EMP-2023-048');
  const [defaultProject, setDefaultProject] = useState('PRJ-2025-01');
  const [dailyTargetHours, setDailyTargetHours] = useState('8.0');
  const [autoSaveDrafts, setAutoSaveDrafts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3500);
  };

  return (
    <UserLayout searchPlaceholder="Search settings and profile...">
      {/* Toast Alert */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
          <span className="font-medium">Profile and workspace preferences saved successfully!</span>
        </div>
      )}

      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Link href="/user/dashboard" className="hover:text-slate-600 transition-colors">WORKSPACE</Link>
            <span>/</span>
            <span className="text-[#65a30d] font-bold">MY PROFILE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Account & Employee Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your personal credentials, working hours, and daily logging preferences.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={handleSave}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile Card & Performance Badges */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Main User Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-lime-600 to-lime-400 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-lime-900/10 ring-4 ring-lime-100">
                RS
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white" title="Active on duty" />
            </div>

            <h2 className="text-lg font-extrabold text-slate-900">{name}</h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{title}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime-50 text-[#4d7c0f] border border-lime-200/60 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full-Time Member • Active</span>
            </div>

            {/* Quick Metadata */}
            <div className="w-full mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-left text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Briefcase className="w-3.5 h-3.5" />
                  Employee ID:
                </span>
                <span className="font-mono font-semibold text-slate-800">{employeeId}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Building className="w-3.5 h-3.5" />
                  Department:
                </span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[160px]">
                  {department}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined Date:
                </span>
                <span className="font-semibold text-slate-800">Aug 15, 2023</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <User className="w-3.5 h-3.5" />
                  Direct Manager:
                </span>
                <span className="font-semibold text-[#65a30d]">Priya Singh</span>
              </div>
            </div>
          </div>

          {/* Performance & Badges Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#65a30d]" />
                <span>Quarterly Badges & Stats</span>
              </h3>
              <span className="text-[10px] font-bold uppercase text-slate-400">Q2 2025</span>
            </div>

            <div className="mt-4 space-y-3.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">14-Day Daily Streak</p>
                    <span className="text-[11px] font-mono font-bold text-amber-700">14/14</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Consecutive on-time daily logs submitted</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-lime-100 text-[#4d7c0f] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">98% Review Approval</p>
                    <span className="text-[11px] font-mono font-bold text-[#4d7c0f]">48/49</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Manager sign-offs without rework request</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">Core Contributor</p>
                    <span className="text-[11px] font-mono font-bold text-sky-700">LMS & CRM</span>
                  </div>
                  <p className="text-[11px] text-slate-500">12 pull requests merged this month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile & Daily Log Preferences */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Personal Information Form */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5">
              Personal & Contact Details
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white focus:ring-1 focus:ring-[#65a30d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title / Designation
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white focus:ring-1 focus:ring-[#65a30d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white focus:ring-1 focus:ring-[#65a30d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Contact
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white focus:ring-1 focus:ring-[#65a30d]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location & Timezone
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white focus:ring-1 focus:ring-[#65a30d]"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Daily Work Logging Preferences */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 mb-5 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#65a30d]" />
              <span>Daily Work & Tracking Preferences</span>
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Default Project for Quick Updates
                  </label>
                  <select
                    value={defaultProject}
                    onChange={(e) => setDefaultProject(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white"
                  >
                    <option value="PRJ-2025-01">PRJ-2025-01 — Learning Management System (LMS)</option>
                    <option value="PRJ-2025-04">PRJ-2025-04 — CRM Customer Portal</option>
                    <option value="PRJ-2025-08">PRJ-2025-08 — Employee Management System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Daily Target Hours
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={dailyTargetHours}
                      onChange={(e) => setDailyTargetHours(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-[#65a30d] focus:bg-white"
                      placeholder="e.g. 8.0"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 cursor-pointer hover:bg-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900">Auto-save daily update drafts</span>
                    <span className="text-[11px] text-slate-500">Automatically save form text every 30 seconds while typing</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSaveDrafts}
                    onChange={(e) => setAutoSaveDrafts(e.target.checked)}
                    className="w-4 h-4 text-[#65a30d] rounded border-slate-300 focus:ring-[#65a30d]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 cursor-pointer hover:bg-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900">Manager review notification alerts</span>
                    <span className="text-[11px] text-slate-500">Receive in-app and email notification when manager signs off your work</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 text-[#65a30d] rounded border-slate-300 focus:ring-[#65a30d]"
                  />
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <Link
                  href="/user/dashboard"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

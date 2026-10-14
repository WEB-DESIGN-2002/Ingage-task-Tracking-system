'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Shield,
  ShieldCheck,
  Bell,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Camera,
  Check,
  Plus,
  X,
  Smartphone,
  Laptop,
  Lock,
  Sliders,
  Share2,
  ExternalLink,
  ChevronDown,
  Download,
  AlertCircle,
} from 'lucide-react';
import ManagerLayout from '@/components/manager/ManagerLayout';

export default function ManagerProfilePage() {
  const [fullName, setFullName] = useState('Priya Singh');
  const [email, setEmail] = useState('priya.singh@company.com');
  const [phone, setPhone] = useState('+91 98450 18273');
  const [officeLocation, setOfficeLocation] = useState('Bengaluru Tech Hub');
  const [timezone, setTimezone] = useState('IST (UTC+05:30)');
  const [bio, setBio] = useState(
    'Engineering manager focused on high-velocity agile delivery, modular frontend architectures, and cross-discipline mentoring. Committed to removing day-to-day blockers for developer squads.'
  );

  const [skills, setSkills] = useState([
    'Sprint Planning',
    'Agile Delivery',
    'React/Node Architecture',
    'Team Leadership',
  ]);

  const [dailyReminders, setDailyReminders] = useState(true);
  const [blockerAlerts, setBlockerAlerts] = useState(true);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [reviewSla, setReviewSla] = useState<'2h' | '4h' | '8h' | '24h'>('4h');
  const [delegationMode, setDelegationMode] = useState('Automatic on OOO Google Calendar');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addSkillPrompt = () => {
    const newSkill = prompt('Enter new managerial skill / specialization:');
    if (newSkill && newSkill.trim()) {
      setSkills((prev) => [...prev, newSkill.trim()]);
    }
  };

  return (
    <ManagerLayout searchPlaceholder="Search executive preferences, security keys, or delegation rules...">
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
            MGR // ACCOUNT &amp; GOVERNANCE • <span className="text-gray-600 font-mono">ID: MGR-2024-009</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Manager Profile &amp; Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your executive profile, notification preferences, direct report oversight rules, and security credentials.
          </p>
        </div>

        {/* Action Controls matching screenshot */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Changes reverted to saved baseline.')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200/90 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs transition-colors"
          >
            <span>Discard Changes</span>
          </button>

          <button
            onClick={() => showToast('Profile preferences and governance rules updated successfully!')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </div>

      {/* Hero Profile Banner matching screenshot */}
      <div className="bg-[#111827] text-white rounded-3xl p-6 sm:p-8 mb-8 border border-gray-800 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Avatar with Camera icon */}
            <div className="relative group self-start sm:self-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-lime-600 to-lime-400 text-gray-950 font-extrabold text-2xl flex items-center justify-center ring-4 ring-white/10 shadow-lg">
                PS
              </div>
              <button
                onClick={() => showToast('Photo upload modal opened.')}
                className="absolute bottom-1 right-1 p-1.5 rounded-lg bg-gray-900/90 text-white hover:bg-[#65a30d] transition-colors border border-gray-700 shadow-sm"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Identifiers */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  Priya Singh
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/40 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Engineering Manager / Lead Reviewer</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <span>manager@company.com</span>
                </span>
                <span>•</span>
                <span>Engineering &amp; Product Delivery</span>
                <span>•</span>
                <span className="font-mono text-gray-400">MGR-2024-009</span>
              </div>
            </div>
          </div>

          {/* Right Metrics Panel */}
          <div className="flex items-center gap-4 bg-gray-900/80 border border-gray-800 p-4 rounded-2xl self-stretch sm:self-auto justify-around">
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                SUPERVISED
              </span>
              <span className="text-2xl font-extrabold text-white tabular-nums">5</span>
              <span className="text-[10px] text-gray-400 block">Active Projects</span>
            </div>

            <div className="w-px h-10 bg-gray-800" />

            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                DIRECT
              </span>
              <span className="text-2xl font-extrabold text-white tabular-nums">8</span>
              <span className="text-[10px] text-gray-400 block">Reports Engineers</span>
            </div>

            <div className="w-px h-10 bg-gray-800" />

            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                REVIEW SLA
              </span>
              <span className="text-2xl font-extrabold text-[#65a30d] tabular-nums">98.5%</span>
              <span className="text-[10px] text-emerald-400 block">↑ +1.2% mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Main Form Grid matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left 6 cols: Personal Info, Bio, Security */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 1: Personal Information */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-[#65a30d]" />
                <span>Personal Information</span>
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-gray-600">
                Core Record
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">FULL NAME</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:border-[#65a30d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">OFFICIAL EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:border-[#65a30d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">WORK PHONE</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:border-[#65a30d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">OFFICE LOCATION</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={officeLocation}
                      onChange={(e) => setOfficeLocation(e.target.value)}
                      className="w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white focus:outline-none focus:border-[#65a30d]"
                    />
                    <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">PRIMARY TIMEZONE</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-gray-800 focus:bg-white focus:outline-none focus:border-[#65a30d]"
                  >
                    <option>IST (UTC+05:30)</option>
                    <option>PST (UTC-08:00)</option>
                    <option>EST (UTC-05:00)</option>
                    <option>GMT (UTC+00:00)</option>
                    <option>SGT (UTC+08:00)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bio & Managerial Expertise */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#65a30d]" />
                <span>Bio &amp; Managerial Expertise</span>
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                Public to Team
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">EXECUTIVE SUMMARY</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 leading-relaxed focus:bg-white focus:outline-none focus:border-[#65a30d]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-2">KEY SPECIALIZATION BADGES</label>
                <div className="flex flex-wrap items-center gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-gray-800 font-semibold text-xs border border-slate-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#65a30d]" />
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-gray-400 hover:text-gray-700 ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={addSkillPrompt}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-600 hover:border-[#65a30d] hover:text-[#65a30d] text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Security & Sessions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#65a30d]" />
                <span>Security &amp; Sessions</span>
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Tier-1 Access
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <p className="font-bold text-gray-900">Enterprise Password</p>
                  <p className="text-[11px] text-gray-500">Updated 24 days ago • Next rotation in 66 days</p>
                </div>
                <button
                  onClick={() => showToast('Password reset link sent to work email.')}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 font-semibold text-gray-800 transition-colors"
                >
                  Reset Key
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-gray-900">Two-Factor Auth (2FA)</p>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[11px] text-gray-500">Enabled via Enterprise Authenticator App (TOTP)</p>
                </div>
                <button
                  onClick={() => showToast('2FA settings opened.')}
                  className="text-xs font-bold text-[#65a30d] hover:underline"
                >
                  Configure
                </button>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-2">
                  ACTIVE DEVICE AUTHORIZATIONS
                </span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-white">
                    <div className="flex items-center gap-2.5">
                      <Laptop className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-bold text-gray-800">Chrome on macOS Sequoia</p>
                        <p className="text-[10px] text-gray-400">106.51.72.19 • Bengaluru (Current session)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Online Now
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 bg-white">
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-bold text-gray-800">Ingage Mobile iOS • iPhone 15 Pro</p>
                        <p className="text-[10px] text-gray-400">49.207.199.1 • Active 2 hours ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Session revoked.')}
                      className="text-[11px] font-bold text-red-600 hover:underline"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Supervision Preferences, Notifications, Delegation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 1: Manager Supervision Preferences */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#65a30d]" />
                <span>Manager Supervision Preferences</span>
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-gray-600">
                v2.4 Rules
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Rules governing automated check-ins and direct report escalations
            </p>

            <div className="space-y-4 text-xs">
              {/* Rule 1 */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900">Daily Update Review Reminders</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-lime-100 text-[#4d7c0f]">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Automated prompt alerting you to review unconfirmed engineer progress logs.
                  </p>
                  <span className="text-[10px] font-mono font-bold text-gray-400 mt-1 block">
                    Scheduled dispatch time: 05:00 PM IST (Daily)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={dailyReminders}
                  onChange={(e) => setDailyReminders(e.target.checked)}
                  className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d] cursor-pointer mt-1"
                />
              </div>

              {/* Rule 2 */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-gray-900">Immediate Blocker Alerts</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-100 text-red-700">
                      Priority 1
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Instant mobile push &amp; Slack DM when an assigned team member flags a task as &apos;Blocked&apos;.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={blockerAlerts}
                  onChange={(e) => setBlockerAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d] cursor-pointer mt-1"
                />
              </div>

              {/* Rule 3 */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="font-bold text-gray-900 block mb-0.5">
                    Auto-Escalate Pending Reviews
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Re-route pull requests and sign-off blockers to Senior Staff if untouched beyond 24 business hours.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoEscalate}
                  onChange={(e) => setAutoEscalate(e.target.checked)}
                  className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d] cursor-pointer mt-1"
                />
              </div>

              {/* Rule 4: SLA Target */}
              <div className="pt-2">
                <label className="block font-bold text-gray-700 mb-0.5">DEFAULT REVIEW SLA TARGET</label>
                <p className="text-[11px] text-gray-400 mb-2">
                  Calculates personal SLA response performance across team pull requests.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {(['2h', '4h', '8h', '24h'] as const).map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setReviewSla(hrs)}
                      className={`py-2 text-center rounded-xl font-bold transition-all ${
                        reviewSla === hrs
                          ? 'bg-[#65a30d] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-gray-700'
                      }`}
                    >
                      {hrs} {hrs === '4h' ? '(Target)' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Connected Notification Channels */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#65a30d]" />
                <span>Connected Notification Channels</span>
              </h2>
              <span className="text-xs font-semibold text-gray-500">2 Integrations</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Slack Webhook */}
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900"># Slack Webhook</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Connected
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('Slack webhook settings opened.')}
                    className="text-[11px] font-semibold text-gray-600 hover:text-gray-900 underline"
                  >
                    Edit Hook
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Dispatches team sprint status changes and urgent reviews directly into your dedicated stream.
                </p>
                <div className="mt-2 font-mono text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200 text-gray-700">
                  #eng-taskflow-updates • <span className="text-emerald-700 font-bold">Sync status: Realtime</span>
                </div>
              </div>

              {/* Executive Digest */}
              <div className="p-3 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Executive Digest</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700">
                      Weekly
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('Digest configuration updated.')}
                    className="text-[11px] font-semibold text-gray-600 hover:text-gray-900 underline"
                  >
                    Configure
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Consolidated Monday summary containing velocity charts, blocker resolutions, and milestone health.
                </p>
                <div className="mt-2 font-mono text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200 text-gray-700 flex items-center justify-between">
                  <span>priya.singh@company.com</span>
                  <span className="text-gray-400">Every Monday 08:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Direct Report Review Delegation */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#65a30d]" />
                <span>Direct Report Review Delegation</span>
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                Governance
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Temporary backup approver during planned leave or travel
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    SP
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Sneha Patel (Senior Tech Lead)</p>
                    <p className="text-[11px] text-gray-500">
                      Configured as designated proxy reviewer for 8 direct reports
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Proxy delegation dialog opened.')}
                  className="px-2.5 py-1 rounded-lg border border-gray-300 bg-white font-semibold text-gray-700 text-[11px] hover:bg-gray-50"
                >
                  Change Proxy
                </button>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">DELEGATION ACTIVATION MODE</label>
                <select
                  value={delegationMode}
                  onChange={(e) => setDelegationMode(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-800 focus:bg-white focus:outline-none"
                >
                  <option>Automatic on OOO Google Calendar</option>
                  <option>Manual Toggle Only</option>
                  <option>Scheduled Date Range</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">APPROVAL AUTHORITY LEVEL</label>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-xs border border-lime-300 flex items-center gap-1">
                    <Check className="w-3 h-3" /> PR Approvals
                  </span>
                  <span className="px-3 py-1 rounded-full bg-lime-100 text-[#4d7c0f] font-bold text-xs border border-lime-300 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Daily Logs
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-semibold text-xs border border-gray-200">
                    Budgetary
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span>All sign-offs issued by proxy are tagged in the audit trail with dual-signature verification.</span>
                <button
                  onClick={() => showToast('Audit logs for proxy delegations opened.')}
                  className="text-[#65a30d] font-bold hover:underline shrink-0 ml-2"
                >
                  View Audit Logs
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Certification Banner matching screenshot */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65a30d] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-gray-900">Managerial Governance Compliance</h3>
              <span className="px-2 py-0.2 rounded font-extrabold text-[9px] uppercase bg-lime-100 text-[#4d7c0f] border border-lime-300">
                100% Certified
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Priya Singh holds verified manager credentials in compliance with SOC-2 and ISO-27001 data isolation policies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">
            Next Audit Cycle: <span className="font-bold text-gray-800">November 2025</span>
          </span>
          <button
            onClick={() => showToast('Downloading Compliance Certificate PDF...')}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors"
          >
            Download Compliance Certificate
          </button>
        </div>
      </div>
    </ManagerLayout>
  );
}

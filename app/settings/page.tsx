'use client';

import { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Lock,
  Database,
  Users,
  Check,
  Sparkles,
  Save,
  Key,
} from 'lucide-react';
import WorkspaceLayout from '@/components/workspace/WorkspaceLayout';

export default function SettingsPage() {
  const [appName, setAppName] = useState('Ingage TaskFlow');
  const [requireMFA, setRequireMFA] = useState(true);
  const [dailyStandupReminders, setDailyStandupReminders] = useState(true);
  const [managerApprovalRequired, setManagerApprovalRequired] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    setToastMessage('Admin settings saved successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <WorkspaceLayout searchPlaceholder="Search system configurations and security parameters...">
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
            ENTERPRISE ADMINISTRATION &gt; <span className="text-[#65a30d]">SETTINGS</span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              System Settings &amp; Security
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
              Admin Only
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Configure enterprise security policies, manager approval workflows, and data retention rules.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#65a30d] hover:bg-[#4d7c0f] text-white rounded-xl text-xs font-bold transition-all shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General Workspace Settings */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#65a30d]" />
              <span>Workspace Parameters</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Application Name</label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full sm:w-80 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#65a30d]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Primary Organization Domain</label>
                <input
                  type="text"
                  disabled
                  value="company.com (SSO Enforced)"
                  className="w-full sm:w-80 px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Security & Access Policies */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#65a30d]" />
              <span>Security &amp; Governance</span>
            </h2>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={requireMFA}
                  onChange={(e) => setRequireMFA(e.target.checked)}
                  className="mt-0.5 rounded text-[#65a30d] focus:ring-[#65a30d]"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Enforce Multi-Factor Authentication (MFA)</p>
                  <p className="text-[11px] text-gray-500">Require all Admin and Manager accounts to provide TOTP/FIDO2 keys.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={managerApprovalRequired}
                  onChange={(e) => setManagerApprovalRequired(e.target.checked)}
                  className="mt-0.5 rounded text-[#65a30d] focus:ring-[#65a30d]"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Mandate Manager Sign-Off on Sprint Hours</p>
                  <p className="text-[11px] text-gray-500">Tasks logged above 8h/day require explicit manager approval before invoice export.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dailyStandupReminders}
                  onChange={(e) => setDailyStandupReminders(e.target.checked)}
                  className="mt-0.5 rounded text-[#65a30d] focus:ring-[#65a30d]"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Automated Daily Standup Slack / Email Alerts</p>
                  <p className="text-[11px] text-gray-500">Ping engineering squads at 9:30 AM local time for daily task logs.</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/90 shadow-2xs">
            <h2 className="text-sm font-bold text-gray-900 mb-2">SOC-2 Type II Compliance</h2>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Ingage TaskFlow operates with strict enterprise auditing, encrypted data at rest (AES-256), and in-transit TLS 1.3.
            </p>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
              <span className="font-bold block">Status: Verified Compliant</span>
              <span className="text-[10px] text-emerald-700">Next renewal: December 2025</span>
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

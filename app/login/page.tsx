'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  CheckCircle2,
  HelpCircle,
  Shield,
  X,
  AlertCircle,
  Crown,
  User,
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@company.com');
  const [password, setPassword] = useState('••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ssoMessage, setSsoMessage] = useState<string | null>(null);
  const [authSuccessNotice, setAuthSuccessNotice] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  const router = useRouter();

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setAuthSuccessNotice(null);
    setSsoMessage(null);

    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your work email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!password) {
      newErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setAuthSuccessNotice(`Authenticating credentials... Redirecting to workspace.`);

    setTimeout(() => {
      setIsLoading(false);
      const lower = email.toLowerCase();
      if (lower.includes('manager')) {
        router.push('/manager/dashboard');
      } else if (lower.includes('user') || lower.includes('dev') || lower.includes('member')) {
        router.push('/assignments');
      } else {
        // Admin login goes directly to Admin Dashboard!
        router.push('/admin/dashboard');
      }
    }, 300);
  };

  const loginAsRole = (role: 'admin' | 'manager' | 'member') => {
    setIsLoading(true);
    if (role === 'admin') {
      setEmail('admin@company.com');
      setPassword('••••••••••••••');
      setAuthSuccessNotice('Admin authenticated successfully! Loading Admin Dashboard...');
      setTimeout(() => router.push('/admin/dashboard'), 350);
    } else if (role === 'manager') {
      setEmail('manager.priya@company.com');
      setPassword('••••••••••••••');
      setAuthSuccessNotice('Manager authenticated! Loading Manager Review Portal...');
      setTimeout(() => router.push('/manager/dashboard'), 350);
    } else {
      setEmail('developer.ankit@company.com');
      setPassword('••••••••••••••');
      setAuthSuccessNotice('Team Member authenticated! Loading Daily Workspaces...');
      setTimeout(() => router.push('/assignments'), 350);
    }
  };

  const handleSSO = (provider: string) => {
    setAuthSuccessNotice(null);
    setSsoMessage(
      `SSO Flow: ${provider} enterprise SAML/OAuth endpoint requested. In preview mode, use the Quick Demo Auto-Fill roles to test workspace permissions.`
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-900 flex flex-col justify-between font-sans selection:bg-lime-200">
      {/* 1. Global Header Bar */}
      <header className="w-full bg-white border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Left: TaskFlow Wordmark */}
        <div className="flex items-center">
          <Logo showText={true} iconSize="md" />
        </div>

        {/* Right: Enterprise Portal & Direct Admin link */}
        <div className="flex items-center gap-3 text-xs font-semibold text-gray-600">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-lime-50 hover:bg-lime-100 text-[#4d7c0f] border border-lime-300 font-bold text-xs transition-colors"
            title="Open Admin Dashboard directly"
          >
            <Crown className="w-3.5 h-3.5 text-[#65a30d]" />
            <span>Admin View</span>
          </Link>
          <span className="hidden sm:inline-block text-gray-300" aria-hidden="true">
            |
          </span>
          <span className="hidden sm:inline-block tracking-wider uppercase text-gray-500 font-bold text-[11px]">
            ENTERPRISE PORTAL
          </span>
          <button
            onClick={() => setShowSupportModal(true)}
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
          >
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Support</span>
          </button>
        </div>
      </header>

      {/* 2. Main Login Container (2-Column Card) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* ================= LEFT COLUMN: AUTH FORM ================= */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Back Link & Version Badge */}
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors py-1 group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to Public Overview</span>
                </Link>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200">
                  <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                  <span>v4.8 Enterprise</span>
                </div>
              </div>

              {/* Ingage TaskFlow Brand Lockup */}
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-[#65a30d] flex items-center justify-center text-white shadow-sm">
                    <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-[#111827]">
                    Ingage <span className="text-[#65a30d]">TaskFlow</span>
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                  PROJECT &amp; DAILY WORK TRACKING SYSTEM
                </p>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Sign in to access your projects, daily logs, and team workspace.
                </p>
              </div>

              {/* Status / Notices */}
              {authSuccessNotice && (
                <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-emerald-900">Sign-in Simulated</p>
                    <p className="mt-0.5 leading-relaxed">{authSuccessNotice}</p>
                  </div>
                  <button
                    onClick={() => setAuthSuccessNotice(null)}
                    className="text-emerald-700 hover:text-emerald-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {ssoMessage && (
                <div className="mb-5 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-blue-900">SSO Notice</p>
                    <p className="mt-0.5 leading-relaxed">{ssoMessage}</p>
                  </div>
                  <button
                    onClick={() => setSsoMessage(null)}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* One-Click Instant Role Sign-In */}
              <div className="mb-5 bg-slate-50 border border-gray-200/90 rounded-2xl p-3.5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    One-Click Instant Logins
                  </span>
                  <span className="text-[10px] font-bold text-[#65a30d]">
                    Quick Test Access
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => loginAsRole('admin')}
                    className="p-2.5 rounded-xl border-2 border-[#65a30d] bg-lime-50/90 hover:bg-lime-100/90 text-left transition-all group flex flex-col justify-between shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-[#4d7c0f] flex items-center gap-1.5">
                        <Crown className="w-3.5 h-3.5 text-[#65a30d]" />
                        <span>Admin</span>
                      </span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#65a30d] text-white">
                        Full
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">Opens Admin Dashboard</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginAsRole('manager')}
                    className="p-2.5 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/60 text-left transition-all group flex flex-col justify-between shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900 group-hover:text-blue-700 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-blue-500" />
                        <span>Manager</span>
                      </span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        Reviews
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">Opens Squad Reviews</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginAsRole('member')}
                    className="p-2.5 rounded-xl border border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-100/70 text-left transition-all group flex flex-col justify-between shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-500" />
                        <span>Member</span>
                      </span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                        Tasks
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">Opens Daily Logs</p>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSignIn} noValidate className="space-y-4">
                {/* Work Email Address */}
                <div>
                  <label
                    htmlFor="work-email"
                    className="block text-xs font-semibold text-gray-800 mb-1.5"
                  >
                    Work Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="work-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="admin@company.com"
                      className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50/70 border rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.email
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/40'
                          : 'border-gray-300 focus:border-[#65a30d] focus:ring-2 focus:ring-[#65a30d]/20'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-xs font-semibold text-gray-800"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-semibold text-gray-600 hover:text-[#65a30d] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                          setErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      placeholder="••••••••••••••"
                      className={`w-full pl-10 pr-11 py-2.5 text-sm bg-slate-50/70 border rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none transition-all ${
                        errors.password
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/40'
                          : 'border-gray-300 focus:border-[#65a30d] focus:ring-2 focus:ring-[#65a30d]/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Remember device & Active Role indicator */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-gray-700">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="w-4 h-4 rounded text-[#65a30d] border-gray-300 focus:ring-[#65a30d] cursor-pointer"
                    />
                    <span className="font-medium">Remember device for 30 days</span>
                  </label>

                  <span className="text-[#65a30d] font-bold text-xs">
                    Active: Admin
                  </span>
                </div>

                {/* Sign In CTA Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-3 py-3.5 px-4 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 group disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65a30d]"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Workspace</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* SSO Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  <span className="bg-white px-3">OR CONTINUE WITH SSO</span>
                </div>
              </div>

              {/* SSO Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {/* Google Workspace */}
                <button
                  type="button"
                  onClick={() => handleSSO('Google Workspace')}
                  className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-blue-100 bg-blue-50/60 hover:bg-blue-100/70 text-gray-800 text-xs font-semibold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Google Workspace</span>
                </button>

                {/* Microsoft 365 / Okta */}
                <button
                  type="button"
                  onClick={() => handleSSO('Microsoft 365 / Okta')}
                  className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-blue-100 bg-blue-50/60 hover:bg-blue-100/70 text-gray-800 text-xs font-semibold transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                    <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                    <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                    <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                  </svg>
                  <span>Microsoft 365 / Okta</span>
                </button>
              </div>
            </div>

            {/* Bottom Security Trust Badges */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center sm:justify-between gap-y-2 text-[11px] text-gray-500 font-medium">
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#65a30d]" />
                <span>SOC-2 Type II Certified</span>
              </div>
              <span className="hidden sm:inline-block text-gray-300">•</span>
              <div className="inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>256-bit TLS Encrypted</span>
              </div>
              <span className="hidden sm:inline-block text-gray-300">•</span>
              <button
                type="button"
                onClick={() => setShowSecurityModal(true)}
                className="hover:text-gray-900 underline"
              >
                Security Policy
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: ENTERPRISE EDITION SHOWCASE ================= */}
          <div className="lg:col-span-5 bg-[#111827] text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-800">
            <div className="space-y-6">
              {/* Green Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/90 border border-gray-700 text-xs font-bold tracking-wide text-gray-200">
                <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
                <span>ENTERPRISE EDITION</span>
              </div>

              {/* Headline */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Track Projects. <br />
                  Manage Teams. <br />
                  <span className="text-[#65a30d]">Achieve Goals.</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  The unified daily work tracking platform designed for agile engineering squads,
                  managers, and cross-functional operators.
                </p>
              </div>

              {/* Three Value Bullets */}
              <div className="space-y-3 text-xs sm:text-sm text-gray-200 pt-2">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#65a30d] stroke-[2.8] shrink-0" />
                  <span>Real-time daily standup logs &amp; deliverables</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#65a30d] stroke-[2.8] shrink-0" />
                  <span>Sprint velocity &amp; manager review approvals</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#65a30d] stroke-[2.8] shrink-0" />
                  <span>Automated weekly timesheets &amp; workload trends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Global Footer */}
      <footer className="w-full bg-white border-t border-gray-200/80 px-4 sm:px-8 py-4 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          &copy; 2025 Ingage TaskFlow Inc. All rights reserved. Secure 256-bit TLS connection.
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={() => setShowSecurityModal(true)}
            className="hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setShowSecurityModal(true)}
            className="hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setShowSecurityModal(true)}
            className="hover:text-gray-900 transition-colors"
          >
            Security Center
          </button>
          <div className="inline-flex items-center gap-1.5 text-gray-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
            <span>System Operational</span>
          </div>
        </div>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-gray-900 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-lime-100 text-[#65a30d] flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Password Assistance</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
              Ingage TaskFlow user credentials are tied to your corporate workspace directory. Please reach out to your designated workspace administrator or IT helpdesk to initiate a password reset.
            </p>
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 text-gray-900 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Enterprise Support</h3>
            <p className="text-xs text-gray-500 mb-4">
              24/7 dedicated support for Ingage TaskFlow Enterprise tier workspaces.
            </p>
            <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-xl border border-gray-200 mb-5">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">Emergency Desk</span>
                <span className="font-semibold text-gray-800">support@ingagetaskflow.com</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500">SLA Response Time</span>
                <span className="font-semibold text-[#65a30d]">&lt; 15 minutes</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Security Hotline</span>
                <span className="font-semibold text-gray-800">+1 (800) 555-TASK</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors"
            >
              Close Support Desk
            </button>
          </div>
        </div>
      )}

      {/* Security & Policies Modal */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 text-gray-900 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-lime-100 text-[#65a30d] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Enterprise Security & Compliance</h3>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Ingage TaskFlow is built with strict enterprise standards to protect organizational project data, daily logs, and user credentials.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 mb-5">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65a30d]" />
                <span>SOC 2 Type II certified data centers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65a30d]" />
                <span>AES-256 bit encryption at rest & TLS 1.3 in transit</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65a30d]" />
                <span>Role-based access control (RBAC) with audit logging</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#65a30d]" />
                <span>GDPR and CCPA compliant data privacy workflows</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setShowSecurityModal(false)}
              className="w-full py-2.5 px-4 bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

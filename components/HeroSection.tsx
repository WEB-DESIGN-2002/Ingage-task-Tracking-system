import Link from 'next/link';
import { CheckCircle2, LogIn, ArrowRight } from 'lucide-react';
import DashboardMockup from './DashboardMockup';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32 bg-white">
      {/* Subtle background ambient mesh */}
      <div
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-lime-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-50 border border-lime-200/90 text-[#4d7c0f] text-xs sm:text-sm font-semibold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#65a30d]" />
              <span>Project & Daily Work Tracking System</span>
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.08]">
              Track Projects. <br />
              <span className="text-[#65a30d]">Achieve Goals.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl font-normal">
              Ingage TaskFlow helps teams stay organized, track daily work and achieve
              project goals with complete transparency and accountability.
            </p>

            {/* Three Compact Benefit Labels */}
            <div className="space-y-2.5 pt-1">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
                <div className="inline-flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#65a30d] shrink-0 fill-lime-100/50" />
                  <span>Project Management</span>
                </div>
                <div className="inline-flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base">
                  <CheckCircle2 className="w-5 h-5 text-[#65a30d] shrink-0 fill-lime-100/50" />
                  <span>Team Collaboration</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-[#65a30d] shrink-0 fill-lime-100/50" />
                <span>Real-time Updates</span>
              </div>
            </div>

            {/* Prominent Green CTA Button */}
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-7 sm:py-4 bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#65a30d]"
              >
                <LogIn className="w-5 h-5 stroke-[2.2] transition-transform group-hover:scale-110" />
                <span>Login to Continue</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

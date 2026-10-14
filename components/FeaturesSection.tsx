import { Users, CalendarCheck, ShieldCheck, BarChart3, CloudCheck } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: FeatureItem[] = [
  {
    id: 'multi-user',
    title: 'Multi-User Projects',
    description: 'Assign one project to multiple users and a dedicated manager.',
    icon: Users,
  },
  {
    id: 'daily-work',
    title: 'Daily Work Tracking',
    description: 'Users update their daily tasks with status, priority, links and files.',
    icon: CalendarCheck,
  },
  {
    id: 'manager-review',
    title: 'Manager Review',
    description: 'Managers monitor progress, check evidence and give feedback.',
    icon: ShieldCheck,
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    description: 'Get insights with charts and export Excel reports.',
    icon: BarChart3,
  },
  {
    id: 'secure-reliable',
    title: 'Secure & Reliable',
    description: 'Your data is safe with modern security practices.',
    icon: CloudCheck,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50/70 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Centered Accent Bar */}
          <div
            className="w-12 h-1.5 bg-[#65a30d] rounded-full mx-auto mb-5"
            aria-hidden="true"
          />

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
            Built for Better Team Productivity
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            From project creation to daily updates and final reports — everything you
            need in one place.
          </p>
        </div>

        {/* 5 Feature Cards Grid: 1 row on desktop (lg:grid-cols-5), responsive on smaller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-center text-center group hover:-translate-y-1"
              >
                {/* Circular Lime-tinted Icon Container */}
                <div className="w-14 h-14 rounded-full bg-lime-50 text-[#65a30d] flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110">
                  <IconComponent className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Feature Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#111827] mb-2.5">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Brand & Descriptor */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <Logo iconSize="sm" />
            <span className="hidden sm:inline-block text-gray-300 font-light" aria-hidden="true">
              |
            </span>
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              Project & Daily Work Tracking System
            </span>
          </div>

          {/* Copyright notice */}
          <div className="text-xs sm:text-sm text-gray-400 font-normal">
            &copy; 2026 Ingage TaskFlow. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

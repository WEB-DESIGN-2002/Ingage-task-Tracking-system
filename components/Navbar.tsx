import Link from 'next/link';
import { LogIn } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Left: Brand Logo & Wordmark */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right: Single Green Login CTA Button */}
          <div className="flex items-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2 sm:px-5 sm:py-2.5 bg-[#65a30d] hover:bg-[#4d7c0f] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#65a30d]"
            >
              <LogIn className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

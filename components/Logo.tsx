import Link from 'next/link';

interface LogoProps {
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({
  className = '',
  iconSize = 'md',
  showText = true,
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#65a30d] rounded-lg ${className}`}
      aria-label="Ingage TaskFlow Home"
    >
      {/* Brand Icon: rounded shield/workflow mark */}
      <div
        className={`${sizeClasses[iconSize]} rounded-xl bg-[#65a30d] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      {showText && (
        <span className="text-xl font-bold tracking-tight text-[#111827] select-none">
          Ingage <span className="text-[#65a30d]">TaskFlow</span>
        </span>
      )}
    </Link>
  );
}

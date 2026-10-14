import type {Metadata} from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ingage TaskFlow | Project & Daily Work Tracking System',
  description:
    'Ingage TaskFlow helps teams stay organized, track daily work and achieve project goals with complete transparency and accountability.',
  openGraph: {
    title: 'Ingage TaskFlow | Track Projects. Achieve Goals.',
    description:
      'Ingage TaskFlow helps teams stay organized, track daily work and achieve project goals with complete transparency and accountability.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ingage TaskFlow | Track Projects. Achieve Goals.',
    description:
      'Ingage TaskFlow helps teams stay organized, track daily work and achieve project goals with complete transparency and accountability.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans antialiased bg-white text-gray-900 selection:bg-lime-200 selection:text-gray-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

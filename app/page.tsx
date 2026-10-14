import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-lime-200">
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <main className="flex-1">
        <HeroSection />

        {/* 3. Features Section */}
        <FeaturesSection />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

import React, { useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import FeaturesSection from './sections/FeaturesSection';
import CTASection from './sections/CTASection';

interface HomeViewRefactoredProps {
  onNavigate: (page: string) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  isRegistrationOpen: boolean;
  user: any | null;
}

const HomeViewRefactored: React.FC<HomeViewRefactoredProps> = ({
  onNavigate,
  onAuthNavigate,
  isRegistrationOpen,
  user,
}) => {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0c]">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50" style={{ width: `${scrollProgress}%` }} />

      {/* Sections */}
      <HeroSection
        onAuthNavigate={onAuthNavigate}
        isRegistrationOpen={isRegistrationOpen}
        user={user}
      />

      <AboutSection />

      <FeaturesSection />

      <CTASection
        onAuthNavigate={onAuthNavigate}
        isRegistrationOpen={isRegistrationOpen}
        user={user}
      />
    </div>
  );
};

export default HomeViewRefactored;

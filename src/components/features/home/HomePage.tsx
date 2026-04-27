import React, { useMemo } from 'react';
import { Page, UserData } from '../../../types';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import CTASection from './CTASection';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  isRegistrationOpen?: boolean;
  user?: UserData | null;
}

/**
 * Buddy Platform Home Page
 * 
 * Main landing page component with three key sections:
 * - Hero: Brand introduction and primary CTA
 * - About: Platform mission and values
 * - CTA: Final call-to-action with statistics
 * 
 * Color Palette:
 * - Primary: Indigo-Purple (#A855F7) - Trust, Creativity
 * - Secondary: Emerald-Teal (#14B8A6) - Growth, Harmony
 * - Accent: Amber-Orange (#F97316) - Energy, Warmth
 * - Danger: Red-Rose (#F43F5E) - Caution, Action
 */
const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onAuthNavigate,
  isRegistrationOpen = true,
  user,
}) => {
  const heroSection = useMemo(
    () => <HeroSection user={user} onNavigate={onNavigate} />,
    [user, onNavigate]
  );

  const aboutSection = useMemo(
    () => (
      <AboutSection
        isRegistrationOpen={isRegistrationOpen}
        onAuthNavigate={onAuthNavigate}
      />
    ),
    [isRegistrationOpen, onAuthNavigate]
  );

  const ctaSection = useMemo(
    () => (
      <CTASection
        isRegistrationOpen={isRegistrationOpen}
        onNavigate={onNavigate}
        onAuthNavigate={onAuthNavigate}
      />
    ),
    [isRegistrationOpen, onNavigate, onAuthNavigate]
  );

  return (
    <div>
      {heroSection}
      {aboutSection}
      {ctaSection}
    </div>
  );
};

export default HomePage;

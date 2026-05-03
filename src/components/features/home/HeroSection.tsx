import React from 'react';
import { ArrowRight, Users, BookOpen, Target, Award } from 'lucide-react';
import { UserData } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import BuddyIcon from '../../common/BuddyIcon/BuddyIcon';
import Button3D from '../../common/Button3D/Button3D';
import Card3D from '../../common/Card3D/Card3D';
import imgCurator from '/curator.png';
import imgStudent from '/student.jpg';
import imgArt from '/buddy_team.jpg';

interface HeroSectionProps {
  user?: UserData | null;
  onNavigate?: (page: any) => void;
}

/**
 * Hero Section - Brand Introduction
 * 
 * Displays:
 * - Main heading with primary gradient
 * - Tagline and value proposition
 * - Primary and secondary CTAs
 * - Key statistics
 * - Role-based hero image
 * - Floating decorative icons
 */
const HeroSection: React.FC<HeroSectionProps> = ({ user, onNavigate }) => {
  const { t } = useTranslation();
  
  // Scroll reveal refs
  const headingRef = useScrollReveal({ threshold: 0.2, delay: 0.1 });
  const subtitleRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const ctaRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });
  const statsRef = useScrollReveal({ threshold: 0.2, delay: 0.4 });
  const imageRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });

  const getHeroImage = () => {
    const defaultImg = imgArt;
    if (!user) return defaultImg;
    if (user.role === 'admin') return defaultImg;
    if (user.role === 'curator') return imgCurator;
    if (user.role === 'student') return imgStudent;
    return defaultImg;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Main Heading with Primary Gradient */}
            <h1 
              ref={headingRef}
              className="scroll-reveal-fade-up text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] mb-6 md:mb-8 text-slate-900 dark:text-white"
            >
              {t('hero.title')} <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="scroll-reveal-fade-up text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
            >
              {t('hero.description')}
            </p>

            {/* CTA Buttons - 3D Style */}
            <div 
              ref={ctaRef}
              className="scroll-reveal-fade-up flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              <Button3D
                variant="primary"
                className="py-4 px-8 text-lg"
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('team');
                  } else {
                    document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <ArrowRight className="w-5 h-5" />
                {t('hero.cta_primary')}
              </Button3D>
              <Button3D
                variant="secondary"
                className="py-4 px-8 text-lg"
              >
                {t('hero.cta_secondary')}
              </Button3D>
            </div>

            {/* Stats with Secondary Color */}
            <div 
              ref={statsRef}
              className="scroll-reveal-fade-up mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex gap-8 justify-center lg:justify-start"
            >
              <div>
                <p className="text-2xl md:text-3xl font-black text-emerald-600 dark:text-emerald-400 stats-number">{t('hero.stats.students_count')}</p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">{t('hero.stats.students')}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400 stats-number">{t('hero.stats.curators_count')}</p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">{t('hero.stats.curators')}</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-amber-600 dark:text-amber-400 stats-number">{t('hero.stats.lessons_count')}</p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">{t('hero.stats.lessons')}</p>
              </div>
            </div>
          </div>

          {/* Right Image with Orbiting Icons */}
          <div 
            ref={imageRef}
            className="scroll-reveal-scale relative mt-4 lg:mt-0 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            {/* Orbiting Container */}
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              {/* Orbit Rings - Visual Guide */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute inset-8 rounded-full border border-indigo-500/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-16 rounded-full border border-purple-500/10 animate-spin" style={{ animationDuration: '25s' }}></div>

              {/* Center Image Card */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Card3D 
                  borderColor="rgb(79, 70, 229)"
                  shadowColor="rgb(168, 85, 247)"
                  className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden"
                >
                  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900 rounded-2xl overflow-hidden">
                    <img
                      src={getHeroImage()}
                      alt="Buddy System"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                </Card3D>
              </div>

              {/* Orbiting Icons */}
              {/* Icon 1 - Top (Users/Community) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 animate-spin" style={{ animationDuration: '8s' }}>
                <div className="relative w-96 h-96 flex items-start justify-center">
                  <div className="absolute top-0">
                    <BuddyIcon variant="primary" size="lg">
                      <Users className="w-6 h-6 text-white" />
                    </BuddyIcon>
                  </div>
                </div>
              </div>

              {/* Icon 2 - Right (Learning) */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
                <div className="relative w-96 h-96 flex items-center justify-end">
                  <div className="absolute right-0">
                    <BuddyIcon variant="primary" size="lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </BuddyIcon>
                  </div>
                </div>
              </div>

              {/* Icon 3 - Bottom (Goals) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-spin" style={{ animationDuration: '12s' }}>
                <div className="relative w-96 h-96 flex items-end justify-center">
                  <div className="absolute bottom-0">
                    <BuddyIcon variant="primary" size="lg">
                      <Target className="w-6 h-6 text-white" />
                    </BuddyIcon>
                  </div>
                </div>
              </div>

              {/* Icon 4 - Left (Achievement) */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 animate-spin" style={{ animationDuration: '9s', animationDirection: 'reverse' }}>
                <div className="relative w-96 h-96 flex items-center justify-start">
                  <div className="absolute left-0">
                    <BuddyIcon variant="primary" size="lg">
                      <Award className="w-6 h-6 text-white" />
                    </BuddyIcon>
                  </div>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute -bottom-24 left-0 right-0 text-center">
                <p className="text-lg md:text-xl font-black text-white mb-3">
                  Buddy Guruhlar
                </p>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

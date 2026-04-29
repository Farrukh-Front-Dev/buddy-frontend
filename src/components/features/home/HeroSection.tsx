import React from 'react';
import { ArrowRight, Zap, Heart, Sparkles } from 'lucide-react';
import { UserData } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import BuddyCard from '../../common/BuddyCard/BuddyCard';
import BuddyIcon from '../../common/BuddyIcon/BuddyIcon';
import Button3D from '../../common/Button3D/Button3D';
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
            {/* Badge with Primary Color */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6 md:mb-8 border border-indigo-200 dark:border-indigo-700">
              <Heart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {t('hero.badge')}
              </span>
            </div>

            {/* Main Heading with Primary Gradient */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] mb-6 md:mb-8 text-slate-900 dark:text-white">
              {t('hero.title')} <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {t('hero.subtitle')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
              {t('hero.description')}
            </p>

            {/* CTA Buttons - 3D Style */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6">
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
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex gap-8 justify-center lg:justify-start">
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

          {/* Right Image */}
          <div className="relative mt-4 lg:mt-0 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
            <BuddyCard variant="elevated" className="p-4 md:p-6 overflow-hidden">
              <div className="relative w-full aspect-square flex items-center justify-center bg-gradient-to-br from-indigo-50 to-emerald-50 dark:from-indigo-900/20 dark:to-emerald-900/20 rounded-2xl overflow-hidden">
                <img
                  src={getHeroImage()}
                  alt="Buddy System"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Bottom Info */}
              <div className="mt-6 text-center">
                <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3">
                  Buddy Guruhlar
                </p>
                <div className="flex justify-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-amber-500"></div>
                  ))}
                </div>
              </div>
            </BuddyCard>

            {/* Floating Icons with Different Colors */}
            <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 animate-bounce">
              <BuddyIcon variant="secondary" size="lg">
                <Zap className="w-8 h-8 text-white" />
              </BuddyIcon>
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 animate-pulse">
              <BuddyIcon variant="accent" size="lg">
                <Heart className="w-8 h-8 text-white" />
              </BuddyIcon>
            </div>
            <div className="absolute top-1/2 -right-8 md:-right-16 hidden lg:block">
              <BuddyIcon variant="primary" size="md">
                <Sparkles className="w-6 h-6 text-white" />
              </BuddyIcon>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

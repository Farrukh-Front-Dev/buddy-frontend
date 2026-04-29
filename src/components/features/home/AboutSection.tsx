import React from 'react';
import { Heart, Lightbulb, MessageSquare, Lock, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import BuddyCard from '../../common/BuddyCard/BuddyCard';
import Card3D from '../../common/Card3D/Card3D';
import Button3D from '../../common/Button3D/Button3D';
import Icon3D from '../../common/Icon3D/Icon3D';

interface AboutSectionProps {
  isRegistrationOpen?: boolean;
  onAuthNavigate?: (mode: 'login' | 'signup') => void;
}

/**
 * About Section - Platform Mission & Values
 * 
 * Displays:
 * - Platform story and vision
 * - Key statistics
 * - Mission, values, and communication principles
 * - Call-to-action for registration
 */
const AboutSection: React.FC<AboutSectionProps> = ({
  isRegistrationOpen = true,
  onAuthNavigate,
}) => {
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16 md:mb-24 lg:mb-32">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge with Secondary Color */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6 border border-emerald-200 dark:border-emerald-700">
              <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {t('about.badge')}
              </span>
            </div>

            {/* Heading with Secondary Gradient */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-slate-900 dark:text-white leading-tight">
              {t('about.title')} <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('about.title_highlight')}
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              {t('about.description')}
            </p>

            {/* Stats with Primary & Secondary Colors */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 max-w-xs sm:max-w-sm mx-auto lg:mx-0">
              <Card3D className="p-4 md:p-6 text-center">
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 stats-number">
                  {t('about.stats.graduates_count')}
                </p>
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  {t('about.stats.graduates')}
                </p>
              </Card3D>
              <Card3D className="p-4 md:p-6 text-center">
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2 stats-number">
                  {t('about.stats.curators_count')}
                </p>
                <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                  {t('about.stats.curators')}
                </p>
              </Card3D>
            </div>

            {/* CTA */}
            {isRegistrationOpen ? (
              <Button3D
                variant="primary"
                fullWidth
                onClick={() => onAuthNavigate?.('signup')}
              >
                <ArrowRight className="w-5 h-5" />
                {t('about.cta')}
              </Button3D>
            ) : (
              <div className="flex items-center justify-center lg:justify-start gap-3 text-slate-500 font-semibold italic">
                <Lock className="w-5 h-5" />
                <span>{t('about.registration_closed')}</span>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <BuddyCard variant="elevated" className="p-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
                alt="Our Vision"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                  <Heart className="w-8 h-8 md:w-12 md:h-12 text-white fill-white" />
                </div>
              </div>
            </BuddyCard>
          </div>
        </div>

        {/* Mission Cards with All Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: t('about.mission'),
              desc: t('about.mission_desc'),
              icon: Lightbulb,
              variant: 'primary' as const,
            },
            {
              title: t('about.friendship'),
              desc: t('about.friendship_desc'),
              icon: Heart,
              variant: 'secondary' as const,
            },
            {
              title: t('about.communication'),
              desc: t('about.communication_desc'),
              icon: MessageSquare,
              variant: 'accent' as const,
            },
          ].map((card, i) => (
            <Card3D key={i} className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <Icon3D variant={card.variant} size="md">
                  <card.icon className="w-6 h-6 text-white" />
                </Icon3D>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

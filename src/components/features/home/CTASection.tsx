import React from 'react';
import { Rocket, ArrowRight, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import Card3D from '../../common/Card3D/Card3D';
import Button3D from '../../common/Button3D/Button3D';
import Icon3D from '../../common/Icon3D/Icon3D';

interface CTASectionProps {
  isRegistrationOpen?: boolean;
  onNavigate?: (page: string) => void;
  onAuthNavigate?: (mode: 'login' | 'signup') => void;
}

/**
 * Call-to-Action Section - Final Engagement
 * 
 * Displays:
 * - Primary call-to-action message
 * - Navigation buttons to team and registration
 * - Platform statistics and growth metrics
 * - Engagement indicators
 */
const CTASection: React.FC<CTASectionProps> = ({
  isRegistrationOpen = true,
  onNavigate,
  onAuthNavigate,
}) => {
  const { t } = useTranslation('home');
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';
  
  // Scroll reveal refs
  const containerRef = useScrollReveal({ threshold: 0.2, delay: 0.1 });
  const iconRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const headingRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });
  const descRef = useScrollReveal({ threshold: 0.2, delay: 0.4 });
  const buttonsRef = useScrollReveal({ threshold: 0.2, delay: 0.5 });
  const statsRef = useScrollReveal({ threshold: 0.2, delay: 0.6 });

  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card3D 
          borderColor={borderColor}
          shadowColor={shadowColor}
          className="p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          <div 
            ref={containerRef}
            className="scroll-reveal-zoom text-center relative z-10"
          >
            {/* Icon */}
            <div 
              ref={iconRef}
              className="scroll-reveal-scale flex justify-center mb-4 sm:mb-6 md:mb-8"
            >
              <Icon3D variant="primary" size="lg">
                <Rocket className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-white" />
              </Icon3D>
            </div>

            {/* Heading */}
            <h2 
              ref={headingRef}
              className="scroll-reveal-fade-up text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
            >
              {t('cta.title')}
            </h2>

            {/* Description */}
            <p 
              ref={descRef}
              className="scroll-reveal-fade-up text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              {t('cta.description')}
            </p>

            {/* Buttons */}
            <div 
              ref={buttonsRef}
              className="scroll-reveal-stagger flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16"
            >
              <Button3D
                variant="secondary"
                className="py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg font-bold"
                onClick={() => onNavigate?.('team')}
              >
                {t('cta.cta_curators')}
              </Button3D>

              {isRegistrationOpen ? (
                <Button3D
                  variant="primary"
                  className="py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg font-bold flex items-center justify-center gap-2"
                  onClick={() => onAuthNavigate?.('signup')}
                >
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  {t('cta.cta_signup')}
                </Button3D>
              ) : (
                <Button3D
                  variant="primary"
                  className="py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg font-bold"
                  onClick={() => onAuthNavigate?.('login')}
                >
                  {t('cta.cta_login')}
                </Button3D>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-8 sm:mb-10 md:mb-12"></div>

            {/* Stats Section */}
            <div ref={statsRef} className="scroll-reveal-fade-up">
              <p className="text-xs sm:text-sm md:text-base font-bold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6 md:mb-8">
                {t('cta.stats_title')}
              </p>
              <div className="scroll-reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {/* Students Stat */}
                <Card3D 
                  borderColor={borderColor}
                  shadowColor={shadowColor}
                  className="p-4 sm:p-5 md:p-6"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-indigo-400 stats-number mb-1 sm:mb-2">
                    {t('cta.stats.students_count')}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider">
                    {t('cta.stats.students')}
                  </p>
                </Card3D>

                {/* Curators Stat */}
                <Card3D 
                  borderColor={borderColor}
                  shadowColor={shadowColor}
                  className="p-4 sm:p-5 md:p-6"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-purple-400 stats-number mb-1 sm:mb-2">
                    {t('cta.stats.curators_count')}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider">
                    {t('cta.stats.curators')}
                  </p>
                </Card3D>

                {/* Lessons Stat */}
                <Card3D 
                  borderColor={borderColor}
                  shadowColor={shadowColor}
                  className="p-4 sm:p-5 md:p-6"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-indigo-300 stats-number mb-1 sm:mb-2">
                    {t('cta.stats.lessons_count')}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 font-bold uppercase tracking-wider">
                    {t('cta.stats.lessons')}
                  </p>
                </Card3D>
              </div>

              {/* Growth Indicator */}
              <div className="mt-6 sm:mt-8 md:mt-10 flex items-center justify-center gap-2 text-indigo-400 font-bold text-sm sm:text-base md:text-lg">
                <TrendingUp className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
                <span>{t('cta.growth')}</span>
              </div>
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
};

export default CTASection;

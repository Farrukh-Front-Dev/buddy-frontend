import React from 'react';
import { Lightbulb, MessageSquare, Lock, ArrowRight, Users } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
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
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';
  
  // Scroll reveal refs
  const headingRef = useScrollReveal({ threshold: 0.2, delay: 0.1 });
  const descRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const statsRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });
  const ctaRef = useScrollReveal({ threshold: 0.2, delay: 0.4 });
  const imageRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const cardsRef = useScrollReveal({ threshold: 0.1, delay: 0.1 });

  return (
    <section className="py-16 sm:py-20 md:py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center mb-16 sm:mb-20 md:mb-28 lg:mb-36">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Heading with Gradient */}
            <h2 
              ref={headingRef}
              className="scroll-reveal-fade-right text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-white"
            >
              {t('about.title')} <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t('about.title_highlight')}
              </span>
            </h2>

            {/* Description */}
            <p 
              ref={descRef}
              className="scroll-reveal-fade-right text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 font-medium"
            >
              {t('about.description')}
            </p>

            {/* Stats Grid */}
            <div 
              ref={statsRef}
              className="scroll-reveal-stagger grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-sm mx-auto lg:mx-0"
            >
              <Card3D 
                borderColor={borderColor}
                shadowColor={shadowColor}
                className="p-4 sm:p-5 md:p-6 text-center"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-indigo-400 stats-number mb-1 sm:mb-2">
                  {t('about.stats.graduates_count')}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {t('about.stats.graduates')}
                </p>
              </Card3D>
              <Card3D 
                borderColor={borderColor}
                shadowColor={shadowColor}
                className="p-4 sm:p-5 md:p-6 text-center"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-purple-400 stats-number mb-1 sm:mb-2">
                  {t('about.stats.curators_count')}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {t('about.stats.curators')}
                </p>
              </Card3D>
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="scroll-reveal-fade-right">
              {isRegistrationOpen ? (
                <Button3D
                  variant="primary"
                  className="w-full sm:w-auto py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg font-bold"
                  onClick={() => onAuthNavigate?.('signup')}
                >
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  {t('about.cta')}
                </Button3D>
              ) : (
                <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-slate-400 font-semibold text-sm sm:text-base">
                  <Lock className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
                  <span>{t('about.registration_closed')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div 
            ref={imageRef}
            className="scroll-reveal-fade-left order-1 lg:order-2 relative"
          >
            <Card3D 
              borderColor={borderColor}
              shadowColor={shadowColor}
              className="p-0 overflow-hidden aspect-square"
            >
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
                  alt="Our Vision"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
                    <Users className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-indigo-300" />
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* Mission Cards */}
        <div 
          ref={cardsRef}
          className="scroll-reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {[
            {
              title: t('about.mission'),
              desc: t('about.mission_desc'),
              icon: Lightbulb,
            },
            {
              title: t('about.friendship'),
              desc: t('about.friendship_desc'),
              icon: Users,
            },
            {
              title: t('about.communication'),
              desc: t('about.communication_desc'),
              icon: MessageSquare,
            },
          ].map((card, i) => (
            <Card3D 
              key={i}
              borderColor={borderColor}
              shadowColor={shadowColor}
              className="p-4 sm:p-5 md:p-6 lg:p-8"
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <Icon3D variant="primary" size="md">
                  <card.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </Icon3D>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-black text-white mb-2 sm:mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
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

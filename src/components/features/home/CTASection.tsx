import React from 'react';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
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
  const { t } = useTranslation();
  return (
    <section className="py-16 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card3D className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="text-center relative z-10">
            {/* Icon with Primary Color */}
            <div className="flex justify-center mb-6">
              <Icon3D variant="primary" size="lg">
                <Zap className="w-8 h-8 text-white" />
              </Icon3D>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 md:mb-6">
              {t('cta.title')}
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
              {t('cta.description')}
            </p>

            {/* Buttons with Different Colors */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12">
              <Button3D
                variant="secondary"
                onClick={() => onNavigate?.('team')}
              >
                {t('cta.cta_curators')}
              </Button3D>

              {isRegistrationOpen ? (
                <Button3D
                  variant="primary"
                  onClick={() => onAuthNavigate?.('signup')}
                >
                  <ArrowRight className="w-5 h-5" />
                  {t('cta.cta_signup')}
                </Button3D>
              ) : (
                <Button3D
                  variant="primary"
                  onClick={() => onAuthNavigate?.('login')}
                >
                  {t('cta.cta_login')}
                </Button3D>
              )}
            </div>

            {/* Stats with All Colors */}
            <div className="pt-8 md:pt-12 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-6">
                {t('cta.stats_title')}
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {/* Primary Color */}
                <Card3D className="p-4 md:p-6">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent stats-number">
                    {t('cta.stats.students_count')}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {t('cta.stats.students')}
                  </p>
                </Card3D>

                {/* Secondary Color */}
                <Card3D className="p-4 md:p-6">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent stats-number">
                    {t('cta.stats.curators_count')}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {t('cta.stats.curators')}
                  </p>
                </Card3D>

                {/* Accent Color */}
                <Card3D className="p-4 md:p-6">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent stats-number">
                    {t('cta.stats.lessons_count')}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {t('cta.stats.lessons')}
                  </p>
                </Card3D>
              </div>

              {/* Growth Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <TrendingUp className="w-5 h-5" />
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

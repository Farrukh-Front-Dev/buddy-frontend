import React from 'react';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';
import BuddyCard from '../../common/BuddyCard/BuddyCard';
import BuddyButton from '../../common/BuddyButton/BuddyButton';
import BuddyIcon from '../../common/BuddyIcon/BuddyIcon';

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
  return (
    <section className="py-16 md:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BuddyCard variant="elevated" className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="text-center relative z-10">
            {/* Icon with Primary Color */}
            <div className="flex justify-center mb-6">
              <BuddyIcon variant="primary" size="lg">
                <Zap className="w-8 h-8 text-white" />
              </BuddyIcon>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 md:mb-6">
              Tayyormisiz?
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto font-medium">
              Bizning jamoa va kuratorlar ish rejasi bilan tanishish uchun bo'limlarga o'ting. Do'stlik orqali o'zini rivojlantirish vaqti keldi!
            </p>

            {/* Buttons with Different Colors */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-12">
              <BuddyButton
                variant="secondary"
                size="lg"
                onClick={() => onNavigate?.('team')}
              >
                Kuratorlarni Ko'rish
              </BuddyButton>

              {isRegistrationOpen ? (
                <BuddyButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => onAuthNavigate?.('signup')}
                >
                  O'quvchi Bo'lish
                </BuddyButton>
              ) : (
                <BuddyButton
                  variant="primary"
                  size="lg"
                  onClick={() => onAuthNavigate?.('login')}
                >
                  Tizimga Kirish
                </BuddyButton>
              )}
            </div>

            {/* Stats with All Colors */}
            <div className="pt-8 md:pt-12 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-6">
                Buddy Statistikasi
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                {/* Primary Color */}
                <div className="p-4 md:p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    150+
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    O'quvchilar
                  </p>
                </div>

                {/* Secondary Color */}
                <div className="p-4 md:p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    12
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Kuratorlar
                  </p>
                </div>

                {/* Accent Color */}
                <div className="p-4 md:p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/50">
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    500+
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Mashg'ulotlar
                  </p>
                </div>
              </div>

              {/* Growth Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <TrendingUp className="w-5 h-5" />
                <span>Har oyda 20% o'sish</span>
              </div>
            </div>
          </div>
        </BuddyCard>
      </div>
    </section>
  );
};

export default CTASection;

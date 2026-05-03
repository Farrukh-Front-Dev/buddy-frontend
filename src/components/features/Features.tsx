import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { FEATURES_DATA } from '../../config/featuresData';
import Card3D from '../common/Card3D/Card3D';
import Icon3D from '../common/Icon3D/Icon3D';

/**
 * Features Section - Platform Strengths
 * 
 * Displays:
 * - Section heading with gradient
 * - Feature cards with icons
 * - Hover animations and 3D styling
 * - Fully responsive grid layout
 * - Multi-language support (UZ, RU, EN)
 */
const Features: React.FC = () => {
  const { t } = useTranslation();
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <section id="features" className="py-16 sm:py-20 md:py-28 lg:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-white">
            {t('features.title')} <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t('features.title_highlight')}
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('features.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature, idx) => (
            <FeatureCard
              key={`feature-${idx}`}
              icon={feature.icon}
              title={t(`features.items.${feature.key}.title`)}
              description={t(`features.items.${feature.key}.description`)}
              shadowColor={shadowColor}
              borderColor={borderColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Reusable Feature Card Component
 * 
 * Props:
 * - icon: React element for the feature icon
 * - title: Feature title
 * - description: Feature description
 * - shadowColor: 3D shadow color
 * - borderColor: 3D border color
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  shadowColor: string;
  borderColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  shadowColor,
  borderColor,
}) => {
  return (
    <Card3D
      borderColor={borderColor}
      shadowColor={shadowColor}
      className="p-4 sm:p-5 md:p-6 lg:p-8 group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
        {/* Icon Container */}
        <div className="flex items-start">
          <Icon3D variant="primary" size="md">
            {React.isValidElement(icon) && React.cloneElement(icon, {
              className: 'w-5 sm:w-6 h-5 sm:h-6 text-white',
            } as any)}
          </Icon3D>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-black text-white mb-2 sm:mb-3 leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </Card3D>
  );
};

export default Features;

import React from 'react';
import BuddyCard from '../BuddyCard/BuddyCard';
import BuddyButton from '../BuddyButton/BuddyButton';
import BuddyIcon from '../BuddyIcon/BuddyIcon';
import { Users, Heart, Zap, Award, ArrowRight, MessageSquare } from 'lucide-react';

/**
 * Buddy Platform - Unique Design System Examples
 * Soft, friendly, warm design for Buddy Platform
 */

// Welcome Card Example
export function WelcomeCard() {
  return (
    <BuddyCard variant="elevated">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Buddy-ga Xush Kelibsiz! 👋
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Do'stlik va hamkorlik orqali o'zini rivojlantir
          </p>
        </div>
        <BuddyIcon variant="primary" size="lg">
          <Heart className="w-8 h-8 text-white" />
        </BuddyIcon>
      </div>
      <BuddyButton fullWidth variant="primary">
        Boshlash
        <ArrowRight className="w-5 h-5" />
      </BuddyButton>
    </BuddyCard>
  );
}

// Stats Cards Example
export function StatsCards() {
  const stats = [
    {
      label: 'O\'quvchilar',
      value: '150+',
      icon: Users,
      variant: 'primary' as const,
    },
    {
      label: 'Kuratorlar',
      value: '12',
      icon: Heart,
      variant: 'secondary' as const,
    },
    {
      label: 'Mashg\'ulotlar',
      value: '500+',
      icon: Zap,
      variant: 'accent' as const,
    },
    {
      label: 'Yutuqlar',
      value: '200+',
      icon: Award,
      variant: 'danger' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <BuddyCard key={stat.label} variant="default">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <BuddyIcon variant={stat.variant} size="md">
              <stat.icon className="w-6 h-6 text-white" />
            </BuddyIcon>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            ↑ 12% bu oyda
          </div>
        </BuddyCard>
      ))}
    </div>
  );
}

// Button Variants Example
export function ButtonVariants() {
  return (
    <BuddyCard variant="filled">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Tugma Variantlari
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Primary (Asosiy)
          </p>
          <BuddyButton variant="primary">
            <Zap className="w-5 h-5" />
            Boshlash
          </BuddyButton>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Secondary (Ikkinchi)
          </p>
          <BuddyButton variant="secondary">
            <Heart className="w-5 h-5" />
            Yoqdi
          </BuddyButton>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Tertiary (Uchinchi)
          </p>
          <BuddyButton variant="tertiary">
            <MessageSquare className="w-5 h-5" />
            Izoh
          </BuddyButton>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Danger (Xavf)
          </p>
          <BuddyButton variant="danger">O'chirish</BuddyButton>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Full Width
          </p>
          <BuddyButton variant="primary" fullWidth>
            To'liq Kenglikda
          </BuddyButton>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            Sizes
          </p>
          <div className="flex gap-2">
            <BuddyButton variant="primary" size="sm">
              Kichik
            </BuddyButton>
            <BuddyButton variant="primary" size="md">
              O'rtacha
            </BuddyButton>
            <BuddyButton variant="primary" size="lg">
              Katta
            </BuddyButton>
          </div>
        </div>
      </div>
    </BuddyCard>
  );
}

// Card Variants Example
export function CardVariants() {
  return (
    <div className="space-y-6">
      <BuddyCard variant="default">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
          Default Card
        </h4>
        <p className="text-slate-600 dark:text-slate-300">
          Yumshoq soya bilan standart karta
        </p>
      </BuddyCard>

      <BuddyCard variant="elevated">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
          Elevated Card
        </h4>
        <p className="text-slate-600 dark:text-slate-300">
          Kuchli soya bilan ko'tarilgan karta
        </p>
      </BuddyCard>

      <BuddyCard variant="outlined">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
          Outlined Card
        </h4>
        <p className="text-slate-600 dark:text-slate-300">
          Chegarasi bilan karta, soyasiz
        </p>
      </BuddyCard>

      <BuddyCard variant="filled">
        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
          Filled Card
        </h4>
        <p className="text-slate-600 dark:text-slate-300">
          Fon rangi bilan to'ldirilgan karta
        </p>
      </BuddyCard>
    </div>
  );
}

// Icon Variants Example
export function IconVariants() {
  const variants = ['primary', 'secondary', 'accent', 'danger'] as const;
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;

  return (
    <BuddyCard variant="filled">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Icon Variantlari
      </h3>

      <div className="space-y-6">
        {variants.map((variant) => (
          <div key={variant}>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 capitalize">
              {variant} Variant
            </p>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <BuddyIcon key={size} variant={variant} size={size}>
                  <Heart className="w-6 h-6 text-white" />
                </BuddyIcon>
              ))}
            </div>
          </div>
        ))}
      </div>
    </BuddyCard>
  );
}

// Feature Card Example
export function FeatureCard() {
  return (
    <BuddyCard variant="elevated">
      <div className="flex gap-4 mb-4">
        <BuddyIcon variant="secondary" size="lg">
          <Zap className="w-8 h-8 text-white" />
        </BuddyIcon>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Tez O'rganish
          </h4>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Kuratorlar bilan birgalikda tez va samarali o'rganish
          </p>
        </div>
      </div>
      <BuddyButton variant="secondary" size="sm">
        Batafsil
      </BuddyButton>
    </BuddyCard>
  );
}

// Testimonial Card Example
export function TestimonialCard() {
  return (
    <BuddyCard variant="default">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
          <span className="text-white font-bold">AZ</span>
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            Aziz Zohidov
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            O'quvchi
          </p>
        </div>
      </div>
      <p className="text-slate-700 dark:text-slate-300 italic mb-4">
        "Buddy orqali men o'z maqsadlarimga erishishni o'rgandim. Kuratorlar
        juda yaxshi va do'stona!"
      </p>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400">
            ⭐
          </span>
        ))}
      </div>
    </BuddyCard>
  );
}

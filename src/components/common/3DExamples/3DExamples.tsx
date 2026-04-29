import React from 'react';
import Card3D from '../Card3D/Card3D';
import Button3D from '../Button3D/Button3D';
import Icon3D from '../Icon3D/Icon3D';
import { Users, BookOpen, Award, TrendingUp, ArrowRight, Mail, Linkedin, Github } from 'lucide-react';

/**
 * 3D Design System Examples
 * Bu faylda Buddy Platform uchun 3D komponentlarni qanday ishlatishni ko'rsatadi
 */

// Stats Card Example
export function StatsCard({ label, value, icon: Icon, variant }: any) {
  return (
    <Card3D className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {label}
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <Icon3D variant={variant} size="lg">
          <Icon className="w-6 h-6 text-white" />
        </Icon3D>
      </div>
      <div className="flex items-center text-sm text-emerald-600 dark:text-emerald-400">
        <TrendingUp className="w-4 h-4 mr-1" />
        +12% this month
      </div>
    </Card3D>
  );
}

// Action Card Example
export function ActionCard() {
  return (
    <Card3D className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Yangi Mavsum Boshlandi
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Buddy Team loyihasida yangi mavsum start oldi. Rejalaringizni belgilashni boshlang va o'z maqsadlaringizga erishin.
      </p>
      <Button3D fullWidth className="py-4 rounded-2xl text-lg">
        Boshlash
        <ArrowRight className="w-5 h-5" />
      </Button3D>
    </Card3D>
  );
}

// Student Card Example
export function StudentCard({ student }: any) {
  return (
    <Card3D className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {student.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {student.field}
          </p>
        </div>
        <Icon3D variant="primary" size="md">
          <Users className="w-6 h-6 text-white" />
        </Icon3D>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {student.bio}
      </p>

      <div className="flex gap-2">
        <Button3D variant="primary" className="flex-1">
          View Profile
        </Button3D>
        <Button3D variant="secondary" className="flex-1">
          <Mail className="w-4 h-4" />
        </Button3D>
      </div>
    </Card3D>
  );
}

// Curator Profile Card Example
export function CuratorCard({ curator }: any) {
  return (
    <Card3D className="p-6 text-center">
      <div className="mb-4">
        <img
          src={curator.avatar}
          alt={curator.name}
          className="w-20 h-20 rounded-2xl mx-auto mb-4 border-2 border-purple-600"
        />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {curator.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {curator.field}
        </p>
      </div>

      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
        {curator.bio}
      </p>

      <div className="flex justify-center gap-2 mb-6">
        <Icon3D variant="primary" size="sm">
          <Mail className="w-5 h-5 text-white" />
        </Icon3D>
        <Icon3D variant="secondary" size="sm">
          <Linkedin className="w-5 h-5 text-white" />
        </Icon3D>
        <Icon3D variant="accent" size="sm">
          <Github className="w-5 h-5 text-white" />
        </Icon3D>
      </div>

      <Button3D fullWidth variant="primary">
        Bog'lanish
      </Button3D>
    </Card3D>
  );
}

// Stats Dashboard Example
export function StatsDashboard() {
  const stats = [
    { label: "Total Students", value: "42", icon: Users, variant: "primary" as const },
    { label: "Active Curators", value: "8", icon: Users, variant: "secondary" as const },
    { label: "Completed Tasks", value: "156", icon: BookOpen, variant: "accent" as const },
    { label: "Achievements", value: "23", icon: Award, variant: "danger" as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}

// Button Variants Example
export function ButtonVariantsExample() {
  return (
    <Card3D className="p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Button Variants
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Primary
          </p>
          <Button3D variant="primary">Primary Button</Button3D>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Secondary
          </p>
          <Button3D variant="secondary">Secondary Button</Button3D>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Accent
          </p>
          <Button3D variant="accent">Accent Button</Button3D>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Full Width
          </p>
          <Button3D fullWidth variant="primary">Full Width Button</Button3D>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            With Icon
          </p>
          <Button3D variant="primary" className="gap-2">
            <ArrowRight className="w-5 h-5" />
            Next Step
          </Button3D>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Disabled
          </p>
          <Button3D disabled variant="primary">Disabled Button</Button3D>
        </div>
      </div>
    </Card3D>
  );
}

// Icon Variants Example
export function IconVariantsExample() {
  const variants = ['primary', 'secondary', 'accent', 'danger'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;

  return (
    <Card3D className="p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Icon Variants
      </h3>

      <div className="space-y-6">
        {variants.map((variant) => (
          <div key={variant}>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
              {variant}
            </p>
            <div className="flex gap-4">
              {sizes.map((size) => (
                <Icon3D key={size} variant={variant} size={size}>
                  <Users className="w-6 h-6 text-white" />
                </Icon3D>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card3D>
  );
}

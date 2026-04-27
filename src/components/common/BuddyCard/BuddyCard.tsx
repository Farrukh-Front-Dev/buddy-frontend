import React from 'react';

interface BuddyCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'accent' | 'danger';
}

const BuddyCard: React.FC<BuddyCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  color = 'primary',
}) => {
  const variantClasses = {
    default: `
      bg-white dark:bg-slate-800
      shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]
      hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      hover:-translate-y-1 transition-all duration-300
    `,
    elevated: `
      bg-white dark:bg-slate-800
      shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)]
      hover:-translate-y-2 transition-all duration-300
    `,
    outlined: `
      bg-transparent
      border-2 border-slate-200 dark:border-slate-700
      hover:border-slate-300 dark:hover:border-slate-600
      transition-all duration-300
    `,
    filled: `
      bg-slate-50 dark:bg-slate-700
      shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
      hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]
      transition-all duration-300
    `,
  };

  const colorClasses = {
    primary: 'border-indigo-200 dark:border-indigo-700',
    secondary: 'border-emerald-200 dark:border-emerald-700',
    accent: 'border-amber-200 dark:border-amber-700',
    danger: 'border-red-200 dark:border-red-700',
  };

  const baseClasses = `
    rounded-2xl p-6
    transition-all duration-300
    ${onClick ? 'cursor-pointer' : ''}
    ${variantClasses[variant]}
    ${variant === 'outlined' ? colorClasses[color] : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default BuddyCard;

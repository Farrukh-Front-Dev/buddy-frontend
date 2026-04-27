import React from 'react';
import { Loader2 } from 'lucide-react';

interface BuddyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const BuddyButton: React.FC<BuddyButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-500 to-purple-500
      hover:from-indigo-600 hover:to-purple-600
      text-white
      shadow-[0_4px_20px_rgba(79,70,229,0.3)]
      hover:shadow-[0_8px_32px_rgba(79,70,229,0.4)]
    `,
    secondary: `
      bg-gradient-to-r from-emerald-500 to-teal-500
      hover:from-emerald-600 hover:to-teal-600
      text-white
      shadow-[0_4px_20px_rgba(16,185,129,0.3)]
      hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)]
    `,
    tertiary: `
      bg-slate-100 dark:bg-slate-700
      hover:bg-slate-200 dark:hover:bg-slate-600
      text-slate-900 dark:text-white
      border border-slate-200 dark:border-slate-600
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-rose-500
      hover:from-red-600 hover:to-rose-600
      text-white
      shadow-[0_4px_20px_rgba(239,68,68,0.3)]
      hover:shadow-[0_8px_32px_rgba(239,68,68,0.4)]
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    rounded-xl font-semibold
    transition-all duration-300 ease-out
    hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    flex items-center justify-center gap-2
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default BuddyButton;

import React from 'react';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = 'solid',
  color = 'indigo',
  size = 'md',
  fullWidth = false,
  icon,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const colorClasses = {
    indigo: {
      solid: 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white',
      outline: 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10',
      ghost: 'text-indigo-400 hover:bg-indigo-500/10',
    },
    emerald: {
      solid: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white',
      outline: 'border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10',
      ghost: 'text-emerald-400 hover:bg-emerald-500/10',
    },
    rose: {
      solid: 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white',
      outline: 'border-2 border-rose-500 text-rose-400 hover:bg-rose-500/10',
      ghost: 'text-rose-400 hover:bg-rose-500/10',
    },
    amber: {
      solid: 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white',
      outline: 'border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10',
      ghost: 'text-amber-400 hover:bg-amber-500/10',
    },
    purple: {
      solid: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white',
      outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10',
      ghost: 'text-purple-400 hover:bg-purple-500/10',
    },
  };

  const baseClasses = `
    font-bold rounded-xl transition-all duration-300 
    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${sizeClasses[size]}
    ${colorClasses[color][variant]}
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

export default PrimaryButton;

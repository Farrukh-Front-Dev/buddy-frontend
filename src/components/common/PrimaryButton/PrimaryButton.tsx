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
  borderColor?: string;
  shadowColor?: string;
  bgGradient?: string;
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
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  bgGradient = '',
  ...props
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const colorClasses = {
    indigo: {
      solid: 'bg-slate-900 hover:bg-slate-800 text-white',
      outline: 'bg-slate-900 text-white',
      ghost: 'text-white hover:bg-purple-500/10',
    },
    emerald: {
      solid: 'bg-slate-900 hover:bg-slate-800 text-white',
      outline: 'bg-slate-900 text-white',
      ghost: 'text-white hover:bg-purple-500/10',
    },
    rose: {
      solid: 'bg-slate-900 hover:bg-slate-800 text-white',
      outline: 'bg-slate-900 text-white',
      ghost: 'text-white hover:bg-purple-500/10',
    },
    amber: {
      solid: 'bg-slate-900 hover:bg-slate-800 text-white',
      outline: 'bg-slate-900 text-white',
      ghost: 'text-white hover:bg-purple-500/10',
    },
    purple: {
      solid: 'bg-slate-900 hover:bg-slate-800 text-white',
      outline: 'bg-slate-900 text-white',
      ghost: 'text-white hover:bg-purple-500/10',
    },
  };

  const baseClasses = `
    font-bold rounded-2xl transition-all duration-300 
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
      style={variant !== 'ghost' ? {
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      } : {}}
      onMouseEnter={(e) => {
        if (variant === 'ghost') return;
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        if (variant === 'ghost') return;
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${shadowColor}`;
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default PrimaryButton;

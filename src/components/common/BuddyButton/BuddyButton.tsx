import React from 'react';
import { Loader2 } from 'lucide-react';

interface BuddyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  borderColor?: string;
  shadowColor?: string;
  bgGradient?: string;
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
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  bgGradient = '',
  ...props
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
  const variantClasses = {
    primary: `
      bg-slate-900
      hover:bg-slate-800
      text-white
      active:scale-95
    `,
    secondary: `
      bg-slate-900
      hover:bg-slate-800
      text-white
      active:scale-95
    `,
    tertiary: `
      bg-slate-900
      hover:bg-slate-800
      text-white
      active:scale-95
    `,
    danger: `
      bg-slate-900
      hover:bg-slate-800
      text-white
      active:scale-95
    `,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const gradient = bgGradient || variantClasses[variant];

  const baseClasses = `
    rounded-2xl font-semibold
    transition-all duration-300 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${sizeClasses[size]}
    ${gradient}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      className={baseClasses}
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
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

export default BuddyButton;

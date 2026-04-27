import React from 'react';
import { Loader2 } from 'lucide-react';

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gradient' | 'white' | 'outline';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button3D: React.FC<Button3DProps> = ({
  children,
  variant = 'gradient',
  fullWidth = false,
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}) => {
  const variantClasses = {
    gradient: `
      bg-gradient-to-br from-[#38C9E6] to-[#43E8A0] text-white
      hover:from-[#2eb8d5] hover:to-[#32d78f]
    `,
    white: `
      bg-white dark:bg-[#2A3442] text-gray-900 dark:text-white
      hover:bg-gray-50 dark:hover:bg-[#34495E]
    `,
    outline: `
      bg-transparent border-2 border-gray-900 dark:border-gray-600
      text-gray-900 dark:text-white
      hover:bg-gray-100 dark:hover:bg-gray-800
    `,
  };

  const baseClasses = `
    rounded-2xl px-6 py-3 font-semibold text-lg
    border-2 border-gray-900 dark:border-gray-700
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
    transition-all duration-200 ease-out
    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
    hover:translate-x-[2px] hover:translate-y-[2px]
    active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    ${fullWidth ? 'w-full' : ''}
    ${variantClasses[variant]}
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

export default Button3D;

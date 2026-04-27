import React from 'react';

interface BuddyIconProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  className?: string;
}

const BuddyIcon: React.FC<BuddyIconProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    secondary: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    accent: 'bg-gradient-to-br from-amber-400 to-orange-500',
    danger: 'bg-gradient-to-br from-red-400 to-rose-500',
  };

  const baseClasses = `
    rounded-xl flex items-center justify-center
    shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]
    transition-all duration-300
    hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]
    hover:scale-110 hover:-translate-y-1
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default BuddyIcon;

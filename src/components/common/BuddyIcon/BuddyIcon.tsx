import React from 'react';

interface BuddyIconProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  className?: string;
  borderColor?: string;
  shadowColor?: string;
  bgGradient?: string;
}

const BuddyIcon: React.FC<BuddyIconProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  className = '',
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  bgGradient = '',
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
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

  const gradient = bgGradient || variantClasses[variant];

  const baseClasses = `
    rounded-2xl flex items-center justify-center
    transition-all duration-300
    hover:translate-x-[2px] hover:translate-y-[2px]
    ${sizeClasses[size]}
    ${gradient}
    ${className}
  `;

  return (
    <div 
      className={baseClasses}
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${shadowColor}`;
      }}
    >
      {children}
    </div>
  );
};

export default BuddyIcon;

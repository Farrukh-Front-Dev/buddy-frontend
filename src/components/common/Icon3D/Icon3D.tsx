import React from 'react';

interface Icon3DProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  borderColor?: string;
  shadowColor?: string;
  bgGradient?: string;
}

const Icon3D: React.FC<Icon3DProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  bgGradient = '',
}) => {
  const gradientClasses = {
    primary: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    secondary: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    accent: 'bg-gradient-to-br from-amber-400 to-orange-500',
    danger: 'bg-gradient-to-br from-red-500 to-rose-500',
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const gradient = bgGradient || gradientClasses[variant];
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${gradient}
        rounded-2xl
        flex items-center justify-center
        ${className}
      `}
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
    >
      {children}
    </div>
  );
};

export default Icon3D;

import React from 'react';

interface Icon3DProps {
  children: React.ReactNode;
  gradient?: 'indigo-purple' | 'emerald-teal' | 'amber-orange' | 'red-rose';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Icon3D: React.FC<Icon3DProps> = ({
  children,
  gradient = 'indigo-purple',
  size = 'md',
  className = '',
}) => {
  const gradientClasses = {
    'indigo-purple': 'bg-gradient-to-br from-indigo-600 to-purple-600',
    'emerald-teal': 'bg-gradient-to-br from-emerald-500 to-teal-500',
    'amber-orange': 'bg-gradient-to-br from-amber-400 to-orange-500',
    'red-rose': 'bg-gradient-to-br from-red-500 to-rose-500',
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${gradientClasses[gradient]}
        rounded-2xl
        flex items-center justify-center
        border-2 border-gray-900 dark:border-gray-700
        shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
        dark:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Icon3D;

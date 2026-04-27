import React from 'react';

interface Icon3DProps {
  children: React.ReactNode;
  gradient?: 'cyan-blue' | 'pink-red' | 'purple-indigo' | 'green-emerald';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Icon3D: React.FC<Icon3DProps> = ({
  children,
  gradient = 'cyan-blue',
  size = 'md',
  className = '',
}) => {
  const gradientClasses = {
    'cyan-blue': 'bg-gradient-to-br from-cyan-400 to-blue-500',
    'pink-red': 'bg-gradient-to-br from-pink-400 to-red-500',
    'purple-indigo': 'bg-gradient-to-br from-purple-400 to-indigo-500',
    'green-emerald': 'bg-gradient-to-br from-green-400 to-emerald-500',
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const baseClasses = `
    rounded-2xl flex items-center justify-center
    border-2 border-gray-900 dark:border-gray-700
    shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]
    transition-all duration-200 ease-out
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)]
    hover:translate-x-[1px] hover:translate-y-[1px]
    ${sizeClasses[size]}
    ${gradientClasses[gradient]}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default Icon3D;

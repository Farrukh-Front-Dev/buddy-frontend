import React from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
}) => {
  const baseClasses = `
    bg-white dark:bg-[#2A3442] rounded-3xl p-6
    border-2 border-gray-900 dark:border-gray-700
    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
    transition-all duration-200 ease-out
    ${hover ? 'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card3D;

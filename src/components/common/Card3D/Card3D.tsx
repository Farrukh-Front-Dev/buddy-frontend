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
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-[#1a1a2e] 
        rounded-3xl 
        border-2 border-indigo-600
        ${hover ? 'hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer' : ''}
        transition-all duration-200
        ${className}
      `}
      style={{
        boxShadow: '4px 4px 0px 0px rgb(79, 70, 229)',
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(79, 70, 229)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(79, 70, 229)';
      }}
    >
      {children}
    </div>
  );
};

export default Card3D;

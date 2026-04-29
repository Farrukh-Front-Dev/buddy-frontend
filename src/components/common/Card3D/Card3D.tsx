import React from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  borderColor?: string;
  shadowColor?: string;
  bgColor?: string;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  onClick,
  hover = true,
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  bgColor = '',
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';

  return (
    <div
      onClick={onClick}
      className={`
        ${bgColor || 'bg-slate-900'}
        rounded-3xl 
        ${hover ? 'hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer' : ''}
        transition-all duration-200
        ${className}
      `}
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
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

export default Card3D;

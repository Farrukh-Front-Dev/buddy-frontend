import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
  onClick?: () => void;
  borderColor?: string;
  shadowColor?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  accent,
  onClick,
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
  const baseClasses = `
    bg-slate-900 border-2
    rounded-2xl transition-all duration-300
    ${hover ? 'hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div 
      className={baseClasses} 
      onClick={onClick}
      style={{
        borderColor: finalBorderColor,
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

export default GlassCard;

import React from 'react';

interface BuddyCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  color?: 'primary' | 'secondary' | 'accent' | 'danger';
  borderColor?: string;
  shadowColor?: string;
  bgColor?: string;
}

const BuddyCard: React.FC<BuddyCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
  bgColor = '',
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
  const variantClasses = {
    default: `
      ${bgColor || 'bg-slate-900'}
      border-2
      shadow-[4px_4px_0px_0px_rgb(168,85,247)]
      hover:shadow-[2px_2px_0px_0px_rgb(168,85,247)]
      hover:translate-x-[2px] hover:translate-y-[2px]
      transition-all duration-300
    `,
    elevated: `
      ${bgColor || 'bg-slate-900'}
      border-2
      shadow-[4px_4px_0px_0px_rgb(168,85,247)]
      hover:shadow-[2px_2px_0px_0px_rgb(168,85,247)]
      hover:translate-x-[2px] hover:translate-y-[2px]
      transition-all duration-300
    `,
    outlined: `
      bg-transparent
      border-2
      shadow-[4px_4px_0px_0px_rgb(168,85,247)]
      hover:shadow-[2px_2px_0px_0px_rgb(168,85,247)]
      hover:translate-x-[2px] hover:translate-y-[2px]
      transition-all duration-300
    `,
    filled: `
      ${bgColor || 'bg-slate-800'}
      border-2
      shadow-[4px_4px_0px_0px_rgb(168,85,247)]
      hover:shadow-[2px_2px_0px_0px_rgb(168,85,247)]
      hover:translate-x-[2px] hover:translate-y-[2px]
      transition-all duration-300
    `,
  };

  const baseClasses = `
    rounded-2xl p-6
    transition-all duration-300
    ${onClick ? 'cursor-pointer' : ''}
    ${variantClasses[variant]}
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
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${shadowColor}`;
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      {children}
    </div>
  );
};

export default BuddyCard;

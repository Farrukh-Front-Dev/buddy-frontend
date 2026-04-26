import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: 'indigo' | 'emerald' | 'red' | 'amber' | 'purple';
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  accent,
  onClick,
}) => {
  const accentColors = {
    indigo: 'border-indigo-500/20 hover:border-indigo-500/40',
    emerald: 'border-emerald-500/20 hover:border-emerald-500/40',
    red: 'border-red-500/20 hover:border-red-500/40',
    amber: 'border-amber-500/20 hover:border-amber-500/40',
    purple: 'border-purple-500/20 hover:border-purple-500/40',
  };

  const baseClasses = 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl';
  const hoverClasses = hover ? 'hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer' : '';
  const accentClass = accent ? accentColors[accent] : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${accentClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;

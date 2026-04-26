import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accent?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
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
    indigo: 'border-indigo-500/30 hover:border-indigo-500/50',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/50',
    rose: 'border-rose-500/30 hover:border-rose-500/50',
    amber: 'border-amber-500/30 hover:border-amber-500/50',
    purple: 'border-purple-500/30 hover:border-purple-500/50',
  };

  const baseClasses = `
    bg-white/5 backdrop-blur-xl border border-white/10
    rounded-2xl transition-all duration-300
    ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 cursor-pointer' : ''}
    ${accent ? accentColors[accent] : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default GlassCard;

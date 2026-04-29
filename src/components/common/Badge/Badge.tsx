import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  status?: 'active' | 'pending' | 'inactive' | 'completed';
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  dot?: boolean;
  borderColor?: string;
  shadowColor?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  status,
  color,
  size = 'md',
  icon,
  dot = false,
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-300',
    pending: 'bg-amber-500/20 text-amber-300',
    inactive: 'bg-slate-500/20 text-slate-300',
    completed: 'bg-blue-500/20 text-blue-300',
  };

  const colorClasses = {
    indigo: 'bg-indigo-500/20 text-indigo-300',
    emerald: 'bg-emerald-500/20 text-emerald-300',
    rose: 'bg-rose-500/20 text-rose-300',
    amber: 'bg-amber-500/20 text-amber-300',
    purple: 'bg-purple-500/20 text-purple-300',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const bgColor = status ? statusColors[status] : color ? colorClasses[color] : colorClasses.indigo;

  const dotColors = {
    active: 'bg-emerald-500',
    pending: 'bg-amber-500',
    inactive: 'bg-slate-500',
    completed: 'bg-blue-500',
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 rounded-full font-semibold ${sizeClasses[size]} ${bgColor} px-4 py-2`}
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `2px 2px 0px 0px ${shadowColor}`,
      }}
    >
      {dot && status && <div className={`w-2 h-2 rounded-full ${dotColors[status]}`} />}
      {icon}
      {children}
    </div>
  );
};

export default Badge;

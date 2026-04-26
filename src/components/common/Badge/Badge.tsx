import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  status?: 'active' | 'pending' | 'inactive' | 'completed';
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  status,
  color,
  size = 'md',
  icon,
  dot = false,
}) => {
  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    pending: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    inactive: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    completed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };

  const colorClasses = {
    indigo: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    rose: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
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
    <div className={`inline-flex items-center gap-2 border rounded-full font-semibold ${sizeClasses[size]} ${bgColor}`}>
      {dot && status && <div className={`w-2 h-2 rounded-full ${dotColors[status]}`} />}
      {icon}
      {children}
    </div>
  );
};

export default Badge;

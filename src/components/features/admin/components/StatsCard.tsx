import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'indigo' | 'purple' | 'green' | 'orange';
  badge?: string;
  badgeIcon?: LucideIcon;
}

const colorClasses = {
  indigo: {
    border: 'rgb(79, 70, 229)',
    shadow: 'rgb(99, 102, 241)',
    iconBg: 'from-indigo-500 to-purple-600',
    badgeColor: 'text-indigo-400',
  },
  purple: {
    border: 'rgb(168, 85, 247)',
    shadow: 'rgb(192, 132, 252)',
    iconBg: 'from-purple-500 to-pink-600',
    badgeColor: 'text-purple-400',
  },
  green: {
    border: 'rgb(16, 185, 129)',
    shadow: 'rgb(52, 211, 153)',
    iconBg: 'from-emerald-500 to-teal-600',
    badgeColor: 'text-green-400',
  },
  orange: {
    border: 'rgb(245, 158, 11)',
    shadow: 'rgb(251, 191, 36)',
    iconBg: 'from-amber-500 to-orange-600',
    badgeColor: 'text-orange-400',
  }
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, badge, badgeIcon: BadgeIcon }) => {
  const classes = colorClasses[color];

  return (
    <div 
      className="bg-slate-900 rounded-2xl p-5 md:p-8 relative overflow-hidden group transition-all duration-300 border-2"
      style={{
        borderColor: classes.border,
        boxShadow: `4px 4px 0px 0px ${classes.shadow}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${classes.shadow}`;
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${classes.shadow}`;
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      {/* Glow effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${classes.iconBg} opacity-10 rounded-full blur-3xl -mr-10 -mt-10`}></div>
      
      <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
        {/* Icon with gradient */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${classes.iconBg} shadow-lg`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        
        {/* Badge */}
        {badge && (
          <div 
            className={`flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest ${classes.badgeColor} bg-slate-800 px-2 md:px-3 py-1 md:py-1.5 rounded-full border-2`}
            style={{ borderColor: classes.border }}
          >
            {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5 md:w-3 md:h-3" />}
            <span className="hidden sm:inline">{badge}</span>
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-1 md:mb-2">{value}</h3>
        <p className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-widest">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;

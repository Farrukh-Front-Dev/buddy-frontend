import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
  borderColor?: string;
  shadowColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  change,
  trend,
  color = 'indigo',
  borderColor,
  shadowColor = 'rgb(168, 85, 247)',
}) => {
  const finalBorderColor = borderColor || 'rgb(79, 70, 229)';
  const colorClasses = {
    indigo: 'from-indigo-500 to-indigo-600 text-indigo-400',
    emerald: 'from-emerald-500 to-emerald-600 text-emerald-400',
    rose: 'from-rose-500 to-rose-600 text-rose-400',
    amber: 'from-amber-500 to-amber-600 text-amber-400',
    purple: 'from-purple-500 to-purple-600 text-purple-400',
  };

  const trendColor = trend === 'up' ? 'text-emerald-400' : 'text-rose-400';

  return (
    <div 
      className="p-6 bg-slate-900 rounded-2xl hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300"
      style={{
        border: `2px solid ${finalBorderColor}`,
        boxShadow: `4px 4px 0px 0px ${shadowColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${shadowColor}`;
      }}
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} p-2.5 mb-4 text-white flex items-center justify-center`}>
        {icon}
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{value}</h3>
        {change && trend && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-xs font-bold">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

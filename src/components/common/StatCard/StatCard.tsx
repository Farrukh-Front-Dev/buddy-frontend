import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  change,
  trend,
  color = 'indigo',
}) => {
  const colorClasses = {
    indigo: 'from-indigo-500 to-indigo-600 text-indigo-400',
    emerald: 'from-emerald-500 to-emerald-600 text-emerald-400',
    rose: 'from-rose-500 to-rose-600 text-rose-400',
    amber: 'from-amber-500 to-amber-600 text-amber-400',
    purple: 'from-purple-500 to-purple-600 text-purple-400',
  };

  const trendColor = trend === 'up' ? 'text-emerald-400' : 'text-rose-400';

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} p-2.5 mb-4 text-white flex items-center justify-center`}>
        {icon}
      </div>

      <p className="text-sm text-slate-400 font-medium mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-white">{value}</h3>
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

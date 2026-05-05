import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { StudentProgress, Season } from '../../../../../types';

interface WeeklyProgressChartProps {
  allProgress: StudentProgress[];
  seasons: Season[];
  activeSeasonId: string;
}

const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ allProgress, seasons, activeSeasonId }) => {
  const activeSeason = seasons.find(s => s.id === activeSeasonId);
  const maxWeeks = (activeSeason?.durationInMonths || 3) * 4;

  const data = Array.from({ length: maxWeeks }, (_, i) => i + 1).map(week => {
    const weekData = allProgress.filter(p => p.weekNumber === week && p.seasonId === activeSeasonId);
    return {
      name: `${week}-hafta`,
      'Bajarildi': weekData.filter(p => p.status === 'Hal qilindi').length,
      'Jami': weekData.length
    };
  });

  return (
    <div 
      className="bg-slate-900 rounded-2xl p-8 transition-all duration-300 border-2"
      style={{
        borderColor: 'rgb(79, 70, 229)',
        boxShadow: '4px 4px 0px 0px rgb(99, 102, 241)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(99, 102, 241)';
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(99, 102, 241)';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-2">
        Haftalik O'sish
      </h4>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBajarildi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorJami" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
            <RechartsTooltip
              contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10', borderRadius: '1rem' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}
              labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
            />
            <Area type="monotone" dataKey="Jami" stroke="#6366f1" fillOpacity={1} fill="url(#colorJami)" strokeWidth={3} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="Bajarildi" stroke="#10b981" fillOpacity={1} fill="url(#colorBajarildi)" strokeWidth={3} activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyProgressChart;

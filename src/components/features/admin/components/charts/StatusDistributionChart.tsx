import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { StudentProgress } from '../../../../../types';

interface StatusDistributionChartProps {
  allProgress: StudentProgress[];
}

const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ allProgress }) => {
  const data = [
    { name: 'Hal qilindi', count: allProgress.filter(p => p.status === 'Hal qilindi').length, color: '#10b981' },
    { name: 'Bajarilmoqda', count: allProgress.filter(p => p.status === 'Bajarilmoqda').length, color: '#3b82f6' },
    { name: 'Kutilmoqda', count: allProgress.filter(p => p.status === 'Kutilmoqda').length, color: '#f59e0b' },
    { name: 'Bajarmadi', count: allProgress.filter(p => p.status === 'Bajarmadi').length, color: '#ef4444' },
  ];

  return (
    <div 
      className="bg-slate-900 rounded-2xl p-8 transition-all duration-300 border-2"
      style={{
        borderColor: 'rgb(16, 185, 129)',
        boxShadow: '4px 4px 0px 0px rgb(52, 211, 153)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(52, 211, 153)';
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(52, 211, 153)';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-2">
        Holatlar Taqvimi
      </h4>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
            <RechartsTooltip
              contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10', borderRadius: '1rem' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}
              labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}
              cursor={{ fill: '#ffffff05' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusDistributionChart;

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { StudentProgress } from '../../../../../types';

interface AttendancePieChartProps {
  allProgress: StudentProgress[];
}

const AttendancePieChart: React.FC<AttendancePieChartProps> = ({ allProgress }) => {
  const attendedCount = allProgress.filter(p => p.attended === true).length;
  const notAttendedCount = allProgress.filter(p => p.attended === false).length;
  const undefinedCount = allProgress.filter(p => p.attended === undefined).length;

  const data = [
    { name: 'Qatnashganlar', value: attendedCount, color: '#10b981' },
    { name: 'Qatnashmaganlar', value: notAttendedCount, color: '#ef4444' },
    { name: 'Belgilanmagan', value: undefinedCount, color: '#64748b' }
  ].filter(d => d.value > 0);

  return (
    <div 
      className="bg-slate-900 rounded-2xl p-8 transition-all duration-300 border-2"
      style={{
        borderColor: 'rgb(245, 158, 11)',
        boxShadow: '4px 4px 0px 0px rgb(251, 191, 36)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(251, 191, 36)';
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(251, 191, 36)';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-2">
        Davomat Ko'rsatkichi
      </h4>
      <div className="h-[300px] w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip
              contentStyle={{ backgroundColor: '#121214', border: '1px solid #ffffff10', borderRadius: '1rem' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}
              labelStyle={{ display: 'none' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-white">{attendedCount}</span>
          <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest mt-1">Qatnashgan</span>
        </div>
      </div>
    </div>
  );
};

export default AttendancePieChart;

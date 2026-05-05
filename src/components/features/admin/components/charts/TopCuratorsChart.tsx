import React from 'react';
import { UserData, StudentProgress } from '../../../../../types';

interface TopCuratorsChartProps {
  allUsers: UserData[];
  allProgress: StudentProgress[];
}

const TopCuratorsChart: React.FC<TopCuratorsChartProps> = ({ allUsers, allProgress }) => {
  const topCurators = allUsers
    .filter(u => u.role === 'curator')
    .map(curator => {
      const curatorProgress = allProgress.filter(p => p.curatorId === curator.id);
      const completedCount = curatorProgress.filter(p => p.status === 'Hal qilindi').length;
      const totalCount = curatorProgress.length;
      const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      return { curator, completedCount, totalCount, completionRate };
    })
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 5);

  return (
    <div 
      className="bg-slate-900 rounded-2xl p-8 transition-all duration-300 border-2"
      style={{
        borderColor: 'rgb(168, 85, 247)',
        boxShadow: '4px 4px 0px 0px rgb(192, 132, 252)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(192, 132, 252)';
        e.currentTarget.style.transform = 'translate(2px, 2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '4px 4px 0px 0px rgb(192, 132, 252)';
        e.currentTarget.style.transform = 'translate(0, 0)';
      }}
    >
      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-2">
        Eng Faol Kuratorlar
      </h4>
      <div className="space-y-4">
        {topCurators.length > 0 ? (
          topCurators.map((item, index) => (
            <div 
              key={item.curator.id} 
              className="flex flex-col p-4 rounded-xl bg-slate-800 border-2 transition-all duration-300"
              style={{
                borderColor: 'rgb(79, 70, 229)',
                boxShadow: '2px 2px 0px 0px rgb(99, 102, 241)',
              }}
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-lg"
                  >
                    #{index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-black text-white truncate break-words">{item.curator.name}</h5>
                    <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest mt-0.5">
                      {item.completedCount} ta hal qilingan
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-white">{item.completionRate}%</span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-1000 shadow-lg" 
                  style={{ width: `${item.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-500 text-sm">Kuratorlar topilmadi</div>
        )}
      </div>
    </div>
  );
};

export default TopCuratorsChart;

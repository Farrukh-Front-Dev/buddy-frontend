import React from 'react';
import { Users } from 'lucide-react';

const UsersTab: React.FC<any> = (props) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div 
        className="bg-slate-900 rounded-2xl p-12 text-center border-2 transition-all duration-300"
        style={{
          borderColor: 'rgb(245, 158, 11)',
          boxShadow: '4px 4px 0px 0px rgb(251, 191, 36)',
        }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Users Tab</h3>
        <p className="text-slate-400">Bu bo'lim hozircha ishlab chiqilmoqda...</p>
      </div>
    </div>
  );
};

export default UsersTab;

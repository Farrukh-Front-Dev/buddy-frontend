import React, { useMemo } from 'react';
import { Zap, Activity, Users, CalendarDays, Mail, Shield } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: 'stats' | 'monitoring' | 'users' | 'requests' | 'seasons' | 'messages' | 'settings';
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab }) => {
  const tabLabels = useMemo(() => ({
    stats: { 
      title: 'Statistika Markazi', 
      desc: 'Platformaning umumiy ko\'rsatkichlari va faollik tahlili.', 
      icon: <Activity className="w-4 h-4" /> 
    },
    monitoring: { 
      title: 'Global Monitoring', 
      desc: 'Haftalik o\'sish va kuratorlik natijalarini kuzatish.', 
      icon: <Activity className="w-4 h-4" /> 
    },
    users: { 
      title: 'Loyiha A\'zolari', 
      desc: 'Barcha talabalar, kuratorlar va adminlarni boshqarish jadvali.', 
      icon: <Users className="w-4 h-4" /> 
    },
    requests: { 
      title: 'Kuratorlik So\'rovlari', 
      desc: 'Yangi ro\'yxatdan o\'tgan mentorlarni ko\'rib chiqing va tasdiqlang.', 
      icon: <Zap className="w-4 h-4" /> 
    },
    seasons: { 
      title: 'Mavsumlar Boshqaruvi', 
      desc: 'O\'quv mavsumlarini yaratish, tahrirlash va faollashtirish.', 
      icon: <CalendarDays className="w-4 h-4" /> 
    },
    messages: {
      title: 'Global Xabarnomalar',
      desc: 'Barcha foydalanuvchilarga bildirishnomalar yuborish va tarix.',
      icon: <Mail className="w-4 h-4" />
    },
    settings: { 
      title: 'Tizim Sozlamalari', 
      desc: 'Platforma konfiguratsiyasi va registratsiya jarayonini boshqarish.', 
      icon: <Shield className="w-4 h-4" /> 
    }
  }), []);

  return (
    <div className="flex flex-col items-center justify-center text-center mb-12">
      {/* Badge with Buddy Design */}
      <div 
        className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 rounded-2xl mb-6 border-2 transition-all duration-300"
        style={{
          borderColor: 'rgb(168, 85, 247)',
          boxShadow: '3px 3px 0px 0px rgb(168, 85, 247)',
        }}
      >
        <Zap className="w-5 h-5 text-purple-400" />
        <span className="text-[9px] sm:text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
          Administrator Boshqaruv Markazi
        </span>
      </div>

      {/* Title with gradient */}
      <h1 className="text-2xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 break-words w-full">
        {tabLabels[activeTab].title}
      </h1>
      
      {/* Description */}
      <p className="text-slate-400 max-w-full sm:max-w-2xl text-xs sm:text-sm md:text-lg leading-relaxed font-bold mb-10 break-words w-full px-4">
        {tabLabels[activeTab].desc}
      </p>
    </div>
  );
};

export default AdminHeader;

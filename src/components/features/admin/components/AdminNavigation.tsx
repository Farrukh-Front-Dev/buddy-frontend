import React, { useMemo, useState } from 'react';
import { Activity, Users, Zap, CalendarDays, Mail, Shield, BarChart3, Menu, X, LogOut, User } from 'lucide-react';
import { Notification, UserData } from '../../../../types';

interface AdminNavigationProps {
  activeTab: 'stats' | 'monitoring' | 'users' | 'requests' | 'seasons' | 'messages' | 'settings';
  onTabChange: (tab: 'stats' | 'monitoring' | 'users' | 'requests' | 'seasons' | 'messages' | 'settings') => void;
  notifications: Notification[];
  user: UserData | null;
  onLogout: () => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ activeTab, onTabChange, notifications, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.isRead).length, 
    [notifications]
  );

  const tabs = [
    { id: 'stats' as const, label: 'Statistika', icon: BarChart3, color: 'rgb(79, 70, 229)', shadow: 'rgb(99, 102, 241)' },
    { id: 'monitoring' as const, label: 'Monitoring', icon: Activity, color: 'rgb(16, 185, 129)', shadow: 'rgb(52, 211, 153)' },
    { id: 'users' as const, label: 'Foydalanuvchilar', icon: Users, color: 'rgb(245, 158, 11)', shadow: 'rgb(251, 191, 36)' },
    { id: 'requests' as const, label: 'So\'rovlar', icon: Zap, color: 'rgb(236, 72, 153)', shadow: 'rgb(244, 114, 182)' },
    { id: 'seasons' as const, label: 'Mavsumlar', icon: CalendarDays, color: 'rgb(20, 184, 166)', shadow: 'rgb(45, 212, 191)' },
    { id: 'messages' as const, label: 'Xabarlar', icon: Mail, badge: unreadCount, color: 'rgb(99, 102, 241)', shadow: 'rgb(129, 140, 248)' },
    { id: 'settings' as const, label: 'Sozlamalar', icon: Shield, color: 'rgb(239, 68, 68)', shadow: 'rgb(248, 113, 113)' },
  ];

  const handleTabClick = (tabId: typeof activeTab) => {
    onTabChange(tabId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 rounded-xl border-2 border-indigo-500 text-white shadow-[4px_4px_0px_0px_rgb(99,102,241)] transition-all duration-300 hover:shadow-[2px_2px_0px_0px_rgb(99,102,241)] hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-slate-900 border-r-2 border-indigo-500 z-40
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Admin Panel</h2>
              <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Boshqaruv</p>
            </div>
          </div>
          
          {/* User Info */}
          {user && (
            <div 
              className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border-2 border-slate-700"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">{user.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  relative w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-black uppercase tracking-wider
                  transition-all duration-300 border-2
                  ${isActive 
                    ? 'bg-slate-800 text-white translate-x-[2px] translate-y-[2px]' 
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }
                `}
                style={{
                  borderColor: isActive ? tab.color : 'transparent',
                  boxShadow: isActive ? `2px 2px 0px 0px ${tab.shadow}` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = tab.color;
                    e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${tab.shadow}`;
                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }
                }}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <span 
                    className="min-w-[20px] h-[20px] px-1.5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse border-2"
                    style={{ borderColor: 'rgb(239, 68, 68)' }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer - Logout */}
        <div className="p-4 border-t-2 border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border-2 border-transparent hover:border-red-500 transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '2px 2px 0px 0px rgb(248, 113, 113)';
              e.currentTarget.style.transform = 'translate(2px, 2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-wider">Chiqish</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminNavigation;

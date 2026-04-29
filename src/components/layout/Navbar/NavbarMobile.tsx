import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LogIn, UserCircle } from 'lucide-react';
import { Home, Layout, Users, Mail, Activity, Zap, ShieldAlert, Calendar, Bell } from 'lucide-react';
import { Page, UserData } from '../../../types';

interface NavLink {
  name: string;
  id: Page;
  tab?: string;
  icon: React.ReactNode;
}

interface NavbarMobileProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: Page;
  user: UserData | null;
  isRegistrationOpen: boolean;
  onLinkClick: (id: Page, tab?: string) => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({
  isOpen,
  onToggle,
  currentPage,
  user,
  isRegistrationOpen,
  onLinkClick,
  onLogin,
  onSignup,
  onLogout,
}) => {
  const getNavLinks = (): NavLink[] => {
    if (!user) {
      return [
        { name: 'Asosiy', id: 'home', icon: <Home className="w-4 h-4" /> },
        { name: 'Xizmatlar', id: 'features', icon: <Layout className="w-4 h-4" /> },
        { name: 'Kuratorlar', id: 'team', icon: <Users className="w-4 h-4" /> },
        { name: 'Bog\'lanish', id: 'contact', icon: <Mail className="w-4 h-4" /> },
      ];
    }

    if (user.role === 'admin') {
      return [
        { name: 'Stats', id: 'admin', tab: 'stats', icon: <Activity className="w-4 h-4" /> },
        { name: 'Monitoring', id: 'admin', tab: 'monitoring', icon: <Zap className="w-4 h-4" /> },
        { name: 'Kuratorlar', id: 'team', icon: <Users className="w-4 h-4" /> },
        { name: 'Users', id: 'admin', tab: 'users', icon: <Users className="w-4 h-4" /> },
        { name: 'Requests', id: 'admin', tab: 'requests', icon: <ShieldAlert className="w-4 h-4" /> },
        { name: 'Seasons', id: 'admin', tab: 'seasons', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Messages', id: 'admin', tab: 'messages', icon: <Mail className="w-4 h-4" /> },
      ];
    }

    return [
      { name: 'Monitoring', id: 'dashboard', tab: 'panel', icon: <Activity className="w-4 h-4" /> },
      { name: 'Kuratorlar', id: 'team', icon: <Users className="w-4 h-4" /> },
      { name: 'Profil', id: 'dashboard', tab: 'profile', icon: <UserCircle className="w-4 h-4" /> },
      { name: 'Bildirishnomalar', id: 'dashboard', tab: 'notifications', icon: <Bell className="w-4 h-4" /> },
    ];
  };

  const navLinks = getNavLinks();
  const isActive = (link: NavLink) => {
    if (currentPage !== link.id) return false;
    if (!user || !link.tab) return true;
    const storageKey = user.role === 'admin' ? 'buddy_admin_tab' : 'buddy_dashboard_tab';
    return link.tab === localStorage.getItem(storageKey);
  };

  return (
    <>
      <div className="lg:hidden flex items-center space-x-2">
        {user && (
          <div className="flex items-center space-x-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
            <UserCircle className="w-4 h-4 text-purple-400" />
            <span className="text-[11px] font-bold text-white">{user.name}</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2.5 md:p-3 bg-white/10 rounded-xl text-white transition-colors border border-white/20 shadow-lg active:scale-90"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#0f0f12] absolute top-full left-0 right-0 m-4 py-6 px-4 border border-white/20 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4 duration-300"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={`${link.id}-${link.name}`}
                  onClick={() => {
                    onLinkClick(link.id, link.tab);
                    onToggle();
                  }}
                  className={`flex items-center space-x-4 p-5 rounded-2xl text-lg font-black tracking-tight transition-all relative ${
                    isActive(link) ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {isActive(link) && (
                    <motion.div
                      layoutId="nav-mobile-active"
                      className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/20 rounded-2xl -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={isActive(link) ? 'text-indigo-400' : 'text-slate-500'}>
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </button>
              ))}

              <div className="h-px bg-white/10 my-4 mx-2"></div>

              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    onToggle();
                  }}
                  className="w-full py-5 bg-red-500/10 text-red-400 font-black rounded-2xl border border-red-500/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Chiqish ({user.name})</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onLogin();
                      onToggle();
                    }}
                    className="py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 active:scale-95 transition-transform"
                  >
                    Kirish
                  </button>
                  {isRegistrationOpen && (
                    <button
                      onClick={() => {
                        onSignup();
                        onToggle();
                      }}
                      className="py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform"
                    >
                      Ro'yxatdan o'tish
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarMobile;

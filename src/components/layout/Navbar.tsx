import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imgArt from '../../buddy_team.jpg';
import { Menu, X, Users, Home, Layout, Mail, Zap, LogIn, LogOut, UserCircle, ShieldAlert, Bell, Activity, Calendar, ChevronDown, User } from 'lucide-react';
import { Page, UserData } from '../../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, tab?: string) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  user: UserData | null;
  onLogout: () => void;
  isRegistrationOpen?: boolean;
  unreadCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onAuthNavigate, user, onLogout, isRegistrationOpen = true, unreadCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavLinks = () => {
    if (!user) {
      return [
        { name: 'Asosiy', id: 'home' as Page, icon: <Home className="w-4 h-4" /> },
        { name: 'Xizmatlar', id: 'features' as Page, icon: <Layout className="w-4 h-4" /> },
        { name: 'Kuratorlar', id: 'team' as Page, icon: <Users className="w-4 h-4" /> },
        { name: 'Bog\'lanish', id: 'contact' as Page, icon: <Mail className="w-4 h-4" /> },
      ];
    }

    if (user.role === 'admin') {
      return [
        { name: 'Stats', id: 'admin' as Page, tab: 'stats', icon: <Activity className="w-4 h-4" /> },
        { name: 'Monitoring', id: 'admin' as Page, tab: 'monitoring', icon: <Zap className="w-4 h-4" /> },
        { name: 'Kuratorlar', id: 'team' as Page, icon: <Users className="w-4 h-4" /> },
        { name: 'Users', id: 'admin' as Page, tab: 'users', icon: <Users className="w-4 h-4" /> },
        { name: 'Requests', id: 'admin' as Page, tab: 'requests', icon: <ShieldAlert className="w-4 h-4" /> },
        { name: 'Seasons', id: 'admin' as Page, tab: 'seasons', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Messages', id: 'admin' as Page, tab: 'messages', icon: <Mail className="w-4 h-4" /> },
      ];
    }

    // Student or Curator
    return [
      { name: 'Monitoring', id: 'dashboard' as Page, tab: 'panel', icon: <Activity className="w-4 h-4" /> },
      { name: 'Kuratorlar', id: 'team' as Page, icon: <Users className="w-4 h-4" /> },
      { name: 'Profil', id: 'dashboard' as Page, tab: 'profile', icon: <UserCircle className="w-4 h-4" /> },
      { name: 'Bildirishnomalar', id: 'dashboard' as Page, tab: 'notifications', icon: <Bell className="w-4 h-4" /> },
    ];
  };

  const navLinks = getNavLinks();

  const handleLinkClick = (id: Page, tab?: string) => {
    if (tab) {
      if (id === 'admin') {
        localStorage.setItem('buddy_admin_tab', tab);
      } else if (id === 'dashboard') {
        localStorage.setItem('buddy_dashboard_tab', tab);
      }
    }
    onNavigate(id, tab);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-[#0a0a0c] border-b border-white/10 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)]' : 'bg-transparent py-4 md:py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div onClick={() => handleLinkClick('home')} className="flex items-center space-x-2 md:space-x-3 group cursor-pointer shrink-0">
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#1a1a1e] rounded-xl md:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/10 overflow-hidden">
                <img
                  src={imgArt}
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-black tracking-tighter text-white">Buddy<span className="text-purple-400">Team</span></span>
                <p className="text-[8px] md:text-[10px] text-purple-300 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] leading-none">Команды</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={`${link.id}-${link.name}`}
                  onClick={() => handleLinkClick(link.id, (link as any).tab)}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center space-x-2 relative group-nav ${
                    currentPage === link.id && (!user || !(link as any).tab || (link as any).tab === (user.role === 'admin' ? localStorage.getItem('buddy_admin_tab') : localStorage.getItem('buddy_dashboard_tab')))
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {currentPage === link.id && (!user || !(link as any).tab || (link as any).tab === (user.role === 'admin' ? localStorage.getItem('buddy_admin_tab') : localStorage.getItem('buddy_dashboard_tab'))) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  {link.icon}
                  <span>{link.name}</span>
                  {(link.id === 'dashboard' || link.id === 'admin') && unreadCount > 0 && link.name === 'Bildirishnomalar' && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}

              <div className="ml-4 pl-4 border-l border-white/10 flex items-center space-x-3">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {isProfileMenuOpen && (
                        <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsProfileMenuOpen(false)}></div>
                      )}
                      <button 
                         onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                         className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors min-w-0 cursor-pointer"
                      >
                        {user.avatar ? (
                          <img src={user.avatar} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                          <UserCircle className="w-5 h-5 text-purple-400 shrink-0" />
                        )}
                        <div className="flex flex-col min-w-0 text-left">
                          <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[120px]">{user.name || 'Foydalanuvchi'}</span>
                          <span className="text-[9px] font-black uppercase text-purple-400 tracking-tighter truncate">{user.role}</span>
                        </div>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ml-1 ${isProfileMenuOpen ? 'text-white rotate-180' : 'text-slate-400'}`} />
                      </button>

                      <AnimatePresence>
                      {isProfileMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-4 w-[320px] md:w-[360px] bg-[#1a1c23] border border-white/10 rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.9)] z-50 overflow-hidden flex flex-col"
                        >
                          {/* Yopish tugmasi Google uslubida */}
                          <div className="flex justify-end p-4 pb-0">
                             <button onClick={() => setIsProfileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                             </button>
                          </div>
                          
                          {/* Profil Info & Edit Pill */}
                          <div className="flex flex-col items-center px-6 pb-6 text-center">
                             <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-[#1a1c23] shadow-xl mb-4 relative overflow-hidden">
                               {user.avatar ? (
                                  <img src={user.avatar} className="w-full h-full object-cover" />
                               ) : (
                                  <span className="text-3xl font-black text-white">{(user.name || 'U').charAt(0).toUpperCase()}</span>
                               )}
                             </div>
                             <p className="text-[12px] text-slate-400 font-medium mb-1">{user.email}</p>
                             <h3 className="text-xl font-black text-white tracking-tight mb-5">Assalomu alaykum, {(user.name || 'Foydalanuvchi').split(' ')[0]}!</h3>
                             
                             <button onClick={() => {
                               setIsProfileMenuOpen(false);
                               handleLinkClick('dashboard', 'profile');
                             }} className="px-6 py-2.5 bg-transparent border border-white/20 hover:bg-white/5 transition-colors rounded-full text-indigo-400 font-bold text-[11px] uppercase tracking-widest shadow-sm">
                                Akkauntni boshqarish
                             </button>
                          </div>

                          <div className="h-px w-full bg-white/5"></div>

                          {/* Options List */}
                          <div className="py-2 px-4 flex flex-col gap-1 bg-[#15171e]">
                             <button onClick={() => { setIsProfileMenuOpen(false); handleLinkClick(user.role === 'admin' ? 'admin' : 'dashboard', (user.role === 'admin' ? 'settings' : 'panel')); }} className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group">
                                <ShieldAlert className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                                <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Tizim sozlamalari</span>
                             </button>
                             <button onClick={() => { setIsProfileMenuOpen(false); setShowLogoutConfirm(true); }} className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-500/10 transition-colors group">
                                <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500 transition-colors" />
                                <span className="text-sm font-bold text-red-400 group-hover:text-red-500 transition-colors">Tizimdan chiqish</span>
                             </button>
                          </div>

                          <div className="h-px w-full bg-white/5"></div>

                          {/* Footer Links */}
                          <div className="py-5 px-6 flex justify-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-black/40">
                             <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
                             <span className="text-slate-700">•</span>
                             <a href="#" className="hover:text-white transition-colors">Qoidalar</a>
                          </div>
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => onAuthNavigate('login')}
                      className="text-slate-400 hover:text-white text-sm font-bold px-4 py-2 transition-colors"
                    >
                      Kirish
                    </button>
                    {isRegistrationOpen && (
                      <button
                        onClick={() => onAuthNavigate('signup')}
                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-600/20 flex items-center space-x-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Ro'yxatdan o'tish</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="lg:hidden flex items-center space-x-2">
              {user && (
                 <div className="flex items-center space-x-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                    <UserCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-[11px] font-bold text-white">{user.name}</span>
                 </div>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 md:p-3 bg-white/10 rounded-xl text-white transition-colors border border-white/20 shadow-lg active:scale-90"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-[#0f0f12] absolute top-full left-0 right-0 m-4 py-6 px-4 border border-white/20 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={`${link.id}-${link.name}`}
                  onClick={() => handleLinkClick(link.id, (link as any).tab)}
                  className={`flex items-center space-x-4 p-5 rounded-2xl text-lg font-black tracking-tight transition-all relative ${
                    (currentPage === link.id && (!user || !(link as any).tab || (link as any).tab === (user.role === 'admin' ? localStorage.getItem('buddy_admin_tab') : localStorage.getItem('buddy_dashboard_tab')))) ? 'text-white' : 'text-slate-400'
                    }`}
                >
                  {(currentPage === link.id && (!user || !(link as any).tab || (link as any).tab === (user.role === 'admin' ? localStorage.getItem('buddy_admin_tab') : localStorage.getItem('buddy_dashboard_tab')))) && (
                    <motion.div
                      layoutId="nav-mobile-active"
                      className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/20 rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={`${currentPage === link.id ? 'text-indigo-400' : 'text-slate-500'}`}>
                    {link.icon}
                  </div>
                  <span>{link.name}</span>
                </button>
              ))}

              <div className="h-px bg-white/10 my-4 mx-2"></div>

              {user ? (
                <button
                  onClick={() => { setShowLogoutConfirm(true); setIsMenuOpen(false); }}
                  className="w-full py-5 bg-red-500/10 text-red-400 font-black rounded-2xl border border-red-500/20 flex items-center justify-center space-x-3 active:scale-95 transition-transform"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Chiqish ({user.name})</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => { onAuthNavigate('login'); setIsMenuOpen(false); }}
                    className="py-5 bg-white/5 text-white font-black rounded-2xl border border-white/10 active:scale-95 transition-transform"
                  >
                    Kirish
                  </button>
                  {isRegistrationOpen && (
                    <button
                      onClick={() => { onAuthNavigate('signup'); setIsMenuOpen(false); }}
                      className="py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform"
                    >
                      Ro'yxatdan o'tish
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0f0f12] border border-white/10 rounded-[2.5rem] p-10 max-w-sm w-full shadow-[0_50px_100px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-300 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <LogOut className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Tizimdan chiqish</h3>
            <p className="text-slate-400 font-medium mb-10 leading-relaxed">Haqiqatan ham o'z profilingizdan chiqmoqchimisiz? Barcha saqlanmagan ma'lumotlar yo'qolishi mumkin.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { onLogout(); setShowLogoutConfirm(false); }}
                className="w-full py-5 bg-red-500 hover:bg-red-600 text-white font-black rounded-3xl transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                HA, CHIQISH
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-3xl transition-all active:scale-95"
              >
                BEKOR QILISH
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

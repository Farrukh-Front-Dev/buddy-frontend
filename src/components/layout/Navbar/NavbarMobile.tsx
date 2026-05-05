import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LogIn, UserCircle } from 'lucide-react';
import { Home, Layout, Users, Mail, Activity, Zap, ShieldAlert, Calendar, Bell } from 'lucide-react';
import { Page, UserData } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import LanguageSwitcher from '../../common/LanguageSwitcher/LanguageSwitcher';

interface NavLink {
  name: string;
  translationKey: string;
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
  const { t } = useTranslation('navbar');
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  const getNavLinks = (): NavLink[] => {
    if (!user) {
      return [
        { name: 'Home', translationKey: 'nav.home', id: 'home', icon: <Home className="w-5 h-5" /> },
        { name: 'Features', translationKey: 'nav.features', id: 'features', icon: <Layout className="w-5 h-5" /> },
        { name: 'Team', translationKey: 'nav.team', id: 'team', icon: <Users className="w-5 h-5" /> },
        { name: 'Contact', translationKey: 'nav.contact', id: 'contact', icon: <Mail className="w-5 h-5" /> },
      ];
    }

    if (user.role === 'admin') {
      return [
        { name: 'Stats', translationKey: 'nav.stats', id: 'admin', tab: 'stats', icon: <Activity className="w-5 h-5" /> },
        { name: 'Monitoring', translationKey: 'nav.monitoring', id: 'admin', tab: 'monitoring', icon: <Zap className="w-5 h-5" /> },
        { name: 'Team', translationKey: 'nav.team', id: 'team', icon: <Users className="w-5 h-5" /> },
        { name: 'Users', translationKey: 'nav.users', id: 'admin', tab: 'users', icon: <Users className="w-5 h-5" /> },
        { name: 'Requests', translationKey: 'nav.requests', id: 'admin', tab: 'requests', icon: <ShieldAlert className="w-5 h-5" /> },
        { name: 'Seasons', translationKey: 'nav.seasons', id: 'admin', tab: 'seasons', icon: <Calendar className="w-5 h-5" /> },
        { name: 'Messages', translationKey: 'nav.messages', id: 'admin', tab: 'messages', icon: <Mail className="w-5 h-5" /> },
      ];
    }

    return [
      { name: 'Monitoring', translationKey: 'nav.monitoring', id: 'dashboard', tab: 'panel', icon: <Activity className="w-5 h-5" /> },
      { name: 'Team', translationKey: 'nav.team', id: 'team', icon: <Users className="w-5 h-5" /> },
      { name: 'Profile', translationKey: 'nav.profile', id: 'dashboard', tab: 'profile', icon: <UserCircle className="w-5 h-5" /> },
      { name: 'Notifications', translationKey: 'nav.notifications', id: 'dashboard', tab: 'notifications', icon: <Bell className="w-5 h-5" /> },
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
      <div className="lg:hidden flex items-center gap-2.5">
        {user && (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-900 rounded-lg border-2 border-indigo-600"
            style={{
              boxShadow: `2px 2px 0px 0px ${shadowColor}`,
            }}
          >
            <UserCircle className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-[11px] font-bold text-white truncate max-w-[100px]">{user.name}</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-3 bg-slate-900 rounded-lg text-white transition-all border-2 active:scale-90"
          style={{
            borderColor: borderColor,
            boxShadow: `2px 2px 0px 0px ${shadowColor}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `1px 1px 0px 0px ${shadowColor}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
          }}
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
            className="lg:hidden bg-slate-900 absolute top-full left-0 right-0 m-4 py-6 px-4 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300"
            style={{
              border: `2px solid ${borderColor}`,
              boxShadow: `4px 4px 0px 0px ${shadowColor}`,
            }}
          >
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <button
                  key={`${link.id}-${link.name}`}
                  onClick={() => {
                    onLinkClick(link.id, link.tab);
                    onToggle();
                  }}
                  className={`flex items-center gap-3 p-3.5 rounded-lg text-sm font-bold tracking-tight transition-all border-2 ${
                    isActive(link) 
                      ? 'text-white bg-slate-800' 
                      : 'text-slate-400 bg-transparent border-transparent hover:bg-slate-800/50'
                  }`}
                  style={isActive(link) ? {
                    borderColor: borderColor,
                    boxShadow: `2px 2px 0px 0px ${shadowColor}`,
                  } : {}}
                >
                  <div className={isActive(link) ? 'text-indigo-400 shrink-0' : 'text-slate-500 shrink-0'}>
                    {link.icon}
                  </div>
                  <span>{t(link.translationKey, link.name)}</span>
                </button>
              ))}

              <div className="h-px bg-white/10 my-2 mx-2"></div>

              <div className="flex justify-center py-2">
                <LanguageSwitcher />
              </div>

              <div className="h-px bg-white/10 my-2 mx-2"></div>

              {user ? (
                <button
                  onClick={() => {
                    onLogout();
                    onToggle();
                  }}
                  className="w-full py-3.5 bg-slate-800 text-red-400 font-bold rounded-lg border-2 border-red-500 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  style={{
                    boxShadow: `2px 2px 0px 0px rgb(244, 63, 94)`,
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>{t('nav.logout', 'Sign Out')}</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      onLogin();
                      onToggle();
                    }}
                    className="py-3.5 bg-slate-800 text-white font-bold rounded-lg border-2 border-indigo-600 active:scale-95 transition-transform text-sm"
                    style={{
                      boxShadow: `2px 2px 0px 0px ${shadowColor}`,
                    }}
                  >
                    {t('nav.login', 'Sign In')}
                  </button>
                  {isRegistrationOpen && (
                    <button
                      onClick={() => {
                        onSignup();
                        onToggle();
                      }}
                      className="py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg border-2 border-indigo-500 active:scale-95 transition-transform text-sm"
                      style={{
                        boxShadow: `2px 2px 0px 0px ${shadowColor}`,
                      }}
                    >
                      {t('nav.signup', 'Sign Up')}
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

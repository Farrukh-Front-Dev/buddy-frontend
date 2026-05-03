import React from 'react';
import { Home, Layout, Users, Mail, Activity, Zap, ShieldAlert, Calendar, UserCircle, Bell } from 'lucide-react';
import { Page, UserData } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';

interface NavLink {
  name: string;
  translationKey: string;
  id: Page;
  tab?: string;
  icon: React.ReactNode;
}

interface NavbarLinksProps {
  currentPage: Page;
  user: UserData | null;
  unreadCount: number;
  onLinkClick: (id: Page, tab?: string) => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ currentPage, user, unreadCount, onLinkClick }) => {
  const { t } = useTranslation();
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  const getNavLinks = (): NavLink[] => {
    if (!user) {
      return [
        { name: 'Home', translationKey: 'nav.home', id: 'home', icon: <Home className="w-4 h-4" /> },
        { name: 'Features', translationKey: 'nav.features', id: 'features', icon: <Layout className="w-4 h-4" /> },
        { name: 'Team', translationKey: 'nav.team', id: 'team', icon: <Users className="w-4 h-4" /> },
        { name: 'Contact', translationKey: 'nav.contact', id: 'contact', icon: <Mail className="w-4 h-4" /> },
      ];
    }

    if (user.role === 'admin') {
      return [
        { name: 'Stats', translationKey: 'nav.stats', id: 'admin', tab: 'stats', icon: <Activity className="w-4 h-4" /> },
        { name: 'Monitoring', translationKey: 'nav.monitoring', id: 'admin', tab: 'monitoring', icon: <Zap className="w-4 h-4" /> },
        { name: 'Team', translationKey: 'nav.team', id: 'team', icon: <Users className="w-4 h-4" /> },
        { name: 'Users', translationKey: 'nav.users', id: 'admin', tab: 'users', icon: <Users className="w-4 h-4" /> },
        { name: 'Requests', translationKey: 'nav.requests', id: 'admin', tab: 'requests', icon: <ShieldAlert className="w-4 h-4" /> },
        { name: 'Seasons', translationKey: 'nav.seasons', id: 'admin', tab: 'seasons', icon: <Calendar className="w-4 h-4" /> },
        { name: 'Messages', translationKey: 'nav.messages', id: 'admin', tab: 'messages', icon: <Mail className="w-4 h-4" /> },
      ];
    }

    return [
      { name: 'Monitoring', translationKey: 'nav.monitoring', id: 'dashboard', tab: 'panel', icon: <Activity className="w-4 h-4" /> },
      { name: 'Team', translationKey: 'nav.team', id: 'team', icon: <Users className="w-4 h-4" /> },
      { name: 'Profile', translationKey: 'nav.profile', id: 'dashboard', tab: 'profile', icon: <UserCircle className="w-4 h-4" /> },
      { name: 'Notifications', translationKey: 'nav.notifications', id: 'dashboard', tab: 'notifications', icon: <Bell className="w-4 h-4" /> },
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
    <div 
      className="hidden lg:flex items-center gap-2 px-4 py-3 bg-slate-900 rounded-xl border-2 transition-all"
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
      {navLinks.map((link) => (
        <button
          key={`${link.id}-${link.name}`}
          onClick={() => onLinkClick(link.id, link.tab)}
          className={`px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2.5 relative whitespace-nowrap ${
            isActive(link) 
              ? 'text-white bg-indigo-600/20 border border-indigo-500/30' 
              : 'text-slate-400 bg-transparent border border-transparent hover:text-white hover:bg-white/5'
          }`}
        >
          <span className={isActive(link) ? 'text-indigo-400 shrink-0' : 'text-slate-500 shrink-0'}>
            {link.icon}
          </span>
          <span className="inline">{t(link.translationKey, link.name)}</span>
          
          {link.id === 'dashboard' && link.name === 'Notifications' && unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full animate-pulse font-bold shrink-0">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NavbarLinks;

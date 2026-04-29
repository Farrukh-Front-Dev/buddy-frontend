import React from 'react';
import { motion } from 'framer-motion';
import { Home, Layout, Users, Mail, Activity, Zap, ShieldAlert, Calendar, UserCircle, Bell } from 'lucide-react';
import { Page, UserData } from '../../../types';

interface NavLink {
  name: string;
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
    <div className="hidden lg:flex items-center space-x-1">
      {navLinks.map((link) => (
        <button
          key={`${link.id}-${link.name}`}
          onClick={() => onLinkClick(link.id, link.tab)}
          className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center space-x-2 relative ${
            isActive(link) ? 'text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {isActive(link) && (
            <motion.div
              layoutId="nav-active"
              className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl -z-10"
              transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
            />
          )}
          {link.icon}
          <span>{link.name}</span>
          {link.id === 'dashboard' && link.name === 'Bildirishnomalar' && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] flex items-center justify-center rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NavbarLinks;

import React, { useState, useEffect } from 'react';
import { Page, UserData } from '../../types';
import NavbarLogo from './Navbar/NavbarLogo';
import NavbarLinks from './Navbar/NavbarLinks';
import NavbarAuth from './Navbar/NavbarAuth';
import NavbarProfile from './Navbar/NavbarProfile';
import NavbarMobile from './Navbar/NavbarMobile';
import LanguageSwitcher from '../common/LanguageSwitcher/LanguageSwitcher';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, tab?: string) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  user: UserData | null;
  onLogout: () => void;
  isRegistrationOpen?: boolean;
  unreadCount?: number;
}

/**
 * Main Navbar Component - Modular Structure
 * 
 * Subcomponents:
 * - NavbarLogo: Brand logo and name
 * - NavbarLinks: Navigation links (desktop)
 * - NavbarAuth: Login/Signup buttons (desktop, no user)
 * - NavbarProfile: User profile dropdown (desktop, logged in)
 * - NavbarMobile: Mobile menu
 * - LanguageSwitcher: Language selector
 */
const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onAuthNavigate,
  user,
  onLogout,
  isRegistrationOpen = true,
  unreadCount = 0,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: Page, tab?: string) => {
    if (tab) {
      if (id === 'admin') {
        localStorage.setItem('buddy_admin_tab', tab);
      } else if (id === 'dashboard') {
        localStorage.setItem('buddy_dashboard_tab', tab);
      }
    }
    onNavigate(id, tab);
  };

  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-slate-950/80 backdrop-blur-lg py-3 sm:py-3.5 md:py-4 shadow-lg shadow-black/20'
          : 'bg-transparent py-4 sm:py-5 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-3 sm:gap-4">
          {/* Logo */}
          <NavbarLogo onClick={() => handleLinkClick('home')} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-3 sm:gap-4">
            <NavbarLinks
              currentPage={currentPage}
              user={user}
              unreadCount={unreadCount}
              onLinkClick={handleLinkClick}
            />

            <div className="w-px h-8 bg-white/10"></div>

            <LanguageSwitcher />

            {user ? (
              <NavbarProfile 
                user={user} 
                onLogoutClick={onLogout} 
                onProfileClick={() => handleLinkClick('dashboard', 'profile')}
                onSettingsClick={() => handleLinkClick(user.role === 'admin' ? 'admin' : 'dashboard', user.role === 'admin' ? 'settings' : 'panel')}
              />
            ) : (
              <NavbarAuth
                isRegistrationOpen={isRegistrationOpen}
                onLogin={() => onAuthNavigate('login')}
                onSignup={() => onAuthNavigate('signup')}
              />
            )}
          </div>

          {/* Mobile Menu */}
          <NavbarMobile
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            currentPage={currentPage}
            user={user}
            isRegistrationOpen={isRegistrationOpen}
            onLinkClick={handleLinkClick}
            onLogin={() => onAuthNavigate('login')}
            onSignup={() => onAuthNavigate('signup')}
            onLogout={onLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

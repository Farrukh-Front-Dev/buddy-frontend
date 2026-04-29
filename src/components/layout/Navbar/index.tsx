import React, { useState, useEffect } from 'react';
import { Page, UserData } from '../../../types';
import { useTranslation } from '../../../hooks/useTranslation';
import NavbarLogo from './NavbarLogo';
import NavbarLinks from './NavbarLinks';
import NavbarAuth from './NavbarAuth';
import NavbarProfile from './NavbarProfile';
import NavbarMobile from './NavbarMobile';
import LogoutModal from './LogoutModal';
import LanguageSwitcher from '../../common/LanguageSwitcher/LanguageSwitcher';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page, tab?: string) => void;
  onAuthNavigate: (mode: 'login' | 'signup') => void;
  user: UserData | null;
  onLogout: () => void;
  isRegistrationOpen?: boolean;
  unreadCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onAuthNavigate,
  user,
  onLogout,
  isRegistrationOpen = true,
  unreadCount = 0,
}) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: Page, tab?: string) => {
    if (tab) {
      const storageKey = user?.role === 'admin' ? 'buddy_admin_tab' : 'buddy_dashboard_tab';
      localStorage.setItem(storageKey, tab);
    }
    onNavigate(id, tab);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? 'bg-[#0a0a0c] border-b border-white/10 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <NavbarLogo onClick={() => handleLinkClick('home')} />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <NavbarLinks
                currentPage={currentPage}
                user={user}
                unreadCount={unreadCount}
                onLinkClick={handleLinkClick}
              />

              {/* Language Switcher & Auth */}
              <div className="ml-4 pl-4 border-l border-white/10 flex items-center space-x-3">
                <LanguageSwitcher />
                
                {user ? (
                  <NavbarProfile
                    user={user}
                    onProfileClick={() => handleLinkClick('dashboard', 'profile')}
                    onSettingsClick={() =>
                      handleLinkClick(user.role === 'admin' ? 'admin' : 'dashboard', user.role === 'admin' ? 'settings' : 'panel')
                    }
                    onLogoutClick={() => setShowLogoutConfirm(true)}
                  />
                ) : (
                  <NavbarAuth
                    isRegistrationOpen={isRegistrationOpen}
                    onLogin={() => onAuthNavigate('login')}
                    onSignup={() => onAuthNavigate('signup')}
                  />
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <NavbarMobile
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              currentPage={currentPage}
              user={user}
              isRegistrationOpen={isRegistrationOpen}
              onLinkClick={handleLinkClick}
              onLogin={() => onAuthNavigate('login')}
              onSignup={() => onAuthNavigate('signup')}
              onLogout={() => setShowLogoutConfirm(true)}
            />
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutConfirm}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
};

export default Navbar;

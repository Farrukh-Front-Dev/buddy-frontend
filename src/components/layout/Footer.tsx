import React from 'react';
import { Instagram, Facebook, Youtube, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { Page } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';
import Icon3D from '../common/Icon3D/Icon3D';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation('home');
  const shadowColor = 'rgb(168, 85, 247)';
  const borderColor = 'rgb(79, 70, 229)';

  return (
    <footer className="bg-slate-950 pt-12 md:pt-16 pb-6 md:pb-8 rounded-t-3xl border-t-2 border-l-2 border-r-2" style={{ borderColor: 'rgb(79, 70, 229)', boxShadow: `0 -4px 0px 0px rgb(168, 85, 247)` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-10">
          {/* Logo & Social */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon3D variant="primary" size="sm">
                <Zap className="w-4 h-4 text-white" />
              </Icon3D>
              <h3 className="text-lg font-black">
                Buddy<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Team</span>
              </h3>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4 max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex space-x-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px]"
                  style={{
                    border: `2px solid ${borderColor}`,
                    boxShadow: `2px 2px 0px 0px ${shadowColor}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `1px 1px 0px 0px ${shadowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${shadowColor}`;
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">{t('footer.nav_title')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('footer.nav_home'), page: 'home' },
                { label: t('footer.nav_features'), page: 'features' },
                { label: t('footer.nav_team'), page: 'team' },
                { label: t('footer.nav_contact'), page: 'contact' },
              ].map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate(link.page as Page)}
                    className="text-slate-400 text-xs hover:text-indigo-400 transition-colors font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">{t('footer.contact_title')}</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-slate-400">{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href="tel:998930394442" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  +998 93 039 44 42
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href="mailto:samarqand@21-school.uz" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  samarqand@21-school.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 md:pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

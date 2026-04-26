
import React from 'react';
import { Instagram, Facebook, Youtube, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { Page } from '../../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-14 md:pt-20 pb-8 md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Logo & About */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2.5 md:p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[10px]">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight">Buddy<span className="text-purple-500">Team</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Bizning logotimizdagi mushuk va kuchukcha kabi biz ham bir-birimizga va sizga tayanchmiz. Birgalikda eng yaxshi natijalarga erishamiz!
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-[10px] bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-all border border-white/5"><Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" /></a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-[10px] bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-all border border-white/5"><Facebook className="w-4 h-4 md:w-5 md:h-5 text-white" /></a>
              <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-[10px] bg-white/5 flex items-center justify-center text-white hover:bg-purple-600 transition-all border border-white/5"><Youtube className="w-4 h-4 md:w-5 md:h-5 text-white" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-5 md:mb-8">Navigatsiya</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><button onClick={() => onNavigate('home')} className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Asosiy sahifa</button></li>
              <li><button onClick={() => onNavigate('features')} className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Xizmatlarimiz</button></li>
              <li><button onClick={() => onNavigate('team')} className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Bizning kuratorlar</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-slate-400 text-sm hover:text-purple-400 transition-colors">Bog'lanish</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-widest mb-5 md:mb-8">Siz uchun</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start space-x-2 md:space-x-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span className="text-slate-500 text-sm">Samarqand shahar, Ibn Sino ko'chasi 17A</span>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 shrink-0" />
                <span className="text-slate-500 text-sm">998930394442</span>
              </li>
              <li className="flex items-center space-x-2 md:space-x-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-indigo-500 shrink-0" />
                <span className="text-slate-500 text-sm">samarqand@21-school.uz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center">
            © {new Date().getFullYear()} Buddy System. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
